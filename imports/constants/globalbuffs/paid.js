export const PAID_GLOBALBUFFS = {
    paid_crafting: {
        globalBuffId: "paid_crafting",
        dataBuffId: "buffCrafting", // legacy ID for this buff
        name: function () {
            return "Global Crafting Buff"
        },
        icon: "crafting",
        extraDescription: "This global buff can be purchased with bought gems in the shop.",
        effects: function () {
            return [
                "+35% Crafting XP",
                "+35% Inscription XP",
                "+100% Jewel Drop Rate",
                "Failing to reforge won't reduce the rarity level"
            ]
        },
        isServerBuff: false,
        hasLevels: false
    },

    buffCrafting: {
        globalBuffId: "buffCrafting",
        name: function () {
            return "Global Crafting Buff"
        },
        icon: "crafting",
        extraDescription: "This global buff can be purchased with bought gems in the shop.",
        effects: function () {
            return [
                "+35% Crafting XP",
                "+35% Inscription XP",
                "+100% Jewel Drop Rate",
                "Failing to reforge won't reduce the rarity level"
            ]
        },
        isServerBuff: false,
        hasLevels: false
    },

    paid_combat: {
        globalBuffId: "paid_combat",
        dataBuffId: "buffCombat", // legacy ID for this buff
        name: function () {
            return "Global Combat Buff"
        },
        icon: "combat",
        extraDescription: "This global buff can be purchased with bought gems in the shop.",
        effects: function () {
            return ["+20% Combat XP", "+50% Drop Chance", "+35% Astronomy XP", "Triple combat energy regeneration"]
        },
        isServerBuff: false,
        hasLevels: false
    },

    buffCombat: {
        globalBuffId: "buffCombat",
        name: function () {
            return "Global Combat Buff"
        },
        icon: "combat",
        extraDescription: "This global buff can be purchased with bought gems in the shop.",
        effects: function () {
            return ["+20% Combat XP", "+50% Drop Chance", "+35% Astronomy XP", "Triple combat energy regeneration"]
        },
        isServerBuff: false,
        hasLevels: false
    },

    paid_gathering: {
        globalBuffId: "paid_gathering",
        dataBuffId: "buffGathering", // legacy ID for this buff
        name: function () {
            return "Global Gathering Buff"
        },
        icon: "gathering",
        extraDescription: "This global buff can be purchased with bought gems in the shop.",
        effects: function () {
            return ["+35% Mining XP", "+35% Woodcutting XP", "+35% Farming XP", "Double mining energy regeneration"]
        },
        isServerBuff: false,
        hasLevels: false
    },

    buffGathering: {
        globalBuffId: "buffGathering",
        name: function () {
            return "Global Gathering Buff"
        },
        icon: "gathering",
        extraDescription: "This global buff can be purchased with bought gems in the shop.",
        effects: function () {
            return ["+35% Mining XP", "+35% Woodcutting XP", "+35% Farming XP", "Double mining energy regeneration"]
        },
        isServerBuff: false,
        hasLevels: false
    }
}
