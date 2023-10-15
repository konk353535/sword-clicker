import { Meteor } from "meteor/meteor"
import { Tracker } from "meteor/tracker"
import { Session } from "meteor/session"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"
import { toastr } from "meteor/chrismbeckett:toastr"

import _ from "underscore"
import moment from "moment"
import io from "socket.io-client"

import "../lobbyUnit/lobbyUnit.js"
import "./lobby.html"

const TYPES = {
    solo: "Solo",
    group: "Tower",
    afk: "Adventure"
}

import { Battles, BattlesList, getMaxEnergyUse } from "/imports/api/battles/battles.js"
import { userCurrentClass } from "/imports/api/classes/classes.js"
import { Combat } from "/imports/api/combat/combat.js"
import { getGlobalBuffs } from "/imports/api/globalbuffs/globalbuffs"
import { Groups } from "/imports/api/groups/groups.js"
import { Items } from "/imports/api/items/items.js"
import { Skills } from "/imports/api/skills/skills.js"
import { Users } from "/imports/api/users/users.js"

window.reconnectQueue = []
window.isReconnecting = false
function reconnectBattleSocket(localBalancer, currentBattleList, user) {
    if (!window.connectionSeed) {
        window.connectionSeed = Math.ceil(Math.random() * 100000000) + 100000000
    }

    let userIsValid = false
    if (user.name && user.name !== "undefined" && user.name !== "" && user.name !== "unknown") {
        userIsValid = true
    }

    if (window.isReconnecting) {
        if (userIsValid && window.reconnectQueue.length < 3) {
            window.reconnectQueue.push(function () {
                reconnectBattleSocket(localBalancer, currentBattleList, user)
            })
        }
        return
    }

    // block parallel reconnections
    window.isReconnecting = true

    // be kind and close any existing battleSocket
    if (window.battleSocket) {
        try {
            window.battleSocket.close()
        } catch (err) {}
        window.battleSocket = undefined
    }

    // swap to new balancer (ID is player user ID for solo or their associated group ID)
    window.balancer = localBalancer

    // for convenience, pass along user ID and user name
    let extraUri = ""
    try {
        extraUri = `&userId=${user.id}&userName=${user.name}&conSeed=${window.connectionSeed}`
    } catch (err) {}

    // connect to the balancer and request a battle node server transport for our balancer ID
    if (userIsValid) {
        $.ajax({
            url: `${Meteor.settings.public.battleUrl}/balancer/${window.balancer}?balancer=${window.balancer}${extraUri}`
        }).done(function () {
            // when connected to the balancer, open a new socket to the proxied battle node transport -- this is our new battleSocket
            window.battleSocket = io(
                `${Meteor.settings.public.battleUrl}/${window.balancer}?balancer=${window.balancer}${extraUri}`,
                {
                    transports: ["websocket"],
                    forceNew: false,
                    reconnection: false
                }
            )

            window.battleSocket.hasUser = userIsValid

            // trigger an event when we disconnect from the battleSocket (cleanup)
            window.battleSocket.on("disconnect", () => {
                window.battleSocket = undefined
                window.balancer = undefined
            })

            // stop blocking reconnects
            window.reconnectQueue = []
            window.isReconnecting = false
        })
    } else {
        window.battleSocket = { hasUser: userIsValid }

        window.isReconnecting = false

        if (window.reconnectQueue.length > 0) {
            let reconnectThis = window.reconnectQueue.shift()
            reconnectThis()
        }
    }
}

// TODO: All this logic will fire after every battle, very ineffective though
Template.lobbyPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    this.state.set("userSuggestions", [])
    this.state.set("type", "group")

    this.state.set("currentLevel", 1)
    if (Session.get("usersCurrentRoom")) {
        this.state.set("usersCurrentRoom", Session.get("usersCurrentRoom"))
    } else {
        this.state.set("usersCurrentRoom", "All")
    }
    this.state.set("energyUse", 1)
    this.state.set("usersCurrentFloor", 1)
    this.state.set("floorDetails", {})
    this.state.set("waveDetails", {})
    this.state.set("maxFloor", 1)

    // Resubscribe
    Meteor.subscribe("otherBattlers", 3)
    Meteor.subscribe("battles")
    Meteor.subscribe("users")

    // Api Call
    /*
  Meteor.call('battles.myFloorContributions', (err, res) => {
    this.state.set('myFloorContributions', res);
  });*/

    Tracker.autorun(() => {
        const currentGroup = Groups.findOne({
            members: Meteor.userId()
        })

        let localBalancer = Meteor.userId()
        if (currentGroup) {
            localBalancer = currentGroup.balancer
        }

        // Lots of hacks follow, I'm so sorry
        const currentBattleList = BattlesList.findOne({
            owners: Meteor.userId()
        })

        if (
            !window.battleSocket ||
            !window.battleSocket.hasUser ||
            (localBalancer !== window.balancer && !currentBattleList)
        ) {
            let userData = {}
            try {
                userData.id = Meteor.userId().toString()
                let foundUser = Users.findOne({ _id: userData.id })
                if (foundUser) {
                    userData.name = foundUser.username
                }
            } catch (err) {}

            reconnectBattleSocket(localBalancer, currentBattleList, userData)
        }

        if (!currentGroup) {
            return
        }

        const groupsCombat = Combat.find({
            owner: {
                $in: currentGroup.members
            }
        }).fetch()

        if (groupsCombat.length === currentGroup.members.length) {
            return
        }

        setTimeout(() => {
            Meteor.subscribe("combat")
        }, 1000)
    })

    Tracker.autorun(() => {
        // Another method Call
        Meteor.call(
            "battles.getFloorDetails",
            parseInt(this.state.get("usersCurrentFloor")),
            (err, floorDetailsRaw) => {
                if (err) {
                    console.log(err)
                } else {
                    this.state.set("floorDetails", floorDetailsRaw.floorDetails)
                    this.state.set("waveDetails", floorDetailsRaw.waveDetails)
                    this.state.set("maxFloor", floorDetailsRaw.maxFloor)
                }
            }
        )

        Meteor.call("battles.myFloorContributions", (err, res) => {
            this.state.set("myFloorContributions", res)
        })
    })

    this.autorun(() => {
        const userDoc = Users.findOne({})
        if (userDoc && userDoc.personalQuest) {
            this.state.set("maxLevel", userDoc.personalQuest.level)
            this.state.set("maxLevelCurrentWave", userDoc.personalQuest.wave)
        }
    })/*,

//todo: remove debug (all of this)
    Tracker.autorun(() => {
        Template.instance().data.setPage("viewClasses")
    })*/
})

Template.lobbyPage.events({
    "click .battle-boss-btn"(event, instance) {
        Meteor.call("battles.findTowerBattle", instance.state.get("usersCurrentFloor"), "boss", 5, function (err, res) {
            if (err) {
                toastr.warning(err.reason)
            }

            instance.state.set("newBattleLoading", false)
        })
    },

    "click .select-type"(event, instance) {
        const newType = instance.$(event.target).closest(".select-type").data("type")
        instance.state.set("type", newType)
        Meteor.call("users.setUiState", "newCombatType", newType)
    },

    "click .loadout-btn"(event, instance) {
        instance.data.setPage("loadout")
    },

    "click .recent-battles-btn"(event, instance) {
        instance.data.setPage("recentBattles")
    },

    "click .consumables-btn"(event, instance) {
        instance.data.setPage("consumables")
    },

    "click .other-battlers-btn"(event, instance) {
        instance.data.setPage("otherBattlers")
    },

    "click .btn-create-group"(event, instance) {
        Meteor.call("groups.create", (err, res) => {
            if (err) {
                toastr.warning(err.reason)
            }
        })
    },

    "keydown #name"(event, instance) {
        // Get value from form element
        const text = instance.$("#name").val()
        Meteor.call("users.search", text, (err, res) => {
            console.log(res)
            instance.state.set(
                "userSuggestions",
                res.map((user) => user.username)
            )
        })
    },

    "submit .group-invite"(event) {
        // Prevent default browser form submit
        event.preventDefault()

        // Get value from form element
        const text = Template.instance().$("#name").val()

        // Send invite request
        Meteor.call("groups.invite", text, (err, res) => {
            if (err) {
                toastr.warning(err.reason)
            }
        })

        // Clear input
        Template.instance().$("#name").val("")
    },

    "click .btn-leave"(event) {
        Meteor.call("groups.leave")
    },

    "click .btn-lock-open"(event) {
        Meteor.call("groups.lock", false)
    },

    "click .btn-lock-close"(event) {
        Meteor.call("groups.lock", true)
    },

    "click .btn-allow-any-start"(event) {
        Meteor.call("groups.anyStart", true)
    },

    "click .btn-deny-any-start"(event) {
        Meteor.call("groups.anyStart", false)
    },

    "click .btn-hide-group"(event) {
        Meteor.call("groups.isHidden", true)
    },

    "click .btn-unhide-group"(event) {
        Meteor.call("groups.isHidden", false)
    },

    "click .btn-kick"(event, instance) {
        const ownerId = instance.$(event.target).closest(".btn-kick").data("owner")
        Meteor.call("groups.kick", { ownerId })
    },

    "click .btn-kick-invite"(event, instance) {
        const ownerId = instance.$(event.target).closest(".btn-kick-invite").data("owner")
        Meteor.call("groups.kick", { ownerId }, (err, res) => {
            if (err) {
                toastr.warning(err.reason)
            } else {
                Meteor.call("groups.inviteOwner", ownerId, (err, res) => {
                    if (err) {
                        toastr.warning(err.reason)
                    }
                })
            }
        })
    },

    "click .btn-promote"(event, instance) {
        const ownerId = instance.$(event.target).closest(".btn-promote").data("owner")
        Meteor.call("groups.transfer", { ownerId })
    },

    "click .select-floor"(event, instance) {
        const selectedFloor = $(event.target).closest(".select-floor")[0].getAttribute("data-floor")
        if (instance.state.get("usersCurrentFloor") !== parseInt(selectedFloor)) {
            instance.state.set("usersCurrentFloor", parseInt(selectedFloor))
            instance.state.set("usersCurrentRoom", "All")
            Meteor.call("users.setUiState", "towerFloor", parseInt(selectedFloor))
        }
    },

    "click .select-room"(event, instance) {
        const selectedRoom = $(event.target).closest(".select-room")[0].getAttribute("data-room")
        if (selectedRoom === "All") {
            instance.state.set("usersCurrentRoom", "All")
        } else if (selectedRoom === "Boss") {
            instance.state.set("usersCurrentRoom", "Boss")
        } else {
            instance.state.set("usersCurrentRoom", parseInt(selectedRoom))
        }
        Session.set("usersCurrentRoom", instance.state.get("usersCurrentRoom"))
    },

    "click .select-level"(event, instance) {
        const selectedLevel = $(event.target).closest(".select-level")[0].getAttribute("data-level")
        instance.state.set("currentLevel", parseInt(selectedLevel))
        Meteor.call("users.setUiState", "questLevel", parseInt(selectedLevel))
    },

    "click .select-energyUse"(event, instance) {
        let energyUse = $(event.target).closest(".select-energyUse")[0].getAttribute("data-energyUse")
        if (energyUse > getMaxEnergyUse()) {
            energyUse = getMaxEnergyUse()
        }
        instance.state.set("energyUse", parseInt(energyUse))
        Meteor.call("users.setUiState", "energyUse", parseInt(energyUse))
    },

    "click .battle-btn"(event, instance) {
        instance.state.set("newBattleLoading", true)
        const type = instance.state.get("type")
        let energyUse = parseInt(instance.state.get("energyUse"))

        if (energyUse > getMaxEnergyUse()) {
            energyUse = getMaxEnergyUse()
        }

        if (type === "group") {
            const floor = instance.state.get("usersCurrentFloor")
            const room = instance.state.get("usersCurrentRoom")
            if (room === "Boss") {
                Meteor.call("battles.findTowerBattle", floor, "boss", 0, function (err, res) {
                    if (err) {
                        toastr.warning(err.reason)
                    }

                    instance.state.set("newBattleLoading", false)
                })
            } else if (room === "All") {
                Meteor.call("battles.findTowerBattle", floor, 0, energyUse, function (err, res) {
                    if (err) {
                        toastr.warning(err.reason)
                    }

                    instance.state.set("newBattleLoading", false)
                })
            } else {
                Meteor.call("battles.findTowerBattle", floor, room, energyUse, function (err, res) {
                    if (err) {
                        toastr.warning(err.reason)
                    }

                    instance.state.set("newBattleLoading", false)
                })
            }
        } else if (type === "solo") {
            const maxLevel = parseInt(instance.state.get("maxLevel"))
            const level = parseInt(instance.state.get("currentLevel"))

            Meteor.call("battles.findPersonalBattle", level, level === maxLevel ? 1 : energyUse, function (err, res) {
                if (err) {
                    toastr.warning(err.reason)
                }

                instance.state.set("newBattleLoading", false)
            })
        }
    },

    "click .accept-btn"(event, instance) {
        // Get target data
        const inviteId = instance.$(event.target).closest(".accept-btn").data("id")

        Meteor.call("groups.acceptInvite", inviteId, true, (err, res) => {
            if (err) {
                toastr.warning(err.reason)
            }
        })
    },

    "click .decline-btn"(event, instance) {
        const inviteId = instance.$(event.target).closest(".decline-btn").data("id")
        Meteor.call("groups.acceptInvite", inviteId, false)
    },

    "click .battle-nav-link"(event, instance) {
        instance.data.setPage("loadout")
    }
})

Template.lobbyPage.rendered = function () {
    if (Template.instance().state.get("type") === "group") {
        Meteor.typeahead.inject()
    }

    const instance = Template.instance()

    Tracker.autorun(() => {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        if (myUser) {
            if (myUser.uiState && myUser.uiState.autopage !== undefined) {
                instance.data.setPage(myUser.uiState.autopage)
            }
        }
    })

    Tracker.autorun(() => {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        if (myUser) {
            if (myUser.uiState && myUser.uiState.towerFloor !== undefined) {
                instance.state.set("usersCurrentFloor", myUser.uiState.towerFloor)
            } else {
                instance.state.set("usersCurrentFloor", 1)
            }

            if (myUser.uiState && myUser.uiState.energyUse !== undefined) {
                let localEnergyUse = myUser.uiState.energyUse
                if (localEnergyUse > getMaxEnergyUse()) {
                    localEnergyUse = getMaxEnergyUse()
                }
                instance.state.set("energyUse", myUser.uiState.energyUse)
            } else {
                instance.state.set("energyUse", 1)
            }

            if (myUser.uiState && myUser.uiState.questLevel !== undefined) {
                instance.state.set("currentLevel", myUser.uiState.questLevel)
            } else if (myUser.personalQuest) {
                instance.state.set("currentLevel", myUser.personalQuest.level)
            }

            if (myUser.uiState && myUser.uiState.newCombatType !== undefined) {
                instance.state.set("type", myUser.uiState.newCombatType)
                if (myUser.uiState.newCombatType === "group") {
                    if (!$(".tt-hint").length) {
                        Meteor.typeahead.inject()
                    }
                }
            }
        }
    })
}

Template.lobbyPage.helpers({
    energyUseHelpContent() {
        return `
        <p>Energy use per fight can be increased for multiple experience and loot gains.</p>
        <p>Energy use multiplier for loot drops affects quantity of drops instead of chances of drops.</p>
        <p>For each multiplier, you will gain less and less experience and loot.</p>

        <ul>
          <li>1 energy = 100% normal XP and loot</li>
          <li>5 energy = 400% normal XP and loot</li>
          <li>10 energy = 700% normal XP and loot</li>
          <li>20 energy = 1,300% normal XP and loot</li>
          <li>30 energy = 1,800% normal XP and loot</li>
          <li>40 energy = 2,200% normal XP and loot</li>
        </ul>
        `
    },

    floorRewardsHelpContent() {
        return `
      <p>Rewards are distributed when the community completes this floor.</p>
      <b>Enhancer Keys</b>
      <p>Top 10 players in wave contributions will each receive an Enhancer Key.</p>
      <b>Gold</b>
      <p>The gold is distributed equally between all floor participants.</p>
      <b>Loot</b>
      <p>The loot is distributed randomly to all floor participants.</p>
      `
    },

    theTowerHelpContent() {
        return `
      <p>
        <b>What</b><br />
        The community must work together to progress through the 'Eternal Tower'
      </p>
      <p>
        <b>Why</b><br />
        The top players in point contributions will receive a powerful reward (see bottom of page)<br />
        All players who contribute to pushing the current top floor will be eligible for floor rewards.
      </p>
      <p>
        <b>How</b><br />
        Groups of 1-5 players. Further you make it, more points you get.<br />
        <br />
        Players can attempt the floor as many times as they wish per day.
        Top 3 runs will get full point credit, subsequent attempts will award 10% points.<br />
        <br />
        Earn massive amounts of XP in random skills for your top attempts per day.  These are your
        "official" attempts.
      </p>`
    },

    lobbyLockHelp() {
        return "Locks or unlocks the lobby for other players to join"
    },

    lobbyHideHelp() {
        return "Hides or unhides the lobby"
    },

    lobbyStartHelp() {
        return "Allows any player in the lobby to start combat"
    },

    lobbyLeaveHelp() {
        return "Leave the current lobby"
    },

    lobbyKickHelp() {
        return "Kick the player from the lobby"
    },

    lobbyInviteHelp() {
        return "Revoke the invite for this player"
    },

    lobbyLeaderHelp() {
        return "Promote this player to party leader"
    },

    floorsList() {
        let floorsList = []
        let maxFloor = Template.instance().state.get("maxFloor")

        for (let i = 0; i < maxFloor; i++) {
            floorsList.push(i + 1)
        }

        return floorsList
    },

    floorDetails() {
        return Template.instance().state.get("floorDetails")
    },

    typeKey() {
        return Template.instance().state.get("type")
    },

    type() {
        return TYPES[Template.instance().state.get("type")]
    },

    currentGroup() {
        return Groups.findOne({
            members: Meteor.userId()
        })
    },

    floorDetails() {
        return Template.instance().state.get("floorDetails")
    },

    bossAdjustedHealthMax() {
        const waveDetails = Template.instance().state.get("waveDetails")

        return (waveDetails?.health > waveDetails?.healthMax) ? waveDetails?.health : (waveDetails?.healthMax || false)
    },

    bossHealthProgress() {
        try {
            const waveDetails = Template.instance().state.get("waveDetails")

            const bossHealth = waveDetails?.health || 0
            const bossHealthMax = (waveDetails?.health > waveDetails?.healthMax) ? waveDetails?.health : (waveDetails?.healthMax || 1)

            return (bossHealth / bossHealthMax) * 100.0
        }
        catch (err) { }
        
        return false
    },

    waveDetails() {
        return Template.instance().state.get("waveDetails")
    },

    estimatedRewards() {
        const instance = Template.instance()
        const floorDetails = instance.state.get("floorDetails")
        return floorDetails.rewards
    },

    myFloorContributions() {
        return Template.instance().state.get("myFloorContributions")
    },

    wavePointsProgress() {
        const waveDetails = Template.instance().state.get("waveDetails")

        return (waveDetails.points / waveDetails.pointsMax) * 100
    },

    usersCurrentFloor() {
        return Template.instance().state.get("usersCurrentFloor")
    },

    usersCurrentRoom() {
        return Template.instance().state.get("usersCurrentRoom")
    },

    maxEnergyUse() {
        return getMaxEnergyUse()
    },

    energyUse() {
        return Template.instance().state.get("energyUse")
    },

    floorResetDate() {
        return moment().utc().hours(23).minutes(59).seconds(59)
    },

    bossResetAt() {
        const waveDetails = Template?.instance()?.state?.get("waveDetails")

        return waveDetails?.bossResetAt
    },

    allGlobalBuffs() {
        return getGlobalBuffs()
    },

    defenseSkill() {
        const defenseSkill = Skills.findOne({
            type: "defense"
        })

        if (defenseSkill !== undefined) defenseSkill.percentage = (defenseSkill.xp / defenseSkill.xpToLevel) * 100

        return defenseSkill
    },

    attackSkill() {
        const attackSkill = Skills.findOne({
            type: "attack"
        })

        if (attackSkill !== undefined) attackSkill.percentage = (attackSkill.xp / attackSkill.xpToLevel) * 100

        return attackSkill
    },

    healthSkill() {
        const healthSkill = Skills.findOne({
            type: "health"
        })

        if (healthSkill !== undefined) healthSkill.percentage = (healthSkill.xp / healthSkill.xpToLevel) * 100

        return healthSkill
    },

    magicSkill() {
        const magicSkill = Skills.findOne({
            type: "magic"
        })

        if (magicSkill !== undefined) magicSkill.percentage = (magicSkill.xp / magicSkill.xpToLevel) * 100

        return magicSkill
    },

    otherBattlers() {
        const otherBattlers = Groups.find(
            {
                $or: [
                    {
                        isHidden: {
                            $exists: false
                        }
                    },
                    {
                        isHidden: false
                    }
                ]
            },
            {
                limit: 3,
                sort: {
                    lastBattleStarted: -1
                }
            }
        ).fetch()

        return otherBattlers
    },

    firstPendingInvite() {
        return Groups.findOne({
            invites: Meteor.userId()
        })
    },

    showInvites() {
        const currentGroup = Groups.findOne({
            members: Meteor.userId()
        })

        const pendingInvites = Groups.find({
            invites: Meteor.userId()
        }).fetch()

        if (pendingInvites.length <= 0) {
            return false
        } else if (currentGroup && currentGroup.members.length > 1) {
            return false
        } else if (currentGroup && currentGroup.invites.length > 1) {
            return false
        }

        return true
    },

    recentBattles() {
        return Battles.find(
            {},
            {
                limit: 1,
                sort: {
                    updatedAt: -1
                }
            }
        )
    },

    foodItems() {
        return Items.find({
            category: "food"
        })
            .fetch()
            .filter((item) => {
                if (item.hidden) return false
                return true
            })
            .map((item) => {
                item.primaryAction = {
                    description: "eat",
                    item,
                    method() {
                        Meteor.call("items.eat", this.item._id, this.item.itemId, (err, res) => {
                            if (err) toastr.warning(err.reason)
                        })
                    }
                }
                return item
            })
    },

    isLeader() {
        const currentGroup = Groups.findOne({
            members: Meteor.userId()
        })

        if (!currentGroup) {
            return true
        }

        return currentGroup.leader === Meteor.userId()
    },

    newBattleLoading() {
        return Template.instance().state.get("newBattleLoading")
    },

    search(query, sync, callback) {
        Meteor.call("users.search", query, {}, function (err, res) {
            if (err) {
                console.log(err)
                return
            }
            callback(
                res.map(function (v) {
                    return { value: v.username, act: v.lastActivity }
                })
            )
        })
    },

    combat() {
        return Combat.findOne({
            owner: Meteor.userId()
        })
    },

    combatTowerContributions() {
        const combatDoc = Combat.findOne({
            owner: Meteor.userId()
        })

        if (combatDoc && combatDoc.towerContributions && combatDoc.towerContributions.length > 0) {
            return combatDoc.towerContributions
        }

        return []
    },

    combatTowerContributionsTotalScore() {
        const combatDoc = Combat.findOne({
            owner: Meteor.userId()
        })

        let totalScore = 0

        if (combatDoc && combatDoc.towerContributions && combatDoc.towerContributions.length > 0) {
            combatDoc.towerContributions.forEach(function(thisContribution) {
                totalScore += (thisContribution && thisContribution != null && typeof thisContribution !== 'undefined') ? thisContribution : 0
            })
        }

        return totalScore
    },

    currentGroupMembers() {
        const currentGroup = Groups.findOne({
            members: Meteor.userId()
        })

        let combats
        if (currentGroup) {
            combats = Combat.find({
                owner: {
                    $in: currentGroup.members
                }
            }).fetch()

            if (currentGroup.invitesDetails && currentGroup.invitesDetails.length > 0) {
                combats = combats.concat(
                    currentGroup.invitesDetails.map((invitee) => {
                        invitee.isInvitee = true
                        return invitee
                    })
                )
            }
        } else {
            combats = Combat.find({
                owner: Meteor.userId()
            }).fetch()
        }

        return combats.map((userCombat) => {
            // Map stuff we want to read into stats
            userCombat.stats = {
                health: userCombat.stats.health,
                healthMax: userCombat.stats.healthMax,
                energy: userCombat.stats.energy,
                energyMax: userCombat.stats.energyMax
            }

            userCombat.name = userCombat.username
            userCombat.icon = userCombat.characterIcon || "character.svg"
            if (currentGroup) {
                userCombat.isLeader = userCombat.owner === currentGroup.leader
            } else {
                userCombat.isLeader = false
            }
            const userClassData = userCurrentClass(userCombat.owner)
            userCombat.classUnlocked = userClassData.unlocked
            userCombat.classEligible = userClassData.eligible
            userCombat.classId = userClassData.equipped
            userCombat.classData = userClassData.data
            userCombat.classIcon = userClassData.icon
            userCombat.classCooldown = userClassData.cooldown

            return userCombat
        })
    },

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
