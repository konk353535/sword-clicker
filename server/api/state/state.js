import { State } from '/imports/api/state/state';
import { Users } from '/imports/api/users/users';
import { STATE_BUFFS } from '/imports/constants/state';
import { Meteor } from "meteor/meteor";

Meteor.publish('state', function() {
  const userDoc = Users.findOne(this.userId);
  const owner = userDoc._id;
  const game = userDoc.currentGame;

  toPublish = [...Object.values(STATE_BUFFS)];

  return State.find({
    game,
    name: {
      $in: toPublish
    }
  });
});
