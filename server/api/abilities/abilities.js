import { Meteor } from "meteor/meteor"
import { tx } from "meteor/babrahams:transactions"

import lodash from "lodash"
import _ from "underscore"
import moment from "moment"

import { Abilities } from "/imports/api/abilities/abilities"
import { BattlesList } from "/imports/api/battles/battles"
import { userCurrentClass } from "/imports/api/classes/classes.js"
import { Items } from "/imports/api/items/items"
import { Skills } from "/imports/api/skills/skills"
import { requirementsUtility } from "/server/api/crafting/crafting"

import { BUFFS } from "/imports/constants/buffs/index.js"
import { ITEMS } from "/imports/constants/items/index"
import { ABILITIES, ABILITY } from "/server/constants/combat/index"
import { MAGIC } from "/server/constants/magic/index"

import { getBuffLevel } from "/imports/api/globalbuffs/globalbuffs.js"
import { userUnequipAllAbilities } from "/server/api/classes/classes.js"
import { consumeItem } from "/server/api/items/items"
import { spellData } from "/server/constants/magic"

export const updateAbilityCooldowns = function updateAbilityCooldowns(userId, callback) {
    let owner = userId
    if (!owner) {
        owner = this.userId
    }

    const myAbilities = Abilities.findOne({ owner })
    if (!myAbilities) {
        return
    }

    const now = moment()
    const secondsElapsed = moment.duration(now.diff(myAbilities.lastGameUpdated)).asSeconds()

    myAbilities.learntAbilities.forEach((ability) => {
        /* if (ability.currentCooldown > 0) {
      ability.currentCooldown -= secondsElapsed * 2;
    } else if (ability.cooldown < 0) {
      ability.currentCooldown = 0;
    } */

        ability.currentCooldown = 0 // 2018-11-10 psouza4: ability cooldowns reset after combat now, why make people wait when there's an energy limit anyway?
        //                     players are simply chosing abilities with very short CD's and not using more interesting abilities as a result
    })

    Abilities.update(
        myAbilities._id,
        {
            $set: {
                learntAbilities: myAbilities.learntAbilities,
                lastGameUpdated: new Date()
            }
        },
        callback
    )
}

const allAbilitiesCooledDown = function (userId) {
    let owner = userId
    if (!owner) {
        owner = this.userId
    }
    const myAbilities = Abilities.findOne({ owner })
    return _.isUndefined(
        _.find(myAbilities.learntAbilities, (ability) => {
            return ability.currentCooldown > 0
        })
    )
}

Meteor.methods({
    "abilities.unequip"(slot) {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //  Big ol' debug thing
        //
        try {
            const logUserDoc = Meteor.user()
            if (logUserDoc) {
                console.log(`\x1b[33m[API] ${logUserDoc.username} ${logUserDoc.clientIp} "\x1b[1mabilities.unequip\x1b[22m"(${slot})\x1b[0m`)
                if (logUserDoc.xpActionsBlocked) {
                    throw new Meteor.Error("action-locked", "That action is blocked; please contact support.")
                }
            }
        } catch (err) {}
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        // Make sure this is a valid slot
        if (_.contains(ABILITY.slots, slot)) {
            // Unequip specified slot
            Abilities.update(
                {
                    owner: Meteor.userId(),
                    learntAbilities: {
                        $elemMatch: {
                            slot,
                            equipped: true
                        }
                    }
                },
                {
                    $set: {
                        "learntAbilities.$.equipped": false
                    }
                }
            )
        }
    },

    /* "abilities.craftSpell"(abilityId, amount) {
        const currentBattle = BattlesList.findOne({ owners: Meteor.userId() })
        if (currentBattle) {
            throw new Meteor.Error("in-battle", "You cannot craft spells while in a battle")
        }

        // Do we have resources to craft this spell?
        const spellConstants = MAGIC.spells[abilityId]

        if (!spellConstants) {
            throw new Meteor.Error("invalid-spell", "invalid spell")
        }

        // Are we crafting at least one item
        if (amount <= 0) {
            throw new Meteor.Error("cant-craft", "Choose a positive quantity of spells to craft.")
        }

        if (!requirementsUtility(spellConstants.required, amount)) {
            throw new Meteor.Error("missed-requirements", "don't meet requirements")
        }

        // Update existing level
        Abilities.update(
            {
                owner: Meteor.userId(),
                "learntAbilities.abilityId": abilityId
            },
            {
                $inc: {
                    "learntAbilities.$.casts": amount
                }
            }
        )
    }, */

    /* "abilities.fetchSpellCrafting"() {
        // Get my abilities
        const myAbilities = Abilities.findOne({ owner: Meteor.userId() })
        const mySpellAbilities = myAbilities.learntAbilities
            .filter((ability) => {
                return ability.isSpell
            })
            .map((ability) => {
                ability.icon = ABILITIES[ability.abilityId].icon
                ability.name = ABILITIES[ability.abilityId].name
                ability.required = MAGIC.spells[ability.abilityId].required
                ability.maxToCraft = MAGIC.spells[ability.abilityId].maxToCraft
                return ability
            })

        // Merge with required items to craft said abilities
        return mySpellAbilities
    }, */

    "abilities.fetchSpells"() {
        // Get my abilities
        const myAbilities = Abilities.findOne({ owner: Meteor.userId() })
        const mySpellAbilities = myAbilities.learntAbilities
            .filter((ability) => {
                return ability.isSpell
            })
            .map((ability) => {
                ability.icon = ABILITIES[ability.abilityId].icon
                ability.name = ABILITIES[ability.abilityId].name
                ability.required = MAGIC.spells[ability.abilityId].required
                //ability.maxToCraft = MAGIC.spells[ability.abilityId].maxToCraft
                ability.costs = ABILITIES[ability.abilityId].magic // spellData(ability.abilityId) // handled on startup now

                if (BUFFS && BUFFS[ability.abilityId]) {
                    if (_.isFunction(BUFFS[ability.abilityId]?.description)) {
                        ability.description = BUFFS[ability.abilityId].description({
                            buff: BUFFS[ability.abilityId],
                            level: 1,
                            characterClass: userCurrentClass()
                        })
                    }
                }

                return ability
            })

        // Merge with required items to craft said abilities
        return mySpellAbilities
    },

    "abilities.unequipAll"() {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //  Big ol' debug thing
        //
        try {
            const logUserDoc = Meteor.user()
            if (logUserDoc) {
                console.log(`\x1b[33m[API] ${logUserDoc.username} ${logUserDoc.clientIp} "\x1b[1mabilities.unequipall\x1b[22m"()\x1b[0m`)
                if (logUserDoc.xpActionsBlocked) {
                    throw new Meteor.Error("action-locked", "That action is blocked; please contact support.")
                }
            }
        } catch (err) {}
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        userUnequipAllAbilities(Meteor.userId())
    },

    "abilities.equip"(abilityId) {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //  Big ol' debug thing
        //
        try {
            const logUserDoc = Meteor.user()
            if (logUserDoc) {
                console.log(`\x1b[33m[API] ${logUserDoc.username} ${logUserDoc.clientIp} "\x1b[1mabilities.equip\x1b[22m"("${abilityId}")\x1b[0m`)
                if (logUserDoc.xpActionsBlocked) {
                    throw new Meteor.Error("action-locked", "That action is blocked; please contact support.")
                }
            }
        } catch (err) {}
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        tx.start("Equip ability")

        // Make sure the user actually has the specified ability
        const myAbilities = Abilities.findOne({ owner: Meteor.userId() }, { tx: true })
        const targetEquip = _.findWhere(myAbilities.learntAbilities, { abilityId })

        if (!targetEquip) {
            tx.cancel()
            throw new Meteor.Error("not-learnt", "You haven't learned this ability.")
        }

        const userClass = userCurrentClass()

        const targetEquipConstants = ABILITIES[targetEquip.abilityId]

        if (targetEquipConstants.slot === "any") {
            // Look for first empty slot
            let availableSlots = lodash.cloneDeep(ABILITY.slots)

            // Remove from available slots any equipped abilities
            myAbilities.learntAbilities.forEach((ability) => {
                if (ability.equipped) {
                    availableSlots = availableSlots.filter((slot) => {
                        // User does not have the Classes feature unlocked yet, so nothing can be slotted into 'classAbil1', 'classAbil2', or 'classAbil3' at all
                        if (!userClass.unlocked) {
                            if (slot.indexOf("class") === 0) {
                                return false
                            }
                            // else fall through and use default logic
                        } else {
                            if (userClass.equipped === "tactician") {
                                // anything goes anywhere (except companion abilities)
                                // (do nothing there -- just fall through and use default logic)
                            } else {
                                // all classes except tactician force 5 active and 3 passive abilities as a cap

                                if (ABILITY.slotsForClasses[slot].allowedType === "active") {
                                    if (targetEquipConstants?.isPassive) {
                                        // not allowed to use a passive ability in an active-only slot
                                        return false
                                    }
                                } else if (ABILITY.slotsForClasses[slot].allowedType === "passive") {
                                    if (!targetEquipConstants?.isPassive) {
                                        // not allowed to use an active ability in a passive-only slot
                                        return false
                                    }
                                }

                                // else fall through and use default logic
                            }
                        }
                        return slot !== ability.slot && slot !== "companion" // 'any' equipped abilities can't fit into companion slots
                    })
                }
            })

            if (userClass.unlocked) {
                if (availableSlots.length === ABILITY.slots.length) {
                    if (userClass.equipped === "tactician") {
                        // anything goes anywhere (except companion abilities)
                        // (do nothing there -- just fall through and use default logic)
                    } else {
                        // all classes except tactician force 5 active and 3 passive abilities as a cap

                        if (targetEquipConstants?.isPassive) {
                            // force passive abilities to be used in passive-only slots
                            availableSlots = ABILITY.passiveSlots
                        }
                        if (!targetEquipConstants?.isPassive) {
                            // force active abilities to be used in active-only slots
                            availableSlots = ABILITY.activeSlots
                        }

                        // else fall through and use default logic
                    }
                }
            }

            if (availableSlots.length > 0) {
                const slotToUse = availableSlots[0]
                targetEquip.equipped = true
                targetEquip.slot = slotToUse
            }
        } else {
            // Unequip abilities on the same slot
            myAbilities.learntAbilities.forEach((ability) => {
                if (ability.equipped) {
                    if (ability.slot === targetEquipConstants.slot) {
                        ability.equipped = false
                    }
                }
            })

            // Equip specified ability
            targetEquip.equipped = true
            targetEquip.slot = targetEquipConstants.slot
        }

        Abilities.update(
            myAbilities._id,
            {
                $set: {
                    learntAbilities: myAbilities.learntAbilities
                }
            },
            { tx: true }
        )

        tx.commit() // commit transaction: "Equip ability"
    },

    "abilities.learn"(_id, itemId) {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //  Big ol' debug thing
        //
        try {
            const logUserDoc = Meteor.user()
            if (logUserDoc) {
                console.log(`\x1b[33m[API] ${logUserDoc.username} ${logUserDoc.clientIp} "\x1b[1mabilities.learn\x1b[22m"("${_id}", "${itemId}")\x1b[0m`)
                if (logUserDoc.xpActionsBlocked) {
                    throw new Meteor.Error("action-locked", "That action is blocked; please contact support.")
                }
            }
        } catch (err) {}
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //tx.start("Learn ability" /*, {rethrowCommitError: true} */);

        // Make sure we have this item
        const tome = Items.findOne({ owner: Meteor.userId(), itemId }, { tx: true })

        if (!tome) {
            //tx.cancel();
            return
        }

        // Check what this teaches
        const tomeConstants = ITEMS[itemId]

        // Fetch existing abilities
        const myAbilities = Abilities.findOne({ owner: Meteor.userId() }, { tx: true })

        // Filter down to existing ability
        const hasTargetAbility = _.findWhere(myAbilities.learntAbilities, {
            abilityId: tomeConstants.teaches.abilityId
        })

        // Is existing ability equal or above level off target tomb?
        if (hasTargetAbility && hasTargetAbility.level >= tomeConstants.teaches.level) {
            //tx.cancel();
            throw new Meteor.Error("already-learnt", "You've already learned this ability.")
        }

        // Make sure if this is above level 1, we already have the previous level
        if (
            tomeConstants.teaches.level > 1 &&
            (!hasTargetAbility || hasTargetAbility.level + 1 !== tomeConstants.teaches.level)
        ) {
            //tx.cancel();
            throw new Meteor.Error("not-learnt-previous", "You must learn the earlier levels of this ability first.")
        }

        // Okay all is good, remove the tome
        consumeItem(tome, 1)

        // Get ability constants
        const abilityConstants = ABILITIES[tomeConstants.teaches.abilityId]

        // Add to learnt abilities
        if (hasTargetAbility) {
            // Update existing level
            Abilities.update(
                {
                    _id: myAbilities._id,
                    "learntAbilities.abilityId": hasTargetAbility.abilityId
                },
                {
                    $set: {
                        "learntAbilities.$.level": tomeConstants.teaches.level
                        // because of positional $ operator, this can't be used with the transaction module
                        // see: https://docs.mongodb.com/manual/reference/operator/update/positional/#up._S_
                        // see: https://github.com/JackAdams/meteor-transactions ("Thing's it's helpful to know")
                    }
                } /*, {tx: true} */
            )
        } else {
            Abilities.update(
                myAbilities._id,
                {
                    $push: {
                        learntAbilities: {
                            abilityId: tomeConstants.teaches.abilityId,
                            level: 1,
                            equipped: false,
                            isSpell: abilityConstants.isMagic,
                            casts: abilityConstants.isMagic ? 1 : undefined,
                            currentCooldown: 0
                        }
                    }
                } /*, {tx: true} */
            )
        }

        /*
    tx.commit((err,res) => { // Commit transaction: "Learn ability"
      if (err) {
        console.log(this, err, res);
        throw new Meteor.Error("transaction-error", `Couldn't learn this ability due to technical issues.<br /><br />${err}`);
      }
    });
    */
    },

    "abilities.unlearn"(_id) {
        // Fetch existing abilities
        const myAbilities = Abilities.findOne({ owner: Meteor.userId() })

        Abilities.update(myAbilities._id, {
            $pull: {
                learntAbilities: {
                    abilityId: _id
                }
            }
        })
    },

    "abilities.fetchLibrary"() {
        const userAbilities = Abilities.findOne({
            owner: Meteor.userId()
        })

        // Build up abilities id to level map
        const abilitiesMap = {}
        userAbilities.learntAbilities.forEach((ability) => {
            abilitiesMap[ability.abilityId] = ability.level
        })

        const townArmoryBuffLevel = getBuffLevel("town_armory")

        const abilitiesArray = Object.keys(ABILITIES)
            .map((abilityKey) => {
                const abilityConstant = ABILITIES[abilityKey] // removed lodash.cloneDeep() here, no chance to mutate this, so no need to clone
                let abilityLevel = 1
                let learntLevel = 0
                if (abilitiesMap[abilityKey]) {
                    abilityLevel = abilitiesMap[abilityKey]
                    learntLevel = abilitiesMap[abilityKey]
                }
                const abilityData = {
                    description: abilityConstant.description(abilityLevel, townArmoryBuffLevel),
                    name: (abilityLevel > 1) ? `${abilityConstant.name} (level ${abilityLevel})` : abilityConstant.name,
                    icon: abilityConstant.icon,
                    isHidden: abilityConstant.isHidden,
                    cooldown: abilityConstant.cooldown,
                    isMagic: abilityConstant.isMagic || false,
                    isPassive: abilityConstant.isPassive || false,
                    isPacifist: abilityConstant.isPacifist || false,
                    requires: abilityConstant.requires,
                    cantUseWith: abilityConstant.cantUseWith,
                    learntLevel,
                    level: abilityLevel,
                    id: abilityConstant.id
                }

                return abilityData
            })
            .filter((ability) => {
                return !(ability.isHidden && !abilitiesMap[ability.id])
            })

        return abilitiesArray
    },

    "abilities.getAbilityInfo"(abilityId, level) {
        level = level || 1
        return { ability: ABILITIES[abilityId], description: ABILITIES[abilityId].description(level) }
    },

    "abilities.getCount"() {
        return Object.keys(ABILITIES).length
    },

    "abilities.fetchLibraryExtra"() {
        const userAbilities = Abilities.findOne({
            owner: Meteor.userId()
        })

        const usersSkills = Skills.find({
            owner: Meteor.userId()
        }).fetch()

        const usersSkillsArray = usersSkills.map((skill) => {
            return {
                id: skill._id,
                type: skill.type,
                xp: skill.xp,
                totalXp: skill.totalXp,
                level: skill.level
            }
        })

        // Build up abilities id to level map
        const abilitiesMap = {}
        if (userAbilities.learntAbilities) {
            userAbilities.learntAbilities.forEach((ability) => {
                abilitiesMap[ability.abilityId] = ability.level
            })
        }

        const townArmoryBuffLevel = getBuffLevel("town_armory")

        const abilitiesArray = Object.keys(ABILITIES)
            .map((abilityKey) => {
                const abilityConstant = ABILITIES[abilityKey] // removed lodash.cloneDeep() here, no chance to mutate this, so no need to clone
                let abilityLevel = 1
                let learntLevel = 0
                if (abilitiesMap[abilityKey]) {
                    abilityLevel = abilitiesMap[abilityKey]
                    learntLevel = abilitiesMap[abilityKey]
                }
                const descToUse = _.isFunction(abilityConstant.betterDescription)
                    ? abilityConstant.betterDescription({
                          level: abilityLevel,
                          playerSkills: usersSkillsArray,
                          armoryLevel: townArmoryBuffLevel
                      })
                    : abilityConstant.description(abilityLevel, townArmoryBuffLevel)
                const abilityData = {
                    description: descToUse,
                    name: (abilityLevel > 1) ? `${abilityConstant.name} (level ${abilityLevel})` : abilityConstant.name,
                    icon: abilityConstant.icon,
                    isHidden: abilityConstant.isHidden,
                    cooldown: abilityConstant.cooldown,
                    requires: abilityConstant.requires,
                    learntLevel,
                    level: abilityLevel,
                    id: abilityConstant.id,
                    slot: abilityConstant.slot || "any",
                    buff: abilityConstant.buffs && abilityConstant.buffs.length > 0 ? abilityConstant.buffs[0] : "",
                    isPassive: abilityConstant.isPassive || false,
                    isPacifist: abilityConstant.isPacifist || false,
                    isMagic: abilityConstant.isMagic || false,
                    requires: abilityConstant.requires,
                    cantUseWith: abilityConstant.cantUseWith
                }

                return abilityData
            })
            .filter((ability) => {
                return !(ability.isHidden && !abilitiesMap[ability.id])
            })

        return abilitiesArray
    }

    /*
  'abilities.gameUpdate'() {
    return new Promise(function(resolve, reject) {
      updateAbilityCooldowns(Meteor.userId(), (err, res) => {
        if (_.isNull(err)) {
          resolve(allAbilitiesCooledDown(Meteor.userId()));
        } else {
          reject(err);
        }
      });
    })
  }
  */
})

const MINUTE = 60 * 1000

// DDPRateLimiter.addRule({ type: 'method', name: 'abilities.unequip' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'abilities.equip' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'abilities.learn' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'abilities.fetchLibrary' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'abilities' }, 100, 5 * MINUTE);

Meteor.publish("abilities", function () {
    //Transform function
    const transform = function (doc) {
        doc.learntAbilities.forEach((ability) => {
            const abilityConstant = ABILITIES[ability.abilityId]

            ability.description = ABILITIES[ability.abilityId].description(ability.level, getBuffLevel("town_armory"))
            if (ability.level > 1) {
                ability.name = `${abilityConstant.name} (level ${ability.level})`
            } else {
                ability.name = abilityConstant.name
            }
            ability.icon = abilityConstant.icon
            ability.cooldown = abilityConstant.cooldown
            ability.level = ability.level
            ability.id = abilityConstant.id
            ability.targettable = abilityConstant.targettable
            ability.target = abilityConstant.target
            ability.requires = abilityConstant.requires
            ability.cantUseWith = abilityConstant.cantUseWith

            return ability
        })
        return doc
    }

    const self = this

    const observer = Abilities.find({
        owner: this.userId
    }).observe({
        added: function (document) {
            self.added("abilities", document._id, transform(document))
        },
        changed: function (newDocument, oldDocument) {
            self.changed("abilities", oldDocument._id, transform(newDocument))
        },
        removed: function (oldDocument) {
            self.removed("abilities", oldDocument._id)
        }
    })

    self.onStop(function () {
        observer.stop()
    })

    self.ready()
})
