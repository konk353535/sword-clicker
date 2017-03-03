import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '/imports/api/skills/skills.js';
import { MiningSpace } from '/imports/api/mining/mining.js';
import { Items } from '/imports/api/items/items.js';

// Component used in the template
import '../components/mining/mineSpace.js';
import '../components/itemIcon/itemIcon.js';

import './mining.html';

let gameUpdateTimer;

Template.miningPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  // Show mining exp
  Meteor.subscribe('skills');
  // Show mining spaces
  Meteor.subscribe('miningSpace');
  // Do I even need this?
  Meteor.subscribe('mining');
  // Show items
  Meteor.subscribe('items');

  gameUpdateTimer = Meteor.setInterval(function () {
    Meteor.call('mining.gameUpdate');
  }, 5000);
});

Template.miningPage.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(gameUpdateTimer);
});

Template.miningPage.helpers({
  miningSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({});
  },

  miningSpaces() {
    return MiningSpace.find();
  },

  miningItems() {
    return Items.find({ category: 'mining' });
  }
});
