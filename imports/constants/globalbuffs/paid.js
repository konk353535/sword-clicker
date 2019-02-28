export const PAID_GLOBALBUFFS = {
  paid_crafting: {
    globalBuffId: 'paid_crafting',
    dataBuffId: 'buffCrafting', // legacy ID for this buff
    name: function() {
      return 'Global crafting buff';
    },
    icon: 'crafting',
    extraDescription: 'This global buff can be purchased with bought gems in the shop.',
    effects: function() {
      return [
        '+35% Crafting XP',
        '+35% Inscription XP',
        '+100% Gem Drop Rate XP',
      ];
    },
    isServerBuff: false,
  },

  buffCrafting: {
    globalBuffId: 'buffCrafting',
    name: function() {
      return 'Global crafting buff';
    },
    icon: 'crafting',
    extraDescription: 'This global buff can be purchased with bought gems in the shop.',
    effects: function() {
      return [
        '+35% Crafting XP',
        '+35% Inscription XP',
        '+100% Gem Drop Rate XP',
      ];
    },
    isServerBuff: false,
  },

  paid_combat: {
    globalBuffId: 'paid_combat',
    dataBuffId: 'buffCombat', // legacy ID for this buff
    name: function() {
      return 'Global combat buff';
    },
    icon: 'combat',
    extraDescription: 'This global buff can be purchased with bought gems in the shop.',
    effects: function() {
      return [
        '+20% Combat XP',
        '+50% Drop Chance',
        '+35% Astronomy XP',
      ];
    },
    isServerBuff: false,
  },

  buffCombat: {
    globalBuffId: 'buffCombat',
    name: function() {
      return 'Global combat buff';
    },
    icon: 'combat',
    extraDescription: 'This global buff can be purchased with bought gems in the shop.',
    effects: function() {
      return [
        '+20% Combat XP',
        '+50% Drop Chance',
        '+35% Astronomy XP',
      ];
    },
    isServerBuff: false,
  },

  paid_gathering: {
    globalBuffId: 'paid_gathering',
    dataBuffId: 'buffGathering', // legacy ID for this buff
    name: function() {
      return 'Global gathering buff';
    },
    icon: 'gathering',
    extraDescription: 'This global buff can be purchased with bought gems in the shop.',
    effects: function() {
      return [
        '+35% Mining XP',
        '+35% Woodcutting XP',
        '+35% Farming XP',
      ];
    },
    isServerBuff: false,
  },

  buffGathering: {
    globalBuffId: 'buffGathering',
    name: function() {
      return 'Global gathering buff';
    },
    icon: 'gathering',
    extraDescription: 'This global buff can be purchased with bought gems in the shop.',
    effects: function() {
      return [
        '+35% Mining XP',
        '+35% Woodcutting XP',
        '+35% Farming XP',
      ];
    },
    isServerBuff: false,
  },
};
