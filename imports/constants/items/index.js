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
  // Crafting T-1 (next - 30)
  crude: {
    rarityId: 'crude',
    label: '',
    color: '',
    statBonuses: -50.0,
    nextRarity: {
      rarityId: 'rough',
      successChance: 75.0, // 75% chance (plus 1% chance per crafting skill level above recipe to craft this)
    },
    prevRarity: {
      rarityId: 'crude'
    },
  },
  
  // Crafting T0 (next - 20)
  rough: {
    rarityId: 'rough',
    label: '',
    color: '',
    statBonuses: -20.0,
    nextRarity: {
      rarityId: 'standard',
      successChance: 60.0, // 60% chance (plus 1% chance per crafting skill level above recipe to craft this)
    },
    prevRarity: {
      rarityId: 'crude'
    },
  },
  
  // Crafting T1
  standard: {
    rarityId: 'standard',
    label: '',
    color: '',
    statBonuses: 0.0,
    nextRarity: {
      rarityId: 'improved',
      successChance: 45.0, // 45% chance (plus 1% chance per crafting skill level above recipe to craft this)
    },
    prevRarity: {
      rarityId: 'rough'
    },
  },
  
  // Crafting T2 (last + 20)
  improved: {
    rarityId: 'improved',
    label: 'Improved',
    color: '998800',
    statBonuses: 20.0,
    nextRarity: {
      rarityId: 'mastercrafted',
      successChance: 30.0, // 30% chance (plus 1% chance per crafting skill level above recipe to craft this)
    },
    prevRarity: {
      rarityId: 'standard'
    },
  },
  
  // Crafting T3 (last + 30)
  mastercrafted: {
    rarityId: 'mastercrafted',
    label: 'Mastercrafted',
    color: 'cc7700',
    statBonuses: 50.0,
    nextRarity: {
      rarityId: 'masterforged',
      successChance: 15.0, // 15% chance (plus 1% chance per crafting skill level above recipe to craft this)
    },
    prevRarity: {
      rarityId: 'improved'
    },
  },
  
  // Crafting T4 (last + 50)
  masterforged: {
    rarityId: 'masterforged',
    label: 'Masterforged',
    color: 'ee6622',
    statBonuses: 100.0,
    nextRarity: {
      rarityId: 'ascended',
      successChance: 5.0, // 5% chance (plus 1% chance per crafting skill level above recipe to craft this)
    },
    prevRarity: {
      rarityId: 'mastercrafted'
    },
  },
  
  // Crafting T5 (last + 70)
  ascended: {
    rarityId: 'ascended',
    label: 'Ascended',
    color: 'ff2266',
    statBonuses: 170.0,
    nextRarity: {
      rarityId: 'ethereal',
      successChance: -5.0, // -5% chance (plus 1% chance per crafting skill level above recipe to craft this)
    },
    prevRarity: {
      rarityId: 'masterforged'
    },
  },
  
  // Crafting T6 (last + 90)
  ethereal: {
    rarityId: 'ethereal',
    label: 'Ethereal',
    color: 'FF5599',
    statBonuses: 260.0,
    prevRarity: {
      rarityId: 'ascended'
    },
  },
  
  // Looted T1
  uncommon: {
    rarityId: '',
    label: 'Uncommon',
    color: '66aa00',
    statBonuses: 0.0,
  },
  
  // Looted T2 (last + 18.75)
  fine: {
    label: 'Fine',
    rarityId: 'fine',
    color: '66aaaa',
    statBonuses: 18.75,
  },
 
  // Looted T3 (last + 18.75)
  rare: {
    label: 'Rare',
    rarityId: 'rare',
    color: '3388aa',
    statBonuses: 37.5,
  },
 
  // Looted T4 (last + 37.5)
  extraordinary: {
    rarityId: 'extraordinary',
    label: 'Extraordinary',
    color: '3366aa',
    statBonuses: 75.0,
  },
  
  // Looted T5 (last + 75)
  phenomenal: {
    rarityId: 'phenomenal',
    label: 'Phenomenal',
    color: '0055cc',
    statBonuses: 150.0,
  },
  
  // Looted T6 (last + 150)
  epic: {
    rarityId: 'epic',
    label: 'Epic',
    color: '0022ee',
    statBonuses: 300.0,
  },
  
  // Looted T7 (last + 200)
  divine: {
    rarityId: 'divine',
    label: 'Divine',
    color: '0022ee',
    statBonuses: 500.0,
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
    color: '6633ff',
    statBonuses: 0.0,
  },
  
  // Special (non-tiered): for artifact items
  artifact: {
    rarityId: 'artifact',
    label: 'Artifact',
    color: '44cc44',
    statBonuses: 0.0,
  },
};
