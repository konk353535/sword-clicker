import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import _ from 'underscore';
import lodash from 'lodash';
import Numeral from 'numeral';

import { Servers } from '/imports/api/servers/servers.js';
import { Town, calculateItemKarma, karmaLevelValues } from '/imports/api/town/town.js';
import { Users } from '/imports/api/users/users.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';
import { State } from '/imports/api/state/state';
import { CInt, CDbl, autoPrecisionValue } from '/imports/utils.js';
import { getGlobalBuffs } from '/imports/api/globalbuffs/globalbuffs';

import { ITEMS } from '/imports/constants/items';

import './town.html';

Template.townPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  
  /*
  Tracker.autorun(() => {
    let isAdmin = false;    
    if (Meteor.user()) {
      const myUser = Meteor.user() ? Meteor.user() : Users.findOne({ _id: Meteor.userId() });    
      if (myUser) {
        isAdmin = myUser.isSuperMod;
      }
    }
    if (!isAdmin) {
      Router.go('/overview');
    }
  });
  */
  
  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    
    if (myUser) {
      if (myUser.uiState && myUser.uiState.townSection !== undefined) {
        this.state.set('townSection', myUser.uiState.townSection);
      } else {
        this.state.set('townSection', 'dwellings');
      }
    }
  });

  Tracker.autorun(() => {
    Meteor.subscribe('servers');
    Meteor.subscribe('town');
  });
});

Template.townPage.events({
  'click .multiDonateStart'(event, instance) {
    Session.set('multiDonate', true);
    Session.set('multiDonateItems', {});
  },

  'click .multiDonateConfirm'(event, instance) {
    instance.$('.confirmDonateModal').modal('show');
  },

  'click .multiDonateCancel'(event, instance) {
    Session.set('multiDonate', false);
    Session.set('multiDonateItems', {});
  },

  'click .modalButtonConfirm'(event, instance) {
    instance.$('.confirmDonateModal').modal('hide');
    Session.set('multiDonate', false);
    const items = Session.get('multiDonateItems');
    
    let itemsToDonate = [];
    
    Object.keys(items).forEach((item) => {
      itemsToDonate = itemsToDonate.concat({_id: items[item].id, itemId: items[item].itemId, amount: items[item].amount});
    });
    
    Meteor.call('town.donateItems', itemsToDonate, Template.instance().state.get('townSection'));
    
    Session.set('multiDonateItems', {});
  },
  
  'click .modalButtonCancel'(event, instance) {
    instance.$('.confirmDonateModal').modal('hide');
  },
});

Template.townPage.helpers({
  isAdmin() {
    const myUser = Meteor.user() ? Meteor.user() : Users.findOne({ _id: Meteor.userId() });
    return myUser && myUser.isSuperMod;
  },

  allGlobalBuffs() {
    return getGlobalBuffs();
  },
  
  numberOfDays() {
    return 1;
  },
  
  thisSectionKarmaInfo() {
    const karmaData = karmaLevelValues(Template.instance().state.get('townSection'));
    
    if (!karmaData.isError) {
      //const thisSectionKarmaValue = CInt(Template.instance().state.get('thisSectionKarma'));
      const thisSectionKarmaValue = karmaData.curVal;
      const thisSectionKarmaNextValue = karmaData.nextVal;
      
      if ((thisSectionKarmaValue > 0) || (thisSectionKarmaNextValue > 0)) {
        const thisSectionKarmaFormatted = Numeral(thisSectionKarmaValue).format('0,0');
        const thisSectionKarmaNextFormatted = Numeral(thisSectionKarmaNextValue).format('0,0');
        return `
          &nbsp; &nbsp; 
          <span style="font-size: 10pt; color: #777;">
            <i>
              <b>${thisSectionKarmaFormatted}</b> / <b>${thisSectionKarmaNextFormatted}</b> karma at this location
            </i>
          </span>`;
      }
    } else {
      console.log("Exception looking up karma data:");
      console.log(karmaData.exceptionDetails);
    }
    
    return '';
  },

  yourKarma() {
    return CInt(Template.instance().state.get('yourKarma'));
  },
  
  karmaXPBonus(skillName) {
    const playerKarma = CDbl(Template.instance().state.get('yourKarma'));
    let skillLevel = 0;
    
    const skillDoc = Skills.findOne({ type: skillName });
    if (skillDoc) {
      skillLevel = CInt(skillDoc.level);
    }
    
    return (skillLevel > 0 ? autoPrecisionValue(playerKarma / (Math.pow(1.045, (CDbl(skillLevel) / 2.5)) * 75)) : 0);
  },

  totalKarma() {
    return CInt(Template.instance().state.get('totalKarma'));
  },

  townSection() {
    return Template.instance().state.get('townSection');
  },
  
  multiDonating() {
    return Session.get('multiDonate');
  },
  
  townGoods(day = 1) {
    try {
      const instance = Template.instance();
      const townSection = instance.state.get('townSection');

      const townInfo = Town.findOne({});
      let townGoodsThisDay;
      if (day === 1) {
        townGoodsThisDay = townInfo.day1goods;
      } else if (day === 2) {
        townGoodsThisDay = townInfo.day2goods;
      } else if (day === 3) {
        townGoodsThisDay = townInfo.day3goods;
      } else if (day === 4) {
        townGoodsThisDay = townInfo.day4goods;
      } else if (day === 5) {
        townGoodsThisDay = townInfo.day5goods;
      } else if (day === 6) {
        townGoodsThisDay = townInfo.day6goods;
      } else if (day === 7) {
        townGoodsThisDay = townInfo.day7goods;
      }
      
      if (townGoodsThisDay && townGoodsThisDay.length > 0) {
        let totalKarma = 0;
        let yourKarma = 0;
        let items = townGoodsThisDay.map(function(item) {
          const itemConstants = ITEMS[item.itemId];
          
          if (itemConstants) {
            let baseDescription = '';
            if (itemConstants.description) {
              if (_.isFunction(itemConstants.description)) {
                baseDescription = itemConstants.description();
              } else {
                baseDescription = itemConstants.description;
              }
            }
            
            const newItem = Object.assign({}, itemConstants, item);
            newItem.amount = item.count;
            newItem.karmaValue = autoPrecisionValue(calculateItemKarma(newItem) * item.count);
            newItem.reverseKarmaValue = 1000000000 - newItem.karmaValue;
            const countFormatted = Numeral(item.count).format('0,0');
            const karmaValueFormatted = Numeral(newItem.karmaValue).format('0,0');
            newItem.customDescription = `<b>${countFormatted}</b> x donated by <i>${item.username}</i><br /><b>${karmaValueFormatted}</b> karma<hr />${baseDescription}`;
            
            totalKarma += newItem.karmaValue;
            if (item.username === Meteor.user().username) {
              yourKarma += newItem.karmaValue;
            }
            
            return newItem;
          }
          
          console.log(`WARNING: player has item ${item.itemId} that does not exist!`);
          return item;
        });
        
        let karmaThisSection = 0;
        items = items.filter((item) => {
          if (item.townBuilding === townSection) {
            karmaThisSection += item.karmaValue;
            return true;
          }
          return false;
        });
        
        Template.instance().state.set('totalKarma', totalKarma);
        Template.instance().state.set('yourKarma', yourKarma);        
        Template.instance().state.set('thisSectionKarma', karmaThisSection);        
        
        items = _.sortBy(items, ['name']);
        items = _.sortBy(items, ['reverseKarmaValue']);        

        return items;
      }
    } catch (err) {
    }
    return false;
  },
  
  items() {
    const instance = Template.instance();
    const townSection = instance.state.get('townSection');
    
    if (!townSection) {
      console.log("Can't donate any items: no town location selected.");
      return false;
    }
      
    const baseItemList = Items.find({});
    if ((!baseItemList) || (baseItemList.count() === 0)) {
      console.log("Can't donate any items: base item list returned no items:");
      console.log(baseItemList.fetch());
      return false;
    }
      
    let filteredItems = baseItemList.map((item) => {
      const itemConstants = ITEMS[item.itemId];
      if (itemConstants) {
        let baseDescription = '';
        if (itemConstants.description) {
          if (_.isFunction(itemConstants.description)) {
            baseDescription = itemConstants.description();
          } else {
            baseDescription = itemConstants.description;
          }
        }
        
        const newItem = Object.assign({}, itemConstants, item);
        
        newItem.description = baseDescription; // fix description
        newItem.donateMode = true;
        newItem.donateSection = townSection;
        newItem.karmaValue = CInt(autoPrecisionValue(calculateItemKarma(newItem)));
        newItem.reverseKarmaValue = 1000000000 - newItem.karmaValue;
        const karmaValueFormatted = Numeral(newItem.karmaValue).format('0,0');
        if (CInt(newItem.amount) > 1) {
          newItem.customDescription = `Donating these will add <b>${karmaValueFormatted}</b> karma each.<hr />${baseDescription}`;
        } else {
          newItem.customDescription = `Donating this will add <b>${karmaValueFormatted}</b> karma.<hr />${baseDescription}`;
        }
        
        return newItem;
      }
    });
    
    if ((!filteredItems) || (filteredItems.length === 0)) {
      console.log("Can't donate any items: mapped item list returned no items:");
      console.log(filteredItems);
      return false;
    }
    
    filteredItems = filteredItems.filter((item) => {
      try {
        // filter out all equipped items
        if (item.equipped) return false;
        
        // filter out all hidden items
        //if (item.hidden) return false;
        
        if (townSection === 'dwellings') {
          if (item.category === 'food') return true;
          //if (item.category === 'seed' && item.seedType === 'food') return true;
          //if (item.category === 'seed' && item.seedType === 'xp') return true;
          if (item.itemId === 'ore_coal') return true;
          if (item.itemId === 'cactus') return true;
          if (item.itemId === 'reed') return true;
          if (item.itemId === 'papyrus') return true;
          if (item.itemId === 'bamboo') return true;
          if (item.itemId === 'palm') return true;
          if (item.itemId === 'kenaf') return true;
          if (item.itemId === 'bamboo_shack') return true;
        } else if (townSection === 'quarry') {
          if (item.category === 'mining') return true;
        } else if (townSection === 'lumberyard') {
          if (item.category === 'woodcutting') return true;
        } else if (townSection === 'armory') {
          if (item.category === 'combat') return true;
        } else if (townSection === 'library') {
          if (item.isCraftingScroll && item.teaches) return true;
          if (item.category === 'tome') return true;
          if (item.category === 'pigment') return true;
          if (item.category === 'paper') return true; // includes both crafted paper and books
          if (item.category === 'magic_book') return true;
        } else if (townSection === 'observatory') {
          if (item.category === 'astronomy') return true;
        }
      } catch (err) {
        //console.log("Exception thrown (and ignored) while filtering:");
        //console.log(err);
        //console.log("Referenced item:");
        //console.log(item);
      }
      return false;
    });
    
    if (filteredItems) {
      filteredItems = _.sortBy(filteredItems, ['name']);
      filteredItems = _.sortBy(filteredItems, ['reverseKarmaValue']);        
      
      if ((!filteredItems) || (filteredItems.length === 0)) {
        console.log("Can't donate any items: filtered/sorted item list returned no items:");
        console.log("Location:", townSection);
        console.log("Filtered list:");
        console.log(filteredItems);
        return false;
      }
      return filteredItems;
    }

    console.log("Can't donate any items: filtered item list returned no items:");
    console.log("Location:", townSection);
    console.log("Filtered list:");
    console.log(filteredItems);
    return false;    
  }

});

Template.townPage.events({
  'click .town-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.town-filter').data('filter');
    Session.set('multiDonate', false);
    Session.set('multiDonateItems', {});
    Meteor.call('users.setUiState', 'townSection', filter);
  },
});

Template.townPage.onDestroyed(function bodyOnDestroyed() {
});
