export const STEEL_ITEMS = {
  "steel_dagger": {
    "id": "steel_dagger",
    "icon": "steelDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "steel dagger",
    "sellPrice": 550,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 4.5,
      "attackMax": 8.6,
      "attackSpeed": 1,
      "accuracy": 19.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },
  "steel_spear": {
    "id": "steel_spear",
    "icon": "steelSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "steel spear",
    "sellPrice": 750,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17.3,
      "attackMax": 21.7,
      "attackSpeed": 0.5,
      "accuracy": 21.7,
      "defense": 8.6
    },
    "extraStats": {
      "attack": 5.2,
      "attackMax": 6.5,
      "accuracy": 6.5,
      "defense": 2.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },
  "steel_short_sword": {
    "id": "steel_short_sword",
    "icon": "steelShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "steel short sword",
    "sellPrice": 750,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17.3,
      "attackMax": 25.9,
      "attackSpeed": 0.7,
      "accuracy": 25.9
    },
    "extraStats": {
      "attack": 5.2,
      "attackMax": 7.8,
      "accuracy": 7.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },
  "steel_scimitar": {
    "id": "steel_scimitar",
    "icon": "steelScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "steel scimitar",
    "sellPrice": 750,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 19.2,
      "attackMax": 30.3,
      "attackSpeed": 0.7,
      "accuracy": 25.9
    },
    "extraStats": {
      "attack": 5.8,
      "attackMax": 9.1,
      "accuracy": 7.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },
  "steel_long_sword": {
    "id": "steel_long_sword",
    "icon": "steelLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "steel long sword",
    "sellPrice": 750,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 30.3,
      "attackMax": 52.1,
      "attackSpeed": 0.5,
      "accuracy": 34.9
    },
    "extraStats": {
      "attack": 9.1,
      "attackMax": 15.6,
      "accuracy": 10.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },
  "steel_broad_sword": {
    "id": "steel_broad_sword",
    "icon": "steelBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "steel broad sword",
    "sellPrice": 750,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 43.5,
      "attackMax": 60.8,
      "attackSpeed": 0.5,
      "accuracy": 34.9
    },
    "extraStats": {
      "attack": 13,
      "attackMax": 18.2,
      "accuracy": 10.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },
  "steel_battle_axe": {
    "id": "steel_battle_axe",
    "icon": "steelBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "steel battle axe",
    "sellPrice": 750,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 21.7,
      "attackMax": 78,
      "attackSpeed": 0.3,
      "accuracy": 34.9,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 6.5,
      "attackMax": 23.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },
  "steel_horned_helmet": {
    "id": "steel_horned_helmet",
    "icon": "horned_helmet_t8.png",
    "category": "combat",
    "slot": "head",
    "name": "steel horned helmet",
    "sellPrice": 750,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 4.5,
      "attackMax": 4.5,
      "accuracy": 4.5
    },
    "extraStats": {
      "attack": 1.3,
      "attackMax": 1.3,
      "accuracy": 1.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },
  "steel_helmet": {
    "id": "steel_helmet",
    "icon": "steelHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "steel helmet",
    "sellPrice": 750,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 4.5,
      "defense": 4.5,
      "armor": 21.7
    },
    "extraStats": {
      "healthMax": 1.3,
      "defense": 1.3,
      "armor": 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },
  "steel_chest_plate": {
    "id": "steel_chest_plate",
    "icon": "steelChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "steel Chestplate",
    "sellPrice": 750,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 4.5,
      "defense": 4.5,
      "armor": 21.7
    },
    "extraStats": {
      "healthMax": 1.3,
      "defense": 1.3,
      "armor": 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },
  "steel_plate_legs": {
    "id": "steel_plate_legs",
    "icon": "steelPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "steel platelegs",
    "sellPrice": 750,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 4.5,
      "defense": 4.5,
      "armor": 21.7
    },
    "extraStats": {
      "healthMax": 1.3,
      "defense": 1.3,
      "armor": 6.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },
  "steel_shield": {
    "id": "steel_shield",
    "icon": "steelShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "steel shield",
    "sellPrice": 750,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 8.6,
      "defense": 13.2,
      "armor": 43.5
    },
    "extraStats": {
      "healthMax": 2.6,
      "defense": 4,
      "armor": 13
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  }
};
