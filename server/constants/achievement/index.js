console.log("importing achievement/combat.js COMBAT_ACHIEVEMENTS")
import { COMBAT_ACHIEVEMENTS } from "./combat"
import { CRAFTING_ACHIEVEMENTS } from "./crafting"
import { MAGIC_ACHIEVEMENTS } from "./magic"
import { PQ_ACHIEVEMENTS } from "./pq"
import { TOWER_ACHIEVEMENTS } from "./tower"
console.log("importing achievement/crafting.js CRAFTING_ACHIEVEMENTS")
console.log("importing achievement/magic.js MAGIC_ACHIEVEMENTS")
console.log("importing achievement/pq.js PQ_ACHIEVEMENTS")
console.log("importing achievement/tower.js TOWER_ACHIEVEMENTS")

export const ACHIEVEMENTS = Object.freeze(Object.assign(
    {}, 
    COMBAT_ACHIEVEMENTS,
    CRAFTING_ACHIEVEMENTS,
    MAGIC_ACHIEVEMENTS,
    PQ_ACHIEVEMENTS,
    TOWER_ACHIEVEMENTS
))
