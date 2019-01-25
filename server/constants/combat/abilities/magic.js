import moment from 'moment';
import { BUFFS } from '../../../../imports/constants/buffs/index';

export const MAGIC_ABILITIES = {

  summon_skeleton: {
    icon: 'summonSkeleton.svg',
    name: 'summon skeleton',
    id: 'summon_skeleton',
    buffs: ['summon_skeleton'],
    cooldown: 180,
    slot: 'any',
    target: 'self',
    isMagic: true,
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.summon_skeleton;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  earth_dart: {
    icon: 'earthDart.svg',
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
    icon: 'earthBall.svg',
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
    icon: 'waterDart.svg',
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
      weaponTypes: ['staff', 'wand']
    }],
    description(level) {
      const BUFF = BUFFS.water_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  water_ball: {
    icon: 'waterBall.svg',
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
      weaponTypes: ['staff', 'wand']
    }],
    description(level) {
      const BUFF = BUFFS.water_ball;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  // Single target heal + armor increase (5s?)
  healing_shield: {
    icon: 'healingShield.svg',
    name: 'healing shield',
    id: 'healing_shield',
    buffs: ['healing_shield'],
    cooldown: 25,
    slot: 'any',
    target: 'singleFriendly',
    targettable: true,
    isMagic: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff', 'wand']
    }],
    description(level) {
      const BUFF = BUFFS.healing_shield;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  // Single target physical damage + stun
  earthen_fist: {
    icon: 'earthenFist.svg',
    name: 'earthen fist',
    id: 'earthen_fist',
    buffs: ['earthen_fist'],
    cooldown: 25,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.earthen_fist;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  // AOE semi spammable damage spell
  fire_wave: {
    icon: 'fireWave.svg',
    name: 'fire wave',
    id: 'fire_wave',
    buffs: ['fire_wave'],
    cooldown: 30,
    slot: 'any',
    target: 'allEnemies',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.fire_wave;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  // Increases targets attack speed by X for Y attacks OR?
  furied_winds: {
    icon: 'furiedWinds.svg',
    name: 'furied winds',
    id: 'furied_winds',
    buffs: ['furied_winds'],
    cooldown: 90,
    slot: 'any',
    target: 'singleFriendly',
    targettable: true,
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.furied_winds;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  water_wave: {
    icon: 'waterWave.svg',
    name: 'water wave',
    id: 'water_wave',
    buffs: ['water_wave'],
    cooldown: 20,
    slot: 'any',
    target: 'allAllies',
    isHidden: true,
    isMagic: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff', 'wand']
    }],
    description(level) {
      const BUFF = BUFFS.water_wave;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  ice_dart: {
    icon: 'iceDart.svg',
    name: 'ice dart',
    id: 'ice_dart',
    buffs: ['ice_dart'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: false,
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.ice_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  blizzard: {
    icon: 'blizzard.svg',
    name: 'blizzard',
    id: 'blizzard',
    buffs: ['blizzard'],
    cooldown: 120,
    slot: 'any',
    target: 'allEnemies',
    isHidden: true,
    isMagic: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff', 'wand']
    }],
    description(level) {
      const BUFF = BUFFS.blizzard;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  poison_dart: {
    icon: 'poisonDart.svg',
    name: 'poison dart',
    id: 'poison_dart',
    buffs: ['poison_dart'],
    cooldown: 180,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: true,
    isMagic: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff', 'wand']
    }],
    description(level) {
      const BUFF = BUFFS.poison_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  lightning_storm: {
    icon: 'lightningStorm.svg',
    name: 'lightning storm',
    id: 'lightning_storm',
    buffs: ['lightning_storm'],
    cooldown: 60,
    slot: 'any',
    target: 'allEnemies',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.lightning_storm;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  lightning_dart: {
    icon: 'lightningDart.svg',
    name: 'lightning dart',
    id: 'lightning_dart',
    buffs: ['lightning_dart'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.lightning_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  air_dart: {
    icon: 'airDart.svg',
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
    icon: 'airBall.svg',
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
    icon: 'fireDart.svg',
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
    icon: 'fireBall.svg',
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
    icon: 'magicWisdom.svg',
    name: 'magic wisdom',
    id: 'magic_wisdom',
    buffs: ['magic_wisdom'],
    cooldown: 60 * 10,
    slot: 'any',
    target: 'self',
    isMagic: true,
    isHidden: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff', 'wand']
    }],
    description(level) {
      const BUFF = BUFFS.magic_wisdom;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  affliction: {
    icon: 'affliction.svg',
    name: 'affliction',
    id: 'affliction',
    buffs: ['affliction'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    isHidden: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff', 'wand']
    }],
    description(level) {
      const BUFF = BUFFS.affliction;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  meteor_strike: {
    icon: 'meteorStrike.svg',
    name: 'meteor strike',
    id: 'meteor_strike',
    buffs: ['meteor_strike'],
    cooldown: 300,
    isHidden: false,
    slot: 'any',
    target: 'currentEnemy',
    isMagic: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff', 'wand']
    }],
    description(level) {
      const BUFF = BUFFS.meteor_strike;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  mud_armor: {
    icon: 'mudArmor.svg',
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
    icon: 'mendingSpring.svg',
    name: 'mending spring',
    id: 'mending_spring',
    buffs: ['mending_spring'],
    cooldown: 90,
    slot: 'any',
    isHidden: true,
    target: 'allAllies',
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff', 'wand']
    }],
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.mending_spring;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  mending_water: {
    icon: 'mendingWater.svg',
    name: 'mending water',
    id: 'mending_water',
    buffs: ['mending_water'],
    cooldown: 30,
    slot: 'any',
    targettable: true,
    isHidden: false,
    target: 'singleFriendly',
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.mending_water;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  ignite: {
    icon: 'ignite.svg',
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
    icon: 'frenziedWinds.svg',
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
    icon: 'angelsTouch.svg',
    name: 'angel\'s touch',
    id: 'angels_touch',
    buffs: ['angels_touch'],
    cooldown: 120,
    slot: 'any',
    isHidden: true,
    target: 'singleFriendly',
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff', 'wand']
    }],
    targettable: true,
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.angels_touch;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  elemental_shield: {
    icon: 'elementalShield.svg',
    name: 'elemental shield',
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
    icon: 'feedingFrenzy.svg',
    name: 'feeding frenzy',
    id: 'feeding_frenzy',
    buffs: ['feeding_frenzy'],
    cooldown: 600,
    slot: 'any',
    isHidden: true,
    isMagic: true,
    target: 'allAllies', // The current enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.feeding_frenzy;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  heavens_descent: {
    icon: 'heavensDescent.svg',
    name: 'heavens descent',
    id: 'heavens_descent',
    buffs: ['heavens_descent'],
    cooldown: 60 * 5,
    slot: 'any',
    isHidden: true,
    isMagic: true,
    target: 'self',
    requires: [{
      type: 'weaponType',
      weaponTypes: ['staff', 'wand']
    }],
    description(level) {
      const BUFF = BUFFS.heavens_descent;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  lightning_speed: {
    icon: 'lightningSpeed.svg',
    name: 'lightning speed',
    id: 'lightning_speed',
    buffs: ['lightning_speed'],
    cooldown: 60 * 5,
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
    icon: 'diamondSkin.svg',
    name: 'diamond skin',
    id: 'diamond_skin',
    buffs: ['diamond_skin'],
    cooldown: 60 * 5,
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
    icon: 'inferno.svg',
    name: 'inferno',
    id: 'inferno',
    buffs: ['inferno'],
    cooldown: 60 * 5,
    slot: 'any',
    isHidden: true,
    isMagic: true,
    target: 'allEnemies',
    description(level) {
      const BUFF = BUFFS.inferno;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  magic_power_up: {
    icon: 'magicPowerUp.svg',
    name: 'magic power up',
    id: 'magic_power_up',
    buffs: ['magic_power_up'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    isHidden: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.magic_power_up;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  healing_power_up: {
    icon: 'healingPowerUp.svg',
    name: 'healing power up',
    id: 'healing_power_up',
    buffs: ['healing_power_up'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    isHidden: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.healing_power_up;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  raise_your_glass: {
    icon: 'eventNYGlasses.svg',
    name: 'raise your glass',
    id: 'raise_your_glass',
    buffs: ['raise_your_glass'],
    cooldown: 60 * 60,
    slot: 'any',
    target: 'self',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.raise_your_glass;
      return BUFF.description({ buff: BUFF, level });
    }
  },
  
  lion_dance: {
    icon: 'eventLNYDance.svg',
    name: 'lion dance',
    id: 'lion_dance',
    buffs: ['lion_dance'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    isHidden: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.lion_dance;
      return BUFF.description({ buff: BUFF, level });
    }
  },
};
