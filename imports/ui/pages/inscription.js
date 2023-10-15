import { Meteor } from "meteor/meteor"
import { Tracker } from "meteor/tracker"
import { Session } from "meteor/session"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"
import { ReactiveMethod } from "meteor/simple:reactive-method"
import { Random } from "meteor/random"

import _ from "underscore"
import moment from "moment"

import { ITEMS } from "/imports/constants/items/index.js"
import { DONATORS_BENEFITS } from "/imports/constants/shop/index.js"

import { BattlesList } from "/imports/api/battles/battles.js"
import { Inscription } from "/imports/api/inscription/inscription.js"
import { Items } from "/imports/api/items/items.js"
import { Skills } from "/imports/api/skills/skills.js"
import { Users } from "/imports/api/users/users.js"

// Component used in the template
import "../components/craftingDuration/craftingDuration.js"
import "./inscription.html"

let gameUpdateTimer

const itemModifier = function (item) {
    const itemConstants = ITEMS[item.itemId]
    item.shiftActionData = itemConstants.shiftActionData
    if (item.shiftActionData) {
        item.shiftAction = {
            description: item.shiftActionData.description,
            item,
            method() {
                if (this.item.shiftActionData.target) {
                    const targetClass = `targetting-${this.item.shiftActionData.target}`
                    const body = $("body")
                    if (!body.hasClass(targetClass)) {
                        body.addClass(targetClass)
                        Meteor.setTimeout(() => {
                            // Add body listener for when you want to click out
                            body.on(`click.${this.item._id}`, (event) => {
                                const closestTarget = $(event.target).closest(`.${this.item.shiftActionData.target}`)
                                if (closestTarget) {
                                    const targetId = closestTarget.data("id")
                                    if (targetId) {
                                        Meteor.call("items.use", { baseItemId: this.item._id, targetItemId: targetId })
                                    }
                                }

                                body.removeClass(targetClass)
                                body.off(`click.${this.item._id}`)
                            })
                        }, 1)
                    }
                } /* else {
                    Meteor.call("items.use", { baseItemId: this.item._id }, (err, res) => {
                        if (/essence_scroll/.test(this.item.itemId)) {
                            // If this was an essence scroll, reload recipes
                            recipeCache = undefined
                        }
                    })
                } */
            }
        }
    }

    return item
}

Template.inscriptionPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    this.state.set("hasLearnRequirements", false)

    // Show currently inscripting items
    Meteor.subscribe("inscription")

    Meteor.call("abilities.fetchLibrary", (err, abilityResults) => {
        if (abilityResults) {
            const abilityResultsMap = {}
            abilityResults.forEach((ability) => {
                abilityResultsMap[ability.id] = ability
            })
            this.state.set("abilityMap", abilityResultsMap)
        }
    })

    Tracker.autorun(() => {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        if (myUser) {
            if (myUser.uiState && myUser.uiState.inscriptionFilter !== undefined) {
                this.state.set("recipeFilter", myUser.uiState.inscriptionFilter)
            } else {
                this.state.set("recipeFilter", "abilities")
            }

            if (myUser.uiState && myUser.uiState.inscriptionLevelFilter !== undefined) {
                this.state.set("levelFilter", myUser.uiState.inscriptionLevelFilter)
            } else {
                this.state.set("levelFilter", 1)
            }
        }
    })

    this.autorun(() => {
        if (Skills.findOne({ type: "inscription" })) {
            const inscriptionSkill = Skills.findOne({ type: "inscription" })
            // Pass level so that this is recalled when we get up a level
            const results = ReactiveMethod.call("inscription.fetchRecipes", inscriptionSkill.level)
            if (results) {
                const resultsMap = {}
                results.forEach((result) => {
                    resultsMap[result.id] = result
                    if (result.hasOwnProperty("required") && result.name.includes("pigment")) {
                        let herb = result.required.filter((item) => item.type === "item")
                        if (herb.length) {
                            result.herb_icon = herb[0].icon
                        }
                    }
                })
                this.state.set("recipeListMap", resultsMap)

                const userDoc = Meteor.user()
                const hasInscriptionUpgrade =
                    userDoc.inscriptionUpgradeTo && moment().isBefore(userDoc.inscriptionUpgradeTo)

                // Store recipes
                this.state.set(
                    "recipes",
                    results.map((result) => {
                        if (inscriptionSkill.level < result.inscriptionSkill) {
                            result.notMetLevelReq = true
                        }

                        if (result.required) {
                            result.required.map((item) => {
                                if (
                                    item.name.includes("pigment") &&
                                    resultsMap &&
                                    resultsMap.hasOwnProperty(item.itemId) &&
                                    resultsMap[item.itemId].hasOwnProperty("required")
                                ) {
                                    item.herb_icon = resultsMap[item.itemId].required.filter(
                                        (item) => item.type === "item"
                                    )[0].icon
                                }
                            })
                        }

                        if (hasInscriptionUpgrade) {
                            const bonusPercentage = DONATORS_BENEFITS.inscriptionBonus
                            result.calculatedTimeToCraft = (result.timeToCraft * (1 - bonusPercentage / 100)).toFixed(0)
                        } else {
                            result.calculatedTimeToCraft = result.timeToCraft
                        }

                        return result
                    })
                )
            }
        } else {
            Meteor.call("skills.requirements", "inscription", (err, res) => {
                this.state.set("learnRequirements", res)
            })
        }
    })
})

Template.inscriptionPage.events({
    "click .learn-now"(event, instance) {
        Meteor.call("skills.learnSkill", "inscription")
    },

    "click .crafting-filter"(event, instance) {
        const filter = instance.$(event.target).closest(".crafting-filter").data("filter")
        Meteor.call("users.setUiState", "inscriptionFilter", filter)
    },

    "click .level-filter"(event, instance) {
        const filter = instance.$(event.target).closest(".level-filter").data("filter")
        Meteor.call("users.setUiState", "inscriptionLevelFilter", filter)
    }
})

Template.inscriptionPage.helpers({
    inscriptionSkill() {
        // Otherwise, return all of the tasks
        return Skills.findOne({ type: "inscription" })
    },

    inscription() {
        return Inscription.findOne()
    },

    inCurrentBattle() {
        return BattlesList.findOne({})
    },

    maxCraftAmount() {
        return Template.instance().state.get("maxCraftAmount")
    },

    craftAmount() {
        return Template.instance().state.get("craftAmount")
    },

    maxCraftableAmount() {
        return Template.instance().state.get("maxCraftableAmount")
    },

    recipeFilter() {
        return Template.instance().state.get("recipeFilter")
    },

    levelFilter() {
        return Template.instance().state.get("levelFilter")
    },

    summaryListDisabled() {
        return Session.get("summaryListDisabled")
    },

    recipes() {
        const instance = Template.instance()
        const recipeFilter = instance.state.get("recipeFilter")
        const levelFilter = instance.state.get("levelFilter")

        if (!instance.state.get("recipes")) {
            return []
        }

        const abilityMap = instance.state.get("abilityMap")

        if (recipeFilter === "abilities") {
            const abilityRecipes = instance.state
                .get("recipes")
                .filter((item) => {
                    return item.category === "tome" && item.teaches.level === parseInt(levelFilter)
                })
                .map((recipe) => {
                    recipe._id = Random.id() // don't do this at home. Or do, since it fixes the levelFilter rendering on abilities
                    if (recipe.teaches) {
                        const recipeTeaches = recipe.teaches.abilityId
                        if (abilityMap[recipeTeaches]) {
                            recipe.ability = abilityMap[recipeTeaches]
                            recipe.isLearnt = recipe.ability
                                ? recipe.teaches.level <= recipe.ability.learntLevel
                                : false
                            recipe.primaryAction = {}
                        }
                    }
                    return recipe
                })

            return _.sortBy(_.sortBy(abilityRecipes, "name"), "isLearnt")
        } else {
            return instance.state.get("recipes").filter((item) => {
                return item.category === recipeFilter
            })
        }
    },

    items() {
        let results = Items.find({
            equipped: false,
            name: { $regex: /^((?!axe).)*$/ },
            category: {
                $in: ["herb", "pigment", "paper", "page", "book", "woodcutting", "magic_book", "enchantment"]
            }
        }).map(itemModifier)

        if (results) {
            results = _.sortBy(results, ["name"])
            results = _.sortBy(results, ["category"])
        }

        return results
    },

    isInscription() {
        return true
    },

    learnRequirements() {
        return Template.instance().state.get("learnRequirements")
    },

    hasLearnRequirements() {
        return Template.instance().state.get("hasLearnRequirements")
    },

    learnRequirementsMet() {
        const instance = Template.instance()
        return function (met) {
            instance.state.set("hasLearnRequirements", met)
        }
    }
})
