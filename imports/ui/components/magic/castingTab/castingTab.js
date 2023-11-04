import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"
import { ReactiveMethod } from "meteor/simple:reactive-method"

import _ from "underscore"
import Numeral from "numeral"

import { Combat } from "/imports/api/combat/combat"
import { Items } from "/imports/api/items/items.js"
import { Skills } from "/imports/api/skills/skills.js"

import { autoPrecisionValue } from "/imports/utils.js"
import { determineRequiredItems } from "/imports/ui/utils.js"

import { BUFFS } from "/imports/constants/buffs/index.js"
import { ITEMS } from "/imports/constants/items/index.js"
import { MAGIC_TYPES } from "/imports/constants/magic/index.js"

import "./castingTab.html"

const convertItem = function (instance, selectedItem) {
    instance.$(".convertToReservesModal").modal("hide")

    const itemConsts = ITEMS[selectedItem.itemId]
    const itemAmount = instance.state.get("convertAmount")
    const itemName = itemConsts.name + ((itemAmount == 1) ? "" : "s")

    Meteor.call("items.convertCastingItem", selectedItem._id, selectedItem.itemId, itemAmount, (err, res) => {
        if (err) {
            toastr.warning(err.reason)
        } else {
            toastr.success(`You converted ${itemAmount} ${itemName} into your reserves`)
        }
    })
}

const updateReserveHTML = function (instance) {
    const currentAmount = Math.max(0, parseInt(instance.$(".convert-amount-input").val()))
    
    if (instance) {
        const selectedItem = instance.state.get("selectedItem")
        if (selectedItem) {
            if (currentAmount <= 0) {
                instance.$("#modalConvertToReservesGain").html("")
            } else {
                instance.$("#modalConvertToReservesGain").html(`+${currentAmount * selectedItem.magicValue.unitValue} <img src="/icons/${selectedItem.magic.icon}" class="tiny-icon" style="margin-top: -4px" />${selectedItem.magic.unitName} reserve`)
            }
        }
    }
}

Template.castingTab.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    Meteor.subscribe("astronomy")
    Meteor.subscribe("combat")
})

Template.castingTab.events({
    "submit .convert-form"(event, instance) {
        const localInstance = Template.instance()
        if (localInstance) {
            const selectedItem = localInstance.state.get("selectedItem")
            if (selectedItem) {
                convertItem(localInstance, selectedItem)
            }
        }
    },

    "keyup .convert-amount-input"(event, instance) {
        const localInstance = Template.instance()
        if (localInstance) {
            const selectedItem = localInstance.state.get("selectedItem")
            if (selectedItem) {
                let newValue = parseInt($(event.target).val())
                if (newValue && !isNaN(newValue)) {
                    if (newValue > selectedItem.amount) {
                        newValue = selectedItem.amount
                    }
                    localInstance.state.set("convertAmount", parseInt(newValue))
                    $(event.target).val(parseInt(newValue).toFixed(0))
                    updateReserveHTML(localInstance)
                }
            }
        }
    },

    "click .convert-btn"(event, instance) {
        const localInstance = Template.instance()
        if (localInstance) {
            const selectedItem = localInstance.state.get("selectedItem")
            if (selectedItem) {
                convertItem(localInstance, selectedItem)
            }
        }
    }
})

Template.castingTab.helpers({
    
    magicSkill() {
        return Skills.findOne({ type: "magic" })
    },

    items() {
        const instance = Template.instance()

        return Items.find({ category: "astronomy" })
            .map((item) => {
                const itemConsts = ITEMS[item.itemId]
                let magicConst
                if (itemConsts && itemConsts.magic) {
                    magicConst = MAGIC_TYPES[itemConsts.magic.type]
                }
                
                const itemSubData = Object.assign
                (
                    {},
                    item,
                    {
                        magicValue: itemConsts.magic,
                        magic: magicConst
                    }
                )

                const itemFullData = Object.assign
                    (
                        {},
                        itemSubData,
                        {
                            primaryAction: {
                                description: "Convert To Reserves",
                                method() {
                                    const amountToSuggest = Math.max(0, parseInt(Math.ceil(item.amount / 2)))
                                    instance.state.set("selectedItem", itemSubData)
                                    instance.state.set("convertAmount", parseInt(amountToSuggest))
                                    setTimeout(() => {
                                        instance.$(".convertToReservesModal").modal("show")
                                        instance.$(".convert-amount-input").val(amountToSuggest.toFixed(0))
                                        instance.$(".convert-amount-input").focus()
                                        updateReserveHTML(instance)
                                    })
                                }
                            }
                        }
                    )

                return itemFullData
            })
            .sort((item1, item2) => {
                const itemConsts1 = ITEMS[item1.itemId]
                const itemConsts2 = ITEMS[item2.itemId]

                if (itemConsts1.sellPrice != itemConsts2.sellPrice) {
                    return itemConsts1.sellPrice > itemConsts2.sellPrice ? -1 : 1
                }

                return itemConsts1.name < itemConsts2.name ? -1 : 1
            })
    },

    castingPool() {
        const combatDoc = Combat.findOne({})
        const magicDoc = Skills.findOne({ type: "magic" })

        if (combatDoc && magicDoc) {
            const typeData = Object.freeze(Object.keys(MAGIC_TYPES).map((key) => {
                
                return Object.assign
                (
                    {},
                    MAGIC_TYPES[key],
                    {
                        type: key,
                        regeneration: (magicDoc.level || 0) * 2,
                        pool: combatDoc.stats.magicPools || 0,
                        reserve: combatDoc.stats[`${key}Reserve`] || 0
                    }
                )
            }))

            return typeData
        }
        return false
    }
})
