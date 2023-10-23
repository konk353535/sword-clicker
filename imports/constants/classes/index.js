import lodash from "lodash"

import { classFeatureUnlocked } from "/imports/api/users/users.js"

console.log("exporting classes/index.js CLASSES")

export const CLASSES = Object.freeze({
    no_class: {
        id: "",
        name: "",
        icon: "classNone.png",
        eligible: function (uid) {
            return classFeatureUnlocked(uid)
        },
        exclusiveAbilities: [],
        autoBuffs: []
    },

    wanderer: {
        id: "wanderer",
        name: "Wanderer",
        icon: "classWandererSmall.png",
        eligible: function (uid) {
            return classFeatureUnlocked(uid)
        },
        exclusiveAbilities: [],
        autoBuffs: []
    },

    barbarian: {
        id: "barbarian",
        name: "Barbarian",
        icon: "classBarbarianSmall.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_active_barbarian__charge", "class_passive_barbarian__brawn"],
        autoBuffs: ["class_trait_barbarian"],
        equipmentBonuses: {
            chest: {
                magicPower: {
                    valueMultiply: 0
                },
                healingPower: {
                    valueMultiply: 0
                }
            },
            legs: {
                magicPower: {
                    valueMultiply: 0
                },
                healingPower: {
                    valueMultiply: 0
                }
            },
            head: {
                magicPower: {
                    valueMultiply: 0
                },
                healingPower: {
                    valueMultiply: 0
                }
            }
        }
    },

    duelist: {
        id: "duelist",
        name: "Duelist",
        icon: "classDuelistSmall.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_active_duelist__parry", "class_passive_duelist__driven"],
        autoBuffs: ["class_trait_duelist"],
        equipmentBonuses: {
            buckler: {
                accuracy: {
                    valueMultiply: 2
                }
            },
            rapier: {
                defense: {
                    valueMultiply: 0
                }
            }
        },
        abilityPatch: {
            twin_blades: {
                requires: [
                    {
                        type: "weaponType",
                        weaponTypes: ["dagger", "rapier", "shortSword", "longSword"]
                    }
                ]
            }
        }
    },

    paladin: {
        id: "paladin",
        name: "Paladin",
        icon: "classPaladinSmall.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_active_paladin__guard", "class_active_paladin__wrath", "class_passive_paladin__bulwark"],
        autoBuffs: ["class_trait_paladin"],
        equipmentBonuses: {
            hammer: {
                attackMax: {
                    valueMultiply: 3
                }
            },
            spear: {
                attackMax: {
                    valueMultiply: 3
                }
            },
            chest: {
                healthMax: {
                    valueMultiply: 3,
                    unlessMagic: true
                }
            },
            legs: {
                healthMax: {
                    valueMultiply: 3,
                    unlessMagic: true
                }
            },
            head: {
                healthMax: {
                    valueMultiply: 3,
                    unlessMagic: true
                }
            }
        },
        abilityPatch: {
            scream: {
                requires: [
                    {
                        type: "weaponType",
                        weaponTypes: ["spear", "hammer", "longSword"]
                    }
                ]
            }
        }
    },

    ranger: {
        id: "ranger",
        name: "Ranger",
        icon: "classRangerSmall.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_active_ranger__blaze_arrows", "class_active_ranger__sleet_arrows", "class_active_ranger__storm_arrows", "class_passive_ranger__thicket" ],
        autoBuffs: ["class_trait_ranger"],
        equipmentBonuses: {
            bow: {
                attackSpeed: {
                    valueAdd: 0.1
                }
            },
            dagger: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            spear: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            shortSword: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            longSword: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            broadSword: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            battleAxe: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            knife: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            orb: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            shield: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            tome: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            buckler: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            trident: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            wand: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            staff: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            },
            hammer: {
                attack: {
                    valueMultiply: 0.8
                },
                attackMax: {
                    valueMultiply: 0.8
                }
            }
        }
    },

    sage: {
        id: "sage",
        name: "Sage",
        icon: "classSageSmall.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_active_sage__mystic_bond", "class_passive_sage__ward"],
        autoBuffs: ["class_trait_sage"],
        equipmentBonuses: {
            staff: {
                healingPower: {
                    valueMultiply: 2
                }
            }
        },
        reforge: {
            druids_shirt: {
                requiresCrafting: 20
            },
            druids_pants: {
                requiresCrafting: 20
            },
            brown_wizard_shirt: {
                requiresCrafting: 10
            },
            blue_wizard_shirt: {
                requiresCrafting: 15
            },
            purple_wizard_shirt: {
                requiresCrafting: 25
            },
            orange_wizard_shirt: {
                requiresCrafting: 30
            },
            grey_wizard_shirt: {
                requiresCrafting: 35
            },
            red_wizard_shirt: {
                requiresCrafting: 40
            },
            black_wizard_shirt: {
                requiresCrafting: 45
            },
            yellow_wizard_shirt: {
                requiresCrafting: 50
            },
            umber_wizard_shirt: {
                requiresCrafting: 55
            },
            azure_wizard_shirt: {
                requiresCrafting: 60
            },
            verdant_wizard_shirt: {
                requiresCrafting: 65
            },
            violet_wizard_shirt: {
                requiresCrafting: 70
            },
            tawny_wizard_shirt: {
                requiresCrafting: 75
            },
            ash_wizard_shirt: {
                requiresCrafting: 80
            },
            crimson_wizard_shirt: {
                requiresCrafting: 85
            },
            charcoal_wizard_shirt: {
                requiresCrafting: 90
            },
            amber_wizard_shirt: {
                requiresCrafting: 95
            },
            leather_wizard_shirt: {
                requiresCrafting: 100
            },
            cerulean_wizard_shirt: {
                requiresCrafting: 105
            },
            serpent_wizard_shirt: {
                requiresCrafting: 110
            },
            indigo_wizard_shirt: {
                requiresCrafting: 115
            },
            ochre_wizard_shirt: {
                requiresCrafting: 120
            },
            exalted_wizard_shirt: {
                requiresCrafting: 125
            },
            brown_wizard_shorts: {
                requiresCrafting: 10
            },
            blue_wizard_shorts: {
                requiresCrafting: 15
            },
            purple_wizard_shorts: {
                requiresCrafting: 25
            },
            orange_wizard_shorts: {
                requiresCrafting: 30
            },
            grey_wizard_shorts: {
                requiresCrafting: 35
            },
            red_wizard_shorts: {
                requiresCrafting: 40
            },
            black_wizard_shorts: {
                requiresCrafting: 45
            },
            yellow_wizard_shorts: {
                requiresCrafting: 50
            },
            umber_wizard_shorts: {
                requiresCrafting: 55
            },
            azure_wizard_shorts: {
                requiresCrafting: 60
            },
            verdant_wizard_shorts: {
                requiresCrafting: 65
            },
            violet_wizard_shorts: {
                requiresCrafting: 70
            },
            tawny_wizard_shorts: {
                requiresCrafting: 75
            },
            ash_wizard_shorts: {
                requiresCrafting: 80
            },
            crimson_wizard_shorts: {
                requiresCrafting: 85
            },
            charcoal_wizard_shorts: {
                requiresCrafting: 90
            },
            amber_wizard_shorts: {
                requiresCrafting: 95
            },
            leather_wizard_shorts: {
                requiresCrafting: 100
            },
            cerulean_wizard_shorts: {
                requiresCrafting: 105
            },
            serpent_wizard_shorts: {
                requiresCrafting: 110
            },
            indigo_wizard_shorts: {
                requiresCrafting: 115
            },
            ochre_wizard_shorts: {
                requiresCrafting: 120
            },
            exalted_wizard_shorts: {
                requiresCrafting: 125
            },
            brown_wizard_hat: {
                requiresCrafting: 10
            },
            blue_wizard_hat: {
                requiresCrafting: 15
            },
            purple_wizard_hat: {
                requiresCrafting: 25
            },
            orange_wizard_hat: {
                requiresCrafting: 30
            },
            grey_wizard_hat: {
                requiresCrafting: 35
            },
            red_wizard_hat: {
                requiresCrafting: 40
            },
            black_wizard_hat: {
                requiresCrafting: 45
            },
            yellow_wizard_hat: {
                requiresCrafting: 50
            },
            umber_wizard_hat: {
                requiresCrafting: 55
            },
            azure_wizard_hat: {
                requiresCrafting: 60
            },
            verdant_wizard_hat: {
                requiresCrafting: 65
            },
            violet_wizard_hat: {
                requiresCrafting: 70
            },
            tawny_wizard_hat: {
                requiresCrafting: 75
            },
            ash_wizard_hat: {
                requiresCrafting: 80
            },
            crimson_wizard_hat: {
                requiresCrafting: 85
            },
            charcoal_wizard_hat: {
                requiresCrafting: 90
            },
            amber_wizard_hat: {
                requiresCrafting: 95
            },
            leather_wizard_hat: {
                requiresCrafting: 100
            },
            cerulean_wizard_hat: {
                requiresCrafting: 105
            },
            serpent_wizard_hat: {
                requiresCrafting: 110
            },
            indigo_wizard_hat: {
                requiresCrafting: 115
            },
            ochre_wizard_hat: {
                requiresCrafting: 120
            },
            exalted_wizard_hat: {
                requiresCrafting: 125
            }
        }
    },

    tactician: {
        id: "tactician",
        name: "Tactician",
        icon: "classTacticianSmall.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_active_tactician_rally", "class_passive_tactician__grit"],
        autoBuffs: ['class_trait_tactician']
    },

    warmage: {
        id: "warmage",
        name: "War Mage",
        icon: "classWarMageSmall.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_active_warmage__weaken", "class_passive_warmage__glorious_destiny"],
        autoBuffs: ["class_trait_warmage"],
        equipmentBonuses: {
            trident: {
                attackSpeed: {
                    valueAdd: 0.25
                }
            },
            neck: {
                attack: {
                    valueMultiply: 2
                },
                attackMax: {
                    valueMultiply: 2
                },
                criticalChance: {
                    valueMultiply: 2
                },
                criticalDamage: {
                    valueMultiply: 2
                },
                damage: {
                    valueMultiply: 2
                },
                accuracy: {
                    valueMultiply: 2
                },
                healthMax: {
                    valueMultiply: 2
                },
                defense: {
                    valueMultiply: 2
                },
                armor: {
                    valueMultiply: 2
                },
                magicArmor: {
                    valueMultiply: 2
                },
                energyStorage: {
                    valueMultiply: 2
                },
                energyRegen: {
                    valueMultiply: 2
                },
                magicPower: {
                    valueMultiply: 2
                },
                healingPower: {
                    valueMultiply: 2
                },
                attackSpeed: {
                    valueMultiply: 2
                }
            }
        },
        reforge: {
            brown_trident: {
                requiresCrafting: 10
            },
            blue_trident: {
                requiresCrafting: 15
            },
            druid_trident: {
                requiresCrafting: 20
            },
            purple_trident: {
                requiresCrafting: 25
            },
            orange_trident: {
                requiresCrafting: 30
            },
            grey_trident: {
                requiresCrafting: 35
            },
            red_trident: {
                requiresCrafting: 40
            },
            black_trident: {
                requiresCrafting: 45
            },
            yellow_trident: {
                requiresCrafting: 50
            },
            umber_trident: {
                requiresCrafting: 55
            },
            azure_trident: {
                requiresCrafting: 60
            },
            verdant_trident: {
                requiresCrafting: 65
            },
            violet_trident: {
                requiresCrafting: 70
            },
            tawny_trident: {
                requiresCrafting: 75
            },
            ash_trident: {
                requiresCrafting: 80
            },
            crimson_trident: {
                requiresCrafting: 85
            },
            charcoal_trident: {
                requiresCrafting: 90
            },
            amber_trident: {
                requiresCrafting: 95
            },
            leather_trident: {
                requiresCrafting: 100
            },
            cerulean_trident: {
                requiresCrafting: 105
            },
            serpent_trident: {
                requiresCrafting: 110
            },
            indigo_trident: {
                requiresCrafting: 115
            },
            ochre_trident: {
                requiresCrafting: 120
            },
            exalted_trident: {
                requiresCrafting: 125
            }            
        },
        abilityPatch: {
            blizzard: {
                requires: [
                ]
            },
            poison_dart: {
                requires: [
                ]
            },
            magic_wisdom: {
                requires: [
                ]
            },
            affliction: {
                requires: [
                ]
            },
            meteor_strike: {
                requires: [
                ]
            }
        }
    },

    wizard: {
        id: "wizard",
        name: "Wizard",
        icon: "classWizardSmall.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_active_wizard__time_warp", "class_passive_wizard__summon_familiar"],
        autoBuffs: ["class_trait_wizard"],
        equipmentBonuses: {
            tome: {
                magicPower: {
                    valueMultiply: 2,
                    ifMagic: true
                }
            },
            orb: {
                magicPower: {
                    valueMultiply: 2,
                    ifMagic: true
                }
            }
        },
        reforge: {
            copper_wand: {
                requiresCrafting: 5
            },
            tin_wand: {
                requiresCrafting: 10
            },
            bronze_wand: {
                requiresCrafting: 15
            },
            iron_wand: {
                requiresCrafting: 20
            },
            silver_wand: {
                requiresCrafting: 25
            },
            gold_wand: {
                requiresCrafting: 30
            },
            carbon_wand: {
                requiresCrafting: 35
            },
            steel_wand: {
                requiresCrafting: 40
            },
            platinum_wand: {
                requiresCrafting: 45
            },
            titanium_wand: {
                requiresCrafting: 50
            },
            tungsten_wand: {
                requiresCrafting: 55
            },
            obsidian_wand: {
                requiresCrafting: 60
            },
            cobalt_wand: {
                requiresCrafting: 65
            },
            mithril_wand: {
                requiresCrafting: 70
            },
            adamantium_wand: {
                requiresCrafting: 75
            },
            orichalcum_wand: {
                requiresCrafting: 80
            },
            meteorite_wand: {
                requiresCrafting: 85
            },
            fairy_steel_wand: {
                requiresCrafting: 90
            },
            elven_steel_wand: {
                requiresCrafting: 95
            },
            cursed_wand: {
                requiresCrafting: 100
            },
            darksteel_wand: {
                requiresCrafting: 105
            },
            radiant_wand: {
                requiresCrafting: 110
            },
            astral_wand: {
                requiresCrafting: 115
            },
            titanfoil_wand: {
                requiresCrafting: 120
            },
            relicrock_wand: {
                requiresCrafting: 125
            },
            eternium_wand: {
                requiresCrafting: 130
            },
            purestone_wand: {
                requiresCrafting: 135
            },
            ripped_tome: {
                requiresCrafting: 5,
            },
            dusty_tome: {
                requiresCrafting: 10,
            },
            poor_tome: {
                requiresCrafting: 15,
            },
            worn_tome: {
                requiresCrafting: 20,
            },
            dull_tome: {
                requiresCrafting: 25,
            },
            simple_tome: {
                requiresCrafting: 30,
            },
            basic_tome: {
                requiresCrafting: 35,
            },
            studius_tome: {
                requiresCrafting: 40,
            },
            paradoxical_tome: {
                requiresCrafting: 45,
            },
            leather_bound_tome: {
                requiresCrafting: 50,
            },
            prestigious_tome: {
                requiresCrafting: 55,
            },
            spellbound_tome: {
                requiresCrafting: 60,
            },
            scholars_tome: {
                requiresCrafting: 65,
            },
            rich_tome: {
                requiresCrafting: 70,
            },
            bewildering_tome: {
                requiresCrafting: 75,
            },
            perplexing_tome: {
                requiresCrafting: 80,
            },
            breathtaking_tome: {
                requiresCrafting: 85,
            },
            ancient_tome: {
                requiresCrafting: 90,
            },
            stellar_tome: {
                requiresCrafting: 95,
            },
            legendary_tome: {
                requiresCrafting: 100,
            },
            forgotten_tome: {
                requiresCrafting: 105,
            },
            charred_tome: {
                requiresCrafting: 110,
            },
            obscure_tome: {
                requiresCrafting: 115,
            },
            sinister_tome: {
                requiresCrafting: 120,
            },
            maniacal_tome: {
                requiresCrafting: 125,
            },
            exalted_tome: {
                requiresCrafting: 130,
            },
            diminished_orb: {
                requiresCrafting: 5,
            },
            cracked_orb: {
                requiresCrafting: 10,
            },
            dim_orb: {
                requiresCrafting: 15,
            },
            malformed_orb: {
                requiresCrafting: 20,
            },
            pale_orb: {
                requiresCrafting: 25,
            },
            magic_touched_orb: {
                requiresCrafting: 30,
            },
            weak_orb: {
                requiresCrafting: 35,
            },
            tainted_orb: {
                requiresCrafting: 40,
            },
            shimmering_orb: {
                requiresCrafting: 45,
            },
            glittering_orb: {
                requiresCrafting: 50,
            },
            glowing_orb: {
                requiresCrafting: 55,
            },
            pulsating_orb: {
                requiresCrafting: 60,
            },
            runed_orb: {
                requiresCrafting: 65,
            },
            billowing_orb: {
                requiresCrafting: 70,
            },
            pristine_orb: {
                requiresCrafting: 75,
            },
            arcane_orb: {
                requiresCrafting: 80,
            },
            powerful_orb: {
                requiresCrafting: 85,
            },
            dangerous_orb: {
                requiresCrafting: 90,
            },
            prismatic_orb: {
                requiresCrafting: 95,
            },
            cataclysmic_orb: {
                requiresCrafting: 100,
            },
            intense_orb: {
                requiresCrafting: 105,
            },
            primal_orb: {
                requiresCrafting: 110,
            },
            overflowing_orb: {
                requiresCrafting: 115,
            },
            phantasmal_orb: {
                requiresCrafting: 120,
            },
            farplane_orb: {
                requiresCrafting: 125,
            },
            exalted_orb: {
                requiresCrafting: 130,
            }
        }
    },

    lookup: function (id) {
        if (typeof id !== "undefined") {
            id = id.trim().toLowerCase().replace(" ", "")

            if (id in CLASSES) {
                return Object.freeze(lodash.cloneDeep(CLASSES[id]))
            }
        }
        return Object.freeze(lodash.cloneDeep(CLASSES.default()))
    },

    default: function () {
        return Object.freeze(lodash.cloneDeep(CLASSES["wanderer"]))
    },

    none: function () {
        return Object.freeze(lodash.cloneDeep(CLASSES["no_class"]))
    },

    list: function() {
        return ["wanderer", "barbarian", "duelist", "paladin", "ranger", "sage", "tactician", "warmage", "wizard"]
    }
})
