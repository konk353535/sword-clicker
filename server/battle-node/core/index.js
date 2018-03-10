import { ABILITIES } from '../../constants/combat/index.js';
import { BATTLES } from '../../constants/battles/index.js';
import { FLOORS } from '../../constants/floors/index.js';
import { BUFFS } from '../../constants/buffs/index.js';

import uuid from 'node-uuid';
import _ from 'underscore';
import request from 'request-promise';

import dealDamage from './dealDamage';
import healTarget from './healTarget';
import autoAttack, { TICK_DURATION } from './autoAttack';
import castAbility from './castAbility';
import applyBattleActions from './applyBattleActions';
import Unit from './unit';
import { serverUrl } from '../config';

const secondsElapsed = (TICK_DURATION / 1000);

export default class Battle {

  constructor(battle, balancerId, io, removeBattle) {
    this.removeBattle = removeBattle;
    this.balancerId = balancerId;
    this.io = io;

    this.id = battle._id;
    this.level = battle.level;
    this.wave = battle.wave;
    this.room = battle.room;
    this.floor = battle.floor;
    this.isExplorationRun = battle.isExplorationRun;  
    this.owners = battle.owners;
    this.totalXpGain = battle.totalXpGain;
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

    io.of(`/${balancerId}`).on('connection', async (socket) => {
      socket.on('action', (data) => {
        this.battleActions.push(data);
      });
      socket.on('getFullState', () => {
        this.sendFullState();
      })
    });
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

    this.tickUnitsAndBuffs();

    this.unitAutoAttacks(this.enemies);
    this.unitAutoAttacks(this.units);

    this.applyBattleActions();

    this.updateAbilityCooldowns();

    this.checkGameOverConditions();

    this.tickCount++;
    this.postTick();
  }

  addUnit(unit) {
    if (unit.isEnemy) {
      this.deltaEvents.push({ type: 'push', path: 'enemies', value: unit.raw() });
      this.enemies.push(unit);
    } else {
      this.deltaEvents.push({ type: 'push', path: 'units', value: unit.raw() });
      this.units.push(unit);
    }
    this.updateUnitMaps();
  }

  removeUnit(unit) {
    if (unit.isEnemy) {
      this.deadEnemies.push(unit);
      this.enemies = this.enemies.filter((enemy) => {
        return enemy.id !== unit.id;
      });
      this.deltaEvents.push({ type: 'pop', path: 'enemies', value: unit.id });
    } else {
      this.deadUnits.push(unit);
      this.units = this.units.filter((unit) => {
        return unit.id !== unit.id;
      });
      this.deltaEvents.push({ type: 'pop', path: 'units', value: unit.id });
    }
    this.updateUnitMaps();
  }

  sendFullState() {
    this.io.of(`/${this.balancerId}`).emit('fullState', {
      battle: {
        units: this.units.map(unit => unit.raw()),
        enemies: this.enemies.map(unit => unit.raw()),
        tickEvents: this.tickEvents
      }
    });
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
        room: this.room,
        wave: this.wave,
        level: this.level,
        id: this.id,
        owners: this.owners
      }, 'dqv$dYT65YrU%s'],
      json: true
    })
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
        if (buff.constants.events.onTick) {
          buff.constants.events.onTick({ secondsElapsed, buff, target: unit, actualBattle: this });
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
        defender = _.sample(unit.isEnemy ? this.units : this.enemies);
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
        this.room += 1;
        // Strip out old dead enemies
        this.deadEnemies = [];
        // Populate battle with next room
        const newMonsters = FLOORS.genericTowerMonsterGenerator(this.floor, this.room);
        // Inject into battle
        newMonsters.forEach((monster) => {
          const randomUnitTarget = _.sample(this.units);
          this.totalXpGain += BATTLES.xpGain(monster.stats, monster.buffs);
          this.enemies.push({
            id: uuid.v4(),
            stats: monster.stats,
            icon: monster.icon,
            buffs: monster.buffs || [],
            target: randomUnitTarget.id,
            enemyId: monster.id,
            name: monster.name,
            tickOffset: this.tick + 2
          });
        });

        return;
      }
    }

    this.end();
  }
}
// Tick method #7
Battle.prototype.postTick = function postTick() {
  this.io.of(`/${this.balancerId}`).emit('tick', {
    tickEvents: this.tickEvents,
    deltaEvents: this.deltaEvents
  });

  this.deltaEvents = [];
  this.battleActions = [];
  this.tickEvents = [];
}

Battle.prototype.autoAttack = autoAttack;
Battle.prototype.dealDamage = dealDamage;
Battle.prototype.castAbility = castAbility;
Battle.prototype.healTarget = healTarget;
