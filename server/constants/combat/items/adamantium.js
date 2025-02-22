export const ADAMANTIUM_ITEMS = {
  "adamantium_dagger": {
    "id": "adamantium_dagger",
    "icon": "adamantiumDagger.svg",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "adamantium dagger",
    "sellPrice": 1050,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 10.7,
      "attackMax": 20.2,
      "attackSpeed": 1,
      "accuracy": 46.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 70
    }]
  },
  "adamantium_spear": {
    "id": "adamantium_spear",
    "icon": "adamantiumSpear.svg",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "adamantium spear",
    "sellPrice": 1800,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 41,
      "attackMax": 51.4,
      "attackSpeed": 0.5,
      "accuracy": 51.4,
      "defense": 20.2
    },
    "extraStats": {
      "attack": 12.3,
      "attackMax": 15.4,
      "accuracy": 15.4,
      "defense": 6.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 70
    }]
  },
  "adamantium_short_sword": {
    "id": "adamantium_short_sword",
    "icon": "adamantiumShortSword.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "adamantium short sword",
    "sellPrice": 1800,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 41,
      "attackMax": 61.3,
      "attackSpeed": 0.7,
      "accuracy": 61.3
    },
    "extraStats": {
      "attack": 12.3,
      "attackMax": 18.4,
      "accuracy": 18.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 70
    }]
  },
  "adamantium_scimitar": {
    "id": "adamantium_scimitar",
    "icon": "adamantiumScimitar.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "adamantium scimitar",
    "sellPrice": 1800,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 45.4,
      "attackMax": 71.8,
      "attackSpeed": 0.7,
      "accuracy": 61.3
    },
    "extraStats": {
      "attack": 13.6,
      "attackMax": 21.5,
      "accuracy": 18.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 75
    }]
  },
  "adamantium_long_sword": {
    "id": "adamantium_long_sword",
    "icon": "adamantiumLongSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "adamantium long sword",
    "sellPrice": 1800,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 71.8,
      "attackMax": 123.4,
      "attackSpeed": 0.5,
      "accuracy": 82.5
    },
    "extraStats": {
      "attack": 21.5,
      "attackMax": 37,
      "accuracy": 24.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 70
    }]
  },
  "adamantium_broad_sword": {
    "id": "adamantium_broad_sword",
    "icon": "adamantiumBroadSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "adamantium broad sword",
    "sellPrice": 1800,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 103.1,
      "attackMax": 144.1,
      "attackSpeed": 0.5,
      "accuracy": 82.5
    },
    "extraStats": {
      "attack": 30.9,
      "attackMax": 43.2,
      "accuracy": 24.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 75
    }]
  },
  "adamantium_battle_axe": {
    "id": "adamantium_battle_axe",
    "icon": "adamantiumBattleAxe.svg",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "adamantium battle axe",
    "sellPrice": 1800,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 51.4,
      "attackMax": 184.7,
      "attackSpeed": 0.3,
      "accuracy": 82.5,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 15.4,
      "attackMax": 55.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 70
    }]
  },
  "adamantium_horned_helmet": {
    "id": "adamantium_horned_helmet",
    "icon": "adamantiumHornedHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "adamantium horned helmet",
    "sellPrice": 1800,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 10.7,
      "attackMax": 10.7,
      "accuracy": 10.7
    },
    "extraStats": {
      "attack": 3.2,
      "attackMax": 3.2,
      "accuracy": 3.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 70
    }]
  },
  "adamantium_helmet": {
    "id": "adamantium_helmet",
    "icon": "adamantiumHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "adamantium helmet",
    "sellPrice": 1800,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 10.7,
      "defense": 10.7,
      "armor": 51.4
    },
    "extraStats": {
      "healthMax": 3.2,
      "defense": 3.2,
      "armor": 15.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 70
    }]
  },
  "adamantium_chest_plate": {
    "id": "adamantium_chest_plate",
    "icon": "adamantiumChestPlate.svg",
    "category": "combat",
    "slot": "chest",
    "name": "adamantium chestplate",
    "sellPrice": 1800,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 10.7,
      "defense": 10.7,
      "armor": 51.4
    },
    "extraStats": {
      "healthMax": 3.2,
      "defense": 3.2,
      "armor": 15.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 70
    }]
  },
  "adamantium_plate_legs": {
    "id": "adamantium_plate_legs",
    "icon": "adamantiumPlateLegs.svg",
    "category": "combat",
    "slot": "legs",
    "name": "adamantium platelegs",
    "sellPrice": 1800,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 10.7,
      "defense": 10.7,
      "armor": 51.4
    },
    "extraStats": {
      "healthMax": 3.2,
      "defense": 3.2,
      "armor": 15.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 70
    }]
  },
  "adamantium_shield": {
    "id": "adamantium_shield",
    "icon": "adamantiumShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "adamantium shield",
    "sellPrice": 1800,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 20.2,
      "defense": 31.5,
      "armor": 103.1
    },
    "extraStats": {
      "healthMax": 6.1,
      "defense": 9.5,
      "armor": 30.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 70
    }]
  }
}
