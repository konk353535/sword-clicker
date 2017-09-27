import { WOODCUTTING_ITEMS as woodcuttingItems } from './items';
import { ITEMS } from '/server/constants/items/index';

export const WOODCUTTING_ITEMS = woodcuttingItems;
export const WOODCUTTING = {

  suicidalFury: {
    duration: 60, // In seconds
    attackSpeedIncrease: 1250 // Percentage
  },

  baseMaxWoodcutters: 5,

  // Woodcutters inherit stats from there associated axes
  woodcutters: {
    farmer: {
      requiredWoodcuttingLevel: 1,
      icon: 'farmer.svg',
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
      icon: 'copperLumberJack.svg',
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
      icon: 'tinLumberJack.svg',
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
      icon: 'bronzeLumberJack.svg',
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
      icon: 'ironLumberJack.svg',
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
      icon: 'silverLumberJack.svg',
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
      icon: 'goldLumberJack.svg',
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
      icon: 'carbonLumberJack.svg',
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
      icon: 'steelLumberJack.svg',
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
      icon: 'platinumLumberJack.svg',
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
      icon: 'titaniumLumberJack.svg',
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
      icon: 'tungstenLumberJack.svg',
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
      icon: 'obsidianLumberJack.svg',
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
      icon: 'cobaltLumberJack.svg',
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
      icon: 'mithrilLumberJack.svg',
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
      icon: 'adamantiumLumberJack.svg',
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
      icon: 'orichalcumLumberJack.svg',
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
      icon: 'meteoriteLumberJack.svg',
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
      icon: 'fairySteelLumberJack.svg',
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
      icon: 'elvenSteelLumberJack.svg',
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
      icon: 'cursedLumberJack.svg',
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

  },

  woods: {
    pine_log: { // 1
      requiredAttack: 1,
      xp: 3,
      id: 'pine_log',
      icon: 'pineLog.svg',
      name: 'pine log',
      itemId: 'pine_log',
      chance: 0.16 // Base chance to chop this log
    },

    beech_log: { // 2
      requiredAttack: 5,
      xp: 6,
      id: 'beech_log',
      icon: 'beechLog.svg',
      name: 'beech log',
      itemId: 'beech_log',
      chance: 0.035
    },

    ash_log: { // 3
      requiredAttack: 10,
      xp: 18,
      id: 'ash_log',
      icon: 'ashLog.svg',
      name: 'ash log',
      itemId: 'ash_log',
      chance: 0.025
    },

    oak_log: { // 4
      requiredAttack: 15,
      xp: 50,
      id: 'oak_log',
      icon: 'oakLog.svg',
      name: 'oak log',
      itemId: 'oak_log',
      chance: 0.025
    },

    maple_log: { // 5
      requiredAttack: 20,
      xp: 70,
      id: 'maple_log',
      icon: 'mapleLog.svg',
      name: 'maple log',
      itemId: 'maple_log',
      chance: 0.01
    },

    walnut_log: { // 6
      requiredAttack: 25,
      xp: 90,
      id: 'walnut_log',
      icon: 'walnutLog.svg',
      name: 'walnut log',
      itemId: 'walnut_log',
      chance: 0.01
    },

    cherry_log: { // 7
      requiredAttack: 30,
      xp: 120,
      id: 'cherry_log',
      icon: 'cherryLog.svg',
      name: 'cherry log',
      itemId: 'cherry_log',
      chance: 0.01
    },

    mahogany_log: { // 8
      requiredAttack: 35,
      xp: 120,
      id: 'mahogany_log',
      icon: 'mahoganyLog.svg',
      name: 'mahogany log',
      itemId: 'mahogany_log',
      chance: 0.01
    },

    elk_log: { // 9
      requiredAttack: 40,
      xp: 180,
      id: 'elk_log',
      icon: 'elkLog.svg',
      name: 'elk log',
      itemId: 'elk_log',
      chance: 0.01
    },

    black_log: { // 10
      requiredAttack: 45,
      xp: 220,
      id: 'black_log',
      icon: 'blackLog.svg',
      name: 'black log',
      itemId: 'black_log',
      chance: 0.01
    },

    blue_gum_log: { // 11
      requiredAttack: 50,
      xp: 260,
      id: 'blue_gum_log',
      icon: 'blueGumLog.svg',
      name: 'blue_gum log',
      itemId: 'blue_gum_log',
      chance: 0.01
    },

    cedar_log: { // 12
      requiredAttack: 55,
      xp: 300,
      id: 'cedar_log',
      icon: 'cedarLog.svg',
      name: 'cedar log',
      itemId: 'cedar_log',
      chance: 0.01
    },

    denya_log: { // 13
      requiredAttack: 60,
      xp: 340,
      id: 'denya_log',
      icon: 'denyaLog.svg',
      name: 'denya log',
      itemId: 'denya_log',
      chance: 0.01
    },

    gombe_log: { // 14
      requiredAttack: 65,
      xp: 380,
      id: 'gombe_log',
      icon: 'gombeLog.svg',
      name: 'gombe log',
      itemId: 'gombe_log',
      chance: 0.01
    },

    hickory_log: { // 15
      requiredAttack: 70,
      xp: 420,
      id: 'hickory_log',
      icon: 'hickoryLog.svg',
      name: 'hickory log',
      itemId: 'hickory_log',
      chance: 0.01
    },

    larch_log: { // 16
      requiredAttack: 75,
      xp: 480,
      id: 'larch_log',
      icon: 'larchLog.svg',
      name: 'larch log',
      itemId: 'larch_log',
      chance: 0.01
    },

    poplar_log: { // 17
      requiredAttack: 80,
      xp: 520,
      id: 'poplar_log',
      icon: 'poplarLog.svg',
      name: 'poplar log',
      itemId: 'poplar_log',
      chance: 0.01
    },

    tali_log: { // 18
      requiredAttack: 85,
      xp: 560,
      id: 'tali_log',
      icon: 'taliLog.svg',
      name: 'tali log',
      itemId: 'tali_log',
      chance: 0.01
    },

    willow_log: { // 19
      requiredAttack: 90,
      xp: 600,
      id: 'willow_log',
      icon: 'willowLog.svg',
      name: 'willow log',
      itemId: 'willow_log',
      chance: 0.01
    },

    teak_log: { // 20
      requiredAttack: 95,
      xp: 620,
      id: 'teak_log',
      icon: 'teakLog.svg',
      name: 'teak log',
      itemId: 'teak_log',
      chance: 0.01
    },

    fiery_log: { // 21
      requiredAttack: 100,
      xp: 640,
      id: 'fiery_log',
      icon: 'fieryLog.svg',
      name: 'fiery log',
      itemId: 'fiery_log',
      chance: 0.01
    },

    magic_log: { // 22
      requiredAttack: 105,
      xp: 690,
      id: 'magic_log',
      icon: 'magicLog.svg',
      name: 'magic log',
      itemId: 'magic_log',
      chance: 0.01
    },

  }
}
