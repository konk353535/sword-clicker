import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './achievements.html';

Template.achievementsPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

});

Template.achievementsPage.helpers({

})
