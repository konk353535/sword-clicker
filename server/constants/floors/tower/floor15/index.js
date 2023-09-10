import { ITEMS } from "../../../../../imports/constants/items/index"
import { orderLootTable } from "../../../enemies/lootTables/index.js"

import { LEVEL_FIFTEEN_LOOT_TABLE } from "../../levels/level15"

export const TOWER_FLOOR_15 = {
    1: {
        name: "Flaming House",
        enemies: ["demon"],
        rewards: []
    },
    2: {
        name: "Creaking Door",
        enemies: ["wasp"],
        rewards: LEVEL_FIFTEEN_LOOT_TABLE
    },
    3: {
        name: "Deep Water",
        enemies: ["octopus"],
        rewards: orderLootTable(
            LEVEL_FIFTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 8,
                    rewards: [
                        { type: "item", itemId: "lettice", amount: 50 },
                        { type: "item", itemId: "feverfew_seed", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "adamantium_knife", amount: 1 }]
                }
            ])
        )
    },
    4: {
        name: "Place of Adamantium",
        enemies: ["adamantium_spirit"],
        rewards: orderLootTable(
            LEVEL_FIFTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "adamantium_rapiers", amount: 1 }]
                },
                {
                    chance: 1 / 4,
                    rewards: [{ type: "item", itemId: "adamantium_essence", amount: 1 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "adamantium_wand", amount: 1 }]
                }
            ])
        )
    },
    5: {
        name: "Dark Chasm",
        enemies: ["crab"],
        rewards: orderLootTable(
            LEVEL_FIFTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "adamantium_kite_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "adamantium_spirit_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "adamantium_buckler", amount: 1 }]
                },
                {
                    chance: 1 / 256,
                    rewards: [{ type: "item", itemId: "adamantium_rapiers", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "crimson_trident", amount: 1 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "haste_level_1_tome", amount: 1 }]
                }
            ])
        )
    },
    6: {
        name: "Big Pit",
        enemies: ["snake", "snake", "snake"],
        rewards: orderLootTable(
            LEVEL_FIFTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 4,
                    rewards: [
                        { type: "item", itemId: "ore_adamantium", amount: 1 },
                        { type: "item", itemId: "hickory_log", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 8,
                    rewards: [{ type: "item", itemId: "adamantium_bar", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "adamantium_dwarven_idol", amount: 1 },
                        { type: "item", itemId: "adamantium_mining_hammer", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [
                        { type: "item", itemId: "pristine_orb", amount: 1 },
                        { type: "item", itemId: "bewildering_tome", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "accuracy_up_5_tome", amount: 1 }]
                }
            ])
        )
    },
    7: {
        name: "Eternal Abyss",
        enemies: ["demon", "angel"],
        rewards: orderLootTable(
            LEVEL_FIFTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "chives", amount: 1 }]
                },
                {
                    chance: 1 / 16,
                    rewards: [{ type: "item", itemId: "complete_fire_shard", amount: 10 }]
                },
                {
                    chance: 1 / 64,
                    rewards: [{ type: "item", itemId: "adamantium_hammer", amount: 1 }]
                },
                {
                    chance: 1 / 32,
                    rewards: [
                        { type: "item", itemId: "adamantium_scimitar", amount: 1 },
                        { type: "item", itemId: "adamantium_broad_sword", amount: 1 },
                        { type: "item", itemId: "adamantium_horned_helmet", amount: 1 }
                    ]
                }
            ])
        )
    },

    boss: {
        enemy: { id: "boss_cassiopeia", amount: 1 },
        rewards: orderLootTable(
            LEVEL_FIFTEEN_LOOT_TABLE.concat([
                {
                    chance: 1 / 2,
                    rewards: [{ type: "item", itemId: "rich_snake_skin", amount: 1 }]
                }
            ])
        )
    },

    floorRewards: [
        {
            type: "item",
            itemId: "orichalcum_dwarven_idol",
            icon: ITEMS["orichalcum_dwarven_idol"].icon,
            name: ITEMS["orichalcum_dwarven_idol"].name,
            baseStats: ITEMS["orichalcum_dwarven_idol"].stats,
            extraStats: ITEMS["orichalcum_dwarven_idol"].extraStats
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
