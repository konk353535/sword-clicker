import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Random } from 'meteor/random';

import { Groups } from '/imports/api/groups/groups';
import { Crafting } from '/imports/api/crafting/crafting';
import { Battles, BattlesList } from '/imports/api/battles/battles';

import './gameHome.html';

Template.gameHomePage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.subscribe('mining');
  Meteor.subscribe('crafting');
});

Template.gameHomePage.helpers({
  creatingGuest() {
    return Template.instance().state.get('creatingGuest');
  },

  firstCrafting() {
    const crafting = Crafting.findOne({});

    if (!crafting || crafting.currentlyCrafting.length === 0) {
      return false;
    }

    return crafting.currentlyCrafting[0];
  },

  lastCrafting() {
    const crafting = Crafting.findOne({});
    if (!crafting || crafting.currentlyCrafting.length === 0) {
      return;
    }

    return crafting.currentlyCrafting[crafting.currentlyCrafting.length - 1];
  },

  otherCrafting() {
    const crafting = Crafting.findOne({});

    if (!crafting || crafting.currentlyCrafting.length <= 1) {
      return false;
    }

    return crafting.currentlyCrafting.slice(1);
  },

  firstPendingInvite() {
    return Groups.findOne({
      invites: Meteor.userId()
    });
  },

  inCurrentBattle() {
    const currentBattleList = BattlesList.findOne({
      owners: Meteor.userId(),
      activated: true
    });
    return !!currentBattleList;
  }
});

Template.gameHomePage.events({
  'click .play-as-guest-btn'(event, instance) {
    const username = `guest_${parseInt(Math.random() * 1000000000)}`;
    const password = Random.id();
    instance.state.set('creatingGuest', true);

    Meteor.call('users.createGuest', { username, password }, (err, res) => {
      if (!err) {
        Meteor.loginWithPassword(username, password, (err, res) => {
          instance.state.get('creatingGuest', false);
        });
      } else {
        instance.state.get('creatingGuest', false);
      }
    });
  },

  'click .accept-party-invite'(event, instance) {
    // Get target data
    const inviteId = instance.$(event.target).closest('.accept-party-invite').data('id');

    Meteor.call('groups.acceptInvite', inviteId, true, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .decline-party-invite'(event, instance) {
    const inviteId = instance.$(event.target).closest('.decline-party-invite').data('id');
    Meteor.call('groups.acceptInvite', inviteId, false);
  },

  'click .cancel-crafting'(event, instance) {
    const endDate = instance.$(event.target).closest('.cancel-crafting').attr('data-enddate');
    Meteor.call('crafting.cancelCraft', moment(endDate).toDate());
  }
});

Template.firstCraftingUI.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('percentage', 0);

  this.autorun(() => {
    const craftingProcess = this.data.data;
    const startDate = moment(craftingProcess.startDate);

    const endDate = moment(craftingProcess.endDate).add(150, 'milliseconds');
    const nowTimeStamp = TimeSync.serverTime();
    const now = moment(nowTimeStamp);

    // Generate time remaining
    const secondsRemaining = moment.duration(endDate.diff(now)).asSeconds();
    const totalTime = moment.duration(endDate.diff(startDate)).asSeconds();

    // Generate % remaining
    const percentage = ((totalTime - secondsRemaining) / totalTime) * 100;

    craftingProcess.percentage = percentage;

    if (craftingProcess.percentage < 0) {
      craftingProcess.percentage = 0;
    }

    craftingProcess.humanReadable = moment.duration(endDate.diff(now)).humanize(true);

    this.state.set('computedCraftingProcess', craftingProcess);
  });
});

Template.firstCraftingUI.helpers({
  computedCraftingProcess() {
    const instance = Template.instance();
    return instance.state.get('computedCraftingProcess');
  }
});
