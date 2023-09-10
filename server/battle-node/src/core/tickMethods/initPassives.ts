import type Battle from ".."
import { BUFFS } from "../../../../../imports/constants/buffs"
import { addBuff } from "../../../../battleUtils.js"

export function initPassives(this: Battle) {
    this.allAliveUnits.forEach((unit) => {
        /*
    unit.buffs.forEach((buff) => {
      try {
        if (buff.data.isEnchantment || BUFFS[buff.id].data.isEnchantment) {
          console.log("ENCHANTMENT ON UNIT: ", buff.id, unit.name);
        }
      } catch (err) {
        console.log("ENCHANTMENT ON UNIT EXCEPTION");
        console.log(err);
      }
    });
    */

        //let enchantment_buffs = [];
        //let enchantment_buffs_ids = [];

        // track applied enchantments from .startBattle
        /*
    unit.buffs.forEach((buff) => {
      try {
        if (buff.data.isEnchantment || BUFFS[buff.id].data.isEnchantment) {
          enchantment_buffs.push(buff);
          enchantment_buffs_ids.push(buff.id);
        }
      } catch (err) {
      }
    });

    // un-apply their effects
    while (enchantment_buffs.length > 0) {
      const buffToRemove = enchantment_buffs[0];
      removeBuff({ buff: buffToRemove, target: unit, caster: unit, actualBattle: this });
      enchantment_buffs.shift();
    }
    
    unit.stats.revertToOriginal();
    
    enchantment_buffs_ids = Object.assign(enchantment_buffs_ids, unit.enchantmentsList);
    */

        /*
    let abilities_and_enchantments_to_apply = [];
    enchantment_buffs_ids.forEach((enchantment_buff_id) => {
      const buffConstants = BUFFS[enchantment_buff_id];
      abilities_and_enchantments_to_apply.push({
        kind: 'enchantment',
        which: enchantment_buff_id,
        constants: buffConstants,
        priority: buffConstants.priority || 10
      });
    });
    if (unit.abilities) {
      unit.abilities.forEach((ability) => {
        if (ability.isPassive) {
          const buffConstants = BUFFS[ability.buffs[0]];
          
          abilities_and_enchantments_to_apply.push({
            kind: 'ability',
            which: ability,
            constants: buffConstants, // assume the buff ID points to a valid buff and that there's at least one (all abilities have at least one buff ID)
            priority: buffConstants.priority || 0
          });
        }
      });
    }
    
    abilities_and_enchantments_to_apply.sort((ability_or_enchantment_A, ability_or_enchantment_B) => {
      return ability_or_enchantment_A.priority - ability_or_enchantment_B.priority;
    });

    abilities_and_enchantments_to_apply.forEach((ability_or_enchantment) => {
      if (ability_or_enchantment.kind === 'ability') {
        const targets = [unit.id];
        ability_or_enchantment.which.cast(targets);
      } else if (ability_or_enchantment.kind === 'enchantment') {
        const newBuff = {
          id: ability_or_enchantment.which,
          data: Object.assign(ability_or_enchantment.constants.data, {
            name: ability_or_enchantment.constants.name,
            description: ability_or_enchantment.constants.description({buff: ability_or_enchantment.constants, level: 1}), // enchantments don't have levels
            icon: ability_or_enchantment.constants.icon,
            isEnchantment: true }),
          constants: ability_or_enchantment.constants
        };        
        addBuff({ buff: newBuff, target: unit, caster: unit, actualBattle: this });      
      }
    });
    */

        // apply passive abilities first
        if (unit.abilities) {
            unit.abilities.forEach((ability) => {
                if (ability.isPassive) {
                    const targets = [unit]
                    ability.cast(targets)
                }
            })
        }

        /*
    // re-apply enchantments
    if (enchantment_buffs_ids.length > 0) {
      enchantment_buffs_ids.forEach((enchantment_buff_id) => {
        const buffConstants = BUFFS[enchantment_buff_id];
        
        const newBuff = {
          id: enchantment_buff_id,
          data: Object.assign(buffConstants.data, {
            name: buffConstants.name,
            description: buffConstants.description({buff: buffConstants, level: 1}), // enchantments don't have levels
            icon: buffConstants.icon,
            isEnchantment: true }),
          constants: buffConstants
        };
        
        addBuff({ buff: newBuff, target: unit, caster: unit, actualBattle: this });      
      });
    }
    */

        // initial enemy units loaded in (first, possibly only, floor)
        if (unit.isEnemy) {
            const newBuff = {
                id: "name_changer_common",
                data: {
                    duration: Infinity,
                    totalDuration: Infinity,
                    icon: "",
                    description: "",
                    name: "",
                    hideBuff: true
                },
                constants: BUFFS["name_changer_common"]
            }

            addBuff({ buff: newBuff, target: unit, caster: unit, actualBattle: this })
        }
    })
}
