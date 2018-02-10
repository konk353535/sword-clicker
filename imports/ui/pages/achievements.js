import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Users } from '/imports/api/users/users.js';


import _ from 'underscore';

// Component used in the template
import '/imports/ui/components/achievements/pqTab/pqTab.js';

import './achievements.html';

Template.achievementsPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.call('achievements.fetch', (err, res) => {
    this.state.set('achievements', res);
  })

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.achievementTab !== undefined) {
        this.state.set('currentTab', myUser.uiState.achievementTab);
      } else {
        this.state.set('currentTab', 'pq');
      }
    }
  });  
});


Template.achievementsPage.events({
  'click .btn-collect'(event, instance) {
    const achieveId = $(event.target).closest('.btn-collect')[0].getAttribute('data-id');

    Meteor.call('achievements.collect', achieveId, (err, res) => {
      if (res) {
        // Update collected state on achievement
        const achievements = instance.state.get('achievements');
        _.findWhere(achievements, { id: achieveId }).collected = true;
        instance.state.set('achievements', achievements);
      }
    });
  },

  'click .pqTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'pq') {
      instance.state.set('currentTab', 'pq');
      Meteor.call('users.setUiState', 'achievementTab', 'pq');
    }
  },
})

Template.achievementsPage.helpers({
  achievements() {
    return Template.instance().state.get('achievements');
  },

   showPqTab() {
    return Template.instance().state.get('currentTab') === 'pq';
  },
});
