import { Meteor } from "meteor/meteor"
// import { Migrations } from 'meteor/percolate:migrations';
import "/imports/startup/both"
import "/imports/startup/server"

import { Abilities } from "/imports/api/abilities/abilities"
import { BattleActions } from "/imports/api/battles/battleActions"
import { Battles } from "/imports/api/battles/battles"
import { Combat } from "/imports/api/combat/combat"
import { Crafting } from "/imports/api/crafting/crafting"
import { Events } from "/imports/api/events/events"
import { Farming, FarmingSpace } from "/imports/api/farming/farming"
import { BossHealthScores } from "/imports/api/floors/bossHealthScores"
import { FloorWaveScores } from "/imports/api/floors/floorWaveScores"
import { Floors } from "/imports/api/floors/floors.js"
import { Groups } from "/imports/api/groups/groups.js"
import { Items } from "/imports/api/items/items"
import { Mining, MiningSpace } from "/imports/api/mining/mining"
import { CLASSIC_SERVER, Servers } from "/imports/api/servers/servers"
import { Skills } from "/imports/api/skills/skills"
import { State } from "/imports/api/state/state"
import { Users } from "/imports/api/users/users"
import { Woodcutting } from "/imports/api/woodcutting/woodcutting"

import { createNewServer } from "/imports/api/servers/servers"
import { getIPFromConnection, updateUserIP } from "/imports/api/users/users.js"

/*
Meteor.onConnection((connection) => {
  console.log("Meteor.onConnection");
  console.log(connection);
});
*/

Accounts.onLogin((accountConnection) => {
    if (accountConnection.user) {
        if (accountConnection.user.username) {
            const userIPRaw = accountConnection.connection.clientAddress
            const userIPReal = getIPFromConnection(accountConnection.connection)
            console.log(`Account login from ${accountConnection.user.username} (${accountConnection.user._id}):`)
            if (userIPReal !== userIPRaw) {
                console.log(`. . . . . IP address: ${userIPReal}  (from gateway/proxy ${userIPRaw})`)
            } else {
                console.log(`. . . . . IP address: ${userIPReal}`)
            }
            //console.log(accountConnection.connection.httpHeaders);

            updateUserIP({ userId: accountConnection.user._id, ipAddress: userIPReal })
        }
    }
})

if (process.env?.METEOR_STAGING == "true") {
    if (process.env.BASIC_AUTH_USER == null) {
        throw new Error("METEOR_STAGING is set as true, but no BASIC_AUTH_USER was provided")
    } else if (process.env.BASIC_AUTH_PASS == null) {
        throw new Error("METEOR_STAGING is set as true, but no BASIC_AUTH_PASS was provided")
    }

    var basicAuth = new HttpBasicAuth(process.env.BASIC_AUTH_USER, process.env.BASIC_AUTH_PASS)
    basicAuth.protect()
}

Meteor.startup(() => {
    tx.logging = false // Disable transaction logging to console (very spammy): https://github.com/JackAdams/meteor-transactions

    //   Migrations.migrateTo('latest');

    const classicServer = Servers.findOne({
        name: CLASSIC_SERVER
    })

    if (!classicServer) {
        const classicServerId = createNewServer(CLASSIC_SERVER, 0)

        // Assign server to existing documents
        // -- User Doc
        Users.update(
            {},
            {
                $set: {
                    server: classicServerId
                }
            },
            { multi: true }
        )

        // -- Group Doc
        Groups.update(
            {},
            {
                $set: {
                    server: classicServerId
                }
            },
            { multi: true }
        )

        // -- Floor Doc
        Floors.update(
            {},
            {
                $set: {
                    server: classicServerId
                }
            },
            { multi: true }
        )

        // -- Boss Health Score Doc
        BossHealthScores.update(
            {},
            {
                $set: {
                    server: classicServerId
                }
            },
            { multi: true }
        )

        // -- Floor Wave Score Doc
        FloorWaveScores.update(
            {},
            {
                $set: {
                    server: classicServerId
                }
            },
            { multi: true }
        )

        // -- Combat Doc
        Combat.update(
            {},
            {
                $set: {
                    server: classicServerId
                }
            },
            { multi: true }
        )
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
    Combat.createIndex({ owner: 1 })
    Combat.createIndex({ foughtBoss: 1 })
    Abilities.createIndex({ owner: 1 })
    Woodcutting.createIndex({ owner: 1 })
    Crafting.createIndex({ owner: 1 })
    Groups.createIndex({ lastBattleStarted: -1 })
    Events.createIndex({ owner: 1, date: -1 })
    Skills.createIndex({ owner: 1 })
    Skills.createIndex({ type: 1 })
    Skills.createIndex({ totalXp: -1 })
    Items.createIndex({ owner: 1 })
    Mining.createIndex({ owner: 1 })
    MiningSpace.createIndex({ owner: 1 })
    Battles.createIndex({ owners: 1 })
    Battles.createIndex({ updatedAt: 1 })
    Battles.createIndex({ owners: 1, updatedAt: -1 })
    Battles.createIndex({ owners: 1, createdAt: -1 })
    Farming.createIndex({ owner: 1 })
    FarmingSpace.createIndex({ owner: 1 })
    FarmingSpace.createIndex({ index: 1 })
    BattleActions.createIndex({ battleId: 1 })
    State.createIndex({ name: 1 })

    // Re-sync town buffs 1s and 10s after startup (works around a weird issue with State on startup)
    /*
  for (let i = 1; i <= 2; i++) {
    Meteor.setTimeout(function() {
      deleteKarmaBuffs();  
      syncKarmaBuffs();
    }, ((i == 1) ? 1 : 15) * 1000);
  }  
  // Note: disabled, I suspect because we don't have a user here, this causes all kinds of weird issues with duplicating buffs
  */

    if (Meteor.isServer) {
        // On server startup, remove all old transactions to prune the size of the transactions collection.
        // Paired with a daily restart script, this should occur daily at a specific time.
        tx.Transactions.remove({})
    }
})
