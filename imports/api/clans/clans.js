import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Clans = new Mongo.Collection('clans');
export const ClanInvites = new Mongo.Collection('clanInvites');
export const ClanHighscores = new Mongo.Collection('clanHighscores');

ClansSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  members: { type: [String] },
  name: { type: String }
});

Clans.attachSchema(ClansSchema);

ClanInvitesSchema = new SimpleSchema({
  clanId: { type: String },
  inviteeName: { type: String },
  clanName: { type: String },
  inviterName: { type: String },
  invitee: { type: String, regEx: SimpleSchema.RegEx.Id }
});

ClanInvites.attachSchema(ClanInvitesSchema);
 
ClanHighscoresSchema = new SimpleSchema({
  owner: { type: String }, // Who owns this
  score: { type: Number }, // 50.3xp / 30.9g
  type: { type: String } // mining-weekly / gold-weekly / ect
  // clan: { type: String } // Clan this user is in
});

ClanHighscores.attachSchema(ClanHighscoresSchema);
