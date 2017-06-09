import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import moment from 'moment';

import { Skills } from '/imports/api/skills/skills.js';
import { Adventures } from '/imports/api/adventures/adventures.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './adventuresTab.html';

let updatingAdventures = false;

Template.adventuresTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.subscribe('adventures');

  /*
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
      startDate: '2017-06-06T21:03:24+10:00',
      endDate: '2017-06-06T21:09:26+10:00',
      type: 'Melee',
      durationTotal: 5 * 60
  }, {
      name: 'Bush Den',
      icon: 'wombat',
      length: 'Short',
      startDate: '2017-06-06T15:06:24+00:00',
      endDate: '2017-06-06T15:26:26+00:00',
      type: 'Melee',
      durationTotal: 5 * 60
  }, {
      name: 'Tamarind Tree',
      icon: 'bee',
      length: 'Epic',
      type: 'Magic',
      durationTotal: 60 * 60 * 3
  }];
  */

  const updateAdventures = function (self) {
    self.state.set('adventures', _.sortBy(self.state.get('rawAdventures').map((adventure) => {
      if (adventure.duration) {
        adventure.durationTotalDisplay = moment("2015-01-01").startOf('day').seconds(adventure.duration).format('H:mm:ss');
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

      if (adventure.percentageComplete >= 100 && !updatingAdventures) {
        updatingAdventures = true;
        Meteor.call('adventures.gameUpdate', (err, res) => {
          if (!err) {
            updatingAdventures = false;
          } else {
            Meteor.setTimeout(() => {
              updatingAdventures = false;
            }, 60000)
          }
        });
      }

      return adventure;
    }), 'endDate'));
  }

  this.autorun(() => {
    if (Adventures.findOne()) {
      this.state.set('rawAdventures', Adventures.findOne().adventures);
      updateAdventures(this);
    }
  });

  Meteor.setInterval(() => {
    updateAdventures(this);
  }, 1000);
});

Template.adventuresTab.events({
  'click .start-adventure-btn'(event, instance) {
    const index = instance.$(event.target).closest('.start-adventure-btn').data('index');

    Meteor.call('adventures.startAdventure', index, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .collect-adventure-btn'(event, instance) {
    const index = instance.$(event.target).closest('.collect-adventure-btn').data('index');

    Meteor.call('adventures.collectAdventure', index, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .cancel-adventure-btn'(event, instance) {
    const index = instance.$(event.target).closest('.cancel-adventure-btn').data('index');

    Meteor.call('adventures.cancelAdventure', index, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  }
})

Template.adventuresTab.helpers({
  adventures() {
    return Template.instance().state.get('adventures');
  }
});
