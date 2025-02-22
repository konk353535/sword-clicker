export const GOLD_ITEMS = {
  "gold_dagger": {
    "id": "gold_dagger",
    "icon": "goldDagger.svg",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "gold dagger",
    "sellPrice": 350,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 3.4,
      "attackMax": 6.5,
      "attackSpeed": 1,
      "accuracy": 14.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },
  "gold_spear": {
    "id": "gold_spear",
    "icon": "goldSpear.svg",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "gold spear",
    "sellPrice": 500,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 13.1,
      "attackMax": 16.4,
      "attackSpeed": 0.5,
      "accuracy": 16.4,
      "defense": 6.5
    },
    "extraStats": {
      "attack": 3.9,
      "attackMax": 4.9,
      "accuracy": 4.9,
      "defense": 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },
  "gold_short_sword": {
    "id": "gold_short_sword",
    "icon": "goldShortSword.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "gold short sword",
    "sellPrice": 500,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 13.1,
      "attackMax": 19.6,
      "attackSpeed": 0.7,
      "accuracy": 19.6
    },
    "extraStats": {
      "attack": 3.9,
      "attackMax": 5.9,
      "accuracy": 5.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },
  "gold_scimitar": {
    "id": "gold_scimitar",
    "icon": "goldScimitar.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "gold scimitar",
    "sellPrice": 500,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 14.5,
      "attackMax": 22.9,
      "attackSpeed": 0.7,
      "accuracy": 19.6
    },
    "extraStats": {
      "attack": 4.4,
      "attackMax": 6.9,
      "accuracy": 5.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },
  "gold_long_sword": {
    "id": "gold_long_sword",
    "icon": "goldLongSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "gold long sword",
    "sellPrice": 500,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 22.9,
      "attackMax": 39.4,
      "attackSpeed": 0.5,
      "accuracy": 26.4
    },
    "extraStats": {
      "attack": 6.9,
      "attackMax": 11.8,
      "accuracy": 7.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },
  "gold_broad_sword": {
    "id": "gold_broad_sword",
    "icon": "goldBroadSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "gold broad sword",
    "sellPrice": 500,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 32.9,
      "attackMax": 46,
      "attackSpeed": 0.5,
      "accuracy": 26.4
    },
    "extraStats": {
      "attack": 9.9,
      "attackMax": 13.8,
      "accuracy": 7.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },
  "gold_battle_axe": {
    "id": "gold_battle_axe",
    "icon": "goldBattleAxe.svg",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "gold battle axe",
    "sellPrice": 500,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 16.4,
      "attackMax": 59,
      "attackSpeed": 0.3,
      "accuracy": 26.4,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 4.9,
      "attackMax": 17.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },
  "gold_horned_helmet": {
    "id": "gold_horned_helmet",
    "icon": "goldHornedHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "gold horned helmet",
    "sellPrice": 500,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 3.4,
      "attackMax": 3.4,
      "accuracy": 3.4
    },
    "extraStats": {
      "attack": 1,
      "attackMax": 1,
      "accuracy": 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },
  "gold_helmet": {
    "id": "gold_helmet",
    "icon": "goldHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "gold helmet",
    "sellPrice": 500,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 3.4,
      "defense": 3.4,
      "armor": 16.4
    },
    "extraStats": {
      "healthMax": 1,
      "defense": 1,
      "armor": 4.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },
  "gold_chest_plate": {
    "id": "gold_chest_plate",
    "icon": "goldChestPlate.svg",
    "category": "combat",
    "slot": "chest",
    "name": "gold chestplate",
    "sellPrice": 500,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 3.4,
      "defense": 3.4,
      "armor": 16.4
    },
    "extraStats": {
      "healthMax": 1,
      "defense": 1,
      "armor": 4.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },
  "gold_plate_legs": {
    "id": "gold_plate_legs",
    "icon": "goldPlateLegs.svg",
    "category": "combat",
    "slot": "legs",
    "name": "gold platelegs",
    "sellPrice": 500,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 3.4,
      "defense": 3.4,
      "armor": 16.4
    },
    "extraStats": {
      "healthMax": 1,
      "defense": 1,
      "armor": 4.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },
  "gold_shield": {
    "id": "gold_shield",
    "icon": "goldShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "gold shield",
    "sellPrice": 500,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 6.5,
      "defense": 10,
      "armor": 32.9
    },
    "extraStats": {
      "healthMax": 2,
      "defense": 3,
      "armor": 9.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  }
}
