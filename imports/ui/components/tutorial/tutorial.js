import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import { Users } from '/imports/api/users/users.js';
import { Items } from '/imports/api/items/items.js';
import { Mining } from '/imports/api/mining/mining.js';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting.js';

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
        const woodcutting = Woodcutting.findOne({});
        if (woodcutting && woodcutting.woodcutters && woodcutting.woodcutters.length >= 1) {
          Meteor.call('users.tutorialUpdate', {
            currentStep: 8
          });
        }


        return 'Hire a woodcutter';
      } else if (currentStep === 8) {
        const woodcutting = Woodcutting.findOne({});
        if (woodcutting && woodcutting.woodcutters && woodcutting.woodcutters.length >= 1) {
          let isSuiciding = false;
          woodcutting.woodcutters.forEach((woodcutter) => {
            if (woodcutter.deathTime) {
              isSuiciding = true;
            }
          })
          if (isSuiciding) {
            Meteor.call('users.tutorialUpdate', {
              currentStep: 9,
              highlightWoodcutting: false,
              highlightCrafting: true
            });
            Meteor.call('users.setUiState', 'craftingFilter', 'all');
          }
        }

        return 'Suicide a woodcutter';
      } else if (currentStep === 9) {

        const copperDagger = Items.findOne({ itemId: 'copper_dagger' });
        if (copperDagger && copperDagger.amount >= 1) {
          Meteor.call('users.tutorialUpdate', {
            highlightCrafting: false,
            hideCombat: false,
            highlightCombat: true,
            hideCombatEquipment: false,
            highlightCombatEquipment: true,
            currentStep: 10
          });
        }

        return 'Craft a copper dagger';
      } else if (currentStep === 10) {

        const copperDagger = Items.findOne({ itemId: 'copper_dagger', equipped: true });
        if (copperDagger && copperDagger.amount >= 1) {
          Meteor.call('users.tutorialUpdate', {
            highlightCombatEquipment: false,
            highlightCombatAbilities: true,
            hideCombatAbilities: false,
            currentStep: 11
          });
        }

        return 'Equip copper dagger';
      } else if (currentStep === 11) {

        return 'Equip berserk ability';
      }
    }
  }

});
