const TITANFOIL_MULTIPLIER = 1.4;
const TITANFOIL_DEFENSE_MULTIPLIER = 1.3;
const SHORTSWORD_TO_SCIMITAR_ATTACK_MIN = 1.105;
const SHORTSWORD_TO_SCIMITAR_ATTACK_MAX = 0.85;
const LONGSWORD_TO_BROADSWORD_ATTACK_MIN = 0.7;
const LONGSWORD_TO_BROADSWORD_ATTACK_MAX = 0.85;


export const TITANFOIL_ITEMS = {
  "titanfoil_dagger": {
    "id": "titanfoil_dagger",
    "icon": "titanfoilDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "titanfoil dagger",
    "sellPrice": Math.round(1650 * TITANFOIL_MULTIPLIER),
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17.4 * TITANFOIL_MULTIPLIER,
      "attackMax": 32.7 * TITANFOIL_MULTIPLIER,
      "attackSpeed": 1,
      "accuracy": 75.5 * TITANFOIL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 115
    }]
  },
  "titanfoil_spear": {
    "id": "titanfoil_spear",
    "icon": "titanfoilSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "titanfoil spear",
    "sellPrice": Math.round(3000 * TITANFOIL_MULTIPLIER),
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * TITANFOIL_MULTIPLIER,
      "attackMax": 83.5 * TITANFOIL_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 83.5 * TITANFOIL_MULTIPLIER,
      "defense": 32.7 * TITANFOIL_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * TITANFOIL_MULTIPLIER,
      "attackMax": 25.1 * TITANFOIL_MULTIPLIER,
      "accuracy": 25.1 * TITANFOIL_MULTIPLIER,
      "defense": 9.8 * TITANFOIL_MULTIPLIER
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
      level: 115
    }]
  },
  "titanfoil_short_sword": {
    "id": "titanfoil_short_sword",
    "icon": "titanfoilShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "titanfoil short sword",
    "sellPrice": Math.round(3000 * TITANFOIL_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * TITANFOIL_MULTIPLIER,
      "attackMax": 99.5 * TITANFOIL_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * TITANFOIL_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * TITANFOIL_MULTIPLIER,
      "attackMax": 29.8 * TITANFOIL_MULTIPLIER,
      "accuracy": 29.8 * TITANFOIL_MULTIPLIER
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
      level: 115
    }]
  },
  "titanfoil_scimitar": {
    "id": "titanfoil_scimitar",
    "icon": "titanfoilScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "titanfoil scimitar",
    "sellPrice": Math.round(3000 * TITANFOIL_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * SHORTSWORD_TO_SCIMITAR_ATTACK_MIN * TITANFOIL_MULTIPLIER,
      "attackMax": 99.5 / SHORTSWORD_TO_SCIMITAR_ATTACK_MAX * TITANFOIL_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * TITANFOIL_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * SHORTSWORD_TO_SCIMITAR_ATTACK_MIN * TITANFOIL_MULTIPLIER,
      "attackMax": 29.8 / SHORTSWORD_TO_SCIMITAR_ATTACK_MAX * TITANFOIL_MULTIPLIER,
      "accuracy": 29.8 * TITANFOIL_MULTIPLIER
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
      level: 115
    }],
    reforgeRecipe: {
      requiresCrafting: 120
    },
  },
  "titanfoil_long_sword": {
    "id": "titanfoil_long_sword",
    "icon": "titanfoilLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "titanfoil long sword",
    "sellPrice": Math.round(3000 * TITANFOIL_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 * TITANFOIL_MULTIPLIER,
      "attackMax": 200.5 * TITANFOIL_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * TITANFOIL_MULTIPLIER
    },
    "extraStats": {
      "attack": 35 * TITANFOIL_MULTIPLIER,
      "attackMax": 60.2 * TITANFOIL_MULTIPLIER,
      "accuracy": 40.2 * TITANFOIL_MULTIPLIER
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
      level: 115
    }]
  },
  "titanfoil_broad_sword": {
    "id": "titanfoil_broad_sword",
    "icon": "titanfoilBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "titanfoil broad sword",
    "sellPrice": Math.round(3000 * TITANFOIL_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 / LONGSWORD_TO_BROADSWORD_ATTACK_MIN * TITANFOIL_MULTIPLIER,
      "attackMax": 200.5 / LONGSWORD_TO_BROADSWORD_ATTACK_MAX * TITANFOIL_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * TITANFOIL_MULTIPLIER,
      "criticalChance": 10,
    },
    "extraStats": {
      "attack": 35 / LONGSWORD_TO_BROADSWORD_ATTACK_MIN * TITANFOIL_MULTIPLIER,
      "attackMax": 60.2 / LONGSWORD_TO_BROADSWORD_ATTACK_MAX * TITANFOIL_MULTIPLIER,
      "accuracy": 40.2 * TITANFOIL_MULTIPLIER
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
      level: 115
    }],
    reforgeRecipe: {
      requiresCrafting: 120
    },
  },
  
  "titanfoil_battle_axe": {
    "id": "titanfoil_battle_axe",
    "icon": "titanfoilBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "titanfoil battle axe",
    "sellPrice": Math.round(3000 * TITANFOIL_MULTIPLIER),
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 83.5 * TITANFOIL_MULTIPLIER,
      "attackMax": 300 * TITANFOIL_MULTIPLIER,
      "attackSpeed": 0.3,
      "accuracy": 134.1 * TITANFOIL_MULTIPLIER,
      "criticalChance": 35
    },
    "extraStats": {
      "attack": 25.1 * TITANFOIL_MULTIPLIER,
      "attackMax": 90 * TITANFOIL_MULTIPLIER
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
      level: 115
    }]
  },
  
  "titanfoil_horned_helmet": {
    "id": "titanfoil_horned_helmet",
    "icon": "horned_helmet_t24.png",
    "category": "combat",
    "slot": "head",
    "name": "titanfoil horned helmet",
    "sellPrice": 7500,
    "description": "Now that's using your head!",
    "isEquippable": true,
    "stats": {
      "attack": 26.4,
      "attackMax": 26.4,
      "accuracy": 26.4
    },
    "extraStats": {
      "attack": 14.2,
      "attackMax": 14.2,
      "accuracy": 14.2
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
      level: 115
    }],
    reforgeRecipe: {
      requiresCrafting: 120
    },
  },

  "titanfoil_helmet": {
    "id": "titanfoil_helmet",
    "icon": "titanfoilHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "titanfoil helmet",
    "sellPrice": Math.round(3000 * TITANFOIL_MULTIPLIER),
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * TITANFOIL_MULTIPLIER,
      "defense": 17.4 * TITANFOIL_MULTIPLIER * TITANFOIL_DEFENSE_MULTIPLIER,
      "armor": 83.5 * TITANFOIL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * TITANFOIL_MULTIPLIER,
      "defense": 5.2 * TITANFOIL_MULTIPLIER * TITANFOIL_DEFENSE_MULTIPLIER,
      "armor": 25.1 * TITANFOIL_MULTIPLIER
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
      level: 115
    }]
  },
  "titanfoil_chest_plate": {
    "id": "titanfoil_chest_plate",
    "icon": "titanfoilChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "titanfoil chestplate",
    "sellPrice": Math.round(3000 * TITANFOIL_MULTIPLIER),
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * TITANFOIL_MULTIPLIER,
      "defense": 17.4 * TITANFOIL_MULTIPLIER * TITANFOIL_DEFENSE_MULTIPLIER,
      "armor": 83.5 * TITANFOIL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * TITANFOIL_MULTIPLIER,
      "defense": 5.2 * TITANFOIL_MULTIPLIER * TITANFOIL_DEFENSE_MULTIPLIER,
      "armor": 25.1 * TITANFOIL_MULTIPLIER
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
      level: 115
    }]
  },
  "titanfoil_plate_legs": {
    "id": "titanfoil_plate_legs",
    "icon": "titanfoilPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "titanfoil platelegs",
    "sellPrice": Math.round(3000 * TITANFOIL_MULTIPLIER),
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * TITANFOIL_MULTIPLIER,
      "defense": 17.4 * TITANFOIL_MULTIPLIER * TITANFOIL_DEFENSE_MULTIPLIER,
      "armor": 83.5 * TITANFOIL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * TITANFOIL_MULTIPLIER,
      "defense": 5.2 * TITANFOIL_MULTIPLIER * TITANFOIL_DEFENSE_MULTIPLIER,
      "armor": 25.1 * TITANFOIL_MULTIPLIER
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
      level: 115
    }]
  },
  "titanfoil_shield": {
    "id": "titanfoil_shield",
    "icon": "titanfoilShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "titanfoil shield",
    "sellPrice": Math.round(3000 * TITANFOIL_MULTIPLIER),
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * TITANFOIL_MULTIPLIER,
      "defense": 51.1 * TITANFOIL_MULTIPLIER * TITANFOIL_DEFENSE_MULTIPLIER,
      "armor": 167.6 * TITANFOIL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 9.8 * TITANFOIL_MULTIPLIER,
      "defense": 15.3 * TITANFOIL_MULTIPLIER * TITANFOIL_DEFENSE_MULTIPLIER,
      "armor": 50.3 * TITANFOIL_MULTIPLIER
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
      level: 115
    }]
  }
};
