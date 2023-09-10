import { Meteor } from "meteor/meteor"
import { Abilities } from "/imports/api/abilities/abilities"
import { Battles } from "/imports/api/battles/battles"
import { Combat, userAverageCombat } from "/imports/api/combat/combat"
import { Groups } from "/imports/api/groups/groups"
import { Items, applyRarities } from "/imports/api/items/items"
import { Skills } from "/imports/api/skills/skills"
import { Users } from "/imports/api/users/users"

import lodash from "lodash"
import moment from "moment"
import _ from "underscore"
import { flattenObjectForMongo } from "/server/utils"

import { getActiveGlobalBuff } from "/imports/api/globalbuffs/globalbuffs.js"
import { updateUserActivity } from "/imports/api/users/users.js"
import { CInt, IsValid } from "/imports/utils.js"

import { BUFFS } from "/imports/constants/buffs/index.js"
import { ITEMS } from "/imports/constants/items/index.js"
import { DONATORS_BENEFITS, getAvailablePlayerIcons } from "/imports/constants/shop/index.js"
import { BATTLES } from "/server/constants/battles/index.js"
import { COMBAT } from "/server/constants/combat/index.js"
import { SKILLS } from "/server/constants/skills/index.js"

export const updateCombatStats = function (userId, username, amuletChanged = false) {
    // Build up our object of skills
    const playerData = {
        stats: {
            attack: 0,
            attackMax: 0,
            attackSpeed: 0,
            accuracy: 0,
            healthMax: 0,
            damageTaken: 1,
            magicPower: 0,
            energyMax: COMBAT.baseEnergyMax,
            defense: 0,
            armor: 0,
            criticalChance: 0,
            criticalDamage: 2,
            healingPower: 0,
            magicArmor: 0,
            force: 0,
            shred: 0,
            focus: 0
        },
        enchantments: [],
        mainHandWeapon: "",
        mainHandType: "",
        offHandType: "",
        xpDistribution: {}
    }

    if (username) {
        playerData.username = username
    }

    // Fetch all equipped combat items
    const combatItems = Items.find({
        owner: userId,
        category: "combat",
        equipped: true
    }).fetch()

    // Apply combat items
    for (let i = 0; i < combatItems.length; i++) {
        const combatItem = combatItems[i]
        combatItem.constants = ITEMS[combatItem.itemId]

        if (combatItem.constants.slot === "mainHand") {
            playerData.mainHandWeapon = combatItem.itemId
            playerData.mainHandType = combatItem.constants.weaponType
        } else if (combatItem.constants.slot === "offHand") {
            playerData.offHandType = combatItem.constants.weaponType
        }

        if (combatItem.constants.enchantments) {
            playerData.enchantments = playerData.enchantments.concat(combatItem.constants.enchantments)
        } else if (
            combatItem.enchantmentId &&
            combatItem.enchantmentId !== "undefined" &&
            combatItem.enchantmentId !== ""
        ) {
            playerData.enchantments = playerData.enchantments.concat(combatItem.enchantmentId)
        }

        if (combatItem.constants.isAttackAmulet) {
            // Fetch existing energy
            playerData.amulet = lodash.cloneDeep(combatItem.constants.stats)
            if (playerData.amulet.energy == null && amuletChanged) {
                playerData.amulet.energy = 0
            }
        }

        if (combatItem.constants.stats) {
            const combatItemBaseStats = applyRarities(combatItem.constants.stats, combatItem.rarityId)
            const combatItemExtraStats = combatItem.extraStats
                ? applyRarities(combatItem.extraStats, combatItem.rarityId)
                : undefined

            const itemStats = lodash.cloneDeep(combatItemBaseStats)
            if (combatItemExtraStats) {
                Object.keys(combatItemExtraStats).forEach((extraStatName) => {
                    if (!itemStats[extraStatName]) {
                        itemStats[extraStatName] = 0
                    }
                    itemStats[extraStatName] += combatItemExtraStats[extraStatName]
                })
            }
            Object.keys(itemStats).forEach((statKey) => {
                if (playerData.stats[statKey] === undefined) {
                    playerData.stats[statKey] = 0
                }
                playerData.stats[statKey] += itemStats[statKey]
            })

            if (combatItem.constants.slot === "mainHand") {
                if (combatItem.constants.xpDistribution) {
                    playerData.xpDistribution = combatItem.constants.xpDistribution
                } else {
                    playerData.xpDistribution = BATTLES.xpDistribution(combatItem.constants.weaponType)
                }
            }
        }
    }

    // Apply combat items with % stat bonuses after flat bonuses
    for (let i = 0; i < combatItems.length; i++) {
        const combatItem = combatItems[i]
        combatItem.constants = ITEMS[combatItem.itemId]
        // todo: count each section cumulatively so that one item with % bonuses and another with % bonuses don't multiply, they add
        if (combatItem.constants.percentStats) {
            Object.keys(combatItem.constants.percentStats).forEach((percentStatName) => {
                if (playerData.stats[percentStatName] === undefined) {
                    playerData.stats[percentStatName] = 0
                }
                playerData.stats[percentStatName] *= 1.0 + combatItem.constants.percentStats[percentStatName] / 100.0
            })
        }
    }

    // Fetch all users skill levels
    const combatSkills = Skills.find({
        owner: userId,
        type: {
            $in: ["attack", "health", "defense", "magic"]
        }
    }).fetch()

    let averageCombat = 0

    // Apply user skills
    combatSkills.forEach((combatSkill) => {
        const skillLevel = combatSkill.level
        averageCombat += skillLevel
        combatSkill.constants = SKILLS[combatSkill.type]
        if (combatSkill.constants.statsPerLevel) {
            const skillStatsPerLevel = lodash.cloneDeep(combatSkill.constants.statsPerLevel)
            Object.keys(skillStatsPerLevel).forEach((statKey) => {
                if (playerData.stats[statKey] === undefined) {
                    playerData.stats[statKey] = 0
                }
                playerData.stats[statKey] += skillStatsPerLevel[statKey] * skillLevel
            })
        }
    })

    // Apply combat items with % total stat bonuses after flat+skill bonuses
    for (let i = 0; i < combatItems.length; i++) {
        const combatItem = combatItems[i]
        combatItem.constants = ITEMS[combatItem.itemId]
        // todo: count each section cumulatively so that one item with % bonuses and another with % bonuses don't multiply, they add
        if (combatItem.constants.percentTotalStats) {
            Object.keys(combatItem.constants.percentTotalStats).forEach((percentStatName) => {
                if (playerData.stats[percentStatName] === undefined) {
                    playerData.stats[percentStatName] = 0
                }
                playerData.stats[percentStatName] *=
                    1.0 + combatItem.constants.percentTotalStats[percentStatName] / 100.0
            })
        }
    }
    // If no weapon default to 0.25 attackspeed
    if (playerData.stats.attackSpeed <= 0) {
        playerData.stats.attackSpeed = 0.25
    }

    const currentCombat = Combat.findOne({
        owner: userId
    })

    // If health is above healthMax, reset health
    if (currentCombat.stats.health > playerData.stats.healthMax) {
        playerData.stats.health = playerData.stats.healthMax
    }

    Users.update(
        {
            _id: userId
        },
        {
            $set: {
                averageCombat: Math.floor(averageCombat / 4)
            }
        }
    )

    // Set player stats
    Combat.update(
        {
            owner: userId
        },
        {
            $set: flattenObjectForMongo(playerData)
        }
    )
}

Meteor.methods({
    "combat.updateIsTowerContribution"(newValue) {
        Combat.update(
            {
                owner: Meteor.userId()
            },
            {
                $set: {
                    isTowerContribution: newValue
                }
            }
        )
    },

    "combat.changeClass"(classId) {
        // read combat root data
        const myCombat = Combat.findOne({ owner: Meteor.userId() })

        // abort if no combat data!
        if (!myCombat) {
            throw new Meteor.Error("no-combat-data", "Error reading your user data.")
        }

        // check class data
        let classData = myCombat["class"]
        if (!classData) {
            if (classId == "adventurer") {
                // do nothing if they're picking the default class and have no class data
                throw new Meteor.Error("not-eligible", "You are already that class.")
            }

            // new class data
            classData = {}
        } else {
            if (classId == classData.id) {
                // do nothing if they're picking the same class as their existing class data`
                throw new Meteor.Error("not-eligible", "You are already that class.")
            }

            if (userAverageCombat() >= 100) {
                // can swap daily
                if (IsValid(classData.lastChanged)) {
                    if (moment().isBefore(moment(classData.lastChanged).add(24, "hours"))) {
                        throw new Meteor.Error("not-eligible", "You aren't eligible to change your class right now.")
                    }
                }
            } else {
                if (IsValid(classData.changesAvailable)) {
                    if (CInt(classData.changesAvailable) === 0) {
                        throw new Meteor.Error("not-eligible", "You aren't eligible to change your class right now.")
                    }
                }
            }
        }

        classData.id = classId // change class
        classData.changesAvailable = 0 // consume changes
        classData.lastChanged = moment().toDate() // mark when we last changed

        // write new class data
        Combat.update({ owner: Meteor.userId() }, { $set: { class: classData } })

        // unequip weapons, armor, amulets, and abilities
        Items.update({ owner: Meteor.userId(), category: "combat" }, { $set: { equipped: false } }, { multi: true })
        Abilities.update(
            { owner: Meteor.userId(), learntAbilities: { $elemMatch: { equipped: true } } },
            { $set: { "learntAbilities.$.equipped": false } }
        )

        // relcalculate all combat stats
        updateCombatStats(Meteor.userId(), Meteor.user().username, true)

        // update that the user was active
        updateUserActivity({ userId: Meteor.userId() })
    },

    "combat.updateCharacterIcon"(id) {
        const myCombat = Combat.findOne({
            owner: Meteor.userId()
        })

        const availablePlayerIcons = getAvailablePlayerIcons(myCombat)

        // Check if we own it
        if (!_.contains(availablePlayerIcons.availableIcons, id)) {
            return
        }

        const targetIcon = availablePlayerIcons.playerIconsConsts[id]
        if (!targetIcon) {
            return
        }

        // Can we equip the specified item?
        if (targetIcon.requiredEquip) {
            // Make sure we have the correct stats
            const statNames = targetIcon.requiredEquip.map((skill) => skill.name)
            const usersStats = Skills.find({
                owner: Meteor.userId(),
                type: {
                    $in: statNames
                }
            }).fetch()

            let hasEquipRequirements = true
            let requirementString
            targetIcon.requiredEquip.forEach((requirement) => {
                const mySkill = _.findWhere(usersStats, { type: requirement.name })

                if (!mySkill) {
                    hasEquipRequirements = false
                    requirementString = "You must have at least level "
                    requirementString += `${requirement.level} ${requirement.name} to equip this item`
                } else if (mySkill.level < requirement.level) {
                    hasEquipRequirements = false
                    requirementString = "You must have at least level "
                    requirementString += `${requirement.level} ${requirement.name} to equip this item`
                }
            })

            if (!hasEquipRequirements) {
                throw new Meteor.Error("equip-requirement", requirementString)
            }
        }

        // Equip it!
        Combat.update(
            {
                owner: Meteor.userId()
            },
            {
                $set: {
                    characterIcon: targetIcon.icon
                }
            }
        )

        updateUserActivity({ userId: Meteor.userId() })
    },

    "combat.gameUpdate"() {
        this.unblock()

        const currentCombat = Combat.findOne({
            owner: Meteor.userId()
        })

        // Time since last update
        const now = moment()
        const secondsElapsed = moment.duration(now.diff(currentCombat.lastGameUpdated)).asSeconds()
        const minutesElapsed = moment.duration(now.diff(currentCombat.lastGameUpdated)).asMinutes()

        // Energy Regen
        if (currentCombat.stats.energy <= currentCombat.stats.energyMax) {
            let baseEnergyRegen = COMBAT.baseEnergyRegenPerMinute * minutesElapsed

            // Apply membership benefits
            const userDoc = Meteor.user()
            if (userDoc.combatUpgradeTo && moment().isBefore(userDoc.combatUpgradeTo)) {
                baseEnergyRegen *= 1 + DONATORS_BENEFITS.energyBonus / 100
            }

            currentCombat.stats.energy += baseEnergyRegen * (getActiveGlobalBuff("paid_combat") ? 3 : 1)

            if (currentCombat.stats.energy > currentCombat.stats.energyMax) {
                currentCombat.stats.energy = currentCombat.stats.energyMax
            }
        } else {
            currentCombat.stats.energy = currentCombat.stats.energyMax
        }

        // Amulet energy regen
        if (currentCombat.amulet && currentCombat.amulet.energy < currentCombat.amulet.energyStorage) {
            currentCombat.amulet.energy += minutesElapsed * currentCombat.amulet.energyRegen
            if (currentCombat.amulet.energy >= currentCombat.amulet.energyStorage) {
                currentCombat.amulet.energy = currentCombat.amulet.energyStorage
            }
        }

        // Health Regen
        if (currentCombat.stats.health <= currentCombat.stats.healthMax) {
            currentCombat.stats.health += COMBAT.baseHealthRegenPerMinute * minutesElapsed
            if (currentCombat.stats.health > currentCombat.stats.healthMax) {
                currentCombat.stats.health = currentCombat.stats.healthMax
            }
        } else {
            currentCombat.stats.health = currentCombat.stats.healthMax
        }

        // Process buffs
        currentCombat.buffs.forEach((buff) => {
            buff.constants = BUFFS[buff.id]
            if (buff.constants.events.onTick) {
                const buffTarget = currentCombat
                const buffCaster = currentCombat

                buff.constants.events.onTick({
                    secondsElapsed,
                    buff,
                    target: buffTarget,
                    caster: buffCaster
                })
            }
        })

        // To Do: Optimize this to only save changes (isDirty on buffs?)
        Combat.update(currentCombat._id, {
            $set: Object.assign(flattenObjectForMongo({ stats: currentCombat.stats }), {
                buffs: currentCombat.buffs,
                amulet: currentCombat.amulet,
                lastGameUpdated: new Date()
            })
        })
    },

    "combat.clickedNeedGreed"(lootId, choice) {
        if (!lootId || !(choice === "need" || choice === "greed" || choice === "pass")) {
            return
        }

        const battle = Battles.findOne({
            owners: Meteor.userId(),
            "loot.lootId": lootId,
            createdAt: { $gte: moment().subtract(30, "second").toDate() }
        })

        if (!battle) return

        const lootIdx = battle.loot.findIndex((loot) => {
            return loot.lootId === lootId
        })

        if (lootIdx === -1) return

        const ownerIdx = battle.loot[lootIdx].owners.findIndex((owner) => {
            return owner.id === Meteor.userId()
        })

        if (ownerIdx === -1) return

        let update = {
            $set: {}
        }
        update.$set[`loot.${lootIdx}.owners.${ownerIdx}.ngChoice`] = choice

        Battles.update(battle._id, update)

        updateUserActivity({ userId: Meteor.userId() })
    }
})

const MINUTE = 60 * 1000

// DDPRateLimiter.addRule({ type: 'method', name: 'combat.gameUpdate' }, 30, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'combat' }, 30, 1 * MINUTE);

Meteor.publish("combat", function () {
    const currentGroup = Groups.findOne({
        members: this.userId
    })

    if (!currentGroup) {
        return Combat.find({
            owner: this.userId
        })
    }

    return Combat.find({
        owner: {
            $in: currentGroup.members
        }
    })
})
