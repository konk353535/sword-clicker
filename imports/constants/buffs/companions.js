import moment from 'moment';
import { addBuff, removeBuff } from '../../battleUtils';
import { CDbl } from '../../utils.js';
import { BUFFS } from './index.js';
import lodash from 'lodash';
import _ from 'underscore';
import uuid from 'node-uuid';

// combat node/server doesn't have access to database or schema
//import { Users } from '/imports/api/users/users';
//import { Groups } from '/imports/api/groups/groups';
//import { Chats } from 'meteor/cesarve:simple-chat/collections';

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

export const getCompanionOwner = function getCompanionOwner(companion) {
  let owner_id = companion.id;
  if (companion.isCompanion) {
    try {
      if (companion.owner.endsWith("_companion")) {
        owner_id = companion.owner.substring(0, companion.owner.length - 10);
      }
    } catch (err) {
    }
  }
  return owner_id;
};

export const notifyChangeForUnitProperty = function notifyChangeForUnitProperty({unit, property, actualBattle}) {
  try {
    const event = {
      type: 'abs',
      path: `unitsMap.${unit.id}.${property}`,
      value: unit[property]
    };

    actualBattle.deltaEvents.push(event);
  } catch (err) {
  }
};

export const companionEvent = function companionEvent({ actualBattle, companion, target, info, color }) {
  if (actualBattle.tickEvents) {
    try {
      target = target || companion;
      actualBattle.tickEvents.push({from: companion.id, to: target.id, eventType: 'special', label: info, customColor: color, customIcon: 'noicon'});
    } catch (err) {
    }
  }
};

// combat node/server doesn't have access to database or schema
/*
export const companionChat = function companionChat({ companion, message }) {
  try {
    const companionOwner = getCompanionOwner(companion);
    const userDoc = Users.findOne({ _id: companionOwner });
    
    if (!userDoc) {
      return;
    }
    
    const playerGroupDoc = Groups.findOne({ members: companionOwner });
    
    if (playerGroupDoc) {    
      Chats.insert({
        message,
        username: companion.name,
        name: companion.name,
        date: new Date(),
        custom: {
          roomType: 'Party'
        },
        roomId: `${playerGroupDoc._id}-${userDoc.server}`
      });
    } else {
      Chats.insert({
        message,
        username: companion.name,
        name: companion.name,
        date: new Date(),
        custom: {
          roomType: 'Game'
        },
        roomId: `Game-${companionOwner}`
      });
    }
  } catch (err) {
  }
};
*/

const maxTableAndGridSize = 550;

const skillLevel = function skillLevel(playerSkills, skillName) {
  try {
    const userSkillLevel = playerSkills.filter((skill) => {
      return (skill.type.toLowerCase() === skillName.toLowerCase())
    });
    if ((userSkillLevel) && (userSkillLevel.length === 1) && (userSkillLevel[0].level > 0)) {
      return userSkillLevel[0].level;
    }
  } catch (err) {
  }
  return 1;
};

const companionStatsHTML = function companionStatsHTML({buff, level, floor, playerSkills}) {
  try {
    let descText = "<br />";
    
    if (floor) {      
      const flexCellSize = Math.floor(maxTableAndGridSize / 4) - 40;
      
      descText += `<div class="mb-3">`;
      descText += `<div class="d-flex flex-wrap justify-content-between mb-2" style="max-width: ${maxTableAndGridSize}px">`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center attack.svg-tooltip-container"><img src="/icons/attack.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${buff.constants.attack({level, towerFloor: floor, attackSkill: skillLevel(playerSkills, 'attack')})} - ${buff.constants.attackMax({level, towerFloor: floor, attackSkill: skillLevel(playerSkills, 'attack')})}</div></div>`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center attackSpeed.svg-tooltip-container"><img src="/icons/attackSpeed.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${buff.constants.attackSpeed({level})}</div></div>`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center magicPower.svg-tooltip-container"><img src="/icons/magicPower.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${buff.constants.magicPower({level, towerFloor: floor, magicSkill: skillLevel(playerSkills, 'magic')})}</div></div>`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center accuracy.svg-tooltip-container"><img src="/icons/accuracy.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${buff.constants.accuracy({level, towerFloor: floor, attackSkill: skillLevel(playerSkills, 'attack')})}</div></div>`;
      descText += `</div>`;
      descText += `<div class="d-flex flex-wrap justify-content-between mb-2" style="max-width: ${maxTableAndGridSize}px">`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center health.svg-tooltip-container"><img src="/icons/health.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${buff.constants.healthMax({level, towerFloor: floor, healthSkill: skillLevel(playerSkills, 'health')}).toLocaleString()}</div></div>`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center defense.svg-tooltip-container"><img src="/icons/defense.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${buff.constants.defense({level, towerFloor: floor, defenseSkill: skillLevel(playerSkills, 'defense')})}</div></div>`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center armor.svg-tooltip-container"><img src="/icons/armor.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${buff.constants.armor({level, towerFloor: floor, defenseSkill: skillLevel(playerSkills, 'armor')}).toLocaleString()}</div></div>`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center magicArmor.svg-tooltip-container"><img src="/icons/magicArmor.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${buff.constants.magicArmor({level, towerFloor: floor, magicSkill: skillLevel(playerSkills, 'magic'), defenseSkill: skillLevel(playerSkills, 'defense')}).toLocaleString()}</div></div>`;
      descText += `</div>`;
      descText += `<div class="d-flex flex-wrap justify-content-between mb-2" style="max-width: ${maxTableAndGridSize}px">`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center healingPower.svg-tooltip-container"><img src="/icons/healingPower.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">+${buff.constants.healingPower({level})}%</div></div>`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center heartDrop.svg-tooltip-container"><img src="/icons/heartDrop.svg" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px">${100*(1-buff.constants.damageTaken({level}))}%</div></div>`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center invis.gif-tooltip-container"><img src="/icons/invis.gif" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px"></div></div>`;
      descText += `<div class="d-flex flex-row mr-1"><div class="d-flex align-items-center invis.gif-tooltip-container"><img src="/icons/invis.gif" class="extra-small-icon"></div><div class="d-flex align-items-center ml-1" style="width: ${flexCellSize}px; max-width: ${flexCellSize}px"></div></div>`;
      descText += `</div>`;
      descText += `(stats based on your skills, tome level ${level}, and tower floor ${floor})<br />`;
    } else {
      descText += "(stats vary on which floor you bring the cupid to)<br />";
    }
    return descText;
  } catch (err) {
  }

  return "";
}

export const COMPANION_BUFFS = {
  baby_fox_ability: {
    duplicateTag: 'baby_fox_ability',
    icon: 'babyFox.svg',
    name: 'baby fox',
    description() {
      return `Summons a baby fox`;
    },
    constants: {
    },
    data: {
      hideBuff: true
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          buff.data.isSpawned = true;
          buff.data.hideBuff = true;
          // Spawn our fox
          const foxToSpawn = lodash.sample(['fire', 'water', 'air', 'earth']);
          let fox = {
            owner: target.id + '_companion',
            id: uuid.v4(),
            tickOffset: 0,
            isNPC: true,
            isCompanion: true,
          };

          if (foxToSpawn === 'fire') {
            fox.icon = 'babyFireFox.svg';
            fox.name = 'Fire fox';
            fox.stats = {
              attack: 1,
              attackMax: 1,
              attackSpeed: 1,
              accuracy: 1,
              health: target.stats.healthMax * 0.5,
              healthMax: target.stats.healthMax * 0.5,
              defense: target.stats.defense,
              armor: target.stats.armor,
              magicArmor: target.stats.magicArmor * 0.5,
              magicPower: target.stats.magicPower,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_fire_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby fire fox',
                timeTillCharge: 5,
                icon: 'babyFireFox.svg',
                hideBuff: true
              }
            }]
          } else if (foxToSpawn === 'earth') {
            fox.icon = 'babyEarthFox.svg';
            fox.name = 'Earth fox';
            fox.stats = {
              attack: target.stats.attackMax * 0.05,
              attackMax: target.stats.attackMax * 0.05,
              attackSpeed: 0.5,
              accuracy: target.stats.accuracy * 0.5,
              health: target.stats.healthMax * 0.5,
              healthMax: target.stats.healthMax * 0.5,
              defense: target.stats.defense,
              armor: target.stats.armor,
              magicArmor: target.stats.magicArmor,
              magicPower: target.stats.magicPower * 0.5,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_earth_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby earth fox',
                timeTillCharge: 2,
                icon: 'babyEarthFox.svg',
                hideBuff: true
              }
            }]
          } else if (foxToSpawn === 'air') {
            fox.icon = 'babyAirFox.svg';
            fox.name = 'Air fox';
            fox.stats = {
              attack: target.stats.attackMax * 0.1,
              attackMax: target.stats.attackMax * 0.1,
              attackSpeed: 1,
              accuracy: target.stats.accuracy,
              health: target.stats.healthMax * 0.5,
              healthMax: target.stats.healthMax * 0.5,
              defense: target.stats.defense,
              armor: target.stats.armor,
              magicArmor: target.stats.magicArmor * 0.6,
              magicPower: target.stats.magicPower * 0.6,
              damageTaken: 1
            };
            fox.buffs = [];
          } else if (foxToSpawn === 'water') {
            fox.icon = 'babyWaterFox.svg';
            fox.name = 'Water fox';
            fox.stats = {
              attack: 1,
              attackMax: 1,
              attackSpeed: 0.001,
              accuracy: 1,
              health: target.stats.healthMax * 0.5,
              healthMax: target.stats.healthMax * 0.5,
              defense: target.stats.defense,
              armor: target.stats.armor,
              magicArmor: target.stats.magicArmor * 0.5,
              magicPower: target.stats.magicPower,
              healingPower: target.stats.healingPower,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_water_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby water fox',
                icon: 'babyWaterFox.svg',
                timeTillCharge: 5,
                hideBuff: true                
              }
            }]
          }

          actualBattle.addUnit(fox);
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },
  
  debug_enemy: {
    duplicateTag: 'debug_enemy',
    icon: 'cat.svg',
    name: 'debug enemy',
    description({ buff, level }) {
      return 'Debug ability to spawn enemy units.';
    },
    constants: {
    },
    data: {
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          buff.data.isSpawned = true;

          let enemy = {
            id: uuid.v4(),
            tickOffset: 0,
            isEnemy: true,
            icon: 'high_angel.svg',
            name: 'Boss High Angel',
            stats: {
              attack: 150,
              attackMax: 250,
              attackSpeed: 0.5,
              accuracy: 600,
              health: 5500,
              healthMax: 5500,
              defense: 225,
              armor: 650,
              magicArmor: 150,
              damageTaken: 1
            },
            buffs: [],
          };
          
          enemy.buffs = enemy.buffs.concat([{
            id: 'boss_high_angel',
            data: {
              duration: Infinity,
              totalDuration: Infinity,
              name: 'boss high angel',
              icon: 'resurrection.svg',              
              stacks: 0,
              timeTillResurrection: 5,
            }
          }, {
            id: 'angels_heart',
            data: {
              duration: Infinity,
              totalDuration: Infinity,
              name: 'angels heart',
              icon: 'angels_heart.svg',              
              level: 5,
              allies: 'enemies',
            }
          }]);
          
          /* enemy.buffs = enemy.buffs.concat([
            lodash.cloneDeep(BUFFS['boss_high_angel']),
            lodash.cloneDeep(BUFFS['angels_heart'])
          ]); */
            
          actualBattle.addUnit(enemy);
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },
  
  // Level 1: can auto-attack (speed 0.8) and can use Slash (with 10s CD) at level 1
  // Level 2: can Penetrating Slash at level 1 (with 10s CD) and upgrades Slash to level 2
  // Level 3: can use Bleed at level 1 (with 30s CD) and upgrades Penetrating Slash to level 2
  // Level 4: has Phantom Strikes 1 passive and upgrades Bleed to level 2 and Slash to level 3
  // Level 5: has Thirsty Fangs 1 passive and upgrades Phantom Strikes to level 2 and Penetrating slash to level 3
  // All levels:  gain attack damage, accuracy, and health for each level
  skeletal_warrior: {
    duplicateTag: 'skeletal_warrior',
    icon: 'boneWarrior.svg',
    name: 'skeletal warrior',
    description({ buff, level, playerSkills, floor }) {
      let descText = '';
      
      descText += 'Summons a skeletal warrior to assist in tower combat. <br />';
      descText += '<br />';
      
      descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
      descText += `  <tr>`;
      descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`;
      descText += `    <td valign="top"><b>physical damage</b></td>`;
      descText += `  </tr>`;
      
      if (level === 1) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Slash Lv. 1</b></td>`;
        descText += `  </tr>`;
      } else if (level === 2) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Penetrating Slash Lv. 1</b>, <b>Slash Lv. 2</b></td>`;
        descText += `  </tr>`;
      } else if (level === 3) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Bleed Lv. 1</b>, <b>Penetrating Slash Lv. 2</b>, <b>Slash Lv. 2</b></td>`;
        descText += `  </tr>`;
      } else if (level === 4) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Bleed Lv. 2</b>, <b>Penetrating Slash Lv. 2</b>, <b>Phantom Strikes Lv. 1</b>, <b>Slash Lv. 3</b></td>`;
        descText += `  </tr>`;
      } else if (level === 5) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Bleed Lv. 2</b>, <b>Penetrating Slash Lv. 3</b>, <b>Phantom Strikes Lv. 2</b>, <b>Slash Lv. 3</b>, <b>Thirsty Fangs Lv. 1</b></td>`;
        descText += `  </tr>`;
      }
      
      descText += `</table>`

      if (floor && playerSkills) {
        descText += companionStatsHTML({buff, level, floor, playerSkills});
      }

      return descText;
    },
    constants: {
      accuracy: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor / 1.85) + (35 * level));
      },
      attack: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 5) * minTowerFloor / 3.5) + (13 * level));
      },
      attackMax: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 5) * minTowerFloor / 2.5) + (40 * level));
      },
      attackSpeed: function({level}) {
        return 0.55 + (0.05 * level);
      },
      healthMax: function({level, towerFloor, healthSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(healthSkill * 3) * minTowerFloor * 6.5) + (100 * level));
      },
      defense: function({level, towerFloor, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor / 3) + (3 * level));
      },
      armor: function({level, towerFloor, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor / 2.5) + (5 * level));
      },
      magicArmor: function({level, towerFloor, magicSkill, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(magicSkill * 2) * minTowerFloor / 5) + (Math.sqrt(defenseSkill * 2) * minTowerFloor / 5) + (2 * level));
      },
      magicPower: function({level, towerFloor, magicSkill}) {
        return magicSkill;
      },
      damageTaken: function({level}) {
        return 1;
      },
      healingPower: function({level}) {
        return 5 + (3 * level);
      },
    },
    data: {
      //hideBuff: true
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          const buffConsts = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
          buff.data.isSpawned = true;
          //buff.data.hideBuff = true;

          // ** OLD **
          // this companion won't help in personal quests
          // this companion won't help in battle with other solo companions
          //if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {

          // ** NEW **
          // this companion won't help in personal quests
          // this companion won't help in battle if the unit roster is full
          if ((actualBattle.isTower()) && (actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5)) {            
            const attackSkill = target.attackSkill();
            const defenseSkill = target.defenseSkill();
            const magicSkill = target.magicSkill();
            const healthSkill = target.healthSkill();
            
            let companion = {
              owner: target.id + '_companion',
              id: uuid.v4(),
              tickOffset: 0,
              isNPC: true,
              isCompanion: true,
              isSoloCompanion: true,
              icon: 'boneWarrior.svg',
              name: target.name + '\'s warrior',
              stats: {
                attack: buffConsts.attack({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                attackMax: buffConsts.attackMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                attackSpeed: buffConsts.attackSpeed({level: buff.data.level}),
                accuracy: buffConsts.accuracy({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                health: buffConsts.healthMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), healthSkill}),
                healthMax: buffConsts.healthMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), healthSkill}),
                defense: buffConsts.defense({level: buff.data.level, towerFloor: actualBattle.towerFloor(), defenseSkill}),
                armor: buffConsts.armor({level: buff.data.level, towerFloor: actualBattle.towerFloor(), defenseSkill}),
                magicArmor: buffConsts.magicArmor({level: buff.data.level, towerFloor: actualBattle.towerFloor(), magicSkill, defenseSkill}),
                magicPower: buffConsts.magicPower({level: buff.data.level, towerFloor: actualBattle.towerFloor(), magicSkill}),
                damageTaken: buffConsts.damageTaken({level: buff.data.level}),
                healingPower: buffConsts.healingPower({level: buff.data.level}),
              },
              buffs: [],
            };
            
            companion.buffs = companion.buffs.concat([{
              id: 'companion_skeletal_warrior',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'companion skeletal warrior',
                icon: 'boneWarrior.svg',
                level: buff.data.level,
                custom: true,
              }
            }]);
            
            if (buff.data.level >= 4) {
              companion.buffs = companion.buffs.concat([{
                id: 'phantom_strikes',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'phantom strikes',
                  icon: 'phantomStrikes.svg',
                  level: buff.data.level - 3, // PS will be level 1 at companion level 4 and level 2 at companion level 5
                }
              }]);
            }
            
            if (buff.data.level >= 5) {
              companion.buffs = companion.buffs.concat([{
                id: 'thirsty_fangs',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'thirsty fangs',
                  icon: 'thirstyFangs.svg',
                  level: 1,
                }
              }]);
            }
            
            actualBattle.addUnit(companion);
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },
  
  // Level 1: knows how to taunt random targets that aren't targeting the pig (with 7s CD)
  // Level 2: modifies taunt so that it taunts random targets that aren't targeting the pig (with 4s CD)
  // Level 3: ALSO knows how to squeal (scream) that will taunt all targets in boss rooms, individual floors,
  //          or exploration attempts at room 3+ as long as there is at least 2 enemies in the room and
  //          at least one of those two enemies aren't targeting the pig (with 25s CD)
  // Level 4: ALSO has Watchful Aura passive
  // Level 5: ALSO knows Evasive Maneuvers Lv. 5 and will use it when under 50% health (with 40s CD)
  // All levels:  gains health, defense, armor, and magic armor for each level
  cute_pig: {
    duplicateTag: 'cute_pig',
    icon: 'cutePig.svg',
    name: 'cute pig',
    description({ buff, level, playerSkills, floor }) {
      let descText = '';
      
      descText += 'Summons a cute pig to assist in tower combat. <br />';
      descText += '<br />';
      
      descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
      descText += `  <tr>`;
      descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`;
      descText += `    <td valign="top"><b>tank</b></td>`;
      descText += `  </tr>`;
      
      if (level === 1) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Oink Lv. 1</b> (taunt)</td>`;
        descText += `  </tr>`;
      } else if (level === 2) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Oink Lv. 2</b> (taunt)</td>`;
        descText += `  </tr>`;
      } else if (level === 3) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream)</td>`;
        descText += `  </tr>`;
      } else if (level === 4) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream), <b>Watchful Aura</b></td>`;
        descText += `  </tr>`;
      } else if (level === 5) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Evasive Maneuvers Lv. 5</b>, <b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream), <b>Watchful Aura</b></td>`;
        descText += `  </tr>`;
      }
      
      descText += `</table>`

      if (floor && playerSkills) {
        descText += companionStatsHTML({buff, level, floor, playerSkills});
      }

      return descText;
    },
    constants: {
      // pigs don't do much damage, they're tanks
      accuracy: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor / 2.5) + (1 * level));
      },
      attack: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor / 25) + (1 * level));
      },
      attackMax: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor / 25) + (2 * level));
      },
      attackSpeed: function({level}) {
        return 0.3;
      },
      healthMax: function({level, towerFloor, healthSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(healthSkill * 3) * minTowerFloor * 7.5) + (125 * level));
      },
      defense: function({level, towerFloor, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor / 1.45) + (15 * level));
      },
      armor: function({level, towerFloor, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor * 1.65) + (75 * level));
      },
      magicArmor: function({level, towerFloor, magicSkill, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(magicSkill * 2) * minTowerFloor / 5) + (Math.sqrt(defenseSkill * 2) * minTowerFloor / 5) + (20 * level));
      },
      magicPower: function({level, towerFloor, magicSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(magicSkill * 3) * minTowerFloor / 3));
      },
      damageTaken: function({level}) {
        return 1;
      },
      healingPower: function({level}) {
        return 0;
      },
    },
    data: {
      //hideBuff: true
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          const buffConsts = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
          buff.data.isSpawned = true;
          //buff.data.hideBuff = true;

          // ** OLD **
          // this companion won't help in personal quests
          // this companion won't help in battle with other solo companions
          //if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {

          // ** NEW **
          // this companion won't help in personal quests
          // this companion won't help in battle if the unit roster is full
          if ((actualBattle.isTower()) && (actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5)) {
            const attackSkill = target.attackSkill();
            const defenseSkill = target.defenseSkill();
            const magicSkill = target.magicSkill();
            const healthSkill = target.healthSkill();
            
            let companion = {
              owner: target.id + '_companion',
              id: uuid.v4(),
              tickOffset: 0,
              isNPC: true,
              isCompanion: true,
              isSoloCompanion: true,
              icon: 'cutePig.svg',
              name: target.name + '\'s pig',
              stats: {
                attack: buffConsts.attack({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                attackMax: buffConsts.attackMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                attackSpeed: buffConsts.attackSpeed({level: buff.data.level}),
                accuracy: buffConsts.accuracy({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                health: buffConsts.healthMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), healthSkill}),
                healthMax: buffConsts.healthMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), healthSkill}),
                defense: buffConsts.defense({level: buff.data.level, towerFloor: actualBattle.towerFloor(), defenseSkill}),
                armor: buffConsts.armor({level: buff.data.level, towerFloor: actualBattle.towerFloor(), defenseSkill}),
                magicArmor: buffConsts.magicArmor({level: buff.data.level, towerFloor: actualBattle.towerFloor(), magicSkill, defenseSkill}),
                magicPower: buffConsts.magicPower({level: buff.data.level, towerFloor: actualBattle.towerFloor(), magicSkill}),
                damageTaken: buffConsts.damageTaken({level: buff.data.level}),
                healingPower: buffConsts.healingPower({level: buff.data.level}),
              },
              buffs: [{
                id: 'companion_taunt',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'companion taunt',
                  icon: 'taunt.svg',
                  timeTillCharge: 0.4,
                  level: buff.data.level,
                }
              }],
            };
            
            if (buff.data.level >= 3) {
              companion.buffs = companion.buffs.concat([{
                id: 'companion_squeal',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'companion squeal',
                  icon: 'scream.svg',
                  timeTillCharge: 0.4,
                  level: buff.data.level,
                }
              }]);
            }

            if (buff.data.level >= 4) {
              companion.buffs = companion.buffs.concat([{
                id: 'sixth_sense',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'watchful aura',
                  icon: 'sixthSense.svg',
                }
              }]);
            }

            if (buff.data.level >= 5) {
              companion.buffs = companion.buffs.concat([{
                id: 'companion_pig_logic',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'piggy oink oink',
                  icon: 'cutePig.svg',
                }
              }]);
            }
            
            actualBattle.addUnit(companion);
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },  
  
  // Level 1: knows how to taunt random targets that aren't targeting the pig (with 7s CD)
  // Level 2: modifies taunt so that it taunts random targets that aren't targeting the pig (with 4s CD)
  // Level 3: ALSO knows how to squeal (scream) that will taunt all targets in boss rooms, individual floors,
  //          or exploration attempts at room 3+ as long as there is at least 2 enemies in the room and
  //          at least one of those two enemies aren't targeting the pig (with 25s CD)
  // Level 4: ALSO knows Evasive Maneuvers Lv. 5 and will use it when under 50% health (with 40s CD)
  // Level 5: reduces the cooldown on Evasive Maneuvers to 15 seconds.
  // All levels:  gains health, defense, armor, and magic armor for each level
  lny_pig: {
    duplicateTag: 'lny_pig',
    icon: 'eventLNYPig.png',
    name: 'year of the pig',
    description({ buff, level, playerSkills, floor }) {
      let descText = '';
      
      descText += 'Summons a year of the pig to assist in tower combat. <br />';
      descText += '<br />';
      
      descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
      descText += `  <tr>`;
      descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`;
      descText += `    <td valign="top"><b>tank</b></td>`;
      descText += `  </tr>`;
      
      if (level === 1) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Oink Lv. 1</b> (taunt)</td>`;
        descText += `  </tr>`;
      } else if (level === 2) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Oink Lv. 2</b> (taunt)</td>`;
        descText += `  </tr>`;
      } else if (level === 3) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream)</td>`;
        descText += `  </tr>`;
      } else if (level === 4) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top">Evasive Maneuvers Lv. 5</br>, <b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream), <b>Watchful Aura</b></td>`;
        descText += `  </tr>`;
      } else if (level === 5) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Evasive Maneuvers Lv. 5</b>, <b>Oink Lv. 2</b> (taunt), <b>Squeal Lv. 1</b> (scream), <b>Watchful Aura</b></td>`;
        descText += `  </tr>`;
        descText += `  <tr>`;
        descText += `    <td valign="top">Traits&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Fast Evade</b> (reduces <i>Evasive Maneuvers</i> cooldown)</td>`;
        descText += `  </tr>`;
      }
      
      descText += `</table>`

      if (floor && playerSkills) {
        descText += companionStatsHTML({buff, level, floor, playerSkills});
      }

      return descText;
    },
    constants: {
      // pigs don't do much damage, they're tanks
      accuracy: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor / 2.5) + (1 * level));
      },
      attack: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor / 25) + (1 * level));
      },
      attackMax: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor / 25) + (2 * level));
      },
      attackSpeed: function({level}) {
        return 0.3;
      },
      healthMax: function({level, towerFloor, healthSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(healthSkill * 3) * minTowerFloor * 9.5) + (125 * level));
      },
      defense: function({level, towerFloor, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor / 1.55) + (15 * level));
      },
      armor: function({level, towerFloor, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor * 1.35) + (75 * level));
      },
      magicArmor: function({level, towerFloor, magicSkill, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(magicSkill * 2) * minTowerFloor / 5) + (Math.sqrt(defenseSkill * 2) * minTowerFloor / 5) + (25 * level));
      },
      magicPower: function({level, towerFloor, magicSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(magicSkill * 3) * minTowerFloor / 3));
      },
      damageTaken: function({level}) {
        return 1;
      },
      healingPower: function({level}) {
        return 0;
      },
    },
    data: {
      //hideBuff: true
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          const buffConsts = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
          buff.data.isSpawned = true;
          //buff.data.hideBuff = true;
          
          // ** OLD **
          // this companion won't help in personal quests
          // this companion won't help in battle with other solo companions
          //if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {

          // ** NEW **
          // this companion won't help in personal quests
          // this companion won't help in battle if the unit roster is full
          if ((actualBattle.isTower()) && (actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5)) {
            const attackSkill = target.attackSkill();
            const defenseSkill = target.defenseSkill();
            const magicSkill = target.magicSkill();
            const healthSkill = target.healthSkill();
            
            let companion = {
              owner: target.id + '_companion',
              id: uuid.v4(),
              tickOffset: 0,
              isNPC: true,
              isCompanion: true,
              isSoloCompanion: true,
              icon: 'eventLNYPig.png',
              name: target.name + '\'s pig',
              stats: {
                attack: buffConsts.attack({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                attackMax: buffConsts.attackMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                attackSpeed: buffConsts.attackSpeed({level: buff.data.level}),
                accuracy: buffConsts.accuracy({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                health: buffConsts.healthMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), healthSkill}),
                healthMax: buffConsts.healthMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), healthSkill}),
                defense: buffConsts.defense({level: buff.data.level, towerFloor: actualBattle.towerFloor(), defenseSkill}),
                armor: buffConsts.armor({level: buff.data.level, towerFloor: actualBattle.towerFloor(), defenseSkill}),
                magicArmor: buffConsts.magicArmor({level: buff.data.level, towerFloor: actualBattle.towerFloor(), magicSkill, defenseSkill}),
                magicPower: buffConsts.magicPower({level: buff.data.level, towerFloor: actualBattle.towerFloor(), magicSkill}),
                damageTaken: buffConsts.damageTaken({level: buff.data.level}),
                healingPower: buffConsts.healingPower({level: buff.data.level}),
              },
              buffs: [{
                id: 'companion_taunt',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'companion taunt',
                  icon: 'taunt.svg',
                  timeTillCharge: 0.4,
                  level: buff.data.level,
                }
              }],
            };
            
            if (buff.data.level >= 3) {
              companion.buffs = companion.buffs.concat([{
                id: 'companion_squeal',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'companion squeal',
                  icon: 'scream.svg',
                  timeTillCharge: 0.4,
                  level: buff.data.level,
                }
              }]);
            }

            if (buff.data.level >= 4) {
              companion.buffs = companion.buffs.concat([{
                id: 'companion_pig_logic_lny',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'piggy oink oink',
                  icon: 'eventLNYPig.png',
                  level: buff.data.level
                }
              }]);
            }
            
            actualBattle.addUnit(companion);
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },  
  
  // Level 1: knows how to cast water dart (10s CD) and water ball (10s CD)
  // Level 2: ALSO knows how to cast mending waters (30s CD) but will not cast at any target that is
  //          already affected by a mending water or if the target's maximum health is under 500
  // Level 3: ALSO knows how to cast air ball in boss rooms, individual floors, or exploration attempts
  //          at room 4+ at the first enemy target as long as that enemy doesn't already have air ball
  //          affecting it (10s CD) and as long as the fairy has 400+ remaining max health
  // Level 4: ALSO knows how to cast water wave (20s CD) if the lowest health allies are <= 70%, <= 80%,
  //          <= 80%
  // Level 5: ALSO gains +10% damage reduction
  // All levels:  gains health, magic power, and healing power for each level
  mystic_fairy: {
    duplicateTag: 'mystic_fairy',
    icon: 'fairy2.svg',
    name: 'mystic fairy',
    description({ buff, level, floor, playerSkills }) {
      let descText = '';

      descText += 'Summons a mystic fairy to assist in tower combat. <br />';
      descText += '<br />';
      
      descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
      descText += `  <tr>`;
      descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`;
      descText += `    <td valign="top"><b>healer</b></td>`;
      descText += `  </tr>`;
      
      if (level === 1) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Water Ball</b>, <b>Water Dart</b></b></td>`;
        descText += `  </tr>`;
      } else if (level === 2) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Mending Waters</b>, <b>Water Ball</b>, <b>Water Dart</b></b></td>`;
        descText += `  </tr>`;
      } else if (level === 3) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b>, <b>Water Dart</b></b></td>`;
        descText += `  </tr>`;
      } else if (level === 4) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b>, <b>Water Dart</b>, <b>Water Wave</b></b></td>`;
        descText += `  </tr>`;
      } else if (level === 5) {
        descText += `  </tr>`;
        descText += `  <tr>`;
        descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b>, <b>Water Dart</b>, <b>Water Wave</b></b></td>`;
        descText += `  </tr>`;
        descText += `  <tr>`;
        descText += `    <td valign="top">Traits&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Protection</b> (25% personal damage shield)</td>`;
        descText += `  </tr>`;
      }
      
      descText += `</table>`

      if (floor && playerSkills) {
        descText += companionStatsHTML({buff, level, floor, playerSkills});
      }

      return descText;
    },
    constants: {
      // fairies don't do much damage, they're purely healers
      accuracy: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 2) * minTowerFloor / 2.5) + 1);
      },
      attack: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor / 25) + 1);
      },
      attackMax: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 5) * minTowerFloor / 25) + 2);
      },
      attackSpeed: function({level}) {
        return 0.3;
      },
      healthMax: function({level, towerFloor, healthSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(healthSkill * 3) * minTowerFloor * 6.5) + (200 * level));
      },
      defense: function({level, towerFloor, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor / 2.75) + (5 * level));
      },
      armor: function({level, towerFloor, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor / 1.25) + (5 * level));
      },
      magicArmor: function({level, towerFloor, magicSkill, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(magicSkill * 3) * minTowerFloor / 2) + (Math.sqrt(defenseSkill * 2) * minTowerFloor / 4) + (10 * level));
      },
      magicPower: function({level, towerFloor, magicSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(magicSkill * 3) * minTowerFloor * 0.85) + (10 * level));
      },
      damageTaken: function({level}) {
        return ((level >= 5) ? 0.75 : 1);
      },
      healingPower: function({level}) {
        return 10 + (5 * level);
      },
 
    },
    data: {
      //hideBuff: true
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          const buffConsts = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
          buff.data.isSpawned = true;
          //buff.data.hideBuff = true;

          // ** OLD **
          // this companion won't help in personal quests
          // this companion won't help in battle with other solo companions
          //if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {

          // ** NEW **
          // this companion won't help in personal quests
          // this companion won't help in battle if the unit roster is full
          if ((actualBattle.isTower()) && (actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5)) {
            const attackSkill = target.attackSkill();
            const defenseSkill = target.defenseSkill();
            const magicSkill = target.magicSkill();
            const healthSkill = target.healthSkill();
            
            let companion = {
              owner: target.id + '_companion',
              id: uuid.v4(),
              tickOffset: 0,
              isNPC: true,
              isCompanion: true,
              isSoloCompanion: true,
              icon: 'fairy2.svg',
              name: target.name + '\'s fairy',
              stats: {
                attack: buffConsts.attack({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                attackMax: buffConsts.attackMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                attackSpeed: buffConsts.attackSpeed({level: buff.data.level}),
                accuracy: buffConsts.accuracy({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                health: buffConsts.healthMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), healthSkill}),
                healthMax: buffConsts.healthMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), healthSkill}),
                defense: buffConsts.defense({level: buff.data.level, towerFloor: actualBattle.towerFloor(), defenseSkill}),
                armor: buffConsts.armor({level: buff.data.level, towerFloor: actualBattle.towerFloor(), defenseSkill}),
                magicArmor: buffConsts.magicArmor({level: buff.data.level, towerFloor: actualBattle.towerFloor(), magicSkill, defenseSkill}),
                magicPower: buffConsts.magicPower({level: buff.data.level, towerFloor: actualBattle.towerFloor(), magicSkill}),
                damageTaken: buffConsts.damageTaken({level: buff.data.level}),
                healingPower: buffConsts.healingPower({level: buff.data.level}),
              },
              buffs: [{
                id: 'companion_healer',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'companion healer',
                  icon: 'fairyMagic.svg',
                  level: buff.data.level
                }
              }],
            };
            
            actualBattle.addUnit(companion);
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },
  
  // Level 1: can auto-attack (speed 0.7) and can cast mending waters (30s CD) and air ball (10s CD)
  // Level 2: can cast water ball (10s CD)
  // Level 3: can use penetrating slash level 4
  // Level 4: can use bleed level 4
  // Level 5: upgrades penetration slash to level 5 and bleed to level 5
  // All levels:  gains attack, accuracy, health, magic power, and healing power for each level
  vd_cupid: {
    duplicateTag: 'vd_cupid',
    icon: 'eventVDcupid.svg',
    name: 'cupid',
    description({ buff, level, playerSkills, floor }) {
      let descText = '';
      
      descText += 'Summons a cupid to assist in tower combat. <br />';
      descText += '<br />';
      
      descText += `<table style="border: none; max-width: ${maxTableAndGridSize}px;" cellspacing="4" cellpadding="0">`
      descText += `  <tr>`;
      descText += `    <td valign="top">Role&nbsp;&nbsp;&nbsp;</td>`;
      descText += `    <td valign="top"><b>hybrid</b> (physical damage &amp; healer)</td>`;
      descText += `  </tr>`;
      
      if (level === 1) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b></td>`;
        descText += `  </tr>`;
      } else if (level === 2) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b></td>`;
        descText += `  </tr>`;
      } else if (level === 3) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Penetrating Slash Lv. 4</b></td>`;
        descText += `  </tr>`;
        descText += `  <tr>`;
        descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b></td>`;
        descText += `  </tr>`;
      } else if (level === 4) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Bleed Lv. 4</b>, <b>Penetrating Slash Lv. 4</b></td>`;
        descText += `  </tr>`;
        descText += `  <tr>`;
        descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b></td>`;
        descText += `  </tr>`;
      } else if (level === 5) {
        descText += `  <tr>`;
        descText += `    <td valign="top">Abilities&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Bleed Lv. 5</b>, <b>Penetrating Slash Lv. 5</b></td>`;
        descText += `  </tr>`;
        descText += `  <tr>`;
        descText += `    <td valign="top">Spells&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Air Ball</b>, <b>Mending Waters</b>, <b>Water Ball</b></td>`;
        descText += `  </tr>`;
        descText += `  <tr>`;
        descText += `    <td valign="top">Traits&nbsp;&nbsp;&nbsp;</td>`;
        descText += `    <td valign="top"><b>Lull</b> (mass charm)</td>`;
        descText += `  </tr>`;
      }
      
      descText += `</table>`

      if (floor && playerSkills) {
        descText += companionStatsHTML({buff, level, floor, playerSkills});
      }

      return descText;
    },
    constants: {
      // cupids can attack and mage, they're a hybrid
      accuracy: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 3) * minTowerFloor / 1.85) + (35 * level));
      },
      attack: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 5) * minTowerFloor / 3.5) + (11 * level));
      },
      attackMax: function({level, towerFloor, attackSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(attackSkill * 5) * minTowerFloor / 1.5) + (32 * level));
      },
      attackSpeed: function({level}) {
        return 0.55 + (0.05 * level);
      },
      healthMax: function({level, towerFloor, healthSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(healthSkill * 3) * minTowerFloor * 5) + (200 * level));
      },
      defense: function({level, towerFloor, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor / 3.15) + (5 * level));
      },
      armor: function({level, towerFloor, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(defenseSkill * 3) * minTowerFloor / 1.25) + (5 * level));
      },
      magicArmor: function({level, towerFloor, magicSkill, defenseSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(magicSkill * 3) * minTowerFloor / 2.5) + (Math.sqrt(defenseSkill * 2) * minTowerFloor / 5) + (10 * level));
      },
      magicPower: function({level, towerFloor, magicSkill}) {
        const minTowerFloor = towerFloor < 5 ? 5 : towerFloor;
        return Math.round((Math.sqrt(magicSkill * 3) * minTowerFloor * 0.85) + (10 * level));
      },
      damageTaken: function({level}) {
        return 1;
      },
      healingPower: function({level}) {
        return 5 + (3 * level);
      },
    },
    data: {
      //hideBuff: true
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          const buffConsts = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
          buff.data.isSpawned = true;
          //buff.data.hideBuff = true;

          // ** NEW **
          // this companion won't help in personal quests
          // this companion won't help in battle if the unit roster is full
          if ((actualBattle.isTower()) && (actualBattle.soloCompanions().length + actualBattle.alliedPlayers().length < 5)) {
            const attackSkill = target.attackSkill();
            const defenseSkill = target.defenseSkill();
            const magicSkill = target.magicSkill();
            const healthSkill = target.healthSkill();
            
            let companion = {
              owner: target.id + '_companion',
              id: uuid.v4(),
              tickOffset: 0,
              isNPC: true,
              isCompanion: true,
              isSoloCompanion: true,
              icon: 'eventVDcupid.svg',
              name: target.name + '\'s cupid',
              stats: {
                attack: buffConsts.attack({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                attackMax: buffConsts.attackMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                attackSpeed: buffConsts.attackSpeed({level: buff.data.level}),
                accuracy: buffConsts.accuracy({level: buff.data.level, towerFloor: actualBattle.towerFloor(), attackSkill}),
                health: buffConsts.healthMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), healthSkill}),
                healthMax: buffConsts.healthMax({level: buff.data.level, towerFloor: actualBattle.towerFloor(), healthSkill}),
                defense: buffConsts.defense({level: buff.data.level, towerFloor: actualBattle.towerFloor(), defenseSkill}),
                armor: buffConsts.armor({level: buff.data.level, towerFloor: actualBattle.towerFloor(), defenseSkill}),
                magicArmor: buffConsts.magicArmor({level: buff.data.level, towerFloor: actualBattle.towerFloor(), magicSkill, defenseSkill}),
                magicPower: buffConsts.magicPower({level: buff.data.level, towerFloor: actualBattle.towerFloor(), magicSkill}),
                damageTaken: buffConsts.damageTaken({level: buff.data.level}),
                healingPower: buffConsts.healingPower({level: buff.data.level}),
              },
              buffs: [{
                id: 'vd_cupid_logic',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'companion healer',
                  icon: 'eventVDcupidbow.svg',
                  level: buff.data.level
                }
              }],
            };
            
            actualBattle.addUnit(companion);
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },
  
  companion_skeletal_warrior: {
    duplicateTag: 'companion_skeletal_warrior',
    icon: 'boneWarrior.svg',
    name: 'companion skeletal warrior',
    description() {
      return `Companion will use combat abilities to deal damage.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
    },
    events: {
      onApply({ buff, target, caster }) {
        buff.data.timeTillAction = 0.4;
        buff.data.CDSlash = 0.0;
        buff.data.CDPSlash = 0.0;
        buff.data.CDBleed = 0.0;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.CDSlash > 0.0) {
          buff.data.CDSlash -= secondsElapsed;
        }
        if (buff.data.CDPSlash > 0.0) {
          buff.data.CDPSlash -= secondsElapsed;
        }
        if (buff.data.CDBleed > 0.0) {
          buff.data.CDBleed -= secondsElapsed;
        }
        
        if (buff.data.timeTillAction > 0) {
          buff.data.timeTillAction -= secondsElapsed;
        } else {
          // Do nothing with two-thirds our ticks (except the above CD redux)
          if (Math.random() < 0.667) {
            return;
          }

          if (target.stats.health / target.stats.healthMax < 0.5) {
            buff.customText = "!!";
            buff.icon = "boneWarriorRed.svg";
          } else {
            buff.customText = "";
            buff.icon = "boneWarrior.svg";
          }
        
          // Note: always accept whatever target we're on automatically, no re-targeting
          
          if (!actualBattle.enemies || actualBattle.enemies.length <= 0 || actualBattle.enemies[0].id === 'crab') {
            return;
          }
          
          try {
            // START: logic for targets
            let enemyIsDodging = false;
            if (actualBattle.enemies[0].buffs && actualBattle.enemies[0].buffs.length > 0) {
              const enemyDodgeBuffs = actualBattle.enemies[0].buffs.find(buff => buff.id === 'evasive_maneuvers'); // this covers ninjas evading and spirits blinking
              enemyIsDodging = (enemyDodgeBuffs && enemyDodgeBuffs.length > 0);
            }
            // END: logic for targets
            
            if (!enemyIsDodging) {
              if (buff.data.level >= 3 && buff.data.CDBleed <= 0.0 && actualBattle.enemies[0].stats.health >= 400) {
                // START: use Bleed
                const newBuff = {
                  id: 'bleed',
                  data: {
                    duration: 15,
                    totalDuration: 15,
                    icon: 'bleed.svg',
                    description: ``,
                    name: 'bleed',
                    level: buff.data.level === 1 ? 1 : buff.data.level === 2 ? 1 : buff.data.level === 3 ? 1 : buff.data.level === 4 ? 2 : buff.data.level === 5 ? 2 : 1
                  },
                  constants: BUFFS['bleed']
                };
                addBuff({ buff: newBuff, target: actualBattle.enemies[0], caster: target, actualBattle });
                buff.data.CDBleed = 30.0;
                // END: use Bleed
              }
              
              if (buff.data.CDSlash <= 0.0) {
                // START: use Slash
                const newBuff = {
                  id: 'slash',
                  data: {
                    icon: 'slash.svg',
                    description: ``,
                    name: 'slash',
                    level: buff.data.level === 1 ? 1 : buff.data.level === 2 ? 2 : buff.data.level === 3 ? 2 : buff.data.level === 4 ? 3 : buff.data.level === 5 ? 3 : 1
                  },
                  constants: BUFFS['slash']
                };
                addBuff({ buff: newBuff, target: actualBattle.enemies[0], caster: target, actualBattle });
                buff.data.CDSlash = 10.0;
                // END: use Slash
              }

              if (buff.data.level >= 2 && buff.data.CDPSlash <= 0.0) {
                // START: use Penetrating Slash
                const newBuff = {
                  id: 'penetrating_slash',
                  data: {
                    icon: 'penetratingSlash.svg',
                    description: ``,
                    name: 'penetrating slash',
                    level: buff.data.level === 1 ? 1 : buff.data.level === 2 ? 1 : buff.data.level === 3 ? 1 : buff.data.level === 4 ? 2 : buff.data.level === 5 ? 3 : 1
                  },
                  constants: BUFFS['penetrating_slash']
                };
                addBuff({ buff: newBuff, target: actualBattle.enemies[0], caster: target, actualBattle });
                buff.data.CDPSlash = 10.0;
                // END: use Penetrating Slash
              }
            }
          } catch (err) {
          }
          
          buff.data.timeTillAction = 0.4;
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },
    
  companion_pig_logic: {
    duplicateTag: 'companion_pig_logic',
    icon: 'cutePig.svg',
    name: 'piggy oink oink',
    description() {
      return `Companion will do pig things.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      timeTillCharge: 0.4,
      hideBuff: true,
    },
    events: {
      onApply({ buff, target, caster }) {
        buff.data.hideBuff = true;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
        } else {
          // Do nothing with two-thirds our ticks (except the above CD redux)
          if (Math.random() < 0.667) {
            return;
          }
          
          if (target.health / target.healthMax < 0.5) {
            const newBuff = {
              id: 'evasive_maneuvers',
              data: {
                duration: 3.5,
                totalDuration: 3.5,
                icon: 'evasiveManeuvers.svg',
                description: ``,
                name: 'evasive maneuvers',
                level: 5
              },
              constants: BUFFS['evasive_maneuvers']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
            buff.data.timeTillCharge = 40;
          } else {
            buff.data.timeTillCharge = 0.4;
          }
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },  
  
  companion_pig_logic_lny: {
    duplicateTag: 'companion_pig_logic_lny',
    icon: 'eventLNYPig.png',
    name: 'piggy oink oink',
    description() {
      return `Companion will do pig things.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      timeTillCharge: 0.4,
      hideBuff: true,
    },
    events: {
      onApply({ buff, target, caster }) {
        buff.data.hideBuff = true;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
        } else {
          // Do nothing with half our ticks (except the above CD redux)
          if (Math.random() < 0.5) {
            return;
          }
          
          if (target.health / target.healthMax < 0.5) {
            const newBuff = {
              id: 'evasive_maneuvers',
              data: {
                duration: 3.5,
                totalDuration: 3.5,
                icon: 'evasiveManeuvers.svg',
                description: ``,
                name: 'evasive maneuvers',
                level: 5
              },
              constants: BUFFS['evasive_maneuvers']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
            buff.data.timeTillCharge = (buff.data.level === 5) ? 15 : 40;
          } else {
            buff.data.timeTillCharge = 0.4;
          }
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },  
  
  companion_taunt: {
    duplicateTag: 'companion_taunt',
    icon: 'taunt.svg',
    name: 'companion taunt',
    description() {
      return `Companion will taunt random targets.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      timeTillCharge: 0.4,      
    },
    events: {
      onApply({ buff, target, caster }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
        } else {
          // Do nothing with half our ticks (except the above CD redux)
          if (Math.random() < 0.5) {
            return;
          }
          
          const targetToTaunt = lodash.sample(actualBattle.enemies);
          if (targetToTaunt && targetToTaunt.target !== target.id) {
            targetToTaunt.target = target.id
            buff.data.timeTillCharge = (buff.data.level > 1) ? 4 : 7;
            // combat node/server doesn't have access to database or schema
            //companionChat({ companion: target, message: 'I taunted the ' + targetToTaunt.name + '!' });
            companionEvent({ actualBattle, companion: target, info: 'Oink!', color: '#DF4682' });
            companionEvent({ actualBattle, companion: target, info: '?!?',   color: '#DF8246', target: targetToTaunt });
          } else {
          buff.data.timeTillCharge = 0.4;
          }
        }

        buff.stacks = Math.round(buff.data.timeTillCharge);
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },  
  
  companion_squeal: {
    duplicateTag: 'companion_squeal',
    icon: 'scream.svg',
    name: 'companion squeal',
    description() {
      return `Companion will squeal at all enemies.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      timeTillCharge: 0.4,
    },
    events: {
      onApply({ buff, target, caster }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
        }
        
        if (buff.data.timeTillCharge <= 0.0) {
          // Do nothing with two-thirds our ticks (except the above CD redux)
          if (Math.random() < 0.667) {
            return;
          }
          
          if (!actualBattle.isExplorationRun || actualBattle.room >= 3 || actualBattle.room === 'boss') {
            if (actualBattle.enemies.length > 1) {
              let neededToScream = false;
              actualBattle.enemies.forEach((enemy) => {
                if (enemy.target !== target.id) {
                  neededToScream = true;
                  enemy.target = target.id;
                  companionEvent({ actualBattle, companion: target, info: '?!?', color: '#DF8246', target: enemy });
                }
              });
              if (neededToScream) {
                companionEvent({ actualBattle, companion: target, info: 'Squeal!', color: '#DF4682' });
                buff.data.timeTillCharge = 25;
              }
            }
          }
        }

        // tick throttling if there's nothing to do
        if (buff.data.timeTillCharge < 0.0) {
          buff.data.timeTillCharge = 0.4;
        }
        
        buff.stacks = Math.round(buff.data.timeTillCharge);
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },  
  
  companion_healer: {
    duplicateTag: 'companion_healer',
    icon: 'fairyMagic.svg',
    name: 'companion healer',
    description() {
      return `Companion will use magic to heal and serve.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
    },
    events: {
      onApply({ buff, target, caster }) {
        buff.data.timeTillAction = 0.0;
        buff.data.CDAirBall = 0.0;
        buff.data.CDMend = 0.0;
        buff.data.CDWaterBall = 0.0,
        buff.data.CDWaterDart = 0.0;
        buff.data.CDWaterWave = 0.0;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        let castAnyHeal = false;
        const healthMaxAtStart = target.stats.healthMax;

        if (buff.data.CDAirBall > 0.0) {
          buff.data.CDAirBall -= secondsElapsed;
        }
        if (buff.data.CDMend > 0.0) {
          buff.data.CDMend -= secondsElapsed;
        }
        if (buff.data.CDWaterBall > 0.0) {
          buff.data.CDWaterBall -= secondsElapsed;
        }
        if (buff.data.CDWaterDart > 0.0) {
          buff.data.CDWaterDart -= secondsElapsed;
        }
        if (buff.data.CDWaterWave > 0.0) {
          buff.data.CDWaterWave -= secondsElapsed;
        }
        
        if (buff.data.timeTillAction > 0.0) {
          buff.data.timeTillAction -= secondsElapsed;
        } else {
          // Note: using all ticks

          // START: logic Air Ball
          try {
            if (buff.data.level >= 3 && buff.data.CDAirBall <= 0.0 && target.stats.healthMax >= 400) {
              if (actualBattle.isTower()) {
                if (!actualBattle.isExplorationRun || actualBattle.room >= 4 || actualBattle.room === 'boss') {              
                  if (actualBattle.enemies.length > 0 && actualBattle.enemies[0].id !== 'crab') {
                    // always air left-to-right
                    let enemyIsAired = false;
                    if (actualBattle.enemies[0].buffs && actualBattle.enemies[0].buffs.length > 0) {
                      const enemyAirBuffs = actualBattle.enemies[0].buffs.find(buff => buff.id === 'air_ball');
                      enemyIsAired = enemyAirBuffs && enemyAirBuffs.length > 0;
                    }
                    if (!enemyIsAired) {
                      // START: cast Air Ball
                      const newBuff = {
                        id: 'air_ball',
                        data: {
                          duration: 7,
                          totalDuration: 7,
                          icon: 'airBall.svg',
                          description: `Reduces enemy armor.`,
                          name: 'air ball'
                        },
                        constants: BUFFS['air_ball']
                      };
                      // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                      addBuff({ buff: newBuff, target: actualBattle.enemies[0], caster: caster, actualBattle });
                      buff.data.CDAirBall = 10.0;
                      // END: cast Air Ball
                    }
                  }
                }
              }
            }
          } catch (err) {
          }
          // END: logic Air Ball
          
          // START: logic healing spells
          try {
            const unitsHealthSorted = _.sortBy(actualBattle.units, function(unit) { return unit.stats.health / unit.stats.healthMax; });
            const unitsHealthSortedNoMending = unitsHealthSorted.filter((unit) => {
              if (unit.buffs.find(buff => buff.id === 'mending_water')) {
                return false;
              }
              return true;
            });
            const lowHealthTest = unitsHealthSorted[0].stats.health / unitsHealthSorted[0].stats.healthMax;
            const lowHealthTestNoMending = unitsHealthSortedNoMending ? unitsHealthSortedNoMending[0].stats.health / unitsHealthSortedNoMending[0].stats.healthMax : 1.0;
            if (!castAnyHeal && unitsHealthSorted.length >= 3 && buff.data.level >= 4 && buff.data.CDWaterWave <= 0.0 && (unitsHealthSorted[0].stats.health / unitsHealthSorted[0].stats.healthMax < 0.7) && (unitsHealthSorted[1].stats.health / unitsHealthSorted[1].stats.healthMax < 0.8) && (unitsHealthSorted[2].stats.health / unitsHealthSorted[2].stats.healthMax < 0.8)) {
              try {
                // START: cast Water Wave
                const newBuff = {
                  id: 'water_wave',
                  data: {
                    icon: 'waterWave.svg',
                    description: `Directly heals all allies.`,
                    name: 'water wave'
                  },
                  constants: BUFFS['water_wave']
                };
                // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                actualBattle.units.forEach((unit_to_heal) => {
                  addBuff({ buff: newBuff, target: unit_to_heal, caster: caster, actualBattle });
                });                
                buff.data.CDWaterWave = 20.0;
                castAnyHeal = true;
                // END: cast Water Wave
              } catch (err) {
              }
            }
            if (lowHealthTest < 0.70) {
              if (!castAnyHeal && buff.data.CDWaterBall <= 0.0) {
                // START: cast Water Ball
                const newBuff = {
                  id: 'water_ball',
                  data: {
                    icon: 'waterBall.svg',
                    description: `Directly heals target.`,
                    name: 'water ball'
                  },
                  constants: BUFFS['water_ball']
                };
                // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                addBuff({ buff: newBuff, target: unitsHealthSorted[0], caster: caster, actualBattle });
                buff.data.CDWaterBall = 10.0;
                castAnyHeal = true;
                // END: cast Water Ball
              }
              if (!castAnyHeal && buff.data.level >= 2 && lowHealthTestNoMending < 0.70 && buff.data.CDMend <= 0.0 && unitsHealthSortedNoMending[0].stats.healthMax >= 500) {
                // START: cast Mending Water
                const newBuff = {
                  id: 'mending_water',
                  data: {
                    icon: 'mendingWater.svg',
                    description: `Heals target over time.`,
                    name: 'mending water',
                    duration: 20,
                    totalDuration: 20,
                  },
                  constants: BUFFS['mending_water']
                };
                // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                addBuff({ buff: newBuff, target: unitsHealthSortedNoMending[0], caster: caster, actualBattle });
                buff.data.CDMend = 30.0;
                castAnyHeal = true;
                // END: cast Mending Water
              }
            }
            if (lowHealthTest < 0.85) {
              // water dart
              if (!castAnyHeal && buff.data.CDWaterDart <= 0.0) {
                // START: cast Water Dart
                const newBuff = {
                  id: 'water_dart',
                  data: {
                    icon: 'waterDart.svg',
                    description: `Directly heals target.`,
                    name: 'water dart'
                  },
                  constants: BUFFS['water_dart']
                };
                // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                addBuff({ buff: newBuff, target: unitsHealthSorted[0], caster: caster, actualBattle });
                buff.data.CDWaterDart = 10.0;
                castAnyHeal = true;
                // END: cast Water Dart
              }
            }
          } catch (err) {
          }
          // END: logic healing spells
          
          if (castAnyHeal) {
            if (healthMaxAtStart === target.stats.healthMax) {
              // if we tried to cast a heal spell but our health max at the start and end wre the same, then we couldn't afford to cast anything
              buff.data.timeTillAction = 5.0;
            }
          }
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  vd_cupid_logic: {
    duplicateTag: 'vd_cupid_logic',
    icon: 'eventVDcupidbow.svg',
    name: 'companion healer',
    description() {
      return `Companion will use magic to heal and serve.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
    },
    events: {
      onApply({ buff, target, caster }) {
        buff.data.CDAirBall = 0.0;
        buff.data.CDMend = 0.0;
        buff.data.CDWaterBall = 0.0,
        buff.data.CDPSlash = 0.0;
        buff.data.CDBleed = 0.0;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        let castAnyHeal = false;
        const healthMaxAtStart = target.stats.healthMax;

        if (buff.data.CDAirBall > 0.0) {
          buff.data.CDAirBall -= secondsElapsed;
        }
        if (buff.data.CDMend > 0.0) {
          buff.data.CDMend -= secondsElapsed;
        }
        if (buff.data.CDWaterBall > 0.0) {
          buff.data.CDWaterBall -= secondsElapsed;
        }
        if (buff.data.CDPSlash > 0.0) {
          buff.data.CDPSlash -= secondsElapsed;
        }
        if (buff.data.CDBleed > 0.0) {
          buff.data.CDBleed -= secondsElapsed;
        }
        
        // Note: using half of all ticks
        if (Math.random() < 0.5) {
          return;
        }
        
        // Note: always accept whatever target we're on automatically, no re-targeting
        
        if (!actualBattle.enemies || actualBattle.enemies.length <= 0 || actualBattle.enemies[0].id === 'crab') {
          return;
        }
        
        // START: logic mass charm every ~15 seconds
        try {
          if (buff.data.level >= 5) {
            if (Math.random() < 0.01333) {
              actualBattle.enemies.forEach((enemy) => {
                const newBuff = {
                  id: 'charm',
                  data: {
                    icon: 'eventVDhearts.svg',
                    description: ``,
                    name: 'charm',
                    level: 1,
                    duration: 5,
                    totalDuration: 5,
                    wasCharmed: false,
                  },
                  constants: BUFFS['charm']
                };
                addBuff({ buff: newBuff, target: enemy, caster: target, actualBattle });                  
              });
            }
          }
        } catch (err) {
        }
        // END: logic mass charm

        try {
          // START: logic for targets
          let enemyIsDodging = false;
          if (actualBattle.enemies[0].buffs && actualBattle.enemies[0].buffs.length > 0) {
            const enemyDodgeBuffs = actualBattle.enemies[0].buffs.find(buff => buff.id === 'evasive_maneuvers'); // this covers ninjas evading and spirits blinking
            enemyIsDodging = (enemyDodgeBuffs && enemyDodgeBuffs.length > 0);
          }
          // END: logic for targets
          
          if (!enemyIsDodging) {
            if (buff.data.level >= 3 && buff.data.CDPSlash <= 0.0) {
              // START: use Penetrating Slash
              const newBuff = {
                id: 'penetrating_slash',
                data: {
                  icon: 'penetratingSlash.svg',
                  description: ``,
                  name: 'penetrating slash',
                  level: buff.data.level === 5 ? 5 : 4
                },
                constants: BUFFS['penetrating_slash']
              };
              addBuff({ buff: newBuff, target: actualBattle.enemies[0], caster: target, actualBattle });
              buff.data.CDPSlash = 10.0;
            // END: use Penetrating Slash
            }
            
            if (buff.data.level >= 4 && buff.data.CDBleed <= 0.0 && actualBattle.enemies[0].stats.health >= 400) {
              // START: use Bleed
              const newBuff = {
                id: 'bleed',
                data: {
                  duration: 15,
                  totalDuration: 15,
                  icon: 'bleed.svg',
                  description: ``,
                  name: 'bleed',
                  level: buff.data.level
                },
                constants: BUFFS['bleed']
              };
              addBuff({ buff: newBuff, target: actualBattle.enemies[0], caster: target, actualBattle });
              buff.data.CDBleed = 30.0;
              // END: use Bleed
            }
          }
        } catch (err) {
        }

        // START: logic Air Ball
        try {
          if (buff.data.level >= 1 && buff.data.CDAirBall <= 0.0 && target.stats.healthMax >= 400) {
            if (actualBattle.isTower()) {
              if (!actualBattle.isExplorationRun || actualBattle.room >= 4 || actualBattle.room === 'boss') {              
                if (actualBattle.enemies.length > 0 && actualBattle.enemies[0].id !== 'crab') {
                  // always air left-to-right
                  let enemyIsAired = false;
                  if (actualBattle.enemies[0].buffs && actualBattle.enemies[0].buffs.length > 0) {
                    const enemyAirBuffs = actualBattle.enemies[0].buffs.find(buff => buff.id === 'air_ball');
                    enemyIsAired = enemyAirBuffs && enemyAirBuffs.length > 0;
                  }
                  if (!enemyIsAired) {
                    // START: cast Air Ball
                    const newBuff = {
                      id: 'air_ball',
                      data: {
                        duration: 7,
                        totalDuration: 7,
                        icon: 'airBall.svg',
                        description: `Reduces enemy armor.`,
                        name: 'air ball'
                      },
                      constants: BUFFS['air_ball']
                    };
                    // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                    addBuff({ buff: newBuff, target: actualBattle.enemies[0], caster: caster, actualBattle });
                    buff.data.CDAirBall = 10.0;
                    // END: cast Air Ball
                  }
                }
              }
            }
          }
        } catch (err) {
        }
        // END: logic Air Ball
        
        // START: logic healing spells
        try {
          const unitsHealthSorted = _.sortBy(actualBattle.units, function(unit) { return unit.stats.health / unit.stats.healthMax; });
          const unitsHealthSortedNoMending = unitsHealthSorted.filter((unit) => {
            if (unit.buffs.find(buff => buff.id === 'mending_water')) {
              return false;
            }
            return true;
          });
          const lowHealthTest = unitsHealthSorted[0].stats.health / unitsHealthSorted[0].stats.healthMax;
          const lowHealthTestNoMending = unitsHealthSortedNoMending ? unitsHealthSortedNoMending[0].stats.health / unitsHealthSortedNoMending[0].stats.healthMax : 1.0;
          if (lowHealthTest < 0.70) {
            if (!castAnyHeal && buff.data.level >= 2 && buff.data.CDWaterBall <= 0.0) {
              // START: cast Water Ball
              const newBuff = {
                id: 'water_ball',
                data: {
                  icon: 'waterBall.svg',
                  description: `Directly heals target.`,
                  name: 'water ball'
                },
                constants: BUFFS['water_ball']
              };
              // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
              addBuff({ buff: newBuff, target: unitsHealthSorted[0], caster: caster, actualBattle });
              buff.data.CDWaterBall = 10.0;
              castAnyHeal = true;
              // END: cast Water Ball
            }
            if (!castAnyHeal && buff.data.level >= 1 && lowHealthTestNoMending < 0.70 && buff.data.CDMend <= 0.0 && unitsHealthSortedNoMending[0].stats.healthMax >= 500) {
              // START: cast Mending Water
              const newBuff = {
                id: 'mending_water',
                data: {
                  icon: 'mendingWater.svg',
                  description: `Heals target over time.`,
                  name: 'mending water',
                  duration: 20,
                  totalDuration: 20,
                },
                constants: BUFFS['mending_water']
              };
              // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
              addBuff({ buff: newBuff, target: unitsHealthSortedNoMending[0], caster: caster, actualBattle });
              buff.data.CDMend = 30.0;
              castAnyHeal = true;
              // END: cast Mending Water
            }
          }
        } catch (err) {
        }
        // END: logic healing spells
        
        /*
        if (castAnyHeal) {
          if (healthMaxAtStart === target.stats.healthMax) {
            // if we tried to cast a heal spell but our health max at the start and end wre the same, then we couldn't afford to cast anything
          }
        }
        */
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },
};
