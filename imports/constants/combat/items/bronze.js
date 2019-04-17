export const BRONZE_ITEMS = {
  "bronze_dagger": {
    "id": "bronze_dagger",
    "icon": "bronzeDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "bronze dagger",
    "sellPrice": 100,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 1.8,
      "attackMax": 3.6,
      "attackSpeed": 1,
      "accuracy": 8.2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  },
  "bronze_spear": {
    "id": "bronze_spear",
    "icon": "bronzeSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "bronze spear",
    "sellPrice": 175,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 7.3,
      "attackMax": 9.1,
      "attackSpeed": 0.5,
      "accuracy": 9.1,
      "defense": 3.6
    },
    "extraStats": {
      "attack": 2.2,
      "attackMax": 2.7,
      "accuracy": 2.7,
      "defense": 1.1
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
      level: 10
    }]
  },
  "bronze_short_sword": {
    "id": "bronze_short_sword",
    "icon": "bronzeShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "bronze short sword",
    "sellPrice": 175,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 7.3,
      "attackMax": 10.9,
      "attackSpeed": 0.7,
      "accuracy": 10.9
    },
    "extraStats": {
      "attack": 2.2,
      "attackMax": 3.3,
      "accuracy": 3.3
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
      level: 10
    }]
  },
  "bronze_scimitar": {
    "id": "bronze_scimitar",
    "icon": "bronzeScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "bronze scimitar",
    "sellPrice": 175,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 8.1,
      "attackMax": 12.7,
      "attackSpeed": 0.7,
      "accuracy": 10.9
    },
    "extraStats": {
      "attack": 2.4,
      "attackMax": 3.8,
      "accuracy": 3.3
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
      level: 15
    }],
    reforgeRecipe: {
      requiresCrafting: 15
    },
  },
  "bronze_long_sword": {
    "id": "bronze_long_sword",
    "icon": "bronzeLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "bronze long sword",
    "sellPrice": 175,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 12.7,
      "attackMax": 21.8,
      "attackSpeed": 0.5,
      "accuracy": 14.6
    },
    "extraStats": {
      "attack": 3.8,
      "attackMax": 6.5,
      "accuracy": 4.4
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
      level: 10
    }]
  },
  "bronze_broad_sword": {
    "id": "bronze_broad_sword",
    "icon": "bronzeBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "bronze broad sword",
    "sellPrice": 175,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 18.2,
      "attackMax": 25.5,
      "attackSpeed": 0.5,
      "accuracy": 14.6,
      "criticalChance": 10
    },
    "extraStats": {
      "attack": 5.5,
      "attackMax": 7.6,
      "accuracy": 4.4
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
      level: 15
    }],
    reforgeRecipe: {
      requiresCrafting: 15
    },
  },
  "bronze_battle_axe": {
    "id": "bronze_battle_axe",
    "icon": "bronzeBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "bronze battle axe",
    "sellPrice": 175,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 9.1,
      "attackMax": 32.8,
      "attackSpeed": 0.3,
      "accuracy": 14.6,
      "criticalChance": 35
    },
    "extraStats": {
      "attack": 2.7,
      "attackMax": 9.8
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
      level: 10
    }]
  },
  "bronze_horned_helmet": {
    "id": "bronze_horned_helmet",
    "icon": "horned_helmet_t3.png",
    "category": "combat",
    "slot": "head",
    "name": "bronze horned helmet",
    "sellPrice": 175,
    "description": "Now that's using your head!",
    "isEquippable": true,
    "stats": {
      "attack": 1.8,
      "attackMax": 1.8,
      "accuracy": 1.8
    },
    "extraStats": {
      "attack": 0.5,
      "attackMax": 0.5,
      "accuracy": 0.5
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
      level: 10
    }],
    reforgeRecipe: {
      requiresCrafting: 15
    },
  },
  "bronze_helmet": {
    "id": "bronze_helmet",
    "icon": "bronzeHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "bronze helmet",
    "sellPrice": 175,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 1.8,
      "defense": 1.8,
      "armor": 9.1
    },
    "extraStats": {
      "healthMax": 0.5,
      "defense": 0.5,
      "armor": 2.7
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
      level: 10
    }]
  },
  "bronze_chest_plate": {
    "id": "bronze_chest_plate",
    "icon": "bronzeChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "bronze Chestplate",
    "sellPrice": 175,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 1.8,
      "defense": 1.8,
      "armor": 9.1
    },
    "extraStats": {
      "healthMax": 0.5,
      "defense": 0.5,
      "armor": 2.7
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
      level: 10
    }]
  },
  "bronze_plate_legs": {
    "id": "bronze_plate_legs",
    "icon": "bronzePlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "bronze platelegs",
    "sellPrice": 175,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 1.8,
      "defense": 1.8,
      "armor": 9.1
    },
    "extraStats": {
      "healthMax": 0.5,
      "defense": 0.5,
      "armor": 2.7
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
      level: 10
    }]
  },
  "bronze_shield": {
    "id": "bronze_shield",
    "icon": "bronzeShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "bronze shield",
    "sellPrice": 175,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 3.6,
      "defense": 5.5,
      "armor": 18.2
    },
    "extraStats": {
      "healthMax": 1.1,
      "defense": 1.7,
      "armor": 5.5
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
      level: 10
    }]
  }
};
