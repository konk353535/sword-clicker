export const lookupMagicColorTier = (tier: number) => {
    if (tier === 2) {
        return "brown"
    }
    if (tier === 3) {
        return "blue"
    }
    if (tier === 4) {
        return "druid"
    }
    if (tier === 5) {
        return "purple"
    }
    if (tier === 6) {
        return "orange"
    }
    if (tier === 7) {
        return "grey"
    }
    if (tier === 8) {
        return "red"
    }
    if (tier === 9) {
        return "black"
    }
    if (tier === 10) {
        return "yellow"
    }
    if (tier === 11) {
        return "umber"
    }
    if (tier === 12) {
        return "azure"
    }
    if (tier === 13) {
        return "verdant"
    }
    if (tier === 14) {
        return "violet"
    }
    if (tier === 15) {
        return "tawny"
    }
    if (tier === 16) {
        return "ash"
    }
    if (tier === 17) {
        return "crimson"
    }
    if (tier === 18) {
        return "charcoal"
    }
    if (tier === 19) {
        return "amber"
    }
    if (tier === 20) {
        return "leather"
    }
    if (tier === 21) {
        return "cerulean"
    }
    if (tier === 22) {
        return "serpent"
    }
    if (tier === 23) {
        return "indigo"
    }
    if (tier === 24) {
        return "ochre"
    }
    if (tier >= 25 && tier <= 27) {
        return "exalted"
    }
    if (tier > 20) {
        return "leather"
    }
    return "brown"
}

export const lookupMagicTomeTier = (tier: number) => {
    if (tier === 2) {
        return "dusty"
    }
    if (tier === 3) {
        return "poor"
    }
    if (tier === 4) {
        return "worn"
    }
    if (tier === 5) {
        return "dull"
    }
    if (tier === 6) {
        return "simple"
    }
    if (tier === 7) {
        return "basic"
    }
    if (tier === 8) {
        return "studius"
    }
    if (tier === 9) {
        return "paradoxical"
    }
    if (tier === 10) {
        return "leather_bound"
    }
    if (tier === 11) {
        return "prestigious"
    }
    if (tier === 12) {
        return "spellbound"
    }
    if (tier === 13) {
        return "scholars"
    }
    if (tier === 14) {
        return "rich"
    }
    if (tier === 15) {
        return "bewildering"
    }
    if (tier === 16) {
        return "perplexing"
    }
    if (tier === 17) {
        return "breathtaking"
    }
    if (tier === 18) {
        return "ancient"
    }
    if (tier === 19) {
        return "stellar"
    }
    if (tier === 20) {
        return "legendary"
    }
    if (tier === 21) {
        return "forgotten"
    }
    if (tier === 22) {
        return "charred"
    }
    if (tier === 23) {
        return "obscure"
    }
    if (tier === 24) {
        return "sinister"
    }
    if (tier === 25) {
        return "maniacal"
    }
    if (tier >= 26 && tier <= 27) {
        return "exalted"
    }
    if (tier > 20) {
        return "legendary"
    }
    return "ripped"
}

export const lookupMagicOrbTier = (tier: number) => {
    if (tier === 2) {
        return "cracked"
    }
    if (tier === 3) {
        return "dim"
    }
    if (tier === 4) {
        return "malformed"
    }
    if (tier === 5) {
        return "pale"
    }
    if (tier === 6) {
        return "magic_touched"
    }
    if (tier === 7) {
        return "weak"
    }
    if (tier === 8) {
        return "tainted"
    }
    if (tier === 9) {
        return "shimmering"
    }
    if (tier === 10) {
        return "glittering"
    }
    if (tier === 11) {
        return "glowing"
    }
    if (tier === 12) {
        return "pulsating"
    }
    if (tier === 13) {
        return "runed"
    }
    if (tier === 14) {
        return "billowing"
    }
    if (tier === 15) {
        return "pristine"
    }
    if (tier === 16) {
        return "arcane"
    }
    if (tier === 17) {
        return "powerful"
    }
    if (tier === 18) {
        return "dangerous"
    }
    if (tier === 19) {
        return "prismatic"
    }
    if (tier === 20) {
        return "cataclysmic"
    }
    if (tier === 21) {
        return "intense"
    }
    if (tier === 22) {
        return "primal"
    }
    if (tier === 23) {
        return "overflowing"
    }
    if (tier === 24) {
        return "phantasmal"
    }
    if (tier === 25) {
        return "farplane"
    }
    if (tier >= 26 && tier <= 27) {
        return "exalted"
    }
    if (tier > 20) {
        return "cataclysmic"
    }
    return "diminished"
}
