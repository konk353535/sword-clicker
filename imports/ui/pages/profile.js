import { ReactiveDict } from "meteor/reactive-dict"
import { Template } from "meteor/templating"

import { BUFFS } from "/imports/constants/buffs/index.js"

import "./profile.html"

Template.profilePage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    this.autorun(() => {
        const username = Router.current().params.username.toLowerCase()

        this.state.set("username", username)

        // Fetch and load the profile
        Meteor.call(
            "skills.fetchProfile",
            username,
            (err, { skills, abilities, equipment, characterIcon, classData }) => {
                if (err) {
                    return toastr.error(err.reason)
                }

                this.state.set("equipment", equipment)
                this.state.set("abilities", abilities)
                this.state.set("characterIcon", characterIcon)
                this.state.set("class", classData)

                this.state.set(
                    "skills",
                    skills.map((skill) => {
                        skill.percentage = Math.round((skill.xp / skill.xpToLevel) * 100)
                        return skill
                    })
                )
            }
        )
    })
})

Template.profilePage.events({})

Template.profilePage.helpers({
    skills() {
        const skillsMap = {}
        const instance = Template.instance()
        const skills = instance.state.get("skills")

        if (!skills) {
            return []
        }

        skills.forEach((skill) => {
            skillsMap[skill.type] = skill
        })

        return [
            { type: "attack" },
            { type: "defense" },
            { type: "health" },
            { type: "magic" },
            { type: "mining" },
            { type: "farming" },
            { type: "inscription" },
            { type: "crafting" },
            { type: "woodcutting" },
            { type: "astronomy" },
            { type: "total" }
        ].map((skill) => {
            return skillsMap[skill.type]
        })
    },

    equippedItemsMap() {
        const equippedItems = Template.instance().state.get("equipment")
        const equippedMap = {}
        if (equippedItems) {
            equippedItems.forEach((item) => {
                item.hideCount = true
                item.primaryAction = {}
                equippedMap[item.slot] = item
            })
        }

        return equippedMap
    },

    equippedAbilitiesMap() {
        function abilityDataCombined(ability) {
            if (ability) {
                if (BUFFS[ability.abilityId]) {
                    ability = { ...BUFFS[ability.abilityId], ...ability }

                    if (_.isFunction(BUFFS[ability?.abilityId].description)) {
                        ability.description = BUFFS[ability?.abilityId].description({
                            buff: BUFFS[ability?.abilityId],
                            level: ability.level,
                            characterClass: Template.instance().state.get("class")
                        })
                    }
                }
            }
            return ability
        }

        let abilitiesMap = Template.instance().state.get("abilities")

        if (abilitiesMap) {
            abilitiesMap["mainHand"] = abilityDataCombined(abilitiesMap.mainHand)
            abilitiesMap["offHand"] = abilityDataCombined(abilitiesMap.offHand)
            abilitiesMap["head"] = abilityDataCombined(abilitiesMap.head)
            abilitiesMap["chest"] = abilityDataCombined(abilitiesMap.chest)
            abilitiesMap["legs"] = abilityDataCombined(abilitiesMap.legs)
            abilitiesMap["companion"] = abilityDataCombined(abilitiesMap.companion)
        }

        return abilitiesMap
    },

    characterIcon() {
        const instance = Template.instance()
        return instance.state.get("characterIcon")
    },

    username() {
        const instance = Template.instance()
        return instance.state.get("username")
    }
})
