import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const FloorWaveScores = new Mongo.Collection('floorWaveScores');
 
FloorWaveScoresSchema = new SimpleSchema({
  floor: { type: Number },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  username: { type: String },
  easyWaves: { type: Number, defaultValue: 0 },
  hardWaves: { type: Number, defaultValue: 0 },
  veryHardWaves: { type: Number, defaultValue: 0 }
});

FloorWaveScores.attachSchema(FloorWaveScoresSchema);
