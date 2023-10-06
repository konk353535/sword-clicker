import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"

import { userCurrentClass } from "/imports/api/classes/classes.js"
import { classFeatureUnlocked } from "/imports/api/users/users.js"

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

    "click .back-to-updates-btn"(event, instance) {
        Router.go("updates")
    }
})

Template.viewClassesPage.helpers({
    currentClass() {
        const userClass = userCurrentClass()
        return userClass.unlocked ? userClass.equipped : ""
    },

    classFeatureUnlocked() {
        return userCurrentClass().unlocked
    }
})
