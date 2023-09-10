import { MEDIUM_SPEED, SLOW_SPEED } from "../attackSpeeds"

// Note: original staff MP values before rebalancing
//
// tier    wood staff          magic power     healing bonus
// ------  ------------------  --------------  -------------
// 0       ?
// 1       pine staff (?)      MP
// 2       beech staff         MP  12 + 0-2
// 3       ash staff (?)       MP
// 4       oak staff           MP  13 + 0-2
// 5       maple staff (?)     MP
// 6       walnut staff        MP  21 + 0-2
// 7       cherry staff (?)    MP
// 8       mahogany staff      MP  19 + 0-2    HB 8%
// 9       elm staff (?)       MP
// 10      black staff         MP  26 + 0-2
// 11      blue gum staff      MP  26 + 0-2    HB 8%
// 12      cedar staff         MP  30 + 0-2
// 13      denya staff         MP  32 + 0-2    HB 8%
// 14      gombe staff         MP  34 + 0-2    HB 8%
// 15      hickory staff       MP  36 + 0-2
// 16      larch staff         MP  38 + 0-2    HB 8%
// 17      poplar staff        MP  40 + 0-2
// 18      tali staff          MP  42 + 0-2    HB 8%
// 19      willow staff        MP  50 + 0-2
// 20      teak staff          MP  55 + 0-2    HB 8%
//
// ? = missing item

export const STAFF_ITEMS = {
    pine_staff: {
        id: "pine_staff",
        icon: "pineStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "pine staff",
        sellPrice: 50,
        description: "What seems like a normal pine staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 2,
            attackMax: 4,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 10,
            magicPower: 8
        },
        upgradeRarity: [
            { chance: 10, rarityId: "crude" }, // 10% chance
            { chance: 30, rarityId: "rough" }, // 20% chance
            { chance: 40, rarityId: "improved" } // 10% chance
            // 60% chance (for standard)
        ],
        extraStats: {
            magicPower: 2
        }
    },

    beech_staff: {
        id: "beech_staff",
        icon: "beechStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "beech staff",
        sellPrice: 100,
        description: "What seems like a normal beech staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 4,
            attackMax: 6,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 13,
            magicPower: 10
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 1
            }
        ]
    },

    ash_staff: {
        id: "ash_staff",
        icon: "ashStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "ash staff",
        sellPrice: 150,
        description: "What seems like a normal ash staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 6,
            attackMax: 8,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 15,
            magicPower: 12
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 3
            }
        ]
    },

    oak_staff: {
        id: "oak_staff",
        icon: "oakStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "oak staff",
        sellPrice: 200,
        description: "What seems like a normal oak staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 8,
            attackMax: 10,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 18,
            magicPower: 14
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 3
            }
        ]
    },

    maple_staff: {
        id: "maple_staff",
        icon: "mapleStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "maple staff",
        sellPrice: 250,
        description: "What seems like a normal maple staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 10,
            attackMax: 12,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 21,
            magicPower: 16
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 6
            }
        ]
    },

    walnut_staff: {
        id: "walnut_staff",
        icon: "walnutStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "walnut staff",
        sellPrice: 300,
        description: "What seems like a normal walnut staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 12,
            attackMax: 14,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 23,
            magicPower: 18
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 9
            }
        ]
    },

    cherry_staff: {
        id: "cherry_staff",
        icon: "cherryStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "cherry staff",
        sellPrice: 350,
        description: "What seems like a normal cherry staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 14,
            attackMax: 16,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 26,
            magicPower: 20
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 12
            }
        ]
    },

    mahogany_staff: {
        id: "mahogany_staff",
        icon: "mahoganyStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "mahogany staff",
        sellPrice: 400,
        description: "What seems like a normal mahogany staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 16,
            attackMax: 18,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 28,
            magicPower: 22
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 15
            }
        ]
    },

    elm_staff: {
        id: "elm_staff",
        icon: "elkStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "elm staff",
        sellPrice: 450,
        description: "What seems like a normal elm staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 18,
            attackMax: 20,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 31,
            magicPower: 24
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 18
            }
        ]
    },

    black_staff: {
        id: "black_staff",
        icon: "blackStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "black staff",
        sellPrice: 500,
        description: "What seems like a normal black staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 20,
            attackMax: 22,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 34,
            magicPower: 26
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 21
            }
        ]
    },

    blue_gum_staff: {
        id: "blue_gum_staff",
        icon: "blueGumStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "blue gum staff",
        sellPrice: 550,
        description: "What seems like a normal blue gum staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 22,
            attackMax: 24,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 36,
            magicPower: 29
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 24
            }
        ]
    },

    cedar_staff: {
        id: "cedar_staff",
        icon: "cedarStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "cedar staff",
        sellPrice: 600,
        description: "What seems like a normal cedar staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 24,
            attackMax: 26,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 39,
            magicPower: 32
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 27
            }
        ]
    },

    denya_staff: {
        id: "denya_staff",
        icon: "denyaStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "denya staff",
        sellPrice: 650,
        description: "What seems like a normal denya staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 26,
            attackMax: 28,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 41,
            magicPower: 35
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 30
            }
        ]
    },

    gombe_staff: {
        id: "gombe_staff",
        icon: "gombeStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "gombe staff",
        sellPrice: 700,
        description: "What seems like a normal gombe staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 28,
            attackMax: 30,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 44,
            magicPower: 38
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 33
            }
        ]
    },

    hickory_staff: {
        id: "hickory_staff",
        icon: "hickoryStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "hickory staff",
        sellPrice: 750,
        description: "What seems like a normal hickory staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 30,
            attackMax: 32,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 47,
            magicPower: 41
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 36
            }
        ]
    },

    larch_staff: {
        id: "larch_staff",
        icon: "larchStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "larch staff",
        sellPrice: 800,
        description: "What seems like a normal larch staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 32,
            attackMax: 34,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 49,
            magicPower: 44
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 39
            }
        ]
    },

    poplar_staff: {
        id: "poplar_staff",
        icon: "poplarStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "poplar staff",
        sellPrice: 850,
        description: "What seems like a normal poplar staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 34,
            attackMax: 36,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 52,
            magicPower: 47
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 42
            }
        ]
    },

    tali_staff: {
        id: "tali_staff",
        icon: "taliStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "tali staff",
        sellPrice: 900,
        description: "What seems like a normal tali staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 36,
            attackMax: 38,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 54,
            magicPower: 50
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 45
            }
        ]
    },

    willow_staff: {
        id: "willow_staff",
        icon: "willowStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "willow staff",
        sellPrice: 950,
        description: "What seems like a normal willow staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 38,
            attackMax: 40,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 57,
            magicPower: 53
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 48
            }
        ]
    },

    teak_staff: {
        id: "teak_staff",
        icon: "teakStaff.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "teak staff",
        sellPrice: 1000,
        description: "What seems like a normal teak staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 40,
            attackMax: 42,
            attackSpeed: SLOW_SPEED,
            healingPower: 5,
            accuracy: 60,
            magicPower: 56
        },
        extraStats: {
            magicPower: 2
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
                name: "magic",
                level: 51
            }
        ]
    },

    dwarven_staff: {
        id: "dwarven_staff",
        icon: "dwarvenStaff.svg",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "dwarven staff",
        sellPrice: 1400,
        description: "A staff from an old dwarf",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 15,
            attackMax: 25,
            attackSpeed: SLOW_SPEED,
            accuracy: 30,
            magicPower: 35,
            defense: -20
        },
        extraStats: {
            attack: 3,
            attackMax: 3,
            accuracy: 7,
            magicPower: 2
        },
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
            }
        ]
    },

    ruby_staff: {
        id: "ruby_staff",
        icon: "rubyStaff.svg",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "ruby staff",
        sellPrice: 2400,
        description: "The ruby lusts for blood",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 15,
            attackMax: 25,
            attackSpeed: SLOW_SPEED,
            accuracy: 25,
            magicPower: 43,
            defense: -30,
            armor: -25,
            healthMax: 100
        },
        extraStats: {
            attack: 3,
            attackMax: 3,
            accuracy: 7,
            magicPower: 2
        },
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
                level: 25
            }
        ]
    },

    copper_wand: {
        id: "copper_wand",
        icon: "copperWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "copper wand",
        sellPrice: 350,
        description: "What seems like a copper wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 0,
            attackSpeed: SLOW_SPEED,
            accuracy: 4,
            magicPower: 6.75
        },
        upgradeRarity: [
            { chance: 0.2072, rarityId: "divine" }, //  0.2072% chance
            { chance: 0.768, rarityId: "epic" }, //  0.5608% chance
            { chance: 1.92, rarityId: "phenomenal" }, //  1.152%  chance
            { chance: 4.8, rarityId: "extraordinary" }, //  2.88%   chance
            { chance: 12, rarityId: "rare" }, //  7.2%    chance
            { chance: 30, rarityId: "fine" } // 18%      chance
            // 70%      chance (for uncommon)
        ],
        extraStats: {
            magicPower: 2
        }
    },

    tin_wand: {
        id: "tin_wand",
        icon: "tinWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "tin wand",
        sellPrice: 700,
        description: "What seems like a tin wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 2,
            attackSpeed: SLOW_SPEED,
            accuracy: 6,
            magicPower: 8
        },
        extraStats: {
            magicPower: 2
        },
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

    bronze_wand: {
        id: "bronze_wand",
        icon: "bronzeWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "bronze wand",
        sellPrice: 1050,
        description: "What seems like a bronze wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 4,
            attackSpeed: SLOW_SPEED,
            accuracy: 8,
            magicPower: 9.25
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 3
            }
        ]
    },

    iron_wand: {
        id: "iron_wand",
        icon: "ironWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "iron wand",
        sellPrice: 1400,
        description: "What seems like an iron wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 6,
            attackSpeed: SLOW_SPEED,
            accuracy: 10,
            magicPower: 10.5
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 3
            }
        ]
    },

    silver_wand: {
        id: "silver_wand",
        icon: "silverWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "silver wand",
        sellPrice: 1750,
        description: "What seems like a silver wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 8,
            attackSpeed: SLOW_SPEED,
            accuracy: 12,
            magicPower: 11.75
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 6
            }
        ]
    },

    gold_wand: {
        id: "gold_wand",
        icon: "goldWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "gold wand",
        sellPrice: 2100,
        description: "What seems like a gold wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 10,
            attackSpeed: SLOW_SPEED,
            accuracy: 14,
            magicPower: 13
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 9
            }
        ]
    },

    carbon_wand: {
        id: "carbon_wand",
        icon: "carbonWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "carbon wand",
        sellPrice: 2450,
        description: "What seems like a carbon wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 12,
            attackSpeed: SLOW_SPEED,
            accuracy: 16,
            magicPower: 14.25
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 12
            }
        ]
    },

    steel_wand: {
        id: "steel_wand",
        icon: "steelWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "steel wand",
        sellPrice: 2800,
        description: "What seems like a steel wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 14,
            attackSpeed: SLOW_SPEED,
            accuracy: 18,
            magicPower: 15.5
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 15
            }
        ]
    },

    platinum_wand: {
        id: "platinum_wand",
        icon: "platinumWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "platinum wand",
        sellPrice: 3150,
        description: "What seems like a platinum wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 16,
            attackSpeed: SLOW_SPEED,
            accuracy: 20,
            magicPower: 16.75
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 18
            }
        ]
    },

    titanium_wand: {
        id: "titanium_wand",
        icon: "titaniumWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "titanium wand",
        sellPrice: 3500,
        description: "What seems like a titanium wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 18,
            attackSpeed: SLOW_SPEED,
            accuracy: 22,
            magicPower: 18
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 21
            }
        ]
    },

    tungsten_wand: {
        id: "tungsten_wand",
        icon: "tungstenWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "tungsten wand",
        sellPrice: 3850,
        description: "What seems like a tungsten wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 20,
            attackSpeed: SLOW_SPEED,
            accuracy: 24,
            magicPower: 19.5
        },
        extraStats: {
            magicPower: 5
        },
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

    obsidian_wand: {
        id: "obsidian_wand",
        icon: "obsidianWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "obsidian wand",
        sellPrice: 4200,
        description: "What seems like an obsidian wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 22,
            attackSpeed: SLOW_SPEED,
            accuracy: 26,
            magicPower: 21
        },
        extraStats: {
            magicPower: 5
        },
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

    cobalt_wand: {
        id: "cobalt_wand",
        icon: "cobaltWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "cobalt wand",
        sellPrice: 4550,
        description: "What seems like a cobalt wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 24,
            attackSpeed: SLOW_SPEED,
            accuracy: 28,
            magicPower: 22.5
        },
        extraStats: {
            magicPower: 5
        },
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

    mithril_wand: {
        id: "mithril_wand",
        icon: "mithrilWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "mithril wand",
        sellPrice: 4900,
        description: "What seems like a mithril wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 26,
            attackSpeed: SLOW_SPEED,
            accuracy: 30,
            magicPower: 24
        },
        extraStats: {
            magicPower: 5
        },
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

    adamantium_wand: {
        id: "adamantium_wand",
        icon: "adamantiumWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "adamantium wand",
        sellPrice: 5250,
        description: "What seems like an adamantium wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 28,
            attackSpeed: SLOW_SPEED,
            accuracy: 32,
            magicPower: 25.5
        },
        extraStats: {
            magicPower: 5
        },
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

    orichalcum_wand: {
        id: "orichalcum_wand",
        icon: "orichalcumWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "orichalcum wand",
        sellPrice: 5600,
        description: "What seems like an orichalcum wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 30,
            attackSpeed: SLOW_SPEED,
            accuracy: 34,
            magicPower: 27
        },
        extraStats: {
            magicPower: 5
        },
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

    meteorite_wand: {
        id: "meteorite_wand",
        icon: "meteoriteWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "meteorite wand",
        sellPrice: 5950,
        description: "What seems like a meteorite wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 32,
            attackSpeed: SLOW_SPEED,
            accuracy: 36,
            magicPower: 28.5
        },
        extraStats: {
            magicPower: 5
        },
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

    fairy_steel_wand: {
        id: "fairy_steel_wand",
        icon: "fairySteelWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "fairy steel wand",
        sellPrice: 6300,
        description: "What seems like a fairy steel wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 34,
            attackSpeed: SLOW_SPEED,
            accuracy: 38,
            magicPower: 30
        },
        extraStats: {
            magicPower: 5
        },
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

    elven_steel_wand: {
        id: "elven_steel_wand",
        icon: "elvenSteelWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "elven steel wand",
        sellPrice: 6650,
        description: "What seems like an elven steel wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 36,
            attackSpeed: SLOW_SPEED,
            accuracy: 40,
            magicPower: 31.5
        },
        extraStats: {
            magicPower: 5
        },
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

    cursed_wand: {
        id: "cursed_wand",
        icon: "cursedWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "cursed wand",
        sellPrice: 7000,
        description: "What seems like a cursed wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 38,
            attackSpeed: SLOW_SPEED,
            accuracy: 42,
            magicPower: 33
        },
        extraStats: {
            magicPower: 5
        },
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

    darksteel_wand: {
        id: "darksteel_wand",
        icon: "darksteelWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "darksteel wand",
        sellPrice: 7350,
        description: "What seems like a darksteel wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 40,
            attackSpeed: SLOW_SPEED,
            accuracy: 44,
            magicPower: 35
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 54
            }
        ]
    },

    radiant_wand: {
        id: "radiant_wand",
        icon: "radiantWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "radiant wand",
        sellPrice: 7700,
        description: "What seems like a radiant wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 42,
            attackSpeed: SLOW_SPEED,
            accuracy: 46,
            magicPower: 37
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 57
            }
        ]
    },

    astral_wand: {
        id: "astral_wand",
        icon: "astralWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "astral wand",
        sellPrice: 8050,
        description: "What seems like an astral wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 44,
            attackSpeed: SLOW_SPEED,
            accuracy: 48,
            magicPower: 39
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 60
            }
        ]
    },

    titanfoil_wand: {
        id: "titanfoil_wand",
        icon: "titanfoilWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "titanfoil wand",
        sellPrice: 8400,
        description: "What seems like a titanfoil wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 46,
            attackSpeed: SLOW_SPEED,
            accuracy: 50,
            magicPower: 42
        },
        extraStats: {
            magicPower: 8
        },
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

    relicrock_wand: {
        id: "relicrock_wand",
        icon: "relicrockWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "relicrock wand",
        sellPrice: 8750,
        description: "What seems like a relicrock wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 48,
            attackSpeed: SLOW_SPEED,
            accuracy: 52,
            magicPower: 45
        },
        extraStats: {
            magicPower: 8
        },
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

    eternium_wand: {
        id: "eternium_wand",
        icon: "eterniumWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "eternium wand",
        sellPrice: 9100,
        description: "What seems like an eternium wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 50,
            attackSpeed: SLOW_SPEED,
            accuracy: 54,
            magicPower: 50
        },
        extraStats: {
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
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 70
            }
        ]
    },

    prismatic_wand: {
        id: "prismatic_wand",
        icon: "prismaticWand.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "prismatic wand",
        sellPrice: 9100 * 1.09375,
        description: "What seems like an prismatic wand",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 1,
            attackMax: 50 * 1.09375,
            attackSpeed: SLOW_SPEED,
            accuracy: 54 * 1.09375,
            magicPower: 50 * 1.09375
        },
        extraStats: {
            magicPower: 10 * 1.09375
        },
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

    brown_trident: {
        id: "brown_trident",
        icon: "brownTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "brown trident",
        sellPrice: 200,
        description: "A sharp trident, beaming with magical energy.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 6,
            attackMax: 12,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 14,
            magicPower: 8
        },
        extraStats: {
            attack: 3,
            attackMax: 3,
            accuracy: 7,
            magicPower: 1
        },
        enchantments: ["magic_blade"],
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
        ]
    },

    blue_trident: {
        id: "blue_trident",
        icon: "blueTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "blue trident",
        sellPrice: 400,
        description: "What seems like a normal walnut staff",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 8,
            attackMax: 15,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 19,
            magicPower: 12
        },
        enchantments: ["magic_blade"],
        extraStats: {
            attack: 3,
            attackMax: 3,
            accuracy: 7,
            magicPower: 1
        },
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
                level: 10
            }
        ]
    },

    purple_trident: {
        id: "purple_trident",
        icon: "purpleTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "purple trident",
        sellPrice: 1000,
        description: "A sharp trident, beaming with magical energy",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 15,
            attackMax: 25,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 39,
            magicPower: 28
        },
        extraStats: {
            attack: 3,
            attackMax: 3,
            accuracy: 7,
            magicPower: 2
        },
        enchantments: ["magic_blade"],
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
            }
        ]
    },

    orange_trident: {
        id: "orange_trident",
        icon: "orangeTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "orange trident",
        sellPrice: 2000,
        description: "A sharp trident, beaming with magical energy",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 20,
            attackMax: 30,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 44,
            magicPower: 31
        },
        extraStats: {
            attack: 5,
            attackMax: 5,
            accuracy: 8,
            magicPower: 3
        },
        enchantments: ["magic_blade"],
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

    amber_trident: {
        id: "amber_trident",
        icon: "amberTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "amber trident",
        sellPrice: 3250,
        description: "A sharp trident, beaming with magical energy",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 27,
            attackMax: 40,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 50,
            magicPower: 34
        },
        extraStats: {
            attack: 6,
            attackMax: 6,
            accuracy: 8,
            magicPower: 4
        },
        enchantments: ["magic_blade"],
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
                level: 40
            }
        ]
    },

    violet_trident: {
        id: "violet_trident",
        icon: "violetTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "violet trident",
        sellPrice: 5000,
        description: "A sharp trident, beaming with magical energy",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 34,
            attackMax: 50,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 58,
            magicPower: 37
        },
        extraStats: {
            attack: 7,
            attackMax: 7,
            accuracy: 8,
            magicPower: 5
        },
        enchantments: ["magic_blade"],
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

    crimson_trident: {
        id: "crimson_trident",
        icon: "crimsonTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "crimson trident",
        sellPrice: 7500,
        description: "A sharp trident, beaming with magical energy",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 41,
            attackMax: 60,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 64,
            magicPower: 40
        },
        extraStats: {
            attack: 8,
            attackMax: 8,
            accuracy: 10,
            magicPower: 6
        },
        enchantments: ["magic_blade"],
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

    azure_trident: {
        id: "azure_trident",
        icon: "azureTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "azure trident",
        sellPrice: 10000,
        description: "A sharp trident, beaming with magical energy",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 48,
            attackMax: 70,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 72,
            magicPower: 43
        },
        extraStats: {
            attack: 9,
            attackMax: 9,
            accuracy: 10,
            magicPower: 7
        },
        enchantments: ["magic_blade"],
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

    verdant_trident: {
        id: "verdant_trident",
        icon: "verdantTridant.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "verdant trident",
        sellPrice: 15000,
        description: "A sharp trident, beaming with magical energy",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 55,
            attackMax: 80,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 80,
            magicPower: 46
        },
        extraStats: {
            attack: 10,
            attackMax: 10,
            accuracy: 10,
            magicPower: 8
        },
        enchantments: ["magic_blade"],
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

    serpent_trident: {
        id: "serpent_trident",
        icon: "serpentTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "serpent trident",
        sellPrice: 20000,
        description: "A sharp trident, beaming with magical energy",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 65,
            attackMax: 95,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 92,
            magicPower: 50
        },
        extraStats: {
            attack: 12,
            attackMax: 12,
            accuracy: 15,
            magicPower: 10
        },
        enchantments: ["magic_blade"],
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

    inferno_trident: {
        id: "inferno_trident",
        icon: "infernoTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "inferno trident",
        sellPrice: 20000,
        description: "A sharp trident, beaming with magical energy",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 75,
            attackMax: 120,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 108,
            magicPower: 56
        },
        extraStats: {
            attack: 14,
            attackMax: 14,
            accuracy: 15,
            magicPower: 12
        },
        enchantments: ["magic_blade"],
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
                level: 67
            }
        ]
    },

    exalted_trident: {
        id: "exalted_trident",
        icon: "exaltedTrident.png",
        category: "combat",
        weaponType: "trident",
        slot: "mainHand",
        name: "exalted trident",
        sellPrice: 32500,
        description: "A sharp trident, beaming with magical energy",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        stats: {
            attack: 90,
            attackMax: 150,
            attackSpeed: MEDIUM_SPEED,
            accuracy: 130,
            magicPower: 65
        },
        extraStats: {
            attack: 17,
            attackMax: 25,
            accuracy: 25,
            magicPower: 20
        },
        enchantments: ["magic_blade"],
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
                level: 77
            }
        ]
    },

    // hybrid between a cursed scimitar, a cursed wand, and a trident
    farplane_resonator: {
        id: "farplane_resonator",
        icon: "farplaneResonator.png",
        category: "combat",
        weaponType: "wand",
        slot: "mainHand",
        name: "farplane resonator",
        sellPrice: 72500,
        description: "A strange device capable of casting magic and doubling as a weapon.",
        isWeapon: true,
        isEquippable: true,
        xpDistribution: {
            attack: 0.33,
            defense: 0.17,
            health: 0.5
        },
        stats: {
            attack: 73.7,
            attackMax: 116.7,
            attackSpeed: 0.7,
            accuracy: 99.5,
            magicPower: 33
        },
        extraStats: {
            attack: 22.1 + 5,
            attackMax: 35 + 5,
            accuracy: 29.8 + 10,
            magicPower: 5 + 5
        },
        enchantments: ["magic_blade"],
        upgradeRarity: [{ chance: 100, rarityId: "prized" }],
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 65
            }
        ]
    },

    scepter_of_power_scroll: {
        id: "scepter_of_power_scroll",
        icon: "scrollScepterOfPower.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "scepter of power scroll",
        teaches: "scepter_of_power",
        sellPrice: 250000,
        description: "A mysterious scroll.",
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    // the ultimate weapon
    scepter_of_power: {
        id: "scepter_of_power",
        icon: "scepterOfPower.png",
        category: "combat",
        weaponType: "staff",
        slot: "mainHand",
        name: "scepter of power",
        sellPrice: 1000000,
        description: "A powerful weapon capable of dealing exceptional physical and magical damage with each strike.",
        isWeapon: true,
        isEquippable: true,
        isTwoHanded: true,
        xpDistribution: {
            attack: 0.225,
            defense: 0.225,
            magic: 0.05,
            health: 0.5
        },
        stats: {
            attackSpeed: 0.7,
            attack: 185,
            attackMax: 250,
            accuracy: 185,
            magicPower: 93,
            criticalChance: 10,
            healingPower: 10
        },
        extraStats: {
            attack: 65,
            attackMax: 100,
            accuracy: 65,
            magicPower: 27,
            criticalChance: 5,
            healingPower: 5
        },
        enchantments: ["magic_blade"],
        upgradeRarity: [{ chance: 100, rarityId: "legendary" }],
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 110
            },
            {
                type: "skill",
                name: "magic",
                level: 70
            }
        ]
    },

    /*
  copper_hammer: {
    id: 'copper_hammer',
    icon: 'copperHammer.png',
    category: 'combat',
    weaponType: 'hammer',
    slot: 'mainHand',
    name: 'copper hammer',
    sellPrice: 50,
    description: 'What seems like a copper hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: SLOW_SPEED,
      accuracy: 5,
      defense: 3,
      magicArmor: 10,
      magicPower: 5
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 1
    }]
  },

  obsidian_hammer: {
    id: 'obsidian_hammer',
    icon: 'obsidianHammer.png',
    category: 'combat',
    weaponType: 'hammer',
    slot: 'mainHand',
    name: 'obsidian hammer',
    sellPrice: 750,
    description: 'What seems like a obsidian hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 12,
      attackMax: 19,
      attackSpeed: SLOW_SPEED,
      accuracy: 18,
      magicPower: 12,
      defense: 8  ,
      magicArmor: 40
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  gold_hammer: {
    id: 'gold_hammer',
    icon: 'goldHammer.png',
    category: 'combat',
    weaponType: 'hammer',
    slot: 'mainHand',
    name: 'gold hammer',
    sellPrice: 350,
    description: 'What seems like a gold hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 6,
      attackMax: 11,
      attackSpeed: SLOW_SPEED,
      accuracy: 8,
      magicPower: 7,
      magicArmor: 25,
      defense: 10
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },

  mithril_hammer: {
    id: 'mithril_hammer',
    icon: 'mithrilHammer.png',
    category: 'combat',
    weaponType: 'hammer',
    slot: 'mainHand',
    name: 'mithril hammer',
    sellPrice: 1150,
    description: 'What seems like a mithril hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 14,
      attackMax: 24,
      attackSpeed: SLOW_SPEED,
      accuracy: 24,
      magicPower: 16,
      magicArmor: 50,
      defense: 12
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  }
  */

    copper_hammer: {
        id: "copper_hammer",
        icon: "copperHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "copper hammer",
        sellPrice: 95,
        description: "What seems like a copper hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 5.3,
            attackMax: 5.9,
            attackSpeed: 0.5,
            accuracy: 5.2,
            defense: 4.6,
            magicArmor: 10,
            magicPower: 5
        },
        extraStats: {
            attack: 1.6,
            attackMax: 1.8,
            accuracy: 1.6,
            defense: 1.4,
            magicArmor: 3,
            magicPower: 1.5
        },
        reforgeRecipe: {
            requiresCrafting: 6
        }
    },

    tin_hammer: {
        id: "tin_hammer",
        icon: "tinHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "tin hammer",
        sellPrice: 190,
        description: "What seems like a tin hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 7.3,
            attackMax: 8.4,
            attackSpeed: 0.5,
            accuracy: 7.4,
            defense: 5.9,
            magicArmor: 12.7,
            magicPower: 5.6
        },
        extraStats: {
            attack: 2.2,
            attackMax: 2.5,
            accuracy: 2.2,
            defense: 1.8,
            magicArmor: 3.8,
            magicPower: 1.7
        },
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

    bronze_hammer: {
        id: "bronze_hammer",
        icon: "bronzeHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "bronze hammer",
        sellPrice: 285,
        description: "What seems like a bronze hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 9.2,
            attackMax: 11,
            attackSpeed: 0.5,
            accuracy: 10.2,
            defense: 7.2,
            magicArmor: 15.2,
            magicPower: 6.3
        },
        extraStats: {
            attack: 2.8,
            attackMax: 3.3,
            accuracy: 3.1,
            defense: 2.2,
            magicArmor: 4.6,
            magicPower: 1.9
        },
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

    iron_hammer: {
        id: "iron_hammer",
        icon: "ironHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "iron hammer",
        sellPrice: 380,
        description: "What seems like an iron hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 11.3,
            attackMax: 13.8,
            attackSpeed: 0.5,
            accuracy: 13.4,
            defense: 8.5,
            magicArmor: 18.1,
            magicPower: 7.1
        },
        extraStats: {
            attack: 3.4,
            attackMax: 4.1,
            accuracy: 4,
            defense: 2.6,
            magicArmor: 5.4,
            magicPower: 2.1
        },
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

    silver_hammer: {
        id: "silver_hammer",
        icon: "silverHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "silver hammer",
        sellPrice: 475,
        description: "What seems like a silver hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 13.5,
            attackMax: 16.9,
            attackSpeed: 0.5,
            accuracy: 17.1,
            defense: 9.8,
            magicArmor: 21,
            magicPower: 8
        },
        extraStats: {
            attack: 4.1,
            attackMax: 5.1,
            accuracy: 5.1,
            defense: 2.9,
            magicArmor: 6.3,
            magicPower: 2.4
        },
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

    gold_hammer: {
        id: "gold_hammer",
        icon: "goldHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "gold hammer",
        sellPrice: 570,
        description: "What seems like a gold hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 15.8,
            attackMax: 20.3,
            attackSpeed: 0.5,
            accuracy: 21.1,
            defense: 11.1,
            magicArmor: 24.1,
            magicPower: 9
        },
        extraStats: {
            attack: 4.7,
            attackMax: 6.1,
            accuracy: 6.3,
            defense: 3.3,
            magicArmor: 7.2,
            magicPower: 2.7
        },
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

    carbon_hammer: {
        id: "carbon_hammer",
        icon: "carbonHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "carbon hammer",
        sellPrice: 665,
        description: "What seems like a carbon hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 18.4,
            attackMax: 24.1,
            attackSpeed: 0.5,
            accuracy: 25.6,
            defense: 12.5,
            magicArmor: 27.6,
            magicPower: 10.1
        },
        extraStats: {
            attack: 5.5,
            attackMax: 7.2,
            accuracy: 7.7,
            defense: 3.8,
            magicArmor: 8.3,
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

    steel_hammer: {
        id: "steel_hammer",
        icon: "steelHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "steel hammer",
        sellPrice: 760,
        description: "What seems like a steel hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 21.1,
            attackMax: 28.1,
            attackSpeed: 0.5,
            accuracy: 30.3,
            defense: 14,
            magicArmor: 31.3,
            magicPower: 11.3
        },
        extraStats: {
            attack: 6.3,
            attackMax: 8.4,
            accuracy: 9.1,
            defense: 4.2,
            magicArmor: 9.4,
            magicPower: 3.4
        },
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

    platinum_hammer: {
        id: "platinum_hammer",
        icon: "platinumHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "platinum hammer",
        sellPrice: 855,
        description: "What seems like a platinum hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 24,
            attackMax: 32.6,
            attackSpeed: 0.5,
            accuracy: 35.3,
            defense: 15.6,
            magicArmor: 35.2,
            magicPower: 12.5
        },
        extraStats: {
            attack: 7.2,
            attackMax: 9.8,
            accuracy: 10.6,
            defense: 4.7,
            magicArmor: 10.6,
            magicPower: 3.8
        },
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

    titanium_hammer: {
        id: "titanium_hammer",
        icon: "titaniumHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "titanium hammer",
        sellPrice: 950,
        description: "What seems like a titanium hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 27.1,
            attackMax: 37.4,
            attackSpeed: 0.5,
            accuracy: 40.6,
            defense: 17.2,
            magicArmor: 39.4,
            magicPower: 13.9
        },
        extraStats: {
            attack: 8.1,
            attackMax: 11.2,
            accuracy: 12.2,
            defense: 5.2,
            magicArmor: 11.8,
            magicPower: 4.2
        },
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

    tungsten_hammer: {
        id: "tungsten_hammer",
        icon: "tungstenHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "tungsten hammer",
        sellPrice: 1045,
        description: "What seems like a tungsten hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 30.5,
            attackMax: 42.7,
            attackSpeed: 0.5,
            accuracy: 46.2,
            defense: 18.9,
            magicArmor: 44,
            magicPower: 15.3
        },
        extraStats: {
            attack: 9.2,
            attackMax: 12.8,
            accuracy: 13.9,
            defense: 5.7,
            magicArmor: 13.2,
            magicPower: 4.6
        },
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

    obsidian_hammer: {
        id: "obsidian_hammer",
        icon: "obsidianHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "obsidian hammer",
        sellPrice: 1140,
        description: "What seems like an obsidian hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 34,
            attackMax: 48.5,
            attackSpeed: 0.5,
            accuracy: 52,
            defense: 20.7,
            magicArmor: 48.7,
            magicPower: 16.7
        },
        extraStats: {
            attack: 10.2,
            attackMax: 14.6,
            accuracy: 15.6,
            defense: 6.2,
            magicArmor: 14.6,
            magicPower: 5
        },
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

    cobalt_hammer: {
        id: "cobalt_hammer",
        icon: "cobaltHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "cobalt hammer",
        sellPrice: 1235,
        description: "What seems like a cobalt hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 37.9,
            attackMax: 54.7,
            attackSpeed: 0.5,
            accuracy: 58.1,
            defense: 22.5,
            magicArmor: 54,
            magicPower: 18.2
        },
        extraStats: {
            attack: 11.4,
            attackMax: 16.4,
            accuracy: 17.4,
            defense: 6.8,
            magicArmor: 16.2,
            magicPower: 5.5
        },
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

    mithril_hammer: {
        id: "mithril_hammer",
        icon: "mithrilHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "mithril hammer",
        sellPrice: 1330,
        description: "What seems like a mithril hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 42,
            attackMax: 61.5,
            attackSpeed: 0.5,
            accuracy: 64.4,
            defense: 24.5,
            magicArmor: 59.5,
            magicPower: 19.8
        },
        extraStats: {
            attack: 12.6,
            attackMax: 18.5,
            accuracy: 19.3,
            defense: 7.4,
            magicArmor: 17.9,
            magicPower: 5.9
        },
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

    adamantium_hammer: {
        id: "adamantium_hammer",
        icon: "adamantiumHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "adamantium hammer",
        sellPrice: 1425,
        description: "What seems like an adamantium hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 46.3,
            attackMax: 68.8,
            attackSpeed: 0.5,
            accuracy: 70.9,
            defense: 26.5,
            magicArmor: 65.3,
            magicPower: 21.4
        },
        extraStats: {
            attack: 13.9,
            attackMax: 20.6,
            accuracy: 21.3,
            defense: 8,
            magicArmor: 19.6,
            magicPower: 6.4
        },
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

    orichalcum_hammer: {
        id: "orichalcum_hammer",
        icon: "orichalcumHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "orichalcum hammer",
        sellPrice: 1520,
        description: "What seems like an orichalcum hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 51,
            attackMax: 76.7,
            attackSpeed: 0.5,
            accuracy: 77.7,
            defense: 28.6,
            magicArmor: 71.7,
            magicPower: 23.1
        },
        extraStats: {
            attack: 15.3,
            attackMax: 23,
            accuracy: 23.3,
            defense: 8.6,
            magicArmor: 21.5,
            magicPower: 6.9
        },
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

    meteorite_hammer: {
        id: "meteorite_hammer",
        icon: "meteoriteHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "meteorite hammer",
        sellPrice: 1615,
        description: "What seems like a meteorite hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 55.9,
            attackMax: 85.2,
            attackSpeed: 0.5,
            accuracy: 84.6,
            defense: 30.9,
            magicArmor: 78.3,
            magicPower: 24.9
        },
        extraStats: {
            attack: 16.8,
            attackMax: 25.6,
            accuracy: 25.4,
            defense: 9.3,
            magicArmor: 23.5,
            magicPower: 7.5
        },
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

    fairy_steel_hammer: {
        id: "fairy_steel_hammer",
        icon: "fairySteelHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "fairy steel hammer",
        sellPrice: 1710,
        description: "What seems like a fairy steel hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 61.2,
            attackMax: 94.4,
            attackSpeed: 0.5,
            accuracy: 91.8,
            defense: 33.2,
            magicArmor: 85.4,
            magicPower: 26.7
        },
        extraStats: {
            attack: 18.4,
            attackMax: 28.3,
            accuracy: 27.5,
            defense: 10,
            magicArmor: 25.6,
            magicPower: 8
        },
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

    elven_steel_hammer: {
        id: "elven_steel_hammer",
        icon: "elvenSteelHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "elven steel hammer",
        sellPrice: 1805,
        description: "What seems like an elven steel hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 66.8,
            attackMax: 104.2,
            attackSpeed: 0.5,
            accuracy: 99.2,
            defense: 35.6,
            magicArmor: 93,
            magicPower: 28.5
        },
        extraStats: {
            attack: 20,
            attackMax: 31.3,
            accuracy: 29.8,
            defense: 10.7,
            magicArmor: 27.9,
            magicPower: 8.6
        },
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

    cursed_hammer: {
        id: "cursed_hammer",
        icon: "cursedHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "cursed hammer",
        sellPrice: 1900,
        description: "What seems like a cursed hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 72.8,
            attackMax: 114.9,
            attackSpeed: 0.5,
            accuracy: 106.7,
            defense: 38.2,
            magicArmor: 101.1,
            magicPower: 30.4
        },
        extraStats: {
            attack: 21.8,
            attackMax: 34.5,
            accuracy: 32,
            defense: 11.5,
            magicArmor: 30.3,
            magicPower: 9.1
        },
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

    darksteel_hammer: {
        id: "darksteel_hammer",
        icon: "darksteelHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "darksteel hammer",
        sellPrice: 1995,
        description: "What seems like a darksteel hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 80.1,
            attackMax: 126.4,
            attackSpeed: 0.5,
            accuracy: 117.4,
            defense: 42,
            magicArmor: 80.1,
            magicPower: 33.4
        },
        extraStats: {
            attack: 24,
            attackMax: 37.9,
            accuracy: 35.2,
            defense: 12.6,
            magicArmor: 24,
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

    radiant_hammer: {
        id: "radiant_hammer",
        icon: "radiantHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "radiant hammer",
        sellPrice: 2090,
        description: "What seems like a radiant hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 87.4,
            attackMax: 137.9,
            attackSpeed: 0.5,
            accuracy: 128,
            defense: 45.8,
            magicArmor: 87.4,
            magicPower: 36.5
        },
        extraStats: {
            attack: 26.2,
            attackMax: 41.4,
            accuracy: 38.4,
            defense: 13.7,
            magicArmor: 26.2,
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

    astral_hammer: {
        id: "astral_hammer",
        icon: "astralHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "astral hammer",
        sellPrice: 2185,
        description: "What seems like an astral hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 94.6,
            attackMax: 149.4,
            attackSpeed: 0.5,
            accuracy: 138.7,
            defense: 49.7,
            magicArmor: 94.6,
            magicPower: 39.5
        },
        extraStats: {
            attack: 28.4,
            attackMax: 44.8,
            accuracy: 41.6,
            defense: 14.9,
            magicArmor: 28.4,
            magicPower: 11.9
        },
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

    titanfoil_hammer: {
        id: "titanfoil_hammer",
        icon: "titanfoilHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "titanfoil hammer",
        sellPrice: 2280,
        description: "What seems like a titanfoil hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 101.9,
            attackMax: 160.9,
            attackSpeed: 0.5,
            accuracy: 149.4,
            defense: 53.5,
            magicArmor: 101.9,
            magicPower: 42.6
        },
        extraStats: {
            attack: 30.6,
            attackMax: 48.3,
            accuracy: 44.8,
            defense: 16.1,
            magicArmor: 30.6,
            magicPower: 12.8
        },
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

    relicrock_hammer: {
        id: "relicrock_hammer",
        icon: "relicrockHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "relicrock hammer",
        sellPrice: 2375,
        description: "What seems like a relicrock hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 109.2,
            attackMax: 172.4,
            attackSpeed: 0.5,
            accuracy: 160.1,
            defense: 57.3,
            magicArmor: 109.2,
            magicPower: 45.6
        },
        extraStats: {
            attack: 32.8,
            attackMax: 51.7,
            accuracy: 48,
            defense: 17.2,
            magicArmor: 32.8,
            magicPower: 13.7
        },
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

    eternium_hammer: {
        id: "eternium_hammer",
        icon: "eterniumHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "eternium hammer",
        sellPrice: 2470,
        description: "What seems like an eternium hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 116.5,
            attackMax: 183.8,
            attackSpeed: 0.5,
            accuracy: 170.7,
            defense: 61.1,
            magicArmor: 116.5,
            magicPower: 48.6
        },
        extraStats: {
            attack: 35,
            attackMax: 55.1,
            accuracy: 51.2,
            defense: 18.3,
            magicArmor: 35,
            magicPower: 14.6
        },
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

    prismatic_hammer: {
        id: "prismatic_hammer",
        icon: "prismaticHammer.png",
        category: "combat",
        weaponType: "hammer",
        slot: "mainHand",
        name: "prismatic hammer",
        sellPrice: 2470 * 1.09375,
        description: "What seems like an prismatic hammer.",
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 116.5 * 1.09375,
            attackMax: 183.8 * 1.09375,
            attackSpeed: 0.5 * 1.09375,
            accuracy: 170.7 * 1.09375,
            defense: 61.1 * 1.09375,
            magicArmor: 116.5 * 1.09375,
            magicPower: 48.6 * 1.09375
        },
        extraStats: {
            attack: 35 * 1.09375,
            attackMax: 55.1 * 1.09375,
            accuracy: 51.2 * 1.09375,
            defense: 18.3 * 1.09375,
            magicArmor: 35 * 1.09375,
            magicPower: 14.6 * 1.09375
        },
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
    }
}
