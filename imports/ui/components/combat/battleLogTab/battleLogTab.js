import { Template } from "meteor/templating"

import { ReactiveDict } from "meteor/reactive-dict"
import { Battles } from "/imports/api/battles/battles.js"

import "./battleLogTab.html"

Template.battleLogTab.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.battleLogTab.helpers({
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
