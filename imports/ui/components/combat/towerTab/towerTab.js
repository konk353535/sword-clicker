import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import moment from 'moment';
import _ from 'underscore';

import { Battles } from '/imports/api/battles/battles.js';
import { Abilities } from '/imports/api/abilities/abilities.js';
import { Items } from '/imports/api/items/items.js';
import { Users } from '/imports/api/users/users.js';

import './towerTab.html';

Template.towerTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.towerFloor !== undefined) {
        this.state.set('usersCurrentFloor', myUser.uiState.towerFloor);
      } else {
        this.state.set('usersCurrentFloor', 1);
      }
    }
  });

  Tracker.autorun(() => {

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
});

const findBattleHandler = function (err, res) {
  if (err) {
    toastr.warning(err.reason);
  }
}

Template.towerTab.events({

  'click .select-floor'(event, instance) {
    const selectedFloor = $(event.target).closest('.select-floor')[0].getAttribute('data-floor');

    instance.state.set('usersCurrentFloor', parseInt(selectedFloor));
    Meteor.call('users.setUiState', 'towerFloor', parseInt(selectedFloor));
  },

  'click .battle-easy-row'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'easy', findBattleHandler);
  },

  'click .battle-hard-row'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'hard', findBattleHandler);
  },

  'click .battle-veryHard-row'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'veryHard', findBattleHandler);
  },

  'click .battle-boss-row'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'boss', findBattleHandler);    
  }
})

Template.towerTab.helpers({

  floorRewardsHelpContent() {
    return `
      <p>Rewards are distributed when the community completes this floor.</p>
      <b>Guaranteed a drop</b>
      <p>Top 10 players in boss damage and wave contributions</p>
      <b>Chance for a drop</b>
      <p>
        Any player who participated in the tower<br />
        Chance is weighted by how much you contributed
      </p>`;
  },

  cantBossBattle() {
    const waveDetails = Template.instance().state.get('waveDetails');

    if (Template.instance().state.get('usersCurrentFloor') < Template.instance().state.get('maxFloor')) {
      return false;
    }

    if (waveDetails && waveDetails.easyWaves <= 0) {
      if (waveDetails.hardWaves <= 0) {
        if (waveDetails.veryHardWaves <= 0) {
          return false;
        }
      }
    }
    return true;
  },

  inCurrentBattle() {
    return Battles.findOne({
      finished: false
    });
  },

  equippedItemsMap() {
    const equippedItems = Items.find({
      category: 'combat',
      equipped: true
    });

    const equippedMap = {};
    equippedItems.forEach((item) => {
      equippedMap[item.slot] = item;
    });

    return equippedMap;
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

  bossResetDate() {
    return moment().utc().hours(23).minutes(59).seconds(59);
  },

  maxFloor() {
    return Template.instance().state.get('maxFloor');
  },

  floorsList() {
    let floorsList = [];
    let maxFloor = Template.instance().state.get('maxFloor');

    for (let i = 0; i < maxFloor; i++) {
      floorsList.push(i + 1)
    }

    return floorsList;
  }
})
