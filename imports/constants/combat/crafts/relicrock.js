import { ITEMS } from "/imports/constants/items/index.js"

const CURSED_ESS_XP = 500000
const ES_ESS_XP = 250000

export const RELICROCK_CRAFTS = {
    relicrock_dagger: {
        produces: "relicrock_dagger",
        name: "relicrock dagger",
        recipeFor: "crafting",
        category: "combat",
        id: "relicrock_dagger",
        isHidden: true,
        timeToCraft: 30 * 60 * 2,
        xp: CURSED_ESS_XP * 2 + ES_ESS_XP * 2,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 119,
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
                amount: 2,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 2,
                consumes: true
            },
            {
                type: "item",
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 3,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 3,
                consumes: true
            },
            {
                type: "item",
                itemId: "elven_steel_bar",
                icon: ITEMS["elven_steel_bar"].icon,
                name: ITEMS["elven_steel_bar"].name,
                amount: 3,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 3,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanfoil_dagger",
                icon: ITEMS["titanfoil_dagger"].icon,
                name: ITEMS["titanfoil_dagger"].name,
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

    relicrock_spear: {
        produces: "relicrock_spear",
        name: "relicrock spear",
        recipeFor: "crafting",
        category: "combat",
        id: "relicrock_spear",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + ES_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 119,
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
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 20,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 20,
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
                itemId: "titanfoil_spear",
                icon: ITEMS["titanfoil_spear"].icon,
                name: ITEMS["titanfoil_spear"].name,
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

    relicrock_short_sword: {
        produces: "relicrock_short_sword",
        name: "relicrock short sword",
        category: "combat",
        recipeFor: "crafting",
        id: "relicrock_short_sword",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + ES_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 119,
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
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanfoil_short_sword",
                icon: ITEMS["titanfoil_short_sword"].icon,
                name: ITEMS["titanfoil_short_sword"].name,
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

    relicrock_long_sword: {
        produces: "relicrock_long_sword",
        name: "relicrock long sword",
        category: "combat",
        recipeFor: "crafting",
        id: "relicrock_long_sword",
        isHidden: true,
        timeToCraft: 90 * 60,
        xp: CURSED_ESS_XP * 8 + ES_ESS_XP * 8,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 119,
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
                amount: 8,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 8,
                consumes: true
            },
            {
                type: "item",
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 15,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 15,
                consumes: true
            },
            {
                type: "item",
                itemId: "elven_steel_bar",
                icon: ITEMS["elven_steel_bar"].icon,
                name: ITEMS["elven_steel_bar"].name,
                amount: 20,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 20,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanfoil_long_sword",
                icon: ITEMS["titanfoil_long_sword"].icon,
                name: ITEMS["titanfoil_long_sword"].name,
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

    relicrock_battle_axe: {
        recipeFor: "crafting",
        produces: "relicrock_battle_axe",
        name: "relicrock battle axe",
        category: "combat",
        id: "relicrock_battle_axe",
        isHidden: true,
        timeToCraft: 90 * 60,
        xp: CURSED_ESS_XP * 8 + ES_ESS_XP * 8,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 119,
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
                amount: 8,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_essence",
                icon: ITEMS["cursed_essence"].icon,
                name: ITEMS["cursed_essence"].name,
                amount: 8,
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
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 50,
                consumes: true
            },
            {
                type: "item",
                itemId: "elven_steel_bar",
                icon: ITEMS["elven_steel_bar"].icon,
                name: ITEMS["elven_steel_bar"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "cursed_bar",
                icon: ITEMS["cursed_bar"].icon,
                name: ITEMS["cursed_bar"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "titanfoil_battle_axe",
                icon: ITEMS["titanfoil_battle_axe"].icon,
                name: ITEMS["titanfoil_battle_axe"].name,
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

    relicrock_helmet: {
        recipeFor: "crafting",
        produces: "relicrock_helmet",
        name: "relicrock helmet",
        category: "combat",
        id: "relicrock_helmet",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + ES_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 119,
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
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 25,
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
                itemId: "titanfoil_helmet",
                icon: ITEMS["titanfoil_helmet"].icon,
                name: ITEMS["titanfoil_helmet"].name,
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

    relicrock_chest_plate: {
        recipeFor: "crafting",
        produces: "relicrock_chest_plate",
        name: "relicrock chest plate",
        category: "combat",
        id: "relicrock_chest_plate",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + ES_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 119,
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
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 25,
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
                itemId: "titanfoil_chest_plate",
                icon: ITEMS["titanfoil_chest_plate"].icon,
                name: ITEMS["titanfoil_chest_plate"].name,
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

    relicrock_plate_legs: {
        recipeFor: "crafting",
        produces: "relicrock_plate_legs",
        name: "relicrock plate legs",
        category: "combat",
        id: "relicrock_plate_legs",
        isHidden: true,
        timeToCraft: 60 * 60 * 2, // 60
        xp: CURSED_ESS_XP * 4 + ES_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 119,
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
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "teak_log",
                icon: ITEMS["teak_log"].icon,
                name: ITEMS["teak_log"].name,
                amount: 25,
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
                itemId: "titanfoil_plate_legs",
                icon: ITEMS["titanfoil_plate_legs"].icon,
                name: ITEMS["titanfoil_plate_legs"].name,
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

    relicrock_shield: {
        recipeFor: "crafting",
        produces: "relicrock_shield",
        name: "relicrock shield",
        category: "combat",
        id: "relicrock_shield",
        isHidden: true,
        timeToCraft: 60 * 60 * 2, // 60
        xp: CURSED_ESS_XP * 4 + ES_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 119,
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
                itemId: "willow_log",
                icon: ITEMS["willow_log"].icon,
                name: ITEMS["willow_log"].name,
                amount: 50,
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
                itemId: "titanfoil_shield",
                icon: ITEMS["titanfoil_shield"].icon,
                name: ITEMS["titanfoil_shield"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 120
            }
        ]
    }
}
