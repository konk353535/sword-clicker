export const ENEMIES = {
  rat: {
    id: 'rat',
    icon: 'rat',
    name: 'rat',
    stats: {
      attack: 1,
      attackMax: 2,
      attackSpeed: 0.2,
      accuracy: 1,
      health: 10,
      maxHealth: 10,
      defense: 1,
      armor: 1
    },
    rewards: [{
      type: 'item',
      itemId: 'rat_head',
      amount: 1,
      chance: 1 / 1
    }]
  }
}
