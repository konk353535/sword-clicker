import moment from 'moment';
import { BUFFS } from '/server/constants/combat/index';

export const MAGIC_ABILITIES = {
  rock_dart: {
    icon: 'rockDart',
    name: 'rock dart',
    id: 'rock_dart',
    buffs: ['rock_dart'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.rock_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  water_dart: {
    icon: 'waterDart',
    name: 'water dart',
    id: 'water_dart',
    buffs: ['water_dart'],
    cooldown: 10,
    slot: 'any',
    target: 'singleFriendly',
    targettable: true,
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.water_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  air_dart: {
    icon: 'airDart',
    name: 'air dart',
    id: 'air_dart',
    buffs: ['air_dart'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.air_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  fire_dart: {
    icon: 'fireDart',
    name: 'fire dart',
    id: 'fire_dart',
    buffs: ['fire_dart'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.fire_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  mud_armor: {
    icon: 'mudArmor',
    name: 'mud armor',
    id: 'mud_armor',
    buffs: ['mud_armor'],
    cooldown: 180,
    slot: 'any',
    targettable: true,
    isHidden: true,
    target: 'singleFriendly',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.mud_armor;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  mending_water: {
    icon: 'mendingWater',
    name: 'mending water',
    id: 'mending_water',
    buffs: ['mending_water'],
    cooldown: 30,
    slot: 'any',
    targettable: true,
    isHidden: true,
    target: 'singleFriendly',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.mending_water;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  ignite: {
    icon: 'ignite',
    name: 'ignite',
    id: 'ignite',
    buffs: ['ignite'],
    cooldown: 180,
    slot: 'any',
    isHidden: true,
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.ignite;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  frenzied_winds: {
    icon: 'frenziedWinds',
    name: 'frenzied_winds',
    id: 'frenzied_winds',
    buffs: ['frenzied_winds'],
    cooldown: 180,
    slot: 'any',
    isHidden: true,
    target: 'singleFriendly',
    targettable: true,
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.frenzied_winds;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  angels_touch: {
    icon: 'angelsTouch',
    name: 'angels_touch',
    id: 'angels_touch',
    buffs: ['angels_touch'],
    cooldown: 300,
    slot: 'any',
    isHidden: true,
    target: 'singleFriendly',
    targettable: true,
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.angels_touch;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  elemental_shield: {
    icon: 'elementalShield',
    name: 'elemental_shield',
    id: 'elemental_shield',
    buffs: ['elemental_shield'],
    cooldown: 300,
    slot: 'any',
    isHidden: true,
    target: 'singleFriendly',
    targettable: true,
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.elemental_shield;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  feeding_frenzy: {
    icon: 'feedingFrenzy',
    name: 'feeding frenzy',
    id: 'feeding_frenzy',
    buffs: ['feeding_frenzy'],
    cooldown: 600,
    slot: 'any',
    isHidden: true,
    isMagic: true,
    target: 'allAllies', // The curreny enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.feeding_frenzy;
      return BUFF.description({ buff: BUFF, level });
    }
  },
}
