import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './body.html';

let miningTimer;
let woodcuttingTimer;

Template.body.onCreated(function () {

  miningTimer = Meteor.setInterval(function () {
    Meteor.call('mining.gameUpdate');
  }, 11111);

  woodcuttingTimer = Meteor.setInterval(function () {
    Meteor.call('woodcutting.gameUpdate');
  }, 8888);

  // Show items
  Meteor.subscribe('items');
  // Show skills
  Meteor.subscribe('skills');
});

Template.body.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(miningTimer);
  Meteor.clearInterval(woodcuttingTimer);
});
