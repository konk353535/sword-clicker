import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '/imports/api/skills/skills.js';

// Component used in the template
import './combat.html';

Template.combatPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('hasLearnRequirements', false);

  // Show combat exp
  this.subscribe('skills');

  // Show combat items / ect
  this.subscribe('items');  

  Tracker.autorun(() => {
    // Only called when skills have loaded
    if (this.subscriptionsReady()) {
      const attackSkill = Skills.findOne({ type: 'attack' });
      if (!attackSkill) {
        Meteor.call('skills.requirements', 'attack', (err, res) => {
          this.state.set('learnRequirements', res);
        });
      }
    }
  });
});

Template.combatPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'attack');
    Meteor.call('skills.learnSkill', 'defense');
  }
})

Template.combatPage.helpers({
  attackSkill() {
    return Skills.findOne({ type: 'attack' });
  },

  defenseSkill() {
    return Skills.findOne({ type: 'defense' });
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
  }
});
