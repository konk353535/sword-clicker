import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Mining = new Mongo.Collection('mining');
export const MiningSpace = new Mongo.Collection('miningSpace');

MiningSpaceSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  oreId: { type: String, optional: true },
  index: { type: Number },
  health: { type: Number, defaultValue: 0, decimal: true }
});

MiningSpace.attachSchema(MiningSpaceSchema);

MiningSchema = new SimpleSchema({
  miners: { type: Number, defaultValue: 1 },
  prospectors: { type: Number, defaultValue: 1 },
  stats: { type: Object, blackbox: true, defaultValue: {} },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  lastGameUpdated: { type: Date }
});

Mining.attachSchema(MiningSchema);
