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
    sellPrice: 10
  },

  ore_iron: {
    id: 'ore_iron',
    icon: 'iron',
    category: 'mining',
    name: 'iron',
    sellPrice: 75
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
      energyStorage: 75, // Maximum energy stored
      attack: 4, // Damage per hit
      energyPerHit: 3, // Energy used per hit
      energyRegen: 30, // Energy regen per minute
      miner: 1 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 25,
      attack: 1,
      energyRegen: 30,
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
      energyStorage: 75, // Maximum energy stored
      attack: 10, // Damage per hit
      energyPerHit: 3, // Energy used per hit
      energyRegen: 30, // Energy regen per minute
      miner: 25 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 50,
      attack: 4,
      miner: 75,
      energyRegen: 30
    }
  },

  iron_pickaxe: {
    id: 'iron_pickaxe',
    icon: 'ironPickaxe',
    category: 'mining',
    slot: 'pickaxe',
    name: 'iron pickaxe',
    sellPrice: 1000,
    description: 'A pickaxe forged from iron. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 100, // Maximum energy stored
      attack: 20, // Damage per hit
      energyPerHit: 4, // Energy used per hit
      energyRegen: 30, // Energy regen per minute
      miner: 50 // Increases effeciency of miners
    },
    extraStats: {
      energyStorage: 75,
      attack: 8,
      miner: 100,
      energyRegen: 30
    }
  }
}
