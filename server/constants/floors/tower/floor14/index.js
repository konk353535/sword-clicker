import { ITEMS } from "../../../../../imports/constants/items/index"
import { orderLootTable } from "../../../enemies/lootTables/index.js"

import { LEVEL_FOURTEEN_LOOT_TABLE } from "../../levels/level14"

export const TOWER_FLOOR_14 = {
    1: {
        name: "Leaking Dam",
        enemies: ["beaver", "beaver"],
        rewards: []
    },
    2: {
        name: "Snake Pit",
        enemies: ["snake", "snake"],
        rewards: LEVEL_FOURTEEN_LOOT_TABLE
    },
    3: {
        name: "Cliff's Edge",
        enemies: ["dragonfly", "butterfly"],
        rewards: orderLootTable(
            LEVEL_FOURTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 8,
                    rewards: [{ type: "item", itemId: "red_apple", amount: 15 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "mithril_knife", amount: 1 }]
                }
            ])
        )
    },
    4: {
        name: "Place of Mithril",
        enemies: ["mithril_spirit"],
        rewards: orderLootTable(
            LEVEL_FOURTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "mithril_rapiers", amount: 1 }]
                },
                {
                    chance: 1 / 4,
                    rewards: [{ type: "item", itemId: "mithril_essence", amount: 1 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "mithril_wand", amount: 1 }]
                }
            ])
        )
    },
    5: {
        name: "Meat Works",
        enemies: ["rabbit", "farmer"],
        rewards: orderLootTable(
            LEVEL_FOURTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "mithril_kite_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "mithril_spirit_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "mithril_buckler", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "violet_wizard_hat", amount: 1 },
                        { type: "item", itemId: "violet_wizard_shirt", amount: 1 },
                        { type: "item", itemId: "violet_wizard_shorts", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "scream_level_3_tome", amount: 1 }]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "power_shot_level_4_tome", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "violet_trident", amount: 1 }]
                }
            ])
        )
    },
    6: {
        name: "Hell's Quarry",
        enemies: ["goblin", "demon"],
        rewards: orderLootTable(
            LEVEL_FOURTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 4,
                    rewards: [
                        { type: "item", itemId: "ore_mithril", amount: 1 },
                        { type: "item", itemId: "gombe_log", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 8,
                    rewards: [{ type: "item", itemId: "mithril_bar", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "mithril_dwarven_idol", amount: 1 },
                        { type: "item", itemId: "mithril_mining_hammer", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [
                        { type: "item", itemId: "billowing_orb", amount: 1 },
                        { type: "item", itemId: "rich_tome", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "healing_power_up_level_4_tome", amount: 1 }]
                }
            ])
        )
    },
    7: {
        name: "Thieves' Guild",
        enemies: ["cut_purse", "cut_purse"],
        rewards: orderLootTable(
            LEVEL_FOURTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 64,
                    rewards: [
                        { type: "item", itemId: "lemon_grass", amount: 1 },
                        { type: "item", itemId: "garlic_seed", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "mithril_scimitar", amount: 1 },
                        { type: "item", itemId: "mithril_broad_sword", amount: 1 },
                        { type: "item", itemId: "mithril_horned_helmet", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "mithril_hammer", amount: 1 }]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "phantom_strikes_level_4_tome", amount: 1 }]
                },
                {
                    chance: 1 / 96,
                    rewards: [{ type: "icon", iconId: "crow_t2" }]
                },
                {
                    chance: 1 / 256,
                    rewards: [{ type: "icon", iconId: "crow_t2_color" }]
                }
            ])
        )
    },

    boss: {
        enemy: { id: "boss_frankenstein", amount: 1 },
        rewards: orderLootTable(
            LEVEL_FOURTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 2,
                    rewards: [{ type: "item", itemId: "frankensteins_heart", amount: 1 }]
                }
            ])
        )
    },

    floorRewards: [
        {
            type: "item",
            itemId: "adamantium_dwarven_idol",
            icon: ITEMS["adamantium_dwarven_idol"].icon,
            name: ITEMS["adamantium_dwarven_idol"].name,
            baseStats: ITEMS["adamantium_dwarven_idol"].stats,
            extraStats: ITEMS["adamantium_dwarven_idol"].extraStats
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
            amount: 150000
        }
    ]
}
