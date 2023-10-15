import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"

import { BattlesList } from "/imports/api/battles/battles.js"
import { Combat } from "/imports/api/combat/combat.js"
import { Groups } from "/imports/api/groups/groups.js"

import "./groupList.html"

Template.groupList.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    this.autorun(() => {
        const currentGroup = Groups.findOne({
            members: Meteor.userId()
        })

        if (currentGroup && currentGroup.membersChecks) {
            const myStatus = currentGroup.membersChecks[Meteor.userId()]
            if (!myStatus.ready && !myStatus.notReady) {
                // Show Ready Check modal
                this.state.set("showReadyCheck", true)
                const oldTitle = document.title
                document.title = "Ready Check"
                Meteor.setTimeout(() => {
                    document.title = oldTitle
                }, 1000)
            } else {
                this.state.set("showReadyCheck", false)
            }
        }
    })
})

Template.groupList.events({
    "click .accept-btn"(event, instance) {
        // Get target data
        const $target = instance.$(event.target)
        const inviteId = $target.data("invite-id")
        Meteor.call("groups.acceptInvite", inviteId, true, (err, res) => {
            if (err) {
                toastr.warning(err.reason)
            }
        })
    },

    "click .decline-btn"(event, instance) {
        // Get target data
        const $target = instance.$(event.target)
        const inviteId = $target.data("invite-id")
        Meteor.call("groups.acceptInvite", inviteId, false)
    },

    "click .leave-group"(event) {
        Meteor.call("groups.leave")
    },

    "click .ready-check"(event) {
        Meteor.call("groups.readyCheck")
    },

    "click .is-ready-btn"(event) {
        Meteor.call("groups.ready")
    },

    "click .not-ready-btn"(event) {
        Meteor.call("groups.notReady")
    }
})

Template.groupList.helpers({
    currentGroup() {
        return Groups.findOne({
            members: Meteor.userId()
        })
    },

    showReadyCheck() {
        return Template.instance().state.get("showReadyCheck")
    },

    currentGroupMembers() {
        const currentGroup = Groups.findOne({
            members: Meteor.userId()
        })

        if (!currentGroup) {
            return []
        }

        const combats = Combat.find({
            owner: {
                $in: currentGroup.members
            }
        })

        return combats.map((userCombat) => {
            // Ready check info
            if (currentGroup.membersChecks && currentGroup.membersChecks[userCombat.owner]) {
                userCombat.readyCheck = currentGroup.membersChecks[userCombat.owner]
            } else {
                userCombat.readyCheck = {
                    ready: false,
                    notReady: false
                }
            }

            // Map stuff we want to read into stats
            userCombat.stats = {
                health: userCombat.stats.health,
                healthMax: userCombat.stats.healthMax,
                energy: userCombat.stats.energy,
                energyMax: userCombat.stats.energyMax
            }
            userCombat.leader = userCombat.owner === currentGroup.leader

            userCombat.name = userCombat.username
            userCombat.icon = userCombat.characterIcon || "character.svg"

            return userCombat
        })
    },

    pendingInvites() {
        return Groups.find({
            invites: Meteor.userId()
        })
    },

    inCurrentBattle() {
        return BattlesList.findOne({})
    },

    hasPendingInvites() {
        return Groups.find({
            invites: Meteor.userId()
        }).count()
    },

    currentUserId() {
        return Meteor.userId()
    }
})
