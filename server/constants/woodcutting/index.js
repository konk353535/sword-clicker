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
      icon: 'farmer',
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

    wise_farmer: {
      requiredWoodcuttingLevel: 3,
      icon: 'wiseFarmer',
      name: 'wise farmer',
      id: 'wise_farmer',
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
        amount: 75,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 3
      }]
    },

    wise_man: {
      requiredWoodcuttingLevel: 6,
      icon: 'wiseMan',
      name: 'wise man',
      id: 'wise_man',
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
        amount: 200,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 6
      }]
    },

    muscle_man: {
      requiredWoodcuttingLevel: 9,
      icon: 'muscleMan',
      name: 'Muscle Man',
      id: 'muscle_man',
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
        amount: 1000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 9
      }]
    },

    novice_lumber_jack: {
      requiredWoodcuttingLevel: 12,
      icon: 'noviceLumberJack',
      name: 'novice lumberjack',
      id: 'novice_lumber_jack',
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
        amount: 3000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 12
      }]
    },

    lumber_jack: {
      requiredWoodcuttingLevel: 15,
      icon: 'lumberJackMithril',
      name: 'lumberjack',
      id: 'lumber_jack',
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
        amount: 10000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 15
      }]
    },

    lumber_jack_expert: {
      requiredWoodcuttingLevel: 20,
      icon: 'lumberJackAdamantium',
      name: 'lumberjack expert',
      id: 'lumber_jack_expert',
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
        amount: 25000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 20
      }]
    },

    lumber_jack_champion: {
      requiredWoodcuttingLevel: 25,
      icon: 'lumberJackOrichalcum',
      name: 'lumberjack champion',
      id: 'lumber_jack_champion',
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
        amount: 50000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 25
      }]
    },

    lumber_jack_legend: {
      requiredWoodcuttingLevel: 30,
      icon: 'lumberJackCobalt',
      name: 'lumberjack legend',
      id: 'lumber_jack_legend',
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
        amount: 75000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 30
      }]
    },

    lumber_jack_hero: {
      requiredWoodcuttingLevel: 35,
      icon: 'lumberJackFairySteel',
      name: 'lumberjack hero',
      id: 'lumber_jack_hero',
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
        amount: 100000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 35
      }]
    },

    lumber_jack_pack: {
      requiredWoodcuttingLevel: 40,
      icon: 'lumberJackCursed',
      name: 'lumberjack pack',
      id: 'lumber_jack_pack',
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
        amount: 150000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 40
      }]
    }
  },

  woods: {
    pine_log: { // 1
      requiredAttack: 1,
      xp: 3,
      id: 'pine_log',
      icon: 'pineLog',
      name: 'pine log',
      itemId: 'pine_log',
      chance: 0.16 // Base chance to chop this log
    },

    beech_log: { // 2
      requiredAttack: 5,
      xp: 5,
      id: 'beech_log',
      icon: 'beechLog',
      name: 'beech log',
      itemId: 'beech_log',
      chance: 0.035
    },

    ash_log: { // 3
      requiredAttack: 10,
      xp: 15,
      id: 'ash_log',
      icon: 'ashLog',
      name: 'ash log',
      itemId: 'ash_log',
      chance: 0.025
    },

    oak_log: { // 4
      requiredAttack: 15,
      xp: 45,
      id: 'oak_log',
      icon: 'oakLog',
      name: 'oak log',
      itemId: 'oak_log',
      chance: 0.025
    },

    maple_log: { // 5
      requiredAttack: 20,
      xp: 45,
      id: 'maple_log',
      icon: 'mapleLog',
      name: 'maple log',
      itemId: 'maple_log',
      chance: 0.01
    },

    walnut_log: { // 6
      requiredAttack: 25,
      xp: 90,
      id: 'walnut_log',
      icon: 'walnutLog',
      name: 'walnut log',
      itemId: 'walnut_log',
      chance: 0.01
    },

    cherry_log: { // 7
      requiredAttack: 30,
      xp: 120,
      id: 'cherry_log',
      icon: 'cherryLog',
      name: 'cherry log',
      itemId: 'cherry_log',
      chance: 0.01
    },

    mahogany_log: { // 8
      requiredAttack: 35,
      xp: 120,
      id: 'mahogany_log',
      icon: 'mahoganyLog',
      name: 'mahogany log',
      itemId: 'mahogany_log',
      chance: 0.01
    },

    elk_log: { // 9
      requiredAttack: 40,
      xp: 180,
      id: 'elk_log',
      icon: 'elkLog',
      name: 'elk log',
      itemId: 'elk_log',
      chance: 0.01
    },

    black_log: { // 10
      requiredAttack: 45,
      xp: 220,
      id: 'black_log',
      icon: 'blackLog',
      name: 'black log',
      itemId: 'black_log',
      chance: 0.01
    },

    blue_gum_log: { // 11
      requiredAttack: 50,
      xp: 260,
      id: 'blue_gum_log',
      icon: 'blueGumLog',
      name: 'blue_gum log',
      itemId: 'blue_gum_log',
      chance: 0.01
    },

    cedar_log: { // 12
      requiredAttack: 55,
      xp: 300,
      id: 'cedar_log',
      icon: 'cedarLog',
      name: 'cedar log',
      itemId: 'cedar_log',
      chance: 0.01
    },

    denya_log: { // 13
      requiredAttack: 60,
      xp: 340,
      id: 'denya_log',
      icon: 'denyaLog',
      name: 'denya log',
      itemId: 'denya_log',
      chance: 0.01
    },

    gombe_log: { // 14
      requiredAttack: 65,
      xp: 380,
      id: 'gombe_log',
      icon: 'gombeLog',
      name: 'gombe log',
      itemId: 'gombe_log',
      chance: 0.01
    },

    hickory_log: { // 15
      requiredAttack: 70,
      xp: 420,
      id: 'hickory_log',
      icon: 'hickoryLog',
      name: 'hickory log',
      itemId: 'hickory_log',
      chance: 0.01
    },

    larch_log: { // 16
      requiredAttack: 75,
      xp: 480,
      id: 'larch_log',
      icon: 'larchLog',
      name: 'larch log',
      itemId: 'larch_log',
      chance: 0.01
    },

    poplar_log: { // 17
      requiredAttack: 80,
      xp: 520,
      id: 'poplar_log',
      icon: 'poplarLog',
      name: 'poplar log',
      itemId: 'poplar_log',
      chance: 0.01
    },

    tali_log: { // 18
      requiredAttack: 85,
      xp: 560,
      id: 'tali_log',
      icon: 'taliLog',
      name: 'tali log',
      itemId: 'tali_log',
      chance: 0.01
    },

    willow_log: { // 19
      requiredAttack: 90,
      xp: 600,
      id: 'willow_log',
      icon: 'willowLog',
      name: 'willow log',
      itemId: 'willow_log',
      chance: 0.01
    },

    teak_log: { // 20
      requiredAttack: 95,
      xp: 620,
      id: 'teak_log',
      icon: 'teakLog',
      name: 'teak log',
      itemId: 'teak_log',
      chance: 0.01
    },

    fiery_log: { // 21
      requiredAttack: 100,
      xp: 640,
      id: 'fiery_log',
      icon: 'fieryLog',
      name: 'fiery log',
      itemId: 'fiery_log',
      chance: 0.01
    },

    magic_log: { // 22
      requiredAttack: 105,
      xp: 690,
      id: 'magic_log',
      icon: 'magicLog',
      name: 'magic log',
      itemId: 'magic_log',
      chance: 0.01
    },

  }
}
