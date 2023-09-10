import { ABILITIES } from "../../../../constants/combat/index.js"
import { ability } from "../../types/ability"
import Battle from "../index.js"
import Unit from "./index.js"
 
export default class Ability {
    constants: any
    scaledCooldown: any
    _currentCooldown: any
    _casts: any
    unit: Unit
    id: string
    battleRef: Battle
    level: number
    totalCasts: number
    isSpell: boolean
    isPacifist: any
    cdAdjust?: ((abil: Ability) => number) | undefined
    allowedWhileDead?: boolean
    isEnchantment?: boolean

    get isPassive() {
        return this.constants.isPassive
    }
    get requires() {
        return this.constants.requires
    }
    get cantUseWith() {
        return this.constants.cantUseWith
    }
    get forbids() {
        return this.constants.forbids
    } // duplicate
    get target() {
        return this.constants.target
    }
    get buffs() {
        return this.constants.buffs
    }
    get cooldown() {
        if (this.scaledCooldown) {
            return this.scaledCooldown(this)
        }
        return this.constants.cooldown
    }

    get currentCooldown() {
        return this._currentCooldown
    }
    set currentCooldown(value) {
        this._currentCooldown = value
        this.delta("currentCooldown")
    }

    get casts() {
        return this._casts
    }
    set casts(value) {
        this._casts = value
        this.delta("casts")
    }

    delta(key: "currentCooldown" | "casts") {
        const event = {
            type: "abs",
            path: `unitsMap.${this.unit.id}.abilitiesMap.${this.id}.${key}`,
            value: this[key]
        }

        this.battleRef.deltaEvents.push(event)
    }

    constructor(ability: ability, unit: Unit, battleRef: Battle) {
        this.unit = unit
        this.battleRef = battleRef

        this.id = ability.id
        // @ts-expect-error
        this.constants = Object.assign({}, ABILITIES[ability.id])
        this.level = ability.level
        this.totalCasts = ability.totalCasts
        this._currentCooldown = ability.currentCooldown
        this._casts = ability.casts
        this.isSpell = ability.isSpell || this.constants.isSpell
        this.isPacifist = ability.isPacifist || this.constants.isPacifist
    }

    cast(targets: Unit[]) {
        if (this.currentCooldown > 0) {
            return false
        } else if (this.isSpell && this.casts <= 0) {
            return false
        } else if (this.isPassive && this.battleRef.tickCount > 1) {
            return false
        }

        return this.battleRef.castAbility({
            ability: this,
            caster: this.unit,
            targets
        })
    }

    raw() {
        return {
            id: this.id,
            level: this.level,
            currentCooldown: this.currentCooldown,
            casts: this.casts,
            totalCasts: this.totalCasts,
            isSpell: this.isSpell,
            isPacifist: this.isPacifist
        }
    }
}
