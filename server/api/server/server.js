import { Meteor } from "meteor/meteor";
import lodash from 'lodash';

import { Servers, createTown } from '/imports/api/servers/servers';
import { Items } from '/imports/api/items/items';

import { ITEMS } from '/imports/constants/items/index.js';

import { CInt } from '/imports/utils';
import { updateUserActivity } from '/imports/api/users/users.js';

Meteor.publish('town', function() {
  const transform = function(doc) {
    return doc.town;
  };

  const self = this;

  const observer = Servers.find({
    _id: Meteor.user().server
  }).observe({
    added: function (document) {
      self.added('town', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('town', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('town', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();
});

Meteor.methods({
  // note: this isn't used by anything (directly, although an admin using the browser's dev console could call this)
  'server.info'() {
    const userDoc = Users.findOne({ _id: Meteor.userId() });
    const userIsAdmin = userDoc && userDoc.isSuperMod;

    if (!userIsAdmin) {
      return false;
    }
    
    return Servers.findOne({ _id: Meteor.user().server });
  },
  
  // note: this isn't used by anything (directly, although an admin using the browser's dev console could call this)
  'server.createTown'() {
    const userDoc = Users.findOne({ _id: Meteor.userId() });
    const userIsAdmin = userDoc && userDoc.isSuperMod;

    if (!userIsAdmin) {
      return false;
    }
    
    const serverDoc = Servers.findOne({ _id: Meteor.user().server });

    if (serverDoc.town) {
      return `Aborted: town info already exists for server ${serverDoc.name} (${serverDoc._id}).`;
    }
    
    createTown({serverId: serverDoc._id});    
    return `Success: town created for server ${serverDoc.name} (${serverDoc._id}).`;
  },
  
  // note: this isn't used by anything (we now publish and subscribe to a pseudo-collection)
  'town.getGoods'(whichDay = 1) {
    whichDay = CInt(whichDay);    
    if (whichDay < 1 || whichDay > 7) {
      return;
    }
    
    const serverDoc = Servers.findOne({ _id: Meteor.user().server });
    if (!serverDoc || !serverDoc.town) {
      return;
    }
    
    if (whichDay === 2) {
      return serverDoc.town.day2goods;
    }
    if (whichDay === 3) {
      return serverDoc.town.day3goods;
    }
    if (whichDay === 4) {
      return serverDoc.town.day4goods;
    }
    if (whichDay === 5) {
      return serverDoc.town.day5goods;
    }
    if (whichDay === 6) {
      return serverDoc.town.day6goods;
    }
    if (whichDay === 7) {
      return serverDoc.town.day7goods;
    }
    return serverDoc.town.day1goods;
  },
  
  'town.donateItem'(_id, itemId, amount, building) {
    if (!_id || !itemId || !amount || amount <= 0 || !building || (typeof building !== 'string')) {
      return;
    }
    
    //todo: validate item qualifies for building, maybe add to ITEMS constants?

    const serverDoc = Servers.findOne({ _id: Meteor.user().server });
    if (!serverDoc || !serverDoc.town) {
      return;
    }
    
    const currentItem = Items.findOne({ _id, owner: Meteor.userId(), itemId: itemId });
    if (!currentItem || currentItem.equipped) {
      return;
    }

    const itemConstants = ITEMS[currentItem.itemId];
    let amountToDonate = amount;
    
    if (amountToDonate >= currentItem.amount) {
      // USE UP ALL OF AN ITEM (delete)
      
      // Cap amount donated to actual item amount;
      amountToDonate = currentItem.amount;
      
      // Delete item
      const itemsUpdated = Items.remove(currentItem._id);
      if (itemsUpdated <= 0) {
        return;
      }
    } else {
      // USE UP SOME OF AN ITEM (decrement)
      
      // Decrement item quantity
      const itemsUpdated = Items.update(currentItem._id, {
        $inc: { amount: (amountToDonate * -1) }
      });
      if (itemsUpdated <= 0) {
        return;
      }
    }

    let currentDayGoods = [];
    if (serverDoc.town.day1goods) {
      currentDayGoods = serverDoc.town.day1goods;
    }
    
    currentDayGoods = currentDayGoods.concat({
      townBuilding: building,
      itemId: currentItem.itemId,
      count: amountToDonate,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    
    const consolidateGoods = function(inputGoods) {
      const tempGoods = lodash.cloneDeep(inputGoods);
      let consolidatedGoods = tempGoods.reduce((accumulator, currentValue, currentIndex, sourceArray) => {
        let needsToBeAdded = true;
        accumulator.forEach((item) => {
          if ((item.itemId === currentValue.itemId) && (item.owner === currentValue.owner) && (item.townBuilding === currentValue.townBuilding)) {
            item.count = CInt(item.count) + CInt(currentValue.count);
            needsToBeAdded = false;
          }
        });
        if (needsToBeAdded) {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, []);
      return consolidatedGoods;
    };
    
    currentDayGoods = consolidateGoods(currentDayGoods);
    
    Servers.update({
      _id: Meteor.user().server
    }, {
      $set: {
        'town.day1goods': currentDayGoods
      }
    });

    updateUserActivity({userId: Meteor.userId()});    
  }
});
