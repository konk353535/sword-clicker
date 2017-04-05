import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './mineSpace.html';

import { Mining } from '/imports/api/mining/mining.js';

let warningShown = false;
Template.mineSpace.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.mineSpace.events({
  'click'(event, instance) {
    const myMining = Mining.findOne({ owner: Meteor.userId() });

    if (instance.data.mineSpace.oreId) {
      if (myMining.stats.energy > myMining.stats.energyPerHit) {
        Meteor.call('mining.clickedMineSpace', instance.data.mineSpace._id);
        // Show mining damage in UI
        const offset = instance.$(event.target).offset();
        const color = 'red';

        // Determine left based on tick # + tickEventIndex
        offset.left += -20 + (Math.round(Math.random() * 50)); // -20 to 30

        let element = `
          <p
            class='floating-text'
            data-count=1
            style='top: ${offset.top}px; left: ${offset.left}px; opacity: 1.0; color: ${color}'>
            <i class="lilIcon-mining"></i>
            ${myMining.stats.attack}
          </p>
        `;

        $('body').append(element);
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

Template.mineSpace.rendered = function () {
  /*
  const mineSpaceTooltip = new Drop({
    target: Template.instance().$('.mine-space-container')[0],
    content: Template.instance().$('.mine-space-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
  */
}

Template.mineSpace.helpers({
  isEmpty() {
    return !this.mineSpace.oreId;
  }
});
