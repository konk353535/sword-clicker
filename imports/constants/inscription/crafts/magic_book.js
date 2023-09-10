import { ITEMS } from "/imports/constants/items/index.js"

export const MAGIC_BOOK_CRAFTS = {
    pine_magic_book: {
        recipeFor: "inscription",
        produces: "pine_magic_book",
        name: "codex of tutoring",
        id: "pine_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 100,
        maxToCraft: 5,
        requiredInscriptionLevel: 2,
        required: [
            {
                type: "item",
                itemId: "pine_book",
                icon: ITEMS["pine_book"].icon,
                name: ITEMS["pine_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_fire_shard",
                icon: ITEMS["complete_fire_shard"].icon,
                name: ITEMS["complete_fire_shard"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 3
            },
            {
                type: "skill",
                name: "astronomy",
                level: 3
            }
        ]
    },

    beech_magic_book: {
        recipeFor: "inscription",
        produces: "beech_magic_book",
        name: "codex of learning",
        id: "beech_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 100,
        maxToCraft: 5,
        requiredInscriptionLevel: 6,
        required: [
            {
                type: "item",
                itemId: "beech_book",
                icon: ITEMS["beech_book"].icon,
                name: ITEMS["beech_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_earth_shard",
                icon: ITEMS["complete_earth_shard"].icon,
                name: ITEMS["complete_earth_shard"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 7
            },
            {
                type: "skill",
                name: "astronomy",
                level: 7
            }
        ]
    },

    ash_magic_book: {
        recipeFor: "inscription",
        produces: "ash_magic_book",
        name: "codex of knowledge",
        id: "ash_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 100,
        maxToCraft: 5,
        requiredInscriptionLevel: 9,
        required: [
            {
                type: "item",
                itemId: "ash_book",
                icon: ITEMS["ash_book"].icon,
                name: ITEMS["ash_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_water_shard",
                icon: ITEMS["complete_water_shard"].icon,
                name: ITEMS["complete_water_shard"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 10
            },
            {
                type: "skill",
                name: "astronomy",
                level: 10
            }
        ]
    },

    oak_magic_book: {
        recipeFor: "inscription",
        produces: "oak_magic_book",
        name: "codex of magic",
        id: "oak_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 100,
        maxToCraft: 5,
        requiredInscriptionLevel: 14,
        required: [
            {
                type: "item",
                itemId: "oak_book",
                icon: ITEMS["oak_book"].icon,
                name: ITEMS["oak_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_air_shard",
                icon: ITEMS["complete_air_shard"].icon,
                name: ITEMS["complete_air_shard"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 15
            },
            {
                type: "skill",
                name: "astronomy",
                level: 15
            }
        ]
    },

    maple_magic_book: {
        recipeFor: "inscription",
        produces: "maple_magic_book",
        name: "codex of illusion",
        id: "maple_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 250,
        maxToCraft: 5,
        requiredInscriptionLevel: 19,
        required: [
            {
                type: "item",
                itemId: "maple_book",
                icon: ITEMS["maple_book"].icon,
                name: ITEMS["maple_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_fire_shard",
                icon: ITEMS["complete_fire_shard"].icon,
                name: ITEMS["complete_fire_shard"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 20
            },
            {
                type: "skill",
                name: "astronomy",
                level: 20
            }
        ]
    },

    walnut_magic_book: {
        recipeFor: "inscription",
        produces: "walnut_magic_book",
        name: "codex of sorcery",
        id: "walnut_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 250,
        maxToCraft: 5,
        requiredInscriptionLevel: 24,
        required: [
            {
                type: "item",
                itemId: "walnut_book",
                icon: ITEMS["walnut_book"].icon,
                name: ITEMS["walnut_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_earth_shard",
                icon: ITEMS["complete_earth_shard"].icon,
                name: ITEMS["complete_earth_shard"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 25
            },
            {
                type: "skill",
                name: "astronomy",
                level: 25
            }
        ]
    },

    cherry_magic_book: {
        recipeFor: "inscription",
        produces: "cherry_magic_book",
        name: "codex of rituals",
        id: "cherry_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 250,
        maxToCraft: 5,
        requiredInscriptionLevel: 29,
        required: [
            {
                type: "item",
                itemId: "cherry_book",
                icon: ITEMS["cherry_book"].icon,
                name: ITEMS["cherry_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_water_shard",
                icon: ITEMS["complete_water_shard"].icon,
                name: ITEMS["complete_water_shard"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 30
            },
            {
                type: "skill",
                name: "astronomy",
                level: 30
            }
        ]
    },

    mahogany_magic_book: {
        recipeFor: "inscription",
        produces: "mahogany_magic_book",
        name: "codex of prophecy",
        id: "mahogany_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 250,
        maxToCraft: 5,
        requiredInscriptionLevel: 34,
        required: [
            {
                type: "item",
                itemId: "mahogany_book",
                icon: ITEMS["mahogany_book"].icon,
                name: ITEMS["mahogany_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_air_shard",
                icon: ITEMS["complete_air_shard"].icon,
                name: ITEMS["complete_air_shard"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 35
            },
            {
                type: "skill",
                name: "astronomy",
                level: 35
            }
        ]
    },

    elm_magic_book: {
        recipeFor: "inscription",
        produces: "elm_magic_book",
        name: "codex of aberrations",
        id: "elm_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 2000,
        maxToCraft: 5,
        requiredInscriptionLevel: 39,
        required: [
            {
                type: "item",
                itemId: "elk_book",
                icon: ITEMS["elk_book"].icon,
                name: ITEMS["elk_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_fire_shard",
                icon: ITEMS["ancient_fire_shard"].icon,
                name: ITEMS["ancient_fire_shard"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 40
            },
            {
                type: "skill",
                name: "astronomy",
                level: 40
            }
        ]
    },

    black_magic_book: {
        recipeFor: "inscription",
        produces: "black_magic_book",
        name: "codex of wisdom",
        id: "black_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 3000,
        maxToCraft: 5,
        requiredInscriptionLevel: 44,
        required: [
            {
                type: "item",
                itemId: "black_book",
                icon: ITEMS["black_book"].icon,
                name: ITEMS["black_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_earth_shard",
                icon: ITEMS["ancient_earth_shard"].icon,
                name: ITEMS["ancient_earth_shard"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 45
            },
            {
                type: "skill",
                name: "astronomy",
                level: 45
            }
        ]
    },

    blue_gum_magic_book: {
        recipeFor: "inscription",
        produces: "blue_gum_magic_book",
        name: "codex of bliss",
        id: "blue_gum_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 4000,
        maxToCraft: 5,
        requiredInscriptionLevel: 49,
        required: [
            {
                type: "item",
                itemId: "blue_gum_book",
                icon: ITEMS["blue_gum_book"].icon,
                name: ITEMS["blue_gum_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_water_shard",
                icon: ITEMS["ancient_water_shard"].icon,
                name: ITEMS["ancient_water_shard"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 50
            },
            {
                type: "skill",
                name: "astronomy",
                level: 50
            }
        ]
    },

    cedar_magic_book: {
        recipeFor: "inscription",
        produces: "cedar_magic_book",
        name: "codex of mastery",
        id: "cedar_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 5000,
        maxToCraft: 5,
        requiredInscriptionLevel: 54,
        required: [
            {
                type: "item",
                itemId: "cedar_book",
                icon: ITEMS["cedar_book"].icon,
                name: ITEMS["cedar_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_air_shard",
                icon: ITEMS["ancient_air_shard"].icon,
                name: ITEMS["ancient_air_shard"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 55
            },
            {
                type: "skill",
                name: "astronomy",
                level: 55
            }
        ]
    },

    denya_magic_book: {
        recipeFor: "inscription",
        produces: "denya_magic_book",
        name: "codex of wonder",
        id: "denya_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 6500,
        maxToCraft: 5,
        requiredInscriptionLevel: 59,
        required: [
            {
                type: "item",
                itemId: "denya_book",
                icon: ITEMS["denya_book"].icon,
                name: ITEMS["denya_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_fire_shard",
                icon: ITEMS["complete_fire_shard"].icon,
                name: ITEMS["complete_fire_shard"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_fire_shard",
                icon: ITEMS["ancient_fire_shard"].icon,
                name: ITEMS["ancient_fire_shard"].name,
                amount: 2,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 60
            },
            {
                type: "skill",
                name: "astronomy",
                level: 60
            }
        ]
    },

    gombe_magic_book: {
        recipeFor: "inscription",
        produces: "gombe_magic_book",
        name: "codex of insight",
        id: "gombe_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 8500,
        maxToCraft: 5,
        requiredInscriptionLevel: 64,
        required: [
            {
                type: "item",
                itemId: "gombe_book",
                icon: ITEMS["gombe_book"].icon,
                name: ITEMS["gombe_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_earth_shard",
                icon: ITEMS["complete_earth_shard"].icon,
                name: ITEMS["complete_earth_shard"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_earth_shard",
                icon: ITEMS["ancient_earth_shard"].icon,
                name: ITEMS["ancient_earth_shard"].name,
                amount: 2,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 65
            },
            {
                type: "skill",
                name: "astronomy",
                level: 65
            }
        ]
    },

    hickory_magic_book: {
        recipeFor: "inscription",
        produces: "hickory_magic_book",
        name: "codex of truth",
        id: "hickory_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 11000,
        maxToCraft: 5,
        requiredInscriptionLevel: 69,
        required: [
            {
                type: "item",
                itemId: "hickory_book",
                icon: ITEMS["hickory_book"].icon,
                name: ITEMS["hickory_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_water_shard",
                icon: ITEMS["complete_water_shard"].icon,
                name: ITEMS["complete_water_shard"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_water_shard",
                icon: ITEMS["ancient_water_shard"].icon,
                name: ITEMS["ancient_water_shard"].name,
                amount: 2,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 70
            },
            {
                type: "skill",
                name: "astronomy",
                level: 70
            }
        ]
    },

    larch_magic_book: {
        recipeFor: "inscription",
        produces: "larch_magic_book",
        name: "codex of power",
        id: "larch_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 14000,
        maxToCraft: 5,
        requiredInscriptionLevel: 74,
        required: [
            {
                type: "item",
                itemId: "larch_book",
                icon: ITEMS["larch_book"].icon,
                name: ITEMS["larch_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_air_shard",
                icon: ITEMS["complete_air_shard"].icon,
                name: ITEMS["complete_air_shard"].name,
                amount: 10,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_air_shard",
                icon: ITEMS["ancient_air_shard"].icon,
                name: ITEMS["ancient_air_shard"].name,
                amount: 2,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 75
            },
            {
                type: "skill",
                name: "astronomy",
                level: 75
            }
        ]
    },

    poplar_magic_book: {
        recipeFor: "inscription",
        produces: "poplar_magic_book",
        name: "codex of the dead",
        id: "poplar_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 18000,
        maxToCraft: 5,
        requiredInscriptionLevel: 79,
        required: [
            {
                type: "item",
                itemId: "poplar_book",
                icon: ITEMS["poplar_book"].icon,
                name: ITEMS["poplar_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_fire_shard",
                icon: ITEMS["complete_fire_shard"].icon,
                name: ITEMS["complete_fire_shard"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_fire_shard",
                icon: ITEMS["ancient_fire_shard"].icon,
                name: ITEMS["ancient_fire_shard"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 80
            },
            {
                type: "skill",
                name: "astronomy",
                level: 80
            }
        ]
    },

    tali_magic_book: {
        recipeFor: "inscription",
        produces: "tali_magic_book",
        name: "codex of the ancients",
        id: "tali_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 23500,
        maxToCraft: 5,
        requiredInscriptionLevel: 84,
        required: [
            {
                type: "item",
                itemId: "tali_book",
                icon: ITEMS["tali_book"].icon,
                name: ITEMS["tali_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_earth_shard",
                icon: ITEMS["complete_earth_shard"].icon,
                name: ITEMS["complete_earth_shard"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_earth_shard",
                icon: ITEMS["ancient_earth_shard"].icon,
                name: ITEMS["ancient_earth_shard"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 85
            },
            {
                type: "skill",
                name: "astronomy",
                level: 85
            }
        ]
    },

    willow_magic_book: {
        recipeFor: "inscription",
        produces: "willow_magic_book",
        name: "codex of the unseen",
        id: "willow_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 31000,
        maxToCraft: 5,
        requiredInscriptionLevel: 89,
        required: [
            {
                type: "item",
                itemId: "willow_book",
                icon: ITEMS["willow_book"].icon,
                name: ITEMS["willow_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_water_shard",
                icon: ITEMS["complete_water_shard"].icon,
                name: ITEMS["complete_water_shard"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_water_shard",
                icon: ITEMS["ancient_water_shard"].icon,
                name: ITEMS["ancient_water_shard"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 90
            },
            {
                type: "skill",
                name: "astronomy",
                level: 90
            }
        ]
    },

    teak_magic_book: {
        recipeFor: "inscription",
        produces: "teak_magic_book",
        name: "codex of the infinite",
        id: "teak_magic_book",
        category: "magic_book",
        timeToCraft: 300,
        xp: 31000,
        maxToCraft: 5,
        requiredInscriptionLevel: 94,
        required: [
            {
                type: "item",
                itemId: "teak_book",
                icon: ITEMS["teak_book"].icon,
                name: ITEMS["teak_book"].name,
                amount: 1,
                consumes: true
            },
            {
                type: "item",
                itemId: "complete_air_shard",
                icon: ITEMS["complete_air_shard"].icon,
                name: ITEMS["complete_air_shard"].name,
                amount: 25,
                consumes: true
            },
            {
                type: "item",
                itemId: "ancient_air_shard",
                icon: ITEMS["ancient_air_shard"].icon,
                name: ITEMS["ancient_air_shard"].name,
                amount: 5,
                consumes: true
            },
            {
                type: "skill",
                name: "inscription",
                level: 95
            },
            {
                type: "skill",
                name: "astronomy",
                level: 95
            }
        ]
    }
}
