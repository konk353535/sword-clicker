import _ from "underscore"
import { BUFFS } from "../imports/constants/buffs/index"

// why is this a duplicate of /imports/battleUtils.js ?

export const removeBuff = function removeBuff({ target, buff, caster, actualBattle }) {
    if (target && buff && buff.id) {
        if (target.removeBuff) {
            actualBattle = actualBattle || target.battleRef

            const buffConstants = BUFFS[buff.id]
            // Quick sort of buffs to ascending by duration
            // target.buffs = _.sortBy(target.buffs, 'duration');
            if (buffConstants.events.onRemove) {
                buffConstants.events.onRemove({ buff, target, caster, actualBattle })
            }
            target.removeBuff(buff)
        }
    }
}

export const addBuff = function addBuff({ buff, target, caster, actualBattle }) {
    if (!target || !target.addBuff || !buff || !buff.data) {
        return
    }
    //console.log(`applying ${BUFFS[buff.id].name} from ${caster.name} to ${target.name}`);

    actualBattle = actualBattle || target.battleRef

    let existingBuff
    if (!buff.data.allowDuplicates) {
        // Make sure there is no existing buff like this
        // Check if buff already exists
        while (true) {
            existingBuff = target.buffs.find((b) => b.id === buff.id)
            if (existingBuff) {
                removeBuff({ target, buff: existingBuff, caster, actualBattle })
            } else {
                break
            }
        }
    } else if (buff.data.duplicateCap && buff.data.duplicateCap > 0) {
        // Some buffs can only be applied X number of times
        // Check if buff already exists X number of times (or more, somehow)
        let iCountHowMany = 0
        target.buffs.forEach((b) => {
            if (b.id === buff.id) {
                iCountHowMany++
            }
        })
        if (iCountHowMany >= buff.data.duplicateCap) {
            while (iCountHowMany >= buff.data.duplicateCap) {
                iCountHowMany--
                existingBuff = target.buffs.find((b) => b.id === buff.id)
                if (existingBuff) {
                    removeBuff({ target, buff: existingBuff, caster, actualBattle })
                }
            }
        }
    }

    const newBuff = target.addBuff(buff)

    newBuff.data.casterUnit = caster.id

    if (newBuff.onApply && !newBuff.data.didApply) {
        newBuff.onApply({ buff: newBuff, target, caster, actualBattle })
        newBuff.data.didApply = true
        newBuff.data.duration = Math.max(newBuff.duration, newBuff.data.duration)
    }

    const fixedBuff = fixupBuffText(newBuff, caster)
    newBuff.data.name = fixedBuff.data.name
    newBuff.data.description = fixedBuff.data.description

    return newBuff
}

export const removeBuffById = function removeBuffById({ target, caster, buffId, actualBattle }) {
    try {
        actualBattle = actualBattle || target.battleRef

        let buffToRemove = target.findBuff(buffId)
        if (buffToRemove) {
            removeBuff({ buff: buffToRemove, target, caster, actualBattle })
            return true
        }
    } catch (err) {}
    return false
}

export const removeBuffWithMessage = function removeBuffWithMessage({
    target,
    caster,
    buff,
    buffId,
    actualBattle,
    messageOptions
}) {
    try {
        actualBattle = actualBattle || target.battleRef

        if (buff) {
            removeBuff({ target, buff, caster, actualBattle })
            if (messageOptions) {
                target.tickMessage(messageOptions.label, messageOptions.color)
            }
            return true
        } else if (removeBuffById({ target, caster, buffId, actualBattle })) {
            if (messageOptions) {
                target.tickMessage(messageOptions.label, messageOptions.color)
            }
            return true
        }
    } catch (err) {}
    return false
}

export const lookupBuff = function lookupBuff(buffId) {
    try {
        return BUFFS[buffId]
    } catch (err) {}

    return undefined
}

export const fixupBuffText = function fixupBuffText(buff, caster) {
    try {
        const buffConstData = lookupBuff(buff.id)

        if (buffConstData) {
            if (!buff.data) {
                // probably going to have a bad day
                buff.data = Object.assign({}, buffConstData.data)
            }
            
            if (!buff.data.name || buff.data.name?.toString()?.trim()?.length === 0) {
                buff.data.name = buffConstData?.name || undefined
            }

            if (!buff.data.description || buff.data.description?.toString()?.trim()?.length === 0) {
                if (_.isFunction(buffConstData?.description)) {
                    buff.data.description = buffConstData?.description({
                        buff: buffConstData,
                        level: buff.level || 1,
                        characterClass: (caster && caster.currentClass) ? caster.currentClass : { id: '', equipped: '' },
                    })
                } else {
                    buff.data.description = buffConstData?.description || undefined
                }
            }
        }
    } catch (err) {}

    return buff
}
