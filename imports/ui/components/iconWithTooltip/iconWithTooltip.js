import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import "./iconWithTooltip.html"

let tooltip

Template.iconWithTooltip.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.iconWithTooltip.rendered = function () {
    if (!Template.instance().data.hideTooltip) {
        const vm = this
        vm.state.set("tooltipOpen", false)
        tooltip = tippy(Template.instance().$(".help-icon-container")[0], {
            appendTo: Template.instance().$(".help-icon-container")[0].parentNode,
            popperOptions: {
                modifiers: {
                    preventOverflow: {
                        enabled: true
                    },
                    hide: {
                        enabled: false
                    }
                }
            },
            html: Template.instance().$(".help-tooltip-content")[0],
            performance: true,
            animateFill: false,
            distance: 5,
            onHide: function () {
                vm.state.set("tooltipOpen", false)
            }
        })
    }
}

Template.iconWithTooltip.onDestroyed(function () {
    if (tooltip) {
        const tooltipInstance = Template.instance().$(".help-icon-container")[0]
        if (tooltipInstance && tooltipInstance.hasOwnProperty("_tippy")) {
            tooltipInstance._tippy.destroy()
        }
    }
})

Template.iconWithTooltip.events({
    "click .help-icon-container"(event, instance) {
        if (Template.instance().data.readOnly) {
            return
        }

        if (Session.get("tooltipInput") === "touch") {
            if (!Template.instance().data.hideTooltip) {
                if (instance.state.get("tooltipOpen")) {
                    // close tooltip
                    let tooltipInstance = Template.instance().$(".help-icon-container")[0]
                    if (tooltipInstance) {
                        tooltipInstance._tippy.hide()
                        instance.state.set("tooltipOpen", false)
                    }
                } else {
                    // open tooltip
                    let tooltipInstance = Template.instance().$(".help-icon-container")[0]
                    if (tooltipInstance) {
                        tooltipInstance._tippy.show()
                        instance.state.set("tooltipOpen", true)
                    }
                    return
                }
            }
        }
    }
})
