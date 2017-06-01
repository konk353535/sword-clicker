
// Mainline axes
// Energy storage 20 - 40
// Attack 4 - 30
// energy per hit 1 - 1
// Energy regen 20 - 7
// Miner 25 - 70

// Passive only axes
// Energy storage 1 - 1
// Attack 1 - 1
// Energy per hit 1 - 1
// Energy regen 1 - 1
// Miner 50 - 250

// High storage axes
// Energy storage 50 - 100
// Attack 2 - 20
// energy per hit 1 - 1
// Energy regen 10 - 7
// Miner 0 - 25

// OP as fuck axes ( only a reward from bosses or very rare drop from hard mobs )
// Storage 30 - 70
// Attack 4 - 27
// Enery per hit 1 - 1
// Energy Regen 10 - 7
// Miner 50 - 125

export const PICKAXE_ITEMS = {

  // Over Powered Pickaxes ( 1 )
  dwarven_hammer: {
    id: 'dwarven_hammer',
    icon: 'dwarvenHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'dwarven hammer',
    sellPrice: 200,
    description: 'A practise mining hammer for dwarvish children.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 40,
      attack: 15,
      energyPerHit: 1,
      energyRegen: 8,
      miner: 65
    },
    extraStats: {
      energyStorage: 10,
      attack: 5,
      miner: 5,
      energyRegen: 3
    }
  },

  the_malleo: {
    id: 'the_malleo',
    icon: 'theMalleo',
    category: 'mining',
    slot: 'pickaxe',
    name: 'the malleo',
    sellPrice: 1000,
    description: 'An powerful hammer. Found deep within the earth.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 70,
      attack: 25,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 110
    },
    extraStats: {
      energyStorage: 10,
      attack: 5,
      miner: 15,
      energyRegen: 2
    }
  },

  // High Storage pickaxes
  copper_mining_hammer: {
    id: 'copper_mining_hammer',
    icon: 'copperMiningHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'copper mining hammer',
    sellPrice: 50,
    description: 'A hammer forged from copper. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 40,
      attack: 4,
      energyPerHit: 1,
      energyRegen: 8,
      miner: 0
    },
    extraStats: {
      energyStorage: 10,
      attack: 2,
      miner: 5,
      energyRegen: 3
    }
  },

  iron_mining_hammer: {
    id: 'iron_mining_hammer',
    icon: 'ironMiningHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'iron mining hammer',
    sellPrice: 100,
    description: 'A hammer forged from iron. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 50,
      attack: 7,
      energyPerHit: 1,
      energyRegen: 5,
      miner: 0
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      miner: 10,
      energyRegen: 2
    }
  },

  steel_mining_hammer: {
    id: 'steel_mining_hammer',
    icon: 'steelMiningHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'steel mining hammer',
    sellPrice: 200,
    description: 'A hammer forged from steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 60,
      attack: 12,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 0
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      miner: 15,
      energyRegen: 2
    }
  },

  carbon_mining_hammer: {
    id: 'carbon_mining_hammer',
    icon: 'carbonMiningHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'carbon mining hammer',
    sellPrice: 300,
    description: 'A hammer forged from carbon. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 70,
      attack: 16,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 0
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      miner: 20,
      energyRegen: 2
    }
  },

  mithril_mining_hammer: {
    id: 'mithril_mining_hammer',
    icon: 'mithrilMiningHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'mithril mining hammer',
    sellPrice: 500,
    description: 'A hammer forged from mithril. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 80,
      attack: 21,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 0
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      miner: 25,
      energyRegen: 3
    }
  },

  adamantium_mining_hammer: {
    id: 'adamantium_mining_hammer',
    icon: 'adamantiumMiningHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'adamantium mining hammer',
    sellPrice: 750,
    description: 'A hammer forged from adamantium. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 85,
      attack: 26,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 25
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      miner: 25,
      energyRegen: 3
    }
  },

  orichalcum_mining_hammer: {
    id: 'orichalcum_mining_hammer',
    icon: 'orichalcumMiningHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'orichalcum mining hammer',
    sellPrice: 1000,
    description: 'A hammer forged from orichalcum. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 85,
      attack: 31,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 35
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      miner: 25,
      energyRegen: 3
    }
  },

  cobalt_mining_hammer: {
    id: 'cobalt_mining_hammer',
    icon: 'cobaltMiningHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cobalt mining hammer',
    sellPrice: 1250,
    description: 'A hammer forged from cobalt. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 85,
      attack: 36,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 40
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      miner: 25,
      energyRegen: 3
    }
  },

  fairy_steel_mining_hammer: {
    id: 'fairy_steel_mining_hammer',
    icon: 'fairySteelMiningHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'fairy_steel mining hammer',
    sellPrice: 1500,
    description: 'A hammer forged from fairy steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 85,
      attack: 41,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 45
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      miner: 25,
      energyRegen: 3
    }
  },

  cursed_mining_hammer: {
    id: 'cursed_mining_hammer',
    icon: 'cursedMiningHammer',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cursed mining hammer',
    sellPrice: 2000,
    description: 'A cursed hammer. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 85,
      attack: 46,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 50
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      miner: 25,
      energyRegen: 3
    }
  },

  // Passive heavy pickaxes
  copper_dwarven_idol: {
    id: 'copper_dwarven_idol',
    icon: 'copperDwarvenIdol',
    category: 'mining',
    slot: 'pickaxe',
    name: 'Copper Dwarven Idol',
    sellPrice: 50,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1, // Maximum energy stored
      attack: 1, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 1, // Energy regen per minute
      miner: 40 // Increases effeciency of miners
    },
    extraStats: {
      miner: 10
    }
  },

  iron_dwarven_idol: {
    id: 'iron_dwarven_idol',
    icon: 'ironDwarvenIdol',
    category: 'mining',
    slot: 'pickaxe',
    name: 'iron Dwarven Idol',
    sellPrice: 100,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1,
      attack: 1,
      energyPerHit: 1,
      energyRegen: 1,
      miner: 75
    },
    extraStats: {
      miner: 10
    }
  },

  steel_dwarven_idol: {
    id: 'steel_dwarven_idol',
    icon: 'steelDwarvenIdol',
    category: 'mining',
    slot: 'pickaxe',
    name: 'steel Dwarven Idol',
    sellPrice: 200,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1,
      attack: 1,
      energyPerHit: 1,
      energyRegen: 1,
      miner: 115
    },
    extraStats: {
      miner: 10
    }
  },

  carbon_dwarven_idol: {
    id: 'carbon_dwarven_idol',
    icon: 'carbonDwarvenIdol',
    category: 'mining',
    slot: 'pickaxe',
    name: 'carbon Dwarven Idol',
    sellPrice: 300,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1,
      attack: 1,
      energyPerHit: 1,
      energyRegen: 1,
      miner: 150
    },
    extraStats: {
      miner: 10
    }
  },

  mithril_dwarven_idol: {
    id: 'mithril_dwarven_idol',
    icon: 'mithrilDwarvenIdol',
    category: 'mining',
    slot: 'pickaxe',
    name: 'mithril Dwarven Idol',
    sellPrice: 500,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1,
      attack: 1,
      energyPerHit: 1,
      energyRegen: 1,
      miner: 180
    },
    extraStats: {
      miner: 10
    }
  },

  adamantium_dwarven_idol: {
    id: 'adamantium_dwarven_idol',
    icon: 'adamantiumDwarvenIdol',
    category: 'mining',
    slot: 'pickaxe',
    name: 'adamantium Dwarven Idol',
    sellPrice: 750,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1,
      attack: 1,
      energyPerHit: 1,
      energyRegen: 1,
      miner: 210
    },
    extraStats: {
      miner: 10
    }
  },

  orichalcum_dwarven_idol: {
    id: 'orichalcum_dwarven_idol',
    icon: 'orichalcumDwarvenIdol',
    category: 'mining',
    slot: 'pickaxe',
    name: 'orichalcum Dwarven Idol',
    sellPrice: 1000,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1,
      attack: 1,
      energyPerHit: 1,
      energyRegen: 1,
      miner: 240
    },
    extraStats: {
      miner: 10
    }
  },

  cobalt_dwarven_idol: {
    id: 'cobalt_dwarven_idol',
    icon: 'cobaltDwarvenIdol',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cobalt Dwarven Idol',
    sellPrice: 1250,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1,
      attack: 1,
      energyPerHit: 1,
      energyRegen: 1,
      miner: 270
    },
    extraStats: {
      miner: 10
    }
  },

  fairy_steel_dwarven_idol: {
    id: 'fairy_steel_dwarven_idol',
    icon: 'fairySteelDwarvenIdol',
    category: 'mining',
    slot: 'pickaxe',
    name: 'fairy steel Dwarven Idol',
    sellPrice: 1500,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1,
      attack: 1,
      energyPerHit: 1,
      energyRegen: 1,
      miner: 300
    },
    extraStats: {
      miner: 10
    }
  },

  cursed_dwarven_idol: {
    id: 'cursed_dwarven_idol',
    icon: 'cursedDwarvenIdol',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cursed dwarven Idol',
    sellPrice: 2000,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1,
      attack: 1,
      energyPerHit: 1,
      energyRegen: 1,
      miner: 330
    },
    extraStats: {
      miner: 10
    }
  },

  // Main Line pickaxes
  primitive_pickaxe: {
    id: 'primitive_pickaxe',
    icon: 'primitivePickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'primitive pickaxe',
    sellPrice: 10,
    description: 'A basic pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 10, // Maximum energy stored
      attack: 5, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 15, // Energy regen per minute
      miner: 1 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 10,
      attack: 1,
      energyRegen: 5
    }
  },

  copper_pickaxe: {
    id: 'copper_pickaxe',
    icon: 'copperPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'copper pickaxe',
    sellPrice: 50,
    description: 'A pickaxe forged from copper. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 12, // Maximum energy stored
      attack: 8, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 8, // Energy regen per minute
      miner: 10 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 12,
      attack: 3,
      miner: 25,
      energyRegen: 3
    }
  },

  iron_pickaxe: {
    id: 'iron_pickaxe',
    icon: 'ironPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'iron pickaxe',
    sellPrice: 100,
    description: 'A pickaxe forged from iron. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 14,
      attack: 11,
      energyPerHit: 1,
      energyRegen: 6,
      miner: 20
    },
    extraStats: {
      energyStorage: 14,
      attack: 5,
      miner: 25,
      energyRegen: 3
    }
  },

  steel_pickaxe: {
    id: 'steel_pickaxe',
    icon: 'steelPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'steel pickaxe',
    sellPrice: 200,
    description: 'A pickaxe forged from steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 16, // Maximum energy stored
      attack: 15, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
      miner: 25 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      miner: 25,
      energyRegen: 2
    }
  },

  carbon_pickaxe: {
    id: 'carbon_pickaxe',
    icon: 'carbonPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'carbon pickaxe',
    sellPrice: 300,
    description: 'A pickaxe forged from carbon. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 20,
      attack: 20,
      energyPerHit: 1,
      energyRegen: 5,
      miner: 30
    },
    extraStats: {
      energyStorage: 20,
      attack: 5,
      miner: 30,
      energyRegen: 2
    }
  },

  mithril_pickaxe: {
    id: 'mithril_pickaxe',
    icon: 'mithrilPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'mithril pickaxe',
    sellPrice: 500,
    description: 'A pickaxe forged from mithril. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 22,
      attack: 25,
      energyPerHit: 1,
      energyRegen: 5,
      miner: 35
    },
    extraStats: {
      energyStorage: 22,
      attack: 5,
      miner: 35,
      energyRegen: 2
    }
  },

  adamantium_pickaxe: {
    id: 'adamantium_pickaxe',
    icon: 'adamantiumPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'adamantium pickaxe',
    sellPrice: 750,
    description: 'A pickaxe forged from adamantium. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 25,
      attack: 30,
      energyPerHit: 1,
      energyRegen: 5,
      miner: 40
    },
    extraStats: {
      energyStorage: 25,
      attack: 5,
      miner: 40,
      energyRegen: 2
    }
  },

  orichalcum_pickaxe: {
    id: 'orichalcum_pickaxe',
    icon: 'orichalcumPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'orichalcum pickaxe',
    sellPrice: 1000,
    description: 'A pickaxe forged from orichalcum. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 28,
      attack: 35,
      energyPerHit: 1,
      energyRegen: 5,
      miner: 45
    },
    extraStats: {
      energyStorage: 28,
      attack: 5,
      miner: 45,
      energyRegen: 2
    }
  },

  cobalt_pickaxe: {
    id: 'cobalt_pickaxe',
    icon: 'cobaltPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cobalt pickaxe',
    sellPrice: 750,
    description: 'A pickaxe forged from cobalt. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 28,
      attack: 40,
      energyPerHit: 1,
      energyRegen: 5,
      miner: 50
    },
    extraStats: {
      energyStorage: 28,
      attack: 5,
      miner: 50,
      energyRegen: 2
    }
  },

  fairy_steel_pickaxe: {
    id: 'fairy_steel_pickaxe',
    icon: 'fairySteelPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'fairy steel pickaxe',
    sellPrice: 750,
    description: 'A pickaxe forged from fairy steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 31,
      attack: 45,
      energyPerHit: 1,
      energyRegen: 5,
      miner: 55
    },
    extraStats: {
      energyStorage: 31,
      attack: 5,
      miner: 55,
      energyRegen: 2
    }
  },

  cursed_pickaxe: {
    id: 'cursed_pickaxe',
    icon: 'cursedPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cursed pickaxe',
    sellPrice: 750,
    description: 'A cursed pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 31,
      attack: 50,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 60
    },
    extraStats: {
      energyStorage: 31,
      attack: 6,
      miner: 60,
      energyRegen: 3
    }
  }
}
