import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import moment from 'moment';

import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';
import { Combat } from '/imports/api/combat/combat';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';
import { Mining } from '/imports/api/mining/mining';

Meteor.methods({

  'users.initUiState'() {
    Users.update({
      _id: Meteor.userId(),
      uiState: {
        $exists: false
      }
    }, {
      $set: {
        uiState: {}
      }
    });
  },

  'users.activeUsers'() {
    return Mining.find({
      lastGameUpdated: {
        $gte: moment().subtract(5, 'minutes').toDate()
      }
    }).count();
  },

  'users.createGuest'({ username, password }) {
    return Accounts.createUser({
      username,
      password,
      isGuest: true
    });
  },

  'users.updateGuest'({ username, password, email }) {
    // Make sure this account is actually a guest
    if (!Meteor.user().isGuest) {
      throw new Meteor.Error('not-guest', 'Cant update details if your not a guest');
    }

    // Update username
    Accounts.setUsername(Meteor.userId(), username);

    // Update password
    Accounts.setPassword(Meteor.userId(), password, { logout: false });

    // Update isGuest flag + add email
    Users.update(Meteor.userId(), {
      $set: {
        isGuest: false,
        emails: [{
          address: email,
          verified: false
        }]
      }
    });

    // Send email verification
    Accounts.sendVerificationEmail(Meteor.userId());

    const newUsername = Meteor.user().username;

    // Update other places in the app now that username has changed
    Skills.update({
      owner: Meteor.userId()
    }, {
      $set: {
        username: newUsername
      }
    }, { multi: true });

    Combat.update({
      owner: Meteor.userId()
    }, { 
      $set: {
        username: newUsername
      }
    });

    FloorWaveScores.update({
      owner: Meteor.userId()
    }, {
      $set: {
        username: newUsername
      }
    }, { multi: true });
  },

  'users.setUiState'(id, value) {
    const validIds = [
      'showChat',
      'inscriptionFilter',
      'inscriptionLevelFilter',
      'craftingFilter',
      'combatTab',
      'magicTab',
      'towerFloor',
      'questLevel',
      'craftingTierFilter.primitive',
      'craftingTierFilter.copper',
      'craftingTierFilter.tin',
      'craftingTierFilter.bronze',
      'craftingTierFilter.iron',
      'craftingTierFilter.silver',
      'craftingTierFilter.gold',
      'craftingTierFilter.carbon',
      'craftingTierFilter.steel',
      'craftingTierFilter.platinum',
      'craftingTierFilter.titanium',
      'craftingTierFilter.tungsten',
      'craftingTierFilter.obsidian',
      'craftingTierFilter.cobalt',
      'craftingTierFilter.mithril',
      'craftingTierFilter.adamantium',
      'craftingTierFilter.orichalcum',
      'craftingTierFilter.meteorite',
      'craftingTierFilter.fairy_steel',
      'craftingTierFilter.elven_steel',
      'craftingTierFilter.cursed'
    ];

    if (_.contains(validIds, id)) {
      const setObject = {
        username: Meteor.user().username.toLowerCase()
      }
      setObject[`uiState.${id}`] = value;

      Users.update({
        _id: Meteor.userId()
      }, {
        $set: setObject
      });
    }
  }
})

const MINUTE = 60 * 1000;
// DDPRateLimiter.addRule({ type: 'method', name: 'users.updateGuest' }, 10, 2 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'users.createGuest' }, 3, 60 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'users.initUiState' }, 10, 10 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'users.activeUsers' }, 10, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'users.setUiState' }, 50, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'userData' }, 50, 1 * MINUTE);

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        'gold': 1,
        'uiState': 1,
        'gems': 1,
        'membershipTo': 1,
        'personalQuest': 1,
        'miningUpgradeTo': 1,
        'craftingUpgradeTo': 1,
        'combatUpgradeTo': 1,
        'woodcuttingUpgradeTo': 1,
        'farmingUpgradeTo': 1,
        'inscriptionUpgradeTo': 1,
        'isGuest': 1,
        'isMutedExpiry': 1
      }
    });
  } else {
    this.ready();
  }
});
