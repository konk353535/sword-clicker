import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"
import { ReactiveMethod } from "meteor/simple:reactive-method"

import _ from "underscore"

import { Abilities } from "/imports/api/abilities/abilities.js"
import { userCurrentClass } from "/imports/api/classes/classes.js"
import { Items } from "/imports/api/items/items.js"
import { classFeatureUnlocked } from "/imports/api/users/users.js"

import { BUFFS } from "/imports/constants/buffs/index.js"
import { ITEMS } from "/imports/constants/items/index.js"

import "./selectAbilities.html"

let isFetchingLibrary = false
let isFetchingLibraryExtra = false

Template.selectAbilitiesPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    this.autorun(() => {
        if (isFetchingLibrary || this.state.get("abilityLibraryListMap")) return

        isFetchingLibrary = true

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

        isFetchingLibrary = false
    })

    this.autorun(() => {
        if (isFetchingLibraryExtra || this.state.get("abilityLibraryExtra")) return

        isFetchingLibraryExtra = true

        // Fetch extra ability details that the server holds
        const currentInstanceRef = this
        Meteor.call("abilities.fetchLibraryExtra", function (err, data) {
            if (!err) {
                try {
                    currentInstanceRef.state.set("abilityLibraryExtra", data)
                } catch (err) {
                    console.log("abilities.fetchLibraryExtra() API error", err)
                }
            }
        })

        isFetchingLibraryExtra = false
    })

    //Meteor.setInterval(() => {
    //}, 250);
})

Template.selectAbilitiesPage.events({
    "click .back-to-loadout-btn"(event, instance) {
        instance.data.setPage("loadout")
    },

    "click .remove-all-abilities-btn"(event, instance) {
        Meteor.call("abilities.unequipAll")
    },

    "click .battle-nav-link"(event, instance) {
        console.log("battle nav link clicked")
        instance.data.setPage("loadout")
    }
})

Template.selectAbilitiesPage.helpers({
    availableTomes() {
        const myAbilities = Abilities.findOne()

        return Items.find({ category: "tome" })
            .fetch()
            .filter((item) => {
                // find what ability this tome teaches
                let abilityTaught = ITEMS[item.itemId].teaches.abilityId
                let abilityTaughtLevel = ITEMS[item.itemId].teaches.level

                // match against the ability in the player's learnt ability list if the player knows this level (or better)
                let matchingAbility = myAbilities.learntAbilities.filter((ability) => {
                    if (ability.abilityId === abilityTaught) {
                        if (ability.level >= abilityTaughtLevel) {
                            return true
                        }
                    }
                    return false
                })

                // if there's a match, filter this tome out -- we don't want to show it in the loadout -> abilities tab
                if (matchingAbility.length > 0) {
                    return false
                }

                // no match?  then allow the tome to be visible
                return true
            })
            .map((item) => {
                item.primaryAction = {
                    description: "learn",
                    item,
                    method() {
                        Meteor.call("abilities.learn", this.item._id, this.item.itemId, (err, res) => {
                            if (err) {
                                toastr.warning(err.reason)
                            } else {
                                toastr.success(`Successfully learnt ${item.name}`)
                            }
                        })
                    }
                }
                return item
            })
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

        // todo: fill this in with logic from 'abilityLibrary()' helper
        //const tempAbilities = abilityLibrary();
        const equippedMap = {}
        equippedAbilities.forEach((ability) => {
            if (ability && ability.slot && ability.abilityId) {
                equippedMap[ability.slot] = Object.assign({}, /*tempAbilities[ability.abilityId], */ ability)

                if (BUFFS && BUFFS[ability.abilityId]) {
                    if (_.isFunction(BUFFS[ability.abilityId]?.description)) {
                        equippedMap[ability.slot].description = BUFFS[ability.abilityId].description({
                            buff: BUFFS[ability.abilityId],
                            level: ability.level,
                            characterClass: userCurrentClass()
                        })
                    }
                }
            }
        })

        return equippedMap
    },

    abilityLibrary() {
        const instance = Template.instance()
        const myAbilities = Abilities.findOne({})

        const instanceToUse = instance.state.get("abilityLibraryExtra") // ? instance.state.get('abilityLibraryExtra') : instance.state.get('abilityLibrary');

        if (!instanceToUse || !myAbilities) {
            return []
        }

        let tempList = instanceToUse.map((ability) => {
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

                if (BUFFS && BUFFS[ability.id]) {
                    if (_.isFunction(BUFFS[ability.id]?.description)) {
                        ability.description = BUFFS[ability.id].description({
                            buff: BUFFS[ability.id],
                            level: learntAbility.level,
                            characterClass: userCurrentClass()
                        })
                    }
                }

                //ability.isMagic
                ability.isCompanion = ability.slot == "companion"
                ability.isClass = ability.isClass || ability.id.indexOf("class_") === 0
                if (BUFFS && BUFFS[ability.id]) {
                    console.log(BUFFS[ability.id])
                    ability.isCompanion = ability.isCompanion || BUFFS[ability.id].isCompanion
                }
                ability.isPassive = ability.isPassive && !ability.isMagic && !ability.isCompanion && !ability.isClass
                ability.isActive = !ability.isPassive && !ability.isMagic && !ability.isCompanion && !ability.isClass
            } else {
                ability.notLearnt = true

                if (BUFFS && BUFFS[ability.id]) {
                    if (_.isFunction(BUFFS[ability.id]?.description)) {
                        ability.description = BUFFS[ability.id].description({
                            buff: BUFFS[ability.id],
                            level: 1,
                            characterClass: userCurrentClass()
                        })
                    }
                }
            }

            return ability
        })

        tempList = _.sortBy(tempList, "name")
        tempList = _.sortBy(tempList, function (ability) {
            if (ability.slot === "companion") return 0 // companions first
            if (ability.isMagic) {
                if (ability.isPassive) return 15 // magical passives fourth
                return 20 // magical actives fifth
            }
            if (ability.isPassive) return 5 // passives second
            return 10 // actives third
        })
        //tempList = _.sortBy(tempList, "notLearnt")

        return {
            learnt: tempList.filter((list) => !list.notLearnt),
            learntActive: tempList.filter((list) => !list.notLearnt && list.isActive),
            learntPassive: tempList.filter((list) => !list.notLearnt && list.isPassive),
            learntClass: tempList.filter((list) => !list.notLearnt && list.isClass),
            learntSpells: tempList.filter((list) => !list.notLearnt && list.isMagic),
            learntCompanions: tempList.filter((list) => !list.notLearnt && list.isCompanion),
            notLearnt: tempList.filter((list) => list.notLearnt)
        }
    },

    classFeatureUnlocked() {
        return classFeatureUnlocked()
    },

    isTactician() {
        return userCurrentClass().equipped === "tactician"
    }
})
