console.log("importing crafting/index.js CRAFTING_ITEMS")
import { CRAFTING_CRAFTS } from "./crafts"
import { CRAFTING_ITEMS as craftingItems } from "./items"
import { COMBAT_CRAFTS } from "/imports/constants/combat/crafts"
import { INSCRIPTION_CRAFTS } from "/imports/constants/inscription/crafts"
import { MINING_CRAFTS } from "/imports/constants/mining/crafts"
import { WOODCUTTING_CRAFTS } from "/imports/constants/woodcutting/crafts"
console.log("importing crafting/index.js ITEMS")

console.log("importing crafting/index.js CRAFTING_CRAFTS")
console.log("importing crafting/index.js COMBAT_CRAFTS")
console.log("importing crafting/index.js MINING_CRAFTS")
console.log("importing crafting/index.js WOODCUTTING_CRAFTS")
console.log("importing crafting/index.js INSCRIPTION_CRAFTS")

console.log("exporting crafting/index.js CRAFTING_ITEMS")
export const CRAFTING_ITEMS = Object.freeze(craftingItems)

console.log("exporting crafting/index.js CRAFTING")
export const CRAFTING = Object.freeze({
    recipes: Object.assign({}, CRAFTING_CRAFTS, COMBAT_CRAFTS, MINING_CRAFTS, WOODCUTTING_CRAFTS, INSCRIPTION_CRAFTS),

    getMaxCrafts(craftingLevel) {
        let maxCrafts = 2

        if (craftingLevel >= 5) {
            maxCrafts = 3
        }

        if (craftingLevel >= 15) {
            maxCrafts = 4
        }

        if (craftingLevel >= 30) {
            maxCrafts = 5
        }

        if (craftingLevel >= 45) {
            maxCrafts = 6
        }

        if (craftingLevel >= 60) {
            maxCrafts = 7
        }

        if (craftingLevel >= 75) {
            maxCrafts = 8
        }

        if (craftingLevel >= 90) {
            maxCrafts = 9
        }

        if (craftingLevel >= 105) {
            maxCrafts = 10
        }

        if (craftingLevel >= 120) {
            maxCrafts = 11
        }

        if (craftingLevel >= 135) {
            maxCrafts = 12
        }

        return maxCrafts
    },

    getMaxReforges(craftingLevel) {
        let maxReforges = 1

        if (craftingLevel >= 30) {
            maxReforges = 2
        }

        if (craftingLevel >= 60) {
            maxReforges = 3
        }

        return maxReforges
    },

    tiers: {
        copper: {
            requiredCraftingLevel: 2,
            name: "copper",
            displayName: "copper",
            color: "orange-1"
        },
        tin: {
            requiredCraftingLevel: 4,
            name: "tin",
            displayName: "tin",
            color: "grey-1"
        },
        bronze: {
            requiredCraftingLevel: 9,
            name: "bronze",
            displayName: "bronze",
            color: "orange-2"
        },
        iron: {
            requiredCraftingLevel: 14,
            name: "iron",
            displayName: "iron",
            color: "grey-2"
        },
        silver: {
            requiredCraftingLevel: 19,
            name: "silver",
            displayName: "silver",
            color: "grey-3"
        },
        gold: {
            requiredCraftingLevel: 24,
            name: "gold",
            displayName: "gold",
            color: "yellow-1"
        },
        carbon: {
            requiredCraftingLevel: 29,
            name: "carbon",
            displayName: "carbon",
            color: "black-1"
        },
        steel: {
            requiredCraftingLevel: 34,
            name: "steel",
            displayName: "steel",
            color: "grey-4"
        },
        platinum: {
            requiredCraftingLevel: 39,
            name: "platinum",
            displayName: "platinum",
            color: "grey-5"
        },
        titanium: {
            requiredCraftingLevel: 44,
            name: "titanium",
            displayName: "titanium",
            color: "black-2"
        },
        tungsten: {
            requiredCraftingLevel: 49,
            name: "tungsten",
            displayName: "tungsten",
            color: "grey-6"
        },
        obsidian: {
            requiredCraftingLevel: 54,
            name: "obsidian",
            displayName: "obsidian",
            color: "black-3"
        },
        cobalt: {
            requiredCraftingLevel: 59,
            name: "cobalt",
            displayName: "cobalt",
            color: "blue-1"
        },
        mithril: {
            requiredCraftingLevel: 64,
            name: "mithril",
            displayName: "mithril",
            color: "blue-2"
        },
        adamantium: {
            requiredCraftingLevel: 69,
            name: "adamantium",
            displayName: "adamantium",
            color: "green-1"
        },
        orichalcum: {
            requiredCraftingLevel: 74,
            name: "orichalcum",
            displayName: "orichalcum",
            color: "yellow-2"
        },
        meteorite: {
            requiredCraftingLevel: 79,
            name: "meteorite",
            displayName: "Meteorite",
            color: "orange-3"
        },
        fairy_steel: {
            requiredCraftingLevel: 84,
            name: "fairy_steel",
            displayName: "Fairy Steel",
            color: "purple-1"
        },
        elven_steel: {
            requiredCraftingLevel: 89,
            name: "elven_steel",
            displayName: "Elven Steel",
            color: "green-2"
        },
        cursed: {
            requiredCraftingLevel: 94,
            name: "cursed",
            displayName: "cursed",
            color: "red-1"
        }
    }
})
