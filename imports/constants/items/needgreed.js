// keywords for searching: needgreed need greed need/greed need+greed
// need / greed matchers can be added here
// keys are used for friendly identification, values are a function that returns true / false given a string input
export const NEED_GREED_ITEMS = {
    pickaxe: (str) => {
        return RegExp("pickaxe", "g").test(str)
    },
    axe: (str) => {
        return RegExp("(?!pick)axe", "g").test(str)
    },
    idol: (str) => {
        return RegExp("dwarven_idol", "g").test(str)
    },
    horned_helmet: (str) => {
        return RegExp("horned_helmet", "g").test(str)
    },
    scimitar: (str) => {
        return RegExp("scimitar", "g").test(str)
    },
    rapier: (str) => {
        return RegExp("rapier", "g").test(str)
    },
    broad_sword: (str) => {
        return RegExp("broad_sword", "g").test(str)
    },
    wizard: (str) => {
        return RegExp("wizard", "g").test(str)
    },
    druid: (str) => {
        return RegExp("druid", "g").test(str)
    },
    buckler: (str) => {
        return RegExp("buckler", "g").test(str)
    },
    kite_shield: (str) => {
        return RegExp("kite_shield", "g").test(str)
    },
    hammer: (str) => {
        return RegExp("(?!mining_)hammer", "g").test(str)
    },
    orb: (str) => {
        return RegExp("orb", "g").test(str)
    },
    wand: (str) => {
        return RegExp("wand", "g").test(str)
    },
    opal: (str) => {
        return RegExp("opal", "g").test(str)
    },
    trident: (str) => {
        return RegExp("trident", "g").test(str)
    },
    tome: (str) => {
        return RegExp("tome", "g").test(str)
    },
    mining_hammer: (str) => {
        return RegExp("mining_hammer", "g").test(str)
    },
    boss_items: (str) => {
        // tomes are already need greed, as is druid
        return RegExp(
            "shark_tooth_amulet|snake_skin_chest|bone_kings_axe|spartan_spear|gold_crown_scroll|oversized_club|phoenix_hat|thors_skull|demons_heart|shadow_knife|smoke_dagger|living_helmet|bloody_plate_legs|frankensteins_heart|rich_snake_skin|krakens_tentacle|bison_axe|baby_fox|eternal_flame|holy_plate|honeycomb_pants|farplane_resonator|witchs_cauldron|lichs_",
            "g"
        ).test(str)
    },
    crafting_scrolls: (str) => {
        // tomes are already need greed
        return RegExp(
            "darksteel|radiant|astral|titanfoil|relicrock|eternium|prismatic|scepter_of_power_scroll",
            "g"
        ).test(str)
    },
    archer: (str) => {
        return RegExp("_bow|quiver", "g").test(str)
    },
    herbs: (str) => {
        return RegExp("garlic|sorrell|lemon_grass", "g").test(str)
    },
    food: (str) => {
        return RegExp("tamarind_honey|lemon_honey", "g").test(str)
    },
    mp_shields: (str) => {
        return RegExp("opal_Chestplate|spirit_shield", "g").test(str)
    },
    knives: (str) => {
        return RegExp("knife", "g").test(str)
    },
    dwarven: (str) => {
        return RegExp("dwarven_staff", "g").test(str)
    },
    event_items: (str) => {
        // tomes are already need greed (holiday_cheer_tome|raise_your_glass_tome|lny_pig_tome_level_x|cheer_tome|vd_cupid_tome_level_x|event_spd_tricky_step_tome|spd_leprechaun_tome_level_x)
        return RegExp(
            "festive_hat|ornamental_hat|event_ny_balloons|event_lny_lion_claws|event_lny_lion_body|event_lny_lion_head|event_lny_lunar_shield|event_vd_bear_slippers|event_vd_rose_quartz_amulet|event_spd_jeweled_greaves|_leaf_clover_amulet",
            "g"
        ).test(str)
    },
    special_items: (str) => {
        return RegExp("enhancer_key|lemonade", "g").test(str)
    }
}
