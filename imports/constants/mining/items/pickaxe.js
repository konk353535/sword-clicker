
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
// Energy per hit 1 - 1
// Energy regen 10 - 7
// Miner 0 - 25

// OP as fuck axes ( only a reward from bosses or very rare drop from hard mobs )
// Storage 30 - 70
// Attack 4 - 27
// Energy per hit 1 - 1
// Energy Regen 10 - 7
// Miner 50 - 125

export const PICKAXE_ITEMS = {

  thors_skull: {
    id: 'thors_skull',
    icon: 'thorsSkull.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'thors skull',
    sellPrice: 750,
    description: 'The skull of a long dead god',
    isPickaxe: true,
    isEquippable: true,
    stats: { // DPM = (1000 * 5) / 20 = 250
      energyStorage: 1500,
      attack: 750,
      energyPerHit: 20,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 500,
      attack: 250,
      energyRegen: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 30
    }]
  },

  // Over Powered Pickaxes ( 1 )
  dwarven_hammer: {
    id: 'dwarven_hammer',
    icon: 'dwarvenHammer.svg',
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
    },
    extraStats: {
      energyStorage: 10,
      attack: 5,
      energyRegen: 3
    }
  },

  the_malleo: {
    id: 'the_malleo',
    icon: 'theMalleo.svg',
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
    },
    extraStats: {
      energyStorage: 10,
      attack: 5,
      energyRegen: 2
    }
  },

  // High Storage pickaxes
  copper_mining_hammer: {
    id: 'copper_mining_hammer',
    icon: 'copperMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'copper mining hammer',
    sellPrice: 50,
    description: 'A hammer forged from copper. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 300, // Maximum energy stored
      attack: 7, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 7, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 10,
      attack: 2,
      energyRegen: 3
    }
  },

  copper_mining_anvil: {
    id: 'copper_mining_anvil',
    icon: 'copperMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'copper mining anvil',
    sellPrice: 50,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 70, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 10
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    }
  },

  tin_mining_hammer: {
    id: 'tin_mining_hammer',
    icon: 'tinMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'tin mining hammer',
    sellPrice: 50,
    description: 'A hammer forged from tin. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 320,
      attack: 8,
      energyPerHit: 1,
      energyRegen: 6,
    },
    extraStats: {
      energyStorage: 10,
      attack: 2,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 3
    }]
  },

  tin_mining_anvil: {
    id: 'tin_mining_anvil',
    icon: 'tinMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'tin mining anvil',
    sellPrice: 50,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 150, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 14
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 3
    }]
  },

  bronze_mining_hammer: {
    id: 'bronze_mining_hammer',
    icon: 'bronzeMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'bronze mining hammer',
    sellPrice: 50,
    description: 'A hammer forged from bronze. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 320,
      attack: 12,
      energyPerHit: 1,
      energyRegen: 6,
    },
    extraStats: {
      energyStorage: 10,
      attack: 2,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 6
    }]
  },

  bronze_mining_anvil: {
    id: 'bronze_mining_anvil',
    icon: 'bronzeMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'bronze mining anvil',
    sellPrice: 60,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 200, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 18
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 6
    }]
  },

  iron_mining_hammer: {
    id: 'iron_mining_hammer',
    icon: 'ironMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'iron mining hammer',
    sellPrice: 100,
    description: 'A hammer forged from iron. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 330,
      attack: 20,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 10
    }]
  },

  iron_mining_anvil: {
    id: 'iron_mining_anvil',
    icon: 'ironMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'iron mining anvil',
    sellPrice: 80,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 240, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 22
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 10
    }]
  },

  silver_mining_hammer: {
    id: 'silver_mining_hammer',
    icon: 'silverMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'silver mining hammer',
    sellPrice: 100,
    description: 'A hammer forged from silver. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 360,
      attack: 24,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 15
    }]
  },

  silver_mining_anvil: {
    id: 'silver_mining_anvil',
    icon: 'silverMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'silver mining anvil',
    sellPrice: 100,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 300, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 26
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 15
    }]
  },

  gold_mining_hammer: {
    id: 'gold_mining_hammer',
    icon: 'goldMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'gold mining hammer',
    sellPrice: 100,
    description: 'A hammer forged from gold. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 370,
      attack: 28,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 20
    }]
  },

  gold_mining_anvil: {
    id: 'gold_mining_anvil',
    icon: 'goldMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'gold mining anvil',
    sellPrice: 115,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 400, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 30
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 20
    }]
  },

  carbon_mining_hammer: {
    id: 'carbon_mining_hammer',
    icon: 'carbonMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'carbon mining hammer',
    sellPrice: 300,
    description: 'A hammer forged from carbon. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 400,
      attack: 32,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 25
    }]
  },

  carbon_mining_anvil: {
    id: 'carbon_mining_anvil',
    icon: 'carbonMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'carbon mining anvil',
    sellPrice: 130,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 500, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 34
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 25
    }]
  },

  steel_mining_hammer: {
    id: 'steel_mining_hammer',
    icon: 'steelMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'steel mining hammer',
    sellPrice: 200,
    description: 'A hammer forged from steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 410,
      attack: 36,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 30
    }]
  },

  steel_mining_anvil: {
    id: 'steel_mining_anvil',
    icon: 'steelMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'steel mining anvil',
    sellPrice: 150,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 600, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 36
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 30
    }]
  },

  platinum_mining_hammer: {
    id: 'platinum_mining_hammer',
    icon: 'platinumMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'platinum mining hammer',
    sellPrice: 200,
    description: 'A hammer forged from platinum. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 420,
      attack: 40,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 35
    }]
  },

  platinum_mining_anvil: {
    id: 'platinum_mining_anvil',
    icon: 'platinumMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'platinum mining anvil',
    sellPrice: 170,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 700, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 40
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 35
    }]
  },

  titanium_mining_hammer: {
    id: 'titanium_mining_hammer',
    icon: 'titaniumMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'titanium mining hammer',
    sellPrice: 200,
    description: 'A hammer forged from titanium. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 430,
      attack: 50,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 40
    }]
  },

  titanium_mining_anvil: {
    id: 'titanium_mining_anvil',
    icon: 'titaniumMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'titanium mining anvil',
    sellPrice: 185,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 800, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 44
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 40
    }]
  },

  tungsten_mining_hammer: {
    id: 'tungsten_mining_hammer',
    icon: 'tungstenMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'tungsten mining hammer',
    sellPrice: 200,
    description: 'A hammer forged from tungsten. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 440,
      attack: 60,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 45
    }]
  },

  tungsten_mining_anvil: {
    id: 'tungsten_mining_anvil',
    icon: 'tungstenMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'tungsten mining anvil',
    sellPrice: 200,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 900, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 48
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 45
    }]
  },

  obsidian_mining_hammer: {
    id: 'obsidian_mining_hammer',
    icon: 'obsidianMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'obsidian mining hammer',
    sellPrice: 200,
    description: 'A hammer forged from obsidian. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 450,
      attack: 70,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 50
    }]
  },

  obsidian_mining_anvil: {
    id: 'obsidian_mining_anvil',
    icon: 'obsidianMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'obsidian mining anvil',
    sellPrice: 250,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 1000, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 52
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 50
    }]
  },

  cobalt_mining_hammer: {
    id: 'cobalt_mining_hammer',
    icon: 'cobaltMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cobalt mining hammer',
    sellPrice: 1250,
    description: 'A hammer forged from cobalt. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 460,
      attack: 80,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 55
    }]
  },

  cobalt_mining_anvil: {
    id: 'cobalt_mining_anvil',
    icon: 'cobaltMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cobalt mining anvil',
    sellPrice: 250,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 1100, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 56
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 55
    }]
  },

  mithril_mining_hammer: {
    id: 'mithril_mining_hammer',
    icon: 'mithrilMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'mithril mining hammer',
    sellPrice: 500,
    description: 'A hammer forged from mithril. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 470,
      attack: 90,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 60
    }]
  },

  mithril_mining_anvil: {
    id: 'mithril_mining_anvil',
    icon: 'mithrilMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'mithril mining anvil',
    sellPrice: 275,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 1200, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 60
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 60
    }]
  },

  adamantium_mining_hammer: {
    id: 'adamantium_mining_hammer',
    icon: 'adamantiumMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'adamantium mining hammer',
    sellPrice: 750,
    description: 'A hammer forged from adamantium. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 480,
      attack: 100,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 65
    }]
  },

  adamantium_mining_anvil: {
    id: 'adamantium_mining_anvil',
    icon: 'adamantiumMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'adamantium mining anvil',
    sellPrice: 300,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 1300, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 64
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 65
    }]
  },

  orichalcum_mining_hammer: {
    id: 'orichalcum_mining_hammer',
    icon: 'orichalcumMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'orichalcum mining hammer',
    sellPrice: 1000,
    description: 'A hammer forged from orichalcum. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 490,
      attack: 120,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 70
    }]
  },

  orichalcum_mining_anvil: {
    id: 'orichalcum_mining_anvil',
    icon: 'orichalcumMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'orichalcum mining anvil',
    sellPrice: 350,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 1400, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 68
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 70
    }]
  },

  meteorite_mining_hammer: {
    id: 'meteorite_mining_hammer',
    icon: 'meteoriteMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'meteorite mining hammer',
    sellPrice: 1000,
    description: 'A hammer forged from meteorite. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500,
      attack: 130,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 75
    }]
  },

  meteorite_mining_anvil: {
    id: 'meteorite_mining_anvil',
    icon: 'meteoriteMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'meteorite mining anvil',
    sellPrice: 400,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 1500, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 72
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 75
    }]
  },

  fairy_steel_mining_hammer: {
    id: 'fairy_steel_mining_hammer',
    icon: 'fairySteelMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'fairy steel mining hammer',
    sellPrice: 1500,
    description: 'A hammer forged from fairy steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 510,
      attack: 140,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 4,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 80
    }]
  },

  fairy_steel_mining_anvil: {
    id: 'fairy_steel_mining_anvil',
    icon: 'fairySteelMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'fairy steel mining anvil',
    sellPrice: 500,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 1600, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 76
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 80
    }]
  },

  elven_steel_mining_hammer: {
    id: 'elven_steel_mining_hammer',
    icon: 'elvenSteelMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'elven steel mining hammer',
    sellPrice: 1500,
    description: 'A hammer forged from elven steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 520,
      attack: 150,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 4,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 85
    }]
  },

  elven_steel_mining_anvil: {
    id: 'elven_steel_mining_anvil',
    icon: 'elvenSteelMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'elven steel mining anvil',
    sellPrice: 600,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 1700, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 80
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 85
    }]
  },

  cursed_mining_hammer: {
    id: 'cursed_mining_hammer',
    icon: 'cursedMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cursed mining hammer',
    sellPrice: 2000,
    description: 'A cursed hammer. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 530,
      attack: 160,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 5,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 90
    }]
  },

  cursed_mining_anvil: {
    id: 'cursed_mining_anvil',
    icon: 'cursedMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cursed mining anvil',
    sellPrice: 800,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 1800, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 84
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 90
    }]
  },
  
  darksteel_mining_hammer: {
    id: 'darksteel_mining_hammer',
    icon: 'darksteelMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'darksteel mining hammer',
    sellPrice: 2500,
    description: 'A darksteel hammer. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 550,
      attack: 175,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 10,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 95
    }]
  },

  darksteel_mining_anvil: {
    id: 'darksteel_mining_anvil',
    icon: 'darksteelMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'darksteel mining anvil',
    sellPrice: 1000,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 1900, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 88
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 95
    }]
  },
  
  radiant_mining_hammer: {
    id: 'radiant_mining_hammer',
    icon: 'radiantMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'radiant mining hammer',
    sellPrice: 3000,
    description: 'A radiant hammer. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 575,
      attack: 190,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 15,
      attack: 15,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 100
    }]
  },

  radiant_mining_anvil: {
    id: 'radiant_mining_anvil',
    icon: 'radiantMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'radiant mining anvil',
    sellPrice: 1500,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 2000, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 92
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 100
    }]
  },
  
  astral_mining_hammer: {
    id: 'astral_mining_hammer',
    icon: 'astralMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'astral mining hammer',
    sellPrice: 4000,
    description: 'A astral hammer. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 600,
      attack: 205,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 20,
      attack: 20,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 105
    }]
  },

  astral_mining_anvil: {
    id: 'astral_mining_anvil',
    icon: 'astralMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'astral mining anvil',
    sellPrice: 2000,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 2100, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 96
    },
    extraStats: {
      energyStorage: 200,
      miner: 3,
      attack: 30,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 105
    }]
  },
  
  titanfoil_mining_hammer: {
    id: 'titanfoil_mining_hammer',
    icon: 'titanfoilMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'titanfoil mining hammer',
    sellPrice: 7500,
    description: 'A titanfoil hammer. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 650,
      attack: 225,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 30,
      attack: 25,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 110
    }]
  },

  titanfoil_mining_anvil: {
    id: 'titanfoil_mining_anvil',
    icon: 'titanfoilMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'titanfoil mining anvil',
    sellPrice: 2000,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 2200, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 100
    },
    extraStats: {
      energyStorage: 225,
      miner: 3,
      attack: 100,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 110
    }]
  },
  
  relicrock_mining_hammer: {
    id: 'relicrock_mining_hammer',
    icon: 'relicrockMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'relicrock mining hammer',
    sellPrice: 7500,
    description: 'A relicrock hammer. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 700,
      attack: 250,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 40,
      attack: 35,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 115
    }]
  },

  relicrock_mining_anvil: {
    id: 'relicrock_mining_anvil',
    icon: 'relicrockMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'relicrock mining anvil',
    sellPrice: 2000,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 2300, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 110
    },
    extraStats: {
      energyStorage: 250,
      miner: 3,
      attack: 100,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 115
    }]
  },
  
  eternium_mining_hammer: {
    id: 'eternium_mining_hammer',
    icon: 'eterniumMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'eternium mining hammer',
    sellPrice: 10000,
    description: 'A eternium hammer. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 800,
      attack: 300,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 50,
      attack: 50,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 120
    }]
  },

  eternium_mining_anvil: {
    id: 'eternium_mining_anvil',
    icon: 'eterniumMiningAnvil.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'eternium mining anvil',
    sellPrice: 2000,
    description: 'A hammer forged with an anvil. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 500, // Maximum energy stored
      attack: 2400, // Damage per hit
      energyPerHit: 30, // Energy used per hit
      energyRegen: 1,
      miner: 120
    },
    extraStats: {
      energyStorage: 300,
      miner: 3,
      attack: 250,
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 120
    }]
  },

  // Passive heavy pickaxes
  copper_dwarven_idol: {
    id: 'copper_dwarven_idol',
    icon: 'copperDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'Copper Dwarven Idol',
    sellPrice: 50,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 25 // Increases efficiency of miners
    },
    extraStats: {
      miner: 10
    }
  },

  // Passive heavy pickaxes
  pine_idol: {
    id: 'pine_idol',
    icon: 'pineIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'Pine Idol',
    sellPrice: 50,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 15 // Increases efficiency of miners
    },
    extraStats: {
      miner: 5
    }
  },

  tin_dwarven_idol: {
    id: 'tin_dwarven_idol',
    icon: 'tinDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'tin Dwarven Idol',
    sellPrice: 50,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 35 // Increases efficiency of miners
    },
    extraStats: {
      miner: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 3
    }]
  },

  bronze_dwarven_idol: {
    id: 'bronze_dwarven_idol',
    icon: 'bronzeDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'bronze Dwarven Idol',
    sellPrice: 50,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 45 // Increases efficiency of miners
    },
    extraStats: {
      miner: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 6
    }]
  },

  ash_idol: {
    id: 'ash_idol',
    icon: 'ashIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'Ash Idol',
    sellPrice: 50,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 35 // Increases efficiency of miners
    },
    extraStats: {
      miner: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 6
    }]
  },

  iron_dwarven_idol: {
    id: 'iron_dwarven_idol',
    icon: 'ironDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'iron Dwarven Idol',
    sellPrice: 100,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 55
    },
    extraStats: {
      miner: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 10
    }]
  },

  silver_dwarven_idol: {
    id: 'silver_dwarven_idol',
    icon: 'silverDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'silver Dwarven Idol',
    sellPrice: 100,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 65
    },
    extraStats: {
      miner: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 15
    }]
  },

  maple_idol: {
    id: 'maple_idol',
    icon: 'mapleIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'Maple Idol',
    sellPrice: 100,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 55
    },
    extraStats: {
      miner: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 15
    }]
  },

  gold_dwarven_idol: {
    id: 'gold_dwarven_idol',
    icon: 'goldDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'gold Dwarven Idol',
    sellPrice: 100,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 75
    },
    extraStats: {
      miner: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 20
    }]
  },


  carbon_dwarven_idol: {
    id: 'carbon_dwarven_idol',
    icon: 'carbonDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'carbon Dwarven Idol',
    sellPrice: 300,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 85
    },
    extraStats: {
      miner: 15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 25
    }]
  },

  cherry_idol: {
    id: 'cherry_idol',
    icon: 'cherryIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'Cherry Idol',
    sellPrice: 300,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 75
    },
    extraStats: {
      miner: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 25
    }]
  },

  steel_dwarven_idol: {
    id: 'steel_dwarven_idol',
    icon: 'steelDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'steel Dwarven Idol',
    sellPrice: 200,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 95
    },
    extraStats: {
      miner: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 30
    }]
  },

  platinum_dwarven_idol: {
    id: 'platinum_dwarven_idol',
    icon: 'platinumDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'platinum Dwarven Idol',
    sellPrice: 200,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 105
    },
    extraStats: {
      miner: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 35
    }]
  },

  elk_idol: {
    id: 'elk_idol',
    icon: 'elkIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'elm Idol',
    sellPrice: 200,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 95
    },
    extraStats: {
      miner: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 35
    }]
  },

  titanium_dwarven_idol: {
    id: 'titanium_dwarven_idol',
    icon: 'titaniumDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'titanium Dwarven Idol',
    sellPrice: 200,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 115
    },
    extraStats: {
      miner: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 40
    }]
  },

  tungsten_dwarven_idol: {
    id: 'tungsten_dwarven_idol',
    icon: 'tungstenDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'tungsten Dwarven Idol',
    sellPrice: 200,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 125
    },
    extraStats: {
      miner: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 45
    }]
  },

  blue_gum_idol: {
    id: 'blue_gum_idol',
    icon: 'blueGumIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'blue gum Idol',
    sellPrice: 200,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 115
    },
    extraStats: {
      miner: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 45
    }]
  },

  obsidian_dwarven_idol: {
    id: 'obsidian_dwarven_idol',
    icon: 'obsidianDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'obsidian Dwarven Idol',
    sellPrice: 200,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 135
    },
    extraStats: {
      miner: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 50
    }]
  },

  cobalt_dwarven_idol: {
    id: 'cobalt_dwarven_idol',
    icon: 'cobaltDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'cobalt Dwarven Idol',
    sellPrice: 1250,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 145
    },
    extraStats: {
      miner: 27
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 55
    }]
  },

  denya_idol: {
    id: 'denya_idol',
    icon: 'denyaIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'denya Idol',
    sellPrice: 1250,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 125
    },
    extraStats: {
      miner: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 55
    }]
  },

  mithril_dwarven_idol: {
    id: 'mithril_dwarven_idol',
    icon: 'mithrilDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'mithril Dwarven Idol',
    sellPrice: 500,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 155
    },
    extraStats: {
      miner: 27
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 60
    }]
  },

  adamantium_dwarven_idol: {
    id: 'adamantium_dwarven_idol',
    icon: 'adamantiumDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'adamantium Dwarven Idol',
    sellPrice: 750,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 165
    },
    extraStats: {
      miner: 27
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 65
    }]
  },

  hickory_idol: {
    id: 'hickory_idol',
    icon: 'hickoryIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'hickory Idol',
    sellPrice: 750,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 139
    },
    extraStats: {
      miner: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 65
    }]
  },

  orichalcum_dwarven_idol: {
    id: 'orichalcum_dwarven_idol',
    icon: 'orichalcumDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'orichalcum Dwarven Idol',
    sellPrice: 1000,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 175
    },
    extraStats: {
      miner: 24
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 70
    }]
  },

  meteorite_dwarven_idol: {
    id: 'meteorite_dwarven_idol',
    icon: 'meteoriteDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'meteorite Dwarven Idol',
    sellPrice: 1000,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 185
    },
    extraStats: {
      miner: 27
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 75
    }]
  },

  poplar_idol: {
    id: 'poplar_idol',
    icon: 'poplarIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'poplar Idol',
    sellPrice: 1000,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 155
    },
    extraStats: {
      miner: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 75
    }]
  },

  fairy_steel_dwarven_idol: {
    id: 'fairy_steel_dwarven_idol',
    icon: 'fairySteelDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'fairy steel Dwarven Idol',
    sellPrice: 1500,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 195
    },
    extraStats: {
      miner: 30
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 80
    }]
  },

  elven_steel_dwarven_idol: {
    id: 'elven_steel_dwarven_idol',
    icon: 'elvenSteelDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'elven steel Dwarven Idol',
    sellPrice: 1500,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 205
    },
    extraStats: {
      miner: 30
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 85
    }]
  },

  willow_idol: {
    id: 'willow_idol',
    icon: 'willowIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'willow Idol',
    sellPrice: 1500,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 180
    },
    extraStats: {
      miner: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 85
    }]
  },

  cursed_dwarven_idol: {
    id: 'cursed_dwarven_idol',
    icon: 'cursedDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'cursed dwarven Idol',
    sellPrice: 2000,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 215
    },
    extraStats: {
      miner: 33
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 90
    }]
  },

  darksteel_dwarven_idol: {
    id: 'darksteel_dwarven_idol',
    icon: 'darksteelDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'darksteel dwarven Idol',
    sellPrice: 2000,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 225
    },
    extraStats: {
      miner: 33
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 95
    }]
  },

  radiant_dwarven_idol: {
    id: 'radiant_dwarven_idol',
    icon: 'radiantDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'radiant dwarven Idol',
    sellPrice: 2200,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 235
    },
    extraStats: {
      miner: 33
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 100
    }]
  },

  astral_dwarven_idol: {
    id: 'astral_dwarven_idol',
    icon: 'astralDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'astral dwarven Idol',
    sellPrice: 2500,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 245
    },
    extraStats: {
      miner: 33
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 105
    }]
  },

  titanfoil_dwarven_idol: {
    id: 'titanfoil_dwarven_idol',
    icon: 'titanfoilDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'titanfoil dwarven Idol',
    sellPrice: 2900,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 255
    },
    extraStats: {
      miner: 33
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 110
    }]
  },

  relicrock_dwarven_idol: {
    id: 'relicrock_dwarven_idol',
    icon: 'relicrockDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'relicrock dwarven Idol',
    sellPrice: 3400,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 265
    },
    extraStats: {
      miner: 35
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 115
    }]
  },

  eternium_dwarven_idol: {
    id: 'eternium_dwarven_idol',
    icon: 'eterniumDwarvenIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'eternium dwarven Idol',
    sellPrice: 4000,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 275
    },
    extraStats: {
      miner: 50
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 120
    }]
  },

  // Starter Pickaxe
  sharp_rock_pickaxe: {
    id: 'sharp_rock_pickaxe',
    icon: 'sharpRock.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'sharp rock',
    sellPrice: 10,
    description: 'A sharp rock. Useful for mining.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 50, // Maximum energy stored
      attack: 1, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 60, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 10,
      energyRegen: 15
    }
  },

  // Main Line pickaxes
  primitive_pickaxe: {
    id: 'primitive_pickaxe',
    icon: 'primitivePickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'stone pickaxe',
    sellPrice: 10,
    description: 'A basic pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 100, // Maximum energy stored
      attack: 2, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 35, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 10,
      energyRegen: 2
    }
  },

  copper_pickaxe: {
    id: 'copper_pickaxe',
    icon: 'copperPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'copper pickaxe',
    sellPrice: 50,
    description: 'A pickaxe forged from copper. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 112, // Maximum energy stored
      attack: 8, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 8 // Energy regen per minute
    },
    extraStats: {
      energyStorage: 12,
      attack: 3,
      energyRegen: 3
    }
  },

  tin_pickaxe: {
    id: 'tin_pickaxe',
    icon: 'tinPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'tin pickaxe',
    sellPrice: 50,
    description: 'A pickaxe forged from tin. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 112, // Maximum energy stored
      attack: 12, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 8, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 12,
      attack: 3,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 3
    }]
  },

  bronze_pickaxe: {
    id: 'bronze_pickaxe',
    icon: 'bronzePickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'bronze pickaxe',
    sellPrice: 50,
    description: 'A pickaxe forged from bronze. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 112, // Maximum energy stored
      attack: 16, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 8, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 12,
      attack: 3,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 6
    }]
  },

  iron_pickaxe: {
    id: 'iron_pickaxe',
    icon: 'ironPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'iron pickaxe',
    sellPrice: 100,
    description: 'A pickaxe forged from iron. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 114,
      attack: 25,
      energyPerHit: 1,
      energyRegen: 7,
    },
    extraStats: {
      energyStorage: 14,
      attack: 5,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 10
    }]
  },

  silver_pickaxe: {
    id: 'silver_pickaxe',
    icon: 'silverPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'silver pickaxe',
    sellPrice: 100,
    description: 'A pickaxe forged from silver. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 114,
      attack: 29,
      energyPerHit: 1,
      energyRegen: 6,
    },
    extraStats: {
      energyStorage: 14,
      attack: 5,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 15
    }]
  },

  gold_pickaxe: {
    id: 'gold_pickaxe',
    icon: 'goldPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'gold pickaxe',
    sellPrice: 100,
    description: 'A pickaxe forged from gold. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 114,
      attack: 36,
      energyPerHit: 1,
      energyRegen: 6,
    },
    extraStats: {
      energyStorage: 14,
      attack: 5,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 20
    }]
  },

  carbon_pickaxe: {
    id: 'carbon_pickaxe',
    icon: 'carbonPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'carbon pickaxe',
    sellPrice: 300,
    description: 'A pickaxe forged from carbon. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 120,
      attack: 42,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 20,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 25
    }]
  },

  steel_pickaxe: {
    id: 'steel_pickaxe',
    icon: 'steelPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'steel pickaxe',
    sellPrice: 200,
    description: 'A pickaxe forged from steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 116, // Maximum energy stored
      attack: 52, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 30
    }]
  },

  platinum_pickaxe: {
    id: 'platinum_pickaxe',
    icon: 'platinumPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'platinum pickaxe',
    sellPrice: 200,
    description: 'A pickaxe forged from platinum. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 116, // Maximum energy stored
      attack: 62, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 35
    }]
  },

  titanium_pickaxe: {
    id: 'titanium_pickaxe',
    icon: 'titaniumPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'titanium pickaxe',
    sellPrice: 200,
    description: 'A pickaxe forged from titanium. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 116, // Maximum energy stored
      attack: 74, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 40
    }]
  },

  tungsten_pickaxe: {
    id: 'tungsten_pickaxe',
    icon: 'tungstenPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'tungsten pickaxe',
    sellPrice: 200,
    description: 'A pickaxe forged from tungsten. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: { // 53 * 7 = 371 DPM
      energyStorage: 116, // Maximum energy stored
      attack: 84, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 45
    }]
  },

  obsidian_pickaxe: {
    id: 'obsidian_pickaxe',
    icon: 'obsidianPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'obsidian pickaxe',
    sellPrice: 200,
    description: 'A pickaxe forged from obsidian. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 116, // Maximum energy stored
      attack: 100, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 50
    }]
  },

  cobalt_pickaxe: {
    id: 'cobalt_pickaxe',
    icon: 'cobaltPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cobalt pickaxe',
    sellPrice: 750,
    description: 'A pickaxe forged from cobalt. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 128,
      attack: 110,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 28,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 55
    }]
  },

  mithril_pickaxe: {
    id: 'mithril_pickaxe',
    icon: 'mithrilPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'mithril pickaxe',
    sellPrice: 500,
    description: 'A pickaxe forged from mithril. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 122,
      attack: 120,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 22,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 60
    }]
  },

  adamantium_pickaxe: {
    id: 'adamantium_pickaxe',
    icon: 'adamantiumPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'adamantium pickaxe',
    sellPrice: 750,
    description: 'A pickaxe forged from adamantium. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 125,
      attack: 130,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 25,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 65
    }]
  },

  orichalcum_pickaxe: {
    id: 'orichalcum_pickaxe',
    icon: 'orichalcumPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'orichalcum pickaxe',
    sellPrice: 1000,
    description: 'A pickaxe forged from orichalcum. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 128,
      attack: 145,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 28,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 70
    }]
  },

  meteorite_pickaxe: {
    id: 'meteorite_pickaxe',
    icon: 'meteoritePickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'meteorite pickaxe',
    sellPrice: 1250,
    description: 'A pickaxe forged from meteorite. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 128,
      attack: 160,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 28,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 75
    }]
  },

  fairy_steel_pickaxe: {
    id: 'fairy_steel_pickaxe',
    icon: 'fairySteelPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'fairy steel pickaxe',
    sellPrice: 1500,
    description: 'A pickaxe forged from fairy steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 131,
      attack: 180,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 31,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 80
    }]
  },

  elven_steel_pickaxe: {
    id: 'elven_steel_pickaxe',
    icon: 'elvenSteelPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'elven steel pickaxe',
    sellPrice: 1750,
    description: 'A pickaxe forged from elven steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 131,
      attack: 205,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 31,
      attack: 5,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 85
    }]
  },

  cursed_pickaxe: {
    id: 'cursed_pickaxe',
    icon: 'cursedPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cursed pickaxe',
    sellPrice: 2000,
    description: 'A cursed pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 131,
      attack: 230,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 31,
      attack: 10,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 90
    }]
  },

  darksteel_pickaxe: {
    id: 'darksteel_pickaxe',
    icon: 'darksteelPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'darksteel pickaxe',
    sellPrice: 2250,
    description: 'A darksteel pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 135,
      attack: 255,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 35,
      attack: 12,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 95
    }]
  },

  radiant_pickaxe: {
    id: 'radiant_pickaxe',
    icon: 'radiantPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'radiant pickaxe',
    sellPrice: 2500,
    description: 'A radiant pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 139,
      attack: 280,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 39,
      attack: 14,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 100
    }]
  },  

  astral_pickaxe: {
    id: 'astral_pickaxe',
    icon: 'astralPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'astral pickaxe',
    sellPrice: 2750,
    description: 'A astral pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 145,
      attack: 305,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 42,
      attack: 16,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 105
    }]
  },  

  titanfoil_pickaxe: {
    id: 'titanfoil_pickaxe',
    icon: 'titanfoilPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'titanfoil pickaxe',
    sellPrice: 2750,
    description: 'A titanfoil pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 150,
      attack: 335,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 50,
      attack: 20,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 110
    }]
  },  

  relicrock_pickaxe: {
    id: 'relicrock_pickaxe',
    icon: 'relicrockPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'relicrock pickaxe',
    sellPrice: 2750,
    description: 'A relicrock pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 160,
      attack: 370,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 55,
      attack: 25,
      energyRegen: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 115
    }]
  },  

  eternium_pickaxe: {
    id: 'eternium_pickaxe',
    icon: 'eterniumPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'eternium pickaxe',
    sellPrice: 2750,
    description: 'A eternium pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 185,
      attack: 420,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 65,
      attack: 30,
      energyRegen: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'mining',
      level: 120
    }]
  },  
};
