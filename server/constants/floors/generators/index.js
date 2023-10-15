console.log("importing floors/index.js personalQuestMonsterGenerator")
import { easyTowerMonsterGenerator } from "./easyTower.js"
import { genericTowerMonsterGenerator, topFloorTowerMonsterGenerator } from "./genericTower.js"
import { hardTowerMonsterGenerator } from "./hardTower.js"
import { personalQuestMonsterGenerator } from "./personalQuest.js"
import { veryHardTowerMonsterGenerator } from "./veryHardTower.js"
console.log("importing floors/index.js easyTowerMonsterGenerator")
console.log("importing floors/index.js hardTowerMonsterGenerator")
console.log("importing floors/index.js veryHardTowerMonsterGenerator")
console.log("importing floors/index.js genericTowerMonsterGenerator")

export const GENERATORS = Object.freeze(Object.assign({}, {
    // Given a level, create a monster for personal quest
    personalQuestMonsterGenerator,

    // Given a floor, create a monster for tower
    easyTowerMonsterGenerator,
    hardTowerMonsterGenerator,
    veryHardTowerMonsterGenerator,
    genericTowerMonsterGenerator,
    topFloorTowerMonsterGenerator
}))
