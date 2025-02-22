const ASTRAL_MULTIPLIER = 1.3;


export const ASTRAL_ITEMS = {
  "astral_dagger": {
    "id": "astral_dagger",
    "icon": "astralDagger.svg",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "astral dagger",
    "sellPrice": Math.round(1650 * ASTRAL_MULTIPLIER),
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17.4 * ASTRAL_MULTIPLIER,
      "attackMax": 32.7 * ASTRAL_MULTIPLIER,
      "attackSpeed": 1,
      "accuracy": 75.5 * ASTRAL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 110
    }]
  },
  "astral_spear": {
    "id": "astral_spear",
    "icon": "astralSpear.svg",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "astral spear",
    "sellPrice": Math.round(3000 * ASTRAL_MULTIPLIER),
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * ASTRAL_MULTIPLIER,
      "attackMax": 83.5 * ASTRAL_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 83.5 * ASTRAL_MULTIPLIER,
      "defense": 32.7 * ASTRAL_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * ASTRAL_MULTIPLIER,
      "attackMax": 25.1 * ASTRAL_MULTIPLIER,
      "accuracy": 25.1 * ASTRAL_MULTIPLIER,
      "defense": 9.8 * ASTRAL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 110
    }]
  },
  "astral_short_sword": {
    "id": "astral_short_sword",
    "icon": "astralShortSword.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "astral short sword",
    "sellPrice": Math.round(3000 * ASTRAL_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * ASTRAL_MULTIPLIER,
      "attackMax": 99.5 * ASTRAL_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * ASTRAL_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * ASTRAL_MULTIPLIER,
      "attackMax": 29.8 * ASTRAL_MULTIPLIER,
      "accuracy": 29.8 * ASTRAL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 110
    }]
  },
  "astral_long_sword": {
    "id": "astral_long_sword",
    "icon": "astralLongSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "astral long sword",
    "sellPrice": Math.round(3000 * ASTRAL_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 * ASTRAL_MULTIPLIER,
      "attackMax": 200.5 * ASTRAL_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * ASTRAL_MULTIPLIER
    },
    "extraStats": {
      "attack": 35 * ASTRAL_MULTIPLIER,
      "attackMax": 60.2 * ASTRAL_MULTIPLIER,
      "accuracy": 40.2 * ASTRAL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 110
    }]
  },
  
  "astral_battle_axe": {
    "id": "astral_battle_axe",
    "icon": "astralBattleAxe.svg",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "astral battle axe",
    "sellPrice": Math.round(3000 * ASTRAL_MULTIPLIER),
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 83.5 * ASTRAL_MULTIPLIER,
      "attackMax": 300 * ASTRAL_MULTIPLIER,
      "attackSpeed": 0.3,
      "accuracy": 134.1 * ASTRAL_MULTIPLIER,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 25.1 * ASTRAL_MULTIPLIER,
      "attackMax": 90 * ASTRAL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 110
    }]
  },

  "astral_helmet": {
    "id": "astral_helmet",
    "icon": "astralHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "astral helmet",
    "sellPrice": Math.round(3000 * ASTRAL_MULTIPLIER),
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * ASTRAL_MULTIPLIER,
      "defense": 17.4 * ASTRAL_MULTIPLIER,
      "armor": 83.5 * ASTRAL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * ASTRAL_MULTIPLIER,
      "defense": 5.2 * ASTRAL_MULTIPLIER,
      "armor": 25.1 * ASTRAL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 110
    }]
  },
  "astral_chest_plate": {
    "id": "astral_chest_plate",
    "icon": "astralChestPlate.svg",
    "category": "combat",
    "slot": "chest",
    "name": "astral chestplate",
    "sellPrice": Math.round(3000 * ASTRAL_MULTIPLIER),
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * ASTRAL_MULTIPLIER,
      "defense": 17.4 * ASTRAL_MULTIPLIER,
      "armor": 83.5 * ASTRAL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * ASTRAL_MULTIPLIER,
      "defense": 5.2 * ASTRAL_MULTIPLIER,
      "armor": 25.1 * ASTRAL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 110
    }]
  },
  "astral_plate_legs": {
    "id": "astral_plate_legs",
    "icon": "astralPlateLegs.svg",
    "category": "combat",
    "slot": "legs",
    "name": "astral platelegs",
    "sellPrice": Math.round(3000 * ASTRAL_MULTIPLIER),
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * ASTRAL_MULTIPLIER,
      "defense": 17.4 * ASTRAL_MULTIPLIER,
      "armor": 83.5 * ASTRAL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * ASTRAL_MULTIPLIER,
      "defense": 5.2 * ASTRAL_MULTIPLIER,
      "armor": 25.1 * ASTRAL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 110
    }]
  },
  "astral_shield": {
    "id": "astral_shield",
    "icon": "astralShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "astral shield",
    "sellPrice": Math.round(3000 * ASTRAL_MULTIPLIER),
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * ASTRAL_MULTIPLIER,
      "defense": 51.1 * ASTRAL_MULTIPLIER,
      "armor": 167.6 * ASTRAL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 9.8 * ASTRAL_MULTIPLIER,
      "defense": 15.3 * ASTRAL_MULTIPLIER,
      "armor": 50.3 * ASTRAL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 110
    }]
  }
}