import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Users = Meteor.users;

UserSchema = new SimpleSchema({
  _id: { type: String },
  createdAt: { type: Date },
  services: { type: Object, blackbox: true },

  battleSecret: { type: String },
  banned: { type: Boolean, optional: true },
  newUpdates: { type: Boolean, optional: true, defaultValue: true },
  clientIp: { type: String, optional: true },
  isMod: { type: Boolean, optional: true },
  isSuperMod: { type: Boolean, optional: true },
  isGuest: { type: Boolean, optional: true },
  isMutedExpiry: { type: Date, optional: true },
  username: {
    type: String,
    regEx: /^\w+$/,
    min: 3,
    max: 20
  },
  emails: { type: Array, optional: true },
  'emails.$': { type: Object },
  'emails.$.address': { type: String },
  'emails.$.verified': { type: Boolean },

  games: { type: [String] },
  currentGame: { type: String }
})

Meteor.users.attachSchema(UserSchema);

export const UserGames = new Mongo.Collection('userGames');

UserGamesSchema = new SimpleSchema({

  owner: { type: String },
  game: { type: String },

  username: { type: String},

  // User Game Data below
  gold: { type: Number, defaultValue: 200 },
  floor: { type: Number, defaultValue: 1 },

  gems: { type: Number, defaultValue: 0 },
  fakeGems: { type: Number, defaultValue: 0 },
  fakeGemsToday: { type: Number, defaultValue: 0 },

  membershipTo: { type: Date, optional: true },
  miningUpgradeTo: { type: Date, optional: true },
  craftingUpgradeTo: { type: Date, optional: true },
  combatUpgradeTo: { type: Date, optional: true },
  woodcuttingUpgradeTo: { type: Date, optional: true },
  inscriptionUpgradeTo: { type: Date, optional: true },
  astronomyUpgradeTo: { type: Date, optional: true },
  farmingUpgradeTo: { type: Date, optional: true },

  averageCombat: { type: Number, optional: true },

  logEvents: { type: Boolean, optional: true },
  uiState: { type: Object, blackbox: true, defaultValue: {} }, // used to save ui state, eg: hide / show chat

  lastAction: { type: String, optional: true },
  lastActionDate: { type: Date, optional: true },
  partyId: { type: String, optional: true },

  personalQuest: { type: Object },
  'personalQuest.level': { type: Number, defaultValue: 1 },
  'personalQuest.wave': { type: Number, defaultValue: 1 },

  stats: { type: Object },
  'stats.spellsCast' : { type: Number, defaultValue: 1 }
})

UserGames.attachSchema(UserGamesSchema);
