import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';
import { BUFFS } from '/server/constants/combat/index.js';
import { Random } from 'meteor/random'

export const CRAFTED_ENCHANTMENT_BUFFS = {

	/* Degrading armor */
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
      onTookDamage({ buff, defender, attacker, secondsElapsed, damageDealt }) {
        const constants = buff.constants.constants;

        buff.data.stacks -= constants.armorPerHit;

        if ( buff.data.stacks > 0 ) {
          defender.stats.armor -= constants.armorPerHit;
        } else {
          defender.buffs = defender.buffs.filter((targetBuff) => {
            return targetBuff !== buff;
          });
        }
      }
    }
	},

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
  }
}

















  /*  flaming_blade: {
    duplicateTag: 'flaming_blade', // Used to stop duplicate buffs
    icon: 'flamingBlade.svg',
    name: 'flaming blade',
    description({ buff, level }) {

      let localLevel = JSON.parse(JSON.stringify(level));
      if (!localLevel) {
        localLevel = 1;
      }

      const constants = buff.constants;
      //magicPower
      let armorBuff  = constants.armorBase  + (constants.armorPerLevel  * localLevel);
      let damageBuff = (constants.damageBase + (constants.damagePerLevel * localLevel)) * 100;
      
      return `Increase armor & magic armor by ${armorBuff}. (+${constants.armorPerLevel } per lvl)<br />
        After 10 seconds, erupts dealing ${damageBuff}% (+${constants.damagePerLevel * 100}% per lvl) weapon damage to all enemies`;
    },
    constants: {
      damageBase: 2,
      damagePerLevel: .5,
      duration: 5
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {

        buff.data.duration = buff.constants.constants.duration;
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {

      	if (buff.data.duration > 0) {
      		return;
      	}

      	const attack = target.stats.attack;
	      const attackMax = target.stats.attackMax;
	      const target.stats,
	      const actualDamage = (attack + ((attackMax - attack) * Math.random())) * damageBuff;

      	actualBattle.utils.dealDamage(actualDamage, {
          attacker: attacker,
          defender: defender,
          isMagic: true,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });

        // Reset Timer
        buff.data.duration = buff.constants.constants.duration;
      },
    }
  },

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