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
  }
}
