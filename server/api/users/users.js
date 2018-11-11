import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import moment from 'moment';
import uuid from 'node-uuid';

import { Users } from '/imports/api/users/users';
import { BlackList } from '/imports/api/blacklist/blacklist';
import { Skills } from '/imports/api/skills/skills';
import { Combat } from '/imports/api/combat/combat';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';
import { Mining } from '/imports/api/mining/mining';
import { addXp } from '/server/api/skills/skills';
import { addItem } from '/server/api/items/items.js';

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
    const user = Users.findOne({_id: Meteor.userId()});

    if (user) {
      return Mining.find({
        server: user.server,
        lastGameUpdated: {
          $gte: moment().subtract(5, 'minutes').toDate()
        }
      }).count();      
    }

    return Mining.find({
      lastGameUpdated: {
        $gte: moment().subtract(5, 'minutes').toDate()
      }
    }).count();
  },

  'users.createGuest'() {
    const clientIp = this.connection.clientAddress;

    if (BlackList.findOne({ clientIp })) {
      throw new Meteor.Error('something-is-wrong', 'Something went wrong, sorry :|');
    }

    // Fetch a prefabbed guest
    const existingGuest = Users.findOne({
      isPreFabbedGuest: true
    });

    if (!existingGuest) {
      return;
    }

    // Set prefabbed guest to false
    Users.update(existingGuest._id, {
      $set: {
        isPreFabbedGuest: false
      }
    }, (err, res) => {});

    // Update mining to now
    Mining.update({
      owner: existingGuest._id
    }, {
      $set: {
        lastGameUpdated: new Date()
      }
    }, (err, res) => {});

    // Update password
    const tempPassword = uuid.v4();
    Accounts.setPassword(existingGuest._id, tempPassword, { logout: false });

    // Return guests username and password (Might need to set the password again)
    return {
      password: tempPassword,
      username: existingGuest.username
    }
  },

  'users.updateGuest'({ username, password, email }) {
    // Make sure this account is actually a guest
    if (!Meteor.user().isGuest) {
      throw new Meteor.Error('not-guest', 'Cant update details if you are not a guest');
    }

    if (Users.findOne({'emails.address': email})) {
      throw new Meteor.Error('email-taken', 'Cant use an already registered email');
    }

    // Update username
    Accounts.setUsername(Meteor.userId(), username);

    // Update password
    Accounts.setPassword(Meteor.userId(), password, { logout: false });

    // Update isGuest flag + add email
    Users.update(Meteor.userId(), {
      $set: {
        isGuest: false,
        isPreFabbedGuest: false,
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

  'users.readNewUpdates'() {
    Users.update(this.userId, {
      $set: {
        newUpdates: false
      }
    });
  },

  'users.tutorialUpdate'(updateObject) {

    const userDoc = Meteor.user();
    const allKeys = Object.keys(updateObject);

    const validIds = [
      'hideCrafting',
      'highlightCrafting',

      'hideWoodcutting',
      'highlightWoodcutting',

      'hideFarming',
      'highlightFarming',
      'hideFarmingPlots',
      'highlightFarmingPlots',

      'hideInscription',
      'highlightInscription',
      'hideInscriptionAbilities',
      'highlightInscriptionAbilities',
      'hideInscriptionPaper',
      'highlightInscriptionPaper',
      'hideInscriptionPigments',
      'highlightInscriptionPigments',

      'hideCombat',
      'highlightCombat',
      'highlightCombatEquipment',
      'highlightCombatAbilities',
      'highlightCombatTower',
      'highlightCombatPersonalQuest',
      'highlightCombatAdventures',

      'hideCombatEquipment',
      'hideCombatAbilities',
      'hideCombatTower',
      'hideCombatPersonalQuest',
      'hideCombatAdventures',
      'hideCombatGroup',
      'hideCombatBattleLog',

      'hideMiningEquipment',
      'highlightMiningEquipment',
      'hideMiningMiners',
      'highlightMiningMiners',
      'hideMiningProspectors',
      'highlightMiningProspectors',

      'currentStep'
    ];

    const setObject = {};

    let exitEarly = false;
    allKeys.forEach((key) => {
      if (!_.contains(validIds, key)) {
        console.log(`rejecting - ${key}`);
        exitEarly = true;
      } else if (!_.isBoolean(updateObject[key] && !_.isFinite((updateObject[key])))) {
        console.log(`rejecting - ${key}`);
        exitEarly = true;
      } else {
        if (key === 'currentStep' && updateObject[key] <= userDoc.tutorial.currentStep) {
          exitEarly = true;
        } else {
          setObject[`tutorial.${key}`] = updateObject[key];
        }
      }
    });

    if (exitEarly || !userDoc.tutorial) {
      return;
    }

    if (setObject['tutorial.currentStep'] === 16) {
      // Check users current farming level
      const farmingSkill = Skills.findOne({
        owner: Meteor.userId(),
        type: 'farming'
      });

      if (farmingSkill.level === 1) {
        addXp('farming', 21);
        addItem('pine_paper', 1, Meteor.userId());
        addItem('rubia_flower_seed', 1, Meteor.userId());
      }
    } else if (setObject['tutorial.currentStep'] === 10) {
      // Check users current farming level
      const woodcuttingSkill = Skills.findOne({
        owner: Meteor.userId(),
        type: 'woodcutting'
      });

      if (woodcuttingSkill.level === 1) {
        addXp('woodcutting', 2);
        addItem('pine_log', 1, Meteor.userId());
      }
    } else if (setObject['tutorial.currentStep'] === 2) {
      const miningSkill = Skills.findOne({
        owner: Meteor.userId(),
        type: 'mining'
      });

      if (miningSkill.level === 1) {
        addXp('mining', 21);
      }
    } else if (setObject['tutorial.currentStep'] === 18) {
      return Users.update({
        _id: Meteor.userId()
      }, {
        $unset: {
          tutorial: ""
        }
      });
    }

    Users.update({
      _id: Meteor.userId()
    }, {
      $set: setObject
    });
  },

  'users.search'(searchValue) {
    if (searchValue.length < 3 || !/^\w+$/.test(searchValue)) {
      return [];
    }

    return Users.find({
      username: {
        $regex: `${searchValue}*`
      }
    }, {
      fields: {
        'username': true,
        'lastActivity': true,
        '_id': false
      },
      limit: 5
    }).fetch();
  },

  'users.skipTutorial'() {
    Users.update({
      _id: Meteor.userId()
    }, {
      $unset: {
        tutorial: ""
      }
    });
  },

  'users.setUiState'(id, value) {
    const validIds = [
      'showChat',
      'showSummaryList',
      'showNumberShorthand',
      'inscriptionFilter',
      'inscriptionLevelFilter',
      'craftingFilter',
      'combatTab',
      'miningTab',
      'farmingTab',
      'newCombatType',
      'magicTab',
      'achievementTab',
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
      'craftingTierFilter.cursed',
      'battleAgain',
      'itemFilter',
      'miningMultihit',
      'seedsFilter',
      'miningMultihit',
      'recipeTileConsumables',
      'craftingShowMore'
    ];

    if (_.contains(validIds, id)) {

      const username = Meteor.user().username.toLowerCase();

      username.replace(' ', '_');
      username.replace('-', '_');
      username.replace('.', '_');

      const setObject = {
        username
      };
      setObject[`uiState.${id}`] = value;

      Users.update({
        _id: Meteor.userId()
      }, {
        $set: setObject
      });
      
      // update user activity
      Users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          lastActivity: moment().toDate()
        }
      });
      
    }
  }
});

const MINUTE = 60 * 1000;
const clientAddress = function clientAddress(clientAddress) {
  return true;
};

// DDPRateLimiter.addRule({ type: 'method', name: 'users.updateGuest' }, 10, 2 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'users.createGuest', clientAddress }, 3, 24 * 60 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'ATCreateUserServer', clientAddress }, 3, 24 * 60 * MINUTE);
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
        'server': 1,
        'gold': 1,
        'uiState': 1,
        'tutorial': 1,
        'battleSecret': 1,
        'newUpdates': 1,
        'gems': 1,
        'fakeGems': 1,
        'membershipTo': 1,
        'personalQuest': 1,
        'miningUpgradeTo': 1,
        'craftingUpgradeTo': 1,
        'combatUpgradeTo': 1,
        'woodcuttingUpgradeTo': 1,
        'astronomyUpgradeTo': 1,
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
