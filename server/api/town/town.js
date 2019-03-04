import { Meteor } from "meteor/meteor";
import lodash from 'lodash';

import { Servers } from '/imports/api/servers/servers';
import { Users } from '/imports/api/users/users.js';
import { Items } from '/imports/api/items/items';
import { State } from '/imports/api/state/state';

import { ITEMS } from '/imports/constants/items/index.js';

import { CInt } from '/imports/utils';
import { createTown } from '/imports/api/town/town';
import { updateUserActivity, serverFromUser } from '/imports/api/users/users.js';
import { karmaLevelValues } from '/imports/api/town/town.js';
import { getGlobalBuff } from '/imports/api/globalbuffs/globalbuffs.js';

export const deleteKarmaBuffs = function deleteKarmaBuffs() {
  State.remove({ name: 'town_dwelling' });
  State.remove({ name: 'town_quarry' });
  State.remove({ name: 'town_lumber_yard' });
  State.remove({ name: 'town_armory' });
  State.remove({ name: 'town_library' });
  State.remove({ name: 'town_observatory' });
};

export const syncKarmaBuffs = function syncKarmaBuffs() {
  Servers.find().fetch().forEach((thisServer) => {
    try {
      // read town data
      const serverData = lodash.cloneDeep(thisServer);
      const townData = serverData.town;
      
      // set up karma data
      const karmaData = {
        dwellings:   karmaLevelValues('dwellings',   townData),
        quarry:      karmaLevelValues('quarry',      townData),
        lumberyard:  karmaLevelValues('lumberyard',  townData),
        armory:      karmaLevelValues('armory',      townData),
        library:     karmaLevelValues('library',     townData),
        observatory: karmaLevelValues('observatory', townData),
      };
      
      //console.log("Karma data:");
      //console.log(karmaData);
      
      // Iterate through each town section
      Object.keys(karmaData).forEach((karmaDataPoint) => {
        // Make sure there are no errors parsing this section
        if (!karmaData[karmaDataPoint].isError) {
          // Find an existing buff
          const locateBuff = getGlobalBuff(karmaData[karmaDataPoint].buffName, thisServer._id);
          
          // If there's no existing buff (or there is, but it's of a different level than our current target level)
          if (!locateBuff || (CInt(locateBuff.value.level) != CInt(karmaData[karmaDataPoint].currentLevel))) {
            // Delete any existing buff
            State.remove({ name: karmaData[karmaDataPoint].buffName, server: thisServer._id });
            
            // And create a new buff with the right level (or no buff at target level 0)
            if (CInt(karmaData[karmaDataPoint].currentLevel) > 0) {
              State.insert({ name: karmaData[karmaDataPoint].buffName, server: thisServer._id, value: { activeTo: moment().utc().hours(23).minutes(59).seconds(59).toDate(), level: karmaData[karmaDataPoint].currentLevel } });
            }
          }
        }
      });
    } catch (err) {
      console.log("syncKarmaBuffs() exception:");
      console.log(err);
    }
  });
};

export const newTownDay = function newTownDay() {
  Servers.find().fetch().forEach((thisServer) => {
    try {
      // read town data
      const serverData = lodash.cloneDeep(thisServer);
      let serverTownData = serverData.town;
      
      if (!serverTownData) {
        // create new town data
        serverTownData = {
          day1goods: [],
          day2goods: [],
          day3goods: [],
          day4goods: [],
          day5goods: [],
          day6goods: [],
          day7goods: []
        };
      } else {
        // todo: give rewards to players with high scoring karma
        
        // reset goods by rolling data into the next day
        serverTownData.day7goods = []; // serverTownData.day6goods; // because mongo isn't on the same network, this rollover was taking forever to publish data to client endpoints, so we're only tracking 1 day of history now
        serverTownData.day6goods = []; // serverTownData.day5goods; // because mongo isn't on the same network, this rollover was taking forever to publish data to client endpoints, so we're only tracking 1 day of history now
        serverTownData.day5goods = []; // serverTownData.day4goods; // because mongo isn't on the same network, this rollover was taking forever to publish data to client endpoints, so we're only tracking 1 day of history now
        serverTownData.day4goods = []; // serverTownData.day3goods; // because mongo isn't on the same network, this rollover was taking forever to publish data to client endpoints, so we're only tracking 1 day of history now
        serverTownData.day3goods = []; // serverTownData.day2goods; // because mongo isn't on the same network, this rollover was taking forever to publish data to client endpoints, so we're only tracking 1 day of history now
        serverTownData.day2goods = serverTownData.day1goods;
        serverTownData.day1goods = []; // newest day has no donated goods, no karma
      }
      
      Servers.update({
        _id: thisServer._id
      }, {
        $set: {
          town: serverTownData
        }
      });
    } catch (err) {
      console.log("newTownDay() exception:");
      console.log(err);
    }
  });
  
  // delete and synchronize new town buffs
  deleteKarmaBuffs();
  syncKarmaBuffs();
};

const consolidateGoods = function consolidateGoods(inputGoods) {
  const tempGoodsList = lodash.cloneDeep(inputGoods);
  let consolidatedGoods = tempGoodsList.reduce((accumulator, currentValue, currentIndex, sourceArray) => {
    let needsToBeAdded = true;
    accumulator.forEach((item) => {
      if ((item.itemId === currentValue.itemId) && (item.owner === currentValue.owner) && (item.townBuilding === currentValue.townBuilding) && (item.rarityId === currentValue.rarityId)) {
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
    
Meteor.publish('town', function() {
  const transform = function(doc) {
    return doc.town;
  };

  const self = this;

  const observer = Servers.find({ _id: serverFromUser() }).observe({
    added: function(document) {
      self.added('town', document._id, transform(document));
    },
    changed: function(newDocument, oldDocument) {
      self.changed('town', oldDocument._id, transform(newDocument));
    },
    removed: function(oldDocument) {
      self.removed('town', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();
});

Meteor.methods({
  // note: this isn't used by anything directly (although an admin using the 'dev' tab or a browser's dev console could call this)
  'server.createTown'() {
    const userDoc = Users.findOne({ _id: Meteor.userId() });
    const userIsAdmin = userDoc && userDoc.isSuperMod;

    if (!userIsAdmin) {
      return false;
    }
    
    const serverDoc = Servers.findOne({ _id: serverFromUser() });

    if (serverDoc.town) {
      return `Aborted: town info already exists for server ${serverDoc.name} (${serverDoc._id}).`;
    }
    
    createTown(serverDoc._id);
    return `Success: town created for server ${serverDoc.name} (${serverDoc._id}).`;
  },
  
  // note: this isn't used by anything directly (although an admin using the 'dev' tab or a browser's dev console could call this)
  'town.syncBuffs'() {
    const userDoc = Users.findOne({ _id: Meteor.userId() });
    const userIsAdmin = userDoc && userDoc.isSuperMod;

    if (!userIsAdmin) {
      return false;
    }
    
    deleteKarmaBuffs();
    syncKarmaBuffs();
    return `Operation completed.`;
  },
  
  // note: this isn't used by anything directly (although an admin using the 'dev' tab or a browser's dev console could call this)
  'town.forceDayRollover'() {
    const userDoc = Users.findOne({ _id: Meteor.userId() });
    const userIsAdmin = userDoc && userDoc.isSuperMod;

    if (!userIsAdmin) {
      return false;
    }
    
    newTownDay();
    return `Operation completed.`;
  },
  
  // note: this isn't usually by anything (we now publish and subscribe to a pseudo-collection), but it does get called as a last-chance backup
  'town.getGoods'(whichDay = -1) {
    const serverDoc = Servers.findOne({ _id: serverFromUser() });
    if (!serverDoc || !serverDoc.town) {
      return;
    }

    whichDay = CInt(whichDay);    
    
    if (whichDay === -1) {
      return serverDoc.town;
    }
    
    if (whichDay < 1 || whichDay > 7) {
      return;
    }
    
    if (whichDay === 1) {
      return serverDoc.town.day1goods;
    } else if (whichDay === 2) {
      return serverDoc.town.day2goods;
    } else if (whichDay === 3) {
      return serverDoc.town.day3goods;
    } else if (whichDay === 4) {
      return serverDoc.town.day4goods;
    } else if (whichDay === 5) {
      return serverDoc.town.day5goods;
    } else if (whichDay === 6) {
      return serverDoc.town.day6goods;
    }
    return serverDoc.town.day7goods;
  },
  
  'town.donateItem'(_id, itemId, amount, building) {
    if (!_id || !itemId || !amount || amount <= 0 || !building || (typeof building !== 'string')) {
      return;
    }
    
    // todo: validate item qualifies for building, maybe add to ITEMS constants?

    const serverDoc = Servers.findOne({ _id: serverFromUser() });
    if (!serverDoc || !serverDoc.town) {
      return;
    }
    
    const currentItem = Items.findOne({ _id, owner: Meteor.userId(), itemId: itemId });
    if (!currentItem || currentItem.equipped) {
      return;
    }

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

    // Update the server with the additional item, consolidating using an accumulator
    Servers.update({
      _id: serverFromUser()
    }, {
      $set: {
        'town.day1goods': consolidateGoods(((serverDoc.town.day1goods) ? serverDoc.town.day1goods : []).concat({
          townBuilding: building,
          itemId: currentItem.itemId,
          rarityId: currentItem.rarityId,
          count: amountToDonate,
          owner: Meteor.userId(),
          username: Meteor.user().username,
        }))
      }
    });
    
    // snychronize town/karma buffs
    syncKarmaBuffs();

    // update that the user is actively playing
    updateUserActivity({userId: Meteor.userId()});    
  }
});
