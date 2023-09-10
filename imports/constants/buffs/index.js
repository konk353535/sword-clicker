import { ATTACK_BUFFS } from "./attack"
import { BOSS_BUFFS } from "./boss"
import { COMPANION_BUFFS } from "./companions"
import { CRAFTED_ENCHANTMENT_BUFFS } from "./crafted_enchantments"
import { DEFENSE_BUFFS } from "./defense"
import { ENCHANTMENT_BUFFS } from "./enchantments"
import { FOOD_BUFFS } from "./food"
import { MAGIC_BUFFS } from "./magic"
import { MISC_BUFFS } from "./misc"
import { MONSTER_BUFFS } from "./monster"

export const BUFFS = Object.assign(
    FOOD_BUFFS,
    ATTACK_BUFFS,
    DEFENSE_BUFFS,
    ENCHANTMENT_BUFFS,
    CRAFTED_ENCHANTMENT_BUFFS,
    MAGIC_BUFFS,
    MONSTER_BUFFS,
    BOSS_BUFFS,
    COMPANION_BUFFS,
    MISC_BUFFS
)
