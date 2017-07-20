export const TUNGSTEN_ITEMS = {
  "tungsten_dagger": {
    "id": "tungsten_dagger",
    "icon": "tungstenDagger",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "tungsten dagger",
    "sellPrice": 850,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 7,
      "attackMax": 13.2,
      "attackSpeed": 1,
      "accuracy": 30.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }]
  },
  "tungsten_spear": {
    "id": "tungsten_spear",
    "icon": "tungstenSpear",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "tungsten spear",
    "sellPrice": 1200,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 26.8,
      "attackMax": 33.6,
      "attackSpeed": 0.5,
      "accuracy": 33.6,
      "defense": 13.2
    },
    "extraStats": {
      "attack": 8,
      "attackMax": 10.1,
      "accuracy": 10.1,
      "defense": 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 50
    }]
  },
  "tungsten_short_sword": {
    "id": "tungsten_short_sword",
    "icon": "tungstenShortSword",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "tungsten short sword",
    "sellPrice": 1200,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 26.8,
      "attackMax": 40,
      "attackSpeed": 0.7,
      "accuracy": 40
    },
    "extraStats": {
      "attack": 8,
      "attackMax": 12,
      "accuracy": 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }]
  },
  "tungsten_scimitar": {
    "id": "tungsten_scimitar",
    "icon": "tungstenScimitar",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "tungsten scimitar",
    "sellPrice": 1200,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 29.6,
      "attackMax": 46.9,
      "attackSpeed": 0.7,
      "accuracy": 40
    },
    "extraStats": {
      "attack": 8.9,
      "attackMax": 14.1,
      "accuracy": 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 55
    }]
  },
  "tungsten_long_sword": {
    "id": "tungsten_long_sword",
    "icon": "tungstenLongSword",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "tungsten long sword",
    "sellPrice": 1200,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 46.9,
      "attackMax": 80.6,
      "attackSpeed": 0.5,
      "accuracy": 53.9
    },
    "extraStats": {
      "attack": 14.1,
      "attackMax": 24.2,
      "accuracy": 16.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }]
  },
  "tungsten_broad_sword": {
    "id": "tungsten_broad_sword",
    "icon": "tungstenBroadSword",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "tungsten broad sword",
    "sellPrice": 1200,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 67.3,
      "attackMax": 94.1,
      "attackSpeed": 0.5,
      "accuracy": 53.9
    },
    "extraStats": {
      "attack": 20.2,
      "attackMax": 28.2,
      "accuracy": 16.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 55
    }]
  },
  "tungsten_battle_axe": {
    "id": "tungsten_battle_axe",
    "icon": "tungstenBattleAxe",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "tungsten battle axe",
    "sellPrice": 1200,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 33.6,
      "attackMax": 120.6,
      "attackSpeed": 0.3,
      "accuracy": 53.9
    },
    "extraStats": {
      "attack": 10.1,
      "attackMax": 36.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }]
  },
  "tungsten_horned_helmet": {
    "id": "tungsten_horned_helmet",
    "icon": "tungstenHornedHelmet",
    "category": "combat",
    "slot": "head",
    "name": "tungsten horned helmet",
    "sellPrice": 1200,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 7,
      "attackMax": 7,
      "accuracy": 7
    },
    "extraStats": {
      "attack": 2.1,
      "attackMax": 2.1,
      "accuracy": 2.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 50
    }]
  },
  "tungsten_helmet": {
    "id": "tungsten_helmet",
    "icon": "tungstenHelmet",
    "category": "combat",
    "slot": "head",
    "name": "tungsten helmet",
    "sellPrice": 1200,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 7,
      "defense": 7,
      "armor": 33.6
    },
    "extraStats": {
      "healthMax": 2.1,
      "defense": 2.1,
      "armor": 10.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 50
    }]
  },
  "tungsten_chest_plate": {
    "id": "tungsten_chest_plate",
    "icon": "tungstenChestPlate",
    "category": "combat",
    "slot": "chest",
    "name": "tungsten chestplate",
    "sellPrice": 1200,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 7,
      "defense": 7,
      "armor": 33.6
    },
    "extraStats": {
      "healthMax": 2.1,
      "defense": 2.1,
      "armor": 10.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 50
    }]
  },
  "tungsten_plate_legs": {
    "id": "tungsten_plate_legs",
    "icon": "tungstenPlateLegs",
    "category": "combat",
    "slot": "legs",
    "name": "tungsten platelegs",
    "sellPrice": 1200,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 7,
      "defense": 7,
      "armor": 33.6
    },
    "extraStats": {
      "healthMax": 2.1,
      "defense": 2.1,
      "armor": 10.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 50
    }]
  },
  "tungsten_shield": {
    "id": "tungsten_shield",
    "icon": "tungstenShield",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "tungsten shield",
    "sellPrice": 1200,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 13.2,
      "defense": 20.5,
      "armor": 67.3
    },
    "extraStats": {
      "healthMax": 4,
      "defense": 6.1,
      "armor": 20.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 50
    }]
  }
}
