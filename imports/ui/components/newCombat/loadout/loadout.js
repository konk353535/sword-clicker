import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import { Abilities } from "/imports/api/abilities/abilities.js"
import { Combat } from "/imports/api/combat/combat.js"
import { Items } from "/imports/api/items/items.js"

import { getAvailablePlayerIcons } from "/imports/constants/shop/index.js"

import "./loadout.html"

let isFetchingLibrary = false

Template.loadoutPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

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
    "click .continue-btn"(event, instance) {
        instance.data.setPage("lobby")
    },

    "click .edit-gear-btn"(event, instance) {
        instance.data.setPage("selectGear")
    },

    "click .edit-abilities-btn"(event, instance) {
        instance.data.setPage("selectAbilities")
    }
})

Template.loadoutPage.helpers({
    equippedItemsMap() {
        const equippedItems = Items.find({
            category: "combat",
            equipped: true
        }).map((item) => {
            item.hideCount = true
            item.primaryAction = {}
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
            return ability.equipped
        })

        const equippedMap = {}
        equippedAbilities.forEach((item) => {
            equippedMap[item.slot] = item
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
