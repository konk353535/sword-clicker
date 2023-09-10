console.log("importing astronomy/index.js ASTRONOMY_ITEMS")
import { ASTRONOMY_ITEMS as astronomyItems } from "./items"

console.log("exporting astronomy/index.js ASTRONOMY_ITEMS")
export const ASTRONOMY_ITEMS = astronomyItems

console.log("exporting astronomy/index.js ASTRONOMY")
export const ASTRONOMY = {
    baseMaxMages: 7,

    mageHireCost(mainMage) {
        let totalGold = 500

        totalGold += 3 * mainMage.stats.attackSpeed * (1 + (mainMage.stats.criticalChance / 100) * 2)

        return [
            {
                type: "gold",
                amount: Math.round(totalGold),
                consumes: true
            }
        ]
    },

    upgradeCosts: {
        attackSpeed(current) {
            const goldAmount = (current - 50) * ((current - 50) / 15) * 300
            return [
                {
                    type: "gold",
                    amount: Math.round(goldAmount),
                    consumes: true
                }
            ]
        },

        ancientShard(current) {
            if (!current) {
                current = 0
            }

            const goldAmount = current * 3000
            return [
                {
                    type: "gold",
                    amount: Math.round(goldAmount),
                    consumes: true
                }
            ]
        },

        completeShard(current) {
            if (!current) {
                current = 0
            }

            const goldAmount = current * 1500
            return [
                {
                    type: "gold",
                    amount: Math.round(goldAmount),
                    consumes: true
                }
            ]
        },

        criticalChance(current) {
            const goldAmount = (current - 1) * (current / 15) * 1000
            return [
                {
                    type: "gold",
                    amount: Math.round(goldAmount),
                    consumes: true
                }
            ]
        }
    }
}
