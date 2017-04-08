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
      Meteor.call('shop.purchase', { token: token.id }, (err, res) => {
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

  document.getElementById('purchaseButton').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Clicker',
      description: 'Small Coin Pack',
      zipCode: true,
      currency: 'usd',
      amount: 499
    });
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
