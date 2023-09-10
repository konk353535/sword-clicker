import { ITEMS } from "/imports/constants/items/index.js"

export const BRONZE_CRAFTS = {
    bronze_dagger: {
        produces: "bronze_dagger",
        name: "bronze dagger",
        recipeFor: "crafting",
        category: "combat",
        id: "bronze_dagger",
        timeToCraft: 60, // 60
        xp: 37,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 9,
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
                amount: 3,
                consumes: true
            },
            {
                type: "item",
                itemId: "bronze_bar",
                icon: ITEMS["bronze_bar"].icon,
                name: ITEMS["bronze_bar"].name,
                amount: 3,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 10
            }
        ]
    },

    bronze_spear: {
        produces: "bronze_spear",
        name: "bronze spear",
        recipeFor: "crafting",
        category: "combat",
        id: "bronze_spear",
        timeToCraft: 120, // 60
        xp: 76,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 9,
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

    bronze_short_sword: {
        produces: "bronze_short_sword",
        name: "bronze short sword",
        category: "combat",
        recipeFor: "crafting",
        id: "bronze_short_sword",
        timeToCraft: 120, // 60
        xp: 76,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 9,
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

    bronze_long_sword: {
        produces: "bronze_long_sword",
        name: "bronze long sword",
        category: "combat",
        recipeFor: "crafting",
        id: "bronze_long_sword",
        timeToCraft: 120, // 60
        xp: 76,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 9,
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
                amount: 10,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 10
            }
        ]
    },

    bronze_battle_axe: {
        recipeFor: "crafting",
        produces: "bronze_battle_axe",
        name: "bronze battle axe",
        category: "combat",
        id: "bronze_battle_axe",
        timeToCraft: 120, // 60
        xp: 76,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 9,
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
                amount: 20,
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

    bronze_helmet: {
        recipeFor: "crafting",
        produces: "bronze_helmet",
        name: "bronze helmet",
        category: "combat",
        id: "bronze_helmet",
        timeToCraft: 120, // 60
        xp: 60,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 9,
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

    bronze_chest_plate: {
        recipeFor: "crafting",
        produces: "bronze_chest_plate",
        name: "bronze chest plate",
        category: "combat",
        id: "bronze_chest_plate",
        timeToCraft: 120, // 60
        xp: 60,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 9,
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

    bronze_plate_legs: {
        recipeFor: "crafting",
        produces: "bronze_plate_legs",
        name: "bronze plate legs",
        category: "combat",
        id: "bronze_plate_legs",
        timeToCraft: 120, // 60
        xp: 60,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 9,
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

    bronze_shield: {
        recipeFor: "crafting",
        produces: "bronze_shield",
        name: "bronze shield",
        category: "combat",
        id: "bronze_shield",
        timeToCraft: 120, // 60
        xp: 60,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 9,
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
    }
}
