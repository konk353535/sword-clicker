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
        `+${(level + 1) * 2.5}% Farming XP`,
        'occasionally receive free food and herbs',
        '<i>(better and higher quantities with higher buff levels)</i>',
      ];
    },
    isServerBuff: true,
    hasLevels: true,
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
        `+${(level + 1) * 3}% extra passive miner damage`,
        `+${(level + 1) * 5}% faster mine pit deposits`,
      ];
    },
    isServerBuff: true,
    hasLevels: true,
  },

  town_lumber_yard: {
    globalBuffId: 'town_lumber_yard',
    name: function(level = 1) {
      return `Global town lumber yard buff Lv. ${level}`;
    },
    icon: 'lumberYard2',
    extraDescription: 'This global buff can be achieved by donating items to the town lumber yard.',
    effects: function(level = 1) {
      if (level === 1) {
        return [
          `+${(level + 1) * 2.5}% faster woodcutters`,
        ];
      }
      return [
        `+${(level + 1) * 2.5}% faster woodcutters`,
        `woodcutters can chop logs +${(level - 1)} tier${(level==2)?'':'s'} higher than usual`,
      ];
    },
    isServerBuff: true,
    hasLevels: true,
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
        `${(level + 1) * 1.5}% higher companion stats in battle`,
        `${level * 5}% better chance to reforge equipment`,
      ];
    },
    isServerBuff: true,
    hasLevels: true,
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
        `+${(level + 1) * 2.5}% Inscription XP`,
        'occasionally receive free magic codexes',
        '<i>(better and more frequently with higher buff levels)</i>',
      ];
    },
    isServerBuff: true,
    hasLevels: true,
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
        `+${(level + 1) * 2.5}% Astronomy XP`,
        `+${(level + 1) * 3}% astronomy mage shards/hour rate`,
      ];
    },
    isServerBuff: true,
    hasLevels: true,
  },
};
