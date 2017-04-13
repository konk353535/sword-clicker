import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Users } from '/imports/api/users/users';

import './personalQuestTab.html';

Template.personalQuestTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    const userDoc = Users.findOne({});
    if (userDoc && userDoc.personalQuest) {
      this.state.set('maxLevel', userDoc.personalQuest.level);
      this.state.set('maxLevelCurrentWave', userDoc.personalQuest.wave);
      if (!this.state.get('currentLevel')) {
        this.state.set('currentLevel', userDoc.personalQuest.level);
      }
    }
  });
});

Template.personalQuestTab.events({
  'click .find-battle'(event, instance) {
    // Battle the current wave, so we can progress to the next wave
    const targetLevel = instance.state.get('maxLevel');
    const targetWave = instance.state.get('maxLevelCurrentWave');
    Meteor.call('battles.findPersonalBattle', targetLevel, targetWave, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .select-level'(event, instance) {
    const selectedLevel = $(event.target).closest('.select-level')[0].getAttribute('data-level');
    instance.state.set('currentLevel', selectedLevel);
  },

  'click .random-battle'(event, instance) {
    // Battle a random wave in the current level
    Meteor.call('battles.findPersonalBattle', instance.state.get('currentLevel'), (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    })
  }
})

Template.personalQuestTab.helpers({

  maxLevel() {
    return Template.instance().state.get('maxLevel');
  },

  maxLevelCurrentWave() {
    return Template.instance().state.get('maxLevelCurrentWave');
  },

  usersCurrentLevel() {
    return Template.instance().state.get('currentLevel');
  },

  levelsList() {
    const maxLevel = Template.instance().state.get('maxLevel');
    return _.range(1, maxLevel + 1);
  }
});
