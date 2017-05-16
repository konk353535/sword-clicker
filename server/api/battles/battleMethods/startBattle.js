import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { ENEMIES } from '/server/constants/enemies/index.js'; // List of enemies
import { COMBAT, ABILITIES, BUFFS } from '/server/constants/combat/index.js'; // List of available combat stats
import { FLOORS } from '/server/constants/floors/index.js'; // List of floor details

import { Random } from 'meteor/random'
import moment from 'moment';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';

import { Groups } from '/imports/api/groups/groups';
import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Combat } from '/imports/api/combat/combat';
import { Abilities } from '/imports/api/abilities/abilities';

import { progressBattle } from './progressBattle.js';

const redis = new Meteor.RedisCollection('redis');

export const startBattle = function ({ floor, difficulty, level, wave, health, isTowerContribution }) {
  const ticksPerSecond = 1000 / BATTLES.tickDuration;

  let battleData = { enemies: [] };

  if (level) {
    // Is personalQuest
    battleData.enemies.push(FLOORS.personalQuestMonsterGenerator(level));
  } else if (difficulty === 'easy') {
    // Is tower EASY
    battleData.enemies.push(FLOORS.easyTowerMonsterGenerator(floor));
  } else if (difficulty === 'hard') {
    // Is tower HARD
    battleData.enemies.push(FLOORS.hardTowerMonsterGenerator(floor));
    battleData.enemies.push(FLOORS.hardTowerMonsterGenerator(floor));
  } else if (difficulty === 'veryHard') {
    // Is tower VERY HARD
    battleData.enemies.push(FLOORS.veryHardTowerMonsterGenerator(floor));
    battleData.enemies.push(FLOORS.veryHardTowerMonsterGenerator(floor));
    battleData.enemies.push(FLOORS.veryHardTowerMonsterGenerator(floor));
  } else if (difficulty === 'boss') {
    // Is tower BOSS
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
    throw new Meteor.Error('in-battle', 'You cannot start a battle while anyone in ur group is still in one.');
  }

  // Ensure group size is not too large
  if (currentGroup) {
    if (difficulty === 'boss') {
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

  // This seems overkill? Can we just do this on equip / level up?
  // To do: Ensure this is no longer required
  // updateCombatStats();

  const newBattle = {
    createdAt: new Date(),
    updatedAt: new Date(),
    owners: battleParticipants,
    floor,
    difficulty,
    wave,
    level,
    isTowerContribution,
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
  let battleEnergyCost = COMBAT.energyConsumption[difficulty] || 1;

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
      abilities: usersEquippedAbilities,
      name: userCombat.username || 'Unnamed',
      amulet: userCombat.amulet,
      stats: userCombatStats,
      xpDistribution: userCombat.xpDistribution,
      tickOffset: _.random(0, 5),
      icon: 'character'
    });

    // Duplicate units x10 to simulate a raid boss party
    /*
    for (let i = 0; i < 9; i++) {
      let tempId = Random.id();
      newBattle.units.push({
        id: tempId,
        owner: tempId,
        abilities: usersEquippedAbilities,
        name: `Test_${i}`,
        stats: userCombatStats,
        tickOffset: _.random(0, 5),
        xpDistribution: userCombat.xpDistribution,
        icon: 'character'
      });
    }*/

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
      enemyConstants = ENEMIES[enemy.id];
    }

    const enemyStats = enemyConstants.stats;

    // This is the current active boss battle
    if (enemyConstants.isBoss && health) {
      enemyStats.health = health;
    }
    enemyStats.attackSpeedTicks = Math.round(ticksPerSecond / enemyStats.attackSpeed);

    if (!enemy.amount) {
      enemy.amount = 1;
    }

    for (let i = 0; i < enemy.amount; i++) {
      const randomUnitTarget = _.sample(newBattle.units);
      totalXpGain += BATTLES.xpGain(enemyStats);
      newBattle.enemies.push({
        id: Random.id(),
        stats: enemyStats,
        icon: enemyConstants.icon,
        buffs: enemyConstants.buffs || [],
        target: randomUnitTarget.id,
        enemyId: enemyConstants.id,
        name: enemyConstants.name,
        tickOffset: _.random(0, 5)
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
