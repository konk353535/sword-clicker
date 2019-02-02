import { SLOW_SPEED, MEDIUM_SPEED} from '../attackSpeeds';

// Note: original staff MP values before rebalancing
//
// tier    wood staff          magic power     healing bonus
// ------  ------------------  --------------  -------------
// 0       ?
// 1       pine staff (?)      MP  
// 2       beech staff         MP  12 + 0-2
// 3       ash staff (?)       MP  
// 4       oak staff           MP  13 + 0-2
// 5       maple staff (?)     MP  
// 6       walnut staff        MP  21 + 0-2
// 7       cherry staff (?)    MP  
// 8       mahogany staff      MP  19 + 0-2    HB 8%
// 9       elm staff (?)       MP  
// 10      black staff         MP  26 + 0-2
// 11      blue gum staff      MP  26 + 0-2    HB 8%
// 12      cedar staff         MP  30 + 0-2
// 13      denya staff         MP  32 + 0-2    HB 8%
// 14      gombe staff         MP  34 + 0-2    HB 8%
// 15      hickory staff       MP  36 + 0-2
// 16      larch staff         MP  38 + 0-2    HB 8%
// 17      poplar staff        MP  40 + 0-2
// 18      tali staff          MP  42 + 0-2    HB 8%
// 19      willow staff        MP  50 + 0-2
// 20      teak staff          MP  55 + 0-2    HB 8%
//
// ? = missing item

export const STAFF_ITEMS = {
  pine_staff: {
    id: 'pine_staff',
    icon: 'pineStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'pine staff',
    sellPrice: 50,
    description: 'What seems like a normal pine staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 2,
      attackMax: 4,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 10,
      magicPower: 8
    },
    extraStats: {
      magicPower: 2
    }
  },

  beech_staff: {
    id: 'beech_staff',
    icon: 'beechStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'beech staff',
    sellPrice: 100,
    description: 'What seems like a normal beech staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 13,
      magicPower: 10
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 1
    }]
  },

  ash_staff: {
    id: 'ash_staff',
    icon: 'ashStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'ash staff',
    sellPrice: 150,
    description: 'What seems like a normal ash staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 6,
      attackMax: 8,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 15,
      magicPower: 12
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 3
    }]
  },

  oak_staff: {
    id: 'oak_staff',
    icon: 'oakStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'oak staff',
    sellPrice: 200,
    description: 'What seems like a normal oak staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 8,
      attackMax: 10,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 18,
      magicPower: 14
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 3
    }]
  },

  maple_staff: {
    id: 'maple_staff',
    icon: 'mapleStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'maple staff',
    sellPrice: 250,
    description: 'What seems like a normal maple staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 10,
      attackMax: 12,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 21,
      magicPower: 16
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 6
    }]
  },

  walnut_staff: {
    id: 'walnut_staff',
    icon: 'walnutStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'walnut staff',
    sellPrice: 300,
    description: 'What seems like a normal walnut staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 12,
      attackMax: 14,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 23,
      magicPower: 18
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 9
    }]
  },

  cherry_staff: {
    id: 'cherry_staff',
    icon: 'cherryStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'cherry staff',
    sellPrice: 350,
    description: 'What seems like a normal cherry staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 14,
      attackMax: 16,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 26,
      magicPower: 20
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 12
    }]
  },

  mahogany_staff: {
    id: 'mahogany_staff',
    icon: 'mahoganyStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'mahogany staff',
    sellPrice: 400,
    description: 'What seems like a normal mahogany staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 16,
      attackMax: 18,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 28,
      magicPower: 22
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  elm_staff: {
    id: 'elm_staff',
    icon: 'elkStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'elm staff',
    sellPrice: 450,
    description: 'What seems like a normal elm staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 18,
      attackMax: 20,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 31,
      magicPower: 24
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 18
    }]
  },

  black_staff: {
    id: 'black_staff',
    icon: 'blackStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'black staff',
    sellPrice: 500,
    description: 'What seems like a normal black staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 20,
      attackMax: 22,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 34,
      magicPower: 26
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 21
    }]
  },

  blue_gum_staff: {
    id: 'blue_gum_staff',
    icon: 'blueGumStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'blue gum staff',
    sellPrice: 550,
    description: 'What seems like a normal blue gum staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 22,
      attackMax: 24,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 36,
      magicPower: 29
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 24
    }]
  },

  cedar_staff: {
    id: 'cedar_staff',
    icon: 'cedarStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'cedar staff',
    sellPrice: 600,
    description: 'What seems like a normal cedar staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 24,
      attackMax: 26,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 39,
      magicPower: 32
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 27
    }]
  },

  denya_staff: {
    id: 'denya_staff',
    icon: 'denyaStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'denya staff',
    sellPrice: 650,
    description: 'What seems like a normal denya staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 26,
      attackMax: 28,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 41,
      magicPower: 35
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  gombe_staff: {
    id: 'gombe_staff',
    icon: 'gombeStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'gombe staff',
    sellPrice: 700,
    description: 'What seems like a normal gombe staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 28,
      attackMax: 30,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 44,
      magicPower: 38
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 33
    }]
  },

  hickory_staff: {
    id: 'hickory_staff',
    icon: 'hickoryStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'hickory staff',
    sellPrice: 750,
    description: 'What seems like a normal hickory staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 30,
      attackMax: 32,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 47,
      magicPower: 41
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 36
    }]
  },

  larch_staff: {
    id: 'larch_staff',
    icon: 'larchStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'larch staff',
    sellPrice: 800,
    description: 'What seems like a normal larch staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 32,
      attackMax: 34,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 49,
      magicPower: 44
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 39
    }]
  },

  poplar_staff: {
    id: 'poplar_staff',
    icon: 'poplarStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'poplar staff',
    sellPrice: 850,
    description: 'What seems like a normal poplar staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 34,
      attackMax: 36,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 52,
      magicPower: 47
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 42
    }]
  },

  tali_staff: {
    id: 'tali_staff',
    icon: 'taliStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'tali staff',
    sellPrice: 900,
    description: 'What seems like a normal tali staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 36,
      attackMax: 38,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 54,
      magicPower: 50
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 45
    }]
  },

  willow_staff: {
    id: 'willow_staff',
    icon: 'willowStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'willow staff',
    sellPrice: 950,
    description: 'What seems like a normal willow staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 38,
      attackMax: 40,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 57,
      magicPower: 53
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 48
    }]
  },

  teak_staff: {
    id: 'teak_staff',
    icon: 'teakStaff.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'teak staff',
    sellPrice: 1000,
    description: 'What seems like a normal teak staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,  stats: {
      attack: 40,
      attackMax: 42,
      attackSpeed: SLOW_SPEED,
      healingPower: 5,
      accuracy: 60,
      magicPower: 56
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 51
    }]
  },

  dwarven_staff: {
    id: 'dwarven_staff',
    icon: 'dwarvenStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'dwarven staff',
    sellPrice: 1400,
    description: 'A staff from an old dwarf',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 15,
      attackMax: 25,
      attackSpeed: SLOW_SPEED,
      accuracy: 30,
      magicPower: 35,
      defense: -20
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  },

  ruby_staff: {
    id: 'ruby_staff',
    icon: 'rubyStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'ruby staff',
    sellPrice: 2400,
    description: 'The ruby lusts for blood',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 15,
      attackMax: 25,
      attackSpeed: SLOW_SPEED,
      accuracy: 25,
      magicPower: 43,
      defense: -30,
      armor: -25,
      healthMax: 100
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 25
    }]
  },

  copper_wand: {
    id: 'copper_wand',
    icon: 'copperWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'copper wand',
    sellPrice: 350,
    description: 'What seems like a copper wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 0,
      attackSpeed: SLOW_SPEED,
      accuracy: 4,
      magicPower: 6.75
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 0
    }]
  },

  tin_wand: {
    id: 'tin_wand',
    icon: 'tinWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'tin wand',
    sellPrice: 700,
    description: 'What seems like a tin wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 2,
      attackSpeed: SLOW_SPEED,
      accuracy: 6,
      magicPower: 8
    },
    extraStats: {
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 1
    }]
  },

  bronze_wand: {
    id: 'bronze_wand',
    icon: 'bronzeWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'bronze wand',
    sellPrice: 1050,
    description: 'What seems like a bronze wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 4,
      attackSpeed: SLOW_SPEED,
      accuracy: 8,
      magicPower: 9.25
    },
    extraStats: {
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 3
    }]
  },

  iron_wand: {
    id: 'iron_wand',
    icon: 'ironWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'iron wand',
    sellPrice: 1400,
    description: 'What seems like an iron wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 6,
      attackSpeed: SLOW_SPEED,
      accuracy: 10,
      magicPower: 10.5
    },
    extraStats: {
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 3
    }]
  },

  silver_wand: {
    id: 'silver_wand',
    icon: 'silverWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'silver wand',
    sellPrice: 1750,
    description: 'What seems like a silver wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 8,
      attackSpeed: SLOW_SPEED,
      accuracy: 12,
      magicPower: 11.75
    },
    extraStats: {
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 6
    }]
  },

  gold_wand: {
    id: 'gold_wand',
    icon: 'goldWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'gold wand',
    sellPrice: 2100,
    description: 'What seems like a gold wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 10,
      attackSpeed: SLOW_SPEED,
      accuracy: 14,
      magicPower: 13
    },
    extraStats: {
      magicPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 9
    }]
  },

  carbon_wand: {
    id: 'carbon_wand',
    icon: 'carbonWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'carbon wand',
    sellPrice: 2450,
    description: 'What seems like a carbon wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 12,
      attackSpeed: SLOW_SPEED,
      accuracy: 16,
      magicPower: 14.25
    },
    extraStats: {
      magicPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 12
    }]
  },

  steel_wand: {
    id: 'steel_wand',
    icon: 'steelWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'steel wand',
    sellPrice: 2800,
    description: 'What seems like a steel wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 14,
      attackSpeed: SLOW_SPEED,
      accuracy: 18,
      magicPower: 15.5
    },
    extraStats: {
      magicPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  platinum_wand: {
    id: 'platinum_wand',
    icon: 'platinumWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'platinum wand',
    sellPrice: 3150,
    description: 'What seems like a platinum wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 16,
      attackSpeed: SLOW_SPEED,
      accuracy: 20,
      magicPower: 16.75
    },
    extraStats: {
      magicPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 18
    }]
  },

  titanium_wand: {
    id: 'titanium_wand',
    icon: 'titaniumWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'titanium wand',
    sellPrice: 3500,
    description: 'What seems like a titanium wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 18,
      attackSpeed: SLOW_SPEED,
      accuracy: 22,
      magicPower: 18
    },
    extraStats: {
      magicPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 21
    }]
  },

  tungsten_wand: {
    id: 'tungsten_wand',
    icon: 'tungstenWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'tungsten wand',
    sellPrice: 3850,
    description: 'What seems like a tungsten wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 20,
      attackSpeed: SLOW_SPEED,
      accuracy: 24,
      magicPower: 19.5
    },
    extraStats: {
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 24
    }]
  },

  obsidian_wand: {
    id: 'obsidian_wand',
    icon: 'obsidianWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'obsidian wand',
    sellPrice: 4200,
    description: 'What seems like an obsidian wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 22,
      attackSpeed: SLOW_SPEED,
      accuracy: 26,
      magicPower: 21
    },
    extraStats: {
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 27
    }]
  },

  cobalt_wand: {
    id: 'cobalt_wand',
    icon: 'cobaltWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'cobalt wand',
    sellPrice: 4550,
    description: 'What seems like a cobalt wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 24,
      attackSpeed: SLOW_SPEED,
      accuracy: 28,
      magicPower: 22.5
    },
    extraStats: {
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  mithril_wand: {
    id: 'mithril_wand',
    icon: 'mithrilWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'mithril wand',
    sellPrice: 4900,
    description: 'What seems like a mithril wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 26,
      attackSpeed: SLOW_SPEED,
      accuracy: 30,
      magicPower: 24
    },
    extraStats: {
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 33
    }]
  },

  adamantium_wand: {
    id: 'adamantium_wand',
    icon: 'adamantiumWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'adamantium wand',
    sellPrice: 5250,
    description: 'What seems like an adamantium wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 28,
      attackSpeed: SLOW_SPEED,
      accuracy: 32,
      magicPower: 25.5
    },
    extraStats: {
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 36
    }]
  },

  orichalcum_wand: {
    id: 'orichalcum_wand',
    icon: 'orichalcumWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'orichalcum wand',
    sellPrice: 5600,
    description: 'What seems like an orichalcum wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 30,
      attackSpeed: SLOW_SPEED,
      accuracy: 34,
      magicPower: 27
    },
    extraStats: {
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 39
    }]
  },

  meteorite_wand: {
    id: 'meteorite_wand',
    icon: 'meteoriteWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'meteorite wand',
    sellPrice: 5950,
    description: 'What seems like a meteorite wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 32,
      attackSpeed: SLOW_SPEED,
      accuracy: 36,
      magicPower: 28.5
    },
    extraStats: {
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 42
    }]
  },

  fairy_steel_wand: {
    id: 'fairy_steel_wand',
    icon: 'fairySteelWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'fairy steel wand',
    sellPrice: 6300,
    description: 'What seems like a fairy steel wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 34,
      attackSpeed: SLOW_SPEED,
      accuracy: 38,
      magicPower: 30
    },
    extraStats: {
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 45
    }]
  },

  elven_steel_wand: {
    id: 'elven_steel_wand',
    icon: 'elvenSteelWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'elven steel wand',
    sellPrice: 6650,
    description: 'What seems like an elven steel wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 36,
      attackSpeed: SLOW_SPEED,
      accuracy: 40,
      magicPower: 31.5
    },
    extraStats: {
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 48
    }]
  },

  cursed_wand: {
    id: 'cursed_wand',
    icon: 'cursedWand.png',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'cursed wand',
    sellPrice: 7000,
    description: 'What seems like a cursed wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 38,
      attackSpeed: SLOW_SPEED,
      accuracy: 42,
      magicPower: 33
    },
    extraStats: {
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 51
    }]
  },
  
  brown_trident: {
    id: 'brown_trident',
    icon: 'brownTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'brown trident',
    sellPrice: 200,
    description: 'A sharp trident, beaming with magical energy.',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 6,
      attackMax: 12,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 14,
      magicPower: 8
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },

  blue_trident: {
    id: 'blue_trident',
    icon: 'blueTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'blue trident',
    sellPrice: 400,
    description: 'What seems like a normal walnut staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 8,
      attackMax: 15,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 19,
      magicPower: 12
    },
    enchantments: ['magic_blade'],
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 10
    }]
  },
  
  purple_trident: {
    id: 'purple_trident',
    icon: 'purpleTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'purple trident',
    sellPrice: 1000,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 15,
      attackMax: 25,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 39,
      magicPower: 28,
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  },

  orange_trident: {
    id: 'orange_trident',
    icon: 'orangeTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'orange trident',
    sellPrice: 2000,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 20,
      attackMax: 30,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 44,
      magicPower: 31,
    },
    extraStats: {
      attack: 5,
      attackMax: 5,
      accuracy: 8,
      magicPower: 3
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  amber_trident: {
    id: 'amber_trident',
    icon: 'amberTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'amber trident',
    sellPrice: 3250,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 27,
      attackMax: 40,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 50,
      magicPower: 34,
    },
    extraStats: {
      attack: 6,
      attackMax: 6,
      accuracy: 8,
      magicPower: 4
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 40
    }]
  },

  violet_trident: {
    id: 'violet_trident',
    icon: 'violetTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'violet trident',
    sellPrice: 5000,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 34,
      attackMax: 50,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 58,
      magicPower: 37,
    },
    extraStats: {
      attack: 7,
      attackMax: 7,
      accuracy: 8,
      magicPower: 5
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 45
    }]
  },

  crimson_trident: {
    id: 'crimson_trident',
    icon: 'crimsonTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'crimson trident',
    sellPrice: 7500,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 41,
      attackMax: 60,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 64,
      magicPower: 40,
    },
    extraStats: {
      attack: 8,
      attackMax: 8,
      accuracy: 10,
      magicPower: 6
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 48
    }]
  },

  azure_trident: {
    id: 'azure_trident',
    icon: 'azureTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'azure trident',
    sellPrice: 10000,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 48,
      attackMax: 70,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 72,
      magicPower: 43,
    },
    extraStats: {
      attack: 9,
      attackMax: 9,
      accuracy: 10,
      magicPower: 7
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 51
    }]
  },

  verdant_trident: {
    id: 'verdant_trident',
    icon: 'verdantTridant.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'verdant trident',
    sellPrice: 15000,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 55,
      attackMax: 80,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 80,
      magicPower: 46,
    },
    extraStats: {
      attack: 10,
      attackMax: 10,
      accuracy: 10,
      magicPower: 8
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 54
    }]
  },

  serpent_trident: {
    id: 'serpent_trident',
    icon: 'serpentTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'serpent trident',
    sellPrice: 20000,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 65,
      attackMax: 95,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 92,
      magicPower: 50,
    },
    extraStats: {
      attack: 12,
      attackMax: 12,
      accuracy: 15,
      magicPower: 10
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 57
    }]
  },

  inferno_trident: {
    id: 'inferno_trident',
    icon: 'infernoTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'inferno trident',
    sellPrice: 20000,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 75,
      attackMax: 120,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 108,
      magicPower: 56,
    },
    extraStats: {
      attack: 14,
      attackMax: 14,
      accuracy: 15,
      magicPower: 12
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 67
    }]
  },

  exalted_trident: {
    id: 'exalted_trident',
    icon: 'exaltedTrident.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'exalted trident',
    sellPrice: 32500,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 90,
      attackMax: 150,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 130,
      magicPower: 65,
    },
    extraStats: {
      attack: 17,
      attackMax: 25,
      accuracy: 25,
      magicPower: 20
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 77
    }]
  },

  copper_hammer: {
    id: 'copper_hammer',
    icon: 'copperHammer.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'copper hammer',
    sellPrice: 50,
    description: 'What seems like a copper hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: SLOW_SPEED,
      accuracy: 5,
      defense: 3,
      magicArmor: 10,
      magicPower: 5
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 1
    }]
  },

  obsidian_hammer: {
    id: 'obsidian_hammer',
    icon: 'obsidianHammer.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'obsidian hammer',
    sellPrice: 750,
    description: 'What seems like a obsidian hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 12,
      attackMax: 19,
      attackSpeed: SLOW_SPEED,
      accuracy: 18,
      magicPower: 12,
      defense: 8  ,
      magicArmor: 40
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  gold_hammer: {
    id: 'gold_hammer',
    icon: 'goldHammer.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'gold hammer',
    sellPrice: 350,
    description: 'What seems like a gold hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 6,
      attackMax: 11,
      attackSpeed: SLOW_SPEED,
      accuracy: 8,
      magicPower: 7,
      magicArmor: 25,
      defense: 10
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },

  mithril_hammer: {
    id: 'mithril_hammer',
    icon: 'mithrilHammer.png',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'mithril hammer',
    sellPrice: 1150,
    description: 'What seems like a mithril hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 14,
      attackMax: 24,
      attackSpeed: SLOW_SPEED,
      accuracy: 24,
      magicPower: 16,
      magicArmor: 50,
      defense: 12
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  }
  
};
