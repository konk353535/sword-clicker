import { orderLootTable } from "../../enemies/lootTables/index.js"

export const LEVEL_TWENTY_MONSTERS = [
    {
        id: "wolf",
        icon: "wolf.svg",
        name: "wolf"
    },
    {
        id: "beaver",
        icon: "beaver.svg",
        name: "beaver"
    },
    {
        id: "eagle",
        icon: "eagle.svg",
        name: "eagle"
    },
    {
        id: "kangaroo",
        icon: "kangaroo.svg",
        name: "kangaroo"
    },
    {
        id: "jellyFish",
        icon: "jellyFish.svg",
        name: "jellyfish",
        buffs: [
            {
                id: "poisoned_blade",
                data: {
                    level: 1,
                    icon: "poisonedBlade.svg",
                    name: "poisoned blade"
                }
            }
        ]
    }
]

export const LEVEL_TWENTY_LOOT_TABLE = orderLootTable([
    {
        chance: 1 / 64,
        rewards: [
            { type: "item", itemId: "elven_steel_pickaxe", amount: 1 },
            { type: "item", itemId: "elven_steel_axe", amount: 1 },
            { type: "item", itemId: "elven_steel_dagger", amount: 1 },
            { type: "item", itemId: "chilli", amount: 1 }
        ]
    },
    {
        chance: 1 / 48,
        rewards: [{ type: "item", itemId: "elven_steel_essence_scroll", amount: 1 }]
    },
    {
        chance: 1 / 24,
        rewards: [{ type: "item", itemId: "elven_steel_essence", amount: 1 }]
    },
    {
        chance: 1 / 16,
        rewards: [{ type: "item", itemId: "fairy_steel_essence", amount: 1 }]
    },
    {
        chance: 1 / 4,
        rewards: [
            { type: "item", itemId: "ore_elven_steel", amount: 1 },
            { type: "item", itemId: "elven_steel_bar", amount: 1 },
            { type: "item", itemId: "willow_log", amount: 1 },
            { type: "item", itemId: "willow_log", amount: 2 }
        ]
    },
    {
        chance: 1 / 4,
        rewards: [
            { type: "gold", amount: 338 },
            { type: "gold", amount: 675 },
            { type: "gold", amount: 1350 },
            { type: "item", itemId: "elven_steel_sculpture", amount: 1 },
            { type: "item", itemId: "elven_steel_sculpture", amount: 2 },
            { type: "item", itemId: "elven_steel_sculpture", amount: 3 }
        ]
    }
])
