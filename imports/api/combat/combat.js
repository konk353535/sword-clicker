import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Combat = new Mongo.Collection('combat');

CombatSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  attack: { type: Number, defaultValue: 0 },
  attackMax: { type: Number, defaultValue: 0 },
  attackSpeed: { type: Number, decimal: true, defaultValue: 0 },
  accuracy: { type: Number, defaultValue: 0 },
  health: { type: Number, defaultValue: 10 },
  maxHealth: { type: Number, defaultValue: 10 },
  defense: { type: Number, defaultValue: 0 },
  armor: { type: Number, defaultValue: 0 },
  xpDistribution: { type: Object, blackbox: true }
});

Combat.attachSchema(CombatSchema);
