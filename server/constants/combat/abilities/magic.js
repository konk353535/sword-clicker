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
  /*
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
  },*/
}
