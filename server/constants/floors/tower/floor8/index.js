import { ITEMS } from "../../../../../imports/constants/items/index"
import { orderLootTable } from "../../../enemies/lootTables/index.js"

import { LEVEL_EIGHT_LOOT_TABLE } from "../../levels/level8"

export const TOWER_FLOOR_8 = {
    1: {
        name: "Long Grass",
        enemies: ["snake"],
        rewards: orderLootTable([
            {
                chance: 1 / 3,
                rewards: [
                    { type: "item", itemId: "poison_shard_fragment", amount: 1 },
                    { type: "item", itemId: "poison_shard_fragment", amount: 2 },
                    { type: "item", itemId: "poison_shard_fragment", amount: 3 }
                ]
            }
        ])
    },
    2: {
        name: "White Beach",
        enemies: ["crab"],
        rewards: orderLootTable(
            LEVEL_EIGHT_LOOT_TABLE.concat([
                {
                    chance: 1 / 1024,
                    rewards: [{ type: "item", itemId: "opal_chest_plate", amount: 1 }]
                }
            ])
        )
    },
    3: {
        name: "Oak Tree",
        enemies: ["bird"],
        rewards: orderLootTable(
            LEVEL_EIGHT_LOOT_TABLE.concat([
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "celery_seed", amount: 1 }]
                },
                {
                    chance: 1 / 16,
                    rewards: [
                        { type: "item", itemId: "oak_seed", amount: 3 },
                        { type: "item", itemId: "oak_log", amount: 20 },
                        { type: "item", itemId: "oak_staff", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "steel_knife", amount: 1 }]
                }
            ])
        )
    },
    4: {
        name: "Place of Steel",
        enemies: ["monk"],
        rewards: orderLootTable(
            LEVEL_EIGHT_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "steel_rapiers", amount: 1 }]
                },
                {
                    chance: 1 / 3,
                    rewards: [{ type: "item", itemId: "steel_essence", amount: 1 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "steel_wand", amount: 1 }]
                }
            ])
        )
    },
    5: {
        name: "Fire Temple",
        enemies: ["fire_mage"],
        rewards: orderLootTable(
            LEVEL_EIGHT_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "steel_kite_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "steel_spirit_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "steel_buckler", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "purple_trident", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "purple_wizard_hat", amount: 1 },
                        { type: "item", itemId: "purple_wizard_shirt", amount: 1 },
                        { type: "item", itemId: "purple_wizard_shorts", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "taunt_level_3_tome", amount: 1 }]
                }
            ])
        )
    },
    6: {
        name: "Suspicious Mine",
        enemies: ["angry_miner"],
        rewards: orderLootTable(
            LEVEL_EIGHT_LOOT_TABLE.concat([
                {
                    chance: 1 / 4,
                    rewards: [
                        { type: "item", itemId: "ore_steel", amount: 1 },
                        { type: "item", itemId: "mahogany_log", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 8,
                    rewards: [{ type: "item", itemId: "steel_bar", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "steel_dwarven_idol", amount: 1 },
                        { type: "item", itemId: "steel_mining_hammer", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [
                        { type: "item", itemId: "tainted_orb", amount: 1 },
                        { type: "item", itemId: "studius_tome", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "accuracy_up_4_tome", amount: 1 }]
                }
            ])
        )
    },
    7: {
        name: "Magician's Headquarters",
        enemies: ["blue_mage"],
        rewards: orderLootTable(
            LEVEL_EIGHT_LOOT_TABLE.concat([
                {
                    chance: 1 / 96,
                    rewards: [
                        { type: "item", itemId: "feeding_frenzy_tome", amount: 1 },
                        { type: "item", itemId: "bleeding_spin_1_tome", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "steel_hammer", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "steel_scimitar", amount: 1 },
                        { type: "item", itemId: "steel_broad_sword", amount: 1 },
                        { type: "item", itemId: "steel_horned_helmet", amount: 1 }
                    ]
                }
            ])
        )
    },

    boss: {
        enemy: { id: "boss_ogre", amount: 1 },
        rewards: orderLootTable(
            LEVEL_EIGHT_LOOT_TABLE.concat([
                {
                    chance: 1 / 5,
                    rewards: [{ type: "icon", iconId: "valla_t1" }]
                },
                {
                    chance: 1 / 25,
                    rewards: [{ type: "icon", iconId: "valla_t1_color" }]
                },
                {
                    chance: 1 / 2,
                    rewards: [{ type: "item", itemId: "oversized_club", amount: 1 }]
                }
            ])
        )
    },

    floorRewards: [
        {
            type: "item",
            itemId: "platinum_dwarven_idol",
            icon: ITEMS["platinum_dwarven_idol"].icon,
            name: ITEMS["platinum_dwarven_idol"].name,
            baseStats: ITEMS["platinum_dwarven_idol"].stats,
            extraStats: ITEMS["platinum_dwarven_idol"].extraStats
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
