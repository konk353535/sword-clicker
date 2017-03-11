import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Battles = new Mongo.Collection('battles');
 
BattlesSchema = new SimpleSchema({
  owners: { type: [String], regEx: SimpleSchema.RegEx.Id },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  tick: { type: Number, defaultValue: 0 },
  units: { type: [Object] }, // Usually just your player, but leave options open for pets
  'units.$.stats': { type: Object, blackbox: true },
  'units.$.owner': { type: String, regEx: SimpleSchema.RegEx.Id },
  'units.$.id': { type: String, regEx: SimpleSchema.RegEx.Id },
  enemies: { type: [Object] }, // Usually just one enemy, but leave option for groups of enemies
  'enemies.$.stats': { type: Object, blackbox: true},
  'enemies.$.id': { type: String, regEx: SimpleSchema.RegEx.Id },
  tickEvents: { type: [Object] }, // List of things that occured in the most recent tick
  'tickEvents.$.eventType': { type: String }, // Eg: Damage
  'tickEvents.$.from': { type: String }, // Who is dealing damage Eg: Player
  'tickEvents.$.to': { type: String }, // Who is taking damage Eg: Enemy
  'tickEvents.$.label': { type: String } // label Eg: 1
});

Battles.attachSchema(BattlesSchema);
