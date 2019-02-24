import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { ITEM_RARITIES } from '/imports/constants/items/index.js';

export const Items = new Mongo.Collection('items');

ItemsSchema = new SimpleSchema({
  itemId: { type: String },
  category: { type: String, optional: true },
  amount: { type: Number, defaultValue: 1 },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  equipped: { type: Boolean, defaultValue: false },
  enhanced: { type: Boolean, optional: true },
  slot: { type: String, optional: true },
  extraStats: { type: Object, blackbox: true, optional: true },
  quality: { type: Number, optional: true },
  rarityId: { type: String, optional: true },
  enchantmentId: { type: String, optional: true },
  enchantmentDescription: { type: String, optional: true },
  hidden: { type: Boolean, optional: true }
});

Items.attachSchema(ItemsSchema);

export const applyRarities = function applyRarities(statsObj, rarityId) {
  try {
    if ((rarityId) && (typeof rarityId === 'string')) {
      const rarityIdConsts = ITEM_RARITIES[rarityId];
      if ((rarityIdConsts) && (rarityIdConsts.statBonuses)) {
        const newStatsObj = Object.assign({}, statsObj);
        Object.keys(newStatsObj).forEach((statName) => {
          newStatsObj[statName] = newStatsObj[statName] * ((100.0 + rarityIdConsts.statBonuses) / 100.0);
        });
        return newStatsObj;
      }
    }
  } catch (err) {
  }
  
  return statsObj;
};