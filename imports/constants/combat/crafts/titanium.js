import { ITEMS } from "/imports/constants/items/index.js"

export const TITANIUM_CRAFTS = {
    titanium_dagger: {
        produces: "titanium_dagger",
        name: "titanium dagger",
        recipeFor: "crafting",
        category: "combat",
        id: "titanium_dagger",
        timeToCraft: 240, // 60
        xp: 7500,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 44,
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
                itemId: "black_log",
                icon: ITEMS["black_log"].icon,
                name: ITEMS["black_log"].name,
                amount: 3,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanium_essence",
                icon: ITEMS["titanium_essence"].icon,
                name: ITEMS["titanium_essence"].name,
                amount: 2,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanium_bar",
                icon: ITEMS["titanium_bar"].icon,
                name: ITEMS["titanium_bar"].name,
                amount: 3,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 45
            }
        ]
    },

    titanium_spear: {
        produces: "titanium_spear",
        name: "titanium spear",
        recipeFor: "crafting",
        category: "combat",
        id: "titanium_spear",
        timeToCraft: 300, // 60
        xp: 15000,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 44,
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
                amount: 20,
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

    titanium_short_sword: {
        produces: "titanium_short_sword",
        name: "titanium short sword",
        category: "combat",
        recipeFor: "crafting",
        id: "titanium_short_sword",
        timeToCraft: 300, // 60
        xp: 15000,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 44,
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
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanium_bar",
                icon: ITEMS["titanium_bar"].icon,
                name: ITEMS["titanium_bar"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 45
            }
        ]
    },

    titanium_long_sword: {
        produces: "titanium_long_sword",
        name: "titanium long sword",
        category: "combat",
        recipeFor: "crafting",
        id: "titanium_long_sword",
        timeToCraft: 420, // 60
        xp: 30000,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 44,
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
                amount: 8,
                consumes: true
            },
            {
                type: "item",
                itemId: "black_log",
                icon: ITEMS["black_log"].icon,
                name: ITEMS["black_log"].name,
                amount: 15,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanium_bar",
                icon: ITEMS["titanium_bar"].icon,
                name: ITEMS["titanium_bar"].name,
                amount: 20,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 45
            }
        ]
    },

    titanium_battle_axe: {
        recipeFor: "crafting",
        produces: "titanium_battle_axe",
        name: "titanium battle axe",
        category: "combat",
        id: "titanium_battle_axe",
        timeToCraft: 600, // 60
        xp: 30000,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 44,
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
                amount: 8,
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
                amount: 10,
                consumes: true
            },
            {
                type: "skill",
                name: "crafting",
                level: 45
            }
        ]
    },

    titanium_helmet: {
        recipeFor: "crafting",
        produces: "titanium_helmet",
        name: "titanium helmet",
        category: "combat",
        id: "titanium_helmet",
        timeToCraft: 240, // 60
        xp: 15000,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 44,
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
                amount: 25,
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

    titanium_chest_plate: {
        recipeFor: "crafting",
        produces: "titanium_chest_plate",
        name: "titanium chest plate",
        category: "combat",
        id: "titanium_chest_plate",
        timeToCraft: 240, // 60
        xp: 15000,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 44,
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
                amount: 25,
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

    titanium_plate_legs: {
        recipeFor: "crafting",
        produces: "titanium_plate_legs",
        name: "titanium plate legs",
        category: "combat",
        id: "titanium_plate_legs",
        timeToCraft: 240, // 60
        xp: 15000,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 44,
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
                amount: 25,
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

    titanium_shield: {
        recipeFor: "crafting",
        produces: "titanium_shield",
        name: "titanium shield",
        category: "combat",
        id: "titanium_shield",
        timeToCraft: 240, // 60
        xp: 15000,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 44,
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
    }
}
