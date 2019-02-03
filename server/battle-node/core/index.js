import { ABILITIES } from '../../constants/combat/index.js';
import { BATTLES } from '../../constants/battles/index.js';
import { FLOORS } from '../../constants/floors/index.js';
import { BUFFS } from '../../../imports/constants/buffs/index.js';

import uuid from 'node-uuid';
import _ from 'underscore';
import request from 'request-promise';

import dealDamage from './dealDamage';
import healTarget from './healTarget';
import autoAttack, { TICK_DURATION, secondsElapsed } from './autoAttack';
import castAbility from './castAbility';
import applyBattleActions from './applyBattleActions';
import Unit from './unit';
import { addBuff, removeBuff } from '../../battleUtils.js';
import { serverUrl } from '../config';

export const balancers = {};

export class Balancer {
  constructor(id, io, battleRef) {
    this.id = id;
    this.io = io;

    if (battleRef) {
      this.battleRef = battleRef;
    }

    io.of(`/${id}`).on('connection', async (socket) => {
      socket.on('action', (data) => {
        if (this.battleRef) {
          this.battleRef.battleActions.push(data);
        }
      });
      socket.on('getFullState', () => {
        if (this.battleRef) {
          this.battleRef.sendFullState();
        }
      });
    });
  }

  updateRef(battleRef) {
    this.battleRef = battleRef;
  }

  remove() {
    delete this.battleRef;
  }
}

export default class Battle {

  constructor(battle, balancer, io, removeBattle) {
    this.removeBattle = removeBattle;
    this.balancer = balancer;

    let globalSocket;
    if (!balancers[balancer]) {
      balancers[balancer] = new Balancer(balancer, io, this);
    } else {
      balancers[balancer].updateRef(this);
    }

    this.io = io;

    this.id = battle._id;
    this.level = battle.level;
    this.forfitters = {};
    this.historyStats = battle.historyStats;
    this.wave = battle.wave;
    this.room = battle.room;
    this.floor = battle.floor;
    this.isExplorationRun = battle.isExplorationRun;  
    this.owners = battle.owners;
    this.totalXpGain = battle.totalXpGain;
    this.startingBossHp = battle.startingBossHp;
    this.isOldBoss = battle.isOldBoss;
    this.server = battle.server;
    // { type, data }
    // types:
    //   abs: absolute change
    //   add: numeric addition
    //   push: add to array
    //   pop: remove from array
    // }
    this.deltaEvents = [];
    this.battleActions = [];
    this.tickEvents = [];
    this.deadUnits = [];
    this.deadEnemies = [];
    this.completedEnemies = [];
    this.bonusLoot = 0.0;
    this.allAliveUnits = [];

    this.units = battle.units.map(unit => new Unit(unit, this));
    this.enemies = battle.enemies.map(unit => new Unit(unit, this));
    this.tickCount = 0;
    this.initHelpers();
    this.intervalId = setInterval(() => {
      this.tick();
    }, TICK_DURATION);
  }

  isTower() {
    return ((this.floor) && (this.floor > 0)) || (this.room === "boss");
  }
  
  isPQ() {
    return (!this.isTower());
  }
  
  towerFloor() {
    return (this.isTower() ? this.floor : 0);
  }
  
  pqLevel() {
    return (!this.isTower() ? this.level : 0);
  }
  
  lookupOreTier(tier) {
    if (tier === 2) { return 'tin'; }
    if (tier === 3) { return 'bronze'; }
    if (tier === 4) { return 'iron'; }
    if (tier === 5) { return 'silver'; }
    if (tier === 6) { return 'gold'; }
    if (tier === 7) { return 'carbon'; }
    if (tier === 8) { return 'steel'; }
    if (tier === 9) { return 'platinum'; }
    if (tier === 10) { return 'titanium'; }
    if (tier === 11) { return 'tungsten'; }
    if (tier === 12) { return 'obsidian'; }
    if (tier === 13) { return 'cobalt'; }
    if (tier === 14) { return 'mithril'; }
    if (tier === 15) { return 'adamantium'; }
    if (tier === 16) { return 'orichalcum'; }
    if (tier === 17) { return 'meteorite'; }
    if (tier === 18) { return 'fairy_steel'; }
    if (tier === 19) { return 'elvent_steel'; }
    if (tier >= 20) { return 'cursed'; }
    return 'copper';
  }
  
  lookupMetalTier(tier) {
    if (tier === 2) { return 'tin'; }
    if (tier === 3) { return 'bronze'; }
    if (tier === 4) { return 'iron'; }
    if (tier === 5) { return 'silver'; }
    if (tier === 6) { return 'gold'; }
    if (tier === 7) { return 'carbon'; }
    if (tier === 8) { return 'steel'; }
    if (tier === 9) { return 'platinum'; }
    if (tier === 10) { return 'titanium'; }
    if (tier === 11) { return 'tungsten'; }
    if (tier === 12) { return 'obsidian'; }
    if (tier === 13) { return 'cobalt'; }
    if (tier === 14) { return 'mithril'; }
    if (tier === 15) { return 'adamantium'; }
    if (tier === 16) { return 'orichalcum'; }
    if (tier === 17) { return 'meteorite'; }
    if (tier === 18) { return 'fairy_steel'; }
    if (tier === 19) { return 'elvent_steel'; }
    if (tier === 20) { return 'cursed'; }
    if (tier === 21) { return 'darksteel'; }
    if (tier === 22) { return 'radiant'; }
    if (tier === 23) { return 'astral'; }
    if (tier === 24) { return 'titanfoil'; }
    if (tier === 25) { return 'relicrock'; }
    if (tier === 26) { return 'eternium'; }
    return 'copper';
  }
  
  lookupWoodTier(tier) {
    if (tier === 2) { return 'beech'; }
    if (tier === 3) { return 'ash'; }
    if (tier === 4) { return 'oak'; }
    if (tier === 5) { return 'maple'; }
    if (tier === 6) { return 'walnut'; }
    if (tier === 7) { return 'cherry'; }
    if (tier === 8) { return 'mahogany'; }
    if (tier === 9) { return 'elk'; }
    if (tier === 10) { return 'black'; }
    if (tier === 11) { return 'blue gum'; }
    if (tier === 12) { return 'cedar'; }
    if (tier === 13) { return 'denya'; }
    if (tier === 14) { return 'gombe'; }
    if (tier === 15) { return 'hickory'; }
    if (tier === 16) { return 'larch'; }
    if (tier === 17) { return 'poplar'; }
    if (tier === 18) { return 'tali'; }
    if (tier === 19) { return 'willow'; }
    if (tier >= 20) { return 'teak'; }
    return 'pine';
  }
  
  // not the same as 'reward level' exactly (reward level - 1)
  pqTowerEquivalence() {
    const currentPqLevel = this.pqLevel();
    if (currentPqLevel < 5) {
      return 0;
    }
    if (currentPqLevel < 10) {
      return 1;
    }
    if (currentPqLevel < 15) {
      return 2;
    }
    if (currentPqLevel < 20) {
      return 3;
    }
    if (currentPqLevel < 35) {
      return 4;
    }
    if (currentPqLevel < 45) {
      return 5;
    }
    if (currentPqLevel < 55) {
      return 6;
    }
    if (currentPqLevel < 70) {
      return 7;
    }
    if (currentPqLevel < 85) {
      return 8;
    }
    if (currentPqLevel < 95) {
      return 9;
    }
    if (currentPqLevel < 105) {
      return 10;
    }
    if (currentPqLevel < 120) {
      return 11;
    }
    if (currentPqLevel < 130) {
      return 12;
    }
    if (currentPqLevel < 140) {
      return 13;
    }
    if (currentPqLevel < 150) {
      return 14;
    }
    if (currentPqLevel < 160) {
      return 15;
    }
    if (currentPqLevel < 170) {
      return 16;
    }
    if (currentPqLevel < 180) {
      return 17;
    }
    if (currentPqLevel < 190) {
      return 18;
    }
    if (currentPqLevel < 200) {
      return 19;
    }
    return 20;
  }
  
  alliedPlayers() {
    try {
      const PCUnits = this.units.filter((unit) => {
        return !unit.isNPC && !unit.isCompanion && !unit.isSoloCompanion;
      });
      if (PCUnits) {
        return PCUnits;
      }
    } catch (err) {
    }
    return [];
  }
      
  alliedNPCs() {
    try {
      const NPCUnits = this.units.filter((unit) => {
        return unit.isNPC;
      });
      if (NPCUnits) {
        return NPCUnits;
      }
    } catch (err) {
    }
    return [];
  }
    
  haveAnyAlliedNPCs() {
    return this.alliedNPCs().length > 0;
  }
    
  companions() {
    try {
      const companionUnits = this.units.filter((unit) => {
        return unit.isCompanion;
      });
      if (companionUnits) {
        return companionUnits;
      }
    } catch (err) {
    }
    return [];
  }
    
  haveAnyCompanions() {
    return this.companions().length > 0;
  }
   
  soloCompanions() {
    try {
      const soloCompanionUnits = this.units.filter((unit) => {
        return unit.isSoloCompanion;
      });
      if (soloCompanionUnits) {
        return soloCompanionUnits;
      }
    } catch (err) {
    }
    return [];
  }
    
  haveAnySoloCompanions() {
    return this.soloCompanions().length > 0;
  }
  
  initHelpers() {
    this.updateUnitMaps();
  }

  updateUnitMaps() {
    this.unitsMap = {};
    this.enemiesMap = {};
    this.allUnitsMap = {};
    this.units.concat(this.deadUnits).forEach((unit) => {
      this.allUnitsMap[unit.id] = unit;
      this.unitsMap[unit.id] = unit;
    });
    this.enemies.concat(this.deadEnemies).forEach((enemy) => {
      this.allUnitsMap[enemy.id] = enemy;
      this.enemiesMap[enemy.id] = enemy;
    });
    this.allAliveUnits = this.units.concat(this.enemies);
  }

  tick() {
    if (this.tickCount === 0) {
      this.initPassives();
    }
    
    // First 4 ticks (~800ms) of every new combat and 2 ticks (~400ms) of new room transitions for full-floor explorations
    // will deny auto-attacks and losses, giving players a chance to assess the combat and use taunts and heals.

    this.inactivePlayers();
    
    this.tickUnitsAndBuffs();

    if (this.tickCount >= 4) {
      this.unitAutoAttacks(this.enemies);
      this.unitAutoAttacks(this.units);
    }

    this.applyBattleActions();

    this.updateAbilityCooldowns();

    if (this.tickCount >= 4) 
      this.checkGameOverConditions();

    this.tickCount++;
    this.postTick();
  }

  addUnit(unit) {
    if (!unit.isUnitClass) {
      unit = new Unit(unit, this);
    }
    
    if (!this.historyStats) {
      this.historyStats[unit.id] = {
        name: unit.name,
        damageDone: 0,
        damageTaken: 0,
        healingDone: 0,
        damageDoneCompanion: 0,
        damageTakenCompanion: 0,
        healingDoneCompanion: 0
      };
    }

    if (unit.isEnemy) {
      const event = { type: 'push', path: 'enemies', value: unit.raw() };
      this.deltaEvents.push(event);
      this.enemies.push(unit);
    } else {
      const event = { type: 'push', path: 'units', value: unit.raw() };
      this.deltaEvents.push(event);
      this.units.push(unit);
    }
    
    this.updateUnitMaps();
  
    // when a new unit is spawned in from an effect such as companion or bosses spawning adds, etc.
    if (unit.isEnemy) {      
      const newBuff = {
        id: 'name_changer_common',
        data: {
          duration: Infinity,
          totalDuration: Infinity,
          icon: '',
          description: '',
          name: '',
          hideBuff: true
        },
        constants: BUFFS['name_changer_common']
      };
        
      addBuff({ buff: newBuff, target: unit, caster: unit, actualBattle: this });      
    }
    
    return unit;
  }

  removeUnit(targetUnit) {
    if (targetUnit.isEnemy) {
      this.deadEnemies.push(targetUnit);
      this.enemies = this.enemies.filter((enemy) => {
        return enemy.id !== targetUnit.id;
      });
      this.deltaEvents.push({ type: 'pop', path: 'enemies', value: targetUnit.id });
    } else {
      this.deadUnits.push(targetUnit);
      this.units = this.units.filter((unit) => {
        return unit.id !== targetUnit.id;
      });
      this.deltaEvents.push({ type: 'pop', path: 'units', value: targetUnit.id });
    }
    this.updateUnitMaps();
  }

  sendFullState() {
    try {
      const data = this;
      const connections = data.io.of(`/${this.balancer}`);
      
      // Disabled: don't emit to disconnected sockets
      /*
      this.io.of(`/${this.balancer}`).emit('fullState', {
        battle: {
          units: this.units.map(unit => unit.raw()),
          enemies: this.enemies.map(unit => unit.raw()),
          tickEvents: this.tickEvents,
          floor: this.floor,
          room: this.room,
          level: this.level,
          wave: this.wave,
          id: this.id
        }
      });
      */
      
      Object.entries(connections.connected).map( ([k, v]) => ({ [k]: v}) ).forEach(function(connectedSocket_raw) {
        try {
          const connectedSocket = connectedSocket_raw[Object.keys(connectedSocket_raw)[0]];
          
          connectedSocket.emit('fullState', {
            battle: {
              units: data.units.map(unit => unit.raw()),
              enemies: data.enemies.map(unit => unit.raw()),
              tickEvents: data.tickEvents,
              floor: data.floor,
              room: data.room,
              level: data.level,
              wave: data.wave,
              id: data.id
            }
          });
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  finalCompletedEnemies() {
    let finalDeadEnemies = [];
    
    this.completedEnemies.forEach((this_enemy) => {
      let theres_a_match = false;
      finalDeadEnemies.forEach((already_dead_enemy) => {
        if (!theres_a_match && already_dead_enemy.id === this_enemy.id) {
          theres_a_match = true;
        }
      });
      if (!theres_a_match) {
        finalDeadEnemies.push(this_enemy);
      }
    });
    
    this.deadEnemies.forEach((this_enemy) => {
      let theres_a_match = false;
      finalDeadEnemies.forEach((already_dead_enemy) => {
        if (!theres_a_match && already_dead_enemy.id === this_enemy.id) {
          theres_a_match = true;
        }
      });
      if (!theres_a_match) {
        finalDeadEnemies.push(this_enemy);
      }
    });
    
    return finalDeadEnemies;
  }
  
  finalBonusLoot() {
    let bonusLootAmount = 0.0;
    this.finalCompletedEnemies().forEach((enemy) => {
      bonusLootAmount += (enemy.bonusLoot || 0.0);
    });
    return (this.bonusLoot + bonusLootAmount) / 100.0;
  }
  
  finalExtraLootTable() {
    let extraLootTableStuff = [];
    this.finalCompletedEnemies().forEach((enemy) => {
      if (enemy.extraLootTable && enemy.extraLootTable.length > 0) {
        extraLootTableStuff = extraLootTableStuff.concat(enemy.extraLootTable);
      }
    });
    return extraLootTableStuff;
  }

  end() {
    request({
      method: 'POST',
      uri: `${serverUrl}/methods/completeBattle`,
      body: [{
        // only players!
        units: this.units.concat(this.deadUnits).map(unit => unit.raw()).filter((unit) => {
          return !unit.isEnemy && !unit.isNPC && !unit.isCompanion && !unit.isSoloCompanion;
        }),
        enemies: this.enemies.concat(this.deadEnemies).map(unit => unit.raw()),
        floor: this.floor,
        totalXpGain: this.totalXpGain,
        startingBossHp: this.startingBossHp,
        isOldBoss: this.isOldBoss,
        room: this.room,
        wave: this.wave,
        server: this.server,
        historyStats: this.historyStats,
        isExplorationRun: this.isExplorationRun,
        level: this.level,
        id: this.id,
        owners: this.owners,
        completedEnemies: this.finalCompletedEnemies().map(unit => unit.raw()),
        bonusLoot: this.finalBonusLoot(),
        extraLootTable: this.finalExtraLootTable(),
      }, 'dqv$dYT65YrU%s'],
      json: true
    })
    balancers[this.balancer].remove();
    this.removeBattle(this.id, this.intervalId);
  }
}

// Tick method #1
Battle.prototype.initPassives = function initPassives() {
  this.allAliveUnits.forEach((unit) => {
    let enchantment_buffs = [];
    let enchantment_buffs_ids = [];
    
    // track applied enchantments from .startBattle
    unit.buffs.forEach((buff) => {
      try {
        if (buff.data.isEnchantment || BUFFS[buff.id].data.isEnchantment) {
          enchantment_buffs.push(buff);
          enchantment_buffs_ids.push(buff.id);
        }
      } catch (err) {
      }
    });

    // un-apply their effects
    while (enchantment_buffs.length > 0) {
      const buffToRemove = enchantment_buffs[0];
      removeBuff({ buff: buffToRemove, target: unit, caster: unit, actualBattle: this });
      enchantment_buffs.shift();
    }
    
    let abilities_and_enchantments_to_apply = [];
    enchantment_buffs_ids.forEach((enchantment_buff_id) => {
      const buffConstants = BUFFS[enchantment_buff_id];
      abilities_and_enchantments_to_apply.push({
        kind: 'enchantment',
        which: enchantment_buff_id,
        constants: buffConstants,
        priority: buffConstants.priority || 10
      });
    });
    if (unit.abilities) {
      unit.abilities.forEach((ability) => {
        if (ability.isPassive) {
          const buffConstants = BUFFS[ability.buffs[0]];
          
          abilities_and_enchantments_to_apply.push({
            kind: 'ability',
            which: ability,
            constants: buffConstants, // assume the buff ID points to a valid buff and that there's at least one (all abilities have at least one buff ID)
            priority: buffConstants.priority || 0
          });
        }
      });
    }
    
    abilities_and_enchantments_to_apply.sort((ability_or_enchantment_A, ability_or_enchantment_B) => {
      return ability_or_enchantment_A.priority - ability_or_enchantment_B.priority;
    });

    abilities_and_enchantments_to_apply.forEach((ability_or_enchantment) => {
      if (ability_or_enchantment.kind === 'ability') {
        const targets = [unit.id];
        ability_or_enchantment.which.cast(targets);
      } else if (ability_or_enchantment.kind === 'enchantment') {
        const newBuff = {
          id: ability_or_enchantment.which,
          data: Object.assign(ability_or_enchantment.constants.data, {
            name: ability_or_enchantment.constants.name,
            description: ability_or_enchantment.constants.description({buff: ability_or_enchantment.constants, level: 1}), // enchantments don't have levels
            icon: ability_or_enchantment.constants.icon,
            isEnchantment: true }),
          constants: ability_or_enchantment.constants
        };        
        addBuff({ buff: newBuff, target: unit, caster: unit, actualBattle: this });      
      }
    });
    
    /*
    // apply passive abilities first
    if (unit.abilities) {
      unit.abilities.forEach((ability) => {
        if (ability.isPassive) {
          const targets = [unit.id];
          ability.cast(targets);
        }
      });
    }
    
    // re-apply enchantments
    if (enchantment_buffs_ids.length > 0) {
      enchantment_buffs_ids.forEach((enchantment_buff_id) => {
        const buffConstants = BUFFS[enchantment_buff_id];
        
        const newBuff = {
          id: enchantment_buff_id,
          data: Object.assign(buffConstants.data, {
            name: buffConstants.name,
            description: buffConstants.description({buff: buffConstants, level: 1}), // enchantments don't have levels
            icon: buffConstants.icon,
            isEnchantment: true }),
          constants: buffConstants
        };
        
        addBuff({ buff: newBuff, target: unit, caster: unit, actualBattle: this });      
      });
    }
    */
    
    // initial enemy units loaded in (first, possibly only, floor)    
    if (unit.isEnemy) {
      const newBuff = {
        id: 'name_changer_common',
        data: {
          duration: Infinity,
          totalDuration: Infinity,
          icon: '',
          description: '',
          name: '',
          hideBuff: true
        },
        constants: BUFFS['name_changer_common']
      };
        
      addBuff({ buff: newBuff, target: unit, caster: unit, actualBattle: this });      
    }
  });
}
// Tick method #1.5 (because I'm not gonna renumber them :P)
Battle.prototype.inactivePlayers = function inactivePlayers() {
  // check for inactive players and apply or remove 'idle_player' buffs as appropriate
  this.units.forEach((unit) => {
    let hasBuff = false;
    let buffToRemove;
    unit.buffs.forEach((buff) => {
      if (buff.id === 'idle_player') {
        hasBuff = true;
        buffToRemove = buff;
      }
    });
    if (unit.inactiveMinutes && unit.inactiveMinutes > 5) {
      if (!hasBuff) {
        const newBuff = {
          id: 'idle_player',
          data: {
            duration: Infinity,
            totalDuration: Infinity,
            icon: 'sleeping.png',
            description: `You are idle and aren't providing your full combat bonuses.`,
            name: 'Idle'
          },
          constants: BUFFS['idle_player']
        };

        addBuff({ buff: newBuff, target: unit, caster: unit, actualBattle: this });
      }
    } else {
      if (hasBuff) {
        removeBuff({ buff: buffToRemove, target: unit, caster: unit, actualBattle: this });
      }
    }
  });
}
// Tick method #2
Battle.prototype.tickUnitsAndBuffs = function tickUnitsAndBuffs() {
  this.allAliveUnits.forEach((aliveUnit) => {
    if (aliveUnit.tick) {
      aliveUnit.tick();
    }

    if (aliveUnit.buffs) {
      // Buffs can do things on tick, will collect them in the form of combatEvents
      aliveUnit.buffs.forEach((buff) => {
        if (!buff.constants) {
          buff.constants = BUFFS[buff.id];
        }

        let caster = aliveUnit;
        
        // Find original caster for .onApply() and .onTick()
        try {
          if (buff._isBuffClass && buff.data.casterUnit) { 
            try {
              this.units.forEach((localUnit) => {
                if (localUnit.id === buff.data.casterUnit) {
                  caster = localUnit;
                }
              });
              this.enemies.forEach((localEnemy) => {
                if (localEnemy.id === buff.data.casterUnit) {
                  caster = localEnemy;
                }
              });
            } catch (err) {
            }
          }
        } catch (err) {
        }

        try {
          if (buff._isBuffClass && buff.onApply) { 
            if (!buff.data.didApply) {
              buff.onApply({buff, caster: caster, target: aliveUnit, actualBattle: this});
              buff.data.didApply = true;
            }
          }
        } catch (err) {
          console.log("Couldn't buff.onApply()");
          console.log(err);
        }
        
        try {
          if (buff._isBuffClass && buff.onTick) {
            buff.onTick({secondsElapsed, buff, caster: caster, target: aliveUnit, actualBattle: this});
          }
        } catch (err) {
          console.log("Couldn't buff.onTick()");
          console.log(err);
        }
      });
    }
  });
}
// Tick method #3
Battle.prototype.unitAutoAttacks = function unitAutoAttacks(units) {
  units.forEach((unit) => {
    if (unit.attackIn <= 0) {
      unit.attackIn = unit.stats.attackSpeedTicks;
      let defender = unit.target ? this.allUnitsMap[unit.target] : false;

      if (!defender || defender.stats.health <= 0) {
        if (unit.isEnemy) {
          defender = _.sample(this.units);
        } else {
          defender = this.enemies[0];
        }

        if (!defender) {
          return;
        }
        unit.target = defender.id;
      }

      this.autoAttack({
        attacker: unit,
        defender,
        tickEvents: this.tickEvents,
        historyStats: this.historyStats
      });
    }
  });
}
// Tick method #4
Battle.prototype.applyBattleActions = applyBattleActions;
// Tick method #5
Battle.prototype.updateAbilityCooldowns = function updateAbilityCooldowns() {
  this.allAliveUnits.forEach((unit) => {
    if (unit.abilities) {
      unit.abilities.forEach((ability) => {
        if (ability.currentCooldown > 0) {
          ability.currentCooldown -= secondsElapsed;
        }
      });
    }
  });
}
// Tick method #6
Battle.prototype.checkGameOverConditions = function checkGameOverConditions() {
  if (this.enemies.length === 0 || this.units.length === 0) {
    // Before we end the battle, make sure it shouldn't continue
    if (this.isExplorationRun && this.units.length > 0) {
      if (this.room !== 'boss' && this.room < 7) {
        this.tickCount = 3; // give us back a delay
        
        this.room += 1;
        
        this.deltaEvents.push({
          path: 'room',
          type: 'abs',
          value: this.room
        });
        
        // Strip out old dead enemies
        this.completedEnemies = this.completedEnemies.concat(this.deadEnemies);
        this.deadEnemies = [];
        
        // Populate battle with next room
        const newMonsters = FLOORS.genericTowerMonsterGenerator(this.floor, this.room);
        
        // Inject into battle
        newMonsters.forEach((monster) => {
          const randomUnitTarget = _.sample(this.units);
          this.totalXpGain += BATTLES.xpGain(monster.stats, monster.buffs);
          const newUnit = new Unit({
            id: uuid.v4(),
            stats: monster.stats,
            icon: monster.icon,
            buffs: monster.buffs || [],
            target: randomUnitTarget.id,
            enemyId: monster.id,
            name: monster.name,
            isEnemy: true,
            tickOffset: 0
          }, this);
          this.enemies.push(newUnit);
          this.deltaEvents.push({
            path: 'enemies',
            type: 'push',
            value: newUnit.raw()
          });
        });
        
        this.updateUnitMaps();

        this.enemies.forEach((enemy) => {
          // new enemy units in a new room during exploration
          const newBuff = {
            id: 'name_changer_common',
            data: {
              duration: Infinity,
              totalDuration: Infinity,
              icon: '',
              description: '',
              name: '',
              hideBuff: true
            },
            constants: BUFFS['name_changer_common']
          };
            
          addBuff({ buff: newBuff, target: enemy, caster: enemy, actualBattle: this });      
        });

        return;
      }
    }

    this.end();
  }
}
// Tick method #7
Battle.prototype.postTick = function postTick() {
  if (this.tickEvents.length > 0 || this.deltaEvents.length > 0) {
    try {
      const data = this;
      const connections = data.io.of(`/${this.balancer}`);
      
      // Disabled: don't emit to disconnected sockets
      /*      
      this.io.of(`/${this.balancer}`).emit('tick', {
        tickEvents: this.tickEvents,
        deltaEvents: this.deltaEvents,
        tickCount: this.tickCount
      });
      */
      
      Object.entries(connections.connected).map( ([k, v]) => ({ [k]: v}) ).forEach(function(connectedSocket_raw) {
        try {
          const connectedSocket = connectedSocket_raw[Object.keys(connectedSocket_raw)[0]];
          
          connectedSocket.emit('tick', {
            tickEvents: data.tickEvents,
            deltaEvents: data.deltaEvents,
            tickCount: data.tickCount
          });
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  this.deltaEvents = [];
  this.battleActions = [];
  this.tickEvents = [];
}
Battle.prototype.checkDeath = function checkDeath(defender) {
  // Check if this unit is dead
  if (defender.stats.health <= 0 || !defender.stats.health) {
    defender.stats.health = 0;

    // Call death event for this defender
    if (defender.buffs) {
      // Buffs can do things on tick, will collect them in the form of combatEvents
      defender.buffs.forEach((buff) => {
        buff.constants = BUFFS[buff.id];
        if (buff.constants.events.onBeforeDeath) {
          buff.constants.events.onBeforeDeath({ buff, target: defender, actualBattle: this });
        }
      });
    }

    // Only kill defender if it is still dead
    if (defender.stats.health <= 0) {
      if (defender.onDeath) {
        defender.onDeath();
      }
      this.removeUnit(defender);
    }
  }
}
Battle.prototype.autoAttack = autoAttack;
Battle.prototype.dealDamage = dealDamage;
Battle.prototype.castAbility = castAbility;
Battle.prototype.healTarget = healTarget;
