const RELICROCK_MULTIPLIER = 1.5;
const RELICROCK_DEFENSE_MULTIPLIER = 1.5;
const SHORTSWORD_TO_SCIMITAR_ATTACK_MIN = 1.105;
const SHORTSWORD_TO_SCIMITAR_ATTACK_MAX = 0.85;
const LONGSWORD_TO_BROADSWORD_ATTACK_MIN = 0.7;
const LONGSWORD_TO_BROADSWORD_ATTACK_MAX = 0.85;


export const RELICROCK_ITEMS = {
  "relicrock_dagger": {
    "id": "relicrock_dagger",
    "icon": "relicrockDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "relicrock dagger",
    "sellPrice": Math.round(1650 * RELICROCK_MULTIPLIER),
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17.4 * RELICROCK_MULTIPLIER,
      "attackMax": 32.7 * RELICROCK_MULTIPLIER,
      "attackSpeed": 1,
      "accuracy": 75.5 * RELICROCK_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 120
    }]
  },
  "relicrock_spear": {
    "id": "relicrock_spear",
    "icon": "relicrockSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "relicrock spear",
    "sellPrice": Math.round(3000 * RELICROCK_MULTIPLIER),
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * RELICROCK_MULTIPLIER,
      "attackMax": 83.5 * RELICROCK_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 83.5 * RELICROCK_MULTIPLIER,
      "defense": 32.7 * RELICROCK_MULTIPLIER,
    },
    "extraStats": {
      "attack": 20 * RELICROCK_MULTIPLIER,
      "attackMax": 25.1 * RELICROCK_MULTIPLIER,
      "accuracy": 25.1 * RELICROCK_MULTIPLIER,
      "defense": 9.8 * RELICROCK_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 120
    }]
  },
  "relicrock_short_sword": {
    "id": "relicrock_short_sword",
    "icon": "relicrockShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "relicrock short sword",
    "sellPrice": Math.round(3000 * RELICROCK_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * RELICROCK_MULTIPLIER,
      "attackMax": 99.5 * RELICROCK_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * RELICROCK_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * RELICROCK_MULTIPLIER,
      "attackMax": 29.8 * RELICROCK_MULTIPLIER,
      "accuracy": 29.8 * RELICROCK_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 120
    }]
  },
  "relicrock_scimitar": {
    "id": "relicrock_scimitar",
    "icon": "relicrockScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "relicrock scimitar",
    "sellPrice": Math.round(3000 * RELICROCK_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * SHORTSWORD_TO_SCIMITAR_ATTACK_MIN * RELICROCK_MULTIPLIER,
      "attackMax": 99.5 / SHORTSWORD_TO_SCIMITAR_ATTACK_MAX * RELICROCK_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * RELICROCK_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * SHORTSWORD_TO_SCIMITAR_ATTACK_MIN * RELICROCK_MULTIPLIER,
      "attackMax": 29.8 / SHORTSWORD_TO_SCIMITAR_ATTACK_MAX * RELICROCK_MULTIPLIER,
      "accuracy": 29.8 * RELICROCK_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 0.1, rarityId: 'phenomenal', },
      { chance: 1, rarityId: 'extraordinary', },
      { chance: 5, rarityId: 'rare', },
      { chance: 15, rarityId: 'fine', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 120
    }]
  },
  "relicrock_long_sword": {
    "id": "relicrock_long_sword",
    "icon": "relicrockLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "relicrock long sword",
    "sellPrice": Math.round(3000 * RELICROCK_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 * RELICROCK_MULTIPLIER,
      "attackMax": 200.5 * RELICROCK_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * RELICROCK_MULTIPLIER
    },
    "extraStats": {
      "attack": 35 * RELICROCK_MULTIPLIER,
      "attackMax": 60.2 * RELICROCK_MULTIPLIER,
      "accuracy": 40.2 * RELICROCK_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 120
    }]
  },
  "relicrock_broad_sword": {
    "id": "relicrock_broad_sword",
    "icon": "relicrockBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "relicrock broad sword",
    "sellPrice": Math.round(3000 * RELICROCK_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 / LONGSWORD_TO_BROADSWORD_ATTACK_MIN * RELICROCK_MULTIPLIER,
      "attackMax": 200.5 / LONGSWORD_TO_BROADSWORD_ATTACK_MAX * RELICROCK_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * RELICROCK_MULTIPLIER,
      "criticalChance": 10,
    },
    "extraStats": {
      "attack": 35 / LONGSWORD_TO_BROADSWORD_ATTACK_MIN * RELICROCK_MULTIPLIER,
      "attackMax": 60.2 / LONGSWORD_TO_BROADSWORD_ATTACK_MAX * RELICROCK_MULTIPLIER,
      "accuracy": 40.2 * RELICROCK_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 0.1, rarityId: 'phenomenal', },
      { chance: 1, rarityId: 'extraordinary', },
      { chance: 5, rarityId: 'rare', },
      { chance: 15, rarityId: 'fine', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 120
    }]
  },
  
  "relicrock_battle_axe": {
    "id": "relicrock_battle_axe",
    "icon": "relicrockBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "relicrock battle axe",
    "sellPrice": Math.round(3000 * RELICROCK_MULTIPLIER),
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 83.5 * RELICROCK_MULTIPLIER,
      "attackMax": 300 * RELICROCK_MULTIPLIER,
      "attackSpeed": 0.3,
      "accuracy": 134.1 * RELICROCK_MULTIPLIER,
      "criticalChance": 35
    },
    "extraStats": {
      "attack": 25.1 * RELICROCK_MULTIPLIER,
      "attackMax": 90 * RELICROCK_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 120
    }]
  },
  
  "relicrock_horned_helmet": {
    "id": "relicrock_horned_helmet",
    "icon": "horned_helmet_t25.png",
    "category": "combat",
    "slot": "head",
    "name": "relicrock horned helmet",
    "sellPrice": 9000,
    "description": "Now that's using your head!",
    "isEquippable": true,
    "stats": {
      "attack": 29.4,
      "attackMax": 29.4,
      "accuracy": 29.4
    },
    "extraStats": {
      "attack": 17.2,
      "attackMax": 17.2,
      "accuracy": 17.2
    },
    upgradeRarity: [
      { chance: 0.1, rarityId: 'phenomenal', },
      { chance: 1, rarityId: 'extraordinary', },
      { chance: 5, rarityId: 'rare', },
      { chance: 15, rarityId: 'fine', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 120
    }]
  },

  "relicrock_helmet": {
    "id": "relicrock_helmet",
    "icon": "relicrockHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "relicrock helmet",
    "sellPrice": Math.round(3000 * RELICROCK_MULTIPLIER),
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * RELICROCK_MULTIPLIER,
      "defense": 17.4 * RELICROCK_MULTIPLIER * RELICROCK_DEFENSE_MULTIPLIER,
      "armor": 83.5 * RELICROCK_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * RELICROCK_MULTIPLIER,
      "defense": 5.2 * RELICROCK_MULTIPLIER * RELICROCK_DEFENSE_MULTIPLIER,
      "armor": 25.1 * RELICROCK_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 120
    }]
  },
  "relicrock_chest_plate": {
    "id": "relicrock_chest_plate",
    "icon": "relicrockChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "relicrock Chestplate",
    "sellPrice": Math.round(3000 * RELICROCK_MULTIPLIER),
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * RELICROCK_MULTIPLIER,
      "defense": 17.4 * RELICROCK_MULTIPLIER * RELICROCK_DEFENSE_MULTIPLIER,
      "armor": 83.5 * RELICROCK_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * RELICROCK_MULTIPLIER,
      "defense": 5.2 * RELICROCK_MULTIPLIER * RELICROCK_DEFENSE_MULTIPLIER,
      "armor": 25.1 * RELICROCK_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 120
    }]
  },
  "relicrock_plate_legs": {
    "id": "relicrock_plate_legs",
    "icon": "relicrockPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "relicrock platelegs",
    "sellPrice": Math.round(3000 * RELICROCK_MULTIPLIER),
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * RELICROCK_MULTIPLIER,
      "defense": 17.4 * RELICROCK_MULTIPLIER * RELICROCK_DEFENSE_MULTIPLIER,
      "armor": 83.5 * RELICROCK_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * RELICROCK_MULTIPLIER,
      "defense": 5.2 * RELICROCK_MULTIPLIER * RELICROCK_DEFENSE_MULTIPLIER,
      "armor": 25.1 * RELICROCK_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 120
    }]
  },
  "relicrock_shield": {
    "id": "relicrock_shield",
    "icon": "relicrockShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "relicrock shield",
    "sellPrice": Math.round(3000 * RELICROCK_MULTIPLIER),
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * RELICROCK_MULTIPLIER,
      "defense": 51.1 * RELICROCK_MULTIPLIER * RELICROCK_DEFENSE_MULTIPLIER,
      "armor": 167.6 * RELICROCK_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 9.8 * RELICROCK_MULTIPLIER,
      "defense": 15.3 * RELICROCK_MULTIPLIER * RELICROCK_DEFENSE_MULTIPLIER,
      "armor": 50.3 * RELICROCK_MULTIPLIER
    },
    upgradeRarity: [
      { chance: 5, rarityId: 'mastercrafted', },
      { chance: 15, rarityId: 'improved', },
    ],
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 120
    }]
  }
};
