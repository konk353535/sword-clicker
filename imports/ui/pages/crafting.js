import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';
import { determineRequiredItems } from '/imports/ui/utils.js';
import moment from 'moment';

import { getMaxCrafts } from '/imports/constants/crafting/index.js';
import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';

import { Crafting } from '/imports/api/crafting/crafting.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';
import { Users, UserGames } from '/imports/api/users/users';
import { BattlesList } from '/imports/api/battles/battles.js';

// Component used in the template
import './crafting.html';
import '../components/craftingDuration/craftingDuration.js';
import '../components/craftingList/craftingList.js';
import '../components/itemList/itemList.js';

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
}

const updateCraftable = function (instance) {
  const recipes = instance.state.get('recipes');
  const recipeId = instance.state.get('selectedRecipe');
  const recipe = recipes.find(recipe => recipe.id === recipeId);

  if (recipe) {
    let { maxCraftable, notMet } = determineRequiredItems(recipe);

    instance.state.set('maxCraftableAmount', maxCraftable);
    instance.state.set('maxCraftAmount', recipe.maxToCraft);

    let maxCraftableAtOnce = maxCraftable;
    if (maxCraftable > recipe.maxToCraft) {
      maxCraftableAtOnce = recipe.maxToCraft;
    }

    instance.state.set('craftAmount', Math.ceil(maxCraftableAtOnce / 2));
    instance.state.set('maxCraftableAtOnce', maxCraftableAtOnce);
  }

  // Trigger crafting favourites to update
  instance.state.set('craftingFavourites', instance.state.get('craftingFavourites').concat([]));
}

Template.craftingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  // Show currently crafting items
  Meteor.subscribe('crafting');

  this.state.set('selectedCraftingOptions', []);
  this.state.set('selectedRecipe', false);
  this.state.set('craftingFavourites', []);

  if (Session.get('itemViewLimit') !== undefined) {
    this.state.set('itemViewLimit', Session.get('itemViewLimit'));
  } else {
    this.state.set('itemViewLimit', 0);
  }

  if (Session.get('recipeCache')) {
    recipeCache = Session.get('recipeCache');
  } else if (recipeCache) {
    Session.set('recipeCache', recipeCache);
  }

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (!myUser) return;
    const userGame = UserGames.findOne({ owner: myUser._id, game: myUser.currentGame });
    if (userGame) {
      if (userGame.uiState && userGame.uiState.craftingFilter !== undefined) {
        this.state.set('recipeFilter', userGame.uiState.craftingFilter);
      } else {
        this.state.set('recipeFilter', 'all');
      }

      if (userGame.uiState && userGame.uiState.craftingFavourites !== undefined) {
        this.state.set('craftingFavourites', userGame.uiState.craftingFavourites);
      } else {
        this.state.set('craftingFavourites', []);
      }

      if (userGame.uiState && userGame.uiState.craftingTierFilter !== undefined) {
        this.state.set('craftingTierFilter', userGame.uiState.craftingTierFilter);
      } else {
        this.state.set('craftingTierFilter', {});
      }

      if (userGame.uiState && userGame.uiState.itemFilter !== undefined) {
        this.state.set('itemFilter', userGame.uiState.itemFilter);
      } else {
        this.state.set('itemFilter', 'visible-items');
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
});

Template.craftingPage.events({

  'click .add-favourite-btn'(event, instance) {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (!myUser) return;
    const userGame = UserGames.findOne({ owner: myUser._id, game: myUser.currentGame });

    const craftingFavourites = userGame.uiState.craftingFavourites || [];
    craftingFavourites.push(instance.state.get('selectedRecipe'));

    instance.state.set('craftingFavourites', craftingFavourites);
    Meteor.call('users.setUiState', 'craftingFavourites', craftingFavourites);
  },

  'click .remove-favourite-btn'(event, instance) {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (!myUser) return;
    const userGame = UserGames.findOne({ owner: myUser._id, game: myUser.currentGame });

    let craftingFavourites = userGame.uiState.craftingFavourites || [];
    craftingFavourites = craftingFavourites.filter((recipeId) => {
      return recipeId !== instance.state.get('selectedRecipe');
    });

    instance.state.set('craftingFavourites', craftingFavourites);
    Meteor.call('users.setUiState', 'craftingFavourites', craftingFavourites);
  },

  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'crafting');
  },

  'click .reset-crafting'(event, instance) {
    instance.state.set('selectedCraftingOptions', []);
  },

  'click .quick-craft-btn'(event, instance) {
    // Note this is all copy pasta'd above
    const recipeId = instance.$(event.target).closest('.quick-craft-btn').attr('data-id');
    const amountToCraft = parseInt(instance.$(event.target).closest('.quick-craft-btn').attr('data-amount'));
    const recipeConstants = instance.state.get('recipes').find(recipe => recipe.id === recipeId);
    
    if (amountToCraft <= 0 || !recipeId) {
      return;
    }

    Meteor.call('crafting.craftItem', recipeId, amountToCraft, (err) => {
      if (err) {
        toastr.warning(`Failed to craft ${recipeConstants.name}`);
      } else {
        updateCraftable(instance);
      }
    });
    toastr.success(`Crafting ${recipeConstants.name}`)
  },

  'click .craft-btn'(event, instance) {
    // Note this is all copy pasta'd above
    const recipeId = instance.state.get('selectedRecipe');
    const amountToCraft = parseInt(instance.$(event.target).closest('.craft-btn').attr('data-amount'));
    const recipeConstants = instance.state.get('recipes').find(recipe => recipe.id === recipeId);
    
    if (amountToCraft <= 0) {
      return;
    }

    Meteor.call('crafting.craftItem', recipeId, amountToCraft, (err) => {
      if (err) {
        toastr.warning(`Failed to craft ${recipeConstants.name}`);
      } else {
        updateCraftable(instance);
      }
    });
    toastr.success(`Crafting ${recipeConstants.name}`)
  },

  'click .reset-crafting-option'(event, instance) {
    const index = parseInt(instance.$(event.target).closest('.reset-crafting-option').attr('data-index'));
    const selectedCraftingOptions = instance.state.get('selectedCraftingOptions');
    instance.state.set('selectedCraftingOptions', selectedCraftingOptions.slice(0, index + 1));
  },

  'click .select-recipe'(event, instance) {
    const recipeId = instance.$(event.target).closest('.select-recipe').attr('data-id');

    const recipe = instance.state.get('recipes').find((recipe) => recipe.id === recipeId);
    let { maxCraftable, notMet } = determineRequiredItems(recipe);

    let maxCraftableAtOnce = maxCraftable;
    if (maxCraftable > recipe.maxToCraft) {
      maxCraftableAtOnce = recipe.maxToCraft;
    }

    instance.state.set('maxCraftableAmount', maxCraftable);
    instance.state.set('maxCraftAmount', recipe.maxToCraft);
    instance.state.set('craftAmount', Math.ceil(maxCraftableAtOnce / 2));
    instance.state.set('maxCraftableAtOnce', maxCraftableAtOnce);

    instance.state.set('selectedRecipe', recipeId);
  },

  'click .select-craft'(event, instance) {
    const craftId = instance.$(event.target).closest('.select-craft').attr('data-id');

    const selectedCraftingOptions = instance.state.get('selectedCraftingOptions');

    selectedCraftingOptions.push(craftId);
    instance.state.set('selectedCraftingOptions', selectedCraftingOptions.concat([]));
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
    const craftingTierFilter = instance.state.get('craftingTierFilter')
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
  },

  'click .show-less-items'(event, instance) {
    Session.set('itemViewLimit', 10);
    instance.state.set('itemViewLimit', 10);
  }
})

Template.craftingPage.helpers({
  craftingSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({ type: 'crafting' });
  },

  craftingFavourites() {
    const instance = Template.instance();
    return instance.state.get('craftingFavourites').map((recipeId) => {
      return instance.state.get('recipes').find(recipe => recipe.id === recipeId);
    }).map((recipe) => {
      let { maxCraftable, notMet } = determineRequiredItems(recipe);

      let maxCraftableAtOnce = maxCraftable;
      if (maxCraftable > recipe.maxToCraft) {
        maxCraftableAtOnce = recipe.maxToCraft;
      }

      recipe.notMet = notMet;
      recipe.maxCraftableAtOnce = maxCraftableAtOnce;

      return recipe;
    })
  },

  selectedCraftingOptions() {
    return Template.instance().state.get('selectedCraftingOptions');
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

  maxCraftableAtOnce() {
    return Template.instance().state.get('maxCraftableAtOnce');
  },

  recipeFilter() {
    return Template.instance().state.get('recipeFilter');
  },

  emptyCraftingSlots() {
    const crafting = Crafting.findOne();
    const craftingSkill = Skills.findOne({
      type: 'crafting'
    });
    const currentlyCrafting = crafting.currentlyCrafting;

    const cap = getMaxCrafts(craftingSkill.level);

    const emptyCraftingSlotscount = cap - currentlyCrafting.length;
    let emptyCraftingSlots = [];
    for (i = 0; i < emptyCraftingSlotscount; i++) {
      emptyCraftingSlots.push({});
    }

    return emptyCraftingSlots;
  },

  selectedRecipe() {
    const instance = Template.instance();
    const selectedRecipe = instance.state.get('selectedRecipe');

    if (!selectedRecipe) {
      return false;
    }

    const selectedRecipeObject = instance.state.get('recipes').find((recipe) => {
      return recipe.id === selectedRecipe;
    });

    const craftingFavourites = instance.state.get('craftingFavourites');
    selectedRecipeObject.favourited = craftingFavourites.find(favourite => {
      return favourite === selectedRecipe
    });

    return selectedRecipeObject;
  },

  selectableCraftingList() {

    const baseList = {
      all: {
        label: 'All'
      },
      crafting: {
        label: 'Crafting',
        categories: {
          xp: 'XP',
          gold: 'Gold',
          bar: 'Bar',
          furnace: 'Furnace',
          misc: 'Misc'
        }
      },
      mining: {
        label: 'Mining',
        categories: {
          pickaxe: 'Pickaxe',
          idol: 'Idol',
          anvil: 'Anvil'
        }
      },
      woodcutting: {
        label: 'Woodcutting',
        categories: {
          axe: 'Axe'
        }
      },
      combat: {
        label: 'Combat',
        categories: {
          armor: {
            label: 'Armor',
            categories: {
              helmet: 'Helmet',
              chest: 'Chest',
              legs: 'Legs'              
            }
          },
          weapon: {
            label: 'Weapon',
            categories: {
              dagger: 'Dagger',
              longsword: 'Longsword',
              spear: 'Spear',
              shield: 'Shield',
              shortsword: 'Shortsword',
              battleaxe: 'Battleaxe'              
            }
          },
          staff: 'Staff',
          amulet: 'Amulet'
        }
      },
      astronomy: {
        label: 'Astronomy',
        categories: {
          misc: 'Misc'
        }
      }
    }

    const instance = Template.instance();
    const selectedCraftingOptions = instance.state.get('selectedCraftingOptions');

    let selectedListObject = baseList;

    selectedCraftingOptions.forEach((key) => {
      if (selectedListObject[key].categories) {
        selectedListObject = selectedListObject[key].categories
      } else {
        selectedListObject = null
      }
    });

    if (selectedListObject) {
      return Object.keys(selectedListObject).map((key) => {
        // For each key, get the count of recipes below it
        let count = 0;
        let filteredRecipes = instance.state.get('recipes');
        const tempFilters = selectedCraftingOptions.concat([key]);
        tempFilters.forEach((key, index) => {
          if (key !== 'all') {
            if (index === 0) {
              filteredRecipes = filteredRecipes.filter((item) => {
                return item.category === key
              });
            } else {
              filteredRecipes = filteredRecipes.filter((item) => {
                return _.contains(item.tags, key)
              });
            }
          }
        });

        return {
          key,
          icon: tempFilters.length === 1 ? `${key}.svg` : false,
          count: filteredRecipes.length,
          label: selectedListObject[key].label ? selectedListObject[key].label : selectedListObject[key]
        }
      }).filter(category => category.count > 0);
    }

    let filteredRecipes = instance.state.get('recipes');
    selectedCraftingOptions.forEach((key, index) => {
      if (key !== 'all') {
        if (index === 0) {
          filteredRecipes = filteredRecipes.filter((item) => {
            return item.category === key
          });
        } else {
          filteredRecipes = filteredRecipes.filter((item) => {
            return _.contains(item.tags, key)
          });
        }
      }
    })

    const selectedRecipe = instance.state.get('selectedRecipe');

    return filteredRecipes.map((recipe) => {
      let { maxCraftable, notMet } = determineRequiredItems(recipe);

      return {
        isRecipe: true,
        isActive: recipe.id === selectedRecipe,
        notMet,
        label: recipe.name,
        key: recipe.id,
        icon: recipe.icon
      }
    });
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

  itemViewLimit() {
    return 0;
  },

  items() {
    const itemViewLimit = 0;

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

    let hidden = Template.instance().state.get('itemFilter') == 'hidden-items' ? true : false;


    if (itemViewLimit !== 0) {
      if (hidden) {
        return FetchSomeHiddenItems(highestFurnaceTier, itemViewLimit);
      }

      return FetchSomeVisibleItems(highestFurnaceTier, itemViewLimit);
    }

    if (hidden) {
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
    hidden: true,
    $or: [{
      tier: highestFurnaceTier,
    }, {
      name: {
        $regex: /^((?!furnace).)*$/,
      }
    }]
  }, {
    limit: itemViewLimit,
    sort: {
      category: 1,
      name: 1,
      quality: -1
    }
  }).map((itemModifier));
}


const FetchSomeVisibleItems = function (highestFurnaceTier, itemViewLimit) {
  return Items.find(
    {
      equipped: false,
      $and : [
        {
          $or: [
            { tier: highestFurnaceTier },
            { name: { $regex: /^((?!furnace).)*$/ } }
          ]
        },
        {
          $or : [
            { hidden : false },
            { hidden : { $exists : false } }
          ]
        }
      ]
    }, {
      limit: itemViewLimit,
      sort: {
        category: 1,
        name: 1,
        quality: -1
      }
    }
  ).map((itemModifier));
};



const FetchAllHiddenItems = function(highestFurnaceTier) {
  return Items.find({
    equipped: false,
    hidden: true,
    $or: [{
      tier: highestFurnaceTier,
    }, {
      name: {
        $regex: /^((?!furnace).)*$/,
      }
    }]
  }, {
    sort: {
      category: 1,
      name: 1,
      quality: -1
    }
  }).map((itemModifier));
}


const FetchAllVisibleItems = function (highestFurnaceTier) {
  return Items.find(
    {
      equipped: false,
      $and : [
        {
          $or: [
            { tier: highestFurnaceTier },
            { name: { $regex: /^((?!furnace).)*$/ } }
          ]
        },
        {
          $or : [
            { hidden : false },
            { hidden : { $exists : false } }
          ]
        }
      ]
    }, {
      sort: {
        category: 1,
        name: 1,
        quality: -1
      }
    }
  ).map((itemModifier));
};
