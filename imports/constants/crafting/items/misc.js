export const MISC_ITEMS = {
  enhancer_key: {
    id: 'enhancer_key',
    icon: 'enhancerKey.svg',
    category: 'crafting',
    name: 'enhancer key',
    sellPrice: 250,
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
      Can be opened (consumed) to open and reveal a prize.`,
    shiftActionData: {
      description: 'open to reveal a prize'
    },
    contentsList: ['candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'candy_cane', 'tanzanite', 'sapphire', 'ruby', 'jade', 'emerald', 'lapislazuli', 'enhancer_key', 'festive_hat', 'festive_hat', 'festive_hat', 'holiday_cheer_tome', 'holiday_cheer_tome'],
  },
};
