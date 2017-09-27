export const WOODCUTTING_ITEMS = {
  primitive_axe: {
    id: 'primitive_axe',
    icon: 'primitiveAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'primitive axe',
    sellPrice: 10,
    description: 'A sharpened rock. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 1, // Determines what logs you can cut
      attackSpeed: 1, // How often you cut ( 1 per minute )
      accuracy: 1 // Extra chance of getting a log ( 1% extra chance )
    },
    extraStats: {
      accuracy: 25
    }
  },

  copper_axe: {
    id: 'copper_axe',
    icon: 'copperAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'copper axe',
    sellPrice: 50,
    description: 'An axe forged from copper. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 5,
      attackSpeed: 1,
      accuracy: 1
    },
    extraStats: {
      accuracy: 50,
      attackSpeed: 1
    }
  },

  tin_axe: {
    id: 'tin_axe',
    icon: 'tinAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'tin axe',
    sellPrice: 50,
    description: 'An axe forged from tin. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 10,
      attackSpeed: 1,
      accuracy: 1
    },
    extraStats: {
      accuracy: 50,
      attackSpeed: 1
    }
  },

  bronze_axe: {
    id: 'bronze_axe',
    icon: 'bronzeAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'bronze axe',
    sellPrice: 50,
    description: 'An axe forged from bronze. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 15,
      attackSpeed: 1,
      accuracy: 1
    },
    extraStats: {
      accuracy: 50,
      attackSpeed: 1
    }
  },

  iron_axe: {
    id: 'iron_axe',
    icon: 'ironAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'iron axe',
    sellPrice: 100,
    description: 'An axe forged from iron. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 20,
      attackSpeed: 1,
      accuracy: 25
    },
    extraStats: {
      accuracy: 50,
      attackSpeed: 1
    }
  },

  silver_axe: {
    id: 'silver_axe',
    icon: 'silverAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'silver axe',
    sellPrice: 100,
    description: 'An axe forged from silver. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 25,
      attackSpeed: 1,
      accuracy: 25
    },
    extraStats: {
      accuracy: 50,
      attackSpeed: 1
    }
  },

  gold_axe: {
    id: 'gold_axe',
    icon: 'goldAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'gold axe',
    sellPrice: 100,
    description: 'An axe forged from gold. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 30,
      attackSpeed: 1,
      accuracy: 25
    },
    extraStats: {
      accuracy: 50,
      attackSpeed: 1
    }
  },

  carbon_axe: {
    id: 'carbon_axe',
    icon: 'carbonAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'carbon axe',
    sellPrice: 300,
    description: 'An axe forged from carbon. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 35,
      attackSpeed: 1,
      accuracy: 1
    },
    extraStats: {
      accuracy: 24,
      attackSpeed: 1
    }
  },

  steel_axe: {
    id: 'steel_axe',
    icon: 'steelAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'steel axe',
    sellPrice: 200,
    description: 'An axe forged from steel. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 40,
      attackSpeed: 1,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  platinum_axe: {
    id: 'platinum_axe',
    icon: 'platinumAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'platinum axe',
    sellPrice: 200,
    description: 'An axe forged from platinum. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 45,
      attackSpeed: 1,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  titanium_axe: {
    id: 'titanium_axe',
    icon: 'titaniumAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'titanium axe',
    sellPrice: 200,
    description: 'An axe forged from titanium. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 50,
      attackSpeed: 1,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  tungsten_axe: {
    id: 'tungsten_axe',
    icon: 'tungstenAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'tungsten axe',
    sellPrice: 200,
    description: 'An axe forged from tungsten. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 55,
      attackSpeed: 1,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  obsidian_axe: {
    id: 'obsidian_axe',
    icon: 'obsidianAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'obsidian axe',
    sellPrice: 200,
    description: 'An axe forged from obsidian. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 60,
      attackSpeed: 1,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  cobalt_axe: {
    id: 'cobalt_axe',
    icon: 'cobaltAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'cobalt axe',
    sellPrice: 1500,
    description: 'An axe forged from cobalt. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 65,
      attackSpeed: 2,
      accuracy: 25
    },
    extraStats: {
      accuracy: 50,
      attackSpeed: 1
    }
  },

  mithril_axe: {
    id: 'mithril_axe',
    icon: 'mithrilAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'mithril axe',
    sellPrice: 500,
    description: 'An axe forged from mithril. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 70,
      attackSpeed: 1,
      accuracy: 25
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  adamantium_axe: {
    id: 'adamantium_axe',
    icon: 'adamantiumAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'adamantium axe',
    sellPrice: 750,
    description: 'An axe forged from adamantium. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 75,
      attackSpeed: 2,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  orichalcum_axe: {
    id: 'orichalcum_axe',
    icon: 'orichalcumAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'orichalcum axe',
    sellPrice: 1000,
    description: 'An axe forged from orichalcum. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 80,
      attackSpeed: 2,
      accuracy: 75
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  meteorite_axe: {
    id: 'meteorite_axe',
    icon: 'meteoriteAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'meteorite axe',
    sellPrice: 1000,
    description: 'An axe forged from meteorite. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 85,
      attackSpeed: 2,
      accuracy: 75
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  fairy_steel_axe: {
    id: 'fairy_steel_axe',
    icon: 'fairySteelAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'fairy steel axe',
    sellPrice: 2000,
    description: 'An axe forged from fairy steel. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 90,
      attackSpeed: 2,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  elven_steel_axe: {
    id: 'elven_steel_axe',
    icon: 'elvenSteelAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'elven steel axe',
    sellPrice: 2000,
    description: 'An axe forged from elven steel. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 95,
      attackSpeed: 2,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  cursed_axe: {
    id: 'cursed_axe',
    icon: 'cursedAxe.svg',
    category: 'woodcutting',
    slot: 'axe',
    name: 'cursed axe',
    sellPrice: 750,
    description: 'A cursed axe. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 100,
      attackSpeed: 2,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  pine_log: {
    id: 'pine_log',
    icon: 'pineLog.svg',
    category: 'woodcutting',
    name: 'pine log',
    sellPrice: 1
  },

  beech_log: {
    id: 'beech_log',
    icon: 'beechLog.svg',
    category: 'woodcutting',
    name: 'beech log',
    sellPrice: 4
  },

  ash_log: {
    id: 'ash_log',
    icon: 'ashLog.svg',
    category: 'woodcutting',
    name: 'ash log',
    sellPrice: 7
  },

  oak_log: {
    id: 'oak_log',
    icon: 'oakLog.svg',
    category: 'woodcutting',
    name: 'oak log',
    sellPrice: 11
  },

  maple_log: {
    id: 'maple_log',
    icon: 'mapleLog.svg',
    category: 'woodcutting',
    name: 'maple log',
    sellPrice: 17
  },

  walnut_log: {
    id: 'walnut_log',
    icon: 'walnutLog.svg',
    category: 'woodcutting',
    name: 'walnut log',
    sellPrice: 30
  },

  cherry_log: {
    id: 'cherry_log',
    icon: 'cherryLog.svg',
    category: 'woodcutting',
    name: 'cherry log',
    sellPrice: 40
  },

  mahogany_log: {
    id: 'mahogany_log',
    icon: 'mahoganyLog.svg',
    category: 'woodcutting',
    name: 'mahogany log',
    sellPrice: 50
  },

  elk_log: {
    id: 'elk_log',
    icon: 'elkLog.svg',
    category: 'woodcutting',
    name: 'elk log',
    sellPrice: 60
  },

  black_log: {
    id: 'black_log',
    icon: 'blackLog.svg',
    category: 'woodcutting',
    name: 'black log',
    sellPrice: 70
  },

  blue_gum_log: {
    id: 'blue_gum_log',
    icon: 'blueGumLog.svg',
    category: 'woodcutting',
    name: 'blue gum log',
    sellPrice: 80
  },

  cedar_log: {
    id: 'cedar_log',
    icon: 'cedarLog.svg',
    category: 'woodcutting',
    name: 'cedar log',
    sellPrice: 90
  },

  denya_log: {
    id: 'denya_log',
    icon: 'denyaLog.svg',
    category: 'woodcutting',
    name: 'denya log',
    sellPrice: 100
  },

  gombe_log: {
    id: 'gombe_log',
    icon: 'gombeLog.svg',
    category: 'woodcutting',
    name: 'gombe log',
    sellPrice: 110
  },

  hickory_log: {
    id: 'hickory_log',
    icon: 'hickoryLog.svg',
    category: 'woodcutting',
    name: 'hickory log',
    sellPrice: 120
  },

  larch_log: {
    id: 'larch_log',
    icon: 'larchLog.svg',
    category: 'woodcutting',
    name: 'larch log',
    sellPrice: 130
  },

  poplar_log: {
    id: 'poplar_log',
    icon: 'poplarLog.svg',
    category: 'woodcutting',
    name: 'poplar log',
    sellPrice: 140
  },

  tali_log: {
    id: 'tali_log',
    icon: 'taliLog.svg',
    category: 'woodcutting',
    name: 'tali log',
    sellPrice: 150
  },

  willow_log: {
    id: 'willow_log',
    icon: 'willowLog.svg',
    category: 'woodcutting',
    name: 'willow log',
    sellPrice: 160
  },

  teak_log: {
    id: 'teak_log',
    icon: 'teakLog.svg',
    category: 'woodcutting',
    name: 'teak log',
    sellPrice: 170
  },

  fiery_log: {
    id: 'fiery_log',
    icon: 'fieryLog.svg',
    category: 'woodcutting',
    name: 'fiery log',
    sellPrice: 180
  },

  magic_log: {
    id: 'magic_log',
    icon: 'magicLog.svg',
    category: 'woodcutting',
    name: 'magic log',
    sellPrice: 190
  }
}
