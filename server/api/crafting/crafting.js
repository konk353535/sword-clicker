import lodash from "lodash"
import { Chats } from "meteor/cesarve:simple-chat/collections"
import { Meteor } from "meteor/meteor"
import moment from "moment"
import _ from "underscore"
import { Crafting } from "/imports/api/crafting/crafting"
import { Events } from "/imports/api/events/events"
import { Items } from "/imports/api/items/items"
import { Skills } from "/imports/api/skills/skills"
import { Users } from "/imports/api/users/users"

import { getActiveGlobalBuff, getBuffLevel } from "/imports/api/globalbuffs/globalbuffs.js"
import { userCurrentClass } from "/imports/api/classes/classes.js"
import { updateUserActivity } from "/imports/api/users/users.js"
import { CRAFTING } from "/imports/constants/crafting/index.js"
import { ITEMS, ITEM_RARITIES } from "/imports/constants/items/index.js"
import { DONATORS_BENEFITS } from "/imports/constants/shop/index.js"
import { CInt } from "/imports/utils.js"
import { addItem } from "/server/api/items/items.js"
import { addXp } from "/server/api/skills/skills.js"

// Take a list of requirements
// If met will return true and take items
// If not met, will return false and take no items
export const requirementsUtility = function (requirements, amountToCraft = 1) {
    if (amountToCraft <= 0) {
        return false
    }

    const requiredSkillList = requirements
        .filter((requirement) => {
            return requirement.type === "skill"
        })
        .map((skill) => {
            return skill.name
        })

    const mySkills = Skills.find({
        owner: Meteor.userId(),
        type: {
            $in: requiredSkillList
        }
    }).fetch()

    const mySkillsMap = {}
    mySkills.forEach((mySkill) => {
        mySkillsMap[mySkill.type] = mySkill
    })

    const requiredItemList = requirements
        .filter((requirement) => {
            return requirement.type === "item"
        })
        .map((item) => {
            return item.itemId
        })

    const myItems = Items.find(
        {
            owner: Meteor.userId(),
            itemId: {
                $in: requiredItemList
            },
            equipped: false
        },
        {
            sort: [["quality", "desc"]]
        }
    ).fetch()

    const myUser = {
        gold: Meteor.user().gold
    }

    const myItemsMap = {}
    myItems.forEach((item) => {
        // If there is multiple versions of this item use the first one
        if (!myItemsMap[item.itemId]) {
            myItemsMap[item.itemId] = item
        }
    })
    let canCraft = true

    requirements.forEach((requirement) => {
        if (requirement.type === "item") {
            const myItem = myItemsMap[requirement.itemId]
            if (requirement.consumes) {
                if (!myItem || myItem.amount < requirement.amount * amountToCraft) {
                    canCraft = false
                } else {
                    myItem.amount -= requirement.amount * amountToCraft
                    if (myItem.amount === 0) {
                        myItem.deleteMe = true
                    }
                }
            } else {
                if (!myItem || myItem.amount < requirement.amount) {
                    canCraft = false
                }
            }
        } else if (requirement.type === "gold") {
            if (myUser.gold < requirement.amount * amountToCraft) {
                canCraft = false
            } else {
                if (requirement.consumes) {
                    myUser.gold -= requirement.amount * amountToCraft
                    myUser.isDirty = true
                }
            }
        } else if (requirement.type === "skill") {
            const mySkill = mySkillsMap[requirement.name]
            if (mySkill.level < requirement.level) {
                canCraft = false
            }
        }
    })

    if (!canCraft) {
        return false
    }

    // Take resources
    myItems.forEach((item) => {
        if (item.deleteMe) {
            Items.remove(item._id)
            Events.insert(
                {
                    owner: this.userId,
                    event: "crafting.item.removal",
                    date: new Date(),
                    data: { itemId: item.itemId, id: item._id, owner: item.owner }
                },
                () => {}
            )
        } else {
            Items.update(item._id, {
                $set: { amount: item.amount }
            })
        }
    })

    // Take gold
    if (myUser.isDirty) {
        Users.update(Meteor.userId(), {
            $set: { gold: myUser.gold }
        })
    }

    return true
}

const craftItem = function (recipeId, amountToCraft = 1) {
    const crafting = Crafting.findOne({ owner: Meteor.userId() })

    if (crafting && (crafting.currentlyCrafting === undefined || crafting.currentlyCrafting === null)) {
        Crafting.update(crafting._id, {
            $set: {
                currentlyCrafting: []
            }
        })
    }

    // Are we crafting at least one item
    if (amountToCraft <= 0) {
        throw new Meteor.Error("cant-craft", "Choose a positive quantity of items to craft.")
    }

    const maxConcurrentCrafts = CRAFTING.getMaxCrafts(crafting.craftingLevel)

    // Are we already crafting?
    if (crafting.currentlyCrafting && crafting.currentlyCrafting.length >= maxConcurrentCrafts) {
        throw new Meteor.Error("already-crafting", "Your crafting queue is full.")
    }

    // Is this a valid recipe?
    const recipeConstants = CRAFTING.recipes[recipeId]

    // If this is a hidden recipe, make sure we have access
    if (recipeConstants.isHidden) {
        if (!crafting.learntCrafts || !crafting.learntCrafts[recipeConstants.id]) {
            throw new Meteor.Error("not-found", "Invalid recipe.")
        }
    }

    if (!recipeConstants || recipeConstants.recipeFor !== "crafting") {
        throw new Meteor.Error("cant-craft", "Recipe details for that crafting recipe couldn't be found.")
    }

    // Make sure amountToCraft doesn't exceed recipe limit
    if (amountToCraft > recipeConstants.maxToCraft) {
        throw new Meteor.Error("cant-craft", "Can't craft that many at once.")
    }

    // Do we have the requirements for this craft (items / levels / gold)
    // Note this method will take requirements if they are met
    if (!requirementsUtility(recipeConstants.required, amountToCraft)) {
        throw new Meteor.Error("cant-craft", "You don't know how to craft that, yet.")
    }

    let startDate = new Date()

    if (crafting.currentlyCrafting && crafting.currentlyCrafting.length > 0) {
        // Get latest crafting time and use that for next items crafting start time
        // This will make crafting sequential
        startDate = _.sortBy(crafting.currentlyCrafting, "endDate").reverse()[0].endDate
    }

    let timeToCraft = recipeConstants.timeToCraft * amountToCraft

    const userDoc = Meteor.user()

    // Apply membership benefits
    if (userDoc.craftingUpgradeTo && moment().isBefore(userDoc.craftingUpgradeTo)) {
        timeToCraft *= 1 - DONATORS_BENEFITS.craftingBonus / 100
    }

    // Add to currently crafting...
    Crafting.update(crafting._id, {
        $push: {
            currentlyCrafting: {
                itemId: recipeConstants.produces,
                startDate,
                recipeId,
                amount: amountToCraft,
                endDate: moment(startDate).add(timeToCraft, "seconds").toDate()
            }
        }
    })
}

const getReforgeData = function getReforgeData(_id) {
    const user = Meteor.user()
    if (!user) {
        return { isError: true, chance: -1, unadjustedChance: -1000, rarityData: undefined }
    }

    const craftingSkill = Skills.findOne({
        owner: Meteor.userId(),
        type: "crafting"
    })

    const currentItem = Items.findOne({ _id, owner: Meteor.userId() })
    if (!currentItem) {
        return { isError: true, chance: -2, unadjustedChance: -1000, rarityData: undefined }
    }

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
            recipeData = thisRecipe
        }
    })

    if (!recipeData || !recipeData.requiredCraftingLevel) {
        const classReforgeData = userCurrentClass()?.data?.reforge
        let itemConstants = lodash.clone(ITEMS[currentItem.itemId])

        if (itemConstants.reforgeRecipe && itemConstants.reforgeRecipe.requiresCrafting) {
            recipeData = {
                requiredCraftingLevel: itemConstants.reforgeRecipe.requiresCrafting,
                isLooted: true
            }
        } else if (classReforgeData && classReforgeData[currentItem.itemId] && classReforgeData[currentItem.itemId].requiresCrafting) {
            recipeData = {
                requiredCraftingLevel: classReforgeData[currentItem.itemId].requiresCrafting,
                isLooted: true
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

    if (!recipeData) {
        return { isError: true, chance: -3, unadjustedChance: -1000, rarityData: undefined }
    }

    if (!ITEM_RARITIES[currentItem.rarityId]) {
        return { isError: true, chance: -4, unadjustedChance: -1000, rarityData: undefined, recipeData }
    }

    const currentRarityData = ITEM_RARITIES[currentItem.rarityId]

    if (!currentRarityData.nextRarity) {
        return { isError: true, chance: -5, unadjustedChance: -1000, rarityData: undefined, recipeData }
    }

    const currentCraftingLevel = craftingSkill.level

    if (craftingSkill.level < recipeData.requiredCraftingLevel) {
        return {
            isError: true,
            chance: -6,
            unadjustedChance: -1000,
            rarityData: currentRarityData.nextRarity,
            recipeData
        }
    }

    let chanceToSucceed =
        (currentRarityData.nextRarity.successChance + (currentCraftingLevel - recipeData.requiredCraftingLevel)) / 100.0

    const townBuffArmoryLevel = getBuffLevel("town_armory")
    if (townBuffArmoryLevel > 0) {
        chanceToSucceed += townBuffArmoryLevel * 0.05
    }

    if (chanceToSucceed > 0.95) {
        chanceToSucceed = 0.95
    }

    return {
        isError: false,
        chance: chanceToSucceed <= 0.0 ? 0 : chanceToSucceed,
        unadjustedChance: chanceToSucceed,
        rarityData: currentRarityData.nextRarity,
        recipeData
    }
}

// Must only be called from 'reforgeThisItem' in the context of a tx.start() transaction
const stopReforgingThis = function (craftingData, originalItem, itemEndDatesToRemove) {
    if (!itemEndDatesToRemove || itemEndDatesToRemove.length === 0) {
        return false
    }

    const txSuccess = Crafting.update(
        {
            _id: craftingData._id,
            currentlyReforging: craftingData.currentlyReforging
        },
        {
            $pull: {
                currentlyReforging: {
                    endDate: itemEndDatesToRemove[0],
                    itemId: originalItem.itemId
                }
            }
        },
        {
            tx: { instant: true }
        }
    )

    return txSuccess
}

const reforgeThisItem = function (craftingData, originalItem, reforgeData, itemEndDatesToRemove) {
    const itemConstants = ITEMS[originalItem.itemId]
    const userRoll = Math.random()
    let txSuccess, reforgeResult

    tx.start("Reforge item queue update")

    const existingItem = Items.findOne({ _id: originalItem._id })
    if (existingItem) {
        stopReforgingThis(craftingData, originalItem, itemEndDatesToRemove)
        tx.commit()

        const userDoc = Users.findOne({ _id: originalItem.owner })
        const userName = userDoc ? userDoc?.username : `[user #${originalItem.owner}]`

        Events.insert({
            owner: originalItem.owner,
            event: "crafting.reforgeThisItem.removedItemsError",
            date: new Date(),
            data: {
                msg: `${userName} would have received a duplicate of ${
                    ITEMS[originalItem.itemId].name
                } via reforging.  Was caught and removed silently.`
            }
        })
        console.log(
            `${userName} would have received a duplicate of ${
                ITEMS[originalItem.itemId].name
            } via reforging.  Was caught and removed silently.`
        )
        return true
    }

    if (userRoll <= reforgeData.chance) {
        // success in reforge
        reforgeResult = 1
    } else {
        // failure to reforge
        reforgeResult = getActiveGlobalBuff("paid_crafting") ? 3 : 2
    }

    const rolledPretty = Math.max(((1 - userRoll - 0.0005) * 100), 0).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0*$)/,'$1')
    const neededPretty = Math.min(((1 - reforgeData.chance) * 100), 100).toFixed(0)

    if (reforgeResult == 1) {
        // success
        txSuccess = Items.insert(
            {
                _id: originalItem._id,
                itemId: originalItem.itemId,
                owner: originalItem.owner,
                category: originalItem.category,
                extraStats: originalItem.extraStats,
                quality: originalItem.quality,
                rarityId: reforgeData.rarityData.rarityId,
                enhanced: originalItem.enhanced
            },
            { tx: { instant: true } }
        )

        //console.log(`Reforge actual roll ${userRoll}, telling user it was ${rolledPretty} to avoid rounding issues`)

        console.log(`txSuccess: ${txSuccess}`)

        Chats.insert(
            {
                message: `You were successful at reforging your ${
                    itemConstants.name
                }, improving its structure (rarity increased)!  (rolled ${rolledPretty}, needed ${neededPretty})`,
                username: "Game",
                name: "Game",
                date: new Date(),
                custom: {
                    roomType: "Game"
                },
                roomId: `Game-${originalItem.owner}`
            },
            { tx: true }
        )
    } else if (reforgeResult == 2) {
        // failure
        if (Math.random() <= 0.05) {
            // no insert -- they lost the item

            Chats.insert(
                {
                    message: `While attempting to reforge your ${
                        itemConstants.name
                    }, the item cracked and fell to pieces.  (rolled ${rolledPretty}, needed ${neededPretty})`,
                    username: "Game",
                    name: "Game",
                    date: new Date(),
                    custom: {
                        roomType: "Game"
                    },
                    roomId: `Game-${originalItem.owner}`
                },
                { tx: true }
            )

            const removedItemsSuccess = stopReforgingThis(craftingData, originalItem, itemEndDatesToRemove)

            if (!removedItemsSuccess) {
                Events.insert({
                    owner: originalItem.owner,
                    event: "crafting.reforgeThisItem.failure",
                    date: new Date(),
                    data: {
                        msg: `stopReforgingThis() [on critical failure] couldn't remove items`
                    }
                })
                console.log(`stopReforgingThis() [on critical failure] couldn't remove items`)

                const userDoc = Users.findOne({ _id: originalItem.owner })
                const userName = userDoc ? userDoc?.username : `[user #${originalItem.owner}]`

                Events.insert({
                    owner: originalItem.owner,
                    event: "crafting.reforgeThisItem.failure",
                    date: new Date(),
                    data: {
                        msg: `... ${userName} may receive a duplicate of ${
                            ITEMS[originalItem.itemId].name
                        } -- rolling back the transaction as if it never happened`
                    }
                })
                console.log(
                    `... ${userName} may receive a duplicate of ${
                        ITEMS[originalItem.itemId].name
                    } -- rolling back the transaction as if it never happened`
                )

                tx.cancel() // error, rollback transaction (we'll try again in the next 'crafting.updateGame')
            } else {
                tx.commit()
            }

            return removedItemsSuccess
        } else if (reforgeData.recipeData.isLooted && originalItem.rarityId === "uncommon") {
            // if it didn't break, and the item is looted and at the lowest rarity already...

            txSuccess = Items.insert(
                {
                    _id: originalItem._id,
                    itemId: originalItem.itemId,
                    owner: originalItem.owner,
                    category: originalItem.category,
                    extraStats: originalItem.extraStats,
                    quality: originalItem.quality,
                    rarityId: originalItem.rarityId,
                    enhanced: originalItem.enhanced
                },
                { tx: { instant: true } }
            )
        } else {
            // if it didn't break and it's an item that can have lowered rarity, then reduce rarity

            const prevRarityId = ITEM_RARITIES[originalItem.rarityId].prevRarity.rarityId
            txSuccess = Items.insert(
                {
                    _id: originalItem._id,
                    itemId: originalItem.itemId,
                    owner: originalItem.owner,
                    category: originalItem.category,
                    extraStats: originalItem.extraStats,
                    quality: originalItem.quality,
                    rarityId: prevRarityId,
                    enhanced: originalItem.enhanced
                },
                { tx: { instant: true } }
            )

            Chats.insert(
                {
                    message: `You were not successful at reforging your ${
                        itemConstants.name
                    }, worsening its structure (rarity decreased).  (rolled ${rolledPretty}, needed ${neededPretty})`,
                    username: "Game",
                    name: "Game",
                    date: new Date(),
                    custom: {
                        roomType: "Game"
                    },
                    roomId: `Game-${originalItem.owner}`
                },
                { tx: true }
            )
        }
    } else if (reforgeResult == 3) {
        // failure but 'paid_crafting' buff is active
        txSuccess = Items.insert(
            {
                _id: originalItem._id,
                itemId: originalItem.itemId,
                owner: originalItem.owner,
                category: originalItem.category,
                extraStats: originalItem.extraStats,
                quality: originalItem.quality,
                rarityId: originalItem.rarityId,
                enhanced: originalItem.enhanced
            },
            { tx: { instant: true } }
        )

        if (reforgeData.recipeData.isLooted && originalItem.rarityId === "uncommon") {
            Chats.insert(
                {
                    message: `You were not successful at reforging your ${itemConstants.name}.`,
                    username: "Game",
                    name: "Game",
                    date: new Date(),
                    custom: {
                        roomType: "Game"
                    },
                    roomId: `Game-${originalItem.owner}`
                },
                { tx: true }
            )
        } else {
            Chats.insert(
                {
                    message: `You were not successful at reforging your ${
                        itemConstants.name
                    }.  The active crafting buff prevents it from worsening.  (rolled ${rolledPretty}, needed ${neededPretty})`,
                    username: "Game",
                    name: "Game",
                    date: new Date(),
                    custom: {
                        roomType: "Game"
                    },
                    roomId: `Game-${originalItem.owner}`
                },
                { tx: true }
            )
        }
    } else {
        // unknown result, just give them their old item back
        txSuccess = Items.insert(
            {
                _id: originalItem._id,
                itemId: originalItem.itemId,
                owner: originalItem.owner,
                category: originalItem.category,
                extraStats: originalItem.extraStats,
                quality: originalItem.quality,
                rarityId: originalItem.rarityId,
                enhanced: originalItem.enhanced
            },
            { tx: { instant: true } }
        )

        Chats.insert(
            {
                message: `You were not successful at reforging your ${itemConstants.name}.  A game error occurred and you were given your item back.`,
                username: "Game",
                name: "Game",
                date: new Date(),
                custom: {
                    roomType: "Game"
                },
                roomId: `Game-${originalItem.owner}`
            },
            { tx: true }
        )
    }

    if (!txSuccess) {
        tx.cancel() // error, rollback the entire transaction (we'll try again in the next 'crafting.updateGame')
        return
    }

    const removedItemsSuccess = stopReforgingThis(craftingData, originalItem, itemEndDatesToRemove)

    if (!removedItemsSuccess) {
        Events.insert({
            owner: originalItem.owner,
            event: "crafting.reforgeThisItem.removedItemsError",
            date: new Date(),
            data: {
                msg: `stopReforgingThis() [general] couldn't remove items`
            }
        })
        console.log(`stopReforgingThis() [general] couldn't remove items`)

        const userDoc = Users.findOne({ _id: originalItem.owner })
        const userName = userDoc ? userDoc?.username : `[user #${originalItem.owner}]`

        Events.insert({
            owner: originalItem.owner,
            event: "crafting.reforgeThisItem.removedItemsError",
            date: new Date(),
            data: {
                msg: `... ${userName} may receive a duplicate of ${
                    ITEMS[originalItem.itemId].name
                } -- rolling back the transaction as if it never happened`
            }
        })
        console.log(
            `... ${userName} may receive a duplicate of ${
                ITEMS[originalItem.itemId].name
            } -- rolling back the transaction as if it never happened`
        )

        tx.cancel() // error, rollback transaction (we'll try again in the next 'crafting.updateGame')
    } else {
        tx.commit()
    }

    return removedItemsSuccess
}

Meteor.methods({
    "crafting.reforgeItem"(_id) {
        const user = Meteor.user()
        if (!user) {
            return false
        }

        const currentItem = Items.findOne({ _id, owner: Meteor.userId() })
        if (!currentItem) {
            return false
        }

        if (currentItem.category !== "combat") {
            throw new Meteor.Error("cant-reforge", "That item can't be reforged.")
        }

        if (currentItem.slot === "neck") {
            throw new Meteor.Error("cant-reforge", "That item can't be reforged.")
        }

        if (currentItem.locked) {
            throw new Meteor.Error(
                "cant-reforge",
                "That item is locked, preventing it from being sold, donated, or reforged."
            )
        }

        const reforgeData = getReforgeData(_id)

        if (reforgeData.isError) {
            if (reforgeData.chance === -3 || reforgeData.chance === -5) {
                throw new Meteor.Error("cant-reforge", "That item can't be reforged.")
            }
            if (reforgeData.chance === -6) {
                throw new Meteor.Error("cant-reforge", "You don't have enough crafting skill to reforge this item.")
            }
            throw new Meteor.Error("cant-reforge", `Internal error during reforging: ${-reforgeData.chance}.`)
        }

        if (reforgeData.chance <= 0) {
            throw new Meteor.Error("cant-reforge", "You have no chance to reforge that item.")
        }

        let crafting = Crafting.findOne({ owner: Meteor.userId() })

        const maxConcurrentReforges = CRAFTING.getMaxReforges(crafting.craftingLevel)

        // Are we already reforging?
        if (crafting.currentlyReforging && crafting.currentlyReforging.length >= maxConcurrentReforges) {
            throw new Meteor.Error(
                "cant-reforge",
                //`You are already reforging as many items as you can ${crafting.currentlyReforging.length} vs ${maxConcurrentReforges} for crafting level ${crafting.craftingLevel}.`
                "You are already reforging as many items as you can!"
            )
        }

        const reforgingItems = crafting.currentlyReforging.map((item) => item.origUid)
        if (reforgingItems.includes(currentItem._id)) {
            const itemName = ITEMS[currentItem.itemId].name
                .toLowerCase()
                .split(" ")
                .map((word) => word.replace(word[0], word[0].toUpperCase()))
                .join(" ")
            throw new Meteor.Error("cant-reforge", `You are already reforging this ${itemName}.`)
        }

        if (!currentItem.rarityId) {
            currentItem.rarityId = "standard"
        }

        let startDate = new Date()

        if (crafting.currentlyReforging && crafting.currentlyReforging.length > 0) {
            // Get latest reforging time and use that for next item's reforging start time
            // This will make reforging sequential
            startDate = _.sortBy(crafting.currentlyReforging, "endDate").reverse()[0].endDate
        }

        const whatWereReforging = {
            origUid: currentItem._id,
            itemId: currentItem.itemId,
            currentRarityId: currentItem.rarityId,
            itemData: JSON.stringify(currentItem),
            reforgeData: JSON.stringify(reforgeData),
            startDate: startDate,
            endDate: moment(startDate)
                .add(reforgeData.recipeData.requiredCraftingLevel * 5 + 15, "seconds")
                .toDate()
        }

        Events.insert({
            owner: Meteor.userId(),
            event: "crafting.reforgeItem",
            date: new Date(),
            data: whatWereReforging
        })

        tx.start("Reforge item into queue")

        // Add to currently reforging...
        const updatedCount = Crafting.update(
            crafting._id,
            {
                $push: {
                    currentlyReforging: whatWereReforging
                }
            },
            { tx: true }
        )

        if (updatedCount < 1) {
            throw new Meteor.Error("cant-reforge", "Error setting reforging data.")
        }

        Items.remove(
            {
                _id: currentItem._id
            },
            { tx: true }
        )

        tx.commit()

        updateUserActivity({ userId: Meteor.userId() })
    },

    "crafting.cancelReforgeAll"() {
        const crafting = Crafting.findOne({
            owner: Meteor.userId()
        })

        const userDoc = Meteor.user()

        if (!crafting || !crafting.currentlyReforging) {
            return false
        }

        const newReforging = lodash.cloneDeep(crafting.currentlyReforging)

        if (!newReforging || newReforging.length <= 0) {
            return false
        }

        tx.start("Cancel reforge all items")

        // Remove targetReforging from current crafting array
        const updatedQuerySuccess = Crafting.update(
            {
                _id: crafting._id,
                currentlyReforging: [crafting.currentlyReforging]
            },
            {
                $set: {
                    currentlyReforging: []
                }
            },
            { tx: { instant: true } }
        )

        if (!updatedQuerySuccess) {
            tx.cancel() // Cancel transaction: "Cancel reforge all items"
            return
        }

        try {
            newReforging.forEach((targetReforging) => {
                const originalItem = JSON.parse(targetReforging.itemData)

                Items.insert(
                    {
                        itemId: originalItem.itemId,
                        owner: originalItem.owner,
                        category: originalItem.category,
                        extraStats: originalItem.extraStats,
                        quality: originalItem.quality,
                        rarityId: originalItem.rarityId,
                        enhanced: originalItem.enhanced
                    },
                    { tx: { instant: true } }
                )
            })
        } catch (err) {
            tx.cancel() // Cancel transaction: "Cancel reforge all items"
            return
        }

        tx.commit() // Commit transaction: "Cancel reforge all items"

        updateUserActivity({ userId: Meteor.userId() })
    },

    "crafting.cancelReforge"(targetEndDate) {
        const crafting = Crafting.findOne({
            owner: Meteor.userId()
        })

        const userDoc = Meteor.user()

        if (!crafting || !crafting.currentlyReforging) {
            return false
        }

        const newReforging = lodash.cloneDeep(crafting.currentlyReforging)

        // Target Reforging Item
        let targetReforging
        newReforging.forEach((currentlyReforging, index) => {
            if (moment(currentlyReforging.endDate).diff(targetEndDate) === 0) {
                targetReforging = currentlyReforging
            }
        })

        if (!targetReforging || !targetReforging.itemData) {
            return false
        }

        // Remove targetReforging from the array
        const filteredReforging = newReforging.filter((reforging) => {
            return reforging !== targetReforging
        })

        // Reorder crafts and recalculate start / end date
        const sortedReforges = _.sortBy(filteredReforging, "startDate")

        // Reconstruct start and end dates
        sortedReforges.forEach((reforge, index) => {
            if (moment().isBefore(reforge.startDate)) {
                const reforgeData = JSON.parse(reforge.reforgeData)
                let reforgeDuration = reforgeData.recipeData.requiredCraftingLevel * 5 + 15
                if (userDoc.craftingUpgradeTo && moment().isBefore(userDoc.craftingUpgradeTo)) {
                    reforgeDuration *= 1 - DONATORS_BENEFITS.craftingBonus / 100
                }
                if (index === 0) {
                    reforge.startDate = moment().toDate()
                    reforge.endDate = moment().add(reforgeDuration, "seconds").toDate()
                } else {
                    reforge.startDate = moment(sortedReforges[index - 1].endDate).toDate()
                    reforge.endDate = moment(reforge.startDate).add(reforgeDuration, "seconds").toDate()
                }
            }
        })

        tx.start("Cancel reforge item")

        // Remove targetReforging from current crafting array
        const updatedQuerySuccess = Crafting.update(
            {
                _id: crafting._id,
                currentlyReforging: crafting.currentlyReforging
            },
            {
                $set: {
                    currentlyReforging: sortedReforges
                }
            },
            { tx: { instant: true } }
        )

        if (!updatedQuerySuccess) {
            tx.cancel() // Cancel transaction: "Cancel reforge item"
            return
        }

        const originalItem = JSON.parse(targetReforging.itemData)

        Items.insert(
            {
                itemId: originalItem.itemId,
                owner: originalItem.owner,
                category: originalItem.category,
                extraStats: originalItem.extraStats,
                quality: originalItem.quality,
                rarityId: originalItem.rarityId,
                enhanced: originalItem.enhanced
            },
            { tx: { instant: true } }
        )

        tx.commit() // Commit transaction: "Cancel reforge item"

        updateUserActivity({ userId: Meteor.userId() })
    },

    "crafting.craftItem"(recipeId, amount) {
        if (Meteor.user().logEvents) {
            Events.insert(
                {
                    owner: Meteor.userId(),
                    event: "trace.crafting.craftItem",
                    date: new Date(),
                    data: {
                        stack: new Error().stack,
                        recipeId: recipeId,
                        amount: amount
                    }
                },
                () => {}
            )
        }

        craftItem(recipeId, amount)

        updateUserActivity({ userId: Meteor.userId() })
    },

    "crafting.fetchTiers"() {
        const craftingSkill = Skills.findOne({
            owner: Meteor.userId(),
            type: "crafting"
        })

        const tiersArray = Object.keys(CRAFTING.tiers)
            .map((tierKey) => {
                return CRAFTING.tiers[tierKey]
            })
            .filter((tier) => {
                return craftingSkill.level + 1 > tier.requiredCraftingLevel
            })

        return tiersArray
    },

    "crafting.fetchRecipes"() {
        const user = Meteor.user()
        if (!user) {
            return false
        }

        const craftingSkill = Skills.findOne({
            owner: Meteor.userId(),
            type: "crafting"
        })

        const crafting = Crafting.findOne({
            owner: Meteor.userId()
        })

        const recipesArray = Object.keys(CRAFTING.recipes)
            .map((craftingKey) => {
                const recipeConstant = lodash.cloneDeep(CRAFTING.recipes[craftingKey])
                const itemConstant = ITEMS[recipeConstant.produces]

                if (!itemConstant) {
                    console.log(`Failed - ${recipeConstant.produces} missing constants`)
                }

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
            .filter((recipe) => {
                if (recipe.recipeFor !== "crafting") {
                    return false
                }

                // If it's learnt show regardless of level
                if (recipe.isHidden) {
                    if (!crafting) {
                        return false
                    }
                    return !(!crafting.learntCrafts || !crafting.learntCrafts[recipe.id])
                }

                // Only show recipes we can craft, or recipes close to what we can craft ( 1 level away )
                return (
                    craftingSkill.level + 1 >=
                    (recipe && recipe.requiredCraftingLevel ? recipe.requiredCraftingLevel : 0)
                )
            })

        return _.sortBy(recipesArray, "requiredCraftingLevel")
    },

    "crafting.cancelCraft"(targetEndDate) {
        const userDoc = Meteor.user()
        // If existing crafts done, remove from crafting table
        const crafting = Crafting.findOne({ owner: Meteor.userId() })

        if (!crafting || !crafting.currentlyCrafting) {
            return
        }

        const newCrafting = lodash.cloneDeep(crafting.currentlyCrafting)

        // Target Crafting Item
        let targetCrafting
        newCrafting.forEach((currentCrafting, index) => {
            if (moment(currentCrafting.endDate).diff(targetEndDate) === 0) {
                targetCrafting = currentCrafting
            }
        })

        if (!targetCrafting) {
            return
        }

        // Remove targetCrafting from the array
        const filteredCrafting = newCrafting.filter((crafting) => {
            return crafting !== targetCrafting
        })

        // Reorder crafts and recalculate start / end date
        const sortedCrafts = _.sortBy(filteredCrafting, "startDate")

        // Reconstruct start and end dates
        sortedCrafts.forEach((craft, index) => {
            if (moment().isBefore(craft.startDate)) {
                let craftDuration = craft.amount * CRAFTING.recipes[craft.recipeId].timeToCraft
                if (userDoc.craftingUpgradeTo && moment().isBefore(userDoc.craftingUpgradeTo)) {
                    craftDuration *= 1 - DONATORS_BENEFITS.craftingBonus / 100
                }
                if (index === 0) {
                    craft.startDate = moment().toDate()
                    craft.endDate = moment().add(craftDuration, "seconds").toDate()
                } else {
                    craft.startDate = moment(sortedCrafts[index - 1].endDate).toDate()
                    craft.endDate = moment(craft.startDate).add(craftDuration, "seconds").toDate()
                }
            }
        })

        tx.start("Cancel crafting an item")

        // Remove targetCrafting from current crafting array
        const updatedQuerySuccess = Crafting.update(
            {
                _id: crafting._id,
                currentlyCrafting: crafting.currentlyCrafting
            },
            {
                $set: {
                    currentlyCrafting: sortedCrafts
                }
            },
            { tx: true, instant: true}
        )

        if (!updatedQuerySuccess) {
            tx.cancel()
            return
        }

        // Refund resources for specified craft
        const recipeConstants = CRAFTING.recipes[targetCrafting.itemId]
        recipeConstants.required.forEach((required) => {
            if (required.consumes) {
                if (required.type === "item") {
                    addItem(required.itemId, required.amount * targetCrafting.amount, undefined, true)
                }
            }
        })

        tx.commit()

        updateUserActivity({ userId: Meteor.userId() })
    },

    "crafting.fixRarityId"(_id) {
        tx.start("Fix rarity ID of item")

        const itemData = Items.findOne({ _id, owner: Meteor.userId() })

        if (!itemData) {
            tx.cancel()
            return
        }

        const reforgeData = getReforgeData(itemData._id)

        if (reforgeData.isError && reforgeData.chance !== -5) {
            // "-5" means it can't be upgraded, but we should still have other reforge data that we need
            tx.cancel()
            return
        }

        if (!reforgeData.recipeData || !reforgeData.recipeData.isLooted) {
            tx.cancel()
            return
        }

        let newRarity = ""

        if (itemData.rarityId === "crude") {
            newRarity = "uncommon"
        }
        if (itemData.rarityId === "rough") {
            newRarity = "uncommon"
        }
        if (itemData.rarityId === "standard") {
            newRarity = "uncommon"
        }
        if (itemData.rarityId === "improved") {
            newRarity = "fine"
        }
        if (itemData.rarityId === "mastercrafted") {
            newRarity = "rare"
        }
        if (itemData.rarityId === "masterforged") {
            newRarity = "extraordinary"
        }
        if (itemData.rarityId === "ascended") {
            newRarity = "phenomenal"
        }
        if (itemData.rarityId === "ethereal") {
            newRarity = "epic"
        }

        if (newRarity !== "") {
            Items.update(
                { _id },
                {
                    $set: { rarityId: newRarity }
                },
                { tx: true }
            )
        }

        tx.commit() // Commit transaction: "Fix rarity ID of item"
    },

    "crafting.updateGame"() {
        // If existing crafts done, remove from crafting table
        const crafting = Crafting.findOne({ owner: Meteor.userId() })

        if (!crafting) {
            return
        }

        if (crafting.currentlyCrafting) {
            let craftingXp = 0
            const newItems = []
            const popValues = [] // Store array of currentCraft endDates

            crafting.currentlyCrafting.forEach((currentCraft) => {
                if (moment().isAfter(currentCraft.endDate)) {
                    popValues.push(currentCraft.endDate)
                    newItems.push({
                        itemId: `${currentCraft.itemId}`,
                        amount: CInt(currentCraft.amount)
                    })
                    craftingXp += CRAFTING.recipes[currentCraft.recipeId].xp * currentCraft.amount
                }
            })

            const updatedCount = Crafting.update(
                {
                    _id: crafting._id,
                    currentlyCrafting: crafting.currentlyCrafting
                },
                {
                    $pull: {
                        currentlyCrafting: {
                            endDate: {
                                $in: popValues
                            }
                        }
                    }
                }
            )

            if (updatedCount > 0) {
                // Add new items to user
                newItems.forEach((item) => {
                    addItem(item.itemId, item.amount)
                })

                // Add crafting exp
                if (_.isNumber(craftingXp)) {
                    addXp("crafting", craftingXp)
                }
            }
        }

        if (crafting.currentlyReforging) {
            const newItems = []
            const popValues = [] // Store array of currentReforge endDates

            crafting.currentlyReforging.forEach((currentReforge) => {
                if (moment().isAfter(currentReforge.endDate)) {
                    popValues.push(currentReforge.endDate)
                    newItems.push(currentReforge)
                }
            })

            newItems.forEach((item) => {
                const originalItem = JSON.parse(item.itemData)
                const reforgeData = JSON.parse(item.reforgeData)

                const itemConstants = ITEMS[originalItem.itemId]

                if (!originalItem.rarityId) {
                    if (reforgeData.recipeData && reforgeData.recipeData.isLooted) {
                        originalItem.rarityId = "uncommon"
                    } else {
                        originalItem.rarityId = "standard"
                    }
                }

                reforgeThisItem(crafting, originalItem, reforgeData, popValues)
            })
        }
    }
})

const MILLISECOND = 1
const SECOND = MILLISECOND * 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

const userId = function userId(userId) {
    return userId
}

DDPRateLimiter.addRule({ type: "method", name: "crafting.craftItem", userId }, 10, 20000)
DDPRateLimiter.addRule({ type: "method", name: "crafting.fetchRecipes", userId }, 5, 10000)
DDPRateLimiter.addRule({ type: "method", name: "crafting.updateGame", userId }, 1, 3 * SECOND)
DDPRateLimiter.addRule({ type: "method", name: "crafting.cancelCraft", userId }, 2, SECOND / 3)
// DDPRateLimiter.addRule({ type: 'subscription', name: 'crafting' }, 20, 1 * MINUTE);

Meteor.publish("crafting", function () {
    //Transform function
    const transform = function (doc) {
        if (doc.currentlyCrafting) {
            doc.currentlyCrafting.forEach((item) => {
                const itemConstants = ITEMS[item.itemId]
                item.icon = itemConstants.icon
                item.name = itemConstants.name
            })
        }
        return doc
    }

    const self = this

    const observer = Crafting.find({
        owner: this.userId
    }).observe({
        added: function (document) {
            self.added("crafting", document._id, transform(document))
        },
        changed: function (newDocument, oldDocument) {
            self.changed("crafting", oldDocument._id, transform(newDocument))
        },
        removed: function (oldDocument) {
            self.removed("crafting", oldDocument._id)
        }
    })

    self.onStop(function () {
        observer.stop()
    })

    self.ready()
})
