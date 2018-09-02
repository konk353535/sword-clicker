import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Crafting = new Mongo.Collection('crafting');

CraftingSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  craftingLevel: { type: Number, optional: true },
  currentlyCrafting: { type: [Object], optional: true },
  'currentlyCrafting.$.itemId': { type: String },
  'currentlyCrafting.$.recipeId': { type: String },
  'currentlyCrafting.$.startDate': { type: Date },
  'currentlyCrafting.$.endDate': { type: Date },
  'currentlyCrafting.$.amount': { type: Number },
  learntCrafts: { type: Object, blackbox: true, optional: true }
});

Crafting.attachSchema(CraftingSchema);
