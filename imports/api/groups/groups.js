import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Groups = new Mongo.Collection('groups');

GroupsSchema = new SimpleSchema({
  leader: { type: String, regEx: SimpleSchema.RegEx.Id },
  leaderName: { type: String, optional: true },
  members: { type: [String] },
  server: { type: String },
  lastReadyCheck: { type: Date, optional: true },
  membersChecks: { type: Object, optional: true, blackbox: true },
  invites: { type: [String], optional: true },
  balancer: { type: String },
  membersObject: { type: [Object], blackbox: true },
  locked: { type: Boolean, optional: true },

  floor: { type: Number, optional: true },
  inBattle: { type: Boolean, optional: true },
  lastBattleStarted: { type: Date, optional: true },
  battleCount: { type: Number, optional: true }
});

Groups.attachSchema(GroupsSchema);
