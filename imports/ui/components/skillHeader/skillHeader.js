import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Items } from '/imports/api/items/items.js';

import './skillHeader.html';

Template.skillHeader.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.skillHeader.helpers({
  xpPercentage() {
    const instance = Template.instance();
    return (instance.data.skill.xp / instance.data.skill.xpToLevel) * 100;
  }
})
