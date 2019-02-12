export const MITHRIL_ITEMS = {
  "mithril_dagger": {
    "id": "mithril_dagger",
    "icon": "mithrilDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "mithril dagger",
    "sellPrice": 950,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 9.7,
      "attackMax": 18.4,
      "attackSpeed": 1,
      "accuracy": 42.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 65
    }]
  },
  "mithril_spear": {
    "id": "mithril_spear",
    "icon": "mithrilSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "mithril spear",
    "sellPrice": 1600,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 37.3,
      "attackMax": 46.7,
      "attackSpeed": 0.5,
      "accuracy": 46.7,
      "defense": 18.4
    },
    "extraStats": {
      "attack": 11.2,
      "attackMax": 14,
      "accuracy": 14,
      "defense": 5.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }]
  },
  "mithril_short_sword": {
    "id": "mithril_short_sword",
    "icon": "mithrilShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "mithril short sword",
    "sellPrice": 1600,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 37.3,
      "attackMax": 55.7,
      "attackSpeed": 0.7,
      "accuracy": 55.7
    },
    "extraStats": {
      "attack": 11.2,
      "attackMax": 16.7,
      "accuracy": 16.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 65
    }]
  },
  "mithril_scimitar": {
    "id": "mithril_scimitar",
    "icon": "mithrilScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "mithril scimitar",
    "sellPrice": 1600,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 41.3,
      "attackMax": 65.3,
      "attackSpeed": 0.7,
      "accuracy": 55.7
    },
    "extraStats": {
      "attack": 12.4,
      "attackMax": 19.6,
      "accuracy": 16.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 70
    }]
  },
  "mithril_long_sword": {
    "id": "mithril_long_sword",
    "icon": "mithrilLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "mithril long sword",
    "sellPrice": 1600,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 65.3,
      "attackMax": 112.2,
      "attackSpeed": 0.5,
      "accuracy": 75
    },
    "extraStats": {
      "attack": 19.6,
      "attackMax": 33.7,
      "accuracy": 22.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 65
    }]
  },
  "mithril_broad_sword": {
    "id": "mithril_broad_sword",
    "icon": "mithrilBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "mithril broad sword",
    "sellPrice": 1600,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 93.7,
      "attackMax": 131,
      "attackSpeed": 0.5,
      "accuracy": 75,
      "criticalChance": 10
    },
    "extraStats": {
      "attack": 28.1,
      "attackMax": 39.3,
      "accuracy": 22.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 70
    }]
  },
  "mithril_battle_axe": {
    "id": "mithril_battle_axe",
    "icon": "mithrilBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "mithril battle axe",
    "sellPrice": 1600,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 46.7,
      "attackMax": 167.9,
      "attackSpeed": 0.3,
      "accuracy": 75,
      "criticalChance": 35
    },
    "extraStats": {
      "attack": 14,
      "attackMax": 50.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 65
    }]
  },
  "mithril_horned_helmet": {
    "id": "mithril_horned_helmet",
    "icon": "horned_helmet_t14.png",
    "category": "combat",
    "slot": "head",
    "name": "mithril horned helmet",
    "sellPrice": 1600,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 9.7,
      "attackMax": 9.7,
      "accuracy": 9.7
    },
    "extraStats": {
      "attack": 2.9,
      "attackMax": 2.9,
      "accuracy": 2.9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }]
  },
  "mithril_helmet": {
    "id": "mithril_helmet",
    "icon": "mithrilHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "mithril helmet",
    "sellPrice": 1600,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 9.7,
      "defense": 9.7,
      "armor": 46.7
    },
    "extraStats": {
      "healthMax": 2.9,
      "defense": 2.9,
      "armor": 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }]
  },
  "mithril_chest_plate": {
    "id": "mithril_chest_plate",
    "icon": "mithrilChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "mithril Chestplate",
    "sellPrice": 1600,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 9.7,
      "defense": 9.7,
      "armor": 46.7
    },
    "extraStats": {
      "healthMax": 2.9,
      "defense": 2.9,
      "armor": 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }]
  },
  "mithril_plate_legs": {
    "id": "mithril_plate_legs",
    "icon": "mithrilPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "mithril platelegs",
    "sellPrice": 1600,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 9.7,
      "defense": 9.7,
      "armor": 46.7
    },
    "extraStats": {
      "healthMax": 2.9,
      "defense": 2.9,
      "armor": 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }]
  },
  "mithril_shield": {
    "id": "mithril_shield",
    "icon": "mithrilShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "mithril shield",
    "sellPrice": 1600,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 18.4,
      "defense": 28.6,
      "armor": 93.7
    },
    "extraStats": {
      "healthMax": 5.5,
      "defense": 8.6,
      "armor": 28.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }]
  }
};
