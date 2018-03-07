import { ABILITIES } from '../../constants/combat/index.js'; // List of available combat stats
import { BATTLES } from '../../constants/battles/index.js'; // List of available combat stats
import _ from 'underscore';
import dealDamage from './dealDamage';
import healTarget from './healTarget';
import autoAttack from './autoAttack';

const TICK_DURATION = 100;

export default class Battle {

  constructor(battle, balancerId, io) {
    this.balancerId = balancerId;
    this.io = io;
    this.id = battle.id;
    this.units = battle.units;
    this.enemies = battle.enemies;
    this.tickCount = 0;
    this.tickEvents = [];
    this.battleActions = [];
    this.deadUnits = [];
    this.deadEnemies = [];
    this.utils = {
      autoAttack,
      dealDamage,
      healTarget
    }

    this.isExplorationRun = false;    

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

          console.log(abilityToCast);
          // Fetch who we are are targetting with this ability
          /*
          castAbility({
            ability: abilityToCast,
            caster: unit,
            targets: [unit],
            actualBattle
          });*/
        }
      });
    }
  }

  tick() {
    const secondsElapsed = (TICK_DURATION / 1000);
    const allAliveUnits = this.units.concat(this.enemies);

    if (this.tickCount === 0) {
      this.initPassives(allAliveUnits);
    }

    // TODO: Tick Buffs

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

  updateAbilityCooldowns(allUnits) {
    const secondsElapsed = (TICK_DURATION / 1000);
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

  applyBattleActions() {
    this.battleActions.forEach((action) => {
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

        // Check if the ability exists
        let unitAbility = casterUnit.abilities.find((ability) => {
          return ability.id === action.abiltiyId;
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
        const refundCast = castAbility({
          ability: abilityToCast,
          caster: actionCaster,
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
        let defender = _.sample(unit.isEnemy ? this.units : this.enemies);
        if (unit.target) {
          const targetUnit = this.allUnitsMap[unit.target];
          if (targetUnit) {
            defender = targetUnit;
          } else {
            unit.target = defender.id;
          }
        } else {
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
    console.log('Ending');
    clearInterval(this.intervalId);
  }
}

Battle.prototype.autoAttack = autoAttack;
Battle.prototype.dealDamage = dealDamage;
Battle.prototype.healTarget = healTarget;
