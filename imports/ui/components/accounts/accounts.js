import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Random } from 'meteor/random';

import './accounts.html';

Template.playAsGuestBtn.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.playAsGuestBtn.helpers({
  creatingGuest() {
    return Template.instance().state.get('creatingGuest');
  }
})

Template.playAsGuestBtn.events({
  'click .play-as-guest-btn'(event, instance) {
    const username = `guest_${parseInt(Math.random() * 1000000000)}`;
    const password = Random.id();
    instance.state.set('creatingGuest', true);

    Meteor.call('users.createGuest', { username, password }, (err, res) => {
      if (!err) {
        Meteor.loginWithPassword(username, password, (err, res) => {
          instance.state.get('creatingGuest', false);
        });
      } else {
        instance.state.get('creatingGuest', false);
      }
    });
  }
});
