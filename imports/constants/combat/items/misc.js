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
  copper_knife: {
    id: 'copper_knife',
    icon: 'copperKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'copper knife',
    sellPrice: 75,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 1.7,
      accuracy: 1
    },
    extraStats: {
      attack: 1,
      attackMax: 3,
      accuracy: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 0
    }]
  },

  tin_knife: {
    id: 'tin_knife',
    icon: 'tinKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'tin knife',
    sellPrice: 150,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 1.3,
      attackMax: 2.3,
      accuracy: 1.5
    },
    extraStats: {
      attack: 1,
      attackMax: 3,
      accuracy: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },

  bronze_knife: {
    id: 'bronze_knife',
    icon: 'bronzeKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'bronze knife',
    sellPrice: 225,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 1.6,
      attackMax: 2.9,
      accuracy: 2
    },
    extraStats: {
      attack: 2,
      attackMax: 4,
      accuracy: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  },

  iron_knife: {
    id: 'iron_knife',
    icon: 'ironKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'iron knife',
    sellPrice: 300,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 1.9,
      attackMax: 3.5,
      accuracy: 2.5
    },
    extraStats: {
      attack: 2,
      attackMax: 4,
      accuracy: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },

  silver_knife: {
    id: 'silver_knife',
    icon: 'silverKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'silver knife',
    sellPrice: 375,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 2.2,
      attackMax: 4.1,
      accuracy: 3
    },
    extraStats: {
      attack: 2,
      attackMax: 4,
      accuracy: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  gold_knife: {
    id: 'gold_knife',
    icon: 'goldKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'gold knife',
    sellPrice: 450,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 2.5,
      attackMax: 4.7,
      accuracy: 3.5
    },
    extraStats: {
      attack: 3,
      attackMax: 5,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },

  carbon_knife: {
    id: 'carbon_knife',
    icon: 'carbonKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'carbon knife',
    sellPrice: 525,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 2.8,
      attackMax: 5.3,
      accuracy: 4
    },
    extraStats: {
      attack: 3,
      attackMax: 5,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },

  steel_knife: {
    id: 'steel_knife',
    icon: 'steelKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'steel knife',
    sellPrice: 600,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 3.1,
      attackMax: 5.9,
      accuracy: 4.5
    },
    extraStats: {
      attack: 3,
      attackMax: 5,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },

  platinum_knife: {
    id: 'platinum_knife',
    icon: 'platinumKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'platinum knife',
    sellPrice: 675,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 3.4,
      attackMax: 6.5,
      accuracy: 5
    },
    extraStats: {
      attack: 3,
      attackMax: 5,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },

  titanium_knife: {
    id: 'titanium_knife',
    icon: 'titaniumKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'titanium knife',
    sellPrice: 750,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 3.7,
      attackMax: 7.1,
      accuracy: 5.5
    },
    extraStats: {
      attack: 3,
      attackMax: 5,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },

  tungsten_knife: {
    id: 'tungsten_knife',
    icon: 'tungstenKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'tungsten knife',
    sellPrice: 825,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 7.7,
      accuracy: 6
    },
    extraStats: {
      attack: 4,
      attackMax: 6,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }]
  },

  obsidian_knife: {
    id: 'obsidian_knife',
    icon: 'obsidianKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'obsidian knife',
    sellPrice: 900,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 4.3,
      attackMax: 8.3,
      accuracy: 6.5
    },
    extraStats: {
      attack: 4,
      attackMax: 6,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 55
    }]
  },

  cobalt_knife: {
    id: 'cobalt_knife',
    icon: 'cobaltKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'cobalt knife',
    sellPrice: 975,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 4.6,
      attackMax: 8.9,
      accuracy: 7
    },
    extraStats: {
      attack: 4,
      attackMax: 6,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },

  mithril_knife: {
    id: 'mithril_knife',
    icon: 'mithrilKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'mithril knife',
    sellPrice: 1050,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 4.9,
      attackMax: 9.5,
      accuracy: 7.5
    },
    extraStats: {
      attack: 4,
      attackMax: 6,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 65
    }]
  },

  adamantium_knife: {
    id: 'adamantium_knife',
    icon: 'adamantiumKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'adamantium knife',
    sellPrice: 1125,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 5.2,
      attackMax: 10.1,
      accuracy: 8
    },
    extraStats: {
      attack: 4,
      attackMax: 6,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 70
    }]
  },

  orichalcum_knife: {
    id: 'orichalcum_knife',
    icon: 'orichalcumKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'orichalcum knife',
    sellPrice: 1200,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 5.5,
      attackMax: 10.7,
      accuracy: 8.5
    },
    extraStats: {
      attack: 4,
      attackMax: 6,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 75
    }]
  },

  meteorite_knife: {
    id: 'meteorite_knife',
    icon: 'meteoriteKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'meteorite knife',
    sellPrice: 1275,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 5.8,
      attackMax: 11.3,
      accuracy: 9
    },
    extraStats: {
      attack: 4,
      attackMax: 6,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 80
    }]
  },

  fairy_steel_knife: {
    id: 'fairy_steel_knife',
    icon: 'fairySteelKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'fairy steel knife',
    sellPrice: 1350,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 6.1,
      attackMax: 11.9,
      accuracy: 9.5
    },
    extraStats: {
      attack: 4,
      attackMax: 6,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 85
    }]
  },

  elven_steel_knife: {
    id: 'elven_steel_knife',
    icon: 'elvenSteelKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'elven steel knife',
    sellPrice: 1425,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 6.4,
      attackMax: 12.5,
      accuracy: 10
    },
    extraStats: {
      attack: 4,
      attackMax: 6,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 90
    }]
  },

  cursed_knife: {
    id: 'cursed_knife',
    icon: 'cursedKnife.png',
    category: 'combat',
    weaponType: 'knife',
    slot: 'offHand',
    name: 'cursed knife',
    sellPrice: 1500,
    description: 'Provides minor offensive bonuses',
    isEquippable: true,
    stats: {
      attack: 6.7,
      attackMax: 13.1,
      accuracy: 10.5
    },
    extraStats: {
      attack: 4,
      attackMax: 6,
      accuracy: 4
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
    name: 'demon\'s heart',
    sellPrice: 1000,
    description: 'Cursed for all eternity.',
    isEquippable: true,
    stats: {
      healthMax: 150,
      criticalChance: 10,
      accuracy: 10,
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
    }],
    enchantments: ['opal_chest_plate']
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
  },
    
  diminished_orb: {
    id: 'diminished_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'diminished orb',
    sellPrice: 285,
    description: 'A mysterious and diminished device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 0,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 2,
      magicArmor: 3,
      healingPower: 1
    }
  },

  cracked_orb: {
    id: 'cracked_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'cracked orb',
    sellPrice: 570,
    description: 'A mysterious and cracked device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 1,
      magicPower: 6,
      magicArmor: 9,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 2,
      magicArmor: 3,
      healingPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 1
    }]
  },

  dim_orb: {
    id: 'dim_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'dim orb',
    sellPrice: 855,
    description: 'A mysterious and dim device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 1,
      magicPower: 7,
      magicArmor: 10,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 3,
      magicArmor: 5,
      healingPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 3
    }]
  },

  malformed_orb: {
    id: 'malformed_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'malformed orb',
    sellPrice: 1140,
    description: 'A mysterious and malformed device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 2,
      magicPower: 8,
      magicArmor: 11,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 3,
      magicArmor: 5,
      healingPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 3
    }]
  },

  pale_orb: {
    id: 'pale_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'pale orb',
    sellPrice: 1425,
    description: 'A mysterious and pale device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 2,
      magicPower: 9,
      magicArmor: 13,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 3,
      magicArmor: 5,
      healingPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 6
    }]
  },

  magic_touched_orb: {
    id: 'magic_touched_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'magic-touched orb',
    sellPrice: 1710,
    description: 'A mysterious and magic-touched device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 3,
      magicPower: 10,
      magicArmor: 14,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 4,
      magicArmor: 6,
      healingPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 9
    }]
  },

  weak_orb: {
    id: 'weak_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'weak orb',
    sellPrice: 1995,
    description: 'A mysterious and weak device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 3,
      magicPower: 11,
      magicArmor: 15,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 4,
      magicArmor: 6,
      healingPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 12
    }]
  },

  tainted_orb: {
    id: 'tainted_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'tainted orb',
    sellPrice: 2280,
    description: 'A mysterious and tainted device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 4,
      magicPower: 12,
      magicArmor: 17,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 4,
      magicArmor: 6,
      healingPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  shimmering_orb: {
    id: 'shimmering_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'shimmering orb',
    sellPrice: 2565,
    description: 'A mysterious and shimmering device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 4,
      magicPower: 13,
      magicArmor: 18,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 4,
      magicArmor: 6,
      healingPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 18
    }]
  },

  glittering_orb: {
    id: 'glittering_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'glittering orb',
    sellPrice: 2850,
    description: 'A mysterious and glittering device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 5,
      magicPower: 14,
      magicArmor: 19,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 4,
      magicArmor: 6,
      healingPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 21
    }]
  },

  glowing_orb: {
    id: 'glowing_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'glowing orb',
    sellPrice: 3135,
    description: 'A mysterious and glowing device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 5,
      magicPower: 15.5,
      magicArmor: 21,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 24
    }]
  },

  pulsating_orb: {
    id: 'pulsating_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'pulsating orb',
    sellPrice: 3420,
    description: 'A mysterious and pulsating device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 6,
      magicPower: 17,
      magicArmor: 23,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 27
    }]
  },

  runed_orb: {
    id: 'runed_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'runed orb',
    sellPrice: 3705,
    description: 'A mysterious and runed device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 6,
      magicPower: 18.5,
      magicArmor: 25,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  billowing_orb: {
    id: 'billowing_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'billowing orb',
    sellPrice: 3990,
    description: 'A mysterious and billowing device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 7,
      magicPower: 20,
      magicArmor: 27,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 33
    }]
  },

  pristine_orb: {
    id: 'pristine_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'pristine orb',
    sellPrice: 4275,
    description: 'A mysterious and pristine device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 7,
      magicPower: 21.5,
      magicArmor: 30,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 36
    }]
  },

  arcane_orb: {
    id: 'arcane_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'arcane orb',
    sellPrice: 4560,
    description: 'A mysterious and arcane device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 8,
      magicPower: 23,
      magicArmor: 32,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 39
    }]
  },

  powerful_orb: {
    id: 'powerful_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'powerful orb',
    sellPrice: 4845,
    description: 'A mysterious and powerful device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 8,
      magicPower: 24.5,
      magicArmor: 34,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 42
    }]
  },

  dangerous_orb: {
    id: 'dangerous_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'dangerous orb',
    sellPrice: 5130,
    description: 'A mysterious and dangerous device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 9,
      magicPower: 26,
      magicArmor: 36,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 45
    }]
  },

  prismatic_orb: {
    id: 'prismatic_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'prismatic orb',
    sellPrice: 5415,
    description: 'A mysterious and prismatic device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 9,
      magicPower: 27.5,
      magicArmor: 38,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 48
    }]
  },

  cataclysmic_orb: {
    id: 'cataclysmic_orb',
    icon: 'orbBlue.png',
    category: 'combat',
    weaponType: 'orb',
    slot: 'offHand',
    name: 'cataclysmic orb',
    sellPrice: 5700,
    description: 'A mysterious and cataclysmic device.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      defense: 10,
      magicPower: 29,
      magicArmor: 40,
      healingPower: 2
    },
    extraStats: {
      defense: 1,
      magicPower: 5,
      magicArmor: 7,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 51
    }]
  },
  
  ripped_tome: {
    id: 'ripped_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'ripped tome',
    sellPrice: 315,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 4,
      healingPower: 8
    },
    extraStats: {
      magicPower: 2,
      healingPower: 2
    }
  },

  dusty_tome: {
    id: 'dusty_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'dusty tome',
    sellPrice: 630,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 5,
      healingPower: 8
    },
    extraStats: {
      magicPower: 2,
      healingPower: 3.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 1
    }]
  },

  poor_tome: {
    id: 'poor_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'poor tome',
    sellPrice: 945,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 6,
      healingPower: 8
    },
    extraStats: {
      magicPower: 2.5,
      healingPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 3
    }]
  },

  worn_tome: {
    id: 'worn_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'worn tome',
    sellPrice: 1260,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 7,
      healingPower: 8
    },
    extraStats: {
      magicPower: 2.5,
      healingPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 3
    }]
  },

  dull_tome: {
    id: 'dull_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'dull tome',
    sellPrice: 1575,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 8,
      healingPower: 8
    },
    extraStats: {
      magicPower: 2.5,
      healingPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 6
    }]
  },

  simple_tome: {
    id: 'simple_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'simple tome',
    sellPrice: 1890,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 9,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3,
      healingPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 9
    }]
  },

  basic_tome: {
    id: 'basic_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'basic tome',
    sellPrice: 2205,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 10,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3,
      healingPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 12
    }]
  },

  studius_tome: {
    id: 'studius_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'studius tome',
    sellPrice: 2520,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 11,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3,
      healingPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  paradoxical_tome: {
    id: 'paradoxical_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'paradoxical tome',
    sellPrice: 2835,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 12,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3,
      healingPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 18
    }]
  },

  leather_bound_tome: {
    id: 'leather_bound_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'leather-bound tome',
    sellPrice: 3150,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 13,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3,
      healingPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 21
    }]
  },

  prestigious_tome: {
    id: 'prestigious_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'prestigious tome',
    sellPrice: 3465,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 14.5,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3.5,
      healingPower: 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 24
    }]
  },

  spellbound_tome: {
    id: 'spellbound_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'spellbound tome',
    sellPrice: 3780,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 16,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3.5,
      healingPower: 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 27
    }]
  },

  scholars_tome: {
    id: 'scholars_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'scholar\'s tome',
    sellPrice: 4095,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 17.5,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3.5,
      healingPower: 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  rich_tome: {
    id: 'rich_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'rich tome',
    sellPrice: 4410,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 19,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3.5,
      healingPower: 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 33
    }]
  },

  bewildering_tome: {
    id: 'bewildering_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'bewildering tome',
    sellPrice: 4725,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 20.5,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3.5,
      healingPower: 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 36
    }]
  },

  perplexing_tome: {
    id: 'perplexing_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'perplexing tome',
    sellPrice: 5040,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 22,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3.5,
      healingPower: 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 39
    }]
  },

  breathtaking_tome: {
    id: 'breathtaking_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'breathtaking tome',
    sellPrice: 5355,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 23.5,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3.5,
      healingPower: 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 42
    }]
  },

  ancient_tome: {
    id: 'ancient_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'ancient tome',
    sellPrice: 5670,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 25,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3.5,
      healingPower: 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 45
    }]
  },

  stellar_tome: {
    id: 'stellar_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'stellar tome',
    sellPrice: 5985,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 26.5,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3.5,
      healingPower: 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 48
    }]
  },

  legendary_tome: {
    id: 'legendary_tome',
    icon: 'magicTomeTx.png',
    category: 'combat',
    weaponType: 'tome',
    slot: 'offHand',
    name: 'legendary tome',
    sellPrice: 6300,
    description: 'A font of arcane secrets.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      magicPower: 28,
      healingPower: 8
    },
    extraStats: {
      magicPower: 3.5,
      healingPower: 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 51
    }]
  },
  
  festive_hat: {
    id: 'festive_hat',
    icon: 'festiveHat.png',
    category: 'combat',
    slot: 'head',
    name: 'festive hat',
    sellPrice: 250,
    description: 'Seems to spread holiday cheer',
    isEquippable: true,
    stats: {
      attackSpeed: -0.1,
      magicPower: 20,
      healingPower: 1
    },
    extraStats: {
      magicPower: 10,
      healingPower: 7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 35
    }],
    enchantments: ['phoenix_hat']
  }
};
