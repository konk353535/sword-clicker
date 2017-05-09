import moment from 'moment';
import { BUFFS } from '/server/constants/combat/index';

export const ABILITY = {
  slots: ['mainHand', 'offHand', 'head', 'chest', 'legs']
}

export const ABILITIES = {

  phantom_strikes: {
    icon: 'phantomStrikes',
    name: 'phantom strikes',
    id: 'phantom_strikes',
    buffs: ['phantom_strikes'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.phantom_strikes;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  shield_bash: {
    icon: 'shieldBash',
    name: 'shield bash',
    id: 'shield_bash',
    buffs: ['shield_bash'],
    cooldown: 60,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.shield_bash;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  berserk: {
    icon: 'berserk',
    name: 'Berserk',
    id: 'berserk',
    buffs: ['berserk'],
    cooldown: 120,
    slot: 'any',
    target: 'self',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.berserk;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  taunt: {
    icon: 'taunt',
    name: 'taunt',
    id: 'taunt',
    buffs: ['taunt'],
    cooldown: 10,
    slot: 'any',
    target: 'singleEnemy',
    targettable: true,
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.taunt;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  execute: {
    icon: 'execute',
    name: 'execute',
    id: 'execute',
    buffs: ['execute'],
    cooldown: 40,
    slot: 'any',
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
    slot: 'any',
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
    slot: 'any',
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
    cooldown: 40,
    slot: 'any',
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
    cooldown: 60,
    slot: 'any',
    isHidden: false,
    target: 'self', // The curreny enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.blade_frenzy;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  armor_up: {
    icon: 'armorUp',
    name: 'armor up',
    id: 'armor_up',
    buffs: ['armor_up'],
    cooldown: 180,
    slot: 'any',
    isHidden: false,
    target: 'self', // The curreny enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.armor_up;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  iron_will: {
    icon: 'ironWill',
    name: 'iron will',
    id: 'iron_will',
    buffs: ['iron_will'],
    cooldown: 180,
    slot: 'any',
    isHidden: false,
    target: 'self', // The curreny enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.iron_will;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  bleed: {
    icon: 'bleed',
    name: 'bleed',
    id: 'bleed',
    buffs: ['bleed'],
    cooldown: 30,
    slot: 'any',
    isHidden: false,
    target: 'currentEnemy', // The curreny enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.bleed;
      return BUFF.description({ buff: BUFF, level });
    }
  }
}
