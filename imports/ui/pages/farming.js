import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"
import moment from "moment"

import { FarmingSpace } from "/imports/api/farming/farming.js"
import { Items } from "/imports/api/items/items.js"
import { Skills } from "/imports/api/skills/skills.js"
import { Users } from "/imports/api/users/users.js"

import { FARMING } from "/imports/constants/farming/index.js"
import { ITEMS } from "/imports/constants/items/index.js"

import "../components/farming/farmSpace.js"
import "./farming.html"

let lastFarmingLevel
Template.farmingPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    // Farming
    Meteor.subscribe("farmingSpace")

    this.state.set("currentTab", "shop")
    this.state.set("seedsFilter", "food")

    Tracker.autorun(() => {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        if (myUser) {
            if (myUser.uiState && myUser.uiState.farmingTab !== undefined) {
                this.state.set("currentTab", myUser.uiState.farmingTab)
            } else {
                this.state.set("currentTab", "shop")
            }
            if (myUser.uiState && myUser.uiState.seedsFilter !== undefined) {
                this.state.set("seedsFilter", myUser.uiState.seedsFilter)
            } else {
                this.state.set("seedsFilter", "food")
            }
        }
    })

    Meteor.call("farming.gameUpdate", (err) => {
        this.state.set("tooltipsLoaded", false)

        this.autorun(() => {
            if (Skills.findOne({ type: "farming" })) {
                if (!this.state.get("tooltipsLoaded")) {
                    this.state.set("tooltipsLoaded", true)
                    updateTooltips(this, ["seed-shop"])
                }
            }
        })
    })

    this.autorun(() => {
        const farmingSkill = Skills.findOne({ type: "farming" })
        if (!farmingSkill) {
            return
        }

        if (!lastFarmingLevel || farmingSkill.level !== lastFarmingLevel) {
            // Pass level so that this is recalled when we get up a level
            const results = ReactiveMethod.call("farming.fetchSeedShopSells", farmingSkill.level)

            if (results) {
                this.state.set("seeds", _.sortBy(results, "requiredFarmingLevel"))
            }
        }
    })
})

Template.farmingPage.events({
    "click .collect-plants"(event, instance) {
        Meteor.call("farming.pickAll")
    },

    "click .destroy-plants"(event, instance) {
        $(event.target).addClass("destroy-plants-confirm btn-danger")
        $(event.target).removeClass("remove-friend btn-warning")
        $(event.target).html("Really Destroy All Plants?")
    },

    "click .destroy-plants-confirm"(event, instance) {
        for (let idx = 0; idx < 8; idx++) {
            Meteor.call("farming.killPlant", idx)
        }
        $(event.target).addClass("destroy-plants btn-danger")
        $(event.target).removeClass("destroy-plants-confirm btn-warning")
        $(event.target).html("Destroy All")
    },

    "click .learn-now"(event, instance) {
        Meteor.call("skills.learnSkill", "farming")
    },

    "click .seed-shop"(event, instance) {
        // Open seed shop modal
        instance.$(".seedShopModal").modal("show")
    },

    "click .shopLink"(event, instance) {
        if (instance.state.get("currentTab") !== "shop") {
            instance.state.set("currentTab", "shop")
            Meteor.call("users.setUiState", "farmingTab", "shop")
        }
    },

    "click .plotsLink"(event, instance) {
        if (instance.state.get("currentTab") !== "plots") {
            instance.state.set("currentTab", "plots")
            Meteor.call("users.setUiState", "farmingTab", "plots")
        }
    },

    "click .allLink"(event, instance) {
        if (instance.state.get("seedsFilter") !== "all") {
            instance.state.set("seedsFilter", "all")
            Meteor.call("users.setUiState", "seedsFilter", "all")
        }
    },

    "click .foodLink"(event, instance) {
        if (instance.state.get("seedsFilter") !== "food") {
            instance.state.set("seedsFilter", "food")
            Meteor.call("users.setUiState", "seedsFilter", "food")
        }
    },

    "click .miscLink"(event, instance) {
        if (instance.state.get("seedsFilter") !== "misc") {
            instance.state.set("seedsFilter", "misc")
            Meteor.call("users.setUiState", "seedsFilter", "misc")
        }
    },

    "click .xpLink"(event, instance) {
        if (instance.state.get("seedsFilter") !== "xp") {
            instance.state.set("seedsFilter", "xp")
            Meteor.call("users.setUiState", "seedsFilter", "xp")
        }
    },

    "click .goldLink"(event, instance) {
        if (instance.state.get("seedsFilter") !== "gold") {
            instance.state.set("seedsFilter", "gold")
            Meteor.call("users.setUiState", "seedsFilter", "gold")
        }
    },

    "click .herbLink"(event, instance) {
        if (instance.state.get("seedsFilter") !== "herb") {
            instance.state.set("seedsFilter", "herb")
            Meteor.call("users.setUiState", "seedsFilter", "herb")
        }
    },

    "click .treeLink"(event, instance) {
        if (instance.state.get("seedsFilter") !== "tree") {
            instance.state.set("seedsFilter", "tree")
            Meteor.call("users.setUiState", "seedsFilter", "tree")
        }
    },

    "click .buy-1"(event, instance) {
        const shopItemId = instance.$(event.target).closest(".buy-1").attr("data-shop-item-id")

        Meteor.call("farming.buyShopItem", shopItemId, 1)
    },

    "click .buy-10"(event, instance) {
        const shopItemId = instance.$(event.target).closest(".buy-10").attr("data-shop-item-id")

        Meteor.call("farming.buyShopItem", shopItemId, 10)
    },

    "click .buy-100"(event, instance) {
        const shopItemId = instance.$(event.target).closest(".buy-100").attr("data-shop-item-id")

        Meteor.call("farming.buyShopItem", shopItemId, 100)
    }
})

Template.farmingPage.helpers({
    farmingSkill() {
        return Skills.findOne({ type: "farming" })
    },

    items() {
        let results = Items.find(
            {
                category: {
                    $in: ["seed", "farming"]
                }
            },
            {
                sort: {
                    category: -1,
                    name: 1
                }
            }
        ).map((item) => {
            if (item.category === "seed") {
                const itemConstants = ITEMS[item.itemId]
                item.plantingDetails = FARMING.plants[itemConstants.produces]
                item.required = item.plantingDetails.required
                item.description = `Growth time is ${moment
                    .duration(item.plantingDetails.growthTime, "seconds")
                    .humanize()}`
                item.primaryAction = {
                    description: "plant",
                    item,
                    method() {
                        // Planting
                        Meteor.call("farming.plant", item.plantingDetails.produces, (err, res) => {
                            if (err) {
                                toastr.warning(err.reason)
                            }
                        })
                    }
                }
                item.shiftAction = {
                    description: "plant all",
                    item,
                    method() {
                        // Planting
                        Meteor.call("farming.plantAll", item.plantingDetails.produces, this.item.amount, (err, res) => {
                            if (err) {
                                toastr.warning(err.reason)
                            }
                        })
                    }
                }
            }
            return item
        })

        if (results) {
            let anyError = false
            results.forEach((seed, idx) => {
                try {
                    results[idx].growthTime = FARMING.plants[ITEMS[seed.itemId].produces].growthTime
                } catch (err) {
                    anyError = true
                }
            })

            if (!anyError) {
                results = _.sortBy(results, ["name"])
                results = _.sortBy(results, ["growthTime"])
            }
        }

        return results
    },

    farmingSpaces() {
        const userDoc = Meteor.user()
        const hasFarmingUpgrade = userDoc.farmingUpgradeTo && moment().isBefore(userDoc.farmingUpgradeTo)

        return FarmingSpace.find().map((farmingSpace) => {
            if (farmingSpace.index === 6 || farmingSpace.index === 7) {
                farmingSpace.active = !!hasFarmingUpgrade
            }
            return farmingSpace
        })
    },

    showShopTab() {
        return Template.instance().state.get("currentTab") === "shop"
    },

    showPlotsTab() {
        return Template.instance().state.get("currentTab") === "plots"
    },

    seedsFilter() {
        return Template.instance().state.get("seedsFilter")
    },

    seedsToShow() {
        const instance = Template.instance()
        if (instance.state.get("seeds") !== undefined) {
            return instance.state.get("seeds").filter((seed) => {
                if (instance.state.get("seedsFilter") === "all") {
                    return true
                }
                return seed.seedType === instance.state.get("seedsFilter")
            })
        }
        return false
    }
})

const updateTooltips = function (instance, tooltipNames) {
    setTimeout(() => {
        tooltipNames.forEach((tooltipName) => {
            if (instance.$(`.${tooltipName}-tooltip-container`).length > 0) {
                new Drop({
                    target: instance.$(`.${tooltipName}-tooltip-container`)[0],
                    content: instance.$(`.${tooltipName}-tooltip-content`)[0],
                    openOn: "hover",
                    position: "top left",
                    remove: true
                })
            }
        })
    }, 100)
}
