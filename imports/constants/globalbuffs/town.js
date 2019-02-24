export const TOWN_GLOBALBUFFS = {
  town_dwelling: {
    globalBuffId: 'town_dwelling',
    name: function(level = 1) {
      return `Global town dwelling buff Lv. ${level}`;
    },
    icon: 'dwelling',
    extraDescription: 'This global buff can be achieved by donating items to the town dwellings.',
    effects: function(level = 1) {
      return [
        `+${Math.ceil(level * 1.5)}% Farming XP`,
        'occasionally receive free food and herbs',
      ];
    },
  },

  town_quarry: {
    globalBuffId: 'town_quarry',
    name: function(level = 1) {
      return `Global town quarry buff Lv. ${level}`;
    },
    icon: 'quarry',
    extraDescription: 'This global buff can be achieved by donating items to the town quarry.',
    effects: function(level = 1) {
      return [
        'none (yet)',
      ];
    },
  },

  town_lumber_yard: {
    globalBuffId: 'town_lumber_yard',
    name: function(level = 1) {
      return `Global town lumber yard buff Lv. ${level}`;
    },
    icon: 'lumberYard',
    extraDescription: 'This global buff can be achieved by donating items to the town lumber yard.',
    effects: function(level = 1) {
      return [
        'none (yet)',
      ];
    },
  },

  town_armory: {
    globalBuffId: 'town_armory',
    name: function(level = 1) {
      return `Global town armory buff Lv. ${level}`;
    },
    icon: 'armory',
    extraDescription: 'This global buff can be achieved by donating items to the town armory.',
    effects: function(level = 1) {
      return [
        'none (yet)',
      ];
    },
  },

  town_library: {
    globalBuffId: 'town_library',
    name: function(level = 1) {
      return `Global town library buff Lv. ${level}`;
    },
    icon: 'library',
    extraDescription: 'This global buff can be achieved by donating items to the town library.',
    effects: function(level = 1) {
      return [
        'none (yet)',
      ];
    },
  },

  town_observatory: {
    globalBuffId: 'town_observatory',
    name: function(level = 1) {
      return `Global town observatory buff Lv. ${level}`;
    },
    icon: 'observatory',
    extraDescription: 'This global buff can be achieved by donating items to the town observatory.',
    effects: function(level = 1) {
      return [
        'none (yet)',
      ];
    },
  },
};
