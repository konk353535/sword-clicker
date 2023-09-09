const PRISMATIC_MULTIPLIER = 1.75;
const PRISMATIC_DEFENSE_MULTIPLIER = 1.85;
const SHORTSWORD_TO_SCIMITAR_ATTACK_MIN = 1.105;
const SHORTSWORD_TO_SCIMITAR_ATTACK_MAX = 0.85;
const LONGSWORD_TO_BROADSWORD_ATTACK_MIN = 0.7;
const LONGSWORD_TO_BROADSWORD_ATTACK_MAX = 0.85;


export const PRISMATIC_ITEMS = {
  "prismatic_dagger": {
    "id": "prismatic_dagger",
    "icon": "prismaticDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "prismatic dagger",
    "sellPrice": Math.round(1650 * PRISMATIC_MULTIPLIER),
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17.4 * PRISMATIC_MULTIPLIER,
      "attackMax": 32.7 * PRISMATIC_MULTIPLIER,
      "attackSpeed": 1,
      "accuracy": 75.5 * PRISMATIC_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  
  "prismatic_spear": {
    "id": "prismatic_spear",
    "icon": "prismaticSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "prismatic spear",
    "sellPrice": Math.round(3000 * PRISMATIC_MULTIPLIER),
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * PRISMATIC_MULTIPLIER,
      "attackMax": 83.5 * PRISMATIC_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 83.5 * PRISMATIC_MULTIPLIER,
      "defense": 32.7 * PRISMATIC_MULTIPLIER,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER,
      "healthMax": 17.5 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * PRISMATIC_MULTIPLIER,
      "attackMax": 25.1 * PRISMATIC_MULTIPLIER,
      "accuracy": 25.1 * PRISMATIC_MULTIPLIER,
      "defense": 9.8 * PRISMATIC_MULTIPLIER,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER,
      "healthMax": 5.5 * PRISMATIC_MULTIPLIER
    },
    enchantments: ['prismatic_spear'],
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  },
  
  "prismatic_short_sword": {
    "id": "prismatic_short_sword",
    "icon": "prismaticShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "prismatic short sword",
    "sellPrice": Math.round(3000 * PRISMATIC_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * PRISMATIC_MULTIPLIER,
      "attackMax": 99.5 * PRISMATIC_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * PRISMATIC_MULTIPLIER,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER,
      "healthMax": 17.5 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * PRISMATIC_MULTIPLIER,
      "attackMax": 29.8 * PRISMATIC_MULTIPLIER,
      "accuracy": 29.8 * PRISMATIC_MULTIPLIER,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER,
      "healthMax": 5.5 * PRISMATIC_MULTIPLIER
    },
    enchantments: ['magic_blade'],
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  
  "prismatic_scimitar": {
    "id": "prismatic_scimitar",
    "icon": "prismaticScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "prismatic scimitar",
    "sellPrice": Math.round(3000 * PRISMATIC_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * SHORTSWORD_TO_SCIMITAR_ATTACK_MIN * PRISMATIC_MULTIPLIER,
      "attackMax": 99.5 / SHORTSWORD_TO_SCIMITAR_ATTACK_MAX * PRISMATIC_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * PRISMATIC_MULTIPLIER,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER,
      "healthMax": 17.5 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * SHORTSWORD_TO_SCIMITAR_ATTACK_MIN * PRISMATIC_MULTIPLIER,
      "attackMax": 29.8 / SHORTSWORD_TO_SCIMITAR_ATTACK_MAX * PRISMATIC_MULTIPLIER,
      "accuracy": 29.8 * PRISMATIC_MULTIPLIER,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER,
      "healthMax": 5.5 * PRISMATIC_MULTIPLIER
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
      level: 125
    }],
    reforgeRecipe: {
      requiresCrafting: 130
    },
  },
  
  "prismatic_long_sword": {
    "id": "prismatic_long_sword",
    "icon": "prismaticLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "prismatic long sword",
    "sellPrice": Math.round(3000 * PRISMATIC_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 * PRISMATIC_MULTIPLIER,
      "attackMax": 200.5 * PRISMATIC_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * PRISMATIC_MULTIPLIER,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER,
      "healthMax": 17.5 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "attack": 35 * PRISMATIC_MULTIPLIER,
      "attackMax": 60.2 * PRISMATIC_MULTIPLIER,
      "accuracy": 40.2 * PRISMATIC_MULTIPLIER,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER,
      "healthMax": 5.5 * PRISMATIC_MULTIPLIER
    },
    enchantments: ['prismatic_long_sword'],
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  
  "prismatic_broad_sword": {
    "id": "prismatic_broad_sword",
    "icon": "prismaticBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "prismatic broad sword",
    "sellPrice": Math.round(3000 * PRISMATIC_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 / LONGSWORD_TO_BROADSWORD_ATTACK_MIN * PRISMATIC_MULTIPLIER,
      "attackMax": 200.5 / LONGSWORD_TO_BROADSWORD_ATTACK_MAX * PRISMATIC_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * PRISMATIC_MULTIPLIER,
      "criticalChance": 10,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER,
      "healthMax": 17.5 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "attack": 35 / LONGSWORD_TO_BROADSWORD_ATTACK_MIN * PRISMATIC_MULTIPLIER,
      "attackMax": 60.2 / LONGSWORD_TO_BROADSWORD_ATTACK_MAX * PRISMATIC_MULTIPLIER,
      "accuracy": 40.2 * PRISMATIC_MULTIPLIER,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER,
      "healthMax": 5.5 * PRISMATIC_MULTIPLIER
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
      level: 125
    }],
    reforgeRecipe: {
      requiresCrafting: 130
    },
  },
  
  "prismatic_battle_axe": {
    "id": "prismatic_battle_axe",
    "icon": "prismaticBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "prismatic battle axe",
    "sellPrice": Math.round(3000 * PRISMATIC_MULTIPLIER),
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 83.5 * PRISMATIC_MULTIPLIER,
      "attackMax": 300 * PRISMATIC_MULTIPLIER,
      "attackSpeed": 0.3,
      "accuracy": 134.1 * PRISMATIC_MULTIPLIER,
      "criticalChance": 35,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER,
      "healthMax": 17.5 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "attack": 25.1 * PRISMATIC_MULTIPLIER,
      "attackMax": 90 * PRISMATIC_MULTIPLIER,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER,
      "healthMax": 5.5 * PRISMATIC_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    enchantments: ['axe_cleave__prismatic_battle_axe'],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  
  "prismatic_horned_helmet": {
    "id": "prismatic_horned_helmet",
    "icon": "horned_helmet_t27.png",
    "category": "combat",
    "slot": "head",
    "name": "prismatic horned helmet",
    "sellPrice": 12000,
    "description": "Now that's using your head!",
    "isEquippable": true,
    "stats": {
      "attack": 35,
      "attackMax": 35,
      "accuracy": 40,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER,
      "healthMax": 17.5 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "attack": 25,
      "attackMax": 25,
      "accuracy": 25,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER,
      "healthMax": 5.5 * PRISMATIC_MULTIPLIER
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
      level: 125
    }],
    reforgeRecipe: {
      requiresCrafting: 130
    },
  },

  "prismatic_helmet": {
    "id": "prismatic_helmet",
    "icon": "prismaticHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "prismatic helmet",
    "sellPrice": Math.round(3000 * PRISMATIC_MULTIPLIER),
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * PRISMATIC_MULTIPLIER,
      "defense": 17.4 * PRISMATIC_MULTIPLIER * PRISMATIC_DEFENSE_MULTIPLIER,
      "armor": 83.5 * PRISMATIC_MULTIPLIER,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * PRISMATIC_MULTIPLIER,
      "defense": 5.2 * PRISMATIC_MULTIPLIER * PRISMATIC_DEFENSE_MULTIPLIER,
      "armor": 25.1 * PRISMATIC_MULTIPLIER,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER
    },
    enchantments: ['prismatic_helmet'],
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  },
  
  "prismatic_chest_plate": {
    "id": "prismatic_chest_plate",
    "icon": "prismaticChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "prismatic chestplate",
    "sellPrice": Math.round(3000 * PRISMATIC_MULTIPLIER),
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * PRISMATIC_MULTIPLIER,
      "defense": 17.4 * PRISMATIC_MULTIPLIER * PRISMATIC_DEFENSE_MULTIPLIER,
      "armor": 83.5 * PRISMATIC_MULTIPLIER,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * PRISMATIC_MULTIPLIER,
      "defense": 5.2 * PRISMATIC_MULTIPLIER * PRISMATIC_DEFENSE_MULTIPLIER,
      "armor": 25.1 * PRISMATIC_MULTIPLIER,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER
    },
    enchantments: ['prismatic_chestplate'],
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  },
  
  "prismatic_plate_legs": {
    "id": "prismatic_plate_legs",
    "icon": "prismaticPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "prismatic platelegs",
    "sellPrice": Math.round(3000 * PRISMATIC_MULTIPLIER),
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * PRISMATIC_MULTIPLIER,
      "defense": 17.4 * PRISMATIC_MULTIPLIER * PRISMATIC_DEFENSE_MULTIPLIER,
      "armor": 83.5 * PRISMATIC_MULTIPLIER,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * PRISMATIC_MULTIPLIER,
      "defense": 5.2 * PRISMATIC_MULTIPLIER * PRISMATIC_DEFENSE_MULTIPLIER,
      "armor": 25.1 * PRISMATIC_MULTIPLIER,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER
    },
    enchantments: ['prismatic_plate_legs'],
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  },
  
  "prismatic_shield": {
    "id": "prismatic_shield",
    "icon": "prismaticShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "prismatic shield",
    "sellPrice": Math.round(3000 * PRISMATIC_MULTIPLIER),
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * PRISMATIC_MULTIPLIER,
      "defense": 51.1 * PRISMATIC_MULTIPLIER * PRISMATIC_DEFENSE_MULTIPLIER,
      "armor": 167.6 * PRISMATIC_MULTIPLIER,
      "magicArmor": 13.2 * PRISMATIC_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 9.8 * PRISMATIC_MULTIPLIER,
      "defense": 15.3 * PRISMATIC_MULTIPLIER * PRISMATIC_DEFENSE_MULTIPLIER,
      "armor": 50.3 * PRISMATIC_MULTIPLIER,
      "magicArmor": 4.5 * PRISMATIC_MULTIPLIER
    },
    enchantments: ['prismatic_shield'],
    upgradeRarity: [
      { chance: 10,  rarityId: 'crude', },    // 10% chance
      { chance: 30,  rarityId: 'rough', },    // 20% chance
      { chance: 40,  rarityId: 'improved', }, // 10% chance
                                              // 60% chance (for standard)
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  }
};
