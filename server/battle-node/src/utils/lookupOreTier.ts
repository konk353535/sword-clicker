export const lookupOreTier = (tier: number) => {
    if (tier === 2) {
        return "tin"
    }
    if (tier === 3) {
        return "bronze"
    }
    if (tier === 4) {
        return "iron"
    }
    if (tier === 5) {
        return "silver"
    }
    if (tier === 6) {
        return "gold"
    }
    if (tier === 7) {
        return "carbon"
    }
    if (tier === 8) {
        return "steel"
    }
    if (tier === 9) {
        return "platinum"
    }
    if (tier === 10) {
        return "titanium"
    }
    if (tier === 11) {
        return "tungsten"
    }
    if (tier === 12) {
        return "obsidian"
    }
    if (tier === 13) {
        return "cobalt"
    }
    if (tier === 14) {
        return "mithril"
    }
    if (tier === 15) {
        return "adamantium"
    }
    if (tier === 16) {
        return "orichalcum"
    }
    if (tier === 17) {
        return "meteorite"
    }
    if (tier === 18) {
        return "fairy_steel"
    }
    if (tier === 19) {
        return "elvent_steel"
    }
    if (tier === 27) {
        return "purestone"
    }
    if (tier >= 20) {
        return "cursed"
    }
    return "copper"
}
