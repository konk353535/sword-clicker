import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Users } from '/imports/api/users/users';

import './chatWindow.html';

Template.chatWindow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('minimized', true);

  this.autorun(() => {
    let minimized = true;
    let myUserDoc = Users.findOne({ _id: Meteor.userId() });
    if (myUserDoc && myUserDoc.uiState && myUserDoc.uiState.showChat !== undefined) {
      minimized = !myUserDoc.uiState.showChat;      
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
  }
})

Template.chatWindow.helpers({
  minimized() {
    return Template.instance().state.get('minimized');
  }
});
