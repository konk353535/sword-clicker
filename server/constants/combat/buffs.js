import { ATTACK_BUFFS } from './buffs/attack';
import { FOOD_BUFFS } from './buffs/food';
import { DEFENSE_BUFFS } from './buffs/defense';
import { MAGIC_BUFFS } from './buffs/magic';
import { MONSTER_BUFFS } from './buffs/monster';
import { BOSS_BUFFS } from './buffs/boss';
import { ENCHANTMENT_BUFFS } from './buffs/enchantments';
import { CRAFTED_ENCHANTMENTS_BUFFS } from './buffs/crafted_enchantments';

export const BUFFS = Object.assign(
  FOOD_BUFFS,
  ATTACK_BUFFS,
  DEFENSE_BUFFS,
  ENCHANTMENT_BUFFS,
  MAGIC_BUFFS,
  MONSTER_BUFFS,
  BOSS_BUFFS
);
