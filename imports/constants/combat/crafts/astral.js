import { ITEMS } from "/imports/constants/items/index.js"

const CURSED_ESS_XP = 500000
const MET_ESS_XP = 125000

export const ASTRAL_CRAFTS = {
    astral_dagger: {
        produces: "astral_dagger",
        name: "astral dagger",
        recipeFor: "crafting",
        category: "combat",
        id: "astral_dagger",
        isHidden: true,
        timeToCraft: 30 * 60 * 2,
        xp: CURSED_ESS_XP * 2 + MET_ESS_XP * 2,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 109,
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
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
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
                itemId: "meteorite_bar",
                icon: ITEMS["meteorite_bar"].icon,
                name: ITEMS["meteorite_bar"].name,
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
                itemId: "radiant_dagger",
                icon: ITEMS["radiant_dagger"].icon,
                name: ITEMS["radiant_dagger"].name,
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

    astral_spear: {
        produces: "astral_spear",
        name: "astral spear",
        recipeFor: "crafting",
        category: "combat",
        id: "astral_spear",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + MET_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 109,
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
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
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
                itemId: "radiant_spear",
                icon: ITEMS["radiant_spear"].icon,
                name: ITEMS["radiant_spear"].name,
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

    astral_short_sword: {
        produces: "astral_short_sword",
        name: "astral short sword",
        category: "combat",
        recipeFor: "crafting",
        id: "astral_short_sword",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + MET_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 109,
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
                itemId: "radiant_short_sword",
                icon: ITEMS["radiant_short_sword"].icon,
                name: ITEMS["radiant_short_sword"].name,
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

    astral_long_sword: {
        produces: "astral_long_sword",
        name: "astral long sword",
        category: "combat",
        recipeFor: "crafting",
        id: "astral_long_sword",
        isHidden: true,
        timeToCraft: 90 * 60,
        xp: CURSED_ESS_XP * 8 + MET_ESS_XP * 8,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 109,
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
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
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
                itemId: "meteorite_bar",
                icon: ITEMS["meteorite_bar"].icon,
                name: ITEMS["meteorite_bar"].name,
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
                itemId: "radiant_long_sword",
                icon: ITEMS["radiant_long_sword"].icon,
                name: ITEMS["radiant_long_sword"].name,
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

    astral_battle_axe: {
        recipeFor: "crafting",
        produces: "astral_battle_axe",
        name: "astral battle axe",
        category: "combat",
        id: "astral_battle_axe",
        isHidden: true,
        timeToCraft: 90 * 60,
        xp: CURSED_ESS_XP * 8 + MET_ESS_XP * 8,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 109,
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
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
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
                itemId: "meteorite_bar",
                icon: ITEMS["meteorite_bar"].icon,
                name: ITEMS["meteorite_bar"].name,
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
                itemId: "radiant_battle_axe",
                icon: ITEMS["radiant_battle_axe"].icon,
                name: ITEMS["radiant_battle_axe"].name,
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

    astral_helmet: {
        recipeFor: "crafting",
        produces: "astral_helmet",
        name: "astral helmet",
        category: "combat",
        id: "astral_helmet",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + MET_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 109,
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
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
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
                itemId: "radiant_helmet",
                icon: ITEMS["radiant_helmet"].icon,
                name: ITEMS["radiant_helmet"].name,
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

    astral_chest_plate: {
        recipeFor: "crafting",
        produces: "astral_chest_plate",
        name: "astral chest plate",
        category: "combat",
        id: "astral_chest_plate",
        isHidden: true,
        timeToCraft: 60 * 60 * 2,
        xp: CURSED_ESS_XP * 4 + MET_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 109,
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
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
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
                itemId: "radiant_chest_plate",
                icon: ITEMS["radiant_chest_plate"].icon,
                name: ITEMS["radiant_chest_plate"].name,
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

    astral_plate_legs: {
        recipeFor: "crafting",
        produces: "astral_plate_legs",
        name: "astral plate legs",
        category: "combat",
        id: "astral_plate_legs",
        isHidden: true,
        timeToCraft: 60 * 60 * 2, // 60
        xp: CURSED_ESS_XP * 4 + MET_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["armor"],
        requiredCraftingLevel: 109,
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
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
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
                itemId: "radiant_plate_legs",
                icon: ITEMS["radiant_plate_legs"].icon,
                name: ITEMS["radiant_plate_legs"].name,
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

    astral_shield: {
        recipeFor: "crafting",
        produces: "astral_shield",
        name: "astral shield",
        category: "combat",
        id: "astral_shield",
        isHidden: true,
        timeToCraft: 60 * 60 * 2, // 60
        xp: CURSED_ESS_XP * 4 + MET_ESS_XP * 4,
        maxToCraft: 1,
        tags: ["weapon"],
        requiredCraftingLevel: 109,
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
                itemId: "poplar_log",
                icon: ITEMS["poplar_log"].icon,
                name: ITEMS["poplar_log"].name,
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
                itemId: "radiant_shield",
                icon: ITEMS["radiant_shield"].icon,
                name: ITEMS["radiant_shield"].name,
                amount: 1,
                consumes: false
            },
            {
                type: "skill",
                name: "crafting",
                level: 110
            }
        ]
    }
}
