import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import { State } from '/imports/api/state/state';
import { Items } from '/imports/api/items/items';

import { Abilities } from '/imports/api/abilities/abilities';
import { Astronomy } from '/imports/api/astronomy/astronomy';
import { Inscription } from '/imports/api/inscription/inscription';
import { Combat } from '/imports/api/combat/combat';
import { Crafting } from '/imports/api/crafting/crafting';
import { Users, UserGames } from '/imports/api/users/users';
import { BossHealthScores } from '/imports/api/floors/bossHealthScores';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting';
import { ClanHighscores } from '/imports/api/clans/clans';
import { Farming, FarmingSpace } from '/imports/api/farming/farming';

import { updateCombatStats } from '/server/api/combat/combat';
import { Chats } from 'meteor/cesarve:simple-chat/collections';
import { updateMiningStats } from '/server/api/mining/mining.js';

import { SKILLS } from '/server/constants/skills/index.js';
import { STATE_BUFFS } from '/imports/constants/state';
import { ITEMS } from '/server/constants/items/index.js';

import moment from "moment/moment";
import _ from 'underscore';

let globalXpBuffs = {};

const updateGlobalBuffs = () => {
  const hasCraftingGlobalBuff = !_.isUndefined(State.findOne({name: STATE_BUFFS.crafting, 'value.activeTo': {$gte: moment().toDate()}}));
  const hasCombatGlobalBuff = !_.isUndefined(State.findOne({name: STATE_BUFFS.combat, 'value.activeTo': {$gte: moment().toDate()}}));
  const hasGatheringGlobalBuff = !_.isUndefined(State.findOne({name: STATE_BUFFS.gathering, 'value.activeTo': {$gte: moment().toDate()}}));

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

export const addGold = function (amount, userId, game) {
  const owner = userId;

  UserGames.update({
    owner,
    game
  }, {
    $inc: {
      gold: amount
    }
  })

  if (amount > 0) {
    const highScoreType = 'gold-weekly';

    ClanHighscores.update({
      owner,
      game,
      type: highScoreType
    }, {
      $inc: {
        score: Math.floor(amount)
      }
    }, (err, res) => {
      if (!res) {
        // Create the entry
        ClanHighscores.insert({
          owner,
          game,
          type: highScoreType,
          score: Math.floor(amount)
        });
      }
    });
  }
}

export const addXp = function (skillType, xp, specificUserId, game) {
  let owner;
  if (specificUserId) {
    owner = specificUserId
  } else {
    owner = Meteor.userId();
  }

  if (!game) {
    game = Meteor.user().currentGame;
  }

  const skill = Skills.findOne({ owner, game, type: skillType });

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
      updateCombatStats(owner, game);
    } else if (skill.type === 'crafting') {
      Crafting.update({
        owner,
        game
      }, {
        $set: {
          craftingLevel: skill.level + 1
        }
      });
    } else if (skill.type === 'inscription') {
      Inscription.update({
        owner,
        game
      }, {
        $set: {
          inscriptionLevel: skill.level + 1
        }
      });
    } else if (skill.type === 'mining') {
      updateMiningStats(owner, game, true);
    }

    // Can probably be optimized
    Skills.update({
      owner,
      game,
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
  }

  if (xp >= 1) {
    const highScoreType = `${skill.type}-weekly`;

    ClanHighscores.update({
      owner,
      game,
      type: highScoreType
    }, {
      $inc: {
        score: Math.floor(xp)
      }
    }, (err, res) => {
      if (!res) {
        // Create the entry
        ClanHighscores.insert({
          owner,
          game,
          type: highScoreType,
          score: Math.floor(xp)
        });
      }
    })
  }
}

Meteor.methods({
  'skills.learnSkill'(skillName) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    // Make sure this is a valid skillName
    if (!_.contains(Object.keys(SKILLS), skillName)) {
      return;
    }

    const existingSkill = Skills.findOne({ owner, game, type: skillName });

    // Make sure you have the requirements for this skill
    if (SKILLS[skillName].requirementsToLearn) {
      const requiredItemList = SKILLS[skillName].requirementsToLearn.map((item) => item.itemId);
      // Ensure we have the requirements
      const usersItems = Items.find({
        owner,
        game,
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
        owner,
        game,
        level: baseLevel,
        username: Meteor.user().username
      });

      Skills.update({
        type: 'total',
        owner,
        game
      }, {
        $inc: {
          level: baseLevel
        }
      });

      if (skillName === 'crafting') {
        Crafting.insert({
          owner,
          game
        });
      } else if (skillName === 'inscription') {
        Inscription.insert({
          owner,
          game
        });
      } else if (skillName === 'woodcutting') {
        Woodcutting.insert({
          owner,
          game,
          woodcutters: [],
          storage: {},
          collector: {},
          lastGameUpdated: new Date()
        });
      } else if (skillName === 'attack') {
        updateCombatStats(Meteor.userId());
      } else if (skillName === 'farming') {
        // Inject farming
        Farming.insert({
          owner,
          game
        });
        // Inject farming spaces (4 active, 2 inactive)
        for (let i = 0; i < 6; i++) {
          const isActive = i < 4;
          FarmingSpace.insert({
            owner,
            game,
            active: isActive,
            index: i
          });
        }
      } else if (skillName === 'astronomy') {
        Astronomy.insert({
          owner,
          game,
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
          owner,
          game
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
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    // Ensure username is a string
    if (!_.isString(username)) {
      throw new Meteor.Error('not-string', 'username must be a string');
    }

    // Search for the user
    const targetUser = Users.findOne({ username, game });

    const equipment = Items.find({
      equipped: true,
      owner,
      game
    }, {
      fields: {
        itemId: 1,
        slot: 1,
        quality: 1,
        enhanced: 1,
        extraStats: 1,
        enchantmentId: 1,
        enchantmentDescription: 1
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
    const targetUserCombat = Combat.findOne({ owner, game });

    // Get all users skills
    return {
      skills: Skills.find({
        owner,
        game
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
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    let limit = 10;
    if (showAll200) {
      limit = 200;
    }

    if (skillName === 'personalQuest') {
      return UserGames.find({
        game
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
        game
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
        game,
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
  const userDoc = Users.findOne(this.userId);
  const owner = userDoc._id;
  const game = userDoc.currentGame;

  //Transform function
  var transform = function(doc) {
    doc.xpToLevel = SKILLS[doc.type].xpToLevel(doc.level);
    return doc;
  }

  var self = this;

  var observer = Skills.find({
    owner,
    game
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
