import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BattleActions = new Mongo.Collection('battleActions');
 
export const BattleActionsSchema = new SimpleSchema({
  battleId: { type: String, regEx: SimpleSchema.RegEx.Id }, // Which battle this action relates to
  abilityId: { type: String }, // Constant id for casted ability
  caster: { type: String, regEx: SimpleSchema.RegEx.Id }, // Who is casting this
  targets: { type: [String], optional: true },
  target: { type: String, optional: true } // Specified for the change target ability
});

BattleActions.attachSchema(BattleActionsSchema);
