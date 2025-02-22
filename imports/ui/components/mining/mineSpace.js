import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';

import './mineSpace.html';

import { Mining } from '/imports/api/mining/mining.js';

let warningShown = false;
Template.mineSpace.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.mineSpace.events({
  'click'(event, instance) {
    const shiftKey = window.event ? window.event.shiftKey : event.originalEvent.shiftKey;
    const myMining = Mining.findOne({ owner: Meteor.userId() });
    let multiplier = 1;

    let membershipMultiplier = 1.0;
    const userDoc = Meteor.user();

    if (userDoc.miningUpgradeTo && moment().isBefore(userDoc.miningUpgradeTo)) {
      membershipMultiplier *= (1 + (DONATORS_BENEFITS.miningBonus / 100));
    }

    let multihit = $('.multihit-value').val();
    multihit = multihit == "1" ? true : false;

    if (shiftKey || multihit) {
      let perHit = myMining.stats.attack * multiplier * membershipMultiplier;
      let hitsRemaining = Math.ceil(instance.data.mineSpace.health / perHit);
      multiplier = Math.min( hitsRemaining, 10);
    }

    if (myMining.stats.energy < (myMining.stats.energyPerHit * multiplier)) {
      multiplier = Math.floor(myMining.stats.energy / myMining.stats.energyPerHit);
      if (multiplier === 0) {
        multiplier = 1;
      }
    }

    if (instance.data.mineSpace.oreId) {
      if (myMining.stats.energy >= (myMining.stats.energyPerHit * multiplier)) {
        Meteor.call('mining.clickedMineSpace', instance.data.mineSpace._id, multiplier);
        // Show mining damage in UI
        const offset = instance.$(event.target).offset();
        const color = 'red';

        // Determine left based on tick # + tickEventIndex
        offset.left += -20 + (Math.round(Math.random() * 50)); // -20 to 30

        let element = $(`
          <p
            class='floating-text'
            data-count=1
            style='top: ${offset.top}px; left: ${offset.left}px; opacity: 1.0; color: ${color}'>
            <i class="lilIcon-mining"></i>
            ${Math.round(myMining.stats.attack * multiplier * membershipMultiplier)}
          </p>
        `);

        $('body').append(element);
        $(element).animateCss('fadeOutUp');
      } else {
        if (!warningShown) {
          toastr.warning(`
            Out of pickaxe energy. Please wait!
            Currently ${myMining.stats.energy.toFixed(1)} / ${myMining.stats.energyStorage.toFixed(1)}`);
          warningShown = true;
          Meteor.setTimeout(() => {
            warningShown = false;
          }, 2000);
        }
      }
    }
  }
});

Template.mineSpace.helpers({
  isEmpty() {
    return !this.mineSpace.oreId;
  },

  ceiledNumber() {
    return Math.ceil(Template.instance().data.mineSpace.health);
  }
});
