import moment from 'moment';
import { BUFFS } from '/server/constants/combat/index';

export const ABILITIES = {

  berserk: {
    icon: 'berserk',
    name: 'Berserk',
    buffs: ['berserk'],
    description(level) {
      const BUFF = BUFFS.berserk;
      return BUFF.description({ buff: BUFF, level });
    }
  }
}
