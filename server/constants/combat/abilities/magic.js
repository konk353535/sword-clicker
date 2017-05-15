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
    isHidden: true,
    isMagic: true,
    description(level) {
      const BUFF = BUFFS.rock_dart;
      return BUFF.description({ buff: BUFF, level });
    }
  },
}
