import { BUFFS } from "../../../../imports/constants/buffs/index.js"
import { ABILITIES } from "../../../constants/combat/index.js"

import request from "request-promise"

import { Server } from "socket.io"
import { addBuff } from "../../../battleUtils.js"
import { serverUrl } from "../config.js"
import { battleAction } from "../types/battleAction.js"
import { HistoryStats } from "../types/historyStats.js"
import { unit } from "../types/unit.js"
import { lookupMetalTier } from "../utils/lookupMetalTier.js"
import { lookupOreTier } from "../utils/lookupOreTier.js"
import { lookupWoodTier } from "../utils/lookupWoodTier.js"
import { TICK_DURATION, autoAttack } from "./autoAttack.js"
import { castAbility } from "./castAbility.js"
import { checkDeath } from "./checkDeath.js"
import { dealDamage } from "./dealDamage.js"
import { healTarget } from "./healTarget.js"
import { applyBattleActions } from "./tickMethods/applyBattleActions.js"
import { checkGameOverConditions } from "./tickMethods/checkGameOverConditions.js"
import { inactivePlayers } from "./tickMethods/inactivePlayers.js"
import { initPassives } from "./tickMethods/initPassives.js"
import { postTick } from "./tickMethods/postTick.js"
import { tickUnitsAndBuffs } from "./tickMethods/tickUnitsAndBuffs.js"
import { unitAutoAttacks } from "./tickMethods/unitAutoAttacks.js"
import { updateAbilityCooldowns } from "./tickMethods/updateAbilityCookdowns.js"
import Unit from "./unit/index.js"

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1
    }
}

const isUnitClass = (value: any): value is Unit => {
    return value != null && value.hasOwnProperty("isUnitClass") && value.isUnitClass
}

export const balancers: { [k in string]: Balancer } = {}

export class Balancer {
    id: any
    io: any
    battleRef?: Battle
    constructor(id: string, io: Server, battleRef?: Battle) {
        this.id = id
        this.io = io

        if (battleRef) {
            this.battleRef = battleRef
        }

        io.of(`/${id}`).on("connection", async (socket: any) => {
            socket.on("action", (data: any) => {
                if (this.battleRef) {
                    if (data.abilityId) {
                        const abilityConsts = ABILITIES[data.abilityId as keyof typeof ABILITIES]
                        if (abilityConsts) {
                            // @ts-expect-error
                            if (abilityConsts.isPassive) {
                                return // disallow passive abilities from being actively used
                            } else if (abilityConsts.slot === "companion") {
                                return // disallow companion abilities from being actively used
                            }
                        }
                    }
                    this.battleRef.battleActions.push(data)
                }
            })
            socket.on("getFullState", () => {
                if (this.battleRef) {
                    this.battleRef.sendFullState()
                }
            })
        })
    }

    updateRef(battleRef: Battle) {
        this.battleRef = battleRef
    }

    remove() {
        delete this.battleRef
    }
}

export type actualBattle = {
    _id: string
    createdAt: Date
    updatedAt: Date
    owners: string[]
    floor: number
    room: "boss" | number
    wave: number
    level: number
    historyStats: { [k in string]: HistoryStats }
    isTowerContribution: boolean
    isExplorationRun: boolean
    tickEvents: any[]
    units: unit[]
    useStreamy: boolean
    enemies: any[]
    tbl: number
    totalXpGain: any
    startingBossHp: any
    isOldBoss: boolean
    server: any
}

type removeBattle = (id: string, intervalId: NodeJS.Timer) => void

export default class Battle {
    floor: number
    room: "boss" | number
    id: string
    io: Server
    level: number
    removeBattle: removeBattle
    balancer: string
    forfitters: { [k in string]: boolean }
    historyStats: { [k in string]: HistoryStats }
    wave: number
    isExplorationRun: any
    owners: any
    totalXpGain: any
    startingBossHp: any
    isOldBoss: any
    server: any
    deltaEvents: any[]
    battleActions: battleAction[]
    tickEvents: any[]
    deadUnits: any[]
    deadEnemies: any[]
    completedEnemies: Unit[]
    bonusLoot: number
    allAliveUnits: Unit[]
    townBuffLevel: any
    units: Unit[]
    enemies: Unit[]
    tickCount: number
    intervalId: NodeJS.Timer
    unitsMap: { [k in string]: Unit }
    enemiesMap: { [k in string]: Unit }
    allUnitsMap: { [k in string]: Unit }

    // Tick method #1
    public initPassives = initPassives
    // Tick method #2
    public inactivePlayers = inactivePlayers
    // Tick method #3
    public tickUnitsAndBuffs = tickUnitsAndBuffs
    // Tick method #4
    public unitAutoAttacks = unitAutoAttacks
    // Tick method #5
    public applyBattleActions = applyBattleActions
    // Tick method #6
    public updateAbilityCooldowns = updateAbilityCooldowns
    // Tick method #7
    public checkGameOverConditions = checkGameOverConditions
    // Tick method #8
    public postTick = postTick

    public autoAttack = autoAttack
    public dealDamage = dealDamage
    public castAbility = castAbility
    public healTarget = healTarget
    public checkDeath = checkDeath

    constructor(battle: actualBattle, balancer: string, io: Server, removeBattle: removeBattle) {
        this.removeBattle = removeBattle
        this.balancer = balancer

        const bal = balancers[balancer]
        if (!bal) {
            balancers[balancer] = new Balancer(balancer, io, this)
        } else {
            bal.updateRef(this)
        }

        this.io = io

        this.id = battle._id
        this.level = battle.level
        this.forfitters = {}
        this.historyStats = battle.historyStats
        this.wave = battle.wave
        this.room = battle.room
        this.floor = battle.floor
        this.isExplorationRun = battle.isExplorationRun
        this.owners = battle.owners
        this.totalXpGain = battle.totalXpGain
        this.startingBossHp = battle.startingBossHp
        this.isOldBoss = battle.isOldBoss
        this.server = battle.server
        this.unitsMap = {}
        this.enemiesMap = {}
        this.allUnitsMap = {}
        // { type, data }
        // types:
        //   abs: absolute change
        //   add: numeric addition
        //   push: add to array
        //   pop: remove from array
        // }
        this.deltaEvents = []
        this.battleActions = []
        this.tickEvents = []
        this.deadUnits = []
        this.deadEnemies = []
        this.completedEnemies = []
        this.bonusLoot = 0.0
        this.allAliveUnits = []

        this.townBuffLevel = battle.tbl || 0

        this.units = battle.units.map((unit) => new Unit(unit, this))
        this.enemies = battle.enemies.map((unit) => new Unit(unit, this))
        this.tickCount = 0
        this.initHelpers()
        this.intervalId = setInterval(() => {
            this.tick()
        }, TICK_DURATION)
    }

    isTower() {
        return (this.floor && this.floor > 0) || this.room === "boss"
    }

    isPQ() {
        return !this.isTower()
    }

    towerFloor() {
        return this.isTower() ? this.floor : 0
    }

    pqLevel() {
        return !this.isTower() ? this.level : 0
    }

    public lookupOreTier = lookupOreTier
    public lookupMetalTier = lookupMetalTier
    public lookupWoodTier = lookupWoodTier

    // not the same as 'reward level' exactly (reward level - 1)
    pqTowerEquivalence() {
        const currentPqLevel = this.pqLevel()
        if (currentPqLevel < 5) {
            return 0
        }
        if (currentPqLevel < 10) {
            return 1
        }
        if (currentPqLevel < 15) {
            return 2
        }
        if (currentPqLevel < 20) {
            return 3
        }
        if (currentPqLevel < 35) {
            return 4
        }
        if (currentPqLevel < 45) {
            return 5
        }
        if (currentPqLevel < 55) {
            return 6
        }
        if (currentPqLevel < 70) {
            return 7
        }
        if (currentPqLevel < 85) {
            return 8
        }
        if (currentPqLevel < 95) {
            return 9
        }
        if (currentPqLevel < 105) {
            return 10
        }
        if (currentPqLevel < 120) {
            return 11
        }
        if (currentPqLevel < 130) {
            return 12
        }
        if (currentPqLevel < 140) {
            return 13
        }
        if (currentPqLevel < 150) {
            return 14
        }
        if (currentPqLevel < 160) {
            return 15
        }
        if (currentPqLevel < 170) {
            return 16
        }
        if (currentPqLevel < 180) {
            return 17
        }
        if (currentPqLevel < 190) {
            return 18
        }
        if (currentPqLevel < 200) {
            return 19
        }
        return 20
    }

    alliedPlayers() {
        try {
            const PCUnits = this.units.filter((unit) => {
                return !unit.isNPC && !unit.isCompanion && !unit.isSoloCompanion
            })
            if (PCUnits) {
                return PCUnits
            }
        } catch (err) {}
        return []
    }

    alliedNPCs() {
        try {
            const NPCUnits = this.units.filter((unit) => {
                return unit.isNPC
            })
            if (NPCUnits) {
                return NPCUnits
            }
        } catch (err) {}
        return []
    }

    haveAnyAlliedNPCs() {
        return this.alliedNPCs().length > 0
    }

    companions() {
        try {
            const companionUnits = this.units.filter((unit) => {
                return unit.isCompanion
            })
            if (companionUnits) {
                return companionUnits
            }
        } catch (err) {}
        return []
    }

    haveAnyCompanions() {
        return this.companions().length > 0
    }

    soloCompanions() {
        try {
            const soloCompanionUnits = this.units.filter((unit) => {
                return unit.isSoloCompanion
            })
            if (soloCompanionUnits) {
                return soloCompanionUnits
            }
        } catch (err) {}
        return []
    }

    haveAnySoloCompanions() {
        return this.soloCompanions().length > 0
    }

    initHelpers() {
        this.updateUnitMaps()
    }

    updateUnitMaps() {
        this.unitsMap = {}
        this.enemiesMap = {}
        this.allUnitsMap = {}
        this.units.concat(this.deadUnits).forEach((unit) => {
            this.allUnitsMap[unit.id] = unit
            this.unitsMap[unit.id] = unit
        })
        this.enemies.concat(this.deadEnemies).forEach((enemy) => {
            this.allUnitsMap[enemy.id] = enemy
            this.enemiesMap[enemy.id] = enemy
        })
        this.allAliveUnits = this.units.concat(this.enemies)
    }

    tick() {
        if (this.tickCount === 0) {
            this.initPassives()
        }

        // First 4 ticks (~800ms) of every new combat and 2 ticks (~400ms) of new room transitions for full-floor explorations
        // will deny auto-attacks and losses, giving players a chance to assess the combat and use taunts and heals.

        this.inactivePlayers()

        this.tickUnitsAndBuffs()

        if (this.tickCount >= 4) {
            this.unitAutoAttacks(this.enemies)
            this.unitAutoAttacks(this.units)
        }

        this.applyBattleActions()

        this.updateAbilityCooldowns()

        if (this.tickCount >= 4) this.checkGameOverConditions()

        this.tickCount++
        this.postTick()
    }

    addUnit(unit: unit | Unit) {
        if (!isUnitClass(unit)) {
            unit = new Unit(unit, this)
        }

        if (!this.historyStats) {
            this.historyStats = {}
            this.historyStats[unit.id] = {
                name: unit.name,
                damageDone: 0,
                damageTaken: 0,
                healingDone: 0,
                damageDoneCompanion: 0,
                damageTakenCompanion: 0,
                healingDoneCompanion: 0
            }
        }

        if (unit.isEnemy) {
            const event = { type: "push", path: "enemies", value: unit.raw() }
            this.deltaEvents.push(event)
            this.enemies.push(unit)
        } else {
            const event = { type: "push", path: "units", value: unit.raw() }
            this.deltaEvents.push(event)
            this.units.push(unit)
        }

        this.updateUnitMaps()

        // when a new unit is spawned in from an effect such as companion or bosses spawning adds, etc.
        if (unit.isEnemy) {
            const newBuff = {
                id: "name_changer_common",
                data: {
                    duration: Infinity,
                    totalDuration: Infinity,
                    icon: "",
                    description: "",
                    name: "",
                    hideBuff: true
                },
                constants: BUFFS["name_changer_common"]
            }

            addBuff({ buff: newBuff, target: unit, caster: unit, actualBattle: this })
        }

        return unit
    }

    removeUnit(targetUnit: Unit) {
        if (targetUnit.isEnemy) {
            this.deadEnemies.push(targetUnit)
            this.enemies = this.enemies.filter((enemy) => {
                return enemy.id !== targetUnit.id
            })
            this.deltaEvents.push({ type: "pop", path: "enemies", value: targetUnit.id })
        } else {
            this.deadUnits.push(targetUnit)
            this.units = this.units.filter((unit) => {
                return unit.id !== targetUnit.id
            })
            this.deltaEvents.push({ type: "pop", path: "units", value: targetUnit.id })
        }
        this.updateUnitMaps()
    }

    sendFullState() {
        try {
            const data = this
            const connections = data.io.of(`/${this.balancer}`)

            // Disabled: don't emit to disconnected sockets
            // this.io.of(`/${this.balancer}`).emit("fullState", {
            //     battle: {
            //         units: this.units.map((unit) => unit.raw()),
            //         enemies: this.enemies.map((unit) => unit.raw()),
            //         tickEvents: this.tickEvents,
            //         floor: this.floor,
            //         room: this.room,
            //         level: this.level,
            //         wave: this.wave,
            //         id: this.id
            //     }
            // })

            Array.from(connections.sockets.entries())
                .map(([k, v]) => ({ [k]: v }))
                .forEach(function (connectedSocket_raw) {
                    try {
                        // @ts-expect-error
                        const connectedSocket = connectedSocket_raw[Object.keys(connectedSocket_raw)[0]]

                        connectedSocket.emit("fullState", {
                            battle: {
                                units: data.units.map((unit) => unit.raw()),
                                enemies: data.enemies.map((unit) => unit.raw()),
                                tickEvents: data.tickEvents,
                                floor: data.floor,
                                room: data.room,
                                level: data.level,
                                wave: data.wave,
                                id: data.id
                            }
                        })
                    } catch (err) {
                        console.log(err)
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    finalCompletedEnemies() {
        let finalDeadEnemies: Unit[] = []

        this.completedEnemies.forEach((this_enemy) => {
            let theres_a_match = false
            finalDeadEnemies.forEach((already_dead_enemy) => {
                if (!theres_a_match && already_dead_enemy.id === this_enemy.id) {
                    theres_a_match = true
                }
            })
            if (!theres_a_match) {
                finalDeadEnemies.push(this_enemy)
            }
        })

        this.deadEnemies.forEach((this_enemy) => {
            let theres_a_match = false
            finalDeadEnemies.forEach((already_dead_enemy) => {
                if (!theres_a_match && already_dead_enemy.id === this_enemy.id) {
                    theres_a_match = true
                }
            })
            if (!theres_a_match) {
                finalDeadEnemies.push(this_enemy)
            }
        })

        return finalDeadEnemies
    }

    finalBonusLoot() {
        let bonusLootAmount = 0.0
        this.finalCompletedEnemies().forEach((enemy) => {
            bonusLootAmount += enemy.bonusLoot || 0.0
        })
        return (this.bonusLoot + bonusLootAmount) / 100.0
    }

    finalExtraLootTable() {
        let extraLootTableStuff: any[] = []
        this.finalCompletedEnemies().forEach((enemy) => {
            if (enemy.extraLootTable && enemy.extraLootTable.length > 0) {
                extraLootTableStuff = extraLootTableStuff.concat(enemy.extraLootTable)
            }
        })
        return extraLootTableStuff
    }

    end() {
        request({
            method: "POST",
            uri: `${serverUrl}/methods/completeBattle`,
            body: [
                {
                    // only players!
                    units: this.units
                        .concat(this.deadUnits)
                        .map((unit) => unit.raw())
                        .filter((unit) => {
                            return !unit.isEnemy && !unit.isNPC && !unit.isCompanion && !unit.isSoloCompanion
                        }),
                    enemies: this.enemies.concat(this.deadEnemies).map((unit) => unit.raw()),
                    floor: this.floor,
                    totalXpGain: this.totalXpGain,
                    startingBossHp: this.startingBossHp,
                    isOldBoss: this.isOldBoss,
                    room: this.room,
                    wave: this.wave,
                    server: this.server,
                    historyStats: this.historyStats,
                    isExplorationRun: this.isExplorationRun,
                    level: this.level,
                    id: this.id,
                    owners: this.owners,
                    completedEnemies: this.finalCompletedEnemies().map((unit) => unit.raw()),
                    bonusLoot: this.finalBonusLoot(),
                    extraLootTable: this.finalExtraLootTable()
                },
                "dqv$dYT65YrU%s"
            ],
            json: true
        })
        const balancer = balancers[this.balancer]
        if (balancer != null) {
            balancer.remove()
        }
        this.removeBattle(this.id, this.intervalId)
    }
}
