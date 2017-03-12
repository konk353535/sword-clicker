import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import moment from 'moment';

import { Battles } from '/imports/api/battles/battles.js';

import './battleTab.html';

Template.battleTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('battles');

  Meteor.setInterval(() => {
    // Increase height and decrease opacity
    $(".floating-text").each(function(i) {      

      var y = $(this).position().top;
      var count = $(this).data('count');

      if (count > 75) {
        $(this).css('opacity', $(this).css('opacity') - 0.01);
      }

      $(this).css('top', y - 0.5);

      if(count > 100){
        $(this).remove();
      } else {
        $(this).data('count', count + 1);
      }
    });
  }, 20);

  Tracker.autorun(() => {
    const currentBattle = Battles.findOne({ finished: false });

    if (currentBattle) {
      currentBattle.tickEvents.forEach((tickEvent) => {
        const offset = this.$(`#${tickEvent.to}`).offset();
        let color;
        if (tickEvent.label == 0) {
          color = 'blue';
        } else {
          color = 'red';
        }

        offset.left += 75
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
        $gte: moment().subtract(5, 'second').toDate()
      }
    });

    if (finishedBattle) {
      this.$('.battleTabModal').modal('show');
      finishedBattle.finalTickEvents = finishedBattle.finalTickEvents.filter((tickEvent) => {
        return tickEvent.owner === Meteor.userId();
      });
      this.state.set('finishedBattle', finishedBattle);
    }
  });
});

Template.battleTab.events({
  'click .battle-btn'(event, instance) {
    Meteor.call('battles.randomBattle');
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
  }
})
