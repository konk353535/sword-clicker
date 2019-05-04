import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import { Crafting } from '/imports/api/crafting/crafting.js';
import { Inscription } from '/imports/api/inscription/inscription.js';
import { FarmingSpace } from '/imports/api/farming/farming.js';
import { Adventures } from '/imports/api/adventures/adventures.js';
import { BattlesList } from '/imports/api/battles/battles.js';
import { Abilities } from '/imports/api/abilities/abilities.js';
import { MiningSpace, Mining } from '/imports/api/mining/mining.js';
import { Groups } from '/imports/api/groups/groups.js';
import { Combat } from '/imports/api/combat/combat.js';

// Component used in the template
import '../farming/farmSpace.js';
import '../craftingDuration/craftingDuration.js';
import '../mining/mineSpace.js';
import '../newCombat/lobbyUnit/lobbyUnit.js';
import './summaryList.html';

let miningPageTimer;
let hasInitGameUpdate = false;

Template.summaryList.onCreated(function bodyOnCreated() {
  // Show mining spaces
  Meteor.subscribe('miningSpace');

  // Listen to group changes
  Meteor.subscribe('groups');
  
  this.autorun(() => {
    if (!hasInitGameUpdate && Mining.findOne()) {
      Meteor.call('mining.gameUpdate');
      hasInitGameUpdate = true;
    }
  });

  miningPageTimer = Meteor.setInterval(function () {
    if (Meteor.user()) {
      Meteor.call('mining.gameUpdate');
    }
  }, 60000);
});

Template.summaryList.onDestroyed(function bodyOnDestroyed() {
  Meteor.clearInterval(miningPageTimer);
});

Template.summaryList.events({
  'click .collect-adventure'(event, instance) {
    const id = instance.$(event.target).closest('.collect-adventure').attr('data-id');
    Meteor.call('adventures.collectAdventure', id, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .cancel-adventure'(event, instance) {
    const id = instance.$(event.target).closest('.cancel-adventure').attr('data-id');
    Meteor.call('adventures.cancelAdventure', id, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },
  
  'click .adventures-nav-link'(event, instance) {
    Meteor.call('users.setUiState', 'newCombatType', 'afk');
  },
  
  'click .group-nav-link'(event, instance) {
    Meteor.call('users.setUiState', 'newCombatType', 'group');
  },
});

Template.summaryList.helpers({

  summaryListDisabled() {
    return Session.get('summaryListDisabled');
  },

  crafting() {
    return Crafting.findOne({});
  },
  
  reforging() {
    const crafting = Crafting.findOne({});
    if (crafting && crafting.currentlyReforging)
      return crafting.currentlyReforging;
    return false;
  },

  inCurrentBattle() {
    return BattlesList.findOne({});
  },

  inscription() {
    return Inscription.findOne();
  },

  farmingSpaces() {
    const userDoc = Meteor.user();
    const hasFarmingUpgrade = userDoc.farmingUpgradeTo && moment().isBefore(userDoc.farmingUpgradeTo);
    
    return FarmingSpace.find().map((farmingSpace) => {
      if (farmingSpace.index === 4 || farmingSpace.index === 5) {
        farmingSpace.active = !!hasFarmingUpgrade;
      }
      return farmingSpace;
    });
  },

  adventures() {
    const myAdventures = Adventures.findOne();
    if (!myAdventures) {
      return [];
    }

    return myAdventures.adventures.filter((adventure) => {
      return adventure.startDate;
    });
  },

  equippedAbilitiesMap() {
    const myAbilities = Abilities.findOne();
    if (!myAbilities) {
      return;
    }

    const equippedAbilities = myAbilities.learntAbilities.filter((ability) => {
      return ability.equipped;
    });

    const equippedMap = {};
    equippedAbilities.forEach((item) => {
      equippedMap[item.slot] = item;
    });

    return equippedMap;
  },
  
  currentGroup() {
    return Groups.findOne({
      members: Meteor.userId()
    });
  },
  
  currentGroupSize() {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });
    
    if (currentGroup && currentGroup.members) {
      return currentGroup.members.length;
    }
    
    return 0;
  },
  
  miningSpaces() {
    return MiningSpace.find();
  },  
  
  currentGroupMembers() {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    let combats;
    if (currentGroup) {
      combats = Combat.find({
        owner: {
          $in: currentGroup.members
        }
      }).fetch();

      if (currentGroup.invitesDetails && currentGroup.invitesDetails.length > 0) {
        combats = combats.concat(currentGroup.invitesDetails.map((invitee) => {
          invitee.isInvitee = true;
          return invitee;
        }));
      }
    } else {
      combats = Combat.find({
        owner: Meteor.userId()
      }).fetch();
    }


    return combats.map((userCombat) => {
      // Map stuff we want to read into stats
      userCombat.stats = {
        health: userCombat.stats.health,
        healthMax: userCombat.stats.healthMax,
        energy: userCombat.stats.energy,
        energyMax: userCombat.stats.energyMax
      }

      userCombat.name = userCombat.username;
      userCombat.icon = userCombat.characterIcon || 'character.svg';
      if (currentGroup) {
        userCombat.isLeader = userCombat.owner === currentGroup.leader;
      } else {
        userCombat.isLeader = false;
      }

      return userCombat;
    });
  },

});
