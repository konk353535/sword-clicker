import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './lobby.html';

const TYPES = {
  solo: 'Solo',
  group: 'Tower',
  afk: 'Adventure',
}

Template.lobbyPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('type', 'solo');
});

Template.lobbyPage.events({
  'click .select-type'(event, instance) {
    const newType = instance.$(event.target).closest('.select-type').data('type');
    instance.state.set('type', newType);
  },

  'click .loadout-btn'(event, instance) {
    instance.data.setPage('loadout');
  }

})

Template.lobbyPage.helpers({
  typeKey() {
    return Template.instance().state.get('type');
  },

  type() {
    return TYPES[Template.instance().state.get('type')];
  }
});
