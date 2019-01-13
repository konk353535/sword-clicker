export const SILVER_ITEMS = {
  "silver_dagger": {
    "id": "silver_dagger",
    "icon": "silverDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "silver dagger",
    "sellPrice": 250,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 2.8,
      "attackMax": 5.4,
      "attackSpeed": 1,
      "accuracy": 12.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },
  "silver_spear": {
    "id": "silver_spear",
    "icon": "silverSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "silver spear",
    "sellPrice": 400,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 10.9,
      "attackMax": 13.7,
      "attackSpeed": 0.5,
      "accuracy": 13.7,
      "defense": 5.4
    },
    "extraStats": {
      "attack": 3.3,
      "attackMax": 4.1,
      "accuracy": 4.1,
      "defense": 1.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },
  "silver_short_sword": {
    "id": "silver_short_sword",
    "icon": "silverShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "silver short sword",
    "sellPrice": 400,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 10.9,
      "attackMax": 16.3,
      "attackSpeed": 0.7,
      "accuracy": 16.3
    },
    "extraStats": {
      "attack": 3.3,
      "attackMax": 4.9,
      "accuracy": 4.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },
  "silver_scimitar": {
    "id": "silver_scimitar",
    "icon": "silverScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "silver scimitar",
    "sellPrice": 400,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 12.1,
      "attackMax": 19.1,
      "attackSpeed": 0.7,
      "accuracy": 16.3
    },
    "extraStats": {
      "attack": 3.6,
      "attackMax": 5.7,
      "accuracy": 4.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },
  "silver_long_sword": {
    "id": "silver_long_sword",
    "icon": "silverLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "silver long sword",
    "sellPrice": 400,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 19.1,
      "attackMax": 32.8,
      "attackSpeed": 0.5,
      "accuracy": 22
    },
    "extraStats": {
      "attack": 5.7,
      "attackMax": 9.8,
      "accuracy": 6.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },
  "silver_broad_sword": {
    "id": "silver_broad_sword",
    "icon": "silverBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "silver broad sword",
    "sellPrice": 400,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 27.4,
      "attackMax": 38.3,
      "attackSpeed": 0.5,
      "accuracy": 22,
      "criticalChance": 15
    },
    "extraStats": {
      "attack": 8.2,
      "attackMax": 11.5,
      "accuracy": 6.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },
  "silver_battle_axe": {
    "id": "silver_battle_axe",
    "icon": "silverBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "silver battle axe",
    "sellPrice": 400,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 13.7,
      "attackMax": 49.2,
      "attackSpeed": 0.3,
      "accuracy": 22,
      "criticalChance": 25
    },
    "extraStats": {
      "attack": 4.1,
      "attackMax": 14.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },
  "silver_horned_helmet": {
    "id": "silver_horned_helmet",
    "icon": "horned_helmet_t5.png",
    "category": "combat",
    "slot": "head",
    "name": "silver horned helmet",
    "sellPrice": 400,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 2.8,
      "attackMax": 2.8,
      "accuracy": 2.8
    },
    "extraStats": {
      "attack": 0.8,
      "attackMax": 0.8,
      "accuracy": 0.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },
  "silver_helmet": {
    "id": "silver_helmet",
    "icon": "silverHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "silver helmet",
    "sellPrice": 400,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 2.8,
      "defense": 2.8,
      "armor": 13.7
    },
    "extraStats": {
      "healthMax": 0.8,
      "defense": 0.8,
      "armor": 4.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },
  "silver_chest_plate": {
    "id": "silver_chest_plate",
    "icon": "silverChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "silver Chestplate",
    "sellPrice": 400,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 2.8,
      "defense": 2.8,
      "armor": 13.7
    },
    "extraStats": {
      "healthMax": 0.8,
      "defense": 0.8,
      "armor": 4.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },
  "silver_plate_legs": {
    "id": "silver_plate_legs",
    "icon": "silverPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "silver platelegs",
    "sellPrice": 400,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 2.8,
      "defense": 2.8,
      "armor": 13.7
    },
    "extraStats": {
      "healthMax": 0.8,
      "defense": 0.8,
      "armor": 4.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },
  "silver_shield": {
    "id": "silver_shield",
    "icon": "silverShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "silver shield",
    "sellPrice": 400,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 5.4,
      "defense": 8.3,
      "armor": 27.4
    },
    "extraStats": {
      "healthMax": 1.6,
      "defense": 2.5,
      "armor": 8.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  }
};
