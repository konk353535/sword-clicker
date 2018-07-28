import { FLOORS } from '/server/constants/floors/index.js';
import { ENEMIES } from '/server/constants/enemies/index.js';
import { Meteor } from 'meteor/meteor';
import { resolveLoot } from '/server/api/battles/battleMethods/completeBattle';

import { Floors } from '/imports//api/floors/floors';
import { Combat } from '/imports/api/combat/combat';
import { Skills } from '/imports/api/skills/skills';
import { Users } from '/imports/api/users/users';
import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Chats } from 'meteor/cesarve:simple-chat/collections';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';
import { Servers } from '/imports/api/servers/servers';

const redis = new Meteor.RedisCollection('redis');

// Reset tower things (daily)
SyncedCron.add({
  name: 'Reset boss health',
  schedule: function(parser) {
    return parser.cron('0 0 * * * * *');
  },
  job: function() {
    Servers.find({}).fetch().forEach((server) => {
      // Fetch current active floor
      const currentFloor = Floors.findOne({server: server._id, floorComplete: false});
      const floorConstants = FLOORS[currentFloor.floor];

      // Get bosses hp
      const bossEnemyId = floorConstants.boss.enemy.id;
      const bossEnemyConstants = ENEMIES[bossEnemyId];

      const activeTowerUsers = FloorWaveScores.find({
        server: server._id,
        floor: currentFloor.floor,
        points: {
          $gte: 25
        }
      }).count();
      console.log(`Server: ${server.name}: active tower users ${activeTowerUsers}`);
      console.log(`boss enemy constants`);
      console.log(bossEnemyConstants);
      const newHealthMax = activeTowerUsers * bossEnemyConstants.stats.healthMax;
      console.log(`new health max is ${newHealthMax}`);
      Floors.update({server: server._id, floorComplete: false}, {
        $set: {
          health: newHealthMax,
          healthMax: newHealthMax
        }
      });

      console.log('Have finally reset boss health');

      // Clear hp dealt on leaderboards
      BossHealthScores.remove({});

      console.log('Boss hp score reset');

      // Enable users to fight bosses again
      Combat.update({foughtBoss: true}, {
        $set: {
          foughtBoss: false
        }
      }, {multi: true});

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
      }, {multi: true});

      // Reset gems today
      Users.update({}, {
        $set: {
          fakeGemsToday: 0
        }
      }, {multi: true});

      console.log('All done for boss battle reset');
      return true;
    });
  }
});

SyncedCron.add({
  name: 'Clean up battles and chat',
  schedule: function(parser) {
    return parser.cron('* * * * * * *');
  },
  job: function() {
    Battles.remove({
      updatedAt: {
        $lt: moment().subtract(1, 'month').toDate()
      }
    });

    Chats.remove({
      date: {
        $lt: moment().subtract(1, 'month').toDate()
      }
    });

    return true;
  }
});

// Finish dead battles
SyncedCron.add({
  name: 'Remove dead battles',
  schedule: function(parser) {
    return parser.cron('* * * * * * *');
  },
  job: function() {
    BattlesList.find({
      createdAt: {    
        $lte: moment().subtract(1, 'minutes').toDate()   
      } 
    }).fetch().forEach((battleList) => {
      let currentBattle = redis.get(`battles-${battleList._id}`);
      currentBattle = currentBattle ? JSON.parse(currentBattle) : currentBattle;

      let isUpdatedStale = false;

      if (battleList.useStreamy) {
        isUpdatedStale = moment().isAfter(moment(battleList.createdAt).add(15, 'minutes'));
      } else if (currentBattle) {
        isUpdatedStale = moment().isAfter(moment(currentBattle.updatedAt).add(60, 'seconds'));
      }


      if (isUpdatedStale || (!currentBattle && !battleList.useStreamy)) {
        BattlesList.remove(battleList._id);
        redis.del(`battles-${battleList._id}`);
        redis.del(`battleActions-${battleList._id}`);
      }
    });
    return true;
  }
});

// Update global skill rankings
SyncedCron.add({
  name: 'Update Rankings',
  schedule: function(parser) {
    return parser.text('every 24 hours');
  },
  job: function() {

    const stats = [
      'mining',
      'crafting',
      'woodcutting',
      'attack',
      'defense',
      'magic',
      'health',
      'farming',
      'inscription',
      'astronomy'
    ];

    Servers.find({}).fetch().forEach((server) => {
      const playersTotalXp = {};

      stats.forEach((statName) => {
        // Fetch all skills with that stat name by order
        Skills.find({ type: statName, server: server._id }, { sort: { totalXp: -1 }}).fetch().forEach((skill, skillIndex) => {
          if (playersTotalXp[skill.owner]) {
            playersTotalXp[skill.owner] += skill.totalXp;
          } else {
            playersTotalXp[skill.owner] = skill.totalXp;
          }
          Skills.update(skill._id, {
            $set: {
              rank: skillIndex + 1
            }
          });
        });
      });

      Object.keys(playersTotalXp).forEach((playerId) => {
        Skills.update({
          owner: playerId,
          type: 'total'
        }, {
          $set: {
            totalXp: playersTotalXp[playerId]
          }
        })
      });

      // Fetch total
      Skills.find({ type: 'total', server: server._id }, { sort: { totalXp: -1 }}).fetch().forEach((skill, skillIndex) => {
        Skills.update(skill._id, {
          $set: {
            rank: skillIndex + 1
          }
        });
      });
    });

    return true;
  }
});

// Resolve Need Greed loot
SyncedCron.add({
  name: 'Resolve Need Greed loot',
  schedule: function(parser) {
    return parser.cron('* * * * * * *');
  },
  job: function() {
    Battles.find({
      'loot.0': { $exists: true },
      createdAt: {
        $lte: moment().subtract(1, 'minutes').toDate()
      },
      $or: [
        {lootResolved: {$exists: false}},
        {lootResolved: false}
      ]
    }).fetch().forEach((battle) => {
      resolveLoot(battle);
    });
    return true;
  }
});

SyncedCron.config({
  utc: true
});

Meteor.setTimeout(() => {
  SyncedCron.start();
}, 60000);
