export const FAIRY_STEEL_ITEMS = {
  "fairy_steel_dagger": {
    "id": "fairy_steel_dagger",
    "icon": "fairySteelDagger.svg",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "fairy steel dagger",
    "sellPrice": 1250,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 14.3,
      "attackMax": 26.8,
      "attackSpeed": 1,
      "accuracy": 61.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 85
    }]
  },
  "fairy_steel_spear": {
    "id": "fairy_steel_spear",
    "icon": "fairySteelSpear.svg",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "fairy steel spear",
    "sellPrice": 2250,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 54.6,
      "attackMax": 68.4,
      "attackSpeed": 0.5,
      "accuracy": 68.4,
      "defense": 26.8
    },
    "extraStats": {
      "attack": 16.4,
      "attackMax": 20.5,
      "accuracy": 20.5,
      "defense": 8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 85
    }]
  },
  "fairy_steel_short_sword": {
    "id": "fairy_steel_short_sword",
    "icon": "fairySteelShortSword.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "fairy steel short sword",
    "sellPrice": 2250,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 54.6,
      "attackMax": 81.5,
      "attackSpeed": 0.7,
      "accuracy": 81.5
    },
    "extraStats": {
      "attack": 16.4,
      "attackMax": 24.5,
      "accuracy": 24.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 85
    }]
  },
  "fairy_steel_scimitar": {
    "id": "fairy_steel_scimitar",
    "icon": "fairySteelScimitar.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "fairy steel scimitar",
    "sellPrice": 2250,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 60.4,
      "attackMax": 95.6,
      "attackSpeed": 0.7,
      "accuracy": 81.5
    },
    "extraStats": {
      "attack": 18.1,
      "attackMax": 28.7,
      "accuracy": 24.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 90
    }]
  },
  "fairy_steel_long_sword": {
    "id": "fairy_steel_long_sword",
    "icon": "fairySteelLongSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "fairy steel long sword",
    "sellPrice": 2250,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 95.6,
      "attackMax": 164.2,
      "attackSpeed": 0.5,
      "accuracy": 109.8
    },
    "extraStats": {
      "attack": 28.7,
      "attackMax": 49.3,
      "accuracy": 32.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 85
    }]
  },
  "fairy_steel_broad_sword": {
    "id": "fairy_steel_broad_sword",
    "icon": "fairySteelBroadSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "fairy steel broad sword",
    "sellPrice": 2250,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 137.3,
      "attackMax": 191.8,
      "attackSpeed": 0.5,
      "accuracy": 109.8
    },
    "extraStats": {
      "attack": 41.2,
      "attackMax": 57.5,
      "accuracy": 32.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 90
    }]
  },
  "fairy_steel_battle_axe": {
    "id": "fairy_steel_battle_axe",
    "icon": "fairySteelBattleAxe.svg",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "fairy steel battle axe",
    "sellPrice": 2250,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 68.4,
      "attackMax": 245.7,
      "attackSpeed": 0.3,
      "accuracy": 109.8,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 20.5,
      "attackMax": 73.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 85
    }]
  },
  "fairy_steel_horned_helmet": {
    "id": "fairy_steel_horned_helmet",
    "icon": "fairySteelHornedHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "fairy steel horned helmet",
    "sellPrice": 2250,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 14.3,
      "attackMax": 14.3,
      "accuracy": 14.3
    },
    "extraStats": {
      "attack": 4.3,
      "attackMax": 4.3,
      "accuracy": 4.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 85
    }]
  },
  "fairy_steel_helmet": {
    "id": "fairy_steel_helmet",
    "icon": "fairySteelHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "fairy steel helmet",
    "sellPrice": 2250,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 14.3,
      "defense": 14.3,
      "armor": 68.4
    },
    "extraStats": {
      "healthMax": 4.3,
      "defense": 4.3,
      "armor": 20.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 85
    }]
  },
  "fairy_steel_chest_plate": {
    "id": "fairy_steel_chest_plate",
    "icon": "fairySteelChestPlate.svg",
    "category": "combat",
    "slot": "chest",
    "name": "fairy steel chestplate",
    "sellPrice": 2250,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 14.3,
      "defense": 14.3,
      "armor": 68.4
    },
    "extraStats": {
      "healthMax": 4.3,
      "defense": 4.3,
      "armor": 20.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 85
    }]
  },
  "fairy_steel_plate_legs": {
    "id": "fairy_steel_plate_legs",
    "icon": "fairySteelPlateLegs.svg",
    "category": "combat",
    "slot": "legs",
    "name": "fairy steel platelegs",
    "sellPrice": 2250,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 14.3,
      "defense": 14.3,
      "armor": 68.4
    },
    "extraStats": {
      "healthMax": 4.3,
      "defense": 4.3,
      "armor": 20.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 85
    }]
  },
  "fairy_steel_shield": {
    "id": "fairy_steel_shield",
    "icon": "fairySteelShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "fairy steel shield",
    "sellPrice": 2250,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 26.8,
      "defense": 41.9,
      "armor": 137.3
    },
    "extraStats": {
      "healthMax": 8,
      "defense": 12.6,
      "armor": 41.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 85
    }]
  }
}
