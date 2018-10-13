import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import _ from 'underscore';

import { Skills } from '/imports/api/skills/skills.js';
import { MiningSpace, Mining } from '/imports/api/mining/mining.js';
import { Items } from '/imports/api/items/items.js';
import { Users } from '/imports/api/users/users.js';
import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';
import { ITEMS } from '/imports/constants/items/index.js';

// Component used in the template
import '../components/mining/mineSpace.js';
import './mining.html';

let miningPageTimer;
let hasInitGameUpdate;
let minersCache;
let prospectorsCache;
let oresCache;
let tooltip;

Template.miningPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  // Show mining spaces
  Meteor.subscribe('miningSpace');
  // Mining data
  Meteor.subscribe('mining');

  this.autorun(() => {
    if (!hasInitGameUpdate && Mining.findOne()) {
      Meteor.call('mining.gameUpdate');
      hasInitGameUpdate = true;
    }
  });

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.miningTab !== undefined) {
        this.state.set('currentTab', myUser.uiState.miningTab);
      } else {
        this.state.set('currentTab', 'minePit');
      }

      if (myUser.uiState && myUser.uiState.miningMultihit !== undefined) {
        this.state.set('miningMultihit', myUser.uiState.miningMultihit);
      } else {
        this.state.set('miningMultihit', true);
      }
    }
  });

  if (Session.get('minersCache')) {
    minersCache = Session.get('minersCache')
  }

  if (Session.get('oresCache')) {
    oresCache = Session.get('oresCache');
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
    let oreResults;

    if (minersCache && minersCache.data && minersCache.level === miningSkill.level &&
      moment().isBefore(moment(minersCache.date).add(30, 'minutes'))) {
      minerResults = minersCache.data;
    } else {
      minerResults = ReactiveMethod.call('mining.fetchMiners', miningSkill.level);
      minersCache = {
        data: minerResults,
        level: miningSkill.level,
        date: moment().toDate(),
      };
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
      };
      Session.set('prospectorsCache', prospectorsCache);
    }

    if (oresCache && oresCache.data && oresCache.level === miningSkill.level &&
      moment().isBefore(moment(oresCache.date).add(30, 'minutes'))) {
      oreResults = oresCache.data;
    } else {
      oreResults = ReactiveMethod.call('mining.fetchOres', miningSkill.level);
      oresCache = {
        data: oreResults,
        level: miningSkill.level,
        date: moment().toDate()
      };
      Session.set('oresCache', oresCache);
    }

    this.state.set('rawOres', oreResults);
    this.state.set('rawBuyableMiners', minerResults);
    this.state.set('rawBuyableProspectors', prospectorResults);
  });

  Meteor.call('mining.gameUpdate');
  miningPageTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('mining.gameUpdate');
    }
  }, 7000);

});

Template.miningPage.events({

  'click .multihit-btn'(event, instance) {
    if (instance.state.get('miningMultihit')) {
      Meteor.call('users.setUiState', 'miningMultihit', false);
    } else {
      Meteor.call('users.setUiState', 'miningMultihit', true);
    }
  },

  'click .minePitLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'minePit') {
      instance.state.set('currentTab', 'minePit');
      Meteor.call('users.setUiState', 'miningTab', 'minePit');
    }
  },

  'click .equipmentLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'equipment') {
      instance.state.set('currentTab', 'equipment');
      Meteor.call('users.setUiState', 'miningTab', 'equipment');
    }
  },

  'click .prospectorsLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'prospectors') {
      instance.state.set('currentTab', 'prospectors');
      Meteor.call('users.setUiState', 'miningTab', 'prospectors');
    }
  },

  'click .minersLink'(event, instance) {
    if (instance.state.get('currentTab') !== 'miners') {
      instance.state.set('currentTab', 'miners');
      Meteor.call('users.setUiState', 'miningTab', 'miners');
    }
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
  }
});

Template.miningPage.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(miningPageTimer);
});


Template.hireMinerButton.onCreated(function onCreated() {
  this.state = new ReactiveDict();
});

Template.hireMinerButton.events({
  'click .hire-miner'(event, instance) {
    instance.state.set('showModal', true);
    setTimeout(() => {
      instance.$('.hireMinerModal').modal('show');
    }, 0);
  },

  'click .confirm-hire-miner'(event, instance) {
    Meteor.call('mining.buyMiner', instance.data.recipe.id);
    instance.$('.hireMinerModal').modal('hide');
  }
});

Template.hireMinerButton.helpers({
  showModal() {
    return Template.instance().state.get('showModal');
  }
});

Template.oreListItem.rendered = function () {
  tooltip = new Drop({
    target: Template.instance().$('.ore-list-item')[0],
    content: Template.instance().$('.ore-list-item-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
};

Template.buyableMiner.rendered = function () {
  const dpsBreakdownTooltip = new Drop({
    target: Template.instance().$('.damage-per-hour-container')[0],
    content: Template.instance().$('.dps-breakdown-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
};

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
};

Template.miningPage.helpers({
  miningSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({ type: 'mining' });
  },

  miningSpaces() {
    return MiningSpace.find();
  },

  oresList() {
    const instance = Template.instance();
    const rawOres = Template.instance().state.get('rawOres');
    const gems = rawOres.filter((ore) => {
      return ore.isGem;
    });

    const ores = rawOres.filter((ore) => {
      return !(/essence/.test(ore.name)) && !ore.isGem && ore.name !== 'gem';
    });

    return ores.concat(gems).map((ore) => {
      const targetItem = Items.findOne({
        itemId: ore.itemId
      });

      if (targetItem) {
        ore.amount = targetItem.amount;
      } else {
        ore.amount = 0;
      }

      return ore;
    }).filter((ore) => {
      return !(ore.amount === 0 && ore.isGem);
    });
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

  miningPickaxes() {
    return Items.find({ category: 'mining', equipped: false }).map((item) => {
      if (ITEMS[item.itemId].isEquippable) {
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
    }).filter((item) => {
      return ITEMS[item.itemId].isEquippable
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

  miningEnergyPercentage() {
    const mining = Mining.findOne({});
    return (mining.stats.energy / mining.stats.energyStorage) * 100;
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

      if (localProspector && localProspector.amount > -1) {
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
    const userDoc = Meteor.user();

    if (!mining || !rawBuyableMiners) {
      return;
    }

    let hasMiningUpgrade = false;
    if (userDoc.miningUpgradeTo && moment().isBefore(userDoc.miningUpgradeTo)) {
      hasMiningUpgrade = true;
    }

    let totalDPH = 0;
    const finalBuyableMiners = rawBuyableMiners.map((possibleMiner) => {
      const localMiner = _.findWhere(mining.miners, { id: possibleMiner.id });
      if (localMiner) {
        possibleMiner.amount = localMiner.amount;
        possibleMiner.baseDamagePerHour = localMiner.amount * possibleMiner.damagePerSecond * 3600;
        possibleMiner.damagePerHour = localMiner.amount * possibleMiner.damagePerSecond * 3600;
        // Mutate damagePerHour by (level - 1) * 2.5%
        possibleMiner.levelDps = possibleMiner.damagePerHour * (localMiner.level * 0.025);
        possibleMiner.damagePerHour += possibleMiner.levelDps;
        // Mutate damagePerHour by base passive miner damage
        possibleMiner.minerStatDps = possibleMiner.damagePerHour * (mining.stats.miner / 100);
        possibleMiner.damagePerHour += possibleMiner.minerStatDps;
        // Mutate damagePerHour by donator bonus (to passive miner damage)
        if (hasMiningUpgrade) {
          possibleMiner.donatorDps = possibleMiner.damagePerHour * (DONATORS_BENEFITS.miningBonus / 100);
          possibleMiner.damagePerHour += possibleMiner.donatorDps;
        }
        totalDPH += possibleMiner.damagePerHour;
      } else {
        possibleMiner.amount = 0;
        possibleMiner.damagePerHour = possibleMiner.damagePerSecond * 3600;
      }

      possibleMiner.level = localMiner ? localMiner.level : 1;
      possibleMiner.xp = localMiner ? localMiner.xp : 0;
      possibleMiner.xpToLevel = localMiner ? localMiner.xpToLevel : 10;
      possibleMiner.xpPercentage = localMiner ? (localMiner.xp / localMiner.xpToLevel * 100) : 0;
      return possibleMiner;
    });

    Template.instance().state.set('totalDPH', totalDPH);
    return finalBuyableMiners;
  },

  totalDPH() {
    return Template.instance().state.get('totalDPH');
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

  currentTab() {
    return Template.instance().state.get('currentTab');
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
      };
      return item;
    });

    const equippedMap = {};
    equippedItems.forEach((item) => {
      equippedMap[item.slot] = item;
    });

    return equippedMap;
  },

  miningMultihit() {
    return Template.instance().state.get('miningMultihit');
  },
});
