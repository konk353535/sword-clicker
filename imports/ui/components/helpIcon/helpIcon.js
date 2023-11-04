import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import "./helpIcon.html"

Template.helpIcon.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.helpIcon.rendered = function () {
    const position = Template.instance().data && Template.instance().data.position ? Template.instance().data.position : "top left"

    const helpTooltip = new Drop({
        target: Template.instance().$(".help-icon-container")[0],
        content: Template.instance().$(".help-tooltip-content")[0],
        openOn: "hover",
        position,
        remove: true,
        constrainToScrollParent: false
    })
}

Template.helpIcon.helpers({
    icon() {
        const instance = Template.instance()
        return instance.data.icon || "help.svg"
    }
})
