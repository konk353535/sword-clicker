export const MISC_ITEMS = {
    enhancer_key: {
        id: "enhancer_key",
        icon: "enhancerKey.svg",
        category: "crafting",
        name: "enhancer key",
        sellPrice: 1,
        description: `
      Can be consumed to increase an item's quality by up to 15%.<br />
      Can only be applied once per item. <br />
      Item quality can not be increased beyond 100%.`,
        shiftActionData: {
            description: "increase an items quality by up to 15%",
            target: "item"
        }
    },

    phasing_key: {
        id: "phasing_key",
        icon: "phasingKey.svg",
        category: "crafting",
        name: "phasing key",
        sellPrice: 1,
        description: `
      Can be consumed to phase an item through another plane of 
      existance, randomizing its qualities.<br />
      There is no undo for using this item.`,
        shiftActionData: {
            description: "reroll an item",
            target: "item"
        }
    },

    debug_key: {
        id: "debug_key",
        icon: "phasingKey.svg",
        category: "crafting",
        name: "debug key",
        sellPrice: 1,
        description: `
      Debug add item effect.<br />
      There is no undo for using this item.`,
        shiftActionData: {
            description: "test a new feature on an item",
            target: "item"
        },
        extraStats: {
            attack: 15,
            attackMax: 40
        }
    },

    adventure_token: {
        id: "adventure_token",
        icon: "adventureToken.svg",
        category: "crafting",
        name: "adventure token",
        sellPrice: 10,
        description: "Can be traded for new adventures."
    },

    companion_token: {
        id: "companion_token",
        icon: "companionToken.svg",
        category: "crafting",
        name: "companion token",
        sellPrice: 0,
        description: "Automatically spent when bringing companions to battle."
    },

    class_cooldown_reset_token: {
        id: "class_cooldown_reset_token",
        icon: "classCooldownResetToken.svg",
        category: "class_cooldown_reset_token",
        name: "Class Cooldown Reset Token",
        sellPrice: 0,
        description: "Consume to instantly reset your class change cooldown.",
        shiftActionData: {
            description: "Reset your class change cooldown."
        }
    },

    pine_magic_book: {
        id: "pine_magic_book",
        icon: "magic_tome_1.svg",
        category: "magic_book",
        name: "Codex of Tutoring",
        sellPrice: 100,
        magicXp: 500,
        description: "Can be consumed for 500 Magic XP.",
        shiftActionData: {
            description: "consume for 500 Magic XP."
        }
    },

    gift_box_holiday: {
        id: "gift_box_holiday",
        icon: "giftBoxHoliday.svg",
        category: "item_box",
        name: "holiday gift box",
        sellPrice: 1,
        description: `
      Can be opened (consumed) to reveal a prize.`,
        shiftActionData: {
            description: "open to reveal a prize"
        },
        // 22 items
        contentsList: [
            /*  9% chance: */ "holiday_cheer_tome",
            "holiday_cheer_tome",
            /* 14% chance: */ "festive_hat",
            "festive_hat",
            "festive_hat",
            /* 45% chance: */ "candy_cane",
            "candy_cane",
            "candy_cane",
            "candy_cane",
            "candy_cane",
            "candy_cane",
            "candy_cane",
            "candy_cane",
            "candy_cane",
            "candy_cane",
            /* 27% chance: */ "tanzanite",
            "sapphire",
            "ruby",
            "jade",
            "emerald",
            "lapislazuli",
            /*  5% chance: */ "enhancer_key"
        ]
    },

    gift_box_fireworks: {
        id: "gift_box_fireworks",
        icon: "eventNYFireworks.svg",
        category: "item_box",
        name: "party firework",
        sellPrice: 1,
        description: `
      Can be ignited (consumed) to explode and reveal a prize.`,
        shiftActionData: {
            description: "ignite to reveal a prize"
        },
        // 22 items
        contentsList: [
            /* 23% chance: */ "raise_your_glass_tome",
            "raise_your_glass_tome",
            "raise_your_glass_tome",
            "raise_your_glass_tome",
            "raise_your_glass_tome",
            /* 32% chance: */ "ornamental_hat",
            "ornamental_hat",
            "ornamental_hat",
            "ornamental_hat",
            "ornamental_hat",
            "ornamental_hat",
            "ornamental_hat",
            /* 32% chance: */ "event_ny_balloons",
            "event_ny_balloons",
            "event_ny_balloons",
            "event_ny_balloons",
            "event_ny_balloons",
            "event_ny_balloons",
            "event_ny_balloons",
            /*  9% chance: */ "lemonade",
            "lemonade",
            /*  4% chance: */ "enhancer_key"
        ]
    },

    gift_box_red_envelope: {
        id: "gift_box_red_envelope",
        icon: "eventLNYEnvelope.svg",
        category: "item_box",
        name: "red envelope",
        sellPrice: 1,
        description: `
      Can be opened (consumed) to reveal a prize.`,
        shiftActionData: {
            description: "open to reveal a prize"
        },
        // 50 items
        contentsList: [
            /*  6% chance: */ "lion_dance_tome",
            "lion_dance_tome",
            "lion_dance_tome",
            /* 12% chance: */ "lny_pig_tome_level_1",
            "lny_pig_tome_level_1",
            "lny_pig_tome_level_1",
            "lny_pig_tome_level_1",
            "lny_pig_tome_level_1",
            "lny_pig_tome_level_1",
            /*  8% chance: */ "lny_pig_tome_level_2",
            "lny_pig_tome_level_2",
            "lny_pig_tome_level_2",
            "lny_pig_tome_level_2",
            /*  6% chance: */ "lny_pig_tome_level_3",
            "lny_pig_tome_level_3",
            "lny_pig_tome_level_3",
            /*  4% chance: */ "lny_pig_tome_level_4",
            "lny_pig_tome_level_4",
            /*  2% chance: */ "lny_pig_tome_level_5",
            /*  8% chance: */ "event_lny_lion_claws",
            "event_lny_lion_claws",
            "event_lny_lion_claws",
            "event_lny_lion_claws",
            /*  8% chance: */ "event_lny_lion_body",
            "event_lny_lion_body",
            "event_lny_lion_body",
            "event_lny_lion_body",
            /*  8% chance: */ "event_lny_lion_head",
            "event_lny_lion_head",
            "event_lny_lion_head",
            "event_lny_lion_head",
            /*  4% chance: */ "event_lny_lunar_shield",
            "event_lny_lunar_shield",
            /* 16% chance: */ "gold:10",
            "gold:100",
            "gold:250",
            "gold:500",
            "gold:1000",
            "gold:2500",
            "gold:10000",
            "gold:25000",
            /* 12% chance: */ "gems:2",
            "gems:3",
            "gems:5",
            "gems:10",
            "gems:25",
            "gems:50",
            /*  2% chance: */ "enhancer_key",
            /*  4% chance: */ "lemonade",
            "lemonade"
        ]
    },

    gift_box_valentines: {
        id: "gift_box_valentines",
        icon: "eventVDgiftbox.svg",
        category: "item_box",
        name: "box of chocolates",
        sellPrice: 1,
        description: `
      Can be opened (consumed) to reveal a prize.`,
        shiftActionData: {
            description: "open to reveal a prize"
        },
        // 50 items
        contentsList: [
            /*  8% chance: */ "event_vd_charm_tome",
            "event_vd_charm_tome",
            "event_vd_charm_tome",
            "event_vd_charm_tome",
            /* 10% chance: */ "vd_cupid_tome_level_1",
            "vd_cupid_tome_level_1",
            "vd_cupid_tome_level_1",
            "vd_cupid_tome_level_1",
            "vd_cupid_tome_level_1",
            /*  8% chance: */ "vd_cupid_tome_level_2",
            "vd_cupid_tome_level_2",
            "vd_cupid_tome_level_2",
            "vd_cupid_tome_level_2",
            /*  6% chance: */ "vd_cupid_tome_level_3",
            "vd_cupid_tome_level_3",
            "vd_cupid_tome_level_3",
            /*  4% chance: */ "vd_cupid_tome_level_4",
            "vd_cupid_tome_level_4",
            /*  2% chance: */ "vd_cupid_tome_level_5",
            /*  6% chance: */ "cupids_bow",
            "cupids_bow",
            "cupids_bow",
            /*  6% chance: */ "event_vd_rose_quartz_amulet",
            "event_vd_rose_quartz_amulet",
            "event_vd_rose_quartz_amulet",
            ,
            /*  4% chance: */ "event_vd_bear_slippers",
            "event_vd_bear_slippers",
            /*  6% chance: */ "gems:2",
            "gems:3",
            "gems:5",
            /* 38% chance: */ "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            "chocolates",
            /*  2% chance: */ "enhancer_key"
        ]
    },

    gift_box_stpatricks: {
        id: "gift_box_stpatricks",
        icon: "eventSPDgiftbox.svg",
        category: "item_box",
        name: "pot of gold",
        sellPrice: 1,
        description: `
      Can be opened (consumed) to reveal a prize.`,
        shiftActionData: {
            description: "open to reveal a prize"
        },
        // 100 items
        contentsList: [
            /* 10% chance: */ "event_spd_tricky_step_tome",
            "event_spd_tricky_step_tome",
            "event_spd_tricky_step_tome",
            "event_spd_tricky_step_tome",
            "event_spd_tricky_step_tome",
            "event_spd_tricky_step_tome",
            "event_spd_tricky_step_tome",
            "event_spd_tricky_step_tome",
            "event_spd_tricky_step_tome",
            "event_spd_tricky_step_tome",
            /* 12% chance: */ "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            "spd_leprechaun_tome_level_1",
            /*  8% chance: */ "spd_leprechaun_tome_level_2",
            "spd_leprechaun_tome_level_2",
            "spd_leprechaun_tome_level_2",
            "spd_leprechaun_tome_level_2",
            "spd_leprechaun_tome_level_2",
            "spd_leprechaun_tome_level_2",
            "spd_leprechaun_tome_level_2",
            "spd_leprechaun_tome_level_2",
            /*  4% chance: */ "spd_leprechaun_tome_level_3",
            "spd_leprechaun_tome_level_3",
            "spd_leprechaun_tome_level_3",
            "spd_leprechaun_tome_level_3",
            /*  2% chance: */ "spd_leprechaun_tome_level_4",
            "spd_leprechaun_tome_level_4",
            /*  1% chance: */ "spd_leprechaun_tome_level_5",
            /*  8% chance: */ "event_spd_jeweled_greaves",
            "event_spd_jeweled_greaves",
            "event_spd_jeweled_greaves",
            "event_spd_jeweled_greaves",
            "event_spd_jeweled_greaves",
            "event_spd_jeweled_greaves",
            "event_spd_jeweled_greaves",
            "event_spd_jeweled_greaves",
            /* 12% chance: */ "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            "event_spd_four_leaf_clover_amulet",
            /*  8% chance: */ "event_spd_five_leaf_clover_amulet",
            "event_spd_five_leaf_clover_amulet",
            "event_spd_five_leaf_clover_amulet",
            "event_spd_five_leaf_clover_amulet",
            "event_spd_five_leaf_clover_amulet",
            "event_spd_five_leaf_clover_amulet",
            "event_spd_five_leaf_clover_amulet",
            "event_spd_five_leaf_clover_amulet",
            /*  4% chance: */ "event_spd_six_leaf_clover_amulet",
            "event_spd_six_leaf_clover_amulet",
            "event_spd_six_leaf_clover_amulet",
            "event_spd_six_leaf_clover_amulet",
            /*  2% chance: */ "event_spd_seven_leaf_clover_amulet",
            "event_spd_seven_leaf_clover_amulet",
            /*  1% chance: */ "event_spd_eight_leaf_clover_amulet",
            /*  10% chance: */ "companion_token",
            "companion_token",
            "companion_token",
            "companion_token",
            "companion_token",
            "companion_token",
            "companion_token",
            "companion_token",
            "companion_token",
            "companion_token",
            /*  8% chance: */ "gold:10",
            "gold:100",
            "gold:250",
            "gold:500",
            "gold:1000",
            "gold:2500",
            "gold:10000",
            "gold:25000",
            /*  8% chance: */ "gold:10",
            "gold:100",
            "gold:250",
            "gold:500",
            "gold:1000",
            "gold:2500",
            "gold:10000",
            "gold:25000",
            /*  2% chance: */ "enhancer_key",
            "enhancer_key"
        ]
    }
}
