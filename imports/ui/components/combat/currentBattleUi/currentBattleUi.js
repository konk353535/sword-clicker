import { Meteor } from "meteor/meteor"
import { Tracker } from "meteor/tracker"
import { Session } from "meteor/session"
import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"

import lodash from "lodash"
import _ from "underscore"
import moment from "moment"
import io from "socket.io-client"

import { Abilities } from "/imports/api/abilities/abilities.js"
import { BattlesList } from "/imports/api/battles/battles.js"
import { Groups } from "/imports/api/groups/groups.js"
import { Users } from "/imports/api/users/users"

import "./currentBattleUi.html"

const startBattle = (currentBattle, self) => {
    let myUnit

    if (currentBattle.unitsMap) {
        myUnit = currentBattle.unitsMap[Meteor.userId()]
    } else {
        myUnit = _.findWhere(currentBattle.units, { id: Meteor.userId() })
    }
    if (myUnit) {
        self.state.set("myUnit", myUnit)
    }
    
    // Initialize all units
    currentBattle.units.forEach((friendly) => {
        friendly.targettingName = ""
        friendly.targettingIcon =  "invis.gif"
    })
    currentBattle.enemies.forEach((enemy) => {
        enemy.targettingName = ""
        enemy.targettingIcon = "invis.gif"
    })

    // Find enemies that are targetting my unit
    currentBattle.enemies.forEach((enemy) => {
        enemy.targettingPlayer = !!(myUnit && enemy.target === myUnit.id)
        enemy.targettingName = ""
        enemy.targettingIcon = "invis.gif"

        if (enemy.targettingPlayer) {
            enemy.targettingName = "⚔️  YOU  ⚔️"
        } else {
            currentBattle.units.forEach((friendly) => {
                if (friendly.id == enemy.target) {
                    enemy.targettingName = (friendly?.name) || (friendly?.id) || "?"
                    enemy.targettingIcon = (friendly?.icon) || "invis.gif"
                }
            })
            if (currentBattle.enemyUnits) {
                currentBattle.enemyUnits.forEach((otherEnemyUnit) => {
                    if (otherEnemyUnit.id == enemy.target) {
                        enemy.targettingName = (otherEnemyUnit?.name) || (otherEnemyUnit?.id) || "?"
                        enemy.targettingIcon = (otherEnemyUnit?.icon) || "invis.gif"
                    }
                })
            }
        }
    })

    // Find enemies that I'm targetting
    if (myUnit) {
        currentBattle.enemies.forEach((enemy) => {
            enemy.isThisMyTarget = !!(myUnit && myUnit.target === enemy.id)

            if (enemy.id == myUnit.target) {
                myUnit.targettingName = (enemy?.name) || (enemy?.id) || "?"
                myUnit.targettingIcon = (enemy?.icon) || "invis.gif"
            }

            // Find enemies that my allies targetting
            currentBattle.units.forEach((friendly) => {
                if (enemy.id == friendly.target) {
                    friendly.targettingName = (enemy?.name) || (enemy?.id) || "?"
                    friendly.targettingIcon = (enemy?.icon) || "invis.gif"
                }
            })
        })
    }

    self.state.set("currentBattle", currentBattle)

    if (currentBattle) {
        const uidPlayer = Meteor.userId()

        // if ticks are getting backlogged
        /*
        if (currentBattle.tickEvents.length > 8) {
            // then only show user owned ticks or tickEvents with death
            currentBattle.tickEvents = currentBattle.tickEvents.filter((tickEvent) => {
                return tickEvent.from === uidPlayer ||
                    tickEvent.to === uidPlayer ||
                    tickEvent.eventType.indexOf("death") === 0
            })
        }
        */
       
        currentBattle.tickEvents.forEach((tickEvent, tickEventIndex) => {

            let combatLabel = (tickEvent?.label || "").trim()
            const uidTo = (tickEvent?.to || "").trim()
            const uidSource = (tickEvent?.from || "").trim()

            if (tickEvent.eventType == "death-ally" || tickEvent.eventType == "death") {
                if (!Session.get("combatDeathsDisabled")) {
                    if (uidTo == uidPlayer) {
                        if ((uidSource == uidTo) && (combatLabel.indexOf(" slain by ") !== -1)) {
                            combatLabel = "You underestimated your own power and died!"
                        } else if (combatLabel.indexOf(" was slain ") !== -1) {
                            combatLabel = `You were slain ${combatLabel.split(" was slain ")[1]}`
                        }
                        toastr.error(combatLabel.charAt(0).toUpperCase() + combatLabel.substring(1))
                    } else {
                        if ((uidSource == uidTo) && (combatLabel.indexOf(" was slain by ") !== -1)) {
                            combatLabel = `${combatLabel.split(" was slain by ")[0]} underestimated their own power and died!`
                            toastr.warning(combatLabel.charAt(0).toUpperCase() + combatLabel.substring(1))
                        } else {
                            toastr.warning(combatLabel.charAt(0).toUpperCase() + combatLabel.substring(1))
                        }
                    }
                }
            } else if (tickEvent.eventType == "death-enemy") {
                if (!Session.get("combatDeathsDisabled")) {
                    try {
                        if ((uidSource == uidPlayer) && (combatLabel.indexOf(" defeated ") !== -1)) {
                            combatLabel = `You defeated ${combatLabel.split(" defeated ")[1]}`
                        } else if ((uidSource == uidTo) && (combatLabel.indexOf(" defeated ") !== -1)) {
                            combatLabel = `${combatLabel.split(" defeated ")[0]} has been defeated`
                        }
                    } catch (err) {}
                    toastr.success(combatLabel.charAt(0).toUpperCase() + combatLabel.substring(1))
                }
            } else {
                if (!Session.get("floatingTextDisabled")) {
                    const offset = $(`#${tickEvent.to}`).offset()
                    if (offset) {
                        let color = "red"
                        let fontSize = "inherit"

                        if (tickEvent.label === 0) {
                            // what is this supposed to handle??
                            color = "blue"
                            fontSize = "10px"
                        } else if (tickEvent.customColor) {
                            color = tickEvent.customColor
                        }

                        // Determine left based on tick # + tickEventIndex
                        offset.left += -25 + (tickEventIndex % 3) * 55 // -25 to 85

                        // Attempt to push floating text down when more than 1 row
                        if (tickEventIndex % 2 >= 1) {
                            offset.top += 40
                        }

                        var validIcons = [
                            "basicDamage",
                            "basicDamageMagic",
                            "basicDamageCrit",
                            "attack",
                            "criticalChance",
                            "criticalDamage",
                            "damage",
                            "heal",
                            "health",
                            "magic",
                            "criticalStrike",
                            "accuracy",
                            "armor",
                            "dodge",
                            "bleed",
                            "bleeding",
                            "poison",
                            "thirstyFangs",
                            "phantomStrikes",
                            "confused",
                            "armorReduction",
                            "babyFireFox",
                            "bisonAxe",
                            "boneKingsAxe",
                            "battleAxe",
                            "magicBlade",
                            "demonsHeartDamage",
                            "demonsHeart",
                            "eventVDcupidbow",
                            "redirectDamage",
                            "obsidianPlateLegs",
                            "troglodyte",
                            "affliction",
                            "lightningDart",
                            "lightningStorm",
                            "blizzard",
                            "iceDart",
                            "earthDart",
                            "earthBall",
                            "earthenFist",
                            "ignite",
                            "inferno",
                            "fireWave",
                            "fireDart",
                            "fireBall",
                            "meteorStrike",
                            "spikedArmor",
                            "intimidate",
                            "eelTaunt",
                            "lionTaunt",
                            "bearTaunt",
                            "volcanicShield",
                            "deepWounds",
                            "bisonBlue",
                            "bisonRed",
                            "counterAttack",
                            "thirstyFangs1",
                            "berserk",
                            "doubleEdgedSword",
                            "execute",
                            "slash",
                            "penetratingSlash",
                            "shieldBash",
                            "bladeSpin",
                            "powerShot",
                            "paladinBulwark",
                            "paladinSquireInterception",
                            "paladinInspiration",
                            "rapier", 
                            "chatBubble",
                            "skull",
                            "duelistParry",
                            "wizardTimeWarpActive",
                            "sageMysticBond",
                            "tacticianRally",
                            "warMageSpacialShift",
                            "warden_shield",
                            "paladinGuard",
                            "noicon"
                        ]

                        // check icon, if it references an .svg, strip the file extension off to hopefully match with an IcoMoon CSS font
                        /*
                        let customIcon = tickEvent.customIcon
                        if (customIcon) {
                            if (customIcon != "noicon") {
                                try {
                                    if (customIcon.indexOf(".svg", customIcon.length - ".svg".length) !== -1) {
                                        customIcon = customIcon.substring(0, customIcon.length - 4)
                                    } else if (customIcon.indexOf(".png", customIcon.length - ".png".length) !== -1) {
                                        customIcon = "basicDamage" // we don't support .png in glyphs-based fonts
                                    }
                                } catch (err) {
                                    customIcon = "basicDamage"
                                }
                            }
                            
                            if (customIcon == "stun" || customIcon == "stunned") {
                                customIcon = "confused"
                            }
                        } else {
                            customIcon = "basicDamage"
                        }
                        */

                        let customIcon = tickEvent.customIcon
                        let elementIconHTML = ""

                        if (customIcon) {
                            //console.log(`Tick event with icon: ${customIcon}`)

                            if (customIcon != "noicon") {
                                try {
                                    if (customIcon.indexOf(".svg", customIcon.length - ".svg".length) !== -1) {
                                        customIcon = customIcon.substring(0, customIcon.length - 4)
                                    }
                                } catch (err) {
                                    customIcon = "noicon"
                                }
                            
                                if (customIcon == "stun" || customIcon == "stunned") {
                                    customIcon = "confused"
                                }
                            }

                            // console.log(`... tick event icon became: ${customIcon}`)

                            if (validIcons.includes(customIcon)) {
                                const iconSize = 16
                                
                                if (customIcon != "noicon") {
                                    elementIconHTML = `<img src="/icons/${customIcon}.svg" width="${iconSize}" height="${iconSize}" style="width: ${iconSize}px; height: ${iconSize}px; margin-top: -3px; border: none;" />`
                                }
                            } else {
                                console.log("INVALID CUSTOM TICK EVENT ICON: " + customIcon)
                            }
                        } else {
                            console.log(`TICK EVENT WITH NO ICON`)
                        }


                        /*
                        if (customIcon != "noicon") {
                            elementIconHTML = `<i class="lilIcon-basicDamage lilIcon-${customIcon}"></i>`
                        }
                        */

                        const element = $(`
                            <p
                            class='floating-text'
                            data-count=1
                            style='top: ${offset.top}px; left: ${offset.left}px; font-size: ${fontSize}; opacity: 1.0; color: ${color}'>
                            ${elementIconHTML}
                            ${combatLabel}
                            </p>
                        `)

                        $("body").append(element)
                        $(element).animateCss("fadeOutUp")
                    }
                }
            }
        })
    }
}

window.reconnectQueue = []
window.isReconnecting = false
function reconnectBattleSocket(localBalancer, currentBattleList, user, cb) {
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
                reconnectBattleSocket(localBalancer, currentBattleList, user, cb)
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

            cb()
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

window.reconnectionTrigger = function (this_template) {
    if (!this_template.state.get("fullState")) {
        this_template.state.set("fullState", true)
        window.battleSocket &&
            window.battleSocket.on &&
            window.battleSocket.on("fullState", (data) => {
                const rawBattle = data.battle
                if (!rawBattle) return
                const currentBattle = rawBattle
                if (!currentBattle) return

                startBattle(currentBattle, this_template)
            })
    }

    if (!this_template.state.get("onTick")) {
        this_template.state.set("onTick", true)
        window.battleSocket &&
            window.battleSocket.on &&
            window.battleSocket.on("tick", (data) => {
                const { tickEvents, deltaEvents } = data
                const currentBattle = this_template.state.get("currentBattle")
                if (!currentBattle) return
                currentBattle.tickEvents = tickEvents
                currentBattle.unitsMap = {}
                currentBattle.units
                    .concat(currentBattle.enemies, currentBattle.deadEnemies, currentBattle.deadUnits)
                    .forEach((unit) => {
                        if (unit) {
                            currentBattle.unitsMap[unit.id] = unit
                            if (unit.abilities) {
                                unit.abilitiesMap = {}
                                unit.abilities.forEach((ability) => {
                                    unit.abilitiesMap[ability.id] = ability
                                })
                            }
                            if (unit.buffs) {
                                unit.buffsMap = {}
                                unit.buffs.forEach((buff) => {
                                    unit.buffsMap[buff.id] = buff
                                })
                            }
                        }
                    })

                deltaEvents.forEach(({ type, path, value }) => {
                    //if (path.indexOf('_brawn.') !== -1) {
                    //    console.log('received deltaEvent', type, path, value);
                    //    console.log(currentBattle)
                    //}

                    if (type === "abs") {
                        lodash.set(currentBattle, path, value)
                    } else if (type === "push") {
                        const arrayToMutate = lodash.get(currentBattle, path)
                        if (arrayToMutate) {
                            arrayToMutate.push(value)
                        }
                    } else if (type === "pop") {
                        const arrayToMutate = lodash.get(currentBattle, path)
                        if (arrayToMutate) {
                            lodash.set(
                                currentBattle,
                                path,
                                arrayToMutate.filter((unit) => {
                                    return unit.id !== value
                                })
                            )
                        }
                    } else if (type === "splice") {
                        const arrayToMutate = lodash.get(currentBattle, path)
                        if (arrayToMutate) {
                            arrayToMutate.splice(value, 1)
                        }
                    }
                })

                startBattle(currentBattle, this_template)
            })

        window.battleSocket &&
            window.battleSocket.connected &&
            window.battleSocket.emit &&
            window.battleSocket.emit("getFullState")
    }
}

let isFetchingLibraryExtra = false
let tickerId
Template.currentBattleUi.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
    this.state.set("loading", true)
    this.state.set("currentBattle", false)
    this.state.set("onTick", false)
    this.state.set("fullState", false)
    this.state.set("ticker", 0)

    // Resubscribe
    Meteor.subscribe("otherBattlers", 3)
    Meteor.subscribe("battles")
    Meteor.subscribe("users")

    // Todo, clean this up after leaving it
    tickerId = setInterval(() => {
        if (!this.state.get("currentBattle")) {
            // Attempts to fix an issue where you don't get initial state so see a blank battle until next battle
            if (window.battleSocket && window.battleSocket.connected && window.battleSocket.emit) {
                window.battleSocket.emit("getFullState")
                this.state.set("ticker", this.state.get("ticker") + 1)
            }
        }

        if (this.state.get("ticker") > 10) {
            this.state.set("loading", false)
        }
    }, 1000)

    this.autorun(() => {
        if (isFetchingLibraryExtra || this.state.get("abilityLibraryExtra")) return

        isFetchingLibraryExtra = true

        // Fetch extra ability details that the server holds
        const currentInstanceRef = this
        Meteor.call("abilities.fetchLibraryExtra", function (err, data) {
            if (!err) {
                try {
                    currentInstanceRef.state.set("abilityLibraryExtra", data)
                } catch (err) {
                    console.log("abilities.fetchLibraryExtra() API error", err)
                }
            }
        })

        isFetchingLibraryExtra = false
    })

    Tracker.autorun(() => {
        //console.log(this.state.get('ticker')); // konk left this debug in, disabling it for now (psouza4: 2018-10-30)

        // Lots of hacks follow, I'm so sorry

        // code segment to reconnect to battle socket
        const currentBattleList = BattlesList.findOne({
            owners: Meteor.userId()
        })
        const currentGroup = Groups.findOne({
            members: Meteor.userId()
        })
        if (!currentBattleList) {
            this.state.set("currentBattle", false)
            return
        }
        let localBalancer = Meteor.userId()
        if (currentGroup) {
            localBalancer = currentGroup.balancer
        }
        if (!this.state.get("battleEndsAt")) {
            this.state.set(
                "battleEndsAt",
                moment(currentBattleList.createdAt)
                    .add(currentBattleList.isBigBoss ? 30 : 10, "minutes")
                    .toDate()
            )
        }
        if (!window.battleSocket || !window.battleSocket.hasUser || localBalancer !== window.balancer) {
            let userData = {}
            try {
                userData.id = Meteor.userId().toString()
                let foundUser = Users.findOne({ _id: userData.id })
                if (foundUser && foundUser.username) {
                    userData.name = foundUser.username
                }
            } catch (err) {}

            const template_ref = this

            reconnectBattleSocket(localBalancer, currentBattleList, userData, function () {
                window.reconnectionTrigger && window.reconnectionTrigger(template_ref)
            })
        } else if (window.reconnectionTrigger) {
            window.reconnectionTrigger(this)
        }
        // end code segment to reconnect to battle socket
    })
})

Template.currentBattleUi.onDestroyed(function () {
    window.battleSocket && window.battleSocket.removeListener && window.battleSocket.removeListener("tick")
    window.battleSocket && window.battleSocket.removeListener && window.battleSocket.removeListener("fullState")
    clearInterval(tickerId)
})

Template.currentBattleUi.events({
    "click .forfeit-battle"(event, instance) {
        // Mark battle as stale.
        Meteor.call("battles.killBattle", Meteor.userId())
    }
})

Template.currentBattleUi.helpers({
    currentBattle() {
        const currentBattle = Template.instance().state.get("currentBattle")

        if (!currentBattle) {
            return {}
        }

        return currentBattle
    },

    battleEndsAt() {
        return Template.instance().state.get("battleEndsAt")
    },

    battleLevelDesc() {
        const currentBattle = Template.instance().state.get("currentBattle")

        if (currentBattle) {
            if (currentBattle.level && currentBattle.wave) {
                return `L${currentBattle.level} W${currentBattle.wave}`
            }
            else if (currentBattle.floor && currentBattle.room) {
                if (currentBattle.room == "boss") {
                    return `F${currentBattle.floor} Boss`
                } else {
                    return `F${currentBattle.floor} R${currentBattle.room}`
                }
            }
        }
        return false
    },

    unitClicked() {
        const instance = Template.instance()
        return function (unitId) {
            // Current Battle
            const currentBattle = instance.state.get("currentBattle")

            // Amulet Stats
            const myUnit = instance.state.get("myUnit")

            if (!$("body").hasClass("targetting-enemies")) {
                if ((myUnit && myUnit.amulet && myUnit.amulet.energy >= 1) || myUnit.target !== unitId) {
                    const battleId = currentBattle._id
                    const casterId = Meteor.userId()

                    if (window.battleSocket && window.battleSocket.connected && window.battleSocket.emit) {
                        // Gonna require the socket here
                        window.battleSocket.emit("action", {
                            battleSecret: Meteor.user().battleSecret,
                            abilityId: "clickAttack",
                            targets: [unitId],
                            caster: Meteor.userId()
                        })
                    }
                }
            }
        }
    },

    changeTargetAbility() {
        return {
            id: "changeTarget",
            icon: "changeTarget.svg",
            description: "Select a target to attack",
            name: "Attack Target",
            slot: "changeTarget",
            hotkey: "t",
            target: "singleEnemy",
            currentCooldown: 0,
            targettable: true
        }
    },

    equippedAbilities() {
        const myAbilities = Abilities.findOne()
        if (!myAbilities) {
            return
        }

        const abilityIndexes = {
            mainHand: 0,
            offHand: 1,
            head: 2,
            chest: 3,
            legs: 4,
            classAbil1: 5,
            classAbil2: 6,
            classAbil3: 7,
            companion: 36
        }

        const currentBattle = Template.instance().state.get("currentBattle")

        if (!currentBattle) {
            return
        }
        const myUnit = _.findWhere(currentBattle.units, { owner: Meteor.userId() })
        const abilityMap = {}

        if (myUnit) {
            myUnit.abilities.forEach((ability) => {
                abilityMap[ability.id] = {
                    currentCooldown: ability.currentCooldown,
                    casts: ability.casts,
                    id: ability.id
                }
            })
        }

        const instanceDataToUse = Template.instance().state.get("abilityLibraryExtra")
        let abilitiesConstantsFromMeteorAPI = {}
        if (instanceDataToUse) {
            abilitiesConstantsFromMeteorAPI = Object.fromEntries(instanceDataToUse.map((k) => [k.id, k]))
        }

        const equippedAbilities = myAbilities.learntAbilities
            .map((ability) => {
                ability.index = abilityIndexes[ability.slot]
                // some abilities can't be used manually, so they don't get a hotkey
                if (
                    (ability.slot === "companion") ||
                    (abilitiesConstantsFromMeteorAPI && abilitiesConstantsFromMeteorAPI.hasOwnProperty(ability?.abilityId) && abilitiesConstantsFromMeteorAPI[ability?.abilityId]?.isPassive)
                ) {
                    ability.hotkey = ""
                } else {
                    ability.hotkey = ability.index + 1
                }
                return ability
            })
            .filter((ability) => {
                if (abilityMap[ability.abilityId]) {
                    ability.currentCooldown = abilityMap[ability.abilityId].currentCooldown
                    ability.casts = abilityMap[ability.abilityId].casts
                }
                return ability.equipped
            })

        return _.sortBy(equippedAbilities, "index")
    },

    myUnitsBuffs() {
        const instance = Template.instance()

        if (instance && instance.state.get("myUnit")) {
            return instance.state.get("myUnit").buffs
        }
    },

    myUnitsAmulet() {
        const instance = Template.instance()

        if (instance && instance.state.get("myUnit")) {
            return (instance.state.get("myUnit")?.amulet?.energyStorage > 0) ? instance.state.get("myUnit")?.amulet : false
        }
    }
})
