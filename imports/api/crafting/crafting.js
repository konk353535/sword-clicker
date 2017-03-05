import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Crafting = new Mongo.Collection('crafting');

CraftingSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  currentlyCrafting: { type: [Object], optional: true },
  'currentlyCrafting.$.itemId': { type: String },
  'currentlyCrafting.$.startedDate': { type: Date },
  'currentlyCrafting.$.endDate': { type: Date }
});

Crafting.attachSchema(CraftingSchema);
