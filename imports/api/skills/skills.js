import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Skills = new Mongo.Collection('skills');
 
SkillsSchema = new SimpleSchema({
  type: { type: String },
  createdAt: { type: Date },
  xp: { type: Number, defaultValue: 0, decimal: true },
  level: { type: Number, defaultValue: 1 },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
});

Skills.attachSchema(SkillsSchema);
