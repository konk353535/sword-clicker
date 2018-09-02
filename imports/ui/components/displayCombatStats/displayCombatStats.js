import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

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
    'miner': 'passive miner damage'
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
        let attackLabel = `(${statsMap.attack.toFixed(1)}`;
        if (extraStatsMap.attack) {
          attackLabel += ` - ${(statsMap.attack + extraStatsMap.attack).toFixed(1)}`;
        }
        attackLabel += ') attack';

        let attackMaxLabel = `(${statsMap.attackMax.toFixed(1)}`;
        if (extraStatsMap.attackMax) {
          attackMaxLabel += ` - ${(statsMap.attackMax + extraStatsMap.attackMax).toFixed(1)}`;
        }
        attackMaxLabel += ')';

        statsArr.push({
          label: `${attackLabel} - ${attackMaxLabel} ${descriptors('attack')}`,
          key: 'attack'
        });
      } else {
        let attackLabel = statsMap.attack;
        if (extraStatsMap.attack) {
          attackLabel += ` - ${(statsMap.attack + extraStatsMap.attack).toFixed(1)}`;
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

      let statLabel = statsMap[key].toFixed(1);
      if (extraStatsMap[key]) {
        statLabel += ` - ${(statsMap[key] + extraStatsMap[key]).toFixed(1)}`;
      }

      statsArr.push({
        label: statLabel + ` ${descriptors(key)}`,
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
          label: `${statsMap.attack.toFixed(1)} - ${statsMap.attackMax.toFixed(1)} ${descriptors('attack')}`,
          key: 'attack'
        });        
      } else {
        statsArr.push({
          label: `${statsMap.attack.toFixed(1)} ${descriptors('attack')}`,
          key: 'attack'
        });
      }
    }

    Object.keys(statsMap).forEach((key) => {
      if (key === 'attack' || key === 'attackMax') {
        return;
      }

      statsArr.push({
        label: statsMap[key].toFixed(1) + ` ${descriptors(key)}`,
        key
      });
    });

    return statsArr;
  }
});
