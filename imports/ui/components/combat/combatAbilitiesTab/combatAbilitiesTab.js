import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"
import { ReactiveMethod } from "meteor/simple:reactive-method"

import _ from "underscore"

import { Abilities } from "/imports/api/abilities/abilities.js"
import { Items } from "/imports/api/items/items.js"

import { BUFFS } from "/imports/constants/buffs/index.js"

import "./combatAbilitiesTab.html"

Template.combatAbilitiesTab.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    this.autorun(() => {
        const anAbility = Abilities.findOne()
        // Pass ability so when a new ability is learnt this is reactive
        const results = ReactiveMethod.call("abilities.fetchLibrary", anAbility)
        if (results) {
            const resultsMap = {}
            results.forEach((result) => {
                resultsMap[result.id] = result
            })
            this.state.set("abilityLibraryListMap", resultsMap)

            // Store recipes
            this.state.set("abilityLibrary", results)
        }
    })
})

Template.combatAbilitiesTab.events({})

Template.combatAbilitiesTab.helpers({
    availableTomes() {
        return Items.find({ category: "tome", $or: [{ hidden: { $exists: false } }, { hidden: false }] }).map(
            (item) => {
                item.primaryAction = {
                    description: "learn",
                    item,
                    method() {
                        Meteor.call("abilities.learn", this.item._id, this.item.itemId, (err, res) => {
                            if (err) {
                                toastr.warning(err.reason)
                            } else {
                                toastr.success(`Successfully learned ${item.name}`)
                            }
                        })
                    }
                }
                return item
            }
        )
    },

    equippedAbilitiesMap() {
        const myAbilities = Abilities.findOne()
        if (!myAbilities) {
            return
        }

        const equippedAbilities = myAbilities.learntAbilities.filter((ability) => {
            // To do add unequipping for abilities
            ability.primaryAction = {
                description: "unequip",
                ability,
                method() {
                    Meteor.call("abilities.unequip", this.ability.slot, (err, res) => {
                        if (err) {
                            toastr.error(err.reason)
                        }
                    })
                }
            }

            return ability.equipped
        })

        const equippedMap = {}
        equippedAbilities.forEach((item) => {
            equippedMap[item.slot] = item
        })

        return equippedMap
    },

    abilityLibrary() {
        const instance = Template.instance()
        const myAbilities = Abilities.findOne({})

        if (!instance.state.get("abilityLibrary") || !myAbilities) {
            return []
        }

        return instance.state.get("abilityLibrary").map((ability) => {
            ability.primaryAction = {}
            if (ability.requires) {
                ability.requires.forEach((require) => {
                    if (require.type === "item") {
                        ability.requiredItem = require.itemType
                    }
                })
            }

            const learntAbility = _.findWhere(myAbilities.learntAbilities, { abilityId: ability.id })
            if (learntAbility) {
                ability.notLearnt = false
                if (BUFFS && BUFFS[ability.id]) {
                    ability.scaledCooldown = BUFFS[ability.id].scaledCooldown
                }
                ability.currentCooldown = learntAbility.currentCooldown
                ability.primaryAction = {
                    description: "equip",
                    ability,
                    method() {
                        Meteor.call("abilities.equip", this.ability.id, (err, res) => {
                            if (err) {
                                toastr.error(err.reason)
                            }
                        })
                    }
                }
            } else {
                ability.notLearnt = true
            }

            return ability
        })
    }
})
