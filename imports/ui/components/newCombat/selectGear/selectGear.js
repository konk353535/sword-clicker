import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import { Combat } from "/imports/api/combat/combat.js"
import { Items } from "/imports/api/items/items.js"

import "./selectGear.html"

Template.selectGearPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.selectGearPage.events({
    "click .back-to-loadout-btn"(event, instance) {
        instance.data.setPage("loadout")
    },

    "click .remove-all-gear-btn"(event, instance) {
        Meteor.call("items.unequipAllCombat")
    }
})

Template.selectGearPage.helpers({
    offenseStats() {
        const combat = Combat.findOne({
            owner: Meteor.userId()
        })
        if (!combat) {
            Template.instance().state.set("offenseStats", [])
        } else {
            Template.instance().state.set("offenseStats", [
                {
                    name: "attack",
                    icon: "basicDamage.svg",
                    value: combat.stats.attack,
                    maxValue: combat.stats.attackMax,
                    tooltipTitle: "Attack",
                    tooltipContent: "Your base range of damage, before the enemy's armor and absorption reductions."
                },
                {
                    name: "attack speed",
                    icon: "attackSpeed.svg",
                    value: combat.stats.attackSpeed,
                    tooltipTitle: "Attack Speed",
                    tooltipContent: "How fast your auto-attack occurs in combat rated in attacks-per-second."
                },
                {
                    name: "critical chance",
                    icon: "criticalChance2.svg",
                    value: combat.stats.criticalChance,
                    tooltipTitle: "Critical Chance",
                    tooltipContent: "Your chance for auto-attacks to deal extra damage.  Chance over 100% adds more multipliers to Critical Damage."
                },
                {
                    name: "critical damage",
                    icon: "criticalDamage.svg",
                    value: combat.stats.criticalDamage,
                    tooltipTitle: "Critical Damage",
                    tooltipContent: "The amount of damage bonus you deal when an auto-attack is critical."
                }                
            ])
        }

        return Template.instance().state.get("offenseStats")
    },

    offenseStats2() {
        const combat = Combat.findOne({
            owner: Meteor.userId()
        })
        if (!combat) {
            Template.instance().state.set("offenseStats2", [])
        } else {
            Template.instance().state.set("offenseStats2", [
                {
                    name: "accuracy",
                    icon: "accuracy.svg",
                    value: combat.stats.accuracy,
                    tooltipTitle: "Accuracy",
                    tooltipContent: "Your accuracy is a contested measure versus your enemy's defense.  The more accuracy you have versus your target's defense, the more likely you are to hit with an auto-attack instead of miss."
                },
                {
                    name: "force",
                    icon: "force.svg",
                    value: combat.stats.force,
                    tooltipTitle: "Force",
                    tooltipContent: "Your chance to completely ignore an enemy's defense rating, forcing your auto-attack to otherwise hit your target regardless."
                },
                {
                    name: "shred",
                    icon: "shred.svg",
                    value: combat.stats.shred,
                    tooltipTitle: "Shred",
                    tooltipContent: "Your shred is a measure of your armor bypass, letting you ignore some of your enemy's armor when dealing physical damage."
                },
                {
                    name: "magic armor",
                    icon: "magicArmor.svg",
                    value: combat.stats.magicArmor,
                    tooltipTitle: "Armor (Magical)",
                    tooltipContent: "Magical armor reduces damage from any magic attack.  The amount of magic armor you have gives you diminishing returns the more you have, although enemies can ignore some of your armor with Focus."
                }
            ])
        }

        return Template.instance().state.get("offenseStats2")
    },

    defenseStats() {
        const combat = Combat.findOne({
            owner: Meteor.userId()
        })
        if (!combat) {
            Template.instance().state.set("defenseStats", [])
        } else {
            Template.instance().state.set("defenseStats", [
                {
                    name: "health",
                    icon: "healthMax.svg",
                    value: combat.stats.health,
                    maxValue: combat.stats.healthMax,
                    tooltipTitle: "Health",
                    tooltipContent: "Your total amount of hit points.  You die when this reaches zero in battle."
                },
                {
                    name: "defense",
                    icon: "defense.svg",
                    value: combat.stats.defense,
                    tooltipTitle: "Defense",
                    tooltipContent: "Your defense is a contested measure versus your enemy's accuracy.  The more defense you have versus your target's accuracy, the more likely you are to dodge an enemy auto-attack."
                },
                {
                    name: "armor",
                    icon: "armor.svg",
                    value: combat.stats.armor,
                    tooltipTitle: "Armor (Physical)",
                    tooltipContent: "Physical armor reduces damage from any physical attack.  The amount of armor you have gives you diminishing returns the more you have, although enemies can ignore some of your armor with Shred."
                },
                {
                    name: "absorption",
                    icon: "absorption.svg",
                    value: combat.stats.absorption * 100.0,
                    tooltipTitle: "Absorption",
                    tooltipContent: "After reducing damage you take from your armor or magic armor, you will further reduce any remaining damage by a percent equal to your absorption."
                }
            ])
        }

        return Template.instance().state.get("defenseStats")
    },

    magicStats() {
        const combat = Combat.findOne({
            owner: Meteor.userId()
        })
        if (!combat) {
            Template.instance().state.set("magicStats", [])
        } else {
            Template.instance().state.set("magicStats", [
                {
                    name: "magic power",
                    icon: "basicDamageMagic.svg",
                    value: combat.stats.magicPower,
                    tooltipTitle: "Magic Power",
                    tooltipContent: "The strength of your magic damage and effects is directly related to your magic power.  Each ability and effect should indicate in what way Magic Power (MP) affects the strength of the spell."
                },
                {
                    name: "magic pool",
                    icon: "magicPool.svg",
                    value: combat.stats.magicPools,
                    tooltipTitle: "Magic Pools",
                    tooltipContent: "The total size of each of your magic pools when you enter battle.  Magic pools will slowly regenerate from magic reserves during battle and are supplied by your astronomy crystals."
                },
                {
                    name: "focus",
                    icon: "focus.svg",
                    value: combat.stats.focus,
                    tooltipTitle: "Focus",
                    tooltipContent: "Your focus is a measure of your magic armor bypass, letting you ignore some of your enemy's magic armor when dealing magic damage."
                },
                {
                    name: "healing power",
                    icon: "healingPower.svg",
                    value: combat.stats.healingPower,
                    tooltipTitle: "Healing Power",
                    tooltipContent: "Amplifies the strength of any healing effect, ability, or spell by a percent equal to your healing power."
                }
            ])
        }

        return Template.instance().state.get("magicStats")
    },

    slotsMap() {
        const slots = ["mainHand", "offHand", "head", "neck", "chest", "legs"]
        const slotsMap = {}

        slots.forEach((slot) => {
            slotsMap[slot] = Items.find({ category: "combat", slot, equipped: false })
                .fetch()
                .filter((item) => {
                    if (item.hidden) return false
                    return true
                })
                .map((item) => {
                    item.primaryAction = {
                        description: "equip",
                        item,
                        method() {
                            Meteor.call("items.equip", this.item._id, this.item.itemId, (err, res) => {
                                if (err) {
                                    toastr.warning(err.reason)
                                }
                            })
                        }
                    }
                    return item
                })
        })

        return slotsMap
    },

    equippedItemsMap() {
        const equippedItems = Items.find({
            category: "combat",
            equipped: true
        }).map((item) => {
            item.hideCount = true
            item.primaryAction = {
                description: "unequip",
                item,
                method() {
                    Meteor.call("items.unequip", this.item._id, this.item.itemId, (err, res) => {
                        if (err) {
                            toastr.error(err.reason)
                        }
                    })
                }
            }
            return item
        })

        const equippedMap = {}
        equippedItems.forEach((item) => {
            equippedMap[item.slot] = item
        })

        return equippedMap
    }
})
