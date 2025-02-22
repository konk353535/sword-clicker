export const IRON_ITEMS = {
  "iron_dagger": {
    "id": "iron_dagger",
    "icon": "ironDagger.svg",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "iron dagger",
    "sellPrice": 150,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 2.3,
      "attackMax": 4.5,
      "attackSpeed": 1,
      "accuracy": 10.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },
  "iron_spear": {
    "id": "iron_spear",
    "icon": "ironSpear.svg",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "iron spear",
    "sellPrice": 275,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 9.1,
      "attackMax": 11.4,
      "attackSpeed": 0.5,
      "accuracy": 11.4,
      "defense": 4.5
    },
    "extraStats": {
      "attack": 2.7,
      "attackMax": 3.4,
      "accuracy": 3.4,
      "defense": 1.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },
  "iron_short_sword": {
    "id": "iron_short_sword",
    "icon": "ironShortSword.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "iron short sword",
    "sellPrice": 275,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 9.1,
      "attackMax": 13.6,
      "attackSpeed": 0.7,
      "accuracy": 13.6
    },
    "extraStats": {
      "attack": 2.7,
      "attackMax": 4.1,
      "accuracy": 4.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },
  "iron_scimitar": {
    "id": "iron_scimitar",
    "icon": "ironScimitar.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "iron scimitar",
    "sellPrice": 275,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 10.1,
      "attackMax": 15.9,
      "attackSpeed": 0.7,
      "accuracy": 13.6
    },
    "extraStats": {
      "attack": 3,
      "attackMax": 4.8,
      "accuracy": 4.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },
  "iron_long_sword": {
    "id": "iron_long_sword",
    "icon": "ironLongSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "iron long sword",
    "sellPrice": 275,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 15.9,
      "attackMax": 27.3,
      "attackSpeed": 0.5,
      "accuracy": 18.3
    },
    "extraStats": {
      "attack": 4.8,
      "attackMax": 8.2,
      "accuracy": 5.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },
  "iron_broad_sword": {
    "id": "iron_broad_sword",
    "icon": "ironBroadSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "iron broad sword",
    "sellPrice": 275,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 22.8,
      "attackMax": 31.9,
      "attackSpeed": 0.5,
      "accuracy": 18.3
    },
    "extraStats": {
      "attack": 6.8,
      "attackMax": 9.6,
      "accuracy": 5.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },
  "iron_battle_axe": {
    "id": "iron_battle_axe",
    "icon": "ironBattleAxe.svg",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "iron battle axe",
    "sellPrice": 275,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 11.4,
      "attackMax": 41,
      "attackSpeed": 0.3,
      "accuracy": 18.3,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 3.4,
      "attackMax": 12.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },
  "iron_horned_helmet": {
    "id": "iron_horned_helmet",
    "icon": "ironHornedHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "iron horned helmet",
    "sellPrice": 275,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 2.3,
      "attackMax": 2.3,
      "accuracy": 2.3
    },
    "extraStats": {
      "attack": 0.7,
      "attackMax": 0.7,
      "accuracy": 0.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },
  "iron_helmet": {
    "id": "iron_helmet",
    "icon": "ironHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "iron helmet",
    "sellPrice": 275,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 2.3,
      "defense": 2.3,
      "armor": 11.4
    },
    "extraStats": {
      "healthMax": 0.7,
      "defense": 0.7,
      "armor": 3.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },
  "iron_chest_plate": {
    "id": "iron_chest_plate",
    "icon": "ironChestPlate.svg",
    "category": "combat",
    "slot": "chest",
    "name": "iron chestplate",
    "sellPrice": 275,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 2.3,
      "defense": 2.3,
      "armor": 11.4
    },
    "extraStats": {
      "healthMax": 0.7,
      "defense": 0.7,
      "armor": 3.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },
  "iron_plate_legs": {
    "id": "iron_plate_legs",
    "icon": "ironPlateLegs.svg",
    "category": "combat",
    "slot": "legs",
    "name": "iron platelegs",
    "sellPrice": 275,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 2.3,
      "defense": 2.3,
      "armor": 11.4
    },
    "extraStats": {
      "healthMax": 0.7,
      "defense": 0.7,
      "armor": 3.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },
  "iron_shield": {
    "id": "iron_shield",
    "icon": "ironShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "iron shield",
    "sellPrice": 275,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 4.5,
      "defense": 6.9,
      "armor": 22.8
    },
    "extraStats": {
      "healthMax": 1.3,
      "defense": 2.1,
      "armor": 6.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  }
}
