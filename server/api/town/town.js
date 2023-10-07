import { Meteor } from "meteor/meteor"

import { Items } from "/imports/api/items/items"
import { Servers } from "/imports/api/servers/servers"
import { State } from "/imports/api/state/state"
import { Users } from "/imports/api/users/users.js"

import { ITEMS } from "/imports/constants/items/index.js"

import { getGlobalBuff } from "/imports/api/globalbuffs/globalbuffs.js"
import { calculateItemKarma, karmaLevelValues, Town } from "/imports/api/town/town.js"
import { serverFromUser, updateUserActivity } from "/imports/api/users/users.js"
import { autoPrecisionValue, CInt } from "/imports/utils.js"

import { FLOORS } from "/server/constants/floors/index"

export const deleteKarmaBuffs = function deleteKarmaBuffs() {
    State.remove({ name: "town_dwelling" })
    State.remove({ name: "town_quarry" })
    State.remove({ name: "town_lumber_yard" })
    State.remove({ name: "town_armory" })
    State.remove({ name: "town_library" })
    State.remove({ name: "town_observatory" })
}

export const syncKarmaBuffs = function syncKarmaBuffs() {
    Servers.find({})
        .fetch()
        .forEach((thisServer) => {
            try {
                // read town data
                const townData = Town.find().fetch()

                // set up karma data
                const karmaData = {
                    dwellings: karmaLevelValues("dwellings", townData),
                    quarry: karmaLevelValues("quarry", townData),
                    lumberyard: karmaLevelValues("lumberyard", townData),
                    armory: karmaLevelValues("armory", townData),
                    library: karmaLevelValues("library", townData),
                    observatory: karmaLevelValues("observatory", townData)
                }

                // console.log("Karma data:");
                // console.log(karmaData);

                // Iterate through each town section
                Object.keys(karmaData).forEach((karmaDataPoint) => {
                    // Make sure there are no errors parsing this section
                    if (!karmaData[karmaDataPoint].isError) {
                        // Find an existing buff
                        const locateBuff = getGlobalBuff(karmaData[karmaDataPoint].buffName, thisServer._id)

                        // If there's no existing buff (or there is, but it's of a different level than our current target level)
                        if (
                            !locateBuff ||
                            CInt(locateBuff.value.level) != CInt(karmaData[karmaDataPoint].currentLevel)
                        ) {
                            // Delete any existing buff
                            const curBuffCursor = State.find({
                                name: karmaData[karmaDataPoint].buffName,
                                server: thisServer._id
                            })

                            if (curBuffCursor.count() > 0) {
                                const curBuffRemoveId = curBuffCursor.fetch()[0]._id

                                State.remove({ _id: curBuffRemoveId })
                            }

                            // And create a new buff with the right level (or no buff at target level 0)
                            if (CInt(karmaData[karmaDataPoint].currentLevel) > 0) {
                                State.insert({
                                    name: karmaData[karmaDataPoint].buffName,
                                    server: thisServer._id,
                                    value: {
                                        activeTo: moment().utc().hours(23).minutes(59).seconds(59).toDate(),
                                        level: karmaData[karmaDataPoint].currentLevel
                                    }
                                })
                            }
                        }
                    }
                })
            } catch (err) {
                console.log("syncKarmaBuffs() exception:")
                console.log(err)
            }
        })
}

export const newTownDay = function newTownDay() {
    Servers.find()
        .fetch()
        .forEach((thisServer) => {
            try {
                Town.remove({
                    server: thisServer._id
                })

                Users.update(
                    { townKarma: { $ne: 0 } }, // always use an index to avoid blindly setting data for the whole database
                    { $set: { townKarma: 0 } },
                    { multi: true }
                )

                Servers.update(thisServer._id, { $set: { townKarma: 0 } })
            } catch (err) {
                console.log("newTownDay() exception:")
                console.log(err)
            }
        })

    // delete and synchronize new town buffs
    deleteKarmaBuffs()
    syncKarmaBuffs()
}

const donateThisItem = function donateThisItem(_id, itemId, amount, building) {
    // todo: validate item qualifies for building, maybe add to ITEMS constants?

    if (amount <= 0) {
        return
    }

    const serverDoc = Servers.findOne({ _id: serverFromUser() })
    if (!serverDoc) {
        return
    }

    const currentItem = Items.findOne({ _id, owner: Meteor.userId(), itemId: itemId })
    if (!currentItem || currentItem.equipped) {
        return
    }

    if (currentItem.locked) {
        throw new Meteor.Error(
            "cant-donate",
            "That item is locked, preventing it from being sold, donated, or reforged."
        )
    }

    const itemConstants = ITEMS[currentItem.itemId]
    if (!itemConstants) {
        // this seems wrong
        throw new Meteor.Error("cant-donate", "That item cannot be found.")
    }

    let amountToDonate = amount

    if (amountToDonate >= currentItem.amount) {
        // USE UP ALL OF AN ITEM (delete)

        // Cap amount donated to actual item amount;
        amountToDonate = currentItem.amount

        // Delete item
        const itemsUpdated = Items.remove(currentItem._id)
        if (itemsUpdated <= 0) {
            return
        }
    } else {
        // USE UP SOME OF AN ITEM (decrement)

        // Decrement item quantity
        const itemsUpdated = Items.update(currentItem._id, {
            $inc: { amount: amountToDonate * -1 }
        })
        if (itemsUpdated <= 0) {
            return
        }
    }

    const newItem = Object.assign({}, itemConstants, currentItem)
    const newKarma = autoPrecisionValue(calculateItemKarma(newItem) * amountToDonate)

    const inputItem = {
        server: serverDoc._id,
        townBuilding: building,
        itemId: currentItem.itemId,
        count: amountToDonate,
        karma: newKarma
    }

    const existingItemData = Town.findOne({
        server: inputItem.server,
        townBuilding: inputItem.townBuilding,
        itemId: inputItem.itemId
    })

    if (existingItemData) {
        Town.update({ _id: existingItemData._id }, { $inc: { count: amountToDonate, karma: newKarma } })
    } else {
        Town.insert(inputItem)
    }

    // update personal karma and server karma
    try {
        Users.update(Meteor.userId(), {
            $inc: { townKarma: newKarma }
        })

        Servers.update(serverDoc._id, {
            $inc: { townKarma: newKarma }
        })
    } catch (err) {
        console.log("Couldn't update personal karma for:", Meteor.user().username)
        console.log(err)
    }

    return true
}

Meteor.publish("town", function () {
    return Town.find({
        server: serverFromUser()
    })
})

Meteor.methods({
    // note: this isn't used by anything directly (although an admin using the 'dev' tab or a browser's dev console could call this)
    "debug.loottest"() {
        const userDoc = Users.findOne({ _id: Meteor.userId() })
        const userIsAdmin = userDoc && userDoc.isSuperMod

        if (!userIsAdmin) {
            return false
        }

        const floor = 1

        console.log(FLOORS[floor])
        return `Operation completed.`
    },

    // note: this isn't used by anything directly (although an admin using the 'dev' tab or a browser's dev console could call this)
    "town.syncBuffs"() {
        const userDoc = Users.findOne({ _id: Meteor.userId() })
        const userIsAdmin = userDoc && userDoc.isSuperMod

        if (!userIsAdmin) {
            return false
        }

        deleteKarmaBuffs()
        syncKarmaBuffs()
        return `Operation completed.`
    },

    // note: this isn't used by anything directly (although an admin using the 'dev' tab or a browser's dev console could call this)
    "town.forceDayRollover"() {
        const userDoc = Users.findOne({ _id: Meteor.userId() })
        const userIsAdmin = userDoc && userDoc.isSuperMod

        if (!userIsAdmin) {
            return false
        }

        newTownDay()
        return `Operation completed.`
    },

    // note: this isn't usually by anything (we now publish and subscribe to a pseudo-collection), but it does get called as a last-chance backup
    "town.getGoods"() {
        return Town.find({ server: serverFromUser() }).fetch()
    },

    "town.donateItems"(arrayOfItems, building) {
        if (
            !arrayOfItems ||
            typeof arrayOfItems !== "object" ||
            !Array.isArray(arrayOfItems) ||
            !building ||
            typeof building !== "string"
        ) {
            return
        }

        arrayOfItems.forEach((thisItem) => {
            if (thisItem._id && thisItem.itemId && thisItem.amount) {
                if (thisItem.amount > 0) {
                    donateThisItem(thisItem._id, thisItem.itemId, thisItem.amount, building)
                }
            }
        })

        // snychronize town/karma buffs
        syncKarmaBuffs()

        // update that the user is actively playing
        updateUserActivity({ userId: Meteor.userId() })
    },

    "town.donateItem"(_id, itemId, amount, building) {
        if (!_id || !itemId || !amount || amount <= 0 || !building || typeof building !== "string") {
            return
        }

        donateThisItem(_id, itemId, amount, building)

        // snychronize town/karma buffs
        syncKarmaBuffs()

        // update that the user is actively playing
        updateUserActivity({ userId: Meteor.userId() })
    },

    "town.migrateKarmaFromServer"() {
        const userDoc = Users.findOne({ _id: Meteor.userId() })
        const userIsAdmin = userDoc && userDoc.isSuperMod

        if (!userIsAdmin) {
            return false
        }

        // this method should no longer be required
        return false

        // const server = Servers.findOne({ _id: Meteor.user().server })
        // if (!server) {
        //     return "Unable to find server"
        // }

        // const items = server?.town?.day1goods
        // if (!items) {
        //     return "Unable to find items"
        // }

        // // set user karma to 0
        // Users.update(
        //     { townKarma: { $ne: 0 } }, // always use an index to avoid blindly setting data for the whole database
        //     { $set: { townKarma: 0 } },
        //     { multi: true }
        // )

        // // set server karma to 0
        // Servers.update(server._id, {
        //     $set: {
        //         townKarma: 0
        //     }
        // })

        // for (const item of items) {
        //     const itemConstants = ITEMS[item.itemId]
        //     if (!itemConstants) {
        //         // this seems wrong
        //         console.log("Unable to look up item to convert", item.itemId)
        //         continue
        //     }

        //     const newItem = Object.assign({}, itemConstants, item)
        //     const newKarma = autoPrecisionValue(calculateItemKarma(newItem) * item.count)

        //     const inputItem = {
        //         server: server._id,
        //         townBuilding: item.townBuilding,
        //         itemId: item.itemId,
        //         count: item.count,
        //         karma: newKarma
        //     }

        //     console.log("inputItem", inputItem, "newItem", newItem)

        //     const existingItemData = Town.findOne({
        //         server: inputItem.server,
        //         townBuilding: inputItem.townBuilding,
        //         itemId: inputItem.itemId
        //     })

        //     if (existingItemData) {
        //         Town.update({ _id: existingItemData._id }, { $inc: { count: item.count, karma: newKarma } })
        //     } else {
        //         Town.insert(inputItem)
        //     }

        //     // update personal karma and server karma
        //     try {
        //         Users.update(item.owner, {
        //             $inc: { townKarma: newKarma }
        //         })

        //         Servers.update(server._id, {
        //             $inc: { townKarma: newKarma }
        //         })
        //     } catch (err) {
        //         console.log("Couldn't update personal karma for:", item.username)
        //         console.log(err)
        //     }
        // }
    }
})
