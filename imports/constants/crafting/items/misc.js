export const MISC_ITEMS = {
  enhancer_key: {
    id: 'enhancer_key',
    icon: 'enhancerKey.svg',
    category: 'crafting',
    name: 'enhancer key',
    sellPrice: 1,
    description: `
      Can be consumed to increase an items quality by up to 15%.<br />
      Can only be applied once per item. <br />
      Item quality can not be increased beyond 100%.`,
    shiftActionData: {
      description: 'increase an items quality by up to 15%',
      target: 'item'
    },
  },

  adventure_token: {
    id: 'adventure_token',
    icon: 'adventureToken.svg',
    category: 'crafting',
    name: 'adventure token',
    sellPrice: 10,
    description: 'Can be traded for new adventures'
  },
  
  gift_box_holiday: {
    id: 'gift_box_holiday',
    icon: 'giftBoxHoliday.svg',
    category: 'item_box',
    name: 'holiday gift box',
    sellPrice: 1,
    description: `
      Can be opened (consumed) to reveal a prize.`,
    shiftActionData: {
      description: 'open to reveal a prize'
    },
    // 22 items
    contentsList: ['candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'tanzanite', 'sapphire', 'ruby', 'jade', 'emerald', 'lapislazuli', 'enhancer_key', 'festive_hat', 'festive_hat', 'festive_hat', 'holiday_cheer_tome', 'holiday_cheer_tome'],
  },
  
  gift_box_fireworks: {
    id: 'gift_box_fireworks',
    icon: 'eventNYFireworks.svg',
    category: 'item_box',
    name: 'party firework',
    sellPrice: 1,
    description: `
      Can be ignited (consumed) to explode and reveal a prize.`,
    shiftActionData: {
      description: 'ignite to reveal a prize'
    },
    // 22 items
    contentsList: ['event_ny_balloons', 'event_ny_balloons', 'event_ny_balloons', 'event_ny_balloons', 'event_ny_balloons', 'event_ny_balloons', 'event_ny_balloons', 'ornamental_hat', 'ornamental_hat', 'ornamental_hat', 'ornamental_hat', 'ornamental_hat', 'ornamental_hat', 'ornamental_hat', 'raise_your_glass_tome', 'raise_your_glass_tome', 'raise_your_glass_tome', 'raise_your_glass_tome', 'raise_your_glass_tome', 'enhancer_key', 'lemonade', 'lemonade'],
  },
    
  gift_box_red_envelope: {
    id: 'gift_box_red_envelope',
    icon: 'eventLNYEnvelope.svg',
    category: 'item_box',
    name: 'red envelope',
    sellPrice: 1,
    description: `
      Can be opened (consumed) to reveal a prize.`,
    shiftActionData: {
      description: 'open to reveal a prize'
    },
    // 50 items
    contentsList:
    [
      /* 10% chance: */ 'event_lny_lion_body', 'event_lny_lion_body', 'event_lny_lion_body', 'event_lny_lion_body', 'event_lny_lion_body',
      /* 10% chance: */ 'event_lny_lion_head', 'event_lny_lion_head', 'event_lny_lion_head', 'event_lny_lion_head', 'event_lny_lion_head',
      /* 10% chance: */ 'event_lny_lion_claws', 'event_lny_lion_claws', 'event_lny_lion_claws', 'event_lny_lion_claws', 'event_lny_lion_claws',
      /*  6% chance: */ 'lion_dance_tome', 'lion_dance_tome', 'lion_dance_tome',
      /* 10% chance: */ 'lny_pig_tome_level_1', 'lny_pig_tome_level_1', 'lny_pig_tome_level_1', 'lny_pig_tome_level_1', 'lny_pig_tome_level_1',
      /*  8% chance: */ 'lny_pig_tome_level_2', 'lny_pig_tome_level_2', 'lny_pig_tome_level_2', 'lny_pig_tome_level_2', 
      /*  6% chance: */ 'lny_pig_tome_level_3', 'lny_pig_tome_level_3', 'lny_pig_tome_level_3', 
      /*  4% chance: */ 'lny_pig_tome_level_4', 'lny_pig_tome_level_4', 
      /*  2% chance: */ 'lny_pig_tome_level_5', 
      /* 16% chance: */ 'gold:10', 'gold:100', 'gold:250', 'gold:500', 'gold:1000', 'gold:2500', 'gold:10000', 'gold:25000',
      /* 12% chance: */ 'gems:2', 'gems:3', 'gems:5', 'gems:10', 'gems:25', 'gems:50',
      /*  2% chance: */ 'enhancer_key',
      /*  4% chance: */ 'lemonade', 'lemonade',
    ],
  },
    
  gift_box_valentines: {
    id: 'gift_box_valentines',
    icon: 'eventVDgiftbox.svg',
    category: 'item_box',
    name: 'box of chocolates',
    sellPrice: 1,
    description: `
      Can be opened (consumed) to reveal a prize.`,
    shiftActionData: {
      description: 'open to reveal a prize'
    },
    // 50 items
    contentsList:
    [
      /*  6% chance: */ 'cupids_bow', 'cupids_bow', 'cupids_bow',
      /*  6% chance: */ 'event_vd_rose_quartz_amulet', 'event_vd_rose_quartz_amulet', 'event_vd_rose_quartz_amulet',,
      /*  4% chance: */ 'event_vd_bear_slippers', 'event_vd_bear_slippers',
      /*  8% chance: */ 'event_vd_charm_tome', 'event_vd_charm_tome', 'event_vd_charm_tome', 'event_vd_charm_tome',
      /* 10% chance: */ 'vd_cupid_tome_level_1', 'vd_cupid_tome_level_1', 'vd_cupid_tome_level_1', 'vd_cupid_tome_level_1', 'vd_cupid_tome_level_1',
      /*  8% chance: */ 'vd_cupid_tome_level_2', 'vd_cupid_tome_level_2', 'vd_cupid_tome_level_2', 'vd_cupid_tome_level_2', 
      /*  6% chance: */ 'vd_cupid_tome_level_3', 'vd_cupid_tome_level_3', 'vd_cupid_tome_level_3', 
      /*  4% chance: */ 'vd_cupid_tome_level_4', 'vd_cupid_tome_level_4', 
      /*  2% chance: */ 'vd_cupid_tome_level_5', 
      /*  6% chance: */ 'gems:2', 'gems:3', 'gems:5',
      /*  2% chance: */ 'enhancer_key',
      /* 38% chance: */ 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates', 'chocolates',
      ],
  },
};
