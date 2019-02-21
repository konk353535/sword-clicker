export const TOWN_GLOBALBUFFS = {
  town_dwelling: {
    globalBuffId: 'town_dwelling',
    name: function(level = 1) {
      return `Global town dwelling buff Lv. ${level}`;
    },
    icon: 'farmer',
    effects: function(level = 1) {
      return [
        `+${Math.ceil(level * 1.5)}% Farming XP`,
        'occasionally receive free food and herbs',
      ];
    },
    extraDescription: 'This global buff can be achieved by donating items to the town dwellings.',
  },

  town_quarry: {
    globalBuffId: 'town_quarry',
    name: function(level = 1) {
      return `Global town quarry buff Lv. ${level}`;
    },
    icon: 'miner',
    effects: function(level = 1) {
      return [
        'none (yet)',
      ];
    },
    extraDescription: 'This global buff can be achieved by donating items to the town quarry.',
  },

  town_lumber_yard: {
    globalBuffId: 'town_lumber_yard',
    name: function(level = 1) {
      return `Global town lumber yard buff Lv. ${level}`;
    },
    icon: 'woodcutter',
    effects: function(level = 1) {
      return [
        'none (yet)',
      ];
    },
    extraDescription: 'This global buff can be achieved by donating items to the town lumber yard.',
  },

  town_armory: {
    globalBuffId: 'town_armory',
    name: function(level = 1) {
      return `Global town armory buff Lv. ${level}`;
    },
    icon: 'defense',
    effects: function(level = 1) {
      return [
        'none (yet)',
      ];
    },
    extraDescription: 'This global buff can be achieved by donating items to the town armory.',
  },

  town_library: {
    globalBuffId: 'town_library',
    name: function(level = 1) {
      return `Global town library buff Lv. ${level}`;
    },
    icon: 'inscription',
    effects: function(level = 1) {
      return [
        'none (yet)',
      ];
    },
    extraDescription: 'This global buff can be achieved by donating items to the town library.',
  },

  town_observatory: {
    globalBuffId: 'town_observatory',
    name: function(level = 1) {
      return `Global town observatory buff Lv. ${level}`;
    },
    icon: 'astronomy',
    effects: function(level = 1) {
      return [
        'none (yet)',
      ];
    },
    extraDescription: 'This global buff can be achieved by donating items to the town observatory.',
  },
};
