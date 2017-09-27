import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const MISC_ITEMS = {
  thirsting_saber: {
    id: 'thirsting_saber',
    icon: 'thirstingSaber.svg',
    category: 'combat',
    weaponType: 'sword',
    slot: 'mainHand',
    name: 'thirsting saber',
    sellPrice: 2500,
    description: 'The blade seems to hunger for blood.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 30,
      attackMax: 40,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 50,
      health: -200,
      defense: -100,
      armor: -200
    },
    extraStats: {
      attack: 4,
      attackMax: 4,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },

  enchanted_long_sword: {
    id: 'enchanted_long_sword',
    icon: 'enchantedLongSword.svg',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'encahnted long sword',
    sellPrice: 5000,
    description: 'Rumored to be cursed, those who use it perish',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 33,
      attackMax: 44,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 44,
      defense: -10,
      armor: -10,
      health: -10
    },
    extraStats: {
      attack: 5,
      attackMax: 5,
      accuracy: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  spartan_shield: {
    id: 'spartan_shield',
    icon: 'spartanShield.svg',
    category: 'combat',
    slot: 'offHand',
    name: 'spartan shield',
    sellPrice: 2500,
    description: 'The shield from a fallen spartan.',
    isEquippable: true,
    stats: {
      healthMax: 75,
      defense: 25,
      armor: 125,
      attackSpeed: -0.2
    },
    extraStats: {
      healthMax: 5,
      defense: 5,
      armor: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },

  snake_skin_chest: {
    id: 'snake_skin_chest',
    icon: 'snakeSkinChest.svg',
    category: 'combat',
    slot: 'chest',
    name: 'snake skin chest',
    sellPrice: 400,
    description: 'A chest made from snake skin',
    isEquippable: true,
    stats: {
      healthMax: 50,
      defense: 5,
      accuracy: 5
    },
    extraStats: {
      healthMax: 50,
      defense: 3,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },

  "bone_kings_axe": {
    "id": "bone_kings_axe",
    "icon": "boneKingsAxe.svg",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "bone kings axe",
    "sellPrice": 350,
    "description": "The axe from a fallen warrior.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 20.4,
      "attackMax": 59,
      "attackSpeed": 0.3,
      "accuracy": 26.4,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 7.7,
      "attackMax": 13.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }],
    enchantments: ['axe_cleave']
  },

  "spartan_spear": {
    "id": "spartan_spear",
    "icon": "spartanSpear.svg",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "spartans spear",
    "sellPrice": 275,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 9.1,
      "attackMax": 12.4,
      "attackSpeed": 0.5,
      "accuracy": 25.4,
      "magicArmor": 20
    },
    "extraStats": {
      "attack": 2.7,
      "attackMax": 3.4,
      "accuracy": 3.4,
      "magicArmor": 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },

  "oversized_club": {
    "id": "oversized_club",
    "icon": "oversizedClub.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "oversized club",
    "sellPrice": 650,
    "description": "An overly large club",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 1,
      "attackMax": 100,
      "attackSpeed": 0.3,
      "accuracy": 30.9,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 5.5,
      "attackMax": 21.1,
      "accuracy": 10.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }],
    enchantments: ['oversized_club']
  },

  /* Kite Shield +70% armor, +15% defense, -Attack Speed, -Accuracy */
  "bronze_kite_shield": {
    "id": "bronze_kite_shield",
    "icon": "bronzeKiteShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "bronze kite shield",
    "sellPrice": 200,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 3.6,
      "defense": 6.2,
      "armor": 30.6,
      "attackSpeed": -0.15
    },
    "extraStats": {
      "healthMax": 1.1,
      "defense": 1.3,
      "armor": 5.0
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 10
    }]
  },

  "steel_kite_shield": {
    "id": "steel_kite_shield",
    "icon": "steelKiteShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "steel kite shield",
    "sellPrice": 500,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 8.6,
      "defense": 14.9,
      "armor": 73.5,
      "attackSpeed": -0.15
    },
    "extraStats": {
      "healthMax": 2.6,
      "defense": 4,
      "armor": 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },

  "obsidian_kite_shield": {
    "id": "obsidian_kite_shield",
    "icon": "obsidianKiteShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "obsidian kite shield",
    "sellPrice": 950,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 14.8,
      "defense": 26,
      "armor": 128.4,
      "attackSpeed": -0.15
    },
    "extraStats": {
      "healthMax": 4.4,
      "defense": 6.9,
      "armor": 15.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 55
    }]
  },

  "meteorite_kite_shield": {
    "id": "meteorite_kite_shield",
    "icon": "meteoriteKiteShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "meteorite kite shield",
    "sellPrice": 1250,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 24.4,
      "defense": 43.1,
      "armor": 210.8,
      "attackSpeed": -0.15
    },
    "extraStats": {
      "healthMax": 7.3,
      "defense": 11.4,
      "armor": 37.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 80
    }]
  },

  /* Buckler -30% armor, -10% defense, + small accuracy */

  "tin_buckler": {
    "id": "tin_buckler",
    "icon": "tinBuckler.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "tin buckler",
    "sellPrice": 75,
    "description": "Provides average defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 2.8,
      "defense": 3.8,
      "armor": 10.4,
      "accuracy": 2
    },
    "extraStats": {
      "healthMax": 0.8,
      "defense": 1.3,
      "armor": 4.2,
      "accuracy": 1.0
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },

  "gold_buckler": {
    "id": "gold_buckler",
    "icon": "goldBuckler.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "gold buckler",
    "sellPrice": 350,
    "description": "Provides average defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 6.5,
      "defense": 8,
      "armor": 26.9,
      "accuracy": 4.5
    },
    "extraStats": {
      "healthMax": 2,
      "defense": 2.5,
      "armor": 7.1,
      "accuracy": 1.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },

  "tungsten_buckler": {
    "id": "tungsten_buckler",
    "icon": "tungstenBuckler.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "tungsten buckler",
    "sellPrice": 850,
    "description": "Provides average defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 13.2,
      "defense": 16.5,
      "armor": 45.3,
      "accuracy": 5.5
    },
    "extraStats": {
      "healthMax": 4,
      "defense": 5.4,
      "armor": 14,
      "accuracy": 2.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 50
    }]
  },

  "mithril_buckler": {
    "id": "mithril_buckler",
    "icon": "mithrilBuckler.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "mithril buckler",
    "sellPrice": 950,
    "description": "Provides average defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 18.4,
      "defense": 20.6,
      "armor": 75.7,
      "accuracy": 6.6
    },
    "extraStats": {
      "healthMax": 5.5,
      "defense": 6.6,
      "armor": 19.6,
      "accuracy": 2.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }]
  },

  "elven_steel_buckler": {
    "id": "elven_steel_buckler",
    "icon": "elvenSteelBuckler.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "elven steel buckler",
    "sellPrice": 1350,
    "description": "Provides average defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 30,
      "defense": 38.9,
      "armor": 113.8,
      "accuracy": 8.9
    },
    "extraStats": {
      "healthMax": 9,
      "defense": 12.1,
      "armor": 32.1,
      "accuracy": 3.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 90
    }]
  },

  /* Knife - Off handed weapon, minor accuracy and damage increases */
  "silver_knife": {
    "id": "silver_knife",
    "icon": "silverKnife.svg",
    "category": "combat",
    "weaponType": "knife",
    "slot": "offHand",
    "name": "silver knife",
    "sellPrice": 250,
    "description": "Provides minor offensive bonuses",
    "isEquippable": true,
    "stats": {
      "accuracy": 3,
      "attack": 2,
      "attackMax": 3
    },
    "extraStats": {
      "accuracy": 2,
      "attack": 2,
      "attackMax": 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  "titanium_knife": {
    "id": "titanium_knife",
    "icon": "titaniumKnife.svg",
    "category": "combat",
    "weaponType": "knife",
    "slot": "offHand",
    "name": "titanium knife",
    "sellPrice": 850,
    "description": "Provides minor offensive bonuses",
    "isEquippable": true,
    "stats": {
      "accuracy": 5,
      "attack": 4,
      "attackMax": 5
    },
    "extraStats": {
      "accuracy": 2,
      "attack": 2,
      "attackMax": 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },

  "cobalt_knife": {
    "id": "cobalt_knife",
    "icon": "cobaltKnife.svg",
    "category": "combat",
    "weaponType": "knife",
    "slot": "offHand",
    "name": "cobalt knife",
    "sellPrice": 950,
    "description": "Provides minor offensive bonuses",
    "isEquippable": true,
    "stats": {
      "accuracy": 7,
      "attack": 6,
      "attackMax": 8
    },
    "extraStats": {
      "accuracy": 3,
      "attack": 3,
      "attackMax": 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },

  "cursed_knife": {
    "id": "cursed_knife",
    "icon": "cursedKnife.svg",
    "category": "combat",
    "weaponType": "knife",
    "slot": "offHand",
    "name": "cursed knife",
    "sellPrice": 1650,
    "description": "Provides minor offensive bonuses",
    "isEquippable": true,
    "stats": {
      "accuracy": 10,
      "attack": 8,
      "attackMax": 10
    },
    "extraStats": {
      "accuracy": 4,
      "attack": 4,
      "attackMax": 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95
    }]
  },

  /* Rapiers - Same as scimitar but 2h, attack speed of dagger, less accuracy */
  "iron_rapiers": {
    "id": "iron_rapiers",
    "icon": "ironRapiers.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "iron rapiers",
    "sellPrice": 150,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "isTwoHanded": true,
    "stats": {
      "attack": 10.1,
      "attackMax": 13.9,
      "attackSpeed": 1.0,
      "defense": -10,
      "accuracy": 10.8
    },
    "extraStats": {
      "attack": 2.7,
      "attackMax": 5.5,
      "accuracy": 2.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },

  "adamantium_rapiers": {
    "id": "adamantium_rapiers",
    "icon": "adamantiumRapiers.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "adamantium rapiers",
    "sellPrice": 1050,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "isTwoHanded": true,
    "stats": {
      "attack": 45.4,
      "attackMax": 71.8,
      "attackSpeed": 1.0,
      "defense": -10,
      "accuracy": 45.8
    },
    "extraStats": {
      "attack": 12.3,
      "attackMax": 24.8,
      "accuracy": 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 70
    }]
  },

  "fairy_steel_rapiers": {
    "id": "fairy_steel_rapiers",
    "icon": "fairySteelRapiers.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "fairy steel rapiers",
    "sellPrice": 1250,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "isTwoHanded": true,
    "stats": {
      "attack": 60.4,
      "attackMax": 95.6,
      "attackSpeed": 1.0,
      "accuracy": 60.9,
      "defense": -25
    },
    "extraStats": {
      "attack": 16.4,
      "attackMax": 32.9,
      "accuracy": 18.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 85
    }]
  },

  /* Spirit shields */
  spirit_shield: {
    id: 'spirit_shield',
    icon: 'spiritShield.svg',
    category: 'combat',
    slot: 'offHand',
    name: 'spirit shield',
    weaponType: 'shield',
    sellPrice: 500,
    description: 'The shield pulls at your spirit.',
    isEquippable: true,
    stats: {
      healthMax: 10,
      magicArmor: 35,
    },
    extraStats: {
      healthMax: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 1
    }]
  },

  fairy_spirit_shield: {
    id: 'fairy_spirit_shield',
    icon: 'fairySpiritShield.svg',
    category: 'combat',
    weaponType: 'shield',
    slot: 'offHand',
    name: 'fairy spirit shield',
    sellPrice: 1000,
    description: 'The shield pulls at your spirit.',
    isEquippable: true,
    stats: {
      healthMax: 20,
      magicArmor: 55,
    },
    extraStats: {
      healthMax: 20,
      magicArmor: 15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },

  cursed_spirit_shield: {
    id: 'cursed_spirit_shield',
    icon: 'cursedSpiritShield.svg',
    category: 'combat',
    slot: 'offHand',
    weaponType: 'shield',
    name: 'cursed spirit shield',
    sellPrice: 2500,
    description: 'The shield pulls at your spirit.',
    isEquippable: true,
    stats: {
      healthMax: 35,
      magicArmor: 70,
    },
    extraStats: {
      healthMax: 35,
      magicArmor: 20
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },

  demons_heart: {
    id: 'demons_heart',
    icon: 'demonsHeart.svg',
    category: 'combat',
    slot: 'chest',
    name: 'demons heart',
    sellPrice: 1000,
    description: 'Cursed for all eternity.',
    isEquippable: true,
    stats: {
      healthMax: 150,
      criticalChance: 1,
      accuracy: 5,
      armor: 10
    },
    extraStats: {
      healthMax: 50,
      armor: 5,
      accuracy: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 60
    }],
    enchantments: ['demons_heart']
  },

  /* Defensive Magic Armor */
  opal_chest_plate: {
    id: 'opal_chest_plate',
    icon: 'opalChestPlate.svg',
    category: 'combat',
    slot: 'chest',
    name: 'opal chest plate',
    sellPrice: 1000,
    description: 'This seems to expensive to wear.',
    isEquippable: true,
    stats: {
      healthMax: 35,
      magicArmor: 20,
      accuracy: 10
    },
    extraStats: {
      healthMax: 15,
      magicArmor: 20
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 10
    }]
  },

  opal_pants: {
    id: 'opal_pants',
    icon: 'opalPants.svg',
    category: 'combat',
    slot: 'legs',
    name: 'opal pants',
    sellPrice: 1000,
    description: 'This seems to expensive to wear.',
    isEquippable: true,
    stats: {
      healthMax: 20,
      magicArmor: 15,
      accuracy: 10,
    },
    extraStats: {
      healthMax: 20,
      magicArmor: 15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 10
    }]
  },

  bamboo_roof: {
    id: 'bamboo_roof',
    icon: 'bambooRoof.svg',
    category: 'crafting',
    name: 'bamboo roof',
    sellPrice: 100,
    description: 'Used to make a bamboo shack'
  },

  bamboo_wall: {
    id: 'bamboo_wall',
    icon: 'bambooWall.svg',
    category: 'crafting',
    name: 'bamboo wall',
    sellPrice: 100,
    description: 'Used to make a bamboo shack'
  },

  bamboo_shack: {
    id: 'bamboo_shack',
    icon: 'bambooShack.svg',
    category: 'crafting',
    name: 'bamboo shack',
    sellPrice: 400,
    description: 'Looks cozy (lots of xp)'
  },
}
