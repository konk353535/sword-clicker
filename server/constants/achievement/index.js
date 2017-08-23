export const ACHIEVEMENTS = {
  'pq_5': {
    name: 'PQ 5',
    hidden: false,
    description: 'Reach level 5 in personal quest',
    condition({ user }) {
      return user.personalQuest.level >= 5;
    },
    reward: [{
      type: 'gold',
      amount: 1000
    }]
  }
}
