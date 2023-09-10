import type Battle from "../"
import { BUFFS } from "../../../../../imports/constants/buffs"
import { addBuff, removeBuff } from "../../../../battleUtils.js"

export function inactivePlayers(this: Battle) {
    // check for inactive players and apply or remove 'idle_player' buffs as appropriate
    this.units.forEach((unit) => {
        let hasBuff = false
        let buffToRemove
        unit.buffs.forEach((buff) => {
            if (buff.id === "idle_player") {
                hasBuff = true
                buffToRemove = buff
            }
        })
        if (unit.inactiveMinutes && unit.inactiveMinutes > 5) {
            if (!hasBuff) {
                const newBuff = {
                    id: "idle_player",
                    data: {
                        duration: Infinity,
                        totalDuration: Infinity,
                        icon: "sleeping.png",
                        description: `You are idle and aren't providing your full combat bonuses.`,
                        name: "Idle"
                    },
                    constants: BUFFS["idle_player"]
                }

                addBuff({ buff: newBuff, target: unit, caster: unit, actualBattle: this })
            }
        } else {
            if (hasBuff) {
                removeBuff({ buff: buffToRemove, target: unit, caster: unit, actualBattle: this })
            }
        }
    })
}
