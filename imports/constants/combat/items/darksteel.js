const DARKSTEEL_MULTIPLIER = 1.1;
const SHORTSWORD_TO_SCIMITAR_ATTACK_MIN = 1.105;
const SHORTSWORD_TO_SCIMITAR_ATTACK_MAX = 0.85;
const LONGSWORD_TO_BROADSWORD_ATTACK_MIN = 0.7;
const LONGSWORD_TO_BROADSWORD_ATTACK_MAX = 0.85;

export const DARKSTEEL_ITEMS = {
  "darksteel_dagger": {
    "id": "darksteel_dagger",
    "icon": "darksteelDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "darksteel dagger",
    "sellPrice": Math.round(1650 * DARKSTEEL_MULTIPLIER),
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17.4 * DARKSTEEL_MULTIPLIER,
      "attackMax": 32.7 * DARKSTEEL_MULTIPLIER,
      "attackSpeed": 1,
      "accuracy": 75.5 * DARKSTEEL_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  "darksteel_spear": {
    "id": "darksteel_spear",
    "icon": "darksteelSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "darksteel spear",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * DARKSTEEL_MULTIPLIER,
      "attackMax": 83.5 * DARKSTEEL_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 83.5 * DARKSTEEL_MULTIPLIER,
      "defense": 32.7 * DARKSTEEL_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * DARKSTEEL_MULTIPLIER,
      "attackMax": 25.1 * DARKSTEEL_MULTIPLIER,
      "accuracy": 25.1 * DARKSTEEL_MULTIPLIER,
      "defense": 9.8 * DARKSTEEL_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 100
    }]
  },
  "darksteel_short_sword": {
    "id": "darksteel_short_sword",
    "icon": "darksteelShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "darksteel short sword",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * DARKSTEEL_MULTIPLIER,
      "attackMax": 99.5 * DARKSTEEL_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * DARKSTEEL_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * DARKSTEEL_MULTIPLIER,
      "attackMax": 29.8 * DARKSTEEL_MULTIPLIER,
      "accuracy": 29.8 * DARKSTEEL_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  "darksteel_scimitar": {
    "id": "darksteel_scimitar",
    "icon": "darksteelScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "darksteel scimitar",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * SHORTSWORD_TO_SCIMITAR_ATTACK_MIN * DARKSTEEL_MULTIPLIER,
      "attackMax": 99.5 / SHORTSWORD_TO_SCIMITAR_ATTACK_MAX * DARKSTEEL_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * DARKSTEEL_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * SHORTSWORD_TO_SCIMITAR_ATTACK_MIN * DARKSTEEL_MULTIPLIER,
      "attackMax": 29.8 / SHORTSWORD_TO_SCIMITAR_ATTACK_MAX * DARKSTEEL_MULTIPLIER,
      "accuracy": 29.8 * DARKSTEEL_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 0.01, rarityId: 'epic', },
      { chance: 0.4,  rarityId: 'phenomenal', },
      { chance: 1.55, rarityId: 'extraordinary', },
      { chance: 6.25, rarityId: 'rare', },
      { chance: 25,   rarityId: 'fine', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  "darksteel_long_sword": {
    "id": "darksteel_long_sword",
    "icon": "darksteelLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "darksteel long sword",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 * DARKSTEEL_MULTIPLIER,
      "attackMax": 200.5 * DARKSTEEL_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * DARKSTEEL_MULTIPLIER
    },
    "extraStats": {
      "attack": 35 * DARKSTEEL_MULTIPLIER,
      "attackMax": 60.2 * DARKSTEEL_MULTIPLIER,
      "accuracy": 40.2 * DARKSTEEL_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  "darksteel_broad_sword": {
    "id": "darksteel_broad_sword",
    "icon": "darksteelBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "darksteel broad sword",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 / LONGSWORD_TO_BROADSWORD_ATTACK_MIN * DARKSTEEL_MULTIPLIER,
      "attackMax": 200.5 / LONGSWORD_TO_BROADSWORD_ATTACK_MAX * DARKSTEEL_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * DARKSTEEL_MULTIPLIER,
      "criticalChance": 10,
    },
    "extraStats": {
      "attack": 35 / LONGSWORD_TO_BROADSWORD_ATTACK_MIN * DARKSTEEL_MULTIPLIER,
      "attackMax": 60.2 / LONGSWORD_TO_BROADSWORD_ATTACK_MAX * DARKSTEEL_MULTIPLIER,
      "accuracy": 40.2 * DARKSTEEL_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 0.01, rarityId: 'epic', },
      { chance: 0.4,  rarityId: 'phenomenal', },
      { chance: 1.55, rarityId: 'extraordinary', },
      { chance: 6.25, rarityId: 'rare', },
      { chance: 25,   rarityId: 'fine', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  
  "darksteel_battle_axe": {
    "id": "darksteel_battle_axe",
    "icon": "darksteelBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "darksteel battle axe",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 83.5 * DARKSTEEL_MULTIPLIER,
      "attackMax": 300 * DARKSTEEL_MULTIPLIER,
      "attackSpeed": 0.3,
      "accuracy": 134.1 * DARKSTEEL_MULTIPLIER,
      "criticalChance": 35
    },
    "extraStats": {
      "attack": 25.1 * DARKSTEEL_MULTIPLIER,
      "attackMax": 90 * DARKSTEEL_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },
  
  "darksteel_horned_helmet": {
    "id": "darksteel_horned_helmet",
    "icon": "horned_helmet_t21.png",
    "category": "combat",
    "slot": "head",
    "name": "darksteel horned helmet",
    "sellPrice": 4000,
    "description": "Now that's using your head!",
    "isEquippable": true,
    "stats": {
      "attack": 19.4,
      "attackMax": 19.4,
      "accuracy": 19.4
    },
    "extraStats": {
      "attack": 7.2,
      "attackMax": 7.2,
      "accuracy": 7.2
    },
    upgradeRarity: [
      { chance: 0.01, rarityId: 'epic', },
      { chance: 0.4,  rarityId: 'phenomenal', },
      { chance: 1.55, rarityId: 'extraordinary', },
      { chance: 6.25, rarityId: 'rare', },
      { chance: 25,   rarityId: 'fine', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 100
    }]
  },

  "darksteel_helmet": {
    "id": "darksteel_helmet",
    "icon": "darksteelHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "darksteel helmet",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * DARKSTEEL_MULTIPLIER,
      "defense": 17.4 * DARKSTEEL_MULTIPLIER,
      "armor": 83.5 * DARKSTEEL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * DARKSTEEL_MULTIPLIER,
      "defense": 5.2 * DARKSTEEL_MULTIPLIER,
      "armor": 25.1 * DARKSTEEL_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 100
    }]
  },
  "darksteel_chest_plate": {
    "id": "darksteel_chest_plate",
    "icon": "darksteelChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "darksteel Chestplate",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * DARKSTEEL_MULTIPLIER,
      "defense": 17.4 * DARKSTEEL_MULTIPLIER,
      "armor": 83.5 * DARKSTEEL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * DARKSTEEL_MULTIPLIER,
      "defense": 5.2 * DARKSTEEL_MULTIPLIER,
      "armor": 25.1 * DARKSTEEL_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 100
    }]
  },
  "darksteel_plate_legs": {
    "id": "darksteel_plate_legs",
    "icon": "darksteelPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "darksteel platelegs",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * DARKSTEEL_MULTIPLIER,
      "defense": 17.4 * DARKSTEEL_MULTIPLIER,
      "armor": 83.5 * DARKSTEEL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * DARKSTEEL_MULTIPLIER,
      "defense": 5.2 * DARKSTEEL_MULTIPLIER,
      "armor": 25.1 * DARKSTEEL_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 100
    }]
  },
  "darksteel_shield": {
    "id": "darksteel_shield",
    "icon": "darksteelShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "darksteel shield",
    "sellPrice": Math.round(3000 * DARKSTEEL_MULTIPLIER),
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * DARKSTEEL_MULTIPLIER,
      "defense": 51.1 * DARKSTEEL_MULTIPLIER,
      "armor": 167.6 * DARKSTEEL_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 9.8 * DARKSTEEL_MULTIPLIER,
      "defense": 15.3 * DARKSTEEL_MULTIPLIER,
      "armor": 50.3 * DARKSTEEL_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 100
    }]
  }
};
