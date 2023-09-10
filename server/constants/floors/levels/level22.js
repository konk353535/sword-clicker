import { orderLootTable } from "../../enemies/lootTables/index.js"

export const LEVEL_TWENTY_TWO_MONSTERS = [
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

export const LEVEL_TWENTY_TWO_LOOT_TABLE = orderLootTable([
    {},
    {},
    {
        chance: 1 / 20,
        rewards: [{ type: "item", itemId: "cursed_essence", amount: 1 }]
    },
    {
        chance: 1 / 20,
        rewards: [{ type: "item", itemId: "orichalcum_essence", amount: 1 }]
    },
    {
        chance: 1 / 4,
        rewards: [
            { type: "item", itemId: "ore_cursed", amount: 1 },
            { type: "item", itemId: "cursed_bar", amount: 1 },
            { type: "item", itemId: "teak_log", amount: 1 },
            { type: "item", itemId: "teak_log", amount: 2 }
        ]
    },
    {
        chance: 1 / 4,
        rewards: [
            { type: "item", itemId: "ore_orichalcum", amount: 1 },
            { type: "item", itemId: "orichalcum_bar", amount: 1 },
            { type: "item", itemId: "larch_log", amount: 1 },
            { type: "item", itemId: "larch_log", amount: 2 }
        ]
    },
    {
        chance: 1 / 4,
        rewards: [
            { type: "gold", amount: 900 },
            { type: "gold", amount: 1800 },
            { type: "gold", amount: 3600 },
            { type: "item", itemId: "polished_cursed", amount: 3 },
            { type: "item", itemId: "polished_cursed", amount: 5 }
        ]
    }
])
