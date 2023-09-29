import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Session } from "meteor/session"
import { Template } from "meteor/templating"

import _ from "underscore"
//import Numeral from 'numeral';

import { BUFFS } from "/imports/constants/buffs/index.js"
import { ITEMS, ITEM_RARITIES } from "/imports/constants/items/index.js"
import { WOODCUTTING } from "/imports/constants/woodcutting/index.js"

import { applyRarities } from "/imports/api/items/items.js"
import { CInt } from "/imports/utils.js"

import "./itemIcon.html"

let tooltip

const FriendlyNumber = function (num) {
    if (num < 1000) return num.toString()
    if (num < 10000) return (Math.floor(num / 100) / 10.0).toString() + "k"
    if (num < 100000) return Math.floor(num / 1000).toString() + "k"
    if (num < 1000000) return Math.floor(num / 1000).toString() + "k"
    if (num < 10000000) return (Math.floor(num / 100000) / 10.0).toString() + "m"
    if (num < 100000000) return Math.floor(num / 1000000).toString() + "m"
    if (num < 1000000000) return Math.floor(num / 10000000).toString() + "m"
    if (num < 10000000000) return (Math.floor(num / 100000000) / 10.0).toString() + "b"
    if (num < 100000000000) return Math.floor(num / 1000000000).toString() + "b"
    if (num < 1000000000000) return Math.floor(num / 10000000000).toString() + "b"
    return num.toString()
}

Template.itemIcon.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.itemIcon.helpers({
    totalPrice(amount, price) {
        return amount * price
    },

    icon() {
        const instance = Template.instance()
        const item = instance.data.item

        if (item) {
            if (item.icon) {
                return item.icon
            }

            const constants = ITEMS[item.itemId]

            if (constants && constants.icon) {
                return constants.icon
            }
        }

        return false
    },

    itemDescription() {
        const instance = Template.instance()
        const item = instance.data.item

        if (item) {
            if (item.description) {
                if (_.isFunction(item.description)) {
                    return item.description()
                }
                return item.description
            }

            const constants = ITEMS[item.itemId]

            if (constants && constants.description) {
                if (_.isFunction(constants.description)) {
                    return constants.description()
                }
                return constants.description
            }
        }

        return false
    },

    abilityRequiresOrForbids() {
        const instance = Template.instance()

        if (instance.data.item) {
            if (instance.data.item.abilityId) {
                return instance.data.item.requires || instance.data.item.cantUseWith
            }
        }

        return false
    },

    abilityRequires() {
        const instance = Template.instance()

        if (instance.data.item) {
            if (instance.data.item.abilityId) {
                if (instance.data.item.requires) {
                    return instance.data.item.requires
                }
            }
        }

        return false
    },

    abilityForbids() {
        const instance = Template.instance()

        if (instance.data.item) {
            if (instance.data.item.abilityId) {
                if (instance.data.item.cantUseWith) {
                    return instance.data.item.cantUseWith
                }
            }
        }

        return false
    },

    enchantments() {
        const instance = Template.instance()
        const item = instance.data.item

        if (item) {
            const constants = ITEMS[instance.data.item.itemId]

            if (!constants || !constants.enchantments) {
                return false
            }

            return constants.enchantments.map((buffId) => {
                return BUFFS[buffId].description()
            })
        }

        return false
    },

    amuletLevel() {
        const instance = Template.instance()
        const item = instance.data.item

        if (item) {
            if (
                _.contains(
                    [
                        "jade_amulet",
                        "lapislazuli_amulet",
                        "sapphire_amulet",
                        "emerald_amulet",
                        "ruby_amulet",
                        "tanzanite_amulet",
                        "fireopal_amulet"
                    ],
                    item.itemId
                )
            ) {
                if (item.extraStats && item.extraStats.level) {
                    return ` (Lv.${item.extraStats.level + 1})`
                }
                return " (Lv.1)"
            }
        }

        return ""
    },

    itemAmount() {
        const instance = Template.instance()
        const item = instance.data.item

        if (item) {
            if (item.amount && item.amount > 1) {
                /*if (item.amount >= 1000) {
          return Numeral(item.amount).format('0a');
        }
        
        return `${item.amount}`; */

                return FriendlyNumber(CInt(item.amount))
            }
        }

        return "0"
    },

    bubbleColor() {
        const instance = Template.instance()
        const item = instance.data.item

        if (item) {
            if (item.quality && item.quality > 0) {
                if (item.quality >= 85) {
                    return "#c9f"
                } else if (item.quality >= 65) {
                    return "#afa"
                } else if (item.quality >= 40) {
                    return "#ffa"
                } else {
                    return "#faa"
                }
            }
        }

        return "#e7e7e7"
    },

    borderStyle() {
        const instance = Template.instance()
        const item = instance.data.item

        let borderStyle = ""

        if (item) {
            if (item.rarityId) {
                if (item.rarityId === "crude") {
                    borderStyle = "3px dotted #555555"
                } else if (item.rarityId === "rough") {
                    borderStyle = "3px dotted #666644"
                } else if (item.rarityId === "improved") {
                    borderStyle = "3px dashed #998800"
                } else if (item.rarityId === "mastercrafted") {
                    borderStyle = "3px dashed #cc7700"
                } else if (item.rarityId === "masterforged") {
                    borderStyle = "3px double #ee6622"
                } else if (item.rarityId === "ascended") {
                    borderStyle = "3px double #ff2266"
                } else if (item.rarityId === "ethereal") {
                    borderStyle = "3px double #FF5599"
                } else if (item.rarityId === "perfect") {
                    borderStyle = "3px double #FF71aa"
                } else if (item.rarityId === "fine") {
                    borderStyle = "3px dashed #66aaaa"
                } else if (item.rarityId === "rare") {
                    borderStyle = "3px dashed #3388aa"
                } else if (item.rarityId === "extraordinary") {
                    borderStyle = "3px double #3366aa"
                } else if (item.rarityId === "phenomenal") {
                    borderStyle = "3px double #0055cc"
                } else if (item.rarityId === "epic") {
                    borderStyle = "3px double #0022ee"
                } else if (item.rarityId === "divine") {
                    borderStyle = "3px double #4444ff"
                } else if (item.rarityId === "incredible") {
                    borderStyle = "3px double #6141ff"
                } else if (item.rarityId === "unparalleled") {
                    borderStyle = "3px double #9151ff"
                } else if (item.rarityId === "prized") {
                    borderStyle = "3px double #883388"
                } else if (item.rarityId === "legendary") {
                    borderStyle = "3px double #cc44cc"
                } else if (item.rarityId === "artifact") {
                    borderStyle = "3px double #44cc44"
                }
            }
        }

        return borderStyle
    },

    rarity() {
        const instance = Template.instance()
        const item = instance.data.item

        if (item) {
            if (item.rarityId) {
                if (ITEM_RARITIES[item.rarityId]) {
                    if (ITEM_RARITIES[item.rarityId].label.length > 0) {
                        return {
                            rare: true,
                            label: ITEM_RARITIES[item.rarityId].label,
                            color: ITEM_RARITIES[item.rarityId].color
                        }
                    }
                }
            }
        }

        return { rare: false, label: "", color: "000" }
    },

    reforgeChance() {
        const instance = Template.instance()
        const item = instance.data.item

        if (item) {
            if (
                item.reforgeChance &&
                item.unadjustedReforgeChance &&
                item.reforgeChance !== "0%" &&
                item.unadjustedReforgeChance >= 1
            ) {
                return item.reforgeChance
            }
        }

        return false
    },

    unadjustedReforgeChance() {
        const instance = Template.instance()
        const item = instance.data.item

        if (item) {
            if (item.unadjustedReforgeChance) {
                return item.unadjustedReforgeChance
            }
        }

        return false
    },

    stats() {
        const instance = Template.instance()
        const item = instance.data.item

        if (!item) {
            return false
        }

        const constants = item.itemId ? ITEMS[item.itemId] : undefined
        const statsObj =
            constants && constants.stats
                ? applyRarities(constants.stats, item.rarityId)
                : applyRarities(item.stats, item.rarityId)
        const extraStats = item.extraStats ? applyRarities(item.extraStats, item.rarityId) : undefined

        if (extraStats) {
            Object.keys(extraStats).forEach((statName) => {
                if (!statsObj[statName]) {
                    statsObj[statName] = 0
                }
                statsObj[statName] += extraStats[statName]
            })
        }

        return statsObj
    },

    constants() {
        const instance = Template.instance()
        let consts

        if (!instance.data.item) {
            return false
        }

        if (instance.data.item.woodcutterId !== undefined)
            if (WOODCUTTING.woodcutters[instance.data.item.woodcutterId] !== undefined)
                consts = WOODCUTTING.woodcutters[instance.data.item.woodcutterId]

        if (consts === undefined) consts = ITEMS[instance.data.item.itemId]

        if (consts === undefined) return instance.data.item

        if (consts.name === undefined) consts.name = ""
        if (consts.description === undefined) consts.description = ""
        if (consts.stats === undefined) consts.stats = {}
        if (consts.enchantments === undefined) consts.enchantments = []

        return consts
    },

    sellAmount() {
        const instance = Template.instance()
        return instance.state.get("sellAmount")
    },

    showSellModal() {
        const instance = Template.instance()
        return instance.state.get("showSellModal")
    },

    donateAmount() {
        const instance = Template.instance()
        return instance.state.get("donateAmount")
    },

    donateAmountMaxFormatted() {
        const instance = Template.instance()
        return `You have: ${CInt(instance.state.get("donateAmountMax")).toLocaleString()}`
    },

    showDonateModal() {
        const instance = Template.instance()
        return instance.state.get("showDonateModal")
    },

    showUseModal() {
        const instance = Template.instance()
        return instance.state.get("showUseModal")
    },

    multiSelling() {
        const instance = Template.instance()
        let selling = false
        if (!_.isUndefined(Session.get("multiSellItems"))) {
            selling = Session.get("multiSellItems").hasOwnProperty(instance.data.item._id)
        }
        return selling
    },

    multiDonating() {
        const instance = Template.instance()
        let donating = false
        if (!_.isUndefined(Session.get("multiDonateItems"))) {
            donating = Session.get("multiDonateItems").hasOwnProperty(instance.data.item._id)
        }
        return donating
    },

    multiShowing() {
        const instance = Template.instance()
        let showing = false
        if (!_.isUndefined(Session.get("multiShowItems"))) {
            showing = Session.get("multiShowItems").hasOwnProperty(instance.data.item._id)
        }
        return showing
    },

    multiHiding() {
        const instance = Template.instance()
        let hiding = false
        if (!_.isUndefined(Session.get("multiHideItems"))) {
            hiding = Session.get("multiHideItems").hasOwnProperty(instance.data.item._id)
        }
        return hiding
    },

    multiLocking() {
        const instance = Template.instance()
        let locking = false
        if (!_.isUndefined(Session.get("multiLockItems"))) {
            locking = Session.get("multiLockItems").hasOwnProperty(instance.data.item._id)
        }
        return locking
    },

    scaledCooldownVal() {
        const instance = Template.instance()

        if (instance.data.item) {
            if (BUFFS && BUFFS[instance.data.item.abilityId] && BUFFS[instance.data.item.abilityId].scaledCooldown) {
                return BUFFS[instance.data.item.abilityId].scaledCooldown(instance.data.item)
            } else if (instance.data.item && instance.data.item.scaledCooldown) {
                return instance.data.item.scaledCooldown(instance.data.item)
            }
        }

        return false
    }
})

Template.itemIcon.rendered = function () {
    if (!Template.instance().data.hideTooltip) {
        const vm = this
        vm.state.set("tooltipOpen", false)
        tooltip = tippy(Template.instance().$(".item-icon-container")[0], {
            appendTo: Template.instance().$(".item-icon-container")[0].parentNode,
            popperOptions: {
                modifiers: {
                    preventOverflow: {
                        enabled: true
                    },
                    hide: {
                        enabled: false
                    }
                }
            },
            html: Template.instance().$(".item-tooltip-content")[0],
            performance: true,
            animateFill: false,
            distance: 5,
            onHide: function () {
                vm.state.set("tooltipOpen", false)
            }
        })
    }
}

Template.itemIcon.onDestroyed(function () {
    if (tooltip) {
        const tooltipInstance = Template.instance().$(".item-icon-container")[0]
        if (tooltipInstance && tooltipInstance.hasOwnProperty("_tippy")) {
            tooltipInstance._tippy.destroy()
        }
    }
})

const sellItem = function (event, instance) {
    if (instance.data.hideTooltip) return

    Template.instance().$(".sellModal").modal("hide")
    Template.instance().$(".useModal").modal("hide")

    const itemData = instance.data.item
    Meteor.call("items.sellItem", itemData._id, itemData.itemId, instance.state.get("sellAmount"), (err, res) => {
        if (err) toastr.warning(err.reason)
    })
}

const donateItem = function (event, instance) {
    if (instance.data.hideTooltip) return

    Template.instance().$(".donateModal").modal("hide")
    Template.instance().$(".useModal").modal("hide")

    const itemData = instance.data.item
    Meteor.call(
        "town.donateItem",
        itemData._id,
        itemData.itemId,
        instance.state.get("donateAmount"),
        itemData.donateSection,
        (err, res) => {
            if (err) toastr.warning(err.reason)
        }
    )
}

const hideItem = function (event, instance) {
    Template.instance().$(".sellModal").modal("hide")
    Template.instance().$(".useModal").modal("hide")

    const itemData = instance.data.item

    Meteor.call("items.hide", itemData._id)
}

const lockItem = function (event, instance) {
    Template.instance().$(".sellModal").modal("hide")
    Template.instance().$(".useModal").modal("hide")

    const itemData = instance.data.item

    Meteor.call("items.lock", itemData._id)
}

Template.itemIcon.events({
    "click .icon-box"(event, instance) {
        if (Template.instance().data.readOnly) {
            return
        }

        if ($("body").hasClass("targetting-item")) {
            return
        }

        if (Session.get("multiSell")) {
            let currentItems = Session.get("multiSellItems")
            if (currentItems.hasOwnProperty(instance.data.item._id)) {
                delete currentItems[instance.data.item._id]
            } else {
                currentItems[instance.data.item._id] = {
                    id: instance.data.item._id,
                    itemId: instance.data.item.itemId,
                    amount: instance.data.item.amount
                }
            }
            Session.set("multiSellItems", currentItems)
            return
        }

        if (Session.get("multiDonate")) {
            let currentItems = Session.get("multiDonateItems")
            if (currentItems.hasOwnProperty(instance.data.item._id)) {
                delete currentItems[instance.data.item._id]
            } else {
                currentItems[instance.data.item._id] = {
                    id: instance.data.item._id,
                    itemId: instance.data.item.itemId,
                    amount: instance.data.item.amount
                }
            }
            Session.set("multiDonateItems", currentItems)
            return
        }

        if (Session.get("multiShow")) {
            let currentItems = Session.get("multiShowItems")
            if (currentItems.hasOwnProperty(instance.data.item._id)) {
                delete currentItems[instance.data.item._id]
            } else {
                currentItems[instance.data.item._id] = {
                    id: instance.data.item._id,
                    itemId: instance.data.item.itemId,
                    amount: instance.data.item.amount
                }
            }
            Session.set("multiShowItems", currentItems)
            return
        }

        if (Session.get("multiHide")) {
            let currentItems = Session.get("multiHideItems")
            if (currentItems.hasOwnProperty(instance.data.item._id)) {
                delete currentItems[instance.data.item._id]
            } else {
                currentItems[instance.data.item._id] = {
                    id: instance.data.item._id,
                    itemId: instance.data.item.itemId,
                    amount: instance.data.item.amount
                }
            }
            Session.set("multiHideItems", currentItems)
            return
        }

        if (Session.get("multiLock")) {
            let currentItems = Session.get("multiLockItems")
            if (currentItems.hasOwnProperty(instance.data.item._id)) {
                delete currentItems[instance.data.item._id]
            } else {
                currentItems[instance.data.item._id] = {
                    id: instance.data.item._id,
                    itemId: instance.data.item.itemId,
                    amount: instance.data.item.amount
                }
            }
            Session.set("multiLockItems", currentItems)
            return
        }

        try {
            const itemData = instance.data.item

            if (itemData.wantReforgeRepair) {
                Meteor.call("crafting.fixRarityId", itemData._id)
            }
        } catch (err) {}

        if (Session.get("tooltipInput") === "touch") {
            if (!Template.instance().data.hideTooltip) {
                if (instance.state.get("tooltipOpen")) {
                    // close tooltip
                    let tooltipInstance = Template.instance().$(".item-icon-container")[0]
                    if (tooltipInstance) {
                        tooltipInstance._tippy.hide()
                        instance.state.set("tooltipOpen", false)
                    }
                } else {
                    // open tooltip
                    let tooltipInstance = Template.instance().$(".item-icon-container")[0]
                    if (tooltipInstance) {
                        tooltipInstance._tippy.show()
                        instance.state.set("tooltipOpen", true)
                    }
                    return
                }
            }
        }

        if (instance.data.item.donateMode) {
            instance.state.set("donateAmount", 1 /* instance.data.item.amount */) // allow them to donate as many as they want, but only default to 1 of them
            instance.state.set("donateAmountMax", instance.data.item.amount)
            instance.state.set("showDonateModal", true)
            Meteor.setTimeout(() => {
                instance.$(".donateModal").modal("show")
            }, 10)
        } else {
            const primaryAction = instance.data.item.primaryAction
            const shiftAction = instance.data.item.shiftAction
            const shiftKey = window.event ? window.event.shiftKey : event.originalEvent.shiftKey

            if (shiftKey) {
                shiftAction.method()
            } else if (primaryAction) {
                primaryAction.method()
            } else {
                instance.state.set("sellAmount", instance.data.item.amount)

                if (shiftAction) {
                    instance.state.set("showUseModal", true)
                    Meteor.setTimeout(() => {
                        instance.$(".useModal").modal("show")
                    }, 10)
                } else {
                    instance.state.set("showSellModal", true)
                    Meteor.setTimeout(() => {
                        instance.$(".sellModal").modal("show")
                    }, 10)
                }
            }
        }
    },

    "submit .sell-form"(event, instance) {
        sellItem(event, instance)
    },

    "keyup .sell-amount-input"(event, instance) {
        let newValue = parseInt($(event.target).val())
        if (newValue && !isNaN(newValue)) {
            if (newValue > instance.data.item.amount) {
                newValue = instance.data.item.amount
            }
            instance.state.set("sellAmount", parseInt(newValue))
        }
    },

    "click .sell-btn"(event, instance) {
        sellItem(event, instance)
    },

    "submit .donate-form"(event, instance) {
        donateItem(event, instance)
    },

    "keyup .donate-amount-input"(event, instance) {
        let newValue = parseInt($(event.target).val())
        if (newValue && !isNaN(newValue)) {
            if (newValue > instance.data.item.amount) {
                newValue = instance.data.item.amount
            }
            instance.state.set("donateAmount", parseInt(newValue))
        }
    },

    "click .donate-btn"(event, instance) {
        donateItem(event, instance)
    },

    "click .reforge-btn"(event, instance) {
        if (instance.data.hideTooltip) return

        Template.instance().$(".sellModal").modal("hide")
        Template.instance().$(".reforgeModal").modal("show")
    },

    "click .reforge-confirm-btn"(event, instance) {
        if (instance.data.hideTooltip) return

        Template.instance().$(".reforgeModal").modal("hide")

        const itemData = instance.data.item
        Meteor.call("crafting.reforgeItem", itemData._id, (err, res) => {
            if (err) toastr.warning(err.reason)
        })
    },

    "click .use-btn"(event, instance) {
        Template.instance().$(".useModal").modal("hide")

        const shiftAction = instance.data.item.shiftAction

        if (shiftAction) {
            shiftAction.method()
        }
    },

    "click .hide-btn"(event, instance) {
        hideItem(event, instance)
    },

    "click .lock-btn"(event, instance) {
        lockItem(event, instance)
    }
})
