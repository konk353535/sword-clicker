import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Combat } from '/imports/api/combat/combat.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Users } from '/imports/api/users/users.js';

// Component used in the template
import '/imports/ui/components/magic/astronomyTab/astronomyTab.js';
import '/imports/ui/components/magic/spellBookTab/spellBookTab.js';

import './magic.html';

let magicPageTimer;
let astronomyPageTimer;

Template.magicPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('hasLearnRequirements', false);

  Meteor.subscribe('abilities');

  Meteor.call('astronomy.gameUpdate');
  astronomyPageTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('astronomy.gameUpdate');
    }
  }, 10000);

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.magicTab !== undefined) {
        this.state.set('currentTab', myUser.uiState.magicTab);
      } else {
        this.state.set('currentTab', 'astronomy');
      }
    }
  });

  this.autorun(() => {
    // Only called when skills have loaded
    if (Skills.findOne()) {
      const astronomySkill = Skills.findOne({ type: 'astronomy' });
      const magicSkill = Skills.findOne({ type: 'magic' });

      if (!magicSkill) {
        Meteor.call('skills.learnSkill', 'magic');
      }

      if (!astronomySkill) {
        Meteor.call('skills.requirements', 'astronomy', (err, res) => {
          this.state.set('learnRequirements', res);
        });
      } else {
        Meteor.call('astronomy.upgradeCosts', (err, res) => {
          this.state.set('mageUpgrades', res);
        });
      }
    }
  });
});

Template.magicPage.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(astronomyPageTimer);
});

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
