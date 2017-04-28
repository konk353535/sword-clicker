import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';

import { Inscription } from '/imports/api/inscription/inscription';
import { Crafting } from '/imports/api/crafting/crafting';
import { Users } from '/imports/api/users/users';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting';
import { Farming, FarmingSpace } from '/imports/api/farming/farming';
import { updateCombatStats } from '/server/api/combat/combat';

import { SKILLS } from '/server/constants/skills/index.js';
import _ from 'underscore';

export const addXp = function (skillType, xp, specificUserId) {
  let owner;
  if (specificUserId) {
    owner = specificUserId
  } else {
    owner = Meteor.userId();
  }
  const skill = Skills.findOne({ owner , type: skillType });
  const skillConstants = SKILLS[skill.type];

  skill.xp += xp;
  const xpToNextLevel = skillConstants.xpToLevel(skill.level);
  if (skill.xp >= xpToNextLevel) {
    if (skill.xp - xpToNextLevel === 0) {
      // Update Level
      Skills.update(skill._id, {
        $inc: { level: 1, totalXp: xp },
        $set: { xp: skill.xp }
      });
      // Can probably be optimized
      Skills.update({
        owner,
        type: 'total'
      }, {
        $inc: { level: 1, totalXp: xp }
      })
    } else {
      // Update Level
      Skills.update(skill._id, {
        $inc: { level: 1, totalXp: xp },
        $set: { xp: (skill.xp - xpToNextLevel) }
      });

      // If this is attack / Defense / Health recompute combat
      if (skill.type === 'attack' || skill.type === 'defense' || skill.type === 'health') {
        updateCombatStats(owner);
      }

      // Can probably be optimized
      Skills.update({
        owner,
        type: 'total'
      }, {
        $inc: { level: 1, totalXp: xp }
      })
    }
  } else {
    // Just update exp
    Skills.update(skill._id, {
      $set: { xp: skill.xp },
      $inc: { totalXp: xp }
    });
    
    // This can probably be optimized
    Skills.update({
      type: 'total',
      owner
    }, {
      $inc: { totalXp: xp }
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
        level: baseLevel,
        username: Meteor.user().username
      });

      Skills.update({
        type: 'total',
        owner: Meteor.userId()
      }, {
        $inc: {
          level: baseLevel
        }
      });

      if (skillName === 'crafting') {
        Crafting.insert({
          owner: Meteor.userId()
        });
      } else if (skillName === 'inscription') {
        Inscription.insert({
          owner: Meteor.userId()
        });
      } else if (skillName === 'woodcutting') {
        Woodcutting.insert({
          owner: Meteor.userId(),
          woodcutters: [],
          lastGameUpdated: new Date()
        });
      } else if (skillName === 'attack') {
        updateCombatStats(Meteor.userId());
      } else if (skillName === 'farming') {
        // Inject farming
        Farming.insert({
          owner: Meteor.userId()
        });
        // Inject farming spaces (4 active, 2 inactive)
        for (let i = 0; i < 6; i++) {
          const isActive = i < 4;
          FarmingSpace.insert({
            owner: Meteor.userId(),
            active: isActive,
            index: i
          });
        }
      }
    }
  },

  'skills.requirements'(skillName) {
    // Make sure this is a valid skillName
    if (!_.contains(Object.keys(SKILLS), skillName)) {
      return;
    }

    if (SKILLS[skillName].requirementsToLearn) {
      return SKILLS[skillName].requirementsToLearn || [];
    }
  },

  'skills.highscores'(skillName) {
    if (skillName === 'personalQuest') {
      return Users.find({}, {
        sort: {
          'personalQuest.level': -1,
          'personalQuest.wave': -1
        },
        fields: {
          personalQuest: 1,
          username: 1
        },
        limit: 10
      }).fetch();
    } else if (skillName === 'boss') {
      return BossHealthScores.find({}, {
        sort: {
          bossDamage: -1
        },
        fields: {
          bossDamage: 1,
          username: 1
        },
        limit: 10
      }).fetch();
    } else {
      return Skills.find({
        type: skillName
      }, {
        sort: {
          totalXp: -1
        },
        limit: 10
      }).fetch();
    }
  }
});

const MINUTE = 60 * 1000;

DDPRateLimiter.addRule({ type: 'method', name: 'skills.learnSkill' }, 50, 2 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'skills.requirements' }, 10, 2 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'skills.highscores' }, 50, 5 * MINUTE);
DDPRateLimiter.addRule({ type: 'subscription', name: 'skills' }, 100, 1 * MINUTE);

Meteor.publish('skills', function() {

  //Transform function
  var transform = function(doc) {
    doc.xpToLevel = SKILLS[doc.type].xpToLevel(doc.level);
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
