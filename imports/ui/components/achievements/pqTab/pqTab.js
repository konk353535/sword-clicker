import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import _ from 'underscore';
import './pqTab.html';

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
