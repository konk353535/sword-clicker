import { BUFFS } from "../../../../imports/constants/buffs/index"

export const CLASS_ABILITIES = {
    class_active_barbarian__charge: {
        icon: "barbarianCharge.svg",
        name: "Charge",
        id: "class_active_barbarian__charge",
        buffs: ["class_active_barbarian__charge"],
        cooldown: 12,
        slot: "any",
        target: "currentEnemy",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_active_barbarian__charge
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_passive_barbarian__brawn: {
        icon: "barbarianBrawn.svg",
        name: "Brawn",
        id: "class_passive_barbarian__brawn",
        buffs: ["class_passive_barbarian__brawn"],
        cooldown: 0,
        isPassive: true,
        slot: "any",
        target: "self",
        isPacifist: true,
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_passive_barbarian__brawn
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_active_duelist__parry: {
        icon: "duelistParry.svg",
        name: "Parry",
        id: "class_active_duelist__parry",
        buffs: ["class_active_duelist__parry"],
        cooldown: 20,
        slot: "any",
        target: "self",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_active_duelist__parry
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_passive_duelist__driven: {
        icon: "duelistDriven.svg",
        name: "Driven",
        id: "class_passive_duelist__driven",
        buffs: ["class_passive_duelist__driven"],
        cooldown: 0,
        isPassive: true,
        slot: "any",
        target: "self",
        isPacifist: false,
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_passive_duelist__driven
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_active_paladin__wrath: {
        icon: "paladinWrath.svg",
        name: "Wrath",
        id: "class_active_paladin__wrath",
        buffs: ["class_active_paladin__wrath"],
        cooldown: 12,
        slot: "any",
        target: "currentEnemy",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_active_paladin__wrath
            return BUFF.description({ buff: BUFF, level })
        }
    },
    
    class_passive_paladin__bulwark: {
        icon: "paladinBulwark.svg",
        name: "Bulwark",
        id: "class_passive_paladin__bulwark",
        buffs: ["class_passive_paladin__bulwark"],
        cooldown: 0,
        isPassive: true,
        slot: "any",
        target: "self",
        isPacifist: true,
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_passive_paladin__bulwark
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_active_ranger__blaze_arrows: {
        icon: "rangerBlazeArrows.svg",
        name: "Blaze Arrows",
        id: "class_active_ranger__blaze_arrows",
        buffs: ["class_active_ranger__blaze_arrows"],
        requires: [
            {
                type: "weaponType",
                weaponTypes: ["bow"]
            }
        ],
        cooldown: 12,
        slot: "any",
        target: "currentEnemy",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_active_ranger__blaze_arrows
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_active_ranger__sleet_arrows: {
        icon: "rangerSleetArrows.svg",
        name: "Sleet Arrows",
        id: "class_active_ranger__sleet_arrows",
        buffs: ["class_active_ranger__sleet_arrows"],
        requires: [
            {
                type: "weaponType",
                weaponTypes: ["bow"]
            }
        ],
        cooldown: 12,
        slot: "any",
        target: "currentEnemy",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_active_ranger__sleet_arrows
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_active_ranger__storm_arrows: {
        icon: "rangerStormArrows.svg",
        name: "Storm Arrows",
        id: "class_active_ranger__storm_arrows",
        buffs: ["class_active_ranger__storm_arrows"],
        requires: [
            {
                type: "weaponType",
                weaponTypes: ["bow"]
            }
        ],
        cooldown: 12,
        slot: "any",
        target: "currentEnemy",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_active_ranger__storm_arrows
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_passive_ranger__thicket: {
        icon: "rangerThicket.svg",
        name: "Thicket",
        id: "class_passive_ranger__thicket",
        buffs: ["class_passive_ranger__thicket"],
        cooldown: 0,
        isPassive: true,
        slot: "any",
        target: "self",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_passive_ranger__thicket
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_active_sage__mystic_bond: {
        icon: "sageMysticBond.svg",
        name: "Bond",
        id: "class_active_sage__mystic_bond",
        buffs: ["class_active_sage__mystic_bond"],
        cooldown: 5,
        slot: "any",
        target: "singleFriendly",
        isPacifist: true,
        targettable: true,
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_active_sage__mystic_bond
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_passive_sage__ward: {
        icon: "sageWard.svg",
        name: "Ward",
        id: "class_passive_sage__ward",
        buffs: ["class_passive_sage__ward"],
        cooldown: 0,
        isPassive: true,
        slot: "any",
        target: "self",
        isPacifist: true,
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_passive_sage__ward
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_active_tactician_rally: {
        icon: "tacticianRally.svg",
        name: "Rally",
        id: "class_active_tactician_rally",
        buffs: ["class_active_tactician_rally"],
        cooldown: 25,
        slot: "any",
        target: "currentEnemy",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_active_tactician_rally
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_passive_tactician__grit: {
        icon: "tacticianGrit.svg",
        name: "Grit",
        id: "class_passive_tactician__grit",
        buffs: ["class_passive_tactician__grit"],
        cooldown: 0,
        isPassive: true,
        slot: "any",
        target: "self",
        isPacifist: true,
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_passive_tactician__grit
            return BUFF.description({ buff: BUFF, level })
        }
    },
    
    class_active_warmage__weaken: {
        icon: "warmageWeaken.svg",
        name: "Weaken",
        id: "class_active_warmage__weaken",
        buffs: ["class_active_warmage__weaken"],
        cooldown: 15,
        slot: "any",
        target: "currentEnemy",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_active_warmage__weaken
            return BUFF.description({ buff: BUFF, level })
        }
    },
    
    class_passive_warmage__glorious_destiny: {
        icon: "warmageGloriousDestiny.svg",
        name: "Glorious Destiny",
        id: "class_passive_warmage__glorious_destiny",
        buffs: ["class_passive_warmage__glorious_destiny"],
        cooldown: 0,
        isPassive: true,
        slot: "any",
        target: "self",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_passive_warmage__glorious_destiny
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_active_wizard__time_warp: {
        icon: "wizardTimeWarp.svg",
        name: "Time Warp",
        id: "class_active_wizard__time_warp",
        buffs: ["class_active_wizard__time_warp"],
        requires: [
            {
                type: "weaponType",
                weaponTypes: ["staff", "wand"]
            }
        ], 
        cooldown: 0,
        slot: "any",
        target: "self",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_active_wizard__time_warp
            return BUFF.description({ buff: BUFF, level })
        }
    },

    class_passive_wizard__summon_familiar: {
        icon: "wizardSummonFamiliar.svg",
        name: "Summon Familiar",
        id: "class_passive_wizard__summon_familiar",
        buffs: ["class_passive_wizard__summon_familiar"],
        cooldown: 0,
        isPassive: true,
        slot: "any",
        target: "self",
        isHidden: true,
        description(level) {
            const BUFF = BUFFS.class_passive_wizard__summon_familiar
            return BUFF.description({ buff: BUFF, level })
        }
    }
}
