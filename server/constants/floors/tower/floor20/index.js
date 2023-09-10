import { ITEMS } from "../../../../../imports/constants/items/index"
import { orderLootTable } from "../../../enemies/lootTables/index.js"

import { LEVEL_TWENTY_LOOT_TABLE } from "../../levels/level20"

export const TOWER_FLOOR_20 = {
    1: {
        name: "Desert",
        enemies: ["lizard"],
        rewards: []
    },
    2: {
        name: "Grassy Paddock",
        enemies: ["fly"],
        rewards: LEVEL_TWENTY_LOOT_TABLE
    },
    3: {
        name: "Wooden Dam",
        enemies: ["beaver"],
        rewards: orderLootTable(
            LEVEL_TWENTY_LOOT_TABLE.concat([
                {
                    chance: 1 / 8,
                    rewards: [
                        { type: "item", itemId: "lettice", amount: 50 },
                        { type: "item", itemId: "feverfew_seed", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 96,
                    rewards: [{ type: "item", itemId: "sorrell", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "cursed_knife", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [{ type: "item", itemId: "teak_bow_scroll", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [{ type: "item", itemId: "cursed_quiver_scroll", amount: 1 }]
                }
            ])
        )
    },
    4: {
        name: "Cursed Place",
        enemies: ["cursed_spirit"],
        rewards: orderLootTable(
            LEVEL_TWENTY_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "cursed_rapiers", amount: 1 }]
                },
                {
                    chance: 1 / 4,
                    rewards: [{ type: "item", itemId: "cursed_essence", amount: 1 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "cursed_wand", amount: 1 }]
                }
            ])
        )
    },
    5: {
        name: "Winding River",
        enemies: ["fish", "jellyFish"],
        rewards: orderLootTable(
            LEVEL_TWENTY_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "cursed_kite_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "cursed_spirit_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "cursed_buckler", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "verdant_wizard_hat", amount: 1 },
                        { type: "item", itemId: "verdant_wizard_shirt", amount: 1 },
                        { type: "item", itemId: "verdant_wizard_shorts", amount: 1 }
                    ]
                }
            ])
        )
    },
    6: {
        name: "Suspicious Mine",
        enemies: ["angry_miner", "angry_miner"],
        rewards: orderLootTable(
            LEVEL_TWENTY_LOOT_TABLE.concat([
                {
                    chance: 1 / 4,
                    rewards: [
                        { type: "item", itemId: "ore_cursed", amount: 1 },
                        { type: "item", itemId: "teak_log", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 8,
                    rewards: [{ type: "item", itemId: "cursed_bar", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "cursed_dwarven_idol", amount: 1 },
                        { type: "item", itemId: "cursed_mining_hammer", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [
                        { type: "item", itemId: "cataclysmic_orb", amount: 1 },
                        { type: "item", itemId: "legendary_tome", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "magic_power_up_level_5_tome", amount: 1 }]
                }
            ])
        )
    },
    7: {
        name: "Down Under",
        enemies: ["echidna", "wombat", "snake", "spider"],
        rewards: orderLootTable(
            LEVEL_TWENTY_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "diamond_skin_tome", amount: 1 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "cursed_hammer", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "cursed_scimitar", amount: 1 },
                        { type: "item", itemId: "cursed_broad_sword", amount: 1 },
                        { type: "item", itemId: "cursed_horned_helmet", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "phantom_strikes_level_5_tome", amount: 1 }]
                }
            ])
        )
    },

    boss: {
        enemy: { id: "boss_fox", amount: 1 },
        rewards: orderLootTable(
            LEVEL_TWENTY_LOOT_TABLE.concat([
                {
                    chance: 1 / 2,
                    rewards: [{ type: "item", itemId: "baby_fox", amount: 1 }]
                }
            ])
        )
    },

    floorRewards: [
        {
            type: "item",
            itemId: "darksteel_dwarven_idol",
            icon: ITEMS["darksteel_dwarven_idol"].icon,
            name: ITEMS["darksteel_dwarven_idol"].name,
            baseStats: ITEMS["darksteel_dwarven_idol"].stats,
            extraStats: ITEMS["darksteel_dwarven_idol"].extraStats
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
