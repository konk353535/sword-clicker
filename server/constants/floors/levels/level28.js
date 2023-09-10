import { orderLootTable } from "../../enemies/lootTables/index.js"

export const LEVEL_TWENTY_EIGHT_MONSTERS = [
    {
        id: "wolf",
        icon: "wolf.svg",
        name: "wolf"
    },
    {
        id: "beaver",
        icon: "beaver.svg",
        name: "beaver"
    },
    {
        id: "eagle",
        icon: "eagle.svg",
        name: "eagle"
    },
    {
        id: "kangaroo",
        icon: "kangaroo.svg",
        name: "kangaroo"
    },
    {
        id: "jellyFish",
        icon: "jellyFish.svg",
        name: "jellyfish",
        buffs: [
            {
                id: "poisoned_blade",
                data: {
                    level: 1,
                    icon: "poisonedBlade.svg",
                    name: "poisoned blade"
                }
            }
        ]
    }
]

export const LEVEL_TWENTY_EIGHT_LOOT_TABLE = orderLootTable([])
