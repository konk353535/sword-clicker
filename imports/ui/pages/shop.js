import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { STATE_BUFFS } from '/imports/constants/state';
import { State } from '/imports/api/state/state';
import { Servers, DEFAULT_SERVER } from '/imports/api/servers/servers';

import { CInt } from '/imports/utils';

import lodash from 'lodash';

import './shop.html';

Template.shopPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.state.set('processing', false);

  this.autorun(() => {
    let globalBuffs = State.find({name: {$in: Object.values(STATE_BUFFS)}, 'value.activeTo': {$gte: moment().toDate()}}).fetch();
    globalBuffs = lodash.fromPairs(globalBuffs.map((buff) => [buff.name, buff.value.activeTo]));
    this.state.set('globalBuffs', globalBuffs);
  });
});

Template.shopPage.events({

  'click .buy-icon'(event, instance) {
    // Get the type we are buying
    const iconId = instance.$(event.target).closest('.buy-icon').data('icon-id');

    const costs = {
      mage_t1: 150,
      mage_t2: 300,
      damage_t1: 150,
      damage_t2: 300,
      tank_t1: 150,
      tank_t2: 300
    };

    if (Meteor.user().gems + Meteor.user().fakeGems < costs[iconId]) {
      // return;
    }

    Meteor.call('shop.buyIcon', iconId, (err, res) => {
      if (err) {
        return toastr.error(err.reason);
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-all-15'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 500) {
      return;
    }
    Meteor.call('shop.buyMembership', 15, (err, res) => {
      if (err) {
        return toastr.error(err.reason);
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-all-30'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 900) {
      return;
    }
    Meteor.call('shop.buyMembership', 30, (err, res) => {
      if (err) {
        return toastr.error(err.reason);
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-mining-30'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'mining' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when purchasing this unlock.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-crafting-30'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'crafting' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when purchasing this unlock.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-enhancer-key'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 100) {
      return;
    }

    Meteor.call('shop.buyEnhancerKey', (err, res) => {
      if (err) {
        return toastr.error(err.reason);
      }
      toastr.success('Successfully purchased.')
    });
  },  

  'click .buy-phasing-key'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 25) {
      return;
    }

    Meteor.call('shop.buyItem', { itemId: 'phasing_key' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when buying item.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-combat-30'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'combat' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when purchasing this unlock.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-woodcutting-30'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'woodcutting' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when purchasing this unlock.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-farming-30'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'farming' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when purchasing this unlock.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-inscription-30'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'inscription' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when purchasing this unlock.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-global-crafting'(event, instance) {
    Meteor.call('shop.buyGlobalBuff', 'buffCrafting', (err, res) => {
    });
  },

  'click .buy-global-gathering'(event, instance) {
    Meteor.call('shop.buyGlobalBuff', 'buffGathering', (err, res) => {
    });
  },

  'click .buy-global-combat'(event, instance) {
    Meteor.call('shop.buyGlobalBuff', 'buffCombat', (err, res) => {
    });
  },

  'click .buy-astronomy-30'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'astronomy' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when purchasing this unlock.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-lemonade'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 10) {
      return;
    }

    Meteor.call('shop.buyItem', { itemId: 'lemonade' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when buying item.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-gift_box_holiday2018'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 10) {
      return;
    }

    Meteor.call('shop.buyItem', { itemId: 'gift_box_holiday' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when buying item.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-gift_box_NY2019'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 10) {
      return;
    }

    Meteor.call('shop.buyItem', { itemId: 'gift_box_fireworks' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when buying item.');
      }
      toastr.success('Successfully purchased.')
    });
  },
  
  'click .buy-gift_box_LNY2019'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 10) {
      return;
    }

    Meteor.call('shop.buyItem', { itemId: 'gift_box_red_envelope' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when buying item.');
      }
      toastr.success('Successfully purchased.')
    });
  },
 
  'click .buy-gift_box_VD2019'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 10) {
      return;
    }

    Meteor.call('shop.buyItem', { itemId: 'gift_box_valentines' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when buying item.');
      }
      toastr.success('Successfully purchased.')
    });
  },
 
  'click .buy-gift_box_SPD2019'() {
    if (Meteor.user().gems + Meteor.user().fakeGems < 10) {
      return;
    }

    Meteor.call('shop.buyItem', { itemId: 'gift_box_stpatricks' }, (err, res) => {
      if (err) {
        return toastr.error('An unexpected error occurred when buying item.');
      }
      toastr.success('Successfully purchased.')
    });
  },
});

Template.shopPage.rendered = function () {
  const instance = Template.instance();
  const handler = StripeCheckout.configure({
    key: Meteor.settings.public.stripe,
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function (token) {
      const currentPack = instance.state.get('currentPack');
      Meteor.call('shop.purchase', {token: token.id, currentPack}, (err, res) => {
        if (err) {
          toastr.error('An error occurred while purchasing gems.');
        } else {
          toastr.success('Successfully purchased');
        }
        instance.state.set('processing', false);
      });
    },
    closed: function () {
      Meteor.setTimeout(() => {
        instance.state.set('processing', false);
      }, 1500);
    }
  });

  document.getElementById('purchaseButtonBunch').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Eternity Tower',
      image: 'https://eternitytower.net/icons/tower.svg',
      description: 'Bunch Of Gems (500)',
      currency: 'usd',
      amount: 499
    });
    instance.state.set('currentPack', 'bunch');
    instance.state.set('processing', true);
    e.preventDefault();
  });

  document.getElementById('purchaseButtonBag').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Eternity Tower',
      image: 'https://eternitytower.net/icons/tower.svg',
      description: 'Bag Of Gems (2,200)',
      currency: 'usd',
      amount: 1999
    });
    instance.state.set('currentPack', 'bag');
    instance.state.set('processing', true);
    e.preventDefault();
  });

  document.getElementById('purchaseButtonBox').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Eternity Tower',
      image: 'https://eternitytower.net/icons/tower.svg',
      description: 'Box Of Gems (6,000)',
      currency: 'usd',
      amount: 4999
    });
    instance.state.set('currentPack', 'box');
    instance.state.set('processing', true);
    e.preventDefault();
  });

  // Close Checkout on page navigation:
  window.addEventListener('popstate', function() {
    handler.close();
  });
};

Template.shopPage.helpers({
  processing() {
    return Template.instance().state.get('processing');
  },

  serverName() {
    const serverDoc = Servers.findOne({_id: Meteor.user().server});    
    return serverDoc.name;
  },

  eventBoxesAllowed() {
    //return Servers.findOne({_id: Meteor.user().server}).name === 'Classic';
    return true;
  },

  freeGems() {
    try {
      return CInt(Meteor.user().fakeGems);
    } catch (err) {
    }
    return 0;
  },

  paidGems() {
    try {
      return CInt(Meteor.user().gems);
    } catch (err) {
    }
    return 0;
  },

  totalGems() {
    try {
      return CInt(Meteor.user().gems) + CInt(Meteor.user().fakeGems);
    } catch (err) {
    }
    return 0;
  },

  globalBuffs() {
    return Template.instance().state.get('globalBuffs');
  },
  
  someGemsPayment() {
    return {
      amount: 5,
      currency: 'USD'
    }
  },

  bunchOfGemsPayment() {
    return {
      amount: 499,
      currency: 'USD'
    }
  },

  currentUpgrades() {
    const upgrades = [{
      name: 'mining',
      icon: 'mining.svg',
      description: '+20% damage'
    }, {
      name: 'crafting',
      icon: 'crafting.svg',
      description: '+20% speed'
    }, {
      name: 'combat',
      icon: 'attack.svg',
      description: '+20% energy regen'
    }, {
      name: 'woodcutting',
      icon: 'woodcutting.svg',
      description: '+20% speed'
    }, {
      name: 'farming',
      icon: 'farming.svg',
      description: '+2 spaces'
    }, {
      name: 'inscription',
      icon: 'inscription.svg',
      description: '+20% speed'
    }, {
      name: 'astronomy',
      icon: 'astronomy.svg',
      description: '+1 phantom mage'
    }];

    // Bind users upgradeto to each part in the map
    const userDoc = Meteor.user();
    
    if (!userDoc) {
      return false;
    }

    return upgrades.map((upgrade) => {
      const upgradeStatus = userDoc[`${upgrade.name}UpgradeTo`];
      if (upgradeStatus && moment().isBefore(upgradeStatus)) {
        upgrade.date = userDoc[`${upgrade.name}UpgradeTo`];
      }

      return upgrade;
    });
  }
});
