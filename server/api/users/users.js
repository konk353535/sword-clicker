import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import moment from 'moment';

import { Users, UserGames } from '/imports/api/users/users';
import { Friends } from '/imports/api/friends/friends';
import { BlackList } from '/imports/api/blacklist/blacklist';
import { Skills } from '/imports/api/skills/skills';
import { Combat } from '/imports/api/combat/combat';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';
import { Mining } from '/imports/api/mining/mining';
import { Clans } from '/imports/api/clans/clans';
import { Games } from '/imports/api/games/games';

import { addXp } from '/server/api/skills/skills.js';
import { addItem } from '/server/api/items/items.js';

Meteor.methods({

  'users.initUiState'() {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    UserGames.update({
      owner,
      game,
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
    const clientIp = this.connection.clientAddress;

    if (BlackList.findOne({ clientIp })) {
      throw new Meteor.Error('something-is-wrong', 'Something went wrong, sorry :|');
    }

    return Accounts.createUser({
      username,
      password,
      isGuest: true
    });
  },

  'users.updateGuest'({ username, password, email }) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

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
      owner,
      game
    }, {
      $set: {
        username: newUsername
      }
    }, { multi: true });

    Combat.update({
      owner,
      game
    }, { 
      $set: {
        username: newUsername
      }
    });

    FloorWaveScores.update({
      owner,
      game
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

  'users.search'(searchValue) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;

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
        '_id': false
      },
      limit: 5
    }).fetch();
  },

  'users.setUiState'(id, value) {
    const validIds = [
      'showChat',
      'inscriptionFilter',
      'craftingFavourites',
      'inscriptionLevelFilter',
      'craftingFilter',
      'combatTab',
      'miningTab',
      'farmingTab',
      'newCombatType',
      'magicTab',
      'achievementTab',
      'towerFloor',
      'chat-Party-show',
      'chat-General-show',
      'chat-Clan-show',
      'chat-LFG-show',
      'chat-Game-show',
      'chat-Help-show',
      'chat-Offtopic-show',
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
    ];
  
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    if (_.contains(validIds, id)) {

      const username = userDoc.username.toLowerCase();

      username.replace(' ', '_');
      username.replace('-', '_');
      username.replace('.', '_');

      const setObject = {};
      setObject[`uiState.${id}`] = value;

      UserGames.update({
        owner,
        game
      }, {
        $set: setObject
      });
    }
  }
});



const MINUTE = 60 * 1000;
const clientAddress = function clientAddress(clientAddress) {
  return true;
}

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
        'battleSecret': 1,
        'miningUpgradeTo': 1,
        'craftingUpgradeTo': 1,
        'combatUpgradeTo': 1,
        'woodcuttingUpgradeTo': 1,
        'astronomyUpgradeTo': 1,
        'farmingUpgradeTo': 1,
        'inscriptionUpgradeTo': 1,
        'isGuest': 1,
        'isMutedExpiry': 1,
        'currentGame': 1,
        'games': 1,

        'newUpdates': 1,
        'tutorial': 1,
        'gems': 1,
        'fakeGems': 1,
        'membershipTo': 1,
        'personalQuest': 1
      }
    });
  } else {
    this.ready();
  }
});

Meteor.publish('userGame', function(game) {
  return UserGames.find({
    owner: this.userId,
    game
  });
});

Meteor.publish('friendsFeed', function(data) {
  if (data === 'games') {
    const games = Games.find({
      members: this.userId,
      mainGame: false
    }).fetch();

    return UserGames.find({
      game: {
        $in: games.map((game) => game._id)
      }
    }, {
      fields: {
        'owner': 1,
        'username': 1,
        'lastAction': 1,
        'lastActionDate': 1,
        'partyId': 1
      }
    });
  }

  const userDoc = Users.findOne(this.userId);
  const owner = userDoc._id;
  const game = userDoc.currentGame;

  const myFriends = Friends.findOne({
    owner,
    game
  });

  const myClan = Clans.findOne({
    members: owner,
    game
  });

  if (!myFriends) {
    return UserGames.find({
      owner: this.userId
    }, {
      fields: {
        'gold': 1,
        'owner': 1,
        'username': 1
      }
    });
  }

  let allUsersInFeed = myFriends.friends;
  if (myClan) {
    allUsersInFeed.push(...myClan.members);
  }

  return UserGames.find({
    game,
    owner: {
      $in: myFriends.friends      
    }
  }, {
    fields: {
      'owner': 1,
      'username': 1,
      'lastAction': 1,
      'lastActionDate': 1,
      'partyId': 1
    }
  });

});
