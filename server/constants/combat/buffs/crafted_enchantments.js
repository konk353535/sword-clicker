import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';
import { BUFFS } from '/server/constants/combat/index.js';
import { Random } from 'meteor/random'

export const CRAFTED_ENCHANTMENT_BUFFS = {

	/* Degrading armor 
	enchantment_barkskin: {
    duplicateTag: 'enchantment_barkskin', // Used to stop duplicate buffs
    icon: 'barkskin.svg',
    name: 'barkskin',
    description() {
      return `
        Defensive bonus which degrades each hit`;
    },
    constants: {
      armorPerHit: 3,
      totalHits: 10
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { 

      onApply({ buff, target, caster }) {
        const constants = buff.constants.constants;

        caster.stats.armor += constants.armorPerHit * constants.totalHits;
        buff.data.stacks = constants.armorPerHit * constants.totalHits;
      },

      // Remove Armor as player gets hit.
      onTookDamage({ buff, defender, attacker, secondsElapsed, damageDealt, actualBattle }) {
        const constants = buff.constants.constants;

        buff.data.stacks -= constants.armorPerHit;

        if ( buff.data.stacks > 0 ) {
          defender.stats.armor -= constants.armorPerHit;
        } else {
          removeBuff({ buff, target : defender, actualBattle });
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
	},
  */

  enchantment_flaming_blade: {
    duplicateTag: 'enchantment_flaming_blade', // Used to stop duplicate buffs
    icon: 'flamingBlade.svg',
    name: 'flaming blade',
    description() {
      return `
        Additional magic damage on every hit`;
    },
    constants: {
      additionalDamagePercent: 10,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: {

      onApply({ buff, target, caster }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {
        
        const constants = buff.constants.constants;
        const actualDamage = Math.round(rawDamage * ( constants.additionalDamagePercent / 100 ));
        
        actualBattle.utils.dealDamage(actualDamage, {
          attacker: attacker,
          defender: defender,
          isMagic: true,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      }
    }
  },

  enchantment_enchanted_blade: {
    duplicateTag: 'enchantment_enchanted_blade', // Used to stop duplicate buffs
    icon: 'magicBlade.svg',
    name: 'enchanted blade',
    description() {
      return `
        Additional magic damage on every hit`;
    },
    constants: {
      additionalDamagePercent: 10,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: {

      onApply({ buff, target, caster }) {
      }, 

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {

        const constants = buff.constants.constants;
        let actualDamage = attacker.stats.magicPower;

        if (!actualDamage) {
          actualDamage = 1;
        }

        actualBattle.utils.dealDamage(actualDamage, {
          attacker: attacker,
          defender: defender,
          isMagic: true,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      }
    }
  },

  /* Degrading armor */
  enchantment_intimidate: {
    duplicateTag: 'enchantment_intimidate', // Used to stop duplicate buffs
    icon: 'intimidate.svg',
    name: 'intimidate',
    description() {
      return `
        Defensive bonus which degrades each hit`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { 

      onApply({ buff, target, caster }) {
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },
}