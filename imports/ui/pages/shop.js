import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './shop.html';

Template.shopPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('processing', false);
});

Template.shopPage.events({
  'click .buy-15'() {
    if (Meteor.user().gems < 5) {
      return;
    }
    Meteor.call('shop.buyMembership', 15, (err, res) => {
      if (err) {
        toastr.error('An unexpected error occured when buying membership.');
      }
      toastr.success('Successfully purchased.')
    });
  },

  'click .buy-30'() {
    if (Meteor.user().gems < 10) {
      return;
    }
    Meteor.call('shop.buyMembership', 30, (err, res) => {
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
          toastr.error('An error occured while purchasing gems');
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
      name: 'Clicker',
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
      name: 'Clicker',
      description: 'Bag Of Gems',
      currency: 'usd',
      amount: 999
    });
    instance.state.set('currentPack', 'bag')
    instance.state.set('processing', true);
    e.preventDefault();
  });

  document.getElementById('purchaseButtonBox').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Clicker',
      description: 'Box Of Gems',
      currency: 'usd',
      amount: 1999
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
  }
})
