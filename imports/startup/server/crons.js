import { FLOORS } from '/server/constants/floors/index.js';
import { ENEMIES } from '/server/constants/enemies/index.js';
import { Meteor } from 'meteor/meteor';
import { resolveLoot, removeBattle, distributeRewards } from '/server/api/battles/battleMethods/completeBattle';
import moment from 'moment/moment';
import uuid from 'node-uuid';
import faker from 'faker';

import { Floors } from '/imports//api/floors/floors';
import { Combat } from '/imports/api/combat/combat';
import { Skills } from '/imports/api/skills/skills';
import { Users } from '/imports/api/users/users';
import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Chats } from 'meteor/cesarve:simple-chat/collections';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';
import { Servers } from '/imports/api/servers/servers';

// Prefab some guest account
SyncedCron.add({
  name: 'Prefab Guests',
  schedule: function (parser) {
    return parser.text('every 30 seconds');
  },
  job: function () {
    // Check for existing frefab accounts
    const existingCount = Users.find({
      isPreFabbedGuest: true
    }).count();

    const amountToCreate = 5 - existingCount;

    if (amountToCreate > 0) {
      for (let i = 0; i < amountToCreate; i++) {
        const username = `guest_${faker.internet.userName()}`;
        console.log(username);
        const password = uuid.v4();

        Accounts.createUser({
          username,
          password,
          isGuest: true,
          isPreFabbedGuest: true
        });
      }
      console.log(`Created ${amountToCreate} pre fabbed accounts`);
    }
  }
});

// Reset tower things (daily)
SyncedCron.add({
  name: 'Reset Offs',
  schedule: function (parser) {
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
        $gte: 25
      }
    }).count();
    console.log(`active tower users ${activeTowerUsers}`);
    console.log(`boss enemy constants`);
    console.log(bossEnemyConstants);
    const newHealthMax = activeTowerUsers * bossEnemyConstants.stats.healthMax;
    console.log(`new health max is ${newHealthMax}`)
    Floors.update(
      { floorComplete: false },
      { $set: { health: newHealthMax, healthMax: newHealthMax } }
    );

    console.log('Have finally reset boss health');

    // Clear hp dealt on leaderboards
    BossHealthScores.remove({});

    console.log('Boss hp score reset');

    // Enable users to fight bosses again
    Combat.update(
      { foughtBoss: true },
      { $set: { foughtBoss: false } },
      { multi: true }
    );

    console.log('Fought boss is done now');

    // Enable users to fight waves again
    Combat.update(
      { towerContributions: { $ne: [] } }, // always use an index to avoid blindly setting data for the whole database
      { $set: { towerContributions: [] } },
      { multi: true }
    );

    // Reset gems today
    Users.update(
      { fakeGemsToday: { $ne: 0 } }, // always use an index to avoid blindly setting data for the whole database
      { $set: { fakeGemsToday: 0 } },
      { multi: true }
    );
  }
});

// Reset tower things (daily)
SyncedCron.add({
  name: 'Check boss health / death',
  schedule: function(parser) {
    return parser.cron('* * * * * * *');
  },
  job: function() {
    Servers.find({}).fetch().forEach((server) => {
      // Fetch current active floor
      const currentFloor = Floors.findOne({server: server._id, floorComplete: false});

      if (!currentFloor) {
        return;
      }

      // reset boss HP
      if (moment().isAfter(currentFloor.bossResetAt)) {
        if (Math.floor(currentFloor.health) <= 0) {
          // kill the boss
          console.log('Health is below 0');
          // Complete the floor!
          let updatedCount = Floors.update({
            floor: currentFloor.floor,
            server: currentFloor.server,
            floorComplete: false
          }, {
            $set: {
              floorComplete: true
            }
          });

          //console.log(`Updated count is ${updatedCount}`);
          if (updatedCount === 1) {
            // Distribute rewards
            distributeRewards({ floor: currentFloor.floor, server: currentFloor.server });

            // Notify general chat
            Chats.insert({
              message: `The boss on floor ${currentFloor.floor} has been defeated!
              Floor ${currentFloor.floor + 1} is now unlocked.`,
              username: 'SERVER',
              name: 'SERVER',
              date: new Date(),
              custom: {
                roomType: 'Server'
              },
              roomId: `Server-${currentFloor.server}`
            });

            // Insert the next floor (To do, make this pass a valid active tower users number)
            const activeTowerUsers = FloorWaveScores.find({
              floor: currentFloor.floor,
              points: {
                $gte: 25
              }
            }).count();
            const newPointMax = FLOORS.getNewPointCount(currentFloor.floor + 1, activeTowerUsers);

            // Get bosses hp
            const bossEnemyId = FLOORS[currentFloor.floor + 1].boss.enemy.id;
            const bossEnemyConstants = ENEMIES[bossEnemyId];

            // Reset tower contributions for all
            Combat.update(
              { towerContributionsToday: { $ne: 0 } }, // always use an index to avoid blindly setting data for the whole database
              { $set: { towerContributionsToday: 0 } },
              { multi: true }
            );

            BossHealthScores.remove({});

            // Create our next floor
            Floors.insert({
              floor: currentFloor.floor + 1,
              createdAt: new Date(),
              points: 0,
              pointsMax: newPointMax, // Need some kind of
              health: bossEnemyConstants.stats.healthMax * activeTowerUsers,
              healthMax: bossEnemyConstants.stats.healthMax * activeTowerUsers,
              floorComplete: false,
              server: currentFloor.server,
              loot: []
            });

            // Enable users to fight bosses again
            Combat.update(
              { foughtBoss: true},
              { $set: { foughtBoss: false } },
              { multi: true }
            );
          }
        } else {
          // reset the boss
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
          const resetDate = moment(currentFloor.bossResetAt).add(24, 'hours').toDate();
          console.log(`new health max is ${currentFloor.healthMax}`);
          Floors.update({
            server: server._id,
            floor: currentFloor.floor,
            floorComplete: false
          }, {
            $set: {
              health: currentFloor.healthMax,
              bossResetAt: resetDate
            }
          });

          console.log('Have finally reset boss health');

          // Clear hp dealt on leaderboards
          BossHealthScores.remove({});

          console.log('Boss hp score reset');

          // Enable users to fight bosses again
          Combat.update(
            { foughtBoss: true },
            { $set: { foughtBoss: false } },
            { multi: true }
          );

          console.log('Fought boss is done now');

          console.log('All done for boss battle reset');
        }
      }
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
    return parser.text('every 30 seconds');
  },
  job: function() {
    BattlesList.find({
      createdAt: {    
        $lte: moment().subtract(10, 'minutes').toDate()   
      } 
    }).fetch().forEach((battleList) => {
      HTTP.call('DELETE', `${Meteor.settings.public.battleUrl}/battle/${battleList._id}?balancer=${battleList.balancer}&userId=SERVER&userName=cron.deleteBattle`, (error, result) => {
        removeBattle(battleList._id);
      });
    });

    return true;
  }
});

// Update global skill rankings
SyncedCron.add({
  name: 'Update Rankings',
  schedule: function(parser) {
    return parser.text('every 8 hours');
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
          Skills.update(
            skill._id,
            { $set: { rank: skillIndex + 1 }
          });
        });
      });

      Object.keys(playersTotalXp).forEach((playerId) => {
        Skills.update(
          { owner: playerId, type: 'total' },
          { $set: { totalXp: playersTotalXp[playerId] } }
        )
      });

      // Fetch total
      Skills.find({ type: 'total', server: server._id }, { sort: { totalXp: -1 }}).fetch().forEach((skill, skillIndex) => {
        Skills.update(
          skill._id,
          { $set: { rank: skillIndex + 1 } }
        );
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
}, Meteor.settings.is_dev ? 0 : 60000);
