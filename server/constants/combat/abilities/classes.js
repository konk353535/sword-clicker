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
