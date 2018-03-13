import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './lobby.html';
import '../lobbyUnit/lobbyUnit.js';

const TYPES = {
  solo: 'Solo',
  group: 'Tower',
  afk: 'Adventure',
}

const findBattleHandler = function (err, res) {
  if (err) {
    toastr.warning(err.reason);
  }
}

import { Users } from '/imports/api/users/users.js';
import { Groups } from '/imports/api/groups/groups.js';
import { Items } from '/imports/api/items/items.js';
import { Combat } from '/imports/api/combat/combat.js';
import { Battles } from '/imports/api/battles/battles.js';

Template.lobbyPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.subscribe('battles');

  this.state.set('userSuggestions', []);
  this.state.set('type', 'group');

  this.state.set('currentLevel', 1);
  this.state.set('usersCurrentRoom', 'All');
  this.state.set('usersCurrentFloor', 1);
  this.state.set('floorDetails', {});
  this.state.set('waveDetails', {});
  this.state.set('maxFloor', 1);

  Meteor.subscribe('otherBattlers');

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.towerFloor !== undefined) {
        this.state.set('usersCurrentFloor', myUser.uiState.towerFloor);
      } else {
        this.state.set('usersCurrentFloor', 1);
      }

      if (myUser.uiState && myUser.uiState.questLevel !== undefined) {
        this.state.set('currentLevel', myUser.uiState.questLevel);
      } else if (myUser.personalQuest) {
        this.state.set('currentLevel', myUser.personalQuest.level);
      }

      if (myUser.uiState && myUser.uiState.newCombatType !== undefined) {
        this.state.set('type', myUser.uiState.newCombatType);
      }
    }
  });

  Meteor.call('battles.myFloorContributions', (err, res) => {
    this.state.set('myFloorContributions', res);
  });

  Tracker.autorun(() => {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    if (!currentGroup) {
      return;
    }

    const groupsCombat = Combat.find({
      owner: {
        $in: currentGroup.members
      }
    }).fetch();

    if (groupsCombat.length === currentGroup.members.length) {
      return;
    }

    setTimeout(() => {
      Meteor.subscribe('combat');
    }, 1000);
  });

  Tracker.autorun(() => {
    // TODO: Can replace this call by making the FLOORS constants client side
    Meteor.call('battles.getFloorDetails', parseInt(this.state.get('usersCurrentFloor')), (err, floorDetailsRaw) => {
      if (err) {
        console.log(err);
      } else {
        this.state.set('floorDetails', floorDetailsRaw.floorDetails);
        this.state.set('waveDetails', floorDetailsRaw.waveDetails);
        this.state.set('maxFloor', floorDetailsRaw.maxFloor);
      }
    });
  });

  this.autorun(() => {
    const userDoc = Users.findOne({});
    if (userDoc && userDoc.personalQuest) {
      this.state.set('maxLevel', userDoc.personalQuest.level);
      this.state.set('maxLevelCurrentWave', userDoc.personalQuest.wave);
    }
  });
});

Template.lobbyPage.events({
  'click .select-type'(event, instance) {
    const newType = instance.$(event.target).closest('.select-type').data('type');
    instance.state.set('type', newType);
    Meteor.call('users.setUiState', 'newCombatType', newType);
  },

  'click .loadout-btn'(event, instance) {
    instance.data.setPage('loadout');
  },

  'click .recent-battles-btn'(event, instance) {
    instance.data.setPage('recentBattles');
  },

  'click .other-battlers-btn'(event, instance) {
    instance.data.setPage('otherBattlers');
  },

  'keydown #name'(event, instance) {
    // Get value from form element
    const text = instance.$('#name').val();
    Meteor.call('users.search', text, (err, res) => {
      instance.state.set('userSuggestions', res.map(user => user.username));
    });
  },

  'submit .group-invite'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const text = Template.instance().$('#name').val();
 
    // Send invite request
    Meteor.call('groups.invite', text, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
 
    // Clear input
    Template.instance().$('#name').val('');
  },

  'click .btn-leave'(event) {
    Meteor.call('groups.leave');
  },

  'click .btn-kick'(event, instance) {
    const ownerId = instance.$(event.target).closest('.btn-kick').data('owner');
    Meteor.call('groups.kick', { ownerId });
  },

  'click .btn-promote'(event, instance) {
    const ownerId = instance.$(event.target).closest('.btn-promote').data('owner');
    Meteor.call('groups.transfer', { ownerId });
  },

  'click .select-floor'(event, instance) {
    const selectedFloor = $(event.target).closest('.select-floor')[0].getAttribute('data-floor');
    if (instance.state.get('usersCurrentFloor') !== parseInt(selectedFloor)) {
      instance.state.set('usersCurrentFloor', parseInt(selectedFloor));
      instance.state.set('usersCurrentRoom', 'All');
      Meteor.call('users.setUiState', 'towerFloor', parseInt(selectedFloor));
    }
  },

  'click .select-room'(event, instance) {
    const selectedRoom = $(event.target).closest('.select-room')[0].getAttribute('data-room');
    if (selectedRoom === 'All') {
      instance.state.set('usersCurrentRoom', 'All');
    } else {
      instance.state.set('usersCurrentRoom', parseInt(selectedRoom));
    }
  },

  'click .select-level'(event, instance) {
    const selectedLevel = $(event.target).closest('.select-level')[0].getAttribute('data-level');
    instance.state.set('currentLevel', parseInt(selectedLevel));
    Meteor.call('users.setUiState', 'questLevel', parseInt(selectedLevel));
  },

  'click .battle-btn'(event, instance) {
    const type = instance.state.get('type');
    if (type === 'group') {
      const floor = instance.state.get('usersCurrentFloor');
      const room = instance.state.get('usersCurrentRoom');
      if (room === 'All') {
        Meteor.call('battles.findTowerBattle', floor, 0, findBattleHandler);
      } else {
        Meteor.call('battles.findTowerBattle', floor, room, findBattleHandler);        
      }
    } else if (type === 'solo') {
      const level = instance.state.get('currentLevel');
      const targetWave = instance.state.get('maxLevelCurrentWave');

      Meteor.call('battles.findPersonalBattle', parseInt(level), parseInt(targetWave), findBattleHandler);
    }
  },

  'click .accept-btn'(event, instance) {
    // Get target data
    const inviteId = instance.$(event.target).closest('.accept-btn').data('id');

    Meteor.call('groups.acceptInvite', inviteId, true, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .decline-btn'(event, instance) {
    const inviteId = instance.$(event.target).closest('.decline-btn').data('id');
    Meteor.call('groups.acceptInvite', inviteId, false);
  },

  'click .btn-join-group'(event, instance) {
    const groupId = instance.$(event.target).closest('.btn-join-group').data('id');
    Meteor.call('groups.join', groupId);
  }

})

Template.lobbyPage.rendered = function () {
  Meteor.typeahead.inject();
}

Template.lobbyPage.helpers({
  floorsList() {
    let floorsList = [];
    let maxFloor = Template.instance().state.get('maxFloor');

    for (let i = 0; i < maxFloor; i++) {
      floorsList.push(i + 1)
    }

    return floorsList;
  },

  floorDetails() {
    return Template.instance().state.get('floorDetails');
  },

  typeKey() {
    return Template.instance().state.get('type');
  },

  type() {
    return TYPES[Template.instance().state.get('type')];
  },

  currentGroup() {
    return Groups.findOne({
      members: Meteor.userId()
    });
  },

  floorDetails() {
    return Template.instance().state.get('floorDetails');
  },

  waveDetails() {
    return Template.instance().state.get('waveDetails');
  },

  usersCurrentFloor() {
    return Template.instance().state.get('usersCurrentFloor');
  },

  usersCurrentRoom() {
    return Template.instance().state.get('usersCurrentRoom');
  },

  otherBattlers() {
    const otherBattlers = Groups.find({}, {
      limit: 10,
      sort: {
        lastBattleStarted: -1
      }
    }).fetch();

    return otherBattlers;
  },

  firstPendingInvite() {
    return Groups.findOne({
      invites: Meteor.userId()
    });
  },

  showInvites() {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    const pendingInvites = Groups.find({
      invites: Meteor.userId()
    }).fetch();

    if (pendingInvites.length <= 0) {
      return false;
    } else if (currentGroup && currentGroup.members.length > 1) {
      return false;
    } else if (currentGroup && currentGroup.invites.length > 1) {
      return false;
    }

    return true;
  },

  recentBattles() {
    return Battles.find({}, {
      limit: 1,
      sort: {
        updatedAt: -1
      }
    });
  },

  foodItems() {
    return Items.find({ category: 'food' }).map((item) => {
      item.primaryAction = {
        description: 'eat',
        item,
        method() {
          Meteor.call('items.eat', this.item._id, this.item.itemId);
        }
      }
      return item;
    });
  },

  isLeader() {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    if (!currentGroup) {
      return true;
    }

    return currentGroup.leader === Meteor.userId()
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

  combat() {
    return Combat.findOne({
      owner: Meteor.userId()
    });
  },

  currentGroupMembers() {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    let combats;
    if (currentGroup) {
      combats = Combat.find({
        owner: {
          $in: currentGroup.members
        }
      }).fetch();

      if (currentGroup.invitesDetails && currentGroup.invitesDetails.length > 0) {
        combats = combats.concat(currentGroup.invitesDetails.map((invitee) => {
          invitee.isInvitee = true;
          return invitee;
        }));
      }
    } else {
      combats = Combat.find({
        owner: Meteor.userId()
      }).fetch();
    }


    return combats.map((userCombat) => {
      // Map stuff we want to read into stats
      userCombat.stats = {
        health: userCombat.stats.health,
        healthMax: userCombat.stats.healthMax,
        energy: userCombat.stats.energy,
        energyMax: userCombat.stats.energyMax
      }

      userCombat.name = userCombat.username;
      userCombat.icon = userCombat.characterIcon || 'character.svg';

      return userCombat;
    });
  },

  maxLevel() {
    return Template.instance().state.get('maxLevel');
  },

  maxLevelCurrentWave() {
    return Template.instance().state.get('maxLevelCurrentWave');
  },

  usersCurrentLevel() {
    return Template.instance().state.get('currentLevel');
  },

  levelsList() {
    const maxLevel = Template.instance().state.get('maxLevel');
    if (!maxLevel) {
      return;
    }
    return _.range(maxLevel, 0, -1);
  }
});
