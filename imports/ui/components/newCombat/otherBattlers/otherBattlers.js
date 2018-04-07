import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Battles } from '/imports/api/battles/battles.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Groups } from '/imports/api/groups/groups.js';

import './otherBattlers.html';

Template.otherBattlersPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Tracker.autorun(() => {
    if (Meteor.user() && Meteor.user().currentGame) {  
      Meteor.subscribe('otherBattlers', 100, Meteor.user().currentGame);
    }
  });
});

Template.otherBattlersPage.events({
  'click .back-to-lobby-btn'(event, instance) {
    instance.data.setPage('lobby');
  }
})

Template.otherBattlersPage.helpers({
  otherBattlers() {
    const otherBattlers = Groups.find({
      lastBattleStarted: {
        $gte: moment().subtract(24, 'hours').toDate()
      }
    }, {
      limit: 100,
      sort: {
        lastBattleStarted: -1
      }
    }).fetch();

    return otherBattlers;
  }
});

Template.otherBattlersRow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.otherBattlersRow.events({
  'click .btn-join-group'(event, instance) {
    const groupId = instance.$(event.target).closest('.btn-join-group').data('id');
    Meteor.call('groups.join', groupId);
  }
})

Template.otherBattlersRow.helpers({
});
