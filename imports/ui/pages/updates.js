import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './updates.html';

Template.updatesPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.call('users.readNewUpdates');
});
