import { ABILITIES } from '../../constants/combat/index.js'; // List of available combat stats
import { BATTLES } from '../../constants/battles/index.js'; // List of available combat stats
import _ from 'underscore';

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
    this.deadUnits = [];
    this.deadEnemies = [];
    this.utils = {
      autoAttack,
      dealDamage,
      healTarget
    }

    this.initHelpers();

    this.intervalId = setInterval(() => {
      this.tick();
    }, TICK_DURATION);

    io.of(`/balancer/${balancerId}`).on('connection', async (socket) => {
      socket.on('action', () => {
        console.log('Action Called!');
      });

      socket.emit('tick');
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

  initPassives(unit) {
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
      })
    }
  }

  tick() {
    console.log('Tick');
    const secondsElapsed = (TICK_DURATION / 1000);
    const allAliveUnits = this.units.concat(this.enemies);
    if (this.tickCount === 0) {
      allAliveUnits.forEach((unit) => {
        this.initPassives(unit);
      });
    }

    // TODO: Tick Buffs

    // Apply Enemy Attacks
    this.enemies.forEach((enemy) => {
      // TODO: How effecient is this IF statement?
      if ((this.tickCount - enemy.tickOffset) % enemy.stats.attackSpeedTicks === 0 && this.tickCount > enemy.tickOffset) {
        // TODO: Only get a random defender, if the target is not alive
        let defender = _.sample(this.units);
        if (enemy.target) {
          const targetUnit = _.find(this.units, (unit) => {
            return unit.id === enemy.target
          });
          if (targetUnit) {
            defender = targetUnit;
          } else {
            enemy.target = defender.id;
          }
        } else {
          enemy.target = defender.id;
        }
        autoAttack({
          attacker: enemy,
          defender,
          tickEvents: this.tickEvents,
          historyStats: this.historyStats
        });
      }
    });

    this.tickCount++;
    this.postTick();
  }

  postTick() {
    this.io.of(`/balancer/${this.balancerId}`).emit('tick', {
      data: 'hello'
    });
    this.tickEvents = [];
  }

  end() {
    clearInterval(this.intervalId);
  }
}

const dealDamage = function(rawDamage, {
  attacker,
  defender,
  tickEvents,
  customColor,
  customIcon,
  isMagic,
  isTrueDamage,
  historyStats 
}) {
  if (!attacker) {
    return 0;
  }

  let damage = rawDamage;
  if (damage > 0 && damage) {
    let dmgReduction = BATTLES.dmgReduction(isMagic ? defender.stats.magicArmor : defender.stats.armor);

    if (dmgReduction < 0) {
      dmgReduction = 0;
    } else if (isTrueDamage) {
      dmgReduction = 0;
    } else if (dmgReduction > 1) {
      dmgReduction = 1;
    } else if (dmgReduction == null) {
      dmgReduction = 0;
    }
    damage = (rawDamage * (1 - dmgReduction)) * defender.stats.damageTaken;

    if (defender.isBoss && damage > 10000) {
      damage = 10000;
    }
    defender.stats.health -= damage;
  }

  if (historyStats && historyStats[attacker.id]) {
    historyStats[attacker.id].damageDone += damage;
  }

  if (historyStats && historyStats[defender.id]) {
    historyStats[defender.id].damageTaken += damage;
  }

  if(tickEvents) {
    tickEvents.push({
      from: attacker ? attacker.id : '',
      to: defender.id,
      eventType: 'damage',
      label: damage.toFixed(1),
      customColor: isMagic ? 'blue' : customColor,
      customIcon: isMagic ? 'magic' : customIcon
    });
  }

  return damage;
}

const healTarget = function(healAmount, {
  target,
  caster,
  tickEvents,
  customColor,
  customIcon,
  historyStats
}) {
  if (caster && caster.stats && caster.stats.healingPower && _.isFinite(caster.stats.healingPower)) {
    healAmount *= (1 + (caster.stats.healingPower / 100));
  }

  if (target.stats.healingReduction != null) {
    healAmount *= target.stats.healingReduction;
  }

  target.stats.health += healAmount;
  if (target.stats.health > target.stats.healthMax) {
    target.stats.health = target.stats.healthMax;
  }

  if (caster && historyStats && historyStats[caster.id]) {
    historyStats[caster.id].healingDone += healAmount;
  }

  if(tickEvents) {
    tickEvents.push({
      from: caster ? caster.id : '',
      to: target.id,
      eventType: 'heal',
      label: (healAmount).toFixed(1),
      customColor: '#f5528b',
      customIcon: 'health'
    });
  }
}

const autoAttack = function({ attacker, defender, tickEvents, historyStats, originalAutoAttack = true }) {
  // Do we hit?
  let hitGap = attacker.stats.accuracy - defender.stats.defense;
  let hitChance = 0.5;

  if (hitGap > 0) {
    // Favours attacker
    const extraChance = (Math.abs(hitGap) / (Math.abs(hitGap) + 50)) / 2;
    hitChance += extraChance;
  } else {
    // Favours defender
    const extraChance = (Math.abs(hitGap) / (Math.abs(hitGap) + 50)) / 2;
    hitChance -= extraChance;
  }

  if (defender.stats.minimumHitChance && hitChance > (1 - defender.stats.minimumHitChance)) {
    hitChance = 1 - defender.stats.minimumHitChance;
  }

  if (hitChance >= Math.random()) {
    // How much do we hit for
    const extraRawDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
    let rawDamage = attacker.stats.attack + extraRawDamage;

    // Is this a crit?
    let customIcon;
    if (attacker.stats.criticalChance && Math.random() <= (attacker.stats.criticalChance / 100)) {
      rawDamage *= attacker.stats.criticalDamage;
      customIcon = 'criticalStrike';
    }

    const damageDealt = dealDamage(rawDamage, {
      attacker,
      defender,
      tickEvents,
      customIcon,
      historyStats
    });

    // Tick didDamage event on attacker
    if (attacker.buffs) {
      attacker.buffs.forEach((buff) => {
        buff.constants = BUFFS[buff.id];
        if (buff.constants.events.onDidDamage) {
          // Did Damage
          buff.constants.events.onDidDamage({
            originalAutoAttack,
            secondsElapsed,
            buff,
            defender,
            attacker,
            actualBattle,
            damageDealt,
            rawDamage
          })
        }
      });
    }

    // Tick tookDamage event on defender
    if (defender.buffs) {
      defender.buffs.forEach((buff) => {
        buff.constants = BUFFS[buff.id];
        if (buff.constants.events.onTookDamage) {
          // Took Damage
          buff.constants.events.onTookDamage({ secondsElapsed, buff, defender, attacker, actualBattle, damageDealt })
        }
      });
    }

  } else {
    dealDamage(0, { attacker, defender, tickEvents, historyStats });
  }
}
