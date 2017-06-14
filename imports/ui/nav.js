import { Template } from 'meteor/templating';
import { Skills } from '/imports/api/skills/skills.js';
import { Session } from 'meteor/session';

import './nav.html';

Template.nav.onCreated(function bodyOnCreated() {
  Meteor.subscribe("userData");
});

Template.nav.events({
  'click .guest-sign-out-btn'(event, instance) {
    // Show confirm logout modal for guest sign out
    instance.$('.guestSignOffConfirmModal').modal('show');
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

  hasAttackSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'attack' });
    } else {
      return true;
    }
  }
});
