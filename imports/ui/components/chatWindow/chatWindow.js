import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './chatWindow.html';

Template.chatWindow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('minimized', true);

  // Hide chat for first second, so that it doesn't block up more important subscriptions
  Meteor.setTimeout(() => {
    this.state.set('minimized', false);
  }, 500);
});

Template.chatWindow.events({
  'click .chat-minimized'(event, instance) {
    instance.state.set('minimized', false);
  },

  'click .minimize-icon'(event, instance) {
    instance.state.set('minimized', true);
  }
})

Template.chatWindow.helpers({
  minimized() {
    return Template.instance().state.get('minimized');
  }
});
