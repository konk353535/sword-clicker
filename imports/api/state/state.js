import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const State = new Mongo.Collection('state');

StateSchema = new SimpleSchema({
  name: { type: String },
  value: { type: Object, blackbox: true, optional: true },
});

State.attachSchema(StateSchema);
