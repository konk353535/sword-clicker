import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"

import moment from "moment"

import { Groups } from "/imports/api/groups/groups.js"

import "./otherBattlers.html"

Template.otherBattlersPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    Meteor.subscribe("otherBattlers", 100)
})

Template.otherBattlersPage.events({
    "click .back-to-lobby-btn"(event, instance) {
        instance.data.setPage("lobby")
    }
})

Template.otherBattlersPage.helpers({
    otherBattlers() {
        const otherBattlers = Groups.find(
            {
                lastBattleStarted: {
                    $gte: moment().subtract(24, "hours").toDate()
                },
                $or: [
                    {
                        isHidden: {
                            $exists: false
                        }
                    },
                    {
                        isHidden: false
                    }
                ]
            },
            {
                limit: 100,
                sort: {
                    lastBattleStarted: -1
                }
            }
        ).fetch()

        return otherBattlers
    }
})

Template.otherBattlersRow.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.otherBattlersRow.events({
    "click .btn-join-group"(event, instance) {
        const groupId = instance.$(event.target).closest(".btn-join-group").data("id")
        Meteor.call("groups.join", groupId)
    }
})

Template.otherBattlersRow.helpers({})
