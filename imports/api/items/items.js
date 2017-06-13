import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Items = new Mongo.Collection('items');

ItemsSchema = new SimpleSchema({
  itemId: { type: String },
  category: { type: String, optional: true },
  amount: { type: Number, defaultValue: 1 },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  equipped: { type: Boolean, defaultValue: false },
  enhanced: { type: Boolean, optional: true },
  slot: { type: String, optional: true },
  extraStats: { type: Object, blackbox: true, optional: true },
  quality: { type: Number, optional: true }
});

Items.attachSchema(ItemsSchema);
