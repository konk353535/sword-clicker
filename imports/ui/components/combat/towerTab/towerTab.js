import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import moment from 'moment';
import _ from 'underscore';

import { Battles } from '/imports/api/battles/battles.js';
import { Abilities } from '/imports/api/abilities/abilities.js';
import { Items } from '/imports/api/items/items.js';
import { Users } from '/imports/api/users/users.js';
import { Combat } from '/imports/api/combat/combat.js';

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

  Meteor.call('battles.myFloorContributions', (err, res) => {
    this.state.set('myFloorContributions', res);
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

  'click .battle-deeper'(event, instance) {
    Meteor.call('battles.findTowerBattle', instance.state.get('usersCurrentFloor'), 1, findBattleHandler);
  },

  'click .battle-room-1-row'(event, instance) {
    Meteor.call('battles.findTowerBattle', instance.state.get('usersCurrentFloor'), 1, findBattleHandler);
  },

  'click .battle-room-2-row'(event, instance) {
    Meteor.call('battles.findTowerBattle', instance.state.get('usersCurrentFloor'), 2, findBattleHandler);
  },

  'click .battle-room-3-row'(event, instance) {
    Meteor.call('battles.findTowerBattle', instance.state.get('usersCurrentFloor'), 3, findBattleHandler);
  },

  'click .battle-room-4-row'(event, instance) {
    Meteor.call('battles.findTowerBattle', instance.state.get('usersCurrentFloor'), 4, findBattleHandler);
  },

  'click .battle-room-5-row'(event, instance) {
    Meteor.call('battles.findTowerBattle', instance.state.get('usersCurrentFloor'), 5, findBattleHandler);
  },

  'click .battle-room-6-row'(event, instance) {
    Meteor.call('battles.findTowerBattle', instance.state.get('usersCurrentFloor'), 6, findBattleHandler);
  },

  'click .battle-room-7-row'(event, instance) {
    Meteor.call('battles.findTowerBattle', instance.state.get('usersCurrentFloor'), 7, findBattleHandler);
  },

  'change .official-attempt input'(event, instance) {
     Meteor.call('combat.updateIsTowerContribution', event.target.checked);
  },

  'click .battle-boss-row'(event, instance) {
    Meteor.call('battles.findTowerBattle', instance.state.get('usersCurrentFloor'), 'boss', findBattleHandler);    
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

  theTowerHelpContent() {
    return `
      <p>
        <b>What</b><br />
        The community must work together to progress through the 'Eternal Tower'
      </p>
      <p>
        <b>Why</b><br />
        The top players in point contributions will recieve a powerful reward (see bottom of page)
      </p>
      <p>
        <b>How</b><br />
        Groups of 1-5 players. Further you make it, more points you get.<br />
        3 official attempts a day. Subsequent attempts won't contribute points.
      </p>`
  },

  estimatedRewards() {
    const instance = Template.instance();
    const myContributions = instance.state.get('myFloorContributions');
    const floorDetails = instance.state.get('floorDetails');
    const percentRank = myContributions.rankingPercentage;
    return floorDetails.rewards.map((reward) => {
      if (reward.type === 'item') {
        if (percentRank <= 10) {
          reward.chance = 100;
        } else if (percentRank <= 25) {
          reward.chance = 40;
        } else if (percentRank <= 50) {
          reward.chance = 20;
        } else if (percentRank <= 75) {
          reward.chance = 10;
        } else {
          reward.chance = 5;
        }
      } else if (reward.type === 'gold') {
        reward.goldAmount = (1 - (percentRank / 100)) * reward.amount;
      }

      return reward;
    })
  },

  myFloorContributions() {
    return Template.instance().state.get('myFloorContributions');
  },

  cantBossBattle() {
    const waveDetails = Template.instance().state.get('waveDetails');
    const instance = Template.instance();

    if (instance.state.get('usersCurrentFloor') < instance.state.get('maxFloor')) {
      return false;
    }

    if (waveDetails && waveDetails.points > waveDetails.pointsMax) {
      return false;
    }

    return true;
  },

  combat() {
    return Combat.findOne({
      owner: Meteor.userId()
    });
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

  currentCommunityfloor() {
    const instance = Template.instance();
    return instance.state.get('maxFloor') == instance.state.get('usersCurrentFloor');
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
