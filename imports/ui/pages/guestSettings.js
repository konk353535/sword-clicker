import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Servers } from '/imports/api/servers/servers';

import './guestSettings.html';

Template.guestSettingsPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('error', '');

  Meteor.subscribe('servers');
});

Template.guestSettingsPage.events({
  'click #at-update-btn'(event, instance) {
    event.preventDefault();

    if (instance.state.get('updating')) {
      return;
    }

    const username = instance.$('#at-field-username').val().trim();
    const email = instance.$('#at-field-email').val().trim();
    const password = instance.$('#at-field-password').val().trim();
    const confirmPassword = instance.$('#at-field-confirm-password').val().trim();
  
    if (!username || username.length < 3) {
      return instance.state.set('error', 'username must be at least 3 characters');
    } else if (username.length > 20) {
      return instance.state.set('error', 'username must be at most 20 characters');
    } else if (/[^a-zA-Z\d\s:_-]/.test(username)) {
      return instance.state.set('error', 'username can only contain alphanumeric characters');
    }
  
    // Make sure password and confirmPassword match
    if (password !== confirmPassword) {
      return instance.state.set('error', 'Passwords do not match!');
    } else if (password === '') {
      return instance.state.set('error', 'You must specify a password');
    } else if (password.length < 6) {
      return instance.state.set('error', 'Password must be at least 6 characters');
    } else if (!email || email === '') {
      return instance.state.set('error', 'You must enter an email address');
    } else {
      instance.state.set('error', '');
    }

    instance.state.set('updating', true);

    // Attempt to update
    Meteor.call('users.updateGuest', {
      username,
      password: {
        digest: SHA256(password),
        algorithm: "sha-256"
      },
      email
    }, (err, res) => {
      instance.state.set('updating', false);
      if (err) {
        return instance.state.set('error', err.reason);
      }

      // Redirect to mining page!, we're done boyz
      Router.go('/');
    })
  }
});

Template.guestSettingsPage.helpers({

  allServers() {
    console.log(Servers.find({}).fetch());
    return Servers.find({});
  },

  error() {
    return Template.instance().state.get('error');
  },

  updating() {
    return Template.instance().state.get('updating');    
  }
});
