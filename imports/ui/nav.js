import { Template } from 'meteor/templating';
import { Skills } from '/imports/api/skills/skills.js';
import { Session } from 'meteor/session';
import { Users } from '/imports/api/users/users.js';
import { Groups } from '/imports/api/groups/groups.js';
import { Servers, DEFAULT_SERVER, CLASSIC_SERVER } from '/imports/api/servers/servers.js';
import { Meteor } from "meteor/meteor";
import { ReactiveDict } from 'meteor/reactive-dict';

import './nav.html';

Template.nav.onCreated(function bodyOnCreated() {
  Meteor.subscribe("userData");
  Meteor.subscribe("servers");

  this.state = new ReactiveDict();

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.showSummaryList !== undefined) {
        Session.set('summaryListDisabled', !myUser.uiState.showSummaryList);
      } else {
        Session.set('summaryListDisabled', false);
      }
      if (myUser.uiState && myUser.uiState.recipeTileConsumables !== undefined) {
        Session.set('recipeTileConsumablesDisabled', !myUser.uiState.recipeTileConsumables);
      } else {
        Session.set('recipeTileConsumablesDisabled', false);
      }
      if (myUser.uiState && myUser.uiState.showNumberShorthand !== undefined) {
        Session.set('numberShorthandDisabled', !myUser.uiState.showNumberShorthand);
      } else {
        Session.set('numberShorthandDisabled', false);
      }
      if (myUser.uiState && myUser.uiState.wantCondensedChat !== undefined) {
        Session.set('wantCondensedChat', myUser.uiState.wantCondensedChat);
      } else {
        Session.set('wantCondensedChat', true);
      }
    }
  });

  Tracker.autorun(() => {
    if(Meteor.user()) {
      const server = Servers.findOne({ _id: Meteor.user().server });
      if(server) {
        this.state.set('myServer', server);
      }
    }
  })
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
  
  'click .disable-condensed-chat'(event, instance) {
    Session.set('wantCondensedChat', false);
    Meteor.call('users.setUiState', 'wantCondensedChat', false);
  },

  'click .enable-condensed-chat'(event, instance) {
    Session.set('wantCondensedChat', true);
    Meteor.call('users.setUiState', 'wantCondensedChat', true);
  },

  'click .disable-recipe-consumables'(event, instance) {
    Session.set('recipeTileConsumablesDisabled', true);
    Meteor.call('users.setUiState', 'recipeTileConsumables', false);
  },

  'click .enable-recipe-consumables'(event, instance) {
    Session.set('recipeTileConsumablesDisabled', false);
    Meteor.call('users.setUiState', 'recipeTileConsumables', true);
  },

  'click .disable-number-shorthand'(event, instance) {
    Session.set('numberShorthandDisabled', true);
    Meteor.call('users.setUiState', 'showNumberShorthand', false);
  },

  'click .enable-number-shorthand'(event, instance) {
    Session.set('numberShorthandDisabled', false);
    Meteor.call('users.setUiState', 'showNumberShorthand', true);
  },

  'click .guestSignOffConfirmModal #at-nav-button'(event, instance) {
    instance.$('.guestSignOffConfirmModal').modal('hide');
  },

  'click .battle-nav-link'(event, instance) {
    Session.set('lobbyPageSetter', 'loadout');
 },
});

Template.nav.helpers({
  currentRoute() {
    return Router.current().route.getName();
  },

  currentTutorialStep() {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    return myUser.tutorial ? myUser.tutorial.currentStep : 10000;
  },
  
  canSeeCombat() {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    return ((myUser.tutorial) ? ((myUser.tutorial.hideCombat) ? false : true) : (true)); // don't simplify this, properties may not exist and need non-false defaults
  },
  
  canSeeCrafting() {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    return ((myUser.tutorial) ? ((myUser.tutorial.hideCrafting) ? false : true) : (true)); // don't simplify this, properties may not exist and need non-false defaults
  },
  
  canSeeInscription() {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    return ((myUser.tutorial) ? ((myUser.tutorial.hideInscription) ? false : true) : (true)); // don't simplify this, properties may not exist and need non-false defaults
  },
  
  canSeeFarming() {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    return ((myUser.tutorial) ? ((myUser.tutorial.hideFarming) ? false : true) : (true)); // don't simplify this, properties may not exist and need non-false defaults
  },
  
  canSeeWoodcutting() {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    return ((myUser.tutorial) ? ((myUser.tutorial.hideWoodcutting) ? false : true) : (true)); // don't simplify this, properties may not exist and need non-false defaults
  },
  
  canSeeEntireGameMenu() {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    return ((myUser.tutorial) ? ((myUser.tutorial.currentStep >= 10000) ? true : false) : (true));
  },

  isAdmin() {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    return myUser && myUser.isSuperMod;
  },

  beforeNextSeasonAlert() {
    return false; // disabling this in favor of serverAnnounce() helper instead
    const myServer = Servers.findOne({
      _id: Meteor.user().server
    });

    if (myServer && myServer.name === CLASSIC_SERVER) {
      return moment().isBefore(moment('2019-03-15'));
    }

    return false;
  },

  serverName() {
    let serverName = DEFAULT_SERVER;
    if (Template.instance().state.get('myServer')) {
      serverName = Template.instance().state.get('myServer').name;
    }
    return serverName;
  },
  
  serverAnnounce() {
    let serverAnnounceText;
    if (Template.instance().state.get('myServer')) {
      serverAnnounceText = Template.instance().state.get('myServer').announcement;
    }
    return ((serverAnnounceText && (serverAnnounceText.trim().length > 0)) ? serverAnnounceText : false);
  },

  showPendingInvites() {
    const invitedToGroups = Groups.find({
      invites: Meteor.userId()
    }).fetch();

    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    return (!currentGroup && invitedToGroups.length > 0);
  },

  hasAttackSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'attack' });
    } else {
      return true;
    }
  },
  
  hasCraftingSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'crafting' });
    } else {
      return true;
    }
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
    return (Meteor.user().gems || 0) + (Meteor.user().fakeGems || 0);
  },

  floatingTextDisabled() {
    return Session.get('floatingTextDisabled');
  },

  summaryListDisabled() {
    return Session.get('summaryListDisabled');
  },

  wantCondensedChat() {
    return Session.get('wantCondensedChat');
  },

  numberShorthandDisabled() {
    return Session.get('numberShorthandDisabled');
  },

  recipeTileConsumablesDisabled() {
    return Session.get('recipeTileConsumablesDisabled')
  },  
});
