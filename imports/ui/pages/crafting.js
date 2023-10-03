import { Meteor } from "meteor/meteor"
import { ReactiveDict } from "meteor/reactive-dict"
import { Session } from "meteor/session"
import { Template } from "meteor/templating"
import lodash from "lodash"
import moment from "moment"

import { ITEMS, ITEM_RARITIES } from "/imports/constants/items/index.js"
import { DONATORS_BENEFITS } from "/imports/constants/shop/index.js"

import { BattlesList } from "/imports/api/battles/battles.js"
import { userCurrentClass } from "/imports/api/classes/classes.js"
import { Crafting } from "/imports/api/crafting/crafting.js"
import { getBuffLevel } from "/imports/api/globalbuffs/globalbuffs.js"
import { Items } from "/imports/api/items/items.js"
import { Skills } from "/imports/api/skills/skills.js"
import { Users } from "/imports/api/users/users"

import { CDbl, CInt, IsValid } from "/imports/utils.js"

// Component used in the template
import "../components/craftingDuration/craftingDuration.js"
import "../components/craftingList/craftingList.js"
import "../components/itemList/itemList.js"
import "./crafting.html"

let gameUpdateTimer
let recipeCache

const itemModifier = function (item) {
    const itemConstants = ITEMS[item.itemId]

    if (itemConstants) {
        item.requiredEquip = itemConstants.requiredEquip
    }

    item.shiftActionData = itemConstants.shiftActionData

    if (item.shiftActionData) {
        item.shiftAction = {
            description: item.shiftActionData.description,
            item,
            method() {
                if (this.item.shiftActionData.target) {
                    const targetClass = `targetting-${this.item.shiftActionData.target}`
                    const body = $("body")
                    if (!body.hasClass(targetClass)) {
                        body.addClass(targetClass)
                        Meteor.setTimeout(() => {
                            // Add body listener for when you want to click out
                            body.on(`click.${this.item._id}`, (event) => {
                                const closestTarget = $(event.target).closest(`.${this.item.shiftActionData.target}`)
                                if (closestTarget) {
                                    const targetId = closestTarget.data("id")
                                    if (targetId) {
                                        Meteor.call(
                                            "items.use",
                                            { baseItemId: this.item._id, targetItemId: targetId },
                                            (err, res) => {
                                                if (err) toastr.warning(err.reason)
                                            }
                                        )
                                    }
                                }

                                body.removeClass(targetClass)
                                body.off(`click.${this.item._id}`)
                            })
                        }, 1)
                    }
                } else {
                    Meteor.call("items.use", { baseItemId: this.item._id }, (err, res) => {
                        if (/essence_scroll/.test(this.item.itemId)) {
                            // If this was an essence scroll, reload recipes
                            recipeCache = undefined
                        }
                    })
                }
            }
        }
    }

    return item
}

Template.craftingPage.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()

    // Show currently crafting items
    Meteor.subscribe("crafting")

    // if (Session.get('itemViewLimit') !== undefined) {
    //   this.state.set('itemViewLimit', Session.get('itemViewLimit'));
    // } else {
    //   this.state.set('itemViewLimit', 10);
    // }

    if (Session.get("recipeCache")) {
        recipeCache = Session.get("recipeCache")
    } else if (recipeCache) {
        Session.set("recipeCache", recipeCache)
    }

    Tracker.autorun(() => {
        const myUser = Users.findOne({ _id: Meteor.userId() })
        if (myUser) {
            if (myUser.uiState && myUser.uiState.craftingFilter !== undefined) {
                this.state.set("recipeFilter", myUser.uiState.craftingFilter)
            } else {
                this.state.set("recipeFilter", "all")
            }

            if (myUser.uiState && myUser.uiState.craftingTierFilter !== undefined) {
                this.state.set("craftingTierFilter", myUser.uiState.craftingTierFilter)
            } else {
                this.state.set("craftingTierFilter", {})
            }

            if (myUser.uiState && myUser.uiState.itemFilter !== undefined) {
                this.state.set("itemFilter", myUser.uiState.itemFilter)
            } else {
                this.state.set("itemFilter", "all-items")
            }

            if (myUser.uiState && myUser.uiState.craftingShowMore !== undefined) {
                this.state.set("craftingShowMore", myUser.uiState.craftingShowMore)
                if (myUser.uiState.craftingShowMore) {
                    this.state.set("itemViewLimit", 0)
                } else {
                    this.state.set("itemViewLimit", 10)
                }
            } else {
                this.state.set("craftingShowMore", false)
                this.state.set("itemViewLimit", 10)
            }
        }
    })

    this.autorun(() => {
        if (Skills.findOne({ type: "crafting" })) {
            const craftingSkill = Skills.findOne({ type: "crafting" })
            let results

            // Check if valid cache exists
            if (
                recipeCache &&
                recipeCache.data &&
                recipeCache.tiers &&
                recipeCache.level === craftingSkill.level &&
                moment().isBefore(moment(recipeCache.date).add(2, "minutes"))
            ) {
                results = recipeCache.data
            } else {
                // Pass level so that this is recalled when we get up a level
                results = ReactiveMethod.call("crafting.fetchRecipes", craftingSkill.level)
                const tiers = ReactiveMethod.call("crafting.fetchTiers", craftingSkill.level)
                recipeCache = {
                    data: results,
                    tiers,
                    level: craftingSkill.level,
                    date: moment().toDate()
                }

                Session.set("recipeCache", {
                    data: results,
                    tiers,
                    level: craftingSkill.level,
                    date: moment().toDate()
                })
            }

            const userDoc = Meteor.user()
            const hasCraftingUpgrade = userDoc.craftingUpgradeTo && moment().isBefore(userDoc.craftingUpgradeTo)

            if (results) {
                const resultsMap = {}
                results.forEach((result) => {
                    resultsMap[result.id] = result
                })
                this.state.set("recipeListMap", resultsMap)

                // Store recipes
                this.state.set(
                    "recipes",
                    results.map((result) => {
                        if (craftingSkill.level < result.requiredCraftingLevel) {
                            result.notMetLevelReq = true
                        }

                        if (hasCraftingUpgrade) {
                            const bonusPercentage = DONATORS_BENEFITS.craftingBonus
                            result.calculatedTimeToCraft = (result.timeToCraft * (1 - bonusPercentage / 100)).toFixed(0)
                        } else {
                            result.calculatedTimeToCraft = result.timeToCraft
                        }

                        return result
                    })
                )
            }
        }
    })
})

Template.craftingPage.events({
    "click .learn-now"(event, instance) {
        Meteor.call("skills.learnSkill", "crafting")
    },

    "click .crafting-filter"(event, instance) {
        const filter = instance.$(event.target).closest(".crafting-filter").data("filter")
        Meteor.call("users.setUiState", "craftingFilter", filter)
    },

    "click .item-filter"(event, instance) {
        const filter = instance.$(event.target).closest(".item-filter").data("filter")
        Meteor.call("users.setUiState", "itemFilter", filter)
    },

    "click .tier-filter"(event, instance) {
        const filter = instance.$(event.target).closest(".tier-filter").data("tier-filter")
        const craftingTierFilter = instance.state.get("craftingTierFilter")
        const existingFilter = craftingTierFilter[filter]

        if (existingFilter) {
            craftingTierFilter[existingFilter] = false
            if (instance.state.get("craftingTierFilter") !== craftingTierFilter) {
                instance.state.set("craftingTierFilter", craftingTierFilter)
                Meteor.call("users.setUiState", `craftingTierFilter.${filter}`, false)
            }
        } else {
            craftingTierFilter[existingFilter] = true
            if (instance.state.get("craftingTierFilter") !== craftingTierFilter) {
                instance.state.set("craftingTierFilter", craftingTierFilter)
                Meteor.call("users.setUiState", `craftingTierFilter.${filter}`, true)
            }
        }
    },

    "keyup .craft-amount-input"(event, instance) {
        let newValue = parseInt($(event.target).val())
        if (newValue && !isNaN(newValue)) {
            if (newValue > instance.state.get("maxCraftableAmount")) {
                newValue = instance.state.get("maxCraftableAmount")
            }
            instance.state.set("craftAmount", newValue)
        }
    },

    "click .show-all-items"(event, instance) {
        Session.set("itemViewLimit", 0)
        instance.state.set("itemViewLimit", 0)
        Meteor.call("users.setUiState", "craftingShowMore", true)
    },

    "click .show-less-items"(event, instance) {
        Session.set("itemViewLimit", 10)
        instance.state.set("itemViewLimit", 10)
        Meteor.call("users.setUiState", "craftingShowMore", false)
    }
})

Template.craftingPage.helpers({
    meteorUser() {
        if (!Meteor.user()) {
            return false
        }

        const userDoc = Users.findOne({ _id: Meteor.userId() })
        if (!userDoc || !userDoc.server) {
            return false
        }

        return true
    },

    craftingSkill() {
        // Otherwise, return all of the tasks
        return Skills.findOne({ type: "crafting" })
    },

    inCurrentBattle() {
        return BattlesList.findOne({})
    },

    crafting() {
        return Crafting.findOne({})
    },

    reforging() {
        const crafting = Crafting.findOne({})
        if (crafting && crafting.currentlyReforging) return crafting.currentlyReforging
        return false
    },

    maxCraftAmount() {
        return Template.instance().state.get("maxCraftAmount")
    },

    craftAmount() {
        return Template.instance().state.get("craftAmount")
    },

    maxCraftableAmount() {
        return Template.instance().state.get("maxCraftableAmount")
    },

    recipeFilter() {
        return Template.instance().state.get("recipeFilter")
    },

    craftingLevel() {
        return Skills.findOne({ type: "crafting" }).level
    },

    craftingTierFilter() {
        return Template.instance().state.get("craftingTierFilter")
    },

    craftingFilters() {
        // Lists out specified crafting tiers
        const instance = Template.instance()
        const recipes = Session.get("recipeCache")
        const craftingTierFilter = instance.state.get("craftingTierFilter")

        if (recipes && recipes.tiers) {
            return recipes.tiers.map((tier) => {
                tier.empty = !!craftingTierFilter[tier.name]
                return tier
            })
        }
    },

    recipes() {
        const instance = Template.instance()
        const recipeFilter = instance.state.get("recipeFilter")

        if (!instance.state.get("recipes")) {
            return []
        }

        /*
    const patterns = [];
    const craftingTierFilter = instance.state.get('craftingTierFilter');
    Object.keys(craftingTierFilter).forEach((tierKey) => {
      if (craftingTierFilter[tierKey]) {
        patterns.push(`^${tierKey}`);
      }
    });

    // Create regex exp to filter out based on current tier filter selection
    let filterTierRegex = new RegExp(patterns.join('|'), 'gi');
    let filteredRecipes = instance.state.get('recipes').filter((item) => {
      if (patterns.length > 0 && filterTierRegex) {
        // Filter out if it matches the pattern.
        if(item.id.match(filterTierRegex)) {
          return false;
        }
        return true;
      }

      return true;
    });*/

        if (recipeFilter === "all") {
            return instance.state.get("recipes")
        } else {
            return instance.state.get("recipes").filter((item) => {
                return item.category === recipeFilter
            })
        }
    },

    summaryListDisabled() {
        return Session.get("summaryListDisabled")
    },

    itemViewLimit() {
        return Template.instance().state.get("itemViewLimit")
    },

    items() {
        const itemViewLimit = Template.instance().state.get("itemViewLimit")

        // Get highest furnace tier
        const allFurnaces = Items.find({
            equipped: false,
            name: {
                $regex: /furnace/gi
            }
        }).fetch()

        let highestFurnaceTier = 0

        allFurnaces.forEach((furnace) => {
            const itemConstants = ITEMS[furnace.itemId]
            if (itemConstants) {
                if (itemConstants.tier > highestFurnaceTier) {
                    highestFurnaceTier = itemConstants.tier
                }
            }
        })

        let filterName = Template.instance().state.get("itemFilter")
        let bShowHidden = filterName === "hidden-items" || filterName === "all-items"
        let bShowUnhidden = filterName === "visible-items" || filterName === "all-items"

        if (itemViewLimit !== 0) {
            if (bShowHidden && bShowUnhidden) {
                return ItemSorter(
                    FetchSomeVisibleItems(highestFurnaceTier).concat(FetchSomeHiddenItems(highestFurnaceTier))
                ).slice(0, itemViewLimit)
            } else if (bShowHidden) {
                return ItemSorter(FetchSomeHiddenItems(highestFurnaceTier)).slice(0, itemViewLimit)
            }

            return ItemSorter(FetchSomeVisibleItems(highestFurnaceTier)).slice(0, itemViewLimit)
        }

        if (bShowHidden && bShowUnhidden) {
            return ItemSorter(FetchAllVisibleItems(highestFurnaceTier).concat(FetchAllHiddenItems(highestFurnaceTier)))
        } else if (bShowHidden) {
            return ItemSorter(FetchAllHiddenItems(highestFurnaceTier))
        }

        return ItemSorter(FetchAllVisibleItems(highestFurnaceTier))
    },

    itemFilter() {
        return Template.instance().state.get("itemFilter")
    }
})

const CompareTwoWords = function (word1, word2) {
    try {
        if (word1 > word2) return 1
        if (word1 < word2) return -1
    } catch (err) {}

    return 0
}

const GetMetaWord = function (word, item, data) {
    try {
        word = word.toString().trim().toLowerCase()
        item = item.toString().trim().toLowerCase()

        let desc = ""
        if (IsValid(data.description)) {
            if (typeof data["decription"] == "function") {
                desc = data.description()
            } else {
                desc = data.description
            }
        }
        if (IsValid(desc)) {
            desc = desc.toString()
        } else {
            desc = ""
        }

        let gearRequiredEquip = 0
        if (
            IsValid(data.category) &&
            data.category === "combat" &&
            IsValid(data.requiredEquip) &&
            data.requiredEquip.length > 0
        ) {
            if (data.requiredEquip[0].type === "skill") {
                gearRequiredEquip = CInt(data.requiredEquip[0].level)
            }
        }
        gearRequiredEquip = pad(gearRequiredEquip, 3)

        if (word === "fragment") return "magic"
        if (word === "shard") return "magic"
        if (word === "crystal") return "magic"

        if (word === "jade") return "jewel"
        if (word === "lazuli") return "jewel"
        if (word === "ruby") return "jewel"
        if (word === "sapphire") return "jewel"
        if (word === "tanzanite") return "jewel"
        if (word === "emerald") return "jewel"
        if (item === "fire opal") return "jewel"

        if (IsValid(data.category)) {
            if (data.category === "combat") {
                if (data.slot === "mainHand") {
                    if (data.weaponType === "spear") return `gear_1tank_1weapon_level${gearRequiredEquip}`
                    if (data.weaponType === "hammer") return `gear_1tank_1weapon_level${gearRequiredEquip}`
                    if (data.weaponType === "staff") return `gear_2magic_1weapon_level${gearRequiredEquip}`
                    if (data.weaponType === "wand") return `gear_2magic_1weapon_level${gearRequiredEquip}`
                    if (data.weaponType === "trident") return `gear_2magic_1weapon_level${gearRequiredEquip}`
                    return `gear_3dps_1weapon_level${gearRequiredEquip}`
                }

                if (data.slot === "offHand") {
                    if (data.weaponType === "shield") return `gear_1tank_2offweapon_level${gearRequiredEquip}`
                    if (data.weaponType === "orb") return `gear_2magic_2offweapon_level${gearRequiredEquip}`
                    if (data.weaponType === "tome") return `gear_2magic_2offweapon_level${gearRequiredEquip}`
                    if (data.weaponType === "buckler") return `gear_3dps_2offweapon_level${gearRequiredEquip}`
                    return `gear_3dps_2offweapon_level${gearRequiredEquip}`
                }

                if (data.slot === "neck") {
                    return `gear_0all_neck_level${gearRequiredEquip}`
                }

                if (item.indexOf("phoenix") !== -1)
                    return `gear_2magic_9${data.slot}_level${gearRequiredEquip.toString()}`
                if (item.indexOf("druid") !== -1) return `gear_2magic_9${data.slot}_level${gearRequiredEquip}`
                if (item.indexOf("wizard") !== -1) return `gear_2magic_9${data.slot}_level${gearRequiredEquip}`
                if (item.indexOf("opal") !== -1) return `gear_2magic_9${data.slot}_level${gearRequiredEquip}`

                if (item.indexOf("eternal flame") !== -1) return `gear_2magic_9${data.slot}_level${gearRequiredEquip}`
                if (item.indexOf("festive hat") !== -1) return `gear_2magic_9${data.slot}_level${gearRequiredEquip}`
                if (item.indexOf("bear slippers") !== -1) return `gear_2magic_9${data.slot}_level${gearRequiredEquip}`

                if (item.indexOf("horned helm") !== -1) return `gear_3dps_9${data.slot}_level${gearRequiredEquip}`
                if (item.indexOf(" helmet") !== -1) return `gear_1tank_9${data.slot}_level${gearRequiredEquip}`

                if (item.indexOf("bloody") !== -1) return `gear_3dps_9${data.slot}_level${gearRequiredEquip}`
                if (item.indexOf(" plateleg") !== -1) return `gear_1tank_9${data.slot}_level${gearRequiredEquip}`

                if (item.indexOf(" chestplate") !== -1) return `gear_1tank_9${data.slot}_level${gearRequiredEquip}`
                if (item.indexOf("snake skin") !== -1) return `gear_1tank_9${data.slot}_level${gearRequiredEquip}`
                if (item.indexOf("lion costume body") !== -1)
                    return `gear_1tank_9${data.slot}_level${gearRequiredEquip}`

                return `gear_9general_9${data.slot}_level${gearRequiredEquip}`
            }
        }

        if (desc.toLowerCase().indexOf("sold") !== -1 || desc.toLowerCase().indexOf("sell") !== -1) {
            return "aaa_money"
        }

        if (IsValid(data.category) && data.category === "pigment") return "pigment"
        if (IsValid(data.category) && data.category === "food") return "food"
        if (IsValid(data.category) && data.category === "seed") return "farm_seed"
        if (IsValid(data.category) && data.category === "herb") return "farm_herb"

        if (item == "enhancer key") return "aaa_usable"
        if (item == "phasing key") return "aaa_usable"
        if (item == "debug key") return "aaa_usable"
        if (item.indexOf("codex of ") !== -1) return "aaa_usable"
        if (data.category == "item_box") return "aab_itembox"
        if (item == "companion token") return "aac_useful"

        // category 'xp'
        if (item == "bamboo") return "farm_other"
        if (item == "cactus") return "farm_other"
        if (item == "reed") return "farm_other"
        if (item == "papyrus") return "farm_other"
        if (item == "palm") return "farm_other"
        if (item == "kenaf") return "farm_other"

        if (IsValid(data.category) && data.category === "tome") return "tome"

        if (item == "stone") return "ore_basic"
        if (item == "coal") return "ore_basic"
        if (item == "copper") return "ore_raw01"
        if (item == "tin") return "ore_raw02"
        if (item == "bronze") return "ore_raw03"
        if (item == "iron") return "ore_raw04"
        if (item == "silver") return "ore_raw05"
        if (item == "gold") return "ore_raw06"
        if (item == "carbon") return "ore_raw07"
        if (item == "steel") return "ore_raw08"
        if (item == "platinum") return "ore_raw09"
        if (item == "titanium") return "ore_raw10"
        if (item == "tungsten") return "ore_raw11"
        if (item == "obsidian") return "ore_raw12"
        if (item == "cobalt") return "ore_raw13"
        if (item == "mithril") return "ore_raw14"
        if (item == "adamantium") return "ore_raw15"
        if (item == "orichalcum") return "ore_raw16"
        if (item == "meteorite") return "ore_raw17"
        if (item == "fairy steel") return "ore_raw18"
        if (item == "elven steel") return "ore_raw19"
        if (item == "cursed ore") return "ore_raw20"
        if (item == "purestone") return "ore_raw27"

        if (item == "copper bar") return "ore_refined01"
        if (item == "tin bar") return "ore_refined02"
        if (item == "bronze bar") return "ore_refined03"
        if (item == "iron bar") return "ore_refined04"
        if (item == "silver bar") return "ore_refined05"
        if (item == "gold bar") return "ore_refined06"
        if (item == "carbon bar") return "ore_refined07"
        if (item == "steel bar") return "ore_refined08"
        if (item == "platinum bar") return "ore_refined09"
        if (item == "titanium bar") return "ore_refined10"
        if (item == "tungsten bar") return "ore_refined11"
        if (item == "obsidian bar") return "ore_refined12"
        if (item == "cobalt bar") return "ore_refined13"
        if (item == "mithril bar") return "ore_refined14"
        if (item == "adamantium bar") return "ore_refined15"
        if (item == "orichalcum bar") return "ore_refined16"
        if (item == "meteorite bar") return "ore_refined17"
        if (item == "fairy steel bar") return "ore_refined18"
        if (item == "elven steel bar") return "ore_refined19"
        if (item == "cursed bar") return "ore_refined20"
        if (item == "purestone bar") return "ore_refined27"

        if (item == "silver essence") return "ore_essence05"
        if (item == "gold essence") return "ore_essence06"
        if (item == "carbon essence") return "ore_essence07"
        if (item == "steel essence") return "ore_essence08"
        if (item == "platinum essence") return "ore_essence09"
        if (item == "titanium essence") return "ore_essence10"
        if (item == "tungsten essence") return "ore_essence11"
        if (item == "obsidian essence") return "ore_essence12"
        if (item == "cobalt essence") return "ore_essence13"
        if (item == "mithril essence") return "ore_essence14"
        if (item == "adamantium essence") return "ore_essence15"
        if (item == "orichalcum essence") return "ore_essence16"
        if (item == "meteorite essence") return "ore_essence17"
        if (item == "fairy steel essence") return "ore_essence18"
        if (item == "elven steel essence") return "ore_essence19"
        if (item == "cursed essence") return "ore_essence20"
        if (item == "purestone essence") return "ore_essence27"

        if (item == "lost silver scroll") return "ore_scroll05"
        if (item == "lost gold scroll") return "ore_scroll06"
        if (item == "lost carbon scroll") return "ore_scroll07"
        if (item == "lost steel scroll") return "ore_scroll08"
        if (item == "lost platinum scroll") return "ore_scroll09"
        if (item == "lost titanium scroll") return "ore_scroll10"
        if (item == "lost tungsten scroll") return "ore_scroll11"
        if (item == "lost obsidian scroll") return "ore_scroll12"
        if (item == "lost cobalt scroll") return "ore_scroll13"
        if (item == "lost mithril scroll") return "ore_scroll14"
        if (item == "lost adamantium scroll") return "ore_scroll15"
        if (item == "lost orichalcum scroll") return "ore_scroll16"
        if (item == "lost meteorite scroll") return "ore_scroll17"
        if (item == "lost fairy steel scroll") return "ore_scroll18"
        if (item == "lost elven steel scroll") return "ore_scroll19"
        if (item == "lost cursed scroll") return "ore_scroll20"

        if (IsValid(data.isCraftingScroll) && data.isCraftingScroll) {
            if (IsValid(data.teaches)) {
                return `scroll_crafting_${data.teaches}`
            }

            /*
        try {
          const teaches = ET.MCMF.GetItemConsts(data.teaches); // technically data.teaches refers to a CRAFTING recipe ID, not an ITEM ID but they're usually the same
          if (teaches) {
            return `scroll_crafting_${teaches.id}`;
          }
        } catch (err) {
        }
        */

            return "scroll_crafting_ZZZ"
        }

        if (item == "pine log") return "wood_raw00"
        if (item == "beech log") return "wood_raw01"
        if (item == "ash log") return "wood_raw02"
        if (item == "oak log") return "wood_raw03"
        if (item == "maple log") return "wood_raw04"
        if (item == "walnut log") return "wood_raw05"
        if (item == "cherry log") return "wood_raw06"
        if (item == "mahogany log") return "wood_raw07"
        if (item == "elk log") return "wood_raw08"
        if (item == "elm log") return "wood_raw08"
        if (item == "black log") return "wood_raw09"
        if (item == "blue gum log") return "wood_raw10"
        if (item == "cedar log") return "wood_raw11"
        if (item == "denya log") return "wood_raw12"
        if (item == "gombe log") return "wood_raw13"
        if (item == "hickory log") return "wood_raw14"
        if (item == "larch log") return "wood_raw15"
        if (item == "poplar log") return "wood_raw16"
        if (item == "tali log") return "wood_raw17"
        if (item == "willow log") return "wood_raw18"
        if (item == "teak log") return "wood_raw19"
        if (item == "ebony log") return "wood_raw20"
        if (item == "fiery log") return "wood_raw21"
        if (item == "tamarind log") return "wood_raw22"
        if (item == "magic log") return "wood_raw23"
        if (item == "petrified log") return "wood_raw24"
        if (item == "ancient log") return "wood_raw25"
        if (item == "spiritroot") return "wood_raw26"
        if (item.indexOf("_log") !== -1) return "wood_raw99"

        if (item == "pine paper") return "wood_paper00"
        if (item == "beech paper") return "wood_paper01"
        if (item == "ash paper") return "wood_paper02"
        if (item == "oak paper") return "wood_paper03"
        if (item == "maple paper") return "wood_paper04"
        if (item == "walnut paper") return "wood_paper05"
        if (item == "cherry paper") return "wood_paper06"
        if (item == "mahogany paper") return "wood_paper07"
        if (item == "elk paper") return "wood_paper08"
        if (item == "elm paper") return "wood_paper08"
        if (item == "black paper") return "wood_paper09"
        if (item == "blue gum paper") return "wood_paper10"
        if (item == "cedar paper") return "wood_paper11"
        if (item == "denya paper") return "wood_paper12"
        if (item == "gombe paper") return "wood_paper13"
        if (item == "hickory paper") return "wood_paper14"
        if (item == "larch paper") return "wood_paper15"
        if (item == "poplar paper") return "wood_paper16"
        if (item == "tali paper") return "wood_paper17"
        if (item == "willow paper") return "wood_paper18"
        if (item == "teak paper") return "wood_paper19"
        if (item == "ebony paper") return "wood_paper20"
        if (item == "fiery paper") return "wood_paper21"
        if (item == "tamarind paper") return "wood_paper22"
        if (item == "magic paper") return "wood_paper23"
        if (item == "petrified paper") return "wood_paper24"
        if (item == "ancient paper") return "wood_paper25"
        if (item == "spiritroot paper") return "wood_paper26"
        if (item.indexOf("_log") !== -1) return "wood_paper99"

        if (item == "pine book") return "wood_book00"
        if (item == "beech book") return "wood_book01"
        if (item == "ash book") return "wood_book02"
        if (item == "oak book") return "wood_book03"
        if (item == "maple book") return "wood_book04"
        if (item == "walnut book") return "wood_book05"
        if (item == "cherry book") return "wood_book06"
        if (item == "mahogany book") return "wood_book07"
        if (item == "elk book") return "wood_book08"
        if (item == "elm book") return "wood_book08"
        if (item == "black book") return "wood_book09"
        if (item == "blue gum book") return "wood_book10"
        if (item == "cedar book") return "wood_book11"
        if (item == "denya book") return "wood_book12"
        if (item == "gombe book") return "wood_book13"
        if (item == "hickory book") return "wood_book14"
        if (item == "larch book") return "wood_book15"
        if (item == "poplar book") return "wood_book16"
        if (item == "tali book") return "wood_book17"
        if (item == "willow book") return "wood_book18"
        if (item == "teak book") return "wood_book19"
        if (item == "ebony book") return "wood_book20"
        if (item == "fiery book") return "wood_book21"
        if (item == "tamarind book") return "wood_book22"
        if (item == "magic book") return "wood_book23"
        if (item == "petrified book") return "wood_book24"
        if (item == "ancient book") return "wood_book25"
        if (item == "spiritroot book") return "wood_book26"
        if (item.indexOf("_log") !== -1) return "wood_book99"

        if (IsValid(data.category) && data.category === "woodcutting") return "tool_woodcutting"
        if (IsValid(data.category) && data.category === "mining") return "tool_mining"
    } catch (err) {}

    return ""
}

const MatchRecipe = function (recipe_name, recipes) {
    let RecipeResult = undefined

    try {
        RecipeSearch = recipe_name.trim().toLowerCase()

        if (RecipeSearch == "lost silver scroll") RecipeSearch = "silver essence"
        if (RecipeSearch == "lost gold scroll") RecipeSearch = "gold essence"
        if (RecipeSearch == "lost carbon scroll") RecipeSearch = "carbon essence"
        if (RecipeSearch == "lost steel scroll") RecipeSearch = "steel essence"
        if (RecipeSearch == "lost platinum scroll") RecipeSearch = "platinum essence"
        if (RecipeSearch == "lost titanium scroll") RecipeSearch = "titanium essence"
        if (RecipeSearch == "lost tungsten scroll") RecipeSearch = "tungsten essence"
        if (RecipeSearch == "lost obsidian scroll") RecipeSearch = "obsidian essence"
        if (RecipeSearch == "lost cobalt scroll") RecipeSearch = "cobalt essence"
        if (RecipeSearch == "lost mithril scroll") RecipeSearch = "mithril essence"
        if (RecipeSearch == "lost adamantium scroll") RecipeSearch = "adamantium essence"
        if (RecipeSearch == "lost orichalcum scroll") RecipeSearch = "orichalcum essence"
        if (RecipeSearch == "lost meteorite scroll") RecipeSearch = "meteorite essence"
        if (RecipeSearch == "lost fairy steel scroll") RecipeSearch = "fairy steel essence"
        if (RecipeSearch == "lost elven steel scroll") RecipeSearch = "elven steel essence"
        if (RecipeSearch == "lost cursed scroll") RecipeSearch = "cursed essence"

        if (recipes !== undefined) {
            recipes.forEach((currentRecipe, index, array) => {
                if (RecipeResult !== undefined) return
                if (currentRecipe.name.trim().toLowerCase() === RecipeSearch) RecipeResult = currentRecipe
            })
        }
    } catch (err) {}

    return RecipeResult
}

const ChopperBlank = function (sText, sSearch, sEnd) {
    let sIntermediate = ""

    if (sSearch === "") sIntermediate = sText.substring(0, sText.length)
    else {
        let iIndexStart = sText.indexOf(sSearch)
        if (iIndexStart === -1) return ""

        sIntermediate = sText.substring(iIndexStart + sSearch.length)
    }

    if (sEnd === "") return sIntermediate

    let iIndexEnd = sIntermediate.indexOf(sEnd)

    return iIndexEnd === -1 ? "" : sIntermediate.substring(0, iIndexEnd)
}

const ItemSorter = function (itemList_in) {
    const recipes = Session.get("recipeCache")

    let itemList = itemList_in
        .map((item) => {
            const itemConsts = ITEMS[item.itemId]

            let newItemData = { ...itemConsts, ...item }

            if (typeof newItemData.decription === "function") {
                newItemData.description = newItemData.description()
            }

            return newItemData
        })
        .sort((a, b) => {
            let sTextThisItem_a
            let sTextThisItem_b

            try {
                sTextThisItem_a = a.name.trim().toLowerCase()
                sTextThisItem_b = b.name.trim().toLowerCase()

                if (sTextThisItem_a !== undefined && sTextThisItem_b !== undefined) {
                    const oRecipe_a = MatchRecipe(a.name, recipes)
                    const oRecipe_b = MatchRecipe(b.name, recipes)
                    let sLastWord_a = ""
                    let sLastWord_b = ""
                    let sRest_a = ""
                    let sRest_b = ""

                    if (sTextThisItem_a.indexOf(" ") !== -1) {
                        sLastWord_a = sTextThisItem_a.split(" ").splice(-1).toString().trim().toLowerCase()
                        sRest_a = ChopperBlank(sTextThisItem_a, "", " " + sLastWord_a)
                    } else {
                        sLastWord_a = sTextThisItem_a.toString().trim().toLowerCase()
                        sRest_a = ""
                    }

                    if (sTextThisItem_b.indexOf(" ") !== -1) {
                        sLastWord_b = sTextThisItem_b.split(" ").splice(-1).toString().trim().toLowerCase()
                        sRest_b = ChopperBlank(sTextThisItem_b, "", " " + sLastWord_b)
                    } else {
                        sLastWord_b = sTextThisItem_b.toString().trim().toLowerCase()
                        sRest_b = ""
                    }

                    if (sLastWord_a === "") sLastWord_a = "zzzzz"
                    if (sLastWord_b === "") sLastWord_b = "zzzzz"

                    var sQual_a = CInt(a.quality)
                    var sQual_b = CInt(b.quality)

                    // meta words (more grouping!)
                    var sMetaWord_a = GetMetaWord(sLastWord_a, sTextThisItem_a, a)
                    var sMetaWord_b = GetMetaWord(sLastWord_b, sTextThisItem_b, b)

                    if (sMetaWord_a.startsWith("ore_scroll"))
                        if (oRecipe_a !== undefined && oRecipe_a !== null) sMetaWord_a = "aaa_money"

                    if (sMetaWord_b.startsWith("ore_scroll"))
                        if (oRecipe_b !== undefined && oRecipe_b !== null) sMetaWord_b = "aaa_money"

                    //if ((sLastWord_a === "") || (sLastWord_b === ""))
                    //	console.log("Item '" + sRest_a + "' '" + sLastWord_a + "' ('" + sMetaWord_a + "') vs '" + sRest_b + "' '" + sLastWord_b + "' ('" + sMetaWord_b + "')");

                    if (sMetaWord_a !== "" && sMetaWord_b === "") return -1
                    if (sMetaWord_a === "" && sMetaWord_b !== "") return 1

                    if (sMetaWord_a !== "" && sMetaWord_b !== "") {
                        ret = CompareTwoWords(sMetaWord_a, sMetaWord_b)
                        if (ret !== 0) return ret

                        if (sMetaWord_a === "pigment") return CompareTwoWords(sTextThisItem_a, sTextThisItem_b)
                        if (sMetaWord_a === "tome") return CompareTwoWords(sTextThisItem_a, sTextThisItem_b)
                    }

                    var ret = CompareTwoWords(sLastWord_a, sLastWord_b)
                    if (ret !== 0) return ret

                    if (sRest_a !== "" && sRest_b !== "") {
                        ret = CompareTwoWords(sRest_a, sRest_b)
                        if (ret !== 0) return ret
                    }

                    // descending order on quality
                    if (sQual_a + sQual_b > 0) {
                        if (sQual_a > sQual_b) return -1
                        if (sQual_a < sQual_b) return 1
                    }

                    return CompareTwoWords(sTextThisItem_a, sTextThisItem_b)
                }
            } catch (err) {}
        })

    return itemList
}

const FetchSomeHiddenItems = function (highestFurnaceTier) {
    const recipes = Session.get("recipeCache")
    const craftingSkill = Skills.findOne({ type: "crafting" })
    const townBuffArmoryLevel = getBuffLevel("town_armory")

    const classReforgeData = userCurrentClass()?.data?.reforge

    return Items.find(
        {
            equipped: false,
            hidden: true
        },
        {
            limit: 50 /*
    sort: {
      category: 1,
      name: 1,
      quality: -1
    } */
        }
    )
        .map(itemModifier)
        .filter((item) => {
            let itemConstants = lodash.clone(ITEMS[item.itemId])
            if (itemConstants) {
                if (item.itemId.indexOf("_furnace") !== -1 && !itemConstants.isCraftingScroll) {
                    if (itemConstants.tier < highestFurnaceTier) {
                        return false
                    }
                }

                try {
                    if (itemConstants.category == "combat" && itemConstants.slot != "neck" && item.extraStats) {
                        let recipeData = undefined
                        recipes.data.forEach((thisRecipe) => {
                            if (thisRecipe.produces === item.itemId) {
                                recipeData = thisRecipe
                            }
                        })

                        let successChance = -1000
                        let isReforgableLooted = false

                        if (!itemConstants.reforgeRecipe || !itemConstants.reforgeRecipe.requiresCrafting) {
                            if (classReforgeData && classReforgeData[item.itemId] && classReforgeData[item.itemId].requiresCrafting) {
                                itemConstants.reforgeRecipe = classReforgeData[item.itemId]
                            }
                        } else {
                            if (classReforgeData && classReforgeData[item.itemId] && classReforgeData[item.itemId].requiresCrafting) {
                                itemConstants.reforgeRecipe = Object.assign(itemConstants.reforgeRecipe, classReforgeData[item.itemId])
                            }
                        }

                        if (
                            !recipeData &&
                            itemConstants.reforgeRecipe &&
                            itemConstants.reforgeRecipe.requiresCrafting
                        ) {
                            isReforgableLooted = true
                        }

                        if (recipeData) {
                            if (!item.rarityId) {
                                item.rarityId = "standard"
                            }
                            if (ITEM_RARITIES[item.rarityId] && ITEM_RARITIES[item.rarityId].nextRarity) {
                                if (craftingSkill.level > recipeData.requiredCraftingLevel) {
                                    successChance =
                                        ITEM_RARITIES[item.rarityId].nextRarity.successChance +
                                        (craftingSkill.level - recipeData.requiredCraftingLevel)
                                } else {
                                    successChance = 0
                                }
                            }
                        } else if (isReforgableLooted) {
                            if (!item.rarityId) {
                                item.rarityId = "uncommon"
                            }
                            if (ITEM_RARITIES[item.rarityId] && ITEM_RARITIES[item.rarityId].nextRarity) {
                                if (craftingSkill.level > itemConstants.reforgeRecipe.requiresCrafting) {
                                    successChance =
                                        ITEM_RARITIES[item.rarityId].nextRarity.successChance +
                                        (craftingSkill.level - itemConstants.reforgeRecipe.requiresCrafting)
                                } else {
                                    successChance = 0
                                }
                            }
                        }

                        if (isReforgableLooted) {
                            let newRarity = ""

                            if (item.rarityId === "crude") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "rough") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "standard") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "improved") {
                                newRarity = "fine"
                            }
                            if (item.rarityId === "mastercrafted") {
                                newRarity = "rare"
                            }
                            if (item.rarityId === "masterforged") {
                                newRarity = "extraordinary"
                            }
                            if (item.rarityId === "ascended") {
                                newRarity = "phenomenal"
                            }
                            if (item.rarityId === "ethereal") {
                                newRarity = "epic"
                            }

                            if (newRarity !== "") {
                                item.wantReforgeRepair = true
                            }
                        }

                        let unadjustedSuccessChance = CDbl(successChance)
                        if (successChance !== -1000 && townBuffArmoryLevel > 0) {
                            unadjustedSuccessChance += townBuffArmoryLevel * 5
                        }

                        if (successChance !== -1000) {
                            if (townBuffArmoryLevel > 0) {
                                successChance += townBuffArmoryLevel * 5
                            }
                            if (successChance > 95) {
                                successChance = 95
                            }
                            if (successChance < 0) {
                                successChance = 0
                            }

                            item.reforgeChance = `${Math.round(successChance)}%`
                        }

                        item.unadjustedReforgeChance = unadjustedSuccessChance
                    }
                } catch (err) {}
            }
            return true
        })
}

const FetchSomeVisibleItems = function (highestFurnaceTier) {
    const recipes = Session.get("recipeCache")
    const craftingSkill = Skills.findOne({ type: "crafting" })
    const townBuffArmoryLevel = getBuffLevel("town_armory")

    const classReforgeData = userCurrentClass()?.data?.reforge

    return Items.find(
        {
            equipped: false,
            $or: [{ hidden: false }, { hidden: { $exists: false } }]
        },
        {
            limit: 50 /* ,
      sort: {
        category: 1,
        name: 1,
        quality: -1
      } */
        }
    )
        .map(itemModifier)
        .filter((item) => {
            let itemConstants = lodash.clone(ITEMS[item.itemId])
            if (itemConstants) {
                if (item.itemId.indexOf("_furnace") !== -1 && !itemConstants.isCraftingScroll) {
                    if (itemConstants.tier < highestFurnaceTier) {
                        return false
                    }
                }

                try {
                    if (itemConstants.category == "combat" && itemConstants.slot != "neck" && item.extraStats) {
                        let recipeData = undefined
                        recipes.data.forEach((thisRecipe) => {
                            if (thisRecipe.produces === item.itemId) {
                                recipeData = thisRecipe
                            }
                        })

                        let successChance = -1000
                        let isReforgableLooted = false

                        if (!itemConstants.reforgeRecipe || !itemConstants.reforgeRecipe.requiresCrafting) {
                            if (classReforgeData && classReforgeData[item.itemId] && classReforgeData[item.itemId].requiresCrafting) {
                                itemConstants.reforgeRecipe = classReforgeData[item.itemId]
                            }
                        } else {
                            if (classReforgeData && classReforgeData[item.itemId] && classReforgeData[item.itemId].requiresCrafting) {
                                itemConstants.reforgeRecipe = Object.assign(itemConstants.reforgeRecipe, classReforgeData[item.itemId])
                            }
                        }

                        if (
                            !recipeData &&
                            itemConstants.reforgeRecipe &&
                            itemConstants.reforgeRecipe.requiresCrafting
                        ) {
                            isReforgableLooted = true
                        }

                        if (recipeData) {
                            if (!item.rarityId) {
                                item.rarityId = "standard"
                            }
                            if (ITEM_RARITIES[item.rarityId] && ITEM_RARITIES[item.rarityId].nextRarity) {
                                if (craftingSkill.level > recipeData.requiredCraftingLevel) {
                                    successChance =
                                        ITEM_RARITIES[item.rarityId].nextRarity.successChance +
                                        (craftingSkill.level - recipeData.requiredCraftingLevel)
                                } else {
                                    successChance = 0
                                }
                            }
                        } else if (isReforgableLooted) {
                            if (!item.rarityId) {
                                item.rarityId = "uncommon"
                            }
                            if (ITEM_RARITIES[item.rarityId] && ITEM_RARITIES[item.rarityId].nextRarity) {
                                if (craftingSkill.level > itemConstants.reforgeRecipe.requiresCrafting) {
                                    successChance =
                                        ITEM_RARITIES[item.rarityId].nextRarity.successChance +
                                        (craftingSkill.level - itemConstants.reforgeRecipe.requiresCrafting)
                                } else {
                                    successChance = 0
                                }
                            }
                        }

                        if (isReforgableLooted) {
                            let newRarity = ""

                            if (item.rarityId === "crude") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "rough") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "standard") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "improved") {
                                newRarity = "fine"
                            }
                            if (item.rarityId === "mastercrafted") {
                                newRarity = "rare"
                            }
                            if (item.rarityId === "masterforged") {
                                newRarity = "extraordinary"
                            }
                            if (item.rarityId === "ascended") {
                                newRarity = "phenomenal"
                            }
                            if (item.rarityId === "ethereal") {
                                newRarity = "epic"
                            }

                            if (newRarity !== "") {
                                item.wantReforgeRepair = true
                            }
                        }

                        let unadjustedSuccessChance = CDbl(successChance)
                        if (successChance !== -1000 && townBuffArmoryLevel > 0) {
                            unadjustedSuccessChance += townBuffArmoryLevel * 5
                        }

                        if (successChance !== -1000) {
                            if (townBuffArmoryLevel > 0) {
                                successChance += townBuffArmoryLevel * 5
                            }
                            if (successChance > 95) {
                                successChance = 95
                            }
                            if (successChance < 0) {
                                successChance = 0
                            }

                            item.reforgeChance = `${Math.round(successChance)}%`
                        }

                        item.unadjustedReforgeChance = unadjustedSuccessChance
                    }
                } catch (err) {}
            }
            return true
        })
}

const FetchAllHiddenItems = function (highestFurnaceTier) {
    const recipes = Session.get("recipeCache")
    const craftingSkill = Skills.findOne({ type: "crafting" })
    const townBuffArmoryLevel = getBuffLevel("town_armory")

    const classReforgeData = userCurrentClass()?.data?.reforge

    return Items.find(
        {
            equipped: false,
            hidden: true
        } /* , {
    sort: {
      category: 1,
      name: 1,
      quality: -1
    }
  } */
    )
        .map(itemModifier)
        .filter((item) => {
            let itemConstants = lodash.clone(ITEMS[item.itemId])
            if (itemConstants) {
                if (item.itemId.indexOf("_furnace") !== -1 && !itemConstants.isCraftingScroll) {
                    if (itemConstants.tier < highestFurnaceTier) {
                        return false
                    }
                }

                try {
                    if (itemConstants.category == "combat" && itemConstants.slot != "neck" && item.extraStats) {
                        let recipeData = undefined
                        recipes.data.forEach((thisRecipe) => {
                            if (thisRecipe.produces === item.itemId) {
                                recipeData = thisRecipe
                            }
                        })

                        let successChance = -1000
                        let isReforgableLooted = false

                        if (!itemConstants.reforgeRecipe || !itemConstants.reforgeRecipe.requiresCrafting) {
                            if (classReforgeData && classReforgeData[item.itemId] && classReforgeData[item.itemId].requiresCrafting) {
                                itemConstants.reforgeRecipe = classReforgeData[item.itemId]
                            }
                        } else {
                            if (classReforgeData && classReforgeData[item.itemId] && classReforgeData[item.itemId].requiresCrafting) {
                                itemConstants.reforgeRecipe = Object.assign(itemConstants.reforgeRecipe, classReforgeData[item.itemId])
                            }
                        }

                        if (
                            !recipeData &&
                            itemConstants.reforgeRecipe &&
                            itemConstants.reforgeRecipe.requiresCrafting
                        ) {
                            isReforgableLooted = true
                        }

                        if (recipeData) {
                            if (!item.rarityId) {
                                item.rarityId = "standard"
                            }
                            if (ITEM_RARITIES[item.rarityId] && ITEM_RARITIES[item.rarityId].nextRarity) {
                                if (craftingSkill.level > recipeData.requiredCraftingLevel) {
                                    successChance =
                                        ITEM_RARITIES[item.rarityId].nextRarity.successChance +
                                        (craftingSkill.level - recipeData.requiredCraftingLevel)
                                } else {
                                    successChance = 0
                                }
                            }
                        } else if (isReforgableLooted) {
                            if (!item.rarityId) {
                                item.rarityId = "uncommon"
                            }
                            if (ITEM_RARITIES[item.rarityId] && ITEM_RARITIES[item.rarityId].nextRarity) {
                                if (craftingSkill.level > itemConstants.reforgeRecipe.requiresCrafting) {
                                    successChance =
                                        ITEM_RARITIES[item.rarityId].nextRarity.successChance +
                                        (craftingSkill.level - itemConstants.reforgeRecipe.requiresCrafting)
                                } else {
                                    successChance = 0
                                }
                            }
                        }

                        if (isReforgableLooted) {
                            let newRarity = ""

                            if (item.rarityId === "crude") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "rough") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "standard") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "improved") {
                                newRarity = "fine"
                            }
                            if (item.rarityId === "mastercrafted") {
                                newRarity = "rare"
                            }
                            if (item.rarityId === "masterforged") {
                                newRarity = "extraordinary"
                            }
                            if (item.rarityId === "ascended") {
                                newRarity = "phenomenal"
                            }
                            if (item.rarityId === "ethereal") {
                                newRarity = "epic"
                            }

                            if (newRarity !== "") {
                                item.wantReforgeRepair = true
                            }
                        }

                        let unadjustedSuccessChance = CDbl(successChance)
                        if (successChance !== -1000 && townBuffArmoryLevel > 0) {
                            unadjustedSuccessChance += townBuffArmoryLevel * 5
                        }

                        if (successChance !== -1000) {
                            if (townBuffArmoryLevel > 0) {
                                successChance += townBuffArmoryLevel * 5
                            }
                            if (successChance > 95) {
                                successChance = 95
                            }
                            if (successChance < 0) {
                                successChance = 0
                            }

                            item.reforgeChance = `${Math.round(successChance)}%`
                        }

                        item.unadjustedReforgeChance = unadjustedSuccessChance
                    }
                } catch (err) {}
            }
            return true
        })
}

const FetchAllVisibleItems = function (highestFurnaceTier) {
    const recipes = Session.get("recipeCache")
    const craftingSkill = Skills.findOne({ type: "crafting" })
    const townBuffArmoryLevel = getBuffLevel("town_armory")

    const classReforgeData = userCurrentClass()?.data?.reforge

    return Items.find(
        {
            equipped: false,
            $or: [{ hidden: false }, { hidden: { $exists: false } }]
        } /*, {
      sort: {
        category: 1,
        name: 1,
        quality: -1
      }
    } */
    )
        .map(itemModifier)
        .filter((item) => {
            let itemConstants = lodash.clone(ITEMS[item.itemId])
            if (itemConstants) {
                if (item.itemId.indexOf("_furnace") !== -1 && !itemConstants.isCraftingScroll) {
                    if (itemConstants.tier < highestFurnaceTier) {
                        return false
                    }
                }

                try {
                    if (itemConstants.category == "combat" && itemConstants.slot != "neck" && item.extraStats) {
                        let recipeData = undefined
                        recipes.data.forEach((thisRecipe) => {
                            if (thisRecipe.produces === item.itemId) {
                                recipeData = thisRecipe
                            }
                        })

                        let successChance = -1000
                        let isReforgableLooted = false

                        if (!itemConstants.reforgeRecipe || !itemConstants.reforgeRecipe.requiresCrafting) {
                            if (classReforgeData && classReforgeData[item.itemId] && classReforgeData[item.itemId].requiresCrafting) {
                                itemConstants.reforgeRecipe = classReforgeData[item.itemId]
                            }
                        } else {
                            if (classReforgeData && classReforgeData[item.itemId] && classReforgeData[item.itemId].requiresCrafting) {
                                itemConstants.reforgeRecipe = Object.assign(itemConstants.reforgeRecipe, classReforgeData[item.itemId])
                            }
                        }
                        
                        if (
                            !recipeData &&
                            itemConstants.reforgeRecipe &&
                            itemConstants.reforgeRecipe.requiresCrafting
                        ) {
                            isReforgableLooted = true
                        }

                        if (recipeData) {
                            if (!item.rarityId) {
                                item.rarityId = "standard"
                            }
                            if (ITEM_RARITIES[item.rarityId] && ITEM_RARITIES[item.rarityId].nextRarity) {
                                if (craftingSkill.level > recipeData.requiredCraftingLevel) {
                                    successChance =
                                        ITEM_RARITIES[item.rarityId].nextRarity.successChance +
                                        (craftingSkill.level - recipeData.requiredCraftingLevel)
                                } else {
                                    successChance = 0
                                }
                            }
                        } else if (isReforgableLooted) {
                            if (!item.rarityId) {
                                item.rarityId = "uncommon"
                            }
                            if (ITEM_RARITIES[item.rarityId] && ITEM_RARITIES[item.rarityId].nextRarity) {
                                if (craftingSkill.level > itemConstants.reforgeRecipe.requiresCrafting) {
                                    successChance =
                                        ITEM_RARITIES[item.rarityId].nextRarity.successChance +
                                        (craftingSkill.level - itemConstants.reforgeRecipe.requiresCrafting)
                                } else {
                                    successChance = 0
                                }
                            }
                        }

                        if (isReforgableLooted) {
                            let newRarity = ""

                            if (item.rarityId === "crude") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "rough") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "standard") {
                                newRarity = "uncommon"
                            }
                            if (item.rarityId === "improved") {
                                newRarity = "fine"
                            }
                            if (item.rarityId === "mastercrafted") {
                                newRarity = "rare"
                            }
                            if (item.rarityId === "masterforged") {
                                newRarity = "extraordinary"
                            }
                            if (item.rarityId === "ascended") {
                                newRarity = "phenomenal"
                            }
                            if (item.rarityId === "ethereal") {
                                newRarity = "epic"
                            }

                            if (newRarity !== "") {
                                item.wantReforgeRepair = true
                            }
                        }

                        let unadjustedSuccessChance = CDbl(successChance)
                        if (successChance !== -1000 && townBuffArmoryLevel > 0) {
                            unadjustedSuccessChance += townBuffArmoryLevel * 5
                        }

                        if (successChance !== -1000) {
                            if (townBuffArmoryLevel > 0) {
                                successChance += townBuffArmoryLevel * 5
                            }
                            if (successChance > 95) {
                                successChance = 95
                            }
                            if (successChance < 0) {
                                successChance = 0
                            }

                            item.reforgeChance = `${Math.round(successChance)}%`
                        }

                        item.unadjustedReforgeChance = unadjustedSuccessChance
                    }
                } catch (err) {}
            }
            return true
        })
}
