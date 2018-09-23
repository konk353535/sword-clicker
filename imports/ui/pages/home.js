import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Random } from 'meteor/random';

import './home.html';

Template.homePage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

});

Template.homePage.helpers({
  creatingGuest() {
    return Template.instance().state.get('creatingGuest');
  }
});

Template.homePage.events({
  'click .play-as-guest-btn'(event, instance) {
    const username = `guest_${Math.floor(Math.random() * 1000000000)}`;
    const password = Random.id();
    instance.state.set('creatingGuest', true);

    Meteor.call('users.createGuest', { username, password }, (err, res) => {
      if (err) {
        instance.state.get('creatingGuest', false);
      } else {
        Meteor.loginWithPassword(username, password, (err, res) => {
          instance.state.get('creatingGuest', false);
        });
      }
    });
  }
});
