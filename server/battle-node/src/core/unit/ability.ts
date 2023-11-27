import { ABILITIES } from "../../../../constants/combat/index.js"
import { ability } from "../../types/ability"
import Battle from "../index.js"
import Unit from "./index.js"

export default class Ability {
    constants: any
    scaledCooldown: any
    _currentCooldown: any
    unit: Unit
    id: string
    battleRef: Battle
    level: number
    totalCasts: number
    isSpell: boolean
    isPacifist: boolean
    isTaunt: boolean
    cdAdjust?: ((abil: Ability) => number) | undefined
    allowedWhileDead?: boolean
    isEnchantment?: boolean
    magic?: any

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

    delta(key: "currentCooldown" /* | "casts" */) {
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
        this.constants = Object.assign({}, ABILITIES[ability.id], this.unit?.currentClass?.abilityPatch ? this.unit?.currentClass?.abilityPatch[ability.id] : {}) // patch class overrides for requirements to active abilities and spells (including passives)
        this.level = ability.level
        this.totalCasts = ability.totalCasts
        this._currentCooldown = ability.currentCooldown
        this.isSpell = ability.isSpell || this.constants.isSpell || false
        this.isPacifist = ability.isPacifist || this.constants.isPacifist || false
        this.isTaunt = ability.isTaunt || this.constants.isTaunt || false
        this.magic = ability.magic || {}
    }

    cast(targets: Unit[]) {
        if (this.currentCooldown > 0) {
            return false
        } else if (this.isSpell && !this.canAffordToCast) {
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

    get castingCostMultiplier() {
        return Math.max(1, this.unit.stats.magicPower / 30)
    }

    get canAffordToCast() {
        if (!this.unit.broughtMagic) {
            return false
        }

        if (this.magic.fire.cost.units * this.castingCostMultiplier > this.unit.stats.magic.firePool) {
            return false
        }

        if (this.magic.earth.cost.units * this.castingCostMultiplier > this.unit.stats.magic.earthPool) {
            return false
        }

        if (this.magic.air.cost.units * this.castingCostMultiplier > this.unit.stats.magic.airPool) {
            return false
        }

        if (this.magic.water.cost.units * this.castingCostMultiplier > this.unit.stats.magic.waterPool) {
            return false
        }

        if (this.magic.necrotic.cost.units * this.castingCostMultiplier > this.unit.stats.magic.necroticPool) {
            return false
        }

        return true
    }

    raw() {
        return {
            id: this.id,
            level: this.level,
            currentCooldown: this.currentCooldown,
            totalCasts: this.totalCasts,
            isSpell: this.isSpell,
            isPacifist: this.isPacifist,
            isTaunt: this.isTaunt
        }
    }
}
