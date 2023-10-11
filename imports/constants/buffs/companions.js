import lodash from "lodash"
import uuid from "node-uuid"
import _ from "underscore"

import { addBuff, lookupBuff } from "../../battleUtils"
import { CDbl, autoPrecisionValue } from "../../utils.js"

// combat node/server doesn't have access to database or schema
//import { Users } from '/imports/api/users/users';
//import { Groups } from '/imports/api/groups/groups';
//import { Chats } from 'meteor/cesarve:simple-chat/collections';

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1
    }
}

export const getCompanionOwner = function getCompanionOwner(companion) {
    let owner_id = companion.id
    if (companion.isCompanion) {
        try {
            if (companion.owner.endsWith("_companion")) {
                owner_id = companion.owner.substring(0, companion.owner.length - 10)
            }
        } catch (err) {}
    }
    return owner_id
}

const notifyChangeForUnitProperty = function notifyChangeForUnitProperty({ unit, property, actualBattle }) {
    try {
        const event = {
            type: "abs",
            path: `unitsMap.${unit.id}.${property}`,
            value: unit[property]
        }

        actualBattle.deltaEvents.push(event)
    } catch (err) {}
}

export const companionEvent = function companionEvent({ actualBattle, companion, target, info, color }) {
    if (actualBattle.tickEvents) {
        try {
            target = target || companion
            actualBattle.tickEvents.push({
                from: companion.id,
                to: target.id,
                eventType: "special",
                label: info,
                customColor: color,
                customIcon: "noicon"
            })
        } catch (err) {}
    }
}

// combat node/server doesn't have access to database or schema
// to make this work, we'd have to throw it into a tickEvent and have the game client handle it, send it to a server.api, etc.
/*
export const companionChat = function companionChat({ companion, message }) {
  try {
    const companionOwner = getCompanionOwner(companion);
    const userDoc = Users.findOne({ _id: companionOwner });
    
    if (!userDoc) {
      return;
    }
    
    const playerGroupDoc = Groups.findOne({ members: companionOwner });
    
    if (playerGroupDoc) {    
      Chats.insert({
        message,
        username: companion.name,
        name: companion.name,
        date: new Date(),
        custom: {
          roomType: 'Party'
        },
        roomId: `${playerGroupDoc._id}-${userDoc.server}`
      });
    } else {
      Chats.insert({
        message,
        username: companion.name,
        name: companion.name,
        date: new Date(),
        custom: {
          roomType: 'Game'
        },
        roomId: `Game-${companionOwner}`
      });
    }
  } catch (err) {
  }
};
*/

const maxTableAndGridSize = 550

const skillLevel = function skillLevel(playerSkills, skillName) {
    try {
        const userSkillLevel = playerSkills.filter((skill) => {
            return skill.type.toLowerCase() === skillName.toLowerCase()
        })
        if (userSkillLevel && userSkillLevel.length === 1 && userSkillLevel[0].level > 0) {
            return userSkillLevel[0].level
        }
    } catch (err) {}
    return 1
}

const companionStatsHTML = function companionStatsHTML({ buff, level, floor, playerSkills, townBuffLevel }) {
    try {
        let descText = "<br />"

        const localTownBuffLevel = townBuffLevel || 0
        const townBuffBonus = 1 + (localTownBuffLevel > 0 ? (localTownBuffLevel + 1) * 0.015 : 0)

        if (floor && playerSkills) {
            const flexCellSize = Math.floor(maxTableAndGridSize / 4) - 40

            descText += `<div class="mb-3">`
            descText += `<div class="d-flex flex-wrap justify-content-between mb-2" style="max-width: ${maxTableAndGridSize}px">`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center attack.svg-tooltip-container"><img src="/icons/attack.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${Math.round(
                townBuffBonus *
                    buff.constants.attack({ level, towerFloor: floor, attackSkill: skillLevel(playerSkills, "attack") })
            )} - ${Math.round(
                townBuffBonus *
                    buff.constants.attackMax({
                        level,
                        towerFloor: floor,
                        attackSkill: skillLevel(playerSkills, "attack")
                    })
            )}</div></div>`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center attackSpeed.svg-tooltip-container"><img src="/icons/attackSpeed.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${buff.constants.attackSpeed(
                { level }
            )}</div></div>`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center magicPower.svg-tooltip-container"><img src="/icons/magicPower.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${Math.round(
                townBuffBonus *
                    buff.constants.magicPower({
                        level,
                        towerFloor: floor,
                        magicSkill: skillLevel(playerSkills, "magic")
                    })
            )}</div></div>`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center accuracy.svg-tooltip-container"><img src="/icons/accuracy.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${Math.round(
                townBuffBonus *
                    buff.constants.accuracy({
                        level,
                        towerFloor: floor,
                        attackSkill: skillLevel(playerSkills, "attack")
                    })
            )}</div></div>`
            descText += `</div>`
            descText += `<div class="d-flex flex-wrap justify-content-between mb-2" style="max-width: ${maxTableAndGridSize}px">`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center health.svg-tooltip-container"><img src="/icons/health.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${Math.round(
                townBuffBonus *
                    buff.constants.healthMax({
                        level,
                        towerFloor: floor,
                        healthSkill: skillLevel(playerSkills, "health")
                    })
            ).toLocaleString()}</div></div>`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center defense.svg-tooltip-container"><img src="/icons/defense.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${Math.round(
                townBuffBonus *
                    buff.constants.defense({
                        level,
                        towerFloor: floor,
                        defenseSkill: skillLevel(playerSkills, "defense")
                    })
            )}</div></div>`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center armor.svg-tooltip-container"><img src="/icons/armor.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${Math.round(
                townBuffBonus *
                    buff.constants.armor({ level, towerFloor: floor, defenseSkill: skillLevel(playerSkills, "armor") })
            ).toLocaleString()}</div></div>`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center magicArmor.svg-tooltip-container"><img src="/icons/magicArmor.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${Math.round(
                townBuffBonus *
                    buff.constants.magicArmor({
                        level,
                        towerFloor: floor,
                        magicSkill: skillLevel(playerSkills, "magic"),
                        defenseSkill: skillLevel(playerSkills, "defense")
                    })
            ).toLocaleString()}</div></div>`
            descText += `</div>`
            descText += `<div class="d-flex flex-wrap justify-content-between mb-2" style="max-width: ${maxTableAndGridSize}px">`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center healingPower.svg-tooltip-container"><img src="/icons/healingPower.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">+${Math.round(
                townBuffBonus * buff.constants.healingPower({ level })
            )}%</div></div>`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center heartDrop.svg-tooltip-container"><img src="/icons/heartDrop.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${
                100 * (1 - buff.constants.damageTaken({ level }))
            }%</div></div>`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center invis.gif-tooltip-container"><img src="/icons/invis.gif" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px"></div></div>`
            descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center invis.gif-tooltip-container"><img src="/icons/invis.gif" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px"></div></div>`
            descText += `</div>`
            if (localTownBuffLevel > 0) {
                descText += `(stats based on your skills, tome level ${level}, tower floor ${floor}, and a ${autoPrecisionValue(
                    (townBuffBonus - 1) * 100
                )}% bonus from the town barracks)`
            } else {
                descText += `(stats based on your skills, tome level ${level}, and tower floor ${floor})`
            }
        } else {
            if (localTownBuffLevel > 0) {
                descText += `(stats vary based on your skills, tome level ${level}, which floor you bring the companion to, and a ${autoPrecisionValue(
                    (townBuffBonus - 1) * 100
                )}% bonus from the town barracks)`
            } else {
                descText += `(stats vary based on your skills, tome level ${level}, and which floor you bring the companion to)`
            }
        }
        return descText
    } catch (err) {}

    return ""
}

export const COMPANION_BUFFS = {
    baby_fox: {
        duplicateTag: "baby_fox",
        icon: "babyFox.svg",
        name: "baby fox",
        description() {
            return `Summons a baby fox`
        },
        constants: {},
        data: {
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (!buff.data.isSpawned) {
                    buff.data.isSpawned = true
                    buff.data.hideBuff = true
                    // Spawn our fox
                    const foxToSpawn = lodash.sample(["fire", "water", "air", "earth"])
                    const fox = {
                        owner: target.id + "_companion",
                        id: uuid.v4(),
                        tickOffset: 0,
                        isNPC: true,
                        isCompanion: true,
                        isSoloCompanion: false
                    }

                    if (foxToSpawn === "fire") {
                        fox.icon = "babyFireFox.svg"
                        fox.name = "Fire fox"
                        fox.stats = {
                            attack: 1,
                            attackMax: 1,
                            attackSpeed: 1,
                            accuracy: 1,
                            health: target.stats.healthMax * 0.5,
                            healthMax: target.stats.healthMax * 0.5,
                            defense: target.stats.defense,
                            armor: target.stats.armor,
                            magicArmor: target.stats.magicArmor * 0.5,
                            magicPower: target.stats.magicPower,
                            damageTaken: 1
                        }
                        fox.buffs = [
                            {
                                id: "baby_fire_fox",
                                data: {
                                    duration: Infinity,
                                    totalDuration: Infinity,
                                    name: "baby fire fox",
                                    timeTillCharge: 5,
                                    icon: "babyFireFox.svg",
                                    hideBuff: true
                                }
                            }
                        ]
                    } else if (foxToSpawn === "earth") {
                        fox.icon = "babyEarthFox.svg"
                        fox.name = "Earth fox"
                        fox.stats = {
                            attack: target.stats.attackMax * 0.05,
                            attackMax: target.stats.attackMax * 0.05,
                            attackSpeed: 0.5,
                            accuracy: target.stats.accuracy * 0.5,
                            health: target.stats.healthMax * 0.5,
                            healthMax: target.stats.healthMax * 0.5,
                            defense: target.stats.defense,
                            armor: target.stats.armor,
                            magicArmor: target.stats.magicArmor,
                            magicPower: target.stats.magicPower * 0.5,
                            damageTaken: 1
                        }
                        fox.buffs = [
                            {
                                id: "baby_earth_fox",
                                data: {
                                    duration: Infinity,
                                    totalDuration: Infinity,
                                    name: "baby earth fox",
                                    timeTillCharge: 2,
                                    icon: "babyEarthFox.svg",
                                    hideBuff: true
                                }
                            }
                        ]
                    } else if (foxToSpawn === "air") {
                        fox.icon = "babyAirFox.svg"
                        fox.name = "Air fox"
                        fox.stats = {
                            attack: target.stats.attackMax * 0.1,
                            attackMax: target.stats.attackMax * 0.1,
                            attackSpeed: 1,
                            accuracy: target.stats.accuracy,
                            health: target.stats.healthMax * 0.5,
                            healthMax: target.stats.healthMax * 0.5,
                            defense: target.stats.defense,
                            armor: target.stats.armor,
                            magicArmor: target.stats.magicArmor * 0.6,
                            magicPower: target.stats.magicPower * 0.6,
                            damageTaken: 1
                        }
                        fox.buffs = []
                    } else if (foxToSpawn === "water") {
                        fox.icon = "babyWaterFox.svg"
                        fox.name = "Water fox"
                        fox.stats = {
                            attack: 1,
                            attackMax: 1,
                            attackSpeed: 0.001,
                            accuracy: 1,
                            health: target.stats.healthMax * 0.5,
                            healthMax: target.stats.healthMax * 0.5,
                            defense: target.stats.defense,
                            armor: target.stats.armor,
                            magicArmor: target.stats.magicArmor * 0.5,
                            magicPower: target.stats.magicPower,
                            healingPower: target.stats.healingPower,
                            damageTaken: 1
                        }
                        fox.buffs = [
                            {
                                id: "baby_water_fox",
                                data: {
                                    duration: Infinity,
                                    totalDuration: Infinity,
                                    name: "baby water fox",
                                    icon: "babyWaterFox.svg",
                                    timeTillCharge: 5,
                                    hideBuff: true
                                }
                            }
                        ]
                    }

                    actualBattle.addUnit(fox)
                }
            },

            onRemove({ buff, target }) {}
        }
    },

    debug_enemy: {
        duplicateTag: "debug_enemy",
        icon: "cat.svg",
        name: "debug enemy",
        description({ buff, level }) {
            return "Debug ability to spawn enemy units."
        },
        constants: {},
        data: {},
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (!buff.data.isSpawned) {
                    buff.data.isSpawned = true

                    let enemy = {
                        id: uuid.v4(),
                        tickOffset: 0,
                        isEnemy: true,
                        icon: "high_angel.svg",
                        name: "Boss High Angel",
                        stats: {
                            attack: 150,
                            attackMax: 250,
                            attackSpeed: 0.5,
                            accuracy: 600,
                            health: 5500,
                            healthMax: 5500,
                            defense: 225,
                            armor: 650,
                            magicArmor: 150,
                            damageTaken: 1
                        },
                        buffs: []
                    }

                    enemy.buffs = enemy.buffs.concat([
                        {
                            id: "boss_high_angel",
                            data: {
                                duration: Infinity,
                                totalDuration: Infinity,
                                name: "boss high angel",
                                icon: "resurrection.svg",
                                stacks: 0,
                                timeTillResurrection: 5
                            }
                        },
                        {
                            id: "angels_heart",
                            data: {
                                duration: Infinity,
                                totalDuration: Infinity,
                                name: "angels heart",
                                icon: "angels_heart.svg",
                                level: 5,
                                allies: "enemies"
                            }
                        }
                    ])

                    /* enemy.buffs = enemy.buffs.concat([
            lodash.cloneDeep(lookupBuff('boss_high_angel')),
            lodash.cloneDeep(lookupBuff('angels_heart'))
          ]); */

                    actualBattle.addUnit(enemy)
                }
            },

            onRemove({ buff, target }) {}
        }
    },

    // Level 1: can auto-attack (speed 0.8) and can use Slash (with 5s CD) at level 1
    // Level 2: can Penetrating Slash at level 1 (with 5s CD) and upgrades Slash to level 2
    // Level 3: can use Bleed at level 1 (with 30s CD) and upgrades Penetrating Slash to level 2
    // Level 4: has Phantom Strikes 1 passive and upgrades Bleed to level 2 and Slash to level 3
    // Level 5: has Thirsty Fangs 1 passive and upgrades Phantom Strikes to level 2 and Penetrating slash to level 3
    // All levels:  gain attack damage, accuracy, and health for each level
    skeletal_warrior: {
        duplicateTag: "skeletal_warrior",
        icon: "boneWarrior.svg",
        name: "skeletal warrior",
        description({ buff, level, playerSkills, floor, townBuffLevel }) {
            let descText = ""

            descText += "Summons a skeletal warrior to assist in tower combat. <br />"
            descText += "<br />"

            descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
            descText += `  <tr>`
            descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`
            descText += `    <td valign="top"><b>physical damage</b></td>`
            descText += `  </tr>`

            if (level === 1) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Slash Lv. 1</b></td>`
                descText += `  </tr>`
            } else if (level === 2) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Penetrating Slash Lv. 1</b>, <b>Slash Lv. 2</b></td>`
                descText += `  </tr>`
            } else if (level === 3) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Bleed Lv. 1</b>, <b>Penetrating Slash Lv. 2</b>, <b>Slash Lv. 2</b></td>`
                descText += `  </tr>`
            } else if (level === 4) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Bleed Lv. 2</b>, <b>Penetrating Slash Lv. 2</b>, <b>Phantom Strikes Lv. 1</b>, <b>Slash Lv. 3</b></td>`
                descText += `  </tr>`
            } else if (level === 5) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Bleed Lv. 2</b>, <b>Penetrating Slash Lv. 3</b>, <b>Phantom Strikes Lv. 2</b>, <b>Slash Lv. 3</b>, <b>Thirsty Fangs Lv. 1</b></td>`
                descText += `  </tr>`
            }

            descText += `</table>`
            descText += companionStatsHTML({ buff, level, floor, playerSkills, townBuffLevel })
            return descText
        },
        constants: {
            accuracy: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor) / 1.85 + 35 * level)
            },
            attack: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 5) * minTowerFloor) / 3.5 + 13 * level)
            },
            attackMax: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 5) * minTowerFloor) / 2.5 + 40 * level)
            },
            attackSpeed: function ({ level }) {
                return 0.55 + 0.05 * level
            },
            healthMax: function ({ level, towerFloor, healthSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(Math.sqrt(healthSkill * 3) * minTowerFloor * 6.5 + 100 * level)
            },
            defense: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor) / 3 + 3 * level)
            },
            armor: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor) / 2.5 + 5 * level)
            },
            magicArmor: function ({ level, towerFloor, magicSkill, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(
                    (Math.sqrt(magicSkill * 2) * minTowerFloor) / 5 +
                        (Math.sqrt(defenseSkill * 2) * minTowerFloor) / 5 +
                        2 * level
                )
            },
            magicPower: function ({ level, towerFloor, magicSkill }) {
                return magicSkill
            },
            damageTaken: function ({ level }) {
                return 1
            },
            healingPower: function ({ level }) {
                return 5 + 3 * level
            }
        },
        data: {
            //hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (!buff.data.isSpawned) {
                    const buffConsts =
                        buff.constants && buff.constants.constants
                            ? buff.constants.constants
                            : lookupBuff(buff.id).constants
                    buff.data.isSpawned = true
                    //buff.data.hideBuff = true;

                    // ** OLD **
                    // this companion won't help in personal quests
                    // this companion won't help in battle with other solo companions
                    //if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {

                    // ** NEW **
                    // this companion won't help in personal quests
                    // this companion won't help in battle if the unit roster is full
                    if (
                        actualBattle.isTower() &&
                        actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5
                    ) {
                        const attackSkill = target.attackSkill()
                        const defenseSkill = target.defenseSkill()
                        const magicSkill = target.magicSkill()
                        const healthSkill = target.healthSkill()

                        let companion = {
                            owner: target.id + "_companion",
                            id: uuid.v4(),
                            tickOffset: 0,
                            isNPC: true,
                            isCompanion: true,
                            isSoloCompanion: true,
                            icon: "boneWarrior.svg",
                            name: target.name + "'s warrior",
                            stats: {
                                attack: buffConsts.attack({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackMax: buffConsts.attackMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackSpeed: buffConsts.attackSpeed({ level: buff.data.level }),
                                accuracy: buffConsts.accuracy({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                health: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                healthMax: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                defense: buffConsts.defense({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                armor: buffConsts.armor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                magicArmor: buffConsts.magicArmor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill,
                                    defenseSkill
                                }),
                                magicPower: buffConsts.magicPower({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill
                                }),
                                damageTaken: buffConsts.damageTaken({ level: buff.data.level }),
                                healingPower: buffConsts.healingPower({ level: buff.data.level })
                            },
                            buffs: []
                        }

                        companion.buffs = companion.buffs.concat([
                            {
                                id: "companion_skeletal_warrior",
                                data: {
                                    duration: Infinity,
                                    totalDuration: Infinity,
                                    name: "companion skeletal warrior",
                                    icon: "boneWarrior.svg",
                                    level: buff.data.level,
                                    custom: true
                                }
                            }
                        ])

                        if (buff.data.level >= 4) {
                            companion.buffs = companion.buffs.concat([
                                {
                                    id: "phantom_strikes",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "phantom strikes",
                                        icon: "phantomStrikes.svg",
                                        level: buff.data.level - 3 // PS will be level 1 at companion level 4 and level 2 at companion level 5
                                    }
                                }
                            ])
                        }

                        if (buff.data.level >= 5) {
                            companion.buffs = companion.buffs.concat([
                                {
                                    id: "thirsty_fangs",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "thirsty fangs",
                                        icon: "thirstyFangs.svg",
                                        level: 1
                                    }
                                }
                            ])
                        }

                        if (actualBattle.townBuffLevel > 0) {
                            const townBarracksBonus = (actualBattle.townBuffLevel + 1) * 0.015 // 3% - 9%
                            try {
                                Object.keys(companion.stats).forEach((statName) => {
                                    // disallow % bonuses to attack speed or damage taken
                                    if (statName !== "attackSpeed" && statName !== "damageTaken") {
                                        // ensure that property refers to a stat that is a number and valued more than 0 (non-numeric/non-positive/non-zero all disallowed)
                                        if (CDbl(companion.stats[statName]) > 0.0) {
                                            companion.stats[statName] *= 1 + townBarracksBonus
                                        }
                                    }
                                })
                            } catch (err) {}
                        }

                        actualBattle.addUnit(companion)
                    }
                }
            },

            onRemove({ buff, target }) {}
        }
    },

    // Level 1: can auto-attack (speed 1.0) and can use Slash (with 5s CD) at level 2
    // Level 2: can Penetrating Slash at level 2 (with 5s CD) and upgrades Slash to level 4
    // Level 3: can use Bleed at level 3 (with 30s CD) and upgrades Penetrating Slash to level 4
    // Level 4: has Phantom Strikes 2 passive and upgrades Bleed to level 5 and Slash to level 5
    // Level 5: has Heist trait
    // All levels:  gain attack damage, accuracy, and health for each level
    spd_leprechaun: {
        duplicateTag: "spd_leprechaun",
        icon: "eventSPDleprechaun.png",
        name: "tricky leprechaun",
        description({ buff, level, playerSkills, floor, townBuffLevel }) {
            let descText = ""

            descText += "Summons a tricky leprechaun to assist in tower combat. <br />"
            descText += "<br />"

            descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
            descText += `  <tr>`
            descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`
            descText += `    <td valign="top"><b>physical damage</b></td>`
            descText += `  </tr>`

            if (level === 1) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Slash Lv. 2</b></td>`
                descText += `  </tr>`
            } else if (level === 2) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Penetrating Slash Lv. 2</b>, <b>Slash Lv. 4</b></td>`
                descText += `  </tr>`
            } else if (level === 3) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Bleed Lv. 3</b>, <b>Penetrating Slash Lv. 4</b>, <b>Slash Lv. 4</b></td>`
                descText += `  </tr>`
            } else if (level === 4) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Bleed Lv. 5</b>, <b>Penetrating Slash Lv. 4</b>, <b>Phantom Strikes Lv. 2</b>, <b>Slash Lv. 5</b></td>`
                descText += `  </tr>`
            } else if (level === 5) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Bleed Lv. 5</b>, <b>Penetrating Slash Lv. 4</b>, <b>Phantom Strikes Lv. 2</b>, <b>Slash Lv. 5</b></td>`
                descText += `  </tr>`
                descText += `  <tr>`
                descText += `    <td valign="top">Traits&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Heist</b> (rampant thievery)</td>`
                descText += `  </tr>`
            }

            descText += `</table>`
            descText += companionStatsHTML({ buff, level, floor, playerSkills, townBuffLevel })
            return descText
        },
        constants: {
            accuracy: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor) / 1.85 + 35 * level)
            },
            attack: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 4) * minTowerFloor) / 3.5 + 13 * level)
            },
            attackMax: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 4.25) * minTowerFloor) / 2.5 + 40 * level)
            },
            attackSpeed: function ({ level }) {
                return 1.0
            },
            healthMax: function ({ level, towerFloor, healthSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(Math.sqrt(healthSkill * 2.75) * minTowerFloor * 6.5 + 65 * level)
            },
            defense: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor) / 3 + 3 * level)
            },
            armor: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor) / 2.5 + 5 * level)
            },
            magicArmor: function ({ level, towerFloor, magicSkill, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(
                    (Math.sqrt(magicSkill * 2) * minTowerFloor) / 5 +
                        (Math.sqrt(defenseSkill * 2) * minTowerFloor) / 5 +
                        2 * level
                )
            },
            magicPower: function ({ level, towerFloor, magicSkill }) {
                return magicSkill
            },
            damageTaken: function ({ level }) {
                return 1
            },
            healingPower: function ({ level }) {
                return 0
            }
        },
        data: {
            //hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (!buff.data.isSpawned) {
                    const buffConsts =
                        buff.constants && buff.constants.constants
                            ? buff.constants.constants
                            : lookupBuff(buff.id).constants
                    buff.data.isSpawned = true
                    //buff.data.hideBuff = true;

                    // ** OLD **
                    // this companion won't help in personal quests
                    // this companion won't help in battle with other solo companions
                    //if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {

                    // ** NEW **
                    // this companion won't help in personal quests
                    // this companion won't help in battle if the unit roster is full
                    if (
                        actualBattle.isTower() &&
                        actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5
                    ) {
                        const attackSkill = target.attackSkill()
                        const defenseSkill = target.defenseSkill()
                        const magicSkill = target.magicSkill()
                        const healthSkill = target.healthSkill()

                        let companion = {
                            owner: target.id + "_companion",
                            id: uuid.v4(),
                            tickOffset: 0,
                            isNPC: true,
                            isCompanion: true,
                            isSoloCompanion: true,
                            icon: "eventSPDleprechaun.png",
                            name: target.name + "'s leprechaun",
                            stats: {
                                attack: buffConsts.attack({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackMax: buffConsts.attackMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackSpeed: buffConsts.attackSpeed({ level: buff.data.level }),
                                accuracy: buffConsts.accuracy({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                health: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                healthMax: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                defense: buffConsts.defense({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                armor: buffConsts.armor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                magicArmor: buffConsts.magicArmor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill,
                                    defenseSkill
                                }),
                                magicPower: buffConsts.magicPower({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill
                                }),
                                damageTaken: buffConsts.damageTaken({ level: buff.data.level }),
                                healingPower: buffConsts.healingPower({ level: buff.data.level })
                            },
                            buffs: []
                        }

                        companion.buffs = companion.buffs.concat([
                            {
                                id: "spd_leprechaun_logic",
                                data: {
                                    duration: Infinity,
                                    totalDuration: Infinity,
                                    name: "companion leprechaun",
                                    icon: "eventSPDleprechaun.png",
                                    level: buff.data.level,
                                    custom: true
                                }
                            }
                        ])

                        if (buff.data.level >= 4) {
                            companion.buffs = companion.buffs.concat([
                                {
                                    id: "phantom_strikes",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "phantom strikes",
                                        icon: "phantomStrikes.svg",
                                        level: 2
                                    }
                                }
                            ])
                        }

                        if (buff.data.level >= 5) {
                            companion.buffs = companion.buffs.concat([
                                {
                                    id: "spd_leprechaun_heist",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "heist",
                                        icon: "eventSPDheist.svg",
                                        level: 1
                                    }
                                }
                            ])
                        }

                        if (actualBattle.townBuffLevel > 0) {
                            const townBarracksBonus = (actualBattle.townBuffLevel + 1) * 0.015 // 3% - 9%
                            try {
                                Object.keys(companion.stats).forEach((statName) => {
                                    // disallow % bonuses to attack speed or damage taken
                                    if (statName !== "attackSpeed" && statName !== "damageTaken") {
                                        // ensure that property refers to a stat that is a number and valued more than 0 (non-numeric/non-positive/non-zero all disallowed)
                                        if (CDbl(companion.stats[statName]) > 0.0) {
                                            companion.stats[statName] *= 1 + townBarracksBonus
                                        }
                                    }
                                })
                            } catch (err) {}
                        }

                        actualBattle.addUnit(companion)
                    }
                }
            },

            onRemove({ buff, target }) {}
        }
    },

    // Level 1: can auto-attack (speed 0.6) and knows how to taunt random targets that aren't
    //          targeting the pig (with 7s CD)
    // Level 2: can auto-attack (speed 0.65) and modifies taunt so that it taunts random targets
    //          that aren't targeting the pig (with 4s CD)
    // Level 3: can auto-attack (speed 0.7) and knows how to squeal (scream) that will taunt all
    //          targets in boss rooms, individual floors, or exploration attempts at room 3+ as
    //          long as there is at least 2 enemies in the room and at least one of those two
    //          enemies aren't targeting the pig (with 25s CD)
    // Level 4: can auto-attack (speed 0.75) and has Watchful Aura passive
    // Level 5: can auto-attack (speed 0.8) and knows Evasive Maneuvers Lv. 5 and will use it
    //          when under 50% health (with 40s CD)
    // All levels:  gains health, defense, armor, and magic armor for each level
    cute_pig: {
        duplicateTag: "cute_pig",
        icon: "cutePig.svg",
        name: "cute pig",
        description({ buff, level, playerSkills, floor, townBuffLevel }) {
            let descText = ""

            descText += "Summons a cute pig to assist in tower combat. <br />"
            descText += "<br />"

            descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
            descText += `  <tr>`
            descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`
            descText += `    <td valign="top"><b>tank</b></td>`
            descText += `  </tr>`

            if (level === 1) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Oink Lv. 1</b> (taunt)</td>`
                descText += `  </tr>`
            } else if (level === 2) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Oink Lv. 2</b> (taunt)</td>`
                descText += `  </tr>`
            } else if (level === 3) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream)</td>`
                descText += `  </tr>`
            } else if (level === 4) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream), <b>Watchful Aura</b></td>`
                descText += `  </tr>`
            } else if (level === 5) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Evasive Maneuvers Lv. 5</b>, <b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream), <b>Watchful Aura</b></td>`
                descText += `  </tr>`
            }

            descText += `</table>`
            descText += companionStatsHTML({ buff, level, floor, playerSkills, townBuffLevel })
            return descText
        },
        constants: {
            // pigs don't do much damage, they're tanks
            accuracy: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor) / 2.5 + 1 * level)
            },
            attack: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor) / 25 + 1 * level)
            },
            attackMax: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor) / 25 + 2 * level)
            },
            attackSpeed: function ({ level }) {
                return 0.3
            },
            healthMax: function ({ level, towerFloor, healthSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(Math.sqrt(healthSkill * 3) * minTowerFloor * 7.5 + 125 * level)
            },
            defense: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor) / 1.45 + 15 * level)
            },
            armor: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(Math.sqrt(defenseSkill * 3) * minTowerFloor * 1.65 + 75 * level)
            },
            magicArmor: function ({ level, towerFloor, magicSkill, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(
                    (Math.sqrt(magicSkill * 2) * minTowerFloor) / 5 +
                        (Math.sqrt(defenseSkill * 2) * minTowerFloor) / 5 +
                        20 * level
                )
            },
            magicPower: function ({ level, towerFloor, magicSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(magicSkill * 3) * minTowerFloor) / 3)
            },
            damageTaken: function ({ level }) {
                return 1
            },
            healingPower: function ({ level }) {
                return 0
            }
        },
        data: {
            //hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (!buff.data.isSpawned) {
                    const buffConsts =
                        buff.constants && buff.constants.constants
                            ? buff.constants.constants
                            : lookupBuff(buff.id).constants
                    buff.data.isSpawned = true
                    //buff.data.hideBuff = true;

                    // ** OLD **
                    // this companion won't help in personal quests
                    // this companion won't help in battle with other solo companions
                    //if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {

                    // ** NEW **
                    // this companion won't help in personal quests
                    // this companion won't help in battle if the unit roster is full
                    if (
                        actualBattle.isTower() &&
                        actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5
                    ) {
                        const attackSkill = target.attackSkill()
                        const defenseSkill = target.defenseSkill()
                        const magicSkill = target.magicSkill()
                        const healthSkill = target.healthSkill()

                        let companion = {
                            owner: target.id + "_companion",
                            id: uuid.v4(),
                            tickOffset: 0,
                            isNPC: true,
                            isCompanion: true,
                            isSoloCompanion: true,
                            icon: "cutePig.svg",
                            name: target.name + "'s pig",
                            stats: {
                                attack: buffConsts.attack({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackMax: buffConsts.attackMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackSpeed: buffConsts.attackSpeed({ level: buff.data.level }),
                                accuracy: buffConsts.accuracy({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                health: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                healthMax: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                defense: buffConsts.defense({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                armor: buffConsts.armor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                magicArmor: buffConsts.magicArmor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill,
                                    defenseSkill
                                }),
                                magicPower: buffConsts.magicPower({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill
                                }),
                                damageTaken: buffConsts.damageTaken({ level: buff.data.level }),
                                healingPower: buffConsts.healingPower({ level: buff.data.level })
                            },
                            buffs: [
                                {
                                    id: "companion_taunt",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "companion taunt",
                                        icon: "taunt.svg",
                                        timeTillCharge: 0.4,
                                        level: buff.data.level
                                    }
                                }
                            ]
                        }

                        if (buff.data.level >= 3) {
                            companion.buffs = companion.buffs.concat([
                                {
                                    id: "companion_squeal",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "companion squeal",
                                        icon: "scream.svg",
                                        timeTillCharge: 0.4,
                                        level: buff.data.level
                                    }
                                }
                            ])
                        }

                        if (buff.data.level >= 4) {
                            companion.buffs = companion.buffs.concat([
                                {
                                    id: "sixth_sense",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "watchful aura",
                                        icon: "sixthSense.svg"
                                    }
                                }
                            ])
                        }

                        if (buff.data.level >= 5) {
                            companion.buffs = companion.buffs.concat([
                                {
                                    id: "companion_pig_logic",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "piggy oink oink",
                                        icon: "cutePig.svg"
                                    }
                                }
                            ])
                        }

                        if (actualBattle.townBuffLevel > 0) {
                            const townBarracksBonus = (actualBattle.townBuffLevel + 1) * 0.015 // 3% - 9%
                            try {
                                Object.keys(companion.stats).forEach((statName) => {
                                    // disallow % bonuses to attack speed or damage taken
                                    if (statName !== "attackSpeed" && statName !== "damageTaken") {
                                        // ensure that property refers to a stat that is a number and valued more than 0 (non-numeric/non-positive/non-zero all disallowed)
                                        if (CDbl(companion.stats[statName]) > 0.0) {
                                            companion.stats[statName] *= 1 + townBarracksBonus
                                        }
                                    }
                                })
                            } catch (err) {}
                        }

                        actualBattle.addUnit(companion)
                    }
                }
            },

            onRemove({ buff, target }) {}
        }
    },

    // Level 1: knows how to taunt random targets that aren't targeting the pig (with 7s CD)
    // Level 2: modifies taunt so that it taunts random targets that aren't targeting the pig (with 4s CD)
    // Level 3: ALSO knows how to squeal (scream) that will taunt all targets in boss rooms, individual floors,
    //          or exploration attempts at room 3+ as long as there is at least 2 enemies in the room and
    //          at least one of those two enemies aren't targeting the pig (with 25s CD)
    // Level 4: ALSO knows Evasive Maneuvers Lv. 5 and will use it when under 50% health (with 40s CD)
    // Level 5: reduces the cooldown on Evasive Maneuvers to 15 seconds.
    // All levels:  gains health, defense, armor, and magic armor for each level
    lny_pig: {
        duplicateTag: "lny_pig",
        icon: "eventLNYPig.png",
        name: "year of the pig",
        description({ buff, level, playerSkills, floor, townBuffLevel }) {
            let descText = ""

            descText += "Summons a year of the pig to assist in tower combat. <br />"
            descText += "<br />"

            descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
            descText += `  <tr>`
            descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`
            descText += `    <td valign="top"><b>tank</b></td>`
            descText += `  </tr>`

            if (level === 1) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Oink Lv. 1</b> (taunt)</td>`
                descText += `  </tr>`
            } else if (level === 2) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Oink Lv. 2</b> (taunt)</td>`
                descText += `  </tr>`
            } else if (level === 3) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream)</td>`
                descText += `  </tr>`
            } else if (level === 4) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top">Evasive Maneuvers Lv. 5</br>, <b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream), <b>Watchful Aura</b></td>`
                descText += `  </tr>`
            } else if (level === 5) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Evasive Maneuvers Lv. 5</b>, <b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream), <b>Watchful Aura</b></td>`
                descText += `  </tr>`
                descText += `  <tr>`
                descText += `    <td valign="top">Traits&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Fast Evade</b> (reduces <i>Evasive Maneuvers</i> cooldown)</td>`
                descText += `  </tr>`
            }

            descText += `</table>`
            descText += companionStatsHTML({ buff, level, floor, playerSkills, townBuffLevel })
            return descText
        },
        constants: {
            // pigs don't do much damage, they're tanks
            accuracy: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor) / 2.5 + 1 * level)
            },
            attack: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor) / 25 + 1 * level)
            },
            attackMax: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor) / 25 + 2 * level)
            },
            attackSpeed: function ({ level }) {
                return 0.3
            },
            healthMax: function ({ level, towerFloor, healthSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(Math.sqrt(healthSkill * 3) * minTowerFloor * 9.5 + 125 * level)
            },
            defense: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor) / 1.55 + 15 * level)
            },
            armor: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(Math.sqrt(defenseSkill * 3) * minTowerFloor * 1.35 + 75 * level)
            },
            magicArmor: function ({ level, towerFloor, magicSkill, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(
                    (Math.sqrt(magicSkill * 2) * minTowerFloor) / 5 +
                        (Math.sqrt(defenseSkill * 2) * minTowerFloor) / 5 +
                        25 * level
                )
            },
            magicPower: function ({ level, towerFloor, magicSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(magicSkill * 3) * minTowerFloor) / 3)
            },
            damageTaken: function ({ level }) {
                return 1
            },
            healingPower: function ({ level }) {
                return 0
            }
        },
        data: {
            //hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (!buff.data.isSpawned) {
                    const buffConsts =
                        buff.constants && buff.constants.constants
                            ? buff.constants.constants
                            : lookupBuff(buff.id).constants
                    buff.data.isSpawned = true
                    //buff.data.hideBuff = true;

                    // ** OLD **
                    // this companion won't help in personal quests
                    // this companion won't help in battle with other solo companions
                    //if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {

                    // ** NEW **
                    // this companion won't help in personal quests
                    // this companion won't help in battle if the unit roster is full
                    if (
                        actualBattle.isTower() &&
                        actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5
                    ) {
                        const attackSkill = target.attackSkill()
                        const defenseSkill = target.defenseSkill()
                        const magicSkill = target.magicSkill()
                        const healthSkill = target.healthSkill()

                        let companion = {
                            owner: target.id + "_companion",
                            id: uuid.v4(),
                            tickOffset: 0,
                            isNPC: true,
                            isCompanion: true,
                            isSoloCompanion: true,
                            icon: "eventLNYPig.png",
                            name: target.name + "'s pig",
                            stats: {
                                attack: buffConsts.attack({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackMax: buffConsts.attackMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackSpeed: buffConsts.attackSpeed({ level: buff.data.level }),
                                accuracy: buffConsts.accuracy({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                health: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                healthMax: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                defense: buffConsts.defense({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                armor: buffConsts.armor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                magicArmor: buffConsts.magicArmor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill,
                                    defenseSkill
                                }),
                                magicPower: buffConsts.magicPower({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill
                                }),
                                damageTaken: buffConsts.damageTaken({ level: buff.data.level }),
                                healingPower: buffConsts.healingPower({ level: buff.data.level })
                            },
                            buffs: [
                                {
                                    id: "companion_taunt",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "companion taunt",
                                        icon: "taunt.svg",
                                        timeTillCharge: 0.4,
                                        level: buff.data.level
                                    }
                                }
                            ]
                        }

                        if (buff.data.level >= 3) {
                            companion.buffs = companion.buffs.concat([
                                {
                                    id: "companion_squeal",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "companion squeal",
                                        icon: "scream.svg",
                                        timeTillCharge: 0.4,
                                        level: buff.data.level
                                    }
                                }
                            ])
                        }

                        if (buff.data.level >= 4) {
                            companion.buffs = companion.buffs.concat([
                                {
                                    id: "companion_pig_logic_lny",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "piggy oink oink",
                                        icon: "eventLNYPig.png",
                                        level: buff.data.level
                                    }
                                }
                            ])
                        }

                        if (actualBattle.townBuffLevel > 0) {
                            const townBarracksBonus = (actualBattle.townBuffLevel + 1) * 0.015 // 3% - 9%
                            try {
                                Object.keys(companion.stats).forEach((statName) => {
                                    // disallow % bonuses to attack speed or damage taken
                                    if (statName !== "attackSpeed" && statName !== "damageTaken") {
                                        // ensure that property refers to a stat that is a number and valued more than 0 (non-numeric/non-positive/non-zero all disallowed)
                                        if (CDbl(companion.stats[statName]) > 0.0) {
                                            companion.stats[statName] *= 1 + townBarracksBonus
                                        }
                                    }
                                })
                            } catch (err) {}
                        }
                        actualBattle.addUnit(companion)
                    }
                }
            },

            onRemove({ buff, target }) {}
        }
    },

    // Level 1: knows how to cast water dart (10s CD) and water ball (10s CD)
    // Level 2: ALSO knows how to cast mending waters (30s CD) but will not cast at any target that is
    //          already affected by a mending water or if the target's maximum health is under 500
    // Level 3: ALSO knows how to cast air ball in boss rooms, individual floors, or exploration attempts
    //          at room 4+ at the first enemy target as long as that enemy doesn't already have air ball
    //          affecting it (10s CD) and as long as the fairy has 400+ remaining max health
    // Level 4: ALSO knows how to cast water wave (20s CD) if the lowest health allies are <= 70%, <= 80%,
    //          <= 80%
    // Level 5: ALSO gains +10% damage reduction
    // All levels:  gains health, magic power, and healing power for each level
    mystic_fairy: {
        duplicateTag: "mystic_fairy",
        icon: "fairy2.svg",
        name: "mystic fairy",
        description({ buff, level, floor, playerSkills, townBuffLevel }) {
            let descText = ""

            descText += "Summons a mystic fairy to assist in tower combat. <br />"
            descText += "<br />"

            descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
            descText += `  <tr>`
            descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`
            descText += `    <td valign="top"><b>healer</b></td>`
            descText += `  </tr>`

            if (level === 1) {
                descText += `  <tr>`
                descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Water Ball</b>, <b>Water Dart</b></b></td>`
                descText += `  </tr>`
            } else if (level === 2) {
                descText += `  <tr>`
                descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Mending Waters</b>, <b>Water Ball</b>, <b>Water Dart</b></b></td>`
                descText += `  </tr>`
            } else if (level === 3) {
                descText += `  <tr>`
                descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b>, <b>Water Dart</b></b></td>`
                descText += `  </tr>`
            } else if (level === 4) {
                descText += `  <tr>`
                descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b>, <b>Water Dart</b>, <b>Water Wave</b></b></td>`
                descText += `  </tr>`
            } else if (level === 5) {
                descText += `  </tr>`
                descText += `  <tr>`
                descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b>, <b>Water Dart</b>, <b>Water Wave</b></b></td>`
                descText += `  </tr>`
                descText += `  <tr>`
                descText += `    <td valign="top">Traits&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Protection</b> (25% personal damage shield)</td>`
                descText += `  </tr>`
            }

            descText += `</table>`
            descText += companionStatsHTML({ buff, level, floor, playerSkills, townBuffLevel })
            return descText
        },
        constants: {
            // fairies don't do much damage, they're purely healers
            accuracy: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 2) * minTowerFloor) / 2.5 + 1)
            },
            attack: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor) / 25 + 1)
            },
            attackMax: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 5) * minTowerFloor) / 25 + 2)
            },
            attackSpeed: function ({ level }) {
                return 0.3
            },
            healthMax: function ({ level, towerFloor, healthSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(Math.sqrt(healthSkill * 3) * minTowerFloor * 6.5 + 200 * level)
            },
            defense: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor) / 2.75 + 5 * level)
            },
            armor: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor) / 1.25 + 5 * level)
            },
            magicArmor: function ({ level, towerFloor, magicSkill, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(
                    (Math.sqrt(magicSkill * 3) * minTowerFloor) / 2 +
                        (Math.sqrt(defenseSkill * 2) * minTowerFloor) / 4 +
                        10 * level
                )
            },
            magicPower: function ({ level, towerFloor, magicSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(Math.sqrt(magicSkill * 3) * minTowerFloor * 0.85 + 10 * level)
            },
            damageTaken: function ({ level }) {
                return level >= 5 ? 0.75 : 1
            },
            healingPower: function ({ level }) {
                return 10 + 5 * level
            }
        },
        data: {
            //hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (!buff.data.isSpawned) {
                    const buffConsts =
                        buff.constants && buff.constants.constants
                            ? buff.constants.constants
                            : lookupBuff(buff.id).constants
                    buff.data.isSpawned = true
                    //buff.data.hideBuff = true;

                    // ** OLD **
                    // this companion won't help in personal quests
                    // this companion won't help in battle with other solo companions
                    //if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {

                    // ** NEW **
                    // this companion won't help in personal quests
                    // this companion won't help in battle if the unit roster is full
                    if (
                        actualBattle.isTower() &&
                        actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5
                    ) {
                        const attackSkill = target.attackSkill()
                        const defenseSkill = target.defenseSkill()
                        const magicSkill = target.magicSkill()
                        const healthSkill = target.healthSkill()

                        let companion = {
                            owner: target.id + "_companion",
                            id: uuid.v4(),
                            tickOffset: 0,
                            isNPC: true,
                            isCompanion: true,
                            isSoloCompanion: true,
                            icon: "fairy2.svg",
                            name: target.name + "'s fairy",
                            stats: {
                                attack: buffConsts.attack({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackMax: buffConsts.attackMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackSpeed: buffConsts.attackSpeed({ level: buff.data.level }),
                                accuracy: buffConsts.accuracy({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                health: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                healthMax: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                defense: buffConsts.defense({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                armor: buffConsts.armor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                magicArmor: buffConsts.magicArmor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill,
                                    defenseSkill
                                }),
                                magicPower: buffConsts.magicPower({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill
                                }),
                                damageTaken: buffConsts.damageTaken({ level: buff.data.level }),
                                healingPower: buffConsts.healingPower({ level: buff.data.level })
                            },
                            buffs: [
                                {
                                    id: "companion_healer",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "companion healer",
                                        icon: "fairyMagic.svg",
                                        level: buff.data.level
                                    }
                                }
                            ]
                        }

                        if (actualBattle.townBuffLevel > 0) {
                            const townBarracksBonus = (actualBattle.townBuffLevel + 1) * 0.015 // 3% - 9%
                            try {
                                Object.keys(companion.stats).forEach((statName) => {
                                    // disallow % bonuses to attack speed or damage taken
                                    if (statName !== "attackSpeed" && statName !== "damageTaken") {
                                        // ensure that property refers to a stat that is a number and valued more than 0 (non-numeric/non-positive/non-zero all disallowed)
                                        if (CDbl(companion.stats[statName]) > 0.0) {
                                            companion.stats[statName] *= 1 + townBarracksBonus
                                        }
                                    }
                                })
                            } catch (err) {}
                        }

                        actualBattle.addUnit(companion)
                    }
                }
            },

            onRemove({ buff, target }) {}
        }
    },

    // Level 1: can auto-attack (speed 0.6) and can cast mending waters (30s CD) and air ball (10s CD)
    // Level 2: can auto-attack (speed 0.65) and can cast water ball (10s CD)
    // Level 3: can auto-attack (speed 0.7) and can use penetrating slash level 4
    // Level 4: can auto-attack (speed 0.75) and can use bleed level 4
    // Level 5: can auto-attack (speed 0.8) and upgrades penetration slash to level 5 and bleed to level 5
    // All levels:  gains attack, accuracy, health, magic power, and healing power for each level
    vd_cupid: {
        duplicateTag: "vd_cupid",
        icon: "eventVDcupid.svg",
        name: "cupid",
        description({ buff, level, playerSkills, floor, townBuffLevel }) {
            let descText = ""

            descText += "Summons a cupid to assist in tower combat. <br />"
            descText += "<br />"

            descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
            descText += `  <tr>`
            descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`
            descText += `    <td valign="top"><b>hybrid</b> (physical damage &amp; healer)</td>`
            descText += `  </tr>`

            if (level === 1) {
                descText += `  <tr>`
                descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b></td>`
                descText += `  </tr>`
            } else if (level === 2) {
                descText += `  <tr>`
                descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b></td>`
                descText += `  </tr>`
            } else if (level === 3) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Penetrating Slash Lv. 4</b></td>`
                descText += `  </tr>`
                descText += `  <tr>`
                descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b></td>`
                descText += `  </tr>`
            } else if (level === 4) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Bleed Lv. 4</b>, <b>Penetrating Slash Lv. 4</b></td>`
                descText += `  </tr>`
                descText += `  <tr>`
                descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b></td>`
                descText += `  </tr>`
            } else if (level === 5) {
                descText += `  <tr>`
                descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Bleed Lv. 5</b>, <b>Penetrating Slash Lv. 5</b></td>`
                descText += `  </tr>`
                descText += `  <tr>`
                descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b></td>`
                descText += `  </tr>`
                descText += `  <tr>`
                descText += `    <td valign="top">Traits&nbsp;&nbsp;&nbsp;</td>`
                descText += `    <td valign="top"><b>Lull</b> (mass charm)</td>`
                descText += `  </tr>`
            }

            descText += `</table>`
            descText += companionStatsHTML({ buff, level, floor, playerSkills, townBuffLevel })
            return descText
        },
        constants: {
            // cupids can attack and mage, they're a hybrid
            accuracy: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor) / 1.85 + 35 * level)
            },
            attack: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 5) * minTowerFloor) / 3.5 + 11 * level)
            },
            attackMax: function ({ level, towerFloor, attackSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(attackSkill * 5) * minTowerFloor) / 1.5 + 32 * level)
            },
            attackSpeed: function ({ level }) {
                return 0.55 + 0.05 * level
            },
            healthMax: function ({ level, towerFloor, healthSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(Math.sqrt(healthSkill * 3) * minTowerFloor * 5 + 200 * level)
            },
            defense: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor) / 3.15 + 5 * level)
            },
            armor: function ({ level, towerFloor, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor) / 1.25 + 5 * level)
            },
            magicArmor: function ({ level, towerFloor, magicSkill, defenseSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(
                    (Math.sqrt(magicSkill * 3) * minTowerFloor) / 2.5 +
                        (Math.sqrt(defenseSkill * 2) * minTowerFloor) / 5 +
                        10 * level
                )
            },
            magicPower: function ({ level, towerFloor, magicSkill }) {
                const minTowerFloor = towerFloor < 5 ? 5 : towerFloor
                return Math.round(Math.sqrt(magicSkill * 3) * minTowerFloor * 0.85 + 10 * level)
            },
            damageTaken: function ({ level }) {
                return 1
            },
            healingPower: function ({ level }) {
                return 5 + 3 * level
            }
        },
        data: {
            //hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (!buff.data.isSpawned) {
                    const buffConsts =
                        buff.constants && buff.constants.constants
                            ? buff.constants.constants
                            : lookupBuff(buff.id).constants
                    buff.data.isSpawned = true
                    //buff.data.hideBuff = true;

                    // ** NEW **
                    // this companion won't help in personal quests
                    // this companion won't help in battle if the unit roster is full
                    if (
                        actualBattle.isTower() &&
                        actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5
                    ) {
                        const attackSkill = target.attackSkill()
                        const defenseSkill = target.defenseSkill()
                        const magicSkill = target.magicSkill()
                        const healthSkill = target.healthSkill()

                        let companion = {
                            owner: target.id + "_companion",
                            id: uuid.v4(),
                            tickOffset: 0,
                            isNPC: true,
                            isCompanion: true,
                            isSoloCompanion: true,
                            icon: "eventVDcupid.svg",
                            name: target.name + "'s cupid",
                            stats: {
                                attack: buffConsts.attack({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackMax: buffConsts.attackMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                attackSpeed: buffConsts.attackSpeed({ level: buff.data.level }),
                                accuracy: buffConsts.accuracy({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    attackSkill
                                }),
                                health: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                healthMax: buffConsts.healthMax({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    healthSkill
                                }),
                                defense: buffConsts.defense({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                armor: buffConsts.armor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    defenseSkill
                                }),
                                magicArmor: buffConsts.magicArmor({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill,
                                    defenseSkill
                                }),
                                magicPower: buffConsts.magicPower({
                                    level: buff.data.level,
                                    towerFloor: actualBattle.towerFloor(),
                                    magicSkill
                                }),
                                damageTaken: buffConsts.damageTaken({ level: buff.data.level }),
                                healingPower: buffConsts.healingPower({ level: buff.data.level })
                            },
                            buffs: [
                                {
                                    id: "vd_cupid_logic",
                                    data: {
                                        duration: Infinity,
                                        totalDuration: Infinity,
                                        name: "companion healer",
                                        icon: "eventVDcupidStuff.svg",
                                        level: buff.data.level
                                    }
                                }
                            ]
                        }

                        if (actualBattle.townBuffLevel > 0) {
                            const townBarracksBonus = (actualBattle.townBuffLevel + 1) * 0.015 // 3% - 9%
                            try {
                                Object.keys(companion.stats).forEach((statName) => {
                                    // disallow % bonuses to attack speed or damage taken
                                    if (statName !== "attackSpeed" && statName !== "damageTaken") {
                                        // ensure that property refers to a stat that is a number and valued more than 0 (non-numeric/non-positive/non-zero all disallowed)
                                        if (CDbl(companion.stats[statName]) > 0.0) {
                                            companion.stats[statName] *= 1 + townBarracksBonus
                                        }
                                    }
                                })

                                // fix companion buff description (new stats)
                                const buffBase =
                                    buff.constants && buff.constants.constants ? buff.constants : lookupBuff(buff.id)
                                buff.data.description = buffBase.description({
                                    buff: buffBase,
                                    level: buff.data.level,
                                    playerSkills: target.skills,
                                    floor: actualBattle.floor,
                                    townBuffLevel: actualBattle.townBuffLevel
                                })
                            } catch (err) {}
                        }

                        actualBattle.addUnit(companion)
                    }
                }
            },

            onRemove({ buff, target }) {}
        }
    },

    companion_skeletal_warrior: {
        duplicateTag: "companion_skeletal_warrior",
        icon: "boneWarrior.svg",
        name: "companion skeletal warrior",
        description() {
            return `Companion will use combat abilities to deal damage.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.timeTillAction = 0.4
                buff.data.CDSlash = 0.0
                buff.data.CDPSlash = 0.0
                buff.data.CDBleed = 0.0
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.CDSlash > 0.0) {
                    buff.data.CDSlash -= secondsElapsed
                }
                if (buff.data.CDPSlash > 0.0) {
                    buff.data.CDPSlash -= secondsElapsed
                }
                if (buff.data.CDBleed > 0.0) {
                    buff.data.CDBleed -= secondsElapsed
                }

                if (buff.data.timeTillAction > 0) {
                    buff.data.timeTillAction -= secondsElapsed
                } else {
                    // Do nothing with a third of our available ticks (except the above CD redux)
                    if (Math.random() <= 0.333) {
                        return
                    }

                    // just some debug stuff
                    /*
          const myAllies = target.allies;
          if (myAllies && myAllies.length > 0) {
            console.log(`My allies unit is '${myAllies[0].name}'.`);
          } else {
            console.log("I don't have an allies.");
          }

          const myOpposition = target.opposition;
          if (myOpposition && myOpposition.length > 0) {
            console.log(`My opposition first unit is '${myOpposition[0].name}'.`);
          } else {
            console.log("I don't have any opposition.");
          }

          const myTargetUnit = target.targetUnit;
          if (myTargetUnit) {
            console.log(`The unit I'm targeting is '${myTargetUnit.name}'.`);
          } else {
            console.log(`I don't have any unit targeted (${target.target}.`);
          }

          const toMyLeft = target.leftSideAlly;
          if (toMyLeft) {
            console.log(`The unit on my left is '${toMyLeft.name}'.`);
          } else {
            console.log("I don't have any unit on my left.");
          }

          const toMyRight = target.rightSideAlly;
          if (toMyRight) {
            console.log(`The unit on my right is '${toMyRight.name}'.`);
          } else {
            console.log("I don't have any unit on my right.");
          }
          */

                    if (target.stats.health / target.stats.healthMax < 0.5) {
                        buff.customText = "!!"
                        buff.icon = "boneWarriorRed.svg"
                    } else {
                        buff.customText = ""
                        buff.icon = "boneWarrior.svg"
                    }

                    // Note: always accept whatever target we're on automatically, no re-targeting

                    // START: logic for targets
                    const ourTargetUnit = target.targetUnit
                    if (!ourTargetUnit) {
                        return
                    }
                    const targetIsArmored = ourTargetUnit.hasBuff("crab_monster")
                    const targetIsDodging = ourTargetUnit.hasBuff("evasive_maneuvers")
                    // END: logic for targets

                    try {
                        if (!targetIsDodging && !targetIsArmored) {
                            if (buff.data.level >= 3 && buff.data.CDBleed <= 0.0 && ourTargetUnit.stats.health >= 400) {
                                // START: use Bleed
                                target.applyBuffTo({
                                    buff: target.generateBuff({
                                        buffId: "bleed",
                                        buffData: {
                                            duration: 15,
                                            level:
                                                buff.data.level === 1
                                                    ? 1
                                                    : buff.data.level === 2
                                                    ? 1
                                                    : buff.data.level === 3
                                                    ? 1
                                                    : buff.data.level === 4
                                                    ? 2
                                                    : buff.data.level === 5
                                                    ? 2
                                                    : 1
                                        }
                                    }),
                                    target: ourTargetUnit
                                })
                                buff.data.CDBleed = 30.0
                                // END: use Bleed
                            }

                            if (buff.data.CDSlash <= 0.0) {
                                // START: use Slash
                                target.applyBuffTo({
                                    buff: target.generateBuff({
                                        buffId: "slash",
                                        buffData: {
                                            level:
                                                buff.data.level === 1
                                                    ? 1
                                                    : buff.data.level === 2
                                                    ? 2
                                                    : buff.data.level === 3
                                                    ? 2
                                                    : buff.data.level === 4
                                                    ? 3
                                                    : buff.data.level === 5
                                                    ? 3
                                                    : 1
                                        }
                                    }),
                                    target: ourTargetUnit
                                })
                                buff.data.CDSlash = 5.0
                                // END: use Slash
                            }

                            if (buff.data.level >= 2 && buff.data.CDPSlash <= 0.0) {
                                // START: use Penetrating Slash
                                target.applyBuffTo({
                                    buff: target.generateBuff({
                                        buffId: "penetrating_slash",
                                        buffData: {
                                            level:
                                                buff.data.level === 1
                                                    ? 1
                                                    : buff.data.level === 2
                                                    ? 1
                                                    : buff.data.level === 3
                                                    ? 1
                                                    : buff.data.level === 4
                                                    ? 2
                                                    : buff.data.level === 5
                                                    ? 3
                                                    : 1
                                        }
                                    }),
                                    target: ourTargetUnit
                                })
                                buff.data.CDPSlash = 10.0
                                // END: use Penetrating Slash
                            }
                        }
                    } catch (err) {
                        console.log("Problem with skeleton logic")
                        console.log(err)
                    }

                    buff.data.timeTillAction = 0.4
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    spd_leprechaun_logic: {
        duplicateTag: "spd_leprechaun_logic",
        icon: "eventSPDleprechaun.png",
        name: "companion leprechaun",
        description() {
            return `Companion will use combat abilities to deal damage.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.timeTillAction = 0.4
                buff.data.CDSlash = 0.0
                buff.data.CDPSlash = 0.0
                buff.data.CDBleed = 0.0
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.CDSlash > 0.0) {
                    buff.data.CDSlash -= secondsElapsed
                }
                if (buff.data.CDPSlash > 0.0) {
                    buff.data.CDPSlash -= secondsElapsed
                }
                if (buff.data.CDBleed > 0.0) {
                    buff.data.CDBleed -= secondsElapsed
                }

                if (buff.data.timeTillAction > 0) {
                    buff.data.timeTillAction -= secondsElapsed
                } else {
                    // Do nothing with a third of our available ticks (except the above CD redux)
                    if (Math.random() <= 0.333) {
                        return
                    }

                    // Note: always accept whatever target we're on automatically, no re-targeting

                    // START: logic for targets
                    const ourTargetUnit = target.targetUnit
                    if (!ourTargetUnit) {
                        return
                    }
                    const targetIsArmored = ourTargetUnit.hasBuff("crab_monster")
                    const targetIsDodging = ourTargetUnit.hasBuff("evasive_maneuvers")
                    // END: logic for targets

                    try {
                        if (!targetIsDodging && !targetIsArmored) {
                            if (buff.data.level >= 3 && buff.data.CDBleed <= 0.0 && ourTargetUnit.stats.health >= 400) {
                                // START: use Bleed
                                target.applyBuffTo({
                                    buff: target.generateBuff({
                                        buffId: "bleed",
                                        buffData: {
                                            duration: 15,
                                            level: buff.data.level === 3 ? 3 : 5
                                        }
                                    }),
                                    target: ourTargetUnit
                                })
                                buff.data.CDBleed = 30.0
                                // END: use Bleed
                            }

                            if (buff.data.CDSlash <= 0.0) {
                                // START: use Slash
                                target.applyBuffTo({
                                    buff: target.generateBuff({
                                        buffId: "slash",
                                        buffData: {
                                            level:
                                                buff.data.level === 1
                                                    ? 2
                                                    : buff.data.level === 2
                                                    ? 4
                                                    : buff.data.level === 3
                                                    ? 4
                                                    : 5
                                        }
                                    }),
                                    target: ourTargetUnit
                                })
                                buff.data.CDSlash = 5.0
                                // END: use Slash
                            }

                            if (buff.data.level >= 2 && buff.data.CDPSlash <= 0.0) {
                                // START: use Penetrating Slash
                                target.applyBuffTo({
                                    buff: target.generateBuff({
                                        buffId: "penetrating_slash",
                                        buffData: {
                                            level: buff.data.level === 2 ? 2 : 4
                                        }
                                    }),
                                    target: ourTargetUnit
                                })
                                buff.data.CDPSlash = 10.0
                                // END: use Penetrating Slash
                            }
                        }
                    } catch (err) {
                        console.log("Problem with leprechaun logic")
                        console.log(err)
                    }

                    buff.data.timeTillAction = 0.4
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    spd_leprechaun_heist: {
        duplicateTag: "spd_leprechaun_heist",
        icon: "eventSPDheist.svg",
        name: "heist",
        description() {
            return `Companion loot stuff in combat.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.timeTillAction = 0.4
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.timeTillAction > 0) {
                    buff.data.timeTillAction -= secondsElapsed
                } else {
                    // Do nothing with a third of our available ticks (except the above CD redux)
                    if (Math.random() <= 0.333) {
                        return
                    }

                    // START: logic for targets
                    const ourTargetUnit = target.targetUnit
                    if (!ourTargetUnit) {
                        return
                    }
                    // END: logic for targets

                    if (!ourTargetUnit.hasBuff("spd_leprechaun_theft")) {
                        if (Math.random() <= 0.05) {
                            // 5% chance (every 0.6 seconds after 1/3 ticks wasted) to steal
                            target.applyBuffTo({
                                buff: target.generateBuff({ buffId: "spd_leprechaun_theft" }),
                                target: ourTargetUnit
                            })
                            try {
                                if (!ourTargetUnit.extraLootTable || ourTargetUnit.extraLootTable.length === 0) {
                                    ourTargetUnit.extraLootTable = []
                                }

                                const curFloor =
                                    actualBattle.floor && actualBattle.floor > 0
                                        ? actualBattle.floor
                                        : actualBattle.pqTowerEquivalence()
                                const curRoom = actualBattle.room && actualBattle.room > 0 ? actualBattle.room : 4 // '4' is the average level between 1-7 if we're in PQ or fighting boss
                                const thisOre = actualBattle.lookupOreTier(curFloor)
                                const nextOre = actualBattle.lookupOreTier(curFloor + 1)
                                const thisMetal = actualBattle.lookupMetalTier(curFloor)
                                const thisMetalCapped20 = actualBattle.lookupMetalTier(curFloor > 20 ? 20 : curFloor)
                                const thisWood = actualBattle.lookupWoodTier(curFloor)
                                const nextWood = actualBattle.lookupWoodTier(curFloor + 1)

                                const itemToSteal = lodash.sample([
                                    "poison_shard_fragment",
                                    "poison_shard_fragment",
                                    "poison_shard_fragment",
                                    "poison_shard_fragment",
                                    "poison_shard_fragment",
                                    "fire_shard_fragment",
                                    "fire_shard_fragment",
                                    "fire_shard_fragment",
                                    "water_shard_fragment",
                                    "water_shard_fragment",
                                    "water_shard_fragment",
                                    "earth_shard_fragment",
                                    "earth_shard_fragment",
                                    "earth_shard_fragment",
                                    "air_shard_fragment",
                                    "air_shard_fragment",
                                    "air_shard_fragment",
                                    "complete_fire_shard",
                                    "complete_water_shard",
                                    "complete_earth_shard",
                                    "complete_air_shard",
                                    "lavender",
                                    "lavender",
                                    "lavender",
                                    "chilli",
                                    "chilli",
                                    "nasturtium",
                                    "feverfew",
                                    "celery",
                                    "lemon_honey",
                                    "tamarind_honey",
                                    "cardoon",
                                    "sorrell",
                                    "catnip",
                                    `ore_${thisOre}`,
                                    `ore_${thisOre}`,
                                    `ore_${thisOre}`,
                                    `ore_${nextOre}`,
                                    `ore_${nextOre}`,
                                    `ore_${thisWood}`,
                                    `ore_${thisWood}`,
                                    `ore_${thisWood}`,
                                    `ore_${nextWood}`,
                                    `ore_${nextWood}`,
                                    "companion_token"
                                ])

                                ourTargetUnit.extraLootTable = ourTargetUnit.extraLootTable.concat([
                                    { id: itemToSteal, chance: 1.0 }
                                ])
                            } catch (err) {
                                console.log("Problem in leprechaun Heist trait logic:")
                                console.log(err)
                            }
                        }
                    }

                    buff.data.timeTillAction = 0.4
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    spd_leprechaun_theft: {
        duplicateTag: "spd_leprechaun_theft",
        icon: "eventSPDtheft.svg",
        name: "theft",
        description({ buff, level }) {
            return ""
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    companion_pig_logic: {
        duplicateTag: "companion_pig_logic",
        icon: "cutePig.svg",
        name: "piggy oink oink",
        description() {
            return `Companion will do pig things.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            timeTillCharge: 0.4,
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.hideBuff = true
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.timeTillCharge > 0) {
                    buff.data.timeTillCharge -= secondsElapsed
                } else {
                    // Do nothing with a third of our available ticks (except the above CD redux)
                    if (Math.random() <= 0.333) {
                        return
                    }

                    if (target.health / target.healthMax < 0.5) {
                        // START: logic Evasive Maneuvers
                        target.applyBuff({
                            buff: target.generateBuff({
                                buffId: "evasive_maneuvers",
                                buffData: {
                                    duration: 3.5,
                                    level: 5
                                }
                            })
                        })
                        buff.data.timeTillCharge = 40
                        // END: logic Evasive Maneuvers
                    } else {
                        buff.data.timeTillCharge = 0.4
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    companion_pig_logic_lny: {
        duplicateTag: "companion_pig_logic_lny",
        icon: "eventLNYPig.png",
        name: "piggy oink oink",
        description() {
            return `Companion will do pig things.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            timeTillCharge: 0.4,
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.hideBuff = true
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.timeTillCharge > 0) {
                    buff.data.timeTillCharge -= secondsElapsed
                } else {
                    // Use all ticks that aren't throttled by timeTillCharge

                    if (target.health / target.healthMax < 0.5) {
                        // START: logic Evasive Maneuvers
                        target.applyBuff({
                            buff: target.generateBuff({
                                buffId: "evasive_maneuvers",
                                buffData: {
                                    duration: 3.5,
                                    level: 5
                                }
                            })
                        })
                        buff.data.timeTillCharge = buff.data.level === 5 ? 15 : 40
                        // END: logic Evasive Maneuvers
                    } else {
                        buff.data.timeTillCharge = 0.4
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    companion_taunt: {
        duplicateTag: "companion_taunt",
        icon: "taunt.svg",
        name: "companion taunt",
        description() {
            return `Companion will taunt random targets.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            timeTillCharge: 0.4
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.timeTillCharge > 0) {
                    buff.data.timeTillCharge -= secondsElapsed
                } else {
                    // Do nothing with half our ticks (except the above CD redux)
                    if (Math.random() < 0.5) {
                        return
                    }

                    const targetToTaunt = lodash.sample(target.opposition)
                    if (targetToTaunt && targetToTaunt.target !== target.id) {
                        targetToTaunt.target = target.id
                        buff.data.timeTillCharge = buff.data.level > 1 ? 4 : 7
                        // combat node/server doesn't have access to database or schema
                        //companionChat({ companion: target, message: 'I taunted the ' + targetToTaunt.name + '!' });
                        companionEvent({ actualBattle, companion: target, info: "Oink!", color: "#DF4682" })
                        companionEvent({
                            actualBattle,
                            companion: target,
                            info: "?!?",
                            color: "#DF8246",
                            target: targetToTaunt
                        })
                    } else {
                        buff.data.timeTillCharge = 0.4
                    }
                }

                buff.stacks = Math.round(buff.data.timeTillCharge)
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    companion_squeal: {
        duplicateTag: "companion_squeal",
        icon: "scream.svg",
        name: "companion squeal",
        description() {
            return `Companion will squeal at all enemies.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            timeTillCharge: 0.4
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.timeTillCharge > 0) {
                    buff.data.timeTillCharge -= secondsElapsed
                }

                if (buff.data.timeTillCharge <= 0.0) {
                    // Do nothing with a third of our available ticks (except the above CD redux)
                    if (Math.random() <= 0.333) {
                        return
                    }

                    if (!actualBattle.isExplorationRun || actualBattle.room >= 3 || actualBattle.room === "boss") {
                        if (target.opposition.length > 1) {
                            let neededToScream = false
                            target.opposition.forEach((enemy) => {
                                if (enemy.target !== target.id) {
                                    neededToScream = true
                                    enemy.target = target.id
                                    companionEvent({
                                        actualBattle,
                                        companion: target,
                                        info: "?!?",
                                        color: "#DF8246",
                                        target: enemy
                                    })
                                }
                            })
                            if (neededToScream) {
                                companionEvent({ actualBattle, companion: target, info: "Squeal!", color: "#DF4682" })
                                buff.data.timeTillCharge = 25
                            }
                        }
                    }
                }

                // tick throttling if there's nothing to do
                if (buff.data.timeTillCharge < 0.0) {
                    buff.data.timeTillCharge = 0.4
                }

                buff.stacks = Math.round(buff.data.timeTillCharge)
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    companion_healer: {
        duplicateTag: "companion_healer",
        icon: "fairyMagic.svg",
        name: "companion healer",
        description() {
            return `Companion will use magic to heal and serve.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.timeTillAction = 0.0
                buff.data.CDAirBall = 0.0
                buff.data.CDMend = 0.0
                buff.data.CDWaterBall = 0.0
                buff.data.CDWaterDart = 0.0
                buff.data.CDWaterWave = 0.0
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let castAnyHeal = false
                const healthMaxAtStart = target.stats.healthMax

                if (buff.data.CDAirBall > 0.0) {
                    buff.data.CDAirBall -= secondsElapsed
                }
                if (buff.data.CDMend > 0.0) {
                    buff.data.CDMend -= secondsElapsed
                }
                if (buff.data.CDWaterBall > 0.0) {
                    buff.data.CDWaterBall -= secondsElapsed
                }
                if (buff.data.CDWaterDart > 0.0) {
                    buff.data.CDWaterDart -= secondsElapsed
                }
                if (buff.data.CDWaterWave > 0.0) {
                    buff.data.CDWaterWave -= secondsElapsed
                }

                if (buff.data.timeTillAction > 0.0) {
                    buff.data.timeTillAction -= secondsElapsed
                } else {
                    // Note: using all ticks

                    // Note: always accept whatever target we're on automatically, no re-targeting

                    // START: logic for targets
                    const ourTargetUnit = target.targetUnit
                    if (!ourTargetUnit) {
                        return
                    }
                    const targetIsAired = ourTargetUnit.hasBuff("air_ball")
                    const targetIsArmored = ourTargetUnit.hasBuff("crab_monster")
                    const targetIsDodging = ourTargetUnit.hasBuff("evasive_maneuvers")
                    // END: logic for targets

                    // START: logic Air Ball
                    try {
                        if (buff.data.level >= 3 && buff.data.CDAirBall <= 0.0 && target.stats.healthMax >= 400) {
                            if (actualBattle.isTower()) {
                                if (
                                    !actualBattle.isExplorationRun ||
                                    actualBattle.room >= 4 ||
                                    actualBattle.room === "boss"
                                ) {
                                    if (!targetIsArmored && !targetIsDodging && !targetIsAired) {
                                        // START: cast Air Ball
                                        // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                                        target.applyBuffTo({
                                            buff: target.generateBuff({
                                                buffId: "air_ball",
                                                buffData: {
                                                    duration: 7
                                                }
                                            }),
                                            target: ourTargetUnit
                                        })
                                        buff.data.CDAirBall = 10.0
                                        // END: cast Air Ball
                                    }
                                }
                            }
                        }
                    } catch (err) {}
                    // END: logic Air Ball

                    // START: logic healing spells
                    try {
                        const unitsHealthSorted = _.sortBy(target.team, function (unit) {
                            return unit.stats.health / unit.stats.healthMax
                        })
                        const unitsHealthSortedNoMending = unitsHealthSorted.filter((unit) => {
                            return !unit.hasBuff("mending_water")
                        })
                        const lowHealthTest = unitsHealthSorted[0].stats.health / unitsHealthSorted[0].stats.healthMax
                        const lowHealthTestNoMending = unitsHealthSortedNoMending
                            ? unitsHealthSortedNoMending[0].stats.health / unitsHealthSortedNoMending[0].stats.healthMax
                            : 1.0
                        if (
                            !castAnyHeal &&
                            unitsHealthSorted.length >= 3 &&
                            buff.data.level >= 4 &&
                            buff.data.CDWaterWave <= 0.0 &&
                            unitsHealthSorted[0].stats.health / unitsHealthSorted[0].stats.healthMax < 0.7 &&
                            unitsHealthSorted[1].stats.health / unitsHealthSorted[1].stats.healthMax < 0.8 &&
                            unitsHealthSorted[2].stats.health / unitsHealthSorted[2].stats.healthMax < 0.8
                        ) {
                            try {
                                // START: cast Water Wave
                                target.team.forEach((unitToWaterWave) => {
                                    // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                                    target.applyBuffTo({
                                        buff: target.generateBuff({
                                            buffId: "water_wave"
                                        }),
                                        target: unitToWaterWave
                                    })
                                })
                                buff.data.CDWaterWave = 20.0
                                castAnyHeal = true
                                // END: cast Water Wave
                            } catch (err) {}
                        }
                        if (lowHealthTest < 0.7) {
                            if (!castAnyHeal && buff.data.CDWaterBall <= 0.0) {
                                // START: cast Water Ball
                                // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                                target.applyBuffTo({
                                    buff: target.generateBuff({
                                        buffId: "water_ball"
                                    }),
                                    target: unitsHealthSorted[0]
                                })
                                buff.data.CDWaterBall = 10.0
                                castAnyHeal = true
                                // END: cast Water Ball
                            }
                            if (
                                !castAnyHeal &&
                                buff.data.level >= 2 &&
                                lowHealthTestNoMending < 0.7 &&
                                buff.data.CDMend <= 0.0 &&
                                unitsHealthSortedNoMending[0].stats.healthMax >= 500
                            ) {
                                // START: cast Mending Water
                                target.applyBuffTo({
                                    buff: target.generateBuff({
                                        buffId: "mending_water",
                                        buffData: {
                                            duration: 20
                                        }
                                    }),
                                    target: unitsHealthSortedNoMending[0]
                                })
                                buff.data.CDMend = 30.0
                                castAnyHeal = true
                                // END: cast Mending Water
                            }
                        }
                        if (lowHealthTest < 0.85) {
                            // water dart
                            if (!castAnyHeal && buff.data.CDWaterDart <= 0.0) {
                                // START: cast Water Dart
                                // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                                target.applyBuffTo({
                                    buff: target.generateBuff({
                                        buffId: "water_dart"
                                    }),
                                    target: unitsHealthSorted[0]
                                })
                                buff.data.CDWaterDart = 10.0
                                castAnyHeal = true
                                // END: cast Water Dart
                            }
                        }
                    } catch (err) {}
                    // END: logic healing spells

                    if (castAnyHeal) {
                        if (healthMaxAtStart === target.stats.healthMax) {
                            // if we tried to cast a heal spell but our health max at the start and end wre the same, then we couldn't afford to cast anything
                            buff.data.timeTillAction = 5.0
                        }
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    vd_cupid_logic: {
        duplicateTag: "vd_cupid_logic",
        icon: "eventVDcupidStuff.svg",
        name: "companion healer",
        description() {
            return `Companion will use magic to heal and serve.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.CDAirBall = 0.0
                buff.data.CDMend = 0.0
                ;(buff.data.CDWaterBall = 0.0), (buff.data.CDPSlash = 0.0)
                buff.data.CDBleed = 0.0
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let castAnyHeal = false
                const healthMaxAtStart = target.stats.healthMax

                if (buff.data.CDAirBall > 0.0) {
                    buff.data.CDAirBall -= secondsElapsed
                }
                if (buff.data.CDMend > 0.0) {
                    buff.data.CDMend -= secondsElapsed
                }
                if (buff.data.CDWaterBall > 0.0) {
                    buff.data.CDWaterBall -= secondsElapsed
                }
                if (buff.data.CDPSlash > 0.0) {
                    buff.data.CDPSlash -= secondsElapsed
                }
                if (buff.data.CDBleed > 0.0) {
                    buff.data.CDBleed -= secondsElapsed
                }

                // Note: using two-thirds of all ticks
                if (Math.random() <= 0.333) {
                    return
                }

                // Note: always accept whatever target we're on automatically, no re-targeting

                // START: logic for targets
                const ourTargetUnit = target.targetUnit
                if (!ourTargetUnit) {
                    return
                }
                const targetIsAired = ourTargetUnit.hasBuff("air_ball")
                const targetIsArmored = ourTargetUnit.hasBuff("crab_monster")
                const targetIsDodging = ourTargetUnit.hasBuff("evasive_maneuvers")
                // END: logic for targets

                // START: logic mass charm every ~15 seconds
                try {
                    if (buff.data.level >= 5) {
                        if (Math.random() < 0.01333) {
                            target.opposition.forEach((enemy) => {
                                const newBuff = {
                                    id: "charm",
                                    data: {
                                        icon: "eventVDhearts.svg",
                                        description: ``,
                                        name: "charm",
                                        level: 1,
                                        duration: 5,
                                        totalDuration: 5,
                                        wasCharmed: false
                                    },
                                    constants: lookupBuff("charm")
                                }
                                addBuff({ buff: newBuff, target: enemy, caster: target, actualBattle })
                            })
                        }
                    }
                } catch (err) {}
                // END: logic mass charm

                try {
                    if (!targetIsDodging && !targetIsArmored) {
                        if (buff.data.level >= 3 && buff.data.CDPSlash <= 0.0) {
                            // START: use Penetrating Slash
                            target.applyBuffTo({
                                buff: target.generateBuff({
                                    buffId: "penetrating_slash",
                                    buffData: {
                                        level: buff.data.level === 5 ? 5 : 4
                                    }
                                }),
                                target: ourTargetUnit
                            })
                            buff.data.CDPSlash = 10.0
                            // END: use Penetrating Slash
                        }

                        if (buff.data.level >= 4 && buff.data.CDBleed <= 0.0 && ourTargetUnit.stats.health >= 400) {
                            // START: use Bleed
                            target.applyBuffTo({
                                buff: target.generateBuff({
                                    buffId: "bleed",
                                    buffData: {
                                        duration: 15,
                                        level: buff.data.level === 5 ? 5 : 4
                                    }
                                }),
                                target: ourTargetUnit
                            })
                            buff.data.CDBleed = 30.0
                            // END: use Bleed
                        }
                    }
                } catch (err) {}

                // START: logic Air Ball
                try {
                    if (buff.data.level >= 1 && buff.data.CDAirBall <= 0.0 && target.stats.healthMax >= 400) {
                        if (actualBattle.isTower()) {
                            if (
                                !actualBattle.isExplorationRun ||
                                actualBattle.room >= 4 ||
                                actualBattle.room === "boss"
                            ) {
                                if (!targetIsArmored && !targetIsDodging && !targetIsAired) {
                                    // START: cast Air Ball
                                    // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                                    target.applyBuffTo({
                                        buff: target.generateBuff({
                                            buffId: "air_ball"
                                        }),
                                        target: ourTargetUnit
                                    })
                                    buff.data.CDAirBall = 10.0
                                    // END: cast Air Ball
                                }
                            }
                        }
                    }
                } catch (err) {}
                // END: logic Air Ball

                // START: logic healing spells
                try {
                    const unitsHealthSorted = _.sortBy(target.team, function (unit) {
                        return unit.stats.health / unit.stats.healthMax
                    })
                    const unitsHealthSortedNoMending = unitsHealthSorted.filter((unit) => {
                        return !unit.hasBuff("mending_water")
                    })
                    const lowHealthTest = unitsHealthSorted[0].stats.health / unitsHealthSorted[0].stats.healthMax
                    const lowHealthTestNoMending = unitsHealthSortedNoMending
                        ? unitsHealthSortedNoMending[0].stats.health / unitsHealthSortedNoMending[0].stats.healthMax
                        : 1.0
                    if (lowHealthTest < 0.7) {
                        if (!castAnyHeal && buff.data.level >= 2 && buff.data.CDWaterBall <= 0.0) {
                            // START: cast Water Ball
                            // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                            target.applyBuffTo({
                                buff: target.generateBuff({
                                    buffId: "water_ball"
                                }),
                                target: unitsHealthSorted[0]
                            })
                            buff.data.CDWaterBall = 10.0
                            castAnyHeal = true
                            // END: cast Water Ball
                        }
                        if (
                            !castAnyHeal &&
                            buff.data.level >= 1 &&
                            lowHealthTestNoMending < 0.7 &&
                            buff.data.CDMend <= 0.0 &&
                            unitsHealthSortedNoMending[0].stats.healthMax >= 500
                        ) {
                            // START: cast Mending Water
                            // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                            target.applyBuffTo({
                                buff: target.generateBuff({
                                    buffId: "mending_water",
                                    buffData: {
                                        duration: 20
                                    }
                                }),
                                target: unitsHealthSortedNoMending[0]
                            })
                            buff.data.CDMend = 30.0
                            castAnyHeal = true
                            // END: cast Mending Water
                        }
                    }
                } catch (err) {}
                // END: logic healing spells
            },

            onRemove({ buff, target, caster }) {}
        }
    }
}
