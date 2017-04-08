import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import { Users } from '/imports/api/users/users';

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
        'uiState': 1
      }
    });
  } else {
    this.ready();
  }
});
