import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import _ from 'underscore';

import { ACHIEVEMENTS } from '/server/constants/achievement/index.js';
import { Users } from '/imports/api/users/users';
import { Achievements } from '/imports/api/achievements/achievements';

Meteor.methods({

  // Collect a specific achievements
  'achievements.collect'() {
  },

  // Checks if any new achievements have been completed
  'achievements.check'() {

  },

  // Fetch achievements list
  'achievements.fetch'() {
    // Return all (hide hidden unless complete)
  }

})

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
