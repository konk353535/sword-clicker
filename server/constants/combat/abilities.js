import moment from 'moment';
import { BUFFS } from '/server/constants/combat/index';

export const ABILITIES = {

  berserk: {
    icon: 'berserk',
    name: 'Berserk',
    id: 'berserk',
    buffs: ['berserk'],
    cooldown: 120,
    slot: 'mainHand',
    target: 'self',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.berserk;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  execute: {
    icon: 'execute',
    name: 'execute',
    id: 'execute',
    buffs: ['execute'],
    cooldown: 20,
    slot: 'offHand',
    isHidden: false,
    target: 'currentEnemy', // The curreny enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.execute;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  blade_spin: {
    icon: 'bladeSpin',
    name: 'blade spin',
    id: 'blade_spin',
    buffs: ['blade_spin'],
    cooldown: 20,
    slot: 'chest',
    isHidden: false,
    target: 'allEnemies', // The curreny enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.blade_spin;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  defensive_stance: {
    icon: 'defensiveStance',
    name: 'defensive stance',
    id: 'defensive_stance',
    buffs: ['defensive_stance'],
    cooldown: 300,
    slot: 'chest',
    isHidden: false,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.defensive_stance;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  evasive_maneuvers: {
    icon: 'evasiveManeuvers',
    name: 'evasive maneuvers',
    id: 'evasive_maneuvers',
    buffs: ['evasive_maneuvers'],
    cooldown: 10,
    slot: 'chest',
    isHidden: false,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.evasive_maneuvers;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  blade_frenzy: {
    icon: 'bladeFrenzy',
    name: 'blade frenzy',
    id: 'blade_frenzy',
    buffs: ['blade_frenzy'],
    cooldown: 20,
    slot: 'legs',
    isHidden: false,
    target: 'self', // The curreny enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.blade_frenzy;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  bleed: {
    icon: 'bleed',
    name: 'bleed',
    id: 'bleed',
    buffs: ['bleed'],
    cooldown: 20,
    slot: 'head',
    isHidden: false,
    target: 'currentEnemy', // The curreny enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.bleed;
      return BUFF.description({ buff: BUFF, level });
    }
  }
}
