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
    instance.state.set('creatingGuest', true);

    Meteor.call('users.createGuest', (err, res) => {
      if (err) {
        return instance.state.get('creatingGuest', false);
      }

      const {username, password} = res;
      Meteor.loginWithPassword(username, password, (err, res) => {
        instance.state.get('creatingGuest', false);
      });
    });
  }
});
