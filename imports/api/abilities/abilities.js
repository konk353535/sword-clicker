import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Abilities = new Mongo.Collection('abilities');

AbilitiesSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  learntAbilities: { type: [Object] },
  'learntAbilities.$.abilityId': { type: String },
  'learntAbilities.$.equipped': { type: Boolean, defaultValue: false },
  'learntAbilities.$.level': { type: Number },
});

Abilities.attachSchema(AbilitiesSchema);
