import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Combat = new Mongo.Collection('combat');

CombatSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  username: { type: String, optional: true },
  attack: { type: Number, defaultValue: 0 },
  attackMax: { type: Number, defaultValue: 0 },
  attackSpeed: { type: Number, decimal: true, defaultValue: 0 },
  accuracy: { type: Number, defaultValue: 0 },
  health: { type: Number, defaultValue: 10, decimal: true },
  maxHealth: { type: Number, defaultValue: 10 },
  energy: { type: Number, defaultValue: 25, decimal: true },
  maxEnergy: { type: Number, defaultValue: 25 },
  defense: { type: Number, defaultValue: 0 },
  armor: { type: Number, defaultValue: 0 },
  lastGameUpdated: { type: Date, defaultValue: new Date() },
  xpDistribution: { type: Object, blackbox: true, defaultValue: { attack: 0.5, health: 0.5 } }
});

Combat.attachSchema(CombatSchema);
