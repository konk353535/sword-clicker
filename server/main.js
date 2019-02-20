import { Meteor } from 'meteor/meteor';
import '/imports/startup/both';
import '/imports/startup/server';

import { ITEMS } from '/imports/constants/items/index';
import { ABILITIES } from '/server/constants/combat/abilities';

import { Users } from '/imports/api/users/users';
import { Groups } from '/imports/api/groups/groups.js';
import { Floors } from '/imports/api/floors/floors.js';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';
import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Servers } from '/imports/api/servers/servers';
import { Crafting } from '/imports/api/crafting/crafting';
import { Combat } from '/imports/api/combat/combat';
import { Abilities } from '/imports/api/abilities/abilities';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting';
import { Events } from '/imports/api/events/events';
import { BattleActions } from '/imports/api/battles/battleActions';
import { Items } from '/imports/api/items/items';
import { Mining, MiningSpace } from '/imports/api/mining/mining';
import { Skills } from '/imports/api/skills/skills';
import { State } from '/imports/api/state/state';
import { Friends } from '/imports/api/friends/friends';
import { FarmingSpace, Farming } from '/imports/api/farming/farming';

import { addItem } from '/server/api/items/items';
import { createNewServer } from '/imports/api/servers/servers';
import { getIPFromConnection, updateUserIP } from '/imports/api/users/users.js';

/*
Meteor.onConnection((connection) => {
  console.log("Meteor.onConnection");
  console.log(connection);
});
*/

Accounts.onLogin((accountConnection) => {
  if (accountConnection.user) {
    if (accountConnection.user.username) {
      const userIPRaw  = accountConnection.connection.clientAddress;
      const userIPReal = getIPFromConnection(accountConnection.connection);
      console.log(`Account login from ${accountConnection.user.username} (${accountConnection.user._id}):`);
      if (userIPReal !== userIPRaw) {
        console.log(`. . . . . IP address: ${userIPReal}  (from gateway/proxy ${userIPRaw})`);
      } else {
        console.log(`. . . . . IP address: ${userIPReal}`);
      }
      //console.log(accountConnection.connection.httpHeaders);
      
      updateUserIP({userId: accountConnection.user._id, ipAddress: userIPReal});
    }
  }
});

Meteor.startup(() => {

  const classicServer = Servers.findOne({
    name: 'Classic'
  });

  if (!classicServer) {
    const classicServerId = createNewServer('Classic', 0);
    
    // Assign server to existing documents
    // -- User Doc
    Users.update({}, {
      $set: {
        server: classicServerId
      }
    }, { multi: true });

    // -- Group Doc
    Groups.update({}, {
      $set: {
        server: classicServerId
      }
    }, { multi: true });

    // -- Floor Doc
    Floors.update({}, {
      $set: {
        server: classicServerId
      }
    }, { multi: true });

    // -- Boss Health Score Doc
    BossHealthScores.update({}, {
      $set: {
        server: classicServerId
      }
    }, { multi: true });

    // -- Floor Wave Score Doc
    FloorWaveScores.update({}, {
      $set: {
        server: classicServerId
      }
    }, { multi: true });

    // -- Combat Doc
    Combat.update({}, {
      $set: {
        server: classicServerId
      }
    }, { multi: true });
  }

  /*
  Object.keys(ITEMS).forEach((itemId) => {
    console.log(itemId);
    addItem(itemId, 1, '6eueqPknexnS5jMtF');
  });
  */
  // Process combat items with extra stats beyond normal values

  /* 
  Items.find({
    category: 'combat'
  }).fetch().map((item) => {
    // Check if item extra stats is above item max extra stats
    if (item.extraStats) {
      const itemConstants = ITEMS[item.itemId];
      Object.keys(item.extraStats).forEach((statKey) => {
        if (item.extraStats[statKey] > itemConstants.extraStats[statKey]) {
          Items.update(item._id, {
            $set: {
              extraStats: itemConstants.extraStats,
              quality: 99
            }
          });
        }
      });
    }
  })*/

  // Ensure indexes on key databases
  Combat._ensureIndex({ owner: 1 });
  Combat._ensureIndex({ foughtBoss: 1 });
  Abilities._ensureIndex({ owner: 1 });
  Woodcutting._ensureIndex({ owner: 1 });
  Crafting._ensureIndex({ owner: 1 });
  Groups._ensureIndex({ lastBattleStarted: -1 });
  Events._ensureIndex({ owner: 1, date: -1 });
  Skills._ensureIndex({ owner: 1 });
  Skills._ensureIndex({ type: 1 });
  Skills._ensureIndex({ totalXp: -1 });
  Items._ensureIndex({ owner: 1 });
  Mining._ensureIndex({ owner: 1 });
  MiningSpace._ensureIndex({ owner: 1 });
  Battles._ensureIndex({ owners: 1 });
  Battles._ensureIndex({ updatedAt: 1 });
  Battles._ensureIndex({ owners: 1, updatedAt: -1 });
  Battles._ensureIndex({ owners: 1, createdAt: -1 });
  Farming._ensureIndex({ owner: 1 });
  FarmingSpace._ensureIndex({ owner: 1 });
  FarmingSpace._ensureIndex({ index: 1 });
  BattleActions._ensureIndex({ battleId: 1 });
  State._ensureIndex({ name: 1 })
});
