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
      wave = _.random(1, 5);
    }

    const targetBattle = FLOORS.personalQuest[level].waves[wave - 1];
    if (targetBattle) {
      startBattle(targetBattle, { level, wave });
    } else {
      throw new Meteor.Error("oh... sorry!", "Couldnt find the specified battle for that level and wave combo");
    }
  },

  'battles.findBattle'(floor, difficulty) {
    if (!_.contains(['easy', 'hard', 'veryHard', 'boss'], difficulty)) {
      return;
    }

    // Ensure the floor specified is currently open
    const currentFloor = Floors.findOne({ floorComplete: false });

    if (floor > currentFloor.floor) {
      return;
    }

    const possibleBattles = FLOORS[floor][difficulty].possibleBattles;

    if (currentFloor[`${difficulty}Waves`] <= 0) {
      floor = null;
      difficulty = null;
    }

    if (difficulty === 'boss' && currentFloor.floor === floor) {
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
      }
    }

    // Eventually select a random battle appropriate to users level
    startBattle(_.sample(possibleBattles), { floor, difficulty });
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

    if (currentFloor.floor === floorNumber) {
      return {
        waveDetails: {
          easyWaves: currentFloor.easyWaves,
          easyWavesTotal: currentFloor.easyWavesTotal,
          hardWaves: currentFloor.hardWaves,
          hardWavesTotal: currentFloor.hardWavesTotal,
          veryHardWaves: currentFloor.veryHardWaves,
          veryHardWavesTotal: currentFloor.veryHardWavesTotal,
        },
        floorDetails: specifiedFloorConstants,
        maxFloor: currentFloor.floor
      }
    }

    return {
      floorDetails: specifiedFloorConstants,
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
        veryHardWaves: -1,
        hardWaves: -1,
        easyWaves: -1
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

Meteor.publish('battles', function() {
  return Battles.find({
    owners: this.userId,
    updatedAt: {
      $gt: moment().subtract(60, 'seconds').toDate()
    }
  });
});

