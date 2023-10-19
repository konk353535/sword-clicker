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

export const reforgeLookupMagicColorTier = (tier) => {
    if (tier === 2) {
        return "brown"
    }
    if (tier === 3) {
        return "blue"
    }
    if (tier === 4) {
        return "druid"
    }
    if (tier === 5) {
        return "purple"
    }
    if (tier === 6) {
        return "orange"
    }
    if (tier === 7) {
        return "grey"
    }
    if (tier === 8) {
        return "red"
    }
    if (tier === 9) {
        return "black"
    }
    if (tier === 10) {
        return "yellow"
    }
    if (tier === 11) {
        return "umber"
    }
    if (tier === 12) {
        return "azure"
    }
    if (tier === 13) {
        return "verdant"
    }
    if (tier === 14) {
        return "violet"
    }
    if (tier === 15) {
        return "tawny"
    }
    if (tier === 16) {
        return "ash"
    }
    if (tier === 17) {
        return "crimson"
    }
    if (tier === 18) {
        return "charcoal"
    }
    if (tier === 19) {
        return "amber"
    }
    if (tier === 20) {
        return "leather"
    }
    if (tier === 21) {
        return "cerulean"
    }
    if (tier === 22) {
        return "serpent"
    }
    if (tier === 23) {
        return "indigo"
    }
    if (tier === 24) {
        return "ochre"
    }
    if (tier >= 25 && tier <= 27) {
        return "exalted"
    }
    if (tier > 20) {
        return "leather"
    }
    return "brown"
}

export const reforgeLookupMagicTomeTier = (tier) => {
    if (tier === 2) {
        return "dusty"
    }
    if (tier === 3) {
        return "poor"
    }
    if (tier === 4) {
        return "worn"
    }
    if (tier === 5) {
        return "dull"
    }
    if (tier === 6) {
        return "simple"
    }
    if (tier === 7) {
        return "basic"
    }
    if (tier === 8) {
        return "studius"
    }
    if (tier === 9) {
        return "paradoxical"
    }
    if (tier === 10) {
        return "leather_bound"
    }
    if (tier === 11) {
        return "prestigious"
    }
    if (tier === 12) {
        return "spellbound"
    }
    if (tier === 13) {
        return "scholars"
    }
    if (tier === 14) {
        return "rich"
    }
    if (tier === 15) {
        return "bewildering"
    }
    if (tier === 16) {
        return "perplexing"
    }
    if (tier === 17) {
        return "breathtaking"
    }
    if (tier === 18) {
        return "ancient"
    }
    if (tier === 19) {
        return "stellar"
    }
    if (tier === 20) {
        return "legendary"
    }
    if (tier === 21) {
        return "forgotten"
    }
    if (tier === 22) {
        return "charred"
    }
    if (tier === 23) {
        return "obscure"
    }
    if (tier === 24) {
        return "sinister"
    }
    if (tier === 25) {
        return "maniacal"
    }
    if (tier >= 26 && tier <= 27) {
        return "exalted"
    }
    if (tier > 20) {
        return "legendary"
    }
    return "ripped"
}

export const reforgeLookupMagicOrbTier = (tier) => {
    if (tier === 2) {
        return "cracked"
    }
    if (tier === 3) {
        return "dim"
    }
    if (tier === 4) {
        return "malformed"
    }
    if (tier === 5) {
        return "pale"
    }
    if (tier === 6) {
        return "magic_touched"
    }
    if (tier === 7) {
        return "weak"
    }
    if (tier === 8) {
        return "tainted"
    }
    if (tier === 9) {
        return "shimmering"
    }
    if (tier === 10) {
        return "glittering"
    }
    if (tier === 11) {
        return "glowing"
    }
    if (tier === 12) {
        return "pulsating"
    }
    if (tier === 13) {
        return "runed"
    }
    if (tier === 14) {
        return "billowing"
    }
    if (tier === 15) {
        return "pristine"
    }
    if (tier === 16) {
        return "arcane"
    }
    if (tier === 17) {
        return "powerful"
    }
    if (tier === 18) {
        return "dangerous"
    }
    if (tier === 19) {
        return "prismatic"
    }
    if (tier === 20) {
        return "cataclysmic"
    }
    if (tier === 21) {
        return "intense"
    }
    if (tier === 22) {
        return "primal"
    }
    if (tier === 23) {
        return "overflowing"
    }
    if (tier === 24) {
        return "phantasmal"
    }
    if (tier === 25) {
        return "farplane"
    }
    if (tier >= 26 && tier <= 27) {
        return "exalted"
    }
    if (tier > 20) {
        return "cataclysmic"
    }
    return "diminished"
}

export const reforgeItemType = (itemId) => {
    for (let tier = 1; tier <= 27; tier++) {
        // find metal items
        if (itemId.indexOf(`${reforgeLookupMetalTier(tier)}_`) === 0) {
            return "metal"
        }

        // find wood items
        if (itemId.indexOf(`${reforgeLookupWoodTier(tier)}_`) === 0) {
            return "wood"
        }

        // find wizard clothing and tridents
        if (itemId.indexOf(`${reforgeLookupMagicColorTier(tier)}_wizard_`) === 0 ||
            itemId == `${reforgeLookupMagicColorTier(tier)}_trident`) {
            return "wizard"
        }

        // find magic tomes
        if (itemId == `${reforgeLookupMagicTomeTier(tier)}_tome`) {
            return "wizard"
        }

        // find magic orbs
        if (itemId == `${reforgeLookupMagicOrbTier(tier)}_orb`) {
            return "wizard"
        }
    }

    return "unknown"
}

export const reforgeMatchItemIdToTier = (itemId) => {
    for (let tier = 1; tier <= 27; tier++) {
        // find metal items
        if (itemId.indexOf(`${reforgeLookupMetalTier(tier)}_`) === 0) {
            return tier
        }

        // find wood items
        if (itemId.indexOf(`${reforgeLookupWoodTier(tier)}_`) === 0) {
            return tier
        }

        // find magic clothing and tridents
        if (itemId.indexOf(`${reforgeLookupMagicColorTier(tier)}_wizard_`) === 0 ||
            itemId == `${reforgeLookupMagicColorTier(tier)}_trident`) {
            return tier
        }

        // find magic tomes
        if (itemId == `${reforgeLookupMagicTomeTier(tier)}_tome`) {
            return tier
        }

        // find magic orbs
        if (itemId == `${reforgeLookupMagicOrbTier(tier)}_orb`) {
            return tier
        }
    }

    return 0
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
    
    const currentTier = reforgeMatchItemIdToTier(currentItem.itemId)
    const itemType = reforgeItemType(currentItem.itemId)
    if (!currentTier || itemType == "unknown") {
        return { error: "couldn't discover item tier or type", errorData: { _id, rarityId: currentItem.rarityId } }
    }

    const itemAttempts = currentItem.attempts || 0
    const nextRarityIdConsts = ITEM_RARITIES[currentRarityData.nextRarity.rarityId]
    let rarityMulitplier = 1

    if (nextRarityIdConsts && nextRarityIdConsts.statBonuses) {
        rarityMulitplier = 1 + (Math.ceil(nextRarityIdConsts.statBonuses/4) / 100.0)
    }

    if (itemType == "wizard") {
        const crystalTierName_Start = currentTier >= 10 ? (currentTier >= 20 ? "ancient_" : "complete_") : ""
        const crystalTierName_End = currentTier < 10 ? "_fragment" : ""
        const crystalTier = (currentTier % 10) + 1
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
                itemId: `${crystalTierName_Start}fire_shard${crystalTierName_End}`,
                icon: ITEMS[`${crystalTierName_Start}fire_shard${crystalTierName_End}`].icon,
                name: ITEMS[`${crystalTierName_Start}fire_shard${crystalTierName_End}`].name,
                amount: Math.ceil((itemAttempts + 1) * 1 * crystalTier * rarityMulitplier * (isGlobalCraftingActive ? 0.5 : 1)),
                consumes: true
            },
            {
                type: "item",
                itemId: `${crystalTierName_Start}earth_shard${crystalTierName_End}`,
                icon: ITEMS[`${crystalTierName_Start}earth_shard${crystalTierName_End}`].icon,
                name: ITEMS[`${crystalTierName_Start}earth_shard${crystalTierName_End}`].name,
                amount: Math.ceil((itemAttempts + 1) * 1 * crystalTier *rarityMulitplier * (isGlobalCraftingActive ? 0.5 : 1)),
                consumes: true
            },
            {
                type: "item",
                itemId: `${crystalTierName_Start}air_shard${crystalTierName_End}`,
                icon: ITEMS[`${crystalTierName_Start}air_shard${crystalTierName_End}`].icon,
                name: ITEMS[`${crystalTierName_Start}air_shard${crystalTierName_End}`].name,
                amount: Math.ceil((itemAttempts + 1) * 1 * crystalTier *rarityMulitplier * (isGlobalCraftingActive ? 0.5 : 1)),
                consumes: true
            },
            {
                type: "item",
                itemId: `${crystalTierName_Start}water_shard${crystalTierName_End}`,
                icon: ITEMS[`${crystalTierName_Start}water_shard${crystalTierName_End}`].icon,
                name: ITEMS[`${crystalTierName_Start}water_shard${crystalTierName_End}`].name,
                amount: Math.ceil((itemAttempts + 1) * 1 * crystalTier *rarityMulitplier * (isGlobalCraftingActive ? 0.5 : 1)),
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
