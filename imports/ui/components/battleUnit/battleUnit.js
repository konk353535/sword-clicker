import { Template } from "meteor/templating"

import "./battleUnit.html"

Template.battleUnit.events({
    "click .icon-box"(event, instance) {
        instance.data.unitClicked(instance.data.unit.id)
    }
})

Template.battleUnit.helpers({
    healthPercentage() {
        const stats = Template.instance().data.unit.stats
        const healthPercentage = (stats.health / stats.healthMax) * 100

        return healthPercentage
    },

    energyPercentage() {
        const stats = Template.instance().data.unit.stats
        const energyPercentage = (stats.energy / stats.energyMax) * 100

        return energyPercentage
    },

    firePool() {
        const magic = Template.instance().data.unit.stats.magic
        const poolPercentage = (magic.firePool / magic.firePoolMax) * 100

        return poolPercentage
    },

    earthPool() {
        const magic = Template.instance().data.unit.stats.magic
        const poolPercentage = (magic.earthPool / magic.earthPoolMax) * 100

        return poolPercentage
    },

    airPool() {
        const magic = Template.instance().data.unit.stats.magic
        const poolPercentage = (magic.airPool / magic.airPoolMax) * 100

        return poolPercentage
    },

    waterPool() {
        const magic = Template.instance().data.unit.stats.magic
        const poolPercentage = (magic.waterPool / magic.waterPoolMax) * 100

        return poolPercentage
    },

    necroticPool() {
        const magic = Template.instance().data.unit.stats.magic
        const poolPercentage = (magic.necroticPool / magic.necroticPoolMax) * 100

        return poolPercentage
    }
})
