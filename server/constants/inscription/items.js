export const INSCRIPTION_ITEMS = {
  pigment_red_255: {
    id: 'pigment_red_255',
    icon: 'pigmentRed255',
    category: 'pigment',
    name: 'pigment red 255',
    sellPrice: 50,
    description: 'Used in inscription for marking pages'
  },

  pine_paper: {
    id: 'pine_paper',
    icon: 'pinePaper',
    category: 'paper',
    name: 'pine paper',
    sellPrice: 250,
    description: 'Used in inscription with pigments to make ability books'
  },

  berserk_level_1_page_1: {
    id: 'berserk_level_1_page_1',
    icon: 'page',
    category: 'page',
    name: 'Berserk Lv 1 Pg 1',
    sellPrice: 250,
    description: 'The first half of what is berserk.'
  },

  berserk_level_1_page_2: {
    id: 'berserk_level_1_page_2',
    icon: 'page',
    category: 'page',
    name: 'Berserk Lv 1 Pg 2',
    sellPrice: 250,
    description: 'The second half of what is berserk.'
  },

  berserk_level_1_tome: {
    id: 'berserk_level_1_tome',
    icon: 'tome',
    category: 'tome',
    name: 'Berserk Lv 1',
    teaches: {
      abilityId: 'berserk',
      level: 1
    },
    sellPrice: 500,
    description: 'Can be consumed to learn the berserk ability.'
  },

  berserk_level_2_tome: {
    id: 'berserk_level_2_tome',
    icon: 'tome',
    category: 'tome',
    name: 'Berserk Lv 2',
    teaches: {
      abilityId: 'berserk',
      level: 2
    },
    sellPrice: 5000,
    description: 'Can be consumed to learn the berserk ability.'
  },

  execute_level_1_page_1: {
    id: 'execute_level_1_page_1',
    icon: 'page',
    category: 'page',
    name: 'execute Lv 1 Pg 1',
    sellPrice: 250,
    description: 'The first half of what is berserk.'
  },

  execute_level_1_page_2: {
    id: 'execute_level_1_page_2',
    icon: 'page',
    category: 'page',
    name: 'execute Lv 1 Pg 2',
    sellPrice: 250,
    description: 'The second half of what is berserk.'
  },

  execute_level_1_tome: {
    id: 'execute_level_1_tome',
    icon: 'tome',
    category: 'tome',
    name: 'execute Lv 1',
    teaches: {
      abilityId: 'execute',
      level: 1
    },
    sellPrice: 500,
    description: 'Can be consumed to learn the execute ability.'
  },
}
