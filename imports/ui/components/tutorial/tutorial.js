import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import { Users } from '/imports/api/users/users.js';
import { Items } from '/imports/api/items/items.js';
import { Mining } from '/imports/api/mining/mining.js';

import './tutorial.html';

Template.tutorial.onCreated(function bodyOnCreated() {
});

Template.tutorial.events({
})

Template.tutorial.helpers({

  stepText() {
    const tutorial = Users.findOne({}).tutorial;
    if (tutorial) {
      const currentStep = tutorial.currentStep;
    
      if (currentStep === 1) {
        // Mine some ores!
        const stones = Items.findOne({ itemId: 'ore_stone' });
        if (stones && stones.amount >= 6) {
          Meteor.call('users.tutorialUpdate', {
            hideCrafting: false,
            highlightCrafting: true,
            currentStep: 2
          });
        }

        return `Mined ${stones ? stones.amount : 0} / 6 stones`;
      } else if (currentStep === 2) {
        // Craft a pickaxe
        const primitivePickAxeCounts = Items.find({ itemId: 'primitive_pickaxe' }).fetch().length;
        if (primitivePickAxeCounts >= 2) {
          Meteor.call('users.tutorialUpdate', {
            highlightCrafting: false,
            highlightMiningEquipment: true,
            hideMiningEquipment: false,
            currentStep: 3
          });
        }

        return `Crafted ${primitivePickAxeCounts} / 2 primitive pickaxes`;
      } else if (currentStep === 3) {

        const primitivePickAxe = Items.findOne({ itemId: 'primitive_pickaxe', equipped: true });
        if (primitivePickAxe && primitivePickAxe.amount >= 1) {
          Meteor.call('users.tutorialUpdate', {
            highlightMiningEquipment: false,
            highlightMiningMiners: true,
            hideMiningMiners: false,
            currentStep: 4
          });
        }

        // Equip Pickaxe
        return 'Equip pickaxe';
      } else if (currentStep === 4) {
        const mining = Mining.findOne({});
        if (mining && mining.miners && mining.miners[0].amount > 1) {
          Meteor.call('users.tutorialUpdate', {
            highlightMiningMiners: false,
            highlightMiningProspectors: true,
            hideMiningProspectors: false,
            currentStep: 5
          });
        }

        return 'Hire a miner';
      } else if (currentStep === 5) {
        const mining = Mining.findOne({});
        if (mining && mining.prospectors && mining.prospectors[0].amount > 1) {
          Meteor.call('users.tutorialUpdate', {
            highlightCrafting: true,
            highlightMiningProspectors: false,
            currentStep: 6
          });
          Meteor.call('users.setUiState', 'craftingFilter', 'woodcutting');
        }

        return 'Hire a prospector';
      } else if (currentStep === 6) {

        const primitiveAxe = Items.findOne({ itemId: 'primitive_axe' });
        if (primitiveAxe && primitiveAxe.amount >= 1) {
          Meteor.call('users.tutorialUpdate', {
            highlightCrafting: false,
            hideWoodcutting: false,
            highlightWoodcutting: true,
            currentStep: 7
          });
        }

        return 'Craft a primitive axe';
      } else if (currentStep === 7) {

        return 'Hire a woodcutter';
      }
    }
  }

});
