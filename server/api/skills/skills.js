import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';

import { Crafting } from '/imports/api/crafting/crafting';
import { SKILLS } from '/server/constants/skills.js';
import _ from 'underscore';

export const addXp = function (skillType, xp) {
  const skill = Skills.findOne({ owner: Meteor.userId(), type: skillType });
  const skillConstants = SKILLS[skill.type];

  skill.xp += xp;
  const xpToNextLevel = skillConstants.xpToLevel(skill.level);
  if (skill.xp > xpToNextLevel) {
    // Update Level
    Skills.update(skill._id, {
      $inc: { level: 1 },
      $set: { xp: (skill.xp % xpToNextLevel) }
    })
  } else {
    // Just update exp
    Skills.update(skill._id, {
      $set: { xp: skill.xp }
    });
  }
}

Meteor.methods({
  'skills.learnSkill'(skillName) {
    // Make sure this is a valid skillName
    if (!_.contains(Object.keys(SKILLS), skillName)) {
      return;
    }

    const existingSkill = Skills.findOne({ owner: Meteor.userId(), type: skillName });

    // Make sure you have the requirements for this skill
    if (SKILLS[skillName].requirementsToLearn) {
      const requiredItemList = SKILLS[skillName].requirementsToLearn.map((item) => item.itemId);
      // Ensure we have the requirements
      const usersItems = Items.find({
        owner: Meteor.userId(),
        itemId: {
          $in: requiredItemList
        }
      }).fetch();

      let canLearn = true;
      SKILLS[skillName].requirementsToLearn.forEach((requiredItem) => {
        const hasItem = _.findWhere(usersItems, {itemId: requiredItem.itemId});
        if (hasItem && hasItem.amount >= requiredItem.amount) {
          // All good
        } else {
          canLearn = false;
        }
      });

      if (!canLearn) {
        return;
      }
    }

    if (!existingSkill) {
      let baseLevel = 1;
      // Base level for this skill ( 10 for hitpoints )
      if (SKILLS[skillName].baseLevel) {
        baseLevel = SKILLS[skillName].baseLevel;
      }

      Skills.insert({
        type: skillName,
        createdAt: new Date(),
        owner: Meteor.userId(),
        level: baseLevel
      });

      if (skillName === 'crafting') {
        Crafting.insert({
          owner: Meteor.userId()
        });
      }
    }
  },

  'skills.requirements'(skillName) {
    // Make sure this is a valid skillName
    if (!_.contains(Object.keys(SKILLS), skillName)) {
      return;
    }

    if (skillName === 'attack') {
      return SKILLS.attack.requirementsToLearn;
    }
  }
});

Meteor.publish('skills', function() {

  //Transform function
  var transform = function(doc) {
    doc.xpToLevel = SKILLS.mining.xpToLevel(doc.level);
    return doc;
  }

  var self = this;

  var observer = Skills.find({
    owner: this.userId
  }).observe({
      added: function (document) {
      self.added('skills', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('skills', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('skills', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
