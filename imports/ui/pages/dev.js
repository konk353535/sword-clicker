import { Meteor } from "meteor/meteor"
import { Tracker } from "meteor/tracker"
import { Template } from "meteor/templating"
import { Router } from "meteor/iron:router"
import { ReactiveDict } from "meteor/reactive-dict"

import { Users } from "/imports/api/users/users.js"

import "./dev.html"

const prepText = function prepText(text__in) {
    try {
        let text_val
        if (typeof text__in === "object") {
            text_val = JSON.stringify(text__in, null, 4) // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
        } else {
            text_val = text__in.toString()
        }
        while (text_val.indexOf("&") !== -1) {
            text_val = text_val.replace("&", "###amp;")
        }
        while (text_val.indexOf("###amp;") !== -1) {
            text_val = text_val.replace("###amp;", "&amp;")
        }
        while (text_val.indexOf("<") !== -1) {
            text_val = text_val.replace("<", "&lt;")
        }
        while (text_val.indexOf(">") !== -1) {
            text_val = text_val.replace(">", "&gt;")
        }
        while (text_val.indexOf('"') !== -1) {
            text_val = text_val.replace('"', "&quot;")
        }
        while (text_val.indexOf("'") !== -1) {
            text_val = text_val.replace("'", "&apos;")
        }
        while (text_val.indexOf("\t") !== -1) {
            text_val = text_val.replace("\t", "    ")
        }
        while (text_val.indexOf("\r") !== -1) {
            text_val = text_val.replace("\r", "")
        }
        while (text_val.indexOf("\n") !== -1) {
            text_val = text_val.replace("\n", "<br />")
        }
        while (text_val.indexOf("  ") !== -1) {
            text_val = text_val.replace("  ", " &nbsp;")
        }
        return text_val
    } catch (err) {
        console.log(err)
    }
    return ""
}

Template.devPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
    this.state.set("meteorCallMethod", "town.syncBuffs")

    Tracker.autorun(() => {
        let isAdmin = false
        if (Meteor && Users) {
            if (Meteor.user()) {
                const myUser = Meteor.user() ? Meteor.user() : Users.findOne({ _id: Meteor.userId() })
                if (myUser) {
                    isAdmin = myUser.isSuperMod
                }
            }
        }
        if (!isAdmin) {
            Router.go("/overview")
        }
    })
})

Template.devPage.helpers({
    isAdmin() {
        if (Meteor && Users) {
            const myUser = Meteor.user() ? Meteor.user() : Users.findOne({ _id: Meteor.userId() })
            return myUser && myUser.isSuperMod
        }
        return false
    },

    meteorResult() {
        return Template.instance().state.get("lastMeteorCallResult")
    }
})

Template.devPage.events({
    "keyup .meteor-method-input"(event, instance) {
        let newValue = $(event.target).val()
        if (newValue) {
            instance.state.set("meteorCallMethod", newValue.toString().trim())
        }
    },

    "click .meteor-call-btn"(event, instance) {
        const meteorCallMethodData = instance.state.get("meteorCallMethod")
        const meteorCallMethodValues = meteorCallMethodData.trim().split(" ")
        const meteorCallMethodName = meteorCallMethodValues.shift()

        Meteor.apply(meteorCallMethodName, meteorCallMethodValues, (err, data) => {
            if (err) {
                instance.state.set("lastMeteorCallResult", prepText(err))
            } else {
                instance.state.set("lastMeteorCallResult", prepText(data))
            }
        })
    },

    "click .meteor-deploy-btn"(event, instance) {
        Meteor.call("server.deployFlag", "deploy_meteor")
    },

    "click .battle-deploy-btn"(event, instance) {
        Meteor.call("server.deployFlag", "deploy_battle")
    },

    "click .both-deploy-btn"(event, instance) {
        Meteor.call("server.deployFlag", "deploy_all")
    },

    "click .unset-deploy-btn"(event, instance) {
        Meteor.call("server.unsetDeployFlag")
    }
})

Template.devPage.onDestroyed(function bodyOnDestroyed() {})
