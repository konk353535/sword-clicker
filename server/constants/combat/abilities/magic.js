import moment from 'moment';
import { BUFFS } from '/server/constants/combat/index';

export const MAGIC_ABILITIES = {
  earth_dart: {
    icon: 'earthDart',
    name: 'earth dart',
    id: 'earth_dart',
    buffs: ['earth_dart'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.earth_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  earth_ball: {
    icon: 'earthBall',
    name: 'earth ball',
    id: 'earth_ball',
    buffs: ['earth_ball'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.earth_ball;
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
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff']
    }],
    description(level) {
      const BUFF = BUFFS.water_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  water_ball: {
    icon: 'waterBall',
    name: 'water ball',
    id: 'water_ball',
    buffs: ['water_ball'],
    cooldown: 10,
    slot: 'any',
    target: 'singleFriendly',
    targettable: true,
    isMagic: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff']
    }],
    description(level) {
      const BUFF = BUFFS.water_ball;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  water_wave: {
    icon: 'waterWave',
    name: 'water wave',
    id: 'water_wave',
    buffs: ['water_wave'],
    cooldown: 30,
    slot: 'any',
    target: 'allAllies',
    isHidden: true,
    isMagic: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff']
    }],
    description(level) {
      const BUFF = BUFFS.water_wave;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  ice_dart: {
    icon: 'iceDart',
    name: 'ice dart',
    id: 'ice_dart',
    buffs: ['ice_dart'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: true,
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.ice_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  blizzard: {
    icon: 'blizzard',
    name: 'blizzard',
    id: 'blizzard',
    buffs: ['blizzard'],
    cooldown: 300,
    slot: 'any',
    target: 'allEnemies',
    isHidden: true,
    isMagic: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff']
    }],
    description(level) {
      const BUFF = BUFFS.blizzard;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  poison_dart: {
    icon: 'poisonDart',
    name: 'poison dart',
    id: 'poison_dart',
    buffs: ['poison_dart'],
    cooldown: 300,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: true,
    isMagic: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff']
    }],
    description(level) {
      const BUFF = BUFFS.poison_dart;
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

  air_ball: {
    icon: 'airBall',
    name: 'air ball',
    id: 'air_ball',
    buffs: ['air_ball'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.air_ball;
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

  fire_ball: {
    icon: 'fireBall',
    name: 'fire ball',
    id: 'fire_ball',
    buffs: ['fire_ball'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.fire_ball;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  magic_wisdom: {
    icon: 'magicWisdom',
    name: 'magic wisdom',
    id: 'magic_wisdom',
    buffs: ['magic_wisdom'],
    cooldown: 60 * 60 * 24,
    slot: 'any',
    target: 'self',
    isMagic: true,
    isHidden: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff']
    }],
    description(level) {
      const BUFF = BUFFS.magic_wisdom;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  affliction: {
    icon: 'affliction',
    name: 'affliction',
    id: 'affliction',
    buffs: ['affliction'],
    cooldown: 300,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    isHidden: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff']
    }],
    description(level) {
      const BUFF = BUFFS.affliction;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  meteor_strike: {
    icon: 'meteorStrike',
    name: 'meteor strike',
    id: 'meteor_strike',
    buffs: ['meteor_strike'],
    cooldown: 300,
    isHidden: true,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff']
    }],
    description(level) {
      const BUFF = BUFFS.meteor_strike;
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
    isHidden: false,
    target: 'singleFriendly',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.mud_armor;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  mending_spring: {
    icon: 'mendingSpring',
    name: 'mending spring',
    id: 'mending_spring',
    buffs: ['mending_spring'],
    cooldown: 90,
    slot: 'any',
    isHidden: false,
    target: 'allAllies',
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff']
    }],
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.mending_spring;
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
    isHidden: false,
    target: 'singleFriendly',
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff']
    }],
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
    isHidden: false,
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.ignite;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  frenzied_winds: {
    icon: 'frenziedWinds',
    name: 'frenzied winds',
    id: 'frenzied_winds',
    buffs: ['frenzied_winds'],
    cooldown: 180,
    slot: 'any',
    isHidden: false,
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
    name: 'angels touch',
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

  heavens_descent: {
    icon: 'heavensDescent',
    name: 'heavens descent',
    id: 'heavens_descent',
    buffs: ['heavens_descent'],
    cooldown: 60 * 60 * 24 * 3,
    slot: 'any',
    isHidden: true,
    isMagic: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.heavens_descent;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  lightning_speed: {
    icon: 'lightningSpeed',
    name: 'lightning speed',
    id: 'lightning_speed',
    buffs: ['lightning_speed'],
    cooldown: 60 * 60 * 24 * 3,
    slot: 'any',
    isHidden: true,
    isMagic: true,
    target: 'allAllies',
    description(level) {
      const BUFF = BUFFS.lightning_speed;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  diamond_skin: {
    icon: 'diamondSkin',
    name: 'diamond skin',
    id: 'diamond_skin',
    buffs: ['diamond_skin'],
    cooldown: 60 * 60 * 24 * 3,
    slot: 'any',
    isHidden: true,
    isMagic: true,
    target: 'allAllies',
    description(level) {
      const BUFF = BUFFS.diamond_skin;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  inferno: {
    icon: 'inferno',
    name: 'inferno',
    id: 'inferno',
    buffs: ['inferno'],
    cooldown: 60 * 60 * 24 * 3,
    slot: 'any',
    isHidden: true,
    isMagic: true,
    target: 'allEnemies',
    description(level) {
      const BUFF = BUFFS.inferno;
      return BUFF.description({ buff: BUFF, level });
    }
  },
}
