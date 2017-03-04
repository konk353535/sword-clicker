export const MINING = {
  prospecting: {
    chance: (1 / 30)
  },
  miners: {
    max: 10,
    cost(currentMinersCount) {
      if (currentMinersCount === 0) {
        return 10;
      }

      return 10 + ((currentMinersCount * 50) * currentMinersCount);
    },
    damagePerSecond: 0.1 // Should be 0.1
  },
  ores: {
    stone: {
      requiredLevel: 1,
      maxHealth: 3,
      xp: 1,
      id: 'stone',
      icon: 'stone',
      name: 'stone',
      itemId: 'ore_stone',
      chance: 1
    },

    copper: {
      requiredLevel: 1,
      maxHealth: 10,
      xp: 2,
      id: 'copper',
      icon: 'copper',
      name: 'copper',
      itemId: 'ore_copper',
      chance: 0.3
    },

    coal: {
      requiredLevel: 2,
      maxHealth: 50,
      xp: 10,
      id: 'coal',
      icon: 'coal',
      name: 'coal',
      itemId: 'ore_coal',
      chance: 0.1
    }
  }
}
