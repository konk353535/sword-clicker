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
      ability: 'berserk',
      level: 1
    },
    sellPrice: 500,
    description: 'Can be consumed to learn the berserk ability.'
  }
}
