import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

UserSchema = new SimpleSchema({
  _id: { type: String },
  createdAt: { type: Date },
  services: { type: Object, blackbox: true },
  emails: { type: [Object], blackbox: true },
  gold: { type: Number, defaultValue: 0 }
})

Meteor.users.attachSchema(UserSchema);
