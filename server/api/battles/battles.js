import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import moment from 'moment';
import { Random } from 'meteor/random';

import { Floors } from '/imports/api/floors/floors';
import { Events } from '/imports/api/events/events';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';

import { Battles, BattlesList } from '/imports/api/battles/battles';
import { BattleActions, BattleActionsSchema } from '/imports/api/battles/battleActions';
import { Groups } from '/imports/api/groups/groups';
import { Users, UserGames } from '/imports/api/users/users';

import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { FLOORS } from '/server/constants/floors/index.js'; // List of floor details
import { ENEMIES } from '/server/constants/enemies/index.js'; // List of enemies

import { startBattle } from './battleMethods/startBattle';

const setBattleAgain = function(floor, room) {
  Meteor.call('users.setUiState', 'battleAgain', {floor: floor, room: room});
};

Meteor.methods({

  'battles.findPersonalBattle'(level) {
    const userDoc = Meteor.user();

    const userGame = UserGames.findOne({
      owner: userDoc._id,
      game: userDoc.currentGame
    });

    // Ensure user has access to specified wave
    const maxLevel = userGame.personalQuest.level;
    const maxWave = userGame.personalQuest.wave;

    if (userDoc.logEvents) {
      Events.insert({
        owner: userDoc._id,
        event: 'battle.personal.start',
        date: new Date(),
        data: { level }
      }, () => {})
    }

    if (level > maxLevel) {
      throw new Meteor.Error("no-sir", "You are not up to the specified level");
    } else if (level <= 0) {
      throw new Meteor.Error("no-sir", "Cannot select a level below 1");      
    } else if (!_.isFinite(level)) {
      throw new Meteor.Error("no-sir", "Level must be a finite number");      
    }

    const currentGroup = Groups.findOne({
      members: userDoc._id,
      game: userDoc.currentGame
    });

    if (currentGroup && currentGroup.members.length > 1) {
      throw new Meteor.Error("only-alone", "You can only do personal quests alone");
    }

    if (level === maxLevel) {
      wave = maxWave;
    } else {
      wave = _.random(1, 5);
    }

    startBattle({ level, wave, userDoc });
  },

  'battles.findTowerBattle'(floor, room) {
    const userDoc = Meteor.user();
    if (userDoc.logEvents) {
      Events.insert({
        owner: userDoc._id,
        event: 'battle.tower.start',
        date: new Date(),
        data: { floor, room }
      }, () => {})
    }

    // Ensure the floor specified is currently open
    const currentCommunityFloor = Floors.findOne({ floorComplete: false });

    if (floor > currentCommunityFloor.floor) {
      throw new Meteor.Error("no-sir", "Dont have access to that floor!");
    } else if (room > 7 || room < 0) {
      throw new Meteor.Error("no-sir", "Invalid specified room");
    }

    setBattleAgain(floor, room);

    let isExplorationRun = false;
    if (room === 0) {
      isExplorationRun = true;
      room = 1;
    }

    let isTowerContribution = false;
    let canBossBattle = false;

    if (currentCommunityFloor.floor === floor) {
      // If battling the current floor, this must be an exploration run (if not boss)
      if (room !== 'boss') {
        room = 1;
        isExplorationRun = true;
      }

      // As this is the current floor, it can be possible to gain points
      isTowerContribution = true;
      if (currentCommunityFloor.points >= currentCommunityFloor.pointsMax) {
        canBossBattle = true;
      }      
    }

    if (room === 'boss') {
      if (currentCommunityFloor.floor === floor && canBossBattle) {
        const bossHealth = currentCommunityFloor.health;

        return startBattle({ floor, room, health: bossHealth, isTowerContribution: true, isOldBoss: false });
      } else if (floor < currentCommunityFloor.floor) {
        const bossId = FLOORS[floor].boss.enemy.id;
        if (bossId) {
          const bossConstants = ENEMIES[bossId];
          const bossHealth = bossConstants.stats.healthMax * 11;

          return startBattle({ floor, room, health: bossHealth, isTowerContribution: true, isOldBoss: true });
        } else {
          return;
        }
      } else {
        throw new Meteor.Error("no-sir", "Cannot boss battle before clearing all waves");
      }
    }
    
    // if floor doesn't unlock, start at room 1 always
    if (FLOORS[floor].hasOwnProperty('unlocks') && !FLOORS[floor].unlocks) {
      isExplorationRun = true;
      room = 1;
      return startBattle({ floor, room, isTowerContribution, isExplorationRun, userDoc });
    }

    // Eventually select a random battle appropriate to users level
    startBattle({ floor, room, isTowerContribution, isExplorationRun, userDoc });
  },

  'battles.getWaveDetails'() {
    const userDoc = Meteor.user();
    const currentFloor = Floors.findOne({
      floorComplete: false,
      game: userDoc.currentGame
    });

    return {
      points: Math.floor(currentFloor.points),
      pointsMax: currentFloor.pointsMax,
      maxFloor: currentFloor.floor
    }
  },

  'battles.getFloorDetails'(floorNumber = 1) {
    const userDoc = Meteor.user();
    // Fetch specified floor details ( constants + current floor details )
    const currentFloor = Floors.findOne({ floorComplete: false, game: userDoc.currentGame });

    // Can't access floors the community hasn't got to yet
    if (currentFloor.floor < floorNumber) {
      return;
    }

    const specifiedFloorConstants = FLOORS[floorNumber];

    if (currentFloor.floor == floorNumber) {
      return {
        waveDetails: {
          health: currentFloor.health,
          healthMax: currentFloor.healthMax,
          points: Math.floor(currentFloor.points),
          pointsMax: currentFloor.pointsMax
        },
        floorDetails: {
          rewards: specifiedFloorConstants.floorRewards,
          unlocks: specifiedFloorConstants.hasOwnProperty('unlocks') ? specifiedFloorConstants.unlocks : true,
          isUnlocked: false,
          rooms: [
            { room: 1, name: specifiedFloorConstants[1].name },
            { room: 2, name: specifiedFloorConstants[2].name },
            { room: 3, name: specifiedFloorConstants[3].name },
            { room: 4, name: specifiedFloorConstants[4].name },
            { room: 5, name: specifiedFloorConstants[5].name },
            { room: 6, name: specifiedFloorConstants[6].name },
            { room: 7, name: specifiedFloorConstants[7].name }
          ]
        },
        maxFloor: currentFloor.floor
      }
    }

    return {
      floorDetails: {
        unlocks: specifiedFloorConstants.hasOwnProperty('unlocks') ? specifiedFloorConstants.unlocks : true,
        isUnlocked: true,
        rooms: [
          { room: 1, name: specifiedFloorConstants[1].name },
          { room: 2, name: specifiedFloorConstants[2].name },
          { room: 3, name: specifiedFloorConstants[3].name },
          { room: 4, name: specifiedFloorConstants[4].name },
          { room: 5, name: specifiedFloorConstants[5].name },
          { room: 6, name: specifiedFloorConstants[6].name },
          { room: 7, name: specifiedFloorConstants[7].name }
        ]
      },
      maxFloor: currentFloor.floor
    }
  },

  'battles.currentFloorHighscores'(showAll200) {
    const userDoc = Meteor.user();
    let limit = 20;
    if (showAll200) {
      limit = 200;
    }
    // Fetch current active floor
    const currentFloor = Floors.findOne({ floorComplete: false, game: userDoc.currentGame });

    // Fetch top 10 for each difficulty
    return FloorWaveScores.find({
      floor: currentFloor.floor,
      game: userDoc.currentGame
    }, {
      sort: {
        points: -1
      },
      limit
    }).fetch()
  },

  'battles.myFloorContributions'() {
    const userDoc = Meteor.user();
    // current floor contribution + ranking
    const currentCommunityFloor = Floors.findOne({ floorComplete: false, game: userDoc.currentGame });
    // Fetch there waveScores
    const userWaveScores = FloorWaveScores.findOne({
      owner: userDoc._id,
      game: userDoc.currentGame,
      floor: currentCommunityFloor.floor
    });

    if (userWaveScores) {
      // Get ranking
      const userRanking = FloorWaveScores.find({
        floor: currentCommunityFloor.floor,
        game: userDoc.currentGame,
        points: {
          $gte: userWaveScores.points
        }
      }).count();

      // Total Rankings
      const totalRankings = FloorWaveScores.find({
        floor: currentCommunityFloor.floor,
        game: userDoc.currentGame,
        points: {
          $gte: 25
        }
      }).count();

      return {
        points: Math.round(userWaveScores.points),
        rank: userRanking,
        total: totalRankings,
        rankingPercentage: Math.min(Math.round((userRanking / totalRankings) * 100), 100)
      }
    }
  }
});

const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'battles.findPersonalBattle' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'battles.findBattle' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'battles.getWaveDetails' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'battles.getFloorDetails' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'battles.currentFloorHighscores' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'battles.castAbility' }, 50, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'battles' }, 500, 1 * MINUTE);

Meteor.publish('battles', function() {
  const userDoc = Users.findOne(this.userId);
  const owner = userDoc._id;
  const game = userDoc.currentGame;

  return Battles.find({
    owners: userDoc._id,
    game: userDoc.currentGame
  }, {
    limit: 25,
    sort: {
      updatedAt: -1
    }
  });
});

Meteor.publish('battlesList', function () {
  const userDoc = Users.findOne(this.userId);
  const owner = userDoc._id;
  const game = userDoc.currentGame;

  return BattlesList.find({
    owners: userDoc._id,
    game: userDoc.currentGame
  });
});
