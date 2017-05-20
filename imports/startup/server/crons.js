import { FLOORS } from '/server/constants/floors/index.js';
import { ENEMIES } from '/server/constants/enemies/index.js';

import { Floors } from '../../api/floors/floors.js';
import { Combat } from '/imports/api/combat/combat';
import { Battles, BattlesList } from '/imports/api/battles/battles';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';

const redis = new Meteor.RedisCollection('redis');

if (process.env['CLUSTER_WORKER_ID'] !== "1") return

// Reset tower things (daily)
SyncedCron.add({
  name: 'Reset boss health',
  schedule: function(parser) {
    return parser.cron('0 0 * * * * *');
  },
  job: function() {
    // Fetch current active floor
    const currentFloor = Floors.findOne({ floorComplete: false });
    const floorConstants = FLOORS[currentFloor.floor];

    // Get bosses hp
    const bossEnemyId = floorConstants.boss.enemy.id;
    const bossEnemyConstants = ENEMIES[bossEnemyId];

    Floors.update({ floorComplete: false }, {
      $set: {
        health: bossEnemyConstants.stats.healthMax,
        healthMax: bossEnemyConstants.stats.healthMax
      }
    });

    // Enable users to fight bosses again
    Combat.update({ foughtBoss: true }, {
      $set: {
        foughtBoss: false
      }
    }, { multi: true });

    // Enable users to fight waves again
    Combat.update({
      towerContributionsToday: {
        $gt: 0
      }
    }, {
      $set: {
        towerContributionsToday: 0
      }
    }, { mult: true });

    // Clear hp dealt on leaderboards
    BossHealthScores.remove({});

    return true;
  }
});

// Finish dead battles
SyncedCron.add({
  name: 'Remove dead battles',
  schedule: function(parser) {
    return parser.text('every 2 minutes');
  },
  job: function() {
    BattlesList.find({
      createdAt: {    
        $lte: moment().subtract(2, 'minutes').toDate()   
      } 
    }).fetch().forEach((battleList) => {
      let currentBattle = redis.get(`battles-${battleList._id}`);
      currentBattle = currentBattle ? JSON.parse(currentBattle) : currentBattle;

      let isUpdatedStale;
      if (currentBattle) {
        isUpdatedStale = moment().isAfter(moment(currentBattle.updatedAt).add(60, 'seconds'));
      }


      if (isUpdatedStale || !currentBattle) {
        BattlesList.remove(battleList._id);
        redis.del(`battles-${battleList._id}`);
        redis.del(`battleActions-${battleList._id}`);
      }
    });
    return true;
  }
});

SyncedCron.config({
  utc: true
});

SyncedCron.start();
