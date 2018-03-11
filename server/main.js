import { Meteor } from 'meteor/meteor';
import '/imports/startup/both';
import '/imports/startup/server';

import { ITEMS } from '/server/constants/items/index';
import { ABILITIES } from '/server/constants/combat/abilities';

import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Crafting } from '/imports/api/crafting/crafting';
import { Combat } from '/imports/api/combat/combat';
import { Abilities } from '/imports/api/abilities/abilities';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting';
import { Events } from '/imports/api/events/events';
import { BattleActions } from '/imports/api/battles/battleActions';
import { Groups } from '/imports/api/groups/groups';
import { Items } from '/imports/api/items/items';
import { Mining, MiningSpace } from '/imports/api/mining/mining';
import { Skills } from '/imports/api/skills/skills';
import { Friends } from '/imports/api/friends/friends';
import { FarmingSpace, Farming } from '/imports/api/farming/farming';
import { addItem } from '/server/api/items/items';
import { Users } from '/imports/api/users/users';

import { genericTowerMonsterGenerator } from '/server/constants/floors/generators/genericTower';

Meteor.startup(() => {

  /*
  Object.keys(ITEMS).forEach((itemId) => {
    console.log(itemId);
    addItem(itemId, 1, 'dwh6m5aWF5bT8bDyq');
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
});
