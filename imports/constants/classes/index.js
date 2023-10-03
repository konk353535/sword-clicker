import { Users, classFeatureUnlocked } from "/imports/api/users/users.js"

console.log("exporting classes/index.js CLASSES")

export const CLASSES = {
    
    wanderer: {
        id: 'wanderer',
        name: 'Wanderer',
        eligible: function(uid) {
            return classFeatureUnlocked(uid)
        },
        exclusiveAbilities: [ ],
        autoBuffs: [ ]
    },
    
    barbarian: {
        id: 'barbarian',
        name: 'Barbarian',
        eligible: function() {
            return true
        },
        exclusiveAbilities: [ ],
        autoBuffs: [ 'class_perk_barbarian' ]
    },
    
    duelist: {
        id: 'duelist',
        name: 'Duelist',
        eligible: function() {
            return false
        },
        exclusiveAbilities: [ ],
        autoBuffs: [ ]
    },
    
    paladin: {
        id: 'paladin',
        name: 'Paladin',
        eligible: function() {
            return false
        },
        exclusiveAbilities: [ ],
        autoBuffs: [ ]
    },
    
    ranger: {
        id: 'ranger',
        name: 'Ranger',
        eligible: function() {
            return false
        },
        exclusiveAbilities: [ ],
        autoBuffs: [ ]
    },
    
    sage: {
        id: 'sage',
        name: 'Sage',
        eligible: function() {
            return false
        },
        exclusiveAbilities: [ ],
        autoBuffs: [ ]
    },
    
    tactician: {
        id: 'tactician',
        name: 'Tactician',
        eligible: function() {
            return true
        },
        exclusiveAbilities: [ ],
        autoBuffs: [ ]
    },
    
    warmage: {
        id: 'warmage',
        name: 'War Mage',
        eligible: function() {
            return false
        },
        exclusiveAbilities: [ ],
        autoBuffs: [ ]
    },
    
    wizard: {
        id: 'wizard',
        name: 'Wizard',
        eligible: function() {
            return false
        },
        exclusiveAbilities: [ ],
        autoBuffs: [ ]
    },
    
    lookup: function(id) {
        if (typeof id !== 'undefined') {
            id = id.trim().toLowerCase().replace(' ', '')

            if (id in CLASSES) {
                return CLASSES[id]
            }
        }
        return CLASSES.default()
    },
    
    default: function() {
        return CLASSES['wanderer']
    }

}
