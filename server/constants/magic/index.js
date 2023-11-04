console.log("importing [server] combat/index.js ABILITIES")
import { ABILITIES } from "/server/constants/combat/index.js"
console.log("importing astronomy/index.js ASTRONOMY_ITEMS")
import { ASTRONOMY_ITEMS } from "/imports/constants/astronomy/items.js"
console.log("importing items/index.js ITEMS")
import { ITEMS } from "/imports/constants/items/index.js"
console.log("importing magic/index.js ITEMS")
import { MAGIC_TYPES } from "/imports/constants/magic/index.js"

console.log("exporting magic/index.js MAGIC")
export const MAGIC = Object.freeze({
    spells: {
        earth_dart: {
            id: "earth_dart",
            abilityId: "earth_dart",
            xp: 1,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "earth_shard_fragment",
                    icon: ITEMS["earth_shard_fragment"].icon,
                    name: ITEMS["earth_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        earthen_fist: {
            id: "earthen_fist",
            abilityId: "earthen_fist",
            xp: 107,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 2,
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
                    type: "item",
                    itemId: "earth_shard_fragment",
                    icon: ITEMS["earth_shard_fragment"].icon,
                    name: ITEMS["earth_shard_fragment"].name,
                    amount: 5,
                    consumes: true
                }
            ]
        },

        lightning_storm: {
            id: "lightning_storm",
            abilityId: "lightning_storm",
            xp: 200,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "complete_air_shard",
                    icon: ITEMS["complete_air_shard"].icon,
                    name: ITEMS["complete_air_shard"].name,
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
                }
            ]
        },

        lightning_dart: {
            id: "lightning_dart",
            abilityId: "lightning_dart",
            xp: 3,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "air_shard_fragment",
                    icon: ITEMS["air_shard_fragment"].icon,
                    name: ITEMS["air_shard_fragment"].name,
                    amount: 2,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "fire_shard_fragment",
                    icon: ITEMS["fire_shard_fragment"].icon,
                    name: ITEMS["fire_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        ice_dart: {
            id: "ice_dart",
            abilityId: "ice_dart",
            xp: 2,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "air_shard_fragment",
                    icon: ITEMS["air_shard_fragment"].icon,
                    name: ITEMS["air_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        earth_ball: {
            id: "earth_ball",
            abilityId: "earth_ball",
            xp: 10,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "earth_shard_fragment",
                    icon: ITEMS["earth_shard_fragment"].icon,
                    name: ITEMS["earth_shard_fragment"].name,
                    amount: 10,
                    consumes: true
                }
            ]
        },

        water_dart: {
            id: "water_dart",
            abilityId: "water_dart",
            xp: 1,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        furied_winds: {
            id: "furied_winds",
            abilityId: "furied_winds",
            xp: 107,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "complete_air_shard",
                    icon: ITEMS["complete_air_shard"].icon,
                    name: ITEMS["complete_air_shard"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "fire_shard_fragment",
                    icon: ITEMS["fire_shard_fragment"].icon,
                    name: ITEMS["fire_shard_fragment"].name,
                    amount: 7,
                    consumes: true
                }
            ]
        },

        fire_wave: {
            id: "fire_wave",
            abilityId: "fire_wave",
            xp: 120,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "complete_fire_shard",
                    icon: ITEMS["complete_fire_shard"].icon,
                    name: ITEMS["complete_fire_shard"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "fire_shard_fragment",
                    icon: ITEMS["fire_shard_fragment"].icon,
                    name: ITEMS["fire_shard_fragment"].name,
                    amount: 20,
                    consumes: true
                }
            ]
        },

        healing_shield: {
            id: "healing_shield",
            abilityId: "healing_shield",
            xp: 120,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "complete_water_shard",
                    icon: ITEMS["complete_water_shard"].icon,
                    name: ITEMS["complete_water_shard"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 20,
                    consumes: true
                }
            ]
        },

        water_ball: {
            id: "water_ball",
            abilityId: "water_ball",
            xp: 10,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 10,
                    consumes: true
                }
            ]
        },

        water_wave: {
            id: "water_wave",
            abilityId: "water_wave",
            xp: 105,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 5,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "complete_water_shard",
                    icon: ITEMS["complete_water_shard"].icon,
                    name: ITEMS["complete_water_shard"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        mending_spring: {
            id: "mending_spring",
            abilityId: "mending_spring",
            xp: 105,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 5,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "complete_water_shard",
                    icon: ITEMS["complete_water_shard"].icon,
                    name: ITEMS["complete_water_shard"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        affliction: {
            id: "affliction",
            abilityId: "affliction",
            xp: 105,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "poison_shard_fragment",
                    icon: ITEMS["poison_shard_fragment"].icon,
                    name: ITEMS["poison_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 25,
                    consumes: true
                }
            ]
        },

        magic_wisdom: {
            id: "magic_wisdom",
            abilityId: "magic_wisdom",
            xp: 400,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "complete_air_shard",
                    icon: ITEMS["complete_air_shard"].icon,
                    name: ITEMS["complete_air_shard"].name,
                    amount: 2,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "complete_water_shard",
                    icon: ITEMS["complete_water_shard"].icon,
                    name: ITEMS["complete_water_shard"].name,
                    amount: 2,
                    consumes: true
                }
            ]
        },

        blizzard: {
            id: "blizzard",
            abilityId: "blizzard",
            xp: 110,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "complete_water_shard",
                    icon: ITEMS["complete_water_shard"].icon,
                    name: ITEMS["complete_water_shard"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "air_shard_fragment",
                    icon: ITEMS["air_shard_fragment"].icon,
                    name: ITEMS["air_shard_fragment"].name,
                    amount: 10,
                    consumes: true
                }
            ]
        },

        poison_dart: {
            id: "poison_dart",
            abilityId: "poison_dart",
            xp: 5,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "poison_shard_fragment",
                    icon: ITEMS["poison_shard_fragment"].icon,
                    name: ITEMS["poison_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        air_dart: {
            id: "air_dart",
            abilityId: "air_dart",
            xp: 1,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "air_shard_fragment",
                    icon: ITEMS["air_shard_fragment"].icon,
                    name: ITEMS["air_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        air_ball: {
            id: "air_ball",
            abilityId: "air_ball",
            xp: 10,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "air_shard_fragment",
                    icon: ITEMS["air_shard_fragment"].icon,
                    name: ITEMS["air_shard_fragment"].name,
                    amount: 10,
                    consumes: true
                }
            ]
        },

        fire_dart: {
            id: "fire_dart",
            abilityId: "fire_dart",
            xp: 1,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "fire_shard_fragment",
                    icon: ITEMS["fire_shard_fragment"].icon,
                    name: ITEMS["fire_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        meteor_strike: {
            id: "meteor_strike",
            abilityId: "meteor_strike",
            xp: 105,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "complete_fire_shard",
                    icon: ITEMS["complete_fire_shard"].icon,
                    name: ITEMS["complete_fire_shard"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "earth_shard_fragment",
                    icon: ITEMS["earth_shard_fragment"].icon,
                    name: ITEMS["earth_shard_fragment"].name,
                    amount: 5,
                    consumes: true
                }
            ]
        },

        fire_ball: {
            id: "fire_ball",
            abilityId: "fire_ball",
            xp: 10,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "fire_shard_fragment",
                    icon: ITEMS["fire_shard_fragment"].icon,
                    name: ITEMS["fire_shard_fragment"].name,
                    amount: 10,
                    consumes: true
                }
            ]
        },

        mud_armor: {
            id: "mud_armor",
            abilityId: "mud_armor",
            xp: 4,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 2,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "earth_shard_fragment",
                    icon: ITEMS["earth_shard_fragment"].icon,
                    name: ITEMS["earth_shard_fragment"].name,
                    amount: 2,
                    consumes: true
                }
            ]
        },

        mending_water: {
            id: "mending_water",
            abilityId: "mending_water",
            xp: 4,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 3,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "air_shard_fragment",
                    icon: ITEMS["air_shard_fragment"].icon,
                    name: ITEMS["air_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        ignite: {
            id: "ignite",
            abilityId: "ignite",
            xp: 7,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "fire_shard_fragment",
                    icon: ITEMS["fire_shard_fragment"].icon,
                    name: ITEMS["fire_shard_fragment"].name,
                    amount: 5,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "air_shard_fragment",
                    icon: ITEMS["air_shard_fragment"].icon,
                    name: ITEMS["air_shard_fragment"].name,
                    amount: 2,
                    consumes: true
                }
            ]
        },

        frenzied_winds: {
            id: "frenzied_winds",
            abilityId: "frenzied_winds",
            xp: 6,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "air_shard_fragment",
                    icon: ITEMS["air_shard_fragment"].icon,
                    name: ITEMS["air_shard_fragment"].name,
                    amount: 5,
                    consumes: true
                }
            ]
        },

        angels_touch: {
            id: "angels_touch",
            abilityId: "angels_touch",
            xp: 103,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "complete_water_shard",
                    icon: ITEMS["complete_water_shard"].icon,
                    name: ITEMS["complete_water_shard"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
                    amount: 3,
                    consumes: true
                }
            ]
        },

        feeding_frenzy: {
            id: "feeding_frenzy",
            abilityId: "feeding_frenzy",
            xp: 200,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "complete_water_shard",
                    icon: ITEMS["complete_water_shard"].icon,
                    name: ITEMS["complete_water_shard"].name,
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
                }
            ]
        },

        elemental_shield: {
            id: "elemental_shield",
            abilityId: "elemental_shield",
            xp: 103,
            maxToCraft: 10000,
            required: [
                {
                    type: "item",
                    itemId: "air_shard_fragment",
                    icon: ITEMS["air_shard_fragment"].icon,
                    name: ITEMS["air_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "fire_shard_fragment",
                    icon: ITEMS["fire_shard_fragment"].icon,
                    name: ITEMS["fire_shard_fragment"].name,
                    amount: 1,
                    consumes: true
                },
                {
                    type: "item",
                    itemId: "water_shard_fragment",
                    icon: ITEMS["water_shard_fragment"].icon,
                    name: ITEMS["water_shard_fragment"].name,
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
                }
            ]
        },

        // Tier 3 Spell
        heavens_descent: {
            id: "heavens_descent",
            abilityId: "heavens_descent",
            xp: 1000,
            maxToCraft: 2,
            required: [
                {
                    type: "item",
                    itemId: "ancient_water_shard",
                    icon: ITEMS["ancient_water_shard"].icon,
                    name: ITEMS["ancient_water_shard"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        // Tier 3 Spell
        lightning_speed: {
            id: "lightning_speed",
            abilityId: "lightning_speed",
            xp: 1000,
            maxToCraft: 2,
            required: [
                {
                    type: "item",
                    itemId: "ancient_air_shard",
                    icon: ITEMS["ancient_air_shard"].icon,
                    name: ITEMS["ancient_air_shard"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        // Tier 3 Spell
        diamond_skin: {
            id: "diamond_skin",
            abilityId: "diamond_skin",
            xp: 1000,
            maxToCraft: 2,
            required: [
                {
                    type: "item",
                    itemId: "ancient_earth_shard",
                    icon: ITEMS["ancient_earth_shard"].icon,
                    name: ITEMS["ancient_earth_shard"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        },

        // Tier 3 Spell
        inferno: {
            id: "inferno",
            abilityId: "inferno",
            xp: 1000,
            maxToCraft: 2,
            required: [
                {
                    type: "item",
                    itemId: "ancient_fire_shard",
                    icon: ITEMS["ancient_fire_shard"].icon,
                    name: ITEMS["ancient_fire_shard"].name,
                    amount: 1,
                    consumes: true
                }
            ]
        }
    }
})

export const spellData = function(abilityId) {
    const spellAbilityInfo = ABILITIES[abilityId]

    if (!spellAbilityInfo || !spellAbilityInfo.name) {
        return { error: true, reason: `ability ${abilityId} does not exist`, ability: abilityId }
    }

    if (!spellAbilityInfo.isMagic) {
        return { error: true, reason: `ability ${spellAbilityInfo.name} is not a spell`, ability: abilityId }
    }

    // only look at MAGIC crafts from above
    const spellCraftInfo = MAGIC.spells[abilityId]
    
    if (!spellCraftInfo) {
        return { error: true, reason: `spell ${spellAbilityInfo.name} has no magic data`, ability: abilityId }
    }

    try {
        let calculatedData = {
            fire: {
                cost: {
                    items: 0,
                    units: 0
                },
                xp: 0
            },
            earth: {
                cost: {
                    items: 0,
                    units: 0
                },
                xp: 0
            },
            air: {
                cost: {
                    items: 0,
                    units: 0
                },
                xp: 0
            },
            water: {
                cost: {
                    items: 0,
                    units: 0
                },
                xp: 0
            },
            necrotic: {
                cost: {
                    items: 0,
                    units: 0
                },
                xp: 0
            },
            error: false,
            ability: abilityId
        }

        spellCraftInfo.required.forEach(function(requirementData) {
            if (requirementData.type === "item") {
                const itemCost = ASTRONOMY_ITEMS[requirementData.itemId]
                if (!itemCost && !itemCost.magic && !itemCost.magic.type) {
                    calculatedData.error = true
                    calculatedData.reason = `missing magic data for ${requirementData.itemId} in spell ${spellAbilityInfo.name}`
                } else {
                    const magicInfo = MAGIC_TYPES[itemCost.magic.type]
                    if (!magicInfo) {
                        calculatedData.error = true
                        calculatedData.reason = `invalid magic type ${itemCost.magic.type} for ${requirementData.itemId} in spell ${spellAbilityInfo.name}`
                    } else {
                        calculatedData[itemCost.magic.type].cost.items += Math.ceil(itemCost.magic.itemValue * (requirementData?.amount || 0))
                        calculatedData[itemCost.magic.type].cost.units += Math.ceil(itemCost.magic.unitValue * (requirementData?.amount || 0))
                        calculatedData[itemCost.magic.type].xp += Math.ceil(itemCost.magic.unitXp * (requirementData?.amount || 0))
                    }
                }
            }
        })

        if (
            calculatedData.fire.cost.units + 
            calculatedData.earth.cost.units + 
            calculatedData.air.cost.units + 
            calculatedData.water.cost.units + 
            calculatedData.necrotic.cost.units == 0 
        ) {
            return { error: true, reason: `no apparent cost for spell ${spellAbilityInfo.name}` }
        }

        return calculatedData
    } catch (err) {
        console.log(err)
        return { error: true, reason: `internal server error, exception thrown in spell ${spellAbilityInfo.name}`, ability: abilityId }
    }

    return { error: true, reason: `internal server error, unreachable code in spell ${spellAbilityInfo.name}`, ability: abilityId }
}