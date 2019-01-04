import moment from "moment/moment";
import _ from 'underscore';

import { ITEMS } from '/imports/constants/items/index';
import { FLOORS } from '/server/constants/floors/index';
import { MAGIC } from '/server/constants/magic/index';
import { BATTLES } from '/server/constants/battles/index'; // List of encounters
import { PLAYER_ICONS } from '/imports/constants/shop/index';
import { NEED_GREED_ITEMS } from '/imports/constants/items/needgreed';
import { STATE_BUFFS } from '/imports/constants/state';

import { addXp } from '/server/api/skills/skills';
import { addItem, addFakeGems, addGold } from '/server/api/items/items';
import { updateAbilityCooldowns } from '/server/api/abilities/abilities';
import { normalizedLootTable } from '/server/constants/enemies/lootTables/index';
import { cleanRewards } from '/server/utils';

import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Floors } from '/imports/api/floors/floors';
import { Users } from '/imports/api/users/users';
import { Groups } from '/imports/api/groups/groups';
import { Abilities } from '/imports/api/abilities/abilities';
import { Combat } from '/imports/api/combat/combat';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';
import { Chats } from 'meteor/cesarve:simple-chat/collections';

import { State } from '/imports/api/state/state';
import weightedRandom from 'weighted-random';

export const distributeRewards = function distributeRewards({ floor, server }) {

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
        addItem(reward.itemId, 1, bossHealthScore.owner);
      }
    })
  })

  // Fetch all users by tower points
  const sortedFloorWaveScores = FloorWaveScores.find({
    server,
    floor,
    points: {
      $gte: 25
    }
  }).fetch();

  const totalContributors = sortedFloorWaveScores.length;

  console.log('floor', floor, 'server', server);
  let rewards = Floors.findOne({floor: floor, server: server}).loot;
  // get gold out first
  let gold = _.findWhere(rewards, {type: 'gold'});

  // create a new list of players who got rewards
  let playerList = {};

  // log and award gold
  sortedFloorWaveScores.forEach((waveScore) => {
    let goldAmount = Math.floor(gold.amount / totalContributors);    
    playerList[waveScore.owner] = [{
      type: 'gold',
      amount: goldAmount
    }];    
    console.log(`awarding ${goldAmount} gold to ${waveScore.username}`);    
    addGold(waveScore.owner, goldAmount);    
    Chats.insert({
      message: `You have been awarded ${goldAmount} gold.`,
      username: 'Game',
      name: 'Game',
      date: new Date(),
      custom: {
        roomType: 'Game'
      },
      roomId: `Game-${waveScore.owner}`
    });
  });

  // remove gold from rewards
  rewards = _.reject(rewards, function(r) {
    return r.type === 'gold';
  });

  while(rewards.length > 0) {
    Object.keys(playerList).map((player) => {
      if(rewards.length <= 0) {
        return;
      }
      const reward = _.sample(rewards);
      playerList[player].push({
        type: reward.type,
        itemId: reward.itemId,
        amount: 1
      });
      // find reward and decrement by 1 or remove from list
      rewards = rewards.map((cur) => {
        if (cur.itemId === reward.itemId) {
          cur.amount -= 1;
        }
        return cur;
      });
      rewards = _.reject(rewards, (r) => {
        return r.amount <= 0;
      });
    });
  }

  Object.keys(playerList).map((player) => {
    playerList[player] = cleanRewards(playerList[player]);
    playerList[player].map((item) => {
      if (item.itemId) {
        console.log(`awarding ${item.amount} ${item.itemId} to ${player}`);
        addItem(item.itemId, item.amount, player);
        Chats.insert({
          message: `You have been awarded ${item.amount} ${ITEMS[item.itemId].name}.`,
          username: 'Game',
          name: 'Game',
          date: new Date(),
          custom: {
            roomType: 'Game'
          },
          roomId: `Game-${player}`
        });
      }
    });
  });
};

export const resolveLoot = function(battle) {
  battle.loot.forEach((loot, lootIdx) => {
    if (loot.owners.length === 0) return;

    const needMembers = loot.owners.filter((owner) => { return owner.ngChoice === 'need'; });
    const greedMembers = loot.owners.filter((owner) => { return owner.ngChoice === 'greed'; });
    if (needMembers.length === 0 && greedMembers.length === 0) return;
    let winner = undefined;
    if (needMembers.length) {
      winner = _.sample(needMembers).id;
    } else {
      winner = _.sample(greedMembers).id;
    }

    addItem(loot.itemId, loot.amount, winner);

    let update = {
      $set: {},
      $push: {}
    };
    update.$set[`loot.${lootIdx}.winner`] = winner;
    update.$push['finalTickEvents'] = {
      type: 'item',
      amount: loot.amount,
      itemId: loot.itemId,
      affectedGlobalBuff: loot.affectedGlobalBuff,
      affectedNeedGreed: true,
      icon: ITEMS[loot.itemId].icon,
      name: ITEMS[loot.itemId].name,
      owner: winner
    };
    Battles.update(battle._id, update);
  });

  Battles.update(battle._id, {
    $set: {
      lootResolved: true
    }
  });
};

export const removeBattle = function (battleId) {
  const targetBattle = BattlesList.findOne({
    _id: battleId
  });

  if (!targetBattle) {
    return 0;
  }

  if (targetBattle.group) {
    Groups.update({
      _id: targetBattle.group
    }, {
      $set: {
        inBattle: false
      }
    });
  }

  return BattlesList.remove(battleId);
}

export const currentBossIsAlive = function (actualBattle) {
  const currentFloor = Floors.findOne({ floorComplete: false, floor: actualBattle.floor, server: actualBattle.server });
  
  if (currentFloor) {
    if (currentFloor.health > 0.0) {
      return true;
    }
  }      
      
  return false; // err on the side of caution
}

export const currentBossIsDead = function (actualBattle) {
  return (!currentBossIsAlive(actualBattle));
}

export const completeBattle = function (actualBattle) {
  const finalTickEvents = [];

  const aliveUnits = actualBattle.units.filter(unit => unit.stats.health > 0);

  let win = aliveUnits.length > 0;
  let ngRewards = [];

  const hasCombatGlobalBuff = !_.isUndefined(State.findOne({name: STATE_BUFFS.combat, 'value.activeTo': {$gte: moment().toDate()}}));

  // Remove from battle list
  const battlesDeleted = removeBattle(actualBattle.id)

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

    if (win) {
      // Count current room
      pointsEarnt += Math.pow(1.7, actualBattle.room);
    } else {
      // Get hp of current wave
      let totalHp = 0;
      let currentHp = 0;
      actualBattle.enemies.forEach((enemy) => {
        totalHp += enemy.stats.healthMax;
        currentHp += enemy.stats.health;
      });

      const decimalCompletion = 1 - (currentHp / totalHp);
      pointsEarnt += (Math.pow(1.7, actualBattle.room) * decimalCompletion);
    };

    // Add points from previous rooms
    for (let i = actualBattle.room - 1; i > 0; i--) {
      pointsEarnt += Math.pow(1.7, i);
    }

    const units = actualBattle.units.filter((unit) => {
      return !!unit.owner;
    });

    // Apply xp gains, only if not a boss battle
    let totalXpGain = actualBattle.totalXpGain * (1 + (units.length * 0.16) - 0.16);


    if (actualBattle.startingBossHp && !actualBattle.isOldBoss) {
      console.log('startingBossHp', actualBattle.startingBossHp, actualBattle.isOldBoss);
      console.log('floor is', actualBattle.floor);
      // XP is determine by damage dealt
      const allEnemies = actualBattle.enemies;
      console.log('number of enemies', ((allEnemies) ? (allEnemies.length.toFixed(0)) : 'null'));
      const bossId = FLOORS[actualBattle.floor].boss.enemy.monsterType;
      console.log('bossId', bossId);
      
      try {
        let liveBossStats = _.findWhere(allEnemies, { monsterType: bossId });
        let damageDealt = 0;
        if (liveBossStats && liveBossStats.stats && liveBossStats.stats.health) {
          damageDealt = actualBattle.startingBossHp - liveBossStats.stats.health;
        } else {
          damageDealt = actualBattle.startingBossHp
        }

        if (currentBossIsAlive(actualBattle)) {
          totalXpGain = damageDealt * (actualBattle.floor / 1.5) * (1 + (units.length * 0.16) - 0.16);
        }
      } catch (err) {
        console.log('Error calcuating post-battle boss health:');
        console.log(err);
      }
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
    
    // Added a new bonus: in full exploration runs at the tower, loot drop chance is doubled as an incentive to take on tougher challenges as a team.
    // This bonus is not applied to the community pot of boss loot.
    const bonusLootFromExploration = ((actualBattle.isExplorationRun) ? 2.0 : 1.0);

    // Apply rewards for killing monsters
    const rewardsGained = [];
    
    let rewards = [];
    if (actualBattle.level) {
      rewards = FLOORS.personalQuestMonsterGenerator(actualBattle.level, actualBattle.wave)[0].rewards;
    }


    for (let i = 0; i < rewards.length; i++) {
      const rewardTable = rewards[i];
      const diceRoll = Math.random();

      if (rewardTable.chance * bonusLootFromExploration >= diceRoll) {
        rewardsGained.push(_.sample(rewardTable.rewards));
        //break; // changed by psouza4 2018-11-07: why block more rewards with their own drop rate/chance?
      }
    }


    // Apply rewards for complete wave ( if this is a tower battle )
    let floorRewards = [];
    if (actualBattle.floor) {
      if (win) {
        floorRewards.push(...FLOORS[actualBattle.floor][actualBattle.room].rewards);
      }

      if (actualBattle.isExplorationRun && actualBattle.room > 1) {
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

      if ((rewardTable.chance * extraChance * bonusLootFromExploration) >= diceRoll) {
        rewardsGained.push(_.sample(rewardTable.rewards));
        //if (rewardsGained >= units.length) { // note: psouza4 2018-11-07 faulty logic, should be rewardsGained.length here, but we don't want to restrict this anyway
        //  break;
        //}
      } else if (hasCombatGlobalBuff && (rewardTable.chance * extraChance * bonusLootFromExploration * 1.5) >= diceRoll) {
        rewardsGained.push(Object.assign({}, _.sample(rewardTable.rewards), {
          affectedGlobalBuff: true
        }));
        //if (rewardsGained >= units.length) { // note: psouza4 2018-11-07 faulty logic, should be rewardsGained.length here, but we don't want to restrict this anyway
        //  break;
        //}
      }
    }

    // Process rewards to peeps
    const owners = _.uniq(units.map((unit) => unit.owner));
    rewardsGained.forEach((rewardGained) => {
      try {
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
              name: ITEMS[rewardGained.itemId].name,
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
              name: ITEMS[rewardGained.itemId].name,
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
      } catch (err) {
        console.log("Exception in completeBattle with 'rewardGained'", err, rewardGained);
      }
    });

    if (actualBattle.floor && actualBattle.room) {
      // Latest floor
      const latestFloor = Floors.findOne({
        floorComplete: false,
        server: actualBattle.server
      });

      if (actualBattle.room !== 'boss' && actualBattle.floor === latestFloor.floor) {
        let totalPointsForGroup = 0;
        let wasTotalPointsExtra = false;

        // Update all participants contributions
        owners.forEach((owner) => {
          // Find owner object
          const ownerObject = _.findWhere(units, { owner });
          
          // added to allow more tower attempts (only 3 official, still -- the rest only apply toward unlock and leaderboard at a reduced rate)
          const allowOverDaily = true;
          const dailyOverageMultiplier = 0.2;

          if (allowOverDaily || ownerObject.towerContributions.length < 3 || pointsEarnt > ownerObject.towerContributions[0]) {
            ownerObject.newContribution = pointsEarnt;
            let actualPointsGained = pointsEarnt;
            let overDailyPoints = 0;
            if (ownerObject.towerContributions.length >= 3) {
              if (pointsEarnt > ownerObject.towerContributions[0]) {
                actualPointsGained -= ownerObject.towerContributions[0];
                ownerObject.towerContributions[0] = pointsEarnt;
                ownerObject.towerContributions = ownerObject.towerContributions.sort((a, b) => a - b);
              } else {
                actualPointsGained = 0;
                overDailyPoints = pointsEarnt * dailyOverageMultiplier;
                wasTotalPointsExtra = true;
              }
            } else {
              ownerObject.towerContributions.push(pointsEarnt);
              ownerObject.towerContributions = ownerObject.towerContributions.sort((a, b) => a - b);
            }

            totalPointsForGroup += actualPointsGained + overDailyPoints;

            const updateSelector = { owner, floor: actualBattle.floor };

            const updateModifier = {
              $inc: {
                points: actualPointsGained + overDailyPoints
              },
              $setOnInsert: {
                points: actualPointsGained + overDailyPoints,
                server: actualBattle.server,
                username: ownerObject.name // To do: Make this work when users have multiple units
              }
            };

            if (overDailyPoints === 0) {
              const possibleStats = [
                'mining',
                'crafting',
                'woodcutting',
                'farming',
                'inscription',
                'astronomy'
              ];

              const targetStat = _.sample(possibleStats);
              addXp(targetStat, Math.round(actualPointsGained * 50), owner);

              if (actualPointsGained > 10) {
                addFakeGems(5, owner);
              }

              finalTickEvents.push({
                type: 'xp',
                amount: Math.round(actualPointsGained * 50),
                skill: targetStat,
                owner
              });
            }

            finalTickEvents.push({
              type: 'points',
              amount: (actualPointsGained + overDailyPoints).toFixed(1),
              icon: 'tower.svg',
              owner
            });

            const existingScores = FloorWaveScores.findOne({
              owner,
              server: actualBattle.server,
              floor: actualBattle.floor
            });

            if (existingScores) {
              FloorWaveScores.update({
                _id: existingScores._id
              }, {
                $inc: {
                  points: actualPointsGained + overDailyPoints
                }
              });
            } else {
              FloorWaveScores.insert({
                owner,
                server: actualBattle.server,
                username: ownerObject.name,
                points: actualPointsGained,
                floor: actualBattle.floor
              })
            }

          }
        });

        if (totalPointsForGroup > 0) {
          // Increment total points data
          Floors.update({
            floor: actualBattle.floor,
            server: actualBattle.server,
            floorComplete: false
          }, {
            $inc: {
              points: totalPointsForGroup
            }
          });

          // if boss should be unlocked, begin 24h timer
          console.log('Params to find current floor');
          console.log(actualBattle.floor);
          console.log(actualBattle.server);
          const currentFloor = Floors.findOne({ floorComplete: false, floor: actualBattle.floor, server: actualBattle.server });
          console.log('CurrentFloor');
          console.log(currentFloor);
          if (currentFloor.points > currentFloor.pointsMax && !currentFloor.bossResetAt) {
            const resetDate = moment().add(24, 'hours').toDate();
            Floors.update({
              floor: actualBattle.floor,
              server: actualBattle.server,
              floorComplete: false
            }, {
              $set: {
                bossResetAt: resetDate
              }
            });
          }

          // add additional loot to community pot for every contributor ONLY if nobody got 'bonus' points over their daily limit
          if (!wasTotalPointsExtra) {
            let floors = [];
            if (actualBattle.floor === 1) {
              floors = [{
                floor: 1,
                minChance: 1 / 32
              }]
            } else if (actualBattle.floor === 2) {
              floors = [{
                floor: 1,
                minChance: 1 / 32
              }, {
                floor: 2,
                minChance: 1 / 48
              }]
            } else {
              const floorNumbers = _.range(Math.max(1, actualBattle.floor - FLOORS.floorRewardRange - 1), actualBattle.floor);
              floors = floorNumbers.map((num, idx) => { return { floor: num,  minChance: 1 / (16 * (idx + 2)) } });
            }

            let rewardsGained = _.flatten(floors.map((floor) => {
              let floorRewards = [];

              // Add rewards from previous rooms
              for (let i = actualBattle.room - 1; i > 0; i--) {
                floorRewards.push(...FLOORS[floor.floor][i].rewards);
              }

              floorRewards = normalizedLootTable(floorRewards, floor.minChance);
              floorRewards.push({chance: 1 / 64, rewards: [{type: 'item', itemId: 'enhancer_key', amount: 1}]});
              let rewards = [];

              // Each user = additional 20% chance of loot
              const extraChance = 1 + (owners.length * 0.2) - 0.2;
              for (let i = 0; i < floorRewards.length; i++) {
                const rewardTable = floorRewards[i];
                const diceRoll = Math.random();

                if ((rewardTable.chance * extraChance) >= diceRoll) {
                  let reward = _.sample(rewardTable.rewards);
                  if (reward.type === 'gold') {
                    reward.amount *= 12;
                  }
                  if (reward.type !== 'icon')  {
                    rewards.push(reward);
                  }
                  //if (rewards >= owners.length) { // note: psouza4 2018-11-07 faulty logic, should be rewards.length here, but we don't want to restrict this anyway
                  //  break;
                  //}
                } else if (hasCombatGlobalBuff && (rewardTable.chance * extraChance * 1.5) >= diceRoll) {
                  let reward = _.sample(rewardTable.rewards);
                  if (reward.type === 'gold') {
                    reward.amount *= 15;
                  }
                  if (reward.type !== 'icon')  {
                    rewards.push(Object.assign({}, reward, {
                      affectedGlobalBuff: true
                    }));
                  }
                  //if (rewards >= owners.length) { // note: psouza4 2018-11-07 faulty logic, should be rewards.length here, but we don't want to restrict this anyway
                  //  break;
                  //}
                }
              }

              return rewards;

            }));

            let floorRewards = [];
            if (currentFloor.loot) {
              floorRewards = cleanRewards(currentFloor.loot.concat(rewardsGained));
            } else {
              floorRewards = cleanRewards(rewardsGained);
            }

            Floors.update({
              floor: actualBattle.floor,
              server: actualBattle.server,
              floorComplete: false
            }, {
              $set: {
                loot: floorRewards
              }
            });
          }
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
  const allFriendlyUnits = actualBattle.units.filter((unit) => {
    return !unit.isEnemy;
  });

  allFriendlyUnits.forEach((unit) => {
    const combatModifier = {
      $set: {
        'stats.health': (unit.stats.health > 0 ? Math.floor(unit.stats.health) : 0),
        lastGameUpdated: new Date(),
      }
    };

    if (unit.newContribution) {
      combatModifier['$set'].towerContributions = unit.towerContributions;      
    }

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
          // Modify relevant ability id cooldowns and update
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
  console.log(actualBattle.startingBossHp);
  if (actualBattle.startingBossHp && !actualBattle.isOldBoss) {
    const allEnemies = actualBattle.enemies;
    const bossId = FLOORS[actualBattle.floor].boss.enemy.monsterType;
    
    let liveBossStats = _.findWhere(allEnemies, { monsterType: bossId });
    let damageDealt = 0;
    try {
      if (liveBossStats && liveBossStats.stats && liveBossStats.stats.health) {
        damageDealt = actualBattle.startingBossHp - liveBossStats.stats.health;
      } else {
        damageDealt = actualBattle.startingBossHp
      }
    } catch (err) {
      console.log('Error calcuating post-battle boss health:');
      console.log(err);
    }
    
    console.log(`damage dealt = ${damageDealt}`);
    if (!damageDealt || damageDealt < 0) {
      damageDealt = 0;
    }

    // Update players contributions
    allFriendlyUnits.forEach((unit) => {
      BossHealthScores.insert({
        server: actualBattle.server,
        owner: unit.owner,
        username: unit.name,
        bossDamage: damageDealt
      });
    });

    // Update bosses hp
    const currentFloor = Floors.findOne({ floorComplete: false, floor: actualBattle.floor, server: actualBattle.server });
    if (currentFloor) {
      // Just update the bosses hp
      Floors.update(currentFloor._id, {
        $set: {
          health: currentFloor.health - damageDealt
        }
      });
    }
  }

  const battleId = Battles.insert({
    owners: actualBattle.owners,
    finished: true,
    level: actualBattle.level,
    wave: actualBattle.wave,
    floor: actualBattle.floor,
    server: actualBattle.server,
    room: actualBattle.room,
    isExplorationRun: actualBattle.isExplorationRun,
    win,
    historyStats: actualBattle.historyStats,
    finalTickEvents,
    loot: ngRewards,
    updatedAt: new Date(),
    createdAt: new Date(),
    lootResolved: false
  });

  if (ngRewards.length > 0) {
    Meteor.setTimeout(() => {
      const battle = Battles.findOne({_id: battleId});
      resolveLoot(battle);
    }, 30000);
  }

  //delete actualBattle; // javascript 'delete' keyword does nothing on variables, it only unsets properties on an object (try it in console)
                         // see https://www.w3schools.com/js/js_object_properties.asp
};

JsonRoutes.add("post", "/methods/completeBattle", function (req, res, next) {
  const [battle, passphrase] = req.body;
  if (passphrase !== 'dqv$dYT65YrU%s') {
    return;
  }

  completeBattle(battle);
});
