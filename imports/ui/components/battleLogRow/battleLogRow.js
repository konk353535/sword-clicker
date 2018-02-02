import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './battleLogRow.html';

Template.battleLogRow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.battleLogRow.events({
  'click .show-more'(event, instance) {
    instance.state.set('showMore', true);
  },

  'click .show-less'(event, instance) {
    instance.state.set('showMore', false);
  },
});

Template.battleLogRow.helpers({
  computedBattle() {
    const instance = Template.instance();
    const battle = instance.data.battle;

    battle.myTickEvents = battle.finalTickEvents.filter((tickEvent) => {
      return tickEvent.owner === Meteor.userId();
    });

    battle.detailedStats = [];

    if (battle.historyStats) {
      battle.detailedStats = Object.keys(battle.historyStats).map((key) => {
        return Object.assign({}, battle.historyStats[key], {
          owner: key
        });
      });
    }

    // Iterate on detailed stats & add tick events in
    battle.detailedStats.forEach((detailedStats) => {
      detailedStats.tickEvents = battle.finalTickEvents.filter((tickEvent) => {
        return tickEvent.owner === detailedStats.owner;
      });
    })

    console.log('battle', battle);

    return battle;
  },

  computedLoot() {
    const instance = Template.instance();
    const battle = instance.data.battle;
    let needGreed = [];

    if (battle.loot.length > 0) {
      needGreed = battle.loot.map((loot) => {
        return Object.assign(loot, {ngChoice: loot.owners.find((owner) => { return owner.id === Meteor.userId() }).ngChoice});
      })
    }

    console.log('ng', needGreed);

    return needGreed;
  },

  showMore() {
    return Template.instance().state.get('showMore');
  }
});
