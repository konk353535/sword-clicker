import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Users } from '/imports/api/users/users.js';

import _ from 'underscore';

// Component used in the template
import '/imports/ui/components/achievements/combatAchieveTab/combatAchieveTab.js';
//import '/imports/ui/components/achievements/craftingAchieveTab/craftingAchieveTab.js';
import '/imports/ui/components/achievements/pqAchieveTab/pqAchieveTab.js';
import '/imports/ui/components/achievements/magicAchieveTab/magicAchieveTab.js';
import '/imports/ui/components/achievements/towerAchieveTab/towerAchieveTab.js';

import './achievements.html';

Template.achievementsPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.call('achievements.fetch', (err, res) => {
    this.state.set('achievements', res);
  });

  Tracker.autorun(() => {
    const userDoc = Users.findOne({ _id: Meteor.userId() });
    if (userDoc) {
      if (userDoc.uiState && userDoc.uiState.achievementTab !== undefined) {
        this.state.set('currentTab', userDoc.uiState.achievementTab);
      } else {
        this.state.set('currentTab', 'pq');
      }
      this.state.set('spellsCast',  ((userDoc.stats) && (userDoc.stats.spellsCast))            ? userDoc.stats.spellsCast            : 0);
      this.state.set('damageTaken', ((userDoc.stats) && (userDoc.stats.combatMostDamageTaken)) ? userDoc.stats.combatMostDamageTaken : 0);
      this.state.set('damageDone',  ((userDoc.stats) && (userDoc.stats.combatMostDamageDone))  ? userDoc.stats.combatMostDamageDone  : 0);
      this.state.set('healingDone', ((userDoc.stats) && (userDoc.stats.combatMostHealingDone)) ? userDoc.stats.combatMostHealingDone : 0);
    }
  });
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
  },

  'click .combatTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'combat') {
      instance.state.set('currentTab', 'combat');
      Meteor.call('users.setUiState', 'achievementTab', 'combat');
    }
  },

  /*
  'click .craftingTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'crafting') {
      instance.state.set('currentTab', 'crafting');
      Meteor.call('users.setUiState', 'achievementTab', 'crafting');
    }
  },
  */

  'click .pqTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'pq') {
      instance.state.set('currentTab', 'pq');
      Meteor.call('users.setUiState', 'achievementTab', 'pq');
    }
  },

  'click .magicTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'magic') {
      instance.state.set('currentTab', 'magic');
      Meteor.call('users.setUiState', 'achievementTab', 'magic');
    }
  },

  'click .towerTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'tower') {
      instance.state.set('currentTab', 'tower');
      Meteor.call('users.setUiState', 'achievementTab', 'tower');
    }
  },

});

Template.achievementsPage.helpers({
  achievements() {
    return Template.instance().state.get('achievements');
  },

  showCombatAchieveTab() {
    return Template.instance().state.get('currentTab') === 'combat';
  },

  /*
  showCraftingAchieveTab() {
    return Template.instance().state.get('currentTab') === 'crafting';
  },
  */
  
  showMagicAchieveTab() {
    return Template.instance().state.get('currentTab') === 'magic';
  },

  showPqAchieveTab() {
    return Template.instance().state.get('currentTab') === 'pq';
  },

  showTowerAchieveTab() {
    return Template.instance().state.get('currentTab') === 'tower';
  },
  
  spellsCast() {
    return Template.instance().state.get('spellsCast');
  },
  
  damageTaken() {
    return Template.instance().state.get('damageTaken');
  },
  
  damageDone() {
    return Template.instance().state.get('damageDone');
  },
  
  healingDone() {
    return Template.instance().state.get('healingDone');
  },
});
