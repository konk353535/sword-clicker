export const BATTLES = {

  xpDistribution(weaponType) {
    if (weaponType === 'dagger') {
      return {
        attack: 0.5,
        health: 0.5
      }
    } else if (weaponType === 'spear' ){
      return {
        defense: 0.5,
        health: 0.5
      }
    }
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

    const effectiveDefense = health * (1 + dmgReduction) * (1 + (defense / 100));
    const effectiveOffense = ((attack + attackMax) / 2) * (1 + attackSpeed) * (1 + (accuracy / 100));
    return Math.round(5 + effectiveOffense + effectiveDefense);
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
