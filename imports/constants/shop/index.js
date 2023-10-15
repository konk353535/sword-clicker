export const DONATORS_BENEFITS = Object.freeze({
    woodcuttingBonus: 20, // Increase woodcutting speed ( woodcutting )
    miningBonus: 20, // Decreases ore health ( mining )
    energyBonus: 20, // Increased energy regen ( combat )
    craftingBonus: 20, // Decreased crafting time ( crafting )
    inscriptionBonus: 20 // Decrease crafting time ( inscription )
})

export const SHOP_ITEMS = Object.freeze({
    "15_day_membership": {
        name: "Membership (15 days)",
        cost: 5 // Cost in gems
    },

    "30_day_membership": {
        name: "Membership (30 days)",
        cost: 10
    }
})

export const PLAYER_ICONS = Object.freeze({
    default: {
        name: "default",
        icon: "character.svg",
        group: ""
    },
    archer_t1: {
        name: "archer T1",
        icon: "falconT1.png",
        group: "archer_pack"
    },
    archer_t2: {
        name: "archer T2",
        icon: "falconT2.png",
        group: "archer_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 40
            }
        ]
    },
    archer_t1_color: {
        name: "archer T1 Rare",
        icon: "falconT1Color.png",
        group: "archer_pack"
    },
    archer_t2_color: {
        name: "archer T2 Rare",
        icon: "falconT2Color.png",
        group: "archer_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 40
            }
        ]
    },
    mage_t1: {
        name: "mage T1",
        icon: "mitsyT1.png",
        group: "mage_pack"
    },
    mage_t2: {
        name: "mage T2",
        icon: "mitsyT2.png",
        group: "mage_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 20
            }
        ]
    },
    mage_t1_color: {
        name: "mage T1 Rare",
        icon: "mitsyT1Color.png",
        group: "mage_pack"
    },
    mage_t2_color: {
        name: "mage T2 Rare",
        icon: "mitsyT2Color.png",
        group: "mage_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 20
            }
        ]
    },
    damage_t1: {
        name: "damage T1",
        icon: "oliveT1.png",
        group: "damage_pack"
    },
    damage_t2: {
        name: "damage T2",
        icon: "oliveT2.png",
        group: "damage_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 60
            }
        ]
    },
    damage_t1_color: {
        name: "damage T1 Rare",
        icon: "oliveT1Color.png",
        group: "damage_pack"
    },
    damage_t2_color: {
        name: "damage T2 Rare",
        icon: "oliveT2Color.png",
        group: "damage_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 60
            }
        ]
    },
    tank_t1: {
        name: "tank T1",
        icon: "guyT1.png",
        group: "tank_pack"
    },
    tank_t2: {
        name: "tank T2",
        icon: "guyT2.png",
        group: "tank_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 60
            }
        ]
    },
    tank_t1_color: {
        name: "tank T1 Rare",
        icon: "guyT1Color.png",
        group: "tank_pack"
    },
    tank_t2_color: {
        name: "tank T2 Rare",
        icon: "guyT2Color.png",
        group: "tank_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 60
            }
        ]
    },
    phoenix_t1: {
        name: "phoenix T1",
        icon: "phoenixT1.png",
        group: "phoenix_pack"
    },
    phoenix_t2: {
        name: "phoenix T2",
        icon: "phoenixT2.png",
        group: "phoenix_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 20
            }
        ]
    },
    phoenix_t1_color: {
        name: "phoenix T1 Rare",
        icon: "phoenixT1Color.png",
        group: "phoenix_pack"
    },
    phoenix_t2_color: {
        name: "phoenix T2 Rare",
        icon: "phoenixT2Color.png",
        group: "phoenix_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 20
            }
        ]
    },
    hiti_t1: {
        name: "Hiti T1",
        icon: "hitiT1.png"
    },
    hiti_t1_color: {
        name: "Hiti T1 Rare",
        icon: "hitiT1Color.png",
        requiredEquip: [
            {
                type: "skill",
                name: "magic",
                level: 20
            }
        ]
    },
    pugilist_t1: {
        name: "pugilist T1",
        icon: "pugilistT1.png",
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 20
            },
            {
                type: "skill",
                name: "defense",
                level: 20
            }
        ]
    },
    pugilist_t1_color: {
        name: "pugilist T1 Rare",
        icon: "pugilistT1Color.png",
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 20
            },
            {
                type: "skill",
                name: "defense",
                level: 20
            }
        ]
    },
    sandstorm_t1: {
        name: "sandstorm T1",
        icon: "sandstormT1.png"
    },
    sandstorm_t1_color: {
        name: "sandstorm T1 Rare",
        icon: "sandstormT1Color.png"
    },
    crow_t1: {
        name: "crow T1",
        icon: "crowT1.png",
        group: "crow_pack"
    },
    crow_t2: {
        name: "crow T2",
        icon: "crowT2.png",
        group: "crow_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 60
            }
        ]
    },
    crow_t1_color: {
        name: "crow T1 Rare",
        icon: "crowT1Color.png",
        group: "crow_pack"
    },
    crow_t2_color: {
        name: "crow T2 Rare",
        icon: "crowT2Color.png",
        group: "crow_pack",
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 60
            }
        ]
    },
    alda_t1: {
        name: "alda T1",
        icon: "aldaT1.png"
    },
    alda_t2: {
        name: "alda T2",
        icon: "aldaT2.png",
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 60
            }
        ]
    },
    alda_t1_color: {
        name: "alda T1 Rare",
        icon: "aldaT1Color.png"
    },
    alda_t2_color: {
        name: "alda T2 Rare",
        icon: "aldaT2Color.png",
        requiredEquip: [
            {
                type: "skill",
                name: "attack",
                level: 60
            }
        ]
    },
    valla_t1: {
        name: "valla T1",
        icon: "vallaT1.png"
    },
    valla_t1_color: {
        name: "valla T1 Rare",
        icon: "vallaT1Color.png"
    },
    adalgar_t1: {
        name: "adalgar T1",
        icon: "adalgarT1.png",
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 80
            }
        ]
    },
    adalgar_t1_color: {
        name: "adalgar T1 Rare",
        icon: "adalgarT1Color.png",
        requiredEquip: [
            {
                type: "skill",
                name: "defense",
                level: 80
            }
        ]
    }
})

export const getAvailablePlayerIcons = function getAvailablePlayerIcons(combatDoc) {
    if (!combatDoc) {
        return { playerIconsConsts: PLAYER_ICONS, availableIcons: [] }
    }

    let local_PLAYER_ICONS = PLAYER_ICONS
    let availableIcons = ["default", "mage_t1", "tank_t1", "damage_t1", "archer_t1"]
    let local_bonusIcons

    if (combatDoc.bonusIcons) {
        local_bonusIcons = combatDoc.bonusIcons.map((thisIcon) => {
            if (thisIcon.indexOf(".png") !== -1 || thisIcon.indexOf(".jpg") !== -1) {
                return { name: thisIcon.substring(0, thisIcon.length - 4), icon: thisIcon }
            }
            return { name: thisIcon, icon: `${thisIcon}.svg` }
        })

        local_bonusIcons.forEach((localIcon) => {
            local_PLAYER_ICONS[localIcon.name] = localIcon
        })
    }

    if (combatDoc.boughtIcons) {
        availableIcons = availableIcons.concat(combatDoc.boughtIcons)
    }

    if (local_bonusIcons) {
        availableIcons = availableIcons.concat(
            local_bonusIcons.map((localIcon) => {
                return localIcon.name
            })
        )
    }

    return { playerIconsConsts: local_PLAYER_ICONS, availableIcons }
}
