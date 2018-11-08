import { ITEMS } from '/imports/constants/items/index.js'; 

export const STAFF_CRAFTS = {
  pine_staff: {
    produces: 'pine_staff',
    name: 'pine staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'pine_staff',
    timeToCraft: 60, // 60
    xp: 5,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 2,
    required: [{
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 2
    }]
  },

  beech_staff: {
    produces: 'beech_staff',
    name: 'beech staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'beech_staff',
    timeToCraft: 60, // 60
    xp: 10,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 5,
    required: [{
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5
    }]
  },

  ash_staff: {
    produces: 'ash_staff',
    name: 'ash staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'ash_staff',
    timeToCraft: 60, // 60
    xp: 25,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'ash_log',
      icon: ITEMS['ash_log'].icon,
      name: ITEMS['ash_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }]
  },

  oak_staff: {
    produces: 'oak_staff',
    name: 'oak staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'oak_staff',
    timeToCraft: 120, // 60
    xp: 50,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 30,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  maple_staff: {
    produces: 'maple_staff',
    name: 'maple staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'maple_staff',
    timeToCraft: 180, // 60
    xp: 100,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 30,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  walnut_staff: {
    produces: 'walnut_staff',
    name: 'walnut staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'walnut_staff',
    timeToCraft: 60 * 15, // 60
    xp: 200,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 30,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  cherry_staff: {
    produces: 'cherry_staff',
    name: 'cherry staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'cherry_staff',
    timeToCraft: 60 * 30, // 60
    xp: 250,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 30,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  mahogany_staff: {
    produces: 'mahogany_staff',
    name: 'mahogany staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'mahogany_staff',
    timeToCraft: 60 * 60, // 60
    xp: 300,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  elm_staff: {
    produces: 'elm_staff',
    name: 'elm staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'elm_staff',
    timeToCraft: 5400, // 60
    xp: 450,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  black_staff: {
    produces: 'black_staff',
    name: 'black staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'black_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 600,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 45,
    required: [{
      type: 'item',
      itemId: 'black_log',
      icon: ITEMS['black_log'].icon,
      name: ITEMS['black_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 45
    }]
  },

  blue_gum_staff: {
    produces: 'blue_gum_staff',
    name: 'blue gum staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'blue_gum_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 800,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  cedar_staff: {
    produces: 'cedar_staff',
    name: 'cedar staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'cedar_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 1000,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  denya_staff: {
    produces: 'denya_staff',
    name: 'denya staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'denya_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 1200,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 60,
    required: [{
      type: 'item',
      itemId: 'denya_log',
      icon: ITEMS['denya_log'].icon,
      name: ITEMS['denya_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 60
    }]
  },

  gombe_staff: {
    produces: 'gombe_staff',
    name: 'gombe staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'gombe_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 2000,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  hickory_staff: {
    produces: 'hickory_staff',
    name: 'hickory staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'hickory_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 5000,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  larch_staff: {
    produces: 'larch_staff',
    name: 'larch staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'larch_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 10000,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  poplar_staff: {
    produces: 'poplar_staff',
    name: 'poplar staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'poplar_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 25000,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  tali_staff: {
    produces: 'tali_staff',
    name: 'tali staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'tali_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 50000,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  willow_staff: {
    produces: 'willow_staff',
    name: 'willow staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'willow_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 75000,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 90,
    required: [{
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  teak_staff: {
    produces: 'teak_staff',
    name: 'teak staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'teak_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 100000,
    maxToCraft: 1,
    tags: ['staff'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  }

};
