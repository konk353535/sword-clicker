import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import { Abilities } from "/imports/api/abilities/abilities.js"
import { userCurrentClass } from "/imports/api/classes/classes.js"
import { Combat } from "/imports/api/combat/combat.js"
import { Items } from "/imports/api/items/items.js"
import { classFeatureUnlocked } from "/imports/api/users/users.js"

import { getAvailablePlayerIcons } from "/imports/constants/shop/index.js"

import { BUFFS } from "/imports/constants/buffs/index.js"
import { CLASSES } from "/imports/constants/classes/index.js"

import "./loadout.html"
import moment from "moment"

let isFetchingLibrary = false

Template.loadoutPage.onCreated(function bodyOnCreated() {
    this.intervalRotation = 0
    this.state = new ReactiveDict()

    Meteor.call("classes.getCurrentClass", Meteor.userId(), (err, res) => {
        this.state.set("currentClass", res?.equipped)
        this.state.set("currentClassCooldown", res?.cooldown)
        this.state.set("companionTokenCount", 0)

        $(".reset-cooldown-btn").prop("disabled", "disabled")

        const stateRef = this.state

        const checkCooldownResetTokens = function() {
            let resetTokenCount = 0

            const itemDoc = Items.findOne({ itemId: "class_cooldown_reset_token" })
            if (itemDoc && itemDoc.amount) {
                resetTokenCount = itemDoc.amount
            }

            stateRef.set("companionTokenCount", resetTokenCount)
            
            let playerHasCooldown = false
            const classChangeCooldown = stateRef.get("currentClassCooldown")
            if (classChangeCooldown) {
                if (moment().isBefore(classChangeCooldown)) {
                    playerHasCooldown = true
                }
            }
            
            $(".reset-cooldown-btn").prop("disabled", (playerHasCooldown && resetTokenCount > 0) ? "" : "disabled")
        }
        
        Meteor.setInterval(() => {
            const classChangeCooldown = this.state.get("currentClassCooldown")
    
            if (classChangeCooldown) {
                if (moment().isAfter(classChangeCooldown)) {
                    // simulate new data to trigger the reactive variable
                    this.state.set("currentClassCooldown", false)
                }
            }

            if (++this.intervalRotation > 5) {
                this.intervalRotation = 1

                const instRef = this

                Meteor.call("classes.getCurrentClass", Meteor.userId(), (err, res) => {
                    instRef.state.set("currentClassCooldown", res.cooldown)

                    checkCooldownResetTokens()
                })
            }
        }, 1000)

        checkCooldownResetTokens()
    })

    this.autorun(() => {
        if (isFetchingLibrary || this.state.get("abilityLibrary")) return

        isFetchingLibrary = true

        const anAbility = Abilities.findOne()
        // Pass ability so when a new abilitiy is learnt this is reactive
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
})

Template.loadoutPage.events({
    "click .back-to-lobby-btn"(event, instance) {
        instance.data.setPage("lobby")
    },

    "click .view-classes-btn"(event, instance) {
        instance.data.setPage("viewClasses")
    },

    "click .edit-gear-btn"(event, instance) {
        instance.data.setPage("selectGear")
    },

    "click .edit-abilities-btn"(event, instance) {
        instance.data.setPage("selectAbilities")
    },

    "click .remove-all-gear-btn"(event, instance) {
        Meteor.call("items.unequipAllCombat")
    },

    "click .remove-all-abilities-btn"(event, instance) {
        Meteor.call("abilities.unequipAll")
    },

    "click .reset-cooldown-btn"(event, instance) {
        $(event.target).addClass("reset-cooldown-confirm-btn btn-danger")
        $(event.target).removeClass("reset-cooldown-btn btn-warning")
        $(event.target).html(`Confirm reset? <img src="/icons/classCooldownResetToken.svg" style="width: 20px; height: 20px; margin-top: -4px;">${instance.state.get("companionTokenCount")}`)
    },

    "click .reset-cooldown-confirm-btn"(event, instance) {
        const companionTokenCount = instance.state.get("companionTokenCount")

        Meteor.call("items.findAndConsume", Meteor.userId(), "class_cooldown_reset_token", function(err, res) {
            if (!err) {
                if (res.message) {
                    toastr.warning(res.message)
                    return
                }

                if (res.success) {
                    toastr.success(res.success)
                    $(event.target).html(`Reset cooldown <img src="/icons/classCooldownResetToken.svg" style="width: 20px; height: 20px; margin-top: -4px;">${companionTokenCount-1}`)
                    return
                }
            }

            toastr.error("An unexpected error occurred during the attempt.")
        })

        $(event.target).addClass("reset-cooldown-btn btn-warning")
        $(event.target).removeClass("reset-cooldown-confirm-btn btn-danger")
        $(event.target).html(`Reset cooldown <img src="/icons/classCooldownResetToken.svg" style="width: 20px; height: 20px; margin-top: -4px;">${instance.state.get("companionTokenCount")}`)
        $(event.target).prop("disabled", "disabled")
    },

    "click .select-class"(event, instance) {
        const newClass = instance.$(event.target).closest(".select-class").data("class")
        const existingClass = instance.state.get("currentClass")

        if (existingClass == newClass) {
            toastr.warning(`You are already a ${CLASSES.lookup(existingClass).name}!`)
            return
        }
        
        const classChangeCooldown = instance.state.get("currentClassCooldown")
        if (classChangeCooldown) {
            if (moment().isBefore(classChangeCooldown)) {
                toastr.warning("You are still on class change cooldown.")
                return
            }
        }        

        instance.state.set("classChangeSelection", newClass)
        Template.instance().$(".classSelectionConfirm").modal("show")
    },

    "click .chance-class-confirm-btn"(event, instance) {
        Template.instance().$(".classSelectionConfirm").modal("hide")

        const existingClass = instance.state.get("currentClass")
        const newClass = instance.state.get("classChangeSelection")

        if (existingClass == newClass) {
            toastr.warning(`You are already a ${CLASSES.lookup(existingClass).name}!`)
            return
        }

        Meteor.call("classes.equipClass", Meteor.userId(), newClass, (err, res) => {
            if (typeof err === "undefined") {
                if (res?.equipped) {
                    instance.state.set("currentClass", newClass)
                    Meteor.call("classes.getCurrentClass", Meteor.userId(), (err, res) => {
                        instance.state.set("currentClassCooldown", res.cooldown)
                    })
                    toastr.success("You have changed your active class!")
                } else if (res?.reason?.length > 0) {
                    toastr.warning(res.reason)
                }
            }
        })
    }
})

Template.loadoutPage.helpers({
    equippedItemsMap() {
        const instance = Template.instance()
        const equippedItems = Items.find({
            category: "combat",
            equipped: true
        }).map((item) => {
            item.hideCount = true
            item.primaryAction = {
                description: "edit gear loadout",
                item,
                method() {
                    instance.data.setPage("selectGear")
                }
            }
            return item
        })

        const equippedMap = {}
        equippedItems.forEach((item) => {
            equippedMap[item.slot] = item
        })

        return equippedMap
    },

    equippedAbilitiesMap() {
        const myAbilities = Abilities.findOne()
        if (!myAbilities) {
            return
        }

        const equippedAbilities = myAbilities.learntAbilities.filter((ability) => {
            const instance = Template.instance()
            ability.primaryAction = {
                description: "edit ability loadout",
                ability,
                method() {
                    instance.data.setPage("selectAbilities")
                }
            }

            return ability.equipped
        })

        const equippedMap = {}
        equippedAbilities.forEach((ability) => {
            equippedMap[ability.slot] = ability

            if (BUFFS && BUFFS[ability.abilityId]) {
                if (_.isFunction(BUFFS[ability.abilityId]?.description)) {
                    equippedMap[ability.slot].description = BUFFS[ability.abilityId].description({
                        buff: BUFFS[ability.abilityId],
                        level: ability.level,
                        characterClass: userCurrentClass()
                    })
                }
            }
        })

        return equippedMap
    },

    skinsLibrary() {
        const myCombat = Combat.findOne({
            owner: Meteor.userId()
        })

        if (!myCombat) {
            return []
        }

        const availablePlayerIcons = getAvailablePlayerIcons(myCombat)

        return Object.keys(availablePlayerIcons.playerIconsConsts).map((key) => {
            let disabled = true
            let selected = false
            if (_.contains(availablePlayerIcons.availableIcons, key)) {
                disabled = false
            }

            if (myCombat.characterIcon === availablePlayerIcons.playerIconsConsts[key].icon) {
                selected = true
            }

            return Object.assign({}, availablePlayerIcons.playerIconsConsts[key], {
                selected,
                disabled,
                id: key
            })
        })
    },

    currentClass() {
        return CLASSES.lookup(Template.instance().state.get("currentClass")).name
    },

    currentClassIcon() {
        return CLASSES.lookup(Template.instance().state.get("currentClass")).icon
    },

    classFeatureUnlocked() {
        return classFeatureUnlocked()
    },
    
    isTactician() {
        return userCurrentClass().equipped === 'tactician'
    },

    classChangeSelectionChoice() {
        return CLASSES.lookup(Template.instance().state.get("classChangeSelection")).name
    },

    classChangeSelectionChoiceIcon() {
        return CLASSES.lookup(Template.instance().state.get("classChangeSelection")).icon
    },

    classChangeCooldown() {
        const classChangeCooldown = Template.instance().state.get("currentClassCooldown")
        if (classChangeCooldown) {
            if (moment().isBefore(classChangeCooldown)) {
                return classChangeCooldown
            }
        }
        return undefined
    },

    classChangeCooldownStyle() {
        const classChangeCooldown = Template.instance().state.get("currentClassCooldown")
        if (classChangeCooldown) {
            if (moment().isBefore(classChangeCooldown)) {
                return ""
            }
        }
        return "element-hider"
    },

    resetTokenCount() {
        const itemDoc = Items.findOne({ itemId: "class_cooldown_reset_token" })
        if (itemDoc && itemDoc.amount) {
            return itemDoc.amount
        }
        return 0
    }
})

Template.skinLibraryIcon.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.skinLibraryIcon.events({
    click(event, instance) {
        Meteor.call("combat.updateCharacterIcon", instance.data.skin.id, (err, res) => {
            if (err) {
                toastr.warning(err.reason)
            }
        })
    }
})

Template.skinLibraryIcon.rendered = function () {
    const buffTooltip = new Drop({
        target: Template.instance().$(".icon-box")[0],
        content: Template.instance().$(".skin-tooltip-content")[0],
        openOn: "hover",
        position: "top left",
        remove: true
    })
}

Template.skinLibraryIcon.helpers({
    description() {
        // Generate subscription
        let description = "No requirements to equip this skin"

        const skin = Template.instance().data.skin
        if (skin.requiredEquip) {
            description = skin.requiredEquip
                .map((equip) => {
                    return `Requires level ${equip.level} ${equip.name}`
                })
                .join("<br/>")
        }

        return description
    }
})
