console.log("importing mining/crafts.js ITEMS")
import { ITEMS } from "/imports/constants/items/index.js"
const MINUTE = 60

console.log("exporting mining/crafts.js MINING_CRAFTS")
export const MINING_CRAFTS = Object.freeze({
    primitive_pickaxe: {
        produces: "primitive_pickaxe",
        recipeFor: "crafting",
        name: "primitive pickaxe",
        id: "primitive_pickaxe",
        category: "mining",
        timeToCraft: 15,
        xp: 6,
        maxToCraft: 1,
        requiredCraftingLevel: 1,
        required: [
            {
                type: "item",
                itemId: "ore_stone",
                icon: ITEMS["ore_stone"].icon,
                name: ITEMS["ore_stone"].name,
                amount: 3,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 1
            }
        ]
    },

    copper_pickaxe: {
        produces: "copper_pickaxe",
        recipeFor: "crafting",
        name: "copper pickaxe",
        id: "copper_pickaxe",
        category: "mining",
        timeToCraft: 60, // 60
        xp: 20,
        maxToCraft: 1,
        requiredCraftingLevel: 3,
        required: [
            {
                type: "item",
                itemId: "stone_furnace",
                icon: ITEMS["stone_furnace"].icon,
                name: ITEMS["stone_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "pine_log",
                icon: ITEMS["pine_log"].icon,
                name: ITEMS["pine_log"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "copper_bar",
                icon: ITEMS["copper_bar"].icon,
                name: ITEMS["copper_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 3
            }
        ]
    },

    pine_idol: {
        produces: "pine_idol",
        recipeFor: "crafting",
        name: "pine idol",
        id: "pine_idol",
        category: "mining",
        timeToCraft: 60, // 60
        xp: 100,
        maxToCraft: 1,
        requiredCraftingLevel: 3,
        required: [
            {
                type: "item",
                itemId: "pine_log",
                icon: ITEMS["pine_log"].icon,
                name: ITEMS["pine_log"].name,
                amount: 100,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 3
            }
        ]
    },

    tin_pickaxe: {
        produces: "tin_pickaxe",
        recipeFor: "crafting",
        name: "tin pickaxe",
        id: "tin_pickaxe",
        category: "mining",
        timeToCraft: 1.5 * MINUTE, // 60
        xp: 30,
        maxToCraft: 1,
        requiredCraftingLevel: 6,
        required: [
            {
                type: "item",
                itemId: "copper_furnace",
                icon: ITEMS["copper_furnace"].icon,
                name: ITEMS["copper_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "beech_log",
                icon: ITEMS["beech_log"].icon,
                name: ITEMS["beech_log"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "tin_bar",
                icon: ITEMS["tin_bar"].icon,
                name: ITEMS["tin_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 6
            }
        ]
    },

    bronze_pickaxe: {
        produces: "bronze_pickaxe",
        recipeFor: "crafting",
        name: "bronze pickaxe",
        id: "bronze_pickaxe",
        category: "mining",
        timeToCraft: 2 * MINUTE, // 60
        xp: 45,
        maxToCraft: 1,
        requiredCraftingLevel: 10,
        required: [
            {
                type: "item",
                itemId: "tin_furnace",
                icon: ITEMS["tin_furnace"].icon,
                name: ITEMS["tin_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "ash_log",
                icon: ITEMS["ash_log"].icon,
                name: ITEMS["ash_log"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "bronze_bar",
                icon: ITEMS["bronze_bar"].icon,
                name: ITEMS["bronze_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 10
            }
        ]
    },

    ash_idol: {
        produces: "ash_idol",
        recipeFor: "crafting",
        name: "ash idol",
        id: "ash_idol",
        category: "mining",
        timeToCraft: 2 * MINUTE, // 60
        xp: 450,
        maxToCraft: 1,
        requiredCraftingLevel: 10,
        required: [
            {
                type: "item",
                itemId: "ash_log",
                icon: ITEMS["ash_log"].icon,
                name: ITEMS["ash_log"].name,
                amount: 100,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 10
            }
        ]
    },

    iron_pickaxe: {
        produces: "iron_pickaxe",
        recipeFor: "crafting",
        name: "iron pickaxe",
        id: "iron_pickaxe",
        category: "mining",
        timeToCraft: 3 * MINUTE, // 60
        xp: 65,
        maxToCraft: 1,
        requiredCraftingLevel: 15,
        required: [
            {
                type: "item",
                itemId: "bronze_furnace",
                icon: ITEMS["bronze_furnace"].icon,
                name: ITEMS["bronze_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "oak_log",
                icon: ITEMS["oak_log"].icon,
                name: ITEMS["oak_log"].name,
                amount: 15,
                consumes: true
            },
            {
                type: "item",
                itemId: "iron_bar",
                icon: ITEMS["iron_bar"].icon,
                name: ITEMS["iron_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 15
            }
        ]
    },

    silver_pickaxe: {
        produces: "silver_pickaxe",
        recipeFor: "crafting",
        name: "silver pickaxe",
        id: "silver_pickaxe",
        category: "mining",
        timeToCraft: 4 * MINUTE, // 60
        xp: 300,
        maxToCraft: 1,
        requiredCraftingLevel: 20,
        required: [
            {
                type: "item",
                itemId: "iron_furnace",
                icon: ITEMS["iron_furnace"].icon,
                name: ITEMS["iron_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "silver_essence",
                icon: ITEMS["silver_essence"].icon,
                name: ITEMS["silver_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "maple_log",
                icon: ITEMS["maple_log"].icon,
                name: ITEMS["maple_log"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "silver_bar",
                icon: ITEMS["silver_bar"].icon,
                name: ITEMS["silver_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 20
            }
        ]
    },

    maple_idol: {
        produces: "maple_idol",
        recipeFor: "crafting",
        name: "maple idol",
        id: "maple_idol",
        category: "mining",
        timeToCraft: 4 * MINUTE, // 60
        xp: 900,
        maxToCraft: 1,
        requiredCraftingLevel: 20,
        required: [
            {
                type: "item",
                itemId: "maple_log",
                icon: ITEMS["maple_log"].icon,
                name: ITEMS["maple_log"].name,
                amount: 100,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 20
            }
        ]
    },

    gold_pickaxe: {
        produces: "gold_pickaxe",
        recipeFor: "crafting",
        name: "gold pickaxe",
        id: "gold_pickaxe",
        category: "mining",
        timeToCraft: 5 * MINUTE, // 60
        xp: 500,
        maxToCraft: 1,
        requiredCraftingLevel: 25,
        required: [
            {
                type: "item",
                itemId: "silver_furnace",
                icon: ITEMS["silver_furnace"].icon,
                name: ITEMS["silver_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "gold_essence",
                icon: ITEMS["gold_essence"].icon,
                name: ITEMS["gold_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "walnut_log",
                icon: ITEMS["walnut_log"].icon,
                name: ITEMS["walnut_log"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "gold_bar",
                icon: ITEMS["gold_bar"].icon,
                name: ITEMS["gold_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 25
            }
        ]
    },

    carbon_pickaxe: {
        produces: "carbon_pickaxe",
        recipeFor: "crafting",
        name: "carbon pickaxe",
        id: "carbon_pickaxe",
        category: "mining",
        timeToCraft: 5 * MINUTE,
        xp: 1000,
        maxToCraft: 1,
        requiredCraftingLevel: 30,
        required: [
            {
                type: "item",
                itemId: "gold_furnace",
                icon: ITEMS["gold_furnace"].icon,
                name: ITEMS["gold_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "carbon_essence",
                icon: ITEMS["carbon_essence"].icon,
                name: ITEMS["carbon_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cherry_log",
                icon: ITEMS["cherry_log"].icon,
                name: ITEMS["cherry_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "carbon_bar",
                icon: ITEMS["carbon_bar"].icon,
                name: ITEMS["carbon_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 30
            }
        ]
    },

    cherry_idol: {
        produces: "cherry_idol",
        recipeFor: "crafting",
        name: "cherry idol",
        id: "cherry_idol",
        category: "mining",
        timeToCraft: 5 * MINUTE,
        xp: 1800,
        maxToCraft: 1,
        requiredCraftingLevel: 30,
        required: [
            {
                type: "item",
                itemId: "cherry_log",
                icon: ITEMS["cherry_log"].icon,
                name: ITEMS["cherry_log"].name,
                amount: 100,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 30
            }
        ]
    },

    steel_pickaxe: {
        produces: "steel_pickaxe",
        recipeFor: "crafting",
        name: "steel pickaxe",
        id: "steel_pickaxe",
        category: "mining",
        timeToCraft: 6 * MINUTE, // 60
        xp: 1500,
        maxToCraft: 1,
        requiredCraftingLevel: 35,
        required: [
            {
                type: "item",
                itemId: "carbon_furnace",
                icon: ITEMS["carbon_furnace"].icon,
                name: ITEMS["carbon_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "steel_essence",
                icon: ITEMS["steel_essence"].icon,
                name: ITEMS["steel_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "mahogany_log",
                icon: ITEMS["mahogany_log"].icon,
                name: ITEMS["mahogany_log"].name,
                amount: 15,
                consumes: true
            },
            {
                type: "item",
                itemId: "steel_bar",
                icon: ITEMS["steel_bar"].icon,
                name: ITEMS["steel_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 35
            }
        ]
    },

    platinum_pickaxe: {
        produces: "platinum_pickaxe",
        recipeFor: "crafting",
        name: "platinum pickaxe",
        id: "platinum_pickaxe",
        category: "mining",
        timeToCraft: 7 * MINUTE,
        xp: 2500,
        maxToCraft: 1,
        requiredCraftingLevel: 40,
        required: [
            {
                type: "item",
                itemId: "steel_furnace",
                icon: ITEMS["steel_furnace"].icon,
                name: ITEMS["steel_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "platinum_essence",
                icon: ITEMS["platinum_essence"].icon,
                name: ITEMS["platinum_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "elk_log",
                icon: ITEMS["elk_log"].icon,
                name: ITEMS["elk_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "platinum_bar",
                icon: ITEMS["platinum_bar"].icon,
                name: ITEMS["platinum_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 40
            }
        ]
    },

    elk_idol: {
        produces: "elk_idol",
        recipeFor: "crafting",
        name: "elm idol",
        id: "elk_idol",
        category: "mining",
        timeToCraft: 7 * MINUTE,
        xp: 3200,
        maxToCraft: 1,
        requiredCraftingLevel: 40,
        required: [
            {
                type: "item",
                itemId: "elk_log",
                icon: ITEMS["elk_log"].icon,
                name: ITEMS["elk_log"].name,
                amount: 100,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 40
            }
        ]
    },

    titanium_pickaxe: {
        produces: "titanium_pickaxe",
        recipeFor: "crafting",
        name: "titanium pickaxe",
        id: "titanium_pickaxe",
        category: "mining",
        timeToCraft: 8 * MINUTE,
        xp: 3700,
        maxToCraft: 1,
        requiredCraftingLevel: 45,
        required: [
            {
                type: "item",
                itemId: "platinum_furnace",
                icon: ITEMS["platinum_furnace"].icon,
                name: ITEMS["platinum_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "titanium_essence",
                icon: ITEMS["titanium_essence"].icon,
                name: ITEMS["titanium_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "black_log",
                icon: ITEMS["black_log"].icon,
                name: ITEMS["black_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanium_bar",
                icon: ITEMS["titanium_bar"].icon,
                name: ITEMS["titanium_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 45
            }
        ]
    },

    tungsten_pickaxe: {
        produces: "tungsten_pickaxe",
        recipeFor: "crafting",
        name: "tungsten pickaxe",
        id: "tungsten_pickaxe",
        category: "mining",
        timeToCraft: 9 * MINUTE,
        xp: 6250,
        maxToCraft: 1,
        requiredCraftingLevel: 50,
        required: [
            {
                type: "item",
                itemId: "titanium_furnace",
                icon: ITEMS["titanium_furnace"].icon,
                name: ITEMS["titanium_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "tungsten_essence",
                icon: ITEMS["tungsten_essence"].icon,
                name: ITEMS["tungsten_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "blue_gum_log",
                icon: ITEMS["blue_gum_log"].icon,
                name: ITEMS["blue_gum_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "tungsten_bar",
                icon: ITEMS["tungsten_bar"].icon,
                name: ITEMS["tungsten_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 50
            }
        ]
    },

    blue_gum_idol: {
        produces: "blue_gum_idol",
        recipeFor: "crafting",
        name: "blue gum idol",
        id: "blue_gum_idol",
        category: "mining",
        timeToCraft: 9 * MINUTE,
        xp: 4500,
        maxToCraft: 1,
        requiredCraftingLevel: 50,
        required: [
            {
                type: "item",
                itemId: "blue_gum_log",
                icon: ITEMS["blue_gum_log"].icon,
                name: ITEMS["blue_gum_log"].name,
                amount: 100,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 50
            }
        ]
    },

    obsidian_pickaxe: {
        produces: "obsidian_pickaxe",
        recipeFor: "crafting",
        name: "obsidian pickaxe",
        id: "obsidian_pickaxe",
        category: "mining",
        timeToCraft: 10 * MINUTE,
        xp: 10000,
        maxToCraft: 1,
        requiredCraftingLevel: 55,
        required: [
            {
                type: "item",
                itemId: "tungsten_furnace",
                icon: ITEMS["tungsten_furnace"].icon,
                name: ITEMS["tungsten_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "obsidian_essence",
                icon: ITEMS["obsidian_essence"].icon,
                name: ITEMS["obsidian_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cedar_log",
                icon: ITEMS["cedar_log"].icon,
                name: ITEMS["cedar_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "obsidian_bar",
                icon: ITEMS["obsidian_bar"].icon,
                name: ITEMS["obsidian_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 55
            }
        ]
    },

    cobalt_pickaxe: {
        produces: "cobalt_pickaxe",
        recipeFor: "crafting",
        name: "cobalt pickaxe",
        id: "cobalt_pickaxe",
        category: "mining",
        timeToCraft: 11 * MINUTE,
        xp: 15000,
        maxToCraft: 1,
        requiredCraftingLevel: 60,
        required: [
            {
                type: "item",
                itemId: "obsidian_furnace",
                icon: ITEMS["obsidian_furnace"].icon,
                name: ITEMS["obsidian_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "cobalt_essence",
                icon: ITEMS["cobalt_essence"].icon,
                name: ITEMS["cobalt_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "denya_log",
                icon: ITEMS["denya_log"].icon,
                name: ITEMS["denya_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "cobalt_bar",
                icon: ITEMS["cobalt_bar"].icon,
                name: ITEMS["cobalt_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 60
            }
        ]
    },

    denya_idol: {
        produces: "denya_idol",
        recipeFor: "crafting",
        name: "denya idol",
        id: "denya_idol",
        category: "mining",
        timeToCraft: 11 * MINUTE,
        xp: 6500,
        maxToCraft: 1,
        requiredCraftingLevel: 60,
        required: [
            {
                type: "item",
                itemId: "denya_log",
                icon: ITEMS["denya_log"].icon,
                name: ITEMS["denya_log"].name,
                amount: 100,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 60
            }
        ]
    },

    mithril_pickaxe: {
        produces: "mithril_pickaxe",
        recipeFor: "crafting",
        name: "mithril pickaxe",
        id: "mithril_pickaxe",
        category: "mining",
        timeToCraft: 12 * MINUTE,
        xp: 25000,
        maxToCraft: 1,
        requiredCraftingLevel: 65,
        required: [
            {
                type: "item",
                itemId: "cobalt_furnace",
                icon: ITEMS["cobalt_furnace"].icon,
                name: ITEMS["cobalt_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "mithril_essence",
                icon: ITEMS["mithril_essence"].icon,
                name: ITEMS["mithril_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "gombe_log",
                icon: ITEMS["gombe_log"].icon,
                name: ITEMS["gombe_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "mithril_bar",
                icon: ITEMS["mithril_bar"].icon,
                name: ITEMS["mithril_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 65
            }
        ]
    },

    adamantium_pickaxe: {
        produces: "adamantium_pickaxe",
        recipeFor: "crafting",
        name: "adamantium pickaxe",
        id: "adamantium_pickaxe",
        category: "mining",
        timeToCraft: 11 * MINUTE,
        xp: 43750,
        maxToCraft: 1,
        requiredCraftingLevel: 70,
        required: [
            {
                type: "item",
                itemId: "mithril_furnace",
                icon: ITEMS["mithril_furnace"].icon,
                name: ITEMS["mithril_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "adamantium_essence",
                icon: ITEMS["adamantium_essence"].icon,
                name: ITEMS["adamantium_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "hickory_log",
                icon: ITEMS["hickory_log"].icon,
                name: ITEMS["hickory_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "adamantium_bar",
                icon: ITEMS["adamantium_bar"].icon,
                name: ITEMS["adamantium_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 70
            }
        ]
    },

    hickory_idol: {
        produces: "hickory_idol",
        recipeFor: "crafting",
        name: "hickory idol",
        id: "hickory_idol",
        category: "mining",
        timeToCraft: 11 * MINUTE,
        xp: 9500,
        maxToCraft: 1,
        requiredCraftingLevel: 70,
        required: [
            {
                type: "item",
                itemId: "hickory_log",
                icon: ITEMS["hickory_log"].icon,
                name: ITEMS["hickory_log"].name,
                amount: 100,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 70
            }
        ]
    },

    orichalcum_pickaxe: {
        produces: "orichalcum_pickaxe",
        recipeFor: "crafting",
        name: "orichalcum pickaxe",
        id: "orichalcum_pickaxe",
        category: "mining",
        timeToCraft: 15 * MINUTE,
        xp: 62000,
        maxToCraft: 1,
        requiredCraftingLevel: 75,
        required: [
            {
                type: "item",
                itemId: "adamantium_furnace",
                icon: ITEMS["adamantium_furnace"].icon,
                name: ITEMS["adamantium_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "orichalcum_essence",
                icon: ITEMS["orichalcum_essence"].icon,
                name: ITEMS["orichalcum_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "larch_log",
                icon: ITEMS["larch_log"].icon,
                name: ITEMS["larch_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "orichalcum_bar",
                icon: ITEMS["orichalcum_bar"].icon,
                name: ITEMS["orichalcum_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 75
            }
        ]
    },

    meteorite_pickaxe: {
        produces: "meteorite_pickaxe",
        recipeFor: "crafting",
        name: "meteorite pickaxe",
        id: "meteorite_pickaxe",
        category: "mining",
        timeToCraft: 20 * MINUTE,
        xp: 125000,
        maxToCraft: 1,
        requiredCraftingLevel: 80,
        required: [
            {
                type: "item",
                itemId: "orichalcum_furnace",
                icon: ITEMS["orichalcum_furnace"].icon,
                name: ITEMS["orichalcum_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "meteorite_essence",
                icon: ITEMS["meteorite_essence"].icon,
                name: ITEMS["meteorite_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "meteorite_bar",
                icon: ITEMS["meteorite_bar"].icon,
                name: ITEMS["meteorite_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 80
            }
        ]
    },

    poplar_idol: {
        produces: "poplar_idol",
        recipeFor: "crafting",
        name: "poplar idol",
        id: "poplar_idol",
        category: "mining",
        timeToCraft: 20 * MINUTE,
        xp: 15000,
        maxToCraft: 1,
        requiredCraftingLevel: 80,
        required: [
            {
                type: "item",
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
                amount: 100,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 80
            }
        ]
    },

    fairy_steel_pickaxe: {
        produces: "fairy_steel_pickaxe",
        recipeFor: "crafting",
        name: "fairy steel pickaxe",
        id: "fairy_steel_pickaxe",
        category: "mining",
        timeToCraft: 30 * MINUTE,
        xp: 200000,
        maxToCraft: 1,
        requiredCraftingLevel: 85,
        required: [
            {
                type: "item",
                itemId: "meteorite_furnace",
                icon: ITEMS["meteorite_furnace"].icon,
                name: ITEMS["meteorite_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "fairy_steel_essence",
                icon: ITEMS["fairy_steel_essence"].icon,
                name: ITEMS["fairy_steel_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "fairy_steel_bar",
                icon: ITEMS["fairy_steel_bar"].icon,
                name: ITEMS["fairy_steel_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 85
            }
        ]
    },

    elven_steel_pickaxe: {
        produces: "elven_steel_pickaxe",
        recipeFor: "crafting",
        name: "elven steel pickaxe",
        id: "elven_steel_pickaxe",
        category: "mining",
        timeToCraft: 45 * MINUTE,
        xp: 300000,
        maxToCraft: 1,
        requiredCraftingLevel: 90,
        required: [
            {
                type: "item",
                itemId: "fairy_steel_furnace",
                icon: ITEMS["fairy_steel_furnace"].icon,
                name: ITEMS["fairy_steel_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "elven_steel_essence",
                icon: ITEMS["elven_steel_essence"].icon,
                name: ITEMS["elven_steel_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "elven_steel_bar",
                icon: ITEMS["elven_steel_bar"].icon,
                name: ITEMS["elven_steel_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 90
            }
        ]
    },

    willow_idol: {
        produces: "willow_idol",
        recipeFor: "crafting",
        name: "willow idol",
        id: "willow_idol",
        category: "mining",
        timeToCraft: 45 * MINUTE,
        xp: 22500,
        maxToCraft: 1,
        requiredCraftingLevel: 90,
        required: [
            {
                type: "item",
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 100,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 90
            }
        ]
    },

    cursed_pickaxe: {
        produces: "cursed_pickaxe",
        recipeFor: "crafting",
        name: "cursed pickaxe",
        id: "cursed_pickaxe",
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 500000,
        maxToCraft: 1,
        requiredCraftingLevel: 95,
        required: [
            {
                type: "item",
                itemId: "elven_steel_furnace",
                icon: ITEMS["elven_steel_furnace"].icon,
                name: ITEMS["elven_steel_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 95
            }
        ]
    },

    darksteel_pickaxe: {
        produces: "darksteel_pickaxe",
        recipeFor: "crafting",
        name: "darksteel pickaxe",
        id: "darksteel_pickaxe",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 543750,
        maxToCraft: 1,
        requiredCraftingLevel: 100,
        required: [
            {
                type: "item",
                itemId: "cursed_furnace",
                icon: ITEMS["cursed_furnace"].icon,
                name: ITEMS["cursed_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "adamantium_essence",
                icon: ITEMS["adamantium_essence"].icon,
                name: ITEMS["adamantium_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "hickory_log",
                icon: ITEMS["hickory_log"].icon,
                name: ITEMS["hickory_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "adamantium_bar",
                icon: ITEMS["adamantium_bar"].icon,
                name: ITEMS["adamantium_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 100
            }
        ]
    },

    radiant_pickaxe: {
        produces: "radiant_pickaxe",
        recipeFor: "crafting",
        name: "radiant pickaxe",
        id: "radiant_pickaxe",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 562500,
        maxToCraft: 1,
        requiredCraftingLevel: 105,
        required: [
            {
                type: "item",
                itemId: "darksteel_furnace",
                icon: ITEMS["darksteel_furnace"].icon,
                name: ITEMS["darksteel_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "orichalcum_essence",
                icon: ITEMS["orichalcum_essence"].icon,
                name: ITEMS["orichalcum_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "larch_log",
                icon: ITEMS["larch_log"].icon,
                name: ITEMS["larch_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "orichalcum_bar",
                icon: ITEMS["orichalcum_bar"].icon,
                name: ITEMS["orichalcum_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "darksteel_pickaxe",
                icon: ITEMS["darksteel_pickaxe"].icon,
                name: ITEMS["darksteel_pickaxe"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 105
            }
        ]
    },

    astral_pickaxe: {
        produces: "astral_pickaxe",
        recipeFor: "crafting",
        name: "astral pickaxe",
        id: "astral_pickaxe",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 625000,
        maxToCraft: 1,
        requiredCraftingLevel: 110,
        required: [
            {
                type: "item",
                itemId: "radiant_furnace",
                icon: ITEMS["radiant_furnace"].icon,
                name: ITEMS["radiant_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "meteorite_essence",
                icon: ITEMS["meteorite_essence"].icon,
                name: ITEMS["meteorite_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "meteorite_bar",
                icon: ITEMS["meteorite_bar"].icon,
                name: ITEMS["meteorite_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "radiant_pickaxe",
                icon: ITEMS["radiant_pickaxe"].icon,
                name: ITEMS["radiant_pickaxe"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 110
            }
        ]
    },

    titanfoil_pickaxe: {
        produces: "titanfoil_pickaxe",
        recipeFor: "crafting",
        name: "titanfoil pickaxe",
        id: "titanfoil_pickaxe",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 1000000,
        maxToCraft: 1,
        requiredCraftingLevel: 115,
        required: [
            {
                type: "item",
                itemId: "astral_furnace",
                icon: ITEMS["astral_furnace"].icon,
                name: ITEMS["astral_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "fairy_steel_essence",
                icon: ITEMS["fairy_steel_essence"].icon,
                name: ITEMS["fairy_steel_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "fairy_steel_bar",
                icon: ITEMS["fairy_steel_bar"].icon,
                name: ITEMS["fairy_steel_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "astral_pickaxe",
                icon: ITEMS["astral_pickaxe"].icon,
                name: ITEMS["astral_pickaxe"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 115
            }
        ]
    },

    relicrock_pickaxe: {
        produces: "relicrock_pickaxe",
        recipeFor: "crafting",
        name: "relicrock pickaxe",
        id: "relicrock_pickaxe",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 1500000,
        maxToCraft: 1,
        requiredCraftingLevel: 120,
        required: [
            {
                type: "item",
                itemId: "titanfoil_furnace",
                icon: ITEMS["titanfoil_furnace"].icon,
                name: ITEMS["titanfoil_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "elven_steel_essence",
                icon: ITEMS["elven_steel_essence"].icon,
                name: ITEMS["elven_steel_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "elven_steel_bar",
                icon: ITEMS["elven_steel_bar"].icon,
                name: ITEMS["elven_steel_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanfoil_pickaxe",
                icon: ITEMS["titanfoil_pickaxe"].icon,
                name: ITEMS["titanfoil_pickaxe"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 120
            }
        ]
    },

    eternium_pickaxe: {
        produces: "eternium_pickaxe",
        recipeFor: "crafting",
        name: "eternium pickaxe",
        id: "eternium_pickaxe",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 2500000 * 3,
        maxToCraft: 1,
        requiredCraftingLevel: 125,
        required: [
            {
                type: "item",
                itemId: "relicrock_furnace",
                icon: ITEMS["relicrock_furnace"].icon,
                name: ITEMS["relicrock_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "mithril_essence",
                icon: ITEMS["mithril_essence"].icon,
                name: ITEMS["mithril_essence"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "magic_log",
                icon: ITEMS["magic_log"].icon,
                name: ITEMS["magic_log"].name,
                amount: 50,
                consumes: true
            },
            {
                type: "item",
                itemId: "fiery_log",
                icon: ITEMS["fiery_log"].icon,
                name: ITEMS["fiery_log"].name,
                amount: 50,
                consumes: true
            },
            {
                type: "item",
                itemId: "mithril_bar",
                icon: ITEMS["mithril_bar"].icon,
                name: ITEMS["mithril_bar"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "relicrock_pickaxe",
                icon: ITEMS["relicrock_pickaxe"].icon,
                name: ITEMS["relicrock_pickaxe"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 125
            }
        ]
    },

    prismatic_pickaxe: {
        produces: "prismatic_pickaxe",
        recipeFor: "crafting",
        name: "prismatic pickaxe",
        id: "prismatic_pickaxe",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 10000000,
        maxToCraft: 1,
        requiredCraftingLevel: 130,
        required: [
            {
                type: "item",
                itemId: "eternium_furnace",
                icon: ITEMS["eternium_furnace"].icon,
                name: ITEMS["eternium_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "purestone_essence",
                icon: ITEMS["purestone_essence"].icon,
                name: ITEMS["purestone_essence"].name,
                amount: 3,
                consumes: true
            },
            {
                type: "item",
                itemId: "purestone_bar",
                icon: ITEMS["purestone_bar"].icon,
                name: ITEMS["purestone_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "spiritroot_log",
                icon: ITEMS["spiritroot_log"].icon,
                name: ITEMS["spiritroot_log"].name,
                amount: 12,
                consumes: true
            },
            {
                type: "item",
                itemId: "eternium_pickaxe",
                icon: ITEMS["eternium_pickaxe"].icon,
                name: ITEMS["eternium_pickaxe"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 130
            }
        ]
    },

    copper_mining_anvil: {
        produces: "copper_mining_anvil",
        recipeFor: "crafting",
        name: "copper mining anvil",
        id: "copper_mining_anvil",
        category: "mining",
        timeToCraft: 60, // 60
        xp: 20,
        maxToCraft: 1,
        requiredCraftingLevel: 3,
        required: [
            {
                type: "item",
                itemId: "stone_furnace",
                icon: ITEMS["stone_furnace"].icon,
                name: ITEMS["stone_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "pine_log",
                icon: ITEMS["pine_log"].icon,
                name: ITEMS["pine_log"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "copper_bar",
                icon: ITEMS["copper_bar"].icon,
                name: ITEMS["copper_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 3
            }
        ]
    },

    tin_mining_anvil: {
        produces: "tin_mining_anvil",
        recipeFor: "crafting",
        name: "tin mining anvil",
        id: "tin_mining_anvil",
        category: "mining",
        timeToCraft: 1.5 * MINUTE, // 60
        xp: 30,
        maxToCraft: 1,
        requiredCraftingLevel: 6,
        required: [
            {
                type: "item",
                itemId: "copper_furnace",
                icon: ITEMS["copper_furnace"].icon,
                name: ITEMS["copper_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "beech_log",
                icon: ITEMS["beech_log"].icon,
                name: ITEMS["beech_log"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "tin_bar",
                icon: ITEMS["tin_bar"].icon,
                name: ITEMS["tin_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 6
            }
        ]
    },

    bronze_mining_anvil: {
        produces: "bronze_mining_anvil",
        recipeFor: "crafting",
        name: "bronze mining anvil",
        id: "bronze_mining_anvil",
        category: "mining",
        timeToCraft: 2 * MINUTE, // 60
        xp: 50,
        maxToCraft: 1,
        requiredCraftingLevel: 10,
        required: [
            {
                type: "item",
                itemId: "tin_furnace",
                icon: ITEMS["tin_furnace"].icon,
                name: ITEMS["tin_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "ash_log",
                icon: ITEMS["ash_log"].icon,
                name: ITEMS["ash_log"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "bronze_bar",
                icon: ITEMS["bronze_bar"].icon,
                name: ITEMS["bronze_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 10
            }
        ]
    },

    iron_mining_anvil: {
        produces: "iron_mining_anvil",
        recipeFor: "crafting",
        name: "iron mining anvil",
        id: "iron_mining_anvil",
        category: "mining",
        timeToCraft: 3 * MINUTE, // 60
        xp: 100,
        maxToCraft: 1,
        requiredCraftingLevel: 15,
        required: [
            {
                type: "item",
                itemId: "bronze_furnace",
                icon: ITEMS["bronze_furnace"].icon,
                name: ITEMS["bronze_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "oak_log",
                icon: ITEMS["oak_log"].icon,
                name: ITEMS["oak_log"].name,
                amount: 15,
                consumes: true
            },
            {
                type: "item",
                itemId: "iron_bar",
                icon: ITEMS["iron_bar"].icon,
                name: ITEMS["iron_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 15
            }
        ]
    },

    silver_mining_anvil: {
        produces: "silver_mining_anvil",
        recipeFor: "crafting",
        name: "silver mining anvil",
        id: "silver_mining_anvil",
        category: "mining",
        timeToCraft: 4 * MINUTE, // 60
        xp: 300,
        maxToCraft: 1,
        requiredCraftingLevel: 20,
        required: [
            {
                type: "item",
                itemId: "iron_furnace",
                icon: ITEMS["iron_furnace"].icon,
                name: ITEMS["iron_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "silver_essence",
                icon: ITEMS["silver_essence"].icon,
                name: ITEMS["silver_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "maple_log",
                icon: ITEMS["maple_log"].icon,
                name: ITEMS["maple_log"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "silver_bar",
                icon: ITEMS["silver_bar"].icon,
                name: ITEMS["silver_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 20
            }
        ]
    },

    gold_mining_anvil: {
        produces: "gold_mining_anvil",
        recipeFor: "crafting",
        name: "gold mining anvil",
        id: "gold_mining_anvil",
        category: "mining",
        timeToCraft: 5 * MINUTE, // 60
        xp: 500,
        maxToCraft: 1,
        requiredCraftingLevel: 25,
        required: [
            {
                type: "item",
                itemId: "silver_furnace",
                icon: ITEMS["silver_furnace"].icon,
                name: ITEMS["silver_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "gold_essence",
                icon: ITEMS["gold_essence"].icon,
                name: ITEMS["gold_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "walnut_log",
                icon: ITEMS["walnut_log"].icon,
                name: ITEMS["walnut_log"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "gold_bar",
                icon: ITEMS["gold_bar"].icon,
                name: ITEMS["gold_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 25
            }
        ]
    },

    carbon_mining_anvil: {
        produces: "carbon_mining_anvil",
        recipeFor: "crafting",
        name: "carbon mining anvil",
        id: "carbon_mining_anvil",
        category: "mining",
        timeToCraft: 5 * MINUTE,
        xp: 1000,
        maxToCraft: 1,
        requiredCraftingLevel: 30,
        required: [
            {
                type: "item",
                itemId: "gold_furnace",
                icon: ITEMS["gold_furnace"].icon,
                name: ITEMS["gold_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "carbon_essence",
                icon: ITEMS["carbon_essence"].icon,
                name: ITEMS["carbon_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cherry_log",
                icon: ITEMS["cherry_log"].icon,
                name: ITEMS["cherry_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "carbon_bar",
                icon: ITEMS["carbon_bar"].icon,
                name: ITEMS["carbon_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 30
            }
        ]
    },

    steel_mining_anvil: {
        produces: "steel_mining_anvil",
        recipeFor: "crafting",
        name: "steel mining anvil",
        id: "steel_mining_anvil",
        category: "mining",
        timeToCraft: 6 * MINUTE, // 60
        xp: 1500,
        maxToCraft: 1,
        requiredCraftingLevel: 35,
        required: [
            {
                type: "item",
                itemId: "carbon_furnace",
                icon: ITEMS["carbon_furnace"].icon,
                name: ITEMS["carbon_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "steel_essence",
                icon: ITEMS["steel_essence"].icon,
                name: ITEMS["steel_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "mahogany_log",
                icon: ITEMS["mahogany_log"].icon,
                name: ITEMS["mahogany_log"].name,
                amount: 15,
                consumes: true
            },
            {
                type: "item",
                itemId: "steel_bar",
                icon: ITEMS["steel_bar"].icon,
                name: ITEMS["steel_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 35
            }
        ]
    },

    platinum_mining_anvil: {
        produces: "platinum_mining_anvil",
        recipeFor: "crafting",
        name: "platinum mining anvil",
        id: "platinum_mining_anvil",
        category: "mining",
        timeToCraft: 7 * MINUTE,
        xp: 2500,
        maxToCraft: 1,
        requiredCraftingLevel: 40,
        required: [
            {
                type: "item",
                itemId: "steel_furnace",
                icon: ITEMS["steel_furnace"].icon,
                name: ITEMS["steel_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "platinum_essence",
                icon: ITEMS["platinum_essence"].icon,
                name: ITEMS["platinum_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "elk_log",
                icon: ITEMS["elk_log"].icon,
                name: ITEMS["elk_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "platinum_bar",
                icon: ITEMS["platinum_bar"].icon,
                name: ITEMS["platinum_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 40
            }
        ]
    },

    titanium_mining_anvil: {
        produces: "titanium_mining_anvil",
        recipeFor: "crafting",
        name: "titanium mining anvil",
        id: "titanium_mining_anvil",
        category: "mining",
        timeToCraft: 8 * MINUTE,
        xp: 3700,
        maxToCraft: 1,
        requiredCraftingLevel: 45,
        required: [
            {
                type: "item",
                itemId: "platinum_furnace",
                icon: ITEMS["platinum_furnace"].icon,
                name: ITEMS["platinum_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "titanium_essence",
                icon: ITEMS["titanium_essence"].icon,
                name: ITEMS["titanium_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "black_log",
                icon: ITEMS["black_log"].icon,
                name: ITEMS["black_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanium_bar",
                icon: ITEMS["titanium_bar"].icon,
                name: ITEMS["titanium_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 45
            }
        ]
    },

    tungsten_mining_anvil: {
        produces: "tungsten_mining_anvil",
        recipeFor: "crafting",
        name: "tungsten mining anvil",
        id: "tungsten_mining_anvil",
        category: "mining",
        timeToCraft: 9 * MINUTE,
        xp: 6250,
        maxToCraft: 1,
        requiredCraftingLevel: 50,
        required: [
            {
                type: "item",
                itemId: "titanium_furnace",
                icon: ITEMS["titanium_furnace"].icon,
                name: ITEMS["titanium_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "tungsten_essence",
                icon: ITEMS["tungsten_essence"].icon,
                name: ITEMS["tungsten_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "blue_gum_log",
                icon: ITEMS["blue_gum_log"].icon,
                name: ITEMS["blue_gum_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "tungsten_bar",
                icon: ITEMS["tungsten_bar"].icon,
                name: ITEMS["tungsten_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 50
            }
        ]
    },

    obsidian_mining_anvil: {
        produces: "obsidian_mining_anvil",
        recipeFor: "crafting",
        name: "obsidian mining anvil",
        id: "obsidian_mining_anvil",
        category: "mining",
        timeToCraft: 10 * MINUTE,
        xp: 10000,
        maxToCraft: 1,
        requiredCraftingLevel: 55,
        required: [
            {
                type: "item",
                itemId: "tungsten_furnace",
                icon: ITEMS["tungsten_furnace"].icon,
                name: ITEMS["tungsten_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "obsidian_essence",
                icon: ITEMS["obsidian_essence"].icon,
                name: ITEMS["obsidian_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cedar_log",
                icon: ITEMS["cedar_log"].icon,
                name: ITEMS["cedar_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "obsidian_bar",
                icon: ITEMS["obsidian_bar"].icon,
                name: ITEMS["obsidian_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 55
            }
        ]
    },

    cobalt_mining_anvil: {
        produces: "cobalt_mining_anvil",
        recipeFor: "crafting",
        name: "cobalt mining anvil",
        id: "cobalt_mining_anvil",
        category: "mining",
        timeToCraft: 11 * MINUTE,
        xp: 15000,
        maxToCraft: 1,
        requiredCraftingLevel: 60,
        required: [
            {
                type: "item",
                itemId: "obsidian_furnace",
                icon: ITEMS["obsidian_furnace"].icon,
                name: ITEMS["obsidian_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "cobalt_essence",
                icon: ITEMS["cobalt_essence"].icon,
                name: ITEMS["cobalt_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "denya_log",
                icon: ITEMS["denya_log"].icon,
                name: ITEMS["denya_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "cobalt_bar",
                icon: ITEMS["cobalt_bar"].icon,
                name: ITEMS["cobalt_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 60
            }
        ]
    },

    mithril_mining_anvil: {
        produces: "mithril_mining_anvil",
        recipeFor: "crafting",
        name: "mithril mining anvil",
        id: "mithril_mining_anvil",
        category: "mining",
        timeToCraft: 12 * MINUTE,
        xp: 25000,
        maxToCraft: 1,
        requiredCraftingLevel: 65,
        required: [
            {
                type: "item",
                itemId: "cobalt_furnace",
                icon: ITEMS["cobalt_furnace"].icon,
                name: ITEMS["cobalt_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "mithril_essence",
                icon: ITEMS["mithril_essence"].icon,
                name: ITEMS["mithril_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "gombe_log",
                icon: ITEMS["gombe_log"].icon,
                name: ITEMS["gombe_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "mithril_bar",
                icon: ITEMS["mithril_bar"].icon,
                name: ITEMS["mithril_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 65
            }
        ]
    },

    adamantium_mining_anvil: {
        produces: "adamantium_mining_anvil",
        recipeFor: "crafting",
        name: "adamantium mining anvil",
        id: "adamantium_mining_anvil",
        category: "mining",
        timeToCraft: 11 * MINUTE,
        xp: 43500,
        maxToCraft: 1,
        requiredCraftingLevel: 70,
        required: [
            {
                type: "item",
                itemId: "mithril_furnace",
                icon: ITEMS["mithril_furnace"].icon,
                name: ITEMS["mithril_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "adamantium_essence",
                icon: ITEMS["adamantium_essence"].icon,
                name: ITEMS["adamantium_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "hickory_log",
                icon: ITEMS["hickory_log"].icon,
                name: ITEMS["hickory_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "adamantium_bar",
                icon: ITEMS["adamantium_bar"].icon,
                name: ITEMS["adamantium_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 70
            }
        ]
    },

    orichalcum_mining_anvil: {
        produces: "orichalcum_mining_anvil",
        recipeFor: "crafting",
        name: "orichalcum mining anvil",
        id: "orichalcum_mining_anvil",
        category: "mining",
        timeToCraft: 15 * MINUTE,
        xp: 62000,
        maxToCraft: 1,
        requiredCraftingLevel: 75,
        required: [
            {
                type: "item",
                itemId: "adamantium_furnace",
                icon: ITEMS["adamantium_furnace"].icon,
                name: ITEMS["adamantium_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "orichalcum_essence",
                icon: ITEMS["orichalcum_essence"].icon,
                name: ITEMS["orichalcum_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "larch_log",
                icon: ITEMS["larch_log"].icon,
                name: ITEMS["larch_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "orichalcum_bar",
                icon: ITEMS["orichalcum_bar"].icon,
                name: ITEMS["orichalcum_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 75
            }
        ]
    },

    meteorite_mining_anvil: {
        produces: "meteorite_mining_anvil",
        recipeFor: "crafting",
        name: "meteorite mining anvil",
        id: "meteorite_mining_anvil",
        category: "mining",
        timeToCraft: 20 * MINUTE,
        xp: 125000,
        maxToCraft: 1,
        requiredCraftingLevel: 80,
        required: [
            {
                type: "item",
                itemId: "orichalcum_furnace",
                icon: ITEMS["orichalcum_furnace"].icon,
                name: ITEMS["orichalcum_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "meteorite_essence",
                icon: ITEMS["meteorite_essence"].icon,
                name: ITEMS["meteorite_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "meteorite_bar",
                icon: ITEMS["meteorite_bar"].icon,
                name: ITEMS["meteorite_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 80
            }
        ]
    },

    fairy_steel_mining_anvil: {
        produces: "fairy_steel_mining_anvil",
        recipeFor: "crafting",
        name: "fairy steel mining anvil",
        id: "fairy_steel_mining_anvil",
        category: "mining",
        timeToCraft: 30 * MINUTE,
        xp: 200000,
        maxToCraft: 1,
        requiredCraftingLevel: 85,
        required: [
            {
                type: "item",
                itemId: "meteorite_furnace",
                icon: ITEMS["meteorite_furnace"].icon,
                name: ITEMS["meteorite_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "fairy_steel_essence",
                icon: ITEMS["fairy_steel_essence"].icon,
                name: ITEMS["fairy_steel_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "fairy_steel_bar",
                icon: ITEMS["fairy_steel_bar"].icon,
                name: ITEMS["fairy_steel_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 85
            }
        ]
    },

    elven_steel_mining_anvil: {
        produces: "elven_steel_mining_anvil",
        recipeFor: "crafting",
        name: "elven steel mining anvil",
        id: "elven_steel_mining_anvil",
        category: "mining",
        timeToCraft: 45 * MINUTE,
        xp: 300000,
        maxToCraft: 1,
        requiredCraftingLevel: 90,
        required: [
            {
                type: "item",
                itemId: "fairy_steel_furnace",
                icon: ITEMS["fairy_steel_furnace"].icon,
                name: ITEMS["fairy_steel_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "elven_steel_essence",
                icon: ITEMS["elven_steel_essence"].icon,
                name: ITEMS["elven_steel_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "elven_steel_bar",
                icon: ITEMS["elven_steel_bar"].icon,
                name: ITEMS["elven_steel_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 90
            }
        ]
    },

    cursed_mining_anvil: {
        produces: "cursed_mining_anvil",
        recipeFor: "crafting",
        name: "cursed mining anvil",
        id: "cursed_mining_anvil",
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 500000,
        maxToCraft: 1,
        requiredCraftingLevel: 95,
        required: [
            {
                type: "item",
                itemId: "elven_steel_furnace",
                icon: ITEMS["elven_steel_furnace"].icon,
                name: ITEMS["elven_steel_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 95
            }
        ]
    },

    darksteel_mining_anvil: {
        produces: "darksteel_mining_anvil",
        recipeFor: "crafting",
        name: "darksteel mining anvil",
        id: "darksteel_mining_anvil",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 543750,
        maxToCraft: 1,
        requiredCraftingLevel: 100,
        required: [
            {
                type: "item",
                itemId: "cursed_furnace",
                icon: ITEMS["cursed_furnace"].icon,
                name: ITEMS["cursed_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "adamantium_essence",
                icon: ITEMS["adamantium_essence"].icon,
                name: ITEMS["adamantium_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "hickory_log",
                icon: ITEMS["hickory_log"].icon,
                name: ITEMS["hickory_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "adamantium_bar",
                icon: ITEMS["adamantium_bar"].icon,
                name: ITEMS["adamantium_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 100
            }
        ]
    },

    radiant_mining_anvil: {
        produces: "radiant_mining_anvil",
        recipeFor: "crafting",
        name: "radiant mining anvil",
        id: "radiant_mining_anvil",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 562500,
        maxToCraft: 1,
        requiredCraftingLevel: 105,
        required: [
            {
                type: "item",
                itemId: "darksteel_furnace",
                icon: ITEMS["darksteel_furnace"].icon,
                name: ITEMS["darksteel_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "orichalcum_essence",
                icon: ITEMS["orichalcum_essence"].icon,
                name: ITEMS["orichalcum_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "larch_log",
                icon: ITEMS["larch_log"].icon,
                name: ITEMS["larch_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "orichalcum_bar",
                icon: ITEMS["orichalcum_bar"].icon,
                name: ITEMS["orichalcum_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "darksteel_mining_anvil",
                icon: ITEMS["darksteel_mining_anvil"].icon,
                name: ITEMS["darksteel_mining_anvil"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 105
            }
        ]
    },

    astral_mining_anvil: {
        produces: "astral_mining_anvil",
        recipeFor: "crafting",
        name: "astral mining anvil",
        id: "astral_mining_anvil",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 625000,
        maxToCraft: 1,
        requiredCraftingLevel: 110,
        required: [
            {
                type: "item",
                itemId: "radiant_furnace",
                icon: ITEMS["radiant_furnace"].icon,
                name: ITEMS["radiant_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "meteorite_essence",
                icon: ITEMS["meteorite_essence"].icon,
                name: ITEMS["meteorite_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "meteorite_bar",
                icon: ITEMS["meteorite_bar"].icon,
                name: ITEMS["meteorite_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "radiant_mining_anvil",
                icon: ITEMS["radiant_mining_anvil"].icon,
                name: ITEMS["radiant_mining_anvil"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 110
            }
        ]
    },

    titanfoil_mining_anvil: {
        produces: "titanfoil_mining_anvil",
        recipeFor: "crafting",
        name: "titanfoil mining anvil",
        id: "titanfoil_mining_anvil",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 1000000,
        maxToCraft: 1,
        requiredCraftingLevel: 115,
        required: [
            {
                type: "item",
                itemId: "astral_furnace",
                icon: ITEMS["astral_furnace"].icon,
                name: ITEMS["astral_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "fairy_steel_essence",
                icon: ITEMS["fairy_steel_essence"].icon,
                name: ITEMS["fairy_steel_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "fairy_steel_bar",
                icon: ITEMS["fairy_steel_bar"].icon,
                name: ITEMS["fairy_steel_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "astral_mining_anvil",
                icon: ITEMS["astral_mining_anvil"].icon,
                name: ITEMS["astral_mining_anvil"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 115
            }
        ]
    },

    relicrock_mining_anvil: {
        produces: "relicrock_mining_anvil",
        recipeFor: "crafting",
        name: "relicrock mining anvil",
        id: "relicrock_mining_anvil",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 1500000,
        maxToCraft: 1,
        requiredCraftingLevel: 120,
        required: [
            {
                type: "item",
                itemId: "titanfoil_furnace",
                icon: ITEMS["titanfoil_furnace"].icon,
                name: ITEMS["titanfoil_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "elven_steel_essence",
                icon: ITEMS["elven_steel_essence"].icon,
                name: ITEMS["elven_steel_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "elven_steel_bar",
                icon: ITEMS["elven_steel_bar"].icon,
                name: ITEMS["elven_steel_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanfoil_mining_anvil",
                icon: ITEMS["titanfoil_mining_anvil"].icon,
                name: ITEMS["titanfoil_mining_anvil"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 120
            }
        ]
    },

    eternium_mining_anvil: {
        produces: "eternium_mining_anvil",
        recipeFor: "crafting",
        name: "eternium mining anvil",
        id: "eternium_mining_anvil",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 2500000 * 3,
        maxToCraft: 1,
        requiredCraftingLevel: 125,
        required: [
            {
                type: "item",
                itemId: "relicrock_furnace",
                icon: ITEMS["relicrock_furnace"].icon,
                name: ITEMS["relicrock_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "mithril_essence",
                icon: ITEMS["mithril_essence"].icon,
                name: ITEMS["mithril_essence"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "magic_log",
                icon: ITEMS["magic_log"].icon,
                name: ITEMS["magic_log"].name,
                amount: 50,
                consumes: true
            },
            {
                type: "item",
                itemId: "fiery_log",
                icon: ITEMS["fiery_log"].icon,
                name: ITEMS["fiery_log"].name,
                amount: 50,
                consumes: true
            },
            {
                type: "item",
                itemId: "mithril_bar",
                icon: ITEMS["mithril_bar"].icon,
                name: ITEMS["mithril_bar"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "relicrock_mining_anvil",
                icon: ITEMS["relicrock_mining_anvil"].icon,
                name: ITEMS["relicrock_mining_anvil"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 125
            }
        ]
    },

    prismatic_mining_anvil: {
        produces: "prismatic_mining_anvil",
        recipeFor: "crafting",
        name: "prismatic mining anvil",
        id: "prismatic_mining_anvil",
        isHidden: true,
        category: "mining",
        timeToCraft: 60 * MINUTE,
        xp: 10000000,
        maxToCraft: 1,
        requiredCraftingLevel: 130,
        required: [
            {
                type: "item",
                itemId: "eternium_furnace",
                icon: ITEMS["eternium_furnace"].icon,
                name: ITEMS["eternium_furnace"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "item",
                itemId: "purestone_essence",
                icon: ITEMS["purestone_essence"].icon,
                name: ITEMS["purestone_essence"].name,
                amount: 3,
                consumes: true
            },
            {
                type: "item",
                itemId: "purestone_bar",
                icon: ITEMS["purestone_bar"].icon,
                name: ITEMS["purestone_bar"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "item",
                itemId: "spiritroot_log",
                icon: ITEMS["spiritroot_log"].icon,
                name: ITEMS["spiritroot_log"].name,
                amount: 12,
                consumes: true
            },
            {
                type: "item",
                itemId: "eternium_mining_anvil",
                icon: ITEMS["eternium_mining_anvil"].icon,
                name: ITEMS["eternium_mining_anvil"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 130
            }
        ]
    }
})
