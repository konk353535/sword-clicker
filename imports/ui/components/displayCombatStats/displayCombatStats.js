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

      let fixedDigits = 1;
      if (key === 'attackSpeed')
        fixedDigits = 2;
      
      let statLabel = statsMap[key].toFixed(fixedDigits);
      if (extraStatsMap[key]) {
        statLabel += ` - ${(statsMap[key] + extraStatsMap[key]).toFixed(fixedDigits)}`;
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

      let fixedDigits = 1;
      if (key === 'attackSpeed')
        fixedDigits = 2;
      
      statsArr.push({
        label: statsMap[key].toFixed(fixedDigits) + ` ${descriptors(key)}`,
        key
      });
    });

    return statsArr;
  }
});
