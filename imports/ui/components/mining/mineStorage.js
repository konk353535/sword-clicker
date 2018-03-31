import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './mineStorage.html';

import { determineRequiredItems } from '/imports/ui/utils.js';

import { MINING } from '/imports/constants/mining/index.js';

import { Mining } from '/imports/api/mining/mining.js';
import { Skills } from '/imports/api/skills/skills.js';

Template.mineStorage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.mineStorage.events({
  'click .upgrade-storage'(event, instance) {
    const oreId = instance.$(event.target).closest('.upgrade-storage').attr('data-id');
    console.log(oreId);
    Meteor.call('mining.upgradeStorage', oreId);
  }
});

Template.mineStorage.helpers({
  storageList() {
    const mining = Mining.findOne({});
    const miningSkill = Skills.findOne({ type: 'mining' });
    if (!mining || !miningSkill) return [];

    return Object.keys(MINING.ores).map((key) => {
      return MINING.ores[key];
    }).filter((ore) => {
      if (ore.isGem) return false;
      if (/_essence/.test(ore.id)) return false;
      if (ore.id === 'gem') return false;
      return ore.requiredLevel <= miningSkill.level;
    }).map((ore) => {
      let storage = ore.storage && ore.storage.base ? ore.storage.base : 50;
      const storagePerLevel = ore.storage && ore.storage.perLevel ? ore.storage.perLevel : 10;
      let storageLevel = 0;
      if (mining.storage[ore.id]) {
        storageLevel = mining.storage[ore.id];
        storage += (storageLevel * storagePerLevel);
      }

      return {
        id: ore.id,
        storage,
        name: ore.name,
        icon: ore.icon,
        required: MINING.storage.costs(storageLevel, ore.id)
      };

      return storage
    }).map((ore) => {
      let { notMet } = determineRequiredItems(ore);

      ore.notMet = notMet;
      return ore;
    })
  }
});
