export type battleAction = {
    battleId: string // Which battle this action relates to
    abilityId: string // Constant id for casted ability
    caster: string // Who is casting this
    targets?: string[]
    target?: string // Specified for the change target ability
    battleSecret: string
}
