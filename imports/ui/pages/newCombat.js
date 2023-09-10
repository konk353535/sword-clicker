import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import { BattlesList } from "/imports/api/battles/battles.js"

import "../components/newCombat/adventuresTab/adventuresTab.js"
import "../components/newCombat/consumables/consumables.js"
import "../components/newCombat/loadout/loadout.js"
import "../components/newCombat/lobby/lobby.js"
import "../components/newCombat/otherBattlers/otherBattlers.js"
import "../components/newCombat/recentBattles/recentBattles.js"
import "../components/newCombat/selectAbilities/selectAbilities.js"
import "../components/newCombat/selectGear/selectGear.js"
import "./newCombat.html"

Template.newCombatPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    this.state.set("page", "lobby")
})

Template.newCombatPage.events({})

Template.newCombatPage.helpers({
    page() {
        return Template.instance().state.get("page")
    },

    setPage() {
        const instance = Template.instance()
        return (page) => {
            instance.state.set("page", page)
        }
    },

    inCurrentBattle() {
        const currentBattleList = BattlesList.findOne({
            owners: Meteor.userId(),
            activated: true
        })
        return !!currentBattleList
    }
})
