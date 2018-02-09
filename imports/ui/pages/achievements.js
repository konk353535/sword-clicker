import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Users } from '/imports/api/users/users.js';


import _ from 'underscore';

// Component used in the template
import '/imports/ui/components/achievements/pqTab/astronomyTab.js';

import './achievements.html';

Template.achievementsPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

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

Template.achievementsPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.call('achievements.fetch', (err, res) => {
    this.state.set('achievements', res);
  })
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
  }
})

Template.achievementsPage.helpers({
  achievements() {
    return Template.instance().state.get('achievements');
  }
})
