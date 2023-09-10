import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import { Items } from "/imports/api/items/items.js"
import { Skills } from "/imports/api/skills/skills.js"
import { Woodcutting } from "/imports/api/woodcutting/woodcutting.js"

import { autoPrecisionValue } from "../../utils.js"
import { getBuffLevel } from "/imports/api/globalbuffs/globalbuffs.js"
import { ITEMS } from "/imports/constants/items/index.js"
import { DONATORS_BENEFITS } from "/imports/constants/shop/index.js"

import "./woodcutting.html"

let woodcuttingPageTimer

Template.woodcuttingPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
    this.state.set("hasLearnRequirements", false)

    // Show woodcutting
    Meteor.subscribe("woodcutting")

    woodcuttingPageTimer = Meteor.setInterval(function () {
        if (Meteor.user()) {
            Meteor.call("woodcutting.gameUpdate")
        }
    }, 10000)

    Meteor.call("woodcutting.gameUpdate", (err, res) => {
        this.autorun(() => {
            // Only called when skills have loaded
            if (Skills.findOne()) {
                const woodcuttingSkill = Skills.findOne({ type: "woodcutting" })

                if (!woodcuttingSkill) {
                    Meteor.call("skills.requirements", "woodcutting", (err, res) => {
                        this.state.set("learnRequirements", res)
                    })
                }
            }
        })
    })
})

Template.woodcuttingPage.onDestroyed(function bodyOnDestroyed() {
    Meteor.clearInterval(woodcuttingPageTimer)
})

Template.woodcuttingPage.events({
    "click .learn-now"(event, instance) {
        Meteor.call("skills.learnSkill", "woodcutting")
    },

    "click .buy-woodcutter"(event, instance) {
        Template.instance().$(".woodcuttersModal").modal("show")
    },

    "click .confirm-fire-btn"(event, instance) {
        Meteor.call("woodcutting.fireWoodcutter", instance.state.get("firingWoodcutterIndex"))
        instance.$(".fireModal").modal("hide")
    },

    "click .craft-row"(event, instance) {
        const woodcutterId = instance.$(event.target).closest(".craft-row").data("recipe")

        Meteor.call("woodcutting.hireWoodcutter", woodcutterId)
    }
})

Template.woodcuttingPage.helpers({
    woodcuttingSkill() {
        return Skills.findOne({ type: "woodcutting" })
    },

    woodcutting() {
        const woodcutting = Woodcutting.findOne()
        const instance = Template.instance()
        if (!woodcutting) {
            return
        }

        const userDoc = Meteor.user()
        const hasMiningUpgrade = userDoc.woodcuttingUpgradeTo && moment().isBefore(userDoc.woodcuttingUpgradeTo)

        woodcutting.woodcutters.forEach((woodcutter, woodcutterIndex) => {
            if (!/.png/.test(woodcutter.icon) && !/.svg/.test(woodcutter.icon)) {
                woodcutter.icon += ".svg"
            }

            let woodcutterAttack = woodcutter.stats.attack
            let woodcutterAttackSpeed = woodcutter.stats.attackSpeed

            // attack bonus is 0 (no bonus tiers)
            let woodcutterAttackModifier = 0

            // attack speed modifier is 100%
            let woodcutterAttackSpeedModifier = 1

            // get lumber yard buff level
            const townBuffLumberYardLevel = getBuffLevel("town_lumber_yard")

            // add bonus attack modifier of 0-20 (0-4 tiers) depending on if town lumber yard buff (karma) is active and at what strength
            if (townBuffLumberYardLevel > 1) {
                woodcutterAttackModifier += (townBuffLumberYardLevel - 1) * 5 // 5-20 (1-4 tiers) starting at buff level 2
            }

            // add bonus attack speed modifier of 0-15% depending on if town lumber yard buff (karma) is active and at what strength
            if (townBuffLumberYardLevel > 0) {
                woodcutterAttackSpeedModifier += (townBuffLumberYardLevel + 1) * 0.025 // 5% min, 2.5% per buff level (5% - 15%)
            }

            // Incoming hacks!
            woodcutter.description = `
        <div class="d-flex align-items-center">
          <i class="lilIcon-attack extra-small-icon mr-1"></i>
          ${autoPrecisionValue(woodcutter.stats.attack + woodcutterAttackModifier)}
        </div>
        <div class="d-flex align-items-center">
          <i class="lilIcon-attackSpeed extra-small-icon mr-1"></i>
          ${autoPrecisionValue(woodcutterAttackSpeed * woodcutterAttackSpeedModifier)}
        </div>
      `

            // Append to description based on if the user is currently a member
            if (hasMiningUpgrade) {
                let computedBonus = 20 + (DONATORS_BENEFITS.woodcuttingBonus / 100) * woodcutter.stats.accuracy
                woodcutter.description += `
          <div class="d-flex align-items-center">
            <i class="lilIcon-accuracy extra-small-icon mr-1"></i>
            ${autoPrecisionValue(woodcutter.stats.accuracy)}&nbsp;+&nbsp;
            <span class='text-primary'>${autoPrecisionValue(computedBonus)}</span>
          </div>
        `
            } else {
                woodcutter.description += `
          <div class="d-flex align-items-center">
            <i class="lilIcon-accuracy extra-small-icon mr-1"></i>
            ${autoPrecisionValue(woodcutter.stats.accuracy)}
          </div>
        `
            }

            woodcutter.hideStats = true

            woodcutter.primaryAction = {
                description: "activate Retirement Glory",
                method() {
                    instance.state.set("firingWoodcutterIndex", woodcutterIndex)
                    instance.$(".fireModal").modal("show")
                }
            }
        })
        return woodcutting
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
    },

    woodcutterStatContent() {
        return `
      <p>
        <div class="d-flex align-items-center">
          <i class="lilIcon-attack extra-small-icon mr-1"></i><b>Attack</b>
        </div>
        Determines the rarest wood a woodcutter can chop.
      </p>
      <p>
        <div class="d-flex align-items-center">
          <i class="lilIcon-attackSpeed extra-small-icon mr-1"></i><b>Speed</b>
        </div>
        How many times a minute the woodcutter will chop wood.
      </p>
      <p>
        <div class="d-flex align-items-center">
          <i class="lilIcon-accuracy extra-small-icon mr-1"></i><b>Accuracy</b>
        </div>
        Increases the chance of getting rarer logs as well as increasing the
        quantity of more basic logs.
      </p>
    `
    },

    buyableWoodcutters() {
        const woodcuttingSkill = Skills.findOne({ type: "woodcutting" })
        if (!woodcuttingSkill) {
            return
        }
        // Pass level so that this is recalled when we get up a level
        const results = ReactiveMethod.call("woodcutting.fetchWoodcutters", woodcuttingSkill.level)

        return results || []
    },

    items() {
        let results = Items.find(
            { category: "woodcutting" },
            {
                sort: {
                    quality: -1
                }
            }
        ).map((item) => {
            return item
        })

        if (results) {
            let anyError = false

            results.forEach((item, idx) => {
                try {
                    if (ITEMS[item.itemId].stats) {
                        results[idx].tier = 1000 - ITEMS[item.itemId].stats.attack // axes
                    } else {
                        results[idx].tier = 10000 // logs
                    }
                } catch (err) {
                    anyError = true
                }
            })

            if (!anyError) {
                results = _.sortBy(results, ["quality"])
                results = _.sortBy(results, ["tier"])
            }
        }

        return results
    }
})
