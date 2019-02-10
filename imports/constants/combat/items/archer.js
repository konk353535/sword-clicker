import { SLOW_SPEED, MEDIUM_SPEED} from '../attackSpeeds';

export const ARCHER_ITEMS = {
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
      attack: 5*1.15,
      attackMax: 18*1.15,
      attackSpeed: 0.3,
      accuracy: 8,
      criticalChance: 25,
    },
    extraStats: {
      attack: 1.2*1.15,
      attackMax: 5.4*1.15,
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
      attack: 62.2*1.15,
      attackMax: 223.4*1.15,
      attackSpeed: 0.3,
      accuracy: 99.8,
      criticalChance: 25,
    },
    extraStats: {
      attack: 18.7*1.15,
      attackMax: 67*1.15,
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
    description: 'A slow but powerful ranged weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 83.5*1.15,
      attackMax: 300*1.15,
      attackSpeed: 0.3,
      accuracy: 134.1,
      criticalChance: 25,
    },
    extraStats: {
      attack: 25.1*1.15,
      attackMax: 90*1.15,
      accuracy: 40.2,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95,
    }],
  },
  
  copper_quiver: {
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
      accuracy: 1*1.5,
    },
    extraStats: {
      accuracy: 3*1.5,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 0,
    }],
  },

  meteorite_quiver: {
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
      accuracy: 9*1.5
    },
    extraStats: {
      accuracy: 4*1.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 80
    }]
  },

  cursed_quiver: {
    id: 'cursed_quiver',
    icon: 'cursedQuiver.svg',
    category: 'combat',
    weaponType: 'quiver',
    slot: 'offHand',
    name: 'cursed quiver',
    sellPrice: 1500,
    description: 'Used with a bow.',
    isEquippable: true,
    stats: {
      accuracy: 10.5*1.5
    },
    extraStats: {
      accuracy: 4*1.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95
    }]
  },
  
};
