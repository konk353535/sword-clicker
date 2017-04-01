import { Meteor } from 'meteor/meteor';

import { Abilities } from '/imports/api/abilities/abilities';
import { ABILITIES } from '/server/constants/combat/index';

Meteor.methods({

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
