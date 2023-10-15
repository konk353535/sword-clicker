import { BAR_ITEMS } from "./items/bars"
import { FURNACE_ITEMS } from "./items/furnaces"
import { GOLD_ITEMS } from "./items/gold"
import { MISC_ITEMS } from "./items/misc"
import { SCROLL_ITEMS } from "./items/scrolls"
import { XP_ITEMS } from "./items/xp"

console.log("exporting crafting/items.js CRAFTING_ITEMS")
export const CRAFTING_ITEMS = Object.freeze(Object.assign({}, SCROLL_ITEMS, BAR_ITEMS, FURNACE_ITEMS, GOLD_ITEMS, XP_ITEMS, MISC_ITEMS, {
    composite_wall: {
        id: "composite_wall",
        icon: "compositeWall.svg",
        category: "crafting",
        name: "composite wall",
        sellPrice: 1000,
        description: "A useless wall. Good crafting xp."
    },

    polished_black_stone: {
        id: "polished_black_stone",
        icon: "polishedBlackStone.svg",
        category: "crafting",
        name: "polished black stone",
        sellPrice: 300,
        description: "Can be sold for a tidy sum"
    },

    polished_blue_stone: {
        id: "polished_blue_stone",
        icon: "polishedBlueStone.svg",
        category: "crafting",
        name: "polished blue stone",
        sellPrice: 600,
        description: "Can be sold for a tidy sum"
    }
}))
