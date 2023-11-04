import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"

import { DEFAULT_SERVER, Servers } from "/imports/api/servers/servers.js"

import { BUFFS } from "/imports/constants/buffs/index.js"
import { ITEMS } from "/imports/constants/items/index.js"

import "./home.html"

Template.homePage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    // Fetch active users count
    Meteor.call("users.activeUsers", (err, res) => {
        this.state.set("passiveUsers", res?.passive)
        this.state.set("activeUsers", res?.active)
    })

    // Fetch active, passive, spell, and companion abilities count
    Meteor.call("abilities.getCount", (err, res) => {
        let buffCount = 0
        Object.keys(BUFFS).forEach((buffId) => {
            if (buffId.indexOf("_trait") !== -1) {
                buffCount++
            }
        })
        this.state.set("abilityCount", (res || 0) + buffCount)
    })
})

Template.homePage.helpers({
    creatingGuest() {
        return Template.instance().state.get("creatingGuest")
    },

    passiveUsers() {
        return Template.instance().state.get("passiveUsers")
    },

    activeUsers() {
        return Template.instance().state.get("activeUsers")
    },

    itemCount() {
        return Object.keys(ITEMS).length
    },

    abilityCount() {
        return Template.instance().state.get("abilityCount")
    }
})

Template.homePage.events({
    "click .play-as-guest-btn"(event, instance) {
        instance.state.set("creatingGuest", true)

        // Find server doc for selected server
        const serverDoc = Servers.findOne({
            name: DEFAULT_SERVER
        })

        if (!serverDoc) {
            // todo: display error about no servers
            return
        }

        Meteor.call("users.createGuest", serverDoc._id, (err, res) => {
            if (err) {
                return instance.state.get("creatingGuest", false)
            }

            const { username, password } = res
            Meteor.loginWithPassword(username, password, (err, res) => {
                instance.state.get("creatingGuest", false)
            })
        })
    }
})
