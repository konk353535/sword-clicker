// need / greed matchers can be added here
// keys are used for friendly identification, values are a function that returns true / false given a string input
export const NEED_GREED_ITEMS = {
  pickaxe: (str) => {
    return RegExp('pickaxe', 'g').test(str)
  },
  axe: (str) => {
    return RegExp('(?!pick)axe', 'g').test(str)
  },
  idol: (str) => {
    return RegExp('dwarven_idol', 'g').test(str)
  },
  horned_helmet: (str) => {
    return RegExp('horned_helmet', 'g').test(str)
  },
  scimitar: (str) => {
    return RegExp('scimitar', 'g').test(str)
  },
  rapier: (str) => {
    return RegExp('rapier', 'g').test(str)
  },
  broad_sword: (str) => {
    return RegExp('broad_sword', 'g').test(str)
  },
  wizard: (str) => {
    return RegExp('wizard', 'g').test(str)
  },
  druid: (str) => {
    return RegExp('druid', 'g').test(str)
  },
  buckler: (str) => {
    return RegExp('buckler', 'g').test(str)
  },
  kite_shield: (str) => {
    return RegExp('kite_shield', 'g').test(str)
  },
  hammer: (str) => {
    return RegExp('(?!mining_)hammer', 'g').test(str)
  },
  wand: (str) => {
    return RegExp('wand', 'g').test(str)
  },
  tome: (str) => {
    return RegExp('tome', 'g').test(str)
  },
  mining_hammer: (str) => {
    return RegExp('mining_hammer', 'g').test(str)
  },
  boss_items: (str) => {
    // tomes are already need greed, as is druid
    return RegExp('shark_tooth_amulet|snake_skin_chest|bone_kings_axe|spartan_spear|gold_crown_scroll|oversized_club|phoenix_hat|thors_skull|demons_heart|shadow_knife|smoke_dagger|living_helmet|bloody_plate_legs|frankensteins_heart|rich_snake_skin|krakens_tentacle|bison_axe|baby_fox', 'g').test(str)
  },
  crafting_scrolls: (str) => {
    // tomes are already need greed, as is druid
    return RegExp('darksteel|radiant|astral', 'g').test(str)
  },
  herbs: (str) => {
    return RegExp('garlic|sorrell|lemon_grass', 'g').test(str)
  },
  mp_shields: (str) => {
    return RegExp('opal_chestplate|spirit_shield', 'g').test(str)
  },
  knives: (str) => {
    return RegExp('knife', 'g').test(str)
  },
  dwarven: (str) => {
    return RegExp('dwarven_staff', 'g').test(str)
  }
};
