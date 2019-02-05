import { addBuff, removeBuff } from '../../battleUtils';

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
      onApply({ buff, target, caster }) {
        buff.data.totalTime = 0.0;
        buff.data.custom = true;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
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
      onApply({ buff, target, caster }) {
      },

      onTick({ secondsElapsed, buff, target, caster }) {
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
  
};
