console.log("exporting achievement/tower.js TOWER_ACHIEVEMENTS")
export const TOWER_ACHIEVEMENTS = {
    tower_1: {
        kind: "tower",
        name: "Floor 1",
        hidden: false,
        description: "Clear floor 1 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 1
        },
        rewards: [
            {
                type: "gold",
                amount: 50000
            }
        ]
    },

    tower_2: {
        kind: "tower",
        name: "Floor 2",
        hidden: false,
        description: "Clear floor 2 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 2
        },
        rewards: [
            {
                type: "xp",
                skill: "astronomy",
                amount: 10000
            },
            {
                type: "xp",
                skill: "crafting",
                amount: 10000
            },
            {
                type: "xp",
                skill: "farming",
                amount: 10000
            },
            {
                type: "xp",
                skill: "inscription",
                amount: 10000
            },
            {
                type: "xp",
                skill: "woodcutting",
                amount: 10000
            }
        ]
    },

    tower_3: {
        kind: "tower",
        name: "Floor 3",
        hidden: false,
        description: "Clear floor 3 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 3
        },
        rewards: [
            {
                type: "item",
                itemId: "tin_horned_helmet",
                amount: 1
            },
            {
                type: "item",
                itemId: "enhancer_key",
                amount: 1
            }
        ]
    },

    tower_4: {
        kind: "tower",
        name: "Floor 4",
        hidden: false,
        description: "Clear floor 4 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 4
        },
        rewards: [
            {
                type: "item",
                itemId: "bronze_broad_sword",
                amount: 1
            },
            {
                type: "item",
                itemId: "ore_iron",
                amount: 500
            },
            {
                type: "item",
                itemId: "oak_log",
                amount: 500
            }
        ]
    },

    tower_5: {
        kind: "tower",
        name: "Floor 5",
        hidden: false,
        description: "Clear floor 5 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 5
        },
        rewards: [
            {
                type: "item",
                itemId: "skeletal_warrior_tome_level_1",
                amount: 1
            }
        ]
    },

    tower_6: {
        kind: "tower",
        name: "Floor 6",
        hidden: false,
        description: "Clear floor 6 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 6
        },
        rewards: [
            {
                type: "gold",
                amount: 250000
            }
        ]
    },

    tower_7: {
        kind: "tower",
        name: "Floor 7",
        hidden: false,
        description: "Clear floor 7 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 7
        },
        rewards: [
            {
                type: "xp",
                skill: "astronomy",
                amount: 50000
            },
            {
                type: "xp",
                skill: "crafting",
                amount: 50000
            },
            {
                type: "xp",
                skill: "farming",
                amount: 50000
            },
            {
                type: "xp",
                skill: "inscription",
                amount: 50000
            },
            {
                type: "xp",
                skill: "woodcutting",
                amount: 50000
            }
        ]
    },

    tower8: {
        kind: "tower",
        name: "Floor 8",
        hidden: false,
        description: "Clear floor 8 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 8
        },
        rewards: [
            {
                type: "item",
                itemId: "carbon_horned_helmet",
                amount: 1
            },
            {
                type: "item",
                itemId: "enhancer_key",
                amount: 1
            }
        ]
    },

    tower_9: {
        kind: "tower",
        name: "Floor 9",
        hidden: false,
        description: "Clear floor 9 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 9
        },
        rewards: [
            {
                type: "item",
                itemId: "steel_broad_sword",
                amount: 1
            },
            {
                type: "item",
                itemId: "ore_platinum",
                amount: 500
            },
            {
                type: "item",
                itemId: "elk_log",
                amount: 500
            }
        ]
    },

    tower_10: {
        kind: "tower",
        name: "Floor 10",
        hidden: false,
        description: "Clear floor 10 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 10
        },
        rewards: [
            {
                type: "item",
                itemId: "skeletal_warrior_tome_level_2",
                amount: 1
            },
            {
                type: "feature",
                icon: "classBarbarian.png"
            },
            {
                type: "feature",
                icon: "classDuelist.png"
            },
            {
                type: "feature",
                icon: "classPaladin.png"
            },
            {
                type: "feature",
                icon: "classRanger.png"
            },
            {
                type: "feature",
                icon: "classSage.png"
            },
            {
                type: "feature",
                icon: "classTactician.png"
            },
            {
                type: "feature",
                icon: "classWarMage.png"
            },
            {
                type: "feature",
                icon: "classWizard.png"
            }
        ]
    },

    tower_11: {
        kind: "tower",
        name: "Floor 11",
        hidden: false,
        description: "Clear floor 11 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 11
        },
        rewards: [
            {
                type: "gold",
                amount: 500000
            }
        ]
    },

    tower_12: {
        kind: "tower",
        name: "Floor 12",
        hidden: false,
        description: "Clear floor 12 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 12
        },
        rewards: [
            {
                type: "xp",
                skill: "astronomy",
                amount: 100000
            },
            {
                type: "xp",
                skill: "crafting",
                amount: 100000
            },
            {
                type: "xp",
                skill: "farming",
                amount: 100000
            },
            {
                type: "xp",
                skill: "inscription",
                amount: 100000
            },
            {
                type: "xp",
                skill: "woodcutting",
                amount: 100000
            }
        ]
    },

    tower13: {
        kind: "tower",
        name: "Floor 13",
        hidden: false,
        description: "Clear floor 13 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 13
        },
        rewards: [
            {
                type: "item",
                itemId: "obsidian_horned_helmet",
                amount: 1
            },
            {
                type: "item",
                itemId: "enhancer_key",
                amount: 1
            }
        ]
    },

    tower_14: {
        kind: "tower",
        name: "Floor 14",
        hidden: false,
        description: "Clear floor 14 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 14
        },
        rewards: [
            {
                type: "item",
                itemId: "cobalt_broad_sword",
                amount: 1
            },
            {
                type: "item",
                itemId: "ore_mithril",
                amount: 500
            },
            {
                type: "item",
                itemId: "gombe_log",
                amount: 500
            }
        ]
    },

    tower_15: {
        kind: "tower",
        name: "Floor 15",
        hidden: false,
        description: "Clear floor 15 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 15
        },
        rewards: [
            {
                type: "item",
                itemId: "skeletal_warrior_tome_level_3",
                amount: 1
            }
        ]
    },

    tower_16: {
        kind: "tower",
        name: "Floor 16",
        hidden: false,
        description: "Clear floor 16 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 16
        },
        rewards: [
            {
                type: "gold",
                amount: 1000000
            }
        ]
    },

    tower_17: {
        kind: "tower",
        name: "Floor 17",
        hidden: false,
        description: "Clear floor 17 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 17
        },
        rewards: [
            {
                type: "xp",
                skill: "astronomy",
                amount: 250000
            },
            {
                type: "xp",
                skill: "crafting",
                amount: 250000
            },
            {
                type: "xp",
                skill: "farming",
                amount: 250000
            },
            {
                type: "xp",
                skill: "inscription",
                amount: 250000
            },
            {
                type: "xp",
                skill: "woodcutting",
                amount: 250000
            }
        ]
    },

    tower18: {
        kind: "tower",
        name: "Floor 18",
        hidden: false,
        description: "Clear floor 18 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 18
        },
        rewards: [
            {
                type: "item",
                itemId: "meteorite_horned_helmet",
                amount: 1
            },
            {
                type: "item",
                itemId: "enhancer_key",
                amount: 1
            }
        ]
    },

    tower_19: {
        kind: "tower",
        name: "Floor 19",
        hidden: false,
        description: "Clear floor 19 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 19
        },
        rewards: [
            {
                type: "item",
                itemId: "fairy_steel_broad_sword",
                amount: 1
            },
            {
                type: "item",
                itemId: "ore_elven_steel",
                amount: 500
            },
            {
                type: "item",
                itemId: "willow_log",
                amount: 500
            }
        ]
    },

    tower_20: {
        kind: "tower",
        name: "Floor 20",
        hidden: false,
        description: "Clear floor 20 in the tower",
        condition({ user }) {
            return user.stats && (user.stats.towerHighestClear || 0) >= 20
        },
        rewards: [
            {
                type: "item",
                itemId: "skeletal_warrior_tome_level_4",
                amount: 1
            }
        ]
    }
}
