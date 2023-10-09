import { ITEMS } from "/imports/constants/items/index.js"

const CURSED_ESS_XP = 500000
const ADA_ESS_XP = 43750
const ORI_ESS_XP = 62500
const MET_ESS_XP = 125000
const FS_ESS_XP = 187500
const ES_ESS_XP = 250000
const BONUS_XP = 357000

const ETERNIUM_RESOURCE_HOG = 5
const ETERNIUM_BONUS_XP = 5

export const ARCHER_CRAFTS = {
    pine_bow: {
        produces: "pine_bow",
        name: "pine bow",
        recipeFor: "crafting",
        category: "combat",
        id: "pine_bow",
        timeToCraft: 120,
        xp: 60,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 10,
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

    beech_bow: {
        produces: "beech_bow",
        name: "beech bow",
        recipeFor: "crafting",
        category: "combat",
        id: "beech_bow",
        timeToCraft: 120,
        xp: 60,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 10,
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

    ash_bow: {
        produces: "ash_bow",
        name: "ash bow",
        recipeFor: "crafting",
        category: "combat",
        id: "ash_bow",
        timeToCraft: 120,
        xp: 60,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 10,
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

    oak_bow: {
        produces: "oak_bow",
        name: "oak bow",
        recipeFor: "crafting",
        category: "combat",
        id: "oak_bow",
        timeToCraft: 120,
        xp: 100,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 50,
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

    maple_bow: {
        produces: "maple_bow",
        name: "maple bow",
        recipeFor: "crafting",
        category: "combat",
        id: "maple_bow",
        timeToCraft: 120,
        xp: 1000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "maple_log",
                icon: ITEMS["maple_log"].icon,
                name: ITEMS["maple_log"].name,
                amount: 50,
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

    walnut_bow: {
        produces: "walnut_bow",
        name: "walnut bow",
        recipeFor: "crafting",
        category: "combat",
        id: "walnut_bow",
        timeToCraft: 120,
        xp: 2000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "walnut_log",
                icon: ITEMS["walnut_log"].icon,
                name: ITEMS["walnut_log"].name,
                amount: 50,
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

    cherry_bow: {
        produces: "cherry_bow",
        name: "cherry bow",
        recipeFor: "crafting",
        category: "combat",
        id: "cherry_bow",
        timeToCraft: 240,
        xp: 4000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cherry_log",
                icon: ITEMS["cherry_log"].icon,
                name: ITEMS["cherry_log"].name,
                amount: 50,
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

    mahogany_bow: {
        produces: "mahogany_bow",
        name: "mahogany bow",
        recipeFor: "crafting",
        category: "combat",
        id: "mahogany_bow",
        timeToCraft: 240,
        xp: 6000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "mahogany_log",
                icon: ITEMS["mahogany_log"].icon,
                name: ITEMS["mahogany_log"].name,
                amount: 50,
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

    elm_bow: {
        produces: "elm_bow",
        name: "elm bow",
        recipeFor: "crafting",
        category: "combat",
        id: "elm_bow",
        timeToCraft: 240,
        xp: 10000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "elk_log",
                icon: ITEMS["elk_log"].icon,
                name: ITEMS["elk_log"].name,
                amount: 50,
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

    black_bow: {
        produces: "black_bow",
        name: "black bow",
        recipeFor: "crafting",
        category: "combat",
        id: "black_bow",
        timeToCraft: 240,
        xp: 15000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "black_log",
                icon: ITEMS["black_log"].icon,
                name: ITEMS["black_log"].name,
                amount: 50,
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

    blue_gum_bow: {
        produces: "blue_gum_bow",
        name: "blue gum bow",
        recipeFor: "crafting",
        category: "combat",
        id: "blue_gum_bow",
        timeToCraft: 240,
        xp: 25000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "blue_gum_log",
                icon: ITEMS["blue_gum_log"].icon,
                name: ITEMS["blue_gum_log"].name,
                amount: 50,
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

    cedar_bow: {
        produces: "cedar_bow",
        name: "cedar bow",
        recipeFor: "crafting",
        category: "combat",
        id: "cedar_bow",
        timeToCraft: 240,
        xp: 40000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cedar_log",
                icon: ITEMS["cedar_log"].icon,
                name: ITEMS["cedar_log"].name,
                amount: 50,
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

    denya_bow: {
        produces: "denya_bow",
        name: "denya bow",
        recipeFor: "crafting",
        category: "combat",
        id: "denya_bow",
        timeToCraft: 7200,
        xp: 60000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "denya_log",
                icon: ITEMS["denya_log"].icon,
                name: ITEMS["denya_log"].name,
                amount: 50,
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

    gombe_bow: {
        produces: "gombe_bow",
        name: "gombe bow",
        recipeFor: "crafting",
        category: "combat",
        id: "gombe_bow",
        timeToCraft: 7200,
        xp: 100000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "gombe_log",
                icon: ITEMS["gombe_log"].icon,
                name: ITEMS["gombe_log"].name,
                amount: 50,
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

    hickory_bow: {
        produces: "hickory_bow",
        name: "hickory bow",
        recipeFor: "crafting",
        category: "combat",
        id: "hickory_bow",
        timeToCraft: 7200,
        xp: 175000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "hickory_log",
                icon: ITEMS["hickory_log"].icon,
                name: ITEMS["hickory_log"].name,
                amount: 50,
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

    larch_bow: {
        produces: "larch_bow",
        name: "larch bow",
        recipeFor: "crafting",
        category: "combat",
        id: "larch_bow",
        timeToCraft: 7200,
        xp: 250000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "larch_log",
                icon: ITEMS["larch_log"].icon,
                name: ITEMS["larch_log"].name,
                amount: 50,
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

    poplar_bow: {
        produces: "poplar_bow",
        name: "poplar bow",
        recipeFor: "crafting",
        category: "combat",
        id: "poplar_bow",
        timeToCraft: 7200,
        xp: 500000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
                amount: 50,
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
    
    tali_bow: {
        produces: "tali_bow",
        name: "tali bow",
        recipeFor: "crafting",
        category: "combat",
        id: "tali_bow",
        timeToCraft: 7200,
        xp: 750000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
                amount: 50,
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

    willow_bow: {
        produces: "willow_bow",
        name: "willow bow",
        recipeFor: "crafting",
        category: "combat",
        id: "willow_bow",
        timeToCraft: 7200,
        xp: 1250000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 50,
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

    teak_bow: {
        produces: "teak_bow",
        name: "teak bow",
        recipeFor: "crafting",
        category: "combat",
        id: "teak_bow",
        timeToCraft: 7200,
        xp: 2000000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 50,
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

    ebony_bow: {
        produces: "ebony_bow",
        name: "ebony bow",
        recipeFor: "crafting",
        category: "combat",
        id: "ebony_bow",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: CURSED_ESS_XP * 4 + ADA_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "ebony_log",
                icon: ITEMS["ebony_log"].icon,
                name: ITEMS["ebony_log"].name,
                amount: 100,
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

    fiery_bow: {
        produces: "fiery_bow",
        name: "charred bow",
        recipeFor: "crafting",
        category: "combat",
        id: "fiery_bow",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: CURSED_ESS_XP * 4 + ORI_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "fiery_log",
                icon: ITEMS["fiery_log"].icon,
                name: ITEMS["fiery_log"].name,
                amount: 100,
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
                itemId: "ebony_bow",
                icon: ITEMS["ebony_bow"].icon,
                name: ITEMS["ebony_bow"].name,
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

    tamarind_bow: {
        produces: "tamarind_bow",
        name: "tamarind bow",
        recipeFor: "crafting",
        category: "combat",
        id: "tamarind_bow",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: CURSED_ESS_XP * 4 + MET_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "tamarind_log",
                icon: ITEMS["tamarind_log"].icon,
                name: ITEMS["tamarind_log"].name,
                amount: 100,
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
                itemId: "fiery_bow",
                icon: ITEMS["fiery_bow"].icon,
                name: ITEMS["fiery_bow"].name,
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

    magic_bow: {
        produces: "magic_bow",
        name: "sagewood bow",
        recipeFor: "crafting",
        category: "combat",
        id: "magic_bow",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: CURSED_ESS_XP * 4 + FS_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "magic_log",
                icon: ITEMS["magic_log"].icon,
                name: ITEMS["magic_log"].name,
                amount: 100,
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
                itemId: "tamarind_bow",
                icon: ITEMS["tamarind_bow"].icon,
                name: ITEMS["tamarind_bow"].name,
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

    petrified_bow: {
        produces: "petrified_bow",
        name: "petrified bow",
        recipeFor: "crafting",
        category: "combat",
        id: "petrified_bow",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: CURSED_ESS_XP * 4 + ES_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "petrified_log",
                icon: ITEMS["petrified_log"].icon,
                name: ITEMS["petrified_log"].name,
                amount: 100,
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
                itemId: "magic_bow",
                icon: ITEMS["magic_bow"].icon,
                name: ITEMS["magic_bow"].name,
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

    ancient_bow: {
        produces: "ancient_bow",
        name: "ancient bow",
        recipeFor: "crafting",
        category: "combat",
        id: "ancient_bow",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: (CURSED_ESS_XP * 4 + BONUS_XP * 4) * ETERNIUM_BONUS_XP,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4 * ETERNIUM_RESOURCE_HOG,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4 * ETERNIUM_RESOURCE_HOG,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_log",
                icon: ITEMS["ancient_log"].icon,
                name: ITEMS["ancient_log"].name,
                amount: 100 * ETERNIUM_RESOURCE_HOG,
                consumes: true
            },
            {
                type: "item",
                itemId: "mithril_bar",
                icon: ITEMS["mithril_bar"].icon,
                name: ITEMS["mithril_bar"].name,
                amount: 5 * ETERNIUM_RESOURCE_HOG,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5 * ETERNIUM_RESOURCE_HOG,
                consumes: true
            },
            {
                type: "item",
                itemId: "petrified_bow",
                icon: ITEMS["petrified_bow"].icon,
                name: ITEMS["petrified_bow"].name,
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

    spiritroot_bow: {
        produces: "spiritroot_bow",
        name: "spiritroot bow",
        recipeFor: "crafting",
        category: "combat",
        id: "spiritroot_bow",
        isHidden: true,
        timeToCraft: 3 * 60 * 60, // 180 minutes (3 hours)
        xp: 15000000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 12,
                consumes: true
            },
            {
                type: "item",
                itemId: "purestone_bar",
                icon: ITEMS["purestone_bar"].icon,
                name: ITEMS["purestone_bar"].name,
                amount: 20,
                consumes: true
            },
            {
                type: "item",
                itemId: "spiritroot_log",
                icon: ITEMS["spiritroot_log"].icon,
                name: ITEMS["spiritroot_log"].name,
                amount: 50,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_bow",
                icon: ITEMS["ancient_bow"].icon,
                name: ITEMS["ancient_bow"].name,
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

    copper_quiver: {
        produces: "copper_quiver",
        name: "pine quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "copper_quiver",
        timeToCraft: 120,
        xp: 60,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 10,
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

    tin_quiver: {
        produces: "tin_quiver",
        name: "beech quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "tin_quiver",
        timeToCraft: 120,
        xp: 60,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 10,
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

    bronze_quiver: {
        produces: "bronze_quiver",
        name: "ash quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "bronze_quiver",
        timeToCraft: 120,
        xp: 60,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 10,
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

    iron_quiver: {
        produces: "iron_quiver",
        name: "oak quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "iron_quiver",
        timeToCraft: 120,
        xp: 100,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 50,
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

    silver_quiver: {
        produces: "silver_quiver",
        name: "maple quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "silver_quiver",
        timeToCraft: 120,
        xp: 1000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "maple_log",
                icon: ITEMS["maple_log"].icon,
                name: ITEMS["maple_log"].name,
                amount: 50,
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

    gold_quiver: {
        produces: "gold_quiver",
        name: "walnut quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "gold_quiver",
        timeToCraft: 120,
        xp: 2000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "walnut_log",
                icon: ITEMS["walnut_log"].icon,
                name: ITEMS["walnut_log"].name,
                amount: 50,
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

    carbon_quiver: {
        produces: "carbon_quiver",
        name: "cherry quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "carbon_quiver",
        timeToCraft: 240,
        xp: 4000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cherry_log",
                icon: ITEMS["cherry_log"].icon,
                name: ITEMS["cherry_log"].name,
                amount: 50,
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

    steel_quiver: {
        produces: "steel_quiver",
        name: "mahogany quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "steel_quiver",
        timeToCraft: 240,
        xp: 6000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "mahogany_log",
                icon: ITEMS["mahogany_log"].icon,
                name: ITEMS["mahogany_log"].name,
                amount: 50,
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

    platinum_quiver: {
        produces: "platinum_quiver",
        name: "elm quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "platinum_quiver",
        timeToCraft: 240,
        xp: 10000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "elk_log",
                icon: ITEMS["elk_log"].icon,
                name: ITEMS["elk_log"].name,
                amount: 50,
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

    titanium_quiver: {
        produces: "titanium_quiver",
        name: "black quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "titanium_quiver",
        timeToCraft: 240,
        xp: 15000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "black_log",
                icon: ITEMS["black_log"].icon,
                name: ITEMS["black_log"].name,
                amount: 50,
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

    tungsten_quiver: {
        produces: "tungsten_quiver",
        name: "blue gum quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "tungsten_quiver",
        timeToCraft: 240,
        xp: 25000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "blue_gum_log",
                icon: ITEMS["blue_gum_log"].icon,
                name: ITEMS["blue_gum_log"].name,
                amount: 50,
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

    obsidian_quiver: {
        produces: "obsidian_quiver",
        name: "cedar quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "obsidian_quiver",
        timeToCraft: 240,
        xp: 40000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cedar_log",
                icon: ITEMS["cedar_log"].icon,
                name: ITEMS["cedar_log"].name,
                amount: 50,
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

    cobalt_quiver: {
        produces: "cobalt_quiver",
        name: "denya quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "cobalt_quiver",
        timeToCraft: 7200,
        xp: 60000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "denya_log",
                icon: ITEMS["denya_log"].icon,
                name: ITEMS["denya_log"].name,
                amount: 50,
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

    mithril_quiver: {
        produces: "mithril_quiver",
        name: "gombe quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "mithril_quiver",
        timeToCraft: 7200,
        xp: 100000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "gombe_log",
                icon: ITEMS["gombe_log"].icon,
                name: ITEMS["gombe_log"].name,
                amount: 50,
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

    adamantium_quiver: {
        produces: "adamantium_quiver",
        name: "hickory quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "adamantium_quiver",
        timeToCraft: 7200,
        xp: 175000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "hickory_log",
                icon: ITEMS["hickory_log"].icon,
                name: ITEMS["hickory_log"].name,
                amount: 50,
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

    orichalcum_quiver: {
        produces: "orichalcum_quiver",
        name: "larch quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "orichalcum_quiver",
        timeToCraft: 7200,
        xp: 250000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "larch_log",
                icon: ITEMS["larch_log"].icon,
                name: ITEMS["larch_log"].name,
                amount: 50,
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

    meteorite_quiver: {
        produces: "meteorite_quiver",
        name: "poplar quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "meteorite_quiver",
        timeToCraft: 7200,
        xp: 500000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
                amount: 50,
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

    cursed_quiver: {
        produces: "cursed_quiver",
        name: "teak quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "cursed_quiver",
        timeToCraft: 7200,
        xp: 2000000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 50,
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

    darksteel_quiver: {
        produces: "darksteel_quiver",
        name: "ebony quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "darksteel_quiver",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: CURSED_ESS_XP * 4 + ADA_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "ebony_log",
                icon: ITEMS["ebony_log"].icon,
                name: ITEMS["ebony_log"].name,
                amount: 100,
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

    radiant_quiver: {
        produces: "radiant_quiver",
        name: "fiery quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "radiant_quiver",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: CURSED_ESS_XP * 4 + ORI_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "fiery_log",
                icon: ITEMS["fiery_log"].icon,
                name: ITEMS["fiery_log"].name,
                amount: 100,
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
                itemId: "darksteel_quiver",
                icon: ITEMS["darksteel_quiver"].icon,
                name: ITEMS["darksteel_quiver"].name,
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

    astral_quiver: {
        produces: "astral_quiver",
        name: "tamarind quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "astral_quiver",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: CURSED_ESS_XP * 4 + MET_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "tamarind_log",
                icon: ITEMS["tamarind_log"].icon,
                name: ITEMS["tamarind_log"].name,
                amount: 100,
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
                itemId: "radiant_quiver",
                icon: ITEMS["radiant_quiver"].icon,
                name: ITEMS["radiant_quiver"].name,
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

    titanfoil_quiver: {
        produces: "titanfoil_quiver",
        name: "sagewood quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "titanfoil_quiver",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: CURSED_ESS_XP * 4 + FS_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "magic_log",
                icon: ITEMS["magic_log"].icon,
                name: ITEMS["magic_log"].name,
                amount: 100,
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
                itemId: "astral_quiver",
                icon: ITEMS["astral_quiver"].icon,
                name: ITEMS["astral_quiver"].name,
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

    relicrock_quiver: {
        produces: "relicrock_quiver",
        name: "petrified quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "relicrock_quiver",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: CURSED_ESS_XP * 4 + ES_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4,
                consumes: true
            },
            {
                type: "item",
                itemId: "petrified_log",
                icon: ITEMS["petrified_log"].icon,
                name: ITEMS["petrified_log"].name,
                amount: 100,
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
                itemId: "titanfoil_quiver",
                icon: ITEMS["titanfoil_quiver"].icon,
                name: ITEMS["titanfoil_quiver"].name,
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

    eternium_quiver: {
        produces: "eternium_quiver",
        name: "ancient quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "eternium_quiver",
        isHidden: true,
        timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
        xp: (CURSED_ESS_XP * 4 + BONUS_XP * 4) * ETERNIUM_BONUS_XP,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 4 * ETERNIUM_RESOURCE_HOG,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 4 * ETERNIUM_RESOURCE_HOG,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_log",
                icon: ITEMS["ancient_log"].icon,
                name: ITEMS["ancient_log"].name,
                amount: 100 * ETERNIUM_RESOURCE_HOG,
                consumes: true
            },
            {
                type: "item",
                itemId: "mithril_bar",
                icon: ITEMS["mithril_bar"].icon,
                name: ITEMS["mithril_bar"].name,
                amount: 5 * ETERNIUM_RESOURCE_HOG,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 5 * ETERNIUM_RESOURCE_HOG,
                consumes: true
            },
            {
                type: "item",
                itemId: "relicrock_quiver",
                icon: ITEMS["relicrock_quiver"].icon,
                name: ITEMS["relicrock_quiver"].name,
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

    prismatic_quiver: {
        produces: "prismatic_quiver",
        name: "spiritroot quiver",
        recipeFor: "crafting",
        category: "combat",
        id: "prismatic_quiver",
        isHidden: true,
        timeToCraft: 3 * 60 * 60, // 120 minutes (2 hours)
        xp: 15000000,
        maxToCraft: 1,
        tags: ["weapon"],
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
                amount: 12,
                consumes: true
            },
            {
                type: "item",
                itemId: "purestone_bar",
                icon: ITEMS["purestone_bar"].icon,
                name: ITEMS["purestone_bar"].name,
                amount: 20,
                consumes: true
            },
            {
                type: "item",
                itemId: "spiritroot_log",
                icon: ITEMS["spiritroot_log"].icon,
                name: ITEMS["spiritroot_log"].name,
                amount: 50,
                consumes: true
            },
            {
                type: "item",
                itemId: "eternium_quiver",
                icon: ITEMS["eternium_quiver"].icon,
                name: ITEMS["eternium_quiver"].name,
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
}
