import { Meteor } from "meteor/meteor"
import { HTTP } from "meteor/http"

import { BUFFS } from "/imports/constants/buffs/index"
import { BATTLES } from "/server/constants/battles/index.js" // List of encounters
import { ABILITIES, COMBAT } from "/server/constants/combat/index.js" // List of available combat stats
import { ENEMIES } from "/server/constants/enemies/index.js" // List of enemies
import { FLOORS } from "/server/constants/floors/index.js" // List of floor details

import lodash from "lodash"
import moment from "moment"
import uuid from "node-uuid"
import _ from "underscore"

import { Abilities } from "/imports/api/abilities/abilities"
import { Adventures } from "/imports/api/adventures/adventures"
import { BattlesList } from "/imports/api/battles/battles"
import { userCurrentClass } from "/imports/api/classes/classes.js"
import { Combat } from "/imports/api/combat/combat"
import { Groups } from "/imports/api/groups/groups"
import { Items } from "/imports/api/items/items"
import { Skills } from "/imports/api/skills/skills"
import { Users, classFeatureUnlocked } from "/imports/api/users/users"

import { env } from "/server/validateEnv"
import { fixupBuffText } from "/server/battleUtils"

import { getBuffLevel } from "/imports/api/globalbuffs/globalbuffs.js"
import { CInt, IsValid } from "/imports/utils.js"

export const startBattle = function ({
    floor,
    room,
    level,
    wave,
    health,
    isTowerContribution,
    isExplorationRun,
    isOldBoss,
    server,
    energyUse,
    currentCommunityFloor
}) {
    const wantDebug = false

    console.log("method - startBattle - start", moment().format("LLL hh:mm:ss SSS"))
    console.log("energyUse:", energyUse)

    if (!IsValid(energyUse)) {
        energyUse = 1
    }

    let battleData = { enemies: [] }

    // Is user in a group? If so this is a group battle
    const currentGroup = Groups.findOne({
        members: Meteor.userId()
    })

    let battleParticipants = [Meteor.userId()]
    if (currentGroup && currentGroup.leader !== Meteor.userId() && !currentGroup.allowAnyStartCombat) {
        throw new Meteor.Error("not-leader", "You must be the leader to start a battle in a group")
    } else if (currentGroup) {
        battleParticipants = currentGroup.members
    }

    // Ensure battle participants aren't already in a battle
    const currentBattle = BattlesList.findOne({ owners: battleParticipants })
    if (currentBattle) {
        throw new Meteor.Error("in-battle", "You cannot start a battle while anyone in your group is still in one.")
    }

    let useStreamy = false

    // Ensure battle participants don't have any active adventures

    let adventurePlayers = ""

    // Loop through each participant, check for adventure adventures.
    battleParticipants.forEach((participant) => {
        const activeAdventures = Adventures.findOne({
            owner: {
                $in: [participant]
            },
            adventures: {
                $elemMatch: {
                    endDate: {
                        $gt: new Date()
                    }
                }
            }
        })

        // If active adventure found, add name to string displayed to leader
        if (activeAdventures) {
            const userDoc = Users.findOne({ _id: participant })

            if (activeAdventures) {
                adventurePlayers += adventurePlayers === "" ? userDoc.username : ", " + userDoc.username
            }
        }
    })

    /*
  // Original method, checks all participants at once, but doesn't identify them.
  const activeAdventures = Adventures.findOne({
    owner: {
      $in: battleParticipants
    },
    adventures: {
      $elemMatch :{
        endDate: {
          $gt: new Date()
        }        
      }
    }
  });
  */

    if (adventurePlayers !== "") {
        throw new Meteor.Error(
            "in-battle",
            "You cannot start a battle while " + adventurePlayers + " in your group is in an adventure"
        )
    }

    // Ensure group size is not too large
    if (currentGroup) {
        if (room === "boss") {
            if (currentGroup.members.length > BATTLES.maxBossPartySize) {
                throw new Meteor.Error(
                    "too-large",
                    `Your party is too large, maximum party size for boss fights is ${BATTLES.maxBossPartySize}`
                )
            }
        } else {
            if (currentGroup.members.length > BATTLES.maxTowerPartySize) {
                throw new Meteor.Error(
                    "too-large",
                    `Your party is too large, maximum party size for tower fights is ${BATTLES.maxTowerPartySize}`
                )
            }
        }
    }

    // check town buff level for perks
    const townBuffArmoryLevel = getBuffLevel("town_armory")

    const newBattle = {
        createdAt: new Date(),
        updatedAt: new Date(),
        owners: battleParticipants,
        floor,
        room,
        wave,
        level,
        historyStats: {},
        isTowerContribution,
        isExplorationRun,
        tickEvents: [],
        units: [],
        useStreamy,
        enemies: [],
        tbl: CInt(townBuffArmoryLevel)
    }

    // Battle participants combat stats
    const usersCombatStats = Combat.find({
        owner: {
            $in: battleParticipants
        }
    }).fetch()

    let hasEnergy = true
    let battleEnergyCost = (COMBAT.energyConsumption[room] || 1) * energyUse

    if (isOldBoss) {
        battleEnergyCost = 5
    }

    // Ensure users have energy requirements + haven't already fought boss
    usersCombatStats.forEach((userCombat) => {
        if (userCombat.stats.energy < battleEnergyCost) {
            hasEnergy = false
            const requirementString = `${userCombat.username} does not have enough energy to start this battle`
            throw new Meteor.Error("not-enough-energy", requirementString)
        }

        //if (userCombat.meditatingStartDate) {
        //  throw new Meteor.Error("is-meditating", `${userCombat.username} is meditating. You cannot battle while meditating`);
        //}

        if (health && !isOldBoss && userCombat.foughtBoss) {
            hasEnergy = false
            throw new Meteor.Error("already-fought-boss", "You can only fight the boss once a day")
        }
    })

    const usersData = Users.find({
        _id: {
            $in: battleParticipants
        }
    }).fetch()

    // screen for too many abilities in someone's loadout
    let invalidLoadoutsMessage = ""
    usersCombatStats.forEach((userCombat) => {
        const targetUser = usersData.find((userData) => userData._id === userCombat.owner)

        let companionTokens = 0
        const companionTokensDoc = Items.findOne({
            owner: userCombat.owner,
            itemId: "companion_token"
        })
        if (companionTokensDoc && companionTokensDoc.amount) {
            companionTokens += CInt(companionTokensDoc.amount)
        }

        const userCombatStats = {}
        COMBAT.statsArr.forEach((statName) => {
            if (userCombat.stats[statName] !== undefined) {
                userCombatStats[statName] = userCombat.stats[statName]
            }
        })

        // Fetch this users currently equipped abilities
        const usersAbilities = Abilities.findOne({
            owner: userCombat.owner
        })

        const now = moment()
        const secondsElapsed = moment.duration(now.diff(usersAbilities.lastGameUpdated)).asSeconds()
        let broughtCompanion = false

        let abilityCount = 0
        const usersEquippedAbilities = usersAbilities.learntAbilities
            .filter((ability) => {
                // only allow abilities that are equipped
                if (!ability.equipped) {
                    return false
                }

                // get some constants
                const abilityConstants = ABILITIES[ability.abilityId]
                if (!abilityConstants) {
                    return false
                }

                // don't allow companion abilities without tokens to spend on them
                if (abilityConstants.slot === "companion") {
                    if (CInt(floor) === 0 || companionTokens === 0) {
                        return false
                    }

                    broughtCompanion = true
                } else {
                    abilityCount++

                    if (wantDebug) {
                        console.log(`Ability '${ability.abilityId}' for '${targetUser.username}', count ${abilityCount}`)
                    }

                    // non-companion ability loadout limit is 5, or 8 if they've unlocked the Classes feature
                    if (abilityCount > 5 && !classFeatureUnlocked(targetUser._id)) {
                        if (invalidLoadoutsMessage.indexOf(targetUser.username) === -1) {
                            if (invalidLoadoutsMessage !== "") {
                                invalidLoadoutsMessage += ", "
                            }
                            invalidLoadoutsMessage += targetUser.username
                        }
                        return false
                    } else if (abilityCount > 8) {
                        if (invalidLoadoutsMessage.indexOf(targetUser.username) === -1) {
                            if (invalidLoadoutsMessage !== "") {
                                invalidLoadoutsMessage += ", "
                            }
                            invalidLoadoutsMessage += targetUser.username
                        }
                        return false
                    }
                }

                return true
            })
            .map((ability) => {
                if (ability.currentCooldown > 0) {
                    ability.currentCooldown -= secondsElapsed
                }

                return {
                    id: ability.abilityId,
                    level: ability.level,
                    currentCooldown: 0, // ability.currentCooldown || 0,  /* note: set this to 0 in case they 'go too fast' */
                    casts: ability.casts,
                    totalCasts: 0,
                    isSpell: ability.isSpell,
                    isPacifist: ability.isPacifist
                }
            })
    })

    if (invalidLoadoutsMessage !== "") {
        throw new Meteor.Error(
            "loadout-error",
            `The following party members have invalid ability loadouts (too many abilities): ${invalidLoadoutsMessage}`
        )
    }

    let avgOffense = 0
    let avgDefense = 0

    // Inject users into battles units
    usersCombatStats.forEach((userCombat) => {
        const targetUser = usersData.find((userData) => userData._id === userCombat.owner)

        let companionTokens = 0
        const companionTokensDoc = Items.findOne({
            owner: userCombat.owner,
            itemId: "companion_token"
        })
        if (companionTokensDoc && companionTokensDoc.amount) {
            companionTokens += CInt(companionTokensDoc.amount)
        }

        let userCombatStats = {}
        COMBAT.statsArr.forEach((statName) => {
            if (userCombat.stats[statName] !== undefined) {
                userCombatStats[statName] = userCombat.stats[statName]
            }
        })

        // Fetch this users currently equipped abilities
        const usersAbilities = Abilities.findOne({
            owner: userCombat.owner
        })

        const now = moment()
        const secondsElapsed = moment.duration(now.diff(usersAbilities.lastGameUpdated)).asSeconds()
        let broughtCompanion = false

        let abilityCount = 0
        const usersEquippedAbilities = usersAbilities.learntAbilities
            .filter((ability) => {
                // only allow abilities that are equipped
                if (!ability.equipped) {
                    return false
                }

                // get some constants
                const abilityConstants = ABILITIES[ability.abilityId]
                if (!abilityConstants) {
                    return false
                }

                // don't allow companion abilities without tokens to spend on them
                if (abilityConstants.slot === "companion") {
                    if (CInt(floor) === 0 || companionTokens === 0) {
                        return false
                    }

                    broughtCompanion = true
                } else {
                    // non-companion ability loadout limit is 5, or 8 if they've unlocked the Classes feature (should already be filtered, but just in case...)
                    if ((abilityCount >= 5) && (!classFeatureUnlocked(targetUser._id))) {
                        return false
                    } else if (abilityCount >= 8) {
                        return false
                    }
                }

                return true
            })
            .map((ability) => {
                if (ability.currentCooldown > 0) {
                    ability.currentCooldown -= secondsElapsed
                }

                return {
                    id: ability.abilityId,
                    level: ability.level,
                    currentCooldown: 0, // ability.currentCooldown || 0,  /* note: set this to 0 in case they 'go too fast' */
                    casts: ability.casts,
                    totalCasts: 0,
                    isSpell: ability.isSpell,
                    isPacifist: ability.isPacifist
                }
            })

        // consume a companion token to bring a companion
        if (companionTokensDoc) {
            if (broughtCompanion) {
                companionTokens--
                if (companionTokens === 0) {
                    Items.remove(companionTokensDoc._id)
                } else {
                    Items.update({ _id: companionTokensDoc._id }, { $inc: { amount: -1 } })
                }
            }
        }

        const usersSkills = Skills.find({
            owner: userCombat.owner
        }).fetch()

        const usersSkillsArray = usersSkills.map((skill) => {
            return {
                id: skill._id,
                type: skill.type,
                xp: skill.xp,
                totalXp: skill.totalXp,
                level: skill.level
            }
        })

        const offense = lodash.maxBy(
            usersSkills.filter((skill) => skill.type === "attack" || skill.type === "magic"),
            (skill) => skill.level
        )
        const defense = lodash.maxBy(
            usersSkills.filter((skill) => skill.type === "defense" || skill.type === "health"),
            (skill) => skill.level
        )
        avgOffense += offense.level
        avgDefense += defense.level

        let inactiveMinutes = 99999
        if (targetUser.lastActivity) {
            inactiveMinutes = Math.round(moment().diff(moment(targetUser.lastActivity), "minutes"))
        }

        let thisUnitClass = userCurrentClass(userCombat.owner).data
        thisUnitClass.reforge = {} // the battle node does not need this data and it can be a lot

        if (thisUnitClass?.id === "barbarian") {
            userCombatStats.magicPower = 0
        }

        const newUnit = {
            id: userCombat.owner,
            owner: userCombat.owner,
            battleSecret: targetUser.battleSecret,
            towerContributions: userCombat.towerContributions,
            isTowerContribution: userCombat.isTowerContribution,
            abilities: usersEquippedAbilities,
            name: userCombat.username || "Unnamed",
            amulet: userCombat.amulet,
            buffs: [],
            mainHandWeapon: userCombat.mainHandWeapon,
            mainHandType: userCombat.mainHandType,
            offHandType: userCombat.offHandType,
            offHandIsMagic: userCombat.offHandIsMagic,
            stats: userCombatStats,
            xpDistribution: userCombat.xpDistribution,
            tickOffset: _.random(0, 2) + 4,
            icon: userCombat.characterIcon || "character.svg",
            skills: usersSkillsArray,
            inactiveMinutes: inactiveMinutes,
            enchantmentsList: [],
            currentClass: thisUnitClass
        }

        // apply enchantment effects (these will be collected, removed, and re-applied at the start of combat so that they are applied after passives
        // tried applying passives above first, but they wouldn't function correctly

        // class auto-buffs apply first and are guaranteed to be an array (not undefined)
        userCombat.enchantments = Object.assign({ autoBuffs: [] }, newUnit.currentClass).autoBuffs.concat((userCombat.enchantments) ? userCombat.enchantments : [])

        if (userCombat.enchantments) {
            if (wantDebug) {
                console.log("START :: startbattle player enchantments");
                console.log(userCombat.enchantments);
            }

            userCombat.enchantments.forEach((buffId) => {
                const enchantConstants = BUFFS[buffId]
                if (enchantConstants) {
                    if (wantDebug) {
                        console.log("now adding enchantment: " + buffId);
                    }

                    const clonedConstants = enchantConstants

                    let durationToUse = Infinity
                    if (IsValid(clonedConstants.data.durationTotal)) {
                        durationToUse = clonedConstants.data.durationTotal
                    } else if (IsValid(clonedConstants.data.totalDuration)) {
                        durationToUse = clonedConstants.data.totalDuration
                    } else if (IsValid(clonedConstants.data.duration)) {
                        durationToUse = clonedConstants.data.duration
                    }

                    if (wantDebug) {
                        console.log("duration to use:", durationToUse);
                    }

                    let newBuff = {
                        id: buffId,
                        icon: clonedConstants.icon,
                        name: clonedConstants.name,
                        data: clonedConstants.data,
                        duration: durationToUse,
                        totalDuration: durationToUse
                    }

                    newBuff.data.id = clonedConstants.id || buffId
                    newBuff.data.name = clonedConstants.name
                    newBuff.data.icon = clonedConstants.icon
                    newBuff.data.description = ""
                    if (clonedConstants.description) {
                        if (_.isFunction(clonedConstants.description)) {
                            newBuff.data.description = clonedConstants.description({ buff: clonedConstants, level: 1 }) // hardcoded -- enchantments don't have levels
                        } else {
                            newBuff.data.description = clonedConstants.description
                        }
                    }
                    newBuff.data.duration = durationToUse
                    newBuff.data.totalDuration = durationToUse
                    newBuff.duration = durationToUse
                    newBuff.totalDuration = durationToUse

                    const fixedBuff = fixupBuffText(newBuff, userCombat)
                    newBuff.data.name = fixedBuff.data.name
                    newBuff.data.description = fixedBuff.data.description

                    newUnit.buffs.push(newBuff)
                }
            })

            if (wantDebug) {
                console.log("END :: startbattle player enchantments");
            }
        }

        newUnit.enchantmentsList = Object.assign({}, newUnit.enchantmentsList, userCombat.enchantments)

        if (wantDebug) {
            console.log("startbattle, all enchants", newUnit.enchantmentsList);
        }

        newBattle.units.push(newUnit)
        newBattle.historyStats[newUnit.id] = {
            name: newUnit.name,
            damageDone: 0,
            damageTaken: 0,
            healingDone: 0,
            damageMitigated: 0,
            attacksDodged: 0,
            damageDoneCompanion: 0,
            damageTakenCompanion: 0,
            healingDoneCompanion: 0
        }
    })

    avgOffense /= usersData.length
    avgDefense /= usersData.length

    // calculate overall user average combat level
    const overallAverageCombat = (avgOffense + avgDefense) / 2
    let adjustedFloorLevel = floor
    // The rough calculation is that each floor increases combat level by ~5
    const averageCombatFloor = overallAverageCombat / 5
    if (floor != null && averageCombatFloor > floor) {
        // clamp max adjustment to +4 floors for sanity
        adjustedFloorLevel = Math.min(averageCombatFloor, floor + 3)
    }

    if (wantDebug && adjustedFloorLevel) {
        console.log("overallAverageCombat", overallAverageCombat, "adjustedFloorLevel", adjustedFloorLevel)
    }

    let hasPlayers = false
    let avgDefenseStat = 0
    let avgAccuracy = 0
    let avgPArmor = 0
    let avgMArmor = 0
    let avgDamage = 0

    if (newBattle.units && newBattle.units.length > 0) {
        hasPlayers = true

        newBattle.units.forEach((unit) => {
            avgDamage += unit.stats.attack + (unit.stats.attackMax / 2)
            avgDefenseStat += unit.stats.defense
            avgAccuracy += unit.stats.accuracy
            avgPArmor += unit.stats.armor
            avgMArmor += unit.stats.magicArmor
        })

        avgDamage /= newBattle.units.length
        avgAccuracy /= newBattle.units.length
        avgDefenseStat /= newBattle.units.length
        avgPArmor /= newBattle.units.length
        avgMArmor /= newBattle.units.length
    } else {
        console.log("!! WARNING !!  this battle contains no player units")
    }

    if (level) {
        // Is personalQuest (To Do)
        battleData.enemies = FLOORS.personalQuestMonsterGenerator(level, wave)
    } else if (room === 0) {
        // Is tower explore (To Do)
        // Does this do anything?

        // Pete's note: this never does anything because isExplorationRun is true and room = 1 for full floor runs
        battleData.enemies.push(FLOORS.easyTowerMonsterGenerator(floor))
    } else if (room >= 1 && room <= 7) {
        // Is tower room specific
        if (floor != null && currentCommunityFloor != null && floor === currentCommunityFloor) {
            console.log("doing top floor adjustment")
            battleData.enemies = FLOORS.topFloorTowerMonsterGenerator(floor, room, adjustedFloorLevel, { hasPlayers, playerCount: (hasPlayers ? newBattle.units.length : 0), avgDamage, avgAccuracy, avgDefenseStat, avgPArmor, avgMArmor })
        } else {
            console.log("doing normal floor generator")
            battleData.enemies = FLOORS.genericTowerMonsterGenerator(floor, room)
        }
    } else if (room === "boss") {
        // Is tower BOSS (To Do)
        const boss = FLOORS[floor].boss.enemy
        boss.monsterType = boss.id
        battleData.enemies.push(boss)
    }

    if (!hasEnergy) {
        return
    }

    // Create clone of battle objects
    let battleConstants = lodash.cloneDeep(battleData)

    let totalXpGain = 0
    let hasBoss = false

    // Inject enemies into the battle
    battleConstants.enemies.forEach((enemy) => {
        let enemyConstants

        // If this is a dynamic mob, it will already have stats
        if (enemy.stats) {
            enemyConstants = enemy
        } else {
            enemyConstants = lodash.cloneDeep(ENEMIES[enemy.id])
        }

        const enemyStats = enemyConstants.stats

        if (enemyConstants.isBoss) {
            hasBoss = true
        }

        // This is the current active boss battle (and it's still alive)
        if (enemyConstants.isBoss && health) {
            console.log("***  Battle is a _BOSS_ and is being given some basic damage resistance  ***")

            if (wantDebug) {
                console.log(`Average combat stats: dmg ${avgDamage.toFixed(0)}, acc ${avgAccuracy.toFixed(0)}, def ${avgDefenseStat.toFixed(0)}, Par ${avgPArmor.toFixed(0)}, Mar ${avgMArmor.toFixed(0)}`)
            }

            const floorPercent = 1 - (env.MAX_FLOOR - floor) / env.MAX_FLOOR
            enemyStats.health = health
            enemyStats.healthMax = health
            enemyStats.damageTaken = 0.3
            enemyStats.attackSpeed = enemyStats.attackSpeed || 0.7
            enemyStats.force = floorPercent * 8 + 3 // scaling from 3% - 11% based on floor number, defense formula
            enemyStats.shred = floorPercent * 8 + 3 // scaling from 3% - 11% based on floor number, armor formula
            enemyStats.focus = floorPercent * 8 + 3 // scaling from 3% - 11% based on floor number, magic armor formula

            if (!isOldBoss && hasPlayers) {
                console.log("***  Battle is a _CURRENT_FLOOR_BOSS_ and is being given some *extreme* stat boosts  ***")
                
                if (wantDebug) {
                    console.log("Before:")
                    console.log(enemyStats)
                }

                // boss gets a bonus to damage = 150% the average of all player units' average damage
                enemyStats.attack += avgDamage * 1.5
                enemyStats.attack = Math.ceil(enemyStats.attack)

                // boss gets a bonus to defense = 100% the average of all player units' accuracy
                enemyStats.defense += avgAccuracy
                enemyStats.defense = Math.ceil(enemyStats.defense)

                // boss gets a bonus to accuracy = 75% the average of all player units' defense
                enemyStats.accuracy += avgDefenseStat * 0.75
                enemyStats.accuracy = Math.ceil(enemyStats.accuracy)

                // boss gets a bonus to armor = 125% the average of all player units' armor
                enemyStats.armor += avgPArmor * 1.25
                enemyStats.armor = Math.ceil(enemyStats.armor)
                
                // boss gets a bonus to magic armor = 75% the average of all player units' magic armor
                enemyStats.magicArmor += avgMArmor * 0.75
                enemyStats.magicArmor = Math.ceil(enemyStats.magicArmor)

                // boss gets a bonus to shred = 75% the average of all player units' armor
                // boss gets a bonus to focus = 75% the average of all player units' magic armor
                enemyStats.shred += avgDefenseStat * 0.75
                enemyStats.shred = Math.ceil(enemyStats.shred)
                enemyStats.focus += avgMArmor * 0.75
                enemyStats.focus = Math.ceil(enemyStats.focus)

                // instead of usual force, raise it by +15%
                enemyStats.force += 15

                // instead of usual attack speed, raise it by +50%
                enemyStats.attackSpeed *= 1.5

                // instead of 70% damage soak, raise to 80%
                enemyStats.damageTaken = 0.2

                if (wantDebug) {
                    console.log("After:")
                    console.log(enemyStats)
                }
            }
        }

        if (enemyConstants.isBoss && isOldBoss) {
            enemyStats.accuracy += 20
        }

        if (!enemy.amount) {
            enemy.amount = 1
        }

        for (let i = 0; i < enemy.amount; i++) {
            const randomUnitTarget = _.sample(newBattle.units)
            totalXpGain += BATTLES.xpGain(enemyStats, enemyConstants.buffs)
            newBattle.enemies.push({
                id: uuid.v4(),
                monsterType: enemy.id,
                stats: enemyStats,
                icon: enemyConstants.icon,
                buffs: enemyConstants.buffs || [],
                target: randomUnitTarget.id,
                enemyId: enemyConstants.id,
                name: enemyConstants.name,
                tickOffset: _.random(0, 2) + 4,
                isBoss: enemyConstants.isBoss
            })
        }
    })

    if (isOldBoss) {
        totalXpGain *= 0.5
    }

    // Make random targets for units
    newBattle.units.forEach((unit) => {
        const randomEnemyTarget = _.sample(newBattle.enemies)
        unit.target = randomEnemyTarget.id
    })

    newBattle.totalXpGain = totalXpGain
    newBattle.isOldBoss = isOldBoss
    newBattle.deadUnits = []
    newBattle.deadEnemies = []
    newBattle.adjustedFloorLevel = adjustedFloorLevel
    newBattle.currentCommunityFloor = currentCommunityFloor

    // Is the currently active boss battle
    if (health) {
        newBattle.startingBossHp = health
    }

    const battleListData = {
        owners: newBattle.owners,
        createdAt: new Date(),
        activated: false,
        isBigBoss: hasBoss && !newBattle.isOldBoss ? true : false,
        energyUse
    }

    if (currentGroup) {
        battleListData.group = currentGroup._id
    }

    // Save battle
    const actualBattleId = BattlesList.insert(battleListData)

    if (currentGroup) {
        Groups.update(
            {
                _id: currentGroup._id
            },
            {
                $set: {
                    battleCount: currentGroup.battleCount ? currentGroup.battleCount + 1 : 1,
                    floor,
                    lastBattleStarted: new Date(),
                    inBattle: true
                }
            }
        )
    }

    newBattle.tick = 0
    newBattle._id = actualBattleId
    newBattle.server = server

    const actualBattle = newBattle
    actualBattle.enemies.forEach((enemy) => {
        enemy.isEnemy = true
    })

    // Take energy from all members
    Combat.update(
        {
            owner: {
                $in: battleParticipants
            }
        },
        {
            $inc: {
                "stats.energy": battleEnergyCost * -1
            }
        },
        { multi: true }
    )

    let balancer = Meteor.userId()
    if (currentGroup) {
        balancer = currentGroup.balancer
    }

    console.log("method - startBattle - end", moment().format("LLL hh:mm:ss SSS"))

    // Send battle to socket server
    // TODO: Make sure this call is encrypted in some way. Encrypt the battle?
    // Otherwise MIM attack compromises the security of the system

    HTTP.call(
        "POST",
        `${Meteor.settings.public.battleUrl}/battle?balancer=${balancer}&userId=SERVER&userName=manual.startBattle`,
        {
            data: { battle: actualBattle, passphrase: "dqv$dYT65YrU%s", balancer }
        },
        (error, result) => {
            console.log("method - startBattle - made to battle node", moment().format("LLL hh:mm:ss SSS"))

            BattlesList.update(
                {
                    _id: actualBattle._id
                },
                {
                    $set: {
                        activated: true
                    }
                }
            )
        }
    )
}
