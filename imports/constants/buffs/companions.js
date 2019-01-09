import moment from 'moment';
import { addBuff, removeBuff } from '../../battleUtils';
import { CDbl } from '../../utils.js';
import { BUFFS } from './index.js';
import lodash from 'lodash';
import _ from 'underscore';
import uuid from 'node-uuid';

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
                icon: 'babyFireFox.svg'
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
                icon: 'babyEarthFox.svg'
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
                timeTillCharge: 5                
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
  
  // Level 1: can auto-attack (speed 0.7) and can use Slash (with 10s CD) at level 1
  // Level 2: can Penetrating Slash at level 1 (with 10s CD) and upgrades Slash to level 2
  // Level 3: can use Bleed at level 1 (with 30s CD) and upgrades Penetrating Slash to level 2
  // Level 4: has Phantom Strikes 1 passive and upgrades Bleed to level 2 and Slash to level 3
  // Level 5: has Thirsty Fangs 1 passive and upgrades Phantom Strikes to level 2 and Penetrating slash to level 3
  // All levels:  gain attack damage, accuracy, and health for each level
  skeletal_warrior: {
    duplicateTag: 'skeletal_warrior',
    icon: 'boneWarrior.svg',
    name: 'skeletal warrior',
    description({ buff, level }) {
      if (level >= 5) {
        return `Summons a skeletal warrior who can use Thirsty Fangs Lv. 1, <br />Phantom Strikes Lv. 2, Bleed Lv. 2, Slash Lv. 3, <br />and Penetrating Slash Lv. 3 in battle.`;
      } else if (level === 4) {
        return `Summons a skeletal warrior who can use Phantom Strikes Lv. 1, <br />Bleed Lv. 2, Slash Lv. 3, and Penetrating Slash Lv. 2 in battle.`;
      } else if (level === 3) {
        return `Summons a skeletal warrior who can use Bleed Lv. 1, <br />Slash Lv. 2, and Penetrating Slash Lv. 2 in battle.`;
      } else if (level === 2) {
        return `Summons a skeletal warrior who can use Slash Lv. 2 and <br />Penetrating Slash Lv. 1 in battle.`;
      }
      return `Summons a skeletal warrior who can use Slash Lv. 1 in battle.`;
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

          // this companion won't help in personal quests
          // this companion won't help in battle with other solo companions
          if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {
            const attackSkill = target.attackSkill();
            const defenseSkill = target.defenseSkill();
            const magicSkill = target.magicSkill();
            const healthSkill = target.healthSkill();
            const towerFloor = actualBattle.towerFloor() < 5 ? 5 : actualBattle.towerFloor();
            
            let companion = {
              owner: target.id + '_companion',
              id: uuid.v4(),
              tickOffset: 0,
              isNPC: true,
              isCompanion: true,
              isSoloCompanion: true,
              icon: 'boneWarrior.svg',
              name: target.name + '\'s Warrior',
              stats: {
                attack: (Math.sqrt(attackSkill * 3) * towerFloor / 2.5) + (5 * buff.data.level),
                attackMax: (Math.sqrt(attackSkill * 3) * towerFloor / 1.5) + (20 * buff.data.level),
                attackSpeed: 0.7,
                accuracy: (Math.sqrt(attackSkill * 3) * towerFloor / 1.7) + (25 * buff.data.level),
                health: (Math.sqrt(healthSkill * 3) * towerFloor * 6.5) + (100 * buff.data.level),
                healthMax: (Math.sqrt(healthSkill * 3) * towerFloor * 6.5) + (100 * buff.data.level),
                defense: (Math.sqrt(defenseSkill * 3) * towerFloor / 3) + 15,
                armor: (Math.sqrt(defenseSkill * 3) * towerFloor / 2.5) + 25,
                magicArmor: (Math.sqrt(defenseSkill * 3) * towerFloor / 2.5),
                magicPower: magicSkill,
                damageTaken: 1 // damage received (1 = 100% of all incoming damage)
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
  // All levels:  gains health, defense, armor, and magic armor for each level
  cute_pig: {
    duplicateTag: 'cute_pig',
    icon: 'cutePig.svg',
    name: 'cute pig',
    description({ buff, level }) {
      if (level >= 3) {
        return `Summons a cute pig who taunts random <br />enemies every 4 seconds and squeals at <br />all enemies every 25 seconds.`;
      } else if (level === 2){
        return `Summons a cute pig who taunts random <br />enemies every 4 seconds.`;
      }
      return `Summons a cute pig who taunts random <br />enemies every 7 seconds.`;
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

          // this companion won't help in personal quests
          // this companion won't help in battle with other solo companions
          if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {
            const attackSkill = target.attackSkill();
            const defenseSkill = target.defenseSkill();
            const magicSkill = target.magicSkill();
            const healthSkill = target.healthSkill();
            const towerFloor = actualBattle.towerFloor() < 5 ? 5 : actualBattle.towerFloor();
            
            let companion = {
              owner: target.id + '_companion',
              id: uuid.v4(),
              tickOffset: 0,
              isNPC: true,
              isCompanion: true,
              isSoloCompanion: true,
              icon: 'cutePig.svg',
              name: target.name + '\'s Pig',
              stats: {
                attack: (Math.sqrt(attackSkill * 3) * towerFloor / 25) + 1, // pigs don't do much damage, they're tanks
                attackMax: (Math.sqrt(attackSkill * 3) * towerFloor / 25) + 2, // pigs don't do much damage, they're tanks
                attackSpeed: 0.3,
                accuracy: (Math.sqrt(attackSkill * 3) * towerFloor / 2.5) + 1,
                health: (Math.sqrt(healthSkill * 3) * towerFloor * 12.5) + (150 * buff.data.level),
                healthMax: (Math.sqrt(healthSkill * 3) * towerFloor * 12.5) + (150 * buff.data.level),
                defense: (Math.sqrt(defenseSkill * 3) * towerFloor / 1.45) + (25 * buff.data.level),
                armor: (Math.sqrt(defenseSkill * 3) * towerFloor * 1.65) + (100 * buff.data.level),
                magicArmor: (Math.sqrt(defenseSkill * 2) * towerFloor / 5) + (Math.sqrt(magicSkill * 2) * towerFloor / 5) + (20 * buff.data.level),
                magicPower: (Math.sqrt(magicSkill * 3) * towerFloor / 3),
                damageTaken: 1 // damage received (1 = 100% of all incoming damage)
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
                  timeTillCharge: 25,
                  level: buff.data.level,
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
    icon: 'fairy.svg',
    name: 'mystic fairy',
    description({ buff, level }) {
      if (level >= 5) {
        return `Summons a mystic fairy who can cast Water Dart, <br />Water Ball, Mending Water, and Water Wave <br />at allies.  She can also cast Air Ball at enemies and <br />has 10% damage reduction from all sources.`;
      } else if (level === 4) {
        return `Summons a mystic fairy who can cast Water Dart, <br />Water Ball, Mending Water, and Water Wave <br />at allies.  She can also cast Air Ball at enemies.`;
      } else if (level === 3) {
        return `Summons a mystic fairy who can cast Water Dart, <br />Water Ball, and Mending Water at allies. <br />She can also cast Air Ball at enemies.`;
      } else if (level === 2) {
        return `Summons a mystic fairy who can cast Water Dart, <br />Water Ball, and Mending Water at allies.`;
      }
      return `Summons a mystic fairy who can cast Water Dart <br />and Water Ball at allies.`;
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

          // this companion won't help in personal quests
          // this companion won't help in battle with other solo companions
          if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {
            const attackSkill = target.attackSkill();
            const defenseSkill = target.defenseSkill();
            const magicSkill = target.magicSkill();
            const healthSkill = target.healthSkill();
            const towerFloor = actualBattle.towerFloor() < 5 ? 5 : actualBattle.towerFloor();
            
            let companion = {
              owner: target.id + '_companion',
              id: uuid.v4(),
              tickOffset: 0,
              isNPC: true,
              isCompanion: true,
              isSoloCompanion: true,
              icon: 'fairy.svg',
              name: target.name + '\'s Fairy',
              stats: {
                attack: (Math.sqrt(attackSkill * 3) * towerFloor / 25) + 1, // fairies don't do much damage, they're supports
                attackMax: (Math.sqrt(attackSkill * 3) * towerFloor / 25) + 2, // fairies don't do much damage, they're supports
                attackSpeed: 0.3,
                accuracy: (Math.sqrt(attackSkill * 2) * towerFloor / 2.5) + 1,
                health: (Math.sqrt(healthSkill * 3) * towerFloor * 6) + (200 * buff.data.level),
                healthMax: (Math.sqrt(healthSkill * 3) * towerFloor * 6) + (200 * buff.data.level),
                defense: (Math.sqrt(defenseSkill * 3) * towerFloor / 2.75) + 5,
                armor: (Math.sqrt(defenseSkill * 3) * towerFloor / 1.25) + 5,
                magicArmor: (Math.sqrt(defenseSkill * 2) * towerFloor / 4) + (Math.sqrt(magicSkill * 3) * towerFloor / 2) + 40,
                magicPower: (Math.sqrt(magicSkill * 3) * towerFloor * 1.1) + (5 * buff.data.level),
                damageTaken: (buff.data.level >= 5 ? 0.9 : 1), // damage received (1 = 100% of all incoming damage)
                healingPower: 10 + (5 * buff.data.level),
              },
              buffs: [{
                id: 'companion_healer',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'companion healer',
                  icon: 'fairyMagic.svg',
                  doneInit: false,
                  level: buff.data.level,
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
      doneInit: false
    },
    events: {
      onApply({ buff, target, caster }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.doneInit) {
          buff.data.doneInit = true;
          buff.data.timeTillAction = 0.4;
          buff.data.CDSlash = 0.0;
          buff.data.CDPSlash = 0.0;
          buff.data.CDBleed = 0.0;
        }
        
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
            
            if (!enemyIsDodging)
            {
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
                  }
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
                    duration: 0,
                    totalDuration: 0,
                    icon: 'slash.svg',
                    description: ``,
                    name: 'slash',
                    level: buff.data.level === 1 ? 1 : buff.data.level === 2 ? 2 : buff.data.level === 3 ? 2 : buff.data.level === 4 ? 3 : buff.data.level === 5 ? 3 : 1
                  }
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
                    duration: 0,
                    totalDuration: 0,
                    icon: 'penetratingSlash.svg',
                    description: ``,
                    name: 'penetrating slash',
                    level: buff.data.level === 1 ? 1 : buff.data.level === 2 ? 1 : buff.data.level === 3 ? 1 : buff.data.level === 4 ? 2 : buff.data.level === 5 ? 3 : 1
                  }
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
          const targetToTaunt = lodash.sample(actualBattle.enemies);
          if (targetToTaunt && targetToTaunt.target !== target.id) {
            targetToTaunt.target = target.id
            buff.data.timeTillCharge = (buff.data.level > 1) ? 4 : 7;
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
        } else if (!actualBattle.isExplorationRun || actualBattle.room >= 3 || actualBattle.room === 'boss') {
          if (actualBattle.enemies.length > 1) {
            let neededToScream = false;
            actualBattle.enemies.forEach((enemy) => {
              if (enemy.target !== target.id) {
                neededToScream = true;
                enemy.target = target.id;
              }
            });
            if (neededToScream) {
              buff.data.timeTillCharge = 25;
            }
          }
        }

        if (buff.data.timeTillCharge < 0.4) {
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
      doneInit: false
    },
    events: {
      onApply({ buff, target, caster }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.doneInit) {
          buff.data.doneInit = true;
          buff.data.timeTillAction = 0.4;
          buff.data.CDAirBall = 0.0;
          buff.data.CDMend = 0.0;
          buff.data.CDWaterBall = 0.0,
          buff.data.CDWaterDart = 0.0;
          buff.data.CDWaterWave = 0.0;
        }
        
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
        
        if (buff.data.timeTillAction > 0) {
          buff.data.timeTillAction -= secondsElapsed;
        } else {
          
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
                        }
                      };
                      // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                      addBuff({ buff: newBuff, target: actualBattle.enemies[0], caster: target, actualBattle });
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
              // START: cast Water Wave
              const newBuff = {
                id: 'water_wave',
                data: {
                  icon: 'waterWave.svg',
                  description: `Directly heals all allies.`,
                  name: 'water wave',
                  duration: 0,
                  totalDuration: 0,
                }
              };
              // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
              addBuff({ buff: newBuff, target: unitsHealthSorted[0], caster: target, actualBattle });
              buff.data.CDWaterWave = 20.0;
              castAnyHeal = true;
              // END: cast Water Wave
            }
            if (lowHealthTest < 0.70) {
              if (!castAnyHeal && buff.data.CDWaterBall <= 0.0) {
                // START: cast Water Ball
                const newBuff = {
                  id: 'water_ball',
                  data: {
                    icon: 'waterBall.svg',
                    description: `Directly heals target.`,
                    name: 'water ball',
                    duration: 0,
                    totalDuration: 0,
                  }
                };
                // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                addBuff({ buff: newBuff, target: unitsHealthSorted[0], caster: target, actualBattle });
                buff.data.CDWaterBall = 10.0;
                castAnyHeal = true;
                // END: cast Water Ball
              }
              if (!castAnyHeal && buff.data.level >= 2 && lowHealthTestNoMending && buff.data.CDMend <= 0.0 && unitsHealthSortedNoMending[0].stats.healthMax >= 500) {
                // START: cast Mending Water
                const newBuff = {
                  id: 'mending_water',
                  data: {
                    icon: 'mendingWater.svg',
                    description: `Heals target over time.`,
                    name: 'mending water',
                    duration: 20,
                    totalDuration: 20,
                  }
                };
                // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                addBuff({ buff: newBuff, target: unitsHealthSortedNoMending[0], caster: target, actualBattle });
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
                    name: 'water dart',
                    duration: 0,
                    totalDuration: 0,
                  }
                };
                // this will take care of max health checks, max health reduction, applying the effect on the target, etc.
                addBuff({ buff: newBuff, target: unitsHealthSorted[0], caster: target, actualBattle });
                buff.data.CDWaterDart = 10.0;
                castAnyHeal = true;
                // END: cast Water Dart
              }
            }
          } catch (err) {
          }
          // END: logic healing spells
          
          buff.data.timeTillAction = 0.4;

          if (castAnyHeal) {
            if (healthMaxAtStart === target.stats.healthMax) {
              // couldn't afford to cast spells
              buff.data.timeTillAction = 5.0;
            }
          }
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },
};
