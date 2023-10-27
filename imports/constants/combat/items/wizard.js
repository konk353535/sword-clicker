export const WIZARD_ITEMS = {
    phoenix_hat: {
        id: "phoenix_hat",
        icon: "phoenixHat.svg",
        category: "combat",
        slot: "head",
        name: "phoenix hat",
        sellPrice: 750,
        description: "Seems to smother healing energy",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 60,
            magicPower: 15,
            healingPower: -12
        },
        extraStats: {
            healthMax: 40,
            magicPower: 5
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 20
            }
        ],
        enchantments: ["phoenix_hat"],
        tier: 5
    },

    eternal_flame: {
        id: "eternal_flame",
        icon: "eternalFlame.svg",
        category: "combat",
        slot: "head",
        name: "eternal flame",
        sellPrice: 17500,
        description: "A wreath of eternal flames.",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 250,
            magicPower: 35,
            healingPower: -5
        },
        extraStats: {
            healthMax: 50,
            magicPower: 10
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 60
            }
        ],
        enchantments: ["eternal_flame"],
        tier: 13
    },

    druids_hat: {
        id: "druids_hat",
        icon: "druidsHat.svg",
        category: "combat",
        slot: "head",
        name: "druidic hat",
        sellPrice: 500,
        description: "Helps emit healing energy",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 30,
            accuracy: -25,
            magicPower: 5,
            magicArmor: 5,
            healingPower: 10
        },
        extraStats: {
            healthMax: 10,
            magicPower: 2,
            healingPower: 5
        },
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 10
            }
        ],
        enchantments: ["druidic_hat"],
        tier: 3
    },

    druids_shirt: {
        id: "druids_shirt",
        icon: "druidsShirt.svg",
        category: "combat",
        slot: "chest",
        name: "druidic shirt",
        sellPrice: 450,
        description: "Helps emit healing energy",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 74,
            magicPower: 11,
            magicArmor: 13,
            healingPower: 10
        },
        extraStats: {
            healthMax: 30,
            magicPower: 5,
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
                level: 15
            }
        ],
        tier: 4
    },

    druids_pants: {
        id: "druids_pants",
        icon: "druidsPants.svg",
        category: "combat",
        slot: "legs",
        name: "druidic pants",
        sellPrice: 450,
        description: "Helps emit healing energy",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 74,
            magicPower: 11,
            magicArmor: 13,
            healingPower: 10
        },
        extraStats: {
            healthMax: 30,
            magicPower: 5,
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
                level: 15
            }
        ],
        tier: 4
    },

    brown_wizard_hat: {
        id: 'brown_wizard_hat',
        icon: 'wizardHat_t02.png',
        category: 'combat',
        slot: 'head',
        name: 'brown wizard hat',
        sellPrice: 150,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 46,
            magicPower: 1,
            magicArmor: 7
        },
        extraStats: {
            healthMax: 10,
            magicPower: 3
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 5
        }]
    },

    blue_wizard_hat: {
        id: 'blue_wizard_hat',
        icon: 'wizardHat_t03.png',
        category: 'combat',
        slot: 'head',
        name: 'blue wizard hat',
        sellPrice: 300,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 60,
            magicPower: 6,
            magicArmor: 10
        },
        extraStats: {
            healthMax: 20,
            magicPower: 4
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 10
        }]
    },

    purple_wizard_hat: {
        id: 'purple_wizard_hat',
        icon: 'wizardHat_t05.png',
        category: 'combat',
        slot: 'head',
        name: 'purple wizard hat',
        sellPrice: 600,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 88,
            magicPower: 16,
            magicArmor: 16
        },
        extraStats: {
            healthMax: 39,
            magicPower: 6
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 20
        }]
    },

    orange_wizard_hat: {
        id: 'orange_wizard_hat',
        icon: 'wizardHat_t06.png',
        category: 'combat',
        slot: 'head',
        name: 'orange wizard hat',
        sellPrice: 750,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 102,
            magicPower: 20,
            magicArmor: 19
        },
        extraStats: {
            healthMax: 49,
            magicPower: 7
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 25
        }]
    },

    grey_wizard_hat: {
        id: 'grey_wizard_hat',
        icon: 'wizardHat_t07.png',
        category: 'combat',
        slot: 'head',
        name: 'grey wizard hat',
        sellPrice: 900,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 117,
            magicPower: 25,
            magicArmor: 22
        },
        extraStats: {
            healthMax: 59,
            magicPower: 9
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 30
        }]
    },

    red_wizard_hat: {
        id: 'red_wizard_hat',
        icon: 'wizardHat_t08.png',
        category: 'combat',
        slot: 'head',
        name: 'red wizard hat',
        sellPrice: 1050,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 131,
            magicPower: 30,
            magicArmor: 25
        },
        extraStats: {
            healthMax: 68,
            magicPower: 10
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 35
        }]
    },

    black_wizard_hat: {
        id: 'black_wizard_hat',
        icon: 'wizardHat_t09.png',
        category: 'combat',
        slot: 'head',
        name: 'black wizard hat',
        sellPrice: 1200,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 145,
            magicPower: 35,
            magicArmor: 28
        },
        extraStats: {
            healthMax: 78,
            magicPower: 11
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 40
        }]
    },

    yellow_wizard_hat: {
        id: 'yellow_wizard_hat',
        icon: 'wizardHat_t10.png',
        category: 'combat',
        slot: 'head',
        name: 'yellow wizard hat',
        sellPrice: 1350,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 159,
            magicPower: 40,
            magicArmor: 31
        },
        extraStats: {
            healthMax: 88,
            magicPower: 12
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 45
        }]
    },

    umber_wizard_hat: {
        id: 'umber_wizard_hat',
        icon: 'wizardHat_t11.png',
        category: 'combat',
        slot: 'head',
        name: 'umber wizard hat',
        sellPrice: 1500,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 173,
            magicPower: 44,
            magicArmor: 34
        },
        extraStats: {
            healthMax: 98,
            magicPower: 13
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 50
        }]
    },

    azure_wizard_hat: {
        id: 'azure_wizard_hat',
        icon: 'wizardHat_t12.png',
        category: 'combat',
        slot: 'head',
        name: 'azure wizard hat',
        sellPrice: 1650,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 187,
            magicPower: 49,
            magicArmor: 37
        },
        extraStats: {
            healthMax: 107,
            magicPower: 15
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 55
        }]
    },

    verdant_wizard_hat: {
        id: 'verdant_wizard_hat',
        icon: 'wizardHat_t13.png',
        category: 'combat',
        slot: 'head',
        name: 'verdant wizard hat',
        sellPrice: 1800,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 202,
            magicPower: 54,
            magicArmor: 40
        },
        extraStats: {
            healthMax: 117,
            magicPower: 16
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 60
        }]
    },

    violet_wizard_hat: {
        id: 'violet_wizard_hat',
        icon: 'wizardHat_t14.png',
        category: 'combat',
        slot: 'head',
        name: 'violet wizard hat',
        sellPrice: 1950,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 216,
            magicPower: 59,
            magicArmor: 43
        },
        extraStats: {
            healthMax: 127,
            magicPower: 17
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 65
        }]
    },

    tawny_wizard_hat: {
        id: 'tawny_wizard_hat',
        icon: 'wizardHat_t15.png',
        category: 'combat',
        slot: 'head',
        name: 'tawny wizard hat',
        sellPrice: 2100,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 230,
            magicPower: 63,
            magicArmor: 46
        },
        extraStats: {
            healthMax: 136,
            magicPower: 18
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 70
        }]
    },

    ash_wizard_hat: {
        id: 'ash_wizard_hat',
        icon: 'wizardHat_t16.png',
        category: 'combat',
        slot: 'head',
        name: 'ash wizard hat',
        sellPrice: 2250,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 244,
            magicPower: 68,
            magicArmor: 49
        },
        extraStats: {
            healthMax: 146,
            magicPower: 19
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 75
        }]
    },

    crimson_wizard_hat: {
        id: 'crimson_wizard_hat',
        icon: 'wizardHat_t17.png',
        category: 'combat',
        slot: 'head',
        name: 'crimson wizard hat',
        sellPrice: 2400,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 258,
            magicPower: 73,
            magicArmor: 52
        },
        extraStats: {
            healthMax: 156,
            magicPower: 21
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 80
        }]
    },

    charcoal_wizard_hat: {
        id: 'charcoal_wizard_hat',
        icon: 'wizardHat_t18.png',
        category: 'combat',
        slot: 'head',
        name: 'charcoal wizard hat',
        sellPrice: 2550,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 273,
            magicPower: 78,
            magicArmor: 55
        },
        extraStats: {
            healthMax: 165,
            magicPower: 22
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 85
        }]
    },

    amber_wizard_hat: {
        id: 'amber_wizard_hat',
        icon: 'wizardHat_t19.png',
        category: 'combat',
        slot: 'head',
        name: 'amber wizard hat',
        sellPrice: 2700,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 287,
            magicPower: 83,
            magicArmor: 58
        },
        extraStats: {
            healthMax: 175,
            magicPower: 23
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 90
        }]
    },

    leather_wizard_hat: {
        id: 'leather_wizard_hat',
        icon: 'wizardHat_t20.png',
        category: 'combat',
        slot: 'head',
        name: 'leather wizard hat',
        sellPrice: 2850,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 301,
            magicPower: 87,
            magicArmor: 61
        },
        extraStats: {
            healthMax: 185,
            magicPower: 24
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 95
        }]
    },

    cerulean_wizard_hat: {
        id: 'cerulean_wizard_hat',
        icon: 'wizardHat_t21.png',
        category: 'combat',
        slot: 'head',
        name: 'cerulean wizard hat',
        sellPrice: 3000,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 315,
            magicPower: 92,
            magicArmor: 64
        },
        extraStats: {
            healthMax: 195,
            magicPower: 25
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 100
        }]
    },

    serpent_wizard_hat: {
        id: 'serpent_wizard_hat',
        icon: 'wizardHat_t22.png',
        category: 'combat',
        slot: 'head',
        name: 'serpent wizard hat',
        sellPrice: 3150,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 329,
            magicPower: 97,
            magicArmor: 67
        },
        extraStats: {
            healthMax: 204,
            magicPower: 26
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 105
        }]
    },

    indigo_wizard_hat: {
        id: 'indigo_wizard_hat',
        icon: 'wizardHat_t23.png',
        category: 'combat',
        slot: 'head',
        name: 'indigo wizard hat',
        sellPrice: 3300,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 343,
            magicPower: 102,
            magicArmor: 70
        },
        extraStats: {
            healthMax: 214,
            magicPower: 28
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 110
        }]
    },

    ochre_wizard_hat: {
        id: 'ochre_wizard_hat',
        icon: 'wizardHat_t24.png',
        category: 'combat',
        slot: 'head',
        name: 'ochre wizard hat',
        sellPrice: 3450,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 358,
            magicPower: 106,
            magicArmor: 73
        },
        extraStats: {
            healthMax: 224,
            magicPower: 29
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 115
        }]
    },

    exalted_wizard_hat: {
        id: 'exalted_wizard_hat',
        icon: 'wizardHat_t25.png',
        category: 'combat',
        slot: 'head',
        name: 'exalted wizard hat',
        sellPrice: 3600,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 372,
            magicPower: 111,
            magicArmor: 76
        },
        extraStats: {
            healthMax: 233,
            magicPower: 30
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 120
        }]
    },

    brown_wizard_shirt: {
        id: 'brown_wizard_shirt',
        icon: 'wizardShirt_t02.png',
        category: 'combat',
        slot: 'chest',
        name: 'brown wizard shirt',
        sellPrice: 150,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 46,
            magicPower: 1,
            magicArmor: 7
        },
        extraStats: {
            healthMax: 10,
            magicPower: 3
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 5
        }]
    },

    blue_wizard_shirt: {
        id: 'blue_wizard_shirt',
        icon: 'wizardShirt_t03.png',
        category: 'combat',
        slot: 'chest',
        name: 'blue wizard shirt',
        sellPrice: 300,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 60,
            magicPower: 6,
            magicArmor: 10
        },
        extraStats: {
            healthMax: 20,
            magicPower: 4
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 10
        }]
    },

    purple_wizard_shirt: {
        id: 'purple_wizard_shirt',
        icon: 'wizardShirt_t05.png',
        category: 'combat',
        slot: 'chest',
        name: 'purple wizard shirt',
        sellPrice: 600,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 88,
            magicPower: 16,
            magicArmor: 16
        },
        extraStats: {
            healthMax: 39,
            magicPower: 6
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 20
        }]
    },

    orange_wizard_shirt: {
        id: 'orange_wizard_shirt',
        icon: 'wizardShirt_t06.png',
        category: 'combat',
        slot: 'chest',
        name: 'orange wizard shirt',
        sellPrice: 750,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 102,
            magicPower: 20,
            magicArmor: 19
        },
        extraStats: {
            healthMax: 49,
            magicPower: 7
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 25
        }]
    },

    grey_wizard_shirt: {
        id: 'grey_wizard_shirt',
        icon: 'wizardShirt_t07.png',
        category: 'combat',
        slot: 'chest',
        name: 'grey wizard shirt',
        sellPrice: 900,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 117,
            magicPower: 25,
            magicArmor: 22
        },
        extraStats: {
            healthMax: 59,
            magicPower: 9
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 30
        }]
    },

    red_wizard_shirt: {
        id: 'red_wizard_shirt',
        icon: 'wizardShirt_t08.png',
        category: 'combat',
        slot: 'chest',
        name: 'red wizard shirt',
        sellPrice: 1050,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 131,
            magicPower: 30,
            magicArmor: 25
        },
        extraStats: {
            healthMax: 68,
            magicPower: 10
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 35
        }]
    },

    black_wizard_shirt: {
        id: 'black_wizard_shirt',
        icon: 'wizardShirt_t09.png',
        category: 'combat',
        slot: 'chest',
        name: 'black wizard shirt',
        sellPrice: 1200,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 145,
            magicPower: 35,
            magicArmor: 28
        },
        extraStats: {
            healthMax: 78,
            magicPower: 11
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 40
        }]
    },

    yellow_wizard_shirt: {
        id: 'yellow_wizard_shirt',
        icon: 'wizardShirt_t10.png',
        category: 'combat',
        slot: 'chest',
        name: 'yellow wizard shirt',
        sellPrice: 1350,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 159,
            magicPower: 40,
            magicArmor: 31
        },
        extraStats: {
            healthMax: 88,
            magicPower: 12
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 45
        }]
    },

    umber_wizard_shirt: {
        id: 'umber_wizard_shirt',
        icon: 'wizardShirt_t11.png',
        category: 'combat',
        slot: 'chest',
        name: 'umber wizard shirt',
        sellPrice: 1500,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 173,
            magicPower: 44,
            magicArmor: 34
        },
        extraStats: {
            healthMax: 98,
            magicPower: 13
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 50
        }]
    },

    azure_wizard_shirt: {
        id: 'azure_wizard_shirt',
        icon: 'wizardShirt_t12.png',
        category: 'combat',
        slot: 'chest',
        name: 'azure wizard shirt',
        sellPrice: 1650,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 187,
            magicPower: 49,
            magicArmor: 37
        },
        extraStats: {
            healthMax: 107,
            magicPower: 15
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 55
        }]
    },

    verdant_wizard_shirt: {
        id: 'verdant_wizard_shirt',
        icon: 'wizardShirt_t13.png',
        category: 'combat',
        slot: 'chest',
        name: 'verdant wizard shirt',
        sellPrice: 1800,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 202,
            magicPower: 54,
            magicArmor: 40
        },
        extraStats: {
            healthMax: 117,
            magicPower: 16
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 60
        }]
    },

    violet_wizard_shirt: {
        id: 'violet_wizard_shirt',
        icon: 'wizardShirt_t14.png',
        category: 'combat',
        slot: 'chest',
        name: 'violet wizard shirt',
        sellPrice: 1950,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 216,
            magicPower: 59,
            magicArmor: 43
        },
        extraStats: {
            healthMax: 127,
            magicPower: 17
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 65
        }]
    },

    tawny_wizard_shirt: {
        id: 'tawny_wizard_shirt',
        icon: 'wizardShirt_t15.png',
        category: 'combat',
        slot: 'chest',
        name: 'tawny wizard shirt',
        sellPrice: 2100,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 230,
            magicPower: 63,
            magicArmor: 46
        },
        extraStats: {
            healthMax: 136,
            magicPower: 18
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 70
        }]
    },

    ash_wizard_shirt: {
        id: 'ash_wizard_shirt',
        icon: 'wizardShirt_t16.png',
        category: 'combat',
        slot: 'chest',
        name: 'ash wizard shirt',
        sellPrice: 2250,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 244,
            magicPower: 68,
            magicArmor: 49
        },
        extraStats: {
            healthMax: 146,
            magicPower: 19
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 75
        }]
    },

    crimson_wizard_shirt: {
        id: 'crimson_wizard_shirt',
        icon: 'wizardShirt_t17.png',
        category: 'combat',
        slot: 'chest',
        name: 'crimson wizard shirt',
        sellPrice: 2400,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 258,
            magicPower: 73,
            magicArmor: 52
        },
        extraStats: {
            healthMax: 156,
            magicPower: 21
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 80
        }]
    },

    charcoal_wizard_shirt: {
        id: 'charcoal_wizard_shirt',
        icon: 'wizardShirt_t18.png',
        category: 'combat',
        slot: 'chest',
        name: 'charcoal wizard shirt',
        sellPrice: 2550,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 273,
            magicPower: 78,
            magicArmor: 55
        },
        extraStats: {
            healthMax: 165,
            magicPower: 22
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 85
        }]
    },

    amber_wizard_shirt: {
        id: 'amber_wizard_shirt',
        icon: 'wizardShirt_t19.png',
        category: 'combat',
        slot: 'chest',
        name: 'amber wizard shirt',
        sellPrice: 2700,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 287,
            magicPower: 83,
            magicArmor: 58
        },
        extraStats: {
            healthMax: 175,
            magicPower: 23
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 90
        }]
    },

    leather_wizard_shirt: {
        id: 'leather_wizard_shirt',
        icon: 'wizardShirt_t20.png',
        category: 'combat',
        slot: 'chest',
        name: 'leather wizard shirt',
        sellPrice: 2850,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 301,
            magicPower: 87,
            magicArmor: 61
        },
        extraStats: {
            healthMax: 185,
            magicPower: 24
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 95
        }]
    },

    cerulean_wizard_shirt: {
        id: 'cerulean_wizard_shirt',
        icon: 'wizardShirt_t21.png',
        category: 'combat',
        slot: 'chest',
        name: 'cerulean wizard shirt',
        sellPrice: 3000,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 315,
            magicPower: 92,
            magicArmor: 64
        },
        extraStats: {
            healthMax: 195,
            magicPower: 25
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 100
        }]
    },

    serpent_wizard_shirt: {
        id: 'serpent_wizard_shirt',
        icon: 'wizardShirt_t22.png',
        category: 'combat',
        slot: 'chest',
        name: 'serpent wizard shirt',
        sellPrice: 3150,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 329,
            magicPower: 97,
            magicArmor: 67
        },
        extraStats: {
            healthMax: 204,
            magicPower: 26
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 105
        }]
    },

    indigo_wizard_shirt: {
        id: 'indigo_wizard_shirt',
        icon: 'wizardShirt_t23.png',
        category: 'combat',
        slot: 'chest',
        name: 'indigo wizard shirt',
        sellPrice: 3300,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 343,
            magicPower: 102,
            magicArmor: 70
        },
        extraStats: {
            healthMax: 214,
            magicPower: 28
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 110
        }]
    },

    ochre_wizard_shirt: {
        id: 'ochre_wizard_shirt',
        icon: 'wizardShirt_t24.png',
        category: 'combat',
        slot: 'chest',
        name: 'ochre wizard shirt',
        sellPrice: 3450,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 358,
            magicPower: 106,
            magicArmor: 73
        },
        extraStats: {
            healthMax: 224,
            magicPower: 29
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 115
        }]
    },

    exalted_wizard_shirt: {
        id: 'exalted_wizard_shirt',
        icon: 'wizardShirt_t25.png',
        category: 'combat',
        slot: 'chest',
        name: 'exalted wizard shirt',
        sellPrice: 3600,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 372,
            magicPower: 111,
            magicArmor: 76
        },
        extraStats: {
            healthMax: 233,
            magicPower: 30
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 120
        }]
    },

    brown_wizard_shorts: {
        id: 'brown_wizard_shorts',
        icon: 'wizardShorts_t02.png',
        category: 'combat',
        slot: 'legs',
        name: 'brown wizard shorts',
        sellPrice: 150,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 46,
            magicPower: 1,
            magicArmor: 7
        },
        extraStats: {
            healthMax: 10,
            magicPower: 3
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 5
        }]
    },

    blue_wizard_shorts: {
        id: 'blue_wizard_shorts',
        icon: 'wizardShorts_t03.png',
        category: 'combat',
        slot: 'legs',
        name: 'blue wizard shorts',
        sellPrice: 300,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 60,
            magicPower: 6,
            magicArmor: 10
        },
        extraStats: {
            healthMax: 20,
            magicPower: 4
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 10
        }]
    },

    purple_wizard_shorts: {
        id: 'purple_wizard_shorts',
        icon: 'wizardShorts_t05.png',
        category: 'combat',
        slot: 'legs',
        name: 'purple wizard shorts',
        sellPrice: 600,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 88,
            magicPower: 16,
            magicArmor: 16
        },
        extraStats: {
            healthMax: 39,
            magicPower: 6
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 20
        }]
    },

    orange_wizard_shorts: {
        id: 'orange_wizard_shorts',
        icon: 'wizardShorts_t06.png',
        category: 'combat',
        slot: 'legs',
        name: 'orange wizard shorts',
        sellPrice: 750,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 102,
            magicPower: 20,
            magicArmor: 19
        },
        extraStats: {
            healthMax: 49,
            magicPower: 7
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 25
        }]
    },

    grey_wizard_shorts: {
        id: 'grey_wizard_shorts',
        icon: 'wizardShorts_t07.png',
        category: 'combat',
        slot: 'legs',
        name: 'grey wizard shorts',
        sellPrice: 900,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 117,
            magicPower: 25,
            magicArmor: 22
        },
        extraStats: {
            healthMax: 59,
            magicPower: 9
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 30
        }]
    },

    red_wizard_shorts: {
        id: 'red_wizard_shorts',
        icon: 'wizardShorts_t08.png',
        category: 'combat',
        slot: 'legs',
        name: 'red wizard shorts',
        sellPrice: 1050,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 131,
            magicPower: 30,
            magicArmor: 25
        },
        extraStats: {
            healthMax: 68,
            magicPower: 10
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 35
        }]
    },

    black_wizard_shorts: {
        id: 'black_wizard_shorts',
        icon: 'wizardShorts_t09.png',
        category: 'combat',
        slot: 'legs',
        name: 'black wizard shorts',
        sellPrice: 1200,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 145,
            magicPower: 35,
            magicArmor: 28
        },
        extraStats: {
            healthMax: 78,
            magicPower: 11
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 40
        }]
    },

    yellow_wizard_shorts: {
        id: 'yellow_wizard_shorts',
        icon: 'wizardShorts_t10.png',
        category: 'combat',
        slot: 'legs',
        name: 'yellow wizard shorts',
        sellPrice: 1350,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 159,
            magicPower: 40,
            magicArmor: 31
        },
        extraStats: {
            healthMax: 88,
            magicPower: 12
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 45
        }]
    },

    umber_wizard_shorts: {
        id: 'umber_wizard_shorts',
        icon: 'wizardShorts_t11.png',
        category: 'combat',
        slot: 'legs',
        name: 'umber wizard shorts',
        sellPrice: 1500,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 173,
            magicPower: 44,
            magicArmor: 34
        },
        extraStats: {
            healthMax: 98,
            magicPower: 13
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 50
        }]
    },

    azure_wizard_shorts: {
        id: 'azure_wizard_shorts',
        icon: 'wizardShorts_t12.png',
        category: 'combat',
        slot: 'legs',
        name: 'azure wizard shorts',
        sellPrice: 1650,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 187,
            magicPower: 49,
            magicArmor: 37
        },
        extraStats: {
            healthMax: 107,
            magicPower: 15
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 55
        }]
    },

    verdant_wizard_shorts: {
        id: 'verdant_wizard_shorts',
        icon: 'wizardShorts_t13.png',
        category: 'combat',
        slot: 'legs',
        name: 'verdant wizard shorts',
        sellPrice: 1800,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 202,
            magicPower: 54,
            magicArmor: 40
        },
        extraStats: {
            healthMax: 117,
            magicPower: 16
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 60
        }]
    },

    violet_wizard_shorts: {
        id: 'violet_wizard_shorts',
        icon: 'wizardShorts_t14.png',
        category: 'combat',
        slot: 'legs',
        name: 'violet wizard shorts',
        sellPrice: 1950,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 216,
            magicPower: 59,
            magicArmor: 43
        },
        extraStats: {
            healthMax: 127,
            magicPower: 17
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 65
        }]
    },

    tawny_wizard_shorts: {
        id: 'tawny_wizard_shorts',
        icon: 'wizardShorts_t15.png',
        category: 'combat',
        slot: 'legs',
        name: 'tawny wizard shorts',
        sellPrice: 2100,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 230,
            magicPower: 63,
            magicArmor: 46
        },
        extraStats: {
            healthMax: 136,
            magicPower: 18
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 70
        }]
    },

    ash_wizard_shorts: {
        id: 'ash_wizard_shorts',
        icon: 'wizardShorts_t16.png',
        category: 'combat',
        slot: 'legs',
        name: 'ash wizard shorts',
        sellPrice: 2250,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 244,
            magicPower: 68,
            magicArmor: 49
        },
        extraStats: {
            healthMax: 146,
            magicPower: 19
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 75
        }]
    },

    crimson_wizard_shorts: {
        id: 'crimson_wizard_shorts',
        icon: 'wizardShorts_t17.png',
        category: 'combat',
        slot: 'legs',
        name: 'crimson wizard shorts',
        sellPrice: 2400,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 258,
            magicPower: 73,
            magicArmor: 52
        },
        extraStats: {
            healthMax: 156,
            magicPower: 21
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 80
        }]
    },

    charcoal_wizard_shorts: {
        id: 'charcoal_wizard_shorts',
        icon: 'wizardShorts_t18.png',
        category: 'combat',
        slot: 'legs',
        name: 'charcoal wizard shorts',
        sellPrice: 2550,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 273,
            magicPower: 78,
            magicArmor: 55
        },
        extraStats: {
            healthMax: 165,
            magicPower: 22
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 85
        }]
    },

    amber_wizard_shorts: {
        id: 'amber_wizard_shorts',
        icon: 'wizardShorts_t19.png',
        category: 'combat',
        slot: 'legs',
        name: 'amber wizard shorts',
        sellPrice: 2700,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 287,
            magicPower: 83,
            magicArmor: 58
        },
        extraStats: {
            healthMax: 175,
            magicPower: 23
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 90
        }]
    },

    leather_wizard_shorts: {
        id: 'leather_wizard_shorts',
        icon: 'wizardShorts_t20.png',
        category: 'combat',
        slot: 'legs',
        name: 'leather wizard shorts',
        sellPrice: 2850,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 301,
            magicPower: 87,
            magicArmor: 61
        },
        extraStats: {
            healthMax: 185,
            magicPower: 24
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 95
        }]
    },

    cerulean_wizard_shorts: {
        id: 'cerulean_wizard_shorts',
        icon: 'wizardShorts_t21.png',
        category: 'combat',
        slot: 'legs',
        name: 'cerulean wizard shorts',
        sellPrice: 3000,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 315,
            magicPower: 92,
            magicArmor: 64
        },
        extraStats: {
            healthMax: 195,
            magicPower: 25
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 100
        }]
    },

    serpent_wizard_shorts: {
        id: 'serpent_wizard_shorts',
        icon: 'wizardShorts_t22.png',
        category: 'combat',
        slot: 'legs',
        name: 'serpent wizard shorts',
        sellPrice: 3150,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 329,
            magicPower: 97,
            magicArmor: 67
        },
        extraStats: {
            healthMax: 204,
            magicPower: 26
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 105
        }]
    },

    indigo_wizard_shorts: {
        id: 'indigo_wizard_shorts',
        icon: 'wizardShorts_t23.png',
        category: 'combat',
        slot: 'legs',
        name: 'indigo wizard shorts',
        sellPrice: 3300,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 343,
            magicPower: 102,
            magicArmor: 70
        },
        extraStats: {
            healthMax: 214,
            magicPower: 28
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 110
        }]
    },

    ochre_wizard_shorts: {
        id: 'ochre_wizard_shorts',
        icon: 'wizardShorts_t24.png',
        category: 'combat',
        slot: 'legs',
        name: 'ochre wizard shorts',
        sellPrice: 3450,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 358,
            magicPower: 106,
            magicArmor: 73
        },
        extraStats: {
            healthMax: 224,
            magicPower: 29
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 115
        }]
    },

    exalted_wizard_shorts: {
        id: 'exalted_wizard_shorts',
        icon: 'wizardShorts_t25.png',
        category: 'combat',
        slot: 'legs',
        name: 'exalted wizard shorts',
        sellPrice: 3600,
        description: 'Helps emit magical energy',
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 372,
            magicPower: 111,
            magicArmor: 76
        },
        extraStats: {
            healthMax: 233,
            magicPower: 30
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
        requiredEquip: [{
            type: 'skill',
            name: 'magic',
            level: 120
        }]
    },

    lichs_cowl: {
        id: "lichs_cowl",
        icon: "lichsCowl.png",
        category: "combat",
        slot: "head",
        name: "lich's cowl",
        sellPrice: 75000,
        description: "Emits dark energy, threatening to corrupt the wearer's soul.",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 350,
            magicPower: 80,
            magicArmor: 60
        },
        extraStats: {
            healthMax: 180,
            magicPower: 30,
            magicArmor: 10
        },
        enchantments: ["dark_aura"],
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 85
            }
        ]
    },

    lichs_robes: {
        id: "lichs_robes",
        icon: "lichsRobes.png",
        category: "combat",
        slot: "chest",
        name: "lich's robes",
        sellPrice: 75000,
        description: "Emits dark energy, threatening to corrupt the wearer's soul.",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 350,
            magicPower: 80,
            magicArmor: 60
        },
        extraStats: {
            healthMax: 180,
            magicPower: 30,
            magicArmor: 10
        },
        enchantments: ["damage_reflect"],
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 85
            }
        ]
    },

    lichs_wraps: {
        id: "lichs_wraps",
        icon: "lichsWraps.png",
        category: "combat",
        slot: "legs",
        name: "lich's wraps",
        sellPrice: 75000,
        description: "Emits dark energy, threatening to corrupt the wearer's soul.",
        isEquippable: true,
        isMagic: true,
        stats: {
            healthMax: 350,
            magicPower: 80,
            magicArmor: 60
        },
        extraStats: {
            healthMax: 180,
            magicPower: 30,
            magicArmor: 10
        },
        enchantments: ["health_up_enchantment"],
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 85
            }
        ]
    }
}
