import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '../../api/skills/skills.js';
import { Mining } from '../../api/mining/mining.js';

import './mining.html';

Template.miningPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('skills');
  Meteor.subscribe('mining');
});

Template.miningPage.helpers({
  miningSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({});
  },

  mining() {
    return Mining.findOne({});
  }
});
