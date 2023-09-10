import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import { determineRequiredItems } from "/imports/ui/utils.js"

import _ from "underscore"
import { Abilities } from "/imports/api/abilities/abilities.js"

import { BUFFS } from "/imports/constants/buffs/index.js"

import "./spellBookTab.html"

Template.spellBookTab.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
    const anAbility = Abilities.findOne()

    this.autorun(() => {
        const results = ReactiveMethod.call("abilities.fetchSpellCrafting", anAbility)

        if (results) {
            this.state.set("spellCrafting", results)
        }
    })
})

Template.spellBookTab.events({
    "keyup .craft-amount-input"(event, instance) {
        let newValue = parseInt($(event.target).val())
        if (newValue && !isNaN(newValue)) {
            if (newValue > instance.state.get("maxCraftableAmount")) {
                newValue = instance.state.get("maxCraftableAmount")
            }
            instance.state.set("craftAmount", newValue)
        }
    },

    "submit .craft-amount-form"(event, instance) {
        event.preventDefault()

        const abilityId = instance.state.get("multiCraftAbilityId")
        const amountToCraft = instance.state.get("craftAmount")

        const spellCrafting = instance.state.get("spellCrafting")
        const spellConstants = _.findWhere(spellCrafting, { abilityId })

        instance.$(".multiCraftModal").modal("hide")
        Meteor.call("abilities.craftSpell", abilityId, amountToCraft, (err) => {
            if (err) {
                toastr.warning(err.reason)
            } else {
                toastr.success(`Crafted ${spellConstants.name}`)
            }
        })
    },

    "click .craft-btn"(event, instance) {
        const abilityId = instance.state.get("multiCraftAbilityId")
        const amountToCraft = parseInt($(event.target).closest(".craft-btn")[0].getAttribute("data-amount"))

        const spellCrafting = instance.state.get("spellCrafting")
        const spellConstants = _.findWhere(spellCrafting, { abilityId })
        instance.$(".multiCraftModal").modal("hide")

        Meteor.call("abilities.craftSpell", abilityId, amountToCraft, (err) => {
            if (err) {
                toastr.warning(err.reason)
            } else {
                toastr.success(`Crafting ${spellConstants.name}`)
            }
        })
    },

    "click .craft-spell"(event, instance) {
        const abilityId = $(event.target).closest(".craft-spell")[0].getAttribute("data-spell")
        const spellCrafting = instance.state.get("spellCrafting")

        const spellConstants = _.findWhere(spellCrafting, { abilityId })

        let { maxCraftable, notMet } = determineRequiredItems(spellConstants)

        if (notMet) {
            return toastr.warning("Not enough resources to craft")
        }

        if (spellConstants.maxToCraft > 1) {
            instance.state.set("maxCraftableAmount", maxCraftable)
            instance.state.set("maxCraftAmount", 10000)
            instance.state.set("craftAmount", Math.ceil(maxCraftable / 2))
            instance.state.set("multiCraftAbilityId", abilityId)
            instance.$(".multiCraftModal").modal("show")
            instance.$(".craft-amount-input").focus()
        }
    }
})

Template.spellBookTab.helpers({
    spellCrafting() {
        const instance = Template.instance()
        return instance.state.get("spellCrafting")
    },

    abilityLibrary() {
        const instance = Template.instance()
        const myAbilities = Abilities.findOne({})

        if (!instance.state.get("abilityLibrary") || !myAbilities) {
            return []
        }

        return instance.state
            .get("abilityLibrary")
            .map((ability) => {
                ability.primaryAction = {}

                const targetAbility = _.findWhere(myAbilities.learntAbilities, { abilityId: ability.id })
                if (targetAbility) {
                    ability.notLearnt = false
                    if (BUFFS && BUFFS[ability.id]) {
                        ability.scaledCooldown = BUFFS[ability.id].scaledCooldown
                    }
                    ability.isSpell = targetAbility.isSpell
                    ability.casts = targetAbility.casts
                    ability.primaryAction = {
                        description: "equip",
                        ability,
                        method() {
                            Meteor.call("abilities.equip", this.ability.id)
                        }
                    }
                } else {
                    ability.notLearnt = true
                }

                return ability
            })
            .filter((ability) => {
                return ability.isSpell
            })
    },

    maxCraftAmount() {
        return Template.instance().state.get("maxCraftAmount")
    },

    craftAmount() {
        return Template.instance().state.get("craftAmount")
    },

    maxCraftableAmount() {
        return Template.instance().state.get("maxCraftableAmount")
    }
})
