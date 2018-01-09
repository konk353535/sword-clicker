const DARKSTEEL_MULTIPLIER = 1.1;


export const DARKSTEEL_ITEMS = {
  "darksteel_dagger": {
    "id": "darksteel_dagger",
    "icon": "darksteelDagger.svg",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "darksteel dagger",
    "sellPrice": Math.round(1650 * DARKSTEEL_MULTIPLIER),
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": (17.4 * DARKSTEEL_MULTIPLIER).toFixed(1),
      "attackMax": 32.7 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackSpeed": 1,
      "accuracy": 75.5 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  "darksteel_spear": {
    "id": "darksteel_spear",
    "icon": "darksteelSpear.svg",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "darksteel spear",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackMax": 83.5 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackSpeed": 0.5,
      "accuracy": 83.5 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "defense": 32.7 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    "extraStats": {
      "attack": 20 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackMax": 25.1 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "accuracy": 25.1 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "defense": 9.8 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 100
    }]
  },
  "darksteel_short_sword": {
    "id": "darksteel_short_sword",
    "icon": "darksteelShortSword.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "darksteel short sword",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackMax": 99.5 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackSpeed": 0.7,
      "accuracy": 99.5 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    "extraStats": {
      "attack": 20 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackMax": 29.8 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "accuracy": 29.8 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  "darksteel_long_sword": {
    "id": "darksteel_long_sword",
    "icon": "darksteelLongSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "darksteel long sword",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackMax": 200.5 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackSpeed": 0.5,
      "accuracy": 134.1 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    "extraStats": {
      "attack": 35 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackMax": 60.2 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "accuracy": 40.2 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  
  "darksteel_battle_axe": {
    "id": "darksteel_battle_axe",
    "icon": "darksteelBattleAxe.svg",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "darksteel battle axe",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 83.5 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackMax": 300 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackSpeed": 0.3,
      "accuracy": 134.1 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 25.1 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "attackMax": 90 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },

  "darksteel_helmet": {
    "id": "darksteel_helmet",
    "icon": "darksteelHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "darksteel helmet",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "defense": 17.4 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "armor": 83.5 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    "extraStats": {
      "healthMax": 5.2 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "defense": 5.2 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "armor": 25.1 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 100
    }]
  },
  "darksteel_chest_plate": {
    "id": "darksteel_chest_plate",
    "icon": "darksteelChestPlate.svg",
    "category": "combat",
    "slot": "chest",
    "name": "darksteel chestplate",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "defense": 17.4 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "armor": 83.5 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    "extraStats": {
      "healthMax": 5.2 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "defense": 5.2 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "armor": 25.1 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 100
    }]
  },
  "darksteel_plate_legs": {
    "id": "darksteel_plate_legs",
    "icon": "darksteelPlateLegs.svg",
    "category": "combat",
    "slot": "legs",
    "name": "darksteel platelegs",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "defense": 17.4 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "armor": 83.5 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    "extraStats": {
      "healthMax": 5.2 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "defense": 5.2 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "armor": 25.1 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 100
    }]
  },
  "darksteel_shield": {
    "id": "darksteel_shield",
    "icon": "darksteelShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "darksteel shield",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "defense": 51.1 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "armor": 167.6 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    "extraStats": {
      "healthMax": 9.8 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "defense": 15.3 * DARKSTEEL_MULTIPLIER.toFixed(1),
      "armor": 50.3 * DARKSTEEL_MULTIPLIER.toFixed(1)
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 100
    }]
  }
}
