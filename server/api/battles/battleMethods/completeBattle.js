import { Meteor } from "meteor/meteor"
import { JsonRoutes } from "meteor/simple:json-routes"

import moment from "moment/moment"
import lodash from "lodash"
import _ from "underscore"

import { flattenObjectForMongo } from "/server/utils"

import { ITEMS } from "/imports/constants/items/index"
import { NEED_GREED_ITEMS } from "/imports/constants/items/needgreed"
import { PLAYER_ICONS } from "/imports/constants/shop/index"
import { STATE_BUFFS } from "/imports/constants/state"

import { ABILITIES } from "/server/constants/combat/abilities"
import { BATTLES } from "/server/constants/battles/index" // List of encounters
import { FLOORS } from "/server/constants/floors/index"
import { MAGIC } from "/server/constants/magic/index"
import { spellData } from "/server/constants/magic"

import { CDbl, CInt } from "/imports/utils"
import { updateAbilityCooldowns } from "/server/api/abilities/abilities"
import { addFakeGems, addGold, addItem } from "/server/api/items/items"
import { addXp } from "/server/api/skills/skills"
import { normalizedLootTable } from "/server/constants/enemies/lootTables/index"
import { cleanRewards } from "/server/utils"

import { Chats } from "meteor/cesarve:simple-chat/collections"
import { Abilities } from "/imports/api/abilities/abilities"
import { Battles, BattlesList } from "/imports/api/battles/battles"
import { userCurrentClass } from "/imports/api/classes/classes.js"
import { Combat } from "/imports/api/combat/combat"
import { BossHealthScores } from "/imports/api/floors/bossHealthScores"
import { FloorLoot } from "/imports/api/floors/floorLoot"
import { FloorWaveScores } from "/imports/api/floors/floorWaveScores"
import { Floors } from "/imports/api/floors/floors"
import { Groups } from "/imports/api/groups/groups"
import { Items } from "/imports/api/items/items"
import { Users } from "/imports/api/users/users"

import { State } from "/imports/api/state/state"

export const updateUserHighestFloorClear = function updateUserHighestFloorClear({ user, floor }) {
    const userObject = Users.findOne({ _id: user })

    if (userObject) {
        if (!userObject.stats || (userObject.stats.towerHighestClear || 0) < (floor || 0)) {
            Users.update(user, {
                $set: {
                    "stats.towerHighestClear": floor || 0
                }
            })
        }
    }
}

export const markUserAsActive = function markUserAsActive(userId) {
    // update user activity
    Users.update(
        {
            _id: userId
        },
        {
            $set: {
                lastActivity: moment().toDate()
            }
        }
    )
}

export const updateCombatHistoryStats = function updateCombatHistoryStats({ user, historyStats }) {
    const userObject = Users.findOne({ _id: user })

    try {
        if (userObject) {
            if (!userObject.stats || (userObject.stats.combatMostDamageDone || 0) < historyStats.damageDone) {
                Users.update(user, {
                    $set: {
                        "stats.combatMostDamageDone": parseInt(Math.round(historyStats.damageDone || 0))
                    }
                })
            }

            if (!userObject.stats || (userObject.stats.combatMostHealingDone || 0) < historyStats.healingDone) {
                Users.update(user, {
                    $set: {
                        "stats.combatMostHealingDone": parseInt(Math.round(historyStats.healingDone || 0))
                    }
                })
            }

            if (!userObject.stats || (userObject.stats.combatMostDamageTaken || 0) < historyStats.damageTaken) {
                Users.update(user, {
                    $set: {
                        "stats.combatMostDamageTaken": parseInt(Math.round(historyStats.damageTaken || 0))
                    }
                })
            }
        }
    } catch (err) {}
}

export const distributeRewards = function distributeRewards({ floor, server }) {
    // Fetch the rewards
    const rawFloorRewards = FLOORS[floor].floorRewards

    // Fetch top 10 by damage dealt
    /*
  const sortedBossHealthScores = BossHealthScores.find({}, {
    sort: [
      ['bossDamage', 'desc']
    ],
    limit: 10
  }).fetch();

  sortedBossHealthScores.forEach((bossHealthScore) => {
    rawFloorRewards.forEach((reward) => {
      if (reward.type === 'item') {
        addItem(reward.itemId, 1, bossHealthScore.owner);
      }
    })
  })
  */

    // Fetch top 10 by tower score
    try {
        let topFloorContributors = FloorWaveScores.find(
            { floor: floor, server: server },
            { sort: { points: -1 }, limit: 10 }
        ).fetch()
        if (topFloorContributors) {
            topFloorContributors.forEach((floorContributor) => {
                console.log(`TOP CONTRIBUTOR: awarding 1 enhancer key to ${floorContributor.username}`)
                addItem("enhancer_key", 1, floorContributor.owner)
                Chats.insert({
                    message: `For being a TOP CONTRIBUTOR to this tower floor, you have been awarded 1 enhancer key.`,
                    username: "Game",
                    name: "Game",
                    date: new Date(),
                    custom: {
                        roomType: "Game"
                    },
                    roomId: `Game-${floorContributor.owner}`
                })
            })
        }
    } catch (err) {
        console.log("Error trying to award enhancer keys to the top contributing players:")
        console.log(err)
    }

    // Fetch all users by tower points
    const sortedFloorWaveScores = FloorWaveScores.find({
        server,
        floor,
        points: {
            $gte: 25
        }
    }).fetch()

    const totalContributors = sortedFloorWaveScores.length

    console.log("floor", floor, "server", server)
    let rewards = FloorLoot.find({ floor: floor, server: server }).fetch()
    // get gold out first
    let gold = _.findWhere(rewards, { type: "gold" })

    // create a new list of players who got rewards
    let playerList = {}

    // log and award gold
    try {
        sortedFloorWaveScores.forEach((waveScore) => {
            let goldAmount = Math.floor(gold.amount / totalContributors)
            playerList[waveScore.owner] = [
                {
                    type: "gold",
                    amount: goldAmount
                }
            ]
            console.log(`awarding ${goldAmount} gold to ${waveScore.username}`)
            addGold(waveScore.owner, goldAmount)
            Chats.insert({
                message: `You have been awarded ${goldAmount} gold.`,
                username: "Game",
                name: "Game",
                date: new Date(),
                custom: {
                    roomType: "Game"
                },
                roomId: `Game-${waveScore.owner}`
            })
        })
    } catch (err) {
        console.log("Error trying to award gold to players:")
        console.log(err)
    }

    // remove gold from rewards
    rewards = _.reject(rewards, function (r) {
        return r.type === "gold"
    })

    while (rewards.length > 0) {
        Object.keys(playerList).map((player) => {
            if (rewards.length <= 0) {
                return
            }
            const reward = _.sample(rewards)
            playerList[player].push({
                type: reward.type,
                itemId: reward.itemId,
                amount: 1
            })
            // find reward and decrement by 1 or remove from list
            rewards = rewards.map((cur) => {
                if (cur.itemId === reward.itemId) {
                    cur.amount -= 1
                }
                return cur
            })
            rewards = _.reject(rewards, (r) => {
                return r.amount <= 0
            })
        })
    }

    Object.keys(playerList).map((player) => {
        playerList[player] = cleanRewards(playerList[player])
        playerList[player].map((item) => {
            if (item.itemId) {
                console.log(`awarding ${item.amount} ${item.itemId} to ${player}`)
                addItem(item.itemId, item.amount, player)
                Chats.insert({
                    message: `You have been awarded ${item.amount} ${ITEMS[item.itemId].name}.`,
                    username: "Game",
                    name: "Game",
                    date: new Date(),
                    custom: {
                        roomType: "Game"
                    },
                    roomId: `Game-${player}`
                })
            }
        })
    })
}

export const resolveLoot = function (battle) {
    battle.loot.forEach((loot, lootIdx) => {
        if (loot.owners.length === 0) return

        const needMembers = loot.owners.filter((owner) => {
            return owner.ngChoice === "need"
        })
        let greedMembers = loot.owners.filter((owner) => {
            return owner.ngChoice === "greed"
        })
        const passMembers = loot.owners.filter((owner) => {
            return owner.ngChoice === "pass"
        })

        if (needMembers.length === 0 && greedMembers.length === 0) {
            greedMembers = passMembers
        }

        if (needMembers.length === 0 && greedMembers.length === 0) return
        let winner = undefined
        if (needMembers.length) {
            winner = _.sample(needMembers).id
        } else {
            winner = _.sample(greedMembers).id
        }

        addItem(loot.itemId, loot.amount, winner)

        let update = {
            $set: {},
            $push: {}
        }
        update.$set[`loot.${lootIdx}.winner`] = winner
        update.$push["finalTickEvents"] = {
            type: "item",
            amount: loot.amount,
            itemId: loot.itemId,
            affectedGlobalBuff: loot.affectedGlobalBuff,
            affectedNeedGreed: true,
            icon: ITEMS[loot.itemId].icon,
            name: ITEMS[loot.itemId].name,
            owner: winner
        }
        Battles.update(battle._id, update)
    })

    Battles.update(battle._id, {
        $set: {
            lootResolved: true
        }
    })
}

export const battleEnergyUse = function (battleId) {
    const targetBattle = BattlesList.findOne({
        _id: battleId
    })

    if (!targetBattle) {
        return 0
    }

    try {
        let energyUse = parseInt(targetBattle.energyUse)
        if (energyUse < 0) {
            energyUse = 1
        }
        return energyUse
    } catch (err) {}

    return 1
}

export const removeBattle = function (battleId) {
    const targetBattle = BattlesList.findOne({
        _id: battleId
    })

    if (!targetBattle) {
        return 0
    }

    if (targetBattle.group) {
        Groups.update(
            {
                _id: targetBattle.group
            },
            {
                $set: {
                    inBattle: false
                }
            }
        )
    }

    return BattlesList.remove(battleId)
}

export const currentBossIsAlive = function (actualBattle) {
    return currentFloorDetails(actualBattle).isAlive
}

export const currentBossIsDead = function (actualBattle) {
    return currentFloorDetails(actualBattle).isDead
}

export const currentFloorDetails = function (actualBattle) {
    const currentFloor = Floors.findOne({ floor: actualBattle.floor, server: actualBattle.server })

    if (currentFloor) {
        return {
            id: currentFloor._id,
            created: currentFloor.createdAt,
            floor: currentFloor.floor,
            points: currentFloor.points,
            pointsMax: currentFloor.pointsMax,
            health: currentFloor.health,
            healthMax: currentFloor.healthMax,
            floorComplete: currentFloor.floorcomplete,
            server: currentFloor.server,
            loot: currentFloor.loot,
            bossResetAt: currentFloor.bossResetAt,
            isAlive: currentFloor.health > 0,
            isDead: currentFloor.health <= 0
        }
    }

    return {
        id: "",
        created: new moment(),
        floor: 0,
        points: 1,
        pointsMax: 1,
        health: 1,
        healthMax: 1,
        floorComplete: false,
        server: "",
        loot: [],
        bossResetAt: undefined,
        isDead: false,
        isAlive: true
    }
}

const wasThisABossFight = function (actualBattle) {
    return actualBattle.startingBossHp && !actualBattle.isOldBoss
}

const floorContributionScaler = function (actualBattle) {
    // wraith, 2023-10-18:  this was originally 2%, 1%, 15%
    const baseBonus   = 0.05 //   5% base
    const bonusPerDay = 0.05 //   5% per day
    const maxBonusCap =  0.3 //  30% max/cap
    let curBonus = baseBonus

    const floorDetails = currentFloorDetails(actualBattle)
    if (floorDetails.floor === 0) {
        return curBonus
    }

    if (floorDetails.floorComplete) {
        return curBonus
    }

    const rightNow = new moment()
    const durationInHours = rightNow.diff(floorDetails.created, "hours")

    if (durationInHours > 0) {
        curBonus += Math.floor(durationInHours / 24) * bonusPerDay
    }

    return curBonus <= maxBonusCap ? curBonus : maxBonusCap
}

const battleHandler_DealBossDamage = function (actualBattle) {
    actualBattle.units.forEach((unit, idx) => {
        if (actualBattle.units[idx].skills.length === 0) {
            actualBattle.units[idx].isCompanion = true
        }
    })

    let temp_totalXpGain = 0

    const floorDetails = currentFloorDetails(actualBattle)
    if (floorDetails.floor === 0) {
        return temp_totalXpGain
    }

    if (wasThisABossFight(actualBattle)) {
        const units = actualBattle.units.filter((unit) => {
            return !!unit.owner && !unit.isNPC && unit.xpDistribution
        })

        console.log(
            `Boss fight: floor ${actualBattle.floor}, starting HP ${actualBattle.startingBossHp},`,
            actualBattle.isOldBoss ? "old boss" : "current boss"
        )

        // XP is determine by damage dealt

        const allAliveEnemies = actualBattle.enemies
        const allCompletedEnemies = actualBattle.completedEnemies
        //console.log('number of alive enemies', ((allAliveEnemies) ? (allAliveEnemies.length.toFixed(0)) : 'null'));
        //console.log('number of dead enemies', ((allCompletedEnemies) ? (allCompletedEnemies.length.toFixed(0)) : 'null'));
        const bossId = FLOORS[actualBattle.floor].boss.enemy.id
        console.log("... bossId", bossId)

        const allPlayerUnits = actualBattle.units.filter((unit) => {
            return !unit.isEnemy && !unit.isNPC && !unit.isCompanion && !unit.isSoloCompanion
        })

        try {
            let liveBossStats = _.findWhere(allAliveEnemies, { monsterType: bossId })
            if (!liveBossStats || !liveBossStats.stats) {
                liveBossStats = _.findWhere(allCompletedEnemies, { monsterType: bossId })
            }

            let damageDealt = 0
            if (liveBossStats && liveBossStats.stats) {
                damageDealt = actualBattle.startingBossHp - CDbl(liveBossStats.stats.health)
            } else {
                damageDealt = actualBattle.startingBossHp
            }

            if (floorDetails.isAlive) {
                temp_totalXpGain = damageDealt * (actualBattle.floor / 1.5) * (1 + allPlayerUnits.length * 0.16 - 0.16)
            }
        } catch (err) {
            console.log("Error calcuating post-battle boss health:")
            console.log(err)
        }
    }

    return temp_totalXpGain
}

const battleHandler_RecordBossDamage = function (actualBattle) {
    actualBattle.units.forEach((unit, idx) => {
        if (actualBattle.units[idx].skills.length === 0) {
            actualBattle.units[idx].isCompanion = true
        }
    })

    // Is this a current boss battle?
    //console.log(actualBattle.startingBossHp);
    if (wasThisABossFight(actualBattle)) {
        const allAliveEnemies = actualBattle.enemies
        const allCompletedEnemies = actualBattle.completedEnemies
        const bossId = FLOORS[actualBattle.floor].boss.enemy.id

        let liveBossStats = _.findWhere(allAliveEnemies, { monsterType: bossId })
        if (!liveBossStats || !liveBossStats.stats) {
            liveBossStats = _.findWhere(allCompletedEnemies, { monsterType: bossId })
        }

        let damageDealt = 0
        try {
            if (liveBossStats && liveBossStats.stats) {
                if (liveBossStats.stats.health < actualBattle.startingBossHp) {
                    damageDealt = actualBattle.startingBossHp - CDbl(liveBossStats.stats.health)
                } // else damageDealt = 0 (ending boss health wasn't less than starting boss health)
            } // else damageDealt = 0 (we couldn't find the boss anywhere in 'actualBattle')
        } catch (err) {
            console.log("Error calcuating post-battle boss health:")
            console.log(err)
        }

        console.log(`... damage dealt:  ${Math.floor(damageDealt)}`)
        if (!damageDealt || damageDealt < 0) {
            damageDealt = 0
        }

        const allPlayerUnits = actualBattle.units.filter((unit) => {
            return !unit.isEnemy && !unit.isNPC && !unit.isCompanion && !unit.isSoloCompanion
        })

        // Update players contributions
        allPlayerUnits.forEach((unit) => {
            try {
                BossHealthScores.insert({
                    server: actualBattle.server,
                    owner: unit.owner,
                    username: unit.name,
                    bossDamage: damageDealt
                })
            } catch (err) {}
        })

        // Update bosses hp
        const currentFloor = Floors.findOne({
            floorComplete: false,
            floor: actualBattle.floor,
            server: actualBattle.server
        })
        if (currentFloor) {
            // Just update the bosses hp
            Floors.update(currentFloor._id, {
                $set: {
                    health: currentFloor.health - damageDealt
                }
            })
        }
    }
}

export const completeBattle = function (actualBattle) {
    const finalTickEvents = []

    //console.log(" ####  completeBattle()  #### ");

    let hadCompanions = false
    actualBattle.units.forEach((unit, idx) => {
        if (actualBattle.units[idx].skills.length === 0) {
            actualBattle.units[idx].isCompanion = true
            hadCompanions = true
        }
    })

    /*
  console.log(`Bonus loot: ${actualBattle.bonusLoot}`);
  console.log(`Extra loot table:`, actualBattle.extraLootTable);
  actualBattle.completedEnemies.forEach((enemy) => {
    try {
      console.log(`Defeated ${enemy.name} (${enemy.id})`);
    } catch (err) {
      console.log(enemy);
    }
  });
  actualBattle.units.forEach((unit) => {
    try {
      console.log(`Party units ${unit.name} (${unit.id})`);
    } catch (err) {
      console.log(unit);
    }
  });
  console.log("Had companions?", hadCompanions);
  console.log(actualBattle);
  */

    const allPlayerUnits = actualBattle.units.filter(
        (unit) => !unit.isEnemy && !unit.isNPC && !unit.isCompanion && !unit.isSoloCompanion
    )
    const aliveUnits = actualBattle.units.filter(
        (unit) => unit.stats.health > 0 && !unit.isEnemy && !unit.isNPC && !unit.isCompanion && !unit.isSoloCompanion
    )

    let win = aliveUnits.length > 0
    let ngRewards = []

    // chance for companion tokens is 0%
    let chanceForTokens = 0

    // if we didn't use a companion at all and the combat took place in the tower (floor 1+)...
    if (!hadCompanions && actualBattle.floor > 0) {
        // chance is 1% per floor (1.25-32.5% @ 1-26)
        chanceForTokens = actualBattle.floor * 0.0125

        if (win && actualBattle.isExplorationRun) {
            // double bonus (which later is multiplicative with exploration loot bonus)
            chanceForTokens *= 2
        } else {
            // give a flat bonus for the room they went to
            chanceForTokens += (actualBattle.room / 3) * chanceForTokens // half the room x current chance, so F10R7 would be 29.167% vs only 4.167% for F10R1
        }
    }

    const hasCombatGlobalBuff = !_.isUndefined(
        State.findOne({ name: STATE_BUFFS.combat, "value.activeTo": { $gte: moment().toDate() } })
    )

    // How much energy they wanted to use
    const energyUse = battleEnergyUse(actualBattle.id)
    let energyUseMultiplier = 1
    if (energyUse === 5) {
        energyUseMultiplier = 4
    } else if (energyUse === 10) {
        energyUseMultiplier = 7
    } else if (energyUse === 20) {
        energyUseMultiplier = 13
    } else if (energyUse === 30) {
        energyUseMultiplier = 18
    } else if (energyUse === 40) {
        energyUseMultiplier = 22
    }

    console.log("Battle finished:energy use", energyUse, energyUseMultiplier)

    // Remove from battle list
    const battlesDeleted = removeBattle(actualBattle.id)

    if (battlesDeleted <= 0) {
        console.log(" ####  completeBattle() early exit  #### ")
        return
    }

    if (!win && actualBattle.isExplorationRun) {
        // Take back the xp values for the current wave (as they failed it)
        const newMonsters = FLOORS.genericTowerMonsterGenerator(actualBattle.floor, actualBattle.room)
        // Inject into battle
        newMonsters.forEach((monster) => {
            actualBattle.totalXpGain -= BATTLES.xpGain(monster.stats, monster.buffs)
        })
    }

    if (win || actualBattle.isExplorationRun || wasThisABossFight(actualBattle)) {
        // Mutate points values / calculate points
        let pointsEarnt = 0

        if (win) {
            // Count current room
            pointsEarnt += Math.pow(1.7, actualBattle.room)
        } else {
            // Get hp of current wave
            let totalHp = 0
            let currentHp = 0
            actualBattle.enemies.forEach((enemy) => {
                totalHp += enemy.stats.healthMax
                currentHp += enemy.stats.health
            })

            const decimalCompletion = 1 - currentHp / totalHp
            pointsEarnt += Math.pow(1.7, actualBattle.room) * decimalCompletion
        }

        // Add points from previous rooms
        for (let i = actualBattle.room - 1; i > 0; i--) {
            pointsEarnt += Math.pow(1.7, i)
        }

        // Normalize points to 0.0 - 100.0
        // Original = 1.7 + 2.89 + 4.913 + 8.3521 + 14.19857 + 24.137569 + 41.0338673 = 97.2251063
        pointsEarnt = Math.round((pointsEarnt / 0.972251063) * 10.0) / 10.0

        const units = actualBattle.units.filter((unit) => {
            return !!unit.owner && !unit.isNPC && unit.xpDistribution
        })

        // Update stats
        if (win && actualBattle.isExplorationRun) {
            allPlayerUnits.forEach((unit) => {
                updateUserHighestFloorClear({ user: unit.owner, floor: actualBattle.floor })
            })
        }

        // Apply xp gains, only if not a boss battle
        let totalXpGain = actualBattle.totalXpGain * (1 + allPlayerUnits.length * 0.16 - 0.16)

        totalXpGain *= energyUseMultiplier

        // Apply boss battle gains
        totalXpGain += battleHandler_DealBossDamage(actualBattle)

        allPlayerUnits.forEach((unit) => {
            // Distribute xp gained evenly across units
            const xpPortion = totalXpGain / allPlayerUnits.length
            Object.keys(unit.xpDistribution).forEach((skillName) => {
                // Distribute xp gained per player, per skill
                // Eg: Dagger is full attack xp, sword = 50% attack / 50% defense, ect
                let skillXpPortion = Math.round(xpPortion * unit.xpDistribution[skillName])

                if (skillXpPortion > 0) {
                    finalTickEvents.push({
                        type: "xp",
                        amount: skillXpPortion,
                        skill: skillName,
                        owner: unit.owner
                    })

                    if (hasCombatGlobalBuff) {
                        skillXpPortion *= 1.2

                        finalTickEvents.push({
                            type: "xp",
                            amount: (skillXpPortion * 0.2).toFixed(1),
                            skill: skillName,
                            affectedGlobalBuff: true,
                            owner: unit.owner
                        })
                    }

                    addXp(skillName, skillXpPortion, unit.id)
                }
            })
        })

        // Added a new bonus: in full exploration runs at the tower, loot drop chance is doubled as an incentive to take on tougher challenges as a team.
        // This bonus is not applied to the community pot of boss loot.
        let bonusLootMultiplier = 1.0 //((actualBattle.isExplorationRun) ? 2.0 : 1.0);

        // +5% (or 10% for full tower runs) for each player equipped with the Lion Dance passive from the Lunar New Year event
        allPlayerUnits.forEach((unit) => {
            if (unit.abilities) {
                unit.abilities.forEach((ability) => {
                    if (ability.id === "lion_dance") {
                        bonusLootMultiplier += 0.05 * (actualBattle.isExplorationRun ? 2.0 : 1.0)
                    }
                })
            }
        })

        bonusLootMultiplier += actualBattle.bonusLoot

        //bonusLootMultiplier *= energyUseMultiplier;

        // Apply rewards for killing monsters
        const rewardsGained = []

        let rewards = []
        if (actualBattle.level) {
            rewards = FLOORS.personalQuestMonsterGenerator(actualBattle.level, actualBattle.wave)[0].rewards
        }

        // add companion token rewards
        if (chanceForTokens > 0.0) {
            rewards = rewards.concat([
                {
                    chance: chanceForTokens,
                    rewards: [
                        {
                            type: "item",
                            itemId: "companion_token",
                            amount: Math.ceil(Math.random() * allPlayerUnits.length)
                        }
                    ]
                }
            ])
        }

        for (let iEUM = 0; iEUM < energyUseMultiplier * (actualBattle.isExplorationRun ? 2.0 : 1.0); iEUM++) {
            for (let i = 0; i < rewards.length; i++) {
                const rewardTable = rewards[i]
                const diceRoll = Math.random()

                if (rewardTable.chance * bonusLootMultiplier >= diceRoll) {
                    rewardsGained.push(_.sample(rewardTable.rewards))
                    //break; // changed by psouza4 2018-11-07: why block more rewards with their own drop rate/chance?
                }
            }
        }

        // Apply rewards for complete wave ( if this is a tower battle )
        let floorRewards = []
        if (actualBattle.floor) {
            if (win) {
                floorRewards.push(...FLOORS[actualBattle.floor][actualBattle.room].rewards)
            }

            if (actualBattle.isExplorationRun && actualBattle.room > 1) {
                // Add rewards from previous rooms
                for (let i = actualBattle.room - 1; i > 0; i--) {
                    floorRewards.push(...FLOORS[actualBattle.floor][i].rewards)
                }
            }
        }

        // Each user = additional 20% chance of loot
        for (let iEUM = 0; iEUM < energyUseMultiplier * (actualBattle.isExplorationRun ? 2.0 : 1.0); iEUM++) {
            const extraChance = 1 + allPlayerUnits.length * 0.2 - 0.2
            for (let i = 0; i < floorRewards.length; i++) {
                const rewardTable = floorRewards[i]
                const diceRoll = Math.random()

                if (rewardTable.chance * extraChance * bonusLootMultiplier >= diceRoll) {
                    rewardsGained.push(_.sample(rewardTable.rewards))
                    //if (rewardsGained >= allPlayerUnits.length) { // note: psouza4 2018-11-07 faulty logic, should be rewardsGained.length here, but we don't want to restrict this anyway
                    //  break;
                    //}
                } else if (
                    hasCombatGlobalBuff &&
                    rewardTable.chance * extraChance * bonusLootMultiplier * 1.5 >= diceRoll
                ) {
                    rewardsGained.push(
                        Object.assign({}, _.sample(rewardTable.rewards), {
                            affectedGlobalBuff: true
                        })
                    )
                    //if (rewardsGained >= allPlayerUnits.length) { // note: psouza4 2018-11-07 faulty logic, should be rewardsGained.length here, but we don't want to restrict this anyway
                    //  break;
                    //}
                }
            }
        }

        // Add special loot tables
        for (let iEUM = 0; iEUM < energyUseMultiplier * (actualBattle.isExplorationRun ? 2.0 : 1.0); iEUM++) {
            actualBattle.extraLootTable.forEach((extraLoot) => {
                try {
                    if (!extraLoot.type || extraLoot.type === "item") {
                        if (
                            ITEMS[extraLoot.id] &&
                            ITEMS[extraLoot.id].name &&
                            ITEMS[extraLoot.id].name.trim().length > 0
                        ) {
                            if (extraLoot.chance >= Math.random()) {
                                rewardsGained.push({
                                    type: "item",
                                    itemId: extraLoot.id,
                                    amount: extraLoot.quantity || 1
                                })
                            }
                        }
                    } else {
                        if (extraLoot.chance >= Math.random()) {
                            rewardsGained.push({ type: extraLoot.type, amount: extraLoot.quantity || 1 })
                        }
                    }
                } catch (err) {}
            })
        }

        // Process rewards to peeps
        const owners = _.uniq(units.map((unit) => unit.owner))
        rewardsGained.forEach((rewardGained) => {
            try {
                if (rewardGained.type === "item") {
                    // special reward handling for need/greed flagged items
                    const ng = Object.values(NEED_GREED_ITEMS).some((matcher) => {
                        return matcher(rewardGained.itemId)
                    })
                    if (owners.length > 1 && (rewardGained.ng || ng)) {
                        ngRewards.push({
                            lootId: new Meteor.Collection.ObjectID()._str,
                            type: "item",
                            itemId: rewardGained.itemId,
                            amount: rewardGained.amount,
                            name: ITEMS[rewardGained.itemId].name,
                            icon: ITEMS[rewardGained.itemId].icon,
                            affectedGlobalBuff: rewardGained.affectedGlobalBuff,
                            owners: owners.map((owner) => {
                                const thisOwnerDoc = Users.findOne({ _id: owner })
                                try {
                                    if (thisOwnerDoc) {
                                        const personalAutoNGChoice = CInt(thisOwnerDoc.uiState.ngAutoMode)

                                        if (personalAutoNGChoice === 1) {
                                            return { id: owner, ngChoice: "pass" }
                                        }
                                    }
                                } catch (err) {}

                                return { id: owner, ngChoice: "greed" }
                            })
                        })
                    } else {
                        const luckyOwner = _.sample(owners)
                        addItem(rewardGained.itemId, rewardGained.amount, luckyOwner)
                        finalTickEvents.push({
                            type: "item",
                            amount: rewardGained.amount,
                            itemId: rewardGained.itemId,
                            affectedGlobalBuff: rewardGained.affectedGlobalBuff,
                            name: ITEMS[rewardGained.itemId].name,
                            icon: ITEMS[rewardGained.itemId].icon,
                            owner: luckyOwner
                        })
                    }
                } else if (rewardGained.type === "gold") {
                    const luckyOwner = _.sample(owners)
                    Users.update(luckyOwner, {
                        $inc: {
                            gold: rewardGained.amount
                        }
                    })
                    finalTickEvents.push({
                        type: "gold",
                        amount: rewardGained.amount,
                        itemId: rewardGained.itemId,
                        affectedGlobalBuff: rewardGained.affectedGlobalBuff,
                        icon: "gold.svg",
                        owner: luckyOwner
                    })
                } else if (rewardGained.type === "icon") {
                    const luckyOwner = _.sample(owners)
                    const luckyOwnerCombat = Combat.findOne({
                        owner: luckyOwner
                    })

                    if (luckyOwnerCombat && luckyOwnerCombat.boughtIcons == null) {
                        luckyOwnerCombat.boughtIcons = []
                    }

                    if (luckyOwnerCombat && luckyOwnerCombat.bonusIcons == null) {
                        luckyOwnerCombat.bonusIcons = []
                    }

                    if (!_.contains(luckyOwnerCombat.boughtIcons, rewardGained.iconId)) {
                        finalTickEvents.push({
                            type: "icon",
                            iconId: rewardGained.iconId,
                            icon: PLAYER_ICONS[rewardGained.iconId].icon,
                            owner: luckyOwner
                        })
                        Combat.update(
                            {
                                owner: luckyOwner
                            },
                            {
                                $set: {
                                    boughtIcons: luckyOwnerCombat.boughtIcons.concat([rewardGained.iconId])
                                }
                            }
                        )
                    }
                }
            } catch (err) {
                console.log("Exception in completeBattle with 'rewardGained'", err, rewardGained)
            }
        })

        // Consolidate rewards
        for (;;) {
            try {
                let foundAnyThisPass = false

                for (let i = 0; i < finalTickEvents.length; i++) {
                    for (let j = 0; j < finalTickEvents.length; j++) {
                        if (i !== j && finalTickEvents[i].owner === finalTickEvents[j].owner) {
                            if (finalTickEvents[i].type === "gold" && finalTickEvents[j].type === "gold") {
                                foundAnyThisPass = true
                            } else if (
                                finalTickEvents[i].type === "item" &&
                                finalTickEvents[j].type === "item" &&
                                finalTickEvents[i].itemId === finalTickEvents[j].itemId
                            ) {
                                foundAnyThisPass = true
                            }

                            if (foundAnyThisPass) {
                                finalTickEvents[i].amount += finalTickEvents[j].amount
                                finalTickEvents.splice(j, 1)
                            }
                        }

                        if (foundAnyThisPass) {
                            break
                        }
                    }

                    if (foundAnyThisPass) {
                        break
                    }
                }

                if (!foundAnyThisPass) {
                    break
                }
            } catch (err) {
                break
            }
        }

        if (actualBattle.floor && actualBattle.room) {
            // Latest floor
            const latestFloor = Floors.findOne({
                floorComplete: false,
                server: actualBattle.server
            })

            if (actualBattle.room !== "boss" && actualBattle.floor === latestFloor.floor) {
                let totalPointsForGroup = 0
                let wasTotalPointsExtra = false
                // added to allow more tower attempts (only 3 official, still -- the rest only apply toward unlock and leaderboard at a reduced rate)
                const allowOverDaily = true
                //const dailyOverageMultiplier = 0.10; // currently 20% (now 10%)
                const dailyOverageMultiplier = floorContributionScaler(actualBattle) // now scales with how long the boss has been active

                // Update all participants contributions
                owners.forEach((owner) => {
                    // Find owner object
                    const ownerObject = _.findWhere(units, { owner })

                    if (
                        allowOverDaily ||
                        ownerObject.towerContributions.length < 3 ||
                        pointsEarnt > ownerObject.towerContributions[0]
                    ) {
                        ownerObject.newContribution = pointsEarnt
                        let actualPointsGained = pointsEarnt
                        let overDailyPoints = 0
                        if (ownerObject.towerContributions.length >= 3) {
                            if (pointsEarnt > ownerObject.towerContributions[0]) {
                                actualPointsGained -= ownerObject.towerContributions[0]
                                ownerObject.towerContributions[0] = pointsEarnt
                                ownerObject.towerContributions = ownerObject.towerContributions.sort((a, b) => a - b)
                            } else {
                                actualPointsGained = 0
                                overDailyPoints = pointsEarnt * dailyOverageMultiplier
                                wasTotalPointsExtra = true
                            }
                        } else {
                            ownerObject.towerContributions.push(pointsEarnt)
                            ownerObject.towerContributions = ownerObject.towerContributions.sort((a, b) => a - b)
                        }

                        totalPointsForGroup += actualPointsGained + overDailyPoints

                        const updateSelector = { owner, floor: actualBattle.floor }

                        const updateModifier = {
                            $inc: {
                                points: actualPointsGained + overDailyPoints
                            },
                            $setOnInsert: {
                                points: actualPointsGained + overDailyPoints,
                                server: actualBattle.server,
                                username: ownerObject.name // To do: Make this work when users have multiple units
                            }
                        }

                        if (overDailyPoints === 0) {
                            const possibleStats = [
                                "mining",
                                "crafting",
                                "woodcutting",
                                "farming",
                                "inscription",
                                "astronomy"
                            ]

                            const targetStat = _.sample(possibleStats)
                            addXp(targetStat, Math.round(actualPointsGained * 50 * actualBattle.floor), owner)

                            if (actualPointsGained > 10) {
                                addFakeGems(10, owner)
                            }

                            finalTickEvents.push({
                                type: "xp",
                                amount: Math.round(actualPointsGained * 50 * actualBattle.floor),
                                skill: targetStat,
                                owner
                            })
                        }

                        finalTickEvents.push({
                            type: "points",
                            amount: (actualPointsGained + overDailyPoints).toFixed(1),
                            icon: "tower.svg",
                            owner
                        })

                        const existingScores = FloorWaveScores.findOne({
                            owner,
                            server: actualBattle.server,
                            floor: actualBattle.floor
                        })

                        if (existingScores) {
                            FloorWaveScores.update(
                                {
                                    _id: existingScores._id
                                },
                                {
                                    $inc: {
                                        points: actualPointsGained + overDailyPoints
                                    }
                                }
                            )
                        } else {
                            FloorWaveScores.insert({
                                owner,
                                server: actualBattle.server,
                                username: ownerObject.name,
                                points: actualPointsGained,
                                floor: actualBattle.floor
                            })
                        }
                    }
                })

                if (totalPointsForGroup > 0) {
                    // Increment total points data
                    Floors.update(
                        {
                            floor: actualBattle.floor,
                            server: actualBattle.server,
                            floorComplete: false
                        },
                        {
                            $inc: {
                                points: totalPointsForGroup
                            }
                        }
                    )

                    // if boss should be unlocked, begin 24h timer
                    //console.log('Params to find current floor');
                    //console.log(actualBattle.floor);
                    //console.log(actualBattle.server);
                    const currentFloor = Floors.findOne({
                        floorComplete: false,
                        floor: actualBattle.floor,
                        server: actualBattle.server
                    })
                    //console.log('CurrentFloor');
                    //console.log(currentFloor);
                    if (currentFloor.points > currentFloor.pointsMax && !currentFloor.bossResetAt) {
                        const resetDate = moment().add(24, "hours").toDate()
                        Floors.update(
                            {
                                floor: actualBattle.floor,
                                server: actualBattle.server,
                                floorComplete: false
                            },
                            {
                                $set: {
                                    bossResetAt: resetDate
                                }
                            }
                        )
                    }

                    let floors = []
                    if (actualBattle.floor === 1) {
                        floors = [
                            {
                                floor: 1,
                                minChance: 1 / 32
                            }
                        ]
                    } else if (actualBattle.floor === 2) {
                        floors = [
                            {
                                floor: 1,
                                minChance: 1 / 32
                            },
                            {
                                floor: 2,
                                minChance: 1 / 48
                            }
                        ]
                    } else {
                        const floorNumbers = _.range(
                            Math.max(1, actualBattle.floor - FLOORS.floorRewardRange - 1),
                            actualBattle.floor
                        )
                        floors = floorNumbers.map((num, idx) => {
                            return { floor: num, minChance: 1 / (16 * (idx + 2)) }
                        })
                    }

                    let rewardsGained = _.flatten(
                        floors.map((floor) => {
                            let floorRewards = []

                            // Add rewards from previous rooms
                            for (let i = actualBattle.room - 1; i > 0; i--) {
                                floorRewards.push(...FLOORS[floor.floor][i].rewards)
                            }

                            floorRewards = normalizedLootTable(floorRewards, floor.minChance)
                            floorRewards.push({
                                chance: 1 / 64,
                                rewards: [{ type: "item", itemId: "enhancer_key", amount: 1 }]
                            })
                            let rewards = []

                            // Each user = additional 20% chance of loot
                            const extraChance = 1 + owners.length * 0.2 - 0.2
                            for (let i = 0; i < floorRewards.length; i++) {
                                const rewardTable = floorRewards[i]
                                const diceRoll = Math.random()
                                let autoFail = false

                                // if this was a bonus run, there's only a 10% chance to add items to the community pot
                                if (wasTotalPointsExtra) {
                                    autoFail = Math.random() >= dailyOverageMultiplier
                                }

                                if (!autoFail && rewardTable.chance * extraChance >= diceRoll) {
                                    let reward = lodash.cloneDeep(_.sample(rewardTable.rewards))
                                    if (reward.type === "gold") {
                                        reward.amount *= 12
                                    }
                                    if (reward.type !== "icon") {
                                        rewards.push(reward)
                                    }
                                    //if (rewards >= owners.length) { // note: psouza4 2018-11-07 faulty logic, should be rewards.length here, but we don't want to restrict this anyway
                                    //  break;
                                    //}
                                } else if (hasCombatGlobalBuff && rewardTable.chance * extraChance * 1.5 >= diceRoll) {
                                    let reward = lodash.cloneDeep(_.sample(rewardTable.rewards))
                                    if (reward.type === "gold") {
                                        reward.amount *= 15
                                    }
                                    if (reward.type !== "icon") {
                                        rewards.push(
                                            Object.assign({}, reward, {
                                                affectedGlobalBuff: true
                                            })
                                        )
                                    }
                                    //if (rewards >= owners.length) { // note: psouza4 2018-11-07 faulty logic, should be rewards.length here, but we don't want to restrict this anyway
                                    //  break;
                                    //}
                                }
                            }

                            return rewards
                        })
                    )

                    let floorRewards = cleanRewards(rewardsGained)
                    floorRewards.forEach((reward) => {
                        let existingReward
                        if (reward.type === "item") {
                            existingReward = FloorLoot.findOne({
                                server: actualBattle.server,
                                floor: actualBattle.floor,
                                itemId: reward.itemId
                            })
                        } else if (reward.type === "gold") {
                            existingReward = FloorLoot.findOne({
                                server: actualBattle.server,
                                floor: actualBattle.floor,
                                type: "gold"
                            })
                        }

                        if (existingReward != null) {
                            // increment
                            FloorLoot.update(existingReward._id, {
                                $inc: {
                                    amount: reward.amount
                                }
                            })
                        } else {
                            // insert
                            FloorLoot.insert({
                                server: actualBattle.server,
                                floor: actualBattle.floor,
                                ...reward
                            })
                        }
                    })
                }
            }
        } else if (actualBattle.level && actualBattle.wave) {
            // Should only be for one person? but a good habit I guess?
            owners.forEach((owner) => {
                const userObject = Users.findOne({ _id: owner })
                if (userObject.personalQuest.level === actualBattle.level) {
                    if (actualBattle.wave + 1 > 5) {
                        Users.update(owner, {
                            $set: {
                                "personalQuest.level": actualBattle.level + 1,
                                "personalQuest.wave": 1
                            }
                        })
                    } else {
                        Users.update(owner, {
                            $set: {
                                "personalQuest.wave": actualBattle.wave + 1
                            }
                        })
                    }
                }
            })
        }
    }

    // Update all player units healths

    allPlayerUnits.forEach((unit) => {
        const combatModifier = {
            $set: {
                "stats.health": unit.stats.health > 0 ? Math.floor(unit.stats.health) : 0,
                lastGameUpdated: new Date()
            }
        }

        if (unit.newContribution) {
            combatModifier["$set"].towerContributions = unit.towerContributions
        }

        if (wasThisABossFight(actualBattle)) {
            combatModifier["$set"].foughtBoss = true
        }
        if (unit.amulet) {
            combatModifier["$set"]["amulet.energy"] = unit.amulet.energy
        }

        let totalMagicXp = 0
        let spellsCastCount = 0
        let userUsedAbility = false

        /*
        let castItemsUsed = {
            poison_shard_fragment: 0,
            fire_shard_fragment: 0, complete_fire_shard: 0, ancient_fire_shard: 0,
            earth_shard_fragment: 0, complete_earth_shard: 0, ancient_earth_shard: 0,
            air_shard_fragment: 0, complete_air_shard: 0, ancient_air_shard: 0,
            water_shard_fragment: 0, complete_water_shard: 0, ancient_water_shard: 0
        }
        */

        let powerSpent = {
            fire: 0,
            earth: 0,
            air: 0,
            water: 0,
            necrotic: 0
        }

        unit.abilities.forEach((ability) => {
            if (ability.isSpell) {
                //const spellConstants = MAGIC.spells[ability.id]
                //if (spellConstants) {
                    //totalMagicXp += ability.totalCasts * spellConstants.xp
                    spellsCastCount += ability.totalCasts
                    
                    //const magicData = spellData(ability.id)
                    const magicData = ABILITIES[ability.id]?.magic // startup sets this

                    if (magicData && !magicData.error) {
                        totalMagicXp += ability.totalCasts * (magicData.fire.xp + magicData.earth.xp + magicData.air.xp + magicData.water.xp + magicData.necrotic.xp)
                        
                        /*
                        spellConstants.required.forEach((itemRequired) => {
                            if (itemRequired.type == "item") {
                                castItemsUsed[itemRequired.itemId] += ability.totalCasts
                            }
                        })
                        */
                        
                        powerSpent.fire += magicData.fire.cost.units * ability.totalCasts
                        powerSpent.earth += magicData.earth.cost.units * ability.totalCasts
                        powerSpent.air += magicData.air.cost.units * ability.totalCasts
                        powerSpent.water += magicData.water.cost.units * ability.totalCasts
                        powerSpent.necrotic += magicData.necrotic.cost.units * ability.totalCasts
                    }
                //}
            }
            if (!ability.isPassive && !ability.isEnchantment) {
                // if this unit used any non-passive/non-enchantment abilities or spells, then they're clearly not inactive
                userUsedAbility = true
            }
        })

        /*
        const itemList = [
            "poison_shard_fragment",
            "fire_shard_fragment", "complete_fire_shard", "ancient_fire_shard",
            "earth_shard_fragment", "complete_earth_shard", "ancient_earth_shard",
            "air_shard_fragment", "complete_air_shard", "ancient_air_shard",
            "water_shard_fragment", "complete_water_shard", "ancient_water_shard"
        ]
    
        itemList.forEach((itemId) => {
            const itemConsts = ITEMS[itemId]
            if (itemConsts && itemConsts.magic && itemConsts.magic.type) {
                const itemDoc = Items.findOne({
                    owner: unit.owner,
                    itemId: `${itemId}_magic_reserve`
                })
    
                if (itemDoc && itemDoc.amount > 0) {
                    const quantity = itemDoc.amount - castItemsUsed[itemId]

                    if (quantity > 0) {
                        addItem(itemId, quantity, unit.owner)
                    }
    
                    Items.remove(
                        {
                            itemId: `${itemId}_magic_reserve`,
                            owner: unit.owner
                        }
                    )
                }
            }
        })
        */

        const combatDoc = Combat.findOne({ owner: unit.owner })
        combatDoc.stats.fireReserve -= powerSpent.fire
        combatDoc.stats.earthReserve -= powerSpent.earth
        combatDoc.stats.airReserve -= powerSpent.air
        combatDoc.stats.waterReserve -= powerSpent.water
        combatDoc.stats.necroticReserve -= powerSpent.necrotic

        Combat.update(combatDoc._id, {
            $set: flattenObjectForMongo({
                owner: unit.owner,
                stats: combatDoc.stats,
                lastGameUpdated: new Date()
            })
        })

        if (totalMagicXp > 0) {
            const userClass = userCurrentClass(unit.owner)
            if (userClass?.unlocked && userClass?.equipped === "wizard") {
                totalMagicXp *= 1.25
            }

            finalTickEvents.push({
                type: "xp",
                amount: totalMagicXp,
                skill: "magic",
                owner: unit.owner
            })

            if (hasCombatGlobalBuff) {
                finalTickEvents.push({
                    type: "xp",
                    amount: (totalMagicXp * 0.2).toFixed(1),
                    skill: "magic",
                    owner: unit.owner,
                    affectedGlobalBuff: true
                })
                totalMagicXp *= 1.2
            }

            //
            // Record total number of unique spells cast per battle
            Users.update(unit.owner, {
                $inc: {
                    "stats.spellsCast": spellsCastCount
                }
            })

            addXp("magic", totalMagicXp, unit.owner)

            if (userUsedAbility) {
                markUserAsActive(unit.owner)
            }
        }

        // Update relevant stuff, use callback so this is non blocking
        Combat.update(
            {
                owner: unit.owner
            },
            combatModifier,
            (err, res) => {
                // This is intentionally empty
                // As providing a callback means this will not block the loop from continuing
                updateAbilityCooldowns(unit.owner, (err, res) => {
                    // Update ability cooldowns ect
                    const userAbilities = Abilities.findOne({
                        owner: unit.owner
                    })

                    if (userAbilities) {
                        // Modify relevant ability id cooldowns and update
                        userAbilities.learntAbilities.forEach((ability) => {
                            const abilityToUpdate = _.findWhere(unit.abilities, { id: ability.abilityId })
                            if (abilityToUpdate) {
                                if (abilityToUpdate.isSpell) {
                                    //ability.casts = abilityToUpdate.casts
                                    ability.cost
                                }
                                ability.currentCooldown = 0 // abilityToUpdate.currentCooldown; // we don't track cooldowns anymore
                            }
                        })

                        Abilities.update(userAbilities._id, {
                            $set: {
                                learntAbilities: userAbilities.learntAbilities,
                                lastGameUpdated: new Date()
                            }
                        })
                    }
                })
            }
        )
    })

    battleHandler_RecordBossDamage(actualBattle)

    const battleId = Battles.insert({
        owners: actualBattle.owners,
        finished: true,
        level: actualBattle.level,
        wave: actualBattle.wave,
        floor: actualBattle.floor,
        server: actualBattle.server,
        room: actualBattle.room,
        isExplorationRun: actualBattle.isExplorationRun,
        win,
        historyStats: actualBattle.historyStats,
        finalTickEvents,
        loot: ngRewards,
        updatedAt: new Date(),
        createdAt: new Date(),
        lootResolved: false,
        energyUse,
        battlesEquivalent: energyUseMultiplier
    })

    allPlayerUnits.forEach((unit) => {
        for (const historyStatId in actualBattle.historyStats) {
            if (historyStatId === unit.owner && actualBattle.historyStats.hasOwnProperty(historyStatId)) {
                updateCombatHistoryStats({ user: unit.owner, historyStats: actualBattle.historyStats[historyStatId] })
            }
        }
    })

    if (ngRewards.length > 0) {
        Meteor.setTimeout(() => {
            const battle = Battles.findOne({ _id: battleId })
            resolveLoot(battle)
        }, 30000)
    }

    delete actualBattle // javascript 'delete' keyword does nothing on variables, it only unsets properties on an object (try it in console)
    // see https://www.w3schools.com/js/js_object_properties.asp

    //console.log(" ####  completeBattle()  #### ");
}

JsonRoutes.add("post", "/methods/completeBattle", function (req, res, next) {
    try {
        const [battle, passphrase] = req.body
        if (passphrase !== "dqv$dYT65YrU%s") {
            JsonRoutes.sendResult(res, {
                code: 401
            })
            return
        }

        completeBattle(battle)

        JsonRoutes.sendResult(res, {
            code: 200
        })
    } catch (err) {
        console.log("Error completing battle", err)
        JsonRoutes.sendResult(res, {
            code: 500
        })
    }
})
