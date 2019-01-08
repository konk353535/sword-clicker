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
            owner: target.id,
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
  
  skeletal_warrior: {
    duplicateTag: 'skeletal_warrior',
    icon: 'boneWarrior.svg',
    name: 'skeletal warrior',
    description() {
      return `Summons a skeletal warrior`;
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

          let companion = {
            owner: target.id,
            id: uuid.v4(),
            tickOffset: 0,
            isNPC: true,
            isCompanion: true,
            isSoloCompanion: true,
            icon: 'boneWarrior.svg',
            name: target.name + '\'s Warrior',
            stats: {
              attack: target.stats.attack * 0.25,
              attackMax: target.stats.attackMax * 0.25,
              attackSpeed: target.stats.attackSpeed * 0.5,
              accuracy: target.stats.accuracy * 0.8,
              health: target.stats.healthMax * 0.6,
              healthMax: target.stats.healthMax * 0.6,
              defense: target.stats.defense * 0.7,
              armor: target.stats.armor * 1.0,
              magicArmor: target.stats.magicArmor * 0.5,
              magicPower: target.stats.magicPower * 0.2,
              damageTaken: 1 // damage received (1 = 100% of all incoming damage)
            },
            buffs: [],
          };
          
          actualBattle.addUnit(companion);
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
              owner: target.id,
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
  
  // Level 1: knows how to cast water dart (10s CD)
  // Level 2: ALSO knows how to cast water ball (10s CD) and mending waters (30s CD) but will not cast
  //          mending water at any target that is already affected by a mending water
  // Level 3: ALSO knows how to cast air ball in boss rooms, individual floors, or exploration attempts
  //          at room 4+ at the first enemy target as long as that enemy doesn't already have air ball
  //          affecting it (10s CD)
  // Level 4: ALSO gains +10% damage reduction
  // Level 5: ALSO gains +10% damage reduction
  // All levels:  gains health, magic power, and healing power for each level
  mystic_fairy: {
    duplicateTag: 'mystic_fairy',
    icon: 'fairy.svg',
    name: 'mystic fairy',
    description({ buff, level }) {
      if (level >= 5) {
        return `Summons a mystic fairy who can cast Water Dart, <br />Water Ball, and Mending Water at allies. <br />She can also cast Air Ball at enemies and <br />has 20% damage reduction from all sources.`;
      } else if (level === 4) {
        return `Summons a mystic fairy who can cast Water Dart, <br />Water Ball, and Mending Water at allies. <br />She can also cast Air Ball at enemies and <br />has 10% damage reduction from all sources.`;
      } else if (level === 3) {
        return `Summons a mystic fairy who can cast Water Dart, <br />Water Ball, and Mending Water at allies. <br />She can also cast Air Ball at enemies.`;
      } else if (level === 2) {
        return `Summons a mystic fairy who can cast Water Dart, <br />Water Ball, and Mending Water at allies.`;
      }
      return `Summons a mystic fairy who can cast Water Dart at allies.`;
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
              owner: target.id,
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
                health: (Math.sqrt(healthSkill * 3) * towerFloor * 10) + (200 * buff.data.level),
                healthMax: (Math.sqrt(healthSkill * 3) * towerFloor * 10) + (200 * buff.data.level),
                defense: (Math.sqrt(defenseSkill * 3) * towerFloor / 2.75) + 5,
                armor: (Math.sqrt(defenseSkill * 3) * towerFloor / 1.25) + 5,
                magicArmor: (Math.sqrt(defenseSkill * 2) * towerFloor / 4) + (Math.sqrt(magicSkill * 3) * towerFloor / 2) + 40,
                magicPower: (Math.sqrt(magicSkill * 3) * towerFloor) + (5 * buff.data.level),
                damageTaken: (buff.data.level >= 3 ? 1 - ((buff.data.level - 3) * 0.1) : 1), // damage received (1 = 100% of all incoming damage)
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
          if (targetToTaunt && targetToTaunt.target !== target.id && targetToTaunt.stats.health > 0) {
            targetToTaunt.target = target.id
            buff.data.timeTillCharge = (buff.data.level > 1) ? 4 : 7;
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
          buff.data.timeTillAction = 1.0;
          buff.data.CDAirBall = 0.0;
          buff.data.CDMend = 0.0;
          buff.data.CDWaterBall = 0.0,
          buff.data.CDWaterDart = 0.0;
        }

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
        
        if (buff.data.timeTillAction > 0) {
          buff.data.timeTillAction -= secondsElapsed;
        } else {
          
          // START: logic Air Ball
          try {
            if (buff.data.level >= 3 && buff.data.CDAirBall <= 0.0) {
              if (actualBattle.isTower()) {
                if (!actualBattle.isExplorationRun || actualBattle.room >= 4 || actualBattle.room === 'boss') {              
                  if (actualBattle.enemies.length > 0) {
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
            if (lowHealthTest < 0.70) {
              if (buff.data.level >= 2 && buff.data.CDWaterBall <= 0.0) {
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
                // END: cast Water Ball
              } else if (buff.data.level >= 2 && lowHealthTestNoMending && buff.data.CDMend <= 0.0) {
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
                // END: cast Mending Water
              }
            } else if (lowHealthTest < 0.85) {
              // water dart
              if (buff.data.CDWaterDart <= 0.0) {
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
                // END: cast Water Dart
              }
            }
          } catch (err) {
          }
          // END: logic healing spells
          
          buff.data.timeTillAction = 1.0;
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },
};
