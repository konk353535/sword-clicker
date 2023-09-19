import { Chats } from "meteor/cesarve:simple-chat/collections"
import { Meteor } from "meteor/meteor"
import moment from "moment"
import { Combat } from "/imports/api/combat/combat"
import { State } from "/imports/api/state/state"
import { Users } from "/imports/api/users/users"

import { STATE_BUFFS } from "/imports/constants/state"
import { PLAYER_ICONS } from "/imports/constants/shop"

import { activateGlobalBuff, getActiveGlobalBuff, getGlobalBuff } from "/imports/api/globalbuffs/globalbuffs"
import { updateUserActivity } from "/imports/api/users/users.js"
import { addItem, addRealGems, consumeGems, consumeOnlyRealGems, hasGems } from "/server/api/items/items.js"

import _ from "underscore"
import lodash from "lodash"

const stripe = require("stripe")(Meteor.settings.private.stripe)

Meteor.methods({
    "shop.fetchGlobalBuffs"() {
        return State.find({
            name: {
                $in: Object.values(STATE_BUFFS)
            }
        })
    },

    "shop.buyGlobalBuff"(type) {
        if (!_.contains(Object.values(STATE_BUFFS), type)) {
            throw new Meteor.Error("invalid-type", "Invalid type")
        }

        const GEM_COST = 100

        const friendlyNames = {
            buffCrafting: "crafting",
            buffCombat: "combat",
            buffGathering: "gathering"
        }

        // Does the user have 100 gems?
        const userDoc = Meteor.user()

        if (userDoc.gems < GEM_COST) {
            throw new Meteor.Error("gems-too-low", "You don't have enough gems")
        }

        let globalBuff = getActiveGlobalBuff(type)
        const newBuff = globalBuff === undefined || globalBuff === false

        // Take me gems!
        if (!consumeOnlyRealGems(GEM_COST, Meteor.user())) {
            throw new Meteor.Error("gems-too-low", "You don't have enough gems")
        }

        if (!activateGlobalBuff({ buffType: type, timeAmt: 1, time: "hour" })) {
            addRealGems(GEM_COST, Meteor.userId()) // give them back their gems on error
            throw new Meteor.Error("exception", "Server error activating this buff.")
        }

        globalBuff = getGlobalBuff(type)
        const remaining =
            newBuff || !globalBuff
                ? "1 hour"
                : moment.duration(moment(globalBuff.value.activeTo).diff(moment())).humanize()
        const activateMessage = `${userDoc.username} has ${newBuff ? "activated" : "extended"} the ${
            friendlyNames[type]
        } buff for all players (${remaining} remaining)!`

        Chats.insert({
            message: activateMessage,
            username: "SERVER",
            name: "SERVER",
            date: new Date(),
            custom: {
                roomType: "Game"
            },
            roomId: `General`
        })

        updateUserActivity({ userId: Meteor.userId() })
    },

    "shop.buyMembership"(days) {
        if (!_.contains([15, 30], days)) {
            throw new Meteor.Error("not-valid-days", "Not valid day amount")
        }

        // Check user has the correct # of gems to buy membership
        let requiredGems = 900
        let unlockFarming = false

        if (days === 15) {
            requiredGems = 500
        }

        if (!hasGems(requiredGems, Meteor.user())) {
            throw new Meteor.Error("no-gems", "Not enough gems")
        }

        // Add X days to all upgrade types
        const types = ["mining", "crafting", "combat", "woodcutting", "farming", "inscription", "astronomy"]
        const setModifier = {}

        types.forEach((type) => {
            // Add X days to specified type of membership
            let membershipTo = Meteor.user()[`${type}UpgradeTo`]
            if (!membershipTo || moment().isAfter(membershipTo)) {
                membershipTo = moment().add(days, "days").toDate()
            } else {
                membershipTo = moment(membershipTo).add(days, "days").toDate()
            }

            setModifier[`${type}UpgradeTo`] = membershipTo
        })

        if (consumeGems(requiredGems, Meteor.user())) {
            // Update membership to
            Users.update(
                {
                    _id: Meteor.userId()
                },
                {
                    $set: setModifier
                }
            )
        }

        updateUserActivity({ userId: Meteor.userId() })
    },

    "shop.buySingle"({ days, type }) {
        if (!_.contains([15, 30], days)) {
            throw new Meteor.Error("not-valid-days", "Not valid day amount")
        }

        if (!_.contains(["mining", "crafting", "combat", "woodcutting", "farming", "inscription", "astronomy"], type)) {
            throw new Meteor.Error("not-valid-type", "Not valid type")
        }

        // Check user has the correct # of gems to buy membership
        let requiredGems = 200

        if (days === 15) {
            requiredGems = 100
        }

        if (!hasGems(requiredGems, Meteor.user())) {
            throw new Meteor.Error("no-gems", "Not enough gems")
        }

        // Add X days to specified type of membership
        let membershipTo = Meteor.user()[`${type}UpgradeTo`]
        if (!membershipTo || moment().isAfter(membershipTo)) {
            membershipTo = moment().add(days, "days").toDate()
        } else {
            membershipTo = moment(membershipTo).add(days, "days").toDate()
        }

        const setModifier = {}
        setModifier[`${type}UpgradeTo`] = membershipTo

        if (consumeGems(requiredGems, Meteor.user())) {
            // Update membership to
            Users.update(
                {
                    _id: Meteor.userId()
                },
                {
                    $set: setModifier
                }
            )
        }

        updateUserActivity({ userId: Meteor.userId() })
    },

    "shop.buyIcon"(iconId) {
        const validIcons = [
            { id: "tank_pack", cost: 300 },
            { id: "damage_pack", cost: 300 },
            { id: "archer_pack", cost: 300 },
            { id: "mage_pack", cost: 300 },
            { id: "crow_pack", cost: 300 },
            { id: "phoenix_pack", cost: 300 }
        ]

        const iconToBuy = _.findWhere(validIcons, { id: iconId })
        if (!iconToBuy) {
            throw new Meteor.Error("invalid-item", "Invalid item")
        }

        if (!hasGems(iconToBuy.cost, Meteor.user())) {
            throw new Meteor.Error("no-gems", "Not enough gems")
        }

        // Make sure user doesn't already have target icon
        const userCombat = Combat.findOne({
            owner: Meteor.userId()
        })

        // construct an object that contains the icons from the pack
        const packIcons = lodash.pickBy(PLAYER_ICONS, (icon) => {
            return icon.group === iconId
        })
        const ownedIcons = userCombat.boughtIcons ?? []

        // find the difference from the ones in the pack compared to the ones already owned
        // and get the IDs of those new icons to award
        const iconsToAdd = Object.keys(lodash.pickBy(packIcons, (icon, name) => !ownedIcons.includes(name)))

        if (iconsToAdd.length === 0) {
            // no new icons to add, abort
            throw new Meteor.Error("already-own", "Already own those icons")
        }

        if (consumeGems(iconToBuy.cost, Meteor.user())) {
            // Add the icon
            if (!userCombat.boughtIcons) {
                userCombat.boughtIcons = iconsToAdd
            } else {
                userCombat.boughtIcons.push(...iconsToAdd)
            }
        }

        if (!userCombat.bonusIcons) {
            userCombat.bonusIcons = []
        }

        // Update combat
        Combat.update(
            {
                owner: Meteor.userId()
            },
            {
                $set: {
                    boughtIcons: userCombat.boughtIcons
                }
            }
        )

        updateUserActivity({ userId: Meteor.userId() })
    },

    "shop.buyItem"({ itemId }) {
        let validItems = [
            {
                id: "lemonade",
                cost: 10
            }
        ]

        const itemToBuy = _.findWhere(validItems, { id: itemId })
        if (!itemToBuy) {
            throw new Meteor.Error("invalid-item", "Invalid item")
        }

        if (!hasGems(itemToBuy.cost, Meteor.user())) {
            throw new Meteor.Error("no-gems", "Not enough gems")
        }

        if (consumeGems(itemToBuy.cost, Meteor.user())) {
            addItem(itemToBuy.id, 1, Meteor.userId())
        }

        updateUserActivity({ userId: Meteor.userId() })
    },

    "shop.buyEnhancerKey"() {
        // Check user has the correct # of gems to key
        let requiredGems = 100

        if (!hasGems(requiredGems, Meteor.user())) {
            throw new Meteor.Error("no-gems", "Not enough gems")
        }

        if (consumeGems(requiredGems, Meteor.user())) {
            addItem("enhancer_key", 1, Meteor.userId())
        }

        updateUserActivity({ userId: Meteor.userId() })
    },

    "shop.purchaseWithRaiBlocks"({ token, item_id }) {
        // Lookup itemId, confirm that its price matches what was paid
        const ITEMS = {
            someGems: {
                price: 5,
                gems: 5
            },
            bunchOfGems: {
                price: 499,
                gems: 500
            }
        }

        if (!ITEMS[item_id]) {
            throw new Meteor.Error("Invalid item id given")
        }

        const amount = ITEMS[item_id].price

        const handleCharge = HTTP.post("https://arrowpay.io/api/payment/handle", {
            data: {
                payment: {
                    amount,
                    currency: "USD"
                },
                token
            }
        })

        if (handleCharge && handleCharge.data && handleCharge.data.id) {
            // Credit our account!
            Users.update(
                {
                    _id: Meteor.userId()
                },
                {
                    $inc: {
                        gems: ITEMS[item_id].gems
                    }
                }
            )
        } else {
            // Throw an err
            throw new Meteor.Error("rai blocks payment failed")
        }
    },

    "shop.purchase"({ token, currentPack }) {
        if (!_.contains(["bunch", "bag", "box"], currentPack)) {
            throw new Meteor.Error("invalid-pack-type", "Pack type can only be bunch, bag or box")
        }
        let handleCharge = Meteor.wrapAsync(stripe.charges.create, stripe.charges)

        let payment
        try {
            if (currentPack === "bunch") {
                payment = handleCharge({
                    amount: 499,
                    currency: "usd",
                    description: "Bunch Of Gems",
                    source: token,
                    metadata: {
                        userId: Meteor.userId(),
                        username: Meteor.user().username
                    }
                })
            } else if (currentPack === "bag") {
                payment = handleCharge({
                    amount: 1999,
                    currency: "usd",
                    description: "Bag Of Gems",
                    source: token,
                    metadata: {
                        userId: Meteor.userId(),
                        username: Meteor.user().username
                    }
                })
            } else if (currentPack === "box") {
                payment = handleCharge({
                    amount: 4999,
                    currency: "usd",
                    description: "Box Of Gems",
                    source: token,
                    metadata: {
                        userId: Meteor.userId(),
                        username: Meteor.user().username
                    }
                })
            }

            if (payment.id) {
                let newGems = 0
                if (currentPack === "bunch") {
                    newGems = 500
                } else if (currentPack === "bag") {
                    newGems = 2200
                } else if (currentPack === "box") {
                    newGems = 6000
                }

                Users.update(
                    {
                        _id: Meteor.userId()
                    },
                    {
                        $inc: {
                            gems: newGems
                        }
                    }
                )
            }
        } catch (err) {
            throw new Meteor.Error("unknown-error", "Unknown error occurred when attempting to purchase gems")
        }

        return payment
    }
})

const MINUTE = 60 * 1000

// DDPRateLimiter.addRule({ type: 'method', name: 'shop.buyMembership' }, 20, 10 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'shop.purchase' }, 20, 10 * MINUTE);
