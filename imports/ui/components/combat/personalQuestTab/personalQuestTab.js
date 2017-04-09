import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './personalQuestTab.html';

Template.personalQuestTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.personalQuestTab.events({

})

Template.personalQuestTab.helpers({
});
