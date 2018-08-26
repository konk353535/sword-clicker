import moment from "moment/moment";
import _ from 'underscore';

import { ITEMS } from '/server/constants/items/index';
import { FLOORS } from '/server/constants/floors/index';
import { MAGIC } from '/server/constants/magic/index';
import { BATTLES } from '/server/constants/battles/index'; // List of encounters
import { PLAYER_ICONS } from '/imports/constants/shop/index';
import { NEED_GREED_ITEMS } from '/server/constants/items/needgreed';

import { addXp } from '/server/api/skills/skills';
import { addItem, addFakeGems } from '/server/api/items/items';
import { updateAbilityCooldowns } from '/server/api/abilities/abilities';
import { normalizedLootTable } from '/server/constants/enemies/lootTables/index';
import { cleanRewards } from '/server/utils';

import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Floors } from '/imports/api/floors/floors';
import { Users } from '/imports/api/users/users';
import { Abilities } from '/imports/api/abilities/abilities';
import { Combat } from '/imports/api/combat/combat';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';
import { Chats } from 'meteor/cesarve:simple-chat/collections';

const redis = new Meteor.RedisCollection('redis');

export const distributeRewards = function distributeRewards({ floor, server }) {
  console.log('Distributing rewards');

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

  let playerList = {};
  sortedFloorWaveScores.forEach((waveScore) => {
    playerList[waveScore.owner] = [{
      type: 'gold',
      amount: Math.floor(gold.amount / totalContributors)
    }];
  });

  // remove gold
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
              // ownerObject.usedTowerContribution = true;
              countTowerContributors++;

              const updateSelector = { owner, floor: actualBattle.floor };

              const updateModifier = {
                $inc: {
                  points: pointsEarnt
                },
                $setOnInsert: {
                  server: actualBattle.server,
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

              console.log(updateSelector);
              console.log(updateModifier);
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
            server: actualBattle.server,
            floorComplete: false
          }, {
            $inc: {
              points: pointsEarnt * countTowerContributors
            }
          });

          // if boss should be unlocked, begin 24h timer
          const currentFloor = Floors.findOne({ floorComplete: false, floor: actualBattle.floor, server: actualBattle.server });

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

          // add additional loot to community pot for every contributor

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
            const extraChance = 1 + (countTowerContributors * 0.2) - 0.2;
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
                if (rewards >= countTowerContributors) {
                  break;
                }
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
                if (rewards >= countTowerContributors) {
                  break;
                }
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
    room: actualBattle.room,
    isExplorationRun: actualBattle.isExplorationRun,
    win,
    historyStats: actualBattle.historyStats,
    finalTickEvents,
    loot: ngRewards,
    updatedAt: new Date(),
    createdAt: new Date()
  });

  if (ngRewards.length > 0) {
    Meteor.setTimeout(() => {
      const battle = Battles.findOne({_id: battleId});
      resolveLoot(battle);
    }, 30000);
  }

  delete actualBattle;
};
