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
                this.tickCount = 3 // give us back a delay

                this.room += 1

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
                    newMonsters = FLOORS.topFloorTowerMonsterGenerator(this.floor, this.room, this.adjustedFloorLevel)
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

                return
            }
        }

        this.end()
    }
}
