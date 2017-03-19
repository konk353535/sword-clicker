import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import _ from 'underscore';

import { Floors } from '/imports/api/floors/floors';
import { Battles } from '/imports/api/battles/battles';
import { Combat } from '/imports/api/combat/combat';
import { updateCombatStats } from '/server/api/combat/combat';
import { addXp } from '/server/api/skills/skills';
import { addItem } from '/server/api/items/items';

import { ITEMS } from '/server/constants/items/index.js'; // List of items
import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { FLOORS } from '/server/constants/floors/index.js'; // List of floor details
import { ENEMIES } from '/server/constants/enemies/index.js'; // List of enemies
import { COMBAT } from '/server/constants/combat/index.js'; // List of available combat stats

const completeBattle = function (actualBattle) {
  const finalTickEvents = [];
  let win;

  if (actualBattle.units.length > 0) {
    const incrementData = {};
    incrementData[`${actualBattle.difficulty}Waves`] = -1
    // Decrement floor
    Floors.update({
      floor: actualBattle.floor,
      floorComplete: false
    }, {
      $inc: incrementData
    });

    // Won
    win = true;

    // Apply xp gains
    const totalXpGain = actualBattle.totalXpGain;
    const units = actualBattle.units.concat(actualBattle.deadUnits);
    units.forEach((unit) => {
      // Distribute xp gained evenly across units
      const xpPortion = totalXpGain / units.length;
      Object.keys(unit.xpDistribution).forEach((skillName) => {
        // Distribute xp gained per player, per skill
        // Eg: Dagger is full attack xp, sword = 50% attack / 50% defense, ect
        const skillXpPortion = Math.round(xpPortion * unit.xpDistribution[skillName]);

        addXp(skillName, skillXpPortion, unit.id);
        finalTickEvents.push({
          type: 'xp',
          amount: skillXpPortion,
          skill: skillName,
          owner: unit.owner
        })
      });
    });

    // Apply rewards for killing monsters
    const rewardsGained = [];
    actualBattle.deadEnemies.forEach((deadEnemy) => {
      const rewards = ENEMIES[deadEnemy.enemyId].rewards;
      const diceRoll = Math.random();
      for (let i = 0; i < rewards.length; i++) {
        const reward = rewards[i];
        if (reward.chance >= diceRoll) {
          rewardsGained.push(reward);
          break;          
        }
      }
    });

    // Process rewards to peeps
    const owners = _.uniq(units.map((unit) => unit.owner));
    rewardsGained.forEach((rewardGained) => {
      if (rewardGained.type === 'item') {
        const luckyOwner = owners[_.random(0, owners.length - 1)];
        addItem(rewardGained.itemId, rewardGained.amount, luckyOwner);
        finalTickEvents.push({
          type: 'item',
          amount: rewardGained.amount,
          itemId: rewardGained.itemId,
          icon: ITEMS[rewardGained.itemId].icon,
          owner: luckyOwner
        });
      }
    })
  } else {
    // Lost
    win = false;
  }

  Battles.update(actualBattle._id, {
    $set: {
      finished: true,
      win,
      finalTickEvents,
      updatedAt: new Date()   
    }
  });

  // Delete battle as it is over
  // Battles.remove(actualBattle._id);
}

const progressBattle = function (actualBattle, battleIntervalId) {
  const currentTick = actualBattle.tick;
  const tickEvents = [];

  const dealDamage = function(attackerStats, defenderStats) {
    const hitChance = (100 + (attackerStats.accuracy - defenderStats.defense)) / 200;

    if (hitChance >= Math.random()) {
      // Determine how much damage we will deal
      const extraRawDamage = Math.round(Math.random() * (attackerStats.attackMax - attackerStats.attack));
      const rawDamage = attackerStats.attack + extraRawDamage;

      // Determine damage reduction from armor
      const dmgReduction = BATTLES.dmgReduction(defenderStats.armor);

      return rawDamage * (1 - dmgReduction);
    } else {
      return 0;
    }
  }

  // Apply enemy attacks
  actualBattle.enemies.forEach((enemy) => {
    if (currentTick % enemy.stats.attackSpeedTicks === 0) {
      const defender = actualBattle.units[0];
      // Attack
      const damageToDeal = dealDamage(enemy.stats, defender.stats);
      tickEvents.push({
        from: enemy.id,
        to: defender.id,
        eventType: 'damage',
        label: Math.round(damageToDeal)
      });
      defender.stats.health -= damageToDeal;
    }
  });

  // Apply player attacks
  actualBattle.units.forEach((unit) => {
    if (unit && currentTick % unit.stats.attackSpeedTicks === 0) {
      const defender = actualBattle.enemies[0];
      // Attack
      const damageToDeal = dealDamage(unit.stats, defender.stats);
      tickEvents.push({
        from: unit.id,
        to: defender.id,
        eventType: 'damage',
        label: Math.round(damageToDeal)
      });
      defender.stats.health -= damageToDeal;
    }
  });

  actualBattle.tick += 1;

  // Remove any dead enemies
  for (let i = actualBattle.enemies.length - 1; i >= 0; i--) {
    const enemy = actualBattle.enemies[i];
    if (enemy.stats.health <= 0) {
      actualBattle.deadEnemies.push(enemy);
      actualBattle.enemies.splice(i, 1);
    }
  }

  // Remove any dead units
  for (let i = actualBattle.units.length - 1; i >= 0; i--) {
    const unit = actualBattle.units[i];
    if (unit.stats.health <= 0) {
      actualBattle.deadUnits.push(unit);
      actualBattle.units.splice(i, 1);
    }
  }

  Battles.update(actualBattle._id, {
    $set: {
      tick: actualBattle.tick,
      units: actualBattle.units,
      deadUnits: actualBattle.deadUnits,
      deadEnemies: actualBattle.deadEnemies,
      enemies: actualBattle.enemies,
      tickEvents,
      updatedAt: new Date()
    }
  });

  if (actualBattle.enemies.length === 0 || actualBattle.units.length === 0) {
    Meteor.clearInterval(battleIntervalId);
    completeBattle(actualBattle);
  }
}

const startBattle = function (battleId, floor, difficulty) {
  const ticksPerSecond = 1000 / BATTLES.tickDuration;

  // Ensure user isn't already in a battle
  const currentBattle = Battles.findOne({ owners: Meteor.userId(), finished: false });
  if (currentBattle) {
    return;
  }

  // Find specified battleId
  let battleConstants = BATTLES[battleId];

  // Ensure valid battle id
  if (!battleConstants) {
    // Fallback to check if this is a single enemy battle
    if (ENEMIES[battleId]) {
      battleConstants = {
        enemies: [{
          id: battleId,
          amount: 1
        }]
      }
    } else {
      return;
    }
  }

  updateCombatStats();

  const newBattle = {
    createdAt: new Date(),
    updatedAt: new Date(),
    owners: [Meteor.userId()],
    floor,
    difficulty,
    tickEvents: [],
    units: [],
    enemies: []
  }

  // Current users combat stats
  const userCombat = Combat.findOne({ owner: Meteor.userId() });
  
  // Inject user into fights units
  const userCombatStats = {};
  COMBAT.statsArr.forEach((statName) => {
    if (userCombat[statName]) {
      userCombatStats[statName] = userCombat[statName];
    }
  });
  // Convert attack speed seconds to attack speed ticks
  if (userCombatStats.attackSpeed !== undefined) {
    userCombatStats.attackSpeedTicks = Math.round(ticksPerSecond / userCombatStats.attackSpeed);
  }
  newBattle.units.push({
    id: Meteor.userId(),
    owner: Meteor.userId(),
    stats: userCombatStats,
    xpDistribution: userCombat.xpDistribution,
    icon: 'character'
  });

  let totalXpGain = 0;

  // Inject enemies into the fight
  battleConstants.enemies.forEach((enemy) => {
    const enemyConstants = ENEMIES[enemy.id];
    const enemyStats = enemyConstants.stats;
    enemyStats.attackSpeedTicks = Math.round(ticksPerSecond / enemyStats.attackSpeed);
    for (let i = 0; i < enemy.amount; i++) {
      totalXpGain += BATTLES.xpGain(enemyStats);
      newBattle.enemies.push({
        id: Random.id(),
        stats: enemyStats,
        icon: enemyConstants.icon,
        enemyId: enemyConstants.id,
        name: enemyConstants.name
      });
    }
  });

  newBattle.totalXpGain = totalXpGain;
  newBattle.deadUnits = [];
  newBattle.deadEnemies = [];

  // Save battle
  const actualBattleId = Battles.insert(newBattle);
  const actualBattle = Battles.findOne(actualBattleId);

  // Progress battle
  const battleIntervalId = Meteor.setInterval(() => {
    progressBattle(actualBattle, battleIntervalId);
  }, BATTLES.tickDuration); // Tick Duration ( Should be 250 by default )
}


Meteor.methods({
  'battles.findBattle'(floor, difficulty) {
    if (!_.contains(['easy', 'hard', 'veryHard'], difficulty)) {
      return;
    }

    // Ensure the floor specified is currently open
    const currentFloor = Floors.findOne({ floorComplete: false });

    if (floor > currentFloor) {
      return;
    }

    const possibleBattles = FLOORS[floor][difficulty].possibleBattles;

    // Eventually select a random battle appropriate to users level
    startBattle(_.sample(possibleBattles), floor, difficulty);
  },

  'battles.getWaveDetails'() {
    const currentFloor = Floors.findOne({ floorComplete: false });

    return {
      easyWaves: currentFloor.easyWaves,
      easyWavesTotal: currentFloor.easyWavesTotal,
      hardWaves: currentFloor.hardWaves,
      hardWavesTotal: currentFloor.hardWavesTotal,
      veryHardWaves: currentFloor.veryHardWaves,
      veryHardWavesTotal: currentFloor.veryHardWavesTotal,
    }
  },

  'battles.getFloorDetails'(floorNumber = 1) {
    // Fetch specified floor details ( constants + current floor details )
    const currentFloor = Floors.findOne({ floorComplete: false });

    // Can't access floors the community hasn't got to yet
    if (currentFloor.floor < floorNumber) {
      return;
    }

    const specifiedFloorConstants = FLOORS[floorNumber];

    if (currentFloor.floor === floorNumber) {
      return {
        waveDetails: {
          easyWaves: currentFloor.easyWaves,
          easyWavesTotal: currentFloor.easyWavesTotal,
          hardWaves: currentFloor.hardWaves,
          hardWavesTotal: currentFloor.hardWavesTotal,
          veryHardWaves: currentFloor.veryHardWaves,
          veryHardWavesTotal: currentFloor.veryHardWavesTotal,
        },
        floorDetails: specifiedFloorConstants
      }
    }

    return {
      floorDetails: specifiedFloorConstants
    }
  }
});

Meteor.publish('battles', function() {
  return Battles.find({
    owners: this.userId
  });
});
