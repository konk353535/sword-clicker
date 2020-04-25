import { addBuff, removeBuff, lookupBuff, removeBuffById, removeBuffWithMessage } from '../../battleUtils';

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
        Passive ability<br />
        You are dancing and celebrating for luck, raising your chance to find valuables in each battle.  When combat ends, each member of your party using Lion Dance will increase the chances of finding loot by <b>5%</b>.  Stacks with global combat buffs and exploration bonuses.<br />
        While equipped this is <b>always active</b>.`;
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
        You can't auto-attack, take any actions that would directly harm an enemy, nor use passive abilities or enchantments that could harm an enemy.`;
    },
    constants: {
      allowTicks: true
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
      allowTicks: true
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
      allowTicks: true
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
      allowTicks: true
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

  marked_for_death: {
    duplicateTag: 'marked_for_death',
    icon: 'death.svg',
    name: 'Marked For Death',
    description() {
      return `
        You are hexed by the witch and will soon die.`;
    },
    constants: {
      allowTicks: true
    },
    data: {
      duration: 15,
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },
      
      onTookHealing({ buff, target, caster, actualBattle, healAmount, healSource }) {
        if (!healSource) {
          return;
        }
        
        const healSourceConsts = (healSource.constants && healSource.constants.constants) ? healSource.constants.constants : lookupBuff(healSource.id).constants;
        if (healSourceConsts.removesCurse) {
          target.applyBuff({
            buff: target.generateBuff({ buffId: 'marked_for_death__warded' }),
          });

          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.duration !== Infinity) {
          buff.data.duration -= secondsElapsed;
          buff.stacks = Math.ceil(buff.data.duration);
          if (buff.data.duration <= 0) {
            target.stats.health = 0;
            target.checkDeath();
            removeBuff({ buff, target, caster, actualBattle });
          }
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
      }
    }
  },

  marked_for_death__warded: {
    duplicateTag: 'marked_for_death__warded',
    icon: 'warded.svg',
    name: 'Warded',
    description() {
      return `
        You are warded from hexes.`;
    },
    constants: {
      allowTicks: true
    },
    data: {
      duration: 60,
      totalDuration: 60,
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.duration !== Infinity) {
          buff.data.duration -= secondsElapsed;
          buff.stacks = Math.ceil(buff.data.duration);
          if (buff.data.duration <= 0) {
            removeBuff({ buff, target, caster, actualBattle });
          }
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
      }
    }
  },

  armor_loss_potion: {
    duplicateTag: 'armor_loss_potion',
    icon: 'potionArmorLoss.svg',
    name: 'Armor Has Vanished',
    description() {
      return `
        All of your armor has disappeared! <br />
        <br />
        You are very vulnerable!`;
    },
    constants: {
      allowTicks: true
    },
    data: {
      duration: 7,
      totalDuration: 7,
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
        // remove any temporary armor-boosting effects
        (['armor_up', 'mud_armor', 'healing_shield', 'volcanic_shield']).forEach((buffIdToRemove) => {
          if (target.hasBuff(buffIdToRemove)) {
            target.removeBuff(target.findBuff(buffIdToRemove));
          }
        });
        
        buff.data.originalArmor = target.stats.armor;
        buff.data.originalMagicArmor = target.stats.magicArmor;
        target.stats.armor = 0;      // yes, we're ignoring the fact that players usually get some armor from the Defense skill
        target.stats.magicArmor = 0; // yes, we're ignoring the fact that players usually get some magic armor from the Magic skill
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.duration !== Infinity) {
          buff.data.duration -= secondsElapsed;
          buff.stacks = Math.ceil(buff.data.duration);
          if (buff.data.duration <= 0) {
            removeBuff({ buff, target, caster, actualBattle });
          }
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        target.stats.armor = buff.data.originalArmor;
        target.stats.magicArmor = buff.data.originalMagicArmor;
      }
    }
  },

  weapon_loss_potion: {
    duplicateTag: 'weapon_loss_potion',
    icon: 'potionWeaponLoss.svg',
    name: 'Weapon Has Vanished',
    description() {
      return `
        Your weapons have disappeared! <br />
        <br />
        You can't fight, cast spells, or use any abilities right now.`;
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
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.duration !== Infinity) {
          buff.data.duration -= secondsElapsed;
          buff.stacks = Math.ceil(buff.data.duration);
          if (buff.data.duration <= 0) {
            removeBuff({ buff, target, caster, actualBattle });
          }
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        if (!buff.data.wasAlreadyStunned) {
          target.isStunned = false;
        }
      }
    }
  },
  
  tricky_step: {
    duplicateTag: 'tricky_step', // Used to stop duplicate buffs
    icon: 'eventSPDTrickyStep.svg',
    name: 'tricky step',
    description({ buff, level }) {
      return `You treat all physical damage you receive as magical damage and all magical damage you receive as physical damage.`;
    },
    constants: {
      allowTicks: true
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        if (!target.effectFlipDamageTypeDefense) {
          // toggle buff: activated
          target.effectFlipDamageTypeDefense = true;
        } else {
          // toggle buff: deactivated
          target.effectFlipDamageTypeDefense = false;
        }
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (!target.effectFlipDamageTypeDefense) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },
      
      onTookDamage({ secondsElapsed, buff, defender, attacker, actualBattle, damageDealt }) {
      },

      onRemove({ buff, target, caster, actualBattle }) {
      }
    }
  },
};
