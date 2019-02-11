import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Users } from '/imports/api/users/users.js';
import { Items } from '/imports/api/items/items.js';
import { Mining } from '/imports/api/mining/mining.js';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting.js';
import { Abilities } from '/imports/api/abilities/abilities.js';
import { Battles } from '/imports/api/battles/battles.js';
import { FarmingSpace } from '/imports/api/farming/farming.js';

import './tutorial.html';

let tipInterval;
Template.tutorial.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('showTip', false);
  this.state.set('showTipTimer', 25);

  tipInterval = Meteor.setInterval(() => {
    const showTip = this.state.get('showTip');
    let showTipTimer = this.state.get('showTipTimer');

    showTipTimer -= 1;
    if (showTipTimer <= 0) {
      this.state.set('showTipTimer', showTip ? 25 : 6);
      this.state.set('showTip', !showTip)
    } else {
      this.state.set('showTipTimer', showTipTimer);
    }
  }, 1000);
});

Template.tutorial.events({
});

Template.tutorial.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(tipInterval);
});

Template.tutorial.helpers({

  showTip() {
    return Template.instance().state.get('showTip');
  },

  stepData() {
    const tutorial = Users.findOne({}).tutorial;
    if (tutorial) {
      const currentStep = tutorial.currentStep;
    
      if (currentStep === 1) {
        // Mine some ores!
        const required = 6;
        const stones = Items.findOne({ itemId: 'ore_stone' });
        if (stones && stones.amount >= required) {
          Meteor.call('users.tutorialUpdate', {
            hideCrafting: false,
            highlightCrafting: true,
            currentStep: 2
          });
        }

        const current = stones ? stones.amount : 0;
        const completedStepsArray = [];
        const awaitingStepsArray = [];
        for (let i = 0; i < current; i++) { completedStepsArray.push(true); }
        for (let i = 0; i < (required - current); i++) { awaitingStepsArray.push(true); }

        return {
          text: `Mined ${current} / 6 stones`,
          current,
          required,
          tip: 'Click or tap stones to mine them',
          completedStepsArray,
          awaitingStepsArray
        }
      } else if (currentStep === 2) {
        // Craft a pickaxe
        const required = 2;
        const current = Items.find({ itemId: 'primitive_pickaxe' }).fetch().length;
        if (current >= 2) {
          Meteor.call('users.tutorialUpdate', {
            highlightCrafting: false,
            highlightMiningEquipment: true,
            hideMiningEquipment: false,
            currentStep: 3
          });
        }

        const completedStepsArray = [];
        const awaitingStepsArray = [];
        for (let i = 0; i < current; i++) { completedStepsArray.push(true); }
        for (let i = 0; i < (required - current); i++) { awaitingStepsArray.push(true); }

        return {
          text: `Crafted ${current} / 2 primitive pickaxes`,
          current,
          required,
          tip: 'Craft page',
          completedStepsArray,
          awaitingStepsArray
        }
      } else if (currentStep === 3) {
        const primitivePickAxe = Items.findOne({ itemId: 'primitive_pickaxe', equipped: true });
        const current = primitivePickAxe ? primitivePickAxe.amount : 0;
        const required = 1;
        if (primitivePickAxe && primitivePickAxe.amount >= required) {
          Meteor.call('users.tutorialUpdate', {
            highlightMiningEquipment: false,
            highlightMiningMiners: true,
            hideMiningMiners: false,
            currentStep: 4
          });
        }

        const completedStepsArray = [];
        const awaitingStepsArray = [];
        for (let i = 0; i < current; i++) { completedStepsArray.push(true); }
        for (let i = 0; i < (required - current); i++) { awaitingStepsArray.push(true); }

        return {
          text: `Equip pickaxe`,
          current,
          required,
          tip: 'Mine page > Equipment tab',
          completedStepsArray,
          awaitingStepsArray
        }
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

        return {
          text: 'Hire a miner',
          current: 0,
          required: 1,
          tip: 'Mine page > Miners tab',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
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

        return {
          text: 'Hire a prospector',
          current: 0,
          required: 1,
          tip: 'Mine page > Prospectors tab',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
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

        return {
          text: 'Craft a primitive axe',
          current: 0,
          required: 1,
          tip: 'Craft page',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
      } else if (currentStep === 7) {
        const woodcutting = Woodcutting.findOne({});
        if (woodcutting && woodcutting.woodcutters && woodcutting.woodcutters.length >= 1) {
          Meteor.call('users.tutorialUpdate', {
            currentStep: 8
          });
        }

        return {
          text: 'Hire a woodcutter',
          current: 0,
          required: 1,
          tip: 'Woodcut page',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
      } else if (currentStep === 8) {
        const woodcutting = Woodcutting.findOne({});
        if (woodcutting && woodcutting.woodcutters && woodcutting.woodcutters.length >= 1) {
          let isSuiciding = false;
          woodcutting.woodcutters.forEach((woodcutter) => {
            if (woodcutter.deathTime) {
              isSuiciding = true;
            }
          });
          if (isSuiciding) {
            Meteor.call('users.tutorialUpdate', {
              currentStep: 9,
              highlightWoodcutting: false,
              highlightCrafting: true
            });
            Meteor.call('users.setUiState', 'craftingFilter', 'all');
          }
        }

        return {
          text: 'Retire a woodcutter',
          current: 0,
          required: 1,
          tip: 'Woodcut page > click on a woodcutter',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
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

        return {
          text: 'Craft a copper dagger',
          current: 0,
          required: 1,
          tip: 'Craft page > Combat tab',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
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

        return {
          text: 'Equip a copper dagger',
          current: 0,
          required: 1,
          tip: 'Battle page > Loadout > Gear Edit',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
      } else if (currentStep === 11) {
        const myAbilities = Abilities.findOne({});

        myAbilities.learntAbilities.forEach((ability) => {
          if (ability.abilityId === 'slash' && ability.equipped) {
            Meteor.call('users.tutorialUpdate', {
              highlightCombatPersonalQuest: true,
              highlightCombatAbilities: false,
              hideCombatPersonalQuest: false,
              currentStep: 12
            });
          }
        });

        return {
          text: 'Equip the Slash ability',
          current: 0,
          required: 1,
          tip: 'Battle page > Loadout > Abilities Edit',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
      } else if (currentStep === 12) {
        const allBattles = Battles.find({}, { limit: 10 });
        allBattles.forEach((battle) => {
          if (battle.level >= 1) {
            Meteor.call('users.tutorialUpdate', {
              highlightCombatPersonalQuest: false,
              highlightCombatTower: false,
              highlightCombat: false,
              hideCombatTower: false,
              hideFarming: false,
              highlightFarming: true,
              hideCombatGroup: false,
              hideCombatBattleLog: false,
              currentStep: 13
            });
          }
        });

        return {
          text: 'Complete a solo battle',
          current: 0,
          required: 1,
          tip: 'Battle page > select Solo type',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
      } else if (currentStep === 13) {
        const letticeSeeds = Items.findOne({ itemId: 'lettice_seed' });
        const current = letticeSeeds ? letticeSeeds.amount : 0;
        const required = 4;
        if (letticeSeeds && letticeSeeds.amount >= required) {
          Meteor.call('users.tutorialUpdate', {
            highlightFarmingPlots: true,
            hideFarmingPlots: false,
            currentStep: 14
          });
          Meteor.call('users.setUiState', 'farmingTab', 'plots');
        }

        const completedStepsArray = [];
        const awaitingStepsArray = [];
        for (let i = 0; i < current; i++) { completedStepsArray.push(true); }
        for (let i = 0; i < (required - current); i++) { awaitingStepsArray.push(true); }

        return {
          text: 'Buy 4 lettuce seeds',
          current,
          required,
          tip: 'Farm page > Shop tab',
          completedStepsArray,
          awaitingStepsArray
        }
      } else if (currentStep === 14) {
        const required = 4;
        const allFarmingSpaces = FarmingSpace.find().fetch();
        const letticesCount = allFarmingSpaces.filter((farmingSpace) => {
          return farmingSpace.plantId === 'lettice';
        }).length;

        if (letticesCount >= required) {
          Meteor.call('users.tutorialUpdate', {
            currentStep: 15
          });
        }

        const current = letticesCount;
        const completedStepsArray = [];
        const awaitingStepsArray = [];
        for (let i = 0; i < current; i++) { completedStepsArray.push(true); }
        for (let i = 0; i < (required - current); i++) { awaitingStepsArray.push(true); }

        return {
          text: 'Plant 4 lettuces',
          current,
          required,
          tip: 'Farm page > Plots tab',
          completedStepsArray,
          awaitingStepsArray
        }
      } else if (currentStep === 15) {
        const required = 4;
        const lettices = Items.findOne({ itemId: 'lettice' });
        if (lettices && lettices.amount >= 4) {
          Meteor.call('users.tutorialUpdate', {
            currentStep: 16,
            hideInscription: false,
            highlightInscription: true,
            highlightFarming: false,
            highlightFarmingPlots: false
          });
        }

        const current = lettices ? lettices.amount : 0;
        const completedStepsArray = [];
        const awaitingStepsArray = [];
        for (let i = 0; i < current; i++) { completedStepsArray.push(true); }
        for (let i = 0; i < (required - current); i++) { awaitingStepsArray.push(true); }

        return {
          text: 'Pick 4 lettuces',
          current,
          required,
          tip: 'Farm page > Plots tab',
          completedStepsArray,
          awaitingStepsArray
        }
      } else if (currentStep === 16) {
        const berserk = Items.findOne({ itemId: 'berserk_level_1_tome' });
        if (berserk && berserk.amount >= 1) {
          Meteor.call('users.tutorialUpdate', {
            highlightInscription: false,
            highlightCombat: true,
            highlightCombatAbilities: true,
            currentStep: 17
          });
        }

        return {
          text: 'Inscribe Berserk (level 1)',
          current: 0,
          required: 1,
          tip: 'Inscribe page > Abilities tab',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
      } else if (currentStep === 17) {
        const myAbilities = Abilities.findOne({});

        if (myAbilities) {
          Meteor.call('users.setUiState', 'showChat', true);
          myAbilities.learntAbilities.forEach((ability) => {
            if (ability.abilityId === 'berserk') {
              Meteor.call('users.tutorialUpdate', {
                currentStep: 18
              });
            }
          });
        }

        return {
          text: 'Learn Berserk',
          current: 0,
          required: 1,
          tip: 'Battle page > Loadout > Abilities Edit',
          completedStepsArray: [],
          awaitingStepsArray: [true]
        }
      }
    }
  }

});
