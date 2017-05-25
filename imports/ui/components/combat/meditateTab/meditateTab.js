import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Combat } from '/imports/api/combat/combat.js';
import { Skills } from '/imports/api/skills/skills.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './meditateTab.html';

Template.meditateTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.meditateTab.events({
  'click .start-meditation'(event, instance) {
    Meteor.call('combat.startMeditation');
  },

  'click .stop-meditation'(event, instance) {
    Meteor.call('combat.stopMeditation');
  },
})

Template.meditateTab.helpers({
  combat() {
    const combatSkills = Skills.find({
      owner: Meteor.userId(),
      type: {
        $in: ['attack', 'defense', 'health']
      }
    }).fetch();

    let totalLevels = 0;
    combatSkills.forEach((skill) => {
      totalLevels += skill.level;
    });

    const combat = Combat.findOne({
      owner: Meteor.userId()
    });

    const now = moment();
    let hoursElapsed = moment.duration(now.diff(combat.meditatingStartDate)).asHours();
    if (hoursElapsed > 24) {
      hoursElapsed = 24;
    }

    combat.totalXpGain = (totalLevels * 10 * hoursElapsed).toFixed(2);

    return combat;
  }
});
