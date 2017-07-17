import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Users = Meteor.users;

UserSchema = new SimpleSchema({
  _id: { type: String },
  createdAt: { type: Date },
  services: { type: Object, blackbox: true },
  gold: { type: Number, defaultValue: 200 },
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

  'tutorial.currentStep': { type: Number },

  'tutorial.hideCrafting': { type: Boolean },
  'tutorial.highlightCrafting': { type: Boolean },

  'tutorial.hideWoodcutting': { type: Boolean },
  'tutorial.highlightWoodcutting': { type: Boolean },

  'tutorial.hideFarming': { type: Boolean },
  'tutorial.highlightFarming': { type: Boolean },
  'tutorial.hideFarmingPlots': { type: Boolean },
  'tutorial.highlightFarmingPlots': { type: Boolean },

  'tutorial.hideInscription': { type: Boolean },
  'tutorial.highlightInscription': { type: Boolean },
  'tutorial.hideInscriptionAbilities': { type: Boolean },
  'tutorial.highlightInscriptionAbilities': { type: Boolean },
  'tutorial.hideInscriptionPigments': { type: Boolean },
  'tutorial.highlightInscriptionPigments': { type: Boolean },
  'tutorial.hideInscriptionPaper': { type: Boolean },
  'tutorial.highlightInscriptionPaper': { type: Boolean },


  'tutorial.hideCombat': { type: Boolean },
  'tutorial.highlightCombat': { type: Boolean },
  'tutorial.highlightCombatEquipment': { type: Boolean },
  'tutorial.hideCombatEquipment': { type: Boolean },
  'tutorial.hideCombatAbilities': { type: Boolean },
  'tutorial.highlightCombatAbilities': { type: Boolean },
  'tutorial.hideCombatTower': { type: Boolean },
  'tutorial.highlightCombatTower': { type: Boolean },
  'tutorial.hideCombatPersonalQuest': { type: Boolean },
  'tutorial.highlightCombatPersonalQuest': { type: Boolean },
  'tutorial.hideCombatAdventures': { type: Boolean },
  'tutorial.highlightCombatAdventures': { type: Boolean },
  'tutorial.hideCombatGroup': { type: Boolean },
  'tutorial.hideCombatBattleLog': { type: Boolean },


  'tutorial.hideMiningEquipment': { type: Boolean },
  'tutorial.highlightMiningEquipment': { type: Boolean },
  'tutorial.hideMiningMiners': { type: Boolean },  
  'tutorial.highlightMiningMiners': { type: Boolean },
  'tutorial.hideMiningProspectors': { type: Boolean },  
  'tutorial.highlightMiningProspectors': { type: Boolean },

  emails: { type: Array, optional: true },
  'emails.$': { type: Object },
  'emails.$.address': { type: String },
  'emails.$.verified': { type: Boolean },

  personalQuest: { type: Object },
  'personalQuest.level': { type: Number, defaultValue: 1 },
  'personalQuest.wave': { type: Number, defaultValue: 1 }
})

Meteor.users.attachSchema(UserSchema);
