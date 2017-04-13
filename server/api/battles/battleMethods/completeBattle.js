import { ENEMIES } from '/server/constants/enemies/index.js';
import { ITEMS } from '/server/constants/items/index.js';

import { addXp } from '/server/api/skills/skills';
import { addItem } from '/server/api/items/items';

import { Battles } from '/imports/api/battles/battles';
import { Floors } from '/imports/api/floors/floors';
import { Users } from '/imports/api/users/users';
import { Abilities } from '/imports/api/abilities/abilities';
import { Combat } from '/imports/api/combat/combat';
import { FloorWaveScores } from '/imports/api/floors/floorWaveScores';

export const completeBattle = function (actualBattle) {
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
      for (let i = 0; i < rewards.length; i++) {
        const reward = rewards[i];
        const diceRoll = Math.random();

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
      if (actualBattle.difficulty !== 'boss') {
        // Decrement floor
        Floors.update({
          floor: actualBattle.floor,
          floorComplete: false
        }, {
          $inc: incrementData
        });
      } else {
        // Complete the floor!
        let updatedCount = Floors.update({
          floor: actualBattle.floor,
          floorComplete: false
        }, {
          $set: {
            floorComplete: true
          }
        });

        if (updatedCount === 1) {
          // Insert the next floor
          const floorCounts = FLOORS.getWaveCounts();

          // Create our next floor
          Floors.insert({
            floor: actualBattle.floor + 1,
            createdAt: new Date(),
            easyWaves: floorCounts.easy,
            easyWavesTotal: floorCounts.easy,
            hardWaves: floorCounts.hard,
            hardWavesTotal: floorCounts.hard,
            veryHardWaves: floorCounts.veryHard,
            veryHardWavesTotal: floorCounts.veryHard,
          });
        }
      }

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
            bossWaves: 0,
            username: ownerObject.name // To do: Make this work when users have multiple units
          }
        };
        updateModifier['$inc'][`${actualBattle.difficulty}Waves`] = 1;
        updateModifier['$setOnInsert'][`${actualBattle.difficulty}Waves`] = 1;

        FloorWaveScores.upsert(updateSelector, updateModifier)
      });
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
  } else {
    // Lost
    win = false;
  }

  // Update all player units healths
  const allFriendlyUnits = actualBattle.units.concat(actualBattle.deadUnits);
  allFriendlyUnits.forEach((unit) => {
    // Update relevant stuff, use callback so this is non blocking
    Combat.update({
      owner: unit.owner
    }, {
      $set: {
        'stats.health': (unit.stats.health > 0 ? Math.floor(unit.stats.health) : 0)
      }
    }, (err, res) => {
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
