import uuid from "node-uuid"
import _ from "underscore"
import type Battle from "../"
import { BUFFS } from "../../../../../imports/constants/buffs"
import { addBuff } from "../../../../battleUtils"
import { BATTLES } from "../../../../constants/battles"
import { FLOORS } from "../../../../constants/floors"
import { enemy } from "../../types/enemy"
import Unit from "./../unit"

export function checkGameOverConditions(this: Battle) {
    if (this.enemies.length === 0 || this.units.length === 0) {
        // Before we end the battle, make sure it shouldn't continue
        if (this.isExplorationRun && this.units.length > 0) {
            if (this.room !== "boss" && this.room < 7) {
                this.room += 1
                this.roomTickCount = 0 // reset the room tick count

                this.deltaEvents.push({
                    path: "room",
                    type: "abs",
                    value: this.room
                })

                // Strip out old dead enemies
                this.completedEnemies = this.completedEnemies.concat(this.deadEnemies)
                this.deadEnemies = []

                // Populate battle with next room
                let newMonsters
                if (
                    this.floor != null &&
                    this.currentCommunityFloor != null &&
                    this.floor === this.currentCommunityFloor
                ) {
                    let hasPlayers = false
                    let avgDefenseStat = 0
                    let avgAccuracy = 0
                    let avgPArmor = 0
                    let avgMArmor = 0
                    let avgDamage = 0

                    if (this.units && this.units.length > 0) {
                        hasPlayers = true

                        this.units.forEach((unit) => {
                            avgDamage += unit.stats.attack + (unit.stats.attackMax / 2)
                            avgDefenseStat += unit.stats.defense
                            avgAccuracy += unit.stats.accuracy
                            avgPArmor += unit.stats.armor
                            avgMArmor += unit.stats.magicArmor
                        })

                        avgDamage /= this.units.length
                        avgAccuracy /= this.units.length
                        avgDefenseStat /= this.units.length
                        avgPArmor /= this.units.length
                        avgMArmor /= this.units.length
                    }

                    newMonsters = FLOORS.topFloorTowerMonsterGenerator(this.floor, this.room, this.adjustedFloorLevel, { hasPlayers, playerCount: (hasPlayers ? this.units.length : 0), avgDamage, avgAccuracy, avgDefenseStat, avgPArmor, avgMArmor })
                } else {
                    newMonsters = FLOORS.genericTowerMonsterGenerator(this.floor, this.room)
                }

                // Inject into battle
                newMonsters.forEach((monster: any) => {
                    const randomUnitTarget = _.sample(this.units)!
                    this.totalXpGain += BATTLES.xpGain(monster.stats, monster.buffs)
                    const enemyParams: enemy = {
                        id: uuid.v4(),
                        stats: monster.stats,
                        icon: monster.icon,
                        buffs: monster.buffs || [],
                        target: randomUnitTarget.id,
                        enemyId: monster.id,
                        monsterType: monster.id,
                        name: monster.name,
                        isEnemy: true,
                        tickOffset: 0
                    }
                    const newUnit = new Unit(enemyParams, this)
                    this.enemies.push(newUnit)
                    this.deltaEvents.push({
                        path: "enemies",
                        type: "push",
                        value: newUnit.raw()
                    })
                })

                this.updateUnitMaps()

                this.enemies.forEach((enemy) => {
                    // new enemy units in a new room during exploration
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

                    addBuff({ buff: newBuff, target: enemy, caster: enemy, actualBattle: this })
                })

                this.units.forEach((unit) => {
                    // Call NextFloorRoom event for this defender
                    if (unit.buffs) {
                        unit.buffs.forEach((buff) => {
                            buff.constants = BUFFS[buff.id]
                            if (buff.constants.events.onNextFloorRoom) {
                                buff.constants.events.onNextFloorRoom({ buff, unit, actualBattle: this, newRoom: this.room })
                            }
                        })
                    }
                })

                return
            }
        }

        this.end()
    }
}
