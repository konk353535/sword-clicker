const ETERNIUM_MULTIPLIER = 1.6;
const ETERNIUM_DEFENSE_MULTIPLIER = 1.7;
const SHORTSWORD_TO_SCIMITAR_ATTACK_MIN = 1.105;
const SHORTSWORD_TO_SCIMITAR_ATTACK_MAX = 0.85;
const LONGSWORD_TO_BROADSWORD_ATTACK_MIN = 0.7;
const LONGSWORD_TO_BROADSWORD_ATTACK_MAX = 0.85;


export const ETERNIUM_ITEMS = {
  "eternium_dagger": {
    "id": "eternium_dagger",
    "icon": "eterniumDagger.png",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "eternium dagger",
    "sellPrice": Math.round(1650 * ETERNIUM_MULTIPLIER),
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 17.4 * ETERNIUM_MULTIPLIER,
      "attackMax": 32.7 * ETERNIUM_MULTIPLIER,
      "attackSpeed": 1,
      "accuracy": 75.5 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  "eternium_spear": {
    "id": "eternium_spear",
    "icon": "eterniumSpear.png",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "eternium spear",
    "sellPrice": Math.round(3000 * ETERNIUM_MULTIPLIER),
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * ETERNIUM_MULTIPLIER,
      "attackMax": 83.5 * ETERNIUM_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 83.5 * ETERNIUM_MULTIPLIER,
      "defense": 32.7 * ETERNIUM_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * ETERNIUM_MULTIPLIER,
      "attackMax": 25.1 * ETERNIUM_MULTIPLIER,
      "accuracy": 25.1 * ETERNIUM_MULTIPLIER,
      "defense": 9.8 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  },
  "eternium_short_sword": {
    "id": "eternium_short_sword",
    "icon": "eterniumShortsword.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "eternium short sword",
    "sellPrice": Math.round(3000 * ETERNIUM_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * ETERNIUM_MULTIPLIER,
      "attackMax": 99.5 * ETERNIUM_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * ETERNIUM_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * ETERNIUM_MULTIPLIER,
      "attackMax": 29.8 * ETERNIUM_MULTIPLIER,
      "accuracy": 29.8 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  "eternium_scimitar": {
    "id": "eternium_scimitar",
    "icon": "eterniumScimitar.png",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "eternium scimitar",
    "sellPrice": Math.round(3000 * ETERNIUM_MULTIPLIER),
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 66.7 * SHORTSWORD_TO_SCIMITAR_ATTACK_MIN * ETERNIUM_MULTIPLIER,
      "attackMax": 99.5 / SHORTSWORD_TO_SCIMITAR_ATTACK_MAX * ETERNIUM_MULTIPLIER,
      "attackSpeed": 0.7,
      "accuracy": 99.5 * ETERNIUM_MULTIPLIER
    },
    "extraStats": {
      "attack": 20 * SHORTSWORD_TO_SCIMITAR_ATTACK_MIN * ETERNIUM_MULTIPLIER,
      "attackMax": 29.8 / SHORTSWORD_TO_SCIMITAR_ATTACK_MAX * ETERNIUM_MULTIPLIER,
      "accuracy": 29.8 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  "eternium_long_sword": {
    "id": "eternium_long_sword",
    "icon": "eterniumLongsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "eternium long sword",
    "sellPrice": Math.round(3000 * ETERNIUM_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 * ETERNIUM_MULTIPLIER,
      "attackMax": 200.5 * ETERNIUM_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * ETERNIUM_MULTIPLIER
    },
    "extraStats": {
      "attack": 35 * ETERNIUM_MULTIPLIER,
      "attackMax": 60.2 * ETERNIUM_MULTIPLIER,
      "accuracy": 40.2 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  "eternium_broad_sword": {
    "id": "eternium_broad_sword",
    "icon": "eterniumBroadsword.png",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "eternium broad sword",
    "sellPrice": Math.round(3000 * ETERNIUM_MULTIPLIER),
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 116.7 / LONGSWORD_TO_BROADSWORD_ATTACK_MIN * ETERNIUM_MULTIPLIER,
      "attackMax": 200.5 / LONGSWORD_TO_BROADSWORD_ATTACK_MAX * ETERNIUM_MULTIPLIER,
      "attackSpeed": 0.5,
      "accuracy": 134.1 * ETERNIUM_MULTIPLIER,
      "criticalChance": 10,
    },
    "extraStats": {
      "attack": 35 / LONGSWORD_TO_BROADSWORD_ATTACK_MIN * ETERNIUM_MULTIPLIER,
      "attackMax": 60.2 / LONGSWORD_TO_BROADSWORD_ATTACK_MAX * ETERNIUM_MULTIPLIER,
      "accuracy": 40.2 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  
  "eternium_battle_axe": {
    "id": "eternium_battle_axe",
    "icon": "eterniumBattleAxe.png",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "eternium battle axe",
    "sellPrice": Math.round(3000 * ETERNIUM_MULTIPLIER),
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 83.5 * ETERNIUM_MULTIPLIER,
      "attackMax": 300 * ETERNIUM_MULTIPLIER,
      "attackSpeed": 0.3,
      "accuracy": 134.1 * ETERNIUM_MULTIPLIER,
      "criticalChance": 35
    },
    "extraStats": {
      "attack": 25.1 * ETERNIUM_MULTIPLIER,
      "attackMax": 90 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 125
    }]
  },
  
  "eternium_horned_helmet": {
    "id": "eternium_horned_helmet",
    "icon": "horned_helmet_t26.png",
    "category": "combat",
    "slot": "head",
    "name": "eternium horned helmet",
    "sellPrice": 12000,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 35,
      "attackMax": 35,
      "accuracy": 40
    },
    "extraStats": {
      "attack": 25,
      "attackMax": 25,
      "accuracy": 25
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  },

  "eternium_helmet": {
    "id": "eternium_helmet",
    "icon": "eterniumHelmet.png",
    "category": "combat",
    "slot": "head",
    "name": "eternium helmet",
    "sellPrice": Math.round(3000 * ETERNIUM_MULTIPLIER),
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * ETERNIUM_MULTIPLIER,
      "defense": 17.4 * ETERNIUM_MULTIPLIER * ETERNIUM_DEFENSE_MULTIPLIER,
      "armor": 83.5 * ETERNIUM_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * ETERNIUM_MULTIPLIER,
      "defense": 5.2 * ETERNIUM_MULTIPLIER * ETERNIUM_DEFENSE_MULTIPLIER,
      "armor": 25.1 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  },
  "eternium_chest_plate": {
    "id": "eternium_chest_plate",
    "icon": "eterniumChestplate.png",
    "category": "combat",
    "slot": "chest",
    "name": "eternium Chestplate",
    "sellPrice": Math.round(3000 * ETERNIUM_MULTIPLIER),
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * ETERNIUM_MULTIPLIER,
      "defense": 17.4 * ETERNIUM_MULTIPLIER * ETERNIUM_DEFENSE_MULTIPLIER,
      "armor": 83.5 * ETERNIUM_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * ETERNIUM_MULTIPLIER,
      "defense": 5.2 * ETERNIUM_MULTIPLIER * ETERNIUM_DEFENSE_MULTIPLIER,
      "armor": 25.1 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  },
  "eternium_plate_legs": {
    "id": "eternium_plate_legs",
    "icon": "eterniumPlatelegs.png",
    "category": "combat",
    "slot": "legs",
    "name": "eternium platelegs",
    "sellPrice": Math.round(3000 * ETERNIUM_MULTIPLIER),
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 17.4 * ETERNIUM_MULTIPLIER,
      "defense": 17.4 * ETERNIUM_MULTIPLIER * ETERNIUM_DEFENSE_MULTIPLIER,
      "armor": 83.5 * ETERNIUM_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 5.2 * ETERNIUM_MULTIPLIER,
      "defense": 5.2 * ETERNIUM_MULTIPLIER * ETERNIUM_DEFENSE_MULTIPLIER,
      "armor": 25.1 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  },
  "eternium_shield": {
    "id": "eternium_shield",
    "icon": "eterniumShield.png",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "eternium shield",
    "sellPrice": Math.round(3000 * ETERNIUM_MULTIPLIER),
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 32.7 * ETERNIUM_MULTIPLIER,
      "defense": 51.1 * ETERNIUM_MULTIPLIER * ETERNIUM_DEFENSE_MULTIPLIER,
      "armor": 167.6 * ETERNIUM_MULTIPLIER
    },
    "extraStats": {
      "healthMax": 9.8 * ETERNIUM_MULTIPLIER,
      "defense": 15.3 * ETERNIUM_MULTIPLIER * ETERNIUM_DEFENSE_MULTIPLIER,
      "armor": 50.3 * ETERNIUM_MULTIPLIER
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 125
    }]
  }
};
