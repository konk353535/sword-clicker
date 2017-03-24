import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './body.html';

let miningTimer;
let woodcuttingTimer;
let combatTimer;
let floatingTextTimer;

Template.body.onCreated(function () {

  miningTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('mining.gameUpdate');
    }
  }, 11111);

  woodcuttingTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('woodcutting.gameUpdate');
    }
  }, 8888);

  combatTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('combat.gameUpdate');
    }
  }, 14111);

  floatingTextTimer = Meteor.setInterval(() => {
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

  // Show items
  Meteor.subscribe('items');
  // Show skills
  Meteor.subscribe('skills');
});

Template.body.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(combatTimer);
  Meteor.clearInterval(miningTimer);
  Meteor.clearInterval(woodcuttingTimer);
  Meteor.clearInterval(floatingTextTimer);
});
