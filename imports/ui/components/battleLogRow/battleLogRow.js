import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import _ from 'underscore';

import './battleLogRow.html';

let ngInterval = undefined;

Template.battleLogRow.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('ngCountdown', 0);
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

    if (battle.myLoot.length) {
      instance.state.set('showMore', true);
      instance.state.set('ngTimer', moment(battle.createdAt).add(30, 'second').toDate());
      if (_.isUndefined(ngInterval) ) {
        ngInterval = Meteor.setInterval(function() {
          const countdown = -moment.duration(moment().diff(instance.state.get('ngTimer'))).asSeconds();
          console.log('countdown', countdown);
          if (countdown > 0) {
            instance.state.set('ngCountdown', countdown);
          } else {
            instance.state.set('ngCountdown', 0);
            Meteor.clearInterval(ngInterval);
          }
        }, 1000);
      }
    }

    return battle;
  },

  showMore() {
    return Template.instance().state.get('showMore');
  },

  ngCountdown() {
    const instance = Template.instance();
    return Math.round(instance.state.get('ngCountdown'));
  }
});
