import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Session } from "meteor/session"
import { Template } from "meteor/templating"

import "./itemList.html"

Template.itemList.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.itemList.events({
    "click .multiSellStart"(event, instance) {
        Session.set("multiSell", true)
        Session.set("multiSellItems", {})
    },

    "click .multiSellSelectAll"(event, instance) {
        let currentItems = {}

        instance.data.items.forEach((thisItem) => {
            if (!thisItem.locked) {
                currentItems[thisItem._id] = {
                    id: thisItem._id,
                    itemId: thisItem.itemId,
                    amount: thisItem.amount
                }
            }
        })

        Session.set("multiSellItems", currentItems)
    },

    "click .multiSellConfirm"(event, instance) {
        instance.$(".confirmSellModal").modal("show")
    },

    "click .multiSellCancel"(event, instance) {
        Session.set("multiSell", false)
        Session.set("multiSellItems", {})
    },

    "click .modalButtonConfirm"(event, instance) {
        instance.$(".confirmSellModal").modal("hide")
        Session.set("multiSell", false)
        const items = Session.get("multiSellItems")
        Object.keys(items).forEach((item) => {
            Meteor.call("items.sellItem", items[item].id, items[item].itemId, items[item].amount, (err, res) => {
                if (err) toastr.warning(err.reason)
            })
        })
        Session.set("multiSellItems", {})
    },

    "click .modalButtonCancel"(event, instance) {
        instance.$(".confirmSellModal").modal("hide")
    },

    "click .multiHideStart"(event, instance) {
        Session.set("multiHide", true)
        Session.set("multiHideItems", {})
    },

    "click .multiHideCancel"(event, instance) {
        Session.set("multiHide", false)
        Session.set("multiHideItems", {})
    },

    "click .multiHideSelectAll"(event, instance) {
        let currentItems = {}

        instance.data.items.forEach((thisItem) => {
            if (!thisItem.hidden) {
                currentItems[thisItem._id] = {
                    id: thisItem._id,
                    itemId: thisItem.itemId,
                    amount: thisItem.amount
                }
            }
        })

        Session.set("multiHideItems", currentItems)
    },

    "click .multiHideConfirm"(event, instance) {
        Session.set("multiHide", false)
        const items = Session.get("multiHideItems")
        Object.keys(items).forEach((item) => {
            Meteor.call("items.hide", items[item].id, items[item].itemId, items[item].amount)
        })
        Session.set("multiHideItems", {})
    },

    "click .multiShowStart"(event, instance) {
        Session.set("multiShow", true)
        Session.set("multiShowItems", {})
    },

    "click .multiShowCancel"(event, instance) {
        Session.set("multiShow", false)
        Session.set("multiShowItems", {})
    },

    "click .multiShowSelectAll"(event, instance) {
        let currentItems = {}

        instance.data.items.forEach((thisItem) => {
            if (thisItem.hidden) {
                currentItems[thisItem._id] = {
                    id: thisItem._id,
                    itemId: thisItem.itemId,
                    amount: thisItem.amount
                }
            }
        })

        Session.set("multiShowItems", currentItems)
    },

    "click .multiShowConfirm"(event, instance) {
        Session.set("multiShow", false)
        const items = Session.get("multiShowItems")
        Object.keys(items).forEach((item) => {
            Meteor.call("items.hide", items[item].id, items[item].itemId, items[item].amount)
        })
        Session.set("multiShowItems", {})
    },

    "click .multiLockStart"(event, instance) {
        Session.set("multiLock", true)
        Session.set("multiLockItems", {})
    },

    "click .multiLockCancel"(event, instance) {
        Session.set("multiLock", false)
        Session.set("multiLockItems", {})
    },

    "click .multiLockSelectAll"(event, instance) {
        let currentItems = {}

        instance.data.items.forEach((thisItem) => {
            currentItems[thisItem._id] = {
                id: thisItem._id,
                itemId: thisItem.itemId,
                amount: thisItem.amount
            }
        })

        Session.set("multiLockItems", currentItems)
    },

    "click .multiLockConfirm"(event, instance) {
        Session.set("multiLock", false)
        const items = Session.get("multiLockItems")
        Object.keys(items).forEach((item) => {
            Meteor.call("items.lock", items[item].id)
        })
        Session.set("multiLockItems", {})
    }
})

Template.itemList.helpers({
    sellItems() {
        return Session.get("multiSell")
    },

    showItems() {
        return Session.get("multiShow")
    },

    hideItems() {
        return Session.get("multiHide")
    },

    lockItems() {
        return Session.get("multiLock")
    },

    allItems() {
        const instance = Template.instance()

        return instance.data.items
    },

    visibleItems() {
        const instance = Template.instance()

        const items = instance.data.items.filter((item) => {
            return !item.hidden
        })

        if (items && items.length > 0) {
            return items
        }
        return false
    },

    hiddenItems() {
        const instance = Template.instance()

        const items = instance.data.items.filter((item) => {
            return item.hidden
        })

        if (items && items.length > 0) {
            return items
        }
        return false
    },

    multiSellHelp() {
        return `<p>Select to enable multi-sell mode, where you can select multiple items to sell at once.</p>`
    },

    multiHideHelp() {
        return `<p>Select to enable multi-hide mode, where you can select multiple items to hide at once.</p>`
    },

    multiShowHelp() {
        return `<p>Select to enable multi-show mode, where you can select multiple items to show at once.</p>`
    },

    multiLockHelp() {
        return `<p>Select to enable multi-lock mode, where you can select multiple items to lock at once.</p>`
    },

    multiSelectHelp() {
        return `<p>Click to auto-select all items.</p>`
    },

    multiCancelHelp() {
        return `<p>Click to cancel this action.</p>`
    },

    multiSellConfirmHelp() {
        return `<p>Click to sell the selected items.</p>`
    },

    multiShowConfirmHelp() {
        return `<p>Click to show the selected items.</p>`
    },

    multiHideConfirmHelp() {
        return `<p>Click to hide the selected items.</p>`
    },

    multiLockConfirmHelp() {
        return `<p>Click to lock the selected items.</p>`
    }
})

Template.itemList.onDestroyed(function bodyOnDestroyed() {
    Session.set("multiSell", false)
    Session.set("multiSellItems", {})
    Session.set("multiLock", false)
    Session.set("multiLockItems", {})
    Session.set("multiHide", false)
    Session.set("multiHideItems", {})
    Session.set("multiShow", false)
    Session.set("multiShowItems", {})
})
