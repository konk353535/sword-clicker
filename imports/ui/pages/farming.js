import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';

import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';
import { FarmingSpace } from '/imports/api/farming/farming.js';
import { Users, UserGames } from '/imports/api/users/users.js';

import '../components/farming/farmSpace.js';
import './farming.html';

let lastFarmingLevel;
Template.farmingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  // Farming
  Tracker.autorun(() => {
    if (Meteor.user() && Meteor.user().currentGame) {
      Meteor.subscribe('farmingSpace', Meteor.user().currentGame);
    }
  });

  this.state.set('currentTab', 'shop');
  this.state.set('seedsFilter', 'food');

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (!myUser) return;
    const userGame = UserGames.findOne({ owner: myUser._id, game: myUser.currentGame });
    if (userGame) {
      if (userGame.uiState && userGame.uiState.farmingTab !== undefined) {
        this.state.set('currentTab', userGame.uiState.farmingTab);
      } else {
        this.state.set('currentTab', 'shop');
      }
    }
  });

  Meteor.call('farming.gameUpdate', (err) => {
    this.state.set('tooltipsLoaded', false);

    this.autorun(() => {
      if (Skills.findOne({ type: 'farming' })) {
        if (!this.state.get('tooltipsLoaded')) {
          this.state.set('tooltipsLoaded', true);
          updateTooltips(this, ['seed-shop']);
        }
      }
    });
  });

  this.autorun(() => {
    const farmingSkill = Skills.findOne({ type: 'farming' });
    if (!farmingSkill) {
      return;
    }

    if (!lastFarmingLevel || farmingSkill.level !== lastFarmingLevel) {
      // Pass level so that this is recalled when we get up a level
      const results = ReactiveMethod.call('farming.fetchSeedShopSells', farmingSkill.level);

      if (results) {
        this.state.set('seeds', _.sortBy(results, 'requiredFarmingLevel'));
      }
    }
  })
});

Template.farmingPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'farming');
  },

  'click .seed-shop'(event, instance) {
    // Open seed shop modal
    instance.$('.seedShopModal').modal('show');
  },

  'click .shopLink'(event, instance) {
    if(instance.state.get('currentTab') !== 'shop') {
      instance.state.set('currentTab', 'shop');
      Meteor.call('users.setUiState', 'farmingTab', 'shop');
    }
  },

  'click .plotsLink'(event, instance) {
    if(instance.state.get('currentTab') !== 'plots') {
      instance.state.set('currentTab', 'plots');
      Meteor.call('users.setUiState', 'farmingTab', 'plots');
    }
  },

  'click .allLink'(event, instance) {
    instance.state.set('seedsFilter', 'all');
  },

  'click .foodLink'(event, instance) {
    instance.state.set('seedsFilter', 'food');
  },

  'click .miscLink'(event, instance) {
    instance.state.set('seedsFilter', 'misc');
  },

  'click .xpLink'(event, instance) {
    instance.state.set('seedsFilter', 'xp');
  },

  'click .goldLink'(event, instance) {
    instance.state.set('seedsFilter', 'gold');
  },

  'click .herbLink'(event, instance) {
    instance.state.set('seedsFilter', 'herb');
  },

  'click .treeLink'(event, instance) {
    instance.state.set('seedsFilter', 'tree');
  },

  'click .buy-1'(event, instance) {
    const shopItemId = instance.$(event.target).closest('.buy-1').attr('data-shop-item-id');

    Meteor.call('farming.buyShopItem', shopItemId, 1);
  },

  'click .buy-10'(event, instance) {
    const shopItemId = instance.$(event.target).closest('.buy-10').attr('data-shop-item-id');

    Meteor.call('farming.buyShopItem', shopItemId, 10);
  },

  'click .buy-100'(event, instance) {
    const shopItemId = instance.$(event.target).closest('.buy-100').attr('data-shop-item-id');

    Meteor.call('farming.buyShopItem', shopItemId, 100);
  }

});

Template.farmingPage.helpers({
  farmingSkill() {
    return Skills.findOne({ type: 'farming' });
  },

  items() {
    return Items.find({
      category: {
        $in: ['seed', 'farming']
      }
    }, {
      sort: {
        category: -1,
        name: 1,
      }
    }).map((item) => {
      if (item.category === 'seed') {
        item.required = item.plantingDetails.required;
        item.description = `Growth time is ${moment.duration(item.plantingDetails.growthTime, 'seconds').humanize()}`;
        item.primaryAction = {
          description: 'plant',
          item,
          method() {
            // Planting
            Meteor.call('farming.plant', item.plantingDetails.produces, (err, res) => {
              if (err) {
                toastr.warning(err.reason);
              }
            });
          }
        }
        item.shiftAction = {
          description: 'plant all',
          item,
          method() {
            // Planting
            Meteor.call('farming.plantAll', item.plantingDetails.produces, this.item.amount, (err, res) => {
              if (err) {
                toastr.warning(err.reason);
              }
            });
          }
        }
      }
      return item;
    });
  },

  farmingSpaces() {
    const userDoc = Meteor.user();
    const hasFarmingUpgrade = userDoc.farmingUpgradeTo && moment().isBefore(userDoc.farmingUpgradeTo);
    
    return FarmingSpace.find().map((farmingSpace) => {
      if (farmingSpace.index === 4 || farmingSpace.index === 5) {
        if (hasFarmingUpgrade) {
          farmingSpace.active = true;
        } else {
          farmingSpace.active = false;
        }
      }
      return farmingSpace;
    });
  },

  showShopTab() {
    return Template.instance().state.get('currentTab') === 'shop';
  },

  showPlotsTab() {
    return Template.instance().state.get('currentTab') === 'plots';
  },

  seedsFilter() {
    return Template.instance().state.get('seedsFilter');
  },

  seedsToShow() {
    const instance = Template.instance();
    return instance.state.get('seeds').filter((seed) => {
      if (instance.state.get('seedsFilter') === 'all') {
        return true;
      }
      return seed.seedType === instance.state.get('seedsFilter');
    });
  }
});

const updateTooltips = function (instance, tooltipNames) {
  setTimeout(() => {
    tooltipNames.forEach((tooltipName) => {
      new Drop({
        target: instance.$(`.${tooltipName}-tooltip-container`)[0],
        content: instance.$(`.${tooltipName}-tooltip-content`)[0],
        openOn: 'hover',
        position: 'top left',
        remove: true
      });
    });
  }, 100);
}
