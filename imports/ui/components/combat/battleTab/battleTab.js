import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Battles } from '/imports/api/battles/battles.js';

import './battleTab.html';

Template.battleTab.onCreated(function bodyOnCreated() {
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
    const currentBattle = Battles.findOne();

    if (currentBattle) {
      currentBattle.tickEvents.forEach((tickEvent) => {
        const offset = this.$(`#${tickEvent.to}`).offset();
        let color;
        if (tickEvent.label == 0) {
          color = 'blue';
        } else {
          color = 'red';
        }

        offset.left += 100
        let element = `
          <p
            class='floating-text'
            data-count=1
            style='top: ${offset.top}px; left: ${offset.left}px; opacity: 1.0; color: ${color}'>
            <i class="icon-attack"></i>
            ${tickEvent.label}
          </p>
        `;
        console.log(element);
        console.log($('body'));
        $('body').append(element);
      });
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
    return Battles.findOne();
  }
})
