import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const MISC_ITEMS = {
  thirsting_saber: {
    id: 'thirsting_saber',
    icon: 'thirstingSaber',
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
    icon: 'enchantedLongSword',
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
    icon: 'spartanShield',
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

  /* Kite Shield +70% armor, +15% defense, -Attack Speed, -Accuracy */
  "bronze_kite_shield": {
    "id": "bronze_kite_shield",
    "icon": "bronzeKiteShield",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "bronze kite shield",
    "sellPrice": 75,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 3.6,
      "defense": 6.3,
      "armor": 30,
      "accuracy": -10,
      "attackSpeed": -0.15
    },
    "extraStats": {
      "healthMax": 1.1,
      "defense": 2.0,
      "armor": 9.3
    }
  },

  "steel_kite_shield": {
    "id": "steel_kite_shield",
    "icon": "steelKiteShield",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "steel kite shield",
    "sellPrice": 75,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 8.6,
      "defense": 15.1,
      "armor": 73,
      "accuracy": -15,
      "attackSpeed": -0.15
    },
    "extraStats": {
      "healthMax": 2.6,
      "defense": 4.6,
      "armor": 22.3
    }
  },

  "obsidian_kite_shield": {
    "id": "obsidian_kite_shield",
    "icon": "obsidianKiteShield",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "obsidian kite shield",
    "sellPrice": 75,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 14.8,
      "defense": 26.4,
      "armor": 127.4,
      "accuracy": -20,
      "attackSpeed": -0.15
    },
    "extraStats": {
      "healthMax": 4.4,
      "defense": 7.9,
      "armor": 38.4
    }
  },

  "meteorite_kite_shield": {
    "id": "meteorite_kite_shield",
    "icon": "meteoriteKiteShield",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "meteorite kite shield",
    "sellPrice": 75,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 24.4,
      "defense": 43.1,
      "armor": 210,
      "accuracy": -30,
      "attackSpeed": -0.15
    },
    "extraStats": {
      "healthMax": 7.3,
      "defense": 13.1,
      "armor": 63.4
    }
  },

  /* Buckler -30% armor, -10% defense, + small accuracy */

  "tin_buckler": {
    "id": "tin_buckler",
    "icon": "tinBuckler",
    "category": "combat",
    "weaponType": "buckler",
    "slot": "offHand",
    "name": "tin buckler",
    "sellPrice": 75,
    "description": "Provides average defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 2.8,
      "defense": 3.8,
      "armor": 9.8,
      "accuracy": 2
    },
    "extraStats": {
      "healthMax": 0.8,
      "defense": 1.3,
      "armor": 3.3,
      "accuracy": 1.2
    }
  },

  "gold_buckler": {
    "id": "gold_buckler",
    "icon": "goldBuckler",
    "category": "combat",
    "weaponType": "buckler",
    "slot": "offHand",
    "name": "gold buckler",
    "sellPrice": 75,
    "description": "Provides average defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 6.5,
      "defense": 9,
      "armor": 23.1,
      "accuracy": 4.5
    },
    "extraStats": {
      "healthMax": 2,
      "defense": 2.5,
      "armor": 7.1,
      "accuracy": 1.8
    }
  },

  "tungsten_buckler": {
    "id": "tungsten_buckler",
    "icon": "tungstenBuckler",
    "category": "combat",
    "weaponType": "buckler",
    "slot": "offHand",
    "name": "tungsten buckler",
    "sellPrice": 75,
    "description": "Provides average defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 13.2,
      "defense": 18.5,
      "armor": 47.3,
      "accuracy": 5.5
    },
    "extraStats": {
      "healthMax": 4,
      "defense": 5.4,
      "armor": 14,
      "accuracy": 2.4
    }
  },

  "mithril_buckler": {
    "id": "mithril_buckler",
    "icon": "mithrilBuckler",
    "category": "combat",
    "weaponType": "buckler",
    "slot": "offHand",
    "name": "mithril buckler",
    "sellPrice": 75,
    "description": "Provides average defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 18.4,
      "defense": 25.6,
      "armor": 65.3,
      "accuracy": 6.6
    },
    "extraStats": {
      "healthMax": 5.5,
      "defense": 6.6,
      "armor": 19.6,
      "accuracy": 2.8
    }
  },

  "elven_steel_buckler": {
    "id": "elven_steel_buckler",
    "icon": "elvenSteelBuckler",
    "category": "combat",
    "weaponType": "buckler",
    "slot": "offHand",
    "name": "elven steel buckler",
    "sellPrice": 75,
    "description": "Provides average defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 30,
      "defense": 42.9,
      "armor": 107.8,
      "accuracy": 8.9
    },
    "extraStats": {
      "healthMax": 9,
      "defense": 12.1,
      "armor": 32.1,
      "accuracy": 3.6
    }
  },

  /* Knife - Off handed weapon, minor accuracy and damage increases */
  "silver_knife": {
    "id": "silver_knife",
    "icon": "silverKnife",
    "category": "combat",
    "weaponType": "knife",
    "slot": "offHand",
    "name": "silver knife",
    "sellPrice": 75,
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
    }
  },

  "titanium_knife": {
    "id": "titanium_knife",
    "icon": "titaniumKnife",
    "category": "combat",
    "weaponType": "knife",
    "slot": "offHand",
    "name": "titanium knife",
    "sellPrice": 75,
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
    }
  },

  "cobalt_knife": {
    "id": "cobalt_knife",
    "icon": "cobaltKnife",
    "category": "combat",
    "weaponType": "knife",
    "slot": "offHand",
    "name": "cobalt knife",
    "sellPrice": 75,
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
    }
  },

  "cursed_knife": {
    "id": "cursed_knife",
    "icon": "cursedKnife",
    "category": "combat",
    "weaponType": "knife",
    "slot": "offHand",
    "name": "cursed knife",
    "sellPrice": 75,
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
    }
  },

  /* Rapiers - Same as scimitar but 2h, attack speed of dagger, less accuracy */
  "iron_rapiers": {
    "id": "iron_rapiers",
    "icon": "ironRapiers",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "iron rapiers",
    "sellPrice": 75,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 9.1,
      "attackMax": 18.3,
      "attackSpeed": 1.0,
      "defense": -10,
      "accuracy": 10.8
    },
    "extraStats": {
      "attack": 2.7,
      "attackMax": 5.5,
      "accuracy": 2.4
    }
  },

  "adamantium_rapiers": {
    "id": "adamantium_rapiers",
    "icon": "adamantiumRapiers",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "adamantium rapiers",
    "sellPrice": 75,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 41,
      "attackMax": 82.5,
      "attackSpeed": 1.0,
      "defense": -10,
      "accuracy": 45.8
    },
    "extraStats": {
      "attack": 12.3,
      "attackMax": 24.8,
      "accuracy": 12
    }
  },

  "fairy_steel_rapiers": {
    "id": "fairy_steel_rapiers",
    "icon": "fairySteelRapiers",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "fairy steel rapiers",
    "sellPrice": 75,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 54.6,
      "attackMax": 109.8,
      "attackSpeed": 1.0,
      "accuracy": 62.9,
      "defense": -25
    },
    "extraStats": {
      "attack": 16.4,
      "attackMax": 32.9,
      "accuracy": 18.7
    }
  },

  /* Spirit shields */
  spirit_shield: {
    id: 'spirit_shield',
    icon: 'spiritShield',
    category: 'combat',
    slot: 'offHand',
    name: 'spirit shield',
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
    icon: 'fairySpiritShield',
    category: 'combat',
    slot: 'offHand',
    name: 'fairy spirit shield',
    sellPrice: 500,
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
      level: 10
    }]
  },

  cursed_spirit_shield: {
    id: 'cursed_spirit_shield',
    icon: 'cursedSpiritShield',
    category: 'combat',
    slot: 'offHand',
    name: 'cursed spirit shield',
    sellPrice: 500,
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
      level: 10
    }]
  },

  /* Defensive Magic Armor */
  opal_chest_plate: {
    id: 'opal_chest_plate',
    icon: 'opalChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'opal chest plate',
    sellPrice: 1000,
    description: 'This seems to expensive to wear.',
    isEquippable: true,
    stats: {
      healthMax: 35,
      magicArmor: 20,
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
    icon: 'opalPants',
    category: 'combat',
    slot: 'legs',
    name: 'opal pants',
    sellPrice: 1000,
    description: 'This seems to expensive to wear.',
    isEquippable: true,
    stats: {
      healthMax: 20,
      magicArmor: 15,
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
  }  
}
