import { Meteor } from "meteor/meteor"
import { Tracker } from "meteor/tracker"
import { Session } from "meteor/session"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"

import Numeral from "numeral"
import _ from "underscore"

import { getGlobalBuffs } from "/imports/api/globalbuffs/globalbuffs"
import { Items } from "/imports/api/items/items.js"
import { Servers } from "/imports/api/servers/servers.js"
import { Skills } from "/imports/api/skills/skills.js"
import { calculateItemKarma, karmaLevelValues } from "/imports/api/town/town.js"
import { Users, wantAutoDonateOfThisItem } from "/imports/api/users/users.js"
import { CDbl, CInt, autoPrecisionValue } from "/imports/utils.js"

import { ITEMS } from "/imports/constants/items"

import "./town.html"

const getDonatableItems = function getDonatableItems(instance) {
    const townSection = instance.state.get("townSection")

    if (!townSection) {
        return false
    }

    const baseItemList = Items.find({})
    if (!baseItemList || baseItemList.count() === 0) {
        return false
    }

    let filteredItems = baseItemList.map((item) => {
        const itemConstants = ITEMS[item.itemId]
        if (itemConstants) {
            let baseDescription = ""
            if (itemConstants.description) {
                if (_.isFunction(itemConstants.description)) {
                    baseDescription = itemConstants.description()
                } else {
                    baseDescription = itemConstants.description
                }
            }

            const newItem = Object.assign({}, itemConstants, item)

            newItem.description = baseDescription // fix description
            newItem.donateMode = true
            newItem.donateSection = townSection
            newItem.karmaValue = CInt(autoPrecisionValue(calculateItemKarma(newItem)))
            newItem.reverseKarmaValue = 1000000000 - newItem.karmaValue
            const karmaValueFormatted = Numeral(newItem.karmaValue).format("0,0")
            if (CInt(newItem.amount) > 1) {
                newItem.customDescription = `Donating these will add <b>${karmaValueFormatted}</b> karma each.<hr />${baseDescription}`
            } else {
                newItem.customDescription = `Donating this will add <b>${karmaValueFormatted}</b> karma.<hr />${baseDescription}`
            }

            return newItem
        }
    })

    if (!filteredItems || filteredItems.length === 0) {
        console.log("Can't donate any items: mapped item list returned no items:")
        console.log(filteredItems)
        return false
    }

    filteredItems = filteredItems.filter((item) => {
        try {
            // filter out all equipped items
            if (item.equipped) return false

            // filter out all hidden and items
            //if (item.hidden) return false;
            //if (item.locked) return false;

            if (townSection === "dwellings") {
                if (item.category === "food") return true
                //if (item.category === 'seed' && item.seedType === 'food') return true;
                //if (item.category === 'seed' && item.seedType === 'xp') return true;
                if (item.itemId === "ore_coal") return true
                if (item.itemId === "cactus") return true
                if (item.itemId === "reed") return true
                if (item.itemId === "papyrus") return true
                if (item.itemId === "bamboo") return true
                if (item.itemId === "palm") return true
                if (item.itemId === "kenaf") return true
                if (item.itemId === "jute") return true
                if (item.itemId === "flax") return true
                if (item.itemId === "sisal") return true
                if (item.itemId === "raffia") return true
                if (item.itemId.indexOf("_pylon") !== -1) return true
                if (item.itemId.indexOf("_wall") !== -1) return true
                if (item.itemId === "bamboo_shack") return true
            } else if (townSection === "quarry") {
                if (item.category === "mining") return true
            } else if (townSection === "lumberyard") {
                if (item.category === "woodcutting") return true
            } else if (townSection === "armory") {
                if (item.category === "combat") return true
            } else if (townSection === "library") {
                if (item.isCraftingScroll && item.teaches) return true
                if (item.category === "tome") return true
                if (item.category === "pigment") return true
                if (item.category === "paper") return true // includes both crafted paper and books
                if (item.category === "magic_book") return true
            } else if (townSection === "observatory") {
                if (item.category === "astronomy") return true
            }
        } catch (err) {
            //console.log("Exception thrown (and ignored) while filtering:");
            //console.log(err);
            //console.log("Referenced item:");
            //console.log(item);
        }
        return false
    })

    if (filteredItems) {
        filteredItems = _.sortBy(filteredItems, ["name"])
        filteredItems = _.sortBy(filteredItems, ["reverseKarmaValue"])

        if (!filteredItems || filteredItems.length === 0) {
            console.log("Can't donate any items: filtered/sorted item list returned no items:")
            console.log("Location:", townSection)
            console.log("Filtered list:")
            console.log(filteredItems)
            return false
        }
        return filteredItems
    }

    console.log("Can't donate any items: filtered item list returned no items:")
    console.log("Location:", townSection)
    console.log("Filtered list:")
    console.log(filteredItems)
    return false
}

Template.townPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    Tracker.autorun(() => {
        const myUser = Users.findOne({ _id: Meteor.userId() })

        if (myUser) {
            if (myUser.uiState && myUser.uiState.townSection !== undefined) {
                this.state.set("townSection", myUser.uiState.townSection)
            } else {
                this.state.set("townSection", "dwellings")
            }
            this.state.set("yourKarma", myUser.townKarma)

            const server = Servers.findOne({ _id: Meteor.user().server })
            if (server) {
                this.state.set("totalKarma", server.townKarma)
            }
        }
    })

    Tracker.autorun(() => {
        Meteor.subscribe("servers")
    })

    Meteor.call("town.getGoods", (err, res) => {
        this.state.set("townGoods", res)
    })
})

Template.townPage.events({
    "click .multiDonateStart"(event, instance) {
        Session.set("multiDonate", true)
        Session.set("multiDonateItems", {})
    },

    "click .multiDonateSelectAll"(event, instance) {
        let currentItems = {}

        getDonatableItems(instance).forEach((thisItem) => {
            if (!thisItem.locked) {
                currentItems[thisItem._id] = {
                    id: thisItem._id,
                    itemId: thisItem.itemId,
                    amount: thisItem.amount
                }
            }
        })

        Session.set("multiDonateItems", currentItems)
    },

    "click .multiDonateConfirm"(event, instance) {
        instance.$(".confirmDonateModal").modal("show")
    },

    "click .multiDonateCancel"(event, instance) {
        Session.set("multiDonate", false)
        Session.set("multiDonateItems", {})
    },

    "click .modalButtonConfirm"(event, instance) {
        instance.$(".confirmDonateModal").modal("hide")
        Session.set("multiDonate", false)
        const items = Session.get("multiDonateItems")

        let itemsToDonate = []

        Object.keys(items).forEach((item) => {
            itemsToDonate = itemsToDonate.concat({
                _id: items[item].id,
                itemId: items[item].itemId,
                amount: items[item].amount
            })
        })

        getDonatableItems(instance).forEach((thisItem) => {
            if (wantAutoDonateOfThisItem(thisItem.itemId)) {
                itemsToDonate = itemsToDonate.concat({
                    _id: thisItem._id,
                    itemId: thisItem.itemId,
                    amount: thisItem.amount
                })
            }
        })

        Meteor.call("town.donateItems", itemsToDonate, Template.instance().state.get("townSection"), (err, res) => {
            if (err) toastr.warning(err.reason)
        })

        Session.set("multiDonateItems", {})
    },

    "click .modalButtonCancel"(event, instance) {
        instance.$(".confirmDonateModal").modal("hide")
    }
})

Template.townPage.helpers({
    isAdmin() {
        const myUser = Meteor.user() ? Meteor.user() : Users.findOne({ _id: Meteor.userId() })
        return myUser && myUser.isSuperMod
    },

    allGlobalBuffs() {
        return getGlobalBuffs()
    },

    numberOfDays() {
        return 1
    },

    thisSectionKarmaInfo() {
        const townGoods = Template.instance().state.get("townGoods")
        if (townGoods != null) {
            const karmaData = karmaLevelValues(Template.instance().state.get("townSection"), townGoods)

            if (!karmaData.isError) {
                const thisSectionKarmaValue = karmaData.curVal
                const thisSectionKarmaNextValue = karmaData.nextVal

                if (thisSectionKarmaValue > 0 || thisSectionKarmaNextValue > 0) {
                    const thisSectionKarmaFormatted = Numeral(thisSectionKarmaValue).format("0,0")
                    const thisSectionKarmaNextFormatted = Numeral(thisSectionKarmaNextValue).format("0,0")
                    return `
              &nbsp; &nbsp; 
              <span style="font-size: 10pt; color: #777;">
                <i>
                  <b>${thisSectionKarmaFormatted}</b> / <b>${thisSectionKarmaNextFormatted}</b> karma at this location
                </i>
              </span>`
                }
            }
        }

        return ""
    },

    yourKarma() {
        return CInt(Template.instance().state.get("yourKarma"))
    },

    karmaXPBonus(skillName) {
        const playerKarma = CDbl(Template.instance().state.get("yourKarma"))
        let skillLevel = 0

        const skillDoc = Skills.findOne({ type: skillName })
        if (skillDoc) {
            skillLevel = CInt(skillDoc.level)
        }

        if (skillLevel <= 0) {
            return 0
        }

        let personalKarmaBonus = autoPrecisionValue(playerKarma / (Math.pow(1.045, CDbl(skillLevel) / 2.5) * 75))

        // cap personal karma bonus at 200%
        if (personalKarmaBonus > 200.0) {
            personalKarmaBonus = 200.0
        }

        return personalKarmaBonus
    },

    totalKarma() {
        return Template.instance().state.get("totalKarma")
    },

    townSection() {
        return Template.instance().state.get("townSection")
    },

    multiDonating() {
        return Session.get("multiDonate")
    },

    townGoods() {
        try {
            const instance = Template.instance()
            const townSection = instance.state.get("townSection")
            const townGoods = instance.state.get("townGoods")
            const townData = townGoods.filter((good) => good.townBuilding === townSection)

            let karmaThisSection = 0
            let items = townData.map((item) => {
                const itemConstants = ITEMS[item.itemId]

                if (itemConstants) {
                    let baseDescription = ""
                    if (itemConstants.description) {
                        if (_.isFunction(itemConstants.description)) {
                            baseDescription = itemConstants.description()
                        } else {
                            baseDescription = itemConstants.description
                        }
                    }

                    const newItem = Object.assign({}, itemConstants, item)
                    newItem.amount = item.count
                    newItem.karmaValue = autoPrecisionValue(newItem.karma)
                    newItem.reverseKarmaValue = 1000000000 - newItem.karma
                    const countFormatted = Numeral(item.count).format("0,0")
                    const karmaValueFormatted = Numeral(newItem.karmaValue).format("0,0")
                    newItem.customDescription = `<b>${countFormatted}</b> x donated<br /><b>${karmaValueFormatted}</b> karma<hr />${baseDescription}`

                    karmaThisSection += newItem.karmaValue

                    return newItem
                }
                console.log(`WARNING: player has item ${item.itemId} that does not exist!`)
                return item
            })

            Template.instance().state.set("thisSectionKarma", karmaThisSection)

            items = _.sortBy(items, ["name"])
            items = _.sortBy(items, ["reverseKarmaValue"])

            return items
        } catch (err) {}
        return false
    },

    items() {
        return getDonatableItems(Template.instance())
    }
})

Template.townPage.events({
    "click .town-filter"(event, instance) {
        const filter = instance.$(event.target).closest(".town-filter").data("filter")
        Session.set("multiDonate", false)
        Session.set("multiDonateItems", {})
        Meteor.call("users.setUiState", "townSection", filter)
    }
})

Template.townPage.onDestroyed(function bodyOnDestroyed() {
    Session.set("multiDonate", false)
    Session.set("multiDonateItems", {})
})
