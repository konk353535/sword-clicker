import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import moment from 'moment';

import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';
import { Adventures } from '/imports/api/adventures/adventures.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './adventuresTab.html';

let updatingAdventures = false;

Template.adventuresTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
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

  'click .buy-new-adventure'(event, instance) {
    Meteor.call('adventures.cycleAdventure');
  },

  'click .buy-new-adventure-gems'(event, instance) {
    Meteor.call('adventures.cycleAdventure', true);
  }
})

Template.adventuresTab.helpers({

  epicAdventures() {
    return Adventures.findOne({}).adventures.filter((adventure) => {
      return adventure.length === 'epic' && !adventure.startDate;
    });
  },

  longAdventures() {
    return Adventures.findOne({}).adventures.filter((adventure) => {
      return adventure.length === 'long' && !adventure.startDate;
    });
  },

  shortAdventures() {
    return Adventures.findOne({}).adventures.filter((adventure) => {
      return adventure.length === 'short' && !adventure.startDate;
    });
  },

  totalGems() {
    return Meteor.user().gems + Meteor.user().fakeGems;
  },

  token() {
    const token = Items.findOne({
      itemId: 'adventure_token'
    });

    if (!token) {
      return {
        amount: 0
      }
    }

    return token;
  },

  activeAdventures() {
    return Adventures.findOne({}).adventures.filter((adventure) => {
      return adventure.startDate;
    });
  }
});

Template.adventureRow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.autorun(() => {
    const adventure = this.data.adventure;

    const nowTimeStamp = TimeSync.serverTime();

    if (adventure.duration && !adventure.endDate) {
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
      // Total seconds for this adventure
      const totalSeconds = moment.duration(moment(adventure.endDate).diff(adventure.startDate)).asSeconds();
      // Formatted seconds left
      adventure.percentageComplete = Math.ceil((secondsSinceStart / totalSeconds) * 100);
      adventure.durationLeft = adventure.percentageComplete < 100;
    }

    if (moment().isAfter(adventure.endDate) && !updatingAdventures && adventure.win == null) {
      updatingAdventures = true;
      Meteor.call('adventures.gameUpdate', (err, res) => {
        Meteor.setTimeout(() => {
          updatingAdventures = false;
        }, 20000)
      });
    }

    this.state.set('computedAdventure', adventure);
  });
});

Template.adventureRow.events({
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

Template.adventureRow.helpers({
  computedAdventure() {
    return Template.instance().state.get('computedAdventure');
  }
})
