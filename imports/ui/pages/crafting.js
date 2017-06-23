import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';
import { determineRequiredItems } from '/imports/ui/utils.js';
import moment from 'moment';

import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';

import { Crafting } from '/imports/api/crafting/crafting.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';
import { Users } from '/imports/api/users/users';

// Component used in the template
import './crafting.html';
import '../components/craftingDuration/craftingDuration.js';

let gameUpdateTimer;
let recipeCache;

const itemModifier = function (item) {
  if (item.shiftActionData) {
    item.shiftAction = {
      description: item.shiftActionData.description,
      item,
      method() {
        if (this.item.shiftActionData.target) {
          const targetClass = `targetting-${this.item.shiftActionData.target}`;
          if (!$('body').hasClass(targetClass)) {
            $('body').addClass(targetClass);
            Meteor.setTimeout(() => {
              // Add body listener for when you want to click out
              $('body').on(`click.${this.item._id}`, (event) => {
                const closestTarget = $(event.target).closest(`.${this.item.shiftActionData.target}`);
                if (closestTarget) {
                  const targetId = closestTarget.data('id');
                  if (targetId) {
                    Meteor.call('items.use', { baseItemId: this.item._id, targetItemId: targetId })
                  }
                }
                
                $('body').removeClass(targetClass);
                $('body').off(`click.${this.item._id}`);
              });
            }, 1);
          }
        }
      }
    }
  }

  return item;
}

Template.craftingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  if (Session.get('itemViewLimit') !== undefined) {
    this.state.set('itemViewLimit', Session.get('itemViewLimit'));
  } else {
    this.state.set('itemViewLimit', 10);
  }

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
        }

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

  // Show currently crafting items
  Meteor.subscribe('crafting');
});

Template.craftingPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'crafting');
  },

  'click .crafting-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.crafting-filter').data('filter');
    Meteor.call('users.setUiState', 'craftingFilter', filter);
  },

  'click .tier-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.tier-filter').data('tier-filter');
    const craftingTierFilter = instance.state.get('craftingTierFilter')
    const existingFilter = craftingTierFilter[filter];

    if (existingFilter) {
      craftingTierFilter[existingFilter] = false;
      instance.state.set('craftingTierFilter', craftingTierFilter);
      Meteor.call('users.setUiState', `craftingTierFilter.${filter}`, false);
    } else {
      craftingTierFilter[existingFilter] = true;
      instance.state.set('craftingTierFilter', craftingTierFilter);
      Meteor.call('users.setUiState', `craftingTierFilter.${filter}`, true);
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

  'click .craft-row'(event, instance) {
    const recipeId = $(event.target).closest('.craft-row')[0].getAttribute('data-recipe');
    const recipeListMap = instance.state.get('recipeListMap');

    const recipeConstants = recipeListMap[recipeId];

    let { maxCraftable, notMet } = determineRequiredItems(recipeConstants);

    if (notMet) {
      return toastr.warning('Not enough resources to craft');
    }

    if (maxCraftable > recipeConstants.maxToCraft) {
      maxCraftable = JSON.parse(JSON.stringify(recipeConstants.maxToCraft));
    }

    if (recipeConstants.maxToCraft > 1) {
      instance.state.set('maxCraftableAmount', maxCraftable);
      instance.state.set('maxCraftAmount', recipeConstants.maxToCraft);
      instance.state.set('craftAmount', Math.ceil(maxCraftable / 2));
      instance.state.set('multiCraftRecipeId', recipeId);
      instance.$('.multiCraftModal').modal('show');
      instance.$('.craft-amount-input').focus();
    } else {
      Meteor.call('crafting.craftItem', recipeId, 1, (err) => {
        if (err) {
          toastr.warning(err.reason);
        } else {
          toastr.success(`Crafting ${recipeConstants.name}`, null, { timeOut: 1000 });
        }
      });
    }
  },

  'click .show-all-items'(event, instance) {
    Session.set('itemViewLimit', 0);
    instance.state.set('itemViewLimit', 0);
  },

  'click .show-less-items'(event, instance) {
    Session.set('itemViewLimit', 10);
    instance.state.set('itemViewLimit', 10);
  },

  'submit .craft-amount-form'(event, instance) {
    event.preventDefault();

    const recipeId = instance.state.get('multiCraftRecipeId');
    const amountToCraft = instance.state.get('craftAmount');
    
    const recipeListMap = instance.state.get('recipeListMap');
    const recipeConstants = recipeListMap[recipeId];

    instance.$('.multiCraftModal').modal('hide');
    Meteor.call('crafting.craftItem', recipeId, amountToCraft, (err) => {
      if (err) {
        toastr.warning('Failed to craft item');
      } else {
        toastr.success(`Started crafting ${recipeConstants.name}`)
      }
    });
  },

  'click .craft-btn'(event, instance) {
    const recipeId = instance.state.get('multiCraftRecipeId');
    const amountToCraft = parseInt($(event.target).closest('.craft-btn')[0].getAttribute('data-amount'));
    
    const recipeListMap = instance.state.get('recipeListMap');
    const recipeConstants = recipeListMap[recipeId];

    instance.$('.multiCraftModal').modal('hide');
    Meteor.call('crafting.craftItem', recipeId, amountToCraft, (err) => {
      if (err) {
        toastr.warning('Failed to craft item');
      } else {
        toastr.success(`Started crafting ${recipeConstants.name}`)
      }
    });
  }
})

Template.craftingPage.helpers({
  craftingSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({ type: 'crafting' });
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
        tier.empty = !!craftingTierFilter[tier.name]
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

    const patterns = [];
    const craftingTierFilter = instance.state.get('craftingTierFilter');
    Object.keys(craftingTierFilter).forEach((tierKey) => {
      if (craftingTierFilter[tierKey]) {
        patterns.push(tierKey);
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
    });

    if (recipeFilter === 'all') {
      return filteredRecipes;
    } else {
      return filteredRecipes.filter((item) => {
        return item.category === recipeFilter;
      });
    }
  },

  itemViewLimit() {
    return Template.instance().state.get('itemViewLimit');
  },

  allItemsCount() {
    return Items.find({ equipped: false }).fetch().length;
  },

  items() {
    const itemViewLimit = Template.instance().state.get('itemViewLimit');

    // Get highest furnace tier
    const allFurnaces = Items.find({
      equipped: false,
      name: {
        $regex: /furnace/gi,
      }
    }, {
      sort: {
        tier: -1
      }
    }).fetch();
    let highestFurnaceTier = 'stone_furnace';
    if (allFurnaces.length > 0) {
      highestFurnaceTier = allFurnaces[0].tier;
    }

    if (itemViewLimit !== 0) {
      return Items.find({
        equipped: false,
        $or: [{
          tier: highestFurnaceTier,
        }, {
          name: {
            $regex: /^((?!furnace).)*$/
          }
        }]
      }, {
        limit: itemViewLimit,
        sort: {
          category: 1,
          name: 1
        }
      }).map((itemModifier));
    }

    return Items.find({
      equipped: false,
      $or: [{
        tier: highestFurnaceTier,
      }, {
        name: {
          $regex: /^((?!furnace).)*$/
        }
      }]
    }, {
      sort: {
        category: 1,
        name: 1
      }
    }).map((itemModifier));
  }
});
