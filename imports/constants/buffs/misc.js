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
      return `You dancing and celebrating for luck.`;
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
  
};
