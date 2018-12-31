export const TITANIUM_ITEMS = {
  "titanium_dagger": {
    "id": "titanium_dagger",
    "icon": "titaniumDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "titanium dagger",
    "sellPrice": 850,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 6.2,
      "attackMax": 11.7,
      "attackSpeed": 1,
      "accuracy": 26.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },
  "titanium_spear": {
    "id": "titanium_spear",
    "icon": "titaniumSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "titanium spear",
    "sellPrice": 1000,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 23.7,
      "attackMax": 29.7,
      "attackSpeed": 0.5,
      "accuracy": 29.7,
      "defense": 11.7
    },
    "extraStats": {
      "attack": 7.1,
      "attackMax": 8.9,
      "accuracy": 8.9,
      "defense": 3.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  },
  "titanium_short_sword": {
    "id": "titanium_short_sword",
    "icon": "titaniumShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "titanium short sword",
    "sellPrice": 1000,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 23.7,
      "attackMax": 35.4,
      "attackSpeed": 0.7,
      "accuracy": 35.4
    },
    "extraStats": {
      "attack": 7.1,
      "attackMax": 10.6,
      "accuracy": 10.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },
  "titanium_scimitar": {
    "id": "titanium_scimitar",
    "icon": "titaniumScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "titanium scimitar",
    "sellPrice": 1000,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 26.2,
      "attackMax": 41.5,
      "attackSpeed": 0.7,
      "accuracy": 35.4
    },
    "extraStats": {
      "attack": 7.9,
      "attackMax": 12.5,
      "accuracy": 10.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }]
  },
  "titanium_long_sword": {
    "id": "titanium_long_sword",
    "icon": "titaniumLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "titanium long sword",
    "sellPrice": 1000,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 41.5,
      "attackMax": 71.3,
      "attackSpeed": 0.5,
      "accuracy": 47.7
    },
    "extraStats": {
      "attack": 12.5,
      "attackMax": 21.4,
      "accuracy": 14.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },
  "titanium_broad_sword": {
    "id": "titanium_broad_sword",
    "icon": "titaniumBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "titanium broad sword",
    "sellPrice": 1000,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 59.6,
      "attackMax": 83.3,
      "attackSpeed": 0.5,
      "accuracy": 47.7
    },
    "extraStats": {
      "attack": 17.9,
      "attackMax": 25,
      "accuracy": 14.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }]
  },
  "titanium_battle_axe": {
    "id": "titanium_battle_axe",
    "icon": "titaniumBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "titanium battle axe",
    "sellPrice": 1000,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 29.7,
      "attackMax": 106.7,
      "attackSpeed": 0.3,
      "accuracy": 47.7,
      "criticalChance": 25
    },
    "extraStats": {
      "attack": 8.9,
      "attackMax": 32
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },
  "titanium_horned_helmet": {
    "id": "titanium_horned_helmet",
    "icon": "horned_helmet_t10.png",
    "category": "combat",
    "slot": "head",
    "name": "titanium horned helmet",
    "sellPrice": 1000,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 6.2,
      "attackMax": 6.2,
      "accuracy": 6.2
    },
    "extraStats": {
      "attack": 1.9,
      "attackMax": 1.9,
      "accuracy": 1.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  },
  "titanium_helmet": {
    "id": "titanium_helmet",
    "icon": "titaniumHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "titanium helmet",
    "sellPrice": 1000,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 6.2,
      "defense": 6.2,
      "armor": 29.7
    },
    "extraStats": {
      "healthMax": 1.9,
      "defense": 1.9,
      "armor": 8.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  },
  "titanium_chest_plate": {
    "id": "titanium_chest_plate",
    "icon": "titaniumChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "titanium Chestplate",
    "sellPrice": 1000,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 6.2,
      "defense": 6.2,
      "armor": 29.7
    },
    "extraStats": {
      "healthMax": 1.9,
      "defense": 1.9,
      "armor": 8.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  },
  "titanium_plate_legs": {
    "id": "titanium_plate_legs",
    "icon": "titaniumPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "titanium platelegs",
    "sellPrice": 1000,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 6.2,
      "defense": 6.2,
      "armor": 29.7
    },
    "extraStats": {
      "healthMax": 1.9,
      "defense": 1.9,
      "armor": 8.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  },
  "titanium_shield": {
    "id": "titanium_shield",
    "icon": "titaniumShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "titanium shield",
    "sellPrice": 1000,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 11.7,
      "defense": 18.1,
      "armor": 59.6
    },
    "extraStats": {
      "healthMax": 3.5,
      "defense": 5.4,
      "armor": 17.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  }
};
