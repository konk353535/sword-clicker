import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"

import { userCurrentClass } from "/imports/api/classes/classes.js"

import "./viewClasses.html"

Template.viewClassesPage.onCreated(function bodyOnCreated() {
    this.autorun(() => {
        Meteor.call("users.setUiState", "autopage", "")
    })
})

Template.viewClassesPage.events({
    "click .back-to-loadout-btn"(event, instance) {
        instance.data.setPage("loadout")
    },
})

Template.viewClassesPage.helpers({
    currentClass() {
        return userCurrentClass().equipped
    }
})
