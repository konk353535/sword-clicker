import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './shop.html';

Template.shopPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('processing', false);
});

Template.shopPage.events({
  'click .buy-all-15'() {
    if (Meteor.user().gems < 500) {
      return;
    }
    Meteor.call('shop.buyMembership', 15, (err, res) => {
      if (err) {
        toastr.error('An unexpected error occured when buying membership.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-all-30'() {
    if (Meteor.user().gems < 900) {
      return;
    }
    Meteor.call('shop.buyMembership', 30, (err, res) => {
      if (err) {
        toastr.error('An unexpected error occured when buying membership.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-mining-30'() {
    if (Meteor.user().gems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'mining' }, (err, res) => {
      if (err) {
        toastr.error('An unexpected error occured when buying membership.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-crafting-30'() {
    if (Meteor.user().gems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'crafting' }, (err, res) => {
      if (err) {
        toastr.error('An unexpected error occured when buying membership.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-combat-30'() {
    if (Meteor.user().gems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'combat' }, (err, res) => {
      if (err) {
        toastr.error('An unexpected error occured when buying membership.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-woodcutting-30'() {
    if (Meteor.user().gems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'woodcutting' }, (err, res) => {
      if (err) {
        toastr.error('An unexpected error occured when buying membership.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-farming-30'() {
    if (Meteor.user().gems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'farming' }, (err, res) => {
      if (err) {
        toastr.error('An unexpected error occured when buying membership.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-inscription-30'() {
    if (Meteor.user().gems < 200) {
      return;
    }

    Meteor.call('shop.buySingle', { days: 30, type: 'inscription' }, (err, res) => {
      if (err) {
        toastr.error('An unexpected error occured when buying membership.');
      }
      toastr.success('Successfully purchased.')
    });
  }
})

Template.shopPage.rendered = function () {
  const instance = Template.instance();
  var handler = StripeCheckout.configure({
    key: Meteor.settings.public.stripe,
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
      const currentPack = instance.state.get('currentPack');
      Meteor.call('shop.purchase', { token: token.id, currentPack }, (err, res) => {
        if (err) {
          toastr.error('An error occured while purchasing gems.');
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
      description: 'Bunch Of Gems',
      currency: 'usd',
      amount: 499
    });
    instance.state.set('currentPack', 'bunch')
    instance.state.set('processing', true);
    e.preventDefault();
  });

  document.getElementById('purchaseButtonBag').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Eternity Tower',
      image: 'https://eternitytower.net/icons/tower.svg',
      description: 'Bag Of Gems',
      currency: 'usd',
      amount: 1999
    });
    instance.state.set('currentPack', 'bag')
    instance.state.set('processing', true);
    e.preventDefault();
  });

  document.getElementById('purchaseButtonBox').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Eternity Tower',
      image: 'https://eternitytower.net/icons/tower.svg',
      description: 'Box Of Gems',
      currency: 'usd',
      amount: 4999
    });
    instance.state.set('currentPack', 'box')
    instance.state.set('processing', true);
    e.preventDefault();
  });

  // Close Checkout on page navigation:
  window.addEventListener('popstate', function() {
    handler.close();
  });
}

Template.shopPage.helpers({
  processing() {
    return Template.instance().state.get('processing');
  },

  currentUpgrades() {
    const upgrades = [{
      name: 'mining',
      icon: 'mining',
      description: '+20% damage'
    }, {
      name: 'crafting',
      icon: 'crafting',
      description: '+20% speed'
    }, {
      name: 'combat',
      icon: 'attack',
      description: '+20% energy regen'
    }, {
      name: 'woodcutting',
      icon: 'woodcutting',
      description: '+20% speed'
    }, {
      name: 'farming',
      icon: 'farming',
      description: '+2 spaces'
    }, {
      name: 'inscription',
      icon: 'inscription',
      description: '+20% speed'
    }];

    // Bind users upgradeto to each part in the map
    const userDoc = Meteor.user();

    return upgrades.map((upgrade) => {
      const upgradeStatus = userDoc[`${upgrade.name}UpgradeTo`];
      if (upgradeStatus && moment().isBefore(upgradeStatus)) {
        upgrade.date = userDoc[`${upgrade.name}UpgradeTo`];
      }

      return upgrade;
    });
  }
})
