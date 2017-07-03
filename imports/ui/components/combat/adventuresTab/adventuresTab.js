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

  const updateAdventures = function (self) {
    self.state.set('adventures', self.state.get('rawAdventures').map((adventure) => {
      if (adventure.duration) {
        adventure.durationTotalDisplay = moment("2015-01-01").startOf('day').seconds(adventure.duration).format('H:mm:ss');
      }

      if (adventure.win != null) {
        adventure.isComplete = true;
      }

      if (!adventure.startDate) {
        adventure.inactive = true;
      } else {
        adventure.inactive = false;
      }

      if (!adventure.isComplete && moment().isAfter(adventure.startDate) && moment().isBefore(adventure.endDate)) {
        // Seconds since start
        const secondsSinceStart = moment.duration(moment().diff(adventure.startDate)).asSeconds();
        // Seconds till end
        const secondsLeft = moment.duration(moment(adventure.endDate).diff(new Date())).asSeconds()
        // Total seconds for this adventure
        const totalSeconds = moment.duration(moment(adventure.endDate).diff(adventure.startDate)).asSeconds();
        // Formatted seconds left
        adventure.durationLeft = moment("2015-01-01").startOf('day').seconds(secondsLeft).format('H:mm:ss');
        adventure.percentageComplete = Math.ceil((secondsSinceStart / totalSeconds) * 100);
      }

      if (moment().isAfter(adventure.endDate) && !updatingAdventures && adventure.win == null) {
        updatingAdventures = true;
        Meteor.call('adventures.gameUpdate', (err, res) => {
          Meteor.setTimeout(() => {
            updatingAdventures = false;
          }, 1000)
        });
      }

      return adventure;
    }));
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
    const id = instance.$(event.target).closest('.start-adventure-btn').attr('data-id');
    Meteor.call('adventures.startAdventure', id, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .collect-adventure-btn'(event, instance) {
    const id = instance.$(event.target).closest('.collect-adventure-btn').attr('data-id');
    Meteor.call('adventures.collectAdventure', id, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .cancel-adventure-btn'(event, instance) {
    const id = instance.$(event.target).closest('.cancel-adventure-btn').attr('data-id');
    Meteor.call('adventures.cancelAdventure', id, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  }
})

Template.adventuresTab.helpers({

  epicAdventures() {
    const instance = Template.instance();
    if (!instance.state.get('adventures')) {
      return;
    }
    return instance.state.get('adventures').filter((adventure) => {
      return adventure.length === 'epic' && !adventure.startDate;
    });
  },

  longAdventures() {
    const instance = Template.instance();
    if (!instance.state.get('adventures')) {
      return;
    }
    return instance.state.get('adventures').filter((adventure) => {
      return adventure.length === 'long' && !adventure.startDate;
    });
  },

  shortAdventures() {
    const instance = Template.instance();
    if (!instance.state.get('adventures')) {
      return;
    }
    return instance.state.get('adventures').filter((adventure) => {
      return adventure.length === 'short' && !adventure.startDate;
    });
  },

  activeAdventures() {
    const instance = Template.instance();
    if (!instance.state.get('adventures')) {
      return;
    }
    return instance.state.get('adventures').filter((adventure) => {
      return adventure.startDate;
    });
  }
});
