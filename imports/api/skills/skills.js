import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Skills = new Mongo.Collection('skills');
 
SkillsSchema = new SimpleSchema({
  type: { type: String },
  createdAt: { type: Date },
  xp: { type: Number, defaultValue: 0, decimal: true },
  totalXp: { type: Number, defaultValue: 0, decimal: true },
  banned: { type: Boolean, optional: true },
  username: { type: String },
  server: { type: String },
  level: { type: Number, defaultValue: 1 },
  rank: { type: Number, optional: true },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
});

Skills.attachSchema(SkillsSchema);
