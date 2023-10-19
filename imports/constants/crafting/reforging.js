import { Meteor } from "meteor/meteor"

import lodash from "lodash"

import { Items } from "/imports/api/items/items"

import { CRAFTING } from "/imports/constants/crafting/index.js"
import { ITEMS, ITEM_RARITIES } from "/imports/constants/items/index.js"

import { userCurrentClass } from "/imports/api/classes/classes.js"
import { getActiveGlobalBuff, getBuffLevel } from "/imports/api/globalbuffs/globalbuffs.js"

export const reforgeLookupMetalTier = (tier) => {
    if (tier === 2) {
        return "tin"
    }
    if (tier === 3) {
        return "bronze"
    }
    if (tier === 4) {
        return "iron"
    }
    if (tier === 5) {
        return "silver"
    }
    if (tier === 6) {
        return "gold"
    }
    if (tier === 7) {
        return "carbon"
    }
    if (tier === 8) {
        return "steel"
    }
    if (tier === 9) {
        return "platinum"
    }
    if (tier === 10) {
        return "titanium"
    }
    if (tier === 11) {
        return "tungsten"
    }
    if (tier === 12) {
        return "obsidian"
    }
    if (tier === 13) {
        return "cobalt"
    }
    if (tier === 14) {
        return "mithril"
    }
    if (tier === 15) {
        return "adamantium"
    }
    if (tier === 16) {
        return "orichalcum"
    }
    if (tier === 17) {
        return "meteorite"
    }
    if (tier === 18) {
        return "fairy_steel"
    }
    if (tier === 19) {
        return "elvent_steel"
    }
    if (tier >= 20) {
        return "cursed"
    }
    return "copper"
}

export const reforgeLookupWoodTier = (tier) => {
    if (tier === 2) {
        return "beech"
    }
    if (tier === 3) {
        return "ash"
    }
    if (tier === 4) {
        return "oak"
    }
    if (tier === 5) {
        return "maple"
    }
    if (tier === 6) {
        return "walnut"
    }
    if (tier === 7) {
        return "cherry"
    }
    if (tier === 8) {
        return "mahogany"
    }
    if (tier === 9) {
        return "elm"
    }
    if (tier === 10) {
        return "black"
    }
    if (tier === 11) {
        return "blue_gum"
    }
    if (tier === 12) {
        return "cedar"
    }
    if (tier === 13) {
        return "denya"
    }
    if (tier === 14) {
        return "gombe"
    }
    if (tier === 15) {
        return "hickory"
    }
    if (tier === 16) {
        return "larch"
    }
    if (tier === 17) {
        return "poplar"
    }
    if (tier === 18) {
        return "tali"
    }
    if (tier === 19) {
        return "willow"
    }
    if (tier >= 20) {
        return "teak"
    }
    return "pine"
}

export const reforgeMatchItemIdToTier = (itemId) => {
    for (let tier = 1; tier <= 27; tier++) {
        if (itemId.indexOf(`${reforgeLookupMetalTier(tier)}_`) === 0) {
            return tier
        }
        if (itemId.indexOf(`${reforgeLookupWoodTier(tier)}_`) === 0) {
            return tier
        }
    }
}

export const reforgeGenerateRecipe = function reforgeGenerateRecipe(_id) {
    const currentItem = lodash.cloneDeep(Items.findOne({ _id, owner: Meteor.userId() }))
    if (!currentItem) {
        return { error: "item does not exist", errorData: { _id } }
    }

    // on = -50% reduced reforging costs
    const isGlobalCraftingActive = getActiveGlobalBuff("paid_crafting")

    // unused here but leaving here in case we tweak it later, this gives +0% to +25% crafting success chance to reforge
    const townArmoryBuffLevel = getBuffLevel("town_armory")
    
    const recipesArray = Object.keys(CRAFTING.recipes).map((craftingKey) => {
        const recipeConstant = lodash.cloneDeep(CRAFTING.recipes[craftingKey])
        const itemConstant = ITEMS[recipeConstant.produces]

        recipeConstant.icon = itemConstant.icon
        recipeConstant.description = itemConstant.description
        recipeConstant.isTwoHanded = itemConstant.isTwoHanded

        if (itemConstant.stats) {
            recipeConstant.baseStats = itemConstant.stats
            recipeConstant.extraStats = itemConstant.extraStats
        }

        if (itemConstant.requiredEquip) {
            recipeConstant.requiredEquip = itemConstant.requiredEquip
        }

        return recipeConstant
    })

    let recipeData = undefined
    recipesArray.forEach((thisRecipe) => {
        if (thisRecipe.produces === currentItem.itemId) {
            recipeData = lodash.cloneDeep(thisRecipe)
        }
    })

    const classReforgeData = userCurrentClass(Meteor.userId())?.data?.reforge
    if (classReforgeData && classReforgeData[currentItem.itemId] && classReforgeData[currentItem.itemId].requiresCrafting) {
        recipeData = {
            requiredCraftingLevel: classReforgeData[currentItem.itemId].requiresCrafting,
            isLooted: true // there's nothing in class reforge data that isn't a looted item
        }
    }

    if (!recipeData || !recipeData.requiredCraftingLevel) {
        const recipeItemConstants = Object.freeze(lodash.cloneDeep(ITEMS[currentItem.itemId]))
        if (recipeItemConstants.reforgeRecipe && recipeItemConstants.reforgeRecipe.requiresCrafting) {
            recipeData = {
                requiredCraftingLevel: recipeItemConstants.reforgeRecipe.requiresCrafting,
                isLooted: true // means the item isn't natively crafted and thus dropped (and not patched by class)
            }
        }
    }

    if (!currentItem.rarityId) {
        if (recipeData && recipeData.isLooted) {
            currentItem.rarityId = "uncommon"
        } else {
            currentItem.rarityId = "standard"
        }
    }

    const currentRarityData = ITEM_RARITIES[currentItem.rarityId]
    if (!currentRarityData) {
        return { error: "rarity does not exist", errorData: { _id, rarityId: currentItem.rarityId } }
    }
    
    const itemAttempts = currentItem.attempts || 0
    const currentTier = reforgeMatchItemIdToTier(currentItem.itemId)
    const nextRarityIdConsts = ITEM_RARITIES[currentRarityData.nextRarity.rarityId]
    let rarityMulitplier = 1

    if (nextRarityIdConsts && nextRarityIdConsts.statBonuses) {
        rarityMulitplier = 1 + (Math.ceil(nextRarityIdConsts.statBonuses/4) / 100.0)
    }

    return {
        produces: `${currentItem.itemId}_reforge`,
        name: ITEMS[currentItem.itemId].name,
        recipeFor: "reforging",
        category: ITEMS[currentItem.itemId].category,
        id: `${currentItem.itemId}_reforge`,
        timeToCraft: recipeData.requiredCraftingLevel * 5 + 15,
        xp: 0,
        maxToCraft: 1,
        tags: ["reforge"],
        requiredCraftingLevel: recipeData.requiredCraftingLevel,
        required: [
        {
            type: "item",
            itemId: `${reforgeLookupMetalTier(currentTier)}_furnace`,
            icon: ITEMS[`${reforgeLookupMetalTier(currentTier)}_furnace`].icon,
            name: ITEMS[`${reforgeLookupMetalTier(currentTier)}_furnace`].name,
            amount: 1,
            consumes: false
        },
        {
            type: "item",
            itemId: `${reforgeLookupMetalTier(currentTier)}_bar`,
            icon: ITEMS[`${reforgeLookupMetalTier(currentTier)}_bar`].icon,
            name: ITEMS[`${reforgeLookupMetalTier(currentTier)}_bar`].name,
            amount: Math.ceil((itemAttempts + 1) * 5 * rarityMulitplier * (isGlobalCraftingActive ? 0.5 : 1)),
            consumes: true
        },
        {
            type: "item",
            itemId: `${reforgeLookupWoodTier(currentTier)}_log`,
            icon: ITEMS[`${reforgeLookupWoodTier(currentTier)}_log`].icon,
            name: ITEMS[`${reforgeLookupWoodTier(currentTier)}_log`].name,
            amount: Math.ceil((itemAttempts + 1) * 3 * rarityMulitplier * (isGlobalCraftingActive ? 0.5 : 1)),
            consumes: true
        },
        {
            type: "gold",
            amount: Math.ceil((itemAttempts + 1) * 250 * currentTier * rarityMulitplier * (isGlobalCraftingActive ? 0.5 : 1)),
            consumes: true
        },
        {
            type: "skill",
            name: "crafting",
            level: recipeData.requiredCraftingLevel
        }
    ]}
}
