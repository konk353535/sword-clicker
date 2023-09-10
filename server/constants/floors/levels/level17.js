import { orderLootTable } from "../../enemies/lootTables/index.js"

export const LEVEL_SEVENTEEN_MONSTERS = [
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

export const LEVEL_SEVENTEEN_LOOT_TABLE = orderLootTable([
    {
        chance: 1 / 64,
        rewards: [
            { type: "item", itemId: "orichalcum_pickaxe", amount: 1 },
            { type: "item", itemId: "orichalcum_axe", amount: 1 },
            { type: "item", itemId: "orichalcum_dagger", amount: 1 },
            { type: "item", itemId: "chilli", amount: 1 }
        ]
    },
    {
        chance: 1 / 48,
        rewards: [{ type: "item", itemId: "orichalcum_essence_scroll", amount: 1 }]
    },
    {
        chance: 1 / 24,
        rewards: [{ type: "item", itemId: "orichalcum_essence", amount: 1 }]
    },
    {
        chance: 1 / 12,
        rewards: [{ type: "item", itemId: "adamantium_essence", amount: 1 }]
    },
    {
        chance: 1 / 64,
        rewards: [{ type: "item", itemId: "penetrating_slash_level_3_tome", amount: 1 }]
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
            { type: "gold", amount: 325 },
            { type: "gold", amount: 650 },
            { type: "gold", amount: 1300 },
            { type: "item", itemId: "polished_orichalcum", amount: 1 },
            { type: "item", itemId: "polished_orichalcum", amount: 2 }
        ]
    }
])
