import { MEDIUM_SPEED, SLOW_SPEED, VERY_FAST_SPEED } from "../attackSpeeds"

const RADIANT_MULTIPLIER = 1.2

export const MISC_ITEMS = {
    /*
    thirsting_saber: {
        id: "thirsting_saber",
        icon: "thirstingSaber.svg",
        category: "combat",
        weaponType: "sword",
        slot: "mainHand",
        name: "thirsting saber",
        sellPrice: 2500,
        description: "The blade seems to hunger for blood.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 30,
            attackMax: 40,
            attackSpeed: VERY_FAST_SPEED,
            accuracy: 50,
            health: -200,
            defense: -100,
            armor: -200
        },
        extraStats: {
            attack: 4,
            attackMax: 4,
            accuracy: 4
        },
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 45
            }
        ]
    },
    */

    /*
    enchanted_long_sword: {
        id: "enchanted_long_sword",
        icon: "enchantedLongsword.svg",
        category: "combat",
        weaponType: "longSword",
        slot: "mainHand",
        name: "enchanted long sword",
        sellPrice: 5000,
        description: "Rumored to be cursed, those who use it perish",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 33,
            attackMax: 44,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 44,
            defense: -10,
            armor: -10,
            health: -10
        },
        extraStats: {
            attack: 5,
            attackMax: 5,
            accuracy: 5
        },
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 20
            }
        ]
    },
    */

    /*
    spartan_shield: {
        id: "spartan_shield",
        icon: "spartanShield.svg",
        category: "combat",
        slot: "offHand",
        weaponType: "shield",
        name: "spartan shield",
        sellPrice: 2500,
        description: "The shield from a fallen spartan.",
        isEquippable: true,
        stats: {
            healthMax: 75,
            defense: 25,
            armor: 125,
            attackSpeed: -0.2
        },
        extraStats: {
            healthMax: 5,
            defense: 5,
            armor: 5
        },
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 20
            }
        ]
    },
    */

    snake_skin_chest: {
        id: "snake_skin_chest",
        icon: "snakeSkinChest.svg",
        category: "combat",
        slot: "chest",
        name: "snake skin chest",
        sellPrice: 400,
        description: "A chest made from snake skin",
        isEquippable: true,
        stats: {
            healthMax: 50,
            defense: 5,
            accuracy: 5
        },
        extraStats: {
            healthMax: 50,
            defense: 3,
            accuracy: 3
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 20
            }
        ],
        tier: 2
    },

    bone_kings_axe: {
        id: "bone_kings_axe",
        icon: "boneKingsAxe.svg",
        category: "combat",
        weaponType: "battleAxe",
        slot: "mainHand",
        name: "bone kings axe",
        sellPrice: 350,
        description: "The axe from a fallen warrior.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 20.4,
            attackMax: 59,
            attackSpeed: 0.3,
            accuracy: 26.4,
            criticalChance: 35
        },
        extraStats: {
            attack: 7.7,
            attackMax: 13.8
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 30
            }
        ],
        enchantments: ["axe_cleave"],
        tier: 3
    },

    spartan_spear: {
        id: "spartan_spear",
        icon: "spartanSpear.svg",
        category: "combat",
        weaponType: "spear",
        slot: "mainHand",
        name: "spartans spear",
        sellPrice: 275,
        description: "Used to train defense.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 9.1,
            attackMax: 12.4,
            attackSpeed: 0.5,
            accuracy: 25.4,
            magicArmor: 20
        },
        extraStats: {
            attack: 2.7,
            attackMax: 3.4,
            accuracy: 3.4,
            magicArmor: 5
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 25
            }
        ],
        tier: 6
    },

    oversized_club: {
        id: "oversized_club",
        icon: "oversizedClub.svg",
        category: "combat",
        weaponType: "broadSword",
        slot: "mainHand",
        name: "oversized club",
        sellPrice: 650,
        description: "An overly large club",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 100,
            attackSpeed: 0.3,
            accuracy: 30.9,
            criticalChance: 5
        },
        extraStats: {
            attack: 5.5,
            attackMax: 21.1,
            accuracy: 10.3
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 10
            }
        ],
        enchantments: ["oversized_club"]
        // no tier set: does not hold magic pool
    },

    dev_sword: {
        id: "dev_sword",
        icon: "prismaticLongsword.png",
        category: "combat",
        weaponType: "shortSword",
        slot: "mainHand",
        name: "ultimate sword",
        sellPrice: 0,
        description: "For developer use only.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 10,
            attackSpeed: 1,
            accuracy: 100000
        },
        extraStats: {},
        upgradeRarity: [{ chance: 100, rarityId: "developer" }],
        tier: 30
    },

    dev_shield: {
        id: "dev_shield",
        icon: "prismaticKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "invulnerability shield",
        sellPrice: 0,
        description: "For developer use only.",
        isEquippable: true,
        stats: {
            absorption: 1
        },
        extraStats: {},
        upgradeRarity: [{ chance: 100, rarityId: "developer" }],
        tier: 30
    },

    dev_legs: {
        id: "dev_legs",
        icon: "prismaticPlatelegs.png",
        category: "combat",
        slot: "legs",
        name: "invulnerability armor",
        sellPrice: 0,
        description: "For developer use only.",
        isEquippable: true,
        stats: {
            absorption: 1
        },
        extraStats: {},
        upgradeRarity: [{ chance: 100, rarityId: "developer" }],
        tier: 30
    },

    /* Kite Shield +70% armor, +15% defense, -Attack Speed, -Accuracy */
    copper_kite_shield: {
        id: "copper_kite_shield",
        icon: "copperKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "copper kite shield",
        sellPrice: 75,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 2,
            defense: 3.5,
            armor: 17,
            attackSpeed: -0.15,
            accuracy: -2.8,
            absorption: 0.01
        },
        extraStats: {
            healthMax: 1,
            defense: 1.2,
            armor: 5.1,
            accuracy: 0.6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        reforgeRecipe: {
            requiresCrafting: 6
        }
    },
    tin_kite_shield: {
        id: "tin_kite_shield",
        icon: "tinKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "tin kite shield",
        sellPrice: 75,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 2.8,
            defense: 4.2 * 1.15,
            armor: 14 * 1.7,
            attackSpeed: -0.15,
            accuracy: -4.2 * 1.15 * 0.5,
            absorption: 0.02
        },
        extraStats: {
            healthMax: 0.8,
            defense: 1.3 * 1.15,
            armor: 4.2 * 1.7,
            accuracy: 1.3 * 1.15 * 0.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 5
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 10
        }
    },
    bronze_kite_shield: {
        id: "bronze_kite_shield",
        icon: "bronzeKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "bronze kite shield",
        sellPrice: 200,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 3.6,
            defense: 6.3,
            armor: 30.9,
            attackSpeed: -0.15,
            accuracy: -4.1,
            absorption: 0.03
        },
        extraStats: {
            healthMax: 1.1,
            defense: 2.0,
            armor: 9.4,
            accuracy: 1.0
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 10
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 15
        }
    },
    iron_kite_shield: {
        id: "iron_kite_shield",
        icon: "ironKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "iron kite shield",
        sellPrice: 275,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 4.5,
            defense: 6.9 * 1.15,
            armor: 22.8 * 1.7,
            attackSpeed: -0.15,
            accuracy: -3.5 * 1.15,
            absorption: 0.04
        },
        extraStats: {
            healthMax: 1.3,
            defense: 2.1 * 1.15,
            armor: 6.8 * 1.7,
            accuracy: 1.1 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 15
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 20
        }
    },
    silver_kite_shield: {
        id: "silver_kite_shield",
        icon: "silverKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "silver kite shield",
        sellPrice: 400,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 5.4,
            defense: 8.3 * 1.15,
            armor: 27.4 * 1.7,
            attackSpeed: -0.15,
            accuracy: -4.2 * 1.15,
            absorption: 0.05
        },
        extraStats: {
            healthMax: 1.6,
            defense: 2.5 * 1.15,
            armor: 8.2 * 1.7,
            accuracy: 1.3 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 20
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 25
        }
    },
    gold_kite_shield: {
        id: "gold_kite_shield",
        icon: "goldKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "gold kite shield",
        sellPrice: 500,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 6.5,
            defense: 10 * 1.15,
            armor: 32.9 * 1.7,
            attackSpeed: -0.15,
            accuracy: -5 * 1.15,
            absorption: 0.06
        },
        extraStats: {
            healthMax: 2,
            defense: 3 * 1.15,
            armor: 9.9 * 1.7,
            accuracy: 1.5 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 25
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 30
        }
    },
    carbon_kite_shield: {
        id: "carbon_kite_shield",
        icon: "carbonKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "carbon kite shield",
        sellPrice: 650,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 7.6,
            defense: 11.7 * 1.15,
            armor: 38.5 * 1.7,
            attackSpeed: -0.15,
            accuracy: -5.9 * 1.15,
            absorption: 0.07
        },
        extraStats: {
            healthMax: 2.3,
            defense: 3.5 * 1.15,
            armor: 11.5 * 1.7,
            accuracy: 1.8 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 30
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 35
        }
    },
    steel_kite_shield: {
        id: "steel_kite_shield",
        icon: "steelKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "steel kite shield",
        sellPrice: 750,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 8.6,
            defense: 13.2 * 1.15,
            armor: 43.5 * 1.7,
            attackSpeed: -0.15,
            accuracy: -6.6 * 1.15,
            absorption: 0.08
        },
        extraStats: {
            healthMax: 2.6,
            defense: 4 * 1.15,
            armor: 13 * 1.7,
            accuracy: 2 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 35
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 40
        }
    },
    platinum_kite_shield: {
        id: "platinum_kite_shield",
        icon: "platinumKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "platinum kite shield",
        sellPrice: 900,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 10.2,
            defense: 7.9 * 1.15,
            armor: 51.8 * 1.7,
            attackSpeed: -0.15,
            accuracy: -15.7 * 1.15,
            absorption: 0.09
        },
        extraStats: {
            healthMax: 3.1,
            defense: 4.7 * 1.15,
            armor: 15.5 * 1.7,
            accuracy: 2.4 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 40
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 45
        }
    },
    titanium_kite_shield: {
        id: "titanium_kite_shield",
        icon: "titaniumKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "titanium kite shield",
        sellPrice: 1000,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 11.7,
            defense: 18.1 * 1.15,
            armor: 59.6 * 1.7,
            attackSpeed: -0.15,
            accuracy: -9.1 * 1.15,
            absorption: 0.10
        },
        extraStats: {
            healthMax: 3.5,
            defense: 5.4 * 1.15,
            armor: 17.9 * 1.7,
            accuracy: 2.7 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 45
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 50
        }
    },
    tungsten_kite_shield: {
        id: "tungsten_kite_shield",
        icon: "tungstenKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "tungsten kite shield",
        sellPrice: 1200,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 13.2,
            defense: 20.5 * 1.15,
            armor: 67.3 * 1.7,
            attackSpeed: -0.15,
            accuracy: -10.3 * 1.15,
            absorption: 0.11
        },
        extraStats: {
            healthMax: 4,
            defense: 6.1 * 1.15,
            armor: 20.2 * 1.7,
            accuracy: 3.1 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 50
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 55
        }
    },
    obsidian_kite_shield: {
        id: "obsidian_kite_shield",
        icon: "obsidianKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "obsidian kite shield",
        sellPrice: 1350,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 14.8,
            defense: 23 * 1.15,
            armor: 75.4 * 1.7,
            attackSpeed: -0.15,
            accuracy: -11.5 * 1.15,
            absorption: 0.12
        },
        extraStats: {
            healthMax: 4.4,
            defense: 6.9 * 1.15,
            armor: 22.6 * 1.7,
            accuracy: 3.5 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 55
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 60
        }
    },
    cobalt_kite_shield: {
        id: "cobalt_kite_shield",
        icon: "cobaltKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "cobalt kite shield",
        sellPrice: 1500,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 16.6,
            defense: 25.8 * 1.15,
            armor: 84.4 * 1.7,
            attackSpeed: -0.15,
            accuracy: -12.9 * 1.15,
            absorption: 0.13
        },
        extraStats: {
            healthMax: 5,
            defense: 7.7 * 1.15,
            armor: 25.3 * 1.7,
            accuracy: 3.9 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 60
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 65
        }
    },
    mithril_kite_shield: {
        id: "mithril_kite_shield",
        icon: "mithrilKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "mithril kite shield",
        sellPrice: 1600,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 18.4,
            defense: 28.6 * 1.15,
            armor: 93.7 * 1.7,
            attackSpeed: -0.15,
            accuracy: -14.3 * 1.15,
            absorption: 0.14
        },
        extraStats: {
            healthMax: 5.5,
            defense: 8.6 * 1.15,
            armor: 28.1 * 1.7,
            accuracy: 4.3 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 65
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 70
        }
    },
    adamantium_kite_shield: {
        id: "adamantium_kite_shield",
        icon: "adamantiumKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "adamantium kite shield",
        sellPrice: 1800,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 20.2,
            defense: 31.5 * 1.15,
            armor: 103.1 * 1.7,
            attackSpeed: -0.15,
            accuracy: -15.8 * 1.15,
            absorption: 0.15
        },
        extraStats: {
            healthMax: 6.1,
            defense: 9.5 * 1.15,
            armor: 30.9 * 1.7,
            accuracy: 4.8 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 70
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 75
        }
    },
    orichalcum_kite_shield: {
        id: "orichalcum_kite_shield",
        icon: "orichalcumKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "orichalcum kite shield",
        sellPrice: 1800,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 22,
            defense: 34.3 * 1.15,
            armor: 112.4 * 1.7,
            attackSpeed: -0.15,
            accuracy: -17.2 * 1.15,
            absorption: 0.16
        },
        extraStats: {
            healthMax: 6.6,
            defense: 10.3 * 1.15,
            armor: 33.7 * 1.7,
            accuracy: 5.2 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 75
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 80
        }
    },
    meteorite_kite_shield: {
        id: "meteorite_kite_shield",
        icon: "meteoriteKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "meteorite kite shield",
        sellPrice: 2000,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 24.4,
            defense: 38.1 * 1.15,
            armor: 124.8 * 1.7,
            attackSpeed: -0.15,
            accuracy: -19.1 * 1.15,
            absorption: 0.17
        },
        extraStats: {
            healthMax: 7.3,
            defense: 11.4 * 1.15,
            armor: 37.4 * 1.7,
            accuracy: 5.7 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 80
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 85
        }
    },
    fairy_steel_kite_shield: {
        id: "fairy_steel_kite_shield",
        icon: "fairySteelKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "fairy steel kite shield",
        sellPrice: 2250,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 26.8,
            defense: 41.9 * 1.15,
            armor: 137.3 * 1.7,
            attackSpeed: -0.15,
            accuracy: -21.0 * 1.15,
            absorption: 0.18
        },
        extraStats: {
            healthMax: 8,
            defense: 12.6 * 1.15,
            armor: 41.2 * 1.7,
            accuracy: 6.3 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 85
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 90
        }
    },
    elven_steel_kite_shield: {
        id: "elven_steel_kite_shield",
        icon: "elvenSteelKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "elven steel kite shield",
        sellPrice: 2500,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 30,
            defense: 46.9 * 1.15,
            armor: 153.8 * 1.7,
            attackSpeed: -0.15,
            accuracy: -23.5 * 1.15,
            absorption: 0.19
        },
        extraStats: {
            healthMax: 9,
            defense: 14.1 * 1.15,
            armor: 46.1 * 1.7,
            accuracy: 7.1 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 90
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 95
        }
    },
    cursed_kite_shield: {
        id: "cursed_kite_shield",
        icon: "cursedKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "cursed kite shield",
        sellPrice: 3000,
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 32.7,
            defense: 51.1 * 1.15,
            armor: 167.6 * 1.7,
            attackSpeed: -0.15,
            accuracy: -25.6 * 1.15,
            absorption: 0.20
        },
        extraStats: {
            healthMax: 9.8,
            defense: 15.3 * 1.15,
            armor: 50.3 * 1.7,
            accuracy: 6.7 * 1.15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 95
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 100
        }
    },
    darksteel_kite_shield: {
        id: "darksteel_kite_shield",
        icon: "darksteelKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "darksteel kite shield",
        sellPrice: Math.round(3000 * 1.1),
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 32.7 * 1.1,
            defense: 51.1 * 1.15 * 1.1,
            armor: 167.6 * 1.7 * 1.1,
            attackSpeed: -0.15,
            accuracy: -51.1 * 1.15 * 0.5 * 1.1,
            absorption: 0.21
        },
        extraStats: {
            healthMax: 9.8 * 1.1,
            defense: 15.3 * 1.15 * 1.1,
            armor: 50.3 * 1.7 * 1.1,
            attackSpeed: -0.15,
            accuracy: 15.3 * 1.15 * 0.5 * 1.1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 100
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 105
        }
    },
    radiant_kite_shield: {
        id: "radiant_kite_shield",
        icon: "radiantKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "radiant kite shield",
        sellPrice: Math.round(3000 * 1.2),
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 32.7 * 1.2,
            defense: 51.1 * 1.15 * 1.2,
            armor: 167.6 * 1.7 * 1.2,
            attackSpeed: -0.15,
            accuracy: -51.1 * 1.15 * 0.5 * 1.2,
            absorption: 0.22
        },
        extraStats: {
            healthMax: 9.8 * 1.2,
            defense: 15.3 * 1.15 * 1.2,
            armor: 50.3 * 1.7 * 1.2,
            attackSpeed: -0.15,
            accuracy: 15.3 * 1.15 * 0.5 * 1.2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 105
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 110
        }
    },
    astral_kite_shield: {
        id: "astral_kite_shield",
        icon: "astralKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "astral kite shield",
        sellPrice: Math.round(3000 * 1.3),
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 32.7 * 1.3,
            defense: 51.1 * 1.15 * 1.3,
            armor: 167.6 * 1.7 * 1.3,
            attackSpeed: -0.15,
            accuracy: -51.1 * 1.15 * 0.5 * 1.3,
            absorption: 0.23
        },
        extraStats: {
            healthMax: 9.8 * 1.3,
            defense: 15.3 * 1.15 * 1.3,
            armor: 50.3 * 1.7 * 1.3,
            attackSpeed: -0.15,
            accuracy: 15.3 * 1.15 * 0.5 * 1.3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 110
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 115
        }
    },

    titanfoil_kite_shield: {
        id: "titanfoil_kite_shield",
        icon: "titanfoilKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "titanfoil kite shield",
        sellPrice: Math.round(3000 * 1.4),
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 32.7 * 1.4,
            defense: 51.1 * 1.15 * 1.4,
            armor: 167.6 * 1.7 * 1.4,
            attackSpeed: -0.15,
            accuracy: -51.1 * 1.15 * 0.5 * 1.4,
            absorption: 0.24
        },
        extraStats: {
            healthMax: 9.8 * 1.4,
            defense: 15.3 * 1.15 * 1.4,
            armor: 50.3 * 1.7 * 1.4,
            attackSpeed: -0.15,
            accuracy: 15.3 * 1.15 * 0.5 * 1.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 115
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 120
        }
    },

    relicrock_kite_shield: {
        id: "relicrock_kite_shield",
        icon: "relicrockKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "relicrock kite shield",
        sellPrice: Math.round(3000 * 1.5),
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 32.7 * 1.5,
            defense: 51.1 * 1.15 * 1.5,
            armor: 167.6 * 1.7 * 1.5,
            attackSpeed: -0.15,
            accuracy: -51.1 * 1.15 * 0.5 * 1.5,
            absorption: 0.25
        },
        extraStats: {
            healthMax: 9.8 * 1.5,
            defense: 15.3 * 1.15 * 1.5,
            armor: 50.3 * 1.7 * 1.5,
            attackSpeed: -0.15,
            accuracy: 15.3 * 1.15 * 0.5 * 1.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 120
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 125
        }
    },

    eternium_kite_shield: {
        id: "eternium_kite_shield",
        icon: "eterniumKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "eternium kite shield",
        sellPrice: Math.round(3000 * 1.6),
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 32.7 * 1.6,
            defense: 51.1 * 1.15 * 1.6,
            armor: 167.6 * 1.7 * 1.6,
            attackSpeed: -0.15,
            accuracy: -51.1 * 1.15 * 0.5 * 1.6,
            absorption: 0.26
        },
        extraStats: {
            healthMax: 9.8 * 1.6,
            defense: 15.3 * 1.15 * 1.6,
            armor: 50.3 * 1.7 * 1.6,
            attackSpeed: -0.15,
            accuracy: 15.3 * 1.15 * 0.5 * 1.6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 130
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 135
        }
    },

    prismatic_kite_shield: {
        id: "prismatic_kite_shield",
        icon: "prismaticKiteShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "prismatic kite shield",
        sellPrice: Math.round(3000 * 1.75),
        description: "Provides high defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 32.7 * 1.75,
            defense: 51.1 * 1.15 * 1.75,
            armor: 167.6 * 1.7 * 1.75,
            attackSpeed: -0.15,
            accuracy: -51.1 * 1.15 * 0.5 * 1.75,
            absorption: 0.27
        },
        extraStats: {
            healthMax: 9.8 * 1.75,
            defense: 15.3 * 1.15 * 1.75,
            armor: 50.3 * 1.7 * 1.75,
            attackSpeed: -0.15,
            accuracy: 15.3 * 1.15 * 0.5 * 1.75
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 125
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 130
        }
    },

    /* Buckler -30% armor, -10% defense, + small accuracy */
    /*
  tin_buckler: {
    id: "tin_buckler",
    icon: "tinBuckler.svg",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "tin buckler",
    sellPrice: 75,
    description: "Provides average defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 2.8,
      defense: 3.8,
      armor: 10.4,
      accuracy: 2
    },
    extraStats: {
      healthMax: 0.8,
      defense: 1.3,
      armor: 4.2,
      accuracy: 1.0
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },

  gold_buckler: {
    id: "gold_buckler",
    icon: "goldBuckler.svg",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "gold buckler",
    sellPrice: 350,
    description: "Provides average defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 6.5,
      defense: 8,
      armor: 26.9,
      accuracy: 4.5
    },
    extraStats: {
      healthMax: 2,
      defense: 2.5,
      armor: 7.1,
      accuracy: 1.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },

  tungsten_buckler: {
    id: "tungsten_buckler",
    icon: "tungstenBuckler.svg",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "tungsten buckler",
    sellPrice: 850,
    description: "Provides average defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 13.2,
      defense: 16.5,
      armor: 45.3,
      accuracy: 5.5
    },
    extraStats: {
      healthMax: 4,
      defense: 5.4,
      armor: 14,
      accuracy: 2.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 50
    }]
  },

  mithril_buckler: {
    id: "mithril_buckler",
    icon: "mithrilBuckler.svg",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "mithril buckler",
    sellPrice: 950,
    description: "Provides average defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 18.4,
      defense: 20.6,
      armor: 75.7,
      accuracy: 6.6
    },
    extraStats: {
      healthMax: 5.5,
      defense: 6.6,
      armor: 19.6,
      accuracy: 2.8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 65
    }]
  },

  elven_steel_buckler: {
    id: "elven_steel_buckler",
    icon: "elvenSteelBuckler.svg",
    category: "combat",
    weaponType: "shield",
    slot: "offHand",
    name: "elven steel buckler",
    sellPrice: 1350,
    description: "Provides average defense bonuses",
    isEquippable: true,
    stats: {
      healthMax: 30,
      defense: 38.9,
      armor: 113.8,
      accuracy: 8.9
    },
    extraStats: {
      healthMax: 9,
      defense: 12.1,
      armor: 32.1,
      accuracy: 3.6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 90
    }]
  },
  */

    copper_buckler: {
        id: "copper_buckler",
        icon: "buckler_t1.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "copper buckler",
        sellPrice: 50,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 11.3,
            defense: 3.4,
            armor: 7.6,
            accuracy: 2.2
        },
        extraStats: {
            healthMax: 3.4,
            defense: 1,
            armor: 3,
            accuracy: 0.9
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        reforgeRecipe: {
            requiresCrafting: 6
        }
    },

    tin_buckler: {
        id: "tin_buckler",
        icon: "buckler_t1.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "tin buckler",
        sellPrice: 125,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 13.7,
            defense: 4.2,
            armor: 10.4,
            accuracy: 2.5
        },
        extraStats: {
            healthMax: 4.1,
            defense: 1.3,
            armor: 4.2,
            accuracy: 1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 5
            },
            {
                type: "skill",
                name: "defense",
                level: 2
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 10
        }
    },

    bronze_buckler: {
        id: "bronze_buckler",
        icon: "buckler_t3.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "bronze buckler",
        sellPrice: 195,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 16.9,
            defense: 5.3,
            armor: 13.9,
            accuracy: 3
        },
        extraStats: {
            healthMax: 5.1,
            defense: 1.6,
            armor: 5.6,
            accuracy: 1.2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 10
            },
            {
                type: "skill",
                name: "defense",
                level: 5
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 15
        }
    },

    iron_buckler: {
        id: "iron_buckler",
        icon: "buckler_t4.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "iron buckler",
        sellPrice: 270,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 20.7,
            defense: 6.5,
            armor: 18,
            accuracy: 3.5
        },
        extraStats: {
            healthMax: 6.2,
            defense: 2,
            armor: 7.2,
            accuracy: 1.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 15
            },
            {
                type: "skill",
                name: "defense",
                level: 10
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 20
        }
    },

    silver_buckler: {
        id: "silver_buckler",
        icon: "buckler_t5.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "silver buckler",
        sellPrice: 340,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 25.1,
            defense: 8,
            armor: 22.6,
            accuracy: 4.1
        },
        extraStats: {
            healthMax: 7.5,
            defense: 2.4,
            armor: 9,
            accuracy: 1.6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 20
            },
            {
                type: "skill",
                name: "defense",
                level: 15
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 25
        }
    },

    gold_buckler: {
        id: "gold_buckler",
        icon: "buckler_t6.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "gold buckler",
        sellPrice: 415,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 30.1,
            defense: 9.6,
            armor: 27.6,
            accuracy: 4.8
        },
        extraStats: {
            healthMax: 9,
            defense: 2.9,
            armor: 11,
            accuracy: 1.9
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 25
            },
            {
                type: "skill",
                name: "defense",
                level: 20
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 30
        }
    },

    carbon_buckler: {
        id: "carbon_buckler",
        icon: "buckler_t7.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "carbon buckler",
        sellPrice: 485,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 35.5,
            defense: 11.4,
            armor: 33.1,
            accuracy: 5.6
        },
        extraStats: {
            healthMax: 10.7,
            defense: 3.4,
            armor: 13.2,
            accuracy: 2.2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 30
            },
            {
                type: "skill",
                name: "defense",
                level: 25
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 35
        }
    },

    steel_buckler: {
        id: "steel_buckler",
        icon: "buckler_t8.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "steel buckler",
        sellPrice: 560,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 41.4,
            defense: 13.3,
            armor: 38.8,
            accuracy: 6.4
        },
        extraStats: {
            healthMax: 12.4,
            defense: 4,
            armor: 15.5,
            accuracy: 2.6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 35
            },
            {
                type: "skill",
                name: "defense",
                level: 30
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 40
        }
    },

    platinum_buckler: {
        id: "platinum_buckler",
        icon: "buckler_t9.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "platinum buckler",
        sellPrice: 630,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 47.7,
            defense: 15.4,
            armor: 44.9,
            accuracy: 7.3
        },
        extraStats: {
            healthMax: 14.3,
            defense: 4.6,
            armor: 18,
            accuracy: 2.9
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 40
            },
            {
                type: "skill",
                name: "defense",
                level: 35
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 45
        }
    },

    titanium_buckler: {
        id: "titanium_buckler",
        icon: "buckler_t10.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "titanium buckler",
        sellPrice: 705,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 54.4,
            defense: 17.5,
            armor: 51.4,
            accuracy: 8.2
        },
        extraStats: {
            healthMax: 16.3,
            defense: 5.3,
            armor: 20.6,
            accuracy: 3.3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 45
            },
            {
                type: "skill",
                name: "defense",
                level: 40
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 50
        }
    },

    tungsten_buckler: {
        id: "tungsten_buckler",
        icon: "buckler_t11.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "tungsten buckler",
        sellPrice: 775,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 61.4,
            defense: 19.9,
            armor: 58.1,
            accuracy: 9.2
        },
        extraStats: {
            healthMax: 18.4,
            defense: 6,
            armor: 23.2,
            accuracy: 3.7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 50
            },
            {
                type: "skill",
                name: "defense",
                level: 45
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 55
        }
    },

    obsidian_buckler: {
        id: "obsidian_buckler",
        icon: "buckler_t12.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "obsidian buckler",
        sellPrice: 850,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 68.8,
            defense: 22.3,
            armor: 65.1,
            accuracy: 10.2
        },
        extraStats: {
            healthMax: 20.6,
            defense: 6.7,
            armor: 26,
            accuracy: 4.1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 55
            },
            {
                type: "skill",
                name: "defense",
                level: 50
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 60
        }
    },

    cobalt_buckler: {
        id: "cobalt_buckler",
        icon: "buckler_t13.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "cobalt buckler",
        sellPrice: 920,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 76.6,
            defense: 24.8,
            armor: 72.4,
            accuracy: 11.3
        },
        extraStats: {
            healthMax: 23,
            defense: 7.4,
            armor: 29,
            accuracy: 4.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 60
            },
            {
                type: "skill",
                name: "defense",
                level: 55
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 65
        }
    },

    mithril_buckler: {
        id: "mithril_buckler",
        icon: "buckler_t14.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "mithril buckler",
        sellPrice: 995,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 84.7,
            defense: 27.5,
            armor: 79.9,
            accuracy: 12.5
        },
        extraStats: {
            healthMax: 25.4,
            defense: 8.3,
            armor: 32,
            accuracy: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 65
            },
            {
                type: "skill",
                name: "defense",
                level: 60
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 70
        }
    },

    adamantium_buckler: {
        id: "adamantium_buckler",
        icon: "buckler_t15.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "adamantium buckler",
        sellPrice: 1065,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 93.1,
            defense: 30.3,
            armor: 87.7,
            accuracy: 13.6
        },
        extraStats: {
            healthMax: 27.9,
            defense: 9.1,
            armor: 35.1,
            accuracy: 5.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 70
            },
            {
                type: "skill",
                name: "defense",
                level: 65
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 75
        }
    },

    orichalcum_buckler: {
        id: "orichalcum_buckler",
        icon: "buckler_t16.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "orichalcum buckler",
        sellPrice: 1140,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 101.9,
            defense: 33.1,
            armor: 95.7,
            accuracy: 14.9
        },
        extraStats: {
            healthMax: 30.6,
            defense: 9.9,
            armor: 38.3,
            accuracy: 6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 75
            },
            {
                type: "skill",
                name: "defense",
                level: 70
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 80
        }
    },

    meteorite_buckler: {
        id: "meteorite_buckler",
        icon: "buckler_t17.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "meteorite buckler",
        sellPrice: 1210,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 110.9,
            defense: 36.1,
            armor: 103.9,
            accuracy: 16.1
        },
        extraStats: {
            healthMax: 33.3,
            defense: 10.8,
            armor: 41.6,
            accuracy: 6.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 80
            },
            {
                type: "skill",
                name: "defense",
                level: 75
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 85
        }
    },

    fairy_steel_buckler: {
        id: "fairy_steel_buckler",
        icon: "buckler_t18.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "fairy steel buckler",
        sellPrice: 1285,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 120.3,
            defense: 39.2,
            armor: 112.4,
            accuracy: 17.4
        },
        extraStats: {
            healthMax: 36.1,
            defense: 11.8,
            armor: 45,
            accuracy: 7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 85
            },
            {
                type: "skill",
                name: "defense",
                level: 80
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 90
        }
    },

    elven_steel_buckler: {
        id: "elven_steel_buckler",
        icon: "buckler_t19.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "elven steel buckler",
        sellPrice: 1355,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 129.9,
            defense: 42.3,
            armor: 121.1,
            accuracy: 18.8
        },
        extraStats: {
            healthMax: 39,
            defense: 12.7,
            armor: 48.4,
            accuracy: 7.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 90
            },
            {
                type: "skill",
                name: "defense",
                level: 85
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 95
        }
    },

    cursed_buckler: {
        id: "cursed_buckler",
        icon: "buckler_t20.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "cursed buckler",
        sellPrice: 1430,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 139.9,
            defense: 45.6,
            armor: 130,
            accuracy: 20.2
        },
        extraStats: {
            healthMax: 42,
            defense: 13.7,
            armor: 52,
            accuracy: 8.1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 95
            },
            {
                type: "skill",
                name: "defense",
                level: 90
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 100
        }
    },

    darksteel_buckler: {
        id: "darksteel_buckler",
        icon: "buckler_t21.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "darksteel buckler",
        sellPrice: 1500,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 150.1,
            defense: 48.9,
            armor: 139.1,
            accuracy: 21.6
        },
        extraStats: {
            healthMax: 45,
            defense: 14.7,
            armor: 55.6,
            accuracy: 8.6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 100
            },
            {
                type: "skill",
                name: "defense",
                level: 95
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 105
        }
    },

    radiant_buckler: {
        id: "radiant_buckler",
        icon: "buckler_t22.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "radiant buckler",
        sellPrice: 1575,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 160.5,
            defense: 52.4,
            armor: 148.3,
            accuracy: 23.1
        },
        extraStats: {
            healthMax: 48.2,
            defense: 15.7,
            armor: 59.3,
            accuracy: 9.2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 105
            },
            {
                type: "skill",
                name: "defense",
                level: 100
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 110
        }
    },

    astral_buckler: {
        id: "astral_buckler",
        icon: "buckler_t23.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "astral buckler",
        sellPrice: 1645,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 171.3,
            defense: 55.9,
            armor: 157.8,
            accuracy: 24.6
        },
        extraStats: {
            healthMax: 51.4,
            defense: 16.8,
            armor: 63.1,
            accuracy: 9.8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 110
            },
            {
                type: "skill",
                name: "defense",
                level: 105
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 115
        }
    },

    titanfoil_buckler: {
        id: "titanfoil_buckler",
        icon: "buckler_t24.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "titanfoil buckler",
        sellPrice: 1720,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 182.3,
            defense: 59.5,
            armor: 167.5,
            accuracy: 26.1
        },
        extraStats: {
            healthMax: 54.7,
            defense: 17.9,
            armor: 67,
            accuracy: 10.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 115
            },
            {
                type: "skill",
                name: "defense",
                level: 110
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 120
        }
    },

    relicrock_buckler: {
        id: "relicrock_buckler",
        icon: "buckler_t25.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "relicrock buckler",
        sellPrice: 1790,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 193.5,
            defense: 63.2,
            armor: 177.3,
            accuracy: 27.7
        },
        extraStats: {
            healthMax: 58.1,
            defense: 19,
            armor: 70.9,
            accuracy: 11.1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 120
            },
            {
                type: "skill",
                name: "defense",
                level: 115
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 125
        }
    },

    eternium_buckler: {
        id: "eternium_buckler",
        icon: "buckler_t26.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "eternium buckler",
        sellPrice: 1865,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 205,
            defense: 67,
            armor: 187.4,
            accuracy: 29.3
        },
        extraStats: {
            healthMax: 61.5,
            defense: 20.1,
            armor: 75,
            accuracy: 11.7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 125
            },
            {
                type: "skill",
                name: "defense",
                level: 120
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 130
        }
    },

    prismatic_buckler: {
        id: "prismatic_buckler",
        icon: "buckler_t27.png",
        category: "combat",
        weaponType: "buckler",
        slot: "offHand",
        name: "prismatic buckler",
        sellPrice: 1865,
        description: "Provides average defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 205 * 1.09375,
            defense: 67 * 1.09375,
            armor: 187.4 * 1.09375,
            accuracy: 29.3 * 1.09375
        },
        extraStats: {
            healthMax: 61.5 * 1.09375,
            defense: 20.1 * 1.09375,
            armor: 75 * 1.09375,
            accuracy: 11.7 * 1.09375
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 130
            },
            {
                type: "skill",
                name: "defense",
                level: 125
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 135
        }
    },

    /* Knife - Off handed weapon, minor accuracy and damage increases */
    copper_knife: {
        id: "copper_knife",
        icon: "copperKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "copper knife",
        sellPrice: 75,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 1.7,
            accuracy: 1
        },
        extraStats: {
            attack: 1,
            attackMax: 3,
            accuracy: 1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        reforgeRecipe: {
            requiresCrafting: 6
        }
    },

    tin_knife: {
        id: "tin_knife",
        icon: "tinKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "tin knife",
        sellPrice: 150,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 1.3,
            attackMax: 2.3,
            accuracy: 1.5
        },
        extraStats: {
            attack: 1,
            attackMax: 3,
            accuracy: 1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 5
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 10
        }
    },

    bronze_knife: {
        id: "bronze_knife",
        icon: "bronzeKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "bronze knife",
        sellPrice: 225,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 1.6,
            attackMax: 2.9,
            accuracy: 2
        },
        extraStats: {
            attack: 2,
            attackMax: 4,
            accuracy: 2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 10
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 15
        }
    },

    iron_knife: {
        id: "iron_knife",
        icon: "ironKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "iron knife",
        sellPrice: 300,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 1.9,
            attackMax: 3.5,
            accuracy: 2.5
        },
        extraStats: {
            attack: 2,
            attackMax: 4,
            accuracy: 2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 15
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 20
        }
    },

    silver_knife: {
        id: "silver_knife",
        icon: "silverKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "silver knife",
        sellPrice: 375,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 2.2,
            attackMax: 4.1,
            accuracy: 3
        },
        extraStats: {
            attack: 2,
            attackMax: 4,
            accuracy: 2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 20
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 25
        }
    },

    gold_knife: {
        id: "gold_knife",
        icon: "goldKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "gold knife",
        sellPrice: 450,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 2.5,
            attackMax: 4.7,
            accuracy: 3.5
        },
        extraStats: {
            attack: 3,
            attackMax: 5,
            accuracy: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 25
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 30
        }
    },

    carbon_knife: {
        id: "carbon_knife",
        icon: "carbonKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "carbon knife",
        sellPrice: 525,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 2.8,
            attackMax: 5.3,
            accuracy: 4
        },
        extraStats: {
            attack: 3,
            attackMax: 5,
            accuracy: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 30
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 35
        }
    },

    steel_knife: {
        id: "steel_knife",
        icon: "steelKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "steel knife",
        sellPrice: 600,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 3.1,
            attackMax: 5.9,
            accuracy: 4.5
        },
        extraStats: {
            attack: 3,
            attackMax: 5,
            accuracy: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 35
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 40
        }
    },

    platinum_knife: {
        id: "platinum_knife",
        icon: "platinumKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "platinum knife",
        sellPrice: 675,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 3.4,
            attackMax: 6.5,
            accuracy: 5
        },
        extraStats: {
            attack: 3,
            attackMax: 5,
            accuracy: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 40
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 45
        }
    },

    titanium_knife: {
        id: "titanium_knife",
        icon: "titaniumKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "titanium knife",
        sellPrice: 750,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 3.7,
            attackMax: 7.1,
            accuracy: 5.5
        },
        extraStats: {
            attack: 3,
            attackMax: 5,
            accuracy: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 45
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 50
        }
    },

    tungsten_knife: {
        id: "tungsten_knife",
        icon: "tungstenKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "tungsten knife",
        sellPrice: 825,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 4,
            attackMax: 7.7,
            accuracy: 6
        },
        extraStats: {
            attack: 4,
            attackMax: 6,
            accuracy: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 50
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 55
        }
    },

    obsidian_knife: {
        id: "obsidian_knife",
        icon: "obsidianKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "obsidian knife",
        sellPrice: 900,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 4.3,
            attackMax: 8.3,
            accuracy: 6.5
        },
        extraStats: {
            attack: 4,
            attackMax: 6,
            accuracy: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 55
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 60
        }
    },

    cobalt_knife: {
        id: "cobalt_knife",
        icon: "cobaltKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "cobalt knife",
        sellPrice: 975,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 4.6,
            attackMax: 8.9,
            accuracy: 7
        },
        extraStats: {
            attack: 4,
            attackMax: 6,
            accuracy: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 60
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 65
        }
    },

    mithril_knife: {
        id: "mithril_knife",
        icon: "mithrilKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "mithril knife",
        sellPrice: 1050,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 4.9,
            attackMax: 9.5,
            accuracy: 7.5
        },
        extraStats: {
            attack: 4,
            attackMax: 6,
            accuracy: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 65
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 70
        }
    },

    adamantium_knife: {
        id: "adamantium_knife",
        icon: "adamantiumKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "adamantium knife",
        sellPrice: 1125,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 5.2,
            attackMax: 10.1,
            accuracy: 8
        },
        extraStats: {
            attack: 4,
            attackMax: 6,
            accuracy: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 70
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 75
        }
    },

    orichalcum_knife: {
        id: "orichalcum_knife",
        icon: "orichalcumKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "orichalcum knife",
        sellPrice: 1200,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 5.5,
            attackMax: 10.7,
            accuracy: 8.5
        },
        extraStats: {
            attack: 4,
            attackMax: 6,
            accuracy: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 75
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 80
        }
    },

    meteorite_knife: {
        id: "meteorite_knife",
        icon: "meteoriteKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "meteorite knife",
        sellPrice: 1275,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 5.8,
            attackMax: 11.3,
            accuracy: 9
        },
        extraStats: {
            attack: 4,
            attackMax: 6,
            accuracy: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 80
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 85
        }
    },

    fairy_steel_knife: {
        id: "fairy_steel_knife",
        icon: "fairySteelKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "fairy steel knife",
        sellPrice: 1350,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 6.1,
            attackMax: 11.9,
            accuracy: 9.5
        },
        extraStats: {
            attack: 4,
            attackMax: 6,
            accuracy: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 85
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 90
        }
    },

    elven_steel_knife: {
        id: "elven_steel_knife",
        icon: "elvenSteelKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "elven steel knife",
        sellPrice: 1425,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 6.4,
            attackMax: 12.5,
            accuracy: 10
        },
        extraStats: {
            attack: 4,
            attackMax: 6,
            accuracy: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 90
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 95
        }
    },

    cursed_knife: {
        id: "cursed_knife",
        icon: "cursedKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "cursed knife",
        sellPrice: 1500,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 6.7,
            attackMax: 13.1,
            accuracy: 10.5
        },
        extraStats: {
            attack: 4,
            attackMax: 6,
            accuracy: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 95
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 100
        }
    },

    darksteel_knife: {
        id: "darksteel_knife",
        icon: "darksteelKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "darksteel knife",
        sellPrice: 1575,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 7,
            attackMax: 13.7,
            accuracy: 11
        },
        extraStats: {
            attack: 5,
            attackMax: 7,
            accuracy: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 100
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 105
        }
    },

    radiant_knife: {
        id: "radiant_knife",
        icon: "radiantKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "radiant knife",
        sellPrice: 1650,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 7.3,
            attackMax: 14.3,
            accuracy: 11.5
        },
        extraStats: {
            attack: 5,
            attackMax: 7,
            accuracy: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 105
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 110
        }
    },

    astral_knife: {
        id: "astral_knife",
        icon: "astralKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "astral knife",
        sellPrice: 1725,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 7.6,
            attackMax: 14.9,
            accuracy: 12
        },
        extraStats: {
            attack: 5,
            attackMax: 7,
            accuracy: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 110
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 115
        }
    },

    titanfoil_knife: {
        id: "titanfoil_knife",
        icon: "titanfoilKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "titanfoil knife",
        sellPrice: 1800,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 7.9,
            attackMax: 15.5,
            accuracy: 12.5
        },
        extraStats: {
            attack: 6,
            attackMax: 8,
            accuracy: 6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 115
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 120
        }
    },

    relicrock_knife: {
        id: "relicrock_knife",
        icon: "relicrockKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "relicrock knife",
        sellPrice: 1875,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 8.2,
            attackMax: 16.1,
            accuracy: 13
        },
        extraStats: {
            attack: 6,
            attackMax: 8,
            accuracy: 6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 120
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 125
        }
    },

    eternium_knife: {
        id: "eternium_knife",
        icon: "eterniumKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "eternium knife",
        sellPrice: 1950,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 8.5,
            attackMax: 16.7,
            accuracy: 13.5
        },
        extraStats: {
            attack: 6,
            attackMax: 8,
            accuracy: 6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 125
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 130
        }
    },

    prismatic_knife: {
        id: "prismatic_knife",
        icon: "prismaticKnife.png",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "prismatic knife",
        sellPrice: 1950,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            attack: 8.5 * 1.09375,
            attackMax: 16.7 * 1.09375,
            accuracy: 13.5 * 1.09375
        },
        extraStats: {
            attack: 6 * 1.09375,
            attackMax: 8 * 1.09375,
            accuracy: 6 * 1.09375
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 130
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 135
        }
    },

    /* Rapiers - Same as scimitar but 2h, attack speed of dagger, less accuracy */
    /*
  iron_rapiers: {
    id: "iron_rapiers",
    icon: "ironRapiers.png",
    category: "combat",
    weaponType: "rapier",
    slot: "mainHand",
    name: "iron rapiers",
    sellPrice: 150,
    description: "Defensive, elegant, practical.",
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 10.1,
      attackMax: 13.9,
      attackSpeed: 1.0,
      defense: -10,
      accuracy: 10.8
    },
    extraStats: {
      attack: 2.7,
      attackMax: 5.5,
      accuracy: 2.4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },

  adamantium_rapiers: {
    id: "adamantium_rapiers",
    icon: "adamantiumRapiers.png",
    category: "combat",
    weaponType: "rapier",
    slot: "mainHand",
    name: "adamantium rapiers",
    sellPrice: 1050,
    description: "Defensive, elegant, practical.",
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 45.4,
      attackMax: 71.8,
      attackSpeed: 1.0,
      defense: -10,
      accuracy: 45.8
    },
    extraStats: {
      attack: 12.3,
      attackMax: 24.8,
      accuracy: 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 70
    }]
  },

  fairy_steel_rapiers: {
    id: "fairy_steel_rapiers",
    icon: "fairySteelRapiers.png",
    category: "combat",
    weaponType: "rapier",
    slot: "mainHand",
    name: "fairy steel rapiers",
    sellPrice: 1250,
    description: "Defensive, elegant, practical.",
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 60.4,
      attackMax: 95.6,
      attackSpeed: 1.0,
      accuracy: 60.9,
      defense: -25
    },
    extraStats: {
      attack: 16.4,
      attackMax: 32.9,
      accuracy: 18.7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 85
    }]
  },
  */

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 15.3 @ 50% quality
    // ... chance to hit: 13.5% @ 50% quality
    // ... rated DPS: 2.07 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 15.6 @ 100% quality
    // ... chance to hit: 13.6% @ 100% quality
    // ... rated DPS: 2.12 @ 100% quality
    copper_rapiers: {
        id: "copper_rapiers",
        icon: "copperRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "copper rapiers",
        sellPrice: 85,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 5.1,
            attackMax: 5.7,
            attackSpeed: 1.0,
            accuracy: 1.6,
            defense: -1.25
        },
        extraStats: {
            attack: 1.4,
            attackMax: 2,
            accuracy: 0.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        reforgeRecipe: {
            requiresCrafting: 6
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 16.2 @ 50% quality
    // ... chance to hit: 13.8% @ 50% quality
    // ... rated DPS: 2.24 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 16.7 @ 100% quality
    // ... chance to hit: 13.8% @ 100% quality
    // ... rated DPS: 2.31 @ 100% quality
    tin_rapiers: {
        id: "tin_rapiers",
        icon: "tinRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "tin rapiers",
        sellPrice: 170,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 6.9,
            attackMax: 8.1,
            attackSpeed: 1.0,
            accuracy: 4.4,
            defense: -2.5
        },
        extraStats: {
            attack: 1.8,
            attackMax: 2.8,
            accuracy: 1.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 5
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 10
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 17.2 @ 50% quality
    // ... chance to hit: 14.1% @ 50% quality
    // ... rated DPS: 2.42 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 17.8 @ 100% quality
    // ... chance to hit: 14.2% @ 100% quality
    // ... rated DPS: 2.52 @ 100% quality
    bronze_rapiers: {
        id: "bronze_rapiers",
        icon: "bronzeRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "bronze rapiers",
        sellPrice: 255,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 8.7,
            attackMax: 10.5,
            attackSpeed: 1.0,
            accuracy: 8.1,
            defense: -3.75
        },
        extraStats: {
            attack: 2.3,
            attackMax: 3.6,
            accuracy: 2.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 10
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 15
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 18.2 @ 50% quality
    // ... chance to hit: 14.5% @ 50% quality
    // ... rated DPS: 2.64 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 18.9 @ 100% quality
    // ... chance to hit: 14.7% @ 100% quality
    // ... rated DPS: 2.78 @ 100% quality
    iron_rapiers: {
        id: "iron_rapiers",
        icon: "ironRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "iron rapiers",
        sellPrice: 340,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 10.5,
            attackMax: 13.1,
            attackSpeed: 1.0,
            accuracy: 12.4,
            defense: -5
        },
        extraStats: {
            attack: 2.8,
            attackMax: 4.5,
            accuracy: 3.8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 15
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 20
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 19.3 @ 50% quality
    // ... chance to hit: 15.0% @ 50% quality
    // ... rated DPS: 2.89 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 20.1 @ 100% quality
    // ... chance to hit: 15.3% @ 100% quality
    // ... rated DPS: 3.07 @ 100% quality
    silver_rapiers: {
        id: "silver_rapiers",
        icon: "silverRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "silver rapiers",
        sellPrice: 425,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 12.4,
            attackMax: 16,
            attackSpeed: 1.0,
            accuracy: 17.3,
            defense: -6.25
        },
        extraStats: {
            attack: 3.3,
            attackMax: 5.5,
            accuracy: 5.3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 20
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 25
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 20.5 @ 50% quality
    // ... chance to hit: 15.6% @ 50% quality
    // ... rated DPS: 3.19 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 21.5 @ 100% quality
    // ... chance to hit: 15.9% @ 100% quality
    // ... rated DPS: 3.43 @ 100% quality
    gold_rapiers: {
        id: "gold_rapiers",
        icon: "goldRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "gold rapiers",
        sellPrice: 510,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 14.5,
            attackMax: 19.1,
            attackSpeed: 1.0,
            accuracy: 22.7,
            defense: -7.5
        },
        extraStats: {
            attack: 3.9,
            attackMax: 6.6,
            accuracy: 7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 25
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 30
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 21.7 @ 50% quality
    // ... chance to hit: 16.3% @ 50% quality
    // ... rated DPS: 3.54 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 22.9 @ 100% quality
    // ... chance to hit: 16.8% @ 100% quality
    // ... rated DPS: 3.84 @ 100% quality
    carbon_rapiers: {
        id: "carbon_rapiers",
        icon: "carbonRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "carbon rapiers",
        sellPrice: 595,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 16.7,
            attackMax: 22.4,
            attackSpeed: 1.0,
            accuracy: 28.5,
            defense: -8.75
        },
        extraStats: {
            attack: 4.5,
            attackMax: 7.7,
            accuracy: 8.8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 30
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 35
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 23.1 @ 50% quality
    // ... chance to hit: 17.1% @ 50% quality
    // ... rated DPS: 3.95 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 24.5 @ 100% quality
    // ... chance to hit: 17.7% @ 100% quality
    // ... rated DPS: 4.34 @ 100% quality
    steel_rapiers: {
        id: "steel_rapiers",
        icon: "steelRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "steel rapiers",
        sellPrice: 680,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 19,
            attackMax: 26.1,
            attackSpeed: 1.0,
            accuracy: 34.8,
            defense: -10
        },
        extraStats: {
            attack: 5.1,
            attackMax: 9,
            accuracy: 10.7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 35
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 40
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 24.6 @ 50% quality
    // ... chance to hit: 18.0% @ 50% quality
    // ... rated DPS: 4.43 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 26.2 @ 100% quality
    // ... chance to hit: 18.9% @ 100% quality
    // ... rated DPS: 4.94 @ 100% quality
    platinum_rapiers: {
        id: "platinum_rapiers",
        icon: "platinumRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "platinum rapiers",
        sellPrice: 765,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 21.5,
            attackMax: 30.1,
            attackSpeed: 1.0,
            accuracy: 41.4,
            defense: -11.25
        },
        extraStats: {
            attack: 5.7,
            attackMax: 10.4,
            accuracy: 12.7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 40
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 45
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 26.2 @ 50% quality
    // ... chance to hit: 19.2% @ 50% quality
    // ... rated DPS: 5.01 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 28.0 @ 100% quality
    // ... chance to hit: 20.3% @ 100% quality
    // ... rated DPS: 5.68 @ 100% quality
    titanium_rapiers: {
        id: "titanium_rapiers",
        icon: "titaniumRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "titanium rapiers",
        sellPrice: 850,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 24.2,
            attackMax: 34.4,
            attackSpeed: 1.0,
            accuracy: 48.5,
            defense: -12.5
        },
        extraStats: {
            attack: 6.5,
            attackMax: 11.8,
            accuracy: 14.9
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 45
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 50
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 27.9 @ 50% quality
    // ... chance to hit: 20.5% @ 50% quality
    // ... rated DPS: 5.72 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 29.9 @ 100% quality
    // ... chance to hit: 22.0% @ 100% quality
    // ... rated DPS: 6.60 @ 100% quality
    tungsten_rapiers: {
        id: "tungsten_rapiers",
        icon: "tungstenRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "tungsten rapiers",
        sellPrice: 935,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 27,
            attackMax: 39.2,
            attackSpeed: 1.0,
            accuracy: 55.9,
            defense: -13.75
        },
        extraStats: {
            attack: 7.2,
            attackMax: 13.5,
            accuracy: 17.2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 50
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 55
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 29.7 @ 50% quality
    // ... chance to hit: 22.1% @ 50% quality
    // ... rated DPS: 6.57 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 32.0 @ 100% quality
    // ... chance to hit: 24.2% @ 100% quality
    // ... rated DPS: 7.75 @ 100% quality
    obsidian_rapiers: {
        id: "obsidian_rapiers",
        icon: "obsidianRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "obsidian rapiers",
        sellPrice: 1020,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 30,
            attackMax: 44.2,
            attackSpeed: 1.0,
            accuracy: 63.6,
            defense: -15
        },
        extraStats: {
            attack: 8,
            attackMax: 15.2,
            accuracy: 19.6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 55
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 60
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 31.7 @ 50% quality
    // ... chance to hit: 24.1% @ 50% quality
    // ... rated DPS: 7.65 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 34.3 @ 100% quality
    // ... chance to hit: 27.0% @ 100% quality
    // ... rated DPS: 9.25 @ 100% quality
    cobalt_rapiers: {
        id: "cobalt_rapiers",
        icon: "cobaltRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "cobalt rapiers",
        sellPrice: 1105,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 33.2,
            attackMax: 49.8,
            attackSpeed: 1.0,
            accuracy: 71.7,
            defense: -16.25
        },
        extraStats: {
            attack: 8.9,
            attackMax: 17.1,
            accuracy: 22.1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 60
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 65
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 33.9 @ 50% quality
    // ... chance to hit: 26.5% @ 50% quality
    // ... rated DPS: 8.99 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 36.7 @ 100% quality
    // ... chance to hit: 30.5% @ 100% quality
    // ... rated DPS: 11.21 @ 100% quality
    mithril_rapiers: {
        id: "mithril_rapiers",
        icon: "mithrilRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "mithril rapiers",
        sellPrice: 1190,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 36.6,
            attackMax: 55.7,
            attackSpeed: 1.0,
            accuracy: 80,
            defense: -17.5
        },
        extraStats: {
            attack: 9.8,
            attackMax: 19.2,
            accuracy: 24.6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 65
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 70
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 36.2 @ 50% quality
    // ... chance to hit: 29.7% @ 50% quality
    // ... rated DPS: 10.75 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 39.3 @ 100% quality
    // ... chance to hit: 35.5% @ 100% quality
    // ... rated DPS: 13.95 @ 100% quality
    adamantium_rapiers: {
        id: "adamantium_rapiers",
        icon: "adamantiumRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "adamantium rapiers",
        sellPrice: 1275,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 40.3,
            attackMax: 62.1,
            attackSpeed: 1.0,
            accuracy: 88.7,
            defense: -18.75
        },
        extraStats: {
            attack: 10.7,
            attackMax: 21.4,
            accuracy: 27.3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 70
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 75
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 38.6 @ 50% quality
    // ... chance to hit: 33.9% @ 50% quality
    // ... rated DPS: 13.10 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 42.1 @ 100% quality
    // ... chance to hit: 42.6% @ 100% quality
    // ... rated DPS: 17.95 @ 100% quality
    orichalcum_rapiers: {
        id: "orichalcum_rapiers",
        icon: "orichalcumRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "orichalcum rapiers",
        sellPrice: 1360,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 44.1,
            attackMax: 69,
            attackSpeed: 1.0,
            accuracy: 97.7,
            defense: -20
        },
        extraStats: {
            attack: 11.8,
            attackMax: 23.8,
            accuracy: 30.1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 75
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 80
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 41.2 @ 50% quality
    // ... chance to hit: 39.6% @ 50% quality
    // ... rated DPS: 16.33 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 45.1 @ 100% quality
    // ... chance to hit: 53.1% @ 100% quality
    // ... rated DPS: 23.96 @ 100% quality
    meteorite_rapiers: {
        id: "meteorite_rapiers",
        icon: "meteoriteRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "meteorite rapiers",
        sellPrice: 1445,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 48.2,
            attackMax: 76.4,
            attackSpeed: 1.0,
            accuracy: 106.9,
            defense: -21.25
        },
        extraStats: {
            attack: 12.9,
            attackMax: 26.3,
            accuracy: 32.9
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 80
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 85
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 44.1 @ 50% quality
    // ... chance to hit: 48.0% @ 50% quality
    // ... rated DPS: 21.15 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 48.3 @ 100% quality
    // ... chance to hit: 62.0% @ 100% quality
    // ... rated DPS: 29.95 @ 100% quality
    fairy_steel_rapiers: {
        id: "fairy_steel_rapiers",
        icon: "fairySteelRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "fairy steel rapiers",
        sellPrice: 1530,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 52.5,
            attackMax: 84.4,
            attackSpeed: 1.0,
            accuracy: 116.5,
            defense: -22.5
        },
        extraStats: {
            attack: 14,
            attackMax: 29.1,
            accuracy: 35.8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 85
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 90
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 47.0 @ 50% quality
    // ... chance to hit: 57.7% @ 50% quality
    // ... rated DPS: 27.15 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 51.7 @ 100% quality
    // ... chance to hit: 68.2% @ 100% quality
    // ... rated DPS: 35.23 @ 100% quality
    elven_steel_rapiers: {
        id: "elven_steel_rapiers",
        icon: "elvenSteelRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "elven steel rapiers",
        sellPrice: 1615,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 57.1,
            attackMax: 92.9,
            attackSpeed: 1.0,
            accuracy: 126.2,
            defense: -23.75
        },
        extraStats: {
            attack: 15.2,
            attackMax: 32,
            accuracy: 38.8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 90
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 95
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 50.2 @ 50% quality
    // ... chance to hit: 64.7% @ 50% quality
    // ... rated DPS: 32.49 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 55.3 @ 100% quality
    // ... chance to hit: 72.7% @ 100% quality
    // ... rated DPS: 40.24 @ 100% quality
    cursed_rapiers: {
        id: "cursed_rapiers",
        icon: "cursedRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "cursed rapiers",
        sellPrice: 1700,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 61.9,
            attackMax: 102.1,
            attackSpeed: 1.0,
            accuracy: 136.3,
            defense: -25
        },
        extraStats: {
            attack: 16.5,
            attackMax: 35.1,
            accuracy: 41.9
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 95
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 100
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 53.6 @ 50% quality
    // ... chance to hit: 69.8% @ 50% quality
    // ... rated DPS: 37.42 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 59.2 @ 100% quality
    // ... chance to hit: 76.2% @ 100% quality
    // ... rated DPS: 45.14 @ 100% quality
    darksteel_rapiers: {
        id: "darksteel_rapiers",
        icon: "darksteelRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "darksteel rapiers",
        sellPrice: 1785,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 67,
            attackMax: 111.9,
            attackSpeed: 1.0,
            accuracy: 146.6,
            defense: -26.25
        },
        extraStats: {
            attack: 17.9,
            attackMax: 38.5,
            accuracy: 45.1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 100
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 105
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 57.3 @ 50% quality
    // ... chance to hit: 73.6% @ 50% quality
    // ... rated DPS: 42.16 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 63.3 @ 100% quality
    // ... chance to hit: 79.0% @ 100% quality
    // ... rated DPS: 50.01 @ 100% quality
    radiant_rapiers: {
        id: "radiant_rapiers",
        icon: "radiantRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "radiant rapiers",
        sellPrice: 1870,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 72.4,
            attackMax: 122.4,
            attackSpeed: 1.0,
            accuracy: 157.1,
            defense: -27.5
        },
        extraStats: {
            attack: 19.3,
            attackMax: 42.1,
            accuracy: 48.3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 105
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 110
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 61.1 @ 50% quality
    // ... chance to hit: 76.7% @ 50% quality
    // ... rated DPS: 46.89 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 67.7 @ 100% quality
    // ... chance to hit: 81.2% @ 100% quality
    // ... rated DPS: 55.00 @ 100% quality
    astral_rapiers: {
        id: "astral_rapiers",
        icon: "astralRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "astral rapiers",
        sellPrice: 1955,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 78.1,
            attackMax: 133.6,
            attackSpeed: 1.0,
            accuracy: 167.9,
            defense: -28.75
        },
        extraStats: {
            attack: 20.8,
            attackMax: 46,
            accuracy: 51.7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 110
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 115
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 65.2 @ 50% quality
    // ... chance to hit: 79.2% @ 50% quality
    // ... rated DPS: 51.63 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 72.4 @ 100% quality
    // ... chance to hit: 83.0% @ 100% quality
    // ... rated DPS: 60.10 @ 100% quality
    titanfoil_rapiers: {
        id: "titanfoil_rapiers",
        icon: "titanfoilRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "titanfoil rapiers",
        sellPrice: 2040,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 84.1,
            attackMax: 145.5,
            attackSpeed: 1.0,
            accuracy: 178.9,
            defense: -30
        },
        extraStats: {
            attack: 22.4,
            attackMax: 50.1,
            accuracy: 55
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 115
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 120
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 69.6 @ 50% quality
    // ... chance to hit: 81.2% @ 50% quality
    // ... rated DPS: 56.49 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 77.3 @ 100% quality
    // ... chance to hit: 84.6% @ 100% quality
    // ... rated DPS: 65.40 @ 100% quality
    relicrock_rapiers: {
        id: "relicrock_rapiers",
        icon: "relicrockRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "relicrock rapiers",
        sellPrice: 2125,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 90.4,
            attackMax: 158.2,
            attackSpeed: 1.0,
            accuracy: 190.2,
            defense: -31.25
        },
        extraStats: {
            attack: 24.1,
            attackMax: 54.5,
            accuracy: 58.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 120
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 125
        }
    },

    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 74.2 @ 50% quality
    // ... chance to hit: 82.9% @ 50% quality
    // ... rated DPS: 61.49 @ 50% quality
    // For a player at 100 attack skill fighting an average, single-enemy room from generic F24R4
    // ... with gear/passives giving an extra 0 attack speed, 0-0 damage, 40 accuracy, and 19% critical chance
    // ... average hit: 82.6 @ 100% quality
    // ... chance to hit: 85.9% @ 100% quality
    // ... rated DPS: 70.91 @ 100% quality
    eternium_rapiers: {
        id: "eternium_rapiers",
        icon: "eterniumRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "eternium rapiers",
        sellPrice: 2210,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 97.1,
            attackMax: 171.7,
            attackSpeed: 1.0,
            accuracy: 201.6,
            defense: -32.5
        },
        extraStats: {
            attack: 25.9,
            attackMax: 59.1,
            accuracy: 62
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 125
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 130
        }
    },

    prismatic_rapiers: {
        id: "prismatic_rapiers",
        icon: "prismaticRapiers.png",
        category: "combat",
        weaponType: "rapier",
        slot: "mainHand",
        name: "prismatic rapiers",
        sellPrice: 2210 * 1.09375,
        description: "Elegant and difficult to defend against.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 97.1 * 1.09375,
            attackMax: 171.7 * 1.09375,
            attackSpeed: 1.0 * 1.09375,
            accuracy: 201.6 * 1.09375,
            defense: -32.5 * 1.09375
        },
        extraStats: {
            attack: 25.9 * 1.09375,
            attackMax: 59.1 * 1.09375,
            accuracy: 62 * 1.09375
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 130
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 135
        }
    },

    /* Spirit shields */
    /*
  spirit_shield: {
    id: 'spirit_shield',
    icon: 'spiritShield.png',
    category: 'combat',
    slot: 'offHand',
    name: 'spirit shield',
    weaponType: 'shield',
    sellPrice: 500,
    description: 'The shield pulls at your spirit.',
    isEquippable: true,
    stats: {
      healthMax: 10,
      magicArmor: 35,
    },
    extraStats: {
      healthMax: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 1
    }]
  },

  fairy_spirit_shield: {
    id: 'fairy_spirit_shield',
    icon: 'fairySpiritShield.png',
    category: 'combat',
    weaponType: 'shield',
    slot: 'offHand',
    name: 'fairy spirit shield',
    sellPrice: 1000,
    description: 'The shield pulls at your spirit.',
    isEquippable: true,
    stats: {
      healthMax: 20,
      magicArmor: 55,
    },
    extraStats: {
      healthMax: 20,
      magicArmor: 15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },

  cursed_spirit_shield: {
    id: 'cursed_spirit_shield',
    icon: 'cursedSpiritShield.png',
    category: 'combat',
    slot: 'offHand',
    weaponType: 'shield',
    name: 'cursed spirit shield',
    sellPrice: 2500,
    description: 'The shield pulls at your spirit.',
    isEquippable: true,
    stats: {
      healthMax: 35,
      magicArmor: 70,
    },
    extraStats: {
      healthMax: 35,
      magicArmor: 20
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },
  */

    spirit_shield: {
        id: "spirit_shield",
        icon: "nullSpiritShield.png",
        category: "combat",
        slot: "offHand",
        name: "spirit shield",
        weaponType: "shield",
        sellPrice: 500,
        description: "An odd trinket that once held magic power.",
        isEquippable: true,
        isMagic: true,
        stats: {},
        extraStats: {},
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 1000
            }
        ]
    },

    copper_spirit_shield: {
        id: "copper_spirit_shield",
        icon: "copperSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "copper spirit shield",
        sellPrice: 50,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 11.3,
            magicArmor: 7.3
        },
        extraStats: {
            healthMax: 3.4,
            magicArmor: 2.9
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        reforgeRecipe: {
            requiresCrafting: 6
        }
    },

    tin_spirit_shield: {
        id: "tin_spirit_shield",
        icon: "tinSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "tin spirit shield",
        sellPrice: 125,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 13.5,
            magicArmor: 9.6
        },
        extraStats: {
            healthMax: 4.1,
            magicArmor: 3.8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 3
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 10
        }
    },

    bronze_spirit_shield: {
        id: "bronze_spirit_shield",
        icon: "bronzeSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "bronze spirit shield",
        sellPrice: 195,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 16.5,
            magicArmor: 12.4
        },
        extraStats: {
            healthMax: 5,
            magicArmor: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 5
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 15
        }
    },

    iron_spirit_shield: {
        id: "iron_spirit_shield",
        icon: "ironSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "iron spirit shield",
        sellPrice: 270,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 20,
            magicArmor: 15.7
        },
        extraStats: {
            healthMax: 6,
            magicArmor: 6.3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 8
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 20
        }
    },

    silver_spirit_shield: {
        id: "silver_spirit_shield",
        icon: "silverSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "silver spirit shield",
        sellPrice: 340,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 24,
            magicArmor: 19.4
        },
        extraStats: {
            healthMax: 7.2,
            magicArmor: 7.8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 11
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 25
        }
    },

    gold_spirit_shield: {
        id: "gold_spirit_shield",
        icon: "goldSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "gold spirit shield",
        sellPrice: 415,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 28.4,
            magicArmor: 23.5
        },
        extraStats: {
            healthMax: 8.5,
            magicArmor: 9.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 14
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 30
        }
    },

    carbon_spirit_shield: {
        id: "carbon_spirit_shield",
        icon: "carbonSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "carbon spirit shield",
        sellPrice: 485,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 33.2,
            magicArmor: 27.8
        },
        extraStats: {
            healthMax: 10,
            magicArmor: 11.1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 16
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 35
        }
    },

    steel_spirit_shield: {
        id: "steel_spirit_shield",
        icon: "steelSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "steel spirit shield",
        sellPrice: 560,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 38.3,
            magicArmor: 32.5
        },
        extraStats: {
            healthMax: 11.5,
            magicArmor: 13
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 19
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 40
        }
    },

    platinum_spirit_shield: {
        id: "platinum_spirit_shield",
        icon: "platinumSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "platinum spirit shield",
        sellPrice: 630,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 43.8,
            magicArmor: 37.4
        },
        extraStats: {
            healthMax: 13.1,
            magicArmor: 15
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 22
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 45
        }
    },

    titanium_spirit_shield: {
        id: "titanium_spirit_shield",
        icon: "titaniumSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "titanium spirit shield",
        sellPrice: 705,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 49.5,
            magicArmor: 42.6
        },
        extraStats: {
            healthMax: 14.9,
            magicArmor: 17
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 24
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 50
        }
    },

    tungsten_spirit_shield: {
        id: "tungsten_spirit_shield",
        icon: "tungstenSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "tungsten spirit shield",
        sellPrice: 775,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 55.6,
            magicArmor: 48.1
        },
        extraStats: {
            healthMax: 16.7,
            magicArmor: 19.2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 27
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 55
        }
    },

    obsidian_spirit_shield: {
        id: "obsidian_spirit_shield",
        icon: "obsidianSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "obsidian spirit shield",
        sellPrice: 850,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 62,
            magicArmor: 53.7
        },
        extraStats: {
            healthMax: 18.6,
            magicArmor: 21.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 30
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 60
        }
    },

    cobalt_spirit_shield: {
        id: "cobalt_spirit_shield",
        icon: "cobaltSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "cobalt spirit shield",
        sellPrice: 920,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 68.6,
            magicArmor: 59.6
        },
        extraStats: {
            healthMax: 20.6,
            magicArmor: 23.8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 32
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 65
        }
    },

    mithril_spirit_shield: {
        id: "mithril_spirit_shield",
        icon: "mithrilSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "mithril spirit shield",
        sellPrice: 995,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 75.5,
            magicArmor: 65.7
        },
        extraStats: {
            healthMax: 22.7,
            magicArmor: 26.3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 35
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 70
        }
    },

    adamantium_spirit_shield: {
        id: "adamantium_spirit_shield",
        icon: "adamantiumSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "adamantium spirit shield",
        sellPrice: 1065,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 82.6,
            magicArmor: 72
        },
        extraStats: {
            healthMax: 24.8,
            magicArmor: 28.8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 38
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 75
        }
    },

    orichalcum_spirit_shield: {
        id: "orichalcum_spirit_shield",
        icon: "orichalcumSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "orichalcum spirit shield",
        sellPrice: 1140,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 90,
            magicArmor: 78.4
        },
        extraStats: {
            healthMax: 27,
            magicArmor: 31.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 41
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 80
        }
    },

    meteorite_spirit_shield: {
        id: "meteorite_spirit_shield",
        icon: "meteoriteSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "meteorite spirit shield",
        sellPrice: 1210,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 97.6,
            magicArmor: 85.1
        },
        extraStats: {
            healthMax: 29.3,
            magicArmor: 34
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 43
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 85
        }
    },

    fairy_steel_spirit_shield: {
        id: "fairy_steel_spirit_shield",
        icon: "fairySteelSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "fairy steel spirit shield",
        sellPrice: 1285,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 105.5,
            magicArmor: 91.9
        },
        extraStats: {
            healthMax: 31.7,
            magicArmor: 36.8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 46
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 90
        }
    },

    elven_steel_spirit_shield: {
        id: "elven_steel_spirit_shield",
        icon: "elvenSteelSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "elven steel spirit shield",
        sellPrice: 1355,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 113.5,
            magicArmor: 98.9
        },
        extraStats: {
            healthMax: 34.1,
            magicArmor: 39.6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 49
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 95
        }
    },

    cursed_spirit_shield: {
        id: "cursed_spirit_shield",
        icon: "cursedSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "cursed spirit shield",
        sellPrice: 1430,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 121.8,
            magicArmor: 106.1
        },
        extraStats: {
            healthMax: 36.5,
            magicArmor: 42.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 51
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 100
        }
    },

    darksteel_spirit_shield: {
        id: "darksteel_spirit_shield",
        icon: "darksteelSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "darksteel spirit shield",
        sellPrice: 1500,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 130.3,
            magicArmor: 113.4
        },
        extraStats: {
            healthMax: 39.1,
            magicArmor: 45.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 54
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 105
        }
    },

    radiant_spirit_shield: {
        id: "radiant_spirit_shield",
        icon: "radiantSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "radiant spirit shield",
        sellPrice: 1575,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 139,
            magicArmor: 120.9
        },
        extraStats: {
            healthMax: 41.7,
            magicArmor: 48.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 57
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 110
        }
    },

    astral_spirit_shield: {
        id: "astral_spirit_shield",
        icon: "astralSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "astral spirit shield",
        sellPrice: 1645,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 147.9,
            magicArmor: 128.6
        },
        extraStats: {
            healthMax: 44.4,
            magicArmor: 51.4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 59
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 115
        }
    },

    titanfoil_spirit_shield: {
        id: "titanfoil_spirit_shield",
        icon: "titanfoilSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "titanfoil spirit shield",
        sellPrice: 1720,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 157,
            magicArmor: 136.4
        },
        extraStats: {
            healthMax: 47.1,
            magicArmor: 54.6
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 62
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 120
        }
    },

    relicrock_spirit_shield: {
        id: "relicrock_spirit_shield",
        icon: "relicrockSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "relicrock spirit shield",
        sellPrice: 1790,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 166.3,
            magicArmor: 144.3
        },
        extraStats: {
            healthMax: 49.9,
            magicArmor: 57.7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 65
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 125
        }
    },

    eternium_spirit_shield: {
        id: "eternium_spirit_shield",
        icon: "eterniumSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "eternium spirit shield",
        sellPrice: 1865,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 175.7,
            magicArmor: 152.4
        },
        extraStats: {
            healthMax: 52.7,
            magicArmor: 61
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 68
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 130
        }
    },

    prismatic_spirit_shield: {
        id: "prismatic_spirit_shield",
        icon: "prismaticSpiritShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "prismatic spirit shield",
        sellPrice: 1865 * 1.09375,
        description: "The shield pulls at your spirit",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 175.7 * 1.09375,
            magicArmor: 152.4 * 1.09375
        },
        extraStats: {
            healthMax: 52.7 * 1.09375,
            magicArmor: 61 * 1.09375
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 73
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 135
        }
    },

    demons_heart: {
        id: "demons_heart",
        icon: "demonsHeart.png",
        category: "combat",
        slot: "chest",
        name: "demon's heart",
        sellPrice: 1000,
        description: "Cursed for all eternity.",
        isEquippable: true,
        stats: {
            healthMax: 150,
            criticalChance: 25,
            accuracy: 10,
            armor: 10
        },
        extraStats: {
            healthMax: 50,
            armor: 5,
            accuracy: 5
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 60
            }
        ],
        enchantments: ["demons_heart"],
        tier: 11
    },

    smoke_dagger: {
        id: "smoke_dagger",
        icon: "smokeDagger.svg",
        category: "combat",
        weaponType: "dagger",
        slot: "mainHand",
        name: "smoke",
        sellPrice: 850,
        description: "A slither of smoke.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 11,
            attackMax: 20.2,
            attackSpeed: 1,
            accuracy: 35.4
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 50
            }
        ],
        enchantments: ["smoke_dagger"],
        tier: 12
    },

    shadow_knife: {
        id: "shadow_knife",
        icon: "shadowKnife.svg",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "shadow",
        sellPrice: 850,
        description: "A slither of shadow.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            accuracy: 5,
            attack: 4,
            attackMax: 5
        },
        extraStats: {
            accuracy: 2,
            attack: 2,
            attackMax: 3
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 50
            }
        ],
        enchantments: ["shadow_knife"],
        tier: 12
    },

    living_helmet: {
        id: "living_helmet",
        icon: "livingHelmet.png",
        category: "combat",
        slot: "head",
        name: "living helmet",
        sellPrice: 850,
        description: "A helmet fashioned from a living tree.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            healthMax: 7.8,
            attackMax: -25,
            defense: 7.8,
            armor: 37.6
        },
        extraStats: {
            healthMax: 2.3,
            defense: 2.3,
            armor: 11.3
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 55
            }
        ],
        enchantments: ["living_helmet"],
        tier: 13
    },

    bloody_plate_legs: {
        id: "bloody_plate_legs",
        icon: "bloodyPlatelegs.png",
        category: "combat",
        slot: "legs",
        name: "bloody platelegs",
        sellPrice: 1500,
        description: "Injures your legs",
        isEquippable: true,
        stats: {
            armor: -20,
            defense: -2,
            accuracy: 2,
            attack: 2
        },
        extraStats: {
            accuracy: 2,
            attack: 2
        },
        enchantments: ["bloody_plate_legs"],
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 60
            }
        ],
        tier: 14
    },

    /* Defensive Magic Armor */
    opal_chest_plate: {
        id: "opal_chest_plate",
        icon: "opalChestPlate.png",
        category: "combat",
        slot: "chest",
        name: "opal chest plate",
        sellPrice: 1000,
        description: "This seems too expensive to wear.",
        isEquippable: true,
        stats: {
            healthMax: 35,
            magicArmor: 20,
            accuracy: 10
        },
        extraStats: {
            healthMax: 15,
            magicArmor: 20
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 20
            },
            {
                type: "skill",
                name: "health",
                level: 30
            }
        ],
        enchantments: ["opal_chest_plate"],
        tier: 6
    },

    /*
    opal_pants: {
        id: "opal_pants",
        icon: "opalPants.svg",
        category: "combat",
        slot: "legs",
        name: "opal pants",
        sellPrice: 1000,
        description: "This seems to expensive to wear.",
        isEquippable: true,
        stats: {
            healthMax: 20,
            magicArmor: 15,
            accuracy: 10
        },
        extraStats: {
            healthMax: 20,
            magicArmor: 15
        },
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 10
            }
        ]
    },
    */

    bamboo_roof: {
        id: "bamboo_roof",
        icon: "bambooRoof.svg",
        category: "crafting",
        name: "bamboo roof",
        sellPrice: 100,
        description: "Used to make a bamboo shack"
    },

    bamboo_wall: {
        id: "bamboo_wall",
        icon: "bamboowall.png",
        category: "crafting",
        name: "bamboo wall",
        sellPrice: 100,
        description: "Used to make a bamboo shack"
    },

    bamboo_shack: {
        id: "bamboo_shack",
        icon: "bambooshack.png",
        category: "crafting",
        name: "bamboo shack",
        sellPrice: 400,
        description: "Looks cozy"
    },

    frankensteins_heart: {
        id: "frankensteins_heart",
        icon: "frankensteinsHeart.svg",
        category: "combat",
        slot: "chest",
        name: "frankenstein's heart",
        sellPrice: 2500,
        description: "Protect your heart",
        isEquippable: true,
        stats: {
            healthMax: 9.7,
            defense: 9.7,
            armor: 46.7
        },
        extraStats: {
            healthMax: 2.9,
            defense: 2.9,
            armor: 14
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 75
            }
        ],
        enchantments: ["frankensteins_heart"],
        tier: 15
    },

    rich_snake_skin: {
        id: "rich_snake_skin",
        icon: "richSnakeSkin.svg",
        category: "combat",
        slot: "chest",
        name: "rich snake skin",
        sellPrice: 1800,
        description: "Protect your chest",
        isEquippable: true,
        stats: {
            healthMax: 10.7,
            defense: 10.7,
            armor: 51.4
        },
        extraStats: {
            healthMax: 3.2,
            defense: 3.2,
            armor: 15.4
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 75
            }
        ],
        enchantments: ["rich_snake_skin"],
        tier: 16
    },

    krakens_tentacle: {
        id: "krakens_tentacle",
        icon: "tentacle.svg",
        category: "combat",
        weaponType: "knife",
        slot: "offHand",
        name: "kraken's tentacle",
        sellPrice: 950,
        description: "Provides minor offensive bonuses",
        isEquippable: true,
        stats: {
            accuracy: 7,
            attack: 6,
            attackMax: 8
        },
        extraStats: {
            accuracy: 3,
            attack: 3,
            attackMax: 4
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 75
            }
        ],
        enchantments: ["krakens_tentacle"],
        tier: 18
    },

    bison_axe: {
        id: "bison_axe",
        icon: "bisonAxe.svg",
        category: "combat",
        weaponType: "battleAxe",
        slot: "mainHand",
        name: "Bison's axe",
        sellPrice: 2250,
        description: "Fix for a bison to wield",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 68.4,
            attackMax: 245.7,
            attackSpeed: 0.3,
            accuracy: 109.8,
            criticalChance: 5
        },
        extraStats: {
            attack: 20.5,
            attackMax: 73.7
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 85
            }
        ],
        enchantments: ["bison_axe"]
        // no tier: weapon intentionally does not hold magic pool
    },

    baby_fox: {
        id: "baby_fox",
        icon: "babyFox.svg",
        category: "combat",
        slot: "chest",
        name: "baby fox",
        sellPrice: 1800,
        description: "Summons a fox",
        isEquippable: true,
        stats: {
            healthMax: 1
        },
        extraStats: {
            healthMax: 1
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 90
            }
        ],
        enchantments: ["baby_fox"],
        tier: 21
    },

    /*
    winged_shield: {
        id: "winged_shield",
        icon: "winged_shield.svg",
        category: "combat",
        slot: "offHand",
        weaponType: "shield",
        name: "Winged Shield",
        sellPrice: 2000,
        description: "Provides protection from harm",
        isEquippable: true,
        stats: {
            healthMax: 150,
            defense: 20,
            armor: 80
        },
        extraStats: {
            healthMax: 3.2,
            defense: 3.2,
            armor: 15.4
        },
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 75
            }
        ],
        enchantments: ["winged_shield"]
    },
    */

    /*
    orb_blue: {
        id: "orb_blue",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "blue orb",
        sellPrice: 1000,
        description: "A mystical device of wisdom and knowledge",
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 3,
            healingPower: 0.1,
            magicArmor: 4
        },
        extraStats: {
            magicPower: 2,
            healingPower: 1.9,
            magicArmor: 1
        }
    },

    orb_green: {
        id: "orb_green",
        icon: "orbGreen.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "green orb",
        sellPrice: 1000,
        description: "A mystical device of wisdom and knowledge",
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 9,
            healingPower: 0.1,
            magicArmor: 12
        },
        extraStats: {
            magicPower: 4,
            healingPower: 3.9,
            magicArmor: 2
        }
    },
    */

    diminished_orb: {
        id: "diminished_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "diminished orb",
        sellPrice: 285,
        description: "A mysterious and diminished device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 0,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 2,
            magicArmor: 3,
            healingPower: 1
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ]
    },

    cracked_orb: {
        id: "cracked_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "cracked orb",
        sellPrice: 570,
        description: "A mysterious and cracked device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 1,
            magicPower: 6,
            magicArmor: 9,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 2,
            magicArmor: 3,
            healingPower: 2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 1
            }
        ]
    },

    dim_orb: {
        id: "dim_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "dim orb",
        sellPrice: 855,
        description: "A mysterious and dim device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 1,
            magicPower: 7,
            magicArmor: 10,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 3,
            magicArmor: 5,
            healingPower: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 3
            }
        ]
    },

    malformed_orb: {
        id: "malformed_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "malformed orb",
        sellPrice: 1140,
        description: "A mysterious and malformed device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 2,
            magicPower: 8,
            magicArmor: 11,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 3,
            magicArmor: 5,
            healingPower: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 3
            }
        ]
    },

    pale_orb: {
        id: "pale_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "pale orb",
        sellPrice: 1425,
        description: "A mysterious and pale device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 2,
            magicPower: 9,
            magicArmor: 13,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 3,
            magicArmor: 5,
            healingPower: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 6
            }
        ]
    },

    magic_touched_orb: {
        id: "magic_touched_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "magic-touched orb",
        sellPrice: 1710,
        description: "A mysterious and magic-touched device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 3,
            magicPower: 10,
            magicArmor: 14,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 4,
            magicArmor: 6,
            healingPower: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 9
            }
        ]
    },

    weak_orb: {
        id: "weak_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "weak orb",
        sellPrice: 1995,
        description: "A mysterious and weak device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 3,
            magicPower: 11,
            magicArmor: 15,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 4,
            magicArmor: 6,
            healingPower: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 12
            }
        ]
    },

    tainted_orb: {
        id: "tainted_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "tainted orb",
        sellPrice: 2280,
        description: "A mysterious and tainted device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 4,
            magicPower: 12,
            magicArmor: 17,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 4,
            magicArmor: 6,
            healingPower: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 15
            }
        ]
    },

    shimmering_orb: {
        id: "shimmering_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "shimmering orb",
        sellPrice: 2565,
        description: "A mysterious and shimmering device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 4,
            magicPower: 13,
            magicArmor: 18,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 4,
            magicArmor: 6,
            healingPower: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 18
            }
        ]
    },

    glittering_orb: {
        id: "glittering_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "glittering orb",
        sellPrice: 2850,
        description: "A mysterious and glittering device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 5,
            magicPower: 14,
            magicArmor: 19,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 4,
            magicArmor: 6,
            healingPower: 3
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 21
            }
        ]
    },

    glowing_orb: {
        id: "glowing_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "glowing orb",
        sellPrice: 3135,
        description: "A mysterious and glowing device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 5,
            magicPower: 15.5,
            magicArmor: 21,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 24
            }
        ]
    },

    pulsating_orb: {
        id: "pulsating_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "pulsating orb",
        sellPrice: 3420,
        description: "A mysterious and pulsating device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 6,
            magicPower: 17,
            magicArmor: 23,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 27
            }
        ]
    },

    event_ny_balloons: {
        id: "event_ny_balloons",
        icon: "eventNYBalloons.svg",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "decorative balloons",
        sellPrice: 1,
        description: "Some decorative balloons that glow and shimmer with magic.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 15,
            magicArmor: 15,
            healingPower: 5,
            defense: -25,
            armor: -50
        },
        extraStats: {
            magicPower: 15,
            magicArmor: 15,
            healingPower: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 27
            }
        ],
        enchantments: ["event_ny_balloons"]
    },

    runed_orb: {
        id: "runed_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "runed orb",
        sellPrice: 3705,
        description: "A mysterious and runed device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 6,
            magicPower: 18.5,
            magicArmor: 25,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 30
            }
        ]
    },

    billowing_orb: {
        id: "billowing_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "billowing orb",
        sellPrice: 3990,
        description: "A mysterious and billowing device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 7,
            magicPower: 20,
            magicArmor: 27,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 33
            }
        ]
    },

    pristine_orb: {
        id: "pristine_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "pristine orb",
        sellPrice: 4275,
        description: "A mysterious and pristine device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 7,
            magicPower: 21.5,
            magicArmor: 30,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 36
            }
        ]
    },

    arcane_orb: {
        id: "arcane_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "arcane orb",
        sellPrice: 4560,
        description: "A mysterious and arcane device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 8,
            magicPower: 23,
            magicArmor: 32,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 39
            }
        ]
    },

    powerful_orb: {
        id: "powerful_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "powerful orb",
        sellPrice: 4845,
        description: "A mysterious and powerful device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 8,
            magicPower: 24.5,
            magicArmor: 34,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 42
            }
        ]
    },

    dangerous_orb: {
        id: "dangerous_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "dangerous orb",
        sellPrice: 5130,
        description: "A mysterious and dangerous device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 9,
            magicPower: 26,
            magicArmor: 36,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 45
            }
        ]
    },

    prismatic_orb: {
        id: "prismatic_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "prismatic orb",
        sellPrice: 5415,
        description: "A mysterious and prismatic device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 9,
            magicPower: 27.5,
            magicArmor: 38,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 48
            }
        ]
    },

    cataclysmic_orb: {
        id: "cataclysmic_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "cataclysmic orb",
        sellPrice: 5700,
        description: "A mysterious and cataclysmic device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 10,
            magicPower: 29,
            magicArmor: 40,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 5,
            magicArmor: 7,
            healingPower: 4
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 51
            }
        ]
    },

    intense_orb: {
        id: "intense_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "intense orb",
        sellPrice: 5985,
        description: "A mysterious and intense device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 10,
            magicPower: 32.3,
            magicArmor: 44,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 6.5,
            magicArmor: 9,
            healingPower: 5.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 55
            }
        ]
    },

    primal_orb: {
        id: "primal_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "primal orb",
        sellPrice: 6270,
        description: "A mysterious and primal device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 11,
            magicPower: 35.1,
            magicArmor: 48,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 6.5,
            magicArmor: 9,
            healingPower: 5.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 60
            }
        ]
    },

    overflowing_orb: {
        id: "overflowing_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "overflowing orb",
        sellPrice: 6555,
        description: "A mysterious and overflowing device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 11,
            magicPower: 37.9,
            magicArmor: 52,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 6.5,
            magicArmor: 9,
            healingPower: 5.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 65
            }
        ]
    },

    phantasmal_orb: {
        id: "phantasmal_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "phantasmal orb",
        sellPrice: 6840,
        description: "A mysterious and phantasmal device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 12,
            magicPower: 40.7,
            magicArmor: 55,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 8,
            magicArmor: 11,
            healingPower: 7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 70
            }
        ]
    },

    farplane_orb: {
        id: "farplane_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "farplane orb",
        sellPrice: 7125,
        description: "A mysterious and farplane device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 12,
            magicPower: 43.5,
            magicArmor: 59,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 8,
            magicArmor: 11,
            healingPower: 7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 75
            }
        ]
    },

    exalted_orb: {
        id: "exalted_orb",
        icon: "orbBlue.png",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "exalted orb",
        sellPrice: 7410,
        description: "A mysterious and exalted device.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            defense: 13,
            magicPower: 46.3,
            magicArmor: 63,
            healingPower: 2
        },
        extraStats: {
            defense: 1,
            magicPower: 8,
            magicArmor: 11,
            healingPower: 7
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 80
            }
        ]
    },

    ripped_tome: {
        id: "ripped_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "ripped tome",
        sellPrice: 315,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 4,
            healingPower: 8
        },
        extraStats: {
            magicPower: 2,
            healingPower: 2
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ]
    },

    dusty_tome: {
        id: "dusty_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "dusty tome",
        sellPrice: 630,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 5,
            healingPower: 8
        },
        extraStats: {
            magicPower: 2,
            healingPower: 3.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 1
            }
        ]
    },

    poor_tome: {
        id: "poor_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "poor tome",
        sellPrice: 945,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 6,
            healingPower: 8
        },
        extraStats: {
            magicPower: 2.5,
            healingPower: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 3
            }
        ]
    },

    worn_tome: {
        id: "worn_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "worn tome",
        sellPrice: 1260,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 7,
            healingPower: 8
        },
        extraStats: {
            magicPower: 2.5,
            healingPower: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 3
            }
        ]
    },

    dull_tome: {
        id: "dull_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "dull tome",
        sellPrice: 1575,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 8,
            healingPower: 8
        },
        extraStats: {
            magicPower: 2.5,
            healingPower: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 6
            }
        ]
    },

    simple_tome: {
        id: "simple_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "simple tome",
        sellPrice: 1890,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 9,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3,
            healingPower: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 9
            }
        ]
    },

    basic_tome: {
        id: "basic_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "basic tome",
        sellPrice: 2205,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 10,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3,
            healingPower: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 12
            }
        ]
    },

    studius_tome: {
        id: "studius_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "studius tome",
        sellPrice: 2520,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 11,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3,
            healingPower: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 15
            }
        ]
    },

    paradoxical_tome: {
        id: "paradoxical_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "paradoxical tome",
        sellPrice: 2835,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 12,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3,
            healingPower: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 18
            }
        ]
    },

    leather_bound_tome: {
        id: "leather_bound_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "leather-bound tome",
        sellPrice: 3150,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 13,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3,
            healingPower: 5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 21
            }
        ]
    },

    prestigious_tome: {
        id: "prestigious_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "prestigious tome",
        sellPrice: 3465,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 14.5,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3.5,
            healingPower: 6.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 24
            }
        ]
    },

    spellbound_tome: {
        id: "spellbound_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "spellbound tome",
        sellPrice: 3780,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 16,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3.5,
            healingPower: 6.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 27
            }
        ]
    },

    scholars_tome: {
        id: "scholars_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "scholar's tome",
        sellPrice: 4095,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 17.5,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3.5,
            healingPower: 6.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 30
            }
        ]
    },

    rich_tome: {
        id: "rich_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "rich tome",
        sellPrice: 4410,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 19,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3.5,
            healingPower: 6.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 33
            }
        ]
    },

    bewildering_tome: {
        id: "bewildering_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "bewildering tome",
        sellPrice: 4725,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 20.5,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3.5,
            healingPower: 6.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 36
            }
        ]
    },

    perplexing_tome: {
        id: "perplexing_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "perplexing tome",
        sellPrice: 5040,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 22,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3.5,
            healingPower: 6.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 39
            }
        ]
    },

    breathtaking_tome: {
        id: "breathtaking_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "breathtaking tome",
        sellPrice: 5355,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 23.5,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3.5,
            healingPower: 6.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 42
            }
        ]
    },

    ancient_tome: {
        id: "ancient_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "ancient tome",
        sellPrice: 5670,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 25,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3.5,
            healingPower: 6.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 45
            }
        ]
    },

    stellar_tome: {
        id: "stellar_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "stellar tome",
        sellPrice: 5985,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 26.5,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3.5,
            healingPower: 6.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 48
            }
        ]
    },

    legendary_tome: {
        id: "legendary_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "legendary tome",
        sellPrice: 6300,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 28,
            healingPower: 8
        },
        extraStats: {
            magicPower: 3.5,
            healingPower: 6.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 51
            }
        ]
    },

    forgotten_tome: {
        id: "forgotten_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "forgotten tome",
        sellPrice: 6615,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 30.5,
            healingPower: 10
        },
        extraStats: {
            magicPower: 4,
            healingPower: 8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 54
            }
        ]
    },

    charred_tome: {
        id: "charred_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "charred tome",
        sellPrice: 6930,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 33,
            healingPower: 10
        },
        extraStats: {
            magicPower: 4,
            healingPower: 8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 57
            }
        ]
    },

    obscure_tome: {
        id: "obscure_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "obscure tome",
        sellPrice: 7245,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 35.5,
            healingPower: 10
        },
        extraStats: {
            magicPower: 4,
            healingPower: 8
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 60
            }
        ]
    },

    sinister_tome: {
        id: "sinister_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "sinister tome",
        sellPrice: 7560,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 38,
            healingPower: 12
        },
        extraStats: {
            magicPower: 5,
            healingPower: 11.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 63
            }
        ]
    },

    maniacal_tome: {
        id: "maniacal_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "maniacal tome",
        sellPrice: 7875,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 40.5,
            healingPower: 12
        },
        extraStats: {
            magicPower: 5,
            healingPower: 11.5
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 66
            }
        ]
    },

    exalted_tome: {
        id: "exalted_tome",
        icon: "magicTomeTx.png",
        category: "combat",
        weaponType: "tome",
        slot: "offHand",
        name: "exalted tome",
        sellPrice: 8190,
        description: "A font of arcane secrets.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 43,
            healingPower: 13
        },
        extraStats: {
            magicPower: 7,
            healingPower: 12
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 70
            }
        ]
    },

    festive_hat: {
        id: "festive_hat",
        icon: "festiveHat.png",
        category: "combat",
        slot: "head",
        name: "festive hat",
        sellPrice: 1,
        description: "Seems to spread holiday cheer",
        isEquippable: true,
        isMagic: true,
        stats: {
            attackSpeed: -0.1,
            magicPower: 20,
            healingPower: 1
        },
        extraStats: {
            magicPower: 10,
            healingPower: 7
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 35
            }
        ],
        enchantments: ["phoenix_hat"]
    },

    ornamental_hat: {
        id: "ornamental_hat",
        icon: "eventNYOrnamentalHat.svg",
        category: "combat",
        slot: "head",
        name: "ornamental hat",
        sellPrice: 1,
        description: "You'll be spry and agile in this for certain!",
        isEquippable: true,
        isMagic: true,
        stats: {
            accuracy: 25,
            attackSpeed: 0.15,
            attack: -20,
            attackMax: -25
        },
        extraStats: {
            accuracy: 15,
            attack: 15,
            attackMax: 15
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 50
            }
        ]
    },

    event_lny_lion_claws: {
        id: "event_lny_lion_claws",
        icon: "eventLNYLionClaws.svg",
        category: "combat",
        weaponType: "shortSword",
        slot: "mainHand",
        name: "lion claws",
        sellPrice: 1800,
        description: "A deadly weapon from a lion costume with a balance between offense and defense",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 40.0,
            attackMax: 45.0,
            attackSpeed: 1.0,
            accuracy: 100.0
        },
        extraStats: {
            attack: 20.0,
            attackMax: 45.0,
            accuracy: 50.0
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 65
            },
            {
                type: "skill",
                name: "defense",
                level: 65
            }
        ],
        enchantments: ["lion_claws"]
    },

    event_lny_lion_body: {
        id: "event_lny_lion_body",
        icon: "eventLNYLionBody.svg",
        category: "combat",
        slot: "chest",
        name: "lion costume body",
        sellPrice: 1,
        description: "Protect your heart in style",
        isEquippable: true,
        stats: {
            healthMax: 100,
            defense: 25,
            attackSpeed: 0.025,
            accuracy: 12.5,
            attack: -15,
            attackMax: -20
        },
        extraStats: {
            healthMax: 100,
            defense: 15,
            attackSpeed: 0.025,
            accuracy: 12.5,
            attack: 7.5,
            attackMax: 10
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 65
            }
        ],
        enchantments: ["lion_body"]
    },

    event_lny_lion_head: {
        id: "event_lny_lion_head",
        icon: "eventLNYLionHead.svg",
        category: "combat",
        slot: "head",
        name: "lion costume head",
        sellPrice: 1,
        description: "No costume would be complete without it",
        isEquippable: true,
        stats: {
            healthMax: 60,
            defense: 25,
            attackSpeed: 0.025,
            accuracy: 12.5,
            attack: -15,
            attackMax: -20
        },
        extraStats: {
            healthMax: 40,
            defense: 15,
            attackSpeed: 0.025,
            accuracy: 12.5,
            attack: 7.5,
            attackMax: 10
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 65
            }
        ],
        enchantments: ["lion_head"]
    },

    event_lny_lunar_shield: {
        id: "event_lny_lunar_shield",
        icon: "eventLNYLunarShield.svg",
        category: "combat",
        slot: "offHand",
        weaponType: "shield",
        name: "lunar shield",
        sellPrice: 1,
        description: "A magnificent shield that draws everything's attention, for better or worse.",
        isEquippable: true,
        stats: {
            healthMax: 100,
            defense: 40,
            armor: 70,
            magicArmor: 70
        },
        extraStats: {
            healthMax: 150,
            defense: 30,
            armor: 35,
            magicArmor: 35
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 50
            },
            {
                type: "skill",
                name: "health",
                level: 75
            }
        ],
        enchantments: ["lunar_shield"]
    },

    event_vd_bear_slippers: {
        id: "event_vd_bear_slippers",
        icon: "eventVDbear.svg",
        category: "combat",
        slot: "legs",
        name: "bear slippers",
        sellPrice: 1,
        description: "They're so cute!",
        isEquippable: true,
        isMagic: true,
        stats: {
            armor: 25
        },
        extraStats: {
            armor: 25
        },
        enchantments: ["bear_slippers"],
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 25
            }
        ]
    },

    // like a fiery_bow (radiant/T22) but more accuracy and 3x damage to charmed enemies during autoattack
    cupids_bow: {
        id: "cupids_bow",
        icon: "eventVDcupidbow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "cupid's bow",
        sellPrice: 1,
        description: "A slow but powerful ranged weapon of polished eucalyptus.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 83.5 * 1.2 * 1.75,
            attackMax: 300 * 1.2,
            attackSpeed: SLOW_SPEED,
            accuracy: 130,
            criticalChance: 25
        },
        extraStats: {
            attack: 25.1 * 1.2 * 1.75,
            attackMax: 90 * 1.2,
            accuracy: 35
        },
        enchantments: ["cupids_bow"],
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 100
            },
            {
                type: "skill",
                name: "health",
                level: 100
            }
        ]
    },

    honeycomb_pants: {
        id: "honeycomb_pants",
        icon: "honeycombItem.svg",
        category: "combat",
        slot: "legs",
        name: "honeycomb pants",
        sellPrice: 8500,
        description: "Pants with pockets laden with a powerful source of health and recovery.",
        isEquippable: true,
        stats: {
            healthMax: 150,
            healingPower: 5
        },
        extraStats: {
            healthMax: 50,
            healingPower: 5
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "health",
                level: 75
            }
        ],
        enchantments: ["honeycomb"],
        tier: 24
    },

    holy_plate: {
        id: "holy_plate",
        icon: "holyChestplate.png",
        category: "combat",
        slot: "chest",
        name: "holy plate",
        sellPrice: Math.round(3000 * RADIANT_MULTIPLIER),
        description: "Protect your heart",
        isEquippable: true,
        stats: {
            healthMax: 22.4 * RADIANT_MULTIPLIER,
            defense: 18.4 * RADIANT_MULTIPLIER,
            armor: 74.5 * RADIANT_MULTIPLIER
        },
        extraStats: {
            healthMax: 7.2 * RADIANT_MULTIPLIER,
            defense: 7.7 * RADIANT_MULTIPLIER,
            armor: 22.1 * RADIANT_MULTIPLIER
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 100
            }
        ],
        enchantments: ["holy_plate"],
        tier: 23
    },

    witchs_cauldron: {
        id: "witchs_cauldron",
        icon: "witchsCauldron.svg",
        category: "combat",
        weaponType: "orb",
        slot: "offHand",
        name: "witch's cauldron",
        sellPrice: 12500,
        description: "An ordinarily cauldron with unordinary ingredients.",
        isWeapon: true,
        isEquippable: true,
        isMagic: true,
        stats: {
            magicPower: 35
        },
        extraStats: {
            magicPower: 15
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 75
            }
        ],
        enchantments: ["witchs_cauldron"],
        tier: 26
    },

    event_spd_jeweled_greaves: {
        id: "event_spd_jeweled_greaves",
        icon: "eventSPDJeweledPlatelegs.png",
        category: "combat",
        slot: "legs",
        name: "jeweled greaves",
        sellPrice: 0,
        description: "This leg armor is adorned with numerous fantastic gems and precious jewels.",
        isEquippable: true,
        stats: {
            healthMax: 5,
            defense: 5,
            armor: 20
        },
        extraStats: {
            healthMax: 5,
            defense: 2.5,
            armor: 10
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 30
            }
        ],
        enchantments: ["event_spd_jeweled_greaves"]
    }
}
