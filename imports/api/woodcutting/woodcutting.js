import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Woodcutting = new Mongo.Collection('woodcutting');

WoodcuttingSchema = new SimpleSchema({
  woodcutters: { type: [Object], blackbox: true },
  collector: { type: Object, blackbox: true },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  lastGameUpdated: { type: Date }
});

Woodcutting.attachSchema(WoodcuttingSchema);
