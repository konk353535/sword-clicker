import _ from 'underscore';

import { ENEMIES } from '/server/constants/enemies/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { FLOORS } from '/server/constants/floors/index.js';
import { MAGIC } from '/server/constants/magic/index.js';
import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { DONATORS_BENEFITS, PLAYER_ICONS } from '/imports/constants/shop/index.js';
import { NEED_GREED_ITEMS } from '/server/constants/items/needgreed';

import { addXp } from '/server/api/skills/skills';
import { addItem, addFakeGems } from '/server/api/items/items';
import { updateAbilityCooldowns } from '/server/api/abilities/abilities';

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

const distributeRewards = function distributeRewards({ floor }) {
  console.log('Distributing rewards');

  // Fetch the rewards
  const rawFloorRewards = FLOORS[floor].floorRewards;

  // Fetch top 10 by damage dealt
  const sortedBossHealthScores = BossHealthScores.find({}, {
    sort: [
      ['bossDamage', 'desc']
    ],
    limit: 10
  }).fetch();

  sortedBossHealthScores.forEach((bossHealthScore) => {
    rawFloorRewards.forEach((reward) => {
      if (reward.type === 'item') {
        console.log(`Adding item - ${reward.itemId}`);
        addItem(reward.itemId, 1, bossHealthScore.owner);
      }
    })
  })

  // Fetch all users by tower points
  const sortedFloorWaveScores = FloorWaveScores.find({
    floor,
    points: {
      $gte: 25
    }
  }, {
    sort: [
      ['points', 'desc']
    ]
  }).fetch();

  const totalContributors = sortedFloorWaveScores.length;

  sortedFloorWaveScores.forEach((waveScore, index) => {
    const percentRank = ((index + 1) / totalContributors) * 100;
    let chance = 0;
    if (percentRank <= 10 || index <= 9) {
      chance = 100;
    } else if (percentRank <= 25) {
      chance = 50;
    } else if (percentRank <= 50) {
      chance = 25;
    } else if (percentRank <= 75) {
      chance = 5;
    } else {
      chance = 1;
    }

    console.log(`Rank = ${percentRank}`);
    rawFloorRewards.forEach((reward) => {
      if (reward.type === 'item' && Math.random() <= (chance / 100)) {
        addItem(reward.itemId, 1, waveScore.owner);
        console.log(`Adding item - ${reward.itemId} - 1`);
      } else if (reward.type === 'gold') {
        const goldAmount = (1 - (percentRank / 100)) * reward.amount;
        console.log(`Adding gold - ${goldAmount}`);
        Users.update(waveScore.owner, {
          $inc: {
            gold: Math.round(goldAmount)
          }
        });
      }
    });
  })
}

export const completeBattle = function (actualBattle) {
  const finalTickEvents = [];
  let win = actualBattle.units.length > 0;
  let ngRewards = [];

  const rawGlobalBuffs = redis.get('global-buffs-xpq');
  const globalBuffs = rawGlobalBuffs ? JSON.parse(rawGlobalBuffs) : {};
  let hasCombatGlobalBuff = globalBuffs.combat && moment().isBefore(globalBuffs.combat);

  // Remove from battle list
  const battlesDeleted = BattlesList.remove(actualBattle._id);
  // Remove from redis
  redis.del(`battles-${actualBattle._id}`);

  if (battlesDeleted <= 0) {
    return;
  }

  if (!win && actualBattle.isExplorationRun) {
    // Take back the xp values for the current wave (as they failed it)
    const newMonsters = FLOORS.genericTowerMonsterGenerator(actualBattle.floor, actualBattle.room);
    // Inject into battle
    newMonsters.forEach((monster) => {
      actualBattle.totalXpGain -= BATTLES.xpGain(monster.stats, monster.buffs);
    });
  }

  if (win || actualBattle.isExplorationRun || (actualBattle.startingBossHp && !actualBattle.isOldBoss)) {
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
        pointsEarnt += Math.pow(1.7, i);
      }
    }

    const units = actualBattle.units.concat(actualBattle.deadUnits).filter((unit) => {
      return !!unit.owner;
    });

    // Apply xp gains, only if not a boss battle
    let totalXpGain = actualBattle.totalXpGain * (1 + (units.length * 0.16) - 0.16);

    if (actualBattle.startingBossHp && !actualBattle.isOldBoss) {
      // XP is determine by damage dealt
      const allEnemies = actualBattle.enemies.concat(actualBattle.deadEnemies);
      const bossId = FLOORS[actualBattle.floor].boss.enemy.id;
      let damageDealt = actualBattle.startingBossHp - _.findWhere(allEnemies, { enemyId: bossId }).stats.health;

      totalXpGain = damageDealt * (actualBattle.floor / 1.5) * (1 + (units.length * 0.16) - 0.16);
    }

    units.forEach((unit) => {
      // Distribute xp gained evenly across units
      const xpPortion = totalXpGain / units.length;
      Object.keys(unit.xpDistribution).forEach((skillName) => {
        // Distribute xp gained per player, per skill
        // Eg: Dagger is full attack xp, sword = 50% attack / 50% defense, ect
        let skillXpPortion = Math.round(xpPortion * unit.xpDistribution[skillName]);

        if (skillXpPortion > 0) {
          finalTickEvents.push({
            type: 'xp',
            amount: skillXpPortion,
            skill: skillName,
            owner: unit.owner
          });

          if (hasCombatGlobalBuff) {
            skillXpPortion *= 1.2;

            finalTickEvents.push({
              type: 'xp',
              amount: (skillXpPortion * 0.2).toFixed(1),
              skill: skillName,
              affectedGlobalBuff: true,
              owner: unit.owner
            });
          }

          addXp(skillName, skillXpPortion, unit.id);
        }
      });
    });

    // Apply rewards for killing monsters
    const rewardsGained = [];
    const deadEnemy = actualBattle.deadEnemies[0];
    
    let rewards = [];
    if (actualBattle.level) {
      rewards = FLOORS.personalQuestMonsterGenerator(actualBattle.level, actualBattle.wave)[0].rewards;
    }

    for (let i = 0; i < rewards.length; i++) {
      const rewardTable = rewards[i];
      const diceRoll = Math.random();

      if (rewardTable.chance >= diceRoll) {
        rewardsGained.push(_.sample(rewardTable.rewards));
        break;          
      }
    }

    // Apply rewards for complete wave ( if this is a tower battle )
    let floorRewards = [];
    if (actualBattle.floor) {
      if (win) {
        floorRewards.push(...FLOORS[actualBattle.floor][actualBattle.room].rewards);
      }

      if (actualBattle.isExplorationRun) {
        // Add rewards from previous rooms
        for (let i = actualBattle.room - 1; i > 0; i--) {
          floorRewards.push(...FLOORS[actualBattle.floor][i].rewards);
        }
      }
    }

    // Each user = additional 20% chance of loot
    const extraChance = 1 + (units.length * 0.2) - 0.2;
    for (let i = 0; i < floorRewards.length; i++) {
      const rewardTable = floorRewards[i];
      const diceRoll = Math.random();

      if ((rewardTable.chance * extraChance) >= diceRoll) {
        rewardsGained.push(_.sample(rewardTable.rewards));
        if (rewardsGained >= units.length) {
          break;
        }
      } else if (hasCombatGlobalBuff && (rewardTable.chance * extraChance * 1.5) >= diceRoll) {
        rewardsGained.push(Object.assign({}, _.sample(rewardTable.rewards), {
          affectedGlobalBuff: true
        }));
        if (rewardsGained >= units.length) {
          break;
        }
      }
    }

    // Process rewards to peeps
    const owners = _.uniq(units.map((unit) => unit.owner));
    rewardsGained.forEach((rewardGained) => {
      if (rewardGained.type === 'item') {
        // special reward handling for need/greed flagged items
        const ng = Object.values(NEED_GREED_ITEMS).some((matcher) => {
          return matcher(rewardGained.itemId);
        });
        if (owners.length > 1 && (rewardGained.ng || ng)) {
          ngRewards.push({
            lootId: new Meteor.Collection.ObjectID()._str,
            type: 'item',
            itemId: rewardGained.itemId,
            amount: rewardGained.amount,
            icon: ITEMS[rewardGained.itemId].icon,
            affectedGlobalBuff: rewardGained.affectedGlobalBuff,
            owners: owners.map((owner) => { return {id: owner, ngChoice: 'greed'}}),
          });
        } else {
          const luckyOwner = _.sample(owners);
          addItem(rewardGained.itemId, rewardGained.amount, luckyOwner);
          finalTickEvents.push({
            type: 'item',
            amount: rewardGained.amount,
            itemId: rewardGained.itemId,
            affectedGlobalBuff: rewardGained.affectedGlobalBuff,
            icon: ITEMS[rewardGained.itemId].icon,
            owner: luckyOwner
          });
        }
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
          affectedGlobalBuff: rewardGained.affectedGlobalBuff,
          icon: 'gold.svg',
          owner: luckyOwner
        });
      } else if (rewardGained.type === 'icon') {
        const luckyOwner = _.sample(owners);
        const luckyOwnerCombat = Combat.findOne({
          owner: luckyOwner
        });

        if (luckyOwnerCombat && luckyOwnerCombat.boughtIcons == null) {
          luckyOwnerCombat.boughtIcons = [];
        }

        if (!_.contains(luckyOwnerCombat.boughtIcons, rewardGained.iconId)) {
          finalTickEvents.push({
            type: 'icon',
            iconId: rewardGained.iconId,
            icon: PLAYER_ICONS[rewardGained.iconId].icon,
            owner: luckyOwner
          });
          Combat.update({
            owner: luckyOwner
          }, {
            $set: {
              boughtIcons: luckyOwnerCombat.boughtIcons.concat([rewardGained.iconId])
            }
          });
        }
      }
    });

    if (actualBattle.floor && actualBattle.room && actualBattle.isTowerContribution) {
      if (actualBattle.room !== 'boss') {

        let countTowerContributors = 0;

        // Update all participants contributions
        owners.forEach((owner) => {
          // Find owner object
          const ownerObject = _.findWhere(units, { owner });

          if (ownerObject.isTowerContribution && ownerObject.towerContributionsToday < 3) {
            // Double confirm that this is a contribution
            const combatDoc = Combat.findOne({
              owner
            });

            if (combatDoc.isTowerContribution && combatDoc.towerContributionsToday < 3) {
              ownerObject.usedTowerContribution = true;
              countTowerContributors++;

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

              const possibleStats = [
                'mining',
                'crafting',
                'woodcutting',
                'farming',
                'inscription',
                'astronomy'
              ];

              const targetStat = _.sample(possibleStats);
              addXp(targetStat, Math.round(pointsEarnt * 50), owner);

              if (pointsEarnt > 10) {
                addFakeGems(5, owner);
              }

              finalTickEvents.push({
                type: 'xp',
                amount: Math.round(pointsEarnt * 50),
                skill: targetStat,
                owner
              });

              finalTickEvents.push({
                type: 'points',
                amount: pointsEarnt.toFixed(1),
                icon: 'tower.svg',
                owner
              });

              FloorWaveScores.upsert(updateSelector, updateModifier);
            } else {
              console.log('Unexpected Failure');
            }
          }
        });

        if (countTowerContributors > 0) {
          // Increment total points data
          Floors.update({
            floor: actualBattle.floor,
            floorComplete: false
          }, {
            $inc: {
              points: pointsEarnt * countTowerContributors
            }
          });
        }
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
  const allFriendlyUnits = actualBattle.units.concat(actualBattle.deadUnits).filter((unit) => {
    return !!unit.owner;
  });
  allFriendlyUnits.forEach((unit) => {
    const combatModifier = {
      $set: {
        'stats.health': (unit.stats.health > 0 ? Math.floor(unit.stats.health) : 0),
        lastGameUpdated: new Date(),
      },
      $inc: {
        'towerContributionsToday': unit.usedTowerContribution ? 1 : 0
      }
    };
    if (actualBattle.startingBossHp && !actualBattle.isOldBoss) {
      combatModifier['$set'].foughtBoss = true;
    }
    if (unit.amulet) {
      combatModifier['$set']['amulet.energy'] = unit.amulet.energy;
    }

    let totalMagicXp = 0;
    let spellsCast = [];

    unit.abilities.forEach((ability) => {
      if (ability.isSpell) {
        const spellConstants = MAGIC.spells[ability.id];
        totalMagicXp += ability.totalCasts * spellConstants.xp;
        spellsCast[ability.id] = 1;
      }
    });

    if (totalMagicXp > 0) {
      finalTickEvents.push({
        type: 'xp',
        amount: totalMagicXp,
        skill: 'magic',
        owner: unit.owner
      });

      if (hasCombatGlobalBuff) {
        finalTickEvents.push({
          type: 'xp',
          amount: (totalMagicXp * 0.2).toFixed(1),
          skill: 'magic',
          owner: unit.owner,
          affectedGlobalBuff: true,
        });
        totalMagicXp *= 1.2;
      }

      let totalSpellsCast = Object.keys(spellsCast).length;

      //
      // Record total number of unique spells cast per battle
      Users.update(unit.owner, {
        $inc: {
          'stats.spellsCast': totalSpellsCast
        }
      });

      addXp('magic', totalMagicXp, unit.owner);
    }

    // Update relevant stuff, use callback so this is non blocking
    Combat.update({
      owner: unit.owner
    }, combatModifier, (err, res) => {
      // This is intentionally empty
      // As providing a callback means this will not block the loop from continuing
      updateAbilityCooldowns(unit.owner, (err, res) => {

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
  });


  // Is this a current boss battle?
  if (actualBattle.startingBossHp && !actualBattle.isOldBoss) {
    const allEnemies = actualBattle.enemies.concat(actualBattle.deadEnemies);
    const bossId = FLOORS[actualBattle.floor].boss.enemy.id;
    let damageDealt = actualBattle.startingBossHp - _.findWhere(allEnemies, { enemyId: bossId }).stats.health;

    if (!damageDealt || damageDealt < 0) {
      damageDealt = 0;
    }
    console.log(`Damage dealt to boss ${damageDealt}`);

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
            custom: {
              roomType: 'Game'
            },
            roomId: 'General'
          });

          // Insert the next floor (To do, make this pass a valid active tower users number)
          const activeTowerUsers = FloorWaveScores.find({
            floor: actualBattle.floor,
            points: {
              $gte: 25
            }
          }).count();
          const newPointMax = FLOORS.getNewPointCount(actualBattle.floor + 1, activeTowerUsers);

          // Get bosses hp
          const bossEnemyId = FLOORS[actualBattle.floor + 1].boss.enemy.id;
          const bossEnemyConstants = ENEMIES[bossEnemyId];

          // Reset tower contributions for all
          Combat.update({}, {
            $set: {
              towerContributionsToday: 0
            }
          }, { multi: true });

          BossHealthScores.remove({});

          // Create our next floor
          Floors.insert({
            floor: actualBattle.floor + 1,
            createdAt: new Date(),
            points: 0,
            pointsMax: newPointMax, // Need some kind of
            health: bossEnemyConstants.stats.healthMax * activeTowerUsers,
            healthMax: bossEnemyConstants.stats.healthMax * activeTowerUsers
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
    level: actualBattle.level,
    wave: actualBattle.wave,
    floor: actualBattle.floor,
    room: actualBattle.room,
    isExplorationRun: actualBattle.isExplorationRun,
    win,
    historyStats: actualBattle.historyStats,
    finalTickEvents,
    loot: ngRewards,
    updatedAt: new Date(),
    createdAt: new Date()
  });

  delete actualBattle;
}
