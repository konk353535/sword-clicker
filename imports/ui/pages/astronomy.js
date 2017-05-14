import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import { Astronomy } from '/imports/api/astronomy/astronomy.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';

import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';

import './astronomy.html';

let astronomyPageTimer;

const descriptions = {
  attackSpeed: 'Shards per hour',
  criticalChance: '% chance to get 2x shards'
}

Template.astronomyPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('hasLearnRequirements', false);

  Meteor.subscribe('astronomy');

  astronomyPageTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('astronomy.gameUpdate');
    }
  }, 10000);

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

Template.astronomyPage.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(astronomyPageTimer);
});

Template.astronomyPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'astronomy');
  },

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
    const amount = parseInt($('.deposit-amount-input').val())
    Meteor.call('astronomy.depositMageGold', mage.index, amount);
    instance.$('.depositMageModal').modal('hide');
  },

  'submit .withdraw-form'(event, instance) {
    event.preventDefault();
    const mage = instance.state.get('selectedMage');
    const amount = parseInt($('.withdraw-amount-input').val())
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

Template.astronomyPage.helpers({

  astronomy() {
    const astronomy = Astronomy.findOne();
    const instance = Template.instance();

    if (!astronomy) {
      return;
    }

    astronomy.mages.forEach((mage, mageIndex) => {
      mage.index = mageIndex
      if (mageIndex === 0) {
        mage.primaryAction = {
          description: 'Upgrade',
          method() {
            instance.$('.mageUpgadeModal').modal('show');
          }
        }
      } else {
        mage.primaryAction = {
          description: 'Deposit / Withdraw',
          method() {
            // Open modal
            instance.$('.depositMageModal').modal('show');
            // Update current mage
            instance.state.set('selectedMage', mage);
          }
        }
      }

    });

    return astronomy;
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

    // List of main mage stats
    const mainMageStats = Object.keys(mainMage.stats).map((statKey) => {
      return {
        cost: mageUpgrades[statKey],
        value: mainMage.stats[statKey],
        description: descriptions[statKey],
        nextValue: mainMage.stats[statKey] + 1,
        key: statKey
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

  learnRequirements() {
    return Template.instance().state.get('learnRequirements');
  },

  hasLearnRequirements() {
    return Template.instance().state.get('hasLearnRequirements');
  },

  learnRequirementsMet() {
    const instance = Template.instance();
    return function (met) {
      instance.state.set('hasLearnRequirements', met);
    }
  },

  items() {
    return Items.find({ category: 'astronomy' });
  }
});
