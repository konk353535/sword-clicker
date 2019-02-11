import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import lodash from 'lodash';
import moment from "moment/moment";

export const Users = Meteor.users;

export const getIPFromConnection = function getIPFromConnection(connection) {
  let ipDiscovered = '';
  
  if (connection) {
    try {
      ipDiscovered = connection.clientAddress;
    } catch (err) {
    }
    
    try {
      if (connection.httpHeaders) {
        (['x-forwarded-for', 'X-Forwarded-For', 'x-real-ip', 'X-Real-IP', 'cf-connecting-ip', 'CF-Connecting-IP']).forEach((httpHeader) => {
          try {
            if (connection.httpHeaders[httpHeader]) {
              let localIP = connection.httpHeaders[httpHeader]
                .split(/[ ,]/)
                .filter(function(a) {
                  return a.trim()
                })[0];
                
              if (localIp && (typeof localIp === 'string') && (localIp.length > 0)) {
                return ipDiscovered;
              }

              if (localIp && localIP.length > 0) {
                ipDiscovered = localIP;
              }
            }
          } catch (err) {
          }
        });
      }
    } catch (err) {
    }
    
    try {
      ipDiscovered = lodash._property((ipDiscovered || '').match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/), '0');
    } catch (err) {
      try {
        ipDiscovered = lodash.property((ipDiscovered || '').match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/), '0');
      } catch (err) {
      }
    }
  }

  try {
    ipDiscovered = ((ipDiscovered && ipDiscovered.length > 0) ? ipDiscovered : '0.0.0.0');
  } catch (err) {
  }
  
  if (typeof ipDiscovered === 'string') {
    return ipDiscovered;
  }
  
  return '0.0.0.0';
};

export const updateUserActivity = function updateUserActivity({userId, connectionInfo}) {
  // Discover user IP, set current time for last active
  const ipAddress = getIPFromConnection(connectionInfo);

  // Set up mongodb update fields  
  const userActivityUpdate = {
    lastActivity: moment().toDate(),
  };
  try {
    if (ipAddress && ipAddress.length > 0 && ipAddress !== '0.0.0.0') {
      userActivityUpdate.clientIp = ipAddress;
    }
  }
  catch (err) {
  }
  
  // Update user activity
  Users.update({
    _id: Meteor.userId()
  }, {
    $set: userActivityUpdate
  });  
}

UserSchema = new SimpleSchema({
  _id: { type: String },
  createdAt: { type: Date },
  services: { type: Object, blackbox: true },
  gold: { type: Number, defaultValue: 200 },
  floor: { type: Number, defaultValue: 1 },

  gems: { type: Number, defaultValue: 0 },
  fakeGems: { type: Number, defaultValue: 0 },
  fakeGemsToday: { type: Number, defaultValue: 0 },

  battleSecret: { type: String },
  server: { type: String },
  banned: { type: Boolean, optional: true },

  lastActivity: { type: Date, optional: true },
  
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
  isPreFabbedGuest: { type: Boolean, optional: true },

  averageCombat: { type: Number, optional: true },

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
  'personalQuest.wave': { type: Number, defaultValue: 1 },

  stats: { type: Object },
  'stats.spellsCast' : { type: Number, defaultValue: 1 },
  'stats.towerHighestClear': { type: Number, defaultValue: 0 },
  'stats.combatMostDamageDone': { type: Number, defaultValue: 0 },
  'stats.combatMostHealingDone': { type: Number, defaultValue: 0 },
  'stats.combatMostDamageTaken': { type: Number, defaultValue: 0 },
});

Meteor.users.attachSchema(UserSchema);
