import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '../../api/skills/skills.js';
import { MiningSpace } from '../../api/mining/mining.js';

// Component used in the template
import '../components/mining/mineSpace.js';

import './mining.html';

Template.miningPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('skills');
  Meteor.subscribe('miningSpace');
});

Template.miningPage.helpers({
  miningSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({});
  },

  miningSpaces() {
    return MiningSpace.find();
  }
});
