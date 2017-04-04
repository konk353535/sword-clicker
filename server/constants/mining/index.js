import { MINING_ITEMS as miningItems } from './items';

export const MINING_ITEMS = miningItems;

export const MINING = {
  prospecting: {
    chance: (1 / 20), // Should be 1 / 20
    max: 10,
    cost(currentProspectorsCount) {
      return 10 + ((currentProspectorsCount - 1) * 60) * (currentProspectorsCount - 1);
    }
  },
  miners: {
    max: 10,
    cost(currentMinersCount) {
      return 10 + ((currentMinersCount - 1) * 40) * (currentMinersCount - 1);
    },
    damagePerSecond: 0.08 // Should be 0.1
  },
  ores: {
    stone: {
      requiredLevel: 1,
      healthMax: 6,
      xp: 2,
      id: 'stone',
      icon: 'stone',
      name: 'stone',
      itemId: 'ore_stone',
      chance: 1
    },

    copper: {
      requiredLevel: 2,
      healthMax: 15,
      xp: 4,
      id: 'copper',
      icon: 'copper',
      name: 'copper',
      itemId: 'ore_copper',
      chance: 0.35
    },

    coal: {
      requiredLevel: 3,
      healthMax: 50,
      xp: 10,
      id: 'coal',
      icon: 'coal',
      name: 'coal',
      itemId: 'ore_coal',
      chance: 0.13
    },

    iron: {
      requiredLevel: 6,
      healthMax: 125,
      xp: 25,
      id: 'iron',
      icon: 'iron',
      name: 'iron',
      itemId: 'ore_iron',
      chance: 0.07
    },

    steel: {
      requiredLevel: 8,
      healthMax: 250,
      xp: 50,
      id: 'steel',
      icon: 'steel',
      name: 'steel',
      itemId: 'ore_steel',
      chance: 0.07
    }
  }
}
