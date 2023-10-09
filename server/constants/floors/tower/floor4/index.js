import { ITEMS } from "../../../../../imports/constants/items/index"
import { orderLootTable } from "../../../enemies/lootTables/index.js"
import { LEVEL_FOUR_LOOT_TABLE } from "../../levels/level4"
console.log("importing floor4/index.js ITEMS")

console.log("exporting floor4/index.js TOWER_FLOOR_4")
export const TOWER_FLOOR_4 = {
    1: {
        name: "Lonely Oak",
        enemies: ["bird"],
        rewards: []
    },
    2: {
        name: "Little Burrow",
        enemies: ["wombat"],
        rewards: LEVEL_FOUR_LOOT_TABLE
    },
    3: {
        name: "Herb Garden",
        enemies: ["butterfly"],
        rewards: orderLootTable(
            LEVEL_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 32,
                    rewards: [{ type: "item", itemId: "lavender", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "iron_knife", amount: 1 }]
                }
            ])
        )
    },
    4: {
        name: "Deep Mine",
        enemies: ["goblin"],
        rewards: orderLootTable(
            LEVEL_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "iron_rapiers", amount: 1 }]
                },
                {
                    chance: 1 / 8,
                    rewards: [{ type: "gold", amount: 750 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "iron_wand", amount: 1 }]
                }
            ])
        )
    },
    5: {
        name: "Small Water Altar",
        enemies: ["blue_mage"],
        rewards: orderLootTable(
            LEVEL_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "druids_shirt", amount: 1 },
                        { type: "item", itemId: "druids_pants", amount: 1 },
                        { type: "item", itemId: "druid_trident", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "iron_kite_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "iron_spirit_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "iron_buckler", amount: 1 }]
                }
            ])
        )
    },
    6: {
        name: "Suspicious Mine",
        enemies: ["monk"],
        rewards: orderLootTable(
            LEVEL_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 4,
                    rewards: [
                        { type: "item", itemId: "ore_iron", amount: 1 },
                        { type: "item", itemId: "oak_log", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 8,
                    rewards: [{ type: "item", itemId: "iron_bar", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "iron_dwarven_idol", amount: 1 },
                        { type: "item", itemId: "iron_mining_hammer", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [
                        { type: "item", itemId: "malformed_orb", amount: 1 },
                        { type: "item", itemId: "worn_tome", amount: 1 }
                    ]
                }
            ])
        )
    },
    7: {
        name: "Earthen Mage",
        enemies: ["earth_mage"],
        rewards: orderLootTable(
            LEVEL_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "elemental_shield_tome", amount: 1 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "iron_hammer", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "iron_scimitar", amount: 1 },
                        { type: "item", itemId: "iron_broad_sword", amount: 1 },
                        { type: "item", itemId: "iron_horned_helmet", amount: 1 }
                    ]
                }
            ])
        )
    },

    boss: {
        enemy: { id: "boss_mage", amount: 1 },
        rewards: orderLootTable(
            LEVEL_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 2,
                    rewards: [{ type: "item", itemId: "druids_hat", amount: 1 }]
                }
            ])
        )
    },

    floorRewards: [
        {
            type: "item",
            itemId: "silver_dwarven_idol",
            icon: ITEMS["silver_dwarven_idol"].icon,
            name: ITEMS["silver_dwarven_idol"].name,
            baseStats: ITEMS["silver_dwarven_idol"].stats,
            extraStats: ITEMS["silver_dwarven_idol"].extraStats
        },
        {
            type: "item",
            itemId: "enhancer_key",
            icon: ITEMS["enhancer_key"].icon,
            name: ITEMS["enhancer_key"].name,
            baseStats: ITEMS["enhancer_key"].stats,
            extraStats: ITEMS["enhancer_key"].extraStats
        },
        {
            type: "gold",
            amount: 15000
        }
    ]
}
