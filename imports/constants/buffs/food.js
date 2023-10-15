import moment from "moment"

import { CDbl } from "../../utils.js"

export const FOOD_BUFFS = {
    food_lettice: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "lettice.svg",
        name: "eating lettuce",
        description({ buff, level }) {
            const instantHeal = buff.data.instantHeal
            return `Heals for ${instantHeal} health instantly. <br /> Takes ${buff.data.totalDuration}s to finish digesting.`
        },
        data: {
            // Data we require to persist
            duration: 30, // How long the buff will last
            totalDuration: 30,
            healthPerSecond: 0.1,
            instantHeal: 75 // Healing total
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += buff.data.instantHeal
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_rockmelon: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "rockmelon.svg",
        name: "eating rockmelon",
        description({ buff, level }) {
            const totalEnergy = Math.round(buff.data.totalDuration * buff.data.energyPerSecond)
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            const instantHeal = buff.data.instantHeal
            return `Heals for ${instantHeal} health instantly. <br /> Regenerates ${totalEnergy} energy and ${totalHeal} health <br /> over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 120, // How long the buff will last
            totalDuration: 120,
            instantHeal: 900,
            energyPerSecond: 0.04, // energy it will do per second
            healthPerSecond: 3
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += buff.data.instantHeal
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.energy += localSecondsElapsed * buff.data.energyPerSecond
                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.energy > target.stats.energyMax) {
                    target.stats.energy = target.stats.energyMax
                }
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.energy += 0.5
            }
        }
    },

    food_candycane: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "candyCane.svg",
        name: "eating candy cane",
        description({ buff, level }) {
            const totalEnergy = Math.round(buff.data.totalDuration * buff.data.energyPerSecond)
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            const instantHeal = buff.data.instantHeal
            return `Heals for ${instantHeal} health instantly. <br /> Regenerates ${totalEnergy} energy and ${totalHeal} health <br /> over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 20, // How long the buff will last
            totalDuration: 20,
            instantHeal: 1000,
            energyPerSecond: 0.25, // energy it will do per second
            healthPerSecond: 50
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += buff.data.instantHeal
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.energy += localSecondsElapsed * buff.data.energyPerSecond
                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.energy > target.stats.energyMax) {
                    target.stats.energy = target.stats.energyMax
                }
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.energy += 0.5
            }
        }
    },

    food_chocolates: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "eventVDchocolate.svg",
        name: "eating chocolates",
        description({ buff, level }) {
            const totalEnergy = Math.round(buff.data.totalDuration * buff.data.energyPerSecond)
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            const instantHeal = buff.data.instantHeal
            return `Heals for ${instantHeal} health instantly. <br /> Regenerates ${totalEnergy} energy and ${totalHeal} health <br /> over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 20, // How long the buff will last
            totalDuration: 20,
            instantHeal: 1000,
            energyPerSecond: 0.2, // energy it will do per second
            healthPerSecond: 75
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += buff.data.instantHeal
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.energy += localSecondsElapsed * buff.data.energyPerSecond
                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.energy > target.stats.energyMax) {
                    target.stats.energy = target.stats.energyMax
                }
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.energy += 0.5
            }
        }
    },

    food_dragonfruit: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "dragonfruit.svg",
        name: "eating dragonfruit",
        description({ buff, level }) {
            const totalEnergy = Math.round(buff.data.totalDuration * buff.data.energyPerSecond)
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            const instantHeal = buff.data.instantHeal
            return `Heals for ${instantHeal} health instantly. <br /> Regenerates ${totalEnergy} energy and ${totalHeal} health <br /> over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 120, // How long the buff will last
            totalDuration: 120,
            instantHeal: 450,
            energyPerSecond: 0.02, // energy it will do per second
            healthPerSecond: 2.5
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += buff.data.instantHeal
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.energy += localSecondsElapsed * buff.data.energyPerSecond
                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.energy > target.stats.energyMax) {
                    target.stats.energy = target.stats.energyMax
                }
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.energy += 0.5
            }
        }
    },

    food_lemonade: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "lemonade.svg",
        name: "eating lemonade",
        description({ buff, level }) {
            return `Gain 20 energy instantly.`
        },
        data: {
            // Data we require to persist
            duration: 0, // How long the buff will last
            totalDuration: 0,
            energyPerSecond: 0 // energy it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                target.stats.energy += 20
                if (target.stats.energy > target.stats.energyMax) {
                    target.stats.energy = target.stats.energyMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                // Remove buff from the target
                target.buffs = target.buffs.filter((targetBuff) => {
                    return targetBuff.id !== buff.id
                })
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    food_lemon: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "lemon.svg",
        name: "eating lemon",
        description({ buff, level }) {
            const totalEnergy = Math.round(buff.data.totalDuration * buff.data.energyPerSecond)
            return `Regenerates ${totalEnergy} energy over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 300, // How long the buff will last
            totalDuration: 300,
            energyPerSecond: 0.03 // energy it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.energy += localSecondsElapsed * buff.data.energyPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.energy > target.stats.energyMax) {
                    target.stats.energy = target.stats.energyMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.energy += 0.5
            }
        }
    },

    food_grape_fruit: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "grapeFruit.svg",
        name: "eating grapefruit",
        description({ buff, level }) {
            const instantHeal = buff.data.instantHeal
            return `Heals for ${instantHeal} health instantly. <br /> Takes ${buff.data.totalDuration}s to finish digesting.`
        },
        data: {
            // Data we require to persist
            duration: 45, // How long the buff will last
            totalDuration: 45,
            instantHeal: 150,
            healthPerSecond: 0.1 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += buff.data.instantHeal
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_red_apple: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "redApple.svg",
        name: "eating red apple",
        description({ buff, level }) {
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            return `Heals for ${totalHeal} health over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 35, // How long the buff will last
            totalDuration: 35,
            healthPerSecond: 5.28 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += 1
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_orange: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "orange.svg",
        name: "eating orange",
        description({ buff, level }) {
            const instantHeal = buff.data.instantHeal
            return `Heals for ${instantHeal} health instantly. <br /> Takes ${buff.data.totalDuration}s to finish digesting.`
        },
        data: {
            // Data we require to persist
            duration: 80, // How long the buff will last
            totalDuration: 80,
            instantHeal: 750,
            healthPerSecond: 0.1 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += buff.data.instantHeal
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_pineapple: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "pineapple.svg",
        name: "eating pineapple",
        description({ buff, level }) {
            const instantHeal = buff.data.instantHeal
            return `Heals for ${instantHeal} health instantly. <br /> Takes ${buff.data.totalDuration}s to finish digesting.`
        },
        data: {
            // Data we require to persist
            duration: 80, // How long the buff will last
            totalDuration: 80,
            instantHeal: 550,
            healthPerSecond: 0.1 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += buff.data.instantHeal
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_pear: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "pear.svg",
        name: "eating pear",
        description({ buff, level }) {
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            return `Heals for ${totalHeal} health over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 25, // How long the buff will last
            totalDuration: 25,
            healthPerSecond: 6 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += 1
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_acai_berry: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "acaiBerry.svg",
        name: "eating acai berry",
        description({ buff, level }) {
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            return `Heals for ${totalHeal} health over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 25, // How long the buff will last
            totalDuration: 25,
            healthPerSecond: 12 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += 1
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_watermelon: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "watermelon.svg",
        name: "eating watermelon",
        description({ buff, level }) {
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            return `Heals for ${totalHeal} health over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 10, // How long the buff will last
            totalDuration: 10,
            healthPerSecond: 20 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += 1
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_banana: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "banana.svg",
        name: "eating banana",
        description({ buff, level }) {
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            return `Heals for ${totalHeal} health over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 13, // How long the buff will last
            totalDuration: 13,
            healthPerSecond: 50 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += 1
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_carrot: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "carrot.svg",
        name: "eating carrot",
        description({ buff, level }) {
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            return `Heals for ${totalHeal} health over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 10, // How long the buff will last
            totalDuration: 10,
            healthPerSecond: 35 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += 1
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_lemon_honey: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "lemonHoney.svg",
        name: "lemon honey",
        description({ buff, level }) {
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.energyPerSecond)
            return `Recovers ${totalHeal} energy over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 60, // How long the buff will last
            totalDuration: 60,
            energyPerSecond: 0.5 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += 1
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.energy += localSecondsElapsed * buff.data.energyPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.energy > target.stats.energyMax) {
                    target.stats.energy = target.stats.energyMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_tamarind_honey: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "tamarindHoney.svg",
        name: "tamarind honey",
        description({ buff, level }) {
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            return `Heals for ${totalHeal} health over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 15 * 60, // How long the buff will last
            totalDuration: 15 * 60,
            healthPerSecond: 20 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += 1
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_potato: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "potato.svg",
        name: "eating potato",
        description({ buff, level }) {
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            return `Heals for ${totalHeal} health over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 900, // How long the buff will last
            totalDuration: 900,
            healthPerSecond: 3 // Healing it will do per second
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += 1
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    },

    food_sweet_potato: {
        duplicateTag: "eatingFood", // Used to stop duplicate buffs
        icon: "sweetPotato.svg",
        name: "eating sweet potato",
        description({ buff, level }) {
            const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond)
            return `Heals for ${totalHeal} health over a ${buff.data.totalDuration}s digestion period.`
        },
        data: {
            // Data we require to persist
            duration: 900, // How long the buff will last
            totalDuration: 900,
            healthPerSecond: 4.5, // Healing it will do per second
            energyPerSecond: 0.02
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                target.stats.health += 1
                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let localSecondsElapsed = CDbl(secondsElapsed)
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                target.stats.health += localSecondsElapsed * buff.data.healthPerSecond

                if (buff.duration < 0 || moment().isAfter(buff.data.endDate)) {
                    buff.constants.events.onRemove({ buff, target, caster })
                    // Remove buff from the target
                    target.buffs = target.buffs.filter((targetBuff) => {
                        return targetBuff.id !== buff.id
                    })
                }

                if (target.stats.health > target.stats.healthMax) {
                    target.stats.health = target.stats.healthMax
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.health += 1
            }
        }
    }
}
