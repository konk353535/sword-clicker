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
  Template.chatWindow.endScroll = true;
  $('.direct-chat-messages').animate({scrollTop: 10000}, 300);
  $('.direct-chat-messages').trigger('scroll');
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

  Tracker.autorun(() => {
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

  this.autorun(() => {
    const currentGroup = Groups.findOne();
    Meteor.subscribe("simpleChats", 'General', this.limit.get());
    if (currentGroup) {
      // Current group messages
      Meteor.subscribe("simpleChats", currentGroup._id, this.limit.get());
    }
    // People looking for group
    Meteor.subscribe("simpleChats", 'LFG', this.limit.get());
    // Events relevant to you
    Meteor.subscribe("simpleChats", `Game-${Meteor.userId()}`, this.limit.get());
    this.subscribing = true;
  });
});

// This could probably be better :|
Template.chatWindow.rendered = function () {
  SimpleChat.scrollToEnd();

  this.$('.direct-chat-messages').scroll(function (event) {
    if (event.currentTarget.scrollHeight - event.currentTarget.scrollTop < 350) {
      Template.chatWindow.endScroll = true;
    } else {
      Template.chatWindow.endScroll = false;
    }
  });

  this.autorun(() => {
    if (this.subscriptionsReady()) {
      this.subscribing = false;
      SimpleChat.scrollToEnd(this);
    }
  });

  $(window).on('SimpleChat.newMessage', (e, id, doc) => {
    if (Template.chatWindow.endScroll) {
      SimpleChat.scrollToEnd(this)
    }

    // To do: add some kind of notification logic for Tab Heading?
  });

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

  'keydown #simple-chat-message': function (event) {
    var $message = $(event.currentTarget)
    if (event.which == 13 && $message.val() != '') { // 13 is the enter key event
      event.preventDefault()
      Template.instance().$('button#message-send').click()
    }
  },

  'click button#message-send': function () {
    let template = Template.instance()
    var $message = template.$('#simple-chat-message')
    var text = $message.val()

    // Check for client commands
    if (text.trim().toLowerCase() === '/party') {
      $message.val('');
      template.state.set('currentChat', 'Party')
      return;
    } else if (text.trim().toLowerCase() === '/general') {
      $message.val('');
      template.state.set('currentChat', 'General')
      return;
    } else if (text.trim().toLowerCase() === '/lfg') {
      $message.val('');
      template.state.set('currentChat', 'LFG')
      return;
    }

    if ($message.val() != '') {
      var text = $message.val()
      $message.val('');
      SimpleChat.scrollToEnd(template)
      const currentChatId = template.state.get('currentChat');
      // Room id is based
      const custom = {
        roomType: currentChatId
      }

      let roomId;
      if (currentChatId === 'Party') {
        roomId = Groups.findOne({ members: Meteor.userId() })._id;
      } else {
        roomId = currentChatId;
      }


      Meteor.call('SimpleChat.newMessage', text, roomId, Meteor.user().username, '', Meteor.user().username, custom, function (err, res) {
          if (err) {
              $message.val(text);
          }
      })
    }
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

  isChatPage() {
    if (Template.instance().data) {
      return Template.instance().data.isChatPage;
    }

    return false;
  },

  simpleChats: function () {
    const instance = Template.instance();
    var chats = Chats.find({}, {sort: {date: 1}})
    let handleChanges = chats.observeChanges({
      added: (id, doc) => {
        const username = Meteor.user().username;
        $(window).trigger('SimpleChat.newMessage', [id, doc])
      }
    });

    return chats;
  },

  hasMore: function () {
    return Chats.find({}, {
      sort: { date: 1 },
      limit: Template.instance().limit.get()
    }).count() === Template.instance().limit.get()
  },
});
