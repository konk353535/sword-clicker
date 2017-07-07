import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { ENEMIES } from '/server/constants/enemies/index.js'; // List of enemies
import { COMBAT, ABILITIES, BUFFS } from '/server/constants/combat/index.js'; // List of available combat stats
import { FLOORS } from '/server/constants/floors/index.js'; // List of floor details

import { Random } from 'meteor/random'
import moment from 'moment';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';

import { Groups } from '/imports/api/groups/groups';
import { Adventures } from '/imports/api/adventures/adventures';
import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Combat } from '/imports/api/combat/combat';
import { Abilities } from '/imports/api/abilities/abilities';

import { progressBattle } from './progressBattle.js';

const redis = new Meteor.RedisCollection('redis');

export const startBattle = function ({ floor, room, level, wave, health, isTowerContribution, isExplorationRun }) {
  const ticksPerSecond = 1000 / BATTLES.tickDuration;

  let battleData = { enemies: [] };

  if (level) {
    // Is personalQuest (To Do)
    battleData.enemies = FLOORS.personalQuestMonsterGenerator(level, wave);
  } else if (room === 0) {
    // Is tower explore (To Do)
    // Does this do anything?
    battleData.enemies.push(FLOORS.easyTowerMonsterGenerator(floor));
  } else if (room >= 1 && room <= 7) {
    // Is tower room specific
    battleData.enemies = FLOORS.genericTowerMonsterGenerator(floor, room);
  } else if (room === 'boss') {
    // Is tower BOSS (To Do)
    battleData.enemies.push(FLOORS[floor].boss.enemy);
  }

  // Is user in a group? If so this is a group battle
  const currentGroup = Groups.findOne({
    members: Meteor.userId()
  });

  let battleParticipants = [Meteor.userId()];
  if (currentGroup && currentGroup.leader !== Meteor.userId()) {
    throw new Meteor.Error('not-leader', 'You must be the leader to start a battle in a group');
  } else if (currentGroup) {
    battleParticipants = currentGroup.members;
  }

  // Ensure battle particiapnts aren't already in a battle
  const currentBattle = BattlesList.findOne({ owners: battleParticipants });
  if (currentBattle) {
    throw new Meteor.Error('in-battle', 'You cannot start a battle while anyone in your group is still in one.');
  }

  // Ensure battle participants don't have any active adventures
  const activeAdventures = Adventures.findOne({
    owner: {
      $in: battleParticipants
    },
    adventures: {
      $elemMatch :{
        endDate: {
          $gt: new Date()
        }        
      }
    }
  });

  if (activeAdventures) {
    throw new Meteor.Error('in-battle', 'You cannot start a battle while anyone in your group is in an adventure');
  }

  // Ensure group size is not too large
  if (currentGroup) {
    if (room === 'boss') {
      if (currentGroup.members.length > BATTLES.maxBossPartySize) {
        throw new Meteor.Error('to-large', `Your party is too large, maximum party size for boss fights is ${BATTLES.maxBossPartySize}`);
      }
    } else {
      if (currentGroup.members.length > BATTLES.maxTowerPartySize) {
        throw new Meteor.Error('to-large', `Your party is too large, maximum party size for tower fights is ${BATTLES.maxTowerPartySize}`);
      }
    }
  }

  // Create clone of battle objects
  let battleConstants = JSON.parse(JSON.stringify(battleData));

  const newBattle = {
    createdAt: new Date(),
    updatedAt: new Date(),
    owners: battleParticipants,
    floor,
    room,
    wave,
    level,
    isTowerContribution,
    isExplorationRun,
    tickEvents: [],
    units: [],
    enemies: []
  }

  // Battle participants combat stats
  const usersCombatStats = Combat.find({
    owner: {
      $in: battleParticipants
    }
  }).fetch();

  let hasEnergy = true;
  let battleEnergyCost = COMBAT.energyConsumption[room] || 1;

  // Ensure users have energy requirements + havent already fought boss
  usersCombatStats.forEach((userCombat) => {
    if (userCombat.stats.energy < battleEnergyCost) {
      const requirementString = `${userCombat.username} does not have enough energy to start this battle`;
      throw new Meteor.Error("not-enough-energy", requirementString);
      hasEnergy = false;
    }

    if (userCombat.meditatingStartDate) {
      throw new Meteor.Error("is-meditating", `${userCombat.username} is meditating. You cannot battle while meditating`);      
    }

    if (health && userCombat.foughtBoss) {
      throw new Meteor.Error("already-fought-boss", 'You can only fight the boss once a day');
      hasEnergy = false;
    }
  });

  // Inject users into battles units
  usersCombatStats.forEach((userCombat) => {
    const userCombatStats = {};
    COMBAT.statsArr.forEach((statName) => {
      if (userCombat.stats[statName] !== undefined) {
        userCombatStats[statName] = userCombat.stats[statName];
      }
    });

    userCombatStats.attackSpeedTicks = attackSpeedTicks(userCombatStats.attackSpeed);

    // Fetch this users currently equipped abilities
    const usersAbilities = Abilities.findOne({
      owner: userCombat.owner
    });

    const now = moment();
    const secondsElapsed = moment.duration(now.diff(usersAbilities.lastGameUpdated)).asSeconds();

    const usersEquippedAbilities = usersAbilities.learntAbilities.filter((ability) => {
      return ability.equipped;
    }).map((ability) => {
      if (ability.currentCooldown > 0) {
        ability.currentCooldown -= secondsElapsed;
      }

      return {
        id: ability.abilityId,
        level: ability.level,
        currentCooldown: ability.currentCooldown || 0,
        casts: ability.casts,
        totalCasts: 0,
        isSpell: ability.isSpell
      }
    });

    newBattle.units.push({
      id: userCombat.owner,
      owner: userCombat.owner,
      towerContributionsToday: userCombat.towerContributionsToday,
      isTowerContribution: userCombat.isTowerContribution,
      abilities: usersEquippedAbilities,
      name: userCombat.username || 'Unnamed',
      amulet: userCombat.amulet,
      buffs: [],
      mainHandType: userCombat.mainHandType,
      offHandType: userCombat.offHandType,
      stats: userCombatStats,
      xpDistribution: userCombat.xpDistribution,
      tickOffset: _.random(0, 5) + 4,
      icon: 'character'
    });

  });

  if (!hasEnergy) {
    return;
  }

  let totalXpGain = 0;

  // Inject enemies into the battle
  battleConstants.enemies.forEach((enemy) => {
    let enemyConstants;

    // If this is a dynamic mob, it will already have stats
    if (enemy.stats) {
      enemyConstants = enemy;
    } else {
      enemyConstants = JSON.parse(JSON.stringify(ENEMIES[enemy.id]));
    }

    const enemyStats = enemyConstants.stats;

    // This is the current active boss battle
    if (enemyConstants.isBoss && health) {
      enemyStats.health = health;
      enemyStats.healthMax = health;
    }
    enemyStats.attackSpeedTicks = Math.round(ticksPerSecond / enemyStats.attackSpeed);

    if (!enemy.amount) {
      enemy.amount = 1;
    }

    for (let i = 0; i < enemy.amount; i++) {
      const randomUnitTarget = _.sample(newBattle.units);
      totalXpGain += BATTLES.xpGain(enemyStats, enemyConstants.buffs);
      newBattle.enemies.push({
        id: Random.id(),
        stats: enemyStats,
        icon: enemyConstants.icon,
        buffs: enemyConstants.buffs || [],
        target: randomUnitTarget.id,
        enemyId: enemyConstants.id,
        name: enemyConstants.name,
        tickOffset: _.random(0, 5) + 4
      });
    }
  });

  // Make random targets for units
  newBattle.units.forEach((unit) => {
    const randomEnemyTarget = _.sample(newBattle.enemies);
    unit.target = randomEnemyTarget.id;
  });

  newBattle.totalXpGain = totalXpGain;
  newBattle.deadUnits = [];
  newBattle.deadEnemies = [];

  // Is the currently active boss battle
  if (health) {
    newBattle.startingBossHp = health;
  }

  // Save battle
  const actualBattleId = BattlesList.insert({ owners: newBattle.owners, createdAt: new Date () });

  newBattle.tick = 0;
  newBattle._id = actualBattleId;
  redis.set(`battles-${newBattle._id}`, JSON.stringify(newBattle));
  const actualBattle = newBattle;

  // Take energy from all members
  Combat.update({
    owner: {
      $in: battleParticipants
    }
  }, {
    $inc: {
      'stats.energy': (battleEnergyCost * -1)
    }
  }, { multi: true });

  // Progress battle
  const battleIntervalId = Meteor.setInterval(() => {
    progressBattle(actualBattle, battleIntervalId);
  }, BATTLES.tickDuration); // Tick Duration ( Should be 250 by default )
}
