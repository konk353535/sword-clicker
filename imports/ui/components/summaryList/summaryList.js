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

import '../farming/farmSpace.js';
import '../craftingDuration/craftingDuration.js';
import './summaryList.html';


Template.summaryList.onCreated(function bodyOnCreated() {
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
});

Template.summaryList.helpers({

  summaryListDisabled() {
    return Session.get('summaryListDisabled');
  },

  crafting() {
    return Crafting.findOne();
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
        if (hasFarmingUpgrade) {
          farmingSpace.active = true;
        } else {
          farmingSpace.active = false;
        }
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
});
