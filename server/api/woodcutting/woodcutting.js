import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { WOODCUTTING } from '/server/constants/woodcutting/index.js';
import { ITEMS } from '/server/constants/items/index.js';

import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting';
import { requirementsUtility } from '/server/api/crafting/crafting';
import { addItem } from '/server/api/items/items';
import { addXp } from '/server/api/skills/skills';

Meteor.methods({

  'woodcutting.gameUpdate'() {
    // Fetch all db data we need
    const woodcutting = Woodcutting.findOne({ owner: this.userId });

    if (!woodcutting) {
      return;
    }

    // Update last updated immeditely
    // incase an error occurs further on in the code, the users updated will not get set
    // Giving them a lot of extra XP!
    Woodcutting.update(woodcutting._id, {
      $set: { lastGameUpdated: new Date() }
    });

    // Determine time since last update
    const now = moment();
    const minutesElapsed = moment.duration(now.diff(woodcutting.lastGameUpdated)).asMinutes();

    // Determine item and exp gains
    const gainedItems = {};
    let gainedXp = 0;

    // Iterate through all miners for minutesElapsed
    woodcutting.woodcutters.forEach((currentWoodcutter) => {
      const rawSwingCount = currentWoodcutter.stats.attackSpeed * minutesElapsed;
      let definiteSwingCount = Math.floor(rawSwingCount);
      if (rawSwingCount % 1 >= Math.random()) {
        definiteSwingCount += 1;
      }

      // Possible woods
      const possibleLogs = Object.keys(WOODCUTTING.woods).map((woodKey) => {
        return WOODCUTTING.woods[woodKey];
      }).filter((log) => {
        if (currentWoodcutter.stats.attack >= log.requiredAttack) {
          return true;
        }

        return false;
      });

      const sortedLogs = _.sortBy(possibleLogs, 'chance');
      sortedLogs.forEach((log) => {
        const rawGeneratedLogs = log.chance * (1 + (currentWoodcutter.stats.accuracy / 100)) * definiteSwingCount;
        let definiteGenerateLogs = Math.floor(rawGeneratedLogs);
        if (rawGeneratedLogs % 1 >= Math.random()) {
          definiteGenerateLogs += 1;
        }

        if (definiteGenerateLogs > 0) {
          if (gainedItems[log.id]) {
            gainedItems[log.id] += definiteGenerateLogs;
          } else {
            gainedItems[log.id] = definiteGenerateLogs;
          }
        }

        gainedXp += (log.xp * definiteGenerateLogs);
        definiteSwingCount -= definiteGenerateLogs;
      });
    });

    Object.keys(gainedItems).forEach((itemId) => {
      addItem(itemId, gainedItems[itemId]);
    });

    addXp('woodcutting', gainedXp);
  },

  'woodcutting.fetchWoodcutters'() {
    const woodcuttingSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'woodcutting'
    });

    const woodcuttersArray = Object.keys(WOODCUTTING.woodcutters).map((key) => {
      return WOODCUTTING.woodcutters[key];
    }).filter((recipe) => {
      // Only show woodcutters we can hire, or close to ( 1 level away )
      if (woodcuttingSkill.level + 1 >= recipe.requiredWoodcuttingLevel) {
        return true;
      }

      return false;
    });

    return woodcuttersArray;
  },

  'woodcutting.hireWoodcutter'(woodcutterId) {
    const woodcutting = Woodcutting.findOne({ owner: Meteor.userId() });

    // Do we have room for more woodcutters?
    if (woodcutting.woodcutters.length >= WOODCUTTING.baseMaxWoodcutters) {
      return;
    }

    // Is this a valid recipe?
    const woodcutterConstants = WOODCUTTING.woodcutters[woodcutterId];
    if (!woodcutterConstants) {
      return;
    }

    // Fetch the axe which we will use, as it will dissapear when we call requirements util
    const axeToUse = Items.findOne({ itemId: woodcutterConstants.axeId }, {
      sort: [
        ['_id', 'asc']
      ]
    });

    // Do we have the requirements for this craft (items / levels / gold)
    if (!requirementsUtility(woodcutterConstants.required, 1)) {
      return;
    }

    const stats = JSON.parse(JSON.stringify(ITEMS[axeToUse.itemId].stats));

    if (axeToUse.extraStats) {
      Object.keys(axeToUse.extraStats).forEach((stat) => {
        if(stats[stat]) {
          stats[stat] += axeToUse.extraStats[stat];
        }
      });
    }

    // Add woodcutter
    Woodcutting.update(woodcutting._id, {
      $push: {
        woodcutters: {
          stats,
          icon: woodcutterConstants.icon,
          name: woodcutterConstants.name,
          woodcutterId: woodcutterConstants.id
        }
      }
    });
  }

})

Meteor.publish('woodcutting', function() {

  //Transform function
  var transform = function(doc) {
    doc.maxWoodcutters = WOODCUTTING.baseMaxWoodcutters;
    return doc;
  }

  var self = this;

  var observer = Woodcutting.find({
    owner: this.userId
  }).observe({
      added: function (document) {
      self.added('woodcutting', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('woodcutting', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('woodcutting', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
