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
  //console.log("syncKarmaBuffs() called");
  
  Servers.find().fetch().forEach((thisServer) => {
    try {
      // read town data
      const serverData = lodash.cloneDeep(thisServer);
      const townData = serverData.town;
      
      // set up karma data
      const karmaData = {
        dwellings: karmaLevelValues('dwellings', townData),
        quarry: karmaLevelValues('quarry', townData),
        lumberyard: karmaLevelValues('lumberyard', townData),
        armory: karmaLevelValues('armory', townData),
        library: karmaLevelValues('library', townData),
        observatory: karmaLevelValues('observatory', townData),
      };
      
      //console.log("Karma data:");
      //console.log(karmaData);
      
      if (!karmaData.dwellings.isError) {
        const dwellingsBuff = getGlobalBuff('town_dwelling');
        if (!dwellingsBuff || (CInt(dwellingsBuff.value.level) != CInt(karmaData.dwellings.currentLevel))) {
          if (dwellingsBuff) { State.remove({ name: dwellingsBuff.name, server: dwellingsBuff.server }); }
          if (CInt(karmaData.dwellings.currentLevel) > 0) {
            State.insert({name: 'town_dwelling', server: thisServer._id, value: { activeTo: moment().utc().hours(23).minutes(59).seconds(59).toDate(), level: karmaData.dwellings.currentLevel } });
          }
        }
      }
      
      if (!karmaData.quarry.isError) {
        const quarryBuff = getGlobalBuff('town_quarry');
        if (!quarryBuff || (CInt(quarryBuff.value.level) != CInt(karmaData.quarry.currentLevel))) {
          if (quarryBuff) { State.remove({ name: quarryBuff.name, server: quarryBuff.server }); }
          if (CInt(karmaData.quarry.currentLevel) > 0) {
            State.insert({name: 'town_quarry', server: thisServer._id, value: { activeTo: moment().utc().hours(23).minutes(59).seconds(59).toDate(), level: karmaData.quarry.currentLevel } });
          }
        }
      }
      
      if (!karmaData.lumberyard.isError) {
        const lumberyardBuff = getGlobalBuff('town_lumber_yard');
        if (!lumberyardBuff || (CInt(lumberyardBuff.value.level) != CInt(karmaData.lumberyard.currentLevel))) {
          if (lumberyardBuff) { State.remove({ name: lumberyardBuff.name, server: lumberyardBuff.server }); }
          if (CInt(karmaData.lumberyard.currentLevel) > 0) {
            State.insert({name: 'town_lumber_yard', server: thisServer._id, value: { activeTo: moment().utc().hours(23).minutes(59).seconds(59).toDate(), level: karmaData.lumberyard.currentLevel } });
          }
        }
      }
      
      if (!karmaData.armory.isError) {
        const armoryBuff = getGlobalBuff('town_armory');
        if (!armoryBuff || (CInt(armoryBuff.value.level) != CInt(karmaData.armory.currentLevel))) {
          if (armoryBuff) { State.remove( {name: armoryBuff.name, server: armoryBuff.server }); }
          if (CInt(karmaData.armory.currentLevel) > 0) {
            State.insert({name: 'town_armory', server: thisServer._id, value: { activeTo: moment().utc().hours(23).minutes(59).seconds(59).toDate(), level: karmaData.armory.currentLevel } });
          }
        }
      }
      
      if (!karmaData.library.isError) {
        const libraryBuff = getGlobalBuff('town_library');
        if (!libraryBuff || (CInt(libraryBuff.value.level) != CInt(karmaData.library.currentLevel))) {
          if (libraryBuff) { State.remove({ name: libraryBuff.name, server: libraryBuff.server }); }
          if (CInt(karmaData.library.currentLevel) > 0) {
            State.insert({name: 'town_library', server: thisServer._id, value: { activeTo: moment().utc().hours(23).minutes(59).seconds(59).toDate(), level: karmaData.library.currentLevel } });
          }
        }
      }
      
      if (!karmaData.observatory.isError) {
        const observatoryBuff = getGlobalBuff('town_observatory');
        if (!observatoryBuff || (CInt(observatoryBuff.value.level) != CInt(karmaData.observatory.currentLevel))) {
          if (observatoryBuff) { State.remove({ name: observatoryBuff.name, server: observatoryBuff.server }); }
          if (CInt(karmaData.observatory.currentLevel) > 0) {
            State.insert({name: 'town_observatory', server: thisServer._id, value: { activeTo: moment().utc().hours(23).minutes(59).seconds(59).toDate(), level: karmaData.observatory.currentLevel } });
          }
        }
      }
    } catch (err) {
      console.log("syncKarmaBuffs() exception:");
      console.log(err);
    }
  });
  
  //console.log("syncKarmaBuffs() ending");
};

export const newTownDay = function newTownDay() {
  Servers.find().fetch().forEach((thisServer) => {
    try {
      // read town data
      const serverData = lodash.cloneDeep(thisServer);
      const serverTownData = serverData.town;
      
      if (!serverTownData) {
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
        serverTownData.day7goods = serverTownData.day6goods;
        serverTownData.day6goods = serverTownData.day5goods;
        serverTownData.day5goods = serverTownData.day4goods;
        serverTownData.day4goods = serverTownData.day3goods;
        serverTownData.day3goods = serverTownData.day2goods;
        serverTownData.day2goods = serverTownData.day1goods;
        serverTownData.day1goods = []; // newest day has no donated goods, no karma
      }
      
      Servers.update(
        { _id: thisServer._id },
        { $set: { town: serverTownData } }
      );
    } catch (err) {
      console.log("newTownDay() exception:");
      console.log(err);
    }
  });
  
  // delete and synchronize new town buffs
  deleteKarmaBuffs();
  syncKarmaBuffs();
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
  // note: this isn't used by anything (directly, although an admin using the browser's dev console could call this)
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
  
  'server.syncBuffs'() {
    const userDoc = Users.findOne({ _id: Meteor.userId() });
    const userIsAdmin = userDoc && userDoc.isSuperMod;

    if (!userIsAdmin) {
      return false;
    }
    
    syncKarmaBuffs();
    return `Operation completed.`;
  },
  
  'server.forceDayRollover'() {
    const userDoc = Users.findOne({ _id: Meteor.userId() });
    const userIsAdmin = userDoc && userDoc.isSuperMod;

    if (!userIsAdmin) {
      return false;
    }
    
    newTownDay();
    return `Operation completed.`;
  },
  
  // note: this isn't used by anything (we now publish and subscribe to a pseudo-collection)
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

    const serverDoc = Servers.findOne({ _id: serverFromUser() });
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
      _id: serverFromUser()
    }, {
      $set: {
        'town.day1goods': currentDayGoods
      }
    });
    
    syncKarmaBuffs();

    updateUserActivity({userId: Meteor.userId()});    
  }
});
