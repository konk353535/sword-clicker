export const BATTLES = {

  xpDistribution(weaponType) {
    const weaponDistributions = {
      'dagger': {
        attack: 0.5,
        health: 0.5,
        defense: 0
      },

      'spear': {
        defense: 0.5,
        health: 0.5,
        attack: 0
      },

      'staff': {
        health: 1.0,
        defense: 0,
        attack: 0
      },

      'wand': {
        health: 1.0,
        defense: 0,
        attack: 0
      },

      'longSword': {
        attack: 0.5,
        health: 0.5,
        defense: 0
      },

      'shortSword': {
        attack: 0.25,
        defense: 0.25,
        health: 0.5
      },

      'battleAxe': {
        attack: 0.5,
        health: 0.5,
        defense: 0
      }
    }

    return weaponDistributions[weaponType]
  },

  xpGain(stats, buffs) {
    if (!buffs) {
      buffs = [];
    }

    const health = stats.health || 0;
    const armor = stats.armor || 0;
    const accuracy = stats.accuracy > 1 ? stats.accuracy : 1;
    const attackSpeed = stats.attackSpeed || 0;
    const attack = stats.attack || 0;
    const attackMax = stats.attackMax || 0;
    const defense = stats.defense || 0;
    const magicArmor = stats.magicArmor || 0;
    const dmgReduction = this.dmgReduction(armor);
    const magicDmgReduction = this.dmgReduction(magicArmor);

    const effectiveDefense = health * (1 + ((dmgReduction + magicDmgReduction) / 1.5)) * (1 + (defense / 50));
    const effectiveOffense = ((attack + attackMax) / 2) * (1 + attackSpeed) * (1 + (accuracy / 50));
    return Math.round((effectiveOffense * 1.25) + (effectiveDefense * 0.75) * (1 + (buffs.length / 2)));
  },

  dmgReduction(armor) {
    return armor / (armor + 100);
  },

  tickDuration: 250, // How long each tick lasts

  maxBossPartySize: 5,

  maxTowerPartySize: 5
}
