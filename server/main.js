import { Meteor } from 'meteor/meteor';
import '/imports/startup/both';
import '/imports/startup/server';

import { ITEMS } from '/server/constants/items/index';
import { ABILITIES } from '/server/constants/combat/abilities';

import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Crafting } from '/imports/api/crafting/crafting';
import { Combat } from '/imports/api/combat/combat';
import { Abilities } from '/imports/api/abilities/abilities';
import { Achievements } from '/imports/api/achievements/achievements';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting';
import { Events } from '/imports/api/events/events';
import { BattleActions } from '/imports/api/battles/battleActions';
import { Groups } from '/imports/api/groups/groups';
import { Items } from '/imports/api/items/items';
import { Mining, MiningSpace } from '/imports/api/mining/mining';
import { Skills } from '/imports/api/skills/skills';
import { State } from '/imports/api/state/state';
import { Friends } from '/imports/api/friends/friends';
import { Astronomy } from '/imports/api/astronomy/astronomy';
import { Adventures } from '/imports/api/adventures/adventures';
import { FarmingSpace, Farming } from '/imports/api/farming/farming';
import { Users, UserGames } from '/imports/api/users/users';
import { Games } from '/imports/api/games/games';
import { Clans } from '/imports/api/clans/clans';
import { Floors } from '/imports/api/floors/floors';
import { Inscription } from '/imports/api/inscription/inscription';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';

import { addItem } from '/server/api/items/items';
import { createGame } from '/server/api/games/games';
import { genericTowerMonsterGenerator } from '/server/constants/floors/generators/genericTower';

Meteor.startup(() => {

  // Ensure main game has been created
  const mainGame = Games.findOne({
    mainGame: true
  });

  if (!mainGame) {
    createGame('Main Game', null, true);
  } else {
    const game = mainGame._id;
    // Begin migration
    // Set game property on all collections
    Abilities.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Achievements.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Adventures.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Astronomy.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Battles.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    BattlesList.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Clans.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Combat.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Crafting.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Events.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Farming.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    FarmingSpace.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Floors.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    FloorWaveScores.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Friends.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Groups.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Inscription.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Items.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Mining.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    MiningSpace.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Skills.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    State.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    Woodcutting.update({ game: { $exists: false } }, { $set: { game } }, { multi: true });
    
    Users.find({
      currentGame: {
        $exists: false
      }
    }).map((user) => {
      // Create User Game (from user object)
      UserGames.insert({
        owner: user._id,
        game,
        username: user.username,
        // User Game Data below
        gold: user.gold,
        floor: user.floor,
        gems: user.gems,
        fakeGems: user.fakeGems,
        fakeGemsToday: user.fakeGemsToday,
        membershipTo: user.membershipTo,
        miningUpgradeTo: user.miningUpgradeTo,
        craftingUpgradeTo: user.craftingUpgradeTo,
        combatUpgradeTo: user.combatUpgradeTo,
        woodcuttingUpgradeTo: user.woodcuttingUpgradeTo,
        inscriptionUpgradeTo: user.inscriptionUpgradeTo,
        astronomyUpgradeTo: user.astronomyUpgradeTo,
        farmingUpgradeTo: user.farmingUpgradeTo,
        averageCombat: user.averageCombat,
        logEvents: user.logEvents,
        uiState: user.uiState, // used to save ui state, eg: hide / show chat
        lastAction: user.lastAction,
        lastActionDate: user.lastActionDate,
        partyId: user.partyId,
        personalQuest: user.personalQuest,
        stats: user.stats
      });

      // Add User to games array (game object)
      // Add game to users array (game object)
      Users.update(user._id, {
        $set: {
          currentGame: game,
          games: [game]
        }
      });

      Games.update(game, {
        $push: {
          members: user._id
        }
      });

    });
  }

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
  State._ensureIndex({ name: 1 })
});
