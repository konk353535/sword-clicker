import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Groups = new Mongo.Collection('groups');

GroupsSchema = new SimpleSchema({
  leader: { type: String, regEx: SimpleSchema.RegEx.Id },
  leaderName: { type: String, optional: true },
  members: { type: [String] },
  invites: { type: [String], optional: true }
});

Groups.attachSchema(GroupsSchema);
