export const ORICHALCUM_ITEMS = {
  "orichalcum_dagger": {
    "id": "orichalcum_dagger",
    "icon": "orichalcumDagger.svg",
    "category": "combat",
    "weaponType": "dagger",
    "slot": "mainHand",
    "name": "orichalcum dagger",
    "sellPrice": 1800,
    "description": "A poorly made dagger.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 11.7,
      "attackMax": 22,
      "attackSpeed": 1,
      "accuracy": 50.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 75
    }]
  },
  "orichalcum_spear": {
    "id": "orichalcum_spear",
    "icon": "orichalcumSpear.svg",
    "category": "combat",
    "weaponType": "spear",
    "slot": "mainHand",
    "name": "orichalcum spear",
    "sellPrice": 1800,
    "description": "Used to train defense.",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 44.7,
      "attackMax": 56,
      "attackSpeed": 0.5,
      "accuracy": 56,
      "defense": 22
    },
    "extraStats": {
      "attack": 13.4,
      "attackMax": 16.8,
      "accuracy": 16.8,
      "defense": 6.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 75
    }]
  },
  "orichalcum_short_sword": {
    "id": "orichalcum_short_sword",
    "icon": "orichalcumShortSword.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "orichalcum short sword",
    "sellPrice": 1800,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 44.7,
      "attackMax": 66.8,
      "attackSpeed": 0.7,
      "accuracy": 66.8
    },
    "extraStats": {
      "attack": 13.4,
      "attackMax": 20,
      "accuracy": 20
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 75
    }]
  },
  "orichalcum_scimitar": {
    "id": "orichalcum_scimitar",
    "icon": "orichalcumScimitar.svg",
    "category": "combat",
    "weaponType": "shortSword",
    "slot": "mainHand",
    "name": "orichalcum scimitar",
    "sellPrice": 1800,
    "description": "A good balance between offense and defense",
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 49.5,
      "attackMax": 78.3,
      "attackSpeed": 0.7,
      "accuracy": 66.8
    },
    "extraStats": {
      "attack": 14.9,
      "attackMax": 23.5,
      "accuracy": 20
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 80
    }]
  },
  "orichalcum_long_sword": {
    "id": "orichalcum_long_sword",
    "icon": "orichalcumLongSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "orichalcum long sword",
    "sellPrice": 1800,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 78.3,
      "attackMax": 134.5,
      "attackSpeed": 0.5,
      "accuracy": 89.9
    },
    "extraStats": {
      "attack": 23.5,
      "attackMax": 40.4,
      "accuracy": 27
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 75
    }]
  },
  "orichalcum_broad_sword": {
    "id": "orichalcum_broad_sword",
    "icon": "orichalcumBroadSword.svg",
    "category": "combat",
    "weaponType": "longSword",
    "slot": "mainHand",
    "name": "orichalcum broad sword",
    "sellPrice": 1800,
    "description": "A pure offensive weapon",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 112.4,
      "attackMax": 157.1,
      "attackSpeed": 0.5,
      "accuracy": 89.9
    },
    "extraStats": {
      "attack": 33.7,
      "attackMax": 47.1,
      "accuracy": 27
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 80
    }]
  },
  "orichalcum_battle_axe": {
    "id": "orichalcum_battle_axe",
    "icon": "orichalcumBattleAxe.svg",
    "category": "combat",
    "weaponType": "battleAxe",
    "slot": "mainHand",
    "name": "orichalcum battle axe",
    "sellPrice": 1800,
    "description": "A slow pure offensive weapon.",
    "isTwoHanded": true,
    "isWeapon": true,
    "isEquippable": true,
    "stats": {
      "attack": 56,
      "attackMax": 201.3,
      "attackSpeed": 0.3,
      "accuracy": 89.9,
      "criticalChance": 5
    },
    "extraStats": {
      "attack": 16.8,
      "attackMax": 60.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 75
    }]
  },
  "orichalcum_horned_helmet": {
    "id": "orichalcum_horned_helmet",
    "icon": "orichalcumHornedHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "orichalcum horned helmet",
    "sellPrice": 1800,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "attack": 11.7,
      "attackMax": 11.7,
      "accuracy": 11.7
    },
    "extraStats": {
      "attack": 3.5,
      "attackMax": 3.5,
      "accuracy": 3.5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 75
    }]
  },
  "orichalcum_helmet": {
    "id": "orichalcum_helmet",
    "icon": "orichalcumHelmet.svg",
    "category": "combat",
    "slot": "head",
    "name": "orichalcum helmet",
    "sellPrice": 1800,
    "description": "Protect your head",
    "isEquippable": true,
    "stats": {
      "healthMax": 11.7,
      "defense": 11.7,
      "armor": 56
    },
    "extraStats": {
      "healthMax": 3.5,
      "defense": 3.5,
      "armor": 16.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 75
    }]
  },
  "orichalcum_chest_plate": {
    "id": "orichalcum_chest_plate",
    "icon": "orichalcumChestPlate.svg",
    "category": "combat",
    "slot": "chest",
    "name": "orichalcum chestplate",
    "sellPrice": 1800,
    "description": "Protect your heart",
    "isEquippable": true,
    "stats": {
      "healthMax": 11.7,
      "defense": 11.7,
      "armor": 56
    },
    "extraStats": {
      "healthMax": 3.5,
      "defense": 3.5,
      "armor": 16.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 75
    }]
  },
  "orichalcum_plate_legs": {
    "id": "orichalcum_plate_legs",
    "icon": "orichalcumPlateLegs.svg",
    "category": "combat",
    "slot": "legs",
    "name": "orichalcum platelegs",
    "sellPrice": 1800,
    "description": "Protect your legs",
    "isEquippable": true,
    "stats": {
      "healthMax": 11.7,
      "defense": 11.7,
      "armor": 56
    },
    "extraStats": {
      "healthMax": 3.5,
      "defense": 3.5,
      "armor": 16.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 75
    }]
  },
  "orichalcum_shield": {
    "id": "orichalcum_shield",
    "icon": "orichalcumShield.svg",
    "category": "combat",
    "weaponType": "shield",
    "slot": "offHand",
    "name": "orichalcum shield",
    "sellPrice": 1800,
    "description": "Provides large defense bonuses",
    "isEquippable": true,
    "stats": {
      "healthMax": 22,
      "defense": 34.3,
      "armor": 112.4
    },
    "extraStats": {
      "healthMax": 6.6,
      "defense": 10.3,
      "armor": 33.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 75
    }]
  }
}
