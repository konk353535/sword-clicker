console.log("importing inscription/index.js INSCRIPTION_ITEMS")
import { INSCRIPTION_ITEMS as inscriptionItems } from "./items"

console.log("exporting inscription/index.js INSCRIPTION_ITEMS")
export const INSCRIPTION_ITEMS = Object.freeze(inscriptionItems)

console.log("exporting inscription/index.js INSCRIPTION")
export const INSCRIPTION = Object.freeze({
    getMaxCrafts(inscriptionLevel) {
        let maxCrafts = 2

        if (inscriptionLevel >= 5) {
            maxCrafts = 3
        }

        if (inscriptionLevel >= 15) {
            maxCrafts = 4
        }

        if (inscriptionLevel >= 30) {
            maxCrafts = 5
        }

        if (inscriptionLevel >= 45) {
            maxCrafts = 6
        }

        if (inscriptionLevel >= 60) {
            maxCrafts = 7
        }

        if (inscriptionLevel >= 75) {
            maxCrafts = 8
        }

        if (inscriptionLevel >= 90) {
            maxCrafts = 9
        }

        if (inscriptionLevel >= 105) {
            maxCrafts = 10
        }

        if (inscriptionLevel >= 120) {
            maxCrafts = 11
        }

        if (inscriptionLevel >= 135) {
            maxCrafts = 12
        }

        return maxCrafts
    }
})
