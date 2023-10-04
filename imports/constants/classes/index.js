import { classFeatureUnlocked } from "/imports/api/users/users.js"

console.log("exporting classes/index.js CLASSES")

export const CLASSES = {
    wanderer: {
        id: "wanderer",
        name: "Wanderer",
        icon: "classWanderer.png",
        eligible: function (uid) {
            return classFeatureUnlocked(uid)
        },
        exclusiveAbilities: [],
        autoBuffs: []
    },

    barbarian: {
        id: "barbarian",
        name: "Barbarian",
        icon: "classBarbarian.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_passive_barbarian__brawn"],
        autoBuffs: ["class_perk_barbarian"]
    },

    duelist: {
        id: "duelist",
        name: "Duelist",
        icon: "classDuelist.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: [],
        autoBuffs: [],
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
        icon: "classPaladin.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_passive_paladin__bulwark"],
        autoBuffs: [],
        equipmentBonuses: {
            hammer: {
                attackMax: {
                    valueMultiply: 2
                }
            },
            spear: {
                attackMax: {
                    valueMultiply: 2
                }
            },
            chest: {
                healthMax: {
                    valueMultiply: 2,
                    unlessMagic: true
                }
            },
            leg: {
                healthMax: {
                    valueMultiply: 2,
                    unlessMagic: true
                }
            },
            head: {
                healthMax: {
                    valueMultiply: 2,
                    unlessMagic: true
                }
            }
        }
    },

    ranger: {
        id: "ranger",
        name: "Ranger",
        icon: "classRanger.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: [],
        autoBuffs: [],
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
        icon: "classSage.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: [],
        autoBuffs: ["class_perk_sage"],
        equipmentBonuses: {
            staff: {
                magicPower: {
                    valueMultiply: 3
                }
            }
        },
        reforge: {
            pine_staff: {
                requiresCrafting: 5
            },
            beech_staff: {
                requiresCrafting: 10
            },
            ash_staff: {
                requiresCrafting: 15
            },
            oak_staff: {
                requiresCrafting: 20
            },
            maple_staff: {
                requiresCrafting: 25
            },
            walnut_staff: {
                requiresCrafting: 30
            },
            cherry_staff: {
                requiresCrafting: 35
            },
            mahogany_staff: {
                requiresCrafting: 40
            },
            elm_staff: {
                requiresCrafting: 45
            },
            black_staff: {
                requiresCrafting: 50
            },
            blue_gum_staff: {
                requiresCrafting: 55
            },
            cedar_staff: {
                requiresCrafting: 60
            },
            denya_staff: {
                requiresCrafting: 65
            },
            gombe_staff: {
                requiresCrafting: 70
            },
            hickory_staff: {
                requiresCrafting: 75
            },
            larch_staff: {
                requiresCrafting: 80
            },
            poplar_staff: {
                requiresCrafting: 85
            },
            tali_staff: {
                requiresCrafting: 90
            },
            willow_staff: {
                requiresCrafting: 95
            },
            teak_staff: {
                requiresCrafting: 100
            }
        }
    },

    tactician: {
        id: "tactician",
        name: "Tactician",
        icon: "classTactician.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: [],
        autoBuffs: []
    },

    warmage: {
        id: "warmage",
        name: "War Mage",
        icon: "classWarMage.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: ["class_passive_warmage__glorious_destiny"],
        autoBuffs: ["class_perk_warmage"],
        equipmentBonuses: {
            trident: {
                attackSpeed: {
                    valueAdd: 0.3
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
            brown_wizard_hat: {
                requiresCrafting: 8
            },
            blue_wizard_hat: {
                requiresCrafting: 24
            },
            purple_wizard_hat: {
                requiresCrafting: 41
            },
            orange_wizard_hat: {
                requiresCrafting: 57
            },
            amber_wizard_hat: {
                requiresCrafting: 73
            },
            violet_wizard_hat: {
                requiresCrafting: 78
            },
            crimson_wizard_hat: {
                requiresCrafting: 83
            },
            azure_wizard_hat: {
                requiresCrafting: 86
            },
            verdant_wizard_hat: {
                requiresCrafting: 89
            },
            serpent_wizard_hat: {
                requiresCrafting: 98
            },
            inferno_wizard_hat: {
                requiresCrafting: 114
            },
            exalted_wizard_hat: {
                requiresCrafting: 130
            },
            brown_wizard_shirt: {
                requiresCrafting: 8
            },
            blue_wizard_shirt: {
                requiresCrafting: 24
            },
            purple_wizard_shirt: {
                requiresCrafting: 41
            },
            orange_wizard_shirt: {
                requiresCrafting: 57
            },
            amber_wizard_shirt: {
                requiresCrafting: 73
            },
            violet_wizard_shirt: {
                requiresCrafting: 78
            },
            crimson_wizard_shirt: {
                requiresCrafting: 83
            },
            azure_wizard_shirt: {
                requiresCrafting: 86
            },
            verdant_wizard_shirt: {
                requiresCrafting: 89
            },
            serpent_wizard_shirt: {
                requiresCrafting: 98
            },
            inferno_wizard_shirt: {
                requiresCrafting: 114
            },
            exalted_wizard_shirt: {
                requiresCrafting: 130
            },
            brown_wizard_shorts: {
                requiresCrafting: 8
            },
            blue_wizard_shorts: {
                requiresCrafting: 24
            },
            purple_wizard_shorts: {
                requiresCrafting: 41
            },
            orange_wizard_shorts: {
                requiresCrafting: 57
            },
            amber_wizard_shorts: {
                requiresCrafting: 73
            },
            violet_wizard_shorts: {
                requiresCrafting: 78
            },
            crimson_wizard_shorts: {
                requiresCrafting: 83
            },
            azure_wizard_shorts: {
                requiresCrafting: 86
            },
            verdant_wizard_shorts: {
                requiresCrafting: 89
            },
            serpent_wizard_shorts: {
                requiresCrafting: 98
            },
            inferno_wizard_shorts: {
                requiresCrafting: 114
            },
            exalted_wizard_shorts: {
                requiresCrafting: 130
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
        icon: "classWizard.png",
        eligible: function () {
            return true
        },
        exclusiveAbilities: [],
        autoBuffs: [],
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
                return CLASSES[id]
            }
        }
        return CLASSES.default()
    },

    default: function () {
        return CLASSES["wanderer"]
    }
}
