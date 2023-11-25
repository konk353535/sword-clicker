import { Meteor } from "meteor/meteor"
import { Accounts } from "meteor/accounts-base"
import { tx } from "meteor/babrahams:transactions"
import { HttpBasicAuth } from "meteor/jabbslad:basic-auth"

import { env, validateEnv } from "./validateEnv"

validateEnv()

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
import { FloorLoot } from "/imports/api/floors/floorLoot"
import { FloorWaveScores } from "/imports/api/floors/floorWaveScores"
import { Floors } from "/imports/api/floors/floors.js"
import { Groups } from "/imports/api/groups/groups.js"
import { Items } from "/imports/api/items/items"
import { Mining, MiningSpace } from "/imports/api/mining/mining"
import { CLASSIC_SERVER, Servers, validDeployFlags } from "/imports/api/servers/servers"
import { Skills } from "/imports/api/skills/skills"
import { State } from "/imports/api/state/state"
import { Town } from "/imports/api/town/town"
import { Users } from "/imports/api/users/users"
import { Woodcutting } from "/imports/api/woodcutting/woodcutting"

import { createNewServer } from "/imports/api/servers/servers"
import { getIPFromConnection, updateUserIP } from "/imports/api/users/users.js"

import { ITEMS } from "../imports/constants/items"

// as long as we only use these from `Meteor.isServer`, this is fine
import { spellData } from "/server/constants/magic"
import { ABILITIES } from "/server/constants/combat/abilities"

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
            console.log(`\x1b[36mAccount login from ${accountConnection.user.username} (${accountConnection.user._id}):\x1b[0m`)
            if (userIPReal !== userIPRaw) {
                console.log(`\x1b[36m. . . . . IP address: ${userIPReal}  (from gateway/proxy ${userIPRaw})\x1b[0m`)
            } else {
                console.log(`\x1b[36m. . . . . IP address: ${userIPReal}\x1b[0m`)
            }
            //console.log(accountConnection.connection.httpHeaders);

            updateUserIP({ userId: accountConnection.user._id, ipAddress: userIPReal })

            Meteor.call("items.emergencyCleanup")
        }
    }
})

if (env.METEOR_STAGING === true) {
    var basicAuth = new HttpBasicAuth(env.METEOR_BASIC_AUTH_USER, env.METEOR_BASIC_AUTH_PASS)
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
    Town.createIndex({ server: 1 })
    FloorLoot.createIndex({ server: 1, floor: 1 })

    /* 
    // Re-sync town buffs 1s and 10s after startup (works around a weird issue with State on startup)
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

        State.remove({
            name: {
                $in: validDeployFlags
            }
        })

        function deepFreeze(o) {
            if (!Object.isFrozen(o)) {
                Object.freeze(o)
            }

            Object.getOwnPropertyNames(o).forEach(function(prop) {
                if (
                    o.hasOwnProperty(prop) &&
                    o[prop] !== null &&
                    (typeof o[prop] === "object" || typeof o[prop] === "function") &&
                    !Object.isFrozen(o[prop])
                ) {
                    deepFreeze(o[prop])
                }
            })

            return o;
        }

        // let's cook up some data!
        Object.keys(ABILITIES).forEach((key) => {
            const abilitySpellData = spellData(key)
            if (abilitySpellData && !abilitySpellData.error) {
                ABILITIES[key].magic = abilitySpellData
                //console.log(ABILITIES[key])
            }
        })

        // this freezes everything
        deepFreeze(ABILITIES)
        deepFreeze(ITEMS)
    }
})
