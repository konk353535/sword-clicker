import { ITEMS } from "../../../../../imports/constants/items/index"
import { orderLootTable } from "../../../enemies/lootTables/index.js"

import { LEVEL_THIRTEEN_LOOT_TABLE } from "../../levels/level13"

export const TOWER_FLOOR_13 = {
    1: {
        name: "Animal Carcass",
        enemies: ["fly", "worm"],
        rewards: []
    },
    2: {
        name: "Sparta",
        enemies: ["spartan", "spartan"],
        rewards: LEVEL_THIRTEEN_LOOT_TABLE
    },
    3: {
        name: "Venom's Place",
        enemies: ["jellyFish", "spider", "snake"],
        rewards: orderLootTable(
            LEVEL_THIRTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "nasturtium", amount: 1 }]
                },
                {
                    chance: 1 / 8,
                    rewards: [
                        { type: "item", itemId: "lettice", amount: 50 },
                        { type: "item", itemId: "dragonfruit_seed", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "cobalt_knife", amount: 1 }]
                }
            ])
        )
    },
    4: {
        name: "Place of Cobalt",
        enemies: ["cobalt_spirit"],
        rewards: orderLootTable(
            LEVEL_THIRTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "cobalt_rapiers", amount: 1 }]
                },
                {
                    chance: 1 / 4,
                    rewards: [{ type: "item", itemId: "cobalt_essence", amount: 1 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "cobalt_wand", amount: 1 }]
                }
            ])
        )
    },
    5: {
        name: "Hell",
        enemies: ["demon", "demon", "worm"],
        rewards: orderLootTable(
            LEVEL_THIRTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "cobalt_kite_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "cobalt_spirit_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "cobalt_buckler", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "violet_trident", amount: 1 }]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "volley_level_3_tome", amount: 1 }]
                }
            ])
        )
    },
    6: {
        name: "Old Mine",
        enemies: ["dwarf", "gorilla"],
        rewards: orderLootTable(
            LEVEL_THIRTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 4,
                    rewards: [
                        { type: "item", itemId: "ore_cobalt", amount: 1 },
                        { type: "item", itemId: "denya_log", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 8,
                    rewards: [{ type: "item", itemId: "cobalt_bar", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "cobalt_dwarven_idol", amount: 1 },
                        { type: "item", itemId: "cobalt_mining_hammer", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [
                        { type: "item", itemId: "runed_orb", amount: 1 },
                        { type: "item", itemId: "scholars_tome", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "magic_power_up_level_4_tome", amount: 1 }]
                }
            ])
        )
    },
    7: {
        name: "Rolling Stones",
        enemies: ["ice_giant", "water_mage"],
        rewards: orderLootTable(
            LEVEL_THIRTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 96,
                    rewards: [
                        { type: "item", itemId: "lightning_storm_tome", amount: 1 },
                        { type: "item", itemId: "frost_armor_2_tome", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 4,
                    rewards: [{ type: "item", itemId: "air_shard_fragment", amount: 50 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "cobalt_hammer", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "cobalt_scimitar", amount: 1 },
                        { type: "item", itemId: "cobalt_broad_sword", amount: 1 },
                        { type: "item", itemId: "cobalt_horned_helmet", amount: 1 }
                    ]
                }
            ])
        )
    },

    boss: {
        enemy: { id: "boss_vampire", amount: 1 },
        rewards: orderLootTable(
            LEVEL_THIRTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 2,
                    rewards: [{ type: "item", itemId: "bloody_plate_legs", amount: 1 }]
                }
            ])
        )
    },

    floorRewards: [
        {
            type: "item",
            itemId: "mithril_dwarven_idol",
            icon: ITEMS["mithril_dwarven_idol"].icon,
            name: ITEMS["mithril_dwarven_idol"].name,
            baseStats: ITEMS["mithril_dwarven_idol"].stats,
            extraStats: ITEMS["mithril_dwarven_idol"].extraStats
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
