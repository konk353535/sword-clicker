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
    return ASTRONOMY.mageHireCost;
  },
  // Hire a specific type of mage
  'astronomy.hireMage'(type) {
    if (!_.contains(['fire', 'water', 'air', 'earth'], type)) {
      throw new Meteor.Error("missed-requirmeents", "invalid mage type");
    }
    const astronomy = Astronomy.findOne({ owner: Meteor.userId() });

    // Do we have room for a new mage?
    const currentMages = astronomy.mages.length;
    const maxMages = ASTRONOMY.baseMaxMages;

    if (currentMages >= maxMages) {
      throw new Meteor.Error("missed-requirmeents", "already have the max # of mages");
    }

    const requirements = ASTRONOMY.mageHireCost;

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
  'astronomy.depositMageGold'(index) { },
  // Fire mage
  'astronomy.fireMage'(index) { },
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

    // Iterate through all miners for minutesElapsed
    astronomy.mages.forEach((currentMage) => {

      // Calculate shard fragments found
      let totalFound = currentMage.stats.attackSpeed * hoursElapsed;

      if (totalFound < 1 && Math.random() < totalFound) {
        totalFound = 1;
      }

      // Do we crit?
      if (Math.random() <= currentMage.stats.criticalChance) {
        totalFound *= 2;
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
      }
    });

    Object.keys(gainedItems).forEach((itemId) => {
      addItem(itemId, gainedItems[itemId]);
    });

    if (gainedXp >= 1) {
      addXp('astronomy', gainedXp);
    }
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
