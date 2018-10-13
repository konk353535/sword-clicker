import { ITEMS } from '/imports/constants/items/index.js'; 

export const MISC_CRAFTS = {

  adventure_token: {
    produces: 'adventure_token',
    recipeFor: 'crafting',
    name: 'adventure token',
    category: 'crafting',
    id: 'adventure_token',
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 75,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'item',
      itemId: 'cactus',
      icon: ITEMS['cactus'].icon,
      name: ITEMS['cactus'].name,
      amount: 1,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }],
    timeToCraft: 1 * 60,
    xp: 10,
    maxToCraft: 100
  },

  enhancer_key: {
    produces: 'enhancer_key',
    recipeFor: 'crafting',
    name: 'enhancer key',
    category: 'crafting',
    id: 'enhancer_key',
    requiredCraftingLevel: 1000,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 10000,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'item',
      itemId: 'jade',
      icon: ITEMS['jade'].icon,
      name: ITEMS['jade'].name,
      amount: 1,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 1000
    }],
    timeToCraft: 15 * 60,
    xp: 100,
    maxToCraft: 1
  },

  thirsty_fangs_1_tome: {
    produces: 'thirsty_fangs_1_tome',
    recipeFor: 'crafting',
    name: 'thirsty fangs lv 1',
    category: 'combat',
    id: 'thirsty_fangs_1_tome',
    requiredCraftingLevel: 30,
    isHidden: true,
    required: [{
      type: 'item',
      itemId: 'tamarind_honey',
      icon: ITEMS['tamarind_honey'].icon,
      name: ITEMS['tamarind_honey'].name,
      amount: 1,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'item',
      itemId: 'lettice',
      icon: ITEMS['lettice'].icon,
      name: ITEMS['lettice'].name,
      amount: 100,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'item',
      itemId: 'silver_wall',
      icon: ITEMS['silver_wall'].icon,
      name: ITEMS['silver_wall'].name,
      amount: 200,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }],
    timeToCraft: 15 * 60,
    xp: 100,
    maxToCraft: 1
  },

  thirsty_fangs_2_tome: {
    produces: 'thirsty_fangs_2_tome',
    recipeFor: 'crafting',
    name: 'thirsty fangs lv 2',
    category: 'combat',
    id: 'thirsty_fangs_2_tome',
    requiredCraftingLevel: 40,
    isHidden: true,
    required: [{
      type: 'item',
      itemId: 'lemon_honey',
      icon: ITEMS['lemon_honey'].icon,
      name: ITEMS['lemon_honey'].name,
      amount: 1,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'item',
      itemId: 'dragonfruit',
      icon: ITEMS['dragonfruit'].icon,
      name: ITEMS['dragonfruit'].name,
      amount: 50,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'item',
      itemId: 'silver_essence_wall',
      icon: ITEMS['silver_essence_wall'].icon,
      name: ITEMS['silver_essence_wall'].name,
      amount: 20,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }],
    timeToCraft: 15 * 60,
    xp: 1000,
    maxToCraft: 1
  },

  bamboo_roof: {
    produces: 'bamboo_roof',
    recipeFor: 'crafting',
    name: 'bamboo roof',
    category: 'crafting',
    id: 'bamboo_roof',
    requiredCraftingLevel: 42,
    required: [{
      type: 'item',
      itemId: 'bamboo',
      icon: ITEMS['bamboo'].icon,
      name: ITEMS['bamboo'].name,
      amount: 12,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'item',
      itemId: 'steel_pylon',
      icon: ITEMS['steel_pylon'].icon,
      name: ITEMS['steel_pylon'].name,
      amount: 20,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 42
    }],
    timeToCraft: 60 * 10,
    xp: 1,
    maxToCraft: 100
  },

  bamboo_wall: {
    produces: 'bamboo_wall',
    recipeFor: 'crafting',
    name: 'bamboo wall',
    category: 'crafting',
    id: 'bamboo_wall',
    requiredCraftingLevel: 42,
    required: [{
      type: 'item',
      itemId: 'bamboo',
      icon: ITEMS['bamboo'].icon,
      name: ITEMS['bamboo'].name,
      amount: 12,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'item',
      itemId: 'carbon_wall',
      icon: ITEMS['carbon_wall'].icon,
      name: ITEMS['carbon_wall'].name,
      amount: 60,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 42
    }],
    timeToCraft: 60 * 10,
    xp: 1,
    maxToCraft: 100
  },

  bamboo_shack: {
    produces: 'bamboo_shack',
    recipeFor: 'crafting',
    name: 'bamboo shack',
    category: 'crafting',
    id: 'bamboo_shack',
    requiredCraftingLevel: 42,
    required: [{
      type: 'item',
      itemId: 'bamboo_roof',
      icon: ITEMS['bamboo_roof'].icon,
      name: ITEMS['bamboo_roof'].name,
      amount: 1,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'item',
      itemId: 'bamboo_wall',
      icon: ITEMS['bamboo_wall'].icon,
      name: ITEMS['bamboo_wall'].name,
      amount: 1,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 42
    }],
    timeToCraft: 3 * 60 * 60,
    xp: 40000,
    maxToCraft: 100
  },

  ancient_earth_shard: {
    produces: 'ancient_earth_shard',
    recipeFor: 'crafting',
    name: 'ancient earth shard',
    category: 'astronomy',
    id: 'ancient_earth_shard',
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'earth_shard_fragment',
      icon: ITEMS['earth_shard_fragment'].icon,
      name: ITEMS['earth_shard_fragment'].name,
      amount: 1000,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }],
    timeToCraft: 30,
    xp: 1000,
    maxToCraft: 100
  },

  ancient_fire_shard: {
    produces: 'ancient_fire_shard',
    recipeFor: 'crafting',
    name: 'ancient fire shard',
    category: 'astronomy',
    id: 'ancient_fire_shard',
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'fire_shard_fragment',
      icon: ITEMS['fire_shard_fragment'].icon,
      name: ITEMS['fire_shard_fragment'].name,
      amount: 1000,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }],
    timeToCraft: 30,
    xp: 1000,
    maxToCraft: 100
  },

  ancient_air_shard: {
    produces: 'ancient_air_shard',
    recipeFor: 'crafting',
    name: 'ancient air shard',
    category: 'astronomy',
    id: 'ancient_air_shard',
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'air_shard_fragment',
      icon: ITEMS['air_shard_fragment'].icon,
      name: ITEMS['air_shard_fragment'].name,
      amount: 1000,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }],
    timeToCraft: 30,
    xp: 1000,
    maxToCraft: 100
  },

  ancient_water_shard: {
    produces: 'ancient_water_shard',
    recipeFor: 'crafting',
    name: 'ancient water shard',
    category: 'astronomy',
    id: 'ancient_water_shard',
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'water_shard_fragment',
      icon: ITEMS['water_shard_fragment'].icon,
      name: ITEMS['water_shard_fragment'].name,
      amount: 1000,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }],
    timeToCraft: 30,
    xp: 1000,
    maxToCraft: 100
  },

  complete_earth_shard: {
    produces: 'complete_earth_shard',
    recipeFor: 'crafting',
    name: 'complete earth shard',
    category: 'astronomy',
    id: 'complete_earth_shard',
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'earth_shard_fragment',
      icon: ITEMS['earth_shard_fragment'].icon,
      name: ITEMS['earth_shard_fragment'].name,
      amount: 100,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }],
    timeToCraft: 15,
    xp: 100,
    maxToCraft: 100
  },

  complete_fire_shard: {
    produces: 'complete_fire_shard',
    recipeFor: 'crafting',
    name: 'complete fire shard',
    category: 'astronomy',
    id: 'complete_fire_shard',
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'fire_shard_fragment',
      icon: ITEMS['fire_shard_fragment'].icon,
      name: ITEMS['fire_shard_fragment'].name,
      amount: 100,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }],
    timeToCraft: 15,
    xp: 100,
    maxToCraft: 100
  },

  complete_air_shard: {
    produces: 'complete_air_shard',
    recipeFor: 'crafting',
    name: 'complete air shard',
    category: 'astronomy',
    id: 'complete_air_shard',
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'air_shard_fragment',
      icon: ITEMS['air_shard_fragment'].icon,
      name: ITEMS['air_shard_fragment'].name,
      amount: 100,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }],
    timeToCraft: 15,
    xp: 100,
    maxToCraft: 100
  },

  complete_water_shard: {
    produces: 'complete_water_shard',
    recipeFor: 'crafting',
    name: 'complete water shard',
    category: 'astronomy',
    id: 'complete_water_shard',
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'water_shard_fragment',
      icon: ITEMS['water_shard_fragment'].icon,
      name: ITEMS['water_shard_fragment'].name,
      amount: 100,
      consumes: true // If true, this required item will disappear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }],
    timeToCraft: 15,
    xp: 100,
    maxToCraft: 100
  },
};
