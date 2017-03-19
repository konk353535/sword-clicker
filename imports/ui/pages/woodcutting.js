import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Woodcutting } from '/imports/api/woodcutting/woodcutting.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';

import './woodcutting.html';

Template.woodcuttingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('hasLearnRequirements', false);

  Meteor.call('woodcutting.gameUpdate', (err, res) => {
    this.subscribe('woodcutting');

    Tracker.autorun(() => {
      // Only called when skills have loaded
      if (Skills.findOne()) {
        const woodcuttingSkill = Skills.findOne({ type: 'woodcutting' });

        if (!woodcuttingSkill) {
          Meteor.call('skills.requirements', 'woodcutting', (err, res) => {
            this.state.set('learnRequirements', res);
          });
        }
      }
    });
  });
});

Template.woodcuttingPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'woodcutting');
  },

  'click .buy-woodcutter'(event, instance) {
    Template.instance().$('.woodcuttersModal').modal('show');      
  },

  'click .craft-row'(event, instance) {
    const woodcutterId = instance.$(event.target).closest('.craft-row').data('recipe');

    Meteor.call('woodcutting.hireWoodcutter', woodcutterId);
  },
});

Template.woodcuttingPage.helpers({
  woodcuttingSkill() {
    return Skills.findOne({ type: 'woodcutting' });
  },

  woodcutting() {
    const woodcutting = Woodcutting.findOne();
    if (!woodcutting) {
      return;
    }

    woodcutting.woodcutters.forEach((woodcutter, woodcutterIndex) => {
      woodcutter.primaryAction = {
        description: 'Fire woodcutter',
        method() {
          Meteor.call('woodcutting.fireWoodcutter', woodcutterIndex);
        }
      }
    });
    return woodcutting;
  },

  learnRequirements() {
    return Template.instance().state.get('learnRequirements');
  },

  hasLearnRequirements() {
    return Template.instance().state.get('hasLearnRequirements');
  },

  learnRequirementsMet() {
    const instance = Template.instance();
    return function (met) {
      instance.state.set('hasLearnRequirements', met);
    }
  },

  buyableWoodcutters() {
    const woodcuttingSkill = Skills.findOne({ type: 'woodcutting' });
    if (!woodcuttingSkill) {
      return;
    }
    // Pass level so that this is recalled when we get up a level
    const results = ReactiveMethod.call('woodcutting.fetchWoodcutters', woodcuttingSkill.level);

    return results || [];
  },

  items() {
    return Items.find({ category: 'woodcutting' });
  }
});
