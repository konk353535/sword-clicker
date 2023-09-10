import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import "./globalBuffIcon.html"

import { GLOBALBUFFS } from "/imports/constants/globalbuffs/index.js"

import { CInt } from "/imports/utils.js"

Template.globalBuffIcon.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.globalBuffIcon.helpers({
    cappedMinutes(minutes) {
        return (minutes % 60).toFixed(0)
    },

    cappedSeconds(minutes) {
        return (minutes % 60).toFixed(0)
    },

    name() {
        const instance = Template.instance()

        if (instance.data.type === "buffCombat") {
            return GLOBALBUFFS["paid_combat"].name()
        } else if (instance.data.type === "buffGathering") {
            return GLOBALBUFFS["paid_gathering"].name()
        } else if (instance.data.type === "buffCrafting") {
            return GLOBALBUFFS["paid_crafting"].name()
        } else {
            const globalBuffData = GLOBALBUFFS[instance.data.type]
            if (globalBuffData) {
                return globalBuffData.name(instance.data.level)
            }
        }

        return false
    },

    icon() {
        const instance = Template.instance()

        if (instance.data.type === "buffCombat") {
            return GLOBALBUFFS["paid_combat"].icon
        } else if (instance.data.type === "buffGathering") {
            return GLOBALBUFFS["paid_gathering"].icon
        } else if (instance.data.type === "buffCrafting") {
            return GLOBALBUFFS["paid_crafting"].icon
        } else {
            const globalBuffData = GLOBALBUFFS[instance.data.type]
            if (globalBuffData) {
                return globalBuffData.icon
            }
        }

        return false
    },

    effects() {
        const instance = Template.instance()

        if (instance.data.type === "buffCombat") {
            return GLOBALBUFFS["paid_combat"].effects()
        } else if (instance.data.type === "buffGathering") {
            return GLOBALBUFFS["paid_gathering"].effects()
        } else if (instance.data.type === "buffCrafting") {
            return GLOBALBUFFS["paid_crafting"].effects()
        } else {
            const globalBuffData = GLOBALBUFFS[instance.data.type]
            if (globalBuffData) {
                return globalBuffData.effects(instance.data.level)
            }
        }

        return false
    },

    constants() {
        const instance = Template.instance()

        if (instance.data.type === "buffCombat") {
            return GLOBALBUFFS["paid_combat"]
        } else if (instance.data.type === "buffGathering") {
            return GLOBALBUFFS["paid_gathering"]
        } else if (instance.data.type === "buffCrafting") {
            return GLOBALBUFFS["paid_crafting"]
        } else {
            const globalBuffData = GLOBALBUFFS[instance.data.type]
            if (globalBuffData) {
                return globalBuffData
            }
        }

        return false
    },

    buffLevel() {
        const instance = Template.instance()

        const globalBuffData = GLOBALBUFFS[instance.data.type]
        if (globalBuffData) {
            if (!globalBuffData.hasLevels) {
                return false
            }
        }

        if (instance.data.level) {
            if (CInt(instance.data.level) > 0) {
                return CInt(instance.data.level)
            }
        }

        return false
    }
})

Template.globalBuffIcon.rendered = function () {
    const buffTooltip = new Drop({
        target: Template.instance().$(".buff-icon-container")[0],
        content: Template.instance().$(".buff-tooltip-content")[0],
        openOn: "hover",
        position: "top left",
        remove: true
    })
}

Template.globalBuffIcon.events({})
