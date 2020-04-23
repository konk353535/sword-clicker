import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import lodash from 'lodash';
import _ from 'underscore';

import { Astronomy } from '/imports/api/astronomy/astronomy.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';

import { ITEMS } from '/imports/constants/items/index.js';

import { CInt } from '/imports/utils.js';
import { getBuffLevel } from '/imports/api/globalbuffs/globalbuffs.js';

import './astronomyTab.html';

const descriptions = {
  attackSpeed: 'Shards per hour',
  criticalChance: '% chance to get 2x shards',
  ancientShard: 'extra % chance to get ancient shards',
  completeShard: 'extra % chance to get complete shards'
};

Template.astronomyTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.subscribe('astronomy');

  Meteor.call('astronomy.hireMageCost', (err, res) => {
    if (!err) {
      this.state.set('hireMageCost', res);
    }
  });

  this.autorun(() => {
    // Only called when skills have loaded
    if (Skills.findOne()) {
      const astronomySkill = Skills.findOne({ type: 'astronomy' });

      if (!astronomySkill) {
        Meteor.call('skills.requirements', 'astronomy', (err, res) => {
          this.state.set('learnRequirements', res);
        });
      } else {
        Meteor.call('astronomy.upgradeCosts', (err, res) => {
          this.state.set('mageUpgrades', res);
        });
      }
    }
  });
});

Template.astronomyTab.onDestroyed(function bodyOnDestroyed() {
});

Template.astronomyTab.events({

  'click .buy-mage-type'(event, instance) {
    const type = instance.$(event.target).closest('.buy-mage-type').data('type');

    Meteor.call('astronomy.hireMage', type);
  },

  'click .buy-mage'(event, instance) {
    instance.$('.hireMageModal').modal('show');
  },

  'submit .deposit-form'(event, instance) {
    event.preventDefault();
    const mage = instance.state.get('selectedMage');
    const amount = parseInt($('.deposit-amount-input').val());
    Meteor.call('astronomy.depositMageGold', mage.index, amount);
    instance.$('.depositMageModal').modal('hide');
  },

  'submit .withdraw-form'(event, instance) {
    event.preventDefault();
    const mage = instance.state.get('selectedMage');
    const amount = parseInt($('.withdraw-amount-input').val());
    Meteor.call('astronomy.withdrawMageGold', mage.index, amount);
    instance.$('.depositMageModal').modal('hide');
  },

  'click .buy-mage-upgrade'(event, instance) {
    const statId = instance.$(event.target).closest('.buy-mage-upgrade').data('stat');
    Meteor.call('astronomy.upgradeMage', statId, (err, res) => {
      if (!err) {
        Meteor.call('astronomy.upgradeCosts', (err, res) => {
          instance.state.set('mageUpgrades', res);
        });
      }
    });
  }
});

Template.astronomyTab.helpers({

  astronomy() {
    const astronomy = lodash.cloneDeep(Astronomy.findOne());
    const instance = Template.instance();

    if (!astronomy) {
      return;
    }

    astronomy.mages.forEach((mage, mageIndex) => {
      mage.index = mageIndex;
      mage.amount = mage.gold;
      mage.icon += '.svg';

      if (mageIndex === 0) {
        mage.primaryAction = {
          description: 'Upgrade',
          method() {
            instance.$('.mageUpgradeModal').modal('show');
          }
        }
      } else if (mage.type) {
        mage.primaryAction = {
          description: 'Deposit / Withdraw',
          method() {
            // Open modal
            instance.$('.depositMageModal').modal('show');
            // Update current mage
            mage.gold = CInt(Math.floor(mage.gold));
            instance.state.set('selectedMage', mage);
          }
        }
      } else if (mage.id === 'donatorMage') {
        mage.name = "Phantom Mage";
        mage.icon = "phantomMage.svg";
        mage.primaryAction = {};
      }
      
      const townBuffObservatoryLevel = getBuffLevel('town_observatory');
      if (townBuffObservatoryLevel > 0) {
        mage.stats.attackSpeed *= 1 + ((townBuffObservatoryLevel + 1) * 0.03); // 6% - 18%
      }
      
      //console.log(mage);
    });
    
    return astronomy;
  },

  hasAstroUpgrade() {
    const astronomy = lodash.cloneDeep(Astronomy.findOne());
    let hasPhantomMageUpgrade = false;

    if (!astronomy) {
      return false;
    }
    
    astronomy.mages.forEach((mage, mageIndex) => {
      if (mage.id === 'donatorMage') {
        hasPhantomMageUpgrade = true;
      }
    });
    
    return hasPhantomMageUpgrade;
  },
  
  astroUpgradePreview() {
    const astronomy = lodash.cloneDeep(Astronomy.findOne());
    const instance = Template.instance();

    if (!astronomy) {
      return;
    }

    let mainMage = undefined;
    let hasPhantomMageUpgrade = false;
    astronomy.mages.forEach((mage, mageIndex) => {
      if (mageIndex === 0) {
        mainMage = mage;
      } else if (mage.id === 'donatorMage') {
        hasPhantomMageUpgrade = true;
      }
    });
    
    if (!hasPhantomMageUpgrade && mainMage !== undefined) {
      return {
        id: 'donatorMageInactive',
        icon: "phantomMage.svg",
        amount: undefined,
        index: -1,
        name: "Phantom Mage (Locked)",
        primaryAction: {
        description: 'Purchase',
          method() {
            Router.go('/shop');
          }
        },
        stats: { 
          attackSpeed: Math.round(mainMage.stats.attackSpeed / 2),
          criticalChance: mainMage.stats.criticalChance,
          completeShard: mainMage.stats.completeShard,
          ancientShard: mainMage.stats.ancientShard
        }
      };
    }

    return;
  },


  selectedMage() {
    return Template.instance().state.get('selectedMage');
  },

  hireableMages() {
    const types = ['water', 'air', 'fire', 'earth'];

    return types.map((type) => {
      return {
        cost: Template.instance().state.get('hireMageCost'),
        type
      }
    });
  },

  mainMageUpgrades() {
    const astronomy = Astronomy.findOne();
    if (!astronomy) {
      return;
    }

    const mainMage = astronomy.mages[0];
    const mageUpgrades = Template.instance().state.get('mageUpgrades');

    if (!mageUpgrades) {
      return [];
    }

    if (!mainMage.stats.ancientShard) {
      mainMage.stats.ancientShard = 0;
    }

    if (!mainMage.stats.completeShard) {
      mainMage.stats.completeShard = 0;
    }

    // List of main mage stats
    const mainMageStats = Object.keys(mainMage.stats).map((statKey) => {

      return {
        cost: mageUpgrades[statKey],
        value: mainMage.stats[statKey],
        description: descriptions[statKey],
        nextValue: mainMage.stats[statKey] + 1,
        key: statKey,
        icon: statKey
      }
    });

    return mainMageStats;
  },

  mainMage() {
    const astronomy = Astronomy.findOne();
    if (!astronomy) {
      return;
    }

    return astronomy.mages[0];
  },

  astronomySkill() {
    return Skills.findOne({ type: 'astronomy' });
  },

  items() {
    return itemList = Items.find({ category: 'astronomy' }).map((item) => { return item; }).sort((item1, item2) => {
      const itemConsts1 = ITEMS[item1.itemId];
      const itemConsts2 = ITEMS[item2.itemId];
      
      if (itemConsts1.sellPrice != itemConsts2.sellPrice) {
        return (itemConsts1.sellPrice > itemConsts2.sellPrice) ? -1 : 1;
      }
      
      return (itemConsts1.name < itemConsts2.name) ? -1 : 1;
    });
  }
});
