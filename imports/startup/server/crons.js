import { FLOORS } from '/server/constants/floors/index.js';
import { ENEMIES } from '/server/constants/enemies/index.js';

import { Floors } from '../../api/floors/floors.js';
import { Combat } from '/imports/api/combat/combat';
import { Battles } from '/imports/api/battles/battles';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';

// Reset boss health
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
    const bossEnemyId = floorConstants.boss.possibleBattles[0].enemies[0].id;
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
    Battles.update({    
      finished: false,    
      updatedAt: {    
        $lte: moment().subtract(2, 'minutes').toDate()   
      }   
    }, {    
      $set: {   
        finished: true,   
        win: false    
      }   
    }, { multi: true });
    return true;
  }
});

SyncedCron.config({
  utc: true
});

SyncedCron.start();
