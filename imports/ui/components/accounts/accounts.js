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
    return Servers.find().fetch().filter((server) => {
      return !server.disabled;
    }).map((server) => {
      server.formattedCreatedAt = moment.duration(moment().diff(server.createdAt)).humanize();
      return server;
    });
  }
});

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
});

Template.playAsGuestBtn.events({
  'click .play-as-guest-btn'(event, instance) {
    instance.state.set('creatingGuest', true);

    // This will instead return a username and password
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
