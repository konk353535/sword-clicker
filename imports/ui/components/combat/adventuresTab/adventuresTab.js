import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import moment from 'moment';

import { Skills } from '/imports/api/skills/skills.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './adventuresTab.html';

Template.adventuresTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.adventuresTab.events({
})

Template.adventuresTab.helpers({
  adventures() {
    const rawAdventures = [{
      name: 'Earth Alter',
      icon: 'earthMage',
      length: 'Long',
      startDate: '2017-05-05T13:06:24+00:00',
      endDate: '2017-05-05T13:26:26+00:00',
      type: 'Magic',
      durationTotal: 60 * 60,
      win: true,
      rewards: [{
        type: "xp",
        amount: 57,
        skill: "magic"
      }, {
        type: "item",
        amount: 1,
        itemId: "ore_steel",
        icon: "steel"
      }]
    }, {
      name: 'Fire Alter',
      icon: 'fireMage',
      length: 'Long',
      startDate: '2017-05-05T13:06:24+00:00',
      endDate: '2017-05-05T13:26:26+00:00',
      type: 'Magic',
      durationTotal: 60 * 60,
      win: false,
      rewards: [{
        type: "xp",
        amount: 57,
        skill: "magic"
      }]
    }, {
      name: 'Demonic Resonance',
      icon: 'demon',
      length: 'Short',
      startDate: '2017-06-05T13:06:24+00:00',
      endDate: '2017-06-05T13:26:26+00:00',
      type: 'Melee',
      durationTotal: 5 * 60
    }, {
      name: 'Bush Den',
      icon: 'wombat',
      length: 'Short',
      startDate: '2017-06-05T14:06:24+00:00',
      endDate: '2017-06-05T14:26:26+00:00',
      type: 'Melee',
      durationTotal: 5 * 60
    }, {
      name: 'Tamarind Tree',
      icon: 'bee',
      length: 'Epic',
      type: 'Magic',
      durationTotal: 60 * 60 * 3
    }];

    return rawAdventures.map((adventure) => {
      if (adventure.durationTotal) {
        adventure.durationTotal = moment("2015-01-01").startOf('day').seconds(adventure.durationTotal).format('H:mm:ss');
      }

      if (adventure.win != null) {
        adventure.isComplete = true;
      }

      if (!adventure.isComplete && moment().isAfter(adventure.startDate)) {
        // Seconds since start
        const secondsSinceStart = moment.duration(moment().diff(adventure.startDate)).asSeconds();
        // Seconds till end
        const secondsLeft = moment.duration(moment(adventure.endDate).diff(new Date())).asSeconds()
        // Total seconds for this adventure
        const totalSeconds = moment.duration(moment(adventure.endDate).diff(adventure.startDate)).asSeconds();
        // Formatted seconds left
        adventure.durationLeft = moment("2015-01-01").startOf('day').seconds(secondsLeft).format('H:mm:ss');
        adventure.percentageComplete = Math.round((secondsSinceStart / totalSeconds) * 100);
      }

      return adventure;
    });
  }
});
