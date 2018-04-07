import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Games = new Mongo.Collection('games');

GamesSchema = new SimpleSchema({
  name: { type: String },
  mainGame: { type: Boolean },
  members: { type: [String] }
});

Games.attachSchema(GamesSchema);

export const GameInvites = new Mongo.Collection('gameInvites');

GameInvitesSchema = new SimpleSchema({
  game: { type: String, regEx: SimpleSchema.RegEx.Id },
  inviteeName: { type: String },
  gameName: { type: String },
  inviterName: { type: String },
  invitee: { type: String, regEx: SimpleSchema.RegEx.Id }
});

GameInvites.attachSchema(GameInvitesSchema);
