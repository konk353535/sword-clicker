import { SLOW_SPEED } from '../attackSpeeds';

const DARKSTEEL_MULTIPLIER = 1.1;
const RADIANT_MULTIPLIER = 1.2;
const ASTRAL_MULTIPLIER = 1.3;
const TITANFOIL_MULTIPLIER = 1.4;
const RELICROCK_MULTIPLIER = 1.5;
const ETERNIUM_MULTIPLIER = 1.7;

const BATTLEAXE_TO_BOW_ATTACKMIN = 1.75;
const BATTLEAXE_TO_BOW_ATTACKMAX = 1.00;
const BATTLEAXE_TO_BOW_ACCURACY = 0.6667;

const KNIFE_TO_QUIVER_ACCURACY = 5.0;

export const ARCHER_ITEMS = {
  teak_bow_scroll: {
    id: 'teak_bow_scroll',
    icon: 'teakBowScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'teak bow scroll',
    teaches: 'teak_bow',
    sellPrice: 1500,
    description: `A teak scroll, made from cursed inks.`,
    shiftActionData: {
      description: 'Learn hidden recipe'
    },
  },
  
  ebony_bow_scroll: {
    id: 'ebony_bow_scroll',
    icon: 'ebonyBowScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'ebony bow scroll',
    teaches: 'ebony_bow',
    sellPrice: 1500,
    description: `An ebony scroll, made from darksteel inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },
  
  fiery_bow_scroll: {
    id: 'fiery_bow_scroll',
    icon: 'fieryBowScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'charred bow scroll',
    teaches: 'fiery_bow',
    sellPrice: 1500,
    description: `A charred scroll, made from radiant inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },
  
  tamarind_bow_scroll: {
    id: 'tamarind_bow_scroll',
    icon: 'tamarindBowScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'tamarind bow scroll',
    teaches: 'tamarind_bow',
    sellPrice: 1500,
    description: `A tamarind scroll, made from astral inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },
  
  magic_bow_scroll: {
    id: 'magic_bow_scroll',
    icon: 'magicBowScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'magic bow scroll',
    teaches: 'magic_bow',
    sellPrice: 1500,
    description: `A magic scroll, made from titanfoil inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },
  
  petrified_bow_scroll: {
    id: 'petrified_bow_scroll',
    icon: 'petrifiedBowScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'petrified bow scroll',
    teaches: 'petrified_bow',
    sellPrice: 1500,
    description: `A petrified scroll, made from relicrock inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },
  
  ancient_bow_scroll: {
    id: 'ancient_bow_scroll',
    icon: 'ancientBowScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'ancient bow scroll',
    teaches: 'ancient_bow',
    sellPrice: 1500,
    description: `An ancient scroll, made from eternium inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },

  cursed_quiver_scroll: {
    id: 'cursed_quiver_scroll',
    icon: 'cursedQuiverScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'cursed quiver scroll',
    teaches: 'cursed_quiver',
    sellPrice: 1500,
    description: `A teak scroll, made from cursed inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },

  darksteel_quiver_scroll: {
    id: 'darksteel_quiver_scroll',
    icon: 'darksteelQuiverScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'darksteel quiver scroll',
    teaches: 'darksteel_quiver',
    sellPrice: 1500,
    description: `An ebony scroll, made from darksteel inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },

  radiant_quiver_scroll: {
    id: 'radiant_quiver_scroll',
    icon: 'radiantQuiverScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'radiant quiver scroll',
    teaches: 'radiant_quiver',
    sellPrice: 1500,
    description: `A charred scroll, made from radiant inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },

  astral_quiver_scroll: {
    id: 'astral_quiver_scroll',
    icon: 'astralQuiverScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'astral quiver scroll',
    teaches: 'astral_quiver',
    sellPrice: 1500,
    description: `A tamarind scroll, made from astral inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },

  titanfoil_quiver_scroll: {
    id: 'titanfoil_quiver_scroll',
    icon: 'titanfoilQuiverScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'titanfoil quiver scroll',
    teaches: 'titanfoil_quiver',
    sellPrice: 1500,
    description: `A magic scroll, made from titanfoil inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },

  relicrock_quiver_scroll: {
    id: 'relicrock_quiver_scroll',
    icon: 'relicrockQuiverScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'relicrock quiver scroll',
    teaches: 'relicrock_quiver',
    sellPrice: 1500,
    description: `A petrified scroll, made from relicrock inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },

  eternium_quiver_scroll: {
    id: 'eternium_quiver_scroll',
    icon: 'eterniumQuiverScroll.svg',
    category: 'crafting',
    isCraftingScroll: true,
    name: 'eternium quiver scroll',
    teaches: 'eternium_quiver',
    sellPrice: 1500,
    description: `An ancient scroll, made from eternium inks.`,
    shiftActionData: {
      description: 'Learn a hidden recipe'
    },
  },

  pine_bow: {
    id: 'pine_bow',
    icon: 'pineBow.svg',
    category: 'combat',
    weaponType: 'bow',
    slot: 'mainHand',
    name: 'pine bow',
    sellPrice: 75,
    description: 'A slow but powerful ranged weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 5 * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 18 * BATTLEAXE_TO_BOW_ATTACKMAX,
      attackSpeed: SLOW_SPEED,
      accuracy: 8 * BATTLEAXE_TO_BOW_ACCURACY,
      criticalChance: 25,
    },
    extraStats: {
      attack: 1.2 * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 5.4 * BATTLEAXE_TO_BOW_ATTACKMAX,
      accuracy: 2,
    },
  },

  poplar_bow: {
    id: 'poplar_bow',
    icon: 'poplarBow.svg',
    category: 'combat',
    weaponType: 'bow',
    slot: 'mainHand',
    name: 'poplar bow',
    sellPrice: 2000,
    description: 'A slow but powerful ranged weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 62.2 * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 223.4 * BATTLEAXE_TO_BOW_ATTACKMAX,
      attackSpeed: SLOW_SPEED,
      accuracy: 99.8 * BATTLEAXE_TO_BOW_ACCURACY,
      criticalChance: 25,
    },
    extraStats: {
      attack: 18.7 * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 67 * BATTLEAXE_TO_BOW_ATTACKMAX,
      accuracy: 29.9,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 80,
    }],
  },

  teak_bow: {
    id: 'teak_bow',
    icon: 'teakBow.svg',
    category: 'combat',
    weaponType: 'bow',
    slot: 'mainHand',
    name: 'teak bow',
    sellPrice: 3000,
    description: 'A slow but powerful ranged weapon of polished teak and filigree cursed metals.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 83.5 * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 300 * BATTLEAXE_TO_BOW_ATTACKMAX,
      attackSpeed: SLOW_SPEED,
      accuracy: 134.1 * BATTLEAXE_TO_BOW_ACCURACY,
      criticalChance: 25,
    },
    extraStats: {
      attack: 25.1 * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 90 * BATTLEAXE_TO_BOW_ATTACKMAX,
      accuracy: 40.2,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95,
    }],
  },
  
  ebony_bow: {
    id: 'ebony_bow',
    icon: 'ebonyBow.svg',
    category: 'combat',
    weaponType: 'bow',
    slot: 'mainHand',
    name: 'ebony bow',
    sellPrice: Math.round(3000 * DARKSTEEL_MULTIPLIER),
    description: 'A slow but powerful ranged weapon of polished ebony and filigree darksteel metals.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 83.5 * DARKSTEEL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 300 * DARKSTEEL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
      attackSpeed: SLOW_SPEED,
      accuracy: 134.1 * DARKSTEEL_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
      criticalChance: 25
    },
    extraStats: {
      attack: 25.1 * DARKSTEEL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 90 * DARKSTEEL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  
  fiery_bow: {
    id: 'fiery_bow',
    icon: 'fieryBow.svg',
    category: 'combat',
    weaponType: 'bow',
    slot: 'mainHand',
    name: 'charred bow',
    sellPrice: Math.round(3000 * RADIANT_MULTIPLIER),
    description: 'A slow but powerful ranged weapon of ember-lit, charred wood and filigree radiant metals.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 83.5 * RADIANT_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 300 * RADIANT_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
      attackSpeed: SLOW_SPEED,
      accuracy: 134.1 * RADIANT_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
      criticalChance: 25
    },
    extraStats: {
      attack: 25.1 * RADIANT_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 90 * RADIANT_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 105
    }]
  },
  
  tamarind_bow: {
    id: 'tamarind_bow',
    icon: 'tamarindBow.svg',
    category: 'combat',
    weaponType: 'bow',
    slot: 'mainHand',
    name: 'tamarind bow',
    sellPrice: Math.round(3000 * ASTRAL_MULTIPLIER),
    description: 'A slow but powerful ranged weapon of polished tamarind and filigree astral metals.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 83.5 * ASTRAL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 300 * ASTRAL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
      attackSpeed: SLOW_SPEED,
      accuracy: 134.1 * ASTRAL_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
      criticalChance: 25
    },
    extraStats: {
      attack: 25.1 * ASTRAL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 90 * ASTRAL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 110
    }]
  },
  
  magic_bow: {
    id: 'magic_bow',
    icon: 'magicBow.svg',
    category: 'combat',
    weaponType: 'bow',
    slot: 'mainHand',
    name: 'magic-infused bow',
    sellPrice: Math.round(3000 * TITANFOIL_MULTIPLIER),
   description: 'A slow but powerful ranged weapon of magic-imbued wood and filigree titanfoil metals.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 83.5 * TITANFOIL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 300 * TITANFOIL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
      attackSpeed: SLOW_SPEED,
      accuracy: 134.1 * TITANFOIL_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
      criticalChance: 25
    },
    extraStats: {
      attack: 25.1 * TITANFOIL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 90 * TITANFOIL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 115
    }]
  },
  
  petrified_bow: {
    id: 'petrified_bow',
    icon: 'petrifiedBow.svg',
    category: 'combat',
    weaponType: 'bow',
    slot: 'mainHand',
    name: 'petrified bow',
    sellPrice: Math.round(3000 * RELICROCK_MULTIPLIER),
    description: 'A slow but powerful ranged weapon of petrified wood and rune-covered relicrock metals.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 83.5 * RELICROCK_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 300 * RELICROCK_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
      attackSpeed: SLOW_SPEED,
      accuracy: 134.1 * RELICROCK_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
      criticalChance: 25
    },
    extraStats: {
      attack: 25.1 * RELICROCK_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 90 * RELICROCK_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 120
    }]
  },
  
  ancient_bow: {
    id: 'ancient_bow',
    icon: 'ancientBow.svg',
    category: 'combat',
    weaponType: 'bow',
    slot: 'mainHand',
    name: 'ancient bow',
    sellPrice: Math.round(3000 * ETERNIUM_MULTIPLIER),
    description: 'A slow but powerful ranged weapon of ancient wood and faintly-glowing eternium metals.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 83.5 * ETERNIUM_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 300 * ETERNIUM_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
      attackSpeed: SLOW_SPEED,
      accuracy: 134.1 * ETERNIUM_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
      criticalChance: 25
    },
    extraStats: {
      attack: 25.1 * ETERNIUM_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
      attackMax: 90 * ETERNIUM_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  
  copper_quiver: { // quiver with mutated accuracy and no bonus damage
    id: 'copper_quiver',
    icon: 'copperQuiver.svg',
    category: 'combat',
    weaponType: 'quiver',
    slot: 'offHand',
    name: 'copper quiver',
    sellPrice: 75,
    description: 'Used with a bow.',
    isEquippable: true,
    stats: {
      accuracy: 1 * KNIFE_TO_QUIVER_ACCURACY,
    },
    extraStats: {
      accuracy: 3 * KNIFE_TO_QUIVER_ACCURACY,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 0,
    }],
  },

  meteorite_quiver: { // quiver with mutated accuracy and no bonus damage
    id: 'meteorite_quiver',
    icon: 'meteoriteQuiver.svg',
    category: 'combat',
    weaponType: 'quiver',
    slot: 'offHand',
    name: 'meteorite quiver',
    sellPrice: 1275,
    description: 'Used with a bow.',
    isEquippable: true,
    stats: {
      accuracy: 9 * KNIFE_TO_QUIVER_ACCURACY
    },
    extraStats: {
      accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 80
    }]
  },

  cursed_quiver: { // quiver with mutated accuracy and no bonus damage
    id: 'cursed_quiver',
    icon: 'cursedQuiver.svg',
    category: 'combat',
    weaponType: 'quiver',
    slot: 'offHand',
    name: 'cursed quiver',
    sellPrice: 1500,
    description: 'A fine quiver made from cursed metals and filled with teak arrows.  Bows are useless without quivers.',
    isEquippable: true,
    stats: {
      accuracy: 10.5 * KNIFE_TO_QUIVER_ACCURACY
    },
    extraStats: {
      accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95
    }]
  },

  darksteel_quiver: {
    id: 'darksteel_quiver',
    icon: 'darksteelQuiver.svg',
    category: 'combat',
    weaponType: 'quiver',
    slot: 'offHand',
    name: 'darksteel quiver',
    sellPrice: 1575,
    description: 'A fine quiver made from darksteel metals and filled with ebony arrows.  Bows are useless without quivers.',
    isEquippable: true,
    stats: {
      accuracy: 12 * KNIFE_TO_QUIVER_ACCURACY
    },
    extraStats: {
      accuracy: 5 * KNIFE_TO_QUIVER_ACCURACY
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },

  radiant_quiver: {
    id: 'radiant_quiver',
    icon: 'radiantQuiver.svg',
    category: 'combat',
    weaponType: 'quiver',
    slot: 'offHand',
    name: 'radiant quiver',
    sellPrice: 1650,
    description: 'A fine quiver made from radiant metals and filled with charred arrows.  Bows are useless without quivers.',
    isEquippable: true,
    stats: {
      accuracy: 13.5 * KNIFE_TO_QUIVER_ACCURACY
    },
    extraStats: {
      accuracy: 6 * KNIFE_TO_QUIVER_ACCURACY
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 105
    }]
  },

  astral_quiver: {
    id: 'astral_quiver',
    icon: 'astralQuiver.svg',
    category: 'combat',
    weaponType: 'quiver',
    slot: 'offHand',
    name: 'astral quiver',
    sellPrice: 1725,
    description: 'A fine quiver made from astral metals and filled with tamarind arrows.  Bows are useless without quivers.',
    isEquippable: true,
    stats: {
      accuracy: 15 * KNIFE_TO_QUIVER_ACCURACY
    },
    extraStats: {
      accuracy: 7 * KNIFE_TO_QUIVER_ACCURACY
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 110
    }]
  },

  titanfoil_quiver: {
    id: 'titanfoil_quiver',
    icon: 'titanfoilQuiver.svg',
    category: 'combat',
    weaponType: 'quiver',
    slot: 'offHand',
    name: 'titanfoil quiver',
    sellPrice: 1800,
    description: 'A fine quiver made from titanfoil metals and filled with magic arrows.  Bows are useless without quivers.',
    isEquippable: true,
    stats: {
      accuracy: 17 * KNIFE_TO_QUIVER_ACCURACY
    },
    extraStats: {
      accuracy: 8 * KNIFE_TO_QUIVER_ACCURACY
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 115
    }]
  },

  relicrock_quiver: {
    id: 'relicrock_quiver',
    icon: 'relicrockQuiver.svg',
    category: 'combat',
    weaponType: 'quiver',
    slot: 'offHand',
    name: 'relicrock quiver',
    sellPrice: 1875,
    description: 'A fine quiver made from relicrock metals and filled with petrified arrows.  Bows are useless without quivers.',
    isEquippable: true,
    stats: {
      accuracy: 19 * KNIFE_TO_QUIVER_ACCURACY
    },
    extraStats: {
      accuracy: 9 * KNIFE_TO_QUIVER_ACCURACY
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 120
    }]
  },

  eternium_quiver: {
    id: 'eternium_quiver',
    icon: 'eterniumQuiver.svg',
    category: 'combat',
    weaponType: 'quiver',
    slot: 'offHand',
    name: 'eternium quiver',
    sellPrice: 1950,
    description: 'A fine quiver made from eternium metals and filled with ancient arrows.  Bows are useless without quivers.',
    isEquippable: true,
    stats: {
      accuracy: 22 * KNIFE_TO_QUIVER_ACCURACY
    },
    extraStats: {
      accuracy: 13 * KNIFE_TO_QUIVER_ACCURACY
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },

};
