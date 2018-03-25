import { WOODCUTTING_ITEMS as woodcuttingItems } from './items';
import { ITEMS } from '/server/constants/items/index';
import { WOODS } from '/imports/constants/woodcutting/woods';
import { STORAGE } from '/imports/constants/woodcutting/storage';

export const WOODCUTTING_ITEMS = woodcuttingItems;
export const WOODCUTTING = {

  STORAGE,

  suicidalFury: {
    duration: 60, // In seconds
    attackSpeedIncrease: 1250 // Percentage
  },

  baseMaxWoodcutters: 5,

  // Woodcutters inherit stats from there associated axes
  woodcutters: {
    farmer: {
      requiredWoodcuttingLevel: 1,
      icon: 'stoneLumberJack.png',
      name: 'farmer',
      id: 'farmer',
      axeId: 'primitive_axe',
      required: [{
        type: 'item',
        itemId: 'primitive_axe',
        icon: ITEMS['primitive_axe'].icon,
        name: ITEMS['primitive_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 20,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 1
      }]
    },

    copper_lumberjack: {
      requiredWoodcuttingLevel: 4,
      icon: 'copperLumberJack.png',
      name: 'copper lumber jack',
      id: 'copper_lumberjack',
      axeId: 'copper_axe',
      required: [{
        type: 'item',
        itemId: 'copper_axe',
        icon: ITEMS['copper_axe'].icon,
        name: ITEMS['copper_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 100,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 4
      }]
    },

    tin_lumberjack: {
      requiredWoodcuttingLevel: 9,
      icon: 'tinLumberJack.png',
      name: 'tin lumber jack',
      id: 'tin_lumberjack',
      axeId: 'tin_axe',
      required: [{
        type: 'item',
        itemId: 'tin_axe',
        icon: ITEMS['tin_axe'].icon,
        name: ITEMS['tin_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 250,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 9
      }]
    },

    bronze_lumberjack: {
      requiredWoodcuttingLevel: 15,
      icon: 'bronzeLumberJack.png',
      name: 'bronze lumber jack',
      id: 'bronze_lumberjack',
      axeId: 'bronze_axe',
      required: [{
        type: 'item',
        itemId: 'bronze_axe',
        icon: ITEMS['bronze_axe'].icon,
        name: ITEMS['bronze_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 500,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 15
      }]
    },

    iron_lumberjack: {
      requiredWoodcuttingLevel: 20,
      icon: 'ironLumberJack.png',
      name: 'iron lumber jack',
      id: 'iron_lumberjack',
      axeId: 'iron_axe',
      required: [{
        type: 'item',
        itemId: 'iron_axe',
        icon: ITEMS['iron_axe'].icon,
        name: ITEMS['iron_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 2000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 20
      }]
    },

    silver_lumberjack: {
      requiredWoodcuttingLevel: 25,
      icon: 'silverLumberJack.png',
      name: 'silver lumber jack',
      id: 'silver_lumberjack',
      axeId: 'silver_axe',
      required: [{
        type: 'item',
        itemId: 'silver_axe',
        icon: ITEMS['silver_axe'].icon,
        name: ITEMS['silver_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 5000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 25
      }]
    },

    gold_lumberjack: {
      requiredWoodcuttingLevel: 30,
      icon: 'goldLumberJack.png',
      name: 'gold lumber jack',
      id: 'gold_lumberjack',
      axeId: 'gold_axe',
      required: [{
        type: 'item',
        itemId: 'gold_axe',
        icon: ITEMS['gold_axe'].icon,
        name: ITEMS['gold_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 10000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 30
      }]
    },

    carbon_lumberjack: {
      requiredWoodcuttingLevel: 35,
      icon: 'carbonLumberJack.png',
      name: 'carbon lumber jack',
      id: 'carbon_lumberjack',
      axeId: 'carbon_axe',
      required: [{
        type: 'item',
        itemId: 'carbon_axe',
        icon: ITEMS['carbon_axe'].icon,
        name: ITEMS['carbon_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 25000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 35
      }]
    },

    steel_lumberjack: {
      requiredWoodcuttingLevel: 40,
      icon: 'steelLumberJack.png',
      name: 'steel lumber jack',
      id: 'steel_lumberjack',
      axeId: 'steel_axe',
      required: [{
        type: 'item',
        itemId: 'steel_axe',
        icon: ITEMS['steel_axe'].icon,
        name: ITEMS['steel_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 50000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 40
      }]
    },

    platinum_lumberjack: {
      requiredWoodcuttingLevel: 45,
      icon: 'platinumLumberJack.png',
      name: 'platinum lumber jack',
      id: 'platinum_lumberjack',
      axeId: 'platinum_axe',
      required: [{
        type: 'item',
        itemId: 'platinum_axe',
        icon: ITEMS['platinum_axe'].icon,
        name: ITEMS['platinum_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 100000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 45
      }]
    },

    titanium_lumberjack: {
      requiredWoodcuttingLevel: 50,
      icon: 'titaniumLumberJack.png',
      name: 'titanium lumber jack',
      id: 'titanium_lumberjack',
      axeId: 'titanium_axe',
      required: [{
        type: 'item',
        itemId: 'titanium_axe',
        icon: ITEMS['titanium_axe'].icon,
        name: ITEMS['titanium_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 200000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 50
      }]
    },

    tungsten_lumberjack: {
      requiredWoodcuttingLevel: 55,
      icon: 'tungstenLumberJack.png',
      name: 'tungsten lumber jack',
      id: 'tungsten_lumberjack',
      axeId: 'tungsten_axe',
      required: [{
        type: 'item',
        itemId: 'tungsten_axe',
        icon: ITEMS['tungsten_axe'].icon,
        name: ITEMS['tungsten_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 300000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 55
      }]
    },

    obsidian_lumberjack: {
      requiredWoodcuttingLevel: 60,
      icon: 'obsidianLumberJack.png',
      name: 'obsidian lumber jack',
      id: 'obsidian_lumberjack',
      axeId: 'obsidian_axe',
      required: [{
        type: 'item',
        itemId: 'obsidian_axe',
        icon: ITEMS['obsidian_axe'].icon,
        name: ITEMS['obsidian_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 400000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 60
      }]
    },

    cobalt_lumberjack: {
      requiredWoodcuttingLevel: 65,
      icon: 'cobaltLumberJack.png',
      name: 'cobalt lumber jack',
      id: 'cobalt_lumberjack',
      axeId: 'cobalt_axe',
      required: [{
        type: 'item',
        itemId: 'cobalt_axe',
        icon: ITEMS['cobalt_axe'].icon,
        name: ITEMS['cobalt_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 500000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 65
      }]
    },

    mithril_lumberjack: {
      requiredWoodcuttingLevel: 70,
      icon: 'mithrilLumberJack.png',
      name: 'mithril lumber jack',
      id: 'mithril_lumberjack',
      axeId: 'mithril_axe',
      required: [{
        type: 'item',
        itemId: 'mithril_axe',
        icon: ITEMS['mithril_axe'].icon,
        name: ITEMS['mithril_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 600000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 70
      }]
    },

    adamantium_lumberjack: {
      requiredWoodcuttingLevel: 75,
      icon: 'adamantiumLumberJack.png',
      name: 'adamantium lumber jack',
      id: 'adamantium_lumberjack',
      axeId: 'adamantium_axe',
      required: [{
        type: 'item',
        itemId: 'adamantium_axe',
        icon: ITEMS['adamantium_axe'].icon,
        name: ITEMS['adamantium_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 700000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 75
      }]
    },

    orichalcum_lumberjack: {
      requiredWoodcuttingLevel: 80,
      icon: 'orichalcumLumberJack.png',
      name: 'orichalcum lumber jack',
      id: 'orichalcum_lumberjack',
      axeId: 'orichalcum_axe',
      required: [{
        type: 'item',
        itemId: 'orichalcum_axe',
        icon: ITEMS['orichalcum_axe'].icon,
        name: ITEMS['orichalcum_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 800000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 80
      }]
    },

    meteorite_lumberjack: {
      requiredWoodcuttingLevel: 85,
      icon: 'meteoriteLumberJack.png',
      name: 'meteorite lumber jack',
      id: 'meteorite_lumberjack',
      axeId: 'meteorite_axe',
      required: [{
        type: 'item',
        itemId: 'meteorite_axe',
        icon: ITEMS['meteorite_axe'].icon,
        name: ITEMS['meteorite_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 900000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 85
      }]
    },

    fairy_steel_lumberjack: {
      requiredWoodcuttingLevel: 90,
      icon: 'fairySteelLumberJack.png',
      name: 'fairy steel lumber jack',
      id: 'fairy_steel_lumberjack',
      axeId: 'fairy_steel_axe',
      required: [{
        type: 'item',
        itemId: 'fairy_steel_axe',
        icon: ITEMS['fairy_steel_axe'].icon,
        name: ITEMS['fairy_steel_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 1000000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 90
      }]
    },

    elven_steel_lumberjack: {
      requiredWoodcuttingLevel: 95,
      icon: 'elvenSteelLumberJack.png',
      name: 'elven steel lumber jack',
      id: 'elven_steel_lumberjack',
      axeId: 'elven_steel_axe',
      required: [{
        type: 'item',
        itemId: 'elven_steel_axe',
        icon: ITEMS['elven_steel_axe'].icon,
        name: ITEMS['elven_steel_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 1100000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 95
      }]
    },

    cursed_lumberjack: {
      requiredWoodcuttingLevel: 100,
      icon: 'cursedLumberJack.png',
      name: 'cursed lumber jack',
      id: 'cursed_lumberjack',
      axeId: 'cursed_axe',
      required: [{
        type: 'item',
        itemId: 'cursed_axe',
        icon: ITEMS['cursed_axe'].icon,
        name: ITEMS['cursed_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 1200000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 100
      }]
    },

    darksteel_lumberjack: {
      requiredWoodcuttingLevel: 105,
      icon: 'cursedLumberJack.png',
      name: 'darksteel lumber jack',
      id: 'darksteel_lumberjack',
      axeId: 'darksteel_axe',
      required: [{
        type: 'item',
        itemId: 'darksteel_axe',
        icon: ITEMS['darksteel_axe'].icon,
        name: ITEMS['darksteel_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 1300000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 105
      }]
    },

    radiant_lumberjack: {
      requiredWoodcuttingLevel: 110,
      icon: 'cursedLumberJack.png',
      name: 'radiant lumber jack',
      id: 'radiant_lumberjack',
      axeId: 'radiant_axe',
      required: [{
        type: 'item',
        itemId: 'radiant_axe',
        icon: ITEMS['radiant_axe'].icon,
        name: ITEMS['radiant_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 1400000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 110
      }]
    },

    astral_lumberjack: {
      requiredWoodcuttingLevel: 115,
      icon: 'cursedLumberJack.png',
      name: 'astral lumber jack',
      id: 'astral_lumberjack',
      axeId: 'astral_axe',
      required: [{
        type: 'item',
        itemId: 'astral_axe',
        icon: ITEMS['astral_axe'].icon,
        name: ITEMS['astral_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 1500000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 115
      }]
    },
  },

  woods: WOODS
}
