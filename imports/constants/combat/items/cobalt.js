export const COBALT_ITEMS = {
  "cobalt_dagger": {
    "id": "cobalt_dagger",
    "icon": "cobaltDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "cobalt dagger",
    "sellPrice": 950,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 8.7,
      "attackMax": 16.6,
      "attackSpeed": 1,
      "accuracy": 38.1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },
  "cobalt_spear": {
    "id": "cobalt_spear",
    "icon": "cobaltSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "cobalt spear",
    "sellPrice": 1500,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 33.6,
      "attackMax": 42.1,
      "attackSpeed": 0.5,
      "accuracy": 42.1,
      "defense": 16.6
    },
    "extraStats": {
      "attack": 10.1,
      "attackMax": 12.6,
      "accuracy": 12.6,
      "defense": 5
    },
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 60
    }]
  },
  "cobalt_short_sword": {
    "id": "cobalt_short_sword",
    "icon": "cobaltShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "cobalt short sword",
    "sellPrice": 1500,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 33.6,
      "attackMax": 50.2,
      "attackSpeed": 0.7,
      "accuracy": 50.2
    },
    "extraStats": {
      "attack": 10.1,
      "attackMax": 15.1,
      "accuracy": 15.1
    },
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },
  "cobalt_scimitar": {
    "id": "cobalt_scimitar",
    "icon": "cobaltScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "cobalt scimitar",
    "sellPrice": 1500,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 37.2,
      "attackMax": 58.8,
      "attackSpeed": 0.7,
      "accuracy": 50.2
    },
    "extraStats": {
      "attack": 11.2,
      "attackMax": 17.6,
      "accuracy": 15.1
    },
    upgradeRarity: [
      { chance:  0.2072, rarityId: 'divine', },        //  0.2072% chance
      { chance:  0.768,  rarityId: 'epic', },          //  0.5608% chance
      { chance:  1.92,   rarityId: 'phenomenal', },    //  1.152%  chance
      { chance:  4.8,    rarityId: 'extraordinary', }, //  2.88%   chance
      { chance: 12,      rarityId: 'rare', },          //  7.2%    chance
      { chance: 30,      rarityId: 'fine', },          // 18%      chance
                                                       // 70%      chance (for uncommon)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 65
    }],
    reforgeRecipe: {
      requiresCrafting: 65
    },
  },
  "cobalt_long_sword": {
    "id": "cobalt_long_sword",
    "icon": "cobaltLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "cobalt long sword",
    "sellPrice": 1500,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 58.8,
      "attackMax": 101.1,
      "attackSpeed": 0.5,
      "accuracy": 67.6
    },
    "extraStats": {
      "attack": 17.6,
      "attackMax": 30.3,
      "accuracy": 20.3
    },
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },
  "cobalt_broad_sword": {
    "id": "cobalt_broad_sword",
    "icon": "cobaltBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "cobalt broad sword",
    "sellPrice": 1500,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 84.4,
      "attackMax": 118,
      "attackSpeed": 0.5,
      "accuracy": 67.6,
      "criticalChance": 10
    },
    "extraStats": {
      "attack": 25.3,
      "attackMax": 35.4,
      "accuracy": 20.3
    },
    upgradeRarity: [
      { chance:  0.2072, rarityId: 'divine', },        //  0.2072% chance
      { chance:  0.768,  rarityId: 'epic', },          //  0.5608% chance
      { chance:  1.92,   rarityId: 'phenomenal', },    //  1.152%  chance
      { chance:  4.8,    rarityId: 'extraordinary', }, //  2.88%   chance
      { chance: 12,      rarityId: 'rare', },          //  7.2%    chance
      { chance: 30,      rarityId: 'fine', },          // 18%      chance
                                                       // 70%      chance (for uncommon)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 65
    }],
    reforgeRecipe: {
      requiresCrafting: 65
    },
  },
  "cobalt_battle_axe": {
    "id": "cobalt_battle_axe",
    "icon": "cobaltBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "cobalt battle axe",
    "sellPrice": 1500,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 42.1,
      "attackMax": 151.3,
      "attackSpeed": 0.3,
      "accuracy": 67.6,
      "criticalChance": 35
    },
    "extraStats": {
      "attack": 12.6,
      "attackMax": 45.4
    },
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },
  "cobalt_horned_helmet": {
    "id": "cobalt_horned_helmet",
    "icon": "horned_helmet_t13.png",
    "category": "combat",
    "slot": "head",
    "name": "cobalt horned helmet",
    "sellPrice": 1500,
    "description": "Now that's using your head!",
    "isEquippable": true,
    "stats": {
      "attack": 8.7,
      "attackMax": 8.7,
      "accuracy": 8.7
    },
    "extraStats": {
      "attack": 2.6,
      "attackMax": 2.6,
      "accuracy": 2.6
    },
    upgradeRarity: [
      { chance:  0.2072, rarityId: 'divine', },        //  0.2072% chance
      { chance:  0.768,  rarityId: 'epic', },          //  0.5608% chance
      { chance:  1.92,   rarityId: 'phenomenal', },    //  1.152%  chance
      { chance:  4.8,    rarityId: 'extraordinary', }, //  2.88%   chance
      { chance: 12,      rarityId: 'rare', },          //  7.2%    chance
      { chance: 30,      rarityId: 'fine', },          // 18%      chance
                                                       // 70%      chance (for uncommon)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }],
    reforgeRecipe: {
      requiresCrafting: 65
    },
  },
  "cobalt_helmet": {
    "id": "cobalt_helmet",
    "icon": "cobaltHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "cobalt helmet",
    "sellPrice": 1500,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 8.7,
      "defense": 8.7,
      "armor": 42.1
    },
    "extraStats": {
      "healthMax": 2.6,
      "defense": 2.6,
      "armor": 12.6
    },
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 60
    }]
  },
  "cobalt_chest_plate": {
    "id": "cobalt_chest_plate",
    "icon": "cobaltChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "cobalt chestplate",
    "sellPrice": 1500,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 8.7,
      "defense": 8.7,
      "armor": 42.1
    },
    "extraStats": {
      "healthMax": 2.6,
      "defense": 2.6,
      "armor": 12.6
    },
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 60
    }]
  },
  "cobalt_plate_legs": {
    "id": "cobalt_plate_legs",
    "icon": "cobaltPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "cobalt platelegs",
    "sellPrice": 1500,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 8.7,
      "defense": 8.7,
      "armor": 42.1
    },
    "extraStats": {
      "healthMax": 2.6,
      "defense": 2.6,
      "armor": 12.6
    },
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 60
    }]
  },
  "cobalt_shield": {
    "id": "cobalt_shield",
    "icon": "cobaltShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "cobalt shield",
    "sellPrice": 1500,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 16.6,
      "defense": 25.8,
      "armor": 84.4
    },
    "extraStats": {
      "healthMax": 5,
      "defense": 7.7,
      "armor": 25.3
    },
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 60
    }]
  }
};
