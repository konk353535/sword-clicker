import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';

import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';
import { FarmingSpace } from '/imports/api/farming/farming.js';

import '../components/farming/farmSpace.js';
import './farming.html';

Template.farmingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

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
});

Template.farmingPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'farming');
  },

  'click .seed-shop'(event, instance) {
    // Open seed shop modal
    instance.$('.seedShopModal').modal('show');
  },

  'click .craft-row'(event, instance) {
    const shopItemId = instance.$(event.target).closest('.craft-row').data('shop-item-id');

    Meteor.call('farming.buyShopItem', shopItemId);
  },
});

Template.farmingPage.helpers({
  farmingSkill() {
    return Skills.findOne({ type: 'farming' });
  },

  items() {
    return Items.find({
      category: {
        $in: ['seed', 'herb', 'farming', 'food']
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
            Meteor.call('farming.plantAll', item.plantingDetails.produces, (err, res) => {
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

  buyableSeeds() {
    const farmingSkill = Skills.findOne({ type: 'farming' });
    if (!farmingSkill) {
      return;
    }
    // Pass level so that this is recalled when we get up a level
    const results = ReactiveMethod.call('farming.fetchSeedShopSells', farmingSkill.level);

    if (results) {
      return _.sortBy(results, 'requiredFarmingLevel');
    }

    return [];
  },
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
