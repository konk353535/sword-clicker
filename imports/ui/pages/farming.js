import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';
import { FarmingSpace } from '/imports/api/farming/farming.js';

import '../components/farming/farmSpace.js';
import './farming.html';

Template.farmingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('tooltipsLoaded', false);
  this.subscribe('farmingSpace');

  this.autorun(() => {
    if (Skills.findOne({ type: 'farming' })) {
      if (!this.state.get('tooltipsLoaded')) {
        this.state.set('tooltipsLoaded', true);
        updateTooltips(this, ['seed-shop']);
      }
    }
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
        $in: ['seed', 'herb', 'farming']
      }
    }).map((item) => {
      if (item.category === 'seed') {
        item.required = item.plantingDetails.required;
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
      }
      return item;
    });
  },

  farmingSpaces() {
    return FarmingSpace.find({});
  },

  buyableSeeds() {
    const farmingSkill = Skills.findOne({ type: 'farming' });
    if (!farmingSkill) {
      return;
    }
    // Pass level so that this is recalled when we get up a level
    const results = ReactiveMethod.call('farming.fetchSeedShopSells', farmingSkill.level);

    return results || [];
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
