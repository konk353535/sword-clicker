import { ITEMS } from "/imports/constants/items/index.js"

const CURSED_ESS_XP = 500000
const FS_ESS_XP = 187500

export const TITANFOIL_CRAFTS = {
    titanfoil_dagger: {
        produces: "titanfoil_dagger",
        name: "titanfoil dagger",
        recipeFor: "crafting",
        category: "combat",
        id: "titanfoil_dagger",
        isHidden: true,
        timeToCraft: 30 * 60 * 2,
        xp: CURSED_ESS_XP * 2 + FS_ESS_XP * 2,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 114,
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
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
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
                itemId: "fairy_steel_bar",
                icon: ITEMS["fairy_steel_bar"].icon,
                name: ITEMS["fairy_steel_bar"].name,
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
                itemId: "astral_dagger",
                icon: ITEMS["astral_dagger"].icon,
                name: ITEMS["astral_dagger"].name,
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

    titanfoil_spear: {
        produces: "titanfoil_spear",
        name: "titanfoil spear",
        recipeFor: "crafting",
        category: "combat",
        id: "titanfoil_spear",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + FS_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 114,
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
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
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
                itemId: "astral_spear",
                icon: ITEMS["astral_spear"].icon,
                name: ITEMS["astral_spear"].name,
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

    titanfoil_short_sword: {
        produces: "titanfoil_short_sword",
        name: "titanfoil short sword",
        category: "combat",
        recipeFor: "crafting",
        id: "titanfoil_short_sword",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + FS_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 114,
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
                itemId: "astral_short_sword",
                icon: ITEMS["astral_short_sword"].icon,
                name: ITEMS["astral_short_sword"].name,
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

    titanfoil_long_sword: {
        produces: "titanfoil_long_sword",
        name: "titanfoil long sword",
        category: "combat",
        recipeFor: "crafting",
        id: "titanfoil_long_sword",
        isHidden: true,
        timeToCraft: 90 * 60,
        xp: CURSED_ESS_XP * 8 + FS_ESS_XP * 8,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 114,
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
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
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
                itemId: "fairy_steel_bar",
                icon: ITEMS["fairy_steel_bar"].icon,
                name: ITEMS["fairy_steel_bar"].name,
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
                itemId: "astral_long_sword",
                icon: ITEMS["astral_long_sword"].icon,
                name: ITEMS["astral_long_sword"].name,
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

    titanfoil_battle_axe: {
        recipeFor: "crafting",
        produces: "titanfoil_battle_axe",
        name: "titanfoil battle axe",
        category: "combat",
        id: "titanfoil_battle_axe",
        isHidden: true,
        timeToCraft: 90 * 60,
        xp: CURSED_ESS_XP * 8 + FS_ESS_XP * 8,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 114,
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
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
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
                itemId: "fairy_steel_bar",
                icon: ITEMS["fairy_steel_bar"].icon,
                name: ITEMS["fairy_steel_bar"].name,
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
                itemId: "astral_battle_axe",
                icon: ITEMS["astral_battle_axe"].icon,
                name: ITEMS["astral_battle_axe"].name,
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

    titanfoil_helmet: {
        recipeFor: "crafting",
        produces: "titanfoil_helmet",
        name: "titanfoil helmet",
        category: "combat",
        id: "titanfoil_helmet",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + FS_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 114,
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
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
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
                itemId: "astral_helmet",
                icon: ITEMS["astral_helmet"].icon,
                name: ITEMS["astral_helmet"].name,
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

    titanfoil_chest_plate: {
        recipeFor: "crafting",
        produces: "titanfoil_chest_plate",
        name: "titanfoil chest plate",
        category: "combat",
        id: "titanfoil_chest_plate",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + FS_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 114,
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
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
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
                itemId: "astral_chest_plate",
                icon: ITEMS["astral_chest_plate"].icon,
                name: ITEMS["astral_chest_plate"].name,
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

    titanfoil_plate_legs: {
        recipeFor: "crafting",
        produces: "titanfoil_plate_legs",
        name: "titanfoil plate legs",
        category: "combat",
        id: "titanfoil_plate_legs",
        isHidden: true,
        timeToCraft: 60 * 60 * 2, // 60
        xp: CURSED_ESS_XP * 4 + FS_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 114,
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
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
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
                itemId: "astral_plate_legs",
                icon: ITEMS["astral_plate_legs"].icon,
                name: ITEMS["astral_plate_legs"].name,
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

    titanfoil_shield: {
        recipeFor: "crafting",
        produces: "titanfoil_shield",
        name: "titanfoil shield",
        category: "combat",
        id: "titanfoil_shield",
        isHidden: true,
        timeToCraft: 60 * 60 * 2, // 60
        xp: CURSED_ESS_XP * 4 + FS_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 114,
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
                itemId: "tali_log",
                icon: ITEMS["tali_log"].icon,
                name: ITEMS["tali_log"].name,
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
                itemId: "astral_shield",
                icon: ITEMS["astral_shield"].icon,
                name: ITEMS["astral_shield"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 115
            }
        ]
    }
}
