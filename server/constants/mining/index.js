import { MINING_ITEMS as miningItems } from './items';
import { ITEMS } from '/server/constants/items/index';

export const MINING_ITEMS = miningItems;

export const MINING = {
  prospecting: {
    chance: 1 / 6, // 1 spawn every 5 seconds ( 12 / min )
  },
  prospectors: {
    stone: {
      requiredMiningLevel: 1,
      icon: 'stoneProspector',
      name: 'stone prospector',
      id: 'stone',
      required: [{
        type: 'gold',
        amount: 5,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 1
      }],
      max: 5
    },
    copper: {
      requiredMiningLevel: 2,
      icon: 'copperProspector',
      name: 'copper prospector',
      id: 'copper',
      required: [{
        type: 'gold',
        amount: 20,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 2
      }],
      max: 5
    },
    coal: {
      requiredMiningLevel: 2,
      icon: 'carbonProspector',
      name: 'coal prospector',
      id: 'coal',
      required: [{
        type: 'gold',
        amount: 20,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 2
      }],
      max: 5
    },
    iron: {
      requiredMiningLevel: 5,
      icon: 'ironProspector',
      name: 'iron prospector',
      id: 'iron',
      required: [{
        type: 'gold',
        amount: 50,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 5
      }],
      max: 5
    },
    steel: {
      requiredMiningLevel: 10,
      icon: 'steelProspector',
      name: 'steel prospector',
      id: 'steel',
      required: [{
        type: 'gold',
        amount: 100,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 10
      }],
      max: 5
    },
    carbon: {
      requiredMiningLevel: 15,
      icon: 'carbonProspector',
      name: 'carbon prospector',
      id: 'carbon',
      required: [{
        type: 'gold',
        amount: 200,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 15
      }],
      max: 5
    },
    mithril: {
      requiredMiningLevel: 20,
      icon: 'mithrilProspector',
      name: 'mithril prospector',
      id: 'mithril',
      required: [{
        type: 'gold',
        amount: 1000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 20
      }],
      max: 5
    },
    adamantium: {
      requiredMiningLevel: 25,
      icon: 'adamantiumProspector',
      name: 'adamantium prospector',
      id: 'adamantium',
      required: [{
        type: 'gold',
        amount: 5000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 25
      }],
      max: 5
    },
    orichalcum: {
      requiredMiningLevel: 30,
      icon: 'orichalcumProspector',
      name: 'orichalcum prospector',
      id: 'orichalcum',
      required: [{
        type: 'gold',
        amount: 10000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 30
      }],
      max: 5
    },
    cobalt: {
      requiredMiningLevel: 35,
      icon: 'cobaltProspector',
      name: 'cobalt prospector',
      id: 'cobalt',
      required: [{
        type: 'gold',
        amount: 15000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 35
      }],
      max: 5
    },
    fairy_steel: {
      requiredMiningLevel: 40,
      icon: 'fairySteelProspector',
      name: 'fairy steel prospector',
      id: 'fairy_steel',
      required: [{
        type: 'gold',
        amount: 20000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 40
      }],
      max: 5
    },
    cursed: {
      requiredMiningLevel: 45,
      icon: 'cursedProspector',
      name: 'cursed prospector',
      id: 'cursed',
      required: [{
        type: 'gold',
        amount: 25000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 45
      }],
      max: 5
    }
  },
  miners: {
    primitive_miner: {
      requiredMiningLevel: 1,
      icon: 'primitiveMiner',
      name: 'primitive miner',
      id: 'primitive_miner',
      required: [{
        type: 'item',
        itemId: 'primitive_pickaxe',
        icon: ITEMS['primitive_pickaxe'].icon,
        name: ITEMS['primitive_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 50,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 1
      }],
      max: 3,
      damagePerSecond: 0.07
    },

   copper_miner: {
      requiredMiningLevel: 2,
      icon: 'copperMiner',
      name: 'copper miner',
      id: 'copper_miner',
      required: [{
        type: 'item',
        itemId: 'copper_pickaxe',
        icon: ITEMS['copper_pickaxe'].icon,
        name: ITEMS['copper_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 150,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 2
      }],
      max: 3,
      damagePerSecond: 0.1
    },

   iron_miner: {
      requiredMiningLevel: 5,
      icon: 'ironMiner',
      name: 'iron miner',
      id: 'iron_miner',
      required: [{
        type: 'item',
        itemId: 'iron_pickaxe',
        icon: ITEMS['iron_pickaxe'].icon,
        name: ITEMS['iron_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 500,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 5
      }],
      max: 3,
      damagePerSecond: 0.11
    },

   steel_miner: {
      requiredMiningLevel: 10,
      icon: 'steelMiner',
      name: 'steel miner',
      id: 'steel_miner',
      required: [{
        type: 'item',
        itemId: 'steel_pickaxe',
        icon: ITEMS['steel_pickaxe'].icon,
        name: ITEMS['steel_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 2500,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 10
      }],
      max: 3,
      damagePerSecond: 0.12
    },

   carbon_miner: {
      requiredMiningLevel: 15,
      icon: 'carbonMiner',
      name: 'carbon miner',
      id: 'carbon_miner',
      required: [{
        type: 'item',
        itemId: 'carbon_pickaxe',
        icon: ITEMS['carbon_pickaxe'].icon,
        name: ITEMS['carbon_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 7500,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 15
      }],
      max: 3,
      damagePerSecond: 0.13
    },

   mithril_miner: {
      requiredMiningLevel: 20,
      icon: 'mithrilMiner',
      name: 'mithril miner',
      id: 'mithril_miner',
      required: [{
        type: 'item',
        itemId: 'mithril_pickaxe',
        icon: ITEMS['mithril_pickaxe'].icon,
        name: ITEMS['mithril_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 20000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 20
      }],
      max: 3,
      damagePerSecond: 0.15
    },

    adamantium_miner: {
      requiredMiningLevel: 25,
      icon: 'adamantiumMiner',
      name: 'adamantium miner',
      id: 'adamantium_miner',
      required: [{
        type: 'item',
        itemId: 'adamantium_pickaxe',
        icon: ITEMS['adamantium_pickaxe'].icon,
        name: ITEMS['adamantium_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 50000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 25
      }],
      max: 3,
      damagePerSecond: 0.17
    },

    orichalcum_miner: {
      requiredMiningLevel: 30,
      icon: 'orichalcumMiner',
      name: 'orichalcum miner',
      id: 'orichalcum_miner',
      required: [{
        type: 'item',
        itemId: 'orichalcum_pickaxe',
        icon: ITEMS['orichalcum_pickaxe'].icon,
        name: ITEMS['orichalcum_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 100000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 30
      }],
      max: 3,
      damagePerSecond: 0.20
    },

    cobalt_miner: {
      requiredMiningLevel: 35,
      icon: 'cobaltMiner',
      name: 'cobalt miner',
      id: 'cobalt_miner',
      required: [{
        type: 'item',
        itemId: 'cobalt_pickaxe',
        icon: ITEMS['cobalt_pickaxe'].icon,
        name: ITEMS['cobalt_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 150000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 35
      }],
      max: 3,
      damagePerSecond: 0.23
    },

    fairy_steel_miner: {
      requiredMiningLevel: 40,
      icon: 'fairySteelMiner',
      name: 'fairy steel miner',
      id: 'fairy_steel_miner',
      required: [{
        type: 'item',
        itemId: 'fairy_steel_pickaxe',
        icon: ITEMS['fairy_steel_pickaxe'].icon,
        name: ITEMS['fairy_steel_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 200000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 40
      }],
      max: 3,
      damagePerSecond: 0.26
    },

    cursed_miner: {
      requiredMiningLevel: 45,
      icon: 'cursedMiner',
      name: 'cursed miner',
      id: 'cursed_miner',
      required: [{
        type: 'item',
        itemId: 'cursed_pickaxe',
        icon: ITEMS['cursed_pickaxe'].icon,
        name: ITEMS['cursed_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 250000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 45
      }],
      max: 3,
      damagePerSecond: 0.29
    }
  },
  ores: {
    stone: {
      requiredLevel: 1,
      healthMax: 10,
      xp: 2,
      id: 'stone',
      icon: 'stone',
      name: 'stone',
      itemId: 'ore_stone',
      chance: 0.06
    },

    copper: {
      requiredLevel: 2,
      healthMax: 20,
      xp: 5,
      id: 'copper',
      icon: 'copper',
      name: 'copper',
      itemId: 'ore_copper',
      chance: 0.03
    },

    coal: {
      requiredLevel: 2,
      healthMax: 35,
      xp: 9,
      id: 'coal',
      icon: 'coal',
      name: 'coal',
      itemId: 'ore_coal',
      chance: 0.02
    },

    iron: {
      requiredLevel: 5,
      healthMax: 80,
      xp: 23,
      id: 'iron',
      icon: 'iron',
      name: 'iron',
      itemId: 'ore_iron',
      chance: 0.008
    },

    steel: {
      requiredLevel: 10,
      healthMax: 200,
      xp: 49,
      id: 'steel',
      icon: 'steel',
      name: 'steel',
      itemId: 'ore_steel',
      chance: 0.003
    },

    carbon: {
      requiredLevel: 15,
      healthMax: 400,
      xp: 100,
      id: 'carbon',
      icon: 'carbon',
      name: 'carbon',
      itemId: 'ore_carbon',
      chance: 0.0015
    },

    mithril: {
      requiredLevel: 20,
      healthMax: 1000,
      xp: 205,
      id: 'mithril',
      icon: 'mithril',
      name: 'mithril',
      itemId: 'ore_mithril',
      chance: 0.00065
    },

    mithril_essence: {
      requiredLevel: 23,
      healthMax: 2000,
      xp: 200,
      id: 'mithril_essence',
      icon: 'mithrilEssence',
      name: 'mithril_essence',
      itemId: 'mithril_essence',
      chance: 0.000095
    },

    adamantium: {
      requiredLevel: 25,
      healthMax: 5000,
      xp: 350,
      id: 'adamantium',
      icon: 'adamantium',
      name: 'adamantium',
      itemId: 'ore_adamantium',
      chance: 0.00030
    },

    adamantium_essence: {
      requiredLevel: 28,
      healthMax: 10000,
      xp: 350,
      id: 'adamantium_essence',
      icon: 'adamantiumEssence',
      name: 'adamantium_essence',
      itemId: 'adamantium_essence',
      chance: 0.000045
    },

    orichalcum: {
      requiredLevel: 30,
      healthMax: 7500,
      xp: 660,
      id: 'orichalcum',
      icon: 'orichalcum',
      name: 'orichalcum',
      itemId: 'ore_orichalcum',
      chance: 0.0002
    },

    orichalcum_essence: {
      requiredLevel: 33,
      healthMax: 22500,
      xp: 660,
      id: 'orichalcum_essence',
      icon: 'orichalcumEssence',
      name: 'orichalcum_essence',
      itemId: 'orichalcum_essence',
      chance: 0.0000055
    },

    cobalt: {
      requiredLevel: 35,
      healthMax: 10000,
      xp: 840,
      id: 'cobalt',
      icon: 'cobalt',
      name: 'cobalt',
      itemId: 'ore_cobalt',
      chance: 0.00015
    },

    cobalt_essence: {
      requiredLevel: 38,
      healthMax: 30000,
      xp: 840,
      id: 'cobalt_essence',
      icon: 'cobaltEssence',
      name: 'cobalt_essence',
      itemId: 'cobalt_essence',
      chance: 0.0000035
    },

    fairy_steel: {
      requiredLevel: 40,
      healthMax: 12500,
      xp: 1000,
      id: 'fairy_steel',
      icon: 'fairySteel',
      name: 'fairy_steel',
      itemId: 'ore_fairy_steel',
      chance: 0.00010
    },

    fairy_steel_essence: {
      requiredLevel: 43,
      healthMax: 37500,
      xp: 1000,
      id: 'fairy_steel_essence',
      icon: 'fairySteelEssence',
      name: 'fairy_steel_essence',
      itemId: 'fairy_steel_essence',
      chance: 0.0000010
    },

    cursed: {
      requiredLevel: 45,
      healthMax: 15000,
      xp: 1250,
      id: 'cursed',
      icon: 'cursed',
      name: 'cursed',
      itemId: 'ore_cursed',
      chance: 0.00006
    },

    cursed_essence: {
      requiredLevel: 48,
      healthMax: 45000,
      xp: 1250,
      id: 'cursed_essence',
      icon: 'cursedEssence',
      name: 'cursed_essence',
      itemId: 'cursed_essence',
      chance: 0.0000005
    },

    jade: {
      requiredLevel: 10,
      healthMax: 1000,
      xp: 333,
      id: 'jade',
      icon: 'jade',
      name: 'jade',
      itemId: 'jade',
      chance: 0.0000035
    },

    lapislazuli: {
      requiredLevel: 20,
      healthMax: 15000,
      xp: 1000,
      id: 'lapislazuli',
      icon: 'lapislazuli',
      name: 'lapislazuli',
      itemId: 'lapislazuli',
      chance: 0.000000095
    }
  }
}
