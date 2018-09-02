console.log('importing floors/generators/genericTower.js FLOORS');
import { FLOORS } from '/server/constants/floors/index';
import { ENEMIES } from '/server/constants/enemies/index';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';
import { Random } from 'meteor/random';

console.log('exporting floors/generators/genericTower.js genericTowerMonsterGenerator');
export const genericTowerMonsterGenerator = function(floor, room) {

  const allMonsters = FLOORS[floor][room].enemies;
  const totalUnits = allMonsters.length;
  const newMonsters = [];

  allMonsters.forEach((selectedMonsterId) => {
    const selectedMonster = ENEMIES[selectedMonsterId];

    // 'Good Enough', for now
    const monster = {
      id: selectedMonster.id,
      icon: selectedMonster.icon,
      name: selectedMonster.name,
      buffs: JSON.parse(JSON.stringify(selectedMonster.buffs || [])),
      stats: {
        health: (room / 1.2) * 25 * floor * (1 + (floor / 3.3)) * (1 / totalUnits),
        healthMax: (room / 1.2) * 25 * floor * (1 + (floor / 3.3)) * (1 / totalUnits),
        attack: (room / 1.8) * 3.80 * floor * (1 + (floor / 3.3)),
        attackMax: (room / 1.8) * 4.75 * floor * (1 + (floor / 3.3)),
        magicPower: (room / 1.8) * 2.5 * floor * (1 + (floor / 3.3)),
        attackSpeed: 0.5 + (room / 30),
        accuracy: ((floor * 2) + (room / 4) * 6.5 * (floor * 1.1)),
        armor: (room / 2.4) * 25 * (floor / 4),
        defense: ((floor * 2) + (room / 4) * 6.5 * (floor * 1.1)),
        magicArmor: (room / 1.2) * 1.5 * floor * (1 + (floor / 3.3)),
        criticalChance: 0,
        criticalDamage: 2,
        damageTaken: 1
      },
      rewards: []
    };

    if (selectedMonster.statBuffs) {
      selectedMonster.statBuffs.forEach((statBuff) => {
        if (statBuff.type === 'plus') {
          monster.stats[statBuff.key] += statBuff.amount;
        } else if (statBuff.type === "times") {
          monster.stats[statBuff.key] *= statBuff.amount;
        }
      })
    }

    monster.stats.attackSpeedTicks = attackSpeedTicks(monster.stats.attackSpeed);

    // Is this a swarm mob?
    if (selectedMonster.swarmRange) {
      const unitCount = _.random(selectedMonster.swarmRange[0], selectedMonster.swarmRange[1]);
      // Divide monsters health
      monster.stats.health /= unitCount; // Divide health evenly
      monster.stats.health *= 1.2; // To account for aoe
      monster.stats.attack /= unitCount;
      monster.stats.attackMax /= unitCount;
      monster.stats.attack *= 1.2;
      monster.stats.attackMax *= 1.2;

      monster.stats.healthMax = monster.stats.health;
      for (let i = 0;i < unitCount; i++) {
        const monsterClone = JSON.parse(JSON.stringify(monster));
        monsterClone.id = Random.id();
        newMonsters.push(monsterClone);
      }
    } else {
      newMonsters.push(monster);
    }
  });

  return newMonsters;
};
