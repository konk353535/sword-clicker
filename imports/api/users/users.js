import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Users = Meteor.users;

UserSchema = new SimpleSchema({
  _id: { type: String },
  createdAt: { type: Date },
  services: { type: Object, blackbox: true },
  gold: { type: Number, defaultValue: 100 },
  floor: { type: Number, defaultValue: 1 },
  gems: { type: Number, defaultValue: 0 },

  membershipTo: { type: Date, optional: true },
  miningUpgradeTo: { type: Date, optional: true },
  craftingUpgradeTo: { type: Date, optional: true },
  combatUpgradeTo: { type: Date, optional: true },
  woodcuttingUpgradeTo: { type: Date, optional: true },
  inscriptionUpgradeTo: { type: Date, optional: true },
  astronomyUpgradeTo: { type: Date, optional: true },
  farmingUpgradeTo: { type: Date, optional: true },

  newUpdates: { type: Boolean, optional: true, defaultValue: true },

  clientIp: { type: String, optional: true },

  isMutedExpiry: { type: Date, optional: true },
  isMod: { type: Boolean, optional: true },
  isSuperMod: { type: Boolean, optional: true },
  isGuest: { type: Boolean, optional: true },

  logEvents: { type: Boolean, optional: true },
  uiState: { type: Object, blackbox: true, defaultValue: {} }, // used to save ui state, eg: hide / show chat
  username: {
    type: String,
    regEx: /^\w+$/,
    min: 3,
    max: 20
  },

  tutorial: { type: Object, optional: true },
  'tutorial.$.hideCrafting': { type: Boolean },
  'tutorial.$.highlightCrafting': { type: Boolean },

  'tutorial.$.hideWoodcutting': { type: Boolean },
  'tutorial.$.highlightWoodcutting': { type: Boolean },

  'tutorial.$.highlightMining': { type: Boolean },
  'tutorial.$.hideMiningEquipment': { type: Boolean },
  'tutorial.$.highlightMiningEquipment': { type: Boolean },
  'tutorial.$.hideMiningUpgrades': { type: Boolean },  
  'tutorial.$.highlightMiningUpgrades': { type: Boolean },

  emails: { type: Array, optional: true },
  'emails.$': { type: Object },
  'emails.$.address': { type: String },
  'emails.$.verified': { type: Boolean },

  personalQuest: { type: Object },
  'personalQuest.level': { type: Number, defaultValue: 1 },
  'personalQuest.wave': { type: Number, defaultValue: 1 }
})

Meteor.users.attachSchema(UserSchema);
