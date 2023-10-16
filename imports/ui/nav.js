import { Meteor } from "meteor/meteor"
import { Tracker } from "meteor/tracker"
import { ReactiveDict } from "meteor/reactive-dict"
import { Session } from "meteor/session"
import { Template } from "meteor/templating"
import { Router } from "meteor/iron:router"

import moment from "moment"

import { Groups } from "/imports/api/groups/groups.js"
import { Items } from "/imports/api/items/items.js"
import { Skills } from "/imports/api/skills/skills.js"
import { Users } from "/imports/api/users/users.js"

import { CLASSIC_SERVER, DEFAULT_SERVER, Servers } from "/imports/api/servers/servers.js"

import "./nav.html"

Template.nav.onCreated(function bodyOnCreated() {
    Meteor.subscribe("userData")
    Meteor.subscribe("servers")
    Meteor.subscribe("items")

    this.state = new ReactiveDict()

    Tracker.autorun(() => {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        if (myUser) {
            if (myUser.uiState && myUser.uiState.showSummaryList !== undefined) {
                Session.set("summaryListDisabled", !myUser.uiState.showSummaryList)
            } else {
                Session.set("summaryListDisabled", false)
            }
            if (myUser.uiState && myUser.uiState.recipeTileConsumables !== undefined) {
                Session.set("recipeTileConsumablesDisabled", !myUser.uiState.recipeTileConsumables)
            } else {
                Session.set("recipeTileConsumablesDisabled", false)
            }
            if (myUser.uiState && myUser.uiState.showNumberShorthand !== undefined) {
                Session.set("numberShorthandDisabled", !myUser.uiState.showNumberShorthand)
            } else {
                Session.set("numberShorthandDisabled", false)
            }
            if (myUser.uiState && myUser.uiState.wantCondensedChat !== undefined) {
                Session.set("wantCondensedChat", myUser.uiState.wantCondensedChat)
            } else {
                Session.set("wantCondensedChat", true)
            }
            if (myUser.uiState && myUser.uiState.ngAutoMode !== undefined) {
                Session.set("ngAutoMode", myUser.uiState.ngAutoMode)
            } else {
                Session.set("ngAutoMode", 0)
            }
            if (myUser.uiState && myUser.uiState.darkMode !== undefined) {
                Session.set("darkModeEnabled", myUser.uiState.darkMode)
                if (myUser.uiState.darkMode) {
                    // add class to html
                    $("html").addClass("dark")
                } else {
                    $("html").removeClass("dark")
                }
            } else {
                Session.set("darkModeEnabled", true) // default
                $("html").addClass("dark")
            }
            if (myUser.uiState && myUser.uiState.largeChatEnabled !== undefined) {
                Session.set("largeChatEnabled", myUser.uiState.largeChatEnabled)
                if (myUser.uiState.largeChatEnabled) {
                    // add class to chat container
                    $("html").addClass("large-chat-mode")
                } else {
                    $("html").removeClass("large-chat-mode")
                }
            } else {
                Session.set("largeChatEnabled", false) // default
            }
            if (myUser.uiState && myUser.uiState.floatingTextDisabled !== undefined) {
                Session.set("floatingTextDisabled", myUser.uiState.floatingTextDisabled)
            } else {
                Session.set("floatingTextDisabled", false)
            }
            if (myUser.uiState && myUser.uiState.combatDeathsDisabled !== undefined) {
                Session.set("combatDeathsDisabled", myUser.uiState.combatDeathsDisabled)
            } else {
                Session.set("combatDeathsDisabled", false)
            }
        }
    })

    Tracker.autorun(() => {
        if (Meteor.user()) {
            const server = Servers.findOne({ _id: Meteor.user().server })
            if (server) {
                this.state.set("myServer", server)
            }
        }
    })
})

Template.nav.events({
    "click .guest-sign-out-btn"(event, instance) {
        // Show confirm logout modal for guest sign out
        instance.$(".guestSignOffConfirmModal").modal("show")
    },

    "click .skip-tutorial"() {
        Meteor.call("users.skipTutorial")
    },

    "click .nav-link"(event, instance) {
        // Clear free floating tooltips
        $(".drop.drop-element.drop-enabled").remove()
    },

    "click .guest-set-password-btn"(event, instance) {
        instance.$(".guestSignOffConfirmModal").modal("hide")
        Router.go("/guestSettings")
    },

    "click .disable-floating-text"(event, instance) {
        Session.set("floatingTextDisabled", true)
        Meteor.call("users.setUiState", "floatingTextDisabled", true)
    },

    "click .enable-floating-text"(event, instance) {
        Session.set("floatingTextDisabled", false)
        Meteor.call("users.setUiState", "floatingTextDisabled", false)
    },

    "click .disable-combat-deaths"(event, instance) {
        Session.set("combatDeathsDisabled", true)
        Meteor.call("users.setUiState", "combatDeathsDisabled", true)
    },

    "click .enable-combat-deaths"(event, instance) {
        Session.set("combatDeathsDisabled", false)
        Meteor.call("users.setUiState", "combatDeathsDisabled", false)
    },

    "click .disable-summary-list"(event, instance) {
        Session.set("summaryListDisabled", true)
        Meteor.call("users.setUiState", "showSummaryList", false)
    },

    "click .enable-summary-list"(event, instance) {
        Session.set("summaryListDisabled", false)
        Meteor.call("users.setUiState", "showSummaryList", true)
    },

    "click .disable-condensed-chat"(event, instance) {
        Session.set("wantCondensedChat", false)
        Meteor.call("users.setUiState", "wantCondensedChat", false)
    },

    "click .enable-condensed-chat"(event, instance) {
        Session.set("wantCondensedChat", true)
        Meteor.call("users.setUiState", "wantCondensedChat", true)
    },

    "click .disable-recipe-consumables"(event, instance) {
        Session.set("recipeTileConsumablesDisabled", true)
        Meteor.call("users.setUiState", "recipeTileConsumables", false)
    },

    "click .enable-recipe-consumables"(event, instance) {
        Session.set("recipeTileConsumablesDisabled", false)
        Meteor.call("users.setUiState", "recipeTileConsumables", true)
    },

    "click .disable-number-shorthand"(event, instance) {
        Session.set("numberShorthandDisabled", true)
        Meteor.call("users.setUiState", "showNumberShorthand", false)
    },

    "click .enable-number-shorthand"(event, instance) {
        Session.set("numberShorthandDisabled", false)
        Meteor.call("users.setUiState", "showNumberShorthand", true)
    },

    "click .toggle-ngmode"(event, instance) {
        const new_ngAutoMode = (Session.get("ngAutoMode") + 1) % 2
        Session.set("ngAutoMode", new_ngAutoMode)
        Meteor.call("users.setUiState", "ngAutoMode", new_ngAutoMode)
    },

    "click .guestSignOffConfirmModal #at-nav-button"(event, instance) {
        instance.$(".guestSignOffConfirmModal").modal("hide")
    },

    "click .disable-dark-mode"(event, instance) {
        Session.set("darkModeEnabled", false)
        Meteor.call("users.setUiState", "darkMode", false)
        $("html").removeClass("dark")
    },

    "click .enable-dark-mode"(event, instance) {
        Session.set("darkModeEnabled", true)
        Meteor.call("users.setUiState", "darkMode", true)
        $("html").addClass("dark")
    },

    "click .disable-large-chat"(event, instance) {
        Session.set("largeChatEnabled", false)
        Meteor.call("users.setUiState", "largeChatEnabled", false)
        $("html").removeClass("large-chat-mode")
    },

    "click .enable-large-chat"(event, instance) {
        Session.set("largeChatEnabled", true)
        Meteor.call("users.setUiState", "largeChatEnabled", true)
        $("html").addClass("large-chat-mode")
    },

    "click .battle-nav-link"(event, instance) {
        Session.set("lobbyPageSetter", "loadout")
    }
})

Template.nav.helpers({
    currentRoute() {
        return Router.current().route.getName()
    },

    currentTutorialStep() {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        return myUser.tutorial ? myUser.tutorial.currentStep : 10000
    },

    canSeeCombat() {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        return myUser.tutorial ? (myUser.tutorial.hideCombat ? false : true) : true // don't simplify this, properties may not exist and need non-false defaults
    },

    canSeeCrafting() {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        return myUser.tutorial ? (myUser.tutorial.hideCrafting ? false : true) : true // don't simplify this, properties may not exist and need non-false defaults
    },

    canSeeInscription() {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        return myUser.tutorial ? (myUser.tutorial.hideInscription ? false : true) : true // don't simplify this, properties may not exist and need non-false defaults
    },

    canSeeFarming() {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        return myUser.tutorial ? (myUser.tutorial.hideFarming ? false : true) : true // don't simplify this, properties may not exist and need non-false defaults
    },

    canSeeWoodcutting() {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        return myUser.tutorial ? (myUser.tutorial.hideWoodcutting ? false : true) : true // don't simplify this, properties may not exist and need non-false defaults
    },

    canSeeEntireGameMenu() {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        return myUser.tutorial ? (myUser.tutorial.currentStep >= 10000 ? true : false) : true
    },

    isAdmin() {
        const myUser = Meteor.user() ? Meteor.user() : Users.findOne({ _id: Meteor.userId() })
        return myUser && myUser.isSuperMod
    },

    beforeNextSeasonAlert() {
        return false // disabling this in favor of serverAnnounce() helper instead
        const myServer = Servers.findOne({
            _id: Meteor.user().server
        })

        if (myServer && myServer.name === CLASSIC_SERVER) {
            return moment().isBefore(moment("2020-04-22"))
        }

        return false
    },

    serverName() {
        let serverName = DEFAULT_SERVER
        if (Template.instance().state.get("myServer")) {
            serverName = Template.instance().state.get("myServer").name
        }
        return serverName
    },

    serverAnnounce() {
        let serverAnnounceText
        if (Template.instance().state.get("myServer")) {
            serverAnnounceText = Template.instance().state.get("myServer").announcement
        }
        return serverAnnounceText && serverAnnounceText.trim().length > 0 ? serverAnnounceText : false
    },

    showPendingInvites() {
        const invitedToGroups = Groups.find({
            invites: Meteor.userId()
        }).fetch()

        const currentGroup = Groups.findOne({
            members: Meteor.userId()
        })

        return !currentGroup && invitedToGroups.length > 0
    },

    hasAttackSkill() {
        if (Skills.findOne()) {
            return Skills.findOne({ type: "attack" })
        } else {
            return true
        }
    },

    hasCraftingSkill() {
        if (Skills.findOne()) {
            return Skills.findOne({ type: "crafting" })
        } else {
            return true
        }
    },

    hasFarmingSkill() {
        if (Skills.findOne()) {
            return Skills.findOne({ type: "farming" })
        } else {
            return true
        }
    },

    hasInscriptionSkill() {
        if (Skills.findOne()) {
            return Skills.findOne({ type: "inscription" })
        } else {
            return true
        }
    },

    companionTokens() {
        const companionTokens = Items.findOne({ itemId: "companion_token" })
        if (companionTokens) {
            return parseInt(companionTokens.amount)
        }
        return 0
    },

    combinedGems() {
        return (Meteor.user().gems || 0) + (Meteor.user().fakeGems || 0)
    },

    floatingTextDisabled() {
        return Session.get("floatingTextDisabled")
    },

    combatDeathsDisabled() {
        return Session.get("combatDeathsDisabled")
    },

    summaryListDisabled() {
        return Session.get("summaryListDisabled")
    },

    wantCondensedChat() {
        return Session.get("wantCondensedChat")
    },

    numberShorthandDisabled() {
        return Session.get("numberShorthandDisabled")
    },

    recipeTileConsumablesDisabled() {
        return Session.get("recipeTileConsumablesDisabled")
    },

    darkModeEnabled() {
        return Session.get("darkModeEnabled")
    },

    largeChatEnabled() {
        return Session.get("largeChatEnabled")
    },

    ngMode() {
        return Session.get("ngAutoMode")
    },

    hasDeployFlag() {
        return Session.get("deployFlag") !== false
    },

    deployFlagText() {
        const flag = Session.get("deployFlag")
        if (flag === "deploy_meteor") {
            return "Incoming update ~5 minutes. The battle server will not be restarted, but while the game is updating, combat interactions will be interrupted for 20-30 seconds."
        } else if (flag === "deploy_battle") {
            return "Incoming update ~5 minutes. The battle server will be restarted, so please make sure you are finished with your battles at the time."
        } else if (flag === "deploy_all") {
            return "Incoming update: ~5 minutes. All services will be interrupted, so please make sure you are finished with your battles at the time."
        }

        return ""
    }
})
