import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Combat } from '/imports/api/combat/combat.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Battles } from '/imports/api/battles/battles.js';
import { Groups } from '/imports/api/groups/groups.js';

// Component used in the template
import '/imports/ui/components/combat/buffIcon/buffIcon.js';
import '/imports/ui/components/combat/combatAbilitiesTab/combatAbilitiesTab.js';
import '/imports/ui/components/combat/towerTab/towerTab.js';
import '/imports/ui/components/combat/equipmentTab/equipmentTab.js';
import '/imports/ui/components/combat/combatGroupTab/combatGroupTab.js';

import './combat.html';

let combatPageTimer;

Template.combatPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  combatPageTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('combat.gameUpdate');
    }
  }, 5000);

  this.state.set('hasLearnRequirements', false);
  if (Session.get('combatTab')) {
    this.state.set('currentTab', Session.get('combatTab'));
  } else {
    this.state.set('currentTab', 'personalQuestTab');
  }

  this.subscribe('groups');
  this.subscribe('combat');
  this.subscribe('battles');
  this.subscribe('abilities');

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

Template.combatPage.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(combatPageTimer);
});

Template.combatPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'attack');
  },

  'click .personalQuestTabLink'(event, instance) {
    Session.set('combatTab', 'personalQuest');
    instance.state.set('currentTab', 'personalQuest');
  },

  'click .towerTabLink'(event, instance) {
    Session.set('combatTab', 'tower');
    instance.state.set('currentTab', 'tower');
  },

  'click .equipmentTabLink'(event, instance) {
    Session.set('combatTab', 'equipment');
    instance.state.set('currentTab', 'equipment');
  },

  'click .abilitiesTabLink'(event, instance) {
    Session.set('combatTab', 'abilities');
    instance.state.set('currentTab', 'abilities');
  },

  'click .groupTabLink'(event, instance) {
    Session.set('combatTab', 'group');
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

  currentGroup() {
    return Groups.findOne({
      members: Meteor.userId()
    });
  },

  combat() {
    const currentCombat = Combat.findOne({
      owner: Meteor.userId()
    });
    if (!currentCombat) {
      return;
    }

    currentCombat.energyPercentage = currentCombat.stats.energy / currentCombat.stats.energyMax * 100;
    currentCombat.healthPercentage = currentCombat.stats.health / currentCombat.stats.healthMax * 100;
    return currentCombat;
  },

  showEquipmentTab() {
    return Template.instance().state.get('currentTab') === 'equipment';
  },

  showPersonalQuestTab() {
    return Template.instance().state.get('currentTab') === 'personalQuest';
  },

  showTowerTab() {
    return Template.instance().state.get('currentTab') === 'tower';
  },

  showCombatGroupTab() {
    return Template.instance().state.get('currentTab') === 'group';
  },

  showAbilitiesTab() {
    return Template.instance().state.get('currentTab') === 'abilities';
  },

  inCurrentBattle() {
    return Battles.findOne({
      finished: false
    });
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
