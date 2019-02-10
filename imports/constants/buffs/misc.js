import { addBuff, removeBuff, removeBuffById, removeBuffWithMessage } from '../../battleUtils';

export const MISC_BUFFS = {

  idle_player: {
    duplicateTag: 'idle_player',
    icon: 'sleeping.png',
    name: 'Idle',
    description({ buff, level }) {
      return `You are idle and aren't providing your full combat bonuses.`;
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      custom: true,
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
        buff.data.totalTime = 0.0;
        buff.data.custom = true;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.totalTime += secondsElapsed;
        
        const totalInactiveMinutes = Math.floor((buff.data.totalTime / 60) + target.inactiveMinutes);
        
        if (totalInactiveMinutes > 5) {
          let damageRedux = Math.floor(totalInactiveMinutes / 3) / 100;
          damageRedux = (damageRedux > 0.75) ? 0.75 : damageRedux;
          target.stats.damageOutput = 1.00 - damageRedux;
          buff.customText = (damageRedux * -100).toFixed(0) + '%';
        } else {
          target.stats.damageOutput = 1.0;
          buff.customText = '';
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.damageOutput = 1.0;
      }
    }
  },
  
  lion_dance: {
    duplicateTag: 'lion_dance',
    icon: 'eventLNYDance.svg',
    name: 'Lion Dance',
    description({ buff, level }) {
      return `
      You are dancing and celebrating for luck, raising your <br />
      chance to find valuables in each battle.  When combat <br />
      ends, each member of your party using Lion Dance will <br />
      increase the chances of finding loot by <b>5%</b>.  Stacks <br />
      with global combat buffs and exploration bonuses.`;
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  stunned: {
    duplicateTag: 'stunned',
    icon: 'stunned.svg',
    name: 'stunned',
    description() {
      return `
        You are stunned and can't take any actions.`;
    },
    constants: {
      allowTicks: true
    },
    data: {
      duration: 5,
      totalDuration: 5,
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
        buff.data.wasAlreadyStunned = target.isStunned;
        target.isStunned = true;
        buff.data.timeCount = 0.0;
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        buff.duration -= secondsElapsed;
        buff.data.timeCount += secondsElapsed;
        if ((buff.duration <= 0) || (buff.data.timeCount >= buff.data.totalDuration)) {
          removeBuff({ buff, target, caster, actualBattle })
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        if (!buff.data.wasAlreadyStunned) {
          target.isStunned = false;
        }
      }
    }
  },

  pacifist: {
    duplicateTag: 'pacifist',
    icon: 'pacifist.svg',
    name: 'pacifist',
    description() {
      return `
        You are a pacifist. <br />
        <br />
        You can't auto-attack, take any actions that would directly <br />
        harm an enemy, nor use passive abilities or enchantments <br />
        that could harm an enemy.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
      },

      onRemove({ buff, target, caster, actualBattle }) {
      }
    }
  },

  cant_change_targets: {
    duplicateTag: 'cant_change_targets',
    icon: 'stunned.svg',
    name: 'Can\'t Change Targets',
    description() {
      return `
        You are unable to change targets.`;
    },
    constants: {
    },
    data: {
      duration: 5,
      totalDuration: 5,
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
        target.isAbleToChangeTargets = false;
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.duration !== Infinity) {
          buff.data.duration -= secondsElapsed;
          if (buff.data.duration <= 0) {
            removeBuff({ buff, target, caster, actualBattle });
          }
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        target.isAbleToChangeTargets = true;
      }
    }
  },

  cast_use_abilities: {
    duplicateTag: 'cant_use_abilities',
    icon: 'stunned.svg',
    name: 'Can\'t Use Abilities',
    description() {
      return `
        You are unable to use abilities.`;
    },
    constants: {
    },
    data: {
      duration: 5,
      totalDuration: 5,
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
        target.isAbleToUseAbilities = false;
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.duration !== Infinity) {
          buff.data.duration -= secondsElapsed;
          if (buff.data.duration <= 0) {
            removeBuff({ buff, target, caster, actualBattle });
          }
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        target.isAbleToUseAbilities = true;
      }
    }
  },

  cast_use_spells: {
    duplicateTag: 'cant_use_spells',
    icon: 'stunned.svg',
    name: 'Can\'t Use Spells',
    description() {
      return `
        You are unable to cast spells.`;
    },
    constants: {
    },
    data: {
      duration: 5,
      totalDuration: 5,
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
        target.isAbleToCastSpells = false;
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.duration !== Infinity) {
          buff.data.duration -= secondsElapsed;
          if (buff.data.duration <= 0) {
            removeBuff({ buff, target, caster, actualBattle });
          }
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        target.isAbleToCastSpells = true;
      }
    }
  },
  
};
