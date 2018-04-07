import { Template } from 'meteor/templating';
import { Skills } from '/imports/api/skills/skills.js';
import { Session } from 'meteor/session';
import { Users, UserGames } from '/imports/api/users/users.js';
import { Games } from '/imports/api/games/games.js';
import { Groups } from '/imports/api/groups/groups.js';
import { Meteor } from "meteor/meteor";

import './nav.html';

Template.nav.onCreated(function bodyOnCreated() {
  Meteor.subscribe("userData");
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

  'click .switch-game'(event, instance) {
    const game = instance.$(event.target).closest('.switch-game').attr('data-game');

    if (game !== Meteor.user().currentGame) {
      Meteor.call('games.switch', game);
    }
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

  gamesList() {
    return Games.find({}).map((game) => {
      game.active = game._id === Meteor.user().currentGame;

      return game;
    })
  },

  hasCraftingSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'crafting' });
    } else {
      return true;
    }
  },

  showPendingInvites() {
    const invitedToGroups = Groups.find({
      invites: Meteor.userId()
    }).fetch();

    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    return !currentGroup && invitedToGroups.length > 0
  },

  floatingTextDisabled() {
    return Session.get('floatingTextDisabled');
  },

  userGame() {
    console.log(UserGames.find({}).fetch());
    return UserGames.findOne({});
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
    const userGame = UserGames.findOne({});
    return userGame.gems + (userGame.fakeGems || 0);
  },

  hasAttackSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'attack' });
    } else {
      return true;
    }
  }
});
