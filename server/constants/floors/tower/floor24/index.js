import { ITEMS } from "../../../../../imports/constants/items/index"
import { orderLootTable } from "../../../enemies/lootTables/index.js"

import { LEVEL_TWENTY_FOUR_LOOT_TABLE } from "../../levels/level24"

export const TOWER_FLOOR_24 = {
    1: {
        name: "Singed Horrors",
        enemies: ["fire_mage", "fire_mage", "fire_mage", "water_mage", "water_mage"],
        rewards: []
    },
    2: {
        name: "Goblin Menace",
        enemies: ["goblin", "goblin", "goblin", "goblin", "goblin", "goblin", "goblin"],
        rewards: orderLootTable(
            LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 20,
                    rewards: [
                        { type: "item", itemId: "titanfoil_dagger_scroll", amount: 1 },
                        { type: "item", itemId: "titanfoil_furnace_scroll", amount: 1 }
                    ]
                }
            ])
        )
    },
    3: {
        name: "To the Beyond",
        enemies: ["demon", "demon", "demon", "demon", "demon"],
        rewards: orderLootTable(
            LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 20,
                    rewards: [
                        { type: "item", itemId: "titanfoil_shield_scroll", amount: 1 },
                        { type: "item", itemId: "titanfoil_short_sword_scroll", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 144,
                    rewards: [{ type: "item", itemId: "titanfoil_knife", amount: 1 }]
                },
                {
                    chance: 1 / 36,
                    rewards: [{ type: "item", itemId: "magic_bow_scroll", amount: 1 }]
                },
                {
                    chance: 1 / 36,
                    rewards: [{ type: "item", itemId: "titanfoil_quiver_scroll", amount: 1 }]
                }
            ])
        )
    },
    4: {
        name: "Vile Pools",
        enemies: ["gelatinous_cube", "gelatinous_cube"],
        rewards: orderLootTable(
            LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 144,
                    rewards: [{ type: "item", itemId: "titanfoil_rapiers", amount: 1 }]
                },
                {
                    chance: 1 / 20,
                    rewards: [
                        { type: "item", itemId: "titanfoil_helmet_scroll", amount: 1 },
                        { type: "item", itemId: "titanfoil_chest_plate_scroll", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 96,
                    rewards: [{ type: "item", itemId: "titanfoil_wand", amount: 1 }]
                }
            ])
        )
    },
    5: {
        name: "Spirits",
        enemies: ["cursed_spirit", "elven_steel_spirit"],
        rewards: orderLootTable(
            LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "titanfoil_kite_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "titanfoil_spirit_shield", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "titanfoil_buckler", amount: 1 }]
                },
                {
                    chance: 1 / 20,
                    rewards: [
                        { type: "item", itemId: "titanfoil_axe_scroll", amount: 1 },
                        { type: "item", itemId: "titanfoil_pickaxe_scroll", amount: 1 },
                        { type: "item", itemId: "titanfoil_mining_anvil_scroll", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 128,
                    rewards: [
                        { type: "item", itemId: "ochre_wizard_hat", amount: 1 },
                        { type: "item", itemId: "ochre_wizard_shirt", amount: 1 },
                        { type: "item", itemId: "ochre_wizard_shorts", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 48,
                    rewards: [{ type: "item", itemId: "scream_level_5_tome", amount: 1 }]
                },
                {
                    chance: 1 / 128,
                    rewards: [{ type: "item", itemId: "ochre_trident", amount: 1 }]
                }
            ])
        )
    },
    6: {
        name: "Flesh-Eaters",
        enemies: ["worm", "worm", "worm"],
        rewards: orderLootTable(
            LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 20,
                    rewards: [
                        { type: "item", itemId: "titanfoil_spear_scroll", amount: 1 },
                        { type: "item", itemId: "titanfoil_plate_legs_scroll", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 36,
                    rewards: [
                        { type: "item", itemId: "titanfoil_dwarven_idol", amount: 1 },
                        { type: "item", itemId: "titanfoil_mining_hammer", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 128,
                    rewards: [
                        { type: "item", itemId: "phantasmal_orb", amount: 1 },
                        { type: "item", itemId: "sinister_tome", amount: 1 }
                    ]
                }
            ])
        )
    },
    7: {
        name: "Three Wise Men",
        enemies: ["monk", "monk", "monk"],
        rewards: orderLootTable(
            LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 20,
                    rewards: [
                        { type: "item", itemId: "titanfoil_long_sword_scroll", amount: 1 },
                        { type: "item", itemId: "titanfoil_battle_axe_scroll", amount: 1 }
                    ]
                },
                {
                    chance: 1 / 72,
                    rewards: [{ type: "item", itemId: "titanfoil_hammer", amount: 1 }]
                },
                {
                    chance: 1 / 36,
                    rewards: [
                        { type: "item", itemId: "titanfoil_scimitar", amount: 1 },
                        { type: "item", itemId: "titanfoil_broad_sword", amount: 1 },
                        { type: "item", itemId: "titanfoil_horned_helmet", amount: 1 }
                    ]
                }
            ])
        )
    },

    boss: {
        enemy: { id: "boss_ruiner", amount: 1 },
        rewards: orderLootTable(
            LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([
                {
                    chance: 1 / 2,
                    rewards: [{ type: "item", itemId: "farplane_resonator", amount: 1 }]
                }
            ])
        )
    },

    floorRewards: [
        {
            type: "item",
            itemId: "relicrock_dwarven_idol",
            icon: ITEMS["relicrock_dwarven_idol"].icon,
            name: ITEMS["relicrock_dwarven_idol"].name,
            baseStats: ITEMS["relicrock_dwarven_idol"].stats,
            extraStats: ITEMS["relicrock_dwarven_idol"].extraStats
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
            amount: 1000000
        }
    ]
}
