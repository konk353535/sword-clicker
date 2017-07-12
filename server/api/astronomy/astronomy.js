import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import _ from 'underscore';

import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';
import { ASTRONOMY } from '/server/constants/astronomy/index.js';
import { ITEMS } from '/server/constants/items/index.js';

import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import { Users } from '/imports/api/users/users';
import { Astronomy } from '/imports/api/astronomy/astronomy';

import { requirementsUtility } from '/server/api/crafting/crafting';
import { addItem } from '/server/api/items/items';
import { addXp } from '/server/api/skills/skills';

Meteor.methods({

  // Upgrade the main mages stats
  'astronomy.upgradeMage'(stat) {
    if (!_.contains(['attackSpeed', 'criticalChance'], stat)) {
      throw new Meteor.Error("invalid-stat", "Not a valid mage stat");
    }

    // Get current value
    const astronomy = Astronomy.findOne({ owner: Meteor.userId() });
    const mainMage = astronomy.mages[0];

    // Get cost of specified stat
    const requirements = ASTRONOMY.upgradeCosts[stat](mainMage.stats[stat]);

    if (!requirementsUtility(requirements, 1)) {
      throw new Meteor.Error("missed-requirmeents", "dont meet requirements");
      return;
    }

    mainMage.stats[stat] += 1;

    const userDoc = Meteor.user();

    // Does user have astronomy upgrade
    const hasAstronomyUpgrade = userDoc.astronomyUpgradeTo && moment().isBefore(userDoc.astronomyUpgradeTo);
    if (hasAstronomyUpgrade && _.findWhere(astronomy.mages, { id: 'donatorMage' })) {
      const donatorMage = _.findWhere(astronomy.mages, { id: 'donatorMage' });
      donatorMage.stats = {
        attackSpeed: Math.round(mainMage.stats.attackSpeed / 2),
        criticalChance: mainMage.stats.criticalChance
      }
    }

    // Increment stat
    Astronomy.update(astronomy._id, {
      $set: {
        mages: astronomy.mages
      }
    });
  },
  // Fetch main mage upgrade costs
  'astronomy.upgradeCosts'() {
    // Get main mage
    const astronomy = Astronomy.findOne({
      owner: Meteor.userId()
    });

    const mainMage = astronomy.mages[0];
    const upgrades = {};
    
    Object.keys(mainMage.stats).forEach((mageStat) => {
      upgrades[mageStat] = ASTRONOMY.upgradeCosts[mageStat](mainMage.stats[mageStat]);
    });

    return upgrades;
  },
  // Cost to hire a mage
  'astronomy.hireMageCost'() {
    const astronomy = Astronomy.findOne({ owner: Meteor.userId() });
    if (!astronomy) {
      return;
    }
    const mainMage = astronomy.mages[0];
    if (!mainMage) {
      return;
    }

    return ASTRONOMY.mageHireCost(mainMage);
  },
  // Hire a specific type of mage
  'astronomy.hireMage'(type) {
    if (!_.contains(['fire', 'water', 'air', 'earth'], type)) {
      throw new Meteor.Error("missed-requirmeents", "invalid mage type");
    }
    const astronomy = Astronomy.findOne({ owner: Meteor.userId() });

    // Do we have room for a new mage?
    const currentMages = astronomy.mages.length;
    let maxMages = ASTRONOMY.baseMaxMages;

    const userDoc = Meteor.user();

    // Does user have astronomy upgrade
    const hasAstronomyUpgrade = userDoc.astronomyUpgradeTo && moment().isBefore(userDoc.astronomyUpgradeTo);
    if (hasAstronomyUpgrade) {
      maxMages = maxMages + 1;
    }

    if (currentMages >= maxMages) {
      throw new Meteor.Error("missed-requirmeents", "already have the max # of mages");
    }

    const mainMage = astronomy.mages[0];
    const requirements = ASTRONOMY.mageHireCost(mainMage);

    if (!requirementsUtility(requirements, 1)) {
      throw new Meteor.Error("missed-requirmeents", "dont meet requirements");
      return;
    }

    // Add mage to our list
    astronomy.mages.push({
      type,
      stats: {
        attackSpeed: Math.floor(astronomy.mages[0].stats.attackSpeed / 2),
        criticalChance: Math.floor(astronomy.mages[0].stats.criticalChance / 2)
      },
      gold: requirements[0].amount
    });

    Astronomy.update(astronomy._id, {
      $set: {
        mages: astronomy.mages
      }
    });
  },
  // Deposit gold to mage
  'astronomy.depositMageGold'(index, amount) {
    if (amount <= 0) {
      return;
    }
    // Check we have enough gold, and deposit it
    const astronomy = Astronomy.findOne({ owner: Meteor.userId() });

    // Do we have enough gold
    const userDoc = Meteor.user();

    if (userDoc.gold < amount) {
      throw new Meteor.Error("invalid-gold", "dont have that much gold");
    }

    // Does mage exist?
    if (astronomy.mages[index] && astronomy.mages[index].type) {
      const targetMage = astronomy.mages[index];
      targetMage.gold += amount;
    } else {
      throw new Meteor.Error("invalid-mage", "mage does not exist");
    }

    // Update user, then update mage
    Users.update(Meteor.userId(), {
      $inc: {
        gold: amount * -1
      }
    });

    Astronomy.update(astronomy._id, {
      $set: {
        mages: astronomy.mages
      }
    });
  },
  // Withdraw gold from mage
  'astronomy.withdrawMageGold'(index, amount) {
    if (amount <= 0) {
      return;
    }

    // If more gold then what is there specified, withdraw all gold
    const astronomy = Astronomy.findOne({ owner: Meteor.userId() });

    // Do we have enough gold
    const userDoc = Meteor.user();

    // Does mage exist?
    if (astronomy.mages[index] && astronomy.mages[index].type && astronomy.mages[index].gold) {
      const targetMage = astronomy.mages[index];
      if (targetMage.gold < amount) {
        amount = targetMage.gold;
        targetMage.gold = 0;
      } else {
        targetMage.gold -= amount;
      }
    } else {
      throw new Meteor.Error("invalid-mage", "mage does not exist");
    }

    // Update user, then update mage
    Users.update(Meteor.userId(), {
      $inc: {
        gold: Math.round(amount)
      }
    });

    Astronomy.update(astronomy._id, {
      $set: {
        mages: astronomy.mages
      }
    });
  },
  // Boost mage
  'astronomy.boostMage'(index) { },
  // Game Update
  'astronomy.gameUpdate'() {
    // Fetch all db data we need
    const astronomy = Astronomy.findOne({ owner: this.userId });

    if (!astronomy) {
      return;
    }

    const userDoc = Meteor.user();

    // Update last updated immeditely
    // incase an error occurs further on in the code, the users updated will not get set
    // Giving them a lot of extra XP!
    Astronomy.update(astronomy._id, {
      $set: { lastGameUpdated: new Date() }
    });

    // Determine time since last update
    const now = moment();
    let hoursElapsed = moment.duration(now.diff(astronomy.lastGameUpdated)).asHours()

    // Cap offline gains to 8 hours
    if (hoursElapsed > 8) {
      hoursElapsed = 8;
    }

    // Determine item and exp gains
    const gainedItems = {};
    let gainedXp = 0;

    // Cost of mage per hour
    const mainMage = astronomy.mages[0];
    const costPerHour = ASTRONOMY.mageHireCost(mainMage)[0].amount;

    // Does user have astronomy upgrade
    const hasAstronomyUpgrade = userDoc.astronomyUpgradeTo && moment().isBefore(userDoc.astronomyUpgradeTo);

    // Does user contain members mage?
    if (_.findWhere(astronomy.mages, { id: 'donatorMage' })) {
      // Is this user not a donator anymore? if not strip donatormage
      if (!hasAstronomyUpgrade) {
        astronomy.mages = astronomy.mages.filter((mage) => {
          return mage.id !== 'donatorMage';
        });
      }
    } else {
      // Is this user a donator? If so add mage in
      if (hasAstronomyUpgrade) {
        // Get main mage
        const mainMage = _.find(astronomy.mages, (mage) => {
          return !mage.type
        });

        astronomy.mages.push({
          id: 'donatorMage',
          stats: {
            attackSpeed: Math.round(mainMage.stats.attackSpeed / 2),
            criticalChance: mainMage.stats.criticalChance
          }
        });
      }
    }

    // Iterate through all miners for minutesElapsed
    astronomy.mages.forEach((currentMage) => {

      let localHoursElapsed = hoursElapsed;

      if (currentMage.type) {
        // Check there is enough gold
        const maxTime = currentMage.gold / costPerHour;
        if (localHoursElapsed > maxTime) {
          currentMage.gold = 0;
          localHoursElapsed = maxTime;
        } else {
          // Remove gold
          currentMage.gold -= (localHoursElapsed * costPerHour);
        }
      }

      // Calculate shard fragments found
      let totalFound = currentMage.stats.attackSpeed * localHoursElapsed;

      if (totalFound < 1 && Math.random() < totalFound) {
        totalFound = 1;
      }

      // Do we crit?
      if (Math.random() <= (currentMage.stats.criticalChance / 100)) {
        totalFound *= 2;
      }

      // Based on total found see if we get complete / ful shard
      const completeChance = 1 / 1000;
      const ancientChance = 1 / 10000;
      let foundComplete = false;
      let foundAncient = false;

      if (Math.random() <= completeChance * totalFound) {
        foundComplete = true;
      }

      if (Math.random() <= ancientChance * totalFound) {
        foundAncient = true;
      }

      gainedXp += totalFound;
      if (currentMage.type) {
        const item_id = `${currentMage.type}_shard_fragment`;
        // all found are of specified type
        if (gainedItems[item_id]) {
          gainedItems[item_id] += Math.floor(totalFound);
        } else {
          gainedItems[item_id] = Math.floor(totalFound);
        }

        if (foundComplete) {
          const item_id = `complete_${currentMage.type}_shard`;
          // all found are of specified type
          if (gainedItems[item_id]) {
            gainedItems[item_id] += 1;
          } else {
            gainedItems[item_id] = 1;
          }
        }

        if (foundAncient) {
          const item_id = `ancient_${currentMage.type}_shard`;
          // all found are of specified type
          if (gainedItems[item_id]) {
            gainedItems[item_id] += 1;
          } else {
            gainedItems[item_id] = 1;
          }
        }
      } else {
        const types = ['fire', 'water', 'air', 'earth'];

        // Split all found by 4
        if (totalFound >= 4) {
          types.forEach((type) => {
            const item_id = `${type}_shard_fragment`;

            if (gainedItems[item_id]) {
              gainedItems[item_id] += Math.floor(totalFound / 4);
            } else {
              gainedItems[item_id] = Math.floor(totalFound / 4);
            }
          });
        } else {
          // Just choose one type at random
          const type = _.sample(types);
          const item_id = `${type}_shard_fragment`;

          if (gainedItems[item_id]) {
            gainedItems[item_id] += Math.floor(totalFound);
          } else {
            gainedItems[item_id] = Math.floor(totalFound);
          }
        }

        const randomType = _.sample(types);
        if (foundComplete) {
          const item_id = `complete_${randomType}_shard`;
          // all found are of specified type
          if (gainedItems[item_id]) {
            gainedItems[item_id] += 1;
          } else {
            gainedItems[item_id] = 1;
          }
        }

        if (foundAncient) {
          const item_id = `ancient_${randomType}_shard`;
          // all found are of specified type
          if (gainedItems[item_id]) {
            gainedItems[item_id] += 1;
          } else {
            gainedItems[item_id] = 1;
          }
        }
      }
    });

    Object.keys(gainedItems).forEach((itemId) => {
      addItem(itemId, gainedItems[itemId]);
    });

    if (gainedXp >= 1) {
      addXp('astronomy', gainedXp);
    }

    // Update mages
    astronomy.mages = astronomy.mages.filter((mage) => {
      return !mage.type || mage.gold > 0;
    });

    Astronomy.update(astronomy._id, {
      $set: {
        mages: astronomy.mages
      }
    });
  }
});


Meteor.publish('astronomy', function() {

  //Transform function
  var transform = function(doc) {
    doc.maxMages = ASTRONOMY.baseMaxMages;
    doc.mages = doc.mages.map((mage) => {
      if (!mage.type) {
        mage.icon = 'mage';
        mage.name = 'Mage';
      } else if (mage.type) {
        mage.icon = `${mage.type}Mage`;
        mage.name = `${mage.type} mage`;
        mage.stats.gold = Math.round(mage.gold);
      }
      return mage;
    });
    return doc;
  }

  var self = this;

  var observer = Astronomy.find({
    owner: this.userId
  }).observe({
      added: function (document) {
      self.added('astronomy', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('astronomy', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('astronomy', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
