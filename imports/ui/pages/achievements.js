import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Users } from '/imports/api/users/users.js';


import _ from 'underscore';

// Component used in the template
import '/imports/ui/components/achievements/pqTab/astronomyTab.js';

import './achievements.html';

Template.achievementsPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.call('achievements.fetch', (err, res) => {
    this.state.set('achievements', res);
  })

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.achievementTab !== undefined) {
        this.state.set('currentTab', myUser.uiState.achievementTab);
      } else {
        this.state.set('currentTab', 'pq');
      }
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
  }
})

Template.achievementsPage.helpers({
  achievements() {
    return Template.instance().state.get('achievements');
  }
})







Template.magicPage.events({

  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'astronomy');
  },

  'click .spellBookTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'spellBook') {
      instance.state.set('currentTab', 'spellBook');
      Meteor.call('users.setUiState', 'magicTab', 'spellBook');
    }
  },

  'click .astronomyTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'astronomy') {
      instance.state.set('currentTab', 'astronomy');
      Meteor.call('users.setUiState', 'magicTab', 'astronomy');
    }
  },

  'click .abilitiesTabLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'abilities') {
      instance.state.set('currentTab', 'abilities');
      Meteor.call('users.setUiState', 'magicTab', 'abilities');
    }
  },
});

Template.magicPage.helpers({

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

  astronomySkill() {
    return Skills.findOne({ type: 'astronomy' });
  },

  showAstronomyTab() {
    return Template.instance().state.get('currentTab') === 'astronomy';
  },

  showSpellBookTab() {
    return Template.instance().state.get('currentTab') === 'spellBook';
  },

  showAbilitiesTab() {
    return Template.instance().state.get('currentTab') === 'abilities';
  }

});
