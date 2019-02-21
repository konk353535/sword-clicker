import { State } from '/imports/api/state/state';
import { STATE_BUFFS } from '/imports/constants/state';
import { Meteor } from "meteor/meteor";

Meteor.publish('state', function() {
  return State.find({});
});