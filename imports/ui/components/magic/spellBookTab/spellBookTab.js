import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"
import { ReactiveMethod } from "meteor/simple:reactive-method"

import _ from "underscore"
import Numeral from "numeral"

import { Abilities } from "/imports/api/abilities/abilities.js"
import { Combat } from "/imports/api/combat/combat.js"
import { Skills } from "/imports/api/skills/skills.js"

import { autoPrecisionValue } from "/imports/utils.js"
import { determineRequiredItems } from "/imports/ui/utils.js"

import { BUFFS } from "/imports/constants/buffs/index.js"
import { MAGIC_TYPES } from "/imports/constants/magic/index.js"

import "./spellBookTab.html"
import { User } from "discord.js"

Template.spellBookTab.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
    const anAbility = Abilities.findOne()

    this.autorun(() => {
        const results = ReactiveMethod.call("abilities.fetchSpells", anAbility)

        if (results) {
            this.state.set("spellList", results)
        }
    })
})

Template.spellBookTab.helpers({
    requiredCosts() {
        const required = this.required
        const costs = this.costs
        return Object.keys(costs).map((key) => { return Object.assign({}, { type: key, items: required }, costs[key]) })
    },

    totalCastXp() {
        const costs = this.costs

        let total = 0
        Object.keys(costs).map((key) => { return Object.assign({}, { type: key }, costs[key]) }).forEach(function(element) {
            if (element.type && element.xp) {
                total += element.xp
            }
        })

        return total
    },

    requiredCost() {
        const combatDoc = Combat.findOne({ owner: Meteor.userId() })

        let costMultiplier = 1
        if (combatDoc && combatDoc.stats) {
            costMultiplier = Math.max(1, combatDoc.stats.magicPower / 30)
        }

        if (this.type && this.cost && this.items) {
            const thisType = this.type

            if (this.cost.units > 0 && MAGIC_TYPES[thisType]) {
                /*
                const thisTypeToItem = thisType.replace("necrotic", "poison")
                let itemIcons = ""
                this.items.forEach(function(itemRequirement) {
                    //console.log(itemRequirement)
                    if (itemRequirement.itemId.indexOf(`${thisTypeToItem}_`) !== -1) {
                        if (itemRequirement.amount > 1) {
                            itemIcons += `<img src="/icons/${itemRequirement.icon}" class="tiny-icon" /><sup>x${itemRequirement.amount}</sup>`
                        } else {
                            itemIcons += `<img src="/icons/${itemRequirement.icon}" class="tiny-icon" />`
                        }
                    }
                })
                return `${this.cost.units} ${MAGIC_TYPES[this.type].unitName} <span class="text-muted">(${itemIcons})</span>&nbsp; &nbsp; `
                */

                return `<span style="display: inline-block">${Numeral(this.cost.units * costMultiplier).format("0,0")}<span class="hide-on-mobile"> ${MAGIC_TYPES[this.type].unitName} </span><img src="/icons/${MAGIC_TYPES[this.type].icon}" class="extra-small-icon" style="margin-top: -6px" />&nbsp; <span class="hide-on-mobile>&nbsp; </span></span>`
            }
        }
        return false
    },

    magicSkill() {
        return Skills.findOne({ type: "magic" })
    },

    spellList() {
        const instance = Template.instance()
        return instance.state.get("spellList")
    }
})
