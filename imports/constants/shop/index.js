export const DONATORS_BENEFITS = {
  woodcuttingBonus: 20, // Increase woodcutting speed ( woodcutting )
  miningBonus: 20, // Decreases ore health ( mining )
  energyBonus: 20, // Increased energy regen ( combat )
  craftingBonus: 20, // Decreased crafting time ( crafting )
  inscriptionBonus: 20 // Decrease crafting time ( inscription )
};

export const SHOP_ITEMS = {
  '15_day_membership': {
    name: 'Membership (15 days)',
    cost: 5, // Cost in gems
  },

  '30_day_membership': {
    name: 'Membership (30 days)',
    cost: 10
  }
};

export const PLAYER_ICONS = {
  'default': {
    name: 'default',
    icon: 'character.svg'
  },
  'mage_t1': {
    name: 'mage T1',
    icon: 'mageT1HD.png'
  },
  'mage_t2': {
    name: 'mage T2',
    icon: 'mageT2HD.png',
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  },
  'damage_t1': {
    name: 'damage T1',
    icon: 'damageT1HD.png'
  },
  'damage_t2': {
    name: 'damage T2',
    icon: 'damageT2HD.png',
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },
  'tank_t1': {
    name: 'tank T1',
    icon: 'tankT1HD.png'
  },
  'tank_t2': {
    name: 'tank T2',
    icon: 'tankT2HD.png',
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 60
    }]
  },
  'phoenix_t1': {
    name: 'phoenix T1',
    icon: 'phoenixT1.png'
  },
  'phoenix_t2': {
    name: 'phoenix T2',
    icon: 'phoenixT2.png',
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  },
  'crow_t1': {
    name: 'crow T1',
    icon: 'crowT1.png'
  },
  'crow_t2': {
    name: 'crow T2',
    icon: 'crowT2.png',
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },
  'valla_t1': {
    name: 'valla T1',
    icon: 'vallaT1.png'
  },
  'adalgar_t1': {
    name: 'adalgar T1',
    icon: 'adalgarT1.png',
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 80
    }]
  }
};

export const getAvailablePlayerIcons = function getAvailablePlayerIcons(combatDoc) {
  if (!combatDoc) {
    return { playerIconsConsts: PLAYER_ICONS, availableIcons: [] };
  }

  let local_PLAYER_ICONS = PLAYER_ICONS;
  
  const local_bonusIcons = combatDoc.bonusIcons.map((thisIcon) => {
    if ((thisIcon.indexOf('.png') !== -1) || (thisIcon.indexOf('.jpg') !== -1)) {
      return {name: thisIcon.substring(0, thisIcon.length - 4), icon: thisIcon};
    }
    return {name: thisIcon, icon: `${thisIcon}.svg`};
  });

  local_bonusIcons.forEach((localIcon) => {
    local_PLAYER_ICONS[localIcon.name] = localIcon;
  });

  const availableIcons = ['default', 'mage_t1', 'tank_t1', 'damage_t1'].concat(combatDoc.boughtIcons).concat(local_bonusIcons.map((localIcon) => { return localIcon.name; }));

  return { playerIconsConsts: local_PLAYER_ICONS, availableIcons };
};
