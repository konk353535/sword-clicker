import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import lodash from 'lodash';

import { ITEM_RARITIES } from '/imports/constants/items/index.js';

import { CDbl } from '/imports/utils.js';

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
  let localStatsObj;
  
  try {
    localStatsObj = lodash.cloneDeep(statsObj);

    if ((rarityId) && (typeof rarityId === 'string')) {
      const rarityIdConsts = ITEM_RARITIES[rarityId];
      if ((rarityIdConsts) && (rarityIdConsts.statBonuses)) {
        Object.keys(localStatsObj).forEach((statName) => {
          // disallow % bonuses to attack speed
          if (statName !== 'attackSpeed') {
            // ensure that property refers to a stat that is a number and valued more than 0 (non-numeric/non-positive/non-zero all disallowed)
            if (CDbl(localStatsObj[statName]) > 0.0) {
              localStatsObj[statName] = localStatsObj[statName] * ((100.0 + rarityIdConsts.statBonuses) / 100.0);
            }
          }
        });
      }
    }
  } catch (err) {
  }
  
  return ((localStatsObj) ? localStatsObj : statsObj);
};