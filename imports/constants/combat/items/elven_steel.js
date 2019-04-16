export const ELVEN_STEEL_ITEMS = {
  "elven_steel_dagger": {
    "id": "elven_steel_dagger",
    "icon": "elvenSteelDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "elven steel dagger",
    "sellPrice": 1350,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 16,
      "attackMax": 30,
      "attackSpeed": 1,
      "accuracy": 69.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 90
    }]
  },
  "elven_steel_spear": {
    "id": "elven_steel_spear",
    "icon": "elvenSteelSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "elven steel spear",
    "sellPrice": 2500,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 61.2,
      "attackMax": 76.6,
      "attackSpeed": 0.5,
      "accuracy": 76.6,
      "defense": 30
    },
    "extraStats": {
      "attack": 18.4,
      "attackMax": 23,
      "accuracy": 23,
      "defense": 9
    },
    upgradeRarity: [
      { chance: 10, rarityId: 'improved', }, // 10% chance
      { chance: 20, rarityId: 'crude', },    // 10% chance
      { chance: 40, rarityId: 'rough', },    // 20% chance
                                             // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 90
    }]
  },
  "elven_steel_short_sword": {
    "id": "elven_steel_short_sword",
    "icon": "elvenSteelShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "elven steel short sword",
    "sellPrice": 2500,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 61.2,
      "attackMax": 91.3,
      "attackSpeed": 0.7,
      "accuracy": 91.3
    },
    "extraStats": {
      "attack": 18.4,
      "attackMax": 27.4,
      "accuracy": 27.4
    },
    upgradeRarity: [
      { chance: 10, rarityId: 'improved', }, // 10% chance
      { chance: 20, rarityId: 'crude', },    // 10% chance
      { chance: 40, rarityId: 'rough', },    // 20% chance
                                             // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 90
    }]
  },
  "elven_steel_scimitar": {
    "id": "elven_steel_scimitar",
    "icon": "elvenSteelScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "elven steel scimitar",
    "sellPrice": 2500,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 67.6,
      "attackMax": 107.1,
      "attackSpeed": 0.7,
      "accuracy": 91.3
    },
    "extraStats": {
      "attack": 20.3,
      "attackMax": 32.1,
      "accuracy": 27.4
    },
    upgradeRarity: [
      { chance:  0.111111, rarityId: 'divine', },
      { chance:  0.333333, rarityId: 'epic', },
      { chance:  1.000000, rarityId: 'phenomenal', },
      { chance:  3.000000, rarityId: 'extraordinary', },
      { chance:  9.000000, rarityId: 'rare', },
      { chance: 27.000000, rarityId: 'fine', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95
    }]
  },
  "elven_steel_long_sword": {
    "id": "elven_steel_long_sword",
    "icon": "elvenSteelLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "elven steel long sword",
    "sellPrice": 2500,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 107.1,
      "attackMax": 183.9,
      "attackSpeed": 0.5,
      "accuracy": 123
    },
    "extraStats": {
      "attack": 32.1,
      "attackMax": 55.2,
      "accuracy": 36.9
    },
    upgradeRarity: [
      { chance: 10, rarityId: 'improved', }, // 10% chance
      { chance: 20, rarityId: 'crude', },    // 10% chance
      { chance: 40, rarityId: 'rough', },    // 20% chance
                                             // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 90
    }]
  },
  "elven_steel_broad_sword": {
    "id": "elven_steel_broad_sword",
    "icon": "elvenSteelBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "elven steel broad sword",
    "sellPrice": 2500,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 153.8,
      "attackMax": 214.8,
      "attackSpeed": 0.5,
      "accuracy": 123,
      "criticalChance": 10
    },
    "extraStats": {
      "attack": 46.1,
      "attackMax": 64.4,
      "accuracy": 36.9
    },
    upgradeRarity: [
      { chance:  0.111111, rarityId: 'divine', },
      { chance:  0.333333, rarityId: 'epic', },
      { chance:  1.000000, rarityId: 'phenomenal', },
      { chance:  3.000000, rarityId: 'extraordinary', },
      { chance:  9.000000, rarityId: 'rare', },
      { chance: 27.000000, rarityId: 'fine', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95
    }]
  },
  "elven_steel_battle_axe": {
    "id": "elven_steel_battle_axe",
    "icon": "elvenSteelBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "elven steel battle axe",
    "sellPrice": 2500,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 76.6,
      "attackMax": 275.2,
      "attackSpeed": 0.3,
      "accuracy": 123,
      "criticalChance": 35
    },
    "extraStats": {
      "attack": 23,
      "attackMax": 82.6
    },
    upgradeRarity: [
      { chance: 10, rarityId: 'improved', }, // 10% chance
      { chance: 20, rarityId: 'crude', },    // 10% chance
      { chance: 40, rarityId: 'rough', },    // 20% chance
                                             // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 90
    }]
  },
  "elven_steel_horned_helmet": {
    "id": "elven_steel_horned_helmet",
    "icon": "horned_helmet_t19.png",
    "category": "combat",
    "slot": "head",
    "name": "elven steel horned helmet",
    "sellPrice": 2500,
    "description": "Now that's using your head!",
    "isEquippable": true,
    "stats": {
      "attack": 16,
      "attackMax": 16,
      "accuracy": 16
    },
    "extraStats": {
      "attack": 4.8,
      "attackMax": 4.8,
      "accuracy": 4.8
    },
    upgradeRarity: [
      { chance:  0.111111, rarityId: 'divine', },
      { chance:  0.333333, rarityId: 'epic', },
      { chance:  1.000000, rarityId: 'phenomenal', },
      { chance:  3.000000, rarityId: 'extraordinary', },
      { chance:  9.000000, rarityId: 'rare', },
      { chance: 27.000000, rarityId: 'fine', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 90
    }]
  },
  "elven_steel_helmet": {
    "id": "elven_steel_helmet",
    "icon": "elvenSteelHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "elven steel helmet",
    "sellPrice": 2500,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 16,
      "defense": 16,
      "armor": 76.6
    },
    "extraStats": {
      "healthMax": 4.8,
      "defense": 4.8,
      "armor": 23
    },
    upgradeRarity: [
      { chance: 10, rarityId: 'improved', }, // 10% chance
      { chance: 20, rarityId: 'crude', },    // 10% chance
      { chance: 40, rarityId: 'rough', },    // 20% chance
                                             // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 90
    }]
  },
  "elven_steel_chest_plate": {
    "id": "elven_steel_chest_plate",
    "icon": "elvenSteelChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "elven steel Chestplate",
    "sellPrice": 2500,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 16,
      "defense": 16,
      "armor": 76.6
    },
    "extraStats": {
      "healthMax": 4.8,
      "defense": 4.8,
      "armor": 23
    },
    upgradeRarity: [
      { chance: 10, rarityId: 'improved', }, // 10% chance
      { chance: 20, rarityId: 'crude', },    // 10% chance
      { chance: 40, rarityId: 'rough', },    // 20% chance
                                             // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 90
    }]
  },
  "elven_steel_plate_legs": {
    "id": "elven_steel_plate_legs",
    "icon": "elvenSteelPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "elven steel platelegs",
    "sellPrice": 2500,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 16,
      "defense": 16,
      "armor": 76.6
    },
    "extraStats": {
      "healthMax": 4.8,
      "defense": 4.8,
      "armor": 23
    },
    upgradeRarity: [
      { chance: 10, rarityId: 'improved', }, // 10% chance
      { chance: 20, rarityId: 'crude', },    // 10% chance
      { chance: 40, rarityId: 'rough', },    // 20% chance
                                             // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 90
    }]
  },
  "elven_steel_shield": {
    "id": "elven_steel_shield",
    "icon": "elvenSteelShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "elven steel shield",
    "sellPrice": 2500,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 30,
      "defense": 46.9,
      "armor": 153.8
    },
    "extraStats": {
      "healthMax": 9,
      "defense": 14.1,
      "armor": 46.1
    },
    upgradeRarity: [
      { chance: 10, rarityId: 'improved', }, // 10% chance
      { chance: 20, rarityId: 'crude', },    // 10% chance
      { chance: 40, rarityId: 'rough', },    // 20% chance
                                             // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 90
    }]
  }
};
