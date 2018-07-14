import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Random } from 'meteor/random';
import { Servers } from '/imports/api/servers/servers';

import './accounts.html';

Template.serverSelector.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.subscribe('servers');

  this.autorun(() => {
    this.state.set('selectedServer', Servers.findOne({
      name: 'Classic'
    }));
  });
});

Template.serverSelector.helpers({
  selectedServer() {
    return Template.instance().state.get('selectedServer')
  },

  allServers() {
    return Servers.find();
  }
})

Template.serverSelector.events({
  'click .select-name'(event, instance) {
    const id = instance.$(event.target).closest('.select-name').data('id');
    instance.state.set('selectedServer', Servers.findOne({ 
      _id: id
    }));
  }
});

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
