export type enemy = {
    id: string
    name: string
    buffs: any[]
    baseStats: any
    stats: any
    tickOffset: number
    icon: string
    isLamp?: boolean
    isNPC?: boolean
    isCompanion?: boolean
    isSoloCompanion?: boolean
    monsterType: string
    target: string
    enemyId: string
    isEnemy: boolean
}
