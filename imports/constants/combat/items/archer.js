import { SLOW_SPEED, MEDIUM_SPEED} from '../attackSpeeds';

const BATTLEAXE_TO_BOW_ATTACKMIN = 1.15;
const BATTLEAXE_TO_BOW_ATTACKMAX = 1.00;
const BATTLEAXE_TO_BOW_ACCURACY = 0.6667;
const KNIFE_TO_QUIVER_ACCURACY = 2.0;

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
      description: 'Learn hidden recipe'
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
      attackSpeed: 0.3,
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
      attackSpeed: 0.3,
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
      attackSpeed: 0.3,
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

  copper_quiver: { // knife with mutated accuracy and no bonus damage
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

  meteorite_quiver: { // knife with mutated accuracy and no bonus damage
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

  cursed_quiver: { // knife with mutated accuracy and no bonus damage
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

};
