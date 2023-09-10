import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import "./pqAchieveTab.html"

Template.pqAchieveTab.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.pqAchieveTab.events({})

Template.pqAchieveTab.helpers({})
