import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import _ from 'underscore';

import './battleLogRow.html';

const timerDep = new Tracker.Dependency;

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

  'click .ng-selector'(event, instance) {
    const target = $(event.currentTarget);
    let choice = 'need';
    if (target.data('choice') === 'need') {
      choice = 'greed';
    }
    target.data('choice', choice);
    Meteor.call('combat.clickedNeedGreed', target.data('loot-id'), choice);
  }
});

Template.battleLogRow.helpers({
  computedBattle() {
    timerDep.depend();
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
    });

    battle.myLoot = battle.loot.map((loot) => {
      return Object.assign({}, _.omit(loot, 'owners'), {
        ngChoice: loot.owners.find((owner) => { return owner.id === Meteor.userId() }).ngChoice
      })
    });

    battle.timer = 0;

    if (battle.myLoot.length) {
      instance.state.set('showMore', true);
      const countdown = Math.round(-moment.duration(moment().diff(moment(battle.createdAt).add(30, 'second').toDate())).asSeconds());
      if (countdown > 0) {
        battle.timer = countdown;
        setTimeout(function () {
          timerDep.changed();
        }, 1000);
      }
    }

    return battle;
  },

  showMore() {
    return Template.instance().state.get('showMore');
  }
});
