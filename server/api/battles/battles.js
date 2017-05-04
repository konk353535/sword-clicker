import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import moment from 'moment';
import { Random } from 'meteor/random';

import { Floors } from '/imports/api/floors/floors';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';

import { Battles, RedisBattles, BattlesList } from '/imports/api/battles/battles';
import { BattleActions, BattleActionsSchema } from '/imports/api/battles/battleActions';
import { Groups } from '/imports/api/groups/groups';

import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { FLOORS } from '/server/constants/floors/index.js'; // List of floor details

import { startBattle } from './battleMethods/startBattle';
import { progressBattle } from './battleMethods/progressBattle';

const redis = new Meteor.RedisCollection('redis');

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
}


Meteor.methods({

  'battles.findPersonalBattle'(level, wave) {
    // Ensure user has access to specified wave
    const maxLevel = Meteor.user().personalQuest.level;
    const maxWave = Meteor.user().personalQuest.wave;

    if (level === maxLevel && wave !== maxWave) {
      throw new Meteor.Error("no-sir", "Can only fight the current wave, for levels you have not completed");
    } else if (level > maxLevel) {
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

    if (!wave) {
      wave = _.random(1, 10);
    }

    startBattle({ level, wave });
  },

  'battles.findBattle'(floor, difficulty) {
    if (!_.contains(['easy', 'hard', 'veryHard', 'boss'], difficulty)) {
      return;
    }

    // Ensure the floor specified is currently open
    const currentFloor = Floors.findOne({ floorComplete: false });

    if (floor > currentFloor.floor) {
      throw new Meteor.Error("no-sir", "Dont have access to that floor!");
    }

    let isTowerContribution = true;

    if (currentFloor[`${difficulty}Waves`] <= 0) {
      isTowerContribution = false;
    }

    if (difficulty === 'boss' && currentFloor.floor == floor) {
      let canBossBattle = false;
      if (currentFloor.easyWaves <= 0) {
        if (currentFloor.hardWaves <= 0) {
          if (currentFloor.veryHardWaves <= 0) {
            canBossBattle = true;
          }
        }
      }

      if (!canBossBattle) {
        throw new Meteor.Error("no-sir", "Cannot boss battle before clearing all waves");
      } else {
        const bossHealth = currentFloor.health;
        return  startBattle({ floor, difficulty, health: bossHealth, isTowerContribution: true });
      }
    }

    // Eventually select a random battle appropriate to users level
    startBattle({ floor, difficulty, isTowerContribution });
  },

  'battles.getWaveDetails'() {
    const currentFloor = Floors.findOne({ floorComplete: false });

    return {
      easyWaves: currentFloor.easyWaves,
      easyWavesTotal: currentFloor.easyWavesTotal,
      hardWaves: currentFloor.hardWaves,
      hardWavesTotal: currentFloor.hardWavesTotal,
      veryHardWaves: currentFloor.veryHardWaves,
      veryHardWavesTotal: currentFloor.veryHardWavesTotal,
      maxFloor: currentFloor.floor
    }
  },

  'battles.getFloorDetails'(floorNumber = 1) {
    // Fetch specified floor details ( constants + current floor details )
    const currentFloor = Floors.findOne({ floorComplete: false });

    // Can't access floors the community hasn't got to yet
    if (currentFloor.floor < floorNumber) {
      return;
    }

    const specifiedFloorConstants = FLOORS[floorNumber];

    if (currentFloor.floor == floorNumber) {
      return {
        waveDetails: {
          easyWaves: currentFloor.easyWaves,
          easyWavesTotal: currentFloor.easyWavesTotal,
          hardWaves: currentFloor.hardWaves,
          hardWavesTotal: currentFloor.hardWavesTotal,
          veryHardWaves: currentFloor.veryHardWaves,
          veryHardWavesTotal: currentFloor.veryHardWavesTotal,
          health: currentFloor.health,
          healthMax: currentFloor.healthMax
        },
        floorDetails: {
          easy: {
            name: specifiedFloorConstants.easy.name,
            image: specifiedFloorConstants.easy.image
          },
          hard: {
            name: specifiedFloorConstants.hard.name,
            image: specifiedFloorConstants.hard.image
          },
          veryHard: {
            name: specifiedFloorConstants.veryHard.name,
            image: specifiedFloorConstants.veryHard.image
          },
          rewards: specifiedFloorConstants.floorRewards
        },
        maxFloor: currentFloor.floor
      }
    }

    return {
      floorDetails: {
        easy: {
          name: specifiedFloorConstants.easy.name,
          image: specifiedFloorConstants.easy.image
        },
        hard: {
          name: specifiedFloorConstants.hard.name,
          image: specifiedFloorConstants.hard.image
        },
        veryHard: {
          name: specifiedFloorConstants.veryHard.name,
          image: specifiedFloorConstants.veryHard.image
        }
      },
      maxFloor: currentFloor.floor
    }
  },

  'battles.currentFloorHighscores'() {
    // Fetch current active floor
    const currentFloor = Floors.findOne({ floorComplete: false });

    // Fetch top 10 for each difficulty
    return FloorWaveScores.find({
      floor: currentFloor.floor
    }, {
      sort: {
        points: -1
      },
      limit: 10
    }).fetch()
  },

  'battles.castAbility'(battleId, abilityId, options) {

    if (options.caster !== Meteor.userId()) {
      throw new Meteor.Error("battle-not-found", "Thats not you!");      
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
    }

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
    owners: this.userId,
    updatedAt: {
      $gt: moment().subtract(60, 'seconds').toDate()
    }
  });
});

Meteor.publish('battlesList', function () {
  return BattlesList.find({
    owners: this.userId
  });
});

Meteor.publish("redis-battles", function (currentBattle) {
  return redis.matching(`battles-${currentBattle._id}`);
});

