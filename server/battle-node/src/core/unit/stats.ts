import Battle from ".."
import { BATTLES } from "../../../../constants/battles"
import { stats } from "../../types/stats"
import { ticksPerSecondAll } from "../tickMethods/tickTimer"

export default class Stats {
    unitId: string
    battleRef: Battle

    origStats: any

    attack: number
    attackMax: number

    criticalChance: number
    criticalDamage: number

    accuracy: number

    _attackSpeed: number

    _health: number
    _healthMax: number
    _healthMaxOrig: number

    defense: number
    _armor: number
    _magicArmor: number

    magicPower: number

    force: number
    shred: number
    focus: number
    absorption: number

    healingPower: number

    damageReduction: number
    magicDamageReduction: number
    healingReduction: number
    damageTaken: number
    damageOutput: number

    attackSpeedTicks: number
    minimumHitChance?: number

    getDamageReduction(armor: number) {
        let damageReduction = BATTLES.dmgReduction(armor)

        if (damageReduction == null || damageReduction == undefined || typeof damageReduction === 'undefined') {
            damageReduction = 0
        }

        return Math.max(0, Math.min(1, damageReduction))
    }

    getAttackSpeedTicks(attackSpeedLocal: number) {
        // Convert attack speed seconds to attack speed ticks
        if (attackSpeedLocal !== undefined) {
            if (attackSpeedLocal <= 0) {
                attackSpeedLocal = 0.001
            }
     
            // Fixes a bug where attack speeds beyond 10x yield an effective attack speed of
            // 0 because you can't attack more than once per tick (1x/0.1s = 10x attack speed).
            //
            // Caps attack speed at 10x (10/sec = 1,000% attack speed).
            attackSpeedLocal = Math.min(attackSpeedLocal, ticksPerSecondAll)

            return Math.round(ticksPerSecondAll / attackSpeedLocal)
        }

        console.log("[WARN] UNIT HAS NO ATTACK SPEED!", this.unitId)
        return 0.001
    }

    get attackSpeed() {
        return this._attackSpeed
    }
    set attackSpeed(value) {
        this._attackSpeed = value
        this.attackSpeedTicks = this.getAttackSpeedTicks(this._attackSpeed)
        this.delta("attackSpeed")
    }

    get armor() {
        return this._armor
    }
    set armor(value) {
        this._armor = value
        this.damageReduction = this.getDamageReduction(value)
        this.delta("armor")
    }

    get magicArmor() {
        return this._magicArmor
    }
    set magicArmor(value) {
        this._magicArmor = value
        this.magicDamageReduction = this.getDamageReduction(value)
        this.delta("magicArmor")
    }

    get healthMax() {
        return this._healthMax
    }
    set healthMax(value) {
        this._healthMax = value
        this.delta("healthMax")
    }

    get healthMaxOrig() {
        return this._healthMaxOrig
    }
    set healthMaxOrig(value) {
        this._healthMaxOrig = value
        this.delta("healthMaxOrig")
    }

    get health() {
        return this._health
    }
    set health(value) {
        this._health = value
        this.delta("health")
    }

    delta(stat: keyof stats) {
        const event = {
            type: "abs",
            path: `unitsMap.${this.unitId}.stats.${stat}`,
            value: this[stat]
        }

        this.battleRef.deltaEvents.push(event)
    }

    revertToOriginal() {
        this.attack = this.origStats.attack
        this.attackMax = this.origStats.attackMax
        this.attackSpeed = this.origStats.attackSpeed
        this.criticalChance = this.origStats.criticalChance
        this.healingPower = this.origStats.healingPower
        this.criticalDamage = this.origStats.criticalDamage
        this.accuracy = this.origStats.accuracy
        this.defense = this.origStats.defense
        this.health = this.origStats.health
        this.healthMax = this.origStats.healthMax
        this.healthMaxOrig = this.origStats.healthMax
        this.magicPower = this.origStats.magicPower
        this.armor = this.origStats.armor
        this.magicArmor = this.origStats.magicArmor
        this.healingReduction = this.origStats.healingReduction || 1
        this.force = this.origStats.force || 0
        this.shred = this.origStats.shred || 0
        this.focus = this.origStats.focus || 0
        this.absorption = this.origStats.absorption || 0
    }

    constructor(stats: stats, unitId: string, battleRef: Battle) {
        this.unitId = unitId
        this.battleRef = battleRef

        this.attack = stats.attack
        this.attackMax = stats.attackMax
        this.attackSpeed = stats.attackSpeed
        this.criticalChance = stats.criticalChance
        this.healingPower = stats.healingPower
        this.criticalDamage = stats.criticalDamage
        this.accuracy = stats.accuracy
        this.defense = stats.defense
        this.health = stats.health
        this.healthMax = stats.healthMax
        this.healthMaxOrig = stats.healthMax
        this.damageTaken = stats.damageTaken
        this.magicPower = stats.magicPower
        this.armor = stats.armor
        this.magicArmor = stats.magicArmor
        this.healingReduction = stats.healingReduction || 1
        this.force = stats.force || 0
        this.shred = stats.shred || 0
        this.focus = stats.focus || 0
        this.absorption = stats.absorption || 0
        this.damageOutput = 1.0

        // initialize other bits
        this._attackSpeed = this.attackSpeed
        this.attackSpeedTicks = this.getAttackSpeedTicks(this.attackSpeed)
        this._armor = this.armor
        this.damageReduction = this.getDamageReduction(this.armor)
        this._magicArmor = this.magicArmor
        this.magicDamageReduction = this.getDamageReduction(this.magicArmor)
        this._healthMax = this.healthMax
        this._healthMaxOrig = this.healthMaxOrig
        this._health = this.health

        this.origStats = stats
    }

    raw() {
        return {
            attack: this.attack,
            attackMax: this.attackMax,
            attackSpeed: this.attackSpeed,
            criticalChance: this.criticalChance,
            healingPower: this.healingPower,
            criticalDamage: this.criticalDamage,
            accuracy: this.accuracy,
            defense: this.defense,
            health: this.health,
            healthMax: this.healthMax,
            healthMaxOrig: this.healthMaxOrig,
            damageTaken: this.damageTaken,
            magicPower: this.magicPower,
            armor: this.armor,
            magicArmor: this.magicArmor,
            attackSpeedTicks: this.attackSpeedTicks,
            force: this.force,
            shred: this.shred,
            focus: this.focus,
            absorption: this.absorption
        }
    }
}
