import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import "./towerAchieveTab.html"

Template.towerAchieveTab.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.towerAchieveTab.events({})

Template.towerAchieveTab.helpers({})
