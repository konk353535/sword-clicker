import { Meteor } from 'meteor/meteor';

import _ from 'underscore';

import { Abilities } from '/imports/api/abilities/abilities';
import { Combat } from '/imports/api/combat/combat';
import { Items } from '/imports/api/items/items';

import { ABILITIES, ABILITY } from '/server/constants/combat/index';
import { ITEMS } from '/server/constants/items/index';

import { consumeItem } from '/server/api/items/items';

Meteor.methods({

  'abilities.unequip'(slot) {
    // Make sure this is a valid slot
    if (_.contains(ABILITY.slots, slot)) {
      // Unequip specified slot
      Abilities.update({
        owner: Meteor.userId(),
        'learntAbilities.slot': slot
      }, {
        $set: {
          'learntAbilities.$.equipped': false
        }
      });
    }
  },

  'abilities.equip'(abilityId) {
    // Make sure the user actually has the specified ability
    const myAbilities = Abilities.findOne({ owner: Meteor.userId() });
    const targetEquip = _.findWhere(myAbilities.learntAbilities, { abilityId });

    if (!targetEquip) {
      throw new Meteor.Error("not-learnt", "You haven't learnt this ability.");
    }

    const targetEquipConstants = ABILITIES[targetEquip.abilityId];

    if (targetEquipConstants.slot === 'any') {
      // Look for first empty slot
      let availableSlots = JSON.parse(JSON.stringify(ABILITY.slots));

      // Remove from available slots any equipped abilities
      myAbilities.learntAbilities.forEach((ability) => {
        if (ability.equipped) {
          availableSlots = availableSlots.filter((slot) => {
            return slot !== ability.slot;
          });
        }
      });

      if (availableSlots.length > 0) {
        const slotToUse = availableSlots[0];
        targetEquip.equipped = true;
        targetEquip.slot = slotToUse;
      }
    } else {
      // Unequip abilities on the same slot
      myAbilities.learntAbilities.forEach((ability) => {
        if (ability.equipped) {
          if (ability.slot === targetEquipConstants.slot) {
            ability.equipped = false;
          }
        }
      });

      // Equip specified ability
      targetEquip.equipped = true;
      targetEquip.slot = targetEquipConstants.slot;
    }

    Abilities.update(myAbilities._id, {
      $set: {
        learntAbilities: myAbilities.learntAbilities
      }
    });
  },

  'abilities.learn'(_id, itemId) {
    // Make sure we have this item
    const tome = Items.findOne({ owner: Meteor.userId(), itemId });

    if (!tome) {
      return;
    }

    // Check what this teaches
    const tomeConstants = ITEMS[itemId];

    // Fetch existing abilities
    const myAbilities = Abilities.findOne({ owner: Meteor.userId() });

    // Filter down to existing ability
    const hasTargetAbility = _.findWhere(myAbilities.learntAbilities, {
      abilityId: tomeConstants.teaches.abilityId
    });

    // Is existing ability equal or above level off target tomb?
    if (hasTargetAbility && hasTargetAbility.level >= tomeConstants.teaches.level) {
      throw new Meteor.Error("already-learnt", "You've already learnt this ability.");
    }

    // Make sure if this is above level 1, we already have the previous level
    if (tomeConstants.teaches.level > 1 && 
      (!hasTargetAbility || (hasTargetAbility.level + 1) !== tomeConstants.teaches.level)) {
      throw new Meteor.Error("not-learnt-previous", "You must learn the earlier levels of this ability first.");
    }

    // Okay all is good, remove the tome
    consumeItem(tome, 1);

    // Add to learnt abilities
    if (hasTargetAbility) {
      // Update existing level
      Abilities.update({
        _id: myAbilities._id,
        "learntAbilities.abilityId": hasTargetAbility.abilityId
      }, {
        $set: {
          "learntAbilities.$.level": tomeConstants.teaches.level
        }
      });
    } else {
      Abilities.update(myAbilities._id, {
        $push: {
          learntAbilities: {
            abilityId: tomeConstants.teaches.abilityId,
            level: 1,
            equipped: false
          }
        }
      })
    }

  },

  'abilities.fetchLibrary'() {
    const userAbilities = Abilities.findOne({
      owner: Meteor.userId()
    });

    // Build up abilities id to level map
    const abilitiesMap = {};
    userAbilities.learntAbilities.forEach((ability) => {
      abilitiesMap[ability.abilityId] = ability.level;
    });

    const abilitiesArray = Object.keys(ABILITIES).map((abilityKey) => {
      const abilityConstant = JSON.parse(JSON.stringify(ABILITIES[abilityKey]));
      let abilityLevel = 1;
      if (abilitiesMap[abilityKey]) {
        abilityLevel = abilitiesMap[abilityKey];
      }
      const abilityData = {
        description: ABILITIES[abilityKey].description(abilityLevel),
        name: `${abilityConstant.name} (${abilityLevel})`,
        icon: abilityConstant.icon,
        cooldown: abilityConstant.cooldown,
        level: abilityLevel,
        id: abilityConstant.id
      }

      return abilityData;
    }).filter((ability) => {
      if (ability.isHidden) {
        return false;
      }

      return true;
    });

    return abilitiesArray;
  }
});

Meteor.publish('abilities', function() {

  //Transform function
  var transform = function(doc) {
    doc.learntAbilities.forEach((ability) => {
      const abilityConstant = ABILITIES[ability.abilityId];

      ability.description = ABILITIES[ability.abilityId].description(ability.level);
      ability.name = `${abilityConstant.name} (${ability.level})`;
      ability.icon = abilityConstant.icon;
      ability.cooldown = abilityConstant.cooldown;
      ability.level = ability.level;
      ability.id = abilityConstant.id;
      ability.targettable = abilityConstant.targettable;

      return ability;
    });
    return doc;
  }

  var self = this;

  var observer = Abilities.find({
    owner: this.userId
  }).observe({
      added: function (document) {
      self.added('abilities', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('abilities', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('abilities', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
