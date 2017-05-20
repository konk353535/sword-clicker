import _ from 'underscore';

import { ENEMIES } from '/server/constants/enemies/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { FLOORS } from '/server/constants/floors/index.js';
import { MAGIC } from '/server/constants/magic/index.js';
import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters

import { addXp } from '/server/api/skills/skills';
import { addItem } from '/server/api/items/items';

import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Floors } from '/imports/api/floors/floors';
import { Users } from '/imports/api/users/users';
import { Abilities } from '/imports/api/abilities/abilities';
import { Combat } from '/imports/api/combat/combat';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';
import { Chats } from 'meteor/cesarve:simple-chat/collections';
import weightedRandom from 'weighted-random';

const redis = new Meteor.RedisCollection('redis');

const POINTS = {
  easy: 1,
  hard: 5,
  veryHard: 20
}

const distributeRewards = function distributeRewards({ floor }) {
  console.log('Distributing rewards');

  // Fetch the rewards
  const rawFloorRewards = FLOORS[floor].floorRewards;
  const floorRewards = [];
  rawFloorRewards.forEach((reward) => {
    for (let i = 0; i < reward.amount; i++) {
      floorRewards.push(reward.itemId);
    }
  });
  let randomizedFloorRewards = _.shuffle(floorRewards);

  console.log('Rewards');
  console.log(randomizedFloorRewards);

  // Fetch top 10 by damage dealt
  const sortedBossHealthScores = BossHealthScores.find({}, {
    sort: [
      ['bossDamage', 'desc']
    ],
    limit: 10
  }).fetch();

  console.log(sortedBossHealthScores);

  // Fetch top 10 by wave score points
  const sortedFloorWaveScores = FloorWaveScores.find({
    floor
  }, {
    sort: [
      ['points', 'desc']
    ],
    limit: 10
  }).fetch();

  console.log(sortedFloorWaveScores);

  sortedFloorWaveScores.concat(sortedBossHealthScores).forEach((target) => {
    const reward = randomizedFloorRewards.pop();
    console.log(`Giving ${reward} to ${target.owner}`)
    addItem(reward, 1, target.owner);
  });

  try {
    let bossDamageRewardsCount = Math.floor(randomizedFloorRewards.length / 2);
    let floorWaveRewardsCount = Math.floor(randomizedFloorRewards.length / 2);

    // Weighted lottery for boss damage
    const allDamages = BossHealthScores.find({}).fetch();
    const allDamageWeights = allDamages.map((item) => {
      return parseInt(item.bossDamage);
    });

    console.log('allDamages');
    console.log(allDamages);

    for (let i = 0; i < bossDamageRewardsCount; i++) {
      const selectionIndex = weightedRandom(allDamageWeights);
      const reward = randomizedFloorRewards.pop();
      console.log(`selection index - ${selectionIndex}`);
      addItem(reward, 1, allDamages[selectionIndex].owner);
    }

    // Weighted lottery for waves
    const floorPoints = FloorWaveScores.find({ floor }).fetch();
    const floorPointsWeights = floorPoints.map((item) => {
      return parseInt(item.points) || 0;
    });

    console.log('floorPoints');
    console.log(floorPoints);

    for (let i = 0; i < floorWaveRewardsCount; i++) {
      const selectionIndex = weightedRandom(floorPointsWeights);
      const reward = randomizedFloorRewards.pop();
      console.log(`selection index - ${selectionIndex}`);
      addItem(reward, 1, floorPoints[selectionIndex].owner);
    }
  } catch(err) {
    console.log('Error while processing rewards for floor completion');
    console.log(err);
  }
}

export const completeBattle = function (actualBattle) {
  const finalTickEvents = [];
  let win = actualBattle.units.length > 0;

  if (!win && actualBattle.isExplorationRun) {
    // Take back the xp values for the current wave (as they failed it)
    const newMonsters = FLOORS.genericTowerMonsterGenerator(actualBattle.floor, actualBattle.room);
    // Inject into battle
    newMonsters.forEach((monster) => {
      actualBattle.totalXpGain -= BATTLES.xpGain(monster.stats);
    });
  }

  if (win || actualBattle.isExplorationRun) {
    // Mutate points values / calculate points
    let pointsEarnt = 0;

    if (actualBattle.isTowerContribution) {
      if (win) {
        // Count current room
        pointsEarnt += Math.pow(1.7, actualBattle.room);
      } else {
        // Get hp of current wave
        let totalHp = 0;
        let currentHp = 0;
        actualBattle.enemies.concat(actualBattle.deadEnemies).forEach((enemy) => {
          totalHp += enemy.stats.healthMax;
          currentHp += enemy.stats.health;
        });

        const decimalCompletion = 1 - (currentHp / totalHp);

        pointsEarnt += (Math.pow(1.7, actualBattle.room) * decimalCompletion);
      }

      // Add points from previous rooms
      for (let i = actualBattle.room - 1; i > 0; i--) {
        pointsEarnt += Math.pow(1.7, actualBattle.room);
      }
    }

    console.log(`Points earnt - ${pointsEarnt}`);

    // Apply xp gains, only if not a boss battle
    const totalXpGain = actualBattle.totalXpGain;
    const units = actualBattle.units.concat(actualBattle.deadUnits);

    if (!actualBattle.startingBossHp) {
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
    }

    // Apply rewards for killing monsters (To do, later)
    const rewardsGained = [];
    actualBattle.deadEnemies.forEach((deadEnemy) => {
      let rewards = [];
      if (actualBattle.level) {
        rewards = FLOORS.personalQuestMonsterGenerator(actualBattle.level).rewards;
      }

      for (let i = 0; i < rewards.length; i++) {
        const rewardTable = rewards[i];
        const diceRoll = Math.random();

        if (rewardTable.chance >= diceRoll) {
          rewardsGained.push(_.sample(rewardTable.rewards));
          break;          
        }
      }
    });

    // Apply rewards for complete wave ( if this is a tower battle )
    let floorRewards = [];
    if (actualBattle.floor) {
      if (win) {
        console.log(`Is win applying rewards for ${actualBattle.room}`);
        floorRewards.push(...FLOORS[actualBattle.floor][actualBattle.room].rewards);
      } else {
        console.log(`Is loss no rewards for ${actualBattle.room}`);        
      }

      if (actualBattle.isExplorationRun) {
        // Add rewards from previous rooms
        for (let i = actualBattle.room - 1; i > 0; i--) {
          console.log(`Applying rewards for room ${i}`);
          floorRewards.push(...FLOORS[actualBattle.floor][i].rewards);
        }
      }
    }

    for (let i = 0; i < floorRewards.length; i++) {
      const rewardTable = floorRewards[i];
      const diceRoll = Math.random();

      if (rewardTable.chance >= diceRoll) {
        rewardsGained.push(_.sample(rewardTable.rewards));
        break;          
      }
    }

    // Process rewards to peeps
    const owners = _.uniq(units.map((unit) => unit.owner));
    rewardsGained.forEach((rewardGained) => {
      if (rewardGained.type === 'item') {
        const luckyOwner = _.sample(owners);
        addItem(rewardGained.itemId, rewardGained.amount, luckyOwner);
        finalTickEvents.push({
          type: 'item',
          amount: rewardGained.amount,
          itemId: rewardGained.itemId,
          icon: ITEMS[rewardGained.itemId].icon,
          owner: luckyOwner
        });
      } else if (rewardGained.type === 'gold') {
        const luckyOwner = _.sample(owners);
        Users.update(luckyOwner, {
          $inc: {
            gold: rewardGained.amount
          }
        });
        finalTickEvents.push({
          type: 'gold',
          amount: rewardGained.amount,
          itemId: rewardGained.itemId,
          icon: 'gold',
          owner: luckyOwner
        });
      }
    });

    if (actualBattle.floor && actualBattle.room && actualBattle.isTowerContribution) {
      if (actualBattle.room !== 'boss') {
        // Increment total points data
        Floors.update({
          floor: actualBattle.floor,
          floorComplete: false
        }, {
          $inc: {
            points: pointsEarnt
          }
        });

        // Update all participants contributions
        owners.forEach((owner) => {
          // Find owner object
          const ownerObject = _.findWhere(units, { owner });
          if (ownerObject.isTowerContribution && ownerObject.towerContributionsToday < 3) {
            ownerObject.towerContributionsToday++

            const updateSelector = { owner, floor: actualBattle.floor };

            const updateModifier = {
              $inc: {
                points: pointsEarnt
              },
              $setOnInsert: {
                points: pointsEarnt,
                username: ownerObject.name // To do: Make this work when users have multiple units
              }
            };

            finalTickEvents.push({
              type: 'points',
              amount: pointsEarnt.toFixed(1),
              icon: 'tower',
              owner
            });

            FloorWaveScores.upsert(updateSelector, updateModifier);
          }
        });
      }
    } else if (actualBattle.level && actualBattle.wave) {
      // Should only be for one person? but a good habit I guess?
      owners.forEach((owner) => {
        const userObject = Users.findOne({ _id: owner });
        if (userObject.personalQuest.level === actualBattle.level) {
          if (actualBattle.wave + 1 > 5) {
            Users.update(owner, {
              $set: {
                'personalQuest.level': actualBattle.level + 1,
                'personalQuest.wave': 1
              }
            })
          } else {
            Users.update(owner, {
              $set: {
                'personalQuest.wave': actualBattle.wave + 1
              }
            });
          }
        }
      });
    }
  }

  // Update all player units healths
  const allFriendlyUnits = actualBattle.units.concat(actualBattle.deadUnits);
  allFriendlyUnits.forEach((unit) => {
    const combatModifier = {
      $set: {
        'stats.health': (unit.stats.health > 0 ? Math.floor(unit.stats.health) : 0),
        'towerContributionsToday': unit.towerContributionsToday
      }
    };
    if (actualBattle.startingBossHp) {
      combatModifier['$set'].foughtBoss = true;
    }
    if (unit.amulet) {
      combatModifier['$set']['amulet.energy'] = unit.amulet.energy;
    }

    let totalMagicXp = 0;

    unit.abilities.forEach((ability) => {
      if (ability.isSpell) {
        const spellConstants = MAGIC.spells[ability.id];
        totalMagicXp += ability.totalCasts * spellConstants.xp;
      }
    });

    if (totalMagicXp > 0) {
      addXp('magic', totalMagicXp, unit.owner);

      finalTickEvents.push({
        type: 'xp',
        amount: totalMagicXp,
        skill: 'magic',
        owner: unit.owner
      });
    }

    // Update relevant stuff, use callback so this is non blocking
    Combat.update({
      owner: unit.owner
    }, combatModifier, (err, res) => {
      // This is intentionally empty
      // As providing a callback means this will not block the loop from continuing

      // Update ability cooldowns ect
      const userAbilities = Abilities.findOne({
        owner: unit.owner
      });

      if (userAbilities) {
        // Modify relevant abiltiy id cooldowns and update
        userAbilities.learntAbilities.forEach((ability) => {
          const abilityToUpdate = _.findWhere(unit.abilities, { id: ability.abilityId });
          if (abilityToUpdate) {
            if (abilityToUpdate.isSpell) {
              ability.casts = abilityToUpdate.casts;
            }
            ability.currentCooldown = abilityToUpdate.currentCooldown;
          }
        });

        Abilities.update(userAbilities._id, {
          $set: {
            learntAbilities: userAbilities.learntAbilities,
            lastGameUpdated: new Date()
          }
        });
      }
    });
  });


  // Is this a current boss battle?
  if (actualBattle.startingBossHp) {
    const allEnemies = actualBattle.enemies.concat(actualBattle.deadEnemies);
    const damageDealt = actualBattle.startingBossHp - allEnemies[0].stats.health;

    console.log(`Damage dealth to boss ${damageDealt}`);

    // Update players contributions
    allFriendlyUnits.forEach((unit) => {
      BossHealthScores.insert({
        owner: unit.owner,
        username: unit.name,
        bossDamage: damageDealt
      });
    });

    // Update bosses hp
    const currentFloor = Floors.findOne({ floorComplete: false, floor: actualBattle.floor });
    if (currentFloor) {
      currentFloor.health -= damageDealt;

      if (currentFloor.health <= 0) {
        console.log('Health is below 0');
        // Complete the floor!
        let updatedCount = Floors.update({
          floor: actualBattle.floor,
          floorComplete: false
        }, {
          $set: {
            floorComplete: true
          }
        });

        console.log(`Updated count is ${updatedCount}`);
        if (updatedCount === 1) {
          // Distribute rewards
          distributeRewards({ floor: actualBattle.floor });

          // Notify general chat
          Chats.insert({
            message: `The boss on floor ${actualBattle.floor} has been defeated!
              Floor ${actualBattle.floor + 1} is now unlocked.`,
            username: 'SERVER',
            name: 'SERVER',
            date: new Date(),
            roomId: 'General'
          });

          // Insert the next floor (To do, make this pass a valid active tower users number)
          const newPointMax = FLOORS.getNewPointCount(actualBattle.floor + 1, 10);

          // Get bosses hp
          const bossEnemyId = FLOORS[actualBattle.floor + 1].boss.enemy.id;
          const bossEnemyConstants = ENEMIES[bossEnemyId];

          // Create our next floor
          Floors.insert({
            floor: actualBattle.floor + 1,
            createdAt: new Date(),
            points: 0,
            pointsMax: newPointMax, // Need some kind of
            health: bossEnemyConstants.stats.healthMax,
            healthMax: bossEnemyConstants.stats.healthMax
          });
        }
      } else {
        // Just update the bosses hp
        Floors.update(currentFloor._id, {
          $inc: {
            health: damageDealt * -1
          }
        });
      }
    }
  }

  Battles.insert({
    owners: actualBattle.owners,
    finished: true,
    win,
    finalTickEvents,
    updatedAt: new Date(),
    createdAt: new Date()
  });

  // Remove from battle list
  BattlesList.remove(actualBattle._id);

  // Remove from redis
  redis.del(`battles-${actualBattle._id}`);  
}
