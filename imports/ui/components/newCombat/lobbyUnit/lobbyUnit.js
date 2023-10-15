import { Template } from "meteor/templating"

import "./lobbyUnit.html"

Template.lobbyUnit.events({
    "click .icon-box"(event, instance) {
        instance.data.unitClicked(instance.data.unit.id)
    }
})

Template.lobbyUnit.helpers({
    healthPercentage() {
        const stats = Template.instance().data.unit.stats
        const healthPercentage = (stats.health / stats.healthMax) * 100

        return healthPercentage
    },

    energyPercentage() {
        const stats = Template.instance().data.unit.stats
        console.log(Template.instance().data.unit)
        const energyPercentage = (stats.energy / stats.energyMax) * 100

        return energyPercentage
    },

    classIcon() {
        const classData = Template.instance().data.unit.classData
        if (classData) {
            return classData.icon
        }

        return false
    }
})
