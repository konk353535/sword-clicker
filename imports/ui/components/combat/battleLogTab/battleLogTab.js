import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Battles } from '/imports/api/battles/battles.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './battleLogTab.html';

Template.battleLogTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.battleLogTab.helpers({
  battles() {
    return Battles.find({}, {
      limit: 25,
      sort: {
        updatedAt: -1
      }
    }).map((battle) => {
      battle.finalTickEvents = battle.finalTickEvents.filter((tickEvent) => {
        return tickEvent.owner === Meteor.userId();
      });
      return battle;
    })
  }
});
