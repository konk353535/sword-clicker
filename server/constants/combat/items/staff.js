import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const STAFF_ITEMS = {
  beech_staff: {
    id: 'beech_staff',
    icon: 'beechStaff',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'beech staff',
    sellPrice: 100,
    description: 'What seems like a normal staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: SLOW_SPEED,
      accuracy: 5,
      magicPower: 10
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 1
    }]
  }
}
