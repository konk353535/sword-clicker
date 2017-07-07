import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';

import './craftingDuration.html';

let called = false;
Template.craftingDuration.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.autorun(() => {
    const craftingProcess = this.data.craftingProcess;
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

    // Simplify this logic to make it less cooked once time syncing is implemented
    if (now.isAfter(endDate)) {
      if (!called) {
        called = true;
        if (this.data.isCrafting) {
          Meteor.call('crafting.updateGame', (err, res) => {
            setTimeout(() => {
              called = false;              
            }, 5000);
          });
        } else {
          Meteor.call('inscription.updateGame', (err, res) => {
            setTimeout(() => {
              called = false;              
            }, 5000);
          });      
        }
      }
      craftingProcess.percentage = 100;
    }

    if (craftingProcess.percentage < 0) {
      craftingProcess.percentage = 0;
    }

    this.state.set('computedCraftingProcess', craftingProcess);
  });
});

Template.craftingDuration.events({
  'click'() {
    const instance = Template.instance();
    if (instance.data.isCrafting) {
      // Cancel the craft for this
      Meteor.call('crafting.cancelCraft', instance.data.craftingProcess.endDate);
    } else if (instance.data.isInscription) {
      // Cancel the craft for this
      Meteor.call('inscription.cancelCraft', instance.data.craftingProcess.endDate);      
    }
  },
})

Template.craftingDuration.helpers({
  computedCraftingProcess() {
    return Template.instance().state.get('computedCraftingProcess');
  }
})
