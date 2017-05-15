import { ATTACK_BUFFS } from './buffs/attack';
import { FOOD_BUFFS } from './buffs/food';
import { DEFENSE_BUFFS } from './buffs/defense';
import { MAGIC_BUFFS } from './buffs/magic';

export const BUFFS = Object.assign(
  FOOD_BUFFS,
  ATTACK_BUFFS,
  DEFENSE_BUFFS,
  MAGIC_BUFFS
);
