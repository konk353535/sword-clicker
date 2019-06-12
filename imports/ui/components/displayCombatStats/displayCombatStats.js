import { Template } from 'meteor/templating';

import { CDbl, autoPrecisionValue } from '../../../utils.js';

import './displayCombatStats.html';

function descriptors(str) {
  const terms = {
    'damageConsistent': 'damage',
    'attack': 'min. dmg.',
    'attackMax': 'max. dmg.',
    'accuracy': 'accuracy',
    'healthMax': 'health',
    'defense': 'defense',
    'armor': 'armor',
    'attackSpeed': 'attack speed',
    'magicPower': 'magic power',
    'magicArmor': 'magic armor',
    'healingPower': 'healing power',
    'criticalChance': 'critical chance',
    'criticalDamage': 'critical damage',
    'energyStorage': 'energy storage',
    'energyPerHit': 'energy per hit',
    'energyRegen': 'energy regen',
    'miner': 'passive miner damage',
    'completeShard': '% bonus complete shards',
    'ancientShard': '% bonus ancient shards',
    'gold': 'deposited gold',
    'damage': 'click damage',
    'force': 'force',
    'shred': 'shred',
    'focus': 'focus',
  };
  if (terms.hasOwnProperty(str)) {
    return terms[str];
  } else return '';
}

Template.displayCombatStats.helpers({

  hasExtraStats() {
    return Template.instance().data.extraStats;
  },

  withExtraStats() {
    const statsMap = Template.instance().data.stats;
    const extraStatsMap = Template.instance().data.extraStats;
    const statsArr = [];

    if (statsMap.attack) {
      let attackLabel = '';
      if (!extraStatsMap.attack) {
        attackLabel += `${autoPrecisionValue(statsMap.attack)} `;
      } else {
        attackLabel += `(${autoPrecisionValue(statsMap.attack)} - ${autoPrecisionValue(statsMap.attack + extraStatsMap.attack)}) `;
      }
        
      if (statsMap.attackMax) {
        attackLabel += `${descriptors('attack')}`;
        
        let attackMaxLabel = '';
        if (!extraStatsMap.attackMax) {
          attackMaxLabel += `${autoPrecisionValue(statsMap.attackMax)} `;
        } else {
          attackMaxLabel += `(${autoPrecisionValue(statsMap.attackMax)} - ${autoPrecisionValue(statsMap.attackMax + extraStatsMap.attackMax)}) `;
        }
        attackMaxLabel += `${descriptors('attackMax')}`;

        statsArr.push({
          label: `${attackLabel} / ${attackMaxLabel}`,
          key: 'attack'
        });
      } else {
        attackLabel += `${descriptors('damageConsistent')}`; // todo: check if this is referenced anywhere

        statsArr.push({
            label: attackLabel,
            key: 'attack'
        });
      }
    }
    
    Object.keys(statsMap).forEach((key) => {
      if (key === 'attack' || key === 'attackMax') {
        return;
      }
    
      if (key === 'criticalDamage' || key === 'criticalChance' || key === 'healingPower') {
        let val = CDbl(statsMap[key]) + ((extraStatsMap[key]) ? CDbl(extraStatsMap[key]) : 0.0);
        if (key === 'criticalDamage') {
          val *= 100.0;
        }
        
        statsArr.push({
          label: `+${autoPrecisionValue(val)}% ${descriptors(key)}`,
          key
        });
        return;
      }
      
      if (extraStatsMap[key]) {
        statsArr.push({
          label: `${autoPrecisionValue(statsMap[key])} - ${autoPrecisionValue(statsMap[key] + extraStatsMap[key])} ${descriptors(key)}`,
          value: statsMap[key] + extraStatsMap[key],
          key
        });
      } else {
        statsArr.push({
          label: `${autoPrecisionValue(statsMap[key])} ${descriptors(key)}`,
          value: statsMap[key],
          key
        });
      }      
    });

    return statsArr;
  },

  stats() {
    const statsMap = Template.instance().data.stats;
    const statsArr = [];

    if (statsMap.attack) {
      if (statsMap.attackMax) {
        statsArr.push({
          label: `${autoPrecisionValue(statsMap.attack)} - ${autoPrecisionValue(statsMap.attackMax)} ${descriptors('damageConsistent')}`,
          key: 'attack'
        });        
      } else {
        statsArr.push({
          label: `${autoPrecisionValue(statsMap.attack)} ${descriptors('damageConsistent')}`,
          key: 'attack'
        });
      }
    }
    
    if (statsMap.gold) {
      statsArr.push({
        label: descriptors('gold'),
        key: 'gold',
        rawValue: statsMap.gold.toFixed(0),
        requiresFormatting: true
      });
    }

    Object.keys(statsMap).forEach((key) => {
      if (key === 'attack' || key === 'attackMax' || key === 'gold') {
        return;
      }
      
      if (key === 'criticalDamage' || key === 'criticalChance' || key === 'healingPower') {
        let val = CDbl(statsMap[key]);
        if (key === 'criticalDamage') {
          val *= 100.0;
        }
             
        statsArr.push({
          label: `+${autoPrecisionValue(val)}% ${descriptors(key)}`,
          key
        });
        return;
      }

      statsArr.push({
        label: `${autoPrecisionValue(statsMap[key])} ${descriptors(key)}`,
        key
      });
    });

    return statsArr;
  }
});
