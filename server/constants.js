export const SKILLS = {
  mining: {
    xpToLevel(level) {
      return level * 10 * 10;
    }
  }
}

export const ITEMS = {
  ore_stone: {
    id: 'ore_stone',
    icon: 'stone',
    category: 'mining'
  }
}

export const MINING = {
  prospecting: {
    chance: (1 / 60)
  },
  ores: {
    stone: {
      requiredLevel: 1,
      maxHealth: 10,
      id: 'stone',
      icon: 'stone',
      itemId: 'ore_stone'
    }
  }
}
