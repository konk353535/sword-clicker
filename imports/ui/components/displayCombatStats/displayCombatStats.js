import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './displayCombatStats.html';

Template.displayCombatStats.helpers({
  stats() {
    const statsMap = Template.instance().data.stats;
    const statsArr = [];

    if (statsMap.attack) {
      if (statsMap.attackMax) {
        statsArr.push({
          label: `${statsMap.attack} - ${statsMap.attackMax}`,
          key: 'attack'
        });        
      } else {
        statsArr.push({
          label: `${statsMap.attack}`,
          key: 'attack'
        });
      }
    }

    Object.keys(statsMap).forEach((key) => {
      if (key === 'attack' || key === 'attackMax') {
        return;
      }

      statsArr.push({
        label: statsMap[key],
        key
      });
    });

    return statsArr;
  }
})
