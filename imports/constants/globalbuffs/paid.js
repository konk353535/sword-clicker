export const PAID_GLOBALBUFFS = {
  paid_crafting: {
    globalBuffId: 'paid_crafting',
    name: function() {
      return 'Global crafting buff';
    },
    icon: 'crafting',
    effects: function() {
      return [
        '+35% Crafting XP',
        '+35% Inscription XP',
        '+100% Gem Drop Rate XP',
      ];
    },
    extraDescription: 'This global buff can be purchased with bought gems in the shop.',
  },

  paid_combat: {
    globalBuffId: 'paid_combat',
    name: function() {
      return 'Global combat buff';
    },
    icon: 'combat',
    effects: function() {
      return [
        '+20% Combat XP',
        '+50% Drop Chance',
        '+35% Astronomy XP',
      ];
    },
    extraDescription: 'This global buff can be purchased with bought gems in the shop.',
  },

  paid_gathering: {
    globalBuffId: 'paid_gathering',
    name: function() {
      return 'Global gathering buff';
    },
    icon: 'gathering',
    effects: function() {
      return [
        '+35% Mining XP',
        '+35% Woodcutting XP',
        '+35% Farming XP',
      ];
    },
    extraDescription: 'This global buff can be purchased with bought gems in the shop.',
  },
};
