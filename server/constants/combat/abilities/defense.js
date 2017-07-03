import moment from 'moment';
import { BUFFS } from '/server/constants/combat/index';

export const DEFENSE_ABILITIES = {

  scream: {
    icon: 'scream',
    name: 'scream',
    id: 'scream',
    buffs: ['taunt'],
    cooldown: 90,
    slot: 'any',
    target: 'allEnemies',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.taunt;
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
    target: 'currentEnemy',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.taunt;
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

  health_up: {
    icon: 'health',
    name: 'health up',
    id: 'health_up',
    buffs: ['health_up'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.health_up;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  defense_up: {
    icon: 'defense',
    name: 'defense up',
    id: 'defense_up',
    buffs: ['defense_up'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.defense_up;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  spiked_armor: {
    icon: 'spikedArmor',
    name: 'spiked armor',
    id: 'spiked_armor',
    buffs: ['spiked_armor'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.spiked_armor;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  frost_armor: {
    icon: 'frostArmor',
    name: 'frost armor',
    id: 'frost_armor',
    buffs: ['frost_armor'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.frost_armor;
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
  }
}
