import _ from "underscore"
import type Battle from "."
import { BUFFS } from "../../../../imports/constants/buffs"
import { healTargetOpts } from "../types/tickOpts"

export function healTarget(
    this: Battle,
    healAmount: number,
    { target, caster, tickEvents, customColor, customIcon, historyStats, sourceId, healSource }: healTargetOpts
) {
    if (!caster || !caster.stats) {
        return // error
    }

    if (!target || !target.stats) {
        return // error
    }

    let sourceFinal: string = ""
    if (!healSource || !healSource.id || !healSource.name || healSource.id?.trim().length === 0) {
        sourceFinal = "unknown"
    } else {
        sourceFinal = healSource?.name
    }

    // Useful debug, please don't remove
    //console.log("=== HEAL TRACKING :: START ===")
    //console.log(`Caster of heal: ${caster?._name || caster?.id || "<unknown>"}`)
    //console.log(`Target of heal: ${target?._name || target?.id || "<unknown>"}`)
    //console.log(`Heal source: ${healSource?.constants?.duplicateTag || healSource?.data?.duplicateTag || healSource?.id || "<unknown>"}`)
    //console.log(healSource) // this is usually an object ref to the buff that applied the effect
    //console.log("=== HEAL TRACKING :: END ===")

    if (caster.stats && caster.stats.healingPower && _.isFinite(caster.stats.healingPower)) {
        healAmount *= 1 + caster.stats.healingPower / 100
    }

    if (target.stats.healingReduction && target.stats.healingReduction != null) {
        healAmount *= target.stats.healingReduction
    }

    // Tick didHealing event on caster
    if (caster.buffs) {
        caster.buffs.forEach((buff) => {
            buff.constants = BUFFS[buff.id]
            if (buff.constants.events.onDidHealing) {
                // Did Healing
                try {
                    buff.constants.events.onDidHealing({
                        buff,
                        target,
                        caster,
                        actualBattle: this,
                        healAmount,
                        healSource
                    })
                } catch (err) {
                    console.trace(err)
                }
            }
        })
    }

    // Tick tookHealing event on target
    if (target.buffs) {
        target.buffs.forEach((buff) => {
            buff.constants = BUFFS[buff.id]
            if (buff.constants.events.onTookHealing) {
                // Took Healing
                try {
                    buff.constants.events.onTookHealing({
                        buff,
                        target,
                        caster,
                        actualBattle: this,
                        healAmount,
                        healSource
                    })
                } catch (err) {
                    console.trace(err)
                }
            }
        })
    }

    if (target.stats.health + healAmount > target.stats.healthMax) {
        healAmount = target.stats.healthMax - target.stats.health
    }

    target.stats.health += healAmount

    let caster__id_to_use = caster.id
    if (sourceId && sourceId.length > 0) {
        caster__id_to_use = sourceId
    }
    if (caster.isCompanion) {
        try {
            if (caster?.owner?.endsWith("_companion")) {
                caster__id_to_use = caster.owner.substring(0, caster.owner.length - 10)
            }
        } catch (err) {}
    }

    let target__id_to_use = target.id
    if (target.isCompanion) {
        try {
            if (target?.owner?.endsWith("_companion")) {
                target__id_to_use = target.owner.substring(0, target.owner.length - 10)
            }
        } catch (err) {}
    }

    if (historyStats && historyStats[caster__id_to_use]) {
        if (!caster.isCompanion) {
            historyStats[caster__id_to_use].healingDone += healAmount

            const sourceHealing = {
                source: sourceFinal,
                healing: healAmount
            }

            if (!historyStats[caster__id_to_use].breakdown) {
                historyStats[caster__id_to_use].breakdown = []
            }
            
            const idxExistingSource = historyStats[caster__id_to_use].breakdown.findIndex((e: any) => e.source == sourceFinal)
            if (idxExistingSource === -1) {
                historyStats[caster__id_to_use].breakdown.push(sourceHealing)
            } else {
                historyStats[caster__id_to_use].breakdown[idxExistingSource].healing += sourceHealing.healing
            }
        } else {
            historyStats[caster__id_to_use].companionName = caster.name
            historyStats[caster__id_to_use].healingDoneCompanion += healAmount
        }
    }

    if (tickEvents) {
        tickEvents.push({
            from: caster ? caster.id : "",
            to: target ? target.id : "",
            eventType: "heal",
            label: healAmount.toFixed(1).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0*$)/,'$1'),
            customColor: customColor || "#cc2266",
            customIcon: customIcon || "heal"
        })
    }
}
