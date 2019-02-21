import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import _ from 'underscore';
import lodash from 'lodash';

import { Town } from '/imports/api/town/town.js';
import { Users } from '/imports/api/users/users.js';
import { Items } from '/imports/api/items/items.js';
import { State } from '/imports/api/state/state';

import { ITEMS } from '/imports/constants/items';

import './town.html';

Template.townPage.onCreated(function bodyOnCreated() {
  Meteor.subscribe("town");

  this.state = new ReactiveDict();
  
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
});

Template.townPage.helpers({
  isAdmin() {
    const myUser = Meteor.user() ? Meteor.user() : Users.findOne({ _id: Meteor.userId() });
    return myUser && myUser.isSuperMod;
  },

  allGlobalBuffs() {
    return State.find({'value.activeTo': {$gte: moment().toDate()}}).fetch();
  },
  
  numberOfDays() {
    return 1;
  },

  townSection() {
    return Template.instance().state.get('townSection');
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
            newItem.customDescription = `<b>${item.count}</b> x donated by <i>${item.username}</i><hr />${baseDescription}`;
            
            return newItem;
          }
          
          return item;
        });
        
        items = items.filter((item) => {
          return item.townBuilding === townSection;
        });
        
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
      return false;
    }
      
    let filteredItems = Items.find({}).map((item) => {
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
        
        // todo: append to description the value associated with this donation
        newItem.customDescription = `Donating this item will add <b>XXX</b> karma.<hr />${baseDescription}`;
        newItem.description = baseDescription; // fix description
        newItem.donateMode = true;
        newItem.donateSection = townSection;
        
        return newItem;
      }
    });
    
    filteredItems = filteredItems.filter((item) => {
      if (townSection === 'dwellings') {
        if (item.category === 'food') return true;
        if (item.category === 'seed' && item.seedType === 'food') return true;
        if (item.category === 'seed' && item.seedType === 'xp') return true;
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
      
      return false;
    });
    
    if (filteredItems) {
      let anyError = false;
      
      /*
      filteredItems.forEach((item, idx) => {
        try {
          if (ITEMS[item.itemId].stats) {
            filteredItems[idx].tier = 1000 - (ITEMS[item.itemId].stats.attack); // axes
          } else {
            filteredItems[idx].tier = 10000; // logs
          }
        } catch (err) {
          anyError = true;
        }
      });
      */
      
      if (!anyError) {
        // todo: sort items by their donation value
        //filteredItems = _.sortBy(filteredItems, ['quality']);
        //filteredItems = _.sortBy(filteredItems, ['tier']);
        filteredItems = _.sortBy(filteredItems, ['name']);
      }
    }
    
    return filteredItems;
  }

});

Template.townPage.events({
  'click .town-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.town-filter').data('filter');
    Meteor.call('users.setUiState', 'townSection', filter);
  },
});

Template.townPage.onDestroyed(function bodyOnDestroyed() {
});
