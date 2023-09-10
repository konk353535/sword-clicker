export const CRAFTED_ENCHANTMENT_BUFFS = {
    /*

WEAPON
 - Flaming Blade
 - Enchanted Blade

HAT
 - Intimidate
 - Viper Helm - Poison Bite
 - Dragon Helm - Fire Breath
 

CHEST
 - Barkskin

LEG
 - Fox Skin (FPS)
 - Rhino Skin (Tank)









*/
    /* Degrading armor */
    /*
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
    duration: Infinity,
    data: {
      totalDuration: Infinity
    },
    events: { 

      onApply({ buff, target, caster, actualBattle }) {
        const constants = lookupBuff(buff.id).constants;

        caster.stats.armor += constants.armorPerHit * constants.totalHits;
        buff.stacks = constants.armorPerHit * constants.totalHits;
      },

      // Remove Armor as player gets hit.
      onTookDamage({ buff, defender, attacker, secondsElapsed, damageDealt, actualBattle }) {
        const constants = lookupBuff(buff.id).constants;

        buff.stacks -= constants.armorPerHit;

        if ( buff.stacks > 0 ) {
          defender.stats.armor -= constants.armorPerHit;
        } else {
          removeBuff({ buff, target : defender, actualBattle });
        }
      },

      onRemove({ buff, target, caster }) {
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
      damageModifier: 25,
    },
    duration: Infinity,
    data: {
      totalDuration: Infinity
    },
    events: {

      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {
        const constants = lookupBuff(buff.id).constants;

        const modifier = constants.damageModifier / 100;
        const modifiedDamage = Math.round(rawDamage * modifier); 

        actualBattle.dealDamage(modifiedDamage, {
          attacker: attacker,
          defender: defender,
          isMagic: true,
          //isTrueDamage: true,
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
      damageModifier: 75,
    },
    duration: Infinity,
    data: {
      totalDuration: Infinity
    },
    events: {

      onApply({ buff, target, caster, actualBattle }) {
      }, 

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {
        const constants = lookupBuff(buff.id).constants;

        const baseDamage = 1 + attacker.stats.magicPower;
        const modifier = constants.damageModifier / 100;
        const modifiedDamage = Math.round(baseDamage * modifier); 

        actualBattle.dealDamage(modifiedDamage, {
          attacker: attacker,
          defender: defender,
          isMagic: true,
          //isTrueDamage: true,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      }
    }
  },

  /* Degrading armor */
    /*
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
    duration: Infinity,
    data: {
      totalDuration: Infinity
    },
    events: { 

      onApply({ buff, target, caster, actualBattle }) {
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },


  enchantment_fox_skin: {
    duplicateTag: 'enchantment_fox_skin', // Used to stop duplicate buffs
    icon: 'foxSkin.svg',
    name: 'fox skin',
    description() {
      return `Increase attack speed by 20%`;
    },
    constants: {
      speedModifier: 20,
    },
    duration: Infinity,
    data: {
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {

        const constants = lookupBuff(buff.id).constants;
        const modifier = 1 + (constants.speedModifier / 100);

        target.stats.attackSpeed *= modifier;
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  enchantment_rhino_skin: {
    duplicateTag: 'enchantment_rhino_skin', // Used to stop duplicate buffs
    icon: 'rhinoSkin.svg',
    name: 'rhino skin',
    description() {
      return `Increases health by 30% of armor. Every 10 seconds, next hit is for 250% additional damage.`;
    },
    constants: {
      healthModifier : 30,
      damageModifier : 250,
      charge : 10
    },
    duration: Infinity,
    data: {
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {

        const constants = lookupBuff(buff.id).constants;

        const modifier = constants.healthModifier / 100;
        const amountToAdd = target.stats.armor * modifier;

        buff.data.health = amountToAdd;
        buff.data.healthMax = amountToAdd;
        target.stats.health += buff.data.health;
        target.stats.healthMax += buff.data.healthMax;

        buff.data.timeTillCharge = constants.charge;
        buff.stacks = Math.round(buff.data.timeTillCharge);
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {

        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
          buff.stacks = Math.round(buff.data.timeTillCharge);
        } else {
          buff.stacks = 0;
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {

        if (buff.data.timeTillCharge <= 0) {
          const constants = lookupBuff(buff.id).constants;
          const modifier = constants.damageModifier / 100;
          const modifiedDamage = Math.round(rawDamage * modifier); 

          actualBattle.dealDamage(modifiedDamage, {
            attacker: attacker,
            defender: defender,
            //isTrueDamage: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });

          buff.data.timeTillCharge = constants.charge;
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        actualBattle.dealDamage(buff.data.health, {
          attacker: target,
          defender: target,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
        });
        target.stats.healthMax -= buff.data.healthMax;
      }
    }
  }*/
}
