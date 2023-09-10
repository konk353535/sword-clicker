export const lookupWoodTier = (tier: number) => {
    if (tier === 2) {
        return "beech"
    }
    if (tier === 3) {
        return "ash"
    }
    if (tier === 4) {
        return "oak"
    }
    if (tier === 5) {
        return "maple"
    }
    if (tier === 6) {
        return "walnut"
    }
    if (tier === 7) {
        return "cherry"
    }
    if (tier === 8) {
        return "mahogany"
    }
    if (tier === 9) {
        return "elk"
    }
    if (tier === 10) {
        return "black"
    }
    if (tier === 11) {
        return "blue gum"
    }
    if (tier === 12) {
        return "cedar"
    }
    if (tier === 13) {
        return "denya"
    }
    if (tier === 14) {
        return "gombe"
    }
    if (tier === 15) {
        return "hickory"
    }
    if (tier === 16) {
        return "larch"
    }
    if (tier === 17) {
        return "poplar"
    }
    if (tier === 18) {
        return "tali"
    }
    if (tier === 19) {
        return "willow"
    }
    if (tier >= 20) {
        return "teak"
    }
    return "pine"
}
