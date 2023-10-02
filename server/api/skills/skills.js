import { Meteor } from "meteor/meteor"
import { Items } from "/imports/api/items/items"
import { Skills } from "/imports/api/skills/skills"
import { State } from "/imports/api/state/state"

import lodash from "lodash"
import { Chats } from "meteor/cesarve:simple-chat/collections"
import moment from "moment/moment"
import _ from "underscore"
import { Abilities } from "/imports/api/abilities/abilities"
import { Astronomy } from "/imports/api/astronomy/astronomy"
import { userCurrentClass } from "/imports/api/classes/classes"
import { Combat } from "/imports/api/combat/combat"
import { Crafting } from "/imports/api/crafting/crafting"
import { Farming, FarmingSpace } from "/imports/api/farming/farming"
import { BossHealthScores } from "/imports/api/floors/bossHealthScores"
import { Inscription } from "/imports/api/inscription/inscription"
import { Users } from "/imports/api/users/users"
import { Woodcutting } from "/imports/api/woodcutting/woodcutting"
import { ITEMS } from "/imports/constants/items/index.js"
import { STATE_BUFFS } from "/imports/constants/state"
import { updateCombatStats } from "/server/api/combat/combat"
import { updateMiningStats } from "/server/api/mining/mining.js"
import { ABILITIES } from "/server/constants/combat/abilities.js"
import { SKILLS } from "/server/constants/skills/index.js"

import { getBuffLevel } from "/imports/api/globalbuffs/globalbuffs.js"
import { getUserVersion, updateUserActivity, updateUserVersion } from "/imports/api/users/users.js"
import { CDbl, CInt } from "/imports/utils.js"

let globalXpBuffs = {}

const updateGlobalBuffs = () => {
    const hasCraftingGlobalBuff = !_.isUndefined(
        State.findOne({ name: STATE_BUFFS.crafting, "value.activeTo": { $gte: moment().toDate() } })
    )
    const hasCombatGlobalBuff = !_.isUndefined(
        State.findOne({ name: STATE_BUFFS.combat, "value.activeTo": { $gte: moment().toDate() } })
    )
    const hasGatheringGlobalBuff = !_.isUndefined(
        State.findOne({ name: STATE_BUFFS.gathering, "value.activeTo": { $gte: moment().toDate() } })
    )

    globalXpBuffs = {
        astronomy: hasCombatGlobalBuff,
        woodcutting: hasGatheringGlobalBuff,
        mining: hasGatheringGlobalBuff,
        farming: hasGatheringGlobalBuff,
        crafting: hasCraftingGlobalBuff,
        inscription: hasCraftingGlobalBuff
    }
}

updateGlobalBuffs()
Meteor.setInterval(updateGlobalBuffs, 30000)

export const addXp = function (
    skillType,
    xp,
    specificUserId,
    ignoreGlobalBuffs = false,
    ignoreTownBuffs = false,
    doResetLogic = false
) {
    if ((xp === 0) && (!doResetLogic)) {
        return
    }

    let owner
    if (specificUserId) {
        owner = specificUserId
    } else {
        owner = Meteor.userId()
    }
    const skill = Skills.findOne({ owner, type: skillType })

    if (!skill) {
        return
    }

    //console.log(`Player to receive ${xp} XP to ${skillType}`)

    //console.log(`... ignore global buffs? ${ignoreGlobalBuffs}   ignore personal karma/town buffs?  ${ignoreTownBuffs}   do reset logic?  ${doResetLogic}`)

    const originalXp = skill.xp

    // 100% of XP earned
    let bonusXpPercent = 1

    //console.log(`... base bonus XP multiplier: ${bonusXpPercent}`)

    //console.log(`... global buffs:`)
    //console.log(globalXpBuffs)

    if (!ignoreGlobalBuffs) {
        // global buffs add a 35% XP bonus to their relevant skills
        if (globalXpBuffs[skill.type]) {
            bonusXpPercent += 0.35
        }

        // which are additive to any town/karma buff bonuses
        if (skill.type === "farming") {
            const townBuffDwellingLevel = getBuffLevel("town_dwelling")
            if (townBuffDwellingLevel > 0) {
                bonusXpPercent += Math.ceil((townBuffDwellingLevel + 1) * 0.025) // bonus 2.5% per level (starting at 5% for level 1)
            }
        }

        if (skill.type === "inscription") {
            const townBuffLibraryLevel = getBuffLevel("town_library")
            if (townBuffLibraryLevel > 0) {
                bonusXpPercent += Math.ceil((townBuffLibraryLevel + 1) * 0.025) // bonus 2.5% per level (starting at 5% for level 1)
            }
        }

        if (skill.type === "observatory") {
            const townBuffObservatoryLevel = getBuffLevel("town_observatory")
            if (townBuffObservatoryLevel > 0) {
                bonusXpPercent += Math.ceil((townBuffObservatoryLevel + 1) * 0.025) // bonus 2.5% per level (starting at 5% for level 1)
            }
        }
    }

    //console.log(`... bonus XP multiplier after global buffs: ${bonusXpPercent}`)

    // new 2019-06-24, bonus based on personal karma
    if (!ignoreTownBuffs) {
        const userDoc = Users.findOne({ _id: owner })
        if (userDoc) {
            if (userDoc.townKarma && CInt(userDoc.townKarma) > 0) {
                let personalKarmaBonus =
                    CDbl(userDoc.townKarma) / (Math.pow(1.045, CDbl(skill.level) / 2.5) * 75) / 100.0

                //console.log("karma", CInt(userDoc.townKarma), "skill level", CInt(skill.level), "bonus", personalKarmaBonus);

                // cap personal karma bonus at 200%
                if (personalKarmaBonus > 2.0) {
                    personalKarmaBonus = 2.0
                }

                bonusXpPercent += personalKarmaBonus
            }
        }
    }

    //console.log(`... bonus XP multiplier after personal karma/town buffs: ${bonusXpPercent}`)

    // mutate XP earned by bonus XP (with a final failsafe against bonuses)
    if (!ignoreGlobalBuffs || !ignoreTownBuffs) {
        xp *= bonusXpPercent
    }

    //console.log(`... final gain is ${xp} XP to ${skillType}`)

    skill.xp += xp

    let xpToNextLevel = SKILLS[skill.type].xpToLevel(skill.level)

    if (skill.xp >= xpToNextLevel || doResetLogic) {
        let levelUps = 0

        while (skill.xp >= xpToNextLevel) {
            skill.xp -= xpToNextLevel
            levelUps += 1
            xpToNextLevel = SKILLS[skill.type].xpToLevel(skill.level + levelUps)
        }

        // Update Level
        if (levelUps > 0) {
            const skUpReturn = Skills.update(
                {
                    _id: skill._id
		    // Note: used to also filter by these fields, but it's a performance gain not to and we aren't getting
		    // any benefit from filtering this (no race condition capture logic).
		    /*,
                    xp: originalXp,
                    level: skill.level */
                },
                {
                    $set: {
                        level: skill.level + levelUps,
                        xp: skill.xp
                    },
                    $inc: {
                        totalXp: xp
                    }
                }
            )
        }

        Chats.insert({
            message: `Level Up! You are now level ${skill.level + levelUps} ${skill.type}`,
            username: "Game",
            name: "Game",
            date: new Date(),
            custom: {
                roomType: "Game"
            },
            roomId: `Game-${owner}`
        })

        // If this is attack / Defense / Health recompute combat
        if (skill.type === "attack" || skill.type === "defense" || skill.type === "health" || skill.type === "magic") {
            updateCombatStats(owner)
        } else if (skill.type === "crafting") {
            Crafting.update(
                {
                    owner
                },
                {
                    $set: {
                        craftingLevel: skill.level + levelUps
                    }
                }
            )
        } else if (skill.type === "inscription") {
            Inscription.update(
                {
                    owner
                },
                {
                    $set: {
                        inscriptionLevel: skill.level + levelUps
                    }
                }
            )
        } else if (skill.type === "mining") {
            updateMiningStats(owner, "", true)
        }

        if (!doResetLogic) {
            // Can probably be optimized
            const skUpReturn = Skills.update(
                {
                    owner,
                    type: "total"
                },
                {
                    $inc: { level: levelUps }
                }
            )
        }
    } else {
        // Just update exp
        Skills.update(skill._id, {
            $inc: {
                totalXp: xp,
                xp: xp
            }
        })

        // This can probably be optimized (removed for performance reasons)
        /*
        Skills.update({
            type: 'total',
            owner
        }, {
            $inc: { totalXp: xp }
        })
        */
    }
}

Meteor.methods({
    "skills.learnSkill"(skillName) {
        // Make sure this is a valid skillName
        if (!_.contains(Object.keys(SKILLS), skillName)) {
            return
        }

        const existingSkill = Skills.findOne({ owner: Meteor.userId(), type: skillName })

        // Make sure you have the requirements for this skill
        if (SKILLS[skillName].requirementsToLearn) {
            const requiredItemList = SKILLS[skillName].requirementsToLearn.map((item) => item.itemId)
            // Ensure we have the requirements
            const usersItems = Items.find({
                owner: Meteor.userId(),
                itemId: {
                    $in: requiredItemList
                }
            }).fetch()

            let canLearn = true
            SKILLS[skillName].requirementsToLearn.forEach((requiredItem) => {
                const hasItem = _.findWhere(usersItems, { itemId: requiredItem.itemId })
                if (hasItem && hasItem.amount >= requiredItem.amount) {
                    // All good
                } else {
                    canLearn = false
                }
            })

            if (!canLearn) {
                return
            }
        }

        if (!existingSkill) {
            let baseLevel = 1
            // Base level for this skill ( 10 for hitpoints )
            if (SKILLS[skillName].baseLevel) {
                baseLevel = SKILLS[skillName].baseLevel
            }

            Skills.insert({
                type: skillName,
                server: Meteor.user().server,
                createdAt: new Date(),
                owner: Meteor.userId(),
                level: baseLevel,
                username: Meteor.user().username
            })

            Skills.update(
                {
                    type: "total",
                    owner: Meteor.userId()
                },
                {
                    $inc: {
                        level: baseLevel
                    }
                }
            )

            if (skillName === "crafting") {
                Crafting.insert({
                    owner: Meteor.userId()
                })
            } else if (skillName === "inscription") {
                Inscription.insert({
                    owner: Meteor.userId()
                })
            } else if (skillName === "woodcutting") {
                Woodcutting.insert({
                    owner: Meteor.userId(),
                    woodcutters: [],
                    lastGameUpdated: new Date()
                })
            } else if (skillName === "attack") {
                updateCombatStats(Meteor.userId())
            } else if (skillName === "farming") {
                // Inject farming
                Farming.insert({
                    owner: Meteor.userId()
                })
                // Inject farming spaces (6 active, 2 inactive)
                for (let i = 0; i < 8; i++) {
                    const isActive = i < 6
                    FarmingSpace.insert({
                        owner: Meteor.userId(),
                        active: isActive,
                        index: i
                    })
                }
                if (getUserVersion() === 1) {
                    updateUserVersion({ userId: Meteor.userId(), newVersion: 2 })
                }
            } else if (skillName === "astronomy") {
                Astronomy.insert({
                    owner: Meteor.userId(),
                    mages: [
                        {
                            id: "main",
                            stats: {
                                attackSpeed: 50,
                                criticalChance: 1
                            }
                        }
                    ],
                    lastGameUpdated: moment().toDate()
                })
            } else if (skillName === "magic") {
                // Update abilities
                Abilities.update(
                    {
                        owner: Meteor.userId()
                    },
                    {
                        $push: {
                            learntAbilities: {
                                abilityId: "earth_dart",
                                level: 1,
                                equipped: false,
                                currentCooldown: 0,
                                isSpell: true,
                                casts: 0
                            }
                        }
                    }
                )
                updateCombatStats(Meteor.userId())
            }
        }

        updateUserActivity({ userId: Meteor.userId() })
    },

    "skills.requirements"(skillName) {
        // Make sure this is a valid skillName
        if (!_.contains(Object.keys(SKILLS), skillName)) {
            return
        }

        if (SKILLS[skillName].requirementsToLearn) {
            return SKILLS[skillName].requirementsToLearn || []
        }
    },

    "skills.fetchProfile"(username) {
        // Ensure username is a string
        if (!_.isString(username)) {
            throw new Meteor.Error("not-string", "username must be a string")
        }

        // Search for the user
        const targetUser = Users.findOne({ username })

        // Find equipment
        const equipment = Items.find(
            {
                equipped: true,
                owner: targetUser._id
            },
            {
                fields: {
                    itemId: 1,
                    slot: 1,
                    quality: 1,
                    enhanced: 1,
                    extraStats: 1,
                    rarityId: 1,
                    enchantmentId: 1,
                    enchantmentDescription: 1
                }
            }
        )
            .fetch()
            .map((item) => {
                const itemConstants = ITEMS[item.itemId]
                // Get name and Icon
                item.icon = itemConstants.icon
                item.name = itemConstants.name
                delete item._id
                if (itemConstants.stats) {
                    item.stats = lodash.cloneDeep(itemConstants.stats)
                    item.isWeapon = itemConstants.isWeapon
                    item.isEquippable = itemConstants.isEquippable
                    if (item.extraStats) {
                        Object.keys(item.extraStats).forEach((statName) => {
                            if (!item.stats[statName]) {
                                item.stats[statName] = 0
                            }
                            item.stats[statName] += item.extraStats[statName]
                        })
                    }
                }

                return item
            })

        // Find abilities
        let abilities_map = {}

        const raw_abilities_data = Abilities.findOne({
            owner: targetUser._id
        })

        if (raw_abilities_data) {
            const all_abilities = raw_abilities_data.learntAbilities.filter((ability) => {
                return ability.equipped
            })

            all_abilities.forEach((ability) => {
                ability.requires = ABILITIES[ability.abilityId].requires
                ability.cantUseWith = ABILITIES[ability.abilityId].cantUseWith
                ;(ability.isPassive = ABILITIES[ability.abilityId].isPassive || false),
                    (ability.isPacifist = ABILITIES[ability.abilityId].isPacifist || false),
                    (abilities_map[ability.slot] = ability)
            })
        }

        // Fetch icon from combat
        const targetUserCombat = Combat.findOne({ owner: targetUser._id })

        // Get all users skills
        return {
            skills: Skills.find({
                owner: targetUser._id
            })
                .fetch()
                .map((skill) => {
                    return {
                        xpToLevel: SKILLS[skill.type].xpToLevel(skill.level),
                        xp: skill.xp,
                        totalXp: skill.totalXp,
                        level: skill.level,
                        type: skill.type
                    }
                }),

            equipment,

            abilities: abilities_map,

            characterIcon: targetUserCombat.characterIcon || "character.svg",

            classData: userCurrentClass(targetUser._id)
        }

        updateUserActivity({ userId: Meteor.userId() })
    },

    "skills.highscores"(skillName, showAll200) {
        let limit = 10
        if (showAll200) {
            limit = 200
        }

        const server = Meteor.user().server
        let results

        if (skillName === "personalQuest") {
            results = Users.find(
                {
                    server
                    //banned: {
                    //  $ne: true
                    //}
                },
                {
                    sort: {
                        "personalQuest.level": -1,
                        "personalQuest.wave": -1
                    },
                    fields: {
                        personalQuest: 1,
                        username: 1
                    },
                    limit
                }
            ).fetch()
        } else if (skillName === "boss") {
            results = BossHealthScores.find(
                {
                    server
                    //banned: {
                    //  $ne: true
                    //}
                },
                {
                    sort: {
                        bossDamage: -1
                    },
                    fields: {
                        bossDamage: 1,
                        username: 1
                    },
                    limit
                }
            ).fetch()
        } else {
            results = Skills.find(
                {
                    type: skillName,
                    server
                    //banned: {
                    //  $ne: true
                    //}
                },
                {
                    sort: {
                        level: -1,
                        totalXp: -1
                    },
                    limit
                }
            ).fetch()
        }

        updateUserActivity({ userId: Meteor.userId() })

        results = results.filter((result) => {
            let userDoc
            if (result.owner) {
                userDoc = Users.findOne({ _id: result.owner })
            } else if (result.username) {
                userDoc = result
            }

            if (userDoc) {
                if (userDoc.excludeFromRankings || userDoc.banned || userDoc.isPrefabbedGuest) {
                    return false
                }
            }

            return true
        })

        return results
    }
})

const MINUTE = 60 * 1000

// DDPRateLimiter.addRule({ type: 'method', name: 'skills.learnSkill' }, 50, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'skills.requirements' }, 10, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'skills.highscores' }, 50, 5 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'skills' }, 100, 1 * MINUTE);

Meteor.publish("skills", function () {
    //Transform function
    const transform = function (doc) {
        doc.xpToLevel = SKILLS[doc.type].xpToLevel(doc.level)
        return doc
    }

    const self = this

    const observer = Skills.find({
        owner: this.userId
    }).observe({
        added: function (document) {
            self.added("skills", document._id, transform(document))
        },
        changed: function (newDocument, oldDocument) {
            self.changed("skills", oldDocument._id, transform(newDocument))
        },
        removed: function (oldDocument) {
            self.removed("skills", oldDocument._id)
        }
    })

    self.onStop(function () {
        observer.stop()
    })

    self.ready()
})
