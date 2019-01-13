console.log('exporting achievement/magic.js MAGIC_ACHIEVEMENTS');
export const MAGIC_ACHIEVEMENTS = {
  'magic_50': {
    kind: 'magic',
    name: '50 Spellcasts',
    hidden: false,
    description: 'Cast at least 50 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 50));
    },
    rewards: [{
      type: 'item',
      itemId: 'bronze_wand',
      amount: 1
    }, {
      type: 'item',
      itemId: 'dim_orb',
      amount: 1
    }, {
      type: 'item',
      itemId: 'poor_tome',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 5000
    }, {
      type: 'xp',
      skill: 'astronomy',
      amount: 5000
    }]
  },
  
  'magic_100': {
    kind: 'magic',
    name: '100 Spellcasts',
    hidden: false,
    description: 'Cast at least 100 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 100));
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
    }, {
      type: 'xp',
      skill: 'inscription',
      amount: 10000
    }]
  },
  
  'magic_200': {
    kind: 'magic',
    name: '200 Spellcasts',
    hidden: false,
    description: 'Cast at least 200 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 200));
    },
    rewards: [{
      type: 'item',
      itemId: 'silver_wand',
      amount: 1
    }, {
      type: 'item',
      itemId: 'pale_orb',
      amount: 1
    }, {
      type: 'item',
      itemId: 'dull_tome',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 25000
    }, {
      type: 'xp',
      skill: 'astronomy',
      amount: 25000
    }]
  },
    
  'magic_350': {
    kind: 'magic',
    name: '350 Spellcasts',
    hidden: false,
    description: 'Cast at least 350 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 350));
    },
    rewards: [{
      type: 'item',
      itemId: 'mystic_fairy_tome_level_1',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 50000
    }, {
      type: 'xp',
      skill: 'inscription',
      amount: 50000
    }]
  },
 
  'magic_600': {
    kind: 'magic',
    name: '600 Spellcasts',
    hidden: false,
    description: 'Cast at least 600 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 600));
    },
    rewards: [{
      type: 'item',
      itemId: 'orange_wizard_hat',
      amount: 1
    }, {
      type: 'item',
      itemId: 'orange_wizard_shirt',
      amount: 1
    }, {
      type: 'item',
      itemId: 'orange_wizard_shorts',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 75000
    }, {
      type: 'xp',
      skill: 'astronomy',
      amount: 75000
    }]
  },
  
  'magic_1000': {
    kind: 'magic',
    name: '1,000 Spellcasts',
    hidden: false,
    description: 'Cast at least 1,000 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 1000));
    },
    rewards: [{
      type: 'item',
      itemId: 'steel_wand',
      amount: 1
    }, {
      type: 'item',
      itemId: 'tainted_orb',
      amount: 1
    }, {
      type: 'item',
      itemId: 'studius_tome',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 100000
    }, {
      type: 'xp',
      skill: 'inscription',
      amount: 100000
    }]
  },
  
  'magic_2500': {
    kind: 'magic',
    name: '2,500 Spellcasts',
    hidden: false,
    description: 'Cast at least 2,500 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 2500));
    },
    rewards: [{
      type: 'item',
      itemId: 'mystic_fairy_tome_level_2',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 250000
    }, {
      type: 'xp',
      skill: 'astronomy',
      amount: 250000
    }]
  },

  'magic_5000': {
    kind: 'magic',
    name: '5,000 Spellcasts',
    hidden: false,
    description: 'Cast at least 5,000 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 5000));
    },
    rewards: [{
      type: 'item',
      itemId: 'amber_wizard_hat',
      amount: 1
    }, {
      type: 'item',
      itemId: 'amber_wizard_shirt',
      amount: 1
    }, {
      type: 'item',
      itemId: 'amber_wizard_shorts',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 500000
    }, {
      type: 'xp',
      skill: 'inscription',
      amount: 500000
    }]
  },
  
  'magic_7500': {
    kind: 'magic',
    name: '7,500 Spellcasts',
    hidden: false,
    description: 'Cast at least 7,500 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 7500));
    },
    rewards: [{
      type: 'item',
      itemId: 'tungsten_wand',
      amount: 1
    }, {
      type: 'item',
      itemId: 'glowing_orb',
      amount: 1
    }, {
      type: 'item',
      itemId: 'prestigious_tome',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 750000
    }, {
      type: 'xp',
      skill: 'astronomy',
      amount: 750000
    }]
  },
  
  'magic_10000': {
    kind: 'magic',
    name: '10,000 Spellcasts',
    hidden: false,
    description: 'Cast at least 10,000 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 10000));
    },
    rewards: [{
      type: 'item',
      itemId: 'mystic_fairy_tome_level_3',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 1000000
    }, {
      type: 'xp',
      skill: 'inscription',
      amount: 1000000
    }]
  },

  'magic_12500': {
    kind: 'magic',
    name: '12,500 Spellcasts',
    hidden: false,
    description: 'Cast at least 12,500 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 12500));
    },
    rewards: [{
      type: 'item',
      itemId: 'violet_wizard_hat',
      amount: 1
    }, {
      type: 'item',
      itemId: 'violet_wizard_shirt',
      amount: 1
    }, {
      type: 'item',
      itemId: 'violet_wizard_shorts',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 1250000
    }, {
      type: 'xp',
      skill: 'astronomy',
      amount: 1250000
    }]
  },
  
  'magic_15000': {
    kind: 'magic',
    name: '15,000 Spellcasts',
    hidden: false,
    description: 'Cast at least 15,000 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 15000));
    },
    rewards: [{
      type: 'item',
      itemId: 'mithril_wand',
      amount: 1
    }, {
      type: 'item',
      itemId: 'billowing_orb',
      amount: 1
    }, {
      type: 'item',
      itemId: 'rich_tome',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 1500000
    }, {
      type: 'xp',
      skill: 'inscription',
      amount: 1500000
    }]
  },
  
  'magic_17500': {
    kind: 'magic',
    name: '17,500 Spellcasts',
    hidden: false,
    description: 'Cast at least 17,500 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 17500));
    },
    rewards: [{
      type: 'item',
      itemId: 'meteorite_wand',
      amount: 1
    }, {
      type: 'item',
      itemId: 'powerful_orb',
      amount: 1
    }, {
      type: 'item',
      itemId: 'breathtaking_tome',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 1750000
    }, {
      type: 'xp',
      skill: 'astronomy',
      amount: 1750000
    }]
  },
  
  'magic_20000': {
    kind: 'magic',
    name: '20,000 Spellcasts',
    hidden: false,
    description: 'Cast at least 20,000 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 20000));
    },
    rewards: [{
      type: 'item',
      itemId: 'mystic_fairy_tome_level_4',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 2000000
    }, {
      type: 'xp',
      skill: 'inscription',
      amount: 2000000
    }]
  },
  
  'magic_24000': {
    kind: 'magic',
    name: '24,000 Spellcasts',
    hidden: false,
    description: 'Cast at least 24,000 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 24000));
    },
    rewards: [{
      type: 'item',
      itemId: 'crimson_wizard_hat',
      amount: 1
    }, {
      type: 'item',
      itemId: 'crimson_wizard_shirt',
      amount: 1
    }, {
      type: 'item',
      itemId: 'crimson_wizard_shorts',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 2400000
    }, {
      type: 'xp',
      skill: 'astronomy',
      amount: 2400000
    }]
  },
  
  'magic_30000': {
    kind: 'magic',
    name: '30,000 Spellcasts',
    hidden: false,
    description: 'Cast at least 30,000 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 30000));
    },
    rewards: [{
      type: 'item',
      itemId: 'fairy_steel_wand',
      amount: 1
    }, {
      type: 'item',
      itemId: 'dangerous_orb',
      amount: 1
    }, {
      type: 'item',
      itemId: 'ancient_tome',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 2800000
    }, {
      type: 'xp',
      skill: 'inscription',
      amount: 2800000
    }]
  },
  
  'magic_40000': {
    kind: 'magic',
    name: '40,000 Spellcasts',
    hidden: false,
    description: 'Cast at least 40,000 spells',
    condition({ user }) {
      return ((user.stats) && ((user.stats.spellsCast || 0) >= 30000));
    },
    rewards: [{
      type: 'item',
      itemId: 'cursed_wand',
      amount: 1
    }, {
      type: 'item',
      itemId: 'cataclysmic_orb',
      amount: 1
    }, {
      type: 'item',
      itemId: 'legendary_tome',
      amount: 1
    }, {
      type: 'xp',
      skill: 'magic',
      amount: 3500000
    }, {
      type: 'xp',
      skill: 'astronomy',
      amount: 3500000
    }]
  },
};
