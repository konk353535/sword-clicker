export const CARBON_ITEMS = {
  "carbon_dagger": {
    "id": "carbon_dagger",
    "icon": "carbonDagger",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "carbon dagger",
    "sellPrice": 450,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 4,
      "attackMax": 7.6,
      "attackSpeed": 1,
      "accuracy": 17.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },
  "carbon_spear": {
    "id": "carbon_spear",
    "icon": "carbonSpear",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "carbon spear",
    "sellPrice": 650,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 15.3,
      "attackMax": 19.2,
      "attackSpeed": 0.5,
      "accuracy": 19.2,
      "defense": 7.6
    },
    "extraStats": {
      "attack": 4.6,
      "attackMax": 5.8,
      "accuracy": 5.8,
      "defense": 2.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },
  "carbon_short_sword": {
    "id": "carbon_short_sword",
    "icon": "carbonShortSword",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "carbon short sword",
    "sellPrice": 650,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 15.3,
      "attackMax": 22.9,
      "attackSpeed": 0.7,
      "accuracy": 22.9
    },
    "extraStats": {
      "attack": 4.6,
      "attackMax": 6.9,
      "accuracy": 6.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },
  "carbon_scimitar": {
    "id": "carbon_scimitar",
    "icon": "carbonScimitar",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "carbon scimitar",
    "sellPrice": 650,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17,
      "attackMax": 26.8,
      "attackSpeed": 0.7,
      "accuracy": 22.9
    },
    "extraStats": {
      "attack": 5.1,
      "attackMax": 8,
      "accuracy": 6.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },
  "carbon_long_sword": {
    "id": "carbon_long_sword",
    "icon": "carbonLongSword",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "carbon long sword",
    "sellPrice": 650,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 26.8,
      "attackMax": 46.1,
      "attackSpeed": 0.5,
      "accuracy": 30.9
    },
    "extraStats": {
      "attack": 8,
      "attackMax": 13.8,
      "accuracy": 9.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },
  "carbon_broad_sword": {
    "id": "carbon_broad_sword",
    "icon": "carbonBroadSword",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "carbon broad sword",
    "sellPrice": 650,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 38.5,
      "attackMax": 53.8,
      "attackSpeed": 0.5,
      "accuracy": 30.9
    },
    "extraStats": {
      "attack": 11.5,
      "attackMax": 16.1,
      "accuracy": 9.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },
  "carbon_battle_axe": {
    "id": "carbon_battle_axe",
    "icon": "carbonBattleAxe",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "carbon battle axe",
    "sellPrice": 650,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 19.2,
      "attackMax": 69,
      "attackSpeed": 0.3,
      "accuracy": 30.9,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 5.8,
      "attackMax": 20.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },
  "carbon_horned_helmet": {
    "id": "carbon_horned_helmet",
    "icon": "carbonHornedHelmet",
    "category": "combat",
    "slot": "head",
    "name": "carbon horned helmet",
    "sellPrice": 650,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 4,
      "attackMax": 4,
      "accuracy": 4
    },
    "extraStats": {
      "attack": 1.2,
      "attackMax": 1.2,
      "accuracy": 1.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },
  "carbon_helmet": {
    "id": "carbon_helmet",
    "icon": "carbonHelmet",
    "category": "combat",
    "slot": "head",
    "name": "carbon helmet",
    "sellPrice": 650,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 4,
      "defense": 4,
      "armor": 19.2
    },
    "extraStats": {
      "healthMax": 1.2,
      "defense": 1.2,
      "armor": 5.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },
  "carbon_chest_plate": {
    "id": "carbon_chest_plate",
    "icon": "carbonChestPlate",
    "category": "combat",
    "slot": "chest",
    "name": "carbon chestplate",
    "sellPrice": 650,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 4,
      "defense": 4,
      "armor": 19.2
    },
    "extraStats": {
      "healthMax": 1.2,
      "defense": 1.2,
      "armor": 5.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },
  "carbon_plate_legs": {
    "id": "carbon_plate_legs",
    "icon": "carbonPlateLegs",
    "category": "combat",
    "slot": "legs",
    "name": "carbon platelegs",
    "sellPrice": 650,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 4,
      "defense": 4,
      "armor": 19.2
    },
    "extraStats": {
      "healthMax": 1.2,
      "defense": 1.2,
      "armor": 5.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },
  "carbon_shield": {
    "id": "carbon_shield",
    "icon": "carbonShield",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "carbon shield",
    "sellPrice": 650,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 7.6,
      "defense": 11.7,
      "armor": 38.5
    },
    "extraStats": {
      "healthMax": 2.3,
      "defense": 3.5,
      "armor": 11.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  }
}
