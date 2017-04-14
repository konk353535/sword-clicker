import { MINING_ITEMS as miningItems } from './items';

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
    max: 10,
    cost(currentMinersCount) {
      return 10 + ((currentMinersCount - 1) * 30) * (currentMinersCount - 1) * (currentMinersCount - 1);
    },
    damagePerSecond: 0.07
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
      healthMax: 30,
      xp: 3,
      id: 'copper',
      icon: 'copper',
      name: 'copper',
      itemId: 'ore_copper',
      chance: 0.3
    },

    coal: {
      requiredLevel: 2,
      healthMax: 100,
      xp: 10,
      id: 'coal',
      icon: 'coal',
      name: 'coal',
      itemId: 'ore_coal',
      chance: 0.13
    },

    iron: {
      requiredLevel: 5,
      healthMax: 500,
      xp: 40,
      id: 'iron',
      icon: 'iron',
      name: 'iron',
      itemId: 'ore_iron',
      chance: 0.04
    },

    steel: {
      requiredLevel: 10,
      healthMax: 2000,
      xp: 100,
      id: 'steel',
      icon: 'steel',
      name: 'steel',
      itemId: 'ore_steel',
      chance: 0.02
    },

    carbon: {
      requiredLevel: 15,
      healthMax: 5000,
      xp: 350,
      id: 'carbon',
      icon: 'carbon',
      name: 'carbon',
      itemId: 'ore_carbon',
      chance: 0.005
    },

    mithril: {
      requiredLevel: 20,
      healthMax: 10000,
      xp: 700,
      id: 'mithril',
      icon: 'mithril',
      name: 'mithril',
      itemId: 'ore_mithril',
      chance: 0.001
    }
  }
}
