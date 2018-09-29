export const CURSED_ITEMS = {
  "cursed_dagger": {
    "id": "cursed_dagger",
    "icon": "cursedDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "cursed dagger",
    "sellPrice": 1650,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17.4,
      "attackMax": 32.7,
      "attackSpeed": 1,
      "accuracy": 75.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95
    }]
  },
  "cursed_spear": {
    "id": "cursed_spear",
    "icon": "cursedSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "cursed spear",
    "sellPrice": 3000,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7,
      "attackMax": 83.5,
      "attackSpeed": 0.5,
      "accuracy": 83.5,
      "defense": 32.7
    },
    "extraStats": {
      "attack": 20,
      "attackMax": 25.1,
      "accuracy": 25.1,
      "defense": 9.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 95
    }]
  },
  "cursed_short_sword": {
    "id": "cursed_short_sword",
    "icon": "cursedShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "cursed short sword",
    "sellPrice": 3000,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7,
      "attackMax": 99.5,
      "attackSpeed": 0.7,
      "accuracy": 99.5
    },
    "extraStats": {
      "attack": 20,
      "attackMax": 29.8,
      "accuracy": 29.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95
    }]
  },
  "cursed_scimitar": {
    "id": "cursed_scimitar",
    "icon": "cursedScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "cursed scimitar",
    "sellPrice": 3000,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 73.7,
      "attackMax": 116.7,
      "attackSpeed": 0.7,
      "accuracy": 99.5
    },
    "extraStats": {
      "attack": 22.1,
      "attackMax": 35,
      "accuracy": 29.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  "cursed_long_sword": {
    "id": "cursed_long_sword",
    "icon": "cursedLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "cursed long sword",
    "sellPrice": 3000,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7,
      "attackMax": 200.5,
      "attackSpeed": 0.5,
      "accuracy": 134.1
    },
    "extraStats": {
      "attack": 35,
      "attackMax": 60.2,
      "accuracy": 40.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95
    }]
  },
  "cursed_broad_sword": {
    "id": "cursed_broad_sword",
    "icon": "cursedBroadSword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "cursed broad sword",
    "sellPrice": 3000,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 167.6,
      "attackMax": 234.1,
      "attackSpeed": 0.5,
      "accuracy": 134.1
    },
    "extraStats": {
      "attack": 50.3,
      "attackMax": 70.2,
      "accuracy": 40.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  "cursed_battle_axe": {
    "id": "cursed_battle_axe",
    "icon": "cursedBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "cursed battle axe",
    "sellPrice": 3000,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 83.5,
      "attackMax": 300,
      "attackSpeed": 0.3,
      "accuracy": 134.1,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 25.1,
      "attackMax": 90
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 95
    }]
  },
  "cursed_horned_helmet": {
    "id": "cursed_horned_helmet",
    "icon": "cursedHornedHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "cursed horned helmet",
    "sellPrice": 3000,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 17.4,
      "attackMax": 17.4,
      "accuracy": 17.4
    },
    "extraStats": {
      "attack": 5.2,
      "attackMax": 5.2,
      "accuracy": 5.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 95
    }]
  },
  "cursed_helmet": {
    "id": "cursed_helmet",
    "icon": "cursedHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "cursed helmet",
    "sellPrice": 3000,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4,
      "defense": 17.4,
      "armor": 83.5
    },
    "extraStats": {
      "healthMax": 5.2,
      "defense": 5.2,
      "armor": 25.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 95
    }]
  },
  "cursed_chest_plate": {
    "id": "cursed_chest_plate",
    "icon": "cursedChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "cursed Chestplate",
    "sellPrice": 3000,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4,
      "defense": 17.4,
      "armor": 83.5
    },
    "extraStats": {
      "healthMax": 5.2,
      "defense": 5.2,
      "armor": 25.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 95
    }]
  },
  "cursed_plate_legs": {
    "id": "cursed_plate_legs",
    "icon": "cursedPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "cursed platelegs",
    "sellPrice": 3000,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4,
      "defense": 17.4,
      "armor": 83.5
    },
    "extraStats": {
      "healthMax": 5.2,
      "defense": 5.2,
      "armor": 25.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 95
    }]
  },
  "cursed_shield": {
    "id": "cursed_shield",
    "icon": "cursedShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "cursed shield",
    "sellPrice": 3000,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7,
      "defense": 51.1,
      "armor": 167.6
    },
    "extraStats": {
      "healthMax": 9.8,
      "defense": 15.3,
      "armor": 50.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 95
    }]
  }
};
