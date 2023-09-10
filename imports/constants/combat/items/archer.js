import { SLOW_SPEED } from "../attackSpeeds"

const DARKSTEEL_MULTIPLIER = 1.1
const RADIANT_MULTIPLIER = 1.2
const ASTRAL_MULTIPLIER = 1.3
const TITANFOIL_MULTIPLIER = 1.4
const RELICROCK_MULTIPLIER = 1.5
const ETERNIUM_MULTIPLIER = 1.7
const PRISMATIC_MULTIPLIER = 1.85

const BATTLEAXE_TO_BOW_ATTACKMIN = 1.75
const BATTLEAXE_TO_BOW_ATTACKMAX = 1.0
const BATTLEAXE_TO_BOW_ACCURACY = 0.6667

const KNIFE_TO_QUIVER_ACCURACY = 5.0

export const ARCHER_ITEMS = {
    teak_bow_scroll: {
        id: "teak_bow_scroll",
        icon: "teakBowScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "teak bow scroll",
        teaches: "teak_bow",
        sellPrice: 1500,
        description: `A teak scroll, made from cursed inks.`,
        shiftActionData: {
            description: "Learn hidden recipe"
        }
    },

    ebony_bow_scroll: {
        id: "ebony_bow_scroll",
        icon: "ebonyBowScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "ebony bow scroll",
        teaches: "ebony_bow",
        sellPrice: 1500,
        description: `An ebony scroll, made from darksteel inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    fiery_bow_scroll: {
        id: "fiery_bow_scroll",
        icon: "fieryBowScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "charred bow scroll",
        teaches: "fiery_bow",
        sellPrice: 1500,
        description: `A charred scroll, made from radiant inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    tamarind_bow_scroll: {
        id: "tamarind_bow_scroll",
        icon: "tamarindBowScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "tamarind bow scroll",
        teaches: "tamarind_bow",
        sellPrice: 1500,
        description: `A tamarind scroll, made from astral inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    magic_bow_scroll: {
        id: "magic_bow_scroll",
        icon: "magicBowScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "magic bow scroll",
        teaches: "magic_bow",
        sellPrice: 1500,
        description: `A magic scroll, made from titanfoil inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    petrified_bow_scroll: {
        id: "petrified_bow_scroll",
        icon: "petrifiedBowScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "petrified bow scroll",
        teaches: "petrified_bow",
        sellPrice: 1500,
        description: `A petrified scroll, made from relicrock inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    ancient_bow_scroll: {
        id: "ancient_bow_scroll",
        icon: "ancientBowScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "ancient bow scroll",
        teaches: "ancient_bow",
        sellPrice: 1500,
        description: `An ancient scroll, made from eternium inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    spiritroot_bow_scroll: {
        id: "spiritroot_bow_scroll",
        icon: "spiritrootBowScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "spiritroot bow scroll",
        teaches: "spiritroot_bow",
        sellPrice: 1500,
        description: `An spiritroot scroll, made from purestone inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    cursed_quiver_scroll: {
        id: "cursed_quiver_scroll",
        icon: "cursedQuiverScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "cursed quiver scroll",
        teaches: "cursed_quiver",
        sellPrice: 1500,
        description: `A teak scroll, made from cursed inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    darksteel_quiver_scroll: {
        id: "darksteel_quiver_scroll",
        icon: "darksteelQuiverScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "darksteel quiver scroll",
        teaches: "darksteel_quiver",
        sellPrice: 1500,
        description: `An ebony scroll, made from darksteel inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    radiant_quiver_scroll: {
        id: "radiant_quiver_scroll",
        icon: "radiantQuiverScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "radiant quiver scroll",
        teaches: "radiant_quiver",
        sellPrice: 1500,
        description: `A charred scroll, made from radiant inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    astral_quiver_scroll: {
        id: "astral_quiver_scroll",
        icon: "astralQuiverScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "astral quiver scroll",
        teaches: "astral_quiver",
        sellPrice: 1500,
        description: `A tamarind scroll, made from astral inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    titanfoil_quiver_scroll: {
        id: "titanfoil_quiver_scroll",
        icon: "titanfoilQuiverScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "titanfoil quiver scroll",
        teaches: "titanfoil_quiver",
        sellPrice: 1500,
        description: `A magic scroll, made from titanfoil inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    relicrock_quiver_scroll: {
        id: "relicrock_quiver_scroll",
        icon: "relicrockQuiverScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "relicrock quiver scroll",
        teaches: "relicrock_quiver",
        sellPrice: 1500,
        description: `A petrified scroll, made from relicrock inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    eternium_quiver_scroll: {
        id: "eternium_quiver_scroll",
        icon: "eterniumQuiverScroll.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "eternium quiver scroll",
        teaches: "eternium_quiver",
        sellPrice: 1500,
        description: `An ancient scroll, made from eternium inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    prismatic_quiver_scroll: {
        id: "prismatic_quiver_scroll",
        icon: "prismaticQuiverScroll2.svg",
        category: "crafting",
        isCraftingScroll: true,
        name: "prismatic quiver scroll",
        teaches: "prismatic_quiver",
        sellPrice: 1500,
        description: `An ancient scroll, made from purestone inks.`,
        shiftActionData: {
            description: "Learn a hidden recipe"
        }
    },

    pine_bow: {
        id: "pine_bow",
        icon: "pineBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "pine bow",
        sellPrice: 75,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 5 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 18 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 8 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 1.2 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 5.4 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 3
            }
        ]
    },

    beech_bow: {
        id: "beech_bow",
        icon: "beechBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "beech bow",
        sellPrice: 75,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 7 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 25.2 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 11.2 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 2.1 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 7.6 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 6
            }
        ]
    },

    ash_bow: {
        id: "ash_bow",
        icon: "ashBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "ash bow",
        sellPrice: 175,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 9.1 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 32.8 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 14.6 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 2.7 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 9.8 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 10
            }
        ]
    },

    oak_bow: {
        id: "oak_bow",
        icon: "oakBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "oak bow",
        sellPrice: 275,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 11.4 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 41 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 18.3 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 3.4 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 12.3 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 15
            }
        ]
    },

    maple_bow: {
        id: "maple_bow",
        icon: "mapleBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "maple bow",
        sellPrice: 400,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 13.7 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 49.2 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 22 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 4.1 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 14.8 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 20
            }
        ]
    },

    walnut_bow: {
        id: "walnut_bow",
        icon: "walnutBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "walnut bow",
        sellPrice: 500,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 16.4 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 59 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 26.4 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 4.9 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 17.7 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 25
            }
        ]
    },

    cherry_bow: {
        id: "cherry_bow",
        icon: "cherryBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "cherry bow",
        sellPrice: 650,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 19.2 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 69 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 30.9 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 5.8 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 20.7 * BATTLEAXE_TO_BOW_ATTACKMAX
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

    mahogany_bow: {
        id: "mahogany_bow",
        icon: "mahoganyBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "mahogany bow",
        sellPrice: 750,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 21.7 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 78 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 34.9 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 6.5 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 23.4 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 35
            }
        ]
    },

    elm_bow: {
        id: "elm_bow",
        icon: "elmBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "elm bow",
        sellPrice: 900,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 25.8 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 92.8 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 41.5 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 7.7 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 27.8 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 40
            }
        ]
    },

    black_bow: {
        id: "black_bow",
        icon: "blackBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "black bow",
        sellPrice: 1000,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 29.7 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 106.7 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 47.7 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 8.9 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 32 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 45
            }
        ]
    },

    blue_gum_bow: {
        id: "blue_gum_bow",
        icon: "blueGumBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "blue gum bow",
        sellPrice: 1200,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 33.6 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 120.6 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 53.9 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 10.1 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 36.2 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 50
            }
        ]
    },

    cedar_bow: {
        id: "cedar_bow",
        icon: "cedarBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "cedar bow",
        sellPrice: 1350,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 37.6 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 135.1 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 60.4 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 11.3 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 40.5 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 55
            }
        ]
    },

    denya_bow: {
        id: "denya_bow",
        icon: "denyaBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "denya bow",
        sellPrice: 1500,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 42.1 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 151.3 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 67.6 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 12.6 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 45.4 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 60
            }
        ]
    },

    gombe_bow: {
        id: "gombe_bow",
        icon: "gombeBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "gombe bow",
        sellPrice: 1600,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 46.7 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 167.9 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 75 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 14 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 50.4 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 65
            }
        ]
    },

    hickory_bow: {
        id: "hickory_bow",
        icon: "hickoryBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "hickory bow",
        sellPrice: 1800,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 51.4 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 184.7 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 82.5 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 15.4 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 55.4 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 70
            }
        ]
    },

    larch_bow: {
        id: "larch_bow",
        icon: "larchBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "larch bow",
        sellPrice: 1800,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 56 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 201.3 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 89.9 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 16.8 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 60.4 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 75
            }
        ]
    },

    poplar_bow: {
        id: "poplar_bow",
        icon: "poplarBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "poplar bow",
        sellPrice: 2000,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 62.2 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 223.4 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 99.8 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 18.7 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 67 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 80
            }
        ]
    },

    tali_bow: {
        id: "tali_bow",
        icon: "taliBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "tali bow",
        sellPrice: 2250,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 68.4 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 245.7 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 109.8 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 20.5 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 73.7 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 85
            }
        ]
    },

    willow_bow: {
        id: "willow_bow",
        icon: "willowBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "willow bow",
        sellPrice: 2500,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 76.6 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 275.2 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 123 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 23 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 82.6 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 90
            }
        ]
    },

    teak_bow: {
        id: "teak_bow",
        icon: "teakBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "teak bow",
        sellPrice: 3000,
        description: "A slow but powerful ranged weapon.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 83.5 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 300 * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 134.1 * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 25.1 * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 90 * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 95
            }
        ]
    },

    ebony_bow: {
        id: "ebony_bow",
        icon: "ebonyBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "ebony bow",
        sellPrice: Math.round(3000 * DARKSTEEL_MULTIPLIER),
        description:
            "A slow but powerful ranged weapon of polished ebony and filigree darksteel metals.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 83.5 * DARKSTEEL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 300 * DARKSTEEL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 134.1 * DARKSTEEL_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 25.1 * DARKSTEEL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 90 * DARKSTEEL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 100
            }
        ]
    },

    fiery_bow: {
        id: "fiery_bow",
        icon: "fieryBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "charred bow",
        sellPrice: Math.round(3000 * RADIANT_MULTIPLIER),
        description:
            "A slow but powerful ranged weapon of ember-lit, charred wood and filigree radiant metals.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 83.5 * RADIANT_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 300 * RADIANT_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 134.1 * RADIANT_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 25.1 * RADIANT_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 90 * RADIANT_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 105
            }
        ]
    },

    tamarind_bow: {
        id: "tamarind_bow",
        icon: "tamarindBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "tamarind bow",
        sellPrice: Math.round(3000 * ASTRAL_MULTIPLIER),
        description:
            "A slow but powerful ranged weapon of polished tamarind and filigree astral metals.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 83.5 * ASTRAL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 300 * ASTRAL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 134.1 * ASTRAL_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 25.1 * ASTRAL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 90 * ASTRAL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 110
            }
        ]
    },

    magic_bow: {
        id: "magic_bow",
        icon: "magicBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "magic-infused bow",
        sellPrice: Math.round(3000 * TITANFOIL_MULTIPLIER),
        description:
            "A slow but powerful ranged weapon of magic-imbued wood and filigree titanfoil metals.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 83.5 * TITANFOIL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 300 * TITANFOIL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 134.1 * TITANFOIL_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 25.1 * TITANFOIL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 90 * TITANFOIL_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 115
            }
        ]
    },

    petrified_bow: {
        id: "petrified_bow",
        icon: "petrifiedBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "petrified bow",
        sellPrice: Math.round(3000 * RELICROCK_MULTIPLIER),
        description:
            "A slow but powerful ranged weapon of petrified wood and rune-covered relicrock metals.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 83.5 * RELICROCK_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 300 * RELICROCK_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 134.1 * RELICROCK_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 25.1 * RELICROCK_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 90 * RELICROCK_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 120
            }
        ]
    },

    ancient_bow: {
        id: "ancient_bow",
        icon: "ancientBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "ancient bow",
        sellPrice: Math.round(3000 * ETERNIUM_MULTIPLIER),
        description:
            "A slow but powerful ranged weapon of ancient wood and faintly-glowing eternium metals.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 83.5 * ETERNIUM_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 300 * ETERNIUM_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 134.1 * ETERNIUM_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 25.1 * ETERNIUM_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 90 * ETERNIUM_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 125
            }
        ]
    },

    spiritroot_bow: {
        id: "spiritroot_bow",
        icon: "spiritrootBow.svg",
        category: "combat",
        weaponType: "bow",
        slot: "mainHand",
        name: "spiritroot bow",
        sellPrice: Math.round(3000 * PRISMATIC_MULTIPLIER),
        description:
            "A slow but powerful ranged weapon of spiritroot and unblemished purestone metals.  Bows are useless without quivers.",
        isTwoHanded: true,
        isWeapon: true,
        isEquippable: true,
        stats: {
            attack: 83.5 * PRISMATIC_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 300 * PRISMATIC_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX,
            attackSpeed: SLOW_SPEED,
            accuracy: 134.1 * PRISMATIC_MULTIPLIER * BATTLEAXE_TO_BOW_ACCURACY,
            criticalChance: 25
        },
        extraStats: {
            attack: 25.1 * PRISMATIC_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMIN,
            attackMax: 90 * PRISMATIC_MULTIPLIER * BATTLEAXE_TO_BOW_ATTACKMAX
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
                level: 130
            }
        ]
    },

    copper_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "copper_quiver",
        icon: "copperQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "copper quiver",
        sellPrice: 75,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 1 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 1 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 3
            }
        ]
    },

    tin_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "tin_quiver",
        icon: "tinQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "tin quiver",
        sellPrice: 150,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 1.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 1 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 6
            }
        ]
    },

    bronze_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "bronze_quiver",
        icon: "bronzeQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "bronze quiver",
        sellPrice: 225,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 2 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 2 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 10
            }
        ]
    },

    iron_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "iron_quiver",
        icon: "ironQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "iron quiver",
        sellPrice: 300,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 2.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 2 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 15
            }
        ]
    },

    silver_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "silver_quiver",
        icon: "silverQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "silver quiver",
        sellPrice: 375,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 3 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 2 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 20
            }
        ]
    },

    gold_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "gold_quiver",
        icon: "goldQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "gold quiver",
        sellPrice: 450,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 3.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 3 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 25
            }
        ]
    },

    carbon_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "carbon_quiver",
        icon: "carbonQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "carbon quiver",
        sellPrice: 525,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 3 * KNIFE_TO_QUIVER_ACCURACY
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

    steel_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "steel_quiver",
        icon: "steelQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "steel quiver",
        sellPrice: 600,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 4.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 3 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 35
            }
        ]
    },

    platinum_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "platinum_quiver",
        icon: "platinumQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "platinum quiver",
        sellPrice: 675,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 3 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 40
            }
        ]
    },

    titanium_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "titanium_quiver",
        icon: "titaniumQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "titanium quiver",
        sellPrice: 750,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 5.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 3 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 45
            }
        ]
    },

    tungsten_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "tungsten_quiver",
        icon: "tungstenQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "tungsten quiver",
        sellPrice: 825,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 6 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 50
            }
        ]
    },

    obsidian_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "obsidian_quiver",
        icon: "obsidianQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "obsidian quiver",
        sellPrice: 900,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 6.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 55
            }
        ]
    },

    cobalt_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "cobalt_quiver",
        icon: "cobaltQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "cobalt quiver",
        sellPrice: 975,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 7 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 60
            }
        ]
    },

    mithril_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "mithril_quiver",
        icon: "mithrilQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "mithril quiver",
        sellPrice: 1050,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 7.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 65
            }
        ]
    },

    adamantium_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "adamantium_quiver",
        icon: "adamantiumQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "adamantium quiver",
        sellPrice: 1125,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 8 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 70
            }
        ]
    },

    orichalcum_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "orichalcum_quiver",
        icon: "orichalcumQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "orichalcum quiver",
        sellPrice: 1200,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 8.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 75
            }
        ]
    },

    meteorite_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "meteorite_quiver",
        icon: "meteoriteQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "meteorite quiver",
        sellPrice: 1275,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 9 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 80
            }
        ]
    },

    fairy_steel_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "fairy_steel_quiver",
        icon: "fairySteelQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "fairy steel quiver",
        sellPrice: 1350,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 9.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 85
            }
        ]
    },

    elven_steel_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "elven_steel_quiver",
        icon: "elvenSteelQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "elven steel quiver",
        sellPrice: 1425,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 10 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 90
            }
        ]
    },

    cursed_quiver: {
        // quivers are knives with mutated accuracy and no bonus damage
        id: "cursed_quiver",
        icon: "cursedQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "cursed quiver",
        sellPrice: 1500,
        description: "Used with a bow.",
        isEquippable: true,
        stats: {
            accuracy: 10.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 4 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 95
            }
        ]
    },

    darksteel_quiver: {
        id: "darksteel_quiver",
        icon: "darksteelQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "darksteel quiver",
        sellPrice: 1575,
        description:
            "A fine quiver made from darksteel metals and filled with ebony arrows.  Bows are useless without quivers.",
        isEquippable: true,
        stats: {
            accuracy: 12 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 5 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 100
            }
        ]
    },

    radiant_quiver: {
        id: "radiant_quiver",
        icon: "radiantQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "radiant quiver",
        sellPrice: 1650,
        description:
            "A fine quiver made from radiant metals and filled with charred arrows.  Bows are useless without quivers.",
        isEquippable: true,
        stats: {
            accuracy: 13.5 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 6 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 105
            }
        ]
    },

    astral_quiver: {
        id: "astral_quiver",
        icon: "astralQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "astral quiver",
        sellPrice: 1725,
        description:
            "A fine quiver made from astral metals and filled with tamarind arrows.  Bows are useless without quivers.",
        isEquippable: true,
        stats: {
            accuracy: 15 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 7 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 110
            }
        ]
    },

    titanfoil_quiver: {
        id: "titanfoil_quiver",
        icon: "titanfoilQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "titanfoil quiver",
        sellPrice: 1800,
        description:
            "A fine quiver made from titanfoil metals and filled with magic arrows.  Bows are useless without quivers.",
        isEquippable: true,
        stats: {
            accuracy: 17 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 8 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 115
            }
        ]
    },

    relicrock_quiver: {
        id: "relicrock_quiver",
        icon: "relicrockQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "relicrock quiver",
        sellPrice: 1875,
        description:
            "A fine quiver made from relicrock metals and filled with petrified arrows.  Bows are useless without quivers.",
        isEquippable: true,
        stats: {
            accuracy: 19 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 9 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 120
            }
        ]
    },

    eternium_quiver: {
        id: "eternium_quiver",
        icon: "eterniumQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "eternium quiver",
        sellPrice: 1950,
        description:
            "A fine quiver made from eternium metals and filled with ancient arrows.  Bows are useless without quivers.",
        isEquippable: true,
        stats: {
            accuracy: 22 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 13 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 125
            }
        ]
    },

    prismatic_quiver: {
        id: "prismatic_quiver",
        icon: "prismaticQuiver.svg",
        category: "combat",
        weaponType: "quiver",
        slot: "offHand",
        name: "prismatic quiver",
        sellPrice: 6500,
        description:
            "A fine quiver made from purestone metals and filled with spiritroot arrows.  Bows are useless without quivers.",
        isEquippable: true,
        stats: {
            accuracy: 26 * KNIFE_TO_QUIVER_ACCURACY
        },
        extraStats: {
            accuracy: 18 * KNIFE_TO_QUIVER_ACCURACY
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
                level: 130
            }
        ]
    }
}
