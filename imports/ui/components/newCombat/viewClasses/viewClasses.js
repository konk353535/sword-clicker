import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"
import _ from "underscore"

import { Abilities } from "/imports/api/abilities/abilities.js"
import { userCurrentClass } from "/imports/api/classes/classes.js"
import { Items } from "/imports/api/items/items.js"
import { classFeatureUnlocked } from "/imports/api/users/users.js"

import { BUFFS } from "/imports/constants/buffs/index.js"
import { ITEMS } from "/imports/constants/items/index.js"

import "./viewClasses.html"

Template.viewClassesPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    this.autorun(() => {
    })
})

Template.viewClassesPage.events({
    "click .back-to-loadout-btn"(event, instance) {
        instance.data.setPage("loadout")
    },
})

Template.viewClassesPage.helpers({
})
