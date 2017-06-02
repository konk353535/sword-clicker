import { FLOORS } from '/server/constants/floors/index.js';
import { ENEMIES } from '/server/constants/enemies/index.js';

import { Floors } from '../../api/floors/floors.js';
import { Combat } from '/imports/api/combat/combat';
import { Battles, BattlesList } from '/imports/api/battles/battles';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';

const redis = new Meteor.RedisCollection('redis');

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

    const activeTowerUsers = FloorWaveScores.find({
      floor: currentFloor.floor,
      points: {
        $gte: 1
      }
    }).count();
    console.log(`active tower users ${activeTowerUsers}`);
    console.log(`boss enemy constants`);
    console.log(bossEnemyConstants);
    Floors.update({ floorComplete: false }, {
      $set: {
        health: currentFloor.healthMax
      }
    });

    console.log('Have finally reset boss health');

    // Clear hp dealt on leaderboards
    BossHealthScores.remove({});

    console.log('Boss hp score reset');

    // Enable users to fight bosses again
    Combat.update({ foughtBoss: true }, {
      $set: {
        foughtBoss: false
      }
    }, { multi: true });

    console.log('Fought boss is done now');

    // Enable users to fight waves again
    Combat.update({
      towerContributionsToday: {
        $gt: 0
      }
    }, {
      $set: {
        towerContributionsToday: 0
      }
    }, { multi: true });

    console.log('All done for boss battle reset');
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
