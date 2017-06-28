import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';

import './farmSpace.html';

let farmSpaceInterval;
let tooltip;
Template.farmSpace.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('finishedGrowing', false);
  updateFarmSpaceUI(this);

  // Update
  farmSpaceInterval = Meteor.setInterval(function () {
    updateFarmSpaceUI(this);
  }.bind(this), 1000);
});

const updateFarmSpaceUI = function (self) {
    const farmSpace = self.data.farmSpace;

    // Update if this is finished growing
    self.state.set('finishedGrowing', moment().isAfter(farmSpace.maturityDate));

    if (!self.state.get('finishedGrowing')) {
      const now = moment();
      const targetDate = moment(farmSpace.maturityDate);

      // Update time remaining
      self.state.set('timeRemaining', moment.utc(targetDate.diff(now)).format("HH[h] mm[m] ss[s]"));

      // Update water %
      const totalDiff = moment(farmSpace.plantDate).diff(farmSpace.maturityDate);
      const currentDiff = moment(farmSpace.plantDate).diff(moment());
      self.state.set('growthPercentage', (currentDiff / totalDiff) * 100);
    }
}

Template.farmSpace.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(farmSpaceInterval);
});

Template.farmSpace.events({
  'click'(event, instance) {
    if (instance.state.get('finishedGrowing')) {
      Meteor.call('farming.pick', instance.data.farmSpace.index, (err, res) => {
        if (err) {
          TimeSync.resync();
        } else {
          instance.state.set('finishedGrowing', false);
        }
      });
    }

    const shiftKey = window.event ? window.event.shiftKey : event.originalEvent.shiftKey;

    if (shiftKey) {
      // Send kill event for this plant
      Meteor.call('farming.killPlant', instance.data.farmSpace.index);
    }
  }
});

Template.farmSpace.rendered = function () {
  tooltip = new Drop({
    target: Template.instance().$('.farm-space-container')[0],
    content: Template.instance().$('.farm-space-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}

Template.farmSpace.onDestroyed(function () {
  tooltip.destroy();
})

Template.farmSpace.helpers({
  isEmpty() {
    return !this.farmSpace.plantId;
  },

  finishedGrowing() {
    return Template.instance().state.get('finishedGrowing');
  },

  growthPercentage() {
    return Template.instance().state.get('growthPercentage');
  },

  timeRemaining() {
    return Template.instance().state.get('timeRemaining');
  }
});
