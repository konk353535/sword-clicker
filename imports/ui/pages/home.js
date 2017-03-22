import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './home.html';

Template.homePage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.call('battles.currentFloorHighscores', (err, res) => {
    this.state.set('currentFloorHighscores', res);
    this.state.set('currentFloor', res[0].floor);
  });
});

Template.homePage.helpers({
  currentFloorHighscores() {
    return Template.instance().state.get('currentFloorHighscores').map((highscore, index) => {
      highscore.rank = index + 1;
      return highscore;
    });
  },

  currentFloor() {
    return Template.instance().state.get('currentFloor');
  }
})
