import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './chatWindow.html';

Template.chatWindow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('minimized', false);
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
