export const MISC_ITEMS = {
  enhancer_key: {
    id: 'enhancer_key',
    icon: 'enhancerKey',
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
  }
}
