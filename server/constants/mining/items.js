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
    sellPrice: 15,
    description: 'A basic pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 15, // Maximum energy stored
      attack: 10, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 10, // Energy regen per minute
      miner: 1 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 15,
      attack: 3,
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
      energyStorage: 20, // Maximum energy stored
      attack: 25, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
      miner: 25 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 20,
      attack: 15,
      miner: 75,
      energyRegen: 2
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
      energyStorage: 20, // Maximum energy stored
      attack: 30, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 4, // Energy regen per minute
      miner: 50 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 20,
      attack: 20,
      miner: 100,
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
      miner: 200 // Increases effeciency of miners
    },
    extraStats: {
      miner: 200
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
      energyStorage: 20, // Maximum energy stored
      attack: 50, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 4, // Energy regen per minute
      miner: 125 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 20,
      attack: 25,
      miner: 125,
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
      energyStorage: 20, // Maximum energy stored
      attack: 70, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 4, // Energy regen per minute
      miner: 150 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 20,
      attack: 30,
      miner: 150,
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
      energyStorage: 20, // Maximum energy stored
      attack: 100, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 4, // Energy regen per minute
      miner: 150 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 20,
      attack: 50,
      miner: 200,
      energyRegen: 3
    }
  }
}
