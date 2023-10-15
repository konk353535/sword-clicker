import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { Router } from "meteor/iron:router"
import { ReactiveDict } from "meteor/reactive-dict"

import "./updates.html"

Template.updatesPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    Meteor.call("users.readNewUpdates")
})

Template.updatesPage.events({
    "click .view-class-details-link"(event, instance) {
        Meteor.call("users.setUiState", "autopage", "viewClasses", function() {
            Router.go("battle")
        })
    },
})