import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BattleActions = new Mongo.Collection('battleActions');
 
BattleActionsSchema = new SimpleSchema({
  battleId: { type: String, regEx: SimpleSchema.RegEx.Id }, // Which battle this action relates to
  abilityId: { type: String }, // Constant id for casted ability
  caster: { type: String, regEx: SimpleSchema.RegEx.Id }, // Who is casting this
  target: { type: String, optional: true } // Optional, if self casted ability will not be specified
});

BattleActions.attachSchema(BattleActionsSchema);
