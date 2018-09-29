
import { ATTACK_ABILITIES } from './abilities/attack';
import { MAGIC_ABILITIES } from './abilities/magic';
import { DEFENSE_ABILITIES } from './abilities/defense';

export const ABILITY = {
  slots: ['mainHand', 'offHand', 'head', 'chest', 'legs']
}

export const ABILITIES = Object.assign(
  ATTACK_ABILITIES,
  DEFENSE_ABILITIES,
  MAGIC_ABILITIES
);
