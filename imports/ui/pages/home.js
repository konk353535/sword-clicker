import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Random } from 'meteor/random';

import { Servers, DEFAULT_SERVER } from '/imports/api/server/servers.js';

import './home.html';

Template.homePage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  // Fetch active users count
  Meteor.call('users.activeUsers', (err, res) => {
    this.state.set('activeUsers', res);
  });
});

Template.homePage.helpers({
  creatingGuest() {
    return Template.instance().state.get('creatingGuest');
  },

  activeUsers() {
    return Template.instance().state.get('activeUsers');
  }

});

Template.homePage.events({
  'click .play-as-guest-btn'(event, instance) {
    instance.state.set('creatingGuest', true);

    // Find server doc for selected server
    const serverDoc = Servers.findOne({
      name: DEFAULT_SERVER
    });
    
    if (!serverDoc) {
      // todo: display error about no servers
      return;
    }
    
    Meteor.call('users.createGuest', serverDoc._id, (err, res) => {
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
