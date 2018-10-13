import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { ENEMIES } from '/server/constants/enemies/index.js'; // List of enemies
import { COMBAT } from '/server/constants/combat/index.js'; // List of available combat stats
import { BUFFS } from '/imports/constants/buffs/index';
import { FLOORS } from '/server/constants/floors/index.js'; // List of floor details
import { addBuff} from '/server/battleUtils';

import uuid from 'node-uuid';
import { Random } from 'meteor/random'
import moment from 'moment';
import _ from 'underscore';

import { Groups } from '/imports/api/groups/groups';
import { Adventures } from '/imports/api/adventures/adventures';
import { BattlesList } from '/imports/api/battles/battles';
import { Combat } from '/imports/api/combat/combat';
import { Abilities } from '/imports/api/abilities/abilities';
import { Users } from '/imports/api/users/users';

export const startBattle = function ({ floor, room, level, wave, health, isTowerContribution, isExplorationRun, isOldBoss, server }) {
  console.log('method - startBattle - start', moment().format('LLL hh:mm:ss SSS'));
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
    const boss = FLOORS[floor].boss.enemy;
    boss.monsterType = boss.id;
    battleData.enemies.push(boss);
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

  // Ensure battle participants aren't already in a battle
  const currentBattle = BattlesList.findOne({ owners: battleParticipants });
  if (currentBattle) {
    throw new Meteor.Error('in-battle', 'You cannot start a battle while anyone in your group is still in one.');
  }

  let useStreamy = false;

  // Ensure battle participants don't have any active adventures

  let adventurePlayers = "";

  // Loop through each participant, check for adventure adventures.
  battleParticipants.forEach((participant) => {

    const activeAdventures = Adventures.findOne({
      owner: {
        $in: [participant]
      },
      adventures: {
        $elemMatch :{
          endDate: {
            $gt: new Date()
          }        
        }
      }
    });

    // If active adventure found, add name to string displayed to leader
    if (activeAdventures) {
      const userDoc = Users.findOne({ _id: participant });

      if ( activeAdventures ) {
        adventurePlayers += adventurePlayers === "" ? userDoc.username : ", " + userDoc.username;
      }
    }
  });

  /*
  // Original method, checks all participants at once, but doesn't identify them.
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
  */

  if (adventurePlayers !== "") {
    throw new Meteor.Error('in-battle', 'You cannot start a battle while ' + adventurePlayers + ' in your group is in an adventure');
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
    historyStats: {},
    isTowerContribution,
    isExplorationRun,
    tickEvents: [],
    units: [],
    useStreamy,
    enemies: []
  };

  // Battle participants combat stats
  const usersCombatStats = Combat.find({
    owner: {
      $in: battleParticipants
    }
  }).fetch();

  let hasEnergy = true;
  let battleEnergyCost = COMBAT.energyConsumption[room] || 1;

  if (isOldBoss) {
    battleEnergyCost = 5;
  }

  // Ensure users have energy requirements + haven't already fought boss
  usersCombatStats.forEach((userCombat) => {
    if (userCombat.stats.energy < battleEnergyCost) {
      hasEnergy = false;
      const requirementString = `${userCombat.username} does not have enough energy to start this battle`;
      throw new Meteor.Error("not-enough-energy", requirementString);
    }

    if (userCombat.meditatingStartDate) {
      throw new Meteor.Error("is-meditating", `${userCombat.username} is meditating. You cannot battle while meditating`);      
    }

    if (health && !isOldBoss && userCombat.foughtBoss) {
      hasEnergy = false;
      throw new Meteor.Error("already-fought-boss", 'You can only fight the boss once a day');
    }
  });

  const usersData = Users.find({
    _id: {
      $in: battleParticipants
    }
  }).fetch();

  // Inject users into battles units
  usersCombatStats.forEach((userCombat) => {
    const targetUser = usersData.find((userData) => userData._id === userCombat.owner);

    const userCombatStats = {};
    COMBAT.statsArr.forEach((statName) => {
      if (userCombat.stats[statName] !== undefined) {
        userCombatStats[statName] = userCombat.stats[statName];
      }
    });

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


    const newUnit = {
      id: userCombat.owner,
      owner: userCombat.owner,
      battleSecret: targetUser.battleSecret,
      towerContributions: userCombat.towerContributions,
      isTowerContribution: userCombat.isTowerContribution,
      abilities: usersEquippedAbilities,
      name: userCombat.username || 'Unnamed',
      amulet: userCombat.amulet,
      buffs: [],
      mainHandType: userCombat.mainHandType,
      offHandType: userCombat.offHandType,
      stats: userCombatStats,
      xpDistribution: userCombat.xpDistribution,
      tickOffset: _.random(0, 2) + 4,
      icon: userCombat.characterIcon || 'character.svg'
    };

    if (userCombat.enchantments) {
      userCombat.enchantments.forEach((buffId) => {
        const enchantConstants = BUFFS[buffId];
        if (enchantConstants) {
          const clonedConstants = enchantConstants;
          const newBuff = {
            id: buffId,
            duration: clonedConstants.data.durationTotal,
            data: {
              totalDuration: clonedConstants.data.durationTotal,
              icon: clonedConstants.icon,
              description: enchantConstants.description(),
              name: clonedConstants.name
            }
          };

          newUnit.buffs.push(newBuff);
        }
      });
    }

    newBattle.units.push(newUnit);
    newBattle.historyStats[newUnit.id] = {
      damageDone: 0,
      damageTaken: 0,
      healingDone: 0,
      name: newUnit.name
    };
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

    if (enemyConstants.isBoss && isOldBoss) {
      enemyStats.accuracy += 20;
    }

    if (!enemy.amount) {
      enemy.amount = 1;
    }

    for (let i = 0; i < enemy.amount; i++) {
      const randomUnitTarget = _.sample(newBattle.units);
      totalXpGain += BATTLES.xpGain(enemyStats, enemyConstants.buffs);
      newBattle.enemies.push({
        id: uuid.v4(),
        monsterType: enemy.id,
        stats: enemyStats,
        icon: enemyConstants.icon,
        buffs: enemyConstants.buffs || [],
        target: randomUnitTarget.id,
        enemyId: enemyConstants.id,
        name: enemyConstants.name,
        tickOffset: _.random(0, 2) + 4,
        isBoss: enemyConstants.isBoss
      });
    }
  });

  if (isOldBoss) {
    totalXpGain *= 0.5;
  }

  // Make random targets for units
  newBattle.units.forEach((unit) => {
    const randomEnemyTarget = _.sample(newBattle.enemies);
    unit.target = randomEnemyTarget.id;
  });

  newBattle.totalXpGain = totalXpGain;
  newBattle.isOldBoss = isOldBoss;
  newBattle.deadUnits = [];
  newBattle.deadEnemies = [];

  // Is the currently active boss battle
  if (health) {
    newBattle.startingBossHp = health;
  }

  // Save battle
  const actualBattleId = BattlesList.insert({
    owners: newBattle.owners,
    group: currentGroup ? currentGroup._id : false,
    createdAt: new Date(),
    activated: false
  });

  if (currentGroup) {
    Groups.update({
      _id: currentGroup._id
    }, {
      $set: {
        battleCount: currentGroup.battleCount ? currentGroup.battleCount + 1 : 1,
        floor,
        lastBattleStarted: new Date(),
        inBattle: true
      }
    });
  }

  newBattle.tick = 0;
  newBattle._id = actualBattleId;
  newBattle.server = server;

  const actualBattle = newBattle;
  actualBattle.enemies.forEach((enemy) => {
    enemy.isEnemy = true;
  });

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

  let balancer = Meteor.userId();
  if (currentGroup) {
    balancer = currentGroup.balancer;
  }

  console.log('method - startBattle - end', moment().format('LLL hh:mm:ss SSS'));

  // Send battle to socket server
  // TODO: Make sure this call is encrypted in some way. Encrypt the battle?
  // Otherwise MIM attack compromises the security of the system
  HTTP.call('POST', `${Meteor.settings.public.battleUrl}/battle?balancer=${balancer}`, {
    data: { battle: actualBattle, passphrase: 'dqv$dYT65YrU%s', balancer }
  }, (error, result) => {
    console.log('method - startBattle - made to battle node', moment().format('LLL hh:mm:ss SSS'));

    BattlesList.update({
      _id: actualBattle._id
    }, {
      $set: {
        activated: true
      }
    });
  });
}
