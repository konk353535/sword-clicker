import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './battleUnit.html';

Template.battleUnit.events({
  'click .icon-box'(event, instance) {
    console.log('Auto Attack');
    const battleId = instance.data.battleId;
    const casterId = Meteor.userId();
    Meteor.call('battles.castAbility', battleId, 'clickAttack', {
      targets: [instance.data.unit.id], caster: casterId
    });
  }
})

Template.battleUnit.helpers({
  healthPercentage() {
    const stats = Template.instance().data.unit.stats;
    const healthPercentage = (stats.health / stats.healthMax) * 100;

    return healthPercentage;
  }
});
