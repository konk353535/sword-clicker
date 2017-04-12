import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Combat = new Mongo.Collection('combat');

CombatSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  username: { type: String, optional: true },
  stats: { type: Object },
  'stats.attack': { type: Number, defaultValue: 0 },
  'stats.attackMax': { type: Number, decimal: true, defaultValue: 0 },
  'stats.attackSpeed': { type: Number, decimal: true, defaultValue: 0 },
  'stats.accuracy': { type: Number, defaultValue: 0 },
  'stats.health': { type: Number, defaultValue: 10, decimal: true },
  'stats.healthMax': { type: Number, defaultValue: 10 },
  'stats.energy': { type: Number, defaultValue: 25, decimal: true },
  'stats.energyMax': { type: Number, defaultValue: 25 },
  'stats.defense': { type: Number, defaultValue: 0 },
  'stats.armor': { type: Number, defaultValue: 0 },
  'stats.damageTaken': { type: Number, defaultValue: 1 },
  buffs: { type: [Object], optional: true, defaultValue: [] },
  'buffs.$.id': { type: String },
  'buffs.$.data': { type: Object, blackbox: true },
  lastGameUpdated: { type: Date, defaultValue: new Date() },
  xpDistribution: { type: Object, blackbox: true, defaultValue: { attack: 0.5, health: 0.5 } }
});

Combat.attachSchema(CombatSchema);
