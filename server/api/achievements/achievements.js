import { Meteor } from 'meteor/meteor';

import { ACHIEVEMENTS } from '/server/constants/achievement/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { Users } from '/imports/api/users/users';
import { Achievements } from '/imports/api/achievements/achievements';
import { addItem } from '/server/api/items/items.js';
import { addXp } from '/server/api/skills/skills.js';

Meteor.methods({

  // Collect a specific achievement
  'achievements.collect'(id) {
    // Has this already been collected?
    const userDoc = Meteor.user();
    let achievements = Achievements.findOne({
      owner: userDoc._id
    });

    if (!achievements || achievements.collected[id] || !ACHIEVEMENTS[id]) {
      return;
    }

    // Do we meet condition?
    if (!ACHIEVEMENTS[id].condition({ user: userDoc })) {
      return;
    }

    const modifier = {
      lastGameUpdated: new Date()
    };
    modifier[`collected.${id}`] = true;

    // Set as collected
    const updated = Achievements.update({
      owner: userDoc._id,
      lastGameUpdated: achievements.lastGameUpdated
    }, {
      $set: modifier
    });

    if (!updated) {
      return;
    }

    // Apply rewards
    ACHIEVEMENTS[id].rewards.forEach((reward) => {
      if (reward.type === 'item') {
        addItem(reward.itemId, reward.amount, userDoc._id);
      } else if (reward.type === 'gold') {
        Users.update(userDoc._id, {
          $inc: {
            gold: reward.amount
          }
        });
      } else if (reward.type === 'xp') {
        addXp(reward.skill, reward.amount, userDoc._id, true);
      }
    });

    return true;
  },

  // Checks if any new achievements have been completed
  'achievements.check'() {

  },

  // Fetch achievements list
  'achievements.fetch'() {
    const userDoc = Meteor.user();
    let achievements = Achievements.findOne({
      owner: userDoc._id
    });

    if (!achievements) {
      Achievements.insert({
        owner: userDoc._id,
        lastGameUpdated: new Date(),
        collected: {}
      });

      achievements = Achievements.findOne({
        owner: userDoc._id
      });
    }

    // Return all (hide hidden unless complete)
    return Object.keys(ACHIEVEMENTS).map((key) => {
      const achieve = ACHIEVEMENTS[key];
      let collected = false;
      let canCollect = false;
      if (achievements.collected[key]) {
        collected = true;
      } else {
        canCollect = achieve.condition({ user: userDoc });
      }

      return {
        id: key,
        collected,
        canCollect,
        name: achieve.name,
        description: achieve.description,
        hidden: achieve.hidden,
        rewards: achieve.rewards.map((reward) => {
          if (reward.type === 'item') {
            return Object.assign({}, reward, {
              icon: ITEMS[reward.itemId].icon
            });
          }
          return reward;
        })
      }
    }).filter((achieve) => {
      return !achieve.hidden;
    });
  }

});

const MINUTE = 60 * 1000;
/*
DDPRateLimiter.addRule({ type: 'method', name: 'adventures.gameUpdate',
  userId(userId) {
    return userId;
  } 
}, 5, 15000);*/
// DDPRateLimiter.addRule({ type: 'subscription', name: 'adventures' }, 40, 2 * MINUTE);

Meteor.publish('achievements', function() {
  return Achievements.find({
    owner: this.userId
  });
});
