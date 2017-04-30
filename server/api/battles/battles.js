import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import moment from 'moment';

import { Floors } from '/imports/api/floors/floors';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';

import { Battles } from '/imports/api/battles/battles';
import { BattleActions } from '/imports/api/battles/battleActions';
import { Groups } from '/imports/api/groups/groups';

import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { FLOORS } from '/server/constants/floors/index.js'; // List of floor details

import { startBattle } from './battleMethods/startBattle';
import { progressBattle } from './battleMethods/progressBattle';

export const resumeBattle = function(id) {
  // Find the battle
  const actualBattle = Battles.findOne(id);

  // Progress battle
  const battleIntervalId = Meteor.setInterval(() => {
    progressBattle(actualBattle, battleIntervalId);
  }, BATTLES.tickDuration); // Tick Duration ( Should be 250 by default )
}


Meteor.methods({

  'battles.findPersonalBattle'(level, wave) {
    throw new Meteor.Error("no-sir", "Battles disabled for 1 hour (enabled again at 1pm brisbane time)");
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
    throw new Meteor.Error("no-sir", "Battles disabled for 1 hour (enabled again at 1pm brisbane time)");
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
    // Fetch the battle
    const targetBattle = Battles.findOne({
      _id: battleId,
      owners: Meteor.userId()
    });

    if (!targetBattle) {
      throw new Meteor.Error("battle-not-found", "Ability cannot be cast on battle that doesnt exist");
    }

    if (options.caster && options.caster !== Meteor.userId()) {
      throw new Meteor.Error("access-denied", "You do not have control of that caster");
    }

    BattleActions.insert({
      battleId,
      abilityId,
      caster: options.caster,
      target: options.target,
      targets: options.targets
    });
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

