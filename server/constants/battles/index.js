export const BATTLES = {

  xpDistribution(weaponType) {
    const weaponDistributions = {
      'dagger': {
        attack: 0.5,
        health: 0.5
      },

      'spear': {
        defense: 0.5,
        health: 0.5
      },

      'longSword': {
        attack: 0.5,
        health: 0.5
      },

      'shortSword': {
        attack: 0.25,
        defense: 0.25,
        health: 0.5
      },

      'battleAxe': {
        attack: 0.5,
        health: 0.5
      }
    }

    return weaponDistributions[weaponType]
  },

  xpGain(stats) {
    const health = stats.health || 0;
    const armor = stats.armor || 0;
    const accuracy = stats.accuracy > 1 ? stats.accuracy : 1;
    const attackSpeed = stats.attackSpeed || 0;
    const attack = stats.attack || 0;
    const attackMax = stats.attackMax || 0;
    const defense = stats.defense || 0;
    const dmgReduction = this.dmgReduction(armor);

    const effectiveDefense = health * (1 + dmgReduction) * (1 + (defense / 50));
    const effectiveOffense = ((attack + attackMax) / 2) * (1 + attackSpeed) * (1 + (accuracy / 50));
    return Math.round((effectiveOffense * 1) + (effectiveDefense * 0.5));
  },

  dmgReduction(armor) {
    return armor / (armor + 100);
  },

  tickDuration: 200, // How long each tick lasts

  rat_pack: {
    enemies: [{
      id: 'rat',
      amount: 3
    }]
  }

}
