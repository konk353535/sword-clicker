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
    
    // first 1s worth of ticks of every new combat are 'paused', giving players a chance to assess the combat
    if (this.tickCount < 7) // ticks 0-6 = 1.4s of no combat for every new combat and ticks 2-6 = 1.0s of no combat for new room change (exploration)
    {
      this.tickUnitsAndBuffs();

      this.tickCount++;
      this.postTick();
      return;
    }
    
    if (this.tickCount === 7)
    {
      // First tick where action occurs, let's do things out of sequence by allowing battleActions to resolve first.
      // This allows target changes, taunting, heals, etc. for a few ticks at the start of combat and each new room.
      
      this.applyBattleActions(); 
    }

    this.tickUnitsAndBuffs();

    this.unitAutoAttacks(this.enemies);
    this.unitAutoAttacks(this.units);

    if (this.tickCount !== 7)
      this.applyBattleActions();

    this.updateAbilityCooldowns();

    this.checkGameOverConditions();

    this.tickCount++;
    this.postTick();
  }

  addUnit(unit) {
    if (!unit.isUnitClass) {
      unit = new Unit(unit, this);
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
    } catch (err) {
    }
  }

  end() {
    request({
      method: 'POST',
      uri: `${serverUrl}/methods/completeBattle`,
      body: [{
        units: this.units.concat(this.deadUnits).map(unit => unit.raw()),
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
        this.tickCount = 2; // give us back a delay
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
      this.io.of(`/${this.balancer}`).emit('tick', {
        tickEvents: this.tickEvents,
        deltaEvents: this.deltaEvents,
        tickCount: this.tickCount
      });    
    } catch (err) {
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
      defender.onDeath();
      this.removeUnit(defender);
    }
  }
}
Battle.prototype.autoAttack = autoAttack;
Battle.prototype.dealDamage = dealDamage;
Battle.prototype.castAbility = castAbility;
Battle.prototype.healTarget = healTarget;
