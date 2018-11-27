import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { SimpleChat } from 'meteor/cesarve:simple-chat/config';
import { Chats } from 'meteor/cesarve:simple-chat/collections';

import moment from 'moment';

import { Users } from '/imports/api/users/users';
import { Groups } from '/imports/api/groups/groups.js';

import './chatWindow.html';

SimpleChat.scrollToEnd = function () {
  if ($(window).width() > 500) {
    Template.chatWindow.endScroll = true;
    const messages = $('.direct-chat-messages');
    messages.animate({scrollTop: 10000}, 300);
    messages.trigger('scroll');
  }
};

SimpleChat.handleObserver = undefined;

const AVAILABLE_CHATS = {
  'General': {
    name: 'General',
    id: 'General',
    class: 'chat-General',
    show: true
  },
  'Party': {
    name: 'Party',
    id: 'Party',
    class: 'chat-Party',
    show: true
  },
  'LFG': {
    name: 'LFG',
    id: 'LFG',
    class: 'chat-LFG',
    show: true
  },
  'Game': {
    name: 'Game',
    id: 'Game',
    class: 'chat-Game',
    show: true
  },
  'Help': {
    name: 'Help',
    id: 'Help',
    class: 'chat-Help',
    show: true
  },
  'Offtopic': {
    name: 'Off Topic',
    id: 'Offtopic',
    class: 'chat-Offtopic',
    show: false
  }
};

Template.chatWindow.onCreated(function bodyOnCreated() {
  return false; // temp debug to test CPU usage
  
  this.state = new ReactiveDict();
  this.state.set('minimized', true);
  this.state.set('currentChat', 'General');
  this.state.set('availableChats', AVAILABLE_CHATS);

  this.limit = new ReactiveVar(this.limit || SimpleChat.options.limit);

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
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });
    const myUserDoc = Users.findOne({ _id: Meteor.userId() });
    const availableChats = this.state.get('availableChats');

    if (!myUserDoc) {
      return;
    }

    if (availableChats.General.show) {
      Meteor.subscribe("simpleChats", `General-${myUserDoc.server}`, this.limit.get());
    }

    if (currentGroup && availableChats.Party.show) {
      // Current group messages
      Meteor.subscribe("simpleChats", currentGroup._id, this.limit.get());
    }

    if (availableChats.LFG.show) {
      // People looking for group
      Meteor.subscribe("simpleChats", `LFG-${myUserDoc.server}`, this.limit.get());
    }

    if (availableChats.Game.show) {
      // Events relevant to you
      Meteor.subscribe("simpleChats", `Game-${Meteor.userId()}`, this.limit.get());
    }

    if (availableChats.Offtopic.show) {
      // Events relevant to you
      Meteor.subscribe("simpleChats", `Offtopic-${myUserDoc.server}`, this.limit.get());
    }

    if (availableChats.Help.show) {
      // Events relevant to you
      Meteor.subscribe("simpleChats", `Help-${myUserDoc.server}`, this.limit.get());
    }

    this.subscribing = true;
  });
});

// This could probably be better :|
Template.chatWindow.rendered = function () {
  return false; // temp debug to test CPU usage
  
  SimpleChat.scrollToEnd();

  this.$('.direct-chat-messages').scroll(function (event) {
    Template.chatWindow.endScroll = event.currentTarget.scrollHeight - event.currentTarget.scrollTop < 350;
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

};

Template.chatWindow.onDestroyed(function templateDestroyedFromDom() {
  // Have to stop this observer manually or we can leak memory!  
  if (SimpleChat.handleObserver) {
    try {
      SimpleChat.handleObserver.stop();
      SimpleChat.handleObserver = undefined;
    } catch (err) {
    }
  }
});

/*
Template.chatWindow.events({
  'click .maximize-icon'(event, instance) {
    instance.state.set('minimized', false); // Do instantly in UI to avoid delay
    Meteor.call('users.setUiState', 'showChat', true)
  },

  'click .btn-hide-chat'(event, instance) {
    const chatId = instance.$(event.target).closest('.btn-hide-chat').data('id');

    const availableChats = instance.state.get('availableChats');
    availableChats[chatId].show = false;
    instance.state.set('availableChats', availableChats);
  },

  'click .btn-show-chat'(event, instance) {
    const chatId = instance.$(event.target).closest('.btn-show-chat').data('id');

    const availableChats = instance.state.get('availableChats');
    availableChats[chatId].show = true;
    instance.state.set('availableChats', availableChats);
  },

  'click .change-chat'(event, instance) {
    const chatId = instance.$(event.target).closest('.change-chat').data('chat-id');
    instance.state.set('currentChat', chatId);
  },

  'click .minimize-btn'(event, instance) {
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
    const $message = $(event.currentTarget);
    if (event.which === 13 && $message.val() !== '') { // 13 is the enter key event
      event.preventDefault();
      Template.instance().$('button#message-send').click()
    }
  },

  'click button#message-send': function () {
    let template = Template.instance();
    let $message = template.$('#simple-chat-message');
    const contents = $message.val().split(' ');
    const command = contents[0].trim().toLowerCase();
    const text = contents.length > 1 ? contents.slice(1).join(' ') : '';

    // Check for client commands
    if (command === '/party' || command === '/p') {
      $message.val(text);
      template.state.set('currentChat', 'Party');
    } else if (command === '/general' || command === '/g') {
      $message.val(text);
      template.state.set('currentChat', 'General');
    } else if (command === '/lfg') {
      $message.val(text);
      template.state.set('currentChat', 'LFG');
    } else if (command === '/help' || command === '/h') {
      $message.val(text);
      template.state.set('currentChat', 'Help');
    } else if (command === '/offtopic' || command === '/ot') {
      $message.val(text);
      template.state.set('currentChat', 'Offtopic');
    }

    if ($message.val() !== '') {
      let text = $message.val();
      $message.val('');
      SimpleChat.scrollToEnd(template);
      const currentChatId = template.state.get('currentChat');
      // Room id is based
      const custom = {
        roomType: currentChatId
      };

      let roomId;
      if (currentChatId === 'Party') {
        roomId = Groups.findOne({ members: Meteor.userId() })._id;
      } else {
        roomId = `${currentChatId}-${Meteor.user().server}`;
      }

      Meteor.call('SimpleChat.newMessage', text, roomId, Meteor.user().username, '', Meteor.user().username, custom, function (err, res) {
          if (err) {
              $message.val(text);
          }
      })
    }
  },

  'click #simple-chat-load-more': function () {
    let template = Template.instance();
    template.subscribing = true;
    template.limit.set(template.limit.get() + 20);
    template.scroll = template.$('.scroll-height')[0].scrollHeight;
    template.$(".direct-chat-messages").animate({scrollTop: 0}, 0);
    template.$('.direct-chat-messages').trigger('scroll')
  }
});
*/

Template.chatWindow.helpers({
  minimized() {
    return false; // temp debug to test CPU usage
    return Template.instance().state.get('minimized');
  },

  wantCondensedChat() {
    return false; // temp debug to test CPU usage
    return Session.get('wantCondensedChat');
  },
  
  currentRoom() {
    return false; // temp debug to test CPU usage
    return Template.instance().state.get('currentRoom');
  },

  currentChat() {
    return false; // temp debug to test CPU usage
    const instance = Template.instance();
    return instance.state.get('availableChats')[instance.state.get('currentChat')];
  },

  availableChats() {
    return false; // temp debug to test CPU usage
    const instance = Template.instance();
    return Object.keys(instance.state.get('availableChats')).map((chatId) => {
      return instance.state.get('availableChats')[chatId];
    });
  },

  currentGroup() {
    return false; // temp debug to test CPU usage
    return Groups.findOne({
      members: Meteor.userId()
    });
  },

  isChatPage() {
    return false; // temp debug to test CPU usage
    if (Template.instance().data) {
      return Template.instance().data.isChatPage;
    }

    return false;
  },

  simpleChats: function () {
    return false; // temp debug to test CPU usage
    const instance = Template.instance();
    const chats = Chats.find({}, {sort: {date: 1}});
    // Have to stop this observer manually or we can leak memory!  https://docs.meteor.com/api/collections.html
    if (SimpleChat.handleObserver) {
      try {
        SimpleChat.handleObserver.stop();
        SimpleChat.handleObserver = undefined;
      } catch (err) {
      }
    }
    SimpleChat.handleObserver = chats.observeChanges({
      added: (id, doc) => {
        const username = Meteor.user().username;
        $(window).trigger('SimpleChat.newMessage', [id, doc])
      }
    });

    return chats;
  },

  hasMore: function () {
    return false; // temp debug to test CPU usage
    return Chats.find({}, {
      sort: { date: 1 },
      limit: Template.instance().limit.get()
    }).count() === Template.instance().limit.get()
  },
});
