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
    stats: {
      health: room * 25 * floor,
      healthMax: room * 25 * floor,
      attack: room * 3 * floor,
      attackMax: room * 4 * floor,
      attackSpeed: 0.5,
      accuracy: room * 3 * floor,
      armor: room * 30 * (floor / 4),
      defense: room * 2 * floor,
      magicArmor: room * 1.5 * floor,
      damageTaken: 1
    },
    rewards: []
  }

  monster.stats.attackSpeedTicks = attackSpeedTicks(monster.stats.attackSpeed);

  return [monster];
}
