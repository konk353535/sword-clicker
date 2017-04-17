import { MINING_ITEMS as miningItems } from './items';
import { ITEMS } from '/server/constants/items/index';

export const MINING_ITEMS = miningItems;

export const MINING = {
  prospecting: {
    chance: 1 / 15,
    chancePerProspector: 1 / 200,
    max: 10,
    cost(currentProspectorsCount) {
      return 10 + ((currentProspectorsCount - 1) * 60) * (currentProspectorsCount - 1);
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
        amount: 100,
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
      requiredMiningLevel: 3,
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
        amount: 500,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 3
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
        amount: 1000,
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
        amount: 1000,
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
        amount: 5000,
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
        amount: 25000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 20
      }],
      max: 3,
      damagePerSecond: 0.15
    }
  },
  ores: {
    stone: {
      requiredLevel: 1,
      healthMax: 10,
      xp: 1,
      id: 'stone',
      icon: 'stone',
      name: 'stone',
      itemId: 'ore_stone',
      chance: 1
    },

    copper: {
      requiredLevel: 2,
      healthMax: 35,
      xp: 3,
      id: 'copper',
      icon: 'copper',
      name: 'copper',
      itemId: 'ore_copper',
      chance: 0.3
    },

    coal: {
      requiredLevel: 2,
      healthMax: 85,
      xp: 8,
      id: 'coal',
      icon: 'coal',
      name: 'coal',
      itemId: 'ore_coal',
      chance: 0.08
    },

    steel: {
      requiredLevel: 5,
      healthMax: 500,
      xp: 40,
      id: 'steel',
      icon: 'steel',
      name: 'steel',
      itemId: 'ore_steel',
      chance: 0.04
    },

    steel: {
      requiredLevel: 10,
      healthMax: 2000,
      xp: 180,
      id: 'steel',
      icon: 'steel',
      name: 'steel',
      itemId: 'ore_steel',
      chance: 0.02
    },

    carbon: {
      requiredLevel: 15,
      healthMax: 5000,
      xp: 250,
      id: 'carbon',
      icon: 'carbon',
      name: 'carbon',
      itemId: 'ore_carbon',
      chance: 0.005
    },

    mithril: {
      requiredLevel: 20,
      healthMax: 10000,
      xp: 400,
      id: 'mithril',
      icon: 'mithril',
      name: 'mithril',
      itemId: 'ore_mithril',
      chance: 0.001
    }
  }
}
