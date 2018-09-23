import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './battleUnit.html';

Template.battleUnit.events({
  'click .icon-box'(event, instance) {
    instance.data.unitClicked(instance.data.unit.id);
  }
});

Template.battleUnit.helpers({
  healthPercentage() {
    const stats = Template.instance().data.unit.stats;
    const healthPercentage = (stats.health / stats.healthMax) * 100;

    return healthPercentage;
  },

  energyPercentage() {
    const stats = Template.instance().data.unit.stats;
    const energyPercentage = (stats.energy / stats.energyMax) * 100;

    return energyPercentage;
  }
});
