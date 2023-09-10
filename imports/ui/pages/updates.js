import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import "./updates.html"

Template.updatesPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    Meteor.call("users.readNewUpdates")
})
