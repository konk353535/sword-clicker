import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import moment from 'moment';
import _ from 'underscore';

import { Battles } from '/imports/api/battles/battles.js';
import { Abilities } from '/imports/api/abilities/abilities.js';

import '/imports/ui/components/combat/currentBattleUi/currentBattleUi.js';
import './towerTab.html';

Template.towerTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.call('battles.getFloorDetails', (err, floorDetailsRaw) => {
    if (err) {
      console.log(err);
    } else {
      this.state.set('floorDetails', floorDetailsRaw.floorDetails);
      this.state.set('waveDetails', floorDetailsRaw.waveDetails);
      this.state.set('usersCurrentFloor', 1);
    }
  });

  this.autorun(() => {

    const finishedBattle = Battles.findOne({
      finished: true,
      updatedAt: {
        $lte: moment().toDate(),
        $gte: moment().subtract(1, 'second').toDate()
      }
    });

    if (finishedBattle) {
      finishedBattle.finalTickEvents = finishedBattle.finalTickEvents.filter((tickEvent) => {
        return tickEvent.owner === Meteor.userId();
      });
      this.state.set('finishedBattle', finishedBattle);
      if (this.state.get('waveDetails') && finishedBattle.win) {
        if (this.state.get('waveDetails')[`${finishedBattle.difficulty}Waves`] > 0) {
          Meteor.call('battles.getWaveDetails', (err, res) => {
            if (res) {
              this.state.set('waveDetails', res);
            }
          });
        }
      }
    }
  });
});

const findBattleHandler = function (err, res) {
  if (err) {
    toastr.warning(err.reason);
  }
}

Template.towerTab.events({
  'click .battle-easy-btn'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'easy', findBattleHandler);
  },

  'click .battle-hard-btn'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'hard', findBattleHandler);
  },

  'click .battle-veryHard-btn'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'veryHard', findBattleHandler);
  },

  'click .battle-boss-btn'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'boss', findBattleHandler);
  },

  'click .btn-close-finishedBattle'(event, instance) {
    instance.state.set('finishedBattle', null);
  }
})

Template.towerTab.helpers({

  finishedBattle() {
    return Template.instance().state.get('finishedBattle');
  },

  cantBossBattle() {
    const waveDetails = Template.instance().state.get('waveDetails');
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
    console.log('here');
    console.log(Battles.findOne({
      finished: false
    }));
    return Battles.findOne({
      finished: false
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
  }
})
