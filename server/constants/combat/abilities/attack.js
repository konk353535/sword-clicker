import moment from 'moment';
import { BUFFS } from '/server/constants/combat/index';

export const ATTACK_ABILITIES = {
  poisoned_blade: {
    icon: 'poisonedBlade',
    name: 'poisoned blade',
    id: 'poisoned_blade',
    buffs: ['poisoned_blade'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.poisoned_blade;
      return BUFF.description({ buff: BUFF, level });
    }
  },

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

  double_edged_sword: {
    icon: 'doubleEdgedSword',
    name: 'doubled edged sword',
    id: 'double_edged_sword',
    buffs: ['double_edged_sword'],
    cooldown: 180,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.double_edged_sword;
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
