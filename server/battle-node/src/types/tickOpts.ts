import Unit from "../core/unit"
import Ability from "../core/unit/ability"

export type autoAttackOpts = {
    attacker: Unit
    defender: Unit
    originalAutoAttack?: boolean
    damageModifier?: number
    source?: string
    customIcon?: string | undefined
}

export type castAbilityOpts = {
    ability: Ability
    caster: Unit
    targets: Unit[]
}

export type dealDamageOpts = {
    attacker: Unit
    defender: Unit
    tickEvents: any
    historyStats: any
    customColor?: string
    customIcon?: string | undefined
    isMagic?: boolean
    isTrueDamage?: boolean
    bypassArmor?: boolean
    sourceId?: string
    source?: string
}

export type healTargetOpts = {
    target: Unit
    caster: Unit
    tickEvents: any
    customColor?: string
    customIcon?: string
    historyStats: any
    sourceId?: string
    healSource: any
}
