import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';

import './farmSpace.html';

let farmSpaceInterval;
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
  if (self.data.farmSpace && self.data.farmSpace.plantId && !self.state.get('finishedGrowing')) {
    const farmSpace = self.data.farmSpace;

    const now = moment();
    const targetDate = moment(farmSpace.maturityDate);
    // Update time remaining
    self.state.set('timeRemaining', moment.utc(targetDate.diff(now)).format("HH[h] mm[m] ss[s]"));

    // Update if this is finished growing
    self.state.set('finishedGrowing', moment().isAfter(farmSpace.maturityDate));

    // Update water %
    self.state.set('waterPercentage', (farmSpace.water / farmSpace.waterStorage) * 100);

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
    /*
    if (instance.data.farmSpace.oreId) {
      Meteor.call('mining.clickedfarmSpace', instance.data.farmSpace._id);
    }*/
  }
});

Template.farmSpace.rendered = function () {
  const farmSpaceTooltip = new Drop({
    target: Template.instance().$('.farm-space-container')[0],
    content: Template.instance().$('.farm-space-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}

Template.farmSpace.helpers({
  isEmpty() {
    return !this.farmSpace.plantId;
  },

  finishedGrowing() {
    return Template.instance().state.get('finishedGrowing');
  },

  waterPercentage() {
    return Template.instance().state.get('waterPercentage');
  },

  growthPercentage() {
    return Template.instance().state.get('growthPercentage');
  },

  timeRemaining() {
    return Template.instance().state.get('timeRemaining');
  }
});
