export const MINING_ITEMS = {
  ore_stone: {
    id: 'ore_stone',
    icon: 'stone',
    category: 'mining',
    name: 'stone',
    sellPrice: 1
  },

  ore_copper: {
    id: 'ore_copper',
    icon: 'copper',
    category: 'mining',
    name: 'copper',
    sellPrice: 2
  },

  ore_coal: {
    id: 'ore_coal',
    icon: 'coal',
    category: 'mining',
    name: 'coal',
    sellPrice: 5
  },

  ore_iron: {
    id: 'ore_iron',
    icon: 'iron',
    category: 'mining',
    name: 'iron',
    sellPrice: 50
  },

  ore_steel: {
    id: 'ore_steel',
    icon: 'steel',
    category: 'mining',
    name: 'steel',
    sellPrice: 150
  },

  ore_carbon: {
    id: 'ore_carbon',
    icon: 'carbon',
    category: 'mining',
    name: 'carbon',
    sellPrice: 200
  },

  ore_mithril: {
    id: 'ore_mithril',
    icon: 'mithril',
    category: 'mining',
    name: 'mithril',
    sellPrice: 250
  },

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
      attack: 2, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 15, // Energy regen per minute
      miner: 1 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 10,
      attack: 1,
      energyRegen: 5,
      miner: 24
    }
  },

  copper_pickaxe: {
    id: 'copper_pickaxe',
    icon: 'copperPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'copper pickaxe',
    sellPrice: 200,
    description: 'A pickaxe forged from copper. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 12, // Maximum energy stored
      attack: 7, // Damage per hit
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
    sellPrice: 300,
    description: 'A pickaxe forged from iron. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 14,
      attack: 10,
      energyPerHit: 1,
      energyRegen: 5,
      miner: 20
    },
    extraStats: {
      energyStorage: 14,
      attack: 5,
      miner: 25,
      energyRegen: 2
    }
  },

  holy_pickaxe: {
    id: 'holy_pickaxe',
    icon: 'holyPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'holy pickaxe',
    sellPrice: 0,
    description: 'A pickaxe dropped from heaven. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 1, // Maximum energy stored
      attack: 1, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 1, // Energy regen per minute
      miner: 100 // Increases effeciency of miners
    },
    extraStats: {
      miner: 100
    }
  },

  steel_pickaxe: {
    id: 'steel_pickaxe',
    icon: 'steelPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'steel pickaxe',
    sellPrice: 400,
    description: 'A pickaxe forged from steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 16, // Maximum energy stored
      attack: 15, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 4, // Energy regen per minute
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
    sellPrice: 500,
    description: 'A pickaxe forged from carbon. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 20,
      attack: 20,
      energyPerHit: 1,
      energyRegen: 4,
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
    sellPrice: 750,
    description: 'A pickaxe forged from mithril. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 20,
      attack: 25,
      energyPerHit: 1,
      energyRegen: 4,
      miner: 35
    },
    extraStats: {
      energyStorage: 20,
      attack: 5,
      miner: 35,
      energyRegen: 3
    }
  }
}
