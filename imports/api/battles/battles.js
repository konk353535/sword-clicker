import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Battles = new Mongo.Collection('battles');
export const BattlesList = new Mongo.Collection('battlesList');

BattlesListSchema = new SimpleSchema({
  owners: { type: [String], regEx: SimpleSchema.RegEx.Id },
  createdAt: { type: Date }
});

BattlesSchema = new SimpleSchema({
  owners: { type: [String], regEx: SimpleSchema.RegEx.Id },
  createdAt: { type: Date },
  updatedAt: { type: Date },

  floor: { type: Number, optional: true },
  difficulty: { type: String, optional: true },
  isTowerContribution: { type: Boolean, optional: true },
  startingBossHp: { type: Number, decimal: true, optional: true },
  level: { type: Number, optional: true },
  wave: { type: Number, optional: true },

  win: { type: Boolean, optional: true },
  finished: { type: Boolean, defaultValue: false, optional: true },

  totalXpGain: { type: Number, decimal: true, optional: true },
  tick: { type: Number, defaultValue: 0, optional: true },

  units: { type: [Object], optional: true }, // Usually just your player, but leave options open for pets
  'units.$.stats': { type: Object, blackbox: true },
  'units.$.amulet': { type: Object, blackbox: true, optional: true },
  'units.$.xpDistribution': { type: Object, blackbox: true},
  'units.$.target': { type: String, optional: true },
  'units.$.icon': { type: String },
  'units.$.owner': { type: String, regEx: SimpleSchema.RegEx.Id },
  'units.$.name': { type: String },
  'units.$.tickOffset': { type: Number, defaultValue: 0 },
  'units.$.id': { type: String, regEx: SimpleSchema.RegEx.Id },

  'units.$.buffs': { type: [Object], defaultValue: [] },
  'units.$.buffs.$.id': { type: String },
  'units.$.buffs.$.data': { type: Object, blackbox: true },

  'units.$.abilities': { type: [Object], optional: true },
  'units.$.abilities.$.id': { type: String },
  'units.$.abilities.$.level': { type: Number, defaultValue: 1 },
  'units.$.abilities.$.currentCooldown': { type: Number, decimal: true, defaultValue: 0 },

  deadUnits: { type: [Object], optional: true },
  'deadUnits.$.xpDistribution': { type: Object, blackbox: true},
  'deadUnits.$.stats': { type: Object, blackbox: true },
  'deadUnits.$.icon': { type: String },
  'deadUnits.$.owner': { type: String, regEx: SimpleSchema.RegEx.Id },
  'deadUnits.$.name': { type: String },
  'deadUnits.$.id': { type: String, regEx: SimpleSchema.RegEx.Id },

  enemies: { type: [Object], optional: true }, // Usually just one enemy, but leave option for groups of enemies
  'enemies.$.stats': { type: Object, blackbox: true},
  'enemies.$.icon': { type: String },
  'enemies.$.enemyId': { type: String },
  'enemies.$.name': { type: String },
  'enemies.$.target': { type: String, optional: true },
  'enemies.$.tickOffset': { type: Number, defaultValue: 0 },
  'enemies.$.id': { type: String, regEx: SimpleSchema.RegEx.Id },

  'enemies.$.buffs': { type: [Object], defaultValue: [], optional: true },
  'enemies.$.buffs.$.id': { type: String },
  'enemies.$.buffs.$.data': { type: Object, blackbox: true },

  deadEnemies: { type: [Object], optional: true },
  'deadEnemies.$.stats': { type: Object, blackbox: true},
  'deadEnemies.$.icon': { type: String },
  'deadEnemies.$.enemyId': { type: String },
  'deadEnemies.$.name': { type: String },
  'deadEnemies.$.id': { type: String, regEx: SimpleSchema.RegEx.Id },

  tickEvents: { type: [Object], optional: true }, // List of things that occured in the most recent tick
  'tickEvents.$.eventType': { type: String }, // Eg: Damage
  'tickEvents.$.from': { type: String }, // Who is dealing damage Eg: Player
  'tickEvents.$.to': { type: String }, // Who is taking damage Eg: Enemy
  'tickEvents.$.label': { type: String }, // label Eg: 1

  finalTickEvents: { type: [Object], blackbox: true, optional: true }

});

Battles.attachSchema(BattlesSchema);
BattlesList.attachSchema(BattlesListSchema);
