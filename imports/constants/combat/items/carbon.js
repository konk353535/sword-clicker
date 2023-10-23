export const CARBON_ITEMS = {
    carbon_dagger: {
        id: "carbon_dagger",
        icon: "carbonDagger.png",
        category: "combat",
        weaponType: "dagger",
        slot: "mainHand",
        name: "carbon dagger",
        sellPrice: 450,
        description: "A poorly made dagger.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 4,
            attackMax: 7.6,
            attackSpeed: 1,
            accuracy: 17.4
        },
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 30
            }
        ]
    },
    carbon_spear: {
        id: "carbon_spear",
        icon: "carbonSpear.png",
        category: "combat",
        weaponType: "spear",
        slot: "mainHand",
        name: "carbon spear",
        sellPrice: 650,
        description: "Used to train defense.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 15.3,
            attackMax: 19.2,
            attackSpeed: 0.5,
            accuracy: 19.2,
            defense: 7.6
        },
        extraStats: {
            attack: 4.6,
            attackMax: 5.8,
            accuracy: 5.8,
            defense: 2.3
        },
        upgradeRarity: [
            { chance: 10, rarityId: "crude" }, // 10% chance
            { chance: 30, rarityId: "rough" }, // 20% chance
            { chance: 40, rarityId: "improved" } // 10% chance
            // 60% chance (for standard)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 30
            }
        ]
    },
    carbon_short_sword: {
        id: "carbon_short_sword",
        icon: "carbonShortsword.png",
        category: "combat",
        weaponType: "shortSword",
        slot: "mainHand",
        name: "carbon short sword",
        sellPrice: 650,
        description: "A good balance between offense and defense",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 15.3,
            attackMax: 22.9,
            attackSpeed: 0.7,
            accuracy: 22.9
        },
        extraStats: {
            attack: 4.6,
            attackMax: 6.9,
            accuracy: 6.9
        },
        upgradeRarity: [
            { chance: 10, rarityId: "crude" }, // 10% chance
            { chance: 30, rarityId: "rough" }, // 20% chance
            { chance: 40, rarityId: "improved" } // 10% chance
            // 60% chance (for standard)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 30
            }
        ]
    },
    carbon_scimitar: {
        id: "carbon_scimitar",
        icon: "carbonScimitar.png",
        category: "combat",
        weaponType: "shortSword",
        slot: "mainHand",
        name: "carbon scimitar",
        sellPrice: 650,
        description: "A good balance between offense and defense",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 17,
            attackMax: 26.8,
            attackSpeed: 0.7,
            accuracy: 22.9
        },
        extraStats: {
            attack: 5.1,
            attackMax: 8,
            accuracy: 6.9
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
            requiresCrafting: 35
        }
    },
    carbon_long_sword: {
        id: "carbon_long_sword",
        icon: "carbonLongsword.png",
        category: "combat",
        weaponType: "longSword",
        slot: "mainHand",
        name: "carbon long sword",
        sellPrice: 650,
        description: "A pure offensive weapon",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 26.8,
            attackMax: 46.1,
            attackSpeed: 0.5,
            accuracy: 30.9
        },
        extraStats: {
            attack: 8,
            attackMax: 13.8,
            accuracy: 9.3
        },
        upgradeRarity: [
            { chance: 10, rarityId: "crude" }, // 10% chance
            { chance: 30, rarityId: "rough" }, // 20% chance
            { chance: 40, rarityId: "improved" } // 10% chance
            // 60% chance (for standard)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 30
            }
        ]
    },
    carbon_broad_sword: {
        id: "carbon_broad_sword",
        icon: "carbonBroadsword.png",
        category: "combat",
        weaponType: "broadSword",
        slot: "mainHand",
        name: "carbon broad sword",
        sellPrice: 650,
        description: "A pure offensive weapon",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 38.5,
            attackMax: 53.8,
            attackSpeed: 0.5,
            accuracy: 30.9,
            criticalChance: 10
        },
        extraStats: {
            attack: 11.5,
            attackMax: 16.1,
            accuracy: 9.3
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
            requiresCrafting: 35
        }
    },
    carbon_battle_axe: {
        id: "carbon_battle_axe",
        icon: "carbonBattleAxe.png",
        category: "combat",
        weaponType: "battleAxe",
        slot: "mainHand",
        name: "carbon battle axe",
        sellPrice: 650,
        description: "A slow pure offensive weapon.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 19.2,
            attackMax: 69,
            attackSpeed: 0.3,
            accuracy: 30.9,
            criticalChance: 35
        },
        extraStats: {
            attack: 5.8,
            attackMax: 20.7
        },
        upgradeRarity: [
            { chance: 10, rarityId: "crude" }, // 10% chance
            { chance: 30, rarityId: "rough" }, // 20% chance
            { chance: 40, rarityId: "improved" } // 10% chance
            // 60% chance (for standard)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 30
            }
        ]
    },
    carbon_horned_helmet: {
        id: "carbon_horned_helmet",
        icon: "horned_helmet_t7.png",
        category: "combat",
        slot: "head",
        name: "carbon horned helmet",
        sellPrice: 650,
        description: "Now that's using your head!",
        isEquippable: true,
        stats: {
            attack: 4,
            attackMax: 4,
            accuracy: 4
        },
        extraStats: {
            attack: 1.2,
            attackMax: 1.2,
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
                level: 30
            }
        ],
        reforgeRecipe: {
            requiresCrafting: 35
        }
    },
    carbon_helmet: {
        id: "carbon_helmet",
        icon: "carbonHelmet.png",
        category: "combat",
        slot: "head",
        name: "carbon helmet",
        sellPrice: 650,
        description: "Protect your head",
        isEquippable: true,
        stats: {
            healthMax: 4,
            defense: 4,
            armor: 19.2
        },
        extraStats: {
            healthMax: 1.2,
            defense: 1.2,
            armor: 5.8
        },
        upgradeRarity: [
            { chance: 10, rarityId: "crude" }, // 10% chance
            { chance: 30, rarityId: "rough" }, // 20% chance
            { chance: 40, rarityId: "improved" } // 10% chance
            // 60% chance (for standard)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 30
            }
        ]
    },
    carbon_chest_plate: {
        id: "carbon_chest_plate",
        icon: "carbonChestplate.png",
        category: "combat",
        slot: "chest",
        name: "carbon chestplate",
        sellPrice: 650,
        description: "Protect your heart",
        isEquippable: true,
        stats: {
            healthMax: 4,
            defense: 4,
            armor: 19.2
        },
        extraStats: {
            healthMax: 1.2,
            defense: 1.2,
            armor: 5.8
        },
        upgradeRarity: [
            { chance: 10, rarityId: "crude" }, // 10% chance
            { chance: 30, rarityId: "rough" }, // 20% chance
            { chance: 40, rarityId: "improved" } // 10% chance
            // 60% chance (for standard)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 30
            }
        ]
    },
    carbon_plate_legs: {
        id: "carbon_plate_legs",
        icon: "carbonPlatelegs.png",
        category: "combat",
        slot: "legs",
        name: "carbon platelegs",
        sellPrice: 650,
        description: "Protect your legs",
        isEquippable: true,
        stats: {
            healthMax: 4,
            defense: 4,
            armor: 19.2
        },
        extraStats: {
            healthMax: 1.2,
            defense: 1.2,
            armor: 5.8
        },
        upgradeRarity: [
            { chance: 10, rarityId: "crude" }, // 10% chance
            { chance: 30, rarityId: "rough" }, // 20% chance
            { chance: 40, rarityId: "improved" } // 10% chance
            // 60% chance (for standard)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 30
            }
        ]
    },
    carbon_shield: {
        id: "carbon_shield",
        icon: "carbonShield.png",
        category: "combat",
        weaponType: "shield",
        slot: "offHand",
        name: "carbon shield",
        sellPrice: 650,
        description: "Provides large defense bonuses",
        isEquippable: true,
        stats: {
            healthMax: 7.6,
            defense: 11.7,
            armor: 38.5
        },
        extraStats: {
            healthMax: 2.3,
            defense: 3.5,
            armor: 11.5
        },
        upgradeRarity: [
            { chance: 10, rarityId: "crude" }, // 10% chance
            { chance: 30, rarityId: "rough" }, // 20% chance
            { chance: 40, rarityId: "improved" } // 10% chance
            // 60% chance (for standard)
        ],
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 30
            }
        ]
    }
}
