import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"
import { DONATORS_BENEFITS } from "/imports/constants/shop/index.js"

import "./memberBenefit.html"

Template.memberBenefit.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.memberBenefit.helpers({
    calculatedBonus() {
        const instance = Template.instance()

        if (instance.data.bonusKey === "miningBonus") {
            const bonusAmount = DONATORS_BENEFITS[instance.data.bonusKey]
            if (bonusAmount) {
                const value = instance.data.value
                return Math.floor(20 + value * (bonusAmount / 100))
            }
        } else if (instance.data.bonusKey === "miningAttackBonus") {
            const bonusAmount = DONATORS_BENEFITS.miningBonus
            if (bonusAmount) {
                const value = instance.data.value
                return (value * (bonusAmount / 100)).toFixed(1)
            }
        }

        return "?"
    }
})

Template.memberBenefit.rendered = function () {
    const iconTooltip = new Drop({
        target: Template.instance().$(".benefit-container")[0],
        content: Template.instance().$(".benefit-tooltip-content")[0],
        openOn: "hover",
        position: "top left",
        remove: true
    })
}
