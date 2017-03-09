import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './displayCombatStats.html';

Template.displayCombatStats.helpers({
  stats() {
    const statsMap = Template.instance().data.stats;
    const statsArr = [];

    if (statsMap.attack) {
      statsArr.push({
        label: `${statsMap.attack} - ${statsMap.attackMax}`,
        icon: 'attack'
      });
    }

    Object.keys(statsMap).forEach((key) => {
      if (key === 'attack' || key === 'attackMax') {
        return;
      }

      statsArr.push({
        label: statsMap[key],
        icon: key
      });
    });

    return statsArr;
  }
})
