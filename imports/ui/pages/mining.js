import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import _ from 'underscore';

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

  Tracker.autorun(() => {
    const miningSkill = Skills.findOne({ type: 'mining' });
    if (!miningSkill) {
      return;
    }

    const results = ReactiveMethod.call('mining.fetchMiners', miningSkill.level) || [];
    const prospectorResults = ReactiveMethod.call('mining.fetchProspectors', miningSkill.level) || [];
    this.state.set('rawBuyableMiners', results);
    this.state.set('rawBuyableProspectors', prospectorResults);

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
    Template.instance().$('.minersModal').modal('show');      
  },

  'click .miner-row'(event, instance) {
    const minerId = instance.$(event.target).closest('.miner-row').data('miner');

    Meteor.call('mining.buyMiner', minerId);
  },

  'click .prospector-hire'(event, instance) {
    const prospectorId = instance.$(event.target).closest('.prospector-hire').data('prospector');

    Meteor.call('mining.buyProspector', prospectorId);
  },

  'click .prospector-fire'(event, instance) {
    const prospectorId = instance.$(event.target).closest('.prospector-fire').data('prospector');

    Meteor.call('mining.fireProspector', prospectorId, (err, res) => {
      if (err) {
        toastr.error(err.reason);
      }
    });
  },

  'click .buy-prospector'(event, instance) {
    Template.instance().$('.prospectorsModal').modal('show');
  }
});

Template.miningPage.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(miningPageTimer);
});

Template.miningPage.rendered = function () {
  const prospectorTooltip = new Drop({
    target: Template.instance().$('.buy-prospector')[0],
    content: Template.instance().$('.prospectors-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });

  const minerTooltip = new Drop({
    target: Template.instance().$('.buy-miner')[0],
    content: Template.instance().$('.miners-tooltip-content')[0],
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

  totalDPH() {
    const mining = Mining.findOne({});
    const rawBuyableMiners = Template.instance().state.get('rawBuyableMiners');

    if (!mining || !rawBuyableMiners) {
      return 0;
    }

    let totalDPH = 0;

    rawBuyableMiners.forEach((possibleMiner) => {
      const localMiner = _.findWhere(mining.miners, { id: possibleMiner.id });
      if (localMiner) {
        totalDPH += localMiner.amount * possibleMiner.damagePerSecond * 3600;
      };
    });

    return totalDPH;
  },

  buyableMiners() {
    const mining = Mining.findOne({});
    const rawBuyableMiners = Template.instance().state.get('rawBuyableMiners');

    if (!mining || !rawBuyableMiners) {
      return;
    }

    return rawBuyableMiners.map((possibleMiner) => {
      const localMiner = _.findWhere(mining.miners, { id: possibleMiner.id });
      if (localMiner) {
        possibleMiner.amount = localMiner.amount;
        possibleMiner.damagePerHour = localMiner.amount * possibleMiner.damagePerSecond * 3600;
      } else {
        possibleMiner.amount = 0;
        possibleMiner.damagePerHour = possibleMiner.damagePerSecond * 3600;
      }

      return possibleMiner;
    });
  },

  buyableProspectors() {
    const mining = Mining.findOne({});
    const rawBuyableProspectors = Template.instance().state.get('rawBuyableProspectors');

    if (!mining || !rawBuyableProspectors) {
      return;
    }

    return rawBuyableProspectors.map((possibleProspector) => {
      const localProspector = _.findWhere(mining.prospectors, { id: possibleProspector.id });
      if (localProspector) {
        possibleProspector.amount = localProspector.amount;
      } else {
        possibleProspector.amount = 0;
      }

      return possibleProspector;
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
