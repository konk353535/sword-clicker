console.log('exporting achievement/pq.js PQ_ACHIEVEMENTS');
export const PQ_ACHIEVEMENTS = {
  'pq_10': {
    kind: 'pq',
    name: 'PQ 10',
    hidden: false,
    description: 'Reach level 10 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 10;
    },
    rewards: [{
      type: 'gold',
      amount: 5000
    }]
  },

  'pq_20': {
    kind: 'pq',
    name: 'PQ 20',
    hidden: false,
    description: 'Reach level 20 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 20;
    },
    rewards: [{
      type: 'item',
      itemId: 'brown_wizard_hat',
      amount: 1
    }, { 
      type: 'item',
      itemId: 'oak_staff',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 2000
    }]
  },

  'pq_30': {
    kind: 'pq',
    name: 'PQ 30',
    hidden: false,
    description: 'Reach level 30 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 30;
    },
    rewards: [{
      type: 'gold',
      amount: 40000
    }]
  },

  /* Rebalanced, pq70 now pq35 */
  'pq_70': {
    kind: 'pq',
    name: 'PQ 35',
    hidden: false,
    description: 'Reach level 35 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 35;
    },
    rewards: [{
      type: 'item',
      itemId: 'jade',
      amount: 1
    }]
  },


  'pq_40': {
    kind: 'pq',
    name: 'PQ 40',
    hidden: false,
    description: 'Reach level 40 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 40;
    },
    rewards: [{
      type: 'item',
      itemId: 'silver_essence',
      amount: 4
    }, {
      type: 'xp',
      skill: 'attack',
      amount: 25000
    }, {
      type: 'xp',
      skill: 'defense',
      amount: 25000
    }]
  },

  'pq_50': {
    kind: 'pq',
    name: 'PQ 50',
    hidden: false,
    description: 'Reach level 50 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 50;
    },
    rewards: [{
      type: 'item',
      itemId: 'lavender',
      amount: 2
    }, {
      type: 'xp',
      skill: 'crafting',
      amount: 50000
    }]
  },

  /* Rebalanced, Jade from pq70 moved to 35 */
  'pq_70_2': {
    kind: 'pq',
    name: 'PQ 60',
    hidden: false,
    description: 'Reach level 60 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 60;
    },
    rewards: [{
      type: 'gold',
      amount: 50000
    }]
  },

  'pq_110': {
    kind: 'pq',
    name: 'PQ 65',
    hidden: false,
    description: 'Reach level 65 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 65;
    },
    rewards: [{
      type: 'item',
      itemId: 'lapislazuli',
      amount: 1
    }, {
      type: 'item',
      itemId: 'ore_carbon',
      amount: 2500
    }]
  },

  'pq_60': {
    kind: 'pq',
    name: 'PQ 70',
    hidden: false,
    description: 'Reach level 70 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 70;
    },
    rewards: [{
      type: 'gold',
      amount: 100000
    }]
  },

  'pq_80_new': {
    kind: 'pq',
    name: 'PQ 80',
    hidden: false,
    description: 'Reach level 80 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 80;
    },
    rewards: [{
      type: 'item',
      itemId: 'carbon_knife',
      amount: 1
    }, {
      type: 'item',
      itemId: 'carbon_horned_helmet',
      amount: 1
    }, {
      type: 'item',
      itemId: 'carbon_broad_sword',
      amount: 1
    }, {
      type: 'xp',
      skill: 'attack',
      amount: 25000
    }, {
      type: 'xp',
      skill: 'health',
      amount: 25000
    }]
  },

  'pq_90': {
    kind: 'pq',
    name: 'PQ 90',
    hidden: false,
    description: 'Reach level 90 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 90;
    },
    rewards: [{
      type: 'gold',
      amount: 200000
    }]
  },

  'pq_95': {
    kind: 'pq',
    name: 'PQ 95',
    hidden: false,
    description: 'Reach level 95 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 95;
    },
    rewards: [{
      type: 'item',
      itemId: 'sapphire',
      amount: 1
    }]
  },

  'pq_100': {
    kind: 'pq',
    name: 'PQ 100',
    hidden: false,
    description: 'Reach level 100 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 100;
    },
    rewards: [{
      type: 'item',
      itemId: 'enhancer_key',
      amount: 3
    }, {
      type: 'item',
      itemId: 'lemonade',
      amount: 5
    }, {
      type: 'xp',
      skill: 'crafting',
      amount: 200000
    }]
  },

  'pq_110_2': {
    kind: 'pq',
    name: 'PQ 110',
    hidden: false,
    description: 'Reach level 110 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 110;
    },
    rewards: [{
      type: 'gold',
      amount: 300000
    }]
  },

  'pq_120': {
    kind: 'pq',
    name: 'PQ 120',
    hidden: false,
    description: 'Reach level 120 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 120;
    },
    rewards: [{
      type: 'gold',
      amount: 400000
    }]
  },

  'pq_125': {
    kind: 'pq',
    name: 'PQ 130',
    hidden: false,
    description: 'Reach level 130 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 130;
    },
    rewards: [{
      type: 'item',
      itemId: 'emerald',
      amount: 1
    }]
  },

  'pq_150': {
    kind: 'pq',
    name: 'PQ 150',
    hidden: false,
    description: 'Reach level 150 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 150;
    },
    rewards: [{
      type: 'gold',
      amount: 750000
    }]
  },

  'pq_155': { // keep the ID the same, move the reward
    kind: 'pq',
    name: 'PQ 170',
    hidden: false,
    description: 'Reach level 170 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 170;
    },
    rewards: [{
      type: 'item',
      itemId: 'ruby',
      amount: 1
    }]
  },

  'pq_185': {
    kind: 'pq',
    name: 'PQ 185',
    hidden: false,
    description: 'Reach level 185 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 185;
    },
    rewards: [{
      type: 'item',
      itemId: 'tanzanite',
      amount: 1
    }]
  },

  'pq_200': {
    kind: 'pq',
    name: 'PQ 200',
    hidden: false,
    description: 'Reach level 200 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 200;
    },
    rewards: [{
      type: 'item',
      itemId: 'fireopal',
      amount: 1
    }]
  }
};
