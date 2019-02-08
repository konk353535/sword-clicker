import moment from 'moment';

import { BUFFS } from '../../../../imports/constants/buffs/index';

export const ATTACK_ABILITIES = {

  war_cry: {
    icon: 'warCry.svg',
    name: 'war cry',
    id: 'war_cry',
    buffs: ['war_cry'],
    requires: [{
      type: 'weaponType',
      weaponTypes: ['battleAxe']
    }],
    cooldown: 60,
    isPassive: false,
    slot: 'any',
    target: 'allAllies',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.war_cry;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  twin_blades: {
    icon: 'twinBlades.svg',
    name: 'twin blades',
    id: 'twin_blades',
    buffs: ['twin_blades'],
    requires: [{
      type: 'weaponType',
      weaponTypes: ['dagger', 'rapier']
    }],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.twin_blades;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  poisoned_blade: {
    icon: 'poisonedBlade.svg',
    name: 'poisoned blade',
    id: 'poisoned_blade',
    buffs: ['poisoned_blade'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.poisoned_blade;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  thirsty_fangs: {
    icon: 'thirstyFangs.svg',
    name: 'thirsty fangs',
    id: 'thirsty_fangs',
    buffs: ['thirsty_fangs'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.thirsty_fangs;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  phantom_strikes: {
    icon: 'phantomStrikes.svg',
    name: 'phantom strikes',
    id: 'phantom_strikes',
    buffs: ['phantom_strikes'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.phantom_strikes;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  furied_defense: {
    icon: 'furiedDefense.svg',
    name: 'furied defense',
    id: 'furied_defense',
    buffs: ['furied_defense'],
    cooldown: 90,
    slot: 'any',
    target: 'self',
    isHidden: false,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['shield']
    }],
    description(level) {
      const BUFF = BUFFS.furied_defense;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  double_edged_sword: {
    icon: 'doubleEdgedSword.svg',
    name: 'doubled edged sword',
    id: 'double_edged_sword',
    buffs: ['double_edged_sword'],
    cooldown: 90,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.double_edged_sword;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  vampirism: {
    icon: 'vampirism.svg',
    name: 'vampirism',
    id: 'vampirism',
    buffs: ['vampirism'],
    cooldown: 150,
    slot: 'any',
    target: 'self',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.vampirism;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  slash: {
    icon: 'slash.svg',
    name: 'slash',
    id: 'slash',
    buffs: ['slash'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.slash;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  penetrating_slash: {
    icon: 'penetratingSlash.svg',
    name: 'penetrating slash',
    id: 'penetrating_slash',
    buffs: ['penetrating_slash'],
    cooldown: 10,
    slot: 'any',
    target: 'currentEnemy',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.penetrating_slash;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  shield_bash: {
    icon: 'shieldBash.svg',
    name: 'shield bash',
    id: 'shield_bash',
    buffs: ['shield_bash'],
    cooldown: 15,
    slot: 'any',
    requires: [{
      type: 'weaponType',
      weaponTypes: ['shield']
    }],
    target: 'currentEnemy',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.shield_bash;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  berserk: {
    icon: 'berserk.svg',
    name: 'Berserk',
    id: 'berserk',
    buffs: ['berserk'],
    cooldown: 60,
    slot: 'any',
    target: 'self',
    isHidden: false,
    description(level) {
      const BUFF = BUFFS.berserk;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  accuracy_up: {
    icon: 'accuracy.svg',
    name: 'accuracy up',
    id: 'accuracy_up',
    buffs: ['accuracy_up'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.accuracy_up;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  attack_up: {
    icon: 'attack.svg',
    name: 'attack up',
    id: 'attack_up',
    buffs: ['attack_up'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    target: 'self',
    isHidden: true,
    description(level) {
      const BUFF = BUFFS.attack_up;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  critical_up: {
    icon: 'criticalChance2.svg',
    name: 'critical up',
    id: 'critical_up',
    buffs: ['critical_up'],
    cooldown: 0,
    isPassive: true,
    slot: 'any',
    isHidden: true,
    target: 'self',
    description(level) {
      const BUFF = BUFFS.critical_up;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  execute: {
    icon: 'execute.svg',
    name: 'execute',
    id: 'execute',
    buffs: ['execute'],
    cooldown: 10,
    slot: 'any',
    isHidden: false,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['battleAxe']
    }],
    target: 'currentEnemy', // The current enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.execute;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  blade_spin: {
    icon: 'bladeSpin.svg',
    name: 'blade spin',
    id: 'blade_spin',
    buffs: ['blade_spin'],
    cooldown: 15,
    slot: 'any',
    isHidden: false,
    target: 'allEnemies', // The current enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.blade_spin;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  blade_frenzy: {
    icon: 'bladeFrenzy.svg',
    name: 'blade frenzy',
    id: 'blade_frenzy',
    buffs: ['blade_frenzy'],
    cooldown: 60,
    slot: 'any',
    isHidden: false,
    target: 'self', // The current enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.blade_frenzy;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  bleeding_spin: {
    icon: 'bleedingSpin.svg',
    name: 'bleeding spin',
    id: 'bleeding_spin',
    buffs: ['bleed'],
    cooldown: 30,
    slot: 'any',
    isHidden: true,
    requires: [{
      type: 'weaponType',
      weaponTypes: ['battleAxe']
    }],
    target: 'allEnemies', // The current enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.bleed;
      return BUFF.description({ buff: BUFF, level });
    }
  },

  bleed: {
    icon: 'bleed.svg',
    name: 'bleed',
    id: 'bleed',
    buffs: ['bleed'],
    cooldown: 30,
    slot: 'any',
    isHidden: false,
    target: 'currentEnemy', // The current enemy who we are auto attacking
    description(level) {
      const BUFF = BUFFS.bleed;
      return BUFF.description({ buff: BUFF, level });
    }
  }
};
