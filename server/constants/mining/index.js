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
    damagePerSecond: 0.1 // Should be 0.1
  },
  ores: {
    stone: {
      requiredLevel: 1,
      maxHealth: 5,
      xp: 2,
      id: 'stone',
      icon: 'stone',
      name: 'stone',
      itemId: 'ore_stone',
      chance: 1
    },

    copper: {
      requiredLevel: 2,
      maxHealth: 15,
      xp: 4,
      id: 'copper',
      icon: 'copper',
      name: 'copper',
      itemId: 'ore_copper',
      chance: 0.3
    },

    coal: {
      requiredLevel: 3,
      maxHealth: 40,
      xp: 18,
      id: 'coal',
      icon: 'coal',
      name: 'coal',
      itemId: 'ore_coal',
      chance: 0.1
    },

    iron: {
      requiredLevel: 6,
      maxHealth: 250,
      xp: 80,
      id: 'iron',
      icon: 'iron',
      name: 'iron',
      itemId: 'ore_iron',
      chance: 0.01
    }
  }
}
