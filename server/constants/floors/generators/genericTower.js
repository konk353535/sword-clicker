import { FLOORS } from '/server/constants/floors/index';
import { ENEMIES } from '/server/constants/enemies/index';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';

export const genericTowerMonsterGenerator = function(floor, room) {

  const possibleMonsters = FLOORS[floor][room].enemies;
  const selectedMonsterId = _.sample(possibleMonsters);
  const selectedMonster = ENEMIES[selectedMonsterId];

  // 'Good Enough', for now
  const monster = {
    id: selectedMonster.id,
    icon: selectedMonster.icon,
    name: selectedMonster.name,
    buffs: selectedMonster.buffs || [],
    stats: {
      health: (room / 1.2) * 25 * floor * (1 + (floor / 3)),
      healthMax: (room / 1.2) * 25 * floor * (1 + (floor / 3)),
      attack: (room / 1.2) * 3 * floor * (1 + (floor / 3)),
      attackMax: (room / 1.2) * 4 * floor * (1 + (floor / 3)),
      attackSpeed: 0.5,
      accuracy: (room / 1.2) * 3 * floor * (1 + (floor / 3)),
      armor: (room / 1.2) * 30 * (floor / 4),
      defense: (room / 1.2) * 2 * floor * (1 + (floor / 3)),
      magicArmor: (room / 1.2) * 1.5 * floor * (1 + (floor / 3)),
      damageTaken: 1
    },
    rewards: []
  }

  if (selectedMonster.statBuffs) {
    selectedMonster.statBuffs.forEach((statBuff) => {
      if (statBuff.type === 'plus') {
        monster.stats[statBuff.key] += statBuff.amount
      } else if (statBuff.type === "times") {
        monster.stats[statBuff.key] *= statBuff.amount        
      }
    })
  }

  monster.stats.attackSpeedTicks = attackSpeedTicks(monster.stats.attackSpeed);

  // Is this a swarm mob?
  if (selectedMonster.swarmRange) {
    const unitCount = _.random(selectedMonster.swarmRange[0], selectedMonster.swarmRange[1]);
    // Divide monsters health
    monster.stats.health /= unitCount; // Divide health evenly
    monster.stats.health *= 1.3; // To account for aoe
    monster.stats.healthMax = monster.stats.health;
    const allMonsters = [];
    for (let i = 0;i < unitCount; i++) {
      allMonsters.push(JSON.parse(JSON.stringify(monster)));
    }

    return allMonsters;
  }

  return [monster];
}
