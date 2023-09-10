import { ADAMANTIUM_ITEMS } from "./items/adamantium"
import { ASTRAL_ITEMS } from "./items/astral"
import { BRONZE_ITEMS } from "./items/bronze"
import { CARBON_ITEMS } from "./items/carbon"
import { COBALT_ITEMS } from "./items/cobalt"
import { COPPER_ITEMS } from "./items/copper"
import { CURSED_ITEMS } from "./items/cursed"
import { DARKSTEEL_ITEMS } from "./items/darksteel"
import { ELVEN_STEEL_ITEMS } from "./items/elven_steel"
import { ETERNIUM_ITEMS } from "./items/eternium"
import { FAIRY_STEEL_ITEMS } from "./items/fairy_steel"
import { GOLD_ITEMS } from "./items/gold"
import { IRON_ITEMS } from "./items/iron"
import { METEORITE_ITEMS } from "./items/meteorite"
import { MITHRIL_ITEMS } from "./items/mithril"
import { OBSIDIAN_ITEMS } from "./items/obsidian"
import { ORICHALCUM_ITEMS } from "./items/orichalcum"
import { PLATINUM_ITEMS } from "./items/platinum"
import { PRISMATIC_ITEMS } from "./items/prismatic"
import { RADIANT_ITEMS } from "./items/radiant"
import { RELICROCK_ITEMS } from "./items/relicrock"
import { SILVER_ITEMS } from "./items/silver"
import { STEEL_ITEMS } from "./items/steel"
import { TIN_ITEMS } from "./items/tin"
import { TITANFOIL_ITEMS } from "./items/titanfoil"
import { TITANIUM_ITEMS } from "./items/titanium"
import { TUNGSTEN_ITEMS } from "./items/tungsten"

import { AMULET_ITEMS } from "./items/amulet"
import { ARCHER_ITEMS } from "./items/archer"
import { MISC_ITEMS } from "./items/misc"
import { STAFF_ITEMS } from "./items/staff"
import { WIZARD_ITEMS } from "./items/wizard"

console.log("exporting combat/items.js COMBAT_ITEMS")
export const COMBAT_ITEMS = Object.assign(
    COPPER_ITEMS,
    TIN_ITEMS,
    BRONZE_ITEMS,
    IRON_ITEMS,
    SILVER_ITEMS,
    GOLD_ITEMS,
    CARBON_ITEMS,
    STEEL_ITEMS,
    PLATINUM_ITEMS,
    TITANIUM_ITEMS,
    TUNGSTEN_ITEMS,
    OBSIDIAN_ITEMS,
    COBALT_ITEMS,
    MITHRIL_ITEMS,
    ADAMANTIUM_ITEMS,
    ORICHALCUM_ITEMS,
    METEORITE_ITEMS,
    FAIRY_STEEL_ITEMS,
    ELVEN_STEEL_ITEMS,
    CURSED_ITEMS,
    DARKSTEEL_ITEMS,
    RADIANT_ITEMS,
    ASTRAL_ITEMS,
    TITANFOIL_ITEMS,
    RELICROCK_ITEMS,
    ETERNIUM_ITEMS,
    PRISMATIC_ITEMS,
    MISC_ITEMS,
    AMULET_ITEMS,
    STAFF_ITEMS,
    WIZARD_ITEMS,
    ARCHER_ITEMS
)
