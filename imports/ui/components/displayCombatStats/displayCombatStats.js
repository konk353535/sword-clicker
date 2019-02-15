import { Template } from 'meteor/templating';

import { autoPrecisionValue } from '../../../utils.js';

import './displayCombatStats.html';

function descriptors(str) {
  const terms = {
    'attack': 'damage',
    'accuracy': 'accuracy',
    'healthMax': 'health',
    'defense': 'defense',
    'armor': 'armor',
    'attackSpeed': 'attack speed',
    'magicPower': 'magic power',
    'magicArmor': 'magic armor',
    'healingPower': 'healing power',
    'criticalChance': 'critical chance',
    'energyStorage': 'energy storage',
    'energyPerHit': 'energy per hit',
    'energyRegen': 'energy regen',
    'miner': 'passive miner damage',
    'completeShard': '% bonus complete shards',
    'ancientShard': '% bonus ancient shards',
    'gold': 'deposited gold',
    'damage': 'click damage',
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
      if (statsMap.attackMax) {
        let attackLabel = `(${autoPrecisionValue(statsMap.attack)}`;
        if (extraStatsMap.attack) {
          attackLabel += ` - ${autoPrecisionValue(statsMap.attack + extraStatsMap.attack)}`;
        }
        attackLabel += ') attack';

        let attackMaxLabel = `(${autoPrecisionValue(statsMap.attackMax)}`;
        if (extraStatsMap.attackMax) {
          attackMaxLabel += ` - ${autoPrecisionValue(statsMap.attackMax + extraStatsMap.attackMax)}`;
        }
        attackMaxLabel += ')';

        statsArr.push({
          label: `${attackLabel} - ${attackMaxLabel} ${descriptors('attack')}`,
          key: 'attack'
        });
      } else {
        let attackLabel = statsMap.attack;
        if (extraStatsMap.attack) {
          attackLabel += ` - ${autoPrecisionValue(statsMap.attack + extraStatsMap.attack)}`;
        }
        statsArr.push({
          label: attackLabel + ` ${descriptors('attack')}`,
          key: 'attack'
        });
      }
    }

    Object.keys(statsMap).forEach((key) => {
      if (key === 'attack' || key === 'attackMax') {
        return;
      }

      statsArr.push({
        label: `${autoPrecisionValue(statsMap[key] + extraStatsMap[key])} ${descriptors(key)}`,
        value: statsMap[key] + extraStatsMap[key],
        key
      });
    });

    return statsArr;
  },

  stats() {
    const statsMap = Template.instance().data.stats;
    const statsArr = [];

    if (statsMap.attack) {
      if (statsMap.attackMax) {
        statsArr.push({
          label: `${autoPrecisionValue(statsMap.attack)} - ${autoPrecisionValue(statsMap.attackMax)} ${descriptors('attack')}`,
          key: 'attack'
        });        
      } else {
        statsArr.push({
          label: `${autoPrecisionValue(statsMap.attack)} ${descriptors('attack')}`,
          key: 'attack'
        });
      }
    }
    
    if (statsMap.gold) {
      statsArr.push({
          label:  `${descriptors('gold')}`,
          key: 'gold',
          rawValue: statsMap.gold.toFixed(0),
          requiresFormatting: true
        });
    }

    Object.keys(statsMap).forEach((key) => {
      if (key === 'attack' || key === 'attackMax' || key === 'gold') {
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
