import { ITEMS } from "../../../../../imports/constants/items/index"
import { orderLootTable } from "../../../enemies/lootTables/index.js"

import { LEVEL_TWELVE_LOOT_TABLE } from "../../levels/level12"

export const TOWER_FLOOR_12 = {
    1: {
        name: "Old Mage",
        enemies: ["brown_mage"],
        rewards: []
    },
    2: {
        name: "Old Log",
        enemies: ["lizard", "rat"],
        rewards: LEVEL_TWELVE_LOOT_TABLE
    },
    3: {
        name: "Village",
        enemies: ["farmer", "bird"],
        rewards: orderLootTable(
            LEVEL_TWELVE_LOOT_TABLE.concat([
                {
                    chance: 1 / 8,
                    rewards: [
                        { type: "item", itemId: "lettice", amount: 50 },
                        { type: "item", itemId: "feverfew_seed", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "nasturtium", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "obsidian_knife", amount: 1 }]
                }
            ])
        )
    },
    4: {
        name: "Place of Obsidian",
        enemies: ["obsidian_spirit"],
        rewards: orderLootTable(
            LEVEL_TWELVE_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "obsidian_rapiers", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "druids_shirt", amount: 1 },
                        { type: "item", itemId: "druids_pants", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 4,
                    rewards: [{ type: "item", itemId: "obsidian_essence", amount: 1 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "obsidian_wand", amount: 1 }]
                }
            ])
        )
    },
    5: {
        name: "Shivering Tree",
        enemies: ["bird", "grasshopper"],
        rewards: orderLootTable(
            LEVEL_TWELVE_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "obsidian_kite_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "obsidian_spirit_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "obsidian_buckler", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "azure_wizard_hat", amount: 1 },
                        { type: "item", itemId: "azure_wizard_shirt", amount: 1 },
                        { type: "item", itemId: "azure_wizard_shorts", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "taunt_level_4_tome", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "azure_trident", amount: 1 }]
                }
            ])
        )
    },
    6: {
        name: "Beach Pit",
        enemies: ["monk", "crab"],
        rewards: orderLootTable(
            LEVEL_TWELVE_LOOT_TABLE.concat([
                {
                    chance: 1 / 4,
                    rewards: [
                        { type: "item", itemId: "ore_obsidian", amount: 1 },
                        { type: "item", itemId: "cedar_log", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 8,
                    rewards: [{ type: "item", itemId: "obsidian_bar", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "obsidian_dwarven_idol", amount: 1 },
                        { type: "item", itemId: "obsidian_mining_hammer", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [
                        { type: "item", itemId: "pulsating_orb", amount: 1 },
                        { type: "item", itemId: "spellbound_tome", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "attack_up_4_tome", amount: 1 }]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "critical_up_level_4_tome", amount: 1 }]
                }
            ])
        )
    },
    7: {
        name: "Bloody River",
        enemies: ["elephant", "rat", "spartan"],
        rewards: orderLootTable(
            LEVEL_TWELVE_LOOT_TABLE.concat([
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "double_edged_sword_5_tome", amount: 1 }]
                },
                {
                    chance: 1 / 96,
                    rewards: [{ type: "icon", iconId: "adalgar_t1" }]
                },
                {
                    chance: 1 / 256,
                    rewards: [{ type: "icon", iconId: "adalgar_t1_color" }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "obsidian_hammer", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "obsidian_scimitar", amount: 1 },
                        { type: "item", itemId: "obsidian_broad_sword", amount: 1 },
                        { type: "item", itemId: "obsidian_horned_helmet", amount: 1 }
                    ]
                }
            ])
        )
    },

    boss: {
        enemy: { id: "boss_living_tree", amount: 1 },
        rewards: orderLootTable(
            LEVEL_TWELVE_LOOT_TABLE.concat([
                {
                    chance: 1 / 2,
                    rewards: [{ type: "item", itemId: "living_helmet", amount: 1 }]
                }
            ])
        )
    },

    floorRewards: [
        {
            type: "item",
            itemId: "cobalt_dwarven_idol",
            icon: ITEMS["cobalt_dwarven_idol"].icon,
            name: ITEMS["cobalt_dwarven_idol"].name,
            baseStats: ITEMS["cobalt_dwarven_idol"].stats,
            extraStats: ITEMS["cobalt_dwarven_idol"].extraStats
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
