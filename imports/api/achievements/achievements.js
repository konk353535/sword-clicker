import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Achievements = new Mongo.Collection('achievements');

AchievementsSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  lastGameUpdated: { type: Date, defaultValue: new Date() },
  completed: { type: Object, blackbox: true },
  collected: { type: Object, blackbox: true }
});
