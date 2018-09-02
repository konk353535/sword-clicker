import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Groups = new Mongo.Collection('groups');
export const GroupFinder = new Mongo.Collection('groupFinder');

GroupsSchema = new SimpleSchema({
  leader: { type: String, regEx: SimpleSchema.RegEx.Id },
  leaderName: { type: String, optional: true },
  members: { type: [String] },
  server: { type: String },
  lastReadyCheck: { type: Date, optional: true },
  membersChecks: { type: Object, optional: true, blackbox: true },
  invites: { type: [String], optional: true }
});

Groups.attachSchema(GroupsSchema);

GroupFinderSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  floor: { type: Number, optional: true },
  createdAt: { type: Date },
  groupCreatedId: { type: String, optional: true }
});

GroupFinder.attachSchema(GroupFinderSchema);
