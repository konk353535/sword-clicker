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
    tin: {
      requiredMiningLevel: 5,
      icon: 'tinProspector',
      name: 'tin prospector',
      id: 'tin',
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
    bronze: {
      requiredMiningLevel: 10,
      icon: 'bronzeProspector',
      name: 'bronze prospector',
      id: 'bronze',
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
    iron: {
      requiredMiningLevel: 15,
      icon: 'ironProspector',
      name: 'iron prospector',
      id: 'iron',
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
    silver: {
      requiredMiningLevel: 20,
      icon: 'silverProspector',
      name: 'silver prospector',
      id: 'silver',
      required: [{
        type: 'gold',
        amount: 400,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 20
      }],
      max: 5
    },
    gold: {
      requiredMiningLevel: 25,
      icon: 'goldProspector',
      name: 'gold prospector',
      id: 'gold',
      required: [{
        type: 'gold',
        amount: 600,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 25
      }],
      max: 5
    },
    carbon: {
      requiredMiningLevel: 30,
      icon: 'carbonProspector',
      name: 'carbon prospector',
      id: 'carbon',
      required: [{
        type: 'gold',
        amount: 1000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 30
      }],
      max: 5
    },
    steel: {
      requiredMiningLevel: 35,
      icon: 'steelProspector',
      name: 'steel prospector',
      id: 'steel',
      required: [{
        type: 'gold',
        amount: 1250,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 35
      }],
      max: 5
    },
    platinum: {
      requiredMiningLevel: 40,
      icon: 'platinumProspector',
      name: 'platinum prospector',
      id: 'platinum',
      required: [{
        type: 'gold',
        amount: 2000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 40
      }],
      max: 5
    },
    titanium: {
      requiredMiningLevel: 45,
      icon: 'titaniumProspector',
      name: 'titanium prospector',
      id: 'titanium',
      required: [{
        type: 'gold',
        amount: 3000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 45
      }],
      max: 5
    },
    tungsten: {
      requiredMiningLevel: 50,
      icon: 'tungstenProspector',
      name: 'tungsten prospector',
      id: 'tungsten',
      required: [{
        type: 'gold',
        amount: 6000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 50
      }],
      max: 5
    },
    obsidian: {
      requiredMiningLevel: 55,
      icon: 'obsidianProspector',
      name: 'obsidian prospector',
      id: 'obsidian',
      required: [{
        type: 'gold',
        amount: 10000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 55
      }],
      max: 5
    },
    cobalt: {
      requiredMiningLevel: 60,
      icon: 'cobaltProspector',
      name: 'cobalt prospector',
      id: 'cobalt',
      required: [{
        type: 'gold',
        amount: 20000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 60
      }],
      max: 5
    },
    mithril: {
      requiredMiningLevel: 65,
      icon: 'mithrilProspector',
      name: 'mithril prospector',
      id: 'mithril',
      required: [{
        type: 'gold',
        amount: 40000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 65
      }],
      max: 5
    },
    adamantium: {
      requiredMiningLevel: 70,
      icon: 'adamantiumProspector',
      name: 'adamantium prospector',
      id: 'adamantium',
      required: [{
        type: 'gold',
        amount: 60000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 70
      }],
      max: 5
    },
    orichalcum: {
      requiredMiningLevel: 75,
      icon: 'orichalcumProspector',
      name: 'orichalcum prospector',
      id: 'orichalcum',
      required: [{
        type: 'gold',
        amount: 100000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 75
      }],
      max: 5
    },
    meteorite: {
      requiredMiningLevel: 80,
      icon: 'meteoriteProspector',
      name: 'meteorite prospector',
      id: 'meteorite',
      required: [{
        type: 'gold',
        amount: 150000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 80
      }],
      max: 5
    },
    fairy_steel: {
      requiredMiningLevel: 85,
      icon: 'fairySteelProspector',
      name: 'fairy steel prospector',
      id: 'fairy_steel',
      required: [{
        type: 'gold',
        amount: 250000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 85
      }],
      max: 5
    },
    fairy_steel: {
      requiredMiningLevel: 90,
      icon: 'fairySteelProspector',
      name: 'fairy steel prospector',
      id: 'fairy_steel',
      required: [{
        type: 'gold',
        amount: 500000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 90
      }],
      max: 5
    },
    cursed: {
      requiredMiningLevel: 95,
      icon: 'cursedProspector',
      name: 'cursed prospector',
      id: 'cursed',
      required: [{
        type: 'gold',
        amount: 1000000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 95
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

    tin_miner: {
      requiredMiningLevel: 5,
      icon: 'tinMiner',
      name: 'tin miner',
      id: 'tin_miner',
      required: [{
        type: 'item',
        itemId: 'tin_pickaxe',
        icon: ITEMS['tin_pickaxe'].icon,
        name: ITEMS['tin_pickaxe'].name,
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

    bronze_miner: {
      requiredMiningLevel: 10,
      icon: 'bronzeMiner',
      name: 'bronze miner',
      id: 'bronze_miner',
      required: [{
        type: 'item',
        itemId: 'bronze_pickaxe',
        icon: ITEMS['bronze_pickaxe'].icon,
        name: ITEMS['bronze_pickaxe'].name,
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

    iron_miner: {
      requiredMiningLevel: 15,
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


    silver_miner: {
      requiredMiningLevel: 20,
      icon: 'silverMiner',
      name: 'silver miner',
      id: 'silver_miner',
      required: [{
        type: 'item',
        itemId: 'silver_pickaxe',
        icon: ITEMS['silver_pickaxe'].icon,
        name: ITEMS['silver_pickaxe'].name,
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
      damagePerSecond: 0.14
    },

    gold_miner: {
      requiredMiningLevel: 25,
      icon: 'goldMiner',
      name: 'gold miner',
      id: 'gold_miner',
      required: [{
        type: 'item',
        itemId: 'gold_pickaxe',
        icon: ITEMS['gold_pickaxe'].icon,
        name: ITEMS['gold_pickaxe'].name,
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
      damagePerSecond: 0.15
    },

    carbon_miner: {
      requiredMiningLevel: 30,
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
        amount: 100000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 30
      }],
      max: 3,
      damagePerSecond: 0.16
    },

    steel_miner: {
      requiredMiningLevel: 35,
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
        amount: 200000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 35
      }],
      max: 3,
      damagePerSecond: 0.17
    },

    platinum_miner: {
      requiredMiningLevel: 40,
      icon: 'platinumMiner',
      name: 'platinum miner',
      id: 'platinum_miner',
      required: [{
        type: 'item',
        itemId: 'platinum_pickaxe',
        icon: ITEMS['platinum_pickaxe'].icon,
        name: ITEMS['platinum_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 300000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 40
      }],
      max: 3,
      damagePerSecond: 0.18
    },


    titanium_miner: {
      requiredMiningLevel: 45,
      icon: 'titaniumMiner',
      name: 'titanium miner',
      id: 'titanium_miner',
      required: [{
        type: 'item',
        itemId: 'titanium_pickaxe',
        icon: ITEMS['titanium_pickaxe'].icon,
        name: ITEMS['titanium_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 400000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 45
      }],
      max: 3,
      damagePerSecond: 0.19
    },


    tungsten_miner: {
      requiredMiningLevel: 50,
      icon: 'tungstenMiner',
      name: 'tungsten miner',
      id: 'tungsten_miner',
      required: [{
        type: 'item',
        itemId: 'tungsten_pickaxe',
        icon: ITEMS['tungsten_pickaxe'].icon,
        name: ITEMS['tungsten_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 500000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 50
      }],
      max: 3,
      damagePerSecond: 0.20
    },

    obsidian_miner: {
      requiredMiningLevel: 55,
      icon: 'obsidianMiner',
      name: 'obsidian miner',
      id: 'obsidian_miner',
      required: [{
        type: 'item',
        itemId: 'obsidian_pickaxe',
        icon: ITEMS['obsidian_pickaxe'].icon,
        name: ITEMS['obsidian_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 600000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 55
      }],
      max: 3,
      damagePerSecond: 0.21
    },

    cobalt_miner: {
      requiredMiningLevel: 60,
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
        amount: 700000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 60
      }],
      max: 3,
      damagePerSecond: 0.22
    },

    mithril_miner: {
      requiredMiningLevel: 65,
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
        amount: 800000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 65
      }],
      max: 3,
      damagePerSecond: 0.23
    },

    adamantium_miner: {
      requiredMiningLevel: 70,
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
        amount: 900000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 70
      }],
      max: 3,
      damagePerSecond: 0.24
    },

    orichalcum_miner: {
      requiredMiningLevel: 75,
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
        amount: 1000000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 75
      }],
      max: 3,
      damagePerSecond: 0.25
    },

    orichalcum_miner: {
      requiredMiningLevel: 80,
      icon: 'orichalcumMiner',
      name: 'orichalcum miner',
      id: 'orichalcum_miner',
      required: [{
        type: 'item',
        itemId: 'meteorite_pickaxe',
        icon: ITEMS['meteorite_pickaxe'].icon,
        name: ITEMS['meteorite_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 1100000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 80
      }],
      max: 3,
      damagePerSecond: 0.26
    },

    fairy_steel_miner: {
      requiredMiningLevel: 85,
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
        amount: 1200000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 85
      }],
      max: 3,
      damagePerSecond: 0.27
    },

    elven_steel_miner: {
      requiredMiningLevel: 90,
      icon: 'elvenSteelMiner',
      name: 'elven steel miner',
      id: 'elven_steel_miner',
      required: [{
        type: 'item',
        itemId: 'elven_steel_pickaxe',
        icon: ITEMS['elven_steel_pickaxe'].icon,
        name: ITEMS['elven_steel_pickaxe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 1300000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 90
      }],
      max: 3,
      damagePerSecond: 0.28
    },

    cursed_miner: {
      requiredMiningLevel: 95,
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
        amount: 1400000,
        consumes: true
      }, {
        type: 'skill',
        name: 'mining',
        level: 95
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
      clusterIcon: 'stoneCluster',
      canCluster: true,
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
      clusterIcon: 'copperCluster',
      canCluster: true,
      name: 'copper',
      itemId: 'ore_copper',
      chance: 0.03
    },

    coal: {
      requiredLevel: 2,
      healthMax: 35,
      xp: 10,
      id: 'coal',
      icon: 'coal',
      name: 'coal',
      itemId: 'ore_coal',
      chance: 0.02
    },

    tin: {
      requiredLevel: 5,
      healthMax: 75,
      xp: 15,
      id: 'tin',
      icon: 'tin',
      name: 'tin',
      itemId: 'ore_tin',
      chance: 0.025
    },

    bronze: {
      requiredLevel: 10,
      healthMax: 150,
      xp: 20,
      id: 'bronze',
      icon: 'bronze',
      name: 'bronze',
      itemId: 'ore_bronze',
      chance: 0.02
    },

    iron: {
      requiredLevel: 15,
      healthMax: 300,
      xp: 35,
      id: 'iron',
      icon: 'iron',
      name: 'iron',
      itemId: 'ore_iron',
      chance: 0.008
    },

    silver: {
      requiredLevel: 20,
      healthMax: 500,
      xp: 50,
      id: 'silver',
      icon: 'silver',
      name: 'silver',
      itemId: 'ore_silver',
      chance: 0.004
    },

    silver_essence: {
      requiredLevel: 20,
      healthMax: 500,
      xp: 50,
      id: 'silver_essence',
      icon: 'silverEssence',
      name: 'silver_essence',
      itemId: 'silver_essence',
      chance: 0.00004
    },

    gold: {
      requiredLevel: 25,
      healthMax: 750,
      xp: 70,
      id: 'gold',
      icon: 'gold',
      name: 'gold',
      itemId: 'ore_gold',
      chance: 0.002
    },

    gold_essence: {
      requiredLevel: 25,
      healthMax: 750,
      xp: 70,
      id: 'gold_essence',
      icon: 'goldEssence',
      name: 'gold_essence',
      itemId: 'gold_essence',
      chance: 0.00002
    },

    carbon: {
      requiredLevel: 30,
      healthMax: 1250,
      xp: 90,
      id: 'carbon',
      icon: 'carbon',
      name: 'carbon',
      itemId: 'ore_carbon',
      chance: 0.0015
    },

    carbon_essence: {
      requiredLevel: 30,
      healthMax: 1250,
      xp: 90,
      id: 'carbon_essence',
      icon: 'carbonEssence',
      name: 'carbon_essence',
      itemId: 'carbon_essence',
      chance: 0.000015
    },

    steel: {
      requiredLevel: 35,
      healthMax: 2000,
      xp: 120,
      id: 'steel',
      icon: 'steel',
      name: 'steel',
      itemId: 'ore_steel',
      chance: 0.001
    },

    steel_essence: {
      requiredLevel: 35,
      healthMax: 2000,
      xp: 120,
      id: 'steel_essence',
      icon: 'steelEssence',
      name: 'steel_essence',
      itemId: 'steel_essence',
      chance: 0.00001
    },

    platinum: {
      requiredLevel: 40,
      healthMax: 4000,
      xp: 150,
      id: 'platinum',
      icon: 'platinum',
      name: 'platinum',
      itemId: 'ore_platinum',
      chance: 0.0009
    },

    platinum_essence: {
      requiredLevel: 40,
      healthMax: 4000,
      xp: 150,
      id: 'platinum_essence',
      icon: 'platinumEssence',
      name: 'platinum_essence',
      itemId: 'platinum_essence',
      chance: 0.000009
    },

    titanium: {
      requiredLevel: 45,
      healthMax: 6000,
      xp: 180,
      id: 'titanium',
      icon: 'titanium',
      name: 'titanium',
      itemId: 'ore_titanium',
      chance: 0.0008
    },

    titanium_essence: {
      requiredLevel: 45,
      healthMax: 6000,
      xp: 180,
      id: 'titanium_essence',
      icon: 'titaniumEssence',
      name: 'titanium_essence',
      itemId: 'titanium_essence',
      chance: 0.000008
    },

    tungsten: {
      requiredLevel: 50,
      healthMax: 8000,
      xp: 250,
      id: 'tungsten',
      icon: 'tungsten',
      name: 'tungsten',
      itemId: 'ore_tungsten',
      chance: 0.0007
    },

    tungsten_essence: {
      requiredLevel: 50,
      healthMax: 8000,
      xp: 250,
      id: 'tungsten_essence',
      icon: 'tungstenEssence',
      name: 'tungsten_essence',
      itemId: 'tungsten_essence',
      chance: 0.000007
    },

    obsidian: {
      requiredLevel: 55,
      healthMax: 11000,
      xp: 300,
      id: 'obsidian',
      icon: 'obsidian',
      name: 'obsidian',
      itemId: 'ore_obsidian',
      chance: 0.0006
    },

    obsidian_essence: {
      requiredLevel: 55,
      healthMax: 11000,
      xp: 300,
      id: 'obsidian_essence',
      icon: 'obsidianEssence',
      name: 'obsidian_essence',
      itemId: 'obsidian_essence',
      chance: 0.000006
    },

    cobalt: {
      requiredLevel: 60,
      healthMax: 14000,
      xp: 400,
      id: 'cobalt',
      icon: 'cobalt',
      name: 'cobalt',
      itemId: 'ore_cobalt',
      chance: 0.0005
    },

    cobalt_essence: {
      requiredLevel: 60,
      healthMax: 14000,
      xp: 400,
      id: 'cobalt_essence',
      icon: 'cobaltEssence',
      name: 'cobalt_essence',
      itemId: 'cobalt_essence',
      chance: 0.000005
    },

    mithril: {
      requiredLevel: 65,
      healthMax: 20000,
      xp: 500,
      id: 'mithril',
      icon: 'mithril',
      name: 'mithril',
      itemId: 'ore_mithril',
      chance: 0.0004
    },

    mithril_essence: {
      requiredLevel: 65,
      healthMax: 20000,
      xp: 500,
      id: 'mithril_essence',
      icon: 'mithrilEssence',
      name: 'mithril_essence',
      itemId: 'mithril_essence',
      chance: 0.000004
    },

    adamantium: {
      requiredLevel: 70,
      healthMax: 30000,
      xp: 600,
      id: 'adamantium',
      icon: 'adamantium',
      name: 'adamantium',
      itemId: 'ore_adamantium',
      chance: 0.0003
    },

    adamantium_essence: {
      requiredLevel: 70,
      healthMax: 30000,
      xp: 600,
      id: 'adamantium_essence',
      icon: 'adamantiumEssence',
      name: 'adamantium_essence',
      itemId: 'adamantium_essence',
      chance: 0.000003
    },

    orichalcum: {
      requiredLevel: 75,
      healthMax: 45000,
      xp: 700,
      id: 'orichalcum',
      icon: 'orichalcum',
      name: 'orichalcum',
      itemId: 'ore_orichalcum',
      chance: 0.0002
    },

    orichalcum_essence: {
      requiredLevel: 75,
      healthMax: 45000,
      xp: 700,
      id: 'orichalcum_essence',
      icon: 'orichalcumEssence',
      name: 'orichalcum_essence',
      itemId: 'orichalcum_essence',
      chance: 0.000002
    },

    meteorite: {
      requiredLevel: 80,
      healthMax: 60000,
      xp: 800,
      id: 'meteorite',
      icon: 'meteorite',
      name: 'meteorite',
      itemId: 'ore_meteorite',
      chance: 0.0001
    },

    meteorite_essence: {
      requiredLevel: 80,
      healthMax: 60000,
      xp: 800,
      id: 'meteorite_essence',
      icon: 'meteoriteEssence',
      name: 'meteorite_essence',
      itemId: 'meteorite_essence',
      chance: 0.000001
    },

    fairy_steel: {
      requiredLevel: 85,
      healthMax: 75000,
      xp: 900,
      id: 'fairy_steel',
      icon: 'fairySteel',
      name: 'fairy_steel',
      itemId: 'ore_fairy_steel',
      chance: 0.00009
    },

    fairy_steel_essence: {
      requiredLevel: 85,
      healthMax: 75000,
      xp: 900,
      id: 'fairy_steel_essence',
      icon: 'fairySteelEssence',
      name: 'fairy_steel_essence',
      itemId: 'fairy_steel_essence',
      chance: 0.0000009
    },

    elven_steel: {
      requiredLevel: 90,
      healthMax: 100000,
      xp: 1000,
      id: 'elven_steel',
      icon: 'elvenSteel',
      name: 'elven_steel',
      itemId: 'ore_elven_steel',
      chance: 0.00008
    },

    elven_steel_essence: {
      requiredLevel: 90,
      healthMax: 100000,
      xp: 1000,
      id: 'elven_steel_essence',
      icon: 'elvenSteelEssence',
      name: 'elven_steel_essence',
      itemId: 'elven_steel_essence',
      chance: 0.0000008
    },

    cursed: {
      requiredLevel: 95,
      healthMax: 125000,
      xp: 1250,
      id: 'cursed',
      icon: 'cursed',
      name: 'cursed',
      itemId: 'ore_cursed',
      chance: 0.00006
    },

    cursed_essence: {
      requiredLevel: 95,
      healthMax: 125000,
      xp: 1250,
      id: 'cursed_essence',
      icon: 'cursedEssence',
      name: 'cursed_essence',
      itemId: 'cursed_essence',
      chance: 0.0000006
    },

    // Do Later
    jade: {
      requiredLevel: 10,
      healthMax: 1000,
      xp: 333,
      id: 'jade',
      icon: 'jade',
      name: 'jade',
      itemId: 'jade',
      chance: 0.0000009
    },

    lapislazuli: {
      requiredLevel: 20,
      healthMax: 15000,
      xp: 1000,
      id: 'lapislazuli',
      icon: 'lapislazuli',
      name: 'lapislazuli',
      itemId: 'lapislazuli',
      chance: 0.0000008
    },

    sapphire: {
      requiredLevel: 30,
      healthMax: 45000,
      xp: 3000,
      id: 'sapphire',
      icon: 'sapphire',
      name: 'sapphire',
      itemId: 'sapphire',
      chance: 0.0000007
    },

    emerald: {
      requiredLevel: 40,
      healthMax: 135000,
      xp: 9000,
      id: 'emerald',
      icon: 'emerald',
      name: 'emerald',
      itemId: 'emerald',
      chance: 0.0000006
    },

    ruby: {
      requiredLevel: 50,
      healthMax: 350000,
      xp: 21000,
      id: 'ruby',
      icon: 'ruby',
      name: 'ruby',
      itemId: 'ruby',
      chance: 0.0000005
    },

    tanzanite: {
      requiredLevel: 60,
      healthMax: 800000,
      xp: 31000,
      id: 'tanzanite',
      icon: 'tanzanite',
      name: 'tanzanite',
      itemId: 'tanzanite',
      chance: 0.0000004
    }
  }
}
