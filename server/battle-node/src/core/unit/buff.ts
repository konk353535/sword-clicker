import _ from "underscore"
import uuid from "node-uuid"

import { BUFFS } from "../../../../../imports/constants/buffs/index.js"
import { fixupBuffText } from "../../../../battleUtils"
import { buff } from "../../types/buff.js"
import Battle from "../index.js"
import Unit from "./index.js"

const IsValid = function (oObject: any) {
    try {
        if (oObject === undefined) return false
        if (oObject === null) return false
        if (typeof oObject === "undefined") return false
        return true
    } catch (err) {}
    return false
}

export default class Buff {
    id!: string
    _stacks!: number
    _duration!: number
    _icon!: string
    _uid!: string
    _customText!: string
    data: any
    custom!: boolean
    unit!: Unit
    battleRef!: Battle
    _isBuffClass!: boolean
    _allowDuplicates?: boolean

    get name() {
        try {
            return this?.data?.name || BUFFS[this.id].name
        } catch (err) {
            console.log("No buff (.name)!", this.id)
            console.log(err)
        }
    }
    set name(value) {
        if (this.data) {
            this.data.name = value
            this.delta("name")
        }
    }

    get allowDuplicates() {
        let bAllow:boolean = false
        try {
            // check this version of the buff first
            bAllow ||= this.data.allowDuplicates

            // otherwise, check the constants for this buff
            bAllow ||= BUFFS[this.id].data && BUFFS[this.id].data.allowDuplicates
        } catch (err) {}
        return bAllow
    }
    set allowDuplicates(value) {
        if (this.data) {
            this.data.allowDuplicates = value
        }
    }

    get description() {
        try {
            let desc = this?.data?.description || BUFFS[this.id].description

            let caster = this.unit

            // Find original caster for .onApply() and .onTick()
            try {
                if (this._isBuffClass && this.data.casterUnit) {
                    try {
                        this.battleRef.units.forEach((localUnit) => {
                            if (localUnit.id === this.data.casterUnit) {
                                caster = localUnit
                            }
                        })
                        this.battleRef.enemies.forEach((localEnemy) => {
                            if (localEnemy.id === this.data.casterUnit) {
                                caster = localEnemy
                            }
                        })
                    } catch (err) {}
                }
            } catch (err) {}

            if (!desc) {
                if (_.isFunction(BUFFS[this.id]?.description)) {
                    this.data.description = BUFFS[this.id]?.description({
                        buff: BUFFS[this.id],
                        level: this.data?.level || 1,
                        characterClass: (caster && caster.currentClass) ? caster.currentClass : { id: '', equipped: '' },
                    })
                } else {
                    this.data.description = BUFFS[this.id]?.description
                }
            }

            return desc
        } catch (err) {
            console.log("No buff (.name)!", this.id)
            console.log(err)
        }
    }
    set description(value) {
        if (this.data) {
            this.data.description = value
            this.delta("description")
        }
    }

    get events() {
        try {
            return BUFFS[this.id].events
        } catch (err) {
            console.log("No buff (.events)!", this.id)
            console.log(err)
        }
    }

    get constants() {
        try {
            return BUFFS[this.id]
        } catch (err) {
            console.log("No buff (constants)!", this.id)
            console.log(err)
        }
    }
    set constants(value) {
        return
    }

    get stacks() {
        return this._stacks
    }
    set stacks(value) {
        this._stacks = value
        this.delta("stacks")
    }

    get duration() {
        return this._duration
    }
    set duration(value) {
        this._duration = value
        if (this.data) {
            this.data.duration = value
        }
        if (value !== Infinity) {
            this.delta("duration")
        }
    }

    get icon() {
        return this._icon
    }
    set icon(value) {
        this._icon = value
        if (this.data) {
            this.data.icon = value
        }
        this.delta("icon")
    }

    get uid() {
        return this._uid
    }
    set uid(value) {
        this._uid = value
        this.delta("uid")
    }

    get customText() {
        return this._customText
    }
    set customText(value) {
        this._customText = value
        if (this.data && this.data.custom) {
            this.custom = true
        } else {
            this.custom = false
        }
        this.delta("custom")
        this.delta("customText")
    }

    delta(key: "custom" | "customText" | "uid" | "icon" | "duration" | "stacks" | "name" | "description") {
        const event = {
            type: "abs",
            path: `unitsMap.${this.unit.id}.buffsMap.${this.id}.${key}`,
            value: this[key]
        }

        this.battleRef.deltaEvents.push(event)

        if (key === "name" || key === "description" || key === "icon") {
            const subEvent = {
                type: "abs",
                path: `unitsMap.${this.unit.id}.buffsMap.${this.id}.data.${key}`,
                value: this[key]
            }

            this.battleRef.deltaEvents.push(subEvent)
        }
    }

    constructor(buff: buff, unit: Unit, battleRef: Battle) {
        try {
            this.id = buff.id
            this.unit = unit
            this._isBuffClass = true
            this.battleRef = battleRef
            this.custom = buff.custom || buff.data.custom
            this._duration = Infinity
            if (IsValid(buff.data.duration)) {
                this.duration = buff.data.duration
            } else if (IsValid(buff.duration)) {
                this.duration = buff.duration
            }
            this._stacks = buff.stacks
            if (!buff.stacks && buff.data && buff.data.stacks) {
                this._stacks = buff.data.stacks
            }
            this._icon = buff.icon
            if (!buff.icon && buff.data && buff.data.icon) {
                this._icon = buff.data.icon
            }
            this._customText = buff.customText
            if (!buff.customText && buff.data && buff.data.customText) {
                this._customText = buff.data.customText
            }
            this.data = buff.data
            this.data.didApply = buff.data.didApply ? true : false
            
            const fixedBuff = fixupBuffText(this, undefined)
            this.data.name = fixedBuff.data.name
            this.data.description = fixedBuff.data.description

            this.allowDuplicates = buff && buff.data ? buff.data.allowDuplicates : false

            this._uid = uuid.v4()
            this.delta("uid")
        } catch (err) {
            console.log("EXCEPTION THROWN INITIALIZING BUFF!")
            console.log("Buff data:")
            console.log(buff)
            console.log("Exception data:")
            console.log(err)
        }
    }

    onApply(options: any) {
        if (!this.data.didApply) {
            if (this.events.onApply) {
                this.events.onApply(options)
                this.data.didApply = true
                this.data.duration = Math.max(this.duration, this.data.duration)
                const fixedBuff = fixupBuffText(this, options?.caster)
                this.data.name = fixedBuff.data.name
                this.data.description = fixedBuff.data.description
            }
        }
    }

    onTick(options: any) {
        // players (stunned/charmed or not) or companions/enemies (not stunned/charmed only) can tick their buffs
        // because most companions/enemies attacks and abilities come from events
        if (this.events.onTick) {
            try {
                if (
                    (this.unit.isCompanion || this.unit.isEnemy) &&
                    (this.unit.isStunned || this.unit.isCharmed) &&
                    !this.constants.constants.allowTicks
                ) {
                    return
                }
            } catch (err) {}

            this.events.onTick(options)
        }
    }

    onDidDamage(options: any) {
        if (this.events.onDidDamage) {
            this.events.onDidDamage(options)
        }
    }

    // only triggered from auto-attack
    onTookDamage(options: any) {
        // players (stunned/charmed or not) or companions/enemies (not stunned/charmed only) can react to damage taken
        // because most companions/enemies attacks and abilities come from events
        if (this.events.onTookDamage) {
            try {
                if (
                    (this.unit.isCompanion || this.unit.isEnemy) &&
                    (this.unit.isStunned || this.unit.isCharmed) &&
                    !this.constants.constants.allowTicks
                ) {
                    return
                }
            } catch (err) {}

            this.events.onTookDamage(options)
        }
    }

    // triggered from receiving all sources of damage, including auto-attack
    onTookRawDamage(options: any) {
        // players (stunned/charmed or not) or companions/enemies (not stunned/charmed only) can react to raw damage taken
        // because most companions/enemies attacks and abilities come from events
        if (this.events.onTookRawDamage) {
            try {
                if (
                    (this.unit.isCompanion || this.unit.isEnemy) &&
                    (this.unit.isStunned || this.unit.isCharmed) &&
                    !this.constants.constants.allowTicks
                ) {
                    return
                }
            } catch (err) {}

            this.events.onTookRawDamage(options)
        }
    }

    onBeforeDeath(options: any) {
        if (this.events.onBeforeDeath) {
            this.events.onBeforeDeath(options)
        }
    }

    onRemove(options: any) {
        if (this.events.onRemove) {
            this.events.onRemove(options)
        }
    }

    raw() {
        return {
            uid: this.uid,
            id: this.id,
            duration: this.duration,
            stacks: this.stacks,
            icon: this.icon,
            custom: this.custom,
            customText: this.customText,
            data: this.data
        }
    }
}
