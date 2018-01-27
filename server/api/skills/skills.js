import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';

import { Abilities } from '/imports/api/abilities/abilities';
import { Astronomy } from '/imports/api/astronomy/astronomy';
import { Inscription } from '/imports/api/inscription/inscription';
import { Combat } from '/imports/api/combat/combat';
import { Crafting } from '/imports/api/crafting/crafting';
import { Users } from '/imports/api/users/users';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting';
import { Farming, FarmingSpace } from '/imports/api/farming/farming';
import { updateCombatStats } from '/server/api/combat/combat';
import { Chats } from 'meteor/cesarve:simple-chat/collections';
import { updateMiningStats } from '/server/api/mining/mining.js';
import { SKILLS } from '/server/constants/skills/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import _ from 'underscore';

const redis = new Meteor.RedisCollection('redis');

let globalXpBuffs = {}

const updateGlobalBuffs = () => {
  const rawGlobalBuffs = redis.get('global-buffs-xpq');
  const globalBuffs = rawGlobalBuffs ? JSON.parse(rawGlobalBuffs) : {};
  const hasCraftingGlobalBuff = globalBuffs.crafting && moment().isBefore(globalBuffs.crafting);
  const hasCombatGlobalBuff = globalBuffs.combat && moment().isBefore(globalBuffs.combat);
  const hasGatheringGlobalBuff = globalBuffs.gathering && moment().isBefore(globalBuffs.gathering);

  globalXpBuffs = {
    astronomy: hasCombatGlobalBuff,
    woodcutting: hasGatheringGlobalBuff,
    mining: hasGatheringGlobalBuff,
    farming: hasGatheringGlobalBuff,
    crafting: hasCraftingGlobalBuff,
    inscription: hasCraftingGlobalBuff
  }
};

updateGlobalBuffs();
Meteor.setInterval(updateGlobalBuffs, 30000);

export const addXp = function (skillType, xp, specificUserId) {
  let owner;
  if (specificUserId) {
    owner = specificUserId
  } else {
    owner = Meteor.userId();
  }
  const skill = Skills.findOne({ owner , type: skillType });

  if (!skill) {
    return;
  }

  const skillConstants = SKILLS[skill.type];
  const originalXp = skill.xp;

  if (globalXpBuffs[skill.type]) {
    xp *= 1.35;
  }

  skill.xp += xp;

  const xpToNextLevel = skillConstants.xpToLevel(skill.level);

  if (skill.xp >= xpToNextLevel) {
    // Update Level
    Skills.update({
      _id: skill._id,
      xp: originalXp,
      level: skill.level
    }, {
      $set: {
        level: skill.level + 1,
        totalXp: (skill.totalXp + xp),
        xp: (skill.xp - xpToNextLevel)
      }
    });

    Chats.insert({
      message: `Level Up! You are now level ${skill.level + 1} ${skill.type}`,
      username: 'Game',
      name: 'Game',
      date: new Date(),
      custom: {
        roomType: 'Game'
      },
      roomId: `Game-${owner}`
    });

    // If this is attack / Defense / Health recompute combat
    if (skill.type === 'attack' || skill.type === 'defense' || skill.type === 'health' || skill.type === 'magic') {
      updateCombatStats(owner);
    } else if (skill.type === 'crafting') {
      Crafting.update({
        owner
      }, {
        $set: {
          craftingLevel: skill.level + 1
        }
      });
    } else if (skill.type === 'inscription') {
      Inscription.update({
        owner
      }, {
        $set: {
          inscriptionLevel: skill.level + 1
        }
      });
    } else if (skill.type === 'mining') {
      updateMiningStats(owner, true);
    }

    // Can probably be optimized
    Skills.update({
      owner,
      type: 'total'
    }, {
      $inc: { level: 1 }
    })
  } else {
    // Just update exp
    Skills.update(skill._id, {
      $inc: {
        totalXp: xp,
        xp: xp
      }
    });
    
    // This can probably be optimized
    /* Remove for performance reasons
    Skills.update({
      type: 'total',
      owner
    }, {
      $inc: { totalXp: xp }
    });
    */
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
      } else if (skillName === 'astronomy') {
        Astronomy.insert({
          owner: Meteor.userId(),
          mages: [{
            id: 'main',
            stats: {
              attackSpeed: 50,
              criticalChance: 1
            }
          }],
          lastGameUpdated: moment().toDate()
        });
      } else if (skillName === 'magic') {
        // Update abilities
        Abilities.update({
          owner: Meteor.userId()
        }, {
          $push: {
            learntAbilities: {
              abilityId: 'earth_dart',
              level: 1,
              equipped: false,
              currentCooldown: 0,
              isSpell: true,
              casts: 0
            }
          }
        });
        updateCombatStats(Meteor.userId());
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

  'skills.fetchProfile'(username) {
    // Ensure username is a string
    if (!_.isString(username)) {
      throw new Meteor.Error('not-string', 'username must be a string');
    }

    // Search for the user
    const targetUser = Users.findOne({ username });

    const equipment = Items.find({
      equipped: true,
      owner: targetUser._id
    }, {
      fields: {
        itemId: 1,
        slot: 1,
        quality: 1,
        enhanced: 1,
        extraStats: 1
      }
    }).fetch().map((item) => {
      const itemConstants = ITEMS[item.itemId];
      // Get name and Icon
      item.icon = itemConstants.icon;
      item.name = itemConstants.name;
      delete item._id;
      if (itemConstants.stats) {
        item.stats = JSON.parse(JSON.stringify(itemConstants.stats));
        item.isWeapon = itemConstants.isWeapon;
        item.isEquippable = itemConstants.isEquippable;
        if (item.extraStats) {
          Object.keys(item.extraStats).forEach((statName) => {
            if (item.stats[statName]) {
              item.stats[statName] += item.extraStats[statName];
            }
          });
        }
      }

      return item;
    });

    // Fetch icon from combat
    const targetUserCombat = Combat.findOne({ owner: targetUser._id });

    // Get all users skills
    return {
      skills: Skills.find({
        owner: targetUser._id
      }).fetch().map((skill) => {
        return {
          xpToLevel: SKILLS[skill.type].xpToLevel(skill.level),
          xp: skill.xp,
          totalXp: skill.totalXp,
          level: skill.level,
          type: skill.type
        };
      }),

      equipment,

      characterIcon: targetUserCombat.characterIcon || 'character.svg'
    }
  },

  'skills.highscores'(skillName, showAll200) {
    let limit = 10;
    if (showAll200) {
      limit = 200;
    }

    if (skillName === 'personalQuest') {
      return Users.find({
        //banned: {
        //  $ne: true
        //}
      }, {
        sort: {
          'personalQuest.level': -1,
          'personalQuest.wave': -1
        },
        fields: {
          personalQuest: 1,
          username: 1
        },
        limit
      }).fetch();
    } else if (skillName === 'boss') {
      return BossHealthScores.find({
        //banned: {
        //  $ne: true
        //}
      }, {
        sort: {
          bossDamage: -1
        },
        fields: {
          bossDamage: 1,
          username: 1
        },
        limit
      }).fetch();
    } else {
      return Skills.find({
        type: skillName,
        //banned: {
        //  $ne: true
        //}
      }, {
        sort: {
          level: -1,
          totalXp: -1
        },
        limit
      }).fetch();
    }
  }
});

const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'skills.learnSkill' }, 50, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'skills.requirements' }, 10, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'skills.highscores' }, 50, 5 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'skills' }, 100, 1 * MINUTE);

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
