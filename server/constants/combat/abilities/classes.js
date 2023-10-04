import { BUFFS } from "../../../../imports/constants/buffs/index"

export const CLASS_ABILITIES = {
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
    
    class_passive_paladin__bulwark: {
        icon: "warden_shield.svg",
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
    }
}
