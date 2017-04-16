import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '/imports/api/skills/skills.js';
import { MiningSpace, Mining } from '/imports/api/mining/mining.js';
import { Items } from '/imports/api/items/items.js';

// Component used in the template
import '../components/mining/mineSpace.js';
import './mining.html';

let miningPageTimer;
let hasInitGameUpdate;

Template.miningPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    if (!hasInitGameUpdate && Mining.findOne()) {
      Meteor.call('mining.gameUpdate');
      hasInitGameUpdate = true;
    }
  });

  miningPageTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('mining.gameUpdate');
    }
  }, 5000);

  // Show mining spaces
  Meteor.subscribe('miningSpace');
  // Do I even need this?
  Meteor.subscribe('mining');
});

Template.miningPage.events({
  'click .buy-miner'(event, instance) {
    if (Meteor.user().gold >= Mining.findOne().nextMinerCost) {
      Meteor.call('mining.buyMiner');
    }
  },

  'click .buy-prospector'(event, instance) {
    if (Meteor.user().gold >= Mining.findOne().nextProspectorCost) {
      Meteor.call('mining.buyProspector');
    }
  }
});

Template.miningPage.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(miningPageTimer);
});

Template.miningPage.rendered = function () {
  const minerTooltip = new Drop({
    target: Template.instance().$('.buy-miner')[0],
    content: Template.instance().$('.miners-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });

  const prospectorTooltip = new Drop({
    target: Template.instance().$('.buy-prospector')[0],
    content: Template.instance().$('.prospectors-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}

Template.miningPage.helpers({
  miningSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({ type: 'mining' });
  },

  miningSpaces() {
    return MiningSpace.find();
  },

  mining() {
    const mining = Mining.findOne();
    if (mining) {
      Template.instance().state.set('nextMinerCost', mining.nextMinerCost);
      Template.instance().state.set('nextProspectorCost', mining.nextProspectorCost);
    }
    return mining;
  },

  nextMinerCost() {
    return Template.instance().state.get('nextMinerCost');
  },

  nextProspectorCost() {
    return Template.instance().state.get('nextProspectorCost');
  },

  miningItems() {
    return Items.find({ category: 'mining', equipped: false }).map((item) => {
      if (item.isEquippable) {
        item.primaryAction = {
          description: 'equip',
          item,
          method() {
            Meteor.call('items.equip', this.item._id, this.item.itemId, (err, res) => {
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

  equippedItemsMap() {
    const equippedItems = Items.find({
      category: 'mining',
      equipped: true
    }).map((item) => {
      item.hideCount = true;
      item.primaryAction = {
        description: 'unequip',
        item,
        method() {
          Meteor.call('items.unequip', this.item._id, this.item.itemId);
        }
      }
      return item;
    });

    const equippedMap = {};
    equippedItems.forEach((item) => {
      equippedMap[item.slot] = item;
    });

    return equippedMap;
  },
});
