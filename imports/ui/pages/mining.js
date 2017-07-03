import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import _ from 'underscore';

import { Skills } from '/imports/api/skills/skills.js';
import { MiningSpace, Mining } from '/imports/api/mining/mining.js';
import { Items } from '/imports/api/items/items.js';

// Component used in the template
import '../components/mining/mineSpace.js';
import './mining.html';

let miningPageTimer;
let hasInitGameUpdate;
let minersCache;
let prospectorsCache;

Template.miningPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    if (!hasInitGameUpdate && Mining.findOne()) {
      Meteor.call('mining.gameUpdate');
      hasInitGameUpdate = true;
    }
  });

  if (Session.get('minersCache')) {
    minersCache = Session.get('minersCache')
  }

  if (Session.get('prospectorsCache')) {
    prospectorsCache = Session.get('prospectorsCache')
  }

  Tracker.autorun(() => {
    const miningSkill = Skills.findOne({ type: 'mining' });
    if (!miningSkill) {
      return;
    }

    let minerResults;
    let prospectorResults;

    if (minersCache && minersCache.data && minersCache.level === miningSkill.level &&
      moment().isBefore(moment(minersCache.date).add(30, 'minutes'))) {
      minerResults = minersCache.data;
    } else {
      minerResults = ReactiveMethod.call('mining.fetchMiners', miningSkill.level);
      minersCache = {
        data: minerResults,
        level: miningSkill.level,
        date: moment().toDate(),
      }
      Session.set('minersCache', minersCache);
    }

    if (prospectorsCache && prospectorsCache.data && prospectorsCache.level === miningSkill.level &&
      moment().isBefore(moment(prospectorsCache.date).add(30, 'minutes'))) {
      prospectorResults = prospectorsCache.data;
    } else {
      prospectorResults = ReactiveMethod.call('mining.fetchProspectors', miningSkill.level);
      prospectorsCache = {
        data: prospectorResults,
        level: miningSkill.level,
        date: moment().toDate()
      }
      Session.set('prospectorsCache', prospectorsCache);
    }

    this.state.set('rawBuyableMiners', minerResults);
    this.state.set('rawBuyableProspectors', prospectorResults);
  });

  miningPageTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('mining.gameUpdate');
    }
  }, 7000);

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

  summaryMiners() {
    const mining = Mining.findOne({});
    const rawBuyableMiners = Template.instance().state.get('rawBuyableMiners');

    if (!mining || !rawBuyableMiners) {
      return 0;
    }

    let count = 0;
    let max = 0;

    rawBuyableMiners.forEach((possibleMiner) => {
      const localMiner = _.findWhere(mining.miners, { id: possibleMiner.id });

      if (possibleMiner) {
        max += possibleMiner.max;
      }
      if (localMiner && localMiner.amount) {
        count += localMiner.amount;
      }
    });

    return {
      count,
      max
    };
  },

  summaryProspectors() {
    const mining = Mining.findOne({});
    const rawBuyableProspectors = Template.instance().state.get('rawBuyableProspectors');

    if (!mining || !rawBuyableProspectors) {
      return 0;
    }

    let count = 0;
    let max = 0;

    rawBuyableProspectors.forEach((possibleProspector) => {
      const localProspector = _.findWhere(mining.prospectors, { id: possibleProspector.id });
      if (possibleProspector) {
        max += possibleProspector.max;
      }

      if (localProspector && localProspector.amount) {
        count += localProspector.amount;
      } else {
        count += 1;
      }
    });

    return {
      count,
      max
    };
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
        possibleProspector.amount = 1;
      }

      return possibleProspector;
    });
  },

  hasMiningUpgrade() {
    const userDoc = Meteor.user();
    return userDoc.miningUpgradeTo && moment().isBefore(userDoc.miningUpgradeTo);
  },

  equippedItemsMap() {
    const equippedItems = Items.find({
      category: 'mining',
      equipped: true
    }).map((item) => {
      item.hideCount = true;
      item.primaryAction = {
        method() {}
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
