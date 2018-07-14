import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const FloorWaveScores = new Mongo.Collection('floorWaveScores');
 
FloorWaveScoresSchema = new SimpleSchema({
  floor: { type: Number },
  server: { type: String },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  points: { type: Number, decimal: true, defaultValue: 0 },
  username: { type: String }
});

FloorWaveScores.attachSchema(FloorWaveScoresSchema);
