import { Template } from "meteor/templating"

import { ReactiveDict } from "meteor/reactive-dict"
import { Battles } from "/imports/api/battles/battles.js"

import "./recentBattles.html"

Template.recentBattlesPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.recentBattlesPage.events({
    "click .back-to-lobby-btn"(event, instance) {
        instance.data.setPage("lobby")
    }
})

Template.recentBattlesPage.helpers({
    battles() {
        return Battles.find(
            {},
            {
                limit: 25,
                sort: {
                    updatedAt: -1
                }
            }
        )
    }
})
