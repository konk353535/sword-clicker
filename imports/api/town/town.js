import lodash from "lodash"
import { Meteor } from "meteor/meteor"
import { Mongo } from "meteor/mongo"

import { Servers } from "/imports/api/servers/servers"
import { serverFromUser } from "/imports/api/users/users"
import { FARMING } from "/imports/constants/farming/index.js"
import { ITEMS, ITEM_RARITIES } from "/imports/constants/items"
import { CInt } from "/imports/utils"

export const Town = new Mongo.Collection("town") // pseudo-collection that's a sub-collection of Servers

export const createTown = function createTown(serverId) {
    Servers.update(
        {
            _id: serverId
        },
        {
            $set: {
                town: {
                    day1goods: [],
                    day2goods: [],
                    day3goods: [],
                    day4goods: [],
                    day5goods: [],
                    day6goods: [],
                    day7goods: []
                }
            }
        }
    )
}

export const calculateItemKarma = function calculateItemKarma(item__in) {
    let item

    try {
        if (typeof item__in === "undefined" || !item__in) {
            return 0
        }

        if (typeof item__in === "string") {
            // assuming the string is itemId
            if (ITEMS[item__in]) {
                item = lodash.cloneDeep(ITEMS[item__in])
            }
            // otherwise, no idea
        } else if (item__in.id || item__in.icon) {
            // intentionally logical OR
            // we have item constants passed in
            item = lodash.cloneDeep(item__in)
        } else if (item__in._id && item__in.itemId) {
            // intentionally logical AND
            // we have an item
            if (ITEMS[item__in.itemId]) {
                item = lodash.cloneDeep(ITEMS[item__in.itemId])
            }
        }

        if (typeof item === "undefined" || !item) {
            return 0
        }
    } catch (err) {}

    // `item` should only be ITEM[] constants at this point
    try {
        // BEGIN: logic to determine karma

        if (item.category === "food") {
            return CInt(item.sellPrice)
        }

        if (item.category === "seed" && item.seedType === "food") {
            const targetItem = ITEMS[item.id.substring(0, item.id.length - 5)]
            if (!targetItem) {
                return 0
            }
            return CInt(Math.ceil(targetItem.sellPrice / 2.5))
        }

        if (item.category === "seed" && item.seedType === "xp") {
            const targetItem = FARMING.plants[item.produces]
            if (!targetItem) {
                return 0
            }
            return CInt(Math.ceil(targetItem.xp / 75))
        }

        if (item.id === "ore_coal") return 1
        if (item.id === "cactus") return 8
        if (item.id === "reed") return 15
        if (item.id === "papyrus") return 30
        if (item.id === "bamboo") return 60
        if (item.id === "palm") return 120
        if (item.id === "kenaf") return 250
        if (item.id === "bamboo_shack") return 2500

        if (item.category === "mining") {
            // pick axes, dwarven idols, crafted idols, mining hammers, and mining anvils
            if (item.isEquippable) {
                return CInt(Math.ceil(item.sellPrice / 1.75))
            }

            // jewels
            if (item.id === "jade") return 1000
            if (item.id === "lapislazuli") return 2500
            if (item.id === "sapphire") return 5000
            if (item.id === "emerald") return 10000
            if (item.id === "ruby") return 25000
            if (item.id === "tanzanite") return 50000
            if (item.id === "fireopal") return 100000

            // ore and essence
            return CInt(item.sellPrice)
        }

        if (item.category === "woodcutting") {
            // woodcutting axes
            if (item.isAxe) {
                return CInt(Math.ceil(item.sellPrice / 1.25))
            }

            // logs
            return CInt(item.sellPrice)
        }

        if (item.category === "combat") {
            let rarityBonus = 1

            // boss and event items
            if (item.rarityId && typeof item.rarityId === "string") {
                if (item.rarityId === "prized") {
                    return 0
                }

                const rarityIdConsts = ITEM_RARITIES[item.rarityId]
                if (rarityIdConsts && rarityIdConsts.statBonuses) {
                    rarityBonus += rarityIdConsts.statBonuses / 2 / 100.0 // karma points are bonused by half the rarity bonus to stats (+25% rarity would be +12.5% bonus karma)
                }
            }

            // all other equipment
            return CInt(Math.ceil((rarityBonus * item.sellPrice) / 2.25))
        }

        if (item.isCraftingScroll && item.teaches) {
            const targetItem = ITEMS[item.teaches] // assume there's an itemId matching the recipe from `item.teaches`, since technically this is a crafting ID
            if (!targetItem) {
                return 0
            }

            if (targetItem.category === "combat") {
                // bows, quivers, T21+ scrolls
                return CInt(Math.ceil(targetItem.sellPrice / 3.75))
            }

            if (targetItem.category === "crafting") {
                // thirsty fangs 1, thirsty fangs 2, golden crown, and all essence scrolls
                return CInt(Math.ceil(targetItem.sellPrice / 5.25))
            }

            return CInt(Math.ceil(targetItem.sellPrice / 10.0))
        }

        if (item.category === "tome") {
            // event tomes
            if (item.icon === "tomeEvent.svg") {
                return 0
            }

            // all other tomes
            return CInt(Math.ceil(item.sellPrice / 12.5))
        }

        if (item.category === "pigment") {
            // all pigments
            return CInt(Math.ceil(item.sellPrice / 7.5))
        }

        // NOTE: includes both crafted paper and books
        if (item.category === "paper") {
            // all paper and books
            return CInt(Math.ceil(item.sellPrice / 2.5))
        }

        if (item.category === "magic_book") {
            // all magic books
            return CInt(Math.ceil(item.sellPrice / 1.5))
        }

        if (item.category === "astronomy") {
            // all fragments, complete shards, and ancient shards
            return CInt(Math.ceil(item.sellPrice * 1.5))
        }

        // END
    } catch (err) {}

    return 0
}

export const karmaLevelValues = function karmaLevelValues(townSection, townInfo__in) {
    let buffNameThisSection = ""

    try {
        if (typeof townSection !== "string") {
            return {
                townSection: townSection,
                isError: true,
                exceptionDetails: "Missing town location.",
                curVal: 0,
                nextLevel: 0,
                currentLevel: 0,
                targetLevel: 0,
                buffName: buffNameThisSection
            }
        }

        townSection = townSection.toLowerCase().trim()

        if (townSection == "dwelling" || townSection == "dwellings") {
            buffNameThisSection = "town_dwelling"
        } else if (townSection == "quarry") {
            buffNameThisSection = "town_quarry"
        } else if (townSection == "lumberyard" || townSection == "lumber_yard" || townSection == "lumber yard") {
            buffNameThisSection = "town_lumber_yard"
        } else if (townSection == "armory") {
            buffNameThisSection = "town_armory"
        } else if (townSection == "library") {
            buffNameThisSection = "town_library"
        } else if (townSection == "observatory") {
            buffNameThisSection = "town_observatory"
        } else {
            return {
                townSection: townSection,
                isError: true,
                exceptionDetails: "Invalid town location.",
                curVal: 0,
                nextLevel: 0,
                currentLevel: 0,
                targetLevel: 0,
                buffName: buffNameThisSection
            }
        }

        let townInfo
        if (typeof townInfo__in === "object") {
            townInfo = townInfo__in
        }
        if (!townInfo || !townInfo.day1goods) {
            const serverInfo = lodash.cloneDeep(Servers.findOne({ _id: serverFromUser() }))
            if (!serverInfo || !serverInfo.town) {
                townInfo = Meteor.call("town.getGoods", -1)
            } else {
                townInfo = serverInfo.town
            }
        }

        if (!townInfo) {
            return {
                townSection: townSection,
                isError: true,
                exceptionDetails: "There are no servers yet.",
                curVal: 0,
                nextLevel: 0,
                currentLevel: 0,
                targetLevel: 0,
                buffName: buffNameThisSection
            }
        }

        const townGoods = [
            townInfo.day1goods,
            townInfo.day2goods,
            townInfo.day3goods,
            townInfo.day4goods,
            townInfo.day5goods,
            townInfo.day6goods,
            townInfo.day7goods
        ]

        let curVal = 0
        let lastDayVal = 0
        let nextVal = 0

        for (let iDay = 0; iDay < 7; iDay++) {
            if (iDay === 0) {
                townGoods[iDay].forEach((good) => {
                    if (good.townBuilding === townSection) {
                        curVal += calculateItemKarma(good.itemId) * good.count
                    }
                })
            } else if (iDay === 1) {
                townGoods[iDay].forEach((good) => {
                    if (good.townBuilding === townSection) {
                        lastDayVal += calculateItemKarma(good.itemId) * good.count
                    }
                })
            }
        }

        // baseline level 1 = 1000
        // baseline level 2 = 7943.2823472428150206591828283639
        // baseline level 3 = 47863.009232263834392208773933365
        // baseline level 4 = 240990.54286865948713077025766237
        // baseline level 5 = 832146.90068679357239584603696727

        const baseLineLevel1 = 1000
        const baseLineLevel4 = Math.ceil(Math.pow(Math.pow(Math.pow(baseLineLevel1, 1.3), 1.2), 1.15)) // = 240990.54286865948713077025766237 = 240991
        const baseLineLevel5 = Math.ceil(Math.pow(Math.pow(Math.pow(Math.pow(baseLineLevel1, 1.3), 1.2), 1.15), 1.1)) // = 832146.90068679357239584603696727 = 832147

        let targetForCurrentDayLevel1 = lastDayVal / ((baseLineLevel4 + baseLineLevel5) / 2.0 / baseLineLevel1)
        if (targetForCurrentDayLevel1 < baseLineLevel1) {
            targetForCurrentDayLevel1 = baseLineLevel1
        }

        const valLevel1 = targetForCurrentDayLevel1
        const valLevel2 = Math.pow(valLevel1, 1.3)
        const valLevel3 = Math.pow(valLevel2, 1.2)
        const valLevel4 = Math.pow(valLevel3, 1.15)
        const valLevel5 = Math.pow(valLevel4, 1.1)

        nextVal = valLevel1
        let targetLevel = 1
        while (curVal >= nextVal) {
            if (targetLevel === 5) {
                break
            }

            targetLevel++
            if (targetLevel === 2) {
                nextVal = valLevel2
            } else if (targetLevel === 3) {
                nextVal = valLevel3
            } else if (targetLevel === 4) {
                nextVal = valLevel4
            } else if (targetLevel === 5) {
                nextVal = valLevel5
            }
        }

        return {
            townSection,
            isError: false,
            curVal,
            nextVal,
            currentLevel: curVal >= nextVal ? targetLevel : CInt(targetLevel - 1),
            targetLevel,
            buffName: buffNameThisSection
        }
    } catch (err) {
        return {
            townSection: townSection,
            isError: true,
            exceptionDetails: err,
            curVal: 0,
            nextLevel: 0,
            currentLevel: 0,
            targetLevel: 0,
            buffName: buffNameThisSection
        }
    }
}
