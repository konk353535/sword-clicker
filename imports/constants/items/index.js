import { ASTRONOMY_ITEMS } from "../astronomy/items"
import { COMBAT_ITEMS } from "../combat/items"
import { CRAFTING_ITEMS } from "../crafting/items"
import { FARMING_ITEMS } from "../farming/items"
import { INSCRIPTION_ITEMS } from "../inscription/items"
import { MINING_ITEMS } from "../mining/items"
import { WOODCUTTING_ITEMS } from "../woodcutting/items"
import { MISC_ITEMS } from "./items"

console.log("exporting items/index.js ITEMS")
export const ITEMS = Object.freeze(Object.assign({}, 
    MISC_ITEMS,
    COMBAT_ITEMS,
    CRAFTING_ITEMS,
    MINING_ITEMS,
    WOODCUTTING_ITEMS,
    FARMING_ITEMS,
    INSCRIPTION_ITEMS,
    ASTRONOMY_ITEMS
))

console.log("exporting items/index.js ITEM_RARITIES")
export const ITEM_RARITIES = Object.freeze({
    // Crafting T-1 (next - 30)
    crude: {
        rarityId: "crude",
        label: "Crude",
        color: "555555",
        statBonuses: -50.0,
        nextRarity: {
            rarityId: "rough",
            successChance: 75.0 // 75% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "crude"
        }
    },

    // Crafting T0 (next - 20)
    rough: {
        rarityId: "rough",
        label: "Rough",
        color: "666644",
        statBonuses: -20.0,
        nextRarity: {
            rarityId: "standard",
            successChance: 60.0 // 60% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "crude"
        }
    },

    // Crafting T1
    standard: {
        rarityId: "standard",
        label: "",
        color: "",
        statBonuses: 0.0,
        nextRarity: {
            rarityId: "improved",
            successChance: 45.0 // 45% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "rough"
        }
    },

    // Crafting T2 (33.333% of the last + 20/[tier-1]%)
    improved: {
        rarityId: "improved",
        label: "Improved",
        color: "998800",
        statBonuses: 20.0,
        nextRarity: {
            rarityId: "mastercrafted",
            successChance: 30.0 // 30% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "standard"
        }
    },

    // Crafting T3 (33.333% of the last + 20/[tier-1]%)
    mastercrafted: {
        rarityId: "mastercrafted",
        label: "Mastercrafted",
        color: "cc7700",
        statBonuses: 36.7,
        nextRarity: {
            rarityId: "masterforged",
            successChance: 15.0 // 15% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "improved"
        }
    },

    // Crafting T4 (33.333% of the last + 20/[tier-1]%)
    masterforged: {
        rarityId: "masterforged",
        label: "Masterforged",
        color: "ee6622",
        statBonuses: 55.6,
        nextRarity: {
            rarityId: "ascended",
            successChance: 5.0 // 5% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "mastercrafted"
        }
    },

    // Crafting T5 (33.333% of the last + 20/[tier-1]%)
    ascended: {
        rarityId: "ascended",
        label: "Ascended",
        color: "ff2266",
        statBonuses: 79.1,
        nextRarity: {
            rarityId: "ethereal",
            successChance: -5.0 // -5% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "masterforged"
        }
    },

    // Crafting T6 (33.333% of the last + 20/[tier-1]%)
    ethereal: {
        rarityId: "ethereal",
        label: "Ethereal",
        color: "FF5599",
        statBonuses: 109.4,
        nextRarity: {
            rarityId: "perfect",
            successChance: -5.0 // -5% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "ascended"
        }
    },

    // Crafting T7 (33.333% of the last + 20/[tier-1]%)
    perfect: {
        rarityId: "perfect",
        label: "Perfect",
        color: "FF71aa",
        statBonuses: 149.2,
        prevRarity: {
            rarityId: "ethereal"
        }
    },

    // Looted T1
    uncommon: {
        rarityId: "uncommon",
        label: "",
        color: "",
        statBonuses: 0.0,
        nextRarity: {
            rarityId: "fine",
            successChance: 45.0 // 45% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "uncommon"
        }
    },

    // Looted T2 (25% of the last + 25/[tier/2]%)
    fine: {
        rarityId: "fine",
        label: "Fine",
        color: "66aaaa",
        statBonuses: 25.0,
        nextRarity: {
            rarityId: "rare",
            successChance: 30.0 // 30% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "uncommon"
        }
    },

    // Looted T3 (25% of the last + 25/[tier/2]%)
    rare: {
        rarityId: "rare",
        label: "Rare",
        color: "3388aa",
        statBonuses: 47.9,
        nextRarity: {
            rarityId: "extraordinary",
            successChance: 15.0 // 1% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "fine"
        }
    },

    // Looted T4 (25% of the last + 25/[tier/2]%)
    extraordinary: {
        rarityId: "extraordinary",
        label: "Extraordinary",
        color: "3366aa",
        statBonuses: 72.4,
        nextRarity: {
            rarityId: "phenomenal",
            successChance: 5.0 // 5% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "rare"
        }
    },

    // Looted T5 (25% of the last + 25/[tier/2]%)
    phenomenal: {
        rarityId: "phenomenal",
        label: "Phenomenal",
        color: "0055cc",
        statBonuses: 100.5,
        nextRarity: {
            rarityId: "epic",
            successChance: -5.0 // -5% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "extraordinary"
        }
    },

    // Looted T6 (25% of the last + 25/[tier/2]%)
    epic: {
        rarityId: "epic",
        label: "Epic",
        color: "0022ee",
        statBonuses: 134.0,
        nextRarity: {
            rarityId: "divine",
            successChance: -10.0 // -10% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "phenomenal"
        }
    },

    // Looted T7 (25% of the last + 25/[tier/2]%)
    divine: {
        rarityId: "divine",
        label: "Divine",
        color: "4444ff",
        statBonuses: 174.6,
        nextRarity: {
            rarityId: "incredible",
            successChance: -15.0 // -15% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "epic"
        }
    },

    // Looted T8 (25% of the last + 25/[tier/2]%)
    incredible: {
        rarityId: "incredible",
        label: "Incredible",
        color: "6141ff",
        statBonuses: 224.5,
        nextRarity: {
            rarityId: "unparalleled",
            successChance: -15.0 // -15% chance (plus 1% chance per crafting skill level above recipe to craft this)
        },
        prevRarity: {
            rarityId: "divine"
        }
    },

    // Looted T9 (25% of the last + 25/[tier/2]%)
    unparalleled: {
        rarityId: "unparalleled",
        label: "Unparalleled",
        color: "9151ff",
        statBonuses: 286.2,
        prevRarity: {
            rarityId: "incredible"
        }
    },

    // Special (non-tiered): for boss drops
    prized: {
        rarityId: "prized",
        label: "Prized",
        color: "883388",
        statBonuses: 0.0
    },

    // Special (non-tiered): for legendary items
    legendary: {
        rarityId: "legendary",
        label: "Legendary",
        color: "6633ff",
        statBonuses: 0.0
    },

    // Special (non-tiered): for artifact items
    artifact: {
        rarityId: "artifact",
        label: "Artifact",
        color: "44cc44",
        statBonuses: 0.0
    },

    // Special (non-tiered): for developer items
    developer: {
        rarityId: "developer",
        label: "Developer",
        color: "22dd55",
        statBonuses: 0.0
    }
})
