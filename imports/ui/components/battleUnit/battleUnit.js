import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './battleUnit.html';

Template.battleUnit.helpers({
  healthPercentage() {
    const stats = Template.instance().data.unit.stats;
    const healthPercentage = (stats.health / stats.healthMax) * 100;

    return healthPercentage;
  }
});
