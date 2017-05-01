import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';

import { Users } from '/imports/api/users/users';
import { Groups } from '/imports/api/groups/groups.js';

import './chatWindow.html';

Template.chatWindow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('minimized', true);
  this.state.set('currentRoom', 'General');

  this.autorun(() => {
    let minimized = true;
    let myUserDoc = Users.findOne({ _id: Meteor.userId() });
    if (myUserDoc && myUserDoc.uiState && myUserDoc.uiState.showChat !== undefined) {
      minimized = !myUserDoc.uiState.showChat;      
    }

    if (myUserDoc && myUserDoc.isMutedExpiry && moment().isBefore(myUserDoc.isMutedExpiry)) {
      toastr.error(`You will be unmuted in ${moment(myUserDoc.isMutedExpiry).fromNow()}. Please keep things civil.`);
    }

    this.state.set('minimized', minimized);
  });

});

Template.chatWindow.events({
  'click .chat-minimized'(event, instance) {
    instance.state.set('minimized', false); // Do instantly in UI to avoid delay
    Meteor.call('users.setUiState', 'showChat', true)
  },

  'click .minimize-icon'(event, instance) {
    instance.state.set('minimized', true); // Do instantly in UI to avoid delay
    Meteor.call('users.setUiState', 'showChat', false)
  },

  'click .room-general'(event, instance) {
    instance.state.set('currentRoom', 'General');
  },

  'click .room-other'(event, instance) {
    instance.state.set('currentRoom', 'Other');
  },

  'click .room-bugs'(event, instance) {
    instance.state.set('currentRoom', 'Bugs');
  },

  'click .room-party'(event, instance) {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });
    instance.state.set('currentRoom', currentGroup._id);
  }
})

Template.chatWindow.helpers({
  minimized() {
    return Template.instance().state.get('minimized');
  },

  currentRoom() {
    return Template.instance().state.get('currentRoom');
  },

  currentGroup() {
    return Groups.findOne({
      members: Meteor.userId()
    });
  },
});
