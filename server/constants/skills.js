export const SKILLS = {
  mining: {
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5));
    }
  },

  crafting :{
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5));
    }
  }
}
