import { orderLootTable } from "../../enemies/lootTables/index.js"

export const LEVEL_TEN_MONSTERS = [
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

export const LEVEL_TEN_LOOT_TABLE = orderLootTable([
    {
        chance: 1 / 64,
        rewards: [
            { type: "item", itemId: "platinum_pickaxe", amount: 1 },
            { type: "item", itemId: "platinum_axe", amount: 1 },
            { type: "item", itemId: "platinum_dagger", amount: 1 },
            { type: "item", itemId: "chilli", amount: 1 }
        ]
    },
    {
        chance: 1 / 64,
        rewards: [{ type: "item", itemId: "shield_bash_level_2_tome", amount: 1 }]
    },
    {
        chance: 1 / 64,
        rewards: [{ type: "item", itemId: "platinum_essence_scroll", amount: 1 }]
    },
    {
        chance: 1 / 24,
        rewards: [{ type: "item", itemId: "platinum_essence", amount: 1 }]
    },
    {
        chance: 1 / 12,
        rewards: [{ type: "item", itemId: "steel_essence", amount: 1 }]
    },
    {
        chance: 1 / 4,
        rewards: [
            { type: "item", itemId: "ore_platinum", amount: 1 },
            { type: "item", itemId: "platinum_bar", amount: 1 },
            { type: "item", itemId: "elk_log", amount: 1 },
            { type: "item", itemId: "elk_log", amount: 2 }
        ]
    },
    {
        chance: 1 / 4,
        rewards: [
            { type: "gold", amount: 141 },
            { type: "gold", amount: 281 },
            { type: "gold", amount: 563 },
            { type: "item", itemId: "platinum_sculpture", amount: 1 },
            { type: "item", itemId: "platinum_sculpture", amount: 2 },
            { type: "item", itemId: "platinum_sculpture", amount: 3 }
        ]
    }
])
