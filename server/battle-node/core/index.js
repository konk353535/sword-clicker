import { ABILITIES } from '../../constants/combat/index.js';
import { BATTLES } from '../../constants/battles/index.js';
import { BUFFS } from '../../constants/buffs/index.js';
import _ from 'underscore';
import request from 'request-promise';
import dealDamage from './dealDamage';
import healTarget from './healTarget';
import autoAttack from './autoAttack';
import castAbility from './castAbility';

const TICK_DURATION = 100;
const secondsElapsed = (TICK_DURATION / 1000);

export default class Battle {

  constructor(battle, balancerId, io, removeBattle) {
    this.removeBattle = removeBattle;
    this.balancerId = balancerId;
    this.io = io;

    this.id = battle._id;
    this.level = battle.level;
    this.room = battle.room;
    this.floor = battle.floor;
    this.isExplorationRun = battle.isExplorationRun;  
    this.owners = battle.owners;
    this.totalXpGain = battle.totalXpGain;

    this.units = battle.units;
    this.enemies = battle.enemies;

    this.tickCount = 0;

    this.tickEvents = [];
    this.battleActions = [];
    this.deadUnits = [];
    this.deadEnemies = [];

    this.initHelpers();
    this.intervalId = setInterval(() => {
      this.tick();
    }, TICK_DURATION);

    io.of(`/${balancerId}`).on('connection', async (socket) => {
      socket.on('action', (data) => {
        this.battleActions.push(data);
      });
    });
  }

  initHelpers() {
    this.updateUnitMaps();
  }

  updateUnitMaps() {
    // Todo: When adding units dynamically to a fight, they will not get added here
    //  Will need to add a generic method to add / remove units from a fight
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
  }

  initPassives(units) {
    units.forEach((unit) => {
      this.initUnitPassives(unit);
    });
  }

  initUnitPassives(unit) {
    if (unit.abilities) {
      unit.abilities.forEach((ability) => {
        if (ABILITIES[ability.id].isPassive) {
          const targets = [unit.id];
          // Cast it! and put it on cooldown
          const abilityToCast = JSON.parse(JSON.stringify(ABILITIES[ability.id]));
          abilityToCast.level = ability.level;

          // Fetch who we are are targetting with this ability
          this.castAbility({
            ability: abilityToCast,
            caster: unit,
            targets: [unit],
            actualBattle
          });
        }
      });
    }
  }

  tick() {
    const allAliveUnits = this.units.concat(this.enemies);

    if (this.tickCount === 0) {
      this.initPassives(allAliveUnits);
    }

    this.tickBuffs(allAliveUnits);

    this.unitAutoAttacks(this.enemies);
    this.unitAutoAttacks(this.units);

    // Apply battle actions
    this.applyBattleActions();

    // Update Ability Cooldowns
    this.updateAbilityCooldowns(allAliveUnits);

    // Check for game over conditions
    this.checkGameOverConditions();

    this.tickCount++;
    this.postTick();
  }

  tickBuffs(units) {
    units.forEach((unit) => {
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

  updateAbilityCooldowns(allUnits) {
    allUnits.forEach((unit) => {
      if (unit.abilities) {
        unit.abilities.forEach((ability) => {
          if (ability.currentCooldown > 0) {
            ability.currentCooldown -= secondsElapsed;
          }
        });
      }
    });
  }

  checkGameOverConditions() {
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
              id: Random.id(),
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

  removeUnit(defender) {
    if (defender.isEnemy) {
      this.deadEnemies.push(defender);
      this.enemies = this.enemies.filter((enemy) => {
        return enemy.id !== defender.id;
      });
    } else {
      this.deadUnits.push(defender);
      this.units = this.units.filter((unit) => {
        return unit.id !== defender.id;
      });
    }
    this.updateUnitMaps();
  }

  applyBattleActions() {
    this.battleActions.forEach((action) => {
      console.log(action);
      const casterId = action.caster;
      if (action.abilityId === 'changeTarget') {
        // Modify casters preferred target
        const targetUnit = this.allUnitsMap[casterId];
        if (targetUnit) {
          targetUnit.target = action.targets[0];
        }
      } else if (action.abilityId === 'clickAttack') {
        const targetId = action.targets[0];
        const targetUnit = this.enemiesMap[targetId];
        const casterUnit = this.unitsMap[casterId];

        // Ensure caster unit has sufficient energy
        if (targetUnit && casterUnit && casterUnit.amulet && casterUnit.amulet.energy >= 1) {
          casterUnit.amulet.energy -= 1;
          dealDamage(casterUnit.amulet.damage, {
            attacker: casterUnit,
            defender: targetUnit,
            actualBattle: this,
            tickEvents: this.tickEvents,
            historyStats: this.historyStats
          });
        }
      } else {
        // WANRING: You can't own multiple units so we can assume this one
        const casterUnit = this.unitsMap[casterId];

        if (!casterUnit.abilities) {
          return;
        }

        // Check if the ability exists
        let unitAbility = casterUnit.abilities.find((ability) => {
          return ability.id === action.abilityId;
        });

        if (!unitAbility || unitAbility.currentCooldown > 0) {
          return;
        }

        if (unitAbility.isSpell && unitAbility.casts <= 0) {
          return;
        }

        // Cast it! and put it on cooldown
        const abilityToCast = JSON.parse(JSON.stringify(ABILITIES[action.abilityId]));

        if (abilityToCast.isPassive) {
          return;
        }

        const unitsAndEnemies = this.units.concat(this.enemies);
        const actionTargets = unitsAndEnemies.filter((unit) => {
          return _.contains(action.targets, unit.id);
        });
        abilityToCast.level = unitAbility.level;

        // Fetch who we are are targetting with this ability
        const refundCast = this.castAbility({
          ability: abilityToCast,
          caster: casterUnit,
          targets: actionTargets,
          actualBattle: this
        });

        if (refundCast) {

        } else {
          unitAbility.casts -= 1;
          unitAbility.totalCasts += 1;
          unitAbility.currentCooldown = abilityToCast.cooldown;
        }
      }
    });
  }

  unitAutoAttacks(units) {
    units.forEach((unit) => {
      // TODO: How effecient is this IF statement?
      if ((this.tickCount - unit.tickOffset) % unit.stats.attackSpeedTicks === 0 && this.tickCount > unit.tickOffset) {
        // TODO: Only get a random defender, if the target is not alive
        let defender = unit.target ? this.allUnitsMap[unit.target] : false;

        if (!defender || defender.stats.health <= 0) {
          defender = _.sample(unit.isEnemy ? this.units : this.enemies);
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

  postTick() {
    this.io.of(`/${this.balancerId}`).emit('tick', {
      battle: {
        units: this.units,
        enemies: this.enemies,
        tickEvents: this.tickEvents
      }
    });
    this.battleActions = [];
    this.tickEvents = [];
  }

  end() {
    request({
      method: 'POST',
      uri: 'http://localhost:3201/methods/completeBattle',
      body: [{
        units: this.units.concat(this.deadUnits),
        enemies: this.enemies.concat(this.deadEnemies),
        floor: this.floor,
        totalXpGain: this.totalXpGain,
        room: this.room,
        id: this.id,
        owners: this.owners
      }],
      json: true
    })
    this.removeBattle(this.id);
    clearInterval(this.intervalId);
  }
}

Battle.prototype.autoAttack = autoAttack;
Battle.prototype.dealDamage = dealDamage;
Battle.prototype.castAbility = castAbility;
Battle.prototype.healTarget = healTarget;
