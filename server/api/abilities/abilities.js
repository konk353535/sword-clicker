import { Meteor } from 'meteor/meteor';

import _ from 'underscore';

import { Abilities } from '/imports/api/abilities/abilities';
import { Combat } from '/imports/api/combat/combat';
import { Items } from '/imports/api/items/items';

import { ABILITIES } from '/server/constants/combat/index';
import { ITEMS } from '/server/constants/items/index';

import { consumeItem } from '/server/api/items/items';

Meteor.methods({

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
            level: 1
          }
        }
      })
    }

  },

  'abilities.fetchLibrary'() {
    const abilitiesArray = Object.keys(ABILITIES).map((abilityKey) => {
      const abilityConstant = JSON.parse(JSON.stringify(ABILITIES[abilityKey]));
      const abilityLevel = 1;
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
