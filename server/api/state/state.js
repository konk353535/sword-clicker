import { State } from '/imports/api/state/state';
import { STATE_BUFFS } from '/imports/constants/state';
import { Meteor } from "meteor/meteor";

Meteor.publish('state', function() {
  const userDoc = Meteor.user();
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
