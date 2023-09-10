import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"
import _ from "underscore"

import { Users } from "/imports/api/users/users"

import "./personalQuestTab.html"

Template.personalQuestTab.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    Tracker.autorun(() => {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        if (myUser) {
            if (myUser.uiState && myUser.uiState.questLevel !== undefined) {
                this.state.set("currentLevel", myUser.uiState.questLevel)
            } else if (myUser.personalQuest) {
                this.state.set("currentLevel", myUser.personalQuest.level)
            }
        }
    })

    this.autorun(() => {
        const userDoc = Users.findOne({})
        if (userDoc && userDoc.personalQuest) {
            this.state.set("maxLevel", userDoc.personalQuest.level)
            this.state.set("maxLevelCurrentWave", userDoc.personalQuest.wave)
        }
    })
})

Template.personalQuestTab.events({
    "click .find-battle"(event, instance) {
        // Battle the current wave, so we can progress to the next wave
        const targetLevel = instance.state.get("currentLevel")
        const targetWave = instance.state.get("maxLevelCurrentWave")
        Meteor.call("battles.findPersonalBattle", targetLevel, targetWave, (err, res) => {
            if (err) {
                toastr.warning(err.reason)
            }
        })
    },

    "click .select-level"(event, instance) {
        const selectedLevel = $(event.target).closest(".select-level")[0].getAttribute("data-level")
        if (instance.state.get("currentLevel") !== parseInt(selectedLevel)) {
            instance.state.set("currentLevel", parseInt(selectedLevel))
            Meteor.call("users.setUiState", "questLevel", parseInt(selectedLevel))
        }
    },

    "click .random-battle"(event, instance) {
        // Battle a random wave in the current level
        Meteor.call("battles.findPersonalBattle", instance.state.get("currentLevel"), (err, res) => {
            if (err) {
                toastr.warning(err.reason)
            }
        })
    }
})

Template.personalQuestTab.helpers({
    maxLevel() {
        return Template.instance().state.get("maxLevel")
    },

    maxLevelCurrentWave() {
        return Template.instance().state.get("maxLevelCurrentWave")
    },

    usersCurrentLevel() {
        return Template.instance().state.get("currentLevel")
    },

    levelsList() {
        const maxLevel = Template.instance().state.get("maxLevel")
        if (!maxLevel) {
            return
        }
        return _.range(maxLevel, 0, -1)
    }
})
