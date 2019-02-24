import { MISC_ITEMS } from './items';
import { FARMING_ITEMS } from '../farming/items';
import { COMBAT_ITEMS } from '../combat/items';
import { CRAFTING_ITEMS } from '../crafting/items';
import { MINING_ITEMS } from '../mining/items';
import { WOODCUTTING_ITEMS } from '../woodcutting/items';
import { INSCRIPTION_ITEMS } from '../inscription/items';
import { ASTRONOMY_ITEMS } from '../astronomy/items';

export const ITEMS = Object.assign(
  MISC_ITEMS,
  COMBAT_ITEMS,
  CRAFTING_ITEMS,
  MINING_ITEMS,
  WOODCUTTING_ITEMS,
  FARMING_ITEMS,
  INSCRIPTION_ITEMS,
  ASTRONOMY_ITEMS
);

export const ITEM_RARITIES = {
  // Crafting T1
  standard: {
    rarityId: 'standard',
    label: '',
    color: '',
    statBonuses: 0.0,
  },
  
  // Crafting T2
  improved: {
    rarityId: 'improved',
    label: 'Improved',
    color: '998800',
    statBonuses: 20.0,
  },
  
  // Crafting T3
  mastercrafted: {
    rarityId: 'mastercrafted',
    label: 'Mastercrafted',
    color: 'cc7700',
    statBonuses: 50.0,
  },
  
  // Looted T1
  uncommon: {
    rarityId: '',
    label: 'Uncommon',
    color: '66aa00',
    statBonuses: 0.0,
  },
  
  // Looted T2
  fine: {
    label: 'Fine',
    rarityId: 'fine',
    color: '66aaaa',
    statBonuses: 18.75,
  },
 
  // Looted T3  
  rare: {
    label: 'Rare',
    rarityId: 'rare',
    color: '3388aa',
    statBonuses: 37.5,
  },
 
  // Looted T4
  extraordinary: {
    rarityId: 'extraordinary',
    label: 'Extraordinary',
    color: '3366aa',
    statBonuses: 75.0,
  },
  
  // Looted T5
  phenomenal: {
    rarityId: 'phenomenal',
    label: 'Phenomenal',
    color: '0055cc',
    statBonuses: 150.0,
  },
  
  // Special (non-tiered): for boss drops
  prized: {
    rarityId: 'prized',
    label: 'Prized',
    color: '883388',
    statBonuses: 0.0,
  },
  
  // Special (non-tiered): for legendary items
  legendary: {
    rarityId: 'legendary',
    label: 'Legendary',
    color: 'cc44cc',
    statBonuses: 0.0,
  },
  
  // Special (non-tiered): for legendary items
  artifact: {
    rarityId: 'artifact',
    label: 'Artifact',
    color: 'ff4422',
    statBonuses: 0.0,
  },
};
