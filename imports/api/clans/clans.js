import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Clans = new Mongo.Collection('clans');
export const ClanInvites = new Mongo.Collection('clanInvites');

ClansSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  members: { type: [String] },
  username: { type: String }
});

Clans.attachSchema(ClansSchema);

ClanInvitesSchema = new SimpleSchema({
  clanId: { type: String },
  invitee: { type: String, regEx: SimpleSchema.RegEx.Id }
});

ClanInvites.attachSchema(ClanInvitesSchema);
