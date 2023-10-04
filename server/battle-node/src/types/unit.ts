import { ability } from "./ability"

export type unit = {
    id: string
    owner: string
    battleSecret: string
    towerContributions: any[]
    isTowerContribution: boolean
    abilities: ability[]
    name: string
    amulet?: any
    buffs: any[]
    mainHandWeapon: string
    mainHandType: string
    offHandType?: string
    offHandIsMagic?: boolean
    stats: any
    xpDistribution: any
    tickOffset: number
    icon: string
    skills: any[]
    inactiveMinutes: number
    enchantmentsList: any[]
    currentClass?: any
    isLamp?: boolean
    isNPC?: boolean
    isCompanion?: boolean
    isSoloCompanion?: boolean
    target: string
}
