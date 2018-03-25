import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const FloorWaveScores = new Mongo.Collection('floorWaveScores');
 
FloorWaveScoresSchema = new SimpleSchema({
  floor: { type: Number },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  points: { type: Number, decimal: true, defaultValue: 0 },
  username: { type: String }
});

FloorWaveScores.attachSchema(FloorWaveScoresSchema);

export const ClanHighscores = new Mongo.Collection('clanHighscores');
 
ClanHighscoresSchema = new SimpleSchema({
  owner: { type: String }, // Who owns this
  score: { type: Number }, // 50.3xp / 30.9g
  type: { type: String }, // mining-weekly / gold-weekly / ect
  clan: { type: String } // Clan this user is in
});

ClanHighscores.attachSchema(ClanHighscoresSchema);
