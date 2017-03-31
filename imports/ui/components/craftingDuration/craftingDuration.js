import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';

import './craftingDuration.html';

let durationUpdateTimer;
const updateComputedCraftingProcess = function (instance) {
  if (!instance) {
    return;
  }

  const craftingProcess = instance.data.craftingProcess;
  const startDate = moment(craftingProcess.startDate);
  const endDate = moment(craftingProcess.endDate);
  const now = moment();

  // Generate time remaining
  const secondsRemaining = moment.duration(endDate.diff(now)).asSeconds();
  const totalTime = moment.duration(endDate.diff(startDate)).asSeconds();

  // Generate % remaining
  const percentage = ((totalTime - secondsRemaining) / totalTime) * 100;

  craftingProcess.percentage = percentage;

  if (moment().isAfter(endDate)) {
    if (instance.data.isCrafting) {
      Meteor.call('crafting.updateGame');
    } else {
      Meteor.call('inscription.updateGame');      
    }
    craftingProcess.percentage = 100;
  }

  if (craftingProcess.percentage < 0) {
    craftingProcess.percentage = 0;
  }

  instance.state.set('computedCraftingProcess', craftingProcess);
}

Template.craftingDuration.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  updateComputedCraftingProcess(this);

  durationUpdateTimer = Meteor.setInterval(function () {
    updateComputedCraftingProcess(this);
  }.bind(this), 1000);
});

Template.craftingDuration.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(durationUpdateTimer);
});

Template.craftingDuration.helpers({
  computedCraftingProcess() {
    return Template.instance().state.get('computedCraftingProcess');
  }
})
