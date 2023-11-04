console.log("exporting battles/index.js BATTLES")
export const BATTLES = Object.freeze({
    xpDistribution(weaponType) {
        const weaponDistributions = {
            dagger: {
                attack: 0.17,
                defense: 0.33,
                magic: 0,
                health: 0.5
            },

            spear: {
                attack: 0,
                defense: 0.7,
                magic: 0,
                health: 0.3
            },

            staff: {
                attack: 0,
                defense: 0,
                magic: 0,
                health: 1.0
            },

            wand: {
                attack: 0,
                defense: 0.25,
                magic: 0,
                health: 0.75
            },

            trident: {
                attack: 0.375,
                defense: 0.125,
                magic: 0,
                health: 0.5
            },

            longSword: {
                attack: 0.5,
                defense: 0,
                magic: 0,
                health: 0.5
            },

            broadSword: {
                attack: 0.5,
                defense: 0,
                magic: 0,
                health: 0.5
            },

            shortSword: {
                attack: 0.25,
                defense: 0.25,
                magic: 0,
                health: 0.5
            },

            rapier: {
                attack: 0.50,
                defense: 0.15,
                magic: 0,
                health: 0.35
            },

            battleAxe: {
                attack: 0.5,
                defense: 0,
                magic: 0,
                health: 0.5
            },

            hammer: {
                attack: 0.125,
                defense: 0.375,
                magic: 0,
                health: 0.5
            },

            bow: {
                attack: 0.75,
                defense: 0.0,
                magic: 0,
                health: 0.25
            }
        }

        return weaponDistributions[weaponType]
    },

    xpGain(stats, buffs) {
        if (!buffs) {
            buffs = []
        }

        const health = stats.health || 0
        const armor = stats.armor || 0
        const accuracy = stats.accuracy > 1 ? stats.accuracy : 1
        const attackSpeed = stats.attackSpeed || 0
        const attack = stats.attack || 0
        const attackMax = stats.attackMax || 0
        const defense = stats.defense || 0
        const magicArmor = stats.magicArmor || 0
        const dmgReduction = this.dmgReduction(armor)
        const magicDmgReduction = this.dmgReduction(magicArmor)

        let xpMultiplier = 1
        if (health > 5000) {
            xpMultiplier = 0.75
        } else if (health > 2500) {
            xpMultiplier = 0.8
        } else if (health > 1250) {
            xpMultiplier = 0.85
        } else if (health > 625) {
            xpMultiplier = 0.9
        } else if (health > 312) {
            xpMultiplier = 0.95
        }

        const effectiveDefense = health * (1 + (dmgReduction + magicDmgReduction) / 1.5) * (1 + defense / 50)
        const effectiveOffense = ((attack + attackMax) / 2) * (1 + attackSpeed) * (1 + accuracy / 50)
        return xpMultiplier * Math.round(effectiveOffense * 1.25 + effectiveDefense * 0.75 * (1 + buffs.length / 2))
    },

    dmgReduction(armor) {
        if (armor <= 0) {
            return 0
        }

        return armor / (armor + 100)
    },

    maxBossPartySize: 5,

    maxTowerPartySize: 5
})
