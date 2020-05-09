console.log('exporting achievement/pq.js PQ_ACHIEVEMENTS');
export const PQ_ACHIEVEMENTS = {
  'pq_3': {
    kind: 'pq',
    name: 'PQ 3',
    hidden: false,
    description: 'Reach level 3 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 3;
    },
    rewards: [{
      type: 'gems',
      amount: 20
    }]
  },

  'pq_7': {
    kind: 'pq',
    name: 'PQ 7',
    hidden: false,
    description: 'Reach level 7 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 7;
    },
    rewards: [{
      type: 'gems',
      amount: 35
    }]
  },

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

  'pq_15': {
    kind: 'pq',
    name: 'PQ 15',
    hidden: false,
    description: 'Reach level 15 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 15;
    },
    rewards: [{
      type: 'gems',
      amount: 50
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

  'pq_25': {
    kind: 'pq',
    name: 'PQ 25',
    hidden: false,
    description: 'Reach level 25 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 25;
    },
    rewards: [{
      type: 'gems',
      amount: 70
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

  'pq_45': {
    kind: 'pq',
    name: 'PQ 45',
    hidden: false,
    description: 'Reach level 45 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 45;
    },
    rewards: [{
      type: 'gems',
      amount: 100
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

  'pq_55': {
    kind: 'pq',
    name: 'PQ 55',
    hidden: false,
    description: 'Reach level 55 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 55;
    },
    rewards: [{
      type: 'gems',
      amount: 100
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

  'pq_75': {
    kind: 'pq',
    name: 'PQ 75',
    hidden: false,
    description: 'Reach level 75 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 75;
    },
    rewards: [{
      type: 'gems',
      amount: 100
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

  'pq_85': {
    kind: 'pq',
    name: 'PQ 85',
    hidden: false,
    description: 'Reach level 85 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 85;
    },
    rewards: [{
      type: 'gems',
      amount: 100
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

  'pq_125_2': {
    kind: 'pq',
    name: 'PQ 125',
    hidden: false,
    description: 'Reach level 125 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 125;
    },
    rewards: [{
      type: 'gems',
      amount: 175
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

  'pq_175': {
    kind: 'pq',
    name: 'PQ 175',
    hidden: false,
    description: 'Reach level 175 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 175;
    },
    rewards: [{
      type: 'gems',
      amount: 225
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
  },

  'pq_225': {
    kind: 'pq',
    name: 'PQ 225',
    hidden: false,
    description: 'Reach level 225 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 225;
    },
    rewards: [{
      type: 'gems',
      amount: 275
    }]
  },

  'pq_250': {
    kind: 'pq',
    name: 'PQ 250',
    hidden: false,
    description: 'Reach level 250 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 250;
    },
    rewards: [{
      type: 'gems',
      amount: 300
    }]
  },

  'pq_275': {
    kind: 'pq',
    name: 'PQ 275',
    hidden: false,
    description: 'Reach level 275 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 275;
    },
    rewards: [{
      type: 'gems',
      amount: 325
    }]
  },

  'pq_300': {
    kind: 'pq',
    name: 'PQ 300',
    hidden: false,
    description: 'Reach level 300 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 300;
    },
    rewards: [{
      type: 'gems',
      amount: 350
    }]
  },

  'pq_325': {
    kind: 'pq',
    name: 'PQ 325',
    hidden: false,
    description: 'Reach level 325 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 325;
    },
    rewards: [{
      type: 'gems',
      amount: 375
    }]
  },

  'pq_350': {
    kind: 'pq',
    name: 'PQ 350',
    hidden: false,
    description: 'Reach level 350 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 350;
    },
    rewards: [{
      type: 'gems',
      amount: 400
    }]
  },
};
