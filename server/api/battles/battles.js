import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import _ from 'underscore';

import { Floors } from '/imports/api/floors/floors';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';

import { Groups } from '/imports/api/groups/groups';
import { Battles } from '/imports/api/battles/battles';
import { BattleActions } from '/imports/api/battles/battleActions';
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
    incrementData[`${actualBattle.difficulty}Waves`] = -1;

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
    });

    if (actualBattle.floor && actualBattle.difficulty) {
      // Decrement floor
      Floors.update({
        floor: actualBattle.floor,
        floorComplete: false
      }, {
        $inc: incrementData
      });

      // Update all participants contributions
      owners.forEach((owner) => {
        // Find owner object
        const ownerObject = _.findWhere(units, { owner });
        const updateSelector = { owner, floor: actualBattle.floor };

        const updateModifier = {
          $inc: {},
          $setOnInsert: {
            easyWaves: 0,
            hardWaves: 0,
            veryHardWaves: 0,
            username: ownerObject.name // To do: Make this work when users have multiple units
          }
        };
        updateModifier['$inc'][`${actualBattle.difficulty}Waves`] = 1;
        updateModifier['$setOnInsert'][`${actualBattle.difficulty}Waves`] = 1;

        FloorWaveScores.upsert(updateSelector, updateModifier)
      });
    }

  } else {
    // Lost
    win = false;
  }

  // Update all player units healths
  const allFriendlyUnits = actualBattle.units.concat(actualBattle.deadUnits);
  allFriendlyUnits.forEach((unit) => {
    // Update relevant stuff
    Combat.update({
      owner: unit.owner
    }, {
      $set: {
        'stats.health': (unit.stats.health > 0 ? Math.floor(unit.stats.health) : 0)
      }
    });
  });

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

  // Fetch actions related to this battle
  const battleActions = BattleActions.find({
    battleId: actualBattle._id
  }).fetch();

  // Apply misc actions ( not damage related )
  battleActions.forEach((action) => {
    if (action.abilityId === 'changeTarget') {
      // Modify casters preferred target
      const targetUnit = _.findWhere(actualBattle.units, { id: action.caster });
      if (targetUnit) {
        targetUnit.target = action.target;
      }
    }
  });

  const dealDamage = function(attackerStats, defenderStats) {
    // return 0; // Temporary to cause infinite battles for developing
    const hitChance = 0.4 + ((attackerStats.accuracy - defenderStats.defense) / 200);

    if (hitChance >= Math.random()) {
      // Determine how much damage we will deal
      const extraRawDamage = Math.round(Math.random() * (attackerStats.attackMax - attackerStats.attack));
      const rawDamage = attackerStats.attack + extraRawDamage;

      // Determine damage reduction from armor
      const dmgReduction = BATTLES.dmgReduction(defenderStats.armor);

      return (rawDamage * (1 - dmgReduction)) * defenderStats.damageTaken;
    } else {
      return 0;
    }
  }

  // Apply enemy attacks
  actualBattle.enemies.forEach((enemy) => {
    if (currentTick % enemy.stats.attackSpeedTicks === 0) {
      let defender = actualBattle.units[0];
      if (enemy.target) {
        const targetUnit = _.findWhere(actualBattle.units, { id: enemy.target });
        if (targetUnit) {
          defender = targetUnit;
        } else {
          delete enemy.target;
        }
      }
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

  // Remove any dead units
  for (let i = actualBattle.units.length - 1; i >= 0; i--) {
    const unit = actualBattle.units[i];
    if (unit.stats.health <= 0) {
      actualBattle.deadUnits.push(unit);
      actualBattle.units.splice(i, 1);
    }
  }

  // Apply player attacks
  actualBattle.units.forEach((unit) => {
    if (unit && currentTick % unit.stats.attackSpeedTicks === 0) {
      let defender = actualBattle.enemies[0];
      // Do we have a preferred target
      if (unit.target) {
        const targetEnemy = _.findWhere(actualBattle.enemies, { id: unit.target });
        if (targetEnemy) {
          defender = targetEnemy;
        } else {
          delete unit.target;
        }
      }
      if (defender) {
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

  // Remove all battle actions as we've got them for this tick
  BattleActions.remove({
    _id: {
      $in: battleActions.map((item) => item._id)
    }
  });

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
    Meteor.setTimeout(() => {
      completeBattle(actualBattle);
    }, 2000);
  }
}

const startBattle = function (battleId, floor, difficulty) {
  const ticksPerSecond = 1000 / BATTLES.tickDuration;

  // Is user in a group? If so this is a group battle
  const currentGroup = Groups.findOne({
    members: Meteor.userId()
  });

  let battleParticipants = [Meteor.userId()];
  if (currentGroup && currentGroup.leader !== Meteor.userId()) {
    // To do: Show this error to users
    console.log('You must be the leader to start a battle in a group');
    return;
  } else if (currentGroup) {
    battleParticipants = currentGroup.members;
  }

  // Ensure battle particiapnts aren't already in a battle
  const currentBattle = Battles.findOne({ owners: battleParticipants, finished: false });
  if (currentBattle) {
    // All members of the group must not be in a battle, to start one
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

  // This seems overkill? Can we just do this on equip / level up?
  // To do: Ensure this is no longer required
  // updateCombatStats();

  const newBattle = {
    createdAt: new Date(),
    updatedAt: new Date(),
    owners: battleParticipants,
    floor,
    difficulty,
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

  // Inject users into battles units
  usersCombatStats.forEach((userCombat) => {
    if (userCombat.stats.energy < battleEnergyCost) {
      const requirementString = `${userCombat.username} does not have enough energy to start this battle`;
      throw new Meteor.Error("not-enough-energy", requirementString);
      hasEnergy = false;
    }
    const userCombatStats = {};
    COMBAT.statsArr.forEach((statName) => {
      if (userCombat.stats[statName]) {
        userCombatStats[statName] = userCombat.stats[statName];
      }
    });
    // Convert attack speed seconds to attack speed ticks
    if (userCombatStats.attackSpeed !== undefined) {
      userCombatStats.attackSpeedTicks = Math.round(ticksPerSecond / userCombatStats.attackSpeed);
    }
    newBattle.units.push({
      id: userCombat.owner,
      owner: userCombat.owner,
      name: userCombat.username || 'Unnamed',
      stats: userCombatStats,
      xpDistribution: userCombat.xpDistribution,
      icon: 'character'
    });
  });

  if (!hasEnergy) {
    return;
  }

  let totalXpGain = 0;

  // Inject enemies into the battle
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

export const resumeBattle = function(id) {
  // Find the battle
  const actualBattle = Battles.findOne(id);

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

    if (currentFloor[`${difficulty}Waves`] <= 0) {
      floor = null;
      difficulty = null;
    }

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
  },

  'battles.currentFloorHighscores'() {
    // Fetch current active floor
    const currentFloor = Floors.findOne({ floorComplete: false });

    // Fetch top 10 for each difficulty
    return FloorWaveScores.find({
      floor: currentFloor.floor
    }, {
      sort: {
        veryHardWaves: -1,
        hardWaves: -1,
        easyWaves: -1
      },
      limit: 10
    }).fetch()
  },

  'battles.castAbility'(battleId, abilityId, options) {
    // Fetch the battle
    const targetBattle = Battles.findOne({
      _id: battleId,
      owners: Meteor.userId()
    });

    if (!targetBattle) {
      throw new Meteor.Error("battle-not-found", "Ability cannot be cast on battle that doesnt exist");
    }

    if (options.caster && options.caster !== Meteor.userId()) {
      throw new Meteor.Error("access-denied", "You do not have control of that caster");
    }

    BattleActions.insert({
      battleId,
      abilityId,
      caster: options.caster,
      target: options.target
    });
  }
});

Meteor.publish('battles', function() {
  return Battles.find({
    owners: this.userId
  });
});

