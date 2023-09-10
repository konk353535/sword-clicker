console.log("exporting achievement/combat.js COMBAT_ACHIEVEMENTS")
export const COMBAT_ACHIEVEMENTS = {
    combat_dd_50: {
        kind: "combat",
        name: "Deal 50 Damage",
        hidden: false,
        description: "Dealt at least 50 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageDone || 0) >= 50
        },
        rewards: [
            {
                type: "item",
                itemId: "copper_knife",
                amount: 1
            },
            {
                type: "xp",
                skill: "attack",
                amount: 1000
            }
        ]
    },

    combat_dd_500: {
        kind: "combat",
        name: "Deal 500 Damage",
        hidden: false,
        description: "Dealt at least 500 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageDone || 0) >= 500
        },
        rewards: [
            {
                type: "item",
                itemId: "iron_scimitar",
                amount: 1
            },
            {
                type: "xp",
                skill: "attack",
                amount: 25000
            }
        ]
    },

    combat_dd_1000: {
        kind: "combat",
        name: "Deal 1,000 Damage",
        hidden: false,
        description: "Dealt at least 1,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageDone || 0) >= 1000
        },
        rewards: [
            {
                type: "item",
                itemId: "gold_knife",
                amount: 1
            },
            {
                type: "xp",
                skill: "attack",
                amount: 100000
            }
        ]
    },

    combat_dd_2500: {
        kind: "combat",
        name: "Deal 2,500 Damage",
        hidden: false,
        description: "Dealt at least 2,500 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageDone || 0) >= 2500
        },
        rewards: [
            {
                type: "item",
                itemId: "steel_scimitar",
                amount: 1
            },
            {
                type: "xp",
                skill: "attack",
                amount: 250000
            }
        ]
    },

    combat_dd_5000: {
        kind: "combat",
        name: "Deal 5,000 Damage",
        hidden: false,
        description: "Dealt at least 5,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageDone || 0) >= 5000
        },
        rewards: [
            {
                type: "item",
                itemId: "titanium_knife",
                amount: 1
            },
            {
                type: "xp",
                skill: "attack",
                amount: 500000
            }
        ]
    },

    combat_dd_10000: {
        kind: "combat",
        name: "Deal 10,000 Damage",
        hidden: false,
        description: "Dealt at least 10,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageDone || 0) >= 10000
        },
        rewards: [
            {
                type: "item",
                itemId: "obsidian_scimitar",
                amount: 1
            },
            {
                type: "xp",
                skill: "attack",
                amount: 1000000
            }
        ]
    },

    combat_dd_15000: {
        kind: "combat",
        name: "Deal 15,000 Damage",
        hidden: false,
        description: "Dealt at least 15,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageDone || 0) >= 15000
        },
        rewards: [
            {
                type: "item",
                itemId: "mithril_knife",
                amount: 1
            },
            {
                type: "xp",
                skill: "attack",
                amount: 1500000
            }
        ]
    },

    combat_dd_22500: {
        kind: "combat",
        name: "Deal 22,500 Damage",
        hidden: false,
        description: "Dealt at least 22,500 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageDone || 0) >= 22500
        },
        rewards: [
            {
                type: "item",
                itemId: "orichalcum_scimitar",
                amount: 1
            },
            {
                type: "xp",
                skill: "attack",
                amount: 2000000
            }
        ]
    },

    combat_dd_30000: {
        kind: "combat",
        name: "Deal 30,000 Damage",
        hidden: false,
        description: "Dealt at least 30,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageDone || 0) >= 30000
        },
        rewards: [
            {
                type: "item",
                itemId: "fairy_steel_knife",
                amount: 1
            },
            {
                type: "xp",
                skill: "attack",
                amount: 3000000
            }
        ]
    },

    combat_dt_50: {
        kind: "combat",
        name: "Take 50 Damage",
        hidden: false,
        description: "Took at least 50 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageTaken || 0) >= 50
        },
        rewards: [
            {
                type: "item",
                itemId: "red_apple",
                amount: 10
            },
            {
                type: "xp",
                skill: "defense",
                amount: 1000
            }
        ]
    },

    combat_dt_500: {
        kind: "combat",
        name: "Take 500 Damage",
        hidden: false,
        description: "Took at least 500 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageTaken || 0) >= 500
        },
        rewards: [
            {
                type: "item",
                itemId: "lemon",
                amount: 25
            },
            {
                type: "xp",
                skill: "defense",
                amount: 25000
            }
        ]
    },

    combat_dt_1000: {
        kind: "combat",
        name: "Take 1000 Damage",
        hidden: false,
        description: "Took at least 1,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageTaken || 0) >= 1000
        },
        rewards: [
            {
                type: "item",
                itemId: "rockmelon",
                amount: 10
            },
            {
                type: "xp",
                skill: "defense",
                amount: 100000
            }
        ]
    },

    combat_dt_2500: {
        kind: "combat",
        name: "Take 2,500 Damage",
        hidden: false,
        description: "Took at least 2,500 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageTaken || 0) >= 2500
        },
        rewards: [
            {
                type: "item",
                itemId: "cute_pig_tome_level_1",
                amount: 1
            },
            {
                type: "xp",
                skill: "defense",
                amount: 250000
            }
        ]
    },

    combat_dt_5000: {
        kind: "combat",
        name: "Take 5,000 Damage",
        hidden: false,
        description: "Took at least 5,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageTaken || 0) >= 5000
        },
        rewards: [
            {
                type: "item",
                itemId: "cute_pig_tome_level_2",
                amount: 1
            },
            {
                type: "xp",
                skill: "defense",
                amount: 500000
            }
        ]
    },

    combat_dt_7500: {
        kind: "combat",
        name: "Take 7,500 Damage",
        hidden: false,
        description: "Took at least 7,500 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageTaken || 0) >= 7500
        },
        rewards: [
            {
                type: "item",
                itemId: "cute_pig_tome_level_3",
                amount: 1
            },
            {
                type: "xp",
                skill: "defense",
                amount: 1000000
            }
        ]
    },

    combat_dt_10000: {
        kind: "combat",
        name: "Take 10,000 Damage",
        hidden: false,
        description: "Took at least 10,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostDamageTaken || 0) >= 10000
        },
        rewards: [
            {
                type: "item",
                itemId: "cute_pig_tome_level_4",
                amount: 1
            },
            {
                type: "xp",
                skill: "defense",
                amount: 2500000
            }
        ]
    },

    combat_hd_50: {
        kind: "combat",
        name: "Heal 50 Damage",
        hidden: false,
        description: "Healed at least 50 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostHealingDone || 0) >= 50
        },
        rewards: [
            {
                type: "item",
                itemId: "water_shard_fragment",
                amount: 25
            },
            {
                type: "xp",
                skill: "health",
                amount: 2500
            },
            {
                type: "xp",
                skill: "magic",
                amount: 500
            }
        ]
    },

    combat_hd_500: {
        kind: "combat",
        name: "Heal 500 Damage",
        hidden: false,
        description: "Healed at least 500 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostHealingDone || 0) >= 500
        },
        rewards: [
            {
                type: "item",
                itemId: "water_shard_fragment",
                amount: 250
            },
            {
                type: "xp",
                skill: "health",
                amount: 25000
            },
            {
                type: "xp",
                skill: "magic",
                amount: 5000
            }
        ]
    },

    combat_hd_1000: {
        kind: "combat",
        name: "Heal 1,000 Damage",
        hidden: false,
        description: "Healed at least 1,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostHealingDone || 0) >= 1000
        },
        rewards: [
            {
                type: "item",
                itemId: "complete_water_shard",
                amount: 50
            },
            {
                type: "xp",
                skill: "health",
                amount: 50000
            },
            {
                type: "xp",
                skill: "magic",
                amount: 10000
            }
        ]
    },

    combat_hd_1500: {
        kind: "combat",
        name: "Heal 1,500 Damage",
        hidden: false,
        description: "Healed at least 1,500 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostHealingDone || 0) >= 1500
        },
        rewards: [
            {
                type: "item",
                itemId: "complete_water_shard",
                amount: 100
            },
            {
                type: "item",
                itemId: "complete_air_shard",
                amount: 50
            },
            {
                type: "item",
                itemId: "complete_earth_shard",
                amount: 50
            },
            {
                type: "item",
                itemId: "complete_fire_shard",
                amount: 50
            },
            {
                type: "xp",
                skill: "health",
                amount: 100000
            },
            {
                type: "xp",
                skill: "magic",
                amount: 25000
            }
        ]
    },

    combat_hd_3500: {
        kind: "combat",
        name: "Heal 3,500 Damage",
        hidden: false,
        description: "Healed at least 3,500 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostHealingDone || 0) >= 3500
        },
        rewards: [
            {
                type: "item",
                itemId: "opal_chest_plate",
                amount: 1
            },
            {
                type: "item",
                itemId: "ancient_water_shard",
                amount: 10
            },
            {
                type: "gold",
                amount: 1000000
            },
            {
                type: "xp",
                skill: "health",
                amount: 250000
            },
            {
                type: "xp",
                skill: "magic",
                amount: 50000
            }
        ]
    },

    combat_hd_6000: {
        kind: "combat",
        name: "Heal 6,000 Damage",
        hidden: false,
        description: "Healed at least 6,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostHealingDone || 0) >= 6000
        },
        rewards: [
            {
                type: "item",
                itemId: "water_shard_fragment",
                amount: 1000
            },
            {
                type: "gold",
                amount: 2500000
            },
            {
                type: "xp",
                skill: "health",
                amount: 500000
            },
            {
                type: "xp",
                skill: "magic",
                amount: 100000
            }
        ]
    },

    combat_hd_10000: {
        kind: "combat",
        name: "Heal 10,000 Damage",
        hidden: false,
        description: "Healed at least 10,000 damage in one fight",
        condition({ user }) {
            return user.stats && (user.stats.combatMostHealingDone || 0) >= 10000
        },
        rewards: [
            {
                type: "gold",
                amount: 5000000
            },
            {
                type: "xp",
                skill: "health",
                amount: 1000000
            },
            {
                type: "xp",
                skill: "magic",
                amount: 250000
            }
        ]
    }
}
