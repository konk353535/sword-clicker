export const METEORITE_ITEMS = {
  "meteorite_dagger": {
    "id": "meteorite_dagger",
    "icon": "meteoriteDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "meteorite dagger",
    "sellPrice": 1250,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 13,
      "attackMax": 24.4,
      "attackSpeed": 1,
      "accuracy": 56.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 80
    }]
  },
  "meteorite_spear": {
    "id": "meteorite_spear",
    "icon": "meteoriteSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "meteorite spear",
    "sellPrice": 2000,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 49.6,
      "attackMax": 62.2,
      "attackSpeed": 0.5,
      "accuracy": 62.2,
      "defense": 24.4
    },
    "extraStats": {
      "attack": 14.9,
      "attackMax": 18.7,
      "accuracy": 18.7,
      "defense": 7.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 80
    }]
  },
  "meteorite_short_sword": {
    "id": "meteorite_short_sword",
    "icon": "meteoriteShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "meteorite short sword",
    "sellPrice": 2000,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 49.6,
      "attackMax": 74.1,
      "attackSpeed": 0.7,
      "accuracy": 74.1
    },
    "extraStats": {
      "attack": 14.9,
      "attackMax": 22.2,
      "accuracy": 22.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 80
    }]
  },
  "meteorite_scimitar": {
    "id": "meteorite_scimitar",
    "icon": "meteoriteScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "meteorite scimitar",
    "sellPrice": 2000,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 54.9,
      "attackMax": 86.9,
      "attackSpeed": 0.7,
      "accuracy": 74.1
    },
    "extraStats": {
      "attack": 16.5,
      "attackMax": 26.1,
      "accuracy": 22.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 85
    }]
  },
  "meteorite_long_sword": {
    "id": "meteorite_long_sword",
    "icon": "meteoriteLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "meteorite long sword",
    "sellPrice": 2000,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 86.9,
      "attackMax": 149.3,
      "attackSpeed": 0.5,
      "accuracy": 99.8
    },
    "extraStats": {
      "attack": 26.1,
      "attackMax": 44.8,
      "accuracy": 29.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 80
    }]
  },
  "meteorite_broad_sword": {
    "id": "meteorite_broad_sword",
    "icon": "meteoriteBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "meteorite broad sword",
    "sellPrice": 2000,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 124.8,
      "attackMax": 174.4,
      "attackSpeed": 0.5,
      "accuracy": 99.8,
      "criticalChance": 15
    },
    "extraStats": {
      "attack": 37.4,
      "attackMax": 52.3,
      "accuracy": 29.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 85
    }]
  },
  "meteorite_battle_axe": {
    "id": "meteorite_battle_axe",
    "icon": "meteoriteBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "meteorite battle axe",
    "sellPrice": 2000,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 62.2,
      "attackMax": 223.4,
      "attackSpeed": 0.3,
      "accuracy": 99.8,
      "criticalChance": 25
    },
    "extraStats": {
      "attack": 18.7,
      "attackMax": 67
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 80
    }]
  },
  "meteorite_horned_helmet": {
    "id": "meteorite_horned_helmet",
    "icon": "horned_helmet_t17.png",
    "category": "combat",
    "slot": "head",
    "name": "meteorite horned helmet",
    "sellPrice": 2000,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 13,
      "attackMax": 13,
      "accuracy": 13
    },
    "extraStats": {
      "attack": 3.9,
      "attackMax": 3.9,
      "accuracy": 3.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 80
    }]
  },
  "meteorite_helmet": {
    "id": "meteorite_helmet",
    "icon": "meteoriteHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "meteorite helmet",
    "sellPrice": 2000,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 13,
      "defense": 13,
      "armor": 62.2
    },
    "extraStats": {
      "healthMax": 3.9,
      "defense": 3.9,
      "armor": 18.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 80
    }]
  },
  "meteorite_chest_plate": {
    "id": "meteorite_chest_plate",
    "icon": "meteoriteChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "meteorite Chestplate",
    "sellPrice": 2000,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 13,
      "defense": 13,
      "armor": 62.2
    },
    "extraStats": {
      "healthMax": 3.9,
      "defense": 3.9,
      "armor": 18.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 80
    }]
  },
  "meteorite_plate_legs": {
    "id": "meteorite_plate_legs",
    "icon": "meteoritePlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "meteorite platelegs",
    "sellPrice": 2000,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 13,
      "defense": 13,
      "armor": 62.2
    },
    "extraStats": {
      "healthMax": 3.9,
      "defense": 3.9,
      "armor": 18.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 80
    }]
  },
  "meteorite_shield": {
    "id": "meteorite_shield",
    "icon": "meteoriteShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "meteorite shield",
    "sellPrice": 2000,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 24.4,
      "defense": 38.1,
      "armor": 124.8
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
  }
};
