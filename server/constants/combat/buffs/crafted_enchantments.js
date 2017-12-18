import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';
import { BUFFS } from '/server/constants/combat/index.js';
import { Random } from 'meteor/random'

export const CRAFTED_ENCHANTMENT_BUFFS = {

 enchantment_fire: {
    duplicateTag: 'enchantment_fire', // Used to stop duplicate buffs
    icon: 'attack.svg',
    name: 'enchant fire',
    description() {
      return `
        When you fall below 20% hp become cursed.<br />
        Cursed: +50% damage, +50% attack speed, +50 hybrid armor<br />
        Take increasing damage each second.`;
    },
    constants: {
      armorBonus: 10,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id

      onApply({ buff, target, caster }) {
        const constants = buff.constants.constants;

        caster.stats.armor += constants.armorBonus;
        buff.remainingBonus = constants.armorBonus;
      },

      onTookDamage({ buff, defender, attacker, secondsElapsed, damageDealt }) {
        const constants = buff.constants.constants;

        //buff.hits += 1;

        buff.remainingBonus -= 1;

        if( buff.remainingBonus > 0 ) {
          defender.stats.armor -= 1;
        }

        console.log(defender.stats.armor);
      },

      onRemove({ buff, target, caster }) {
      }
    }
  }

/*
enchantment_fire: {
    duplicateTag: 'enchantment_fire', // Used to stop duplicate buffs
    icon: 'attack.svg',
    name: 'enchant fire',
    description() {
      return `
        When you fall below 20% hp become cursed.<br />
        Cursed: +50% damage, +50% attack speed, +50 hybrid armor<br />
        Take increasing damage each second.`;
    },
    constants: {
      armorReductionBase: 1,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id

      onApply({ buff, target, caster }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {
        const constants = buff.constants.constants;
        const armorReductionBase = constants.armorReductionBase;
        const armorReductionMP = 1;
        const totalArmorReduction = armorReductionBase + armorReductionMP;

        console.log(defender.stats.armor);
          buff.data.totalArmorReduction = totalArmorReduction;
          defender.stats.armor -= totalArmorReduction;
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.totalArmorReduction) {
          target.stats.armor += buff.data.totalArmorReduction;
        }
      }
    }
  }
  */










/*
 enchantment_fire: {
    duplicateTag: 'enchantment_fire', // Used to stop duplicate buffs
    icon: 'attack.svg',
    name: 'enchant fire',
    description() {
      return `
        When you fall below 20% hp become cursed.<br />
        Cursed: +50% damage, +50% attack speed, +50 hybrid armor<br />
        Take increasing damage each second.`;
    },
    constants: {
      damageDecimal: 100,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {
        const constants = buff.constants.constants;
        const baseDamage = attacker.stats.attack;
        const totalDamage = rawDamage * constants.damageDecimal;

        actualBattle.utils.dealDamage(totalDamage, {
          attacker,
          defender,
          isMagic: true,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id
          });
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  }
  */
}