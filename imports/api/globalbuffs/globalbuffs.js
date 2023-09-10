import lodash from "lodash"

import { State } from "/imports/api/state/state"

import { GLOBALBUFFS } from "/imports/constants/globalbuffs"

import { serverFromUser } from "/imports/api/users/users"
import { CInt, IsValid } from "/imports/utils.js"

// translate old buff IDs to new buff IDs
export const translateGlobalBuffId = function translateGlobalBuffId(buffType) {
    if (!IsValid(buffType)) {
        return buffType
    }
    if (!IsValid(GLOBALBUFFS[buffType])) {
        return buffType
    }
    return IsValid(GLOBALBUFFS[buffType].dataBuffId) ? GLOBALBUFFS[buffType].dataBuffId : buffType
}

// get an array of all active global buffs relative to the current user's server (assuming there is one)
export const getGlobalBuffs = function getGlobalBuffs() {
    const gbCursor = State.find({ "value.activeTo": { $gte: moment().toDate() } })
    if (gbCursor) {
        let buffs = gbCursor.fetch()

        buffs = buffs.filter((buff) => {
            if (IsValid(GLOBALBUFFS[buff.name]) && GLOBALBUFFS[buff.name].isServerBuff) {
                if (buff.server != serverFromUser()) {
                    return false
                }
            }

            return true
        })

        return buffs
    }
    return []
}

const serverBuffMatch = function serverBuffMatch(buffId, serverId) {
    if (!IsValid(buffId) || !IsValid(GLOBALBUFFS[buffId])) {
        return false
    }

    if (!GLOBALBUFFS[buffId].isServerBuff) {
        return State.findOne({ name: buffId })
    }

    // require serverId at this point
    serverId = IsValid(serverId) ? serverId : serverFromUser()

    const buffState = serverId ? State.findOne({ name: buffId, server: serverId }) : State.findOne({ name: buffId })

    if (IsValid(buffState) && buffState.server === serverId) {
        return buffState
    }

    return undefined
}

const serverBuffMatchActive = function serverBuffMatchActive(buffId, serverId) {
    if (!IsValid(buffId) || !IsValid(GLOBALBUFFS[buffId])) {
        return false
    }

    if (!GLOBALBUFFS[buffId].isServerBuff) {
        return State.findOne({ name: buffId, "value.activeTo": { $gte: moment().toDate() } })
    }

    // require serverId at this point
    serverId = IsValid(serverId) ? serverId : serverFromUser()

    const buffState = serverId
        ? State.findOne({ name: buffId, server: serverId, "value.activeTo": { $gte: moment().toDate() } })
        : State.findOne({ name: buffId, "value.activeTo": { $gte: moment().toDate() } })

    if (IsValid(buffState) && buffState.server === serverId) {
        return buffState
    }

    return undefined
}

// look up an existing global buff by name (type ID), whether it's active or not
export const getGlobalBuff = function getGlobalBuff(buffType, serverId) {
    const realBuffId = translateGlobalBuffId(buffType)
    if (!IsValid(realBuffId)) {
        return false
    }

    const buffState = serverBuffMatch(realBuffId, serverId)

    return IsValid(buffState) ? buffState : false
}

// look up an existing global buff by name (type ID) only if it's active
export const getActiveGlobalBuff = function getActiveGlobalBuff(buffType, serverId) {
    const realBuffId = translateGlobalBuffId(buffType)
    if (!IsValid(realBuffId)) {
        return false
    }

    const buffState = serverBuffMatchActive(realBuffId, serverId)

    return IsValid(buffState) ? buffState : false
}

// add or insert a global buff as necessary, extending or setting time as necessary
export const activateGlobalBuff = function activateGlobalBuff({
    buffType,
    server = undefined,
    timeAmt = 1,
    time = "hour",
    level = -1
}) {
    const realBuffId = translateGlobalBuffId(buffType)
    if (!IsValid(realBuffId)) {
        return false
    }

    const curBuff = getGlobalBuff(realBuffId)

    if (curBuff && IsValid(curBuff)) {
        const localBuff = lodash.cloneDeep(curBuff)

        if (!IsValid(localBuff.value)) {
            localBuff.value = {
                activeTo: moment().add(-1, "week").toDate(),
                level: 1
            }
        }

        // update existing buff

        if (moment().isAfter(localBuff.value.activeTo)) {
            // if the buff is expired (current time is after buff's activeTo time)

            localBuff.value.activeTo = moment().add(timeAmt, time).toDate()
        } else {
            // if the buff isn't over yet...

            localBuff.value.activeTo = moment(localBuff.value.activeTo).add(timeAmt, time).toDate()
        }

        // if no level is specified, default it to the current buff level (or to 1 if none exists)
        if (level === -1) {
            if (localBuff.value.level) {
                level = localBuff.value.level
            } else {
                level = 1
            }
        }

        localBuff.value.level = level

        // update existing doc in mongo
        State.update(
            {
                name: realBuffId
            },
            {
                $set: {
                    server,
                    value: localBuff.value
                }
            }
        )

        return true
    }

    // create new buff

    // if no level is specified, default it to 1
    if (level === -1) {
        level = 1
    }

    // insert new doc into mongo
    State.insert({
        name: realBuffId,
        server,
        value: {
            activeTo: moment().add(timeAmt, time).toDate(),
            level
        }
    })

    return true
}

// locate a buff and return its level, 0 if the buff is not active or has no level
export const getBuffLevel = function getBuffLevel(buffId, serverId) {
    const buffByName = getActiveGlobalBuff(buffId, serverId)

    if (buffByName && IsValid(buffByName) && IsValid(buffByName.value)) {
        return CInt(buffByName.value.level)
    }

    return 0
}
