import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Combat = new Mongo.Collection('combat');

CombatSchema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  server: { type: String },
  username: { type: String, optional: true },
  foughtBoss: { type: Boolean, defaultValue: false },
  boughtIcons: { type: [String], optional: true },
  characterIcon: { type: String, defaultValue: 'character.svg' },
  stats: { type: Object },
  isTowerContribution: { type: Boolean, defaultValue: false, optional: true },
  towerContributionsToday: { type: Number, defaultValue: 0, optional: true },
  'stats.attack': { type: Number, decimal: true, defaultValue: 1 },
  'stats.attackMax': { type: Number, decimal: true, defaultValue: 1 },
  'stats.attackSpeed': { type: Number, decimal: true, defaultValue: 1 },
  'stats.accuracy': { type: Number, decimal: true, defaultValue: 1 },
  'stats.criticalChance': { type: Number, decimal: true, defaultValue: 0 },
  'stats.criticalDamage': { type: Number, decimal: true, defaultValue: 1 },
  'stats.health': { type: Number, decimal: true, defaultValue: 50, decimal: true },
  'stats.healthMax': { type: Number, decimal: true, defaultValue: 50 },
  'stats.energy': { type: Number, decimal: true, defaultValue: 20, decimal: true },
  'stats.energyMax': { type: Number, decimal: true, defaultValue: 20 },
  'stats.magicPower': { type: Number, decimal: true, defaultValue: 0 },
  'stats.healingPower': { type: Number, decimal: true, defaultValue: 0 },
  'stats.defense': { type: Number, decimal: true, defaultValue: 0 },
  'stats.magicArmor': { type: Number, decimal: true, defaultValue: 0 },
  'stats.armor': { type: Number, decimal: true, defaultValue: 0 },
  'stats.damageTaken': { type: Number, decimal: true, defaultValue: 1 },
  'amulet': { type: Object, optional: true },
  'amulet.energy': { type: Number, decimal: true },
  'amulet.energyStorage': { type: Number, optional: true },
  'amulet.energyRegen': { type: Number, optional: true },
  'amulet.damage': { type: Number, decimal: true, optional: true },
  'mainHandType': { type: String, optional: true },
  'offHandType': { type: String, optional: true },
  buffs: { type: [Object], optional: true, defaultValue: [] },
  'buffs.$.id': { type: String },
  'buffs.$.data': { type: Object, blackbox: true },
  enchantments: { type: [String], optional: true, defaultValue: [] },
  meditatingStartDate: { type: Date, optional: true },
  lastGameUpdated: { type: Date, defaultValue: new Date() },
  xpDistribution: { type: Object, blackbox: true, defaultValue: { attack: 0.5, health: 0.5 } }
});

Combat.attachSchema(CombatSchema);
