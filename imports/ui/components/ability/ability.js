import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"

import { BattlesList } from "/imports/api/battles/battles.js"

import "./ability.html"

const castAbility = function (instance) {
    const currentBattleId = BattlesList.findOne({})._id

    // automatically target solo enemies or self if the enemy or
    let targetType = "auto"
    let icons
    if (instance && instance.data && instance.data.ability && instance.data.ability.targettable) {
        targetType = instance.data.ability.target

        if (instance.data.ability.target === "singleEnemy") {
            icons = $("body").find(".enemy-icon")
            if (icons.length === 1) {
                targetType = "autoEnemy"
            }
        } else if (instance.data.ability.target === "singleFriendly") {
            icons = $("body").find(".friendly-icon")
            if (icons.length === 1) {
                targetType = "autoSelf"
            }
        }
    }

    // if we have an automatic target mode and a valid target, then use the ability automatically with no further user interaction required
    if (targetType === "autoEnemy" && icons && icons.length > 0) {
        const targetId = icons[0].attr("data-unit-id")
        const battleId = currentBattleId
        const abilityId = instance.data.ability.id

        if (battleSocket && battleSocket.connected && battleSocket.emit) {
            // Gonna require the socket here
            battleSocket.emit("action", {
                battleSecret: Meteor.user().battleSecret,
                abilityId,
                targets: [targetId],
                caster: Meteor.userId()
            })
        }

        return
    } else if (targetType === "autoSelf") {
        const battleId = currentBattleId
        const abilityId = instance.data.ability.id
        const targetId = Meteor.userId()
        const casterId = Meteor.userId()

        if (battleSocket && battleSocket.connected && battleSocket.emit) {
            // Gonna require the socket here
            battleSocket.emit("action", {
                battleSecret: Meteor.user().battleSecret,
                abilityId,
                targets: [targetId],
                caster: Meteor.userId()
            })
        }

        return
    }

    // otherwise, this is a targetable ability and there are multiple valid targets for the user to select
    if (instance.data.ability.targettable) {
        if (targetType === "singleEnemy") {
            const body = $("body")
            if (!body.hasClass("targetting-enemies")) {
                body.addClass("targetting-enemies")
                Meteor.setTimeout(() => {
                    // Add body listener for when you want to click out
                    body.on(`click.${instance.data.ability.id}`, function (event) {
                        if ($(event.target).hasClass("enemy-icon")) {
                            const targetId = $(event.target).attr("data-unit-id")
                            const battleId = currentBattleId
                            const abilityId = instance.data.ability.id

                            if (battleSocket && battleSocket.connected && battleSocket.emit) {
                                // Gonna require the socket here
                                battleSocket.emit("action", {
                                    battleSecret: Meteor.user().battleSecret,
                                    abilityId,
                                    targets: [targetId],
                                    caster: Meteor.userId()
                                })
                            }
                        }

                        body.removeClass("targetting-enemies")
                        body.off(`click.${instance.data.ability.id}`)
                    })
                }, 1)
            }
        } else if (targetType === "singleFriendly") {
            const body = $("body")
            if (!body.hasClass("targetting-friendlies")) {
                body.addClass("targetting-friendlies")
                Meteor.setTimeout(() => {
                    // Add body listener for when you want to click out
                    body.on(`click.${instance.data.ability.id}`, function (event) {
                        if ($(event.target).hasClass("friendly-icon")) {
                            const targetId = $(event.target).attr("data-unit-id")
                            const battleId = currentBattleId
                            const abilityId = instance.data.ability.id

                            if (battleSocket && battleSocket.connected && battleSocket.emit) {
                                // Gonna require the socket here
                                battleSocket.emit("action", {
                                    battleSecret: Meteor.user().battleSecret,
                                    abilityId,
                                    targets: [targetId],
                                    caster: Meteor.userId()
                                })
                            }
                        }

                        body.removeClass("targetting-friendlies")
                        body.off(`click.${instance.data.ability.id}`)
                    })
                }, 1)
            }
        }
    } else {
        // or the ability simply isn't targetable at all
        const battleId = currentBattleId
        const abilityId = instance.data.ability.id
        const targetId = Meteor.userId()
        const casterId = Meteor.userId()

        if (battleSocket && battleSocket.connected && battleSocket.emit) {
            // Gonna require the socket here
            battleSocket.emit("action", {
                battleSecret: Meteor.user().battleSecret,
                abilityId,
                targets: [targetId],
                caster: Meteor.userId()
            })
        }
    }
}

Template.ability.onCreated(function bodyOnCreated() {})

Template.ability.rendered = function () {
    const slot = this.data.ability.slot

    $(document).off(`keyup.${slot}`)

    // Map slot to button press
    const keyCodes = {
        mainHand: 0,
        offHand: 1,
        head: 2,
        chest: 3,
        legs: 4,
        classAbil1: 5,
        classAbil2: 6,
        classAbil3: 7,
        changeTarget: 35, // t
        companion: 36 // u
    }
    $(document).on(`keyup.${slot}`, (e) => {
        if (keyCodes[slot] != null && e.which === 49 + keyCodes[slot]) {
            castAbility(this)
        }
    })
}

Template.ability.events({
    click(event, instance) {
        castAbility(instance)
    }
})

Template.ability.onDestroyed(function onAbilityDestroyed() {
    const slot = this.data.ability.slot
    $(document).off(`keyup.${slot}`)
})

Template.ability.helpers({})
