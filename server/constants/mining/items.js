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
      energyStorage: 20, // Maximum energy stored
      attack: 10, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 7, // Energy regen per minute
      miner: 1 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 20,
      attack: 5,
      energyRegen: 3,
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
      attack: 20, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
      miner: 25 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 20,
      attack: 10,
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
    sellPrice: 600,
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
    sellPrice: 1200,
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
  }
}
