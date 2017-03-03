import { Meteor } from 'meteor/meteor';
import { MINING } from '../../../server/constants.js';
import moment from 'moment';
import _ from 'underscore';

import { Mining } from '/imports/api/mining/mining';
import { MiningSpace } from '/imports/api/mining/mining';
import { addItem } from '/server/api/items/items';

const attackMineSpace = function (id, damage) {
  const mineSpace = MiningSpace.findOne({ _id: id, owner: Meteor.userId() });

  const oreConstants = MINING.ores[mineSpace.oreId];

  if (mineSpace.health - damage <= 0) {
    // Mine space has been destroyed
    MiningSpace.update(mineSpace._id, {
      $set: { oreId: null }
    });

    addItem(oreConstants.itemId, 1);
  } else {
    MiningSpace.update(mineSpace._id, {
      $inc: { health: (-1 * damage) },
    });    
  }
}

Meteor.methods({
  'mining.clickedMineSpace'(mineSpaceId) {
    attackMineSpace(mineSpaceId, 1);
  },

  'mining.gameUpdate'() {
    // Fetch current users mine space
    const mining = Mining.findOne({ owner: this.userId });
    const miningSpaces = MiningSpace.find({ owner: this.userId }).map((doc) => doc);
    const emptyMiningSpaces = miningSpaces.filter((miningSpace) => !miningSpace.oreId);

    // Determine time since last update
    const now = moment();
    const secondsElapsed = moment.duration(now.diff(mining.lastGameUpdated)).asSeconds();

    // Determine what mining resources have spawned since
    const possibleNewResources = secondsElapsed * MINING.prospecting.chance;
    let newResources = Math.floor(possibleNewResources);

    if ((possibleNewResources - newResources) > Math.random()) {
      newResources += 1;
    }

    // Fill up empty mining spaces
    _.shuffle(emptyMiningSpaces).forEach((emptyMiningSpace) => {
      if (newResources > 0) {
        newResources--;
        // Save mining space
        MiningSpace.update(emptyMiningSpace._id, {
          $set: { oreId: MINING.ores.stone.id, health: MINING.ores.stone.maxHealth }
        });
      }
    });

    Mining.update(mining._id, {
      $set: { lastGameUpdated: new Date() }
    });
  }
});

Meteor.publish('miningSpace', function() {

  //Transform function
  var transform = function(doc) {
    if (doc.oreId) {
      const currentOreConstants = MINING.ores[doc.oreId];
      doc.requiredLevel = currentOreConstants.requiredLevel;
      doc.maxHealth = currentOreConstants.maxHealth;
      doc.icon = currentOreConstants.icon;
    }
    return doc;
  }

  var self = this;

  var observer = MiningSpace.find({
    owner: this.userId
  }).observe({
      added: function (document) {
      self.added('miningSpace', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('miningSpace', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('miningSpace', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});

Meteor.publish('mining', function() {

  //Transform function
  var transform = function(doc) {
    return doc;
  }

  var self = this;

  var observer = Mining.find({
    owner: this.userId
  }).observe({
      added: function (document) {
      self.added('mining', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('mining', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('mining', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
