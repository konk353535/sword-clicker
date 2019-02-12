export const TIN_ITEMS = {
  "tin_dagger": {
    "id": "tin_dagger",
    "icon": "tinDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "tin dagger",
    "sellPrice": 50,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 1.4,
      "attackMax": 2.8,
      "attackSpeed": 1,
      "accuracy": 6.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },
  "tin_spear": {
    "id": "tin_spear",
    "icon": "tinSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "tin spear",
    "sellPrice": 75,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 5.6,
      "attackMax": 7,
      "attackSpeed": 0.5,
      "accuracy": 7,
      "defense": 2.8
    },
    "extraStats": {
      "attack": 1.7,
      "attackMax": 2.1,
      "accuracy": 2.1,
      "defense": 0.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },
  "tin_short_sword": {
    "id": "tin_short_sword",
    "icon": "tinShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "tin short sword",
    "sellPrice": 75,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 5.6,
      "attackMax": 8.4,
      "attackSpeed": 0.7,
      "accuracy": 8.4
    },
    "extraStats": {
      "attack": 1.7,
      "attackMax": 2.5,
      "accuracy": 2.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },
  "tin_scimitar": {
    "id": "tin_scimitar",
    "icon": "tinScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "tin scimitar",
    "sellPrice": 75,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 6.2,
      "attackMax": 9.8,
      "attackSpeed": 0.7,
      "accuracy": 8.4
    },
    "extraStats": {
      "attack": 1.9,
      "attackMax": 2.9,
      "accuracy": 2.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  },
  "tin_long_sword": {
    "id": "tin_long_sword",
    "icon": "tinLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "tin long sword",
    "sellPrice": 75,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 9.8,
      "attackMax": 16.8,
      "attackSpeed": 0.5,
      "accuracy": 11.2
    },
    "extraStats": {
      "attack": 2.9,
      "attackMax": 5,
      "accuracy": 3.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },
  "tin_broad_sword": {
    "id": "tin_broad_sword",
    "icon": "tinBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "tin broad sword",
    "sellPrice": 75,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 14,
      "attackMax": 19.6,
      "attackSpeed": 0.5,
      "accuracy": 11.2,
      "criticalChance": 10
    },
    "extraStats": {
      "attack": 4.2,
      "attackMax": 5.9,
      "accuracy": 3.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  },
  "tin_battle_axe": {
    "id": "tin_battle_axe",
    "icon": "tinBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "tin battle axe",
    "sellPrice": 75,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 7,
      "attackMax": 25.2,
      "attackSpeed": 0.3,
      "accuracy": 11.2,
      "criticalChance": 35
    },
    "extraStats": {
      "attack": 2.1,
      "attackMax": 7.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },
  "tin_horned_helmet": {
    "id": "tin_horned_helmet",
    "icon": "horned_helmet_t2.png",
    "category": "combat",
    "slot": "head",
    "name": "tin horned helmet",
    "sellPrice": 75,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 1.4,
      "attackMax": 1.4,
      "accuracy": 1.4
    },
    "extraStats": {
      "attack": 0.4,
      "attackMax": 0.4,
      "accuracy": 0.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },
  "tin_helmet": {
    "id": "tin_helmet",
    "icon": "tinHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "tin helmet",
    "sellPrice": 75,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 1.4,
      "defense": 1.4,
      "armor": 7
    },
    "extraStats": {
      "healthMax": 0.4,
      "defense": 0.4,
      "armor": 2.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },
  "tin_chest_plate": {
    "id": "tin_chest_plate",
    "icon": "tinChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "tin Chestplate",
    "sellPrice": 75,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 1.4,
      "defense": 1.4,
      "armor": 7
    },
    "extraStats": {
      "healthMax": 0.4,
      "defense": 0.4,
      "armor": 2.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },
  "tin_plate_legs": {
    "id": "tin_plate_legs",
    "icon": "tinPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "tin platelegs",
    "sellPrice": 75,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 1.4,
      "defense": 1.4,
      "armor": 7
    },
    "extraStats": {
      "healthMax": 0.4,
      "defense": 0.4,
      "armor": 2.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },
  "tin_shield": {
    "id": "tin_shield",
    "icon": "tinShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "tin shield",
    "sellPrice": 75,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 2.8,
      "defense": 4.2,
      "armor": 14
    },
    "extraStats": {
      "healthMax": 0.8,
      "defense": 1.3,
      "armor": 4.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  }
};
