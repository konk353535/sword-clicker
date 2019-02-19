export const OBSIDIAN_ITEMS = {
  "obsidian_dagger": {
    "id": "obsidian_dagger",
    "icon": "obsidianDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "obsidian dagger",
    "sellPrice": 950,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 7.8,
      "attackMax": 14.8,
      "attackSpeed": 1,
      "accuracy": 34
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 55
    }]
  },
  "obsidian_spear": {
    "id": "obsidian_spear",
    "icon": "obsidianSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "obsidian spear",
    "sellPrice": 1350,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 30,
      "attackMax": 37.6,
      "attackSpeed": 0.5,
      "accuracy": 37.6,
      "defense": 14.8
    },
    "extraStats": {
      "attack": 9,
      "attackMax": 11.3,
      "accuracy": 11.3,
      "defense": 4.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 55
    }]
  },
  "obsidian_short_sword": {
    "id": "obsidian_short_sword",
    "icon": "obsidianShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "obsidian short sword",
    "sellPrice": 1350,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 30,
      "attackMax": 44.8,
      "attackSpeed": 0.7,
      "accuracy": 44.8
    },
    "extraStats": {
      "attack": 9,
      "attackMax": 13.4,
      "accuracy": 13.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 55
    }]
  },
  "obsidian_scimitar": {
    "id": "obsidian_scimitar",
    "icon": "obsidianScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "obsidian scimitar",
    "sellPrice": 1350,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 33.2,
      "attackMax": 52.5,
      "attackSpeed": 0.7,
      "accuracy": 44.8
    },
    "extraStats": {
      "attack": 10,
      "attackMax": 15.8,
      "accuracy": 13.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },
  "obsidian_long_sword": {
    "id": "obsidian_long_sword",
    "icon": "obsidianLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "obsidian long sword",
    "sellPrice": 1350,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 52.5,
      "attackMax": 90.3,
      "attackSpeed": 0.5,
      "accuracy": 60.4
    },
    "extraStats": {
      "attack": 15.8,
      "attackMax": 27.1,
      "accuracy": 18.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 55
    }]
  },
  "obsidian_broad_sword": {
    "id": "obsidian_broad_sword",
    "icon": "obsidianBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "obsidian broad sword",
    "sellPrice": 1350,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 75.4,
      "attackMax": 105.4,
      "attackSpeed": 0.5,
      "accuracy": 60.4,
      "criticalChance": 10
    },
    "extraStats": {
      "attack": 22.6,
      "attackMax": 31.6,
      "accuracy": 18.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },
  "obsidian_battle_axe": {
    "id": "obsidian_battle_axe",
    "icon": "obsidianBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "obsidian battle axe",
    "sellPrice": 1350,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 37.6,
      "attackMax": 135.1,
      "attackSpeed": 0.3,
      "accuracy": 60.4,
      "criticalChance": 35
    },
    "extraStats": {
      "attack": 11.3,
      "attackMax": 40.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 55
    }]
  },
  "obsidian_horned_helmet": {
    "id": "obsidian_horned_helmet",
    "icon": "horned_helmet_t12.png",
    "category": "combat",
    "slot": "head",
    "name": "obsidian horned helmet",
    "sellPrice": 1350,
    "description": "Now that's using your head!",
    "isEquippable": true,
    "stats": {
      "attack": 7.8,
      "attackMax": 7.8,
      "accuracy": 7.8
    },
    "extraStats": {
      "attack": 2.3,
      "attackMax": 2.3,
      "accuracy": 2.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 55
    }]
  },
  "obsidian_helmet": {
    "id": "obsidian_helmet",
    "icon": "obsidianHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "obsidian helmet",
    "sellPrice": 1350,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 7.8,
      "defense": 7.8,
      "armor": 37.6
    },
    "extraStats": {
      "healthMax": 2.3,
      "defense": 2.3,
      "armor": 11.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 55
    }]
  },
  "obsidian_chest_plate": {
    "id": "obsidian_chest_plate",
    "icon": "obsidianChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "obsidian Chestplate",
    "sellPrice": 1350,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 7.8,
      "defense": 7.8,
      "armor": 37.6
    },
    "extraStats": {
      "healthMax": 2.3,
      "defense": 2.3,
      "armor": 11.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 55
    }]
  },
  "obsidian_plate_legs": {
    "id": "obsidian_plate_legs",
    "icon": "obsidianPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "obsidian platelegs",
    "sellPrice": 1350,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 7.8,
      "defense": 7.8,
      "armor": 37.6
    },
    "extraStats": {
      "healthMax": 2.3,
      "defense": 2.3,
      "armor": 11.3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 55
    }]
  },
  "obsidian_shield": {
    "id": "obsidian_shield",
    "icon": "obsidianShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "obsidian shield",
    "sellPrice": 1350,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 14.8,
      "defense": 23,
      "armor": 75.4
    },
    "extraStats": {
      "healthMax": 4.4,
      "defense": 6.9,
      "armor": 22.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 55
    }]
  }
};
