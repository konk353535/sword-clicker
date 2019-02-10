import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Users } from '/imports/api/users/users.js';

import './town.html';

Template.townPage.onCreated(function bodyOnCreated() {
  Meteor.subscribe("userData");

  this.state = new ReactiveDict();
  
  Tracker.autorun(() => {
    let isAdmin = false;    
    if (Meteor.user()) {
      const myUser = Meteor.user() ? Meteor.user() : Users.findOne({ _id: Meteor.userId() });    
      if (myUser) {
        isAdmin = myUser.isSuperMod;
      }
    }
    if (!isAdmin) {
      Router.go('/overview');
    }
  });
});

Template.townPage.helpers({
  isAdmin() {
    const myUser = Meteor.user() ? Meteor.user() : Users.findOne({ _id: Meteor.userId() });
    return myUser && myUser.isSuperMod;
  },
});

Template.townPage.events({
});

Template.townPage.onDestroyed(function bodyOnDestroyed() {
});
