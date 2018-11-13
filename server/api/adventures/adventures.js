import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import _ from 'underscore';
import { Random } from 'meteor/random';

import { ITEMS } from '/imports/constants/items/index.js';
import { FLOORS } from '/server/constants/floors/index.js';
import { ENEMIES } from '/server/constants/enemies/index.js';
import { STATE_BUFFS } from '/imports/constants/state';

import { BattlesList } from '/imports/api/battles/battles';
import { Skills } from '/imports/api/skills/skills';
import { State } from '/imports/api/state/state';
import { Items } from '/imports/api/items/items';
import { Floors } from '/imports/api/floors/floors';
import { Adventures } from '/imports/api/adventures/adventures';

import { addItem, hasGems, consumeGems, consumeItem } from '/server/api/items/items.js';
import { addXp } from '/server/api/skills/skills';
import { Users } from '/imports/api/users/users';

const MAX_ADVENTURES = 10;
const NEW_ADVENTURE_SECONDS = 120;
const MAX_ACTIVE_ADVENTURES = 3;

const createAdventure = function createAdventure(combatSkills, maxFloor, forceEpic = false) {
  if (maxFloor < 1) {
    maxFloor = 1;
  }

  const magicChance = 0.2;
  let type = Math.random() <= magicChance && combatSkills.magic ? 'magic' : 'physical';
  let level;

  if (type === 'magic' && combatSkills.magic) {
    // Level = Magic Level / 4
    level = Math.ceil(combatSkills.magic.level / 4);
  } else {
    // Level = ((Attack + Defense) / 2) / 5
    level = Math.ceil(((combatSkills.attack.level + combatSkills.defense.level) / 2) / 5);
  }

  // Based on level determine floor
  const targetFloor = Math.ceil(level / 2);
  let floor;

  if (targetFloor > maxFloor) {
    floor = maxFloor;
  } else {
    floor = targetFloor;
  }

  // Randomize length (short, long, epic)
  let length;
  let room;
  const lengthRoll = Math.random();
  if (lengthRoll <= 0.33 && !forceEpic) {
    room = _.sample([1, 2, 3]);
    length = 'short';
  } else if (lengthRoll <= 0.66 && !forceEpic) {
    room = _.sample([4, 5]);
    length = 'long';
  } else {
    room = _.sample([6, 7]);
    length = 'epic';
  }

  let duration;
  if (length === 'short') {
    // 4m - 6m
    duration = Math.round(240 + (Math.random() * 120));
  } else if (length === 'long') {
    // 23m - 39m
    duration = Math.round(1380 + (Math.random() * 960));    
  } else {
    // 180m - 240m
    duration = Math.round(10800 + (Math.random() * 3600));
  }

  return {
    id: Random.id(),
    level,
    type,
    floor,
    room,
    length,
    duration
  }
};

const processCompleteAdventure = function processCompleteAdventure(adventure) {
  // Determine win / loss (To Do, make gear count)
  adventure.win = Math.random() <= 0.8;

  let completionDecimal = 1;
  if (moment().isBefore(adventure.endDate)) {
    const secondsElapsed = moment().diff(adventure.startDate) / 1000;
    const secondsTotal = adventure.duration;
    completionDecimal = (secondsElapsed / secondsTotal);
    adventure.win = false;
  }

  // Xp / hour lookup
  const xpLookup = {
    1: 2000,
    2: 6000,
    3: 10000,
    4: 22000,
    5: 33000,
    6: 55000
  };

  const lengthXpLookup = {
    short: 1,
    long: 0.7,
    epic: 0.5
  };

  const hasCombatGlobalBuff = !_.isUndefined(State.findOne({name: STATE_BUFFS.combat, 'value.activeTo': {$gte: moment().toDate()}}));

  // Determine xp
  let xpPerHour = adventure.level <= 6 ? xpLookup[adventure.level] :(adventure.level * 10000);
  const lengthXpDecimal = lengthXpLookup[adventure.length];
  const totalXp = xpPerHour * (adventure.duration / 3600) * lengthXpDecimal;

  adventure.rewards = [];
  if (adventure.type === 'physical') {
    adventure.rewards.push({ type: 'xp', amount: Math.round(totalXp * 0.33 * completionDecimal), skill: 'attack' });
    adventure.rewards.push({ type: 'xp', amount: Math.round(totalXp * 0.33 * completionDecimal), skill: 'health' });
    adventure.rewards.push({ type: 'xp', amount: Math.round(totalXp * 0.33 * completionDecimal), skill: 'defense' });
    if (hasCombatGlobalBuff) {
      adventure.rewards.push({ type: 'xp', amount: Math.round(totalXp * 0.33 * completionDecimal * 0.2), skill: 'attack', affectedGlobalBuff: true });
      adventure.rewards.push({ type: 'xp', amount: Math.round(totalXp * 0.33 * completionDecimal * 0.2), skill: 'health', affectedGlobalBuff: true });
      adventure.rewards.push({ type: 'xp', amount: Math.round(totalXp * 0.33 * completionDecimal * 0.2), skill: 'defense', affectedGlobalBuff: true });
    }
  } else {
    adventure.rewards.push({ type: 'xp', amount: Math.round(totalXp * 0.03 * completionDecimal), skill: 'magic' });
    adventure.rewards.push({ type: 'xp', amount: Math.round(totalXp * 0.97 * completionDecimal), skill: 'health' }); 
    if (hasCombatGlobalBuff) {
      adventure.rewards.push({ type: 'xp', amount: Math.round(totalXp * 0.03 * completionDecimal * 0.2), skill: 'magic', affectedGlobalBuff: true });
      adventure.rewards.push({ type: 'xp', amount: Math.round(totalXp * 0.97 * completionDecimal * 0.2), skill: 'health', affectedGlobalBuff: true }); 
    }
  }

  // Determine loot
  if (adventure.win) {
    // Roll for loot based on floor / room
    // Short = 1 chance
    // Medium = 2 chance
    // Epic = 2 chance per hour
    let chances;
    if (adventure.length === 'short') {
      chances = 1;
    } else if (adventure.length === 'long') {
      chances = 1;
    } else if (adventure.length === 'epic') {
      chances = 1.5;
    }

    // Possibly rewards
    const possibleRewards = FLOORS[adventure.floor][adventure.room].rewards;

    for (let i = 0; i < possibleRewards.length; i++) {
      const rewardTable = possibleRewards[i];

      if (Math.random() <= (rewardTable.chance * chances)) {
        const rewardTarget = _.sample(rewardTable.rewards);

        if (rewardTarget.type === 'item') {
          adventure.rewards.push({
            type: 'item',
            amount: rewardTarget.amount,
            itemId: rewardTarget.itemId,
            icon: ITEMS[rewardTarget.itemId].icon
          });
        } else if (rewardTarget.type === 'gold') {
          adventure.rewards.push({
            type: 'gold',
            amount: rewardTarget.amount
          });
        }
        //break; // changed by psouza4 2018-11-09: why block more rewards with their own drop rate/chance?
      }
    }
  }
};

Meteor.methods({

  'adventures.cancelAdventure'(adventureId) {
    // Queue up an adventure
    const myAdventures = Adventures.findOne({ owner: this.userId });

    // Set data for target adventure
    const targetAdventure = _.findWhere(myAdventures.adventures, { id: adventureId });
    
    if (!targetAdventure)
      return;

    if (targetAdventure.startDate && moment().isAfter(targetAdventure.startDate)) {
      // Partially complete, give some rewards
      processCompleteAdventure(targetAdventure);
    } else {
      delete targetAdventure.startDate;
      delete targetAdventure.endDate;
    }

    // Update existing adventures start and end times

    // Sorted list of left over adventures
    const sortedActiveAdventures = _.sortBy(myAdventures.adventures.filter((adventure) => {
      return adventure.startDate && adventure.win == null;
    }), 'startDate');

    // Reconstruct start and end dates
    sortedActiveAdventures.forEach((adventure, index) => {
      if (moment().isBefore(adventure.startDate)) {
        if (index === 0) {
          adventure.startDate = moment().toDate();
          adventure.endDate = moment().add(adventure.duration, 'seconds').toDate();
        } else {
          adventure.startDate = moment(sortedActiveAdventures[index - 1].endDate).toDate();
          adventure.endDate = moment(adventure.startDate).add(adventure.duration, 'seconds').toDate();
        }
      }
    });

    const updatedCount = Adventures.update({
      owner: this.userId,
      lastGameUpdated: myAdventures.lastGameUpdated
    }, {
      $set: {
        adventures: _.sortBy(myAdventures.adventures, 'startDate'),
        lastGameUpdated: new Date()
      }
    });

    // update user activity
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        lastActivity: moment().toDate()
      }
    });
  },

  'adventures.collectAdventure'(adventureId) {
    // Queue up an adventure
    const myAdventures = Adventures.findOne({ owner: this.userId });

    // Set data for target adventure
    const targetAdventure = _.findWhere(myAdventures.adventures, { id: adventureId });

    // Can't collect unfinished adventure
    if (!targetAdventure || targetAdventure.win == null) {
      return;
    }

    // Remove target adventure from array
    myAdventures.adventures = myAdventures.adventures.filter((adventure) => {
      return adventure.id !== adventureId;
    });

    const updatedCount = Adventures.update({
      owner: this.userId,
      lastGameUpdated: myAdventures.lastGameUpdated
    }, {
      $set: {
        adventures: myAdventures.adventures,
        lastGameUpdated: new Date()
      }
    });

    if (updatedCount <= 0) {
      return;
    }

    // Add rewards
    targetAdventure.rewards.forEach((reward) => {
      if (reward.type === 'gold') {
        Users.update(Meteor.userId(), {
          $inc: {
            gold: reward.amount
          }
        })
      } else if (reward.type === 'item') {
        addItem(reward.itemId, reward.amount, Meteor.userId());
      } else if (reward.type === 'xp') {
        addXp(reward.skill, reward.amount, Meteor.userId());
      }
    })

    // update user activity
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        lastActivity: moment().toDate()
      }
    });
  },

  'adventures.cycleAdventure'(isGems = false) {
    let adventureTokens;

    if (isGems) {
      if (!hasGems(10, Meteor.user())) {
        return;
      }
    } else {
      // Check for an adventure_token
      adventureTokens = Items.findOne({
        owner: Meteor.userId(),
        itemId: 'adventure_token'
      });

      if (!adventureTokens || adventureTokens.amount < 1) {
        return;
      }
    }

    // Produce extra adventure
    // Fetch all db data we need
    let myAdventures = Adventures.findOne({ owner: Meteor.userId() });

    if (!myAdventures) return;

    // Fetch users combat skills
    const rawCombatSkills = Skills.find({
      owner: this.userId,
      type: {
        $in: ['attack', 'defense', 'magic']
      }
    }).fetch();

    const combatSkills = {};

    rawCombatSkills.forEach((combatSkill) => {
      combatSkills[combatSkill.type] = combatSkill;
    });

    // get user for server ID
    const userDoc = Users.findOne(this.userId);

    // Get max floor
    const maxFloor = Floors.findOne({ floorComplete: false, server: userDoc.server }).floor;

    // Add a new adventure entry
    const forceEpic = true;
    myAdventures.adventures.unshift(createAdventure(combatSkills, maxFloor - 1, forceEpic));

    // Filter out so there is only 10
    const inactiveAdventures = myAdventures.adventures.filter((adventure) => {
      return !adventure.startDate;
    });
    const activeAdventures = myAdventures.adventures.filter((adventure) => {
      return adventure.startDate;
    });

    if (myAdventures.adventures.length > MAX_ADVENTURES) {
      inactiveAdventures.splice(MAX_ADVENTURES - 1, myAdventures.adventures.length - MAX_ADVENTURES);
    }

    myAdventures.adventures = activeAdventures.concat(inactiveAdventures);

    // Needs to be more defensive, as there is a slight delay between fetching and resetting adventures
    // Could be abused
    const updated = Adventures.update({
      owner: Meteor.userId(),
      lastGameUpdated: myAdventures.lastGameUpdated
    }, {
      $set: {
        timeTillUpdate: myAdventures.timeTillUpdate,
        adventures: myAdventures.adventures,
        lastGameUpdated: new Date()
      }
    });

    if (updated > 0) {
      if (isGems) {
        consumeGems(10, Meteor.user());
      } else {
        consumeItem(adventureTokens, 1);
      }
    }

    // update user activity
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        lastActivity: moment().toDate()
      }
    });
  },

  'adventures.startAdventure'(adventureId) {
    // Make sure user isn't in combat
    const currentBattle = BattlesList.findOne({ owners: Meteor.userId() });
    if (currentBattle) {
      throw new Meteor.Error('in-battle', 'You cannot start a adventure while you are in a battle');
    }

    // Queue up an adventure
    const myAdventures = Adventures.findOne({ owner: this.userId });

    const activeAdventures = myAdventures.adventures.filter((adventure) => {
      return adventure.startDate && adventure.win == null;
    });

    if (activeAdventures.length >= MAX_ACTIVE_ADVENTURES) {
      throw new Meteor.Error("too-many-adventures", `Only a maximum of ${MAX_ACTIVE_ADVENTURES} adventures queued as once`);
    }

    // Get furthest activeAdventures
    let furthestActiveAdventure = moment('2015-01-01');
    activeAdventures.forEach((activeAdventure) => {
      if (moment(activeAdventure.endDate).isAfter(furthestActiveAdventure)) {
        furthestActiveAdventure = moment(activeAdventure.endDate);
      }
    });

    if (!activeAdventures || activeAdventures.length === 0) {
      furthestActiveAdventure = moment();
    }

    // Set data for target adventure
    const targetAdventure = _.findWhere(myAdventures.adventures, { id: adventureId });

    targetAdventure.startDate = moment(furthestActiveAdventure).toDate();
    targetAdventure.endDate = moment(targetAdventure.startDate).add(targetAdventure.duration, 'seconds').toDate();

    Adventures.update({
      owner: this.userId,
      lastGameUpdated: myAdventures.lastGameUpdated
    }, {
      $set: {
        adventures: _.sortBy(myAdventures.adventures, 'startDate'),
        lastGameUpdated: moment(myAdventures.lastGameUpdated).add(1, 'seconds').toDate()
      }
    });

    // update user activity
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        lastActivity: moment().toDate()
      }
    });
  },

  'adventures.gameUpdate'() {
    if (!this.userId) {
      return;
    }

    // Fetch all db data we need
    let myAdventures = Adventures.findOne({ owner: this.userId });

    // Create one
    if (!myAdventures) {
      myAdventures = {
        owner: this.userId,
        lastGameUpdated: moment().subtract(1000, 'seconds').toDate(),
        adventures: [],
        timeTillUpdate: 0
      };

      Adventures.insert(myAdventures);
    }

    // Are any active adventures finished?
    myAdventures.adventures.forEach((adventure) => {
      if (!adventure.id) {
        adventure.id = Random.id();
      }

      if (moment().isAfter(adventure.endDate) && adventure.win == null) {
        processCompleteAdventure(adventure);
      }
    });

    // Determine time since last update
    const now = moment();
    let secondsElapsed = moment.duration(now.diff(myAdventures.lastGameUpdated)).asSeconds();

    // Decrement time till update
    myAdventures.timeTillUpdate -= secondsElapsed;

    if (myAdventures.timeTillUpdate <= 0) {

      // Fetch users combat skills
      const rawCombatSkills = Skills.find({
        owner: this.userId,
        type: {
          $in: ['attack', 'defense', 'magic']
        }
      }).fetch();

      const combatSkills = {};

      rawCombatSkills.forEach((combatSkill) => {
        combatSkills[combatSkill.type] = combatSkill;
      });

      // get user for server ID
      const userDoc = Users.findOne(this.userId);

      // Get max floor
      const maxFloor = Floors.findOne({ floorComplete: false, server: userDoc.server }).floor;

      let newAdventureCount = (Math.floor(Math.abs(myAdventures.timeTillUpdate) / NEW_ADVENTURE_SECONDS) + 1);
      if (newAdventureCount >= MAX_ADVENTURES) {
        newAdventureCount = MAX_ADVENTURES;
      }

      for (let i = 0; i < newAdventureCount; i++) {
        // Add a new adventure entry
        myAdventures.adventures.unshift(createAdventure(combatSkills, maxFloor - 1));
      }
      myAdventures.timeTillUpdate = NEW_ADVENTURE_SECONDS;
    }

    // Filter out so there is only 10
    const inactiveAdventures = myAdventures.adventures.filter((adventure) => {
      return !adventure.startDate;
    });
    const activeAdventures = myAdventures.adventures.filter((adventure) => {
      return adventure.startDate;
    });

    if (myAdventures.adventures.length > MAX_ADVENTURES) {
      inactiveAdventures.splice(MAX_ADVENTURES - 1, myAdventures.adventures.length - MAX_ADVENTURES);
    }

    myAdventures.adventures = activeAdventures.concat(inactiveAdventures);

    // Needs to be more defensive, as there is a slight delay between fetching and resetting adventures
    // Could be abused
    Adventures.update({
      owner: Meteor.userId(),
      lastGameUpdated: myAdventures.lastGameUpdated
    }, {
      $set: {
        timeTillUpdate: myAdventures.timeTillUpdate,
        adventures: myAdventures.adventures,
        lastGameUpdated: new Date()
      }
    });
  }

});

const MINUTE = 60 * 1000;

DDPRateLimiter.addRule({ type: 'method', name: 'adventures.gameUpdate',
  userId(userId) {
    return userId;
  } 
}, 5, 15000);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'adventures' }, 40, 2 * MINUTE);

Meteor.publish('adventures', function() {

  //Transform function
  const transform = function(doc) {
    // Inject icon and name into document based on floor and room
    doc.adventures = doc.adventures.map((adventure) => {
      const floorConstants = FLOORS[adventure.floor][adventure.room];

      adventure.icon = ENEMIES[floorConstants.enemies[0]].icon;
      adventure.name = floorConstants.name;

      return adventure;
    });
    return doc;
  };

  const self = this;

  const observer = Adventures.find({
    owner: this.userId
  }).observe({
      added: function (document) {
      self.added('adventures', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('adventures', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('adventures', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
