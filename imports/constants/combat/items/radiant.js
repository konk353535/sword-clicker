const RADIANT_MULTIPLIER = 1.2;


export const RADIANT_ITEMS = {
  "radiant_dagger": {
    "id": "radiant_dagger",
    "icon": "radiantDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "radiant dagger",
    "sellPrice": Math.round(1650 * RADIANT_MULTIPLIER),
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17.4 * RADIANT_MULTIPLIER,
      "attackMax": 32.7 * RADIANT_MULTIPLIER,
      "attackSpeed": 1,
      "accuracy": 75.5 * RADIANT_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 105
    }]
  },
  "radiant_spear": {
    "id": "radiant_spear",
    "icon": "radiantSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "radiant spear",
    "sellPrice": Math.round(3000 * RADIANT_MULTIPLIER),
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * RADIANT_MULTIPLIER,
      "attackMax": 83.5 * RADIANT_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 83.5 * RADIANT_MULTIPLIER,
      "defense": 32.7 * RADIANT_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * RADIANT_MULTIPLIER,
      "attackMax": 25.1 * RADIANT_MULTIPLIER,
      "accuracy": 25.1 * RADIANT_MULTIPLIER,
      "defense": 9.8 * RADIANT_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 105
    }]
  },
  "radiant_short_sword": {
    "id": "radiant_short_sword",
    "icon": "radiantShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "radiant short sword",
    "sellPrice": Math.round(3000 * RADIANT_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * RADIANT_MULTIPLIER,
      "attackMax": 99.5 * RADIANT_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * RADIANT_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * RADIANT_MULTIPLIER,
      "attackMax": 29.8 * RADIANT_MULTIPLIER,
      "accuracy": 29.8 * RADIANT_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 105
    }]
  },
  "radiant_long_sword": {
    "id": "radiant_long_sword",
    "icon": "radiantLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "radiant long sword",
    "sellPrice": Math.round(3000 * RADIANT_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 * RADIANT_MULTIPLIER,
      "attackMax": 200.5 * RADIANT_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * RADIANT_MULTIPLIER
    },
    "extraStats": {
      "attack": 35 * RADIANT_MULTIPLIER,
      "attackMax": 60.2 * RADIANT_MULTIPLIER,
      "accuracy": 40.2 * RADIANT_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 105
    }]
  },
  
  "radiant_battle_axe": {
    "id": "radiant_battle_axe",
    "icon": "radiantBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "radiant battle axe",
    "sellPrice": Math.round(3000 * RADIANT_MULTIPLIER),
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 83.5 * RADIANT_MULTIPLIER,
      "attackMax": 300 * RADIANT_MULTIPLIER,
      "attackSpeed": 0.3,
      "accuracy": 134.1 * RADIANT_MULTIPLIER,
      "criticalChance": 25
    },
    "extraStats": {
      "attack": 25.1 * RADIANT_MULTIPLIER,
      "attackMax": 90 * RADIANT_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 105
    }]
  },
  
  "radiant_horned_helmet": {
    "id": "radiant_horned_helmet",
    "icon": "horned_helmet_t22.png",
    "category": "combat",
    "slot": "head",
    "name": "radiant horned helmet",
    "sellPrice": 5000,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 21.4,
      "attackMax": 21.4,
      "accuracy": 21.4
    },
    "extraStats": {
      "attack": 9.2,
      "attackMax": 9.2,
      "accuracy": 9.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 105
    }]
  },

  "radiant_helmet": {
    "id": "radiant_helmet",
    "icon": "radiantHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "radiant helmet",
    "sellPrice": Math.round(3000 * RADIANT_MULTIPLIER),
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * RADIANT_MULTIPLIER,
      "defense": 17.4 * RADIANT_MULTIPLIER,
      "armor": 83.5 * RADIANT_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * RADIANT_MULTIPLIER,
      "defense": 5.2 * RADIANT_MULTIPLIER,
      "armor": 25.1 * RADIANT_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 105
    }]
  },
  "radiant_chest_plate": {
    "id": "radiant_chest_plate",
    "icon": "radiantChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "radiant Chestplate",
    "sellPrice": Math.round(3000 * RADIANT_MULTIPLIER),
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * RADIANT_MULTIPLIER,
      "defense": 17.4 * RADIANT_MULTIPLIER,
      "armor": 83.5 * RADIANT_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * RADIANT_MULTIPLIER,
      "defense": 5.2 * RADIANT_MULTIPLIER,
      "armor": 25.1 * RADIANT_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 105
    }]
  },
  "radiant_plate_legs": {
    "id": "radiant_plate_legs",
    "icon": "radiantPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "radiant platelegs",
    "sellPrice": Math.round(3000 * RADIANT_MULTIPLIER),
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * RADIANT_MULTIPLIER,
      "defense": 17.4 * RADIANT_MULTIPLIER,
      "armor": 83.5 * RADIANT_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * RADIANT_MULTIPLIER,
      "defense": 5.2 * RADIANT_MULTIPLIER,
      "armor": 25.1 * RADIANT_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 105
    }]
  },
  "radiant_shield": {
    "id": "radiant_shield",
    "icon": "radiantShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "radiant shield",
    "sellPrice": Math.round(3000 * RADIANT_MULTIPLIER),
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * RADIANT_MULTIPLIER,
      "defense": 51.1 * RADIANT_MULTIPLIER,
      "armor": 167.6 * RADIANT_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 9.8 * RADIANT_MULTIPLIER,
      "defense": 15.3 * RADIANT_MULTIPLIER,
      "armor": 50.3 * RADIANT_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 105
    }]
  }
};
