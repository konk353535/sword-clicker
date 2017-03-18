import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Users = Meteor.users;

UserSchema = new SimpleSchema({
  _id: { type: String },
  createdAt: { type: Date },
  services: { type: Object, blackbox: true },
  emails: { type: [Object], blackbox: true },
  gold: { type: Number, defaultValue: 100 }
})

Meteor.users.attachSchema(UserSchema);
