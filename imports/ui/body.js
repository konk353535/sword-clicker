import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import moment from 'moment';

import './body.html';

let miningTimer;
let woodcuttingTimer;
let combatTimer;
let floatingTextTimer;

Template.body.onCreated(function () {

  this.autorun(() => {
    // Check for gold to make sure we have the full user doc
    if (Meteor.user() && Meteor.user().gold && !Meteor.user().uiState) {
      Meteor.call('users.initUiState');
    }
  });

  // Store if the user is an active membership in session
  Tracker.autorun(() => {
    if (Meteor.user()) {
      if (moment().isBefore(Meteor.user().membershipTo)) {
        console.log('true');
        Session.set('isMember', true);
      } else {
        console.log('false');
        Session.set('isMember', false);
      }
    }
  })

  miningTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('mining.gameUpdate');
    }
  }, 17000);

  woodcuttingTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('woodcutting.gameUpdate');
    }
  }, 19000);

  combatTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('combat.gameUpdate');
    }
  }, 23000);

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

Handlebars.registerHelper('isMember', function (id) {
  return Session.get('isMember');
});

Template.body.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(combatTimer);
  Meteor.clearInterval(miningTimer);
  Meteor.clearInterval(woodcuttingTimer);
  Meteor.clearInterval(floatingTextTimer);
});
