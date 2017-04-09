import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Users = Meteor.users;

UserSchema = new SimpleSchema({
  _id: { type: String },
  createdAt: { type: Date },
  services: { type: Object, blackbox: true },
  gold: { type: Number, defaultValue: 100 },
  floor: { type: Number, defaultValue: 1 },
  membershipTo: { type: Date, optional: true },
  gems: { type: Number, defaultValue: 0 },
  uiState: { type: Object, blackbox: true }, // used to save ui state, eg: hide / show chat
  username: { type: String }
})

Meteor.users.attachSchema(UserSchema);
