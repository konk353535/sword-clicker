import { orderLootTable } from "../../enemies/lootTables/index.js"

export const LEVEL_FOUR_MONSTERS = [
    {
        id: "cat",
        icon: "cat.svg",
        name: "cat"
    },
    {
        id: "turtle",
        icon: "turtle.svg",
        name: "turtle",
        heavilyArmored: true
    },
    {
        id: "goat",
        icon: "goat.svg",
        name: "goat"
    },
    {
        id: "boar",
        icon: "boar.svg",
        name: "boar"
    },
    {
        id: "fox",
        icon: "fox.svg",
        name: "fox"
    }
]

export const LEVEL_FOUR_LOOT_TABLE = orderLootTable([
    {
        chance: 1 / 40,
        rewards: [
            { type: "item", itemId: "bronze_pickaxe", amount: 1 },
            { type: "item", itemId: "bronze_axe", amount: 1 },
            { type: "item", itemId: "bronze_dagger", amount: 1 }
        ]
    },
    {
        chance: 1 / 64,
        rewards: [{ type: "item", itemId: "health_up_1_tome", amount: 1 }]
    },
    {
        chance: 1 / 64,
        rewards: [{ type: "item", itemId: "magic_armor_up_level_1_tome", amount: 1 }]
    },
    {
        chance: 1 / 4,
        rewards: [
            { type: "item", itemId: "ore_bronze", amount: 1 },
            { type: "item", itemId: "bronze_bar", amount: 1 },
            { type: "item", itemId: "ash_log", amount: 1 },
            { type: "item", itemId: "ash_log", amount: 2 }
        ]
    },
    {
        chance: 1 / 6,
        rewards: [
            { type: "gold", amount: 33 },
            { type: "gold", amount: 66 },
            { type: "gold", amount: 131 },
            { type: "item", itemId: "bronze_sculpture", amount: 1 },
            { type: "item", itemId: "bronze_sculpture", amount: 2 },
            { type: "item", itemId: "bronze_sculpture", amount: 3 }
        ]
    },
    {
        chance: 1 / 36,
        rewards: [{ type: "icon", iconId: "tank_t1_color" }]
    }
])
