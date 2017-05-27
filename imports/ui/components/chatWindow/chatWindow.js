import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { SimpleChat } from 'meteor/cesarve:simple-chat/config';
import { Chats } from 'meteor/cesarve:simple-chat/collections';

import moment from 'moment';

import { Users } from '/imports/api/users/users';
import { Groups } from '/imports/api/groups/groups.js';

import './chatWindow.html';

SimpleChat.scrollToEnd = function () {
  Template.SimpleChatWindow.endScroll = true;
  $(".direct-chat-messages").animate({scrollTop: $('.scroll-height').height()}, 300);
  $('.direct-chat-messages').trigger('scroll')
}

const AVAILABLE_CHATS = {
  'General': {
    name: 'General',
    id: 'General',
    class: 'chat-General'
  },
  'Party': {
    name: 'Party',
    id: 'Party',
    class: 'chat-Party'
  },
  'LFG': {
    name: 'LFG',
    id: 'LFG',
    class: 'chat-LFG'
  },
  'Game': {
    name: 'Game',
    id: 'Game',
    class: 'chat-Game'
  }
}

Template.chatWindow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('minimized', true);
  this.state.set('currentChat', 'General');

  this.limit = new ReactiveVar(this.limit || SimpleChat.options.limit)

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

  Tracker.autorun(() => {
    const currentGroup = Groups.findOne();
    Meteor.subscribe("simpleChats", 'General', this.limit.get());
    if (currentGroup) {
      // Current group messages
      Meteor.subscribe("simpleChats", currentGroup._id, this.limit.get());
    }
    // People looking for group
    Meteor.subscribe("simpleChats", 'LFG', this.limit.get());
    // Events relevant to you
    Meteor.subscribe("simpleChats", 'Game', this.limit.get());
    this.subscribing = true;
  });
});

// This could probably be better :|
Template.chatWindow.rendered = function () {
  SimpleChat.scrollToEnd();

  Meteor.setTimeout(() => {
    SimpleChat.scrollToEnd();
  }, 1000);

  Meteor.setTimeout(() => {
    SimpleChat.scrollToEnd();
  }, 2500);

  Meteor.setTimeout(() => {
    SimpleChat.scrollToEnd();
  }, 5000);
}

Template.chatWindow.events({
  'click .maximize-icon'(event, instance) {
    instance.state.set('minimized', false); // Do instantly in UI to avoid delay
    Meteor.call('users.setUiState', 'showChat', true)
  },

  'click .change-chat'(event, instance) {
    const chatId = instance.$(event.target).closest('.change-chat').data('chat-id');
    instance.state.set('currentChat', chatId);
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
  },

  'click #simple-chat-load-more': function () {
    let template = Template.instance()
    template.subscribing = true;
    template.limit.set(template.limit.get() + 20)
    template.scroll = template.$('.scroll-height')[0].scrollHeight
    template.$(".direct-chat-messages").animate({scrollTop: 0}, 0);
    template.$('.direct-chat-messages').trigger('scroll')
  }
})

Template.chatWindow.helpers({
  minimized() {
    return Template.instance().state.get('minimized');
  },

  currentRoom() {
    return Template.instance().state.get('currentRoom');
  },

  currentChat() {
    const instance = Template.instance();
    return AVAILABLE_CHATS[instance.state.get('currentChat')];
  },

  availableChats() {
    return Object.keys(AVAILABLE_CHATS).map((chatId) => {
      return AVAILABLE_CHATS[chatId];
    });
  },

  currentGroup() {
    return Groups.findOne({
      members: Meteor.userId()
    });
  },

  simpleChats: function () {
    return Chats.find({}, {sort: {date: 1}})
  },

  hasMore: function () {
    return Chats.find({}, {
      sort: { date: 1 },
      limit: Template.instance().limit.get()
    }).count() === Template.instance().limit.get()
  },
});
