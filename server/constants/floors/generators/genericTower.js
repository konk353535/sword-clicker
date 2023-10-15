console.log("importing floors/generators/genericTower.js FLOORS")
import lodash from "lodash"
import uuid from "node-uuid"
import _ from "underscore"
import { ENEMIES } from "../../enemies/index"
import { FLOORS } from "../../floors/index"

console.log("exporting floors/generators/genericTower.js genericTowerMonsterGenerator")
export const genericTowerMonsterGenerator = function (floor, room) {
    const allMonsters = FLOORS[floor][room].enemies
    const totalUnits = allMonsters.length
    const newMonsters = []

    allMonsters.forEach((selectedMonsterId) => {
        const selectedMonster = ENEMIES[selectedMonsterId]

        // 'Good Enough', for now
        const monster = {
            id: selectedMonster.id,
            icon: selectedMonster.icon,
            name: selectedMonster.name,
            buffs: lodash.cloneDeep(selectedMonster.buffs || []),
            stats: {
                health: (room / 1.2) * 30 * floor * (1 + floor / 2.3) * (1 / totalUnits),
                healthMax: (room / 1.2) * 30 * floor * (1 + floor / 2.3) * (1 / totalUnits),
                attack: (room / 1.8) * 3.8 * floor * (1 + floor / 2.3),
                attackMax: (room / 1.8) * 4.75 * floor * (1 + floor / 2.3),
                magicPower: (room / 1.8) * 2.5 * floor * (1 + floor / 2.3),
                attackSpeed: 0.6 + room / 30,
                //accuracy: ((floor * 2) + (room / 4) * 6.5 * (floor * 1.1)), // old and somewhat weak vs modern defense
                accuracy: floor * 3 + (room / 3.5) * 7.5 * (floor * 1.2), // old and somewhat weak vs modern defense
                armor: (room / 2.4) * 25 * (floor / 3.5),
                //defense: ((floor * 2) + (room / 4) * 6.5 * (floor * 1.1)), // old and fairly weak vs modern accuracy
                defense: floor * 2 + (room / 5) * 8.5 * (floor * 1.9),
                // magicArmor: (room / 1.2) * 1.5 * floor * (1 + (floor / 3.3)), // old and extremely powerful at high floors
                magicArmor: (room / 2) * 25 * (floor / 3),
                //criticalChance: 0, // old, raised difficulty slightly by giving all monsters a 1% chance to crit
                criticalChance: 1,
                criticalDamage: 2,
                damageTaken: 1,
                force: 0,
                shred: 0,
                focus: 0
            },
            rewards: []
        }

        if (floor >= 16) {
            const tweakedFloor = floor - 15
            monster.stats.force = tweakedFloor // 1% - 12% from floors 16 - 27
            monster.stats.shred = (room / 2.4) * 25 * (tweakedFloor / 4) // armor formula
            monster.stats.focus = (room / 2) * 25 * (tweakedFloor / 3) // magic armor formula
        }

        if (selectedMonster.statBuffs) {
            selectedMonster.statBuffs.forEach((statBuff) => {
                if (statBuff.type === "plus") {
                    monster.stats[statBuff.key] += statBuff.amount
                } else if (statBuff.type === "times") {
                    monster.stats[statBuff.key] *= statBuff.amount
                }
            })
        }

        // Is this a swarm mob?
        if (selectedMonster.swarmRange) {
            const unitCount = _.random(selectedMonster.swarmRange[0], selectedMonster.swarmRange[1])
            // Divide monsters health
            monster.stats.health /= unitCount // Divide health evenly
            monster.stats.health *= 1.2 // To account for aoe
            monster.stats.attack /= unitCount
            monster.stats.attackMax /= unitCount
            monster.stats.attack *= 1.2
            monster.stats.attackMax *= 1.2

            monster.stats.healthMax = monster.stats.health
            for (let i = 0; i < unitCount; i++) {
                const monsterClone = lodash.cloneDeep(monster)
                monsterClone.id = uuid.v4()
                newMonsters.push(monsterClone)
            }
        } else {
            newMonsters.push(monster)
        }
    })

    return newMonsters
}

// increased difficulty based on combatant stats
export const topFloorTowerMonsterGenerator = function (floor, room, adjustedFloorLevel, extraData_in) {
    const allMonsters = FLOORS[floor][room].enemies
    const totalUnits = allMonsters.length
    const newMonsters = []
    const extraData = Object.assign({}, extraData_in)

    allMonsters.forEach((selectedMonsterId) => {
        const selectedMonster = ENEMIES[selectedMonsterId]

        // 'Good Enough', for now
        const monster = {
            id: selectedMonster.id,
            icon: selectedMonster.icon,
            name: selectedMonster.name,
            buffs: lodash.cloneDeep(selectedMonster.buffs || []),
            stats: {
                health: (room / 1.2) * 30 * adjustedFloorLevel * (1 + adjustedFloorLevel / 2.3) * (1 / totalUnits),
                healthMax: (room / 1.2) * 30 * adjustedFloorLevel * (1 + adjustedFloorLevel / 2.3) * (1 / totalUnits),
                attack: (room / 1.8) * 3.8 * adjustedFloorLevel * (1 + adjustedFloorLevel / 2.3),
                attackMax: (room / 1.8) * 4.75 * adjustedFloorLevel * (1 + adjustedFloorLevel / 2.3),
                magicPower: (room / 1.8) * 2.5 * ((floor + adjustedFloorLevel) / 2.0) * (1 + ((floor + adjustedFloorLevel) / 2.0) / 2.3),
                attackSpeed: 0.6 + room / 30,
                //accuracy: ((floor * 2) + (room / 4) * 6.5 * (floor * 1.1)), // old and somewhat weak vs modern defense
                accuracy: adjustedFloorLevel * 3 + (room / 3.5) * 7.5 * (adjustedFloorLevel * 1.2), // old and somewhat weak vs modern defense
                armor: (room / 2.4) * 25 * (adjustedFloorLevel / 3.5),
                //defense: ((floor * 2) + (room / 4) * 6.5 * (floor * 1.1)), // old and fairly weak vs modern accuracy
                defense: adjustedFloorLevel * 2 + (room / 5) * 8.5 * (adjustedFloorLevel * 1.9),
                // magicArmor: (room / 1.2) * 1.5 * floor * (1 + (floor / 3.3)), // old and extremely powerful at high floors
                magicArmor: (room / 2) * 25 * (adjustedFloorLevel / 3),
                //criticalChance: 0, // old, raised difficulty slightly by giving all monsters a 1% chance to crit
                criticalChance: 1,
                criticalDamage: 2,
                damageTaken: 1,
                force: 0,
                shred: 0,
                focus: 0,
                absorption: 0
            },
            rewards: []
        }

        if (floor >= 16) {
            const tweakedFloor = adjustedFloorLevel - 15
            monster.stats.force = tweakedFloor // 1% - 12% from floors 16 - 27
            monster.stats.shred = (room / 2.4) * 25 * (tweakedFloor / 4) // armor formula
            monster.stats.focus = (room / 2) * 25 * (tweakedFloor / 3) // magic armor formula
        }

        // more buffing from Pete
        if (extraData && extraData.hasPlayers) {
            // enemies gets a bonus to damage = 50% the average of all player units' average damage
            monster.stats.attack += extraData.avgDamage * 0.5 * room/8
            monster.stats.attack = Math.ceil(monster.stats.attack)

            // enemies gets a bonus to defense = 33% the average of all player units' accuracy
            monster.stats.defense += extraData.avgAccuracy * 0.3333 * room/8
            monster.stats.defense = Math.ceil(monster.stats.defense)

            // enemies gets a bonus to accuracy = 25% the average of all player units' defense
            monster.stats.accuracy += extraData.avgDefenseStat * 0.25 * room/8
            monster.stats.accuracy = Math.ceil(monster.stats.accuracy)

            // enemies gets a bonus to armor = 5% the average of all player units' armor
            monster.stats.armor += extraData.avgPArmor * 0.05 * room/8
            monster.stats.armor = Math.ceil(monster.stats.armor)
            
            // enemies gets a bonus to magic armor = 1% the average of all player units' magic armor
            monster.stats.magicArmor += extraData.avgMArmor * 0.01 * room/8
            monster.stats.magicArmor = Math.ceil(monster.stats.magicArmor)

            // enemies gets a bonus to force = 50% the average of all player units' defense
            // enemies gets a bonus to shred = 35% the average of all player units' armor
            // enemies gets a bonus to focus = 35% the average of all player units' magic armor
            monster.stats.force += extraData.avgDefenseStat * 0.50 * room/7
            monster.stats.shred += extraData.avgDefenseStat * 0.35 * room/7
            monster.stats.focus += extraData.avgMArmor * 0.35 * room/7
            monster.stats.force = Math.ceil(monster.stats.force)
            monster.stats.shred = Math.ceil(monster.stats.shred)
            monster.stats.focus = Math.ceil(monster.stats.focus)

            // instead of usual attack speed, raise it by +20%
            monster.stats.attackSpeed *= 1.2

            // instead of 0% damage soak, raise to 20%
            monster.stats.damageTaken -= 0.2 * room/7
            if (monster.stats.damageTaken < 0.2) {
                monster.stats.damageTaken = 0.2
            }
        }

        if (selectedMonster.statBuffs) {
            selectedMonster.statBuffs.forEach((statBuff) => {
                if (statBuff.type === "plus") {
                    monster.stats[statBuff.key] += statBuff.amount
                } else if (statBuff.type === "times") {
                    monster.stats[statBuff.key] *= statBuff.amount
                }
            })
        }

        // Is this a swarm mob?
        if (selectedMonster.swarmRange) {
            const unitCount = _.random(selectedMonster.swarmRange[0], selectedMonster.swarmRange[1])
            // Divide monsters health
            monster.stats.health /= unitCount // Divide health evenly
            monster.stats.health *= 1.2 // To account for aoe
            monster.stats.attack /= unitCount
            monster.stats.attackMax /= unitCount
            monster.stats.attack *= 1.2
            monster.stats.attackMax *= 1.2

            monster.stats.healthMax = monster.stats.health
            for (let i = 0; i < unitCount; i++) {
                const monsterClone = lodash.cloneDeep(monster)
                monsterClone.id = uuid.v4()
                newMonsters.push(monsterClone)
            }
        } else {
            newMonsters.push(monster)
        }
    })

    return newMonsters
}