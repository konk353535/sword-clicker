import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import moment from 'moment';

import { Battles } from '/imports/api/battles/battles.js';

import './battleTab.html';

let floatingTextInterval;

Template.battleTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('battles');

  floatingTextInterval = Meteor.setInterval(() => {
    // Increase height and decrease opacity
    $(".floating-text").each(function(i) {      

      var y = $(this).position().top;
      var count = $(this).data('count');

      if (count > 50) {
        $(this).css('opacity', $(this).css('opacity') - 0.01);
      }

      $(this).css('top', y - 1.0);
      if(count > 100){
        $(this).remove();
      } else {
        $(this).data('count', count + 1);
      }
    });
  }, 20);

  // Fetch details for floor 1
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
      currentBattle.tickEvents.forEach((tickEvent) => {
        const offset = $(`#${tickEvent.to}`).offset();
        let color;
        if (tickEvent.label == 0) {
          color = 'blue';
        } else {
          color = 'red';
        }

        offset.left += (-10 + Math.round(Math.random() * 60));
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
      this.$('.battleTabModal').modal('show');
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

Template.battleTab.events({
  'click .battle-easy-btn'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'easy');
  },

  'click .battle-hard-btn'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'hard');
  },

  'click .battle-veryHard-btn'(event, instance) {
    Meteor.call('battles.findBattle', instance.state.get('usersCurrentFloor'), 'veryHard');
  }
})

Template.battleTab.helpers({
  currentBattle() {
    return Battles.findOne({
      finished: false
    });
  },

  finishedBattle() {
    return Template.instance().state.get('finishedBattle');
  },

  floorDetails() {
    return Template.instance().state.get('floorDetails');
  },

  waveDetails() {
    return Template.instance().state.get('waveDetails');
  }
})
