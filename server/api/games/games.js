import { Skills } from '/imports/api/skills/skills.js';
import { State } from '/imports/api/state/state.js';
import { BlackList } from '/imports/api/blacklist/blacklist.js';
import { Floors } from '/imports/api/floors/floors.js';
import { Mining, MiningSpace } from '/imports/api/mining/mining.js';
import { Crafting } from '/imports/api/crafting/crafting.js';
import { Combat } from '/imports/api/combat/combat.js';
import { Adventures } from '/imports/api/adventures/adventures.js';
import { Abilities } from '/imports/api/abilities/abilities.js';
import { Items } from '/imports/api/items/items.js';
import { Games, GameInvites } from '/imports/api/games/games.js';
import { Users, UserGames } from '/imports/api/users/users';

import { addItem } from '/server/api/items/items.js';
import { updateMiningStats } from '/server/api/mining/mining.js';
import { updateCombatStats } from '/server/api/combat/combat.js';

import { MINING } from '/server/constants/mining/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { SKILLS } from '/server/constants/skills/index.js';
import { FLOORS } from '/server/constants/floors/index.js';
import { STATE_BUFFS } from '/imports/constants/state';

export const createGame = function createGame(name, owner, mainGame = false) {
  const gameId = Games.insert({
    name,
    mainGame,
    members: []
  });

  // Create associated first floor
  Floors.insert({
    game: gameId,
    createdAt: new Date(),
    floor: 1,
    points: 0,
    pointsMax: 1000,
    health: 1000,
    healthMax: 1000,
    floorComplete: false
  });

  const user = Users.findOne({
    _id: owner
  });

  if (!mainGame) {
    joinGame(gameId, owner, user.username);
  }
}

export const joinGame = function joinGame(game, owner, username) {

  Users.update(owner, {
    $push: {
      games: games
    }
  });

  Games.update(game, {
    $push: {
      members: owner
    }
  });

  UserGames.insert({
    owner,
    game,
    username,
    uiState: {
      showChat: true,
      craftingFilter: 'mining'
    },
    gold: 0,
    floor: 1
  });

  // Mining stuff
  Skills.insert({
    type: 'mining',
    createdAt: new Date(),
    owner,
    game,
    xp: 0,
    username
  });

  Mining.insert({
    owner,
    game,
    collector: {
      stone: 1
    },
    storage: {},
    lastGameUpdated: new Date(),
    miners: [{
      id: MINING.miners.primitive_miner.id,
      amount: 1
    }],
    prospecting: ['stone']
  });

  MiningSpace.insert({
    owner,
    game,
    oreId: MINING.ores.stone.id,
    health: MINING.ores.stone.healthMax,
    index: 0
  });

  for (let i = 1; i < 12; i++) {
    MiningSpace.insert({
      owner,
      game,
      oreId: MINING.ores.stone.id,
      health: MINING.ores.stone.healthMax,
      index: i
    }, (err, res) => {
      
    });
  }

  addItem(ITEMS['sharp_rock_pickaxe'].id, 1, owner, game);

  Items.update({
    owner,
    game,
    itemId: ITEMS['sharp_rock_pickaxe'].id
  }, {
    $set: {
      equipped: true,
      slot: ITEMS['sharp_rock_pickaxe'].slot
    }
  });

  // Update mining stats
  updateMiningStats(owner, game, true);

  // Non mining stuff
  Skills.insert({
    type: 'defense',
    createdAt: new Date(),
    owner,
    game,
    username: username
  }, (err, res) => {
    Skills.insert({
      type: 'attack',
      createdAt: new Date(),
      owner,
      game,
      username: username
    });

    Skills.insert({
      type: 'health',
      createdAt: new Date(),
      owner,
      game,
      level: SKILLS.health.baseLevel,
      username: username
    });

    Skills.insert({
      type: 'crafting',
      createdAt: new Date(),
      owner,
      game,
      username: username
    });

    Skills.insert({
      type: 'total',
      createdAt: new Date(),
      owner,
      game,
      username: username
    });

    Crafting.insert({
      owner,
      game,
      currentlyCrafting: []
    });

    Combat.insert({
      towerContributions: [],
      owner,
      game,
      stats: {
        health: 50,
        healthMax: 50,
        energy: 40
      }
    });

    Adventures.insert({
      owner,
      game,
      adventures: [],
      lastGameUpdated: moment().subtract(2000, 'seconds').toDate(),
      timeTillUpdate: 60 * 3
    });

    Abilities.insert({
      owner,
      game,
      learntAbilities: [{
        "abilityId": "slash",
        "level": 1,
        "equipped": false,
        "slot": "mainHand",
        "currentCooldown": 0
      }]
    });

    // Update combat stats
    updateCombatStats(owner, game, username);
  });
}

Meteor.methods({

  'games.updateName'(game, name) {
    const targetGame = Games.findOne({
      _id: game,
      members: Meteor.userId(),
      mainGame: false
    });

    if (!targetGame) {
      throw new Meteor.Error('access-denied', 'Your not in this game');
    }

    if (name.length < 3 || !/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(name)) {
      throw new Meteor.Error('invalid-name', 'Invalid name');
    }

    Games.update(game, {
      $set: {
        name: name
      }
    });
  },

  'games.accept'(inviteId) {
    const userDoc = Meteor.user();

    const gameInvite = GameInvites.findOne({
      _id: inviteId,
      invitee: userDoc._id
    });

    joinGame(gameInvite.game, gameInvite.invitee, userDoc.username);

    GameInvites.remove({
      _id: gameInvite._id
    });
  },

  'games.switch'(game) {
    const inGame = Games.findOne({
      _id: game,
      members: Meteor.userId()
    });

    if (inGame) {
      Users.update(Meteor.userId(), {
        $set: {
          currentGame: game
        }
      });
    }
  },

  'games.decline'(inviteId) {
    const userDoc = Meteor.user();
    GameInvites.remove({
      _id: inviteId,
      invitee: userDoc._id
    })
  },

  'games.create'(name) {
    const userDoc = Meteor.user();

    createGame(name, userDoc._id);
  },

  'games.invite'(game, username) {
    const myGame = Games.findOne({
      _id: game,
      members: this.userId
    });

    if (!myGame) {
      throw new Meteor.Error('game-does-not-exist', 'Game does not exist');
    }

    const targetUser = Users.findOne({
      username: username.toLowerCase(),
    });

    if (!targetUser) {
      throw new Meteor.Error('target-user', 'Target user does not exist');
    }

    if (UserGames.findOne({
      owner: targetUser._id,
      game
    })) {
      throw new Meteor.Error('user-already-in-game', 'User already in this game');      
    }

    if (GameInvites.findOne({
      game,
      invitee: targetUser._id
    })) {
      throw new Meteor.Error('game-invited', 'Existing game invite');
    }

    GameInvites.insert({
      game,
      gameName: myGame.name,
      inviteeName: targetUser.username,
      invitee: targetUser._id,
      inviterName: Meteor.user().username
    });
  }
});

Meteor.publish('gameInvites', function(justMe = false) {

  if (justMe) {
    return GameInvites.find({
      invitee: this.userId
    });
  }

  const myGames = Games.find({
    members: this.userId,
    mainGame: false
  }).fetch();

  return GameInvites.find({
    $or: [{
      invitee: this.userId
    }, {
      game: {
        $in: myGames.map(game => game._id)
      }
    }]
  });
});

Meteor.publish('games', function() {
  var transform = function(doc) {
    doc.floor = Floors.findOne({
      floorComplete: false,
      game: doc._id
    }).floor;
    doc.activeCount = UserGames.find({
      game: doc._id,
      lastActionDate: {
        $gte: moment().subtract(24, 'hours').toDate()
      }
    }).count();
    doc.onlineCount = UserGames.find({
      game: doc._id,
      lastActionDate: {
        $gte: moment().subtract(5, 'minutes').toDate()
      }
    }).count();
    return doc;
  }

  var self = this;

  var observer = Games.find({
    members: this.userId
  }).observe({
      added: function (document) {
      self.added('games', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('games', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('games', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
