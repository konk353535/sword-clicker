import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"
import _ from "underscore"

import "./battleLogRow.html"

const timerDep = new Tracker.Dependency()

Template.battleLogRow.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
})

Template.battleLogRow.events({
    "click .show-more"(event, instance) {
        instance.state.set("showMore", true)
    },

    "click .show-less"(event, instance) {
        instance.state.set("showMore", false)
    },

    "click .ng-selector-need"(event, instance) {
        const target = $(event.currentTarget)
        Meteor.call("combat.clickedNeedGreed", target.data("loot-id"), "need")
    },

    "click .ng-selector-greed"(event, instance) {
        const target = $(event.currentTarget)
        Meteor.call("combat.clickedNeedGreed", target.data("loot-id"), "greed")
    }
})

Template.battleLogRow.helpers({
    computedBattle() {
        timerDep.depend()
        const instance = Template.instance()
        const battle = instance.data.battle

        battle.myTickEvents = battle.finalTickEvents.filter((tickEvent) => {
            return tickEvent.owner === Meteor.userId()
        })

        battle.detailedStats = []

        try {
            if (battle.historyStats) {
                battle.detailedStats = Object.keys(battle.historyStats).map((key) => {
                    return Object.assign({}, battle.historyStats[key], {
                        owner: key
                    })
                })

                let historyStatsWithCompanions = []

                for (const battleStatId in battle.detailedStats) {
                    if (battle.detailedStats.hasOwnProperty(battleStatId)) {
                        historyStatsWithCompanions[battleStatId] = battle.detailedStats[battleStatId]
                        if (
                            historyStatsWithCompanions[battleStatId].damageDoneCompanion > 0 ||
                            historyStatsWithCompanions[battleStatId].healingDoneCompanion > 0 ||
                            historyStatsWithCompanions[battleStatId].damageTakenCompanion > 0
                        ) {
                            historyStatsWithCompanions[battleStatId + "_companion"] = {
                                name: historyStatsWithCompanions[battleStatId].companionName
                                    ? historyStatsWithCompanions[battleStatId].companionName
                                    : historyStatsWithCompanions[battleStatId].name + "'s companion",
                                damageDone: historyStatsWithCompanions[battleStatId].damageDoneCompanion,
                                healingDone: historyStatsWithCompanions[battleStatId].healingDoneCompanion,
                                damageTaken: historyStatsWithCompanions[battleStatId].damageTakenCompanion,
                                owner: historyStatsWithCompanions[battleStatId].owner + "_companion",
                                tickEvents: [] // companions don't earn XP, rewards, or loot
                            }
                        }
                    }
                }

                // now let's renumber the array (blaze/meteor templates need the index to be numerical and we like this order so we have to renumber)
                let historyStatsWithCompanions2 = []
                let idx = 0

                for (const oldBattleStatId in historyStatsWithCompanions) {
                    if (historyStatsWithCompanions.hasOwnProperty(oldBattleStatId)) {
                        historyStatsWithCompanions2[idx] = historyStatsWithCompanions[oldBattleStatId]
                        idx++
                    }
                }

                battle.detailedStats = historyStatsWithCompanions2
            }
        } catch (err) {
            if (battle.historyStats) {
                battle.detailedStats = Object.keys(battle.historyStats).map((key) => {
                    return Object.assign({}, battle.historyStats[key], {
                        owner: key
                    })
                })
            }
        }

        // Iterate on detailed stats & add tick events in
        battle.detailedStats.forEach((detailedStats) => {
            detailedStats.tickEvents = battle.finalTickEvents.filter((tickEvent) => {
                return tickEvent.owner === detailedStats.owner
            })
        })

        battle.timer = 0

        if (battle.loot) {
            battle.myLoot = battle.loot.map((loot) => {
                return Object.assign({}, _.omit(loot, "owners"), {
                    ngChoice: loot.owners.find((owner) => {
                        return owner.id === Meteor.userId()
                    }).ngChoice
                })
            })

            if (battle.myLoot.length) {
                instance.state.set("showMore", true)
                const countdown = Math.round(
                    -moment.duration(moment().diff(moment(battle.createdAt).add(30, "second").toDate())).asSeconds()
                )
                if (countdown > 0) {
                    battle.timer = countdown
                    setTimeout(function () {
                        timerDep.changed()
                    }, 1000)
                }
            }
        }

        return battle
    },

    showMore() {
        return Template.instance().state.get("showMore")
    }
})
