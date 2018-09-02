import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import moment from 'moment';
import { Random } from 'meteor/random';

import { Floors } from '/imports/api/floors/floors';
import { Events } from '/imports/api/events/events';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';

import { Battles, RedisBattles, BattlesList } from '/imports/api/battles/battles';
import { BattleActionsSchema } from '/imports/api/battles/battleActions';
import { Groups } from '/imports/api/groups/groups';
import { Servers } from '/imports/api/servers/servers';

import { ITEMS } from '/server/constants/items';
import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { FLOORS } from '/server/constants/floors/index.js'; // List of floor details
import { ENEMIES } from '/server/constants/enemies/index.js'; // List of enemies

import { startBattle } from './battleMethods/startBattle';
import { progressBattle } from './battleMethods/progressBattle';

const redis = new Meteor.RedisCollection('redis');

const setBattleAgain = function(floor, room) {
  Meteor.call('users.setUiState', 'battleAgain', {floor: floor, room: room});
};

export const resumeBattle = function(id) {
  // Find the battle
  const rawBattle = redis.get(`battles-${id}`);
  let actualBattle;
  if (rawBattle) {
    actualBattle = JSON.parse(rawBattle);
  }

  let isUpdatedStale;
  let isCreatedStale;

  if (actualBattle) {
    isUpdatedStale = moment().isAfter(moment(actualBattle.updatedAt).add(60, 'seconds'));
    isCreatedStale = moment().isAfter(moment(actualBattle.createdAt).add(15, 'minutes'));
  }

  // If an unknown error occurs and this battle isn't updated for 30 seconds, end it!
  if (isUpdatedStale || isCreatedStale || !actualBattle) {
    console.log('--------- Ending Battle Early!!! -------------');
    if (isUpdatedStale) {
      console.log('Reason: Is updated stale');
      console.log(`Now = ${moment().toDate()}`);
      console.log(`Last updated = ${moment(actualBattle.updatedAt).toDate()}`);
    } else {
      console.log('Reason: Is created stale');
      console.log(`Now = ${moment().toDate()}`);
      console.log(`Created at = ${moment(actualBattle.createdAt).toDate()}`);
    }

    // Remove from battle list
    BattlesList.remove(actualBattle._id);
    // Remove from redis
    redis.del(`battles-${actualBattle._id}`);
    return;
  }

  // Progress battle
  const battleIntervalId = Meteor.setInterval(() => {
    progressBattle(actualBattle, battleIntervalId);
  }, BATTLES.tickDuration); // Tick Duration ( Should be 250 by default )
};

Meteor.methods({

  'battles.findPersonalBattle'(level) {
    const userDoc = Meteor.user();

    // Ensure user has access to specified wave
    const maxLevel = userDoc.personalQuest.level;
    const maxWave = userDoc.personalQuest.wave;

    if (userDoc.logEvents) {
      Events.insert({
        owner: this.userId,
        event: 'battle.personal.start',
        date: new Date(),
        data: { level }
      }, () => {})
    }

    if (level > maxLevel) {
      throw new Meteor.Error("no-sir", "You are not up to the specified level");
    } else if (level <= 0) {
      throw new Meteor.Error("no-sir", "Cannot select a level below 1");      
    }

    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    if (currentGroup && currentGroup.members.length > 1) {
      throw new Meteor.Error("only-alone", "You can only do personal quests alone");
    }

    if (level === maxLevel) {
      wave = maxWave;
    } else {
      wave = _.random(1, 5);
    }

    const server = userDoc.server;

    startBattle({ level, wave, server });
  },

  'battles.findTowerBattle'(floor, room) {
    const userDoc = Meteor.user();

    if (Meteor.user().logEvents) {
      Events.insert({
        owner: this.userId,
        event: 'battle.tower.start',
        date: new Date(),
        data: { floor, room }
      }, () => {})
    }

    // Ensure the floor specified is currently open
    const currentCommunityFloor = Floors.findOne({ floorComplete: false, server: Meteor.user().server });

    if (floor > currentCommunityFloor.floor) {
      throw new Meteor.Error("no-sir", "Don't have access to that floor!");
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

    const server = userDoc.server;

    if (room === 'boss') {
      if (currentCommunityFloor.floor === floor && canBossBattle) {
        const bossHealth = currentCommunityFloor.healthMax;

        return startBattle({ floor, room, server, health: bossHealth, isTowerContribution: true, isOldBoss: false });
      } else if (floor < currentCommunityFloor.floor) {
        const bossId = FLOORS[floor].boss.enemy.id;
        if (bossId) {
          const bossConstants = ENEMIES[bossId];
          const bossHealth = bossConstants.stats.healthMax * 11;

          return startBattle({ floor, room, server, health: bossHealth, isTowerContribution: true, isOldBoss: true });
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
      return startBattle({ floor, room, server, isTowerContribution, isExplorationRun });
    }

    // Eventually select a random battle appropriate to users level
    startBattle({ floor, room, server, isTowerContribution, isExplorationRun });
  },

  'battles.getWaveDetails'() {
    const currentFloor = Floors.findOne({ floorComplete: false, server: Meteor.user().server });

    return {
      points: Math.floor(currentFloor.points),
      pointsMax: currentFloor.pointsMax,
      maxFloor: currentFloor.floor
    }
  },

  'battles.getFloorDetails'(floorNumber = 1) {
    // Fetch specified floor details ( constants + current floor details )
    const currentFloor = Floors.findOne({ floorComplete: false, server: Meteor.user().server });

    // Can't access floors the community hasn't got to yet
    if (currentFloor.floor < floorNumber) {
      return;
    }

    const specifiedFloorConstants = FLOORS[floorNumber];

    if (currentFloor.floor === floorNumber) {
      return {
        waveDetails: {
          health: currentFloor.health,
          healthMax: currentFloor.healthMax,
          points: Math.floor(currentFloor.points),
          pointsMax: currentFloor.pointsMax,
          bossResetAt: currentFloor.bossResetAt
        },
        floorDetails: {
          rewards: currentFloor.loot.map(function(reward) {
            if (reward.type === 'item') {
              reward.icon = ITEMS[reward.itemId].icon;
              reward.name = ITEMS[reward.itemId].name;
              reward.extraStats = ITEMS[reward.itemId].extraStats;
              reward.description = ITEMS[reward.itemId].description;
            }
            return reward;
          }),
          unlocks: specifiedFloorConstants.hasOwnProperty('unlocks') ? specifiedFloorConstants.unlocks : true,
          1: { name: specifiedFloorConstants[1].name },
          2: { name: specifiedFloorConstants[2].name },
          3: { name: specifiedFloorConstants[3].name },
          4: { name: specifiedFloorConstants[4].name },
          5: { name: specifiedFloorConstants[5].name },
          6: { name: specifiedFloorConstants[6].name },
          7: { name: specifiedFloorConstants[7].name }
        },
        maxFloor: currentFloor.floor
      }
    }

    return {
      floorDetails: {
        unlocks: specifiedFloorConstants.hasOwnProperty('unlocks') ? specifiedFloorConstants.unlocks : true,
        1: { name: specifiedFloorConstants[1].name },
        2: { name: specifiedFloorConstants[2].name },
        3: { name: specifiedFloorConstants[3].name },
        4: { name: specifiedFloorConstants[4].name },
        5: { name: specifiedFloorConstants[5].name },
        6: { name: specifiedFloorConstants[6].name },
        7: { name: specifiedFloorConstants[7].name }
      },
      maxFloor: currentFloor.floor
    }
  },

  'battles.currentFloorHighscores'(showAll200) {
    let limit = 20;
    if (showAll200) {
      limit = 200;
    }
    // Fetch current active floor
    const currentFloor = Floors.findOne({ floorComplete: false, server: Meteor.user().server });

    // Fetch top 10 for each difficulty
    return FloorWaveScores.find({
      floor: currentFloor.floor,
      server: Meteor.user().server
    }, {
      sort: {
        points: -1
      },
      limit
    }).fetch()
  },

  'battles.myFloorContributions'() {
    const server = Meteor.user().server;
    // current floor contribution + ranking
    const currentCommunityFloor = Floors.findOne({ floorComplete: false, server });
    // Fetch there waveScores
    const userWaveScores = FloorWaveScores.findOne({
      owner: Meteor.userId(),
      server,
      floor: currentCommunityFloor.floor
    });

    if (userWaveScores) {
      // Get ranking
      const userRanking = FloorWaveScores.find({
        server,
        floor: currentCommunityFloor.floor,
        points: {
          $gte: userWaveScores.points
        }
      }).count();

      // Total Rankings
      const totalRankings = FloorWaveScores.find({
        server,
        floor: currentCommunityFloor.floor,
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
  },

  'battles.castAbility'(battleId, abilityId, options) {
    if (options.caster !== Meteor.userId()) {
      throw new Meteor.Error("battle-not-found", "That's not you!");
    }

    if (options.caster && options.caster !== Meteor.userId()) {
      throw new Meteor.Error("access-denied", "You do not have control of that caster");
    }

    let existingActions = [];
    let rawRedis = redis.get(`battleActions-${battleId}`);
    if (rawRedis) {
      existingActions = JSON.parse(rawRedis);
    }

    const obj = {
      battleId,
      abilityId,
      caster: options.caster,
      target: options.target,
      targets: options.targets
    };

    check(obj, BattleActionsSchema);

    existingActions.push(obj);
    redis.set(`battleActions-${battleId}`, JSON.stringify(existingActions));
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
  return Battles.find({
    owners: this.userId
  }, {
    limit: 25,
    sort: {
      updatedAt: -1
    }
  });
});

Meteor.publish('battlesList', function () {
  return BattlesList.find({
    owners: this.userId
  });
});

Meteor.publish('servers', function () {
  return Servers.find();
});

Meteor.publish("redis-battles", function (currentBattle) {
  return redis.matching(`battles-${currentBattle._id}`);
});

