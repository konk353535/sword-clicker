export type buffConstant = {
    duplicateTag: string // Used to stop duplicate buffs
    icon: string
    name: string
    description: ({ buff, level }: { buff: buffConstant; level: number }) => string
    constants: any
    data: any
    events: any
}
