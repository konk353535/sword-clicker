import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import moment from 'moment';

import { Battles } from '/imports/api/battles/battles.js';

import './battleTab.html';

let floatingTextInterval;

Template.battleTab.onCreated(function bodyOnCreated() {
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
    const currentBattle = Battles.findOne({ finished: false });

    if (currentBattle) {
      currentBattle.tickEvents.forEach((tickEvent, tickEventIndex) => {
        const offset = $(`#${tickEvent.to}`).offset();
        let color;
        if (tickEvent.label == 0) {
          color = 'blue';
        } else {
          color = 'red';
        }

        // Determine left based on tick # + tickEventIndex
        offset.left += -20 + ((tickEventIndex % 3) * 45); // -10 to 50

        // Attempt to push floating text down when more then 3
        if (tickEventIndex % 6 >= 3) {
          offset.top += 40;
        }

        let element = `
          <p
            class='floating-text'
            data-count=1
            style='top: ${offset.top}px; left: ${offset.left}px; opacity: 1.0; color: ${color}'>
            <i class="lilIcon-attack"></i>
            ${tickEvent.label}
          </p>
        `;

        $('body').append(element);
      });
    }

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

Template.battleTab.onDestroyed(function () {
  Meteor.clearInterval(floatingTextInterval);
});

const findBattleHandler = function (err, res) {
  if (err) {
    toastr.warning(err.reason);
  }
}

Template.battleTab.events({
  'click .battle-easy-btn'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'easy', findBattleHandler);
  },

  'click .battle-hard-btn'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'hard', findBattleHandler);
  },

  'click .battle-veryHard-btn'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'veryHard', findBattleHandler);
  },

  'click .btn-close-finishedBattle'(event, instance) {
    instance.state.set('finishedBattle', null);
  }
})

Template.battleTab.helpers({
  currentBattle() {
    return Battles.findOne({
      finished: false
    });
  },

  changeTargetAbility() {
    return {
      id: 'changeTarget',
      icon: 'changeTarget',
      description: 'Select a target to attack',
      name: 'Attack Target',
      cooldown: 0,
      targettable: true
    }
  },

  finishedBattle() {
    return Template.instance().state.get('finishedBattle');
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
