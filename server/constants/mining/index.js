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
      icon: 'stoneProspector.svg',
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
      icon: 'copperProspector.svg',
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
      icon: 'carbonProspector.svg',
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
      icon: 'tinProspector.svg',
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
      icon: 'bronzeProspector.svg',
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
      icon: 'ironProspector.svg',
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
      icon: 'silverProspector.svg',
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
      icon: 'goldProspector.svg',
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
      icon: 'carbonProspector.svg',
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
      icon: 'steelProspector.svg',
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
      icon: 'platinumProspector.svg',
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
      icon: 'titaniumProspector.svg',
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
      icon: 'tungstenProspector.svg',
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
      icon: 'obsidianProspector.svg',
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
      icon: 'cobaltProspector.svg',
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
      icon: 'mithrilProspector.svg',
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
      icon: 'adamantiumProspector.svg',
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
      icon: 'orichalcumProspector.svg',
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
      icon: 'meteoriteProspector.svg',
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
      icon: 'fairySteelProspector.svg',
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
      icon: 'fairySteelProspector.svg',
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
      icon: 'cursedProspector.svg',
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
    xpToLevel(level) {
      if (level > 5) {
        return (Math.pow(level, 3) + 9) * 2;
      }
      return Math.pow(level, 3) + 9;
    },
    primitive_miner: {
      requiredMiningLevel: 1,
      icon: 'primitiveMiner.svg',
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
      icon: 'copperMiner.svg',
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
      icon: 'tinMiner.svg',
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
      icon: 'bronzeMiner.svg',
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
      icon: 'ironMiner.svg',
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
      icon: 'silverMiner.svg',
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
      icon: 'goldMiner.svg',
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
      icon: 'carbonMiner.svg',
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
      icon: 'steelMiner.svg',
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
      icon: 'platinumMiner.svg',
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
      icon: 'titaniumMiner.svg',
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
      icon: 'tungstenMiner.svg',
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
      icon: 'obsidianMiner.svg',
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
      icon: 'cobaltMiner.svg',
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
      icon: 'mithrilMiner.svg',
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
      icon: 'adamantiumMiner.svg',
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
      icon: 'orichalcumMiner.svg',
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
      icon: 'orichalcumMiner.svg',
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
      icon: 'fairySteelMiner.svg',
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
      icon: 'elvenSteelMiner.svg',
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
      icon: 'cursedMiner.svg',
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
      icon: 'stone.png',
      clusterIcon: 'stoneCluster.png',
      canCluster: true,
      name: 'stone',
      itemId: 'ore_stone',
      chance: 0.06
    },

    copper: {
      requiredLevel: 2,
      healthMax: 20,
      xp: 4,
      id: 'copper',
      icon: 'copper.png',
      clusterIcon: 'copperCluster.png',
      canCluster: true,
      name: 'copper',
      itemId: 'ore_copper',
      chance: 0.03
    },

    coal: {
      requiredLevel: 2,
      healthMax: 35,
      xp: 8,
      id: 'coal',
      clusterIcon: 'coalCluster.png',
      canCluster: true,
      icon: 'coal.png',
      name: 'coal',
      itemId: 'ore_coal',
      chance: 0.02
    },

    tin: {
      requiredLevel: 5,
      healthMax: 75,
      xp: 13,
      id: 'tin',
      clusterIcon: 'tinCluster.png',
      canCluster: true,
      icon: 'tin.png',
      name: 'tin',
      itemId: 'ore_tin',
      chance: 0.025
    },

    bronze: {
      requiredLevel: 10,
      healthMax: 150,
      xp: 17,
      clusterIcon: 'bronzeCluster.png',
      canCluster: true,
      id: 'bronze',
      icon: 'bronze.png',
      name: 'bronze',
      itemId: 'ore_bronze',
      chance: 0.02
    },

    iron: {
      requiredLevel: 15,
      healthMax: 300,
      xp: 33,
      id: 'iron',
      icon: 'iron.png',
      name: 'iron',
      itemId: 'ore_iron',
      chance: 0.008
    },

    silver: {
      requiredLevel: 20,
      healthMax: 500,
      xp: 50,
      id: 'silver',
      icon: 'silver.png',
      name: 'silver',
      itemId: 'ore_silver',
      chance: 0.004
    },

    silver_essence: {
      requiredLevel: 20,
      healthMax: 500,
      xp: 50,
      id: 'silver_essence',
      icon: 'silverEssence.png',
      name: 'silver_essence',
      itemId: 'silver_essence',
      chance: 0.00004
    },

    gem: {
      requiredLevel: 1,
      healthMax: 150,
      xp: 40,
      id: 'gem',
      icon: 'gem.png',
      name: 'gem',
      itemId: 'gem',
      chance: 0.002
    },

    gold: {
      requiredLevel: 25,
      healthMax: 750,
      xp: 70,
      id: 'gold',
      icon: 'gold.png',
      name: 'gold',
      itemId: 'ore_gold',
      chance: 0.002
    },

    gold_essence: {
      requiredLevel: 25,
      healthMax: 750,
      xp: 70,
      id: 'gold_essence',
      icon: 'goldEssence.png',
      name: 'gold_essence',
      itemId: 'gold_essence',
      chance: 0.00002
    },

    carbon: {
      requiredLevel: 30,
      healthMax: 1250,
      xp: 90,
      id: 'carbon',
      icon: 'carbon.png',
      name: 'carbon',
      itemId: 'ore_carbon',
      chance: 0.0015
    },

    carbon_essence: {
      requiredLevel: 30,
      healthMax: 1250,
      xp: 90,
      id: 'carbon_essence',
      icon: 'carbonEssence.png',
      name: 'carbon_essence',
      itemId: 'carbon_essence',
      chance: 0.000015
    },

    steel: {
      requiredLevel: 35,
      healthMax: 2000,
      xp: 120,
      id: 'steel',
      icon: 'steel.png',
      name: 'steel',
      itemId: 'ore_steel',
      chance: 0.001
    },

    steel_essence: {
      requiredLevel: 35,
      healthMax: 2000,
      xp: 120,
      id: 'steel_essence',
      icon: 'steelEssence.png',
      name: 'steel_essence',
      itemId: 'steel_essence',
      chance: 0.00001
    },

    platinum: {
      requiredLevel: 40,
      healthMax: 4000,
      xp: 150,
      id: 'platinum',
      icon: 'platinum.png',
      name: 'platinum',
      itemId: 'ore_platinum',
      chance: 0.0009
    },

    platinum_essence: {
      requiredLevel: 40,
      healthMax: 4000,
      xp: 150,
      id: 'platinum_essence',
      icon: 'platinumEssence.png',
      name: 'platinum_essence',
      itemId: 'platinum_essence',
      chance: 0.000009
    },

    titanium: {
      requiredLevel: 45,
      healthMax: 6000,
      xp: 180,
      id: 'titanium',
      icon: 'titanium.png',
      name: 'titanium',
      itemId: 'ore_titanium',
      chance: 0.0008
    },

    titanium_essence: {
      requiredLevel: 45,
      healthMax: 6000,
      xp: 180,
      id: 'titanium_essence',
      icon: 'titaniumEssence.png',
      name: 'titanium_essence',
      itemId: 'titanium_essence',
      chance: 0.000008
    },

    tungsten: {
      requiredLevel: 50,
      healthMax: 8000,
      xp: 250,
      id: 'tungsten',
      icon: 'tungsten.png',
      name: 'tungsten',
      itemId: 'ore_tungsten',
      chance: 0.0007
    },

    tungsten_essence: {
      requiredLevel: 50,
      healthMax: 8000,
      xp: 250,
      id: 'tungsten_essence',
      icon: 'tungstenEssence.png',
      name: 'tungsten_essence',
      itemId: 'tungsten_essence',
      chance: 0.000007
    },

    obsidian: {
      requiredLevel: 55,
      healthMax: 11000,
      xp: 300,
      id: 'obsidian',
      icon: 'obsidian.png',
      name: 'obsidian',
      itemId: 'ore_obsidian',
      chance: 0.0006
    },

    obsidian_essence: {
      requiredLevel: 55,
      healthMax: 11000,
      xp: 300,
      id: 'obsidian_essence',
      icon: 'obsidianEssence.png',
      name: 'obsidian_essence',
      itemId: 'obsidian_essence',
      chance: 0.000006
    },

    cobalt: {
      requiredLevel: 60,
      healthMax: 14000,
      xp: 400,
      id: 'cobalt',
      icon: 'cobalt.png',
      name: 'cobalt',
      itemId: 'ore_cobalt',
      chance: 0.0005
    },

    cobalt_essence: {
      requiredLevel: 60,
      healthMax: 14000,
      xp: 400,
      id: 'cobalt_essence',
      icon: 'cobaltEssence.png',
      name: 'cobalt_essence',
      itemId: 'cobalt_essence',
      chance: 0.000005
    },

    mithril: {
      requiredLevel: 65,
      healthMax: 20000,
      xp: 500,
      id: 'mithril',
      icon: 'mithril.png',
      name: 'mithril',
      itemId: 'ore_mithril',
      chance: 0.0004
    },

    mithril_essence: {
      requiredLevel: 65,
      healthMax: 20000,
      xp: 500,
      id: 'mithril_essence',
      icon: 'mithrilEssence.png',
      name: 'mithril_essence',
      itemId: 'mithril_essence',
      chance: 0.000004
    },

    adamantium: {
      requiredLevel: 70,
      healthMax: 30000,
      xp: 600,
      id: 'adamantium',
      icon: 'adamantium.png',
      name: 'adamantium',
      itemId: 'ore_adamantium',
      chance: 0.0003
    },

    adamantium_essence: {
      requiredLevel: 70,
      healthMax: 30000,
      xp: 600,
      id: 'adamantium_essence',
      icon: 'adamantiumEssence.png',
      name: 'adamantium_essence',
      itemId: 'adamantium_essence',
      chance: 0.000003
    },

    orichalcum: {
      requiredLevel: 75,
      healthMax: 45000,
      xp: 700,
      id: 'orichalcum',
      icon: 'orichalcum.png',
      name: 'orichalcum',
      itemId: 'ore_orichalcum',
      chance: 0.0002
    },

    orichalcum_essence: {
      requiredLevel: 75,
      healthMax: 45000,
      xp: 700,
      id: 'orichalcum_essence',
      icon: 'orichalcumEssence.png',
      name: 'orichalcum_essence',
      itemId: 'orichalcum_essence',
      chance: 0.000002
    },

    meteorite: {
      requiredLevel: 80,
      healthMax: 60000,
      xp: 800,
      id: 'meteorite',
      icon: 'meteorite.png',
      name: 'meteorite',
      itemId: 'ore_meteorite',
      chance: 0.0001
    },

    meteorite_essence: {
      requiredLevel: 80,
      healthMax: 60000,
      xp: 800,
      id: 'meteorite_essence',
      icon: 'meteoriteEssence.png',
      name: 'meteorite_essence',
      itemId: 'meteorite_essence',
      chance: 0.000001
    },

    fairy_steel: {
      requiredLevel: 85,
      healthMax: 75000,
      xp: 900,
      id: 'fairy_steel',
      icon: 'fairySteel.png',
      name: 'fairy_steel',
      itemId: 'ore_fairy_steel',
      chance: 0.00009
    },

    fairy_steel_essence: {
      requiredLevel: 85,
      healthMax: 75000,
      xp: 900,
      id: 'fairy_steel_essence',
      icon: 'fairySteelEssence.png',
      name: 'fairy_steel_essence',
      itemId: 'fairy_steel_essence',
      chance: 0.0000009
    },

    elven_steel: {
      requiredLevel: 90,
      healthMax: 100000,
      xp: 1000,
      id: 'elven_steel',
      icon: 'elvenSteel.png',
      name: 'elven_steel',
      itemId: 'ore_elven_steel',
      chance: 0.00008
    },

    elven_steel_essence: {
      requiredLevel: 90,
      healthMax: 100000,
      xp: 1000,
      id: 'elven_steel_essence',
      icon: 'elvenSteelEssence.png',
      name: 'elven_steel_essence',
      itemId: 'elven_steel_essence',
      chance: 0.0000008
    },

    cursed: {
      requiredLevel: 95,
      healthMax: 125000,
      xp: 1250,
      id: 'cursed',
      icon: 'cursed.png',
      name: 'cursed',
      itemId: 'ore_cursed',
      chance: 0.00006
    },

    cursed_essence: {
      requiredLevel: 95,
      healthMax: 125000,
      xp: 1250,
      id: 'cursed_essence',
      icon: 'cursedEssence.png',
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
      icon: 'jade.png',
      name: 'jade',
      isGem: true,
      itemId: 'jade',
      chance: 0.0000009
    },

    lapislazuli: {
      requiredLevel: 20,
      healthMax: 15000,
      xp: 1000,
      id: 'lapislazuli',
      icon: 'lapislazuli.png',
      name: 'lapislazuli',
      isGem: true,
      itemId: 'lapislazuli',
      chance: 0.0000008
    },

    sapphire: {
      requiredLevel: 30,
      healthMax: 45000,
      xp: 3000,
      id: 'sapphire',
      icon: 'sapphire.png',
      name: 'sapphire',
      itemId: 'sapphire',
      isGem: true,
      chance: 0.0000007
    },

    emerald: {
      requiredLevel: 40,
      healthMax: 135000,
      xp: 9000,
      id: 'emerald',
      icon: 'emerald.png',
      name: 'emerald',
      itemId: 'emerald',
      isGem: true,
      chance: 0.0000006
    },

    ruby: {
      requiredLevel: 50,
      healthMax: 350000,
      xp: 21000,
      id: 'ruby',
      icon: 'ruby.png',
      name: 'ruby',
      itemId: 'ruby',
      isGem: true,
      chance: 0.0000005
    },

    tanzanite: {
      requiredLevel: 60,
      healthMax: 800000,
      xp: 31000,
      id: 'tanzanite',
      icon: 'tanzanite.png',
      name: 'tanzanite',
      isGem: true,
      itemId: 'tanzanite',
      chance: 0.0000004
    }
  }
}
