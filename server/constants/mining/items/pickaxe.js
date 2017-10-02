
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
      energyStorage: 1000,
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
      energyStorage: 12, // Maximum energy stored
      attack: 8, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 8, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 10,
      attack: 2,
      energyRegen: 3
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
      energyStorage: 80,
      attack: 12,
      energyPerHit: 1,
      energyRegen: 8,
    },
    extraStats: {
      energyStorage: 10,
      attack: 2,
      energyRegen: 3
    }
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
      energyStorage: 80,
      attack: 16,
      energyPerHit: 1,
      energyRegen: 8,
    },
    extraStats: {
      energyStorage: 10,
      attack: 2,
      energyRegen: 3
    }
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
      energyStorage: 85,
      attack: 24,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    }
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
      energyStorage: 85,
      attack: 30,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    }
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
      energyStorage: 85,
      attack: 36,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    }
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
      energyStorage: 95,
      attack: 42,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    }
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
      energyStorage: 90,
      attack: 50,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    }
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
      energyStorage: 90,
      attack: 58,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    }
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
      energyStorage: 90,
      attack: 66,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    }
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
      energyStorage: 90,
      attack: 76,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    }
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
      energyStorage: 90,
      attack: 85,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 2
    }
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
      energyStorage: 105,
      attack: 93,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 3
    }
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
      energyStorage: 100,
      attack: 100,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 3
    }
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
      energyStorage: 105,
      attack: 110,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 3
    }
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
      energyStorage: 105,
      attack: 120,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 3
    }
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
      energyStorage: 105,
      attack: 130,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 3,
      energyRegen: 3
    }
  },

  fairy_steel_mining_hammer: {
    id: 'fairy_steel_mining_hammer',
    icon: 'fairySteelMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'fairy_steel mining hammer',
    sellPrice: 1500,
    description: 'A hammer forged from fairy steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 105,
      attack: 140,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 4,
      energyRegen: 3
    }
  },

  elven_steel_mining_hammer: {
    id: 'elven_steel_mining_hammer',
    icon: 'elvenSteelMiningHammer.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'elven_steel mining hammer',
    sellPrice: 1500,
    description: 'A hammer forged from elven steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 105,
      attack: 150,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 4,
      energyRegen: 3
    }
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
      energyStorage: 110,
      attack: 130,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 10,
      attack: 5,
      energyRegen: 3
    }
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
      miner: 25 // Increases effeciency of miners
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
      miner: 15 // Increases effeciency of miners
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
      miner: 35 // Increases effeciency of miners
    },
    extraStats: {
      miner: 10
    }
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
      miner: 45 // Increases effeciency of miners
    },
    extraStats: {
      miner: 10
    }
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
      miner: 35 // Increases effeciency of miners
    },
    extraStats: {
      miner: 5
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },

  elk_idol: {
    id: 'elk_idol',
    icon: 'elkIdol.svg',
    category: 'mining',
    slot: 'mining_offhand',
    name: 'elk Idol',
    sellPrice: 200,
    description: 'An idol used to inspire miners.',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      miner: 95
    },
    extraStats: {
      miner: 5
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
      miner: 113
    },
    extraStats: {
      miner: 5
    }
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
      miner: 18
    }
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
      miner: 21
    }
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
    }
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
    }
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
      miner: 24
    }
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
    }
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
    }
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
      miner: 215
    },
    extraStats: {
      miner: 30
    }
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
    }
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
      miner: 225
    },
    extraStats: {
      miner: 33
    }
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
      energyStorage: 25, // Maximum energy stored
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
      energyStorage: 12, // Maximum energy stored
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
      energyStorage: 12, // Maximum energy stored
      attack: 12, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 8, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 12,
      attack: 3,
      energyRegen: 3
    }
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
      energyStorage: 12, // Maximum energy stored
      attack: 16, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 8, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 12,
      attack: 3,
      energyRegen: 3
    }
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
      energyStorage: 14,
      attack: 25,
      energyPerHit: 1,
      energyRegen: 7,
    },
    extraStats: {
      energyStorage: 14,
      attack: 5,
      energyRegen: 3
    }
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
      energyStorage: 14,
      attack: 29,
      energyPerHit: 1,
      energyRegen: 6,
    },
    extraStats: {
      energyStorage: 14,
      attack: 5,
      energyRegen: 3
    }
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
      energyStorage: 14,
      attack: 36,
      energyPerHit: 1,
      energyRegen: 6,
    },
    extraStats: {
      energyStorage: 14,
      attack: 5,
      energyRegen: 3
    }
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
      energyStorage: 20,
      attack: 42,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 20,
      attack: 5,
      energyRegen: 2
    }
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
      energyStorage: 16, // Maximum energy stored
      attack: 52, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      energyRegen: 2
    }
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
      energyStorage: 16, // Maximum energy stored
      attack: 62, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      energyRegen: 2
    }
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
      energyStorage: 16, // Maximum energy stored
      attack: 74, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      energyRegen: 2
    }
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
      energyStorage: 16, // Maximum energy stored
      attack: 84, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      energyRegen: 2
    }
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
      energyStorage: 16, // Maximum energy stored
      attack: 100, // Damage per hit
      energyPerHit: 1, // Energy used per hit
      energyRegen: 5, // Energy regen per minute
    },
    extraStats: {
      energyStorage: 16,
      attack: 5,
      energyRegen: 2
    }
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
      energyStorage: 28,
      attack: 110,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 28,
      attack: 5,
      energyRegen: 2
    }
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
      energyStorage: 22,
      attack: 120,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 22,
      attack: 5,
      energyRegen: 2
    }
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
      energyStorage: 25,
      attack: 130,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 25,
      attack: 5,
      energyRegen: 2
    }
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
      energyStorage: 28,
      attack: 145,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 28,
      attack: 5,
      energyRegen: 2
    }
  },

  meteorite_pickaxe: {
    id: 'meteorite_pickaxe',
    icon: 'meteoritePickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'meteorite pickaxe',
    sellPrice: 1000,
    description: 'A pickaxe forged from meteorite. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 28,
      attack: 160,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 28,
      attack: 5,
      energyRegen: 2
    }
  },

  fairy_steel_pickaxe: {
    id: 'fairy_steel_pickaxe',
    icon: 'fairySteelPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'fairy steel pickaxe',
    sellPrice: 750,
    description: 'A pickaxe forged from fairy steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 31,
      attack: 180,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 31,
      attack: 5,
      energyRegen: 2
    }
  },

  elven_steel_pickaxe: {
    id: 'elven_steel_pickaxe',
    icon: 'elvenSteelPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'elven steel pickaxe',
    sellPrice: 750,
    description: 'A pickaxe forged from elven steel. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 31,
      attack: 205,
      energyPerHit: 1,
      energyRegen: 5,
    },
    extraStats: {
      energyStorage: 31,
      attack: 5,
      energyRegen: 2
    }
  },

  cursed_pickaxe: {
    id: 'cursed_pickaxe',
    icon: 'cursedPickaxe.svg',
    category: 'mining',
    slot: 'pickaxe',
    name: 'cursed pickaxe',
    sellPrice: 750,
    description: 'A cursed pickaxe. Used for mining',
    isPickaxe: true,
    isEquippable: true,
    stats: {
      energyStorage: 31,
      attack: 220,
      energyPerHit: 1,
      energyRegen: 4,
    },
    extraStats: {
      energyStorage: 31,
      attack: 6,
      energyRegen: 3
    }
  }
}
