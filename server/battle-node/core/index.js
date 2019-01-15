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
        owners: this.owners
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
    if (unit.abilities) {
      unit.abilities.forEach((ability) => {
        if (ability.isPassive) {
          const targets = [unit.id];
          ability.cast(targets);
        }
      });
    }
  });
}
// Tick method #2
Battle.prototype.tickUnitsAndBuffs = function tickUnitsAndBuffs() {
  this.allAliveUnits.forEach((unit) => {
    if (unit.tick) {
      unit.tick();
    }

    if (unit.buffs) {
      // Buffs can do things on tick, will collect them in the form of combatEvents
      unit.buffs.forEach((buff) => {
        buff.constants = BUFFS[buff.id];
        
        if (buff._isBuffClass && buff.constants.events.onApply) { 
          if (!buff.data.didApply) {
            buff.onApply({buff, target: unit, caster: unit, actualBattle: this});
            buff.data.didApply = true;
          }
        }
        
        if (buff._isBuffClass && buff.constants.events.onTick) {
          buff.constants.events.onTick({
            secondsElapsed,
            buff,
            target: unit,
            actualBattle: this
          });
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
