import { BUFFS } from '/server/constants/combat';

export const FARMING_ITEMS = {
  lettice_seed: {
    id: 'lettice_seed',
    icon: 'letticeSeed',
    category: 'seed',
    name: 'Lettice Seed',
    description: 'Used to grow lettice. Useful for eating.',
    sellPrice: 1,
    produces: 'lettice'
  },

  lettice: {
    id: 'lettice',
    icon: 'lettice',
    category: 'food',
    name: 'Lettice',
    description() {
      const buff = BUFFS.food_lettice;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_lettice'
    }],
    sellPrice: 1
  },

  basil_seed: {
    id: 'basil_seed',
    icon: 'basilSeed',
    category: 'seed',
    name: 'Basil Seed',
    description: 'Used to grow basil. Useful for inscription',
    sellPrice: 100,
    produces: 'basil'
  },

  basil: {
    id: 'basil',
    icon: 'basil',
    category: 'herb',
    name: 'basil',
    sellPrice: 100
  },

  pink_rose_seed: {
    id: 'pink_rose_seed',
    icon: 'pinkRoseSeed',
    category: 'seed',
    name: 'pink rose seed',
    description: 'Used to grow a pinkish rose. Useful for inscription',
    sellPrice: 200,
    produces: 'pink_rose'
  },

  pink_rose: {
    id: 'pink_rose',
    icon: 'pinkRose',
    category: 'herb',
    name: 'pink rose',
    sellPrice: 200
  },

  endive_seed: {
    id: 'endive_seed',
    icon: 'endiveSeed',
    category: 'seed',
    name: 'endive seed',
    description: 'Used to grow a endive. Useful for inscription',
    sellPrice: 200,
    produces: 'endive'
  },

  endive: {
    id: 'endive',
    icon: 'endive',
    category: 'herb',
    name: 'endive',
    sellPrice: 200
  },

  juniper_seed: {
    id: 'juniper_seed',
    icon: 'juniperSeed',
    category: 'seed',
    name: 'juniper seed',
    description: 'Used to grow a juniper. Useful for inscription',
    sellPrice: 300,
    produces: 'juniper'
  },

  juniper: {
    id: 'juniper',
    icon: 'juniper',
    category: 'herb',
    name: 'juniper',
    sellPrice: 300
  },

  dead_plant: {
    id: 'dead_plant',
    icon: 'deadPlant',
    category: 'farming',
    name: 'dead plant',
    sellPrice: 0
  },

  grape_fruit_seed: {
    id: 'grape_fruit_seed',
    icon: 'grapeFruitSeed',
    category: 'seed',
    name: 'grape fruit seed',
    description: 'Used to grow grape fruit. Yum!',
    sellPrice: 10,
    produces: 'grape_fruit'
  },

  grape_fruit: {
    id: 'grape_fruit',
    icon: 'grapeFruit',
    category: 'food',
    name: 'grape fruit',
    description() {
      const buff = BUFFS.food_grape_fruit;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_grape_fruit'
    }],
    sellPrice: 20
  },

  rubia_flower_seed: {
    id: 'rubia_flower_seed',
    icon: 'rubiaFlowerSeed',
    category: 'seed',
    name: 'Rubia Flower Seed',
    description: 'Used to grow rubia flower. Useful for inscription.',
    sellPrice: 5,
    produces: 'rubia_flower'
  },

  rubia_flower: {
    id: 'rubia_flower',
    icon: 'rubiaFlower',
    category: 'herb',
    name: 'Rubia Flower',
    sellPrice: 10
  }
}
