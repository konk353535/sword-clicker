import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Mining = new Mongo.Collection('mining');
export const MiningSpace = new Mongo.Collection('miningSpace');

MiningSpaceSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  oreId: { type: String, optional: true },
  index: { type: Number },
  isCluster: { type: Boolean, optional: true },
  health: { type: Number, defaultValue: 0, decimal: true }
});

MiningSpace.attachSchema(MiningSpaceSchema);

MiningSchema = new SimpleSchema({
  miners: { type: [Object] },
  'miners.$.id': { type: String },
  'miners.$.amount': { type: Number, decimal: true },
  'miners.$.level': { type: Number, defaultValue: 1 },
  'miners.$.xp': { type: Number, decimal: true, defaultValue: 0 },
  prospecting: { type: [String] },
  stats: { type: Object, blackbox: true, defaultValue: {} },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  collector: { type: Object, blackbox: true }, // { stone: 1, copper: 2 } value === # mined
  storage: { type: Object, blackbox: true }, // { stone: 1, copper: 2 } value === lvl of storage
  lastGameUpdated: { type: Date, defaultValue: new Date() }
});

Mining.attachSchema(MiningSchema);
