import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './woodcuttingStorage.html';

import { determineRequiredItems } from '/imports/ui/utils.js';

import { WOODS } from '/imports/constants/woodcutting/woods.js';
import { STORAGE } from '/imports/constants/woodcutting/storage.js';

import { Woodcutting } from '/imports/api/woodcutting/woodcutting.js';
import { Skills } from '/imports/api/skills/skills.js';

Template.woodcuttingStorage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.woodcuttingStorage.events({
  'click .upgrade-storage'(event, instance) {
    const woodId = instance.$(event.target).closest('.upgrade-storage').attr('data-id');
    Meteor.call('woodcutting.upgradeStorage', woodId);
  }
});

Template.woodcuttingStorage.helpers({
  storageList() {
    const woodcutting = Woodcutting.findOne({});
    const woodcuttingSkill = Skills.findOne({ type: 'woodcutting' });
    if (!woodcutting || !woodcuttingSkill) return [];

    return Object.keys(WOODS).map((key) => {
      return WOODS[key];
    }).filter((log) => {
      return log.requiredAttack <= woodcuttingSkill.level;
    }).map((log) => {
      let storage = log.baseStorage || 50;
      let storageLevel = 0;
      if (woodcutting.storage[log.id]) {
        storageLevel = woodcutting.storage[log.id];
        storage += (storageLevel * 10);
      }

      return {
        id: log.id,
        storage,
        name: log.name,
        icon: log.icon,
        required: STORAGE.costs(storageLevel, log.id)
      };

      return storage
    }).map((log) => {
      let { notMet } = determineRequiredItems(log);

      log.notMet = notMet;
      return log;
    });
  }
});
