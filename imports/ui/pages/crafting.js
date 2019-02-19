import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';

import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';
import { ITEMS } from '/imports/constants/items/index.js';

import { Crafting } from '/imports/api/crafting/crafting.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';
import { Users } from '/imports/api/users/users';
import { BattlesList } from '/imports/api/battles/battles.js';

// Component used in the template
import './crafting.html';
import '../components/craftingDuration/craftingDuration.js';
import '../components/craftingList/craftingList.js';
import '../components/itemList/itemList.js';

let gameUpdateTimer;
let recipeCache;

const itemModifier = function (item) {
  const itemConstants = ITEMS[item.itemId];
  item.shiftActionData = itemConstants.shiftActionData;

  if (item.shiftActionData) {
    item.shiftAction = {
      description: item.shiftActionData.description,
      item,
      method() {
        if (this.item.shiftActionData.target) {
          const targetClass = `targetting-${this.item.shiftActionData.target}`;
          const body = $('body');
          if (!body.hasClass(targetClass)) {
            body.addClass(targetClass);
            Meteor.setTimeout(() => {
              // Add body listener for when you want to click out
              body.on(`click.${this.item._id}`, (event) => {
                const closestTarget = $(event.target).closest(`.${this.item.shiftActionData.target}`);
                if (closestTarget) {
                  const targetId = closestTarget.data('id');
                  if (targetId) {
                    Meteor.call('items.use', { baseItemId: this.item._id, targetItemId: targetId }, (err, res) => {
                      if (err)
                        toastr.warning(err.reason);
                    });
                  }
                }

                body.removeClass(targetClass);
                body.off(`click.${this.item._id}`);
              });
            }, 1);
          }
        } else {
          Meteor.call('items.use', { baseItemId: this.item._id }, (err, res) => {
            if (/essence_scroll/.test(this.item.itemId)) {
              // If this was an essence scroll, reload recipes
              recipeCache = undefined;
            }
          });
        }
      }
    }
  }

  return item;
};

Template.craftingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  // Show currently crafting items
  Meteor.subscribe('crafting');

  // if (Session.get('itemViewLimit') !== undefined) {
  //   this.state.set('itemViewLimit', Session.get('itemViewLimit'));
  // } else {
  //   this.state.set('itemViewLimit', 10);
  // }

  if (Session.get('recipeCache')) {
    recipeCache = Session.get('recipeCache');
  } else if (recipeCache) {
    Session.set('recipeCache', recipeCache);
  }

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.craftingFilter !== undefined) {
        this.state.set('recipeFilter', myUser.uiState.craftingFilter);
      } else {
        this.state.set('recipeFilter', 'all');
      }

      if (myUser.uiState && myUser.uiState.craftingTierFilter !== undefined) {
        this.state.set('craftingTierFilter', myUser.uiState.craftingTierFilter);
      } else {
        this.state.set('craftingTierFilter', {});
      }

      if (myUser.uiState && myUser.uiState.itemFilter !== undefined) {
        this.state.set('itemFilter', myUser.uiState.itemFilter);
      } else {
        this.state.set('itemFilter', 'all-items');
      }

      if (myUser.uiState && myUser.uiState.craftingShowMore !== undefined) {
        this.state.set('craftingShowMore', myUser.uiState.craftingShowMore);
        if (myUser.uiState.craftingShowMore) {
          this.state.set('itemViewLimit', 0);
        } else {
          this.state.set('itemViewLimit', 10);
        }
      } else {
        this.state.set('craftingShowMore', false);
        this.state.set('itemViewLimit', 10);
      }
    }
  });

  this.autorun(() => {
    if (Skills.findOne({ type: 'crafting' })) {
      const craftingSkill = Skills.findOne({ type: 'crafting' });
      let results;

      // Check if valid cache exists
      if (recipeCache && recipeCache.data && recipeCache.tiers && recipeCache.level === craftingSkill.level &&
        moment().isBefore(moment(recipeCache.date).add(2, 'minutes'))) {
        results = recipeCache.data;
      } else {
        // Pass level so that this is recalled when we get up a level
        results = ReactiveMethod.call('crafting.fetchRecipes', craftingSkill.level);
        const tiers = ReactiveMethod.call('crafting.fetchTiers', craftingSkill.level);
        recipeCache =  {
          data: results,
          tiers,
          level: craftingSkill.level,
          date: moment().toDate()
        };
        
        Session.set('recipeCache', {
          data: results,
          tiers,
          level: craftingSkill.level,
          date: moment().toDate()
        });
      }

      const userDoc = Meteor.user();
      const hasCraftingUpgrade = userDoc.craftingUpgradeTo && moment().isBefore(userDoc.craftingUpgradeTo);

      if (results) {
        const resultsMap = {};
        results.forEach((result) => {
          resultsMap[result.id] = result;
        });
        this.state.set('recipeListMap', resultsMap);

        // Store recipes
        this.state.set('recipes', results.map((result) => {
          if (craftingSkill.level < result.requiredCraftingLevel) {
            result.notMetLevelReq = true;
          }

          if (hasCraftingUpgrade) {
            const bonusPercentage = DONATORS_BENEFITS.craftingBonus;
            result.calculatedTimeToCraft = (result.timeToCraft * (1 - (bonusPercentage / 100))).toFixed(0);
          } else {
            result.calculatedTimeToCraft = result.timeToCraft;
          }
          
          return result;
        }));
      }
    }
  })
});

Template.craftingPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'crafting');
  },

  'click .crafting-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.crafting-filter').data('filter');
    Meteor.call('users.setUiState', 'craftingFilter', filter);
  },

  'click .item-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.item-filter').data('filter');
    Meteor.call('users.setUiState', 'itemFilter', filter);
  },

  'click .tier-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.tier-filter').data('tier-filter');
    const craftingTierFilter = instance.state.get('craftingTierFilter');
    const existingFilter = craftingTierFilter[filter];

    if (existingFilter) {
      craftingTierFilter[existingFilter] = false;
      if(instance.state.get('craftingTierFilter') !== craftingTierFilter) {
        instance.state.set('craftingTierFilter', craftingTierFilter);
        Meteor.call('users.setUiState', `craftingTierFilter.${filter}`, false);
      }
    } else {
      craftingTierFilter[existingFilter] = true;
      if(instance.state.get('craftingTierFilter') !== craftingTierFilter) {
        instance.state.set('craftingTierFilter', craftingTierFilter);
        Meteor.call('users.setUiState', `craftingTierFilter.${filter}`, true);
      }
    }
  },

  'keyup .craft-amount-input'(event, instance) {
    let newValue = parseInt($(event.target).val());
    if (newValue && !isNaN(newValue)) {
      if (newValue > instance.state.get('maxCraftableAmount')) {
        newValue = instance.state.get('maxCraftableAmount');
      }
      instance.state.set('craftAmount', newValue);
    }
  },

  'click .show-all-items'(event, instance) {
    Session.set('itemViewLimit', 0);
    instance.state.set('itemViewLimit', 0);
    Meteor.call('users.setUiState', 'craftingShowMore', true);
  },

  'click .show-less-items'(event, instance) {
    Session.set('itemViewLimit', 10);
    instance.state.set('itemViewLimit', 10);
    Meteor.call('users.setUiState', 'craftingShowMore', false);
  }
});

Template.craftingPage.helpers({
  craftingSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({ type: 'crafting' });
  },

  inCurrentBattle() {
    return BattlesList.findOne({});
  },

  crafting() {
    return Crafting.findOne();
  },

  maxCraftAmount() {
    return Template.instance().state.get('maxCraftAmount');
  },

  craftAmount() {
    return Template.instance().state.get('craftAmount');
  },

  maxCraftableAmount() {
    return Template.instance().state.get('maxCraftableAmount');
  },

  recipeFilter() {
    return Template.instance().state.get('recipeFilter');
  },

  craftingLevel() {
    return Skills.findOne({ type: 'crafting' }).level;
  },

  craftingTierFilter() {
    return Template.instance().state.get('craftingTierFilter');
  },

  craftingFilters() {
    // Lists out specified crafting tiers
    const instance = Template.instance();
    const recipes = Session.get('recipeCache');
    const craftingTierFilter = instance.state.get('craftingTierFilter');

    if (recipes && recipes.tiers) {
      return recipes.tiers.map((tier) => {
        tier.empty = !!craftingTierFilter[tier.name];
        return tier;
      });
    }
  },

  recipes() {
    const instance = Template.instance();
    const recipeFilter = instance.state.get('recipeFilter');

    if (!instance.state.get('recipes')) {
      return [];
    }

    /*
    const patterns = [];
    const craftingTierFilter = instance.state.get('craftingTierFilter');
    Object.keys(craftingTierFilter).forEach((tierKey) => {
      if (craftingTierFilter[tierKey]) {
        patterns.push(`^${tierKey}`);
      }
    });

    // Create regex exp to filter out based on current tier filter selection
    let filterTierRegex = new RegExp(patterns.join('|'), 'gi');
    let filteredRecipes = instance.state.get('recipes').filter((item) => {
      if (patterns.length > 0 && filterTierRegex) {
        // Filter out if it matches the pattern.
        if(item.id.match(filterTierRegex)) {
          return false;
        }
        return true;
      }

      return true;
    });*/

    if (recipeFilter === 'all') {
      return instance.state.get('recipes');
    } else {
      return instance.state.get('recipes').filter((item) => {
        return item.category === recipeFilter;
      });
    }
  },

  summaryListDisabled() {
    return Session.get('summaryListDisabled');
  },

  itemViewLimit() {
    return Template.instance().state.get('itemViewLimit');
  },

  items() {
    const itemViewLimit = Template.instance().state.get('itemViewLimit');

    // Get highest furnace tier
    const allFurnaces = Items.find({
      equipped: false,
      name: {
        $regex: /furnace/gi,
      }
    }).fetch();
    
    let highestFurnaceTier = 0;
    
    allFurnaces.forEach((furnace) => {
      const itemConstants = ITEMS[furnace.itemId];
      if (itemConstants) {
        if (itemConstants.tier > highestFurnaceTier) {
          highestFurnaceTier = itemConstants.tier;
        }
      }
    });
    //console.log(highestFurnaceTier); // konk left this debug in, disabling it for now (psouza4: 2018-10-27)

    let filterName = Template.instance().state.get('itemFilter');
    let bShowHidden = filterName === 'hidden-items' || filterName === 'all-items';
    let bShowUnhidden = filterName === 'visible-items' || filterName === 'all-items';

    if (itemViewLimit !== 0) {
      if (bShowHidden && bShowUnhidden) {
        return FetchSomeVisibleItems(highestFurnaceTier, itemViewLimit).concat(FetchSomeHiddenItems(highestFurnaceTier, itemViewLimit));
      } else if (bShowHidden) {
        return FetchSomeHiddenItems(highestFurnaceTier, itemViewLimit);
      }

      return FetchSomeVisibleItems(highestFurnaceTier, itemViewLimit);
    }

    if (bShowHidden && bShowUnhidden) {
      return FetchAllVisibleItems(highestFurnaceTier).concat(FetchAllHiddenItems(highestFurnaceTier));
    } else if (bShowHidden) {
      return FetchAllHiddenItems(highestFurnaceTier);
    }

    return FetchAllVisibleItems(highestFurnaceTier);    
  },

  itemFilter() {
    return Template.instance().state.get('itemFilter');
  },
});


const FetchSomeHiddenItems = function(highestFurnaceTier, itemViewLimit) {
  return Items.find({
    equipped: false,
    hidden: true
  }, {
    limit: itemViewLimit,
    sort: {
      category: 1,
      name: 1,
      quality: -1
    }
  }).map((itemModifier)).filter((item) => {
    const itemConstants = ITEMS[item.itemId];
    if (itemConstants) {
      if ((item.itemId.indexOf("_furnace") !== -1) && (!itemConstants.isCraftingScroll)) {
        if (itemConstants.tier < highestFurnaceTier) {
          return false;
        }
      }
    }
    return true;
  });
};


const FetchSomeVisibleItems = function (highestFurnaceTier, itemViewLimit) {
  return Items.find(
    {
      equipped: false,
      $or : [
        { hidden : false },
        { hidden : { $exists : false } }
      ]
    }, {
      limit: itemViewLimit,
      sort: {
        category: 1,
        name: 1,
        quality: -1
      }
    }
  ).map((itemModifier)).filter((item) => {
    const itemConstants = ITEMS[item.itemId];
    if (itemConstants) {
      if ((item.itemId.indexOf("_furnace") !== -1) && (!itemConstants.isCraftingScroll)) {
        if (itemConstants.tier < highestFurnaceTier) {
          return false;
        }
      }
    }
    return true;
  });
};



const FetchAllHiddenItems = function(highestFurnaceTier) {
  return Items.find({
    equipped: false,
    hidden: true
  }, {
    sort: {
      category: 1,
      name: 1,
      quality: -1
    }
  }).map((itemModifier)).filter((item) => {
    const itemConstants = ITEMS[item.itemId];
    if (itemConstants) {
      if ((item.itemId.indexOf("_furnace") !== -1) && (!itemConstants.isCraftingScroll)) {
        if (itemConstants.tier < highestFurnaceTier) {
          return false;
        }
      }
    }
    return true;
  });
};


const FetchAllVisibleItems = function (highestFurnaceTier) {
  return Items.find(
    {
      equipped: false,
      $or : [
        { hidden : false },
        { hidden : { $exists : false } }
      ]
    }, {
      sort: {
        category: 1,
        name: 1,
        quality: -1
      }
    }
  ).map((item) => {
      const itemConstants = ITEMS[item.itemId];
      if (itemConstants) {
        item.requiredEquip = itemConstants.requiredEquip;
      }
      return item;
    }).filter((item) => {
    const itemConstants = ITEMS[item.itemId];
    if (itemConstants) {
      if ((item.itemId.indexOf("_furnace") !== -1) && (!itemConstants.isCraftingScroll)) {
        if (itemConstants.tier < highestFurnaceTier) {
          return false;
        }
      }
    }
    return true;
  });
};
