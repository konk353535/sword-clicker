import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '/imports/api/skills/skills.js';

// Component used in the template
import '/imports/ui/components/combat/battleTab/battleTab.js';
import '/imports/ui/components/combat/equipmentTab/equipmentTab.js';
import '/imports/ui/components/combat/combatGroupTab/combatGroupTab.js';

import './combat.html';

Template.combatPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('hasLearnRequirements', false);
  this.state.set('currentTab', 'group');

  this.autorun(() => {
    // Only called when skills have loaded
    if (Skills.findOne()) {
      const attackSkill = Skills.findOne({ type: 'attack' });
      const defenseSkill = Skills.findOne({ type: 'defense' });
      const healthSkill = Skills.findOne({ type: 'health' });

      if (!attackSkill) {
        Meteor.call('skills.requirements', 'attack', (err, res) => {
          this.state.set('learnRequirements', res);
        });
      }

      if (!defenseSkill) {
        Meteor.call('skills.learnSkill', 'defense');
      }

      if (!healthSkill) {
        Meteor.call('skills.learnSkill', 'health');
      }
    }
  });
});

Template.combatPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'attack');
  },

  'click .battleTabLink'(event, instance) {
    instance.state.set('currentTab', 'battle');
  },

  'click .equipmentTabLink'(event, instance) {
    instance.state.set('currentTab', 'equipment');
  },

  'click .groupTabLink'(event, instance) {
    instance.state.set('currentTab', 'group');
  }
})

Template.combatPage.helpers({
  attackSkill() {
    return Skills.findOne({ type: 'attack' });
  },

  defenseSkill() {
    return Skills.findOne({ type: 'defense' });
  },

  showEquipmentTab() {
    return Template.instance().state.get('currentTab') === 'equipment';
  },

  showBattleTab() {
    return Template.instance().state.get('currentTab') === 'battle';
  },

  showCombatGroupTab() {
    return Template.instance().state.get('currentTab') === 'group';
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
