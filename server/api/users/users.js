import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import moment from 'moment';

import { Users } from '/imports/api/users/users';
import { Mining } from '/imports/api/mining/mining';

Meteor.methods({

  'users.initUiState'() {
    Users.update({
      _id: Meteor.userId(),
      uiState: {
        $exists: false
      }
    }, {
      $set: {
        uiState: {}
      }
    });
  },

  'users.activeUsers'() {
    return Mining.find({
      lastGameUpdated: {
        $gte: moment().subtract(5, 'minutes').toDate()
      }
    }).count();
  },

  'users.setUiState'(id, value) {
    const validIds = ['showChat', 'inscriptionFilter', 'inscriptionLevelFilter', 'craftingFilter'];

    if (_.contains(validIds, id)) {
      const setObject = {}
      setObject[`uiState.${id}`] = value;

      Users.update({
        _id: Meteor.userId()
      }, {
        $set: setObject
      });
    }
  }
})

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        'gold': 1,
        'uiState': 1,
        'gems': 1,
        'membershipTo': 1,
        'personalQuest': 1
      }
    });
  } else {
    this.ready();
  }
});
