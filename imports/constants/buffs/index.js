import { ATTACK_BUFFS } from './attack';
import { FOOD_BUFFS } from './food';
import { DEFENSE_BUFFS } from './defense';
import { MAGIC_BUFFS } from './magic';
import { MONSTER_BUFFS } from './monster';
import { BOSS_BUFFS } from './boss';
import { ENCHANTMENT_BUFFS } from './enchantments';
import { CRAFTED_ENCHANTMENT_BUFFS } from './crafted_enchantments';
import { COMPANION_BUFFS } from './companions';
import { MISC_BUFFS } from './misc';

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
);
