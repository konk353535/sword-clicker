import { Template } from 'meteor/templating';
import { Skills } from '/imports/api/skills/skills.js';
import { Session } from 'meteor/session';
import { Users } from '/imports/api/users/users.js';
import { Meteor } from "meteor/meteor";

import './nav.html';
import {Battles} from "../api/battles/battles";


Template.nav.onCreated(function bodyOnCreated() {
  Meteor.subscribe("userData");

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.showSummaryList !== undefined) {
        Session.set('summaryListDisabled', !myUser.uiState.showSummaryList);
      } else {
        Session.set('summaryListDisabled', false);
      }
    }
  });

  Tracker.autorun(() => {
    const finishedBattle = Battles.findOne({
      finished: true,
      updatedAt: {
        $gte: moment().subtract(15, 'second').toDate()
      }
    }, {
      sort: {
        updatedAt: -1
      }
    });

    if (finishedBattle) {
      subAbilityTimer()
    }
  });

  let subAbilityTimer = function() {
    console.log('subbing');
    let abilityTimer = Meteor.setInterval(() => {
      console.log('interval running');
      Meteor.call('abilities.gameUpdate', (err, res) => {
        // clear if all abilities are cooled down
        if (res) {
          console.log('cooled down, unsubbing');
          Meteor.clearInterval(abilityTimer);
        }
      });
    }, 2500);
  };

  subAbilityTimer();
});

Template.nav.events({
  'click .guest-sign-out-btn'(event, instance) {
    // Show confirm logout modal for guest sign out
    instance.$('.guestSignOffConfirmModal').modal('show');
  },

  'click .skip-tutorial'() {
    Meteor.call('users.skipTutorial');
  },

  'click .nav-link'(event, instance) {
    // Clear free floating tooltips
    $('.drop.drop-element.drop-enabled').remove();
  },

  'click .guest-set-password-btn'(event, instance) {
    instance.$('.guestSignOffConfirmModal').modal('hide');
    Router.go('/guestSettings');
  },

  'click .disable-floating-text'(event, instance) {
    Session.set('floatingTextDisabled', true);
  },

  'click .enable-floating-text'(event, instance) {
    Session.set('floatingTextDisabled', false);
  },

  'click .disable-summary-list'(event, instance) {
    Session.set('summaryListDisabled', true);
    Meteor.call('users.setUiState', 'showSummaryList', false);
  },

  'click .enable-summary-list'(event, instance) {
    Session.set('summaryListDisabled', false);
    Meteor.call('users.setUiState', 'showSummaryList', true);
  },

  'click .guestSignOffConfirmModal #at-nav-button'(event, instance) {
    instance.$('.guestSignOffConfirmModal').modal('hide');
  }
})

Template.nav.helpers({
  currentRoute() {
    return Router.current().route.getName();
  },

  hasCraftingSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'crafting' });
    } else {
      return true;
    }
  },

  floatingTextDisabled() {
    return Session.get('floatingTextDisabled');
  },

  summaryListDisabled() {
    return Session.get('summaryListDisabled');
  },

  hasFarmingSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'farming' });
    } else {
      return true;
    }
  },

  hasInscriptionSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'inscription' });
    } else {
      return true;
    }
  },

  combinedGems() {
    return Meteor.user().gems + (Meteor.user().fakeGems || 0);
  },

  hasAttackSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'attack' });
    } else {
      return true;
    }
  }
});
