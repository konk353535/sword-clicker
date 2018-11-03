import { VERY_FAST_SPEED, MEDIUM_SPEED} from '../attackSpeeds';

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
    icon: 'enchantedLongsword.svg',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'enchanted long sword',
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
    weaponType: 'shield',
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

  bone_kings_axe: {
    id: "bone_kings_axe",
    icon: "boneKingsAxe.svg",
    category: "combat",
    weaponType: "battleAxe",
    slot: "mainHand",
    name: "bone kings axe",
    sellPrice: 350,
    description: "The axe from a fallen warrior.",
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 20.4,
      attackMax: 59,
      attackSpeed: 0.3,
      accuracy: 26.4,
      criticalChance: 5
    },
    extraStats: {
      attack: 7.7,
      attackMax: 13.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }],
    enchantments: ['axe_cleave']
  },

  spartan_spear: {
    id: "spartan_spear",
    icon: "spartanSpear.svg",
    category: "combat",
    weaponType: "spear",
    slot: "mainHand",
    name: "spartans spear",
    sellPrice: 275,
    description: "Used to train defense.",
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 9.1,
      attackMax: 12.4,
      attackSpeed: 0.5,
      accuracy: 25.4,
      magicArmor: 20
    },
    extraStats: {
      attack: 2.7,
      attackMax: 3.4,
      accuracy: 3.4,
      magicArmor: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },

  oversized_club: {
    id: "oversized_club",
    icon: "oversizedClub.svg",
    category: "combat",
    weaponType: "longSword",
    slot: "mainHand",
    name: "oversized club",
    sellPrice: 650,
    description: "An overly large club",
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 100,
      attackSpeed: 0.3,
      accuracy: 30.9,
      criticalChance: 5
    },
    extraStats: {
      attack: 5.5,
      attackMax: 21.1,
      accuracy: 10.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }],
    enchantments: ['oversized_club']
  },

  /* Kite Shield +70% armor, +15% defense, -Attack Speed, -Accuracy */
  copper_kite_shield: {
    id: 'copper_kite_shield',
    icon: 'copperKiteShield.png',
    category: 'combat',
    weaponType: 'shield',
    slot: 'offHand',
    name: 'copper kite shield',
    sellPrice: 75,
    description: 'Provides high defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 2,
      defense: 3.5,
      armor: 17,
      attackSpeed: -0.15,
      accuracy: -2.8
    },
    extraStats: {
      healthMax: 1,
      defense: 1.2,
      armor: 5.1,
      accuracy: 0.6
    }
  },
  "tin_kite_shield": {
    "id": "tin_kite_shield",
    "icon": "tinKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "tin kite shield",
    "sellPrice": 75,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 2.8,
      "defense": 4.2 * 1.15,
      "armor": 14 * 1.7,
      attackSpeed: -0.15,
      accuracy: -4.2 * 1.15 * 0.5
    },
    "extraStats": {
      "healthMax": 0.8,
      "defense": 1.3 * 1.15,
      "armor": 4.2 * 1.7,
      accuracy: 1.3 * 1.15 * 0.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },
  bronze_kite_shield: {
    id: "bronze_kite_shield",
    icon: "bronzeKiteShield.png",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "bronze kite shield",
    sellPrice: 200,
    description: "Provides high defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 3.6,
      defense: 6.3,
      armor: 30.9,
      attackSpeed: -0.15,
      accuracy: -4.1
    },
    extraStats: {
      healthMax: 1.1,
      defense: 2.0,
      armor: 9.4,
      accuracy: 1.0
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 10
    }]
  },
  "iron_kite_shield": {
    "id": "iron_kite_shield",
    "icon": "ironKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "iron kite shield",
    "sellPrice": 275,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 4.5,
      "defense": 6.9 * 1.15,
      "armor": 22.8 * 1.70,
      attackSpeed: -0.15,
      accuracy: -3.5 * 1.15
    },
    "extraStats": {
      "healthMax": 1.3,
      "defense": 2.1 * 1.15,
      "armor": 6.8 * 1.70,
      accuracy: 1.1 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },
  "silver_kite_shield": {
    "id": "silver_kite_shield",
    "icon": "silverKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "silver kite shield",
    "sellPrice": 400,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 5.4,
      "defense": 8.3 * 1.15,
      "armor": 27.4 * 1.70,
      attackSpeed: -0.15,
      accuracy: -4.2 * 1.15
    },
    "extraStats": {
      "healthMax": 1.6,
      "defense": 2.5 * 1.15,
      "armor": 8.2 * 1.70,
      accuracy: 1.3 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },
  "gold_kite_shield": {
    "id": "gold_kite_shield",
    "icon": "goldKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "gold kite shield",
    "sellPrice": 500,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 6.5,
      "defense": 10 * 1.15,
      "armor": 32.9 * 1.70,
      attackSpeed: -0.15,
      accuracy: -5 * 1.15
    },
    "extraStats": {
      "healthMax": 2,
      "defense": 3 * 1.15,
      "armor": 9.9 * 1.70,
      accuracy: 1.5 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },
  "carbon_kite_shield": {
    "id": "carbon_kite_shield",
    "icon": "carbonKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "carbon kite shield",
    "sellPrice": 650,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 7.6,
      "defense": 11.7 * 1.15,
      "armor": 38.5 * 1.70,
      attackSpeed: -0.15,
      accuracy: -5.9 * 1.15
    },
    "extraStats": {
      "healthMax": 2.3,
      "defense": 3.5 * 1.15,
      "armor": 11.5 * 1.70,
      accuracy: 1.8 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },
  "steel_kite_shield": {
    "id": "steel_kite_shield",
    "icon": "steelKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "steel kite shield",
    "sellPrice": 750,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 8.6,
      "defense": 13.2 * 1.15,
      "armor": 43.5 * 1.70,
      attackSpeed: -0.15,
      accuracy: -6.6 * 1.15
    },
    "extraStats": {
      "healthMax": 2.6,
      "defense": 4 * 1.15,
      "armor": 13 * 1.70,
      accuracy: 2 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },
  "platinum_kite_shield": {
    "id": "platinum_kite_shield",
    "icon": "platinumKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "platinum kite shield",
    "sellPrice": 900,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 10.2,
      "defense": 7.9 * 1.15,
      "armor": 51.8 * 1.70,
      attackSpeed: -0.15,
      accuracy: -15.7 * 1.15
    },
    "extraStats": {
      "healthMax": 3.1,
      "defense": 4.7 * 1.15,
      "armor": 15.5 * 1.70,
      accuracy: 2.4 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  },
  "titanium_kite_shield": {
    "id": "titanium_kite_shield",
    "icon": "titaniumKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "titanium kite shield",
    "sellPrice": 1000,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 11.7,
      "defense": 18.1 * 1.15,
      "armor": 59.6 * 1.70,
      attackSpeed: -0.15,
      accuracy: -9.1 * 1.15
    },
    "extraStats": {
      "healthMax": 3.5,
      "defense": 5.4 * 1.15,
      "armor": 17.9 * 1.70,
      accuracy: 2.7 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  },
  "tungsten_kite_shield": {
    "id": "tungsten_kite_shield",
    "icon": "tungstenKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "tungsten kite shield",
    "sellPrice": 1200,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 13.2,
      "defense": 20.5 * 1.15,
      "armor": 67.3 * 1.70,
      attackSpeed: -0.15,
      accuracy: -10.3 * 1.15
    },
    "extraStats": {
      "healthMax": 4,
      "defense": 6.1 * 1.15,
      "armor": 20.2 * 1.70,
      accuracy: 3.1 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 50
    }]
  },
  "obsidian_kite_shield": {
    "id": "obsidian_kite_shield",
    "icon": "obsidianKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "obsidian kite shield",
    "sellPrice": 1350,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 14.8,
      "defense": 23 * 1.15,
      "armor": 75.4 * 1.70,
      attackSpeed: -0.15,
      accuracy: -11.5 * 1.15
    },
    "extraStats": {
      "healthMax": 4.4,
      "defense": 6.9 * 1.15,
      "armor": 22.6 * 1.70,
      accuracy: 3.5 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 55
    }]
  },
  "cobalt_kite_shield": {
    "id": "cobalt_kite_shield",
    "icon": "cobaltKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "cobalt kite shield",
    "sellPrice": 1500,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 16.6,
      "defense": 25.8 * 1.15,
      "armor": 84.4 * 1.70,
      attackSpeed: -0.15,
      accuracy: -12.9 * 1.15
    },
    "extraStats": {
      "healthMax": 5,
      "defense": 7.7 * 1.15,
      "armor": 25.3 * 1.70,
      accuracy: 3.9 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 60
    }]
  },
  "mithril_kite_shield": {
    "id": "mithril_kite_shield",
    "icon": "mithrilKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "mithril kite shield",
    "sellPrice": 1600,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 18.4,
      "defense": 28.6 * 1.15,
      "armor": 93.7 * 1.70,
      attackSpeed: -0.15,
      accuracy: -14.3 * 1.15
    },
    "extraStats": {
      "healthMax": 5.5,
      "defense": 8.6 * 1.15,
      "armor": 28.1 * 1.70,
      accuracy: 4.3 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }]
  },
  "adamantium_kite_shield": {
    "id": "adamantium_kite_shield",
    "icon": "adamantiumKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "adamantium kite shield",
    "sellPrice": 1800,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 20.2,
      "defense": 31.5 * 1.15,
      "armor": 103.1 * 1.70,
      attackSpeed: -0.15,
      accuracy: -15.8 * 1.15
    },
    "extraStats": {
      "healthMax": 6.1,
      "defense": 9.5 * 1.15,
      "armor": 30.9 * 1.70,
      accuracy: 4.8 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 70
    }]
  },
  "orichalcum_kite_shield": {
    "id": "orichalcum_kite_shield",
    "icon": "orichalcumKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "orichalcum kite shield",
    "sellPrice": 1800,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 22,
      "defense": 34.3 * 1.15,
      "armor": 112.4 * 1.70,
      attackSpeed: -0.15,
      accuracy: -17.2 * 1.15
    },
    "extraStats": {
      "healthMax": 6.6,
      "defense": 10.3 * 1.15,
      "armor": 33.7 * 1.70,
      accuracy: 5.2 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 75
    }]
  },
  "meteorite_kite_shield": {
    "id": "meteorite_kite_shield",
    "icon": "meteoriteKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "meteorite kite shield",
    "sellPrice": 2000,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 24.4,
      "defense": 38.1 * 1.15,
      "armor": 124.8 * 1.70,
      attackSpeed: -0.15,
      accuracy: -19.1 * 1.15
    },
    "extraStats": {
      "healthMax": 7.3,
      "defense": 11.4 * 1.15,
      "armor": 37.4 * 1.70,
      accuracy: 5.7 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 80
    }]
  },
  "fairy_steel_kite_shield": {
    "id": "fairy_steel_kite_shield",
    "icon": "fairySteelKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "fairy steel kite shield",
    "sellPrice": 2250,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 26.8,
      "defense": 41.9 * 1.15,
      "armor": 137.3 * 1.70,
      attackSpeed: -0.15,
      accuracy: -21.0 * 1.15
    },
    "extraStats": {
      "healthMax": 8,
      "defense": 12.6 * 1.15,
      "armor": 41.2 * 1.70,
      accuracy: 6.3 * 1.15,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 85
    }]
  },
  "elven_steel_kite_shield": {
    "id": "elven_steel_kite_shield",
    "icon": "elvenSteelKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "elven steel kite shield",
    "sellPrice": 2500,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 30,
      "defense": 46.9 * 1.15,
      "armor": 153.8 * 1.70,
      attackSpeed: -0.15,
      accuracy: -23.5 * 1.15
    },
    "extraStats": {
      "healthMax": 9,
      "defense": 14.1 * 1.15,
      "armor": 46.1 * 1.70,
      accuracy: 7.1 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 90
    }]
  },
  "cursed_kite_shield": {
    "id": "cursed_kite_shield",
    "icon": "cursedKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "cursed kite shield",
    "sellPrice": 3000,
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7,
      "defense": 51.1 * 1.15,
      "armor": 167.6 * 1.70,
      attackSpeed: -0.15,
      accuracy: -25.6 * 1.15
    },
    "extraStats": {
      "healthMax": 9.8,
      "defense": 15.3 * 1.15,
      "armor": 50.3 * 1.70,
      accuracy: 6.7 * 1.15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 95
    }]
  },
  "darksteel_kite_shield": {
    "id": "darksteel_kite_shield",
    "icon": "darksteelKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "darksteel kite shield",
    "sellPrice": Math.round(3000 * 1.1),
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * 1.1,
      "defense": 51.1 * 1.15 * 1.1,
      "armor": 167.6 * 1.70 * 1.1,
      attackSpeed: -0.15,
      accuracy: -51.1 * 1.15 * 0.5 * 1.1
    },
    "extraStats": {
      "healthMax": 9.8 * 1.1,
      "defense": 15.3 * 1.15 * 1.1,
      "armor": 50.3 * 1.70 * 1.1,
      attackSpeed: -0.15,
      accuracy: 15.3 * 1.15 * 0.5 * 1.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 110
    }]
  },  
  "radiant_kite_shield": {
    "id": "radiant_kite_shield",
    "icon": "radiantKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "radiant kite shield",
    "sellPrice": Math.round(3000 * 1.2),
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * 1.2,
      "defense": 51.1 * 1.15 * 1.2,
      "armor": 167.6 * 1.70 * 1.2,
      attackSpeed: -0.15,
      accuracy: -51.1 * 1.15 * 0.5 * 1.2
    },
    "extraStats": {
      "healthMax": 9.8 * 1.2,
      "defense": 15.3 * 1.15 * 1.2,
      "armor": 50.3 * 1.70 * 1.2,
      attackSpeed: -0.15,
      accuracy: 15.3 * 1.15 * 0.5 * 1.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 110
    }]
  },  
  "astral_kite_shield": {
    "id": "astral_kite_shield",
    "icon": "astralKiteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "astral kite shield",
    "sellPrice": Math.round(3000 * 1.3),
    "description": "Provides high defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * 1.3,
      "defense": 51.1 * 1.15 * 1.3,
      "armor": 167.6 * 1.70 * 1.3,
      attackSpeed: -0.15,
      accuracy: -51.1 * 1.15 * 0.5 * 1.3
    },
    "extraStats": {
      "healthMax": 9.8 * 1.3,
      "defense": 15.3 * 1.15 * 1.3,
      "armor": 50.3 * 1.70 * 1.3,
      attackSpeed: -0.15,
      accuracy: 15.3 * 1.15 * 0.5 * 1.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 110
    }]
  },
  

  /* Buckler -30% armor, -10% defense, + small accuracy */

  tin_buckler: {
    id: "tin_buckler",
    icon: "tinBuckler.svg",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "tin buckler",
    sellPrice: 75,
    description: "Provides average defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 2.8,
      defense: 3.8,
      armor: 10.4,
      accuracy: 2
    },
    extraStats: {
      healthMax: 0.8,
      defense: 1.3,
      armor: 4.2,
      accuracy: 1.0
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },

  gold_buckler: {
    id: "gold_buckler",
    icon: "goldBuckler.svg",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "gold buckler",
    sellPrice: 350,
    description: "Provides average defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 6.5,
      defense: 8,
      armor: 26.9,
      accuracy: 4.5
    },
    extraStats: {
      healthMax: 2,
      defense: 2.5,
      armor: 7.1,
      accuracy: 1.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },

  tungsten_buckler: {
    id: "tungsten_buckler",
    icon: "tungstenBuckler.svg",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "tungsten buckler",
    sellPrice: 850,
    description: "Provides average defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 13.2,
      defense: 16.5,
      armor: 45.3,
      accuracy: 5.5
    },
    extraStats: {
      healthMax: 4,
      defense: 5.4,
      armor: 14,
      accuracy: 2.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 50
    }]
  },

  mithril_buckler: {
    id: "mithril_buckler",
    icon: "mithrilBuckler.svg",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "mithril buckler",
    sellPrice: 950,
    description: "Provides average defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 18.4,
      defense: 20.6,
      armor: 75.7,
      accuracy: 6.6
    },
    extraStats: {
      healthMax: 5.5,
      defense: 6.6,
      armor: 19.6,
      accuracy: 2.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }]
  },

  elven_steel_buckler: {
    id: "elven_steel_buckler",
    icon: "elvenSteelBuckler.svg",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "elven steel buckler",
    sellPrice: 1350,
    description: "Provides average defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 30,
      defense: 38.9,
      armor: 113.8,
      accuracy: 8.9
    },
    extraStats: {
      healthMax: 9,
      defense: 12.1,
      armor: 32.1,
      accuracy: 3.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 90
    }]
  },

  /* Knife - Off handed weapon, minor accuracy and damage increases */
  silver_knife: {
    id: "silver_knife",
    icon: "silverKnife.png",
    category: "combat",
    weaponType: "knife",
    slot: "offHand",
    name: "silver knife",
    sellPrice: 250,
    description: "Provides minor offensive bonuses",
    isEquippable: true,
    stats: {
      accuracy: 3,
      attack: 2,
      attackMax: 3
    },
    extraStats: {
      accuracy: 2,
      attack: 2,
      attackMax: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  titanium_knife: {
    id: "titanium_knife",
    icon: "titaniumKnife.png",
    category: "combat",
    weaponType: "knife",
    slot: "offHand",
    name: "titanium knife",
    sellPrice: 850,
    description: "Provides minor offensive bonuses",
    isEquippable: true,
    stats: {
      accuracy: 5,
      attack: 4,
      attackMax: 5
    },
    extraStats: {
      accuracy: 2,
      attack: 2,
      attackMax: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },

  cobalt_knife: {
    id: "cobalt_knife",
    icon: "cobaltKnife.png",
    category: "combat",
    weaponType: "knife",
    slot: "offHand",
    name: "cobalt knife",
    sellPrice: 950,
    description: "Provides minor offensive bonuses",
    isEquippable: true,
    stats: {
      accuracy: 7,
      attack: 6,
      attackMax: 8
    },
    extraStats: {
      accuracy: 3,
      attack: 3,
      attackMax: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },

  cursed_knife: {
    id: "cursed_knife",
    icon: "cursedKnife.png",
    category: "combat",
    weaponType: "knife",
    slot: "offHand",
    name: "cursed knife",
    sellPrice: 1650,
    description: "Provides minor offensive bonuses",
    isEquippable: true,
    stats: {
      accuracy: 10,
      attack: 8,
      attackMax: 10
    },
    extraStats: {
      accuracy: 4,
      attack: 4,
      attackMax: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95
    }]
  },

  /* Rapiers - Same as scimitar but 2h, attack speed of dagger, less accuracy */
  iron_rapiers: {
    id: "iron_rapiers",
    icon: "ironRapiers.png",
    category: "combat",
    weaponType: "shortSword",
    slot: "mainHand",
    name: "iron rapiers",
    sellPrice: 150,
    description: "A good balance between offense and defense",
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 10.1,
      attackMax: 13.9,
      attackSpeed: 1.0,
      defense: -10,
      accuracy: 10.8
    },
    extraStats: {
      attack: 2.7,
      attackMax: 5.5,
      accuracy: 2.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },

  adamantium_rapiers: {
    id: "adamantium_rapiers",
    icon: "adamantiumRapiers.png",
    category: "combat",
    weaponType: "shortSword",
    slot: "mainHand",
    name: "adamantium rapiers",
    sellPrice: 1050,
    description: "A good balance between offense and defense",
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 45.4,
      attackMax: 71.8,
      attackSpeed: 1.0,
      defense: -10,
      accuracy: 45.8
    },
    extraStats: {
      attack: 12.3,
      attackMax: 24.8,
      accuracy: 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 70
    }]
  },

  fairy_steel_rapiers: {
    id: "fairy_steel_rapiers",
    icon: "fairySteelRapiers.png",
    category: "combat",
    weaponType: "shortSword",
    slot: "mainHand",
    name: "fairy steel rapiers",
    sellPrice: 1250,
    description: "A good balance between offense and defense",
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 60.4,
      attackMax: 95.6,
      attackSpeed: 1.0,
      accuracy: 60.9,
      defense: -25
    },
    extraStats: {
      attack: 16.4,
      attackMax: 32.9,
      accuracy: 18.7
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
    icon: 'spiritShield.png',
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
    icon: 'fairySpiritShield.png',
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
    icon: 'cursedSpiritShield.png',
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
    icon: 'demonsHeart.png',
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

  smoke_dagger: {
    id: "smoke_dagger",
    icon: "smokeDagger.svg",
    category: "combat",
    weaponType: "dagger",
    slot: "mainHand",
    name: "smoke",
    sellPrice: 850,
    description: "A slither of smoke.",
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 11,
      attackMax: 20.2,
      attackSpeed: 1,
      accuracy: 35.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }],
    enchantments: ['smoke_dagger']
  },

  shadow_knife: {
    id: "shadow_knife",
    icon: "shadowKnife.svg",
    category: "combat",
    weaponType: "knife",
    slot: "offHand",
    name: "shadow",
    sellPrice: 850,
    description: "A slither of shadow.",
    isWeapon: true,
    isEquippable: true,
    stats: {
      accuracy: 5,
      attack: 4,
      attackMax: 5
    },
    extraStats: {
      accuracy: 2,
      attack: 2,
      attackMax: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }],
    enchantments: ['shadow_knife']
  },

  living_helmet: {
    id: "living_helmet",
    icon: "livingHelmet.png",
    category: "combat",
    slot: "head",
    name: "living helmet",
    sellPrice: 850,
    description: "A helmet fashioned from a living tree.",
    isWeapon: true,
    isEquippable: true,
    stats: {
      healthMax: 7.8,
      attackMax: -25,
      defense: 7.8,
      armor: 37.6
    },
    extraStats: {
      healthMax: 2.3,
      defense: 2.3,
      armor: 11.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 55
    }],
    enchantments: ['living_helmet']
  },

  bloody_plate_legs: {
    id: "bloody_plate_legs",
    icon: "bloodyPlatelegs.png",
    category: "combat",
    slot: "legs",
    name: "bloody platelegs",
    sellPrice: 1500,
    description: "Injures your legs",
    isEquippable: true,
    stats: {
      armor: -20,
      defense: -2,
      accuracy: 2,
      attack: 2
    },
    extraStats: {
      accuracy: 2,
      attack: 2
    },
    enchantments: ['bloody_plate_legs'],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 60
    }]
  },

  /* Defensive Magic Armor */
  opal_chest_plate: {
    id: 'opal_chest_plate',
    icon: 'opalChestPlate.png',
    category: 'combat',
    slot: 'chest',
    name: 'opal chest plate',
    sellPrice: 1000,
    description: 'This seems too expensive to wear.',
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

  frankensteins_heart: {
    id: "frankensteins_heart",
    icon: "frankensteinsHeart.svg",
    category: "combat",
    slot: "chest",
    name: "frankensteins heart",
    sellPrice: 2500,
    description: "Protect your heart",
    isEquippable: true,
    stats: {
      healthMax: 9.7,
      defense: 9.7,
      armor: 46.7
    },
    extraStats: {
      healthMax: 2.9,
      defense: 2.9,
      armor: 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }],
    enchantments: ['frankensteins_heart']
  },

  rich_snake_skin: {
    id: "rich_snake_skin",
    icon: "richSnakeSkin.svg",
    category: "combat",
    slot: "chest",
    name: "rich snake skin",
    sellPrice: 1800,
    description: "Protect your chest",
    isEquippable: true,
    stats: {
      healthMax: 10.7,
      defense: 10.7,
      armor: 51.4
    },
    extraStats: {
      healthMax: 3.2,
      defense: 3.2,
      armor: 15.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 70
    }],
    enchantments: ['rich_snake_skin']
  },

  krakens_tentacle: {
    id: "krakens_tentacle",
    icon: "tentacle.svg",
    category: "combat",
    weaponType: "knife",
    slot: "offHand",
    name: "kraken's tentacle",
    sellPrice: 950,
    description: "Provides minor offensive bonuses",
    isEquippable: true,
    stats: {
      accuracy: 7,
      attack: 6,
      attackMax: 8
    },
    extraStats: {
      accuracy: 3,
      attack: 3,
      attackMax: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 75
    }],
    enchantments: ['krakens_tentacle']
  },

  bison_axe: {
    id: "bison_axe",
    icon: "bisonAxe.svg",
    category: "combat",
    weaponType: "battleAxe",
    slot: "mainHand",
    name: "Bison's axe",
    sellPrice: 2250,
    description: "Fix for a bison to wield",
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 68.4,
      attackMax: 245.7,
      attackSpeed: 0.3,
      accuracy: 109.8,
      criticalChance: 5
    },
    extraStats: {
      attack: 20.5,
      attackMax: 73.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 85
    }],
    enchantments: ['bison_axe']
  },

  baby_fox: {
    id: "baby_fox",
    icon: "babyFox.svg",
    category: "combat",
    slot: "chest",
    name: "baby fox",
    sellPrice: 1800,
    description: "Summons a fox",
    isEquippable: true,
    stats: {
      healthMax: 1
    },
    extraStats: {
      healthMax: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 90
    }],
    enchantments: ['baby_fox']
  },
  
  winged_shield: {
    id: 'winged_shield',
    icon: 'winged_shield.svg',
    category: 'combat',
    slot: 'offHand',
    weaponType: 'shield',
    name: 'Winged Shield',
    sellPrice: 2000,
    description: 'Provides protection from harm',
    isEquippable: true,
    stats: {
      healthMax: 150,
      defense: 20,
      armor: 80
    },
    extraStats: {
      healthMax: 3.2,
      defense: 3.2,
      armor: 15.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 75
    }],
    enchantments: ['winged_shield']
  },
  
  orb_blue: {
    id: 'orb_blue',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'blue orb',
    sellPrice: 1000,
    description: 'A mystical device of wisdom and knowledge',
    isEquippable: true,
    stats: {
      magicPower: 3,
      healingPower: 0.1,
      magicArmor: 4
    },
    extraStats: {
      magicPower: 2,
      healingPower: 1.9,
      magicArmor: 1
    }
  },
  
  orb_green: {
    id: 'orb_green',
    icon: 'orbGreen.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'green orb',
    sellPrice: 1000,
    description: 'A mystical device of wisdom and knowledge',
    isEquippable: true,
    stats: {
      magicPower: 9,
      healingPower: 0.1,
      magicArmor: 12
    },
    extraStats: {
      magicPower: 4,
      healingPower: 3.9,
      magicArmor: 2
    }
  }
  
};
