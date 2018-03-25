import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Random } from 'meteor/random';

import { Groups } from '/imports/api/groups/groups';
import { FarmingSpace } from '/imports/api/farming/farming';
import { Crafting } from '/imports/api/crafting/crafting';
import { Adventures } from '/imports/api/adventures/adventures.js';
import { Friends, FriendRequests } from '/imports/api/friends/friends.js';
import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Users } from '/imports/api/users/users';

import './gameHome.html';

Template.gameHomePage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('showPickAll', false);
  this.state.set('showAddFriends', false);
  this.state.set('userSuggestions', []);

  this.autorun(() => {
    const nowTimeStamp = TimeSync.serverTime();
    const now = moment(nowTimeStamp);

    const showPickAll = FarmingSpace.find().fetch().find((space) => {
      return now.isAfter(space.maturityDate) && space.plantId;
    });

    this.state.set('showPickAll', !!showPickAll);
  });

  Tracker.autorun(() => {
    const friendsObject = Friends.findOne({});
    if (friendsObject) {
      Meteor.subscribe('friendsFeed', friendsObject.friends.join(','));
    }
  });

  Meteor.subscribe('friends');
  Meteor.subscribe('mining');
  Meteor.subscribe('crafting');
  Meteor.subscribe('friendRequests');
  Meteor.subscribe('farmingSpace');
});

Template.gameHomePage.helpers({

  friendsList() {
    return Users.find({
      _id: {
        $not: Meteor.userId()
      }
    }, {
      sort: {
        lastActionDate: -1
      }
    });
  },

  sentFriendRequests() {
    return FriendRequests.find({
      sender: Meteor.userId()
    }).fetch();
  },

  firstRecievedFriendRequest() {
    return FriendRequests.findOne({
      reciever: Meteor.userId()
    });
  },

  showAddFriends() {
    return Template.instance().state.get('showAddFriends');
  },

  search(query, sync, callback) {
    Meteor.call('users.search', query, {}, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      callback(res.map(function(v){ return {value: v.username}; }));
    });
  },

  activeAdventures() {
    return Adventures.findOne({}).adventures.filter((adventure) => {
      return adventure.startDate;
    });
  },

  lastAdventure() {
    const adventures = Adventures.findOne({}).adventures.filter((adventure) => {
      return !!adventure.startDate;
    });
    return adventures.pop();
  },

  lastGrownThing() {
    const growingThings = FarmingSpace.find({
      plantId: {
        $not: null
      }
    }, {
      sort: {
        maturityDate: 1
      }
    }).fetch();

    if (growingThings.length === 0) {
      return false;
    }

    return growingThings.pop();
  },

  showPickAll() {
    return Template.instance().state.get('showPickAll');
  },

  creatingGuest() {
    return Template.instance().state.get('creatingGuest');
  },

  firstCrafting() {
    const crafting = Crafting.findOne({});

    if (!crafting || crafting.currentlyCrafting.length === 0) {
      return false;
    }

    return crafting.currentlyCrafting[0];
  },

  lastCrafting() {
    const crafting = Crafting.findOne({});
    if (!crafting || crafting.currentlyCrafting.length === 0) {
      return;
    }

    return crafting.currentlyCrafting[crafting.currentlyCrafting.length - 1];
  },

  otherCrafting() {
    const crafting = Crafting.findOne({});

    if (!crafting || crafting.currentlyCrafting.length <= 1) {
      return false;
    }

    return crafting.currentlyCrafting.slice(1);
  },

  firstPendingInvite() {
    return Groups.findOne({
      invites: Meteor.userId()
    });
  },

  inCurrentBattle() {
    const currentBattleList = BattlesList.findOne({
      owners: Meteor.userId(),
      activated: true
    });
    return !!currentBattleList;
  },

  farmingSpaces() {
    return FarmingSpace.find({});
  },
});

Template.gameHomePage.events({

  'submit .friend-invite'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const text = Template.instance().$('#add-friend-input').val();
 
    // Send invite request
    Meteor.call('friends.invite', text, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
 
    // Clear input
    Template.instance().$('#add-friend-input').val('');
  },

  'blur #add-friend-input'(event, instance) {
    setTimeout(() => {
      instance.state.set('showAddFriends', false);
    }, 500);
  },

  'click .add-friends'(event, instance) {
    instance.state.set('showAddFriends', true);
    setTimeout(() => {
      if (!$('.tt-hint').length) {
        Meteor.typeahead.inject();
      }
      $('#add-friend-input').focus();
    }, 100);
  },

  'click .collect-plants'(event, instance) {
    Meteor.call('farming.pick', 'all');
  },

  'click .play-as-guest-btn'(event, instance) {
    const username = `guest_${parseInt(Math.random() * 1000000000)}`;
    const password = Random.id();
    instance.state.set('creatingGuest', true);

    Meteor.call('users.createGuest', { username, password }, (err, res) => {
      if (!err) {
        Meteor.loginWithPassword(username, password, (err, res) => {
          instance.state.get('creatingGuest', false);
        });
      } else {
        instance.state.get('creatingGuest', false);
      }
    });
  },

  'click .accept-party-invite'(event, instance) {
    // Get target data
    const inviteId = instance.$(event.target).closest('.accept-party-invite').data('id');

    Meteor.call('groups.acceptInvite', inviteId, true, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .decline-party-invite'(event, instance) {
    const inviteId = instance.$(event.target).closest('.decline-party-invite').data('id');
    Meteor.call('groups.acceptInvite', inviteId, false);
  },

  'click .accept-friend-invite'(event, instance) {
    // Get target data
    const sender = instance.$(event.target).closest('.accept-friend-invite').data('sender');

    Meteor.call('friends.accept', sender, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .decline-friend-invite'(event, instance) {
    const sender = instance.$(event.target).closest('.decline-friend-invite').data('sender');
    Meteor.call('friends.decline', sender, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .cancel-friend-request'(event, instance) {
    const reciever = instance.$(event.target).closest('.cancel-friend-request').data('reciever');
    Meteor.call('friends.cancel', reciever, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .cancel-crafting'(event, instance) {
    const endDate = instance.$(event.target).closest('.cancel-crafting').attr('data-enddate');
    Meteor.call('crafting.cancelCraft', moment(endDate).toDate());
  }
});

Template.firstCraftingUI.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('percentage', 0);

  this.autorun(() => {
    const craftingProcess = this.data.data;
    const startDate = moment(craftingProcess.startDate);

    const endDate = moment(craftingProcess.endDate).add(150, 'milliseconds');
    const nowTimeStamp = TimeSync.serverTime();
    const now = moment(nowTimeStamp);

    // Generate time remaining
    const secondsRemaining = moment.duration(endDate.diff(now)).asSeconds();
    const totalTime = moment.duration(endDate.diff(startDate)).asSeconds();

    // Generate % remaining
    const percentage = ((totalTime - secondsRemaining) / totalTime) * 100;

    craftingProcess.percentage = percentage;

    if (craftingProcess.percentage < 0) {
      craftingProcess.percentage = 0;
    }

    craftingProcess.humanReadable = moment.duration(endDate.diff(now)).humanize(true);

    this.state.set('computedCraftingProcess', craftingProcess);
  });
});

Template.firstCraftingUI.helpers({
  computedCraftingProcess() {
    const instance = Template.instance();
    return instance.state.get('computedCraftingProcess');
  }
});

Template.friendRow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    const computedFriend = this.data.friend;

    const nowTimeStamp = TimeSync.serverTime();
    const now = moment(nowTimeStamp);

    const lastActionDate = moment(computedFriend.lastActionDate);

    if (now.isAfter(lastActionDate.add(5, 'minutes'))) {
      computedFriend.afk = true;
    } else {
      computedFriend.afk = false;
    }

    this.state.set('computedFriend', computedFriend);
  });
});

Template.friendRow.events({
  'click .join-group'(event, instance) {
    Meteor.call('groups.join', instance.data.friend.partyId);
  },

  'click .invite-to-group'(event, instance) {
    Meteor.call('groups.invite', instance.data.friend.username, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  }
})

Template.friendRow.helpers({
  computedFriend() {
    const instance = Template.instance();
    return instance.state.get('computedFriend');
  },

  canInvite() {
    const currentGroup = Groups.findOne({});

    return !currentGroup || (
      currentGroup.leader === Meteor.userId() && currentGroup.members.length < 5
    );
  }
});
