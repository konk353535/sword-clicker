import { MINING_ITEMS as miningItems } from './items';
import { ITEMS } from '/server/constants/items/index';

export const MINING_ITEMS = miningItems;

export const MINING = {
  prospecting: {
    chance: 1 / 5, // 1 spawn every 5 seconds ( 12 / min )
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
    }
  },
  ores: {
    stone: {
      requiredLevel: 1,
      healthMax: 10,
      xp: 3,
      id: 'stone',
      icon: 'stone',
      name: 'stone',
      itemId: 'ore_stone',
      chance: 0.06
    },

    copper: {
      requiredLevel: 2,
      healthMax: 20,
      xp: 6,
      id: 'copper',
      icon: 'copper',
      name: 'copper',
      itemId: 'ore_copper',
      chance: 0.03
    },

    coal: {
      requiredLevel: 2,
      healthMax: 35,
      xp: 13,
      id: 'coal',
      icon: 'coal',
      name: 'coal',
      itemId: 'ore_coal',
      chance: 0.02
    },

    iron: {
      requiredLevel: 5,
      healthMax: 80,
      xp: 28,
      id: 'iron',
      icon: 'iron',
      name: 'iron',
      itemId: 'ore_iron',
      chance: 0.008
    },

    steel: {
      requiredLevel: 10,
      healthMax: 200,
      xp: 57,
      id: 'steel',
      icon: 'steel',
      name: 'steel',
      itemId: 'ore_steel',
      chance: 0.003
    },

    carbon: {
      requiredLevel: 15,
      healthMax: 400,
      xp: 115,
      id: 'carbon',
      icon: 'carbon',
      name: 'carbon',
      itemId: 'ore_carbon',
      chance: 0.0015
    },

    mithril: {
      requiredLevel: 20,
      healthMax: 1000,
      xp: 245,
      id: 'mithril',
      icon: 'mithril',
      name: 'mithril',
      itemId: 'ore_mithril',
      chance: 0.00075
    },

    adamantium: {
      requiredLevel: 25,
      healthMax: 5000,
      xp: 440,
      id: 'adamantium',
      icon: 'adamantium',
      name: 'adamantium',
      itemId: 'ore_adamantium',
      chance: 0.00045
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
      healthMax: 50000,
      xp: 7600,
      id: 'lapislazuli',
      icon: 'lapislazuli',
      name: 'lapislazuli',
      itemId: 'lapislazuli',
      chance: 0.000000035
    }
  }
}
