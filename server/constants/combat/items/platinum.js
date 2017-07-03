export const PLATINUM_ITEMS = {
  "platinum_dagger": {
    "id": "platinum_dagger",
    "icon": "platinumDagger",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "platinum dagger",
    "sellPrice": 50,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 5.4,
      "attackMax": 10.2,
      "attackSpeed": 1,
      "accuracy": 23.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },
  "platinum_spear": {
    "id": "platinum_spear",
    "icon": "platinumSpear",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "platinum spear",
    "sellPrice": 75,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 20.6,
      "attackMax": 25.8,
      "attackSpeed": 0.5,
      "accuracy": 25.8,
      "defense": 10.2
    },
    "extraStats": {
      "attack": 6.2,
      "attackMax": 7.7,
      "accuracy": 7.7,
      "defense": 3.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  },
  "platinum_short_sword": {
    "id": "platinum_short_sword",
    "icon": "platinumShortSword",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "platinum short sword",
    "sellPrice": 75,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 20.6,
      "attackMax": 30.8,
      "attackSpeed": 0.7,
      "accuracy": 30.8
    },
    "extraStats": {
      "attack": 6.2,
      "attackMax": 9.2,
      "accuracy": 9.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },
  "platinum_scimitar": {
    "id": "platinum_scimitar",
    "icon": "platinumScimitar",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "platinum scimitar",
    "sellPrice": 75,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 22.8,
      "attackMax": 36.1,
      "attackSpeed": 0.7,
      "accuracy": 30.8
    },
    "extraStats": {
      "attack": 6.8,
      "attackMax": 10.8,
      "accuracy": 9.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },
  "platinum_long_sword": {
    "id": "platinum_long_sword",
    "icon": "platinumLongSword",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "platinum long sword",
    "sellPrice": 75,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 36.1,
      "attackMax": 62,
      "attackSpeed": 0.5,
      "accuracy": 41.5
    },
    "extraStats": {
      "attack": 10.8,
      "attackMax": 18.6,
      "accuracy": 12.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },
  "platinum_broad_sword": {
    "id": "platinum_broad_sword",
    "icon": "platinumBroadSword",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "platinum broad sword",
    "sellPrice": 75,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 51.8,
      "attackMax": 72.4,
      "attackSpeed": 0.5,
      "accuracy": 41.5
    },
    "extraStats": {
      "attack": 15.5,
      "attackMax": 21.7,
      "accuracy": 12.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },
  "platinum_battle_axe": {
    "id": "platinum_battle_axe",
    "icon": "platinumBattleAxe",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "platinum battle axe",
    "sellPrice": 75,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 25.8,
      "attackMax": 92.8,
      "attackSpeed": 0.3,
      "accuracy": 41.5
    },
    "extraStats": {
      "attack": 7.7,
      "attackMax": 27.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },
  "platinum_horned_helmet": {
    "id": "platinum_horned_helmet",
    "icon": "platinumHornedHelmet",
    "category": "combat",
    "slot": "head",
    "name": "platinum horned helmet",
    "sellPrice": 75,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 5.4,
      "attackMax": 5.4,
      "accuracy": 5.4
    },
    "extraStats": {
      "attack": 1.6,
      "attackMax": 1.6,
      "accuracy": 1.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  },
  "platinum_helmet": {
    "id": "platinum_helmet",
    "icon": "platinumHelmet",
    "category": "combat",
    "slot": "head",
    "name": "platinum helmet",
    "sellPrice": 75,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 5.4,
      "defense": 5.4,
      "armor": 25.8
    },
    "extraStats": {
      "healthMax": 1.6,
      "defense": 1.6,
      "armor": 7.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  },
  "platinum_chest_plate": {
    "id": "platinum_chest_plate",
    "icon": "platinumChestPlate",
    "category": "combat",
    "slot": "chest",
    "name": "platinum chestplate",
    "sellPrice": 75,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 5.4,
      "defense": 5.4,
      "armor": 25.8
    },
    "extraStats": {
      "healthMax": 1.6,
      "defense": 1.6,
      "armor": 7.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  },
  "platinum_plate_legs": {
    "id": "platinum_plate_legs",
    "icon": "platinumPlateLegs",
    "category": "combat",
    "slot": "legs",
    "name": "platinum platelegs",
    "sellPrice": 75,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 5.4,
      "defense": 5.4,
      "armor": 25.8
    },
    "extraStats": {
      "healthMax": 1.6,
      "defense": 1.6,
      "armor": 7.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  },
  "platinum_shield": {
    "id": "platinum_shield",
    "icon": "platinumShield",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "platinum shield",
    "sellPrice": 75,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 10.2,
      "defense": 15.7,
      "armor": 51.8
    },
    "extraStats": {
      "healthMax": 3.1,
      "defense": 4.7,
      "armor": 15.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  }
}
