import moment from 'moment';
import { BUFFS } from '../../../../imports/constants/buffs/index';

export const DEFENSE_ABILITIES = {

  scream: {
    icon: 'scream.svg',
    name: 'scream',
    id: 'scream',
    buffs: ['scream'],
    cooldown: 5,
    slot: 'any',
    target: 'allEnemies',
    isHidden: false,
    description(level) {
      // const BUFF = BUFFS.taunt;
      return 'Forces all enemies to target you.  Cooldown increases by 10 seconds for each taunted enemy.';
    }
  },
  
  holiday_cheer: {
    icon: 'holidayCheer.svg',
    name: 'holiday cheer',
    id: 'holiday_cheer',
    buffs: ['holiday_cheer'],
    cooldown: 10,
    slot: 'any',
    target: 'allAllies',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.holiday_cheer;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  eel_taunt: {
    icon: 'eelTaunt.svg',
    name: 'eel taunt',
    id: 'eel_taunt',
    buffs: ['eel_taunt'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.eel_taunt;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  lion_taunt: {
    icon: 'lionTaunt.svg',
    name: 'lion taunt',
    id: 'lion_taunt',
    buffs: ['lion_taunt'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.lion_taunt;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  bear_taunt: {
    icon: 'bearTaunt.svg',
    name: 'bear taunt',
    id: 'bear_taunt',
    buffs: ['bear_taunt'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.bear_taunt;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  taunt: {
    icon: 'taunt.svg',
    name: 'taunt',
    id: 'taunt',
    buffs: ['taunt'],
    scaledCooldown: function(ability) {
      if (ability) {
        if ((ability.level >= 1) && (ability.level <= 5)) {
          return 10 - ((ability.level - 1) * 1.5)
        }
      }
      return 10; // failsafe
    },
    cooldown: 10, // overridden by .scaledCooldown in BUFFS for clients and above for server
    slot: 'any',
    target: 'currentEnemy',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.taunt;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  volcanic_shield: {
    icon: 'volcanicShield.svg',
    name: 'volcanic shield',
    id: 'volcanic_shield',
    buffs: ['volcanic_shield'],
    cooldown: 40,
    slot: 'any',
    isHidden: false,
    target: 'self',
    requires: [{
      type: 'weaponType',
      weaponTypes: ['shield']
    }],
    description(level) {
      const BUFF = BUFFS.volcanic_shield;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  defensive_stance: {
    icon: 'defensiveStance.svg',
    name: 'defensive stance',
    id: 'defensive_stance',
    buffs: ['defensive_stance'],
    cooldown: 180,
    slot: 'any',
    isHidden: false,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.defensive_stance;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  evasive_maneuvers: {
    icon: 'evasiveManeuvers.svg',
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
    icon: 'health.svg',
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

  sixth_sense: {
    icon: 'sixthSense.svg',
    name: 'watchful aura',
    id: 'sixth_sense',
    buffs: ['sixth_sense'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.sixth_sense;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  defense_up: {
    icon: 'defense.svg',
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
    icon: 'spikedArmor.svg',
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
    icon: 'frostArmor.svg',
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
    icon: 'armorUp.svg',
    name: 'Bolster',
    id: 'armor_up',
    buffs: ['armor_up'],
    cooldown: 180,
    slot: 'any',
    isHidden: false,
    target: 'self', // The current enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.armor_up;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  armor_up_new: {
    icon: 'armorUpNew.svg',
    name: 'armor up',
    id: 'armor_up_new',
    buffs: ['armor_up_new'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    isHidden: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.armor_up_new;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  magic_armor_up: {
    icon: 'magicArmorUp.svg',
    name: 'magic armor up',
    id: 'magic_armor_up',
    buffs: ['magic_armor_up'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    isHidden: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.magic_armor_up;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  iron_will: {
    icon: 'ironWill.svg',
    name: 'iron will',
    id: 'iron_will',
    buffs: ['iron_will'],
    cooldown: 90,
    slot: 'any',
    isHidden: false,
    target: 'self', // The current enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.iron_will;
      return BUFF.description({ buff: BUFF, level });
    }
  },
  
  baby_fox: {
    icon: 'babyFox.svg',
    name: 'baby fox',
    id: 'baby_fox',
    buffs: ['baby_fox_ability'],
    cooldown: 0,
    isPassive: true,
    slot: 'companion',
    isHidden: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.baby_fox_ability;
      return BUFF.description({ buff: BUFF, level });
    }
  },
    
  skeletal_warrior: {
    icon: 'boneWarrior.svg',
    name: 'skeletal warrior',
    id: 'skeletal_warrior',
    buffs: ['skeletal_warrior'],
    cooldown: 0,
    isPassive: true,
    slot: 'companion',
    isHidden: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.skeletal_warrior;
      return BUFF.description({ buff: BUFF, level });
    }
  },
  
  cute_pig: {
    icon: 'cutePig.svg',
    name: 'cute pig',
    id: 'cute_pig',
    buffs: ['cute_pig'],
    cooldown: 0,
    isPassive: true,
    slot: 'companion',
    isHidden: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.cute_pig;
      return BUFF.description({ buff: BUFF, level });
    }
  },
  
  mystic_fairy: {
    icon: 'fairy.svg',
    name: 'mystic fairy',
    id: 'mystic_fairy',
    buffs: ['mystic_fairy'],
    cooldown: 0,
    isPassive: true,
    slot: 'companion',
    isHidden: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.mystic_fairy;
      return BUFF.description({ buff: BUFF, level });
    }
  },
};
