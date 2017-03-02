export const SKILLS = {
  mining: {
    xpToLevel(level) {
      return level * 10 * 10;
    }
  }
}

export const MINING = {
  ores: {
    stone: {
      requiredLevel: 1,
      maxHealth: 10,
      id: 'stone',
      icon: 'stone'
    }
  }
}
