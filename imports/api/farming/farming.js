import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Farming = new Mongo.Collection('farming');
export const FarmingSpace = new Mongo.Collection('farmingSpace');

FarmingSpaceSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  active: { type: Boolean }, // Active means usable, can be turned off for donator spaces
  index: { type: Number },
  plantId: { type: String, optional: true },
  water: { type: Number, optional: true },
  maturityDate: { type: Date, optional: true }, // When this plant will finish growing
  plantDate: { type: Date, optional: true }
});

FarmingSpace.attachSchema(FarmingSpaceSchema);

FarmingSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  lastGameUpdated: { type: Date, defaultValue: new Date() }
});

Farming.attachSchema(FarmingSchema);
