export const ACHIEVEMENTS = {
  'pq_10': {
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

  'pq_40': {
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

  'pq_60': {
    name: 'PQ 60',
    hidden: false,
    description: 'Reach level 60 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 60;
    },
    rewards: [{
      type: 'gold',
      amount: 100000
    }]
  },

  'pq_70': {
    name: 'PQ 70',
    hidden: false,
    description: 'Reach level 70 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 70;
    },
    rewards: [{
      type: 'item',
      itemId: 'jade',
      amount: 1
    }, {
      type: 'gold',
      amount: 50000
    }]
  },

  'pq_80': {
    name: 'PQ 80',
    hidden: false,
    description: 'Reach level 80 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 80;
    },
    rewards: [{
      type: 'item',
      itemId: 'blue_wizard_hat',
      amount: 1
    }, {
      type: 'item',
      itemId: 'blue_wizard_shirt',
      amount: 1
    }, {
      type: 'item',
      itemId: 'blue_wizard_shorts',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 10000
    }]
  },

  'pq_90': {
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

  'pq_100': {
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

  'pq_110': {
    name: 'PQ 110',
    hidden: false,
    description: 'Reach level 110 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 110;
    },
    rewards: [{
      type: 'item',
      itemId: 'lapislazuli',
      amount: 1
    }, {
      type: 'gold',
      amount: 100000
    }]
  },

  'pq_120': {
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

  'pq_150': {
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
  }
}
