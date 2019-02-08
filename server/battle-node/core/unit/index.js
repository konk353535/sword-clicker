import _ from 'underscore';

import Stats from './stats';
import Buff from './buff';
import Ability from './ability';

import { BUFFS } from '../../../../imports/constants/buffs/index.js';

import { addBuff, removeBuff } from '../../../../imports/battleUtils';

export default class Unit {

  get name() { return this._name; }
  set name(value) { this._name = value; }

  get icon() { return this._icon; }
  set icon(value) { this._icon = value; }

  get target() { return this._target; }
  set target(value) {
    this._target = value;
    this.delta('target');
  }

  get isEnemy() { return this._isEnemy; }
  set isEnemy(value) { this._isEnemy = value; }

  delta(stat) {
    const event = {
      type: 'abs',
      path: `unitsMap.${this.id}.${stat}`,
      value: this[stat]
    };

    this.battleRef.deltaEvents.push(event);
  }
  
  get team() {
    try {
      if (this.isEnemy) {
        if (this.battleRef.enemies) {
          return this.battleRef.enemies;
        }
      } else {
        if (this.battleRef.units) {
          return this.battleRef.units;
        }
      }
    } catch (err) {
    }    
    return [];
  }
  
  get allies() {
    const currentUnit = this;
    return currentUnit.team.filter((unit) => {
      return unit.id !== currentUnit.id;
    });
  }
  
  get opposition() {
    try {
      if (!this.isEnemy) {
        if (this.battleRef.enemies) {
          return this.battleRef.enemies;
        }
      } else {
        if (this.battleRef.units) {
          return this.battleRef.units;
        }
      }
    } catch (err) {
    }    
    return [];
  }
  
  get targetUnit() {
    try {
      const currentUnit = this;
      const oppositionList = currentUnit.opposition;
      if (oppositionList.length > 0) {
        let targetUnitFound;
        oppositionList.forEach((potentialTarget) => {
          if (potentialTarget.id === currentUnit.target) {
            targetUnitFound = potentialTarget;
          }
        });
        if (targetUnitFound) {
          return targetUnitFound;
        }
        return oppositionList[0];
      }
    } catch (err) {
    }
    return false;
  }
    
  get leftSideAlly() {
    let leftSideAlly;    
    try {
      leftSideAlly = this.team[this.team.indexOf(this) - 1];
    } catch (err) {
    }
    if (leftSideAlly) {
      return leftSideAlly;
    }
    return false;
  }
    
  get rightSideAlly() {
    let rightSideAlly;    
    try {
      rightSideAlly = this.team[this.team.indexOf(this) + 1];
    } catch (err) {
    }
    if (rightSideAlly) {
      return rightSideAlly;
    }
    return false;
  }
  
  get adjacentAllies() {
    let leftSideAllyFound = this.leftSideAlly;
    let rightSideAllyFound = this.rightSideAlly;
    
    if (leftSideAllyFound && rightSideAllyFound) {
      return [leftSideAllyFound, rightSideAllyFound];
    } else if (leftSideAllyFound) {
      return [leftSideAllyFound];
    } else if (rightSideAllyFound) {
      return [rightSideAllyFound];
    }
    return [];
  }
  
  constructor(unit, battleRef) {
    this.id = unit.id;
    this.isUnitClass = true;

    this._name = unit.name;
    this.battleRef = battleRef;
    this.battleSecret = unit.battleSecret;
    this.amulet = unit.amulet;
    this.mainHandType = unit.mainHandType;
    this.offHandType = unit.offHandType;
    this.towerContributions = unit.towerContributions;
    this.monsterType = unit.monsterType;
    this.isLamp = unit.isLamp || false;
    this.isNPC = unit.isNPC || false;
    this.isSilenced = false;
    this.isCompanion = unit.isCompanion || false;
    this.isSoloCompanion = unit.isSoloCompanion || false;
    this.inactiveMinutes = unit.inactiveMinutes || 0;
    this.enchantmentsList = unit.enchantmentsList;
    this.isStunned = false;
    this.isCharmed = false;
    this.isPacifist = false;

    if (unit.abilities) {
      this.abilitiesMap = {};
      this.abilities = unit.abilities.map((rawAbility) => {
        const ability = new Ability(rawAbility, this, battleRef);
        this.abilitiesMap[rawAbility.id] = ability;
        return ability;
      });
    }
    
    if (unit.skills) {
      this.skills = unit.skills;
    } else {
      this.skills = [];
    }

    this.buffs = unit.buffs.map(buff => new Buff(buff, this, this.battleRef));

    this.stats = new Stats(unit.stats, unit.id, battleRef);
    this.xpDistribution = unit.xpDistribution;
    this.towerContributionsToday = unit.towerContributionsToday;
    this.isTowerContribution = unit.isTowerContribution;

    this._icon = unit.icon;
    this.tickOffset = unit.tickOffset || 0;
    this._target = unit.target;

    this.attackIn = this.tickOffset || 1;
    this.bonusLoot = 0.0;
    this.extraLootTable = [];

    if (unit.owner) {
      this.owner = unit.owner;
    } else {
      this._isEnemy = true;
    }
  }

  tick() {
    this.attackIn--;
  }

  onDeath() {
    // Get who was targetting this unit, give them a new target
    this.battleRef.allAliveUnits.forEach((unit) => {
      if (unit.target === this.id) {
        if (unit.isEnemy) {
          if (this.battleRef.units.length > 0) {
            unit.target = this.battleRef.units[0].id;
          }
        } else {
          if (this.battleRef.enemies.length > 0) {
            unit.target = this.battleRef.enemies[0].id;
          }
        }
      }
    });
  }

  addBuffs(buffs) {
    buffs.forEach(buff => this.addBuff(buff));
  }

  addBuff(buff) {
    const newBuff = new Buff(buff, this, this.battleRef);
    this.buffs.push(newBuff);
    this.battleRef.deltaEvents.push({
      type: 'push',
      path: `unitsMap.${this.id}.buffs`,
      value: newBuff.raw()
    });
    return newBuff;
  }

  removeBuff(buffToRemove) {
    if (!buffToRemove.data.allowDuplicates) {
      this.battleRef.deltaEvents.push({
        type: 'pop',
        path: `unitsMap.${this.id}.buffs`,
        value: buffToRemove.id
      });
      this.buffs = this.buffs.filter(buff => buff.id !== buffToRemove.id);
    } else {
      let idx = -1;
      for (let i = 0; i < this.buffs.length; i++) {
        if (this.buffs[i].id === buffToRemove.id) {
          if ((idx === -1) || ((idx !== -1) && (this.buffs[idx].duration > this.buffs[i].duration))) {
            idx = i;
          }
        }
      }
      if (idx !== -1) {
        this.battleRef.deltaEvents.push({
          type: 'splice',
          path: `unitsMap.${this.id}.buffs`,
          value: idx
        });
        
        this.buffs.splice(idx, 1);
      }      
    }
  }
  
  findBuff(buffId) {
    try {
      let buffToFind = undefined;
      this.buffs.forEach((tempBuff) => {
        if (tempBuff.id === buffId) {
          buffToFind = tempBuff;
        }
      });
      return buffToFind;
    } catch (err) {
    }
    return false;
  }
  
  hasBuff(buffId) {
    const foundBuff = this.findBuff(buffId);
    return (foundBuff && foundBuff !== undefined && foundBuff !== null && foundBuff !== false && foundBuff.id && foundBuff.id.length > 0);
  }
  
  generateBuff({buffId, buffData}) {
    try {
      const buffLevel = (buffData && buffData.level) ? buffData.level : 1
      const newBuffConstants = BUFFS[buffId];
      const newBuff = {
        id: buffId,
        data: Object.assign(/*newBuffConstants.data, */ buffData, {
          name: (buffData && buffData.name) ? buffData.name : newBuffConstants.name,
          description: (buffData && _.isFunction(buffData.description)) ? buffData.description : newBuffConstants.description({buff: newBuffConstants, level: buffLevel}),
          icon: (buffData && buffData.icon) ? buffData.icon : newBuffConstants.icon,
          duration: (buffData && buffData.duration) ? buffData.duration : newBuffConstants.data.duration,
          totalDuration: (buffData && buffData.duration) ? buffData.duration : newBuffConstants.data.totalDuration,
          caster: this.id,
          //level: buffLevel // intentionally omitted (let it be supplied by 'buffData' if we want it, i.e.: no default)
        }),
        constants: newBuffConstants
      };
      return newBuff;
    } catch (err) {
      //console.log("Couldn't generate buff!");
      //console.log(err);
    }
    return false;
  }
  
  applyBuff({buff, fromUnit}) {
    const newBuff = addBuff({
      buff,
      target: this,
      caster: fromUnit || this,
      actualBattle: this.battleRef
    });
    
    if (!newBuff) {
      //console.log("Problem in unit.applyBuff()->addBuff()");
      //console.log(buff);
    }
    
    return newBuff;
  }
  
  applyBuffTo({buff, target}) {
    let newBuff;
    if (target && target.id) {
      newBuff = target.applyBuff({buff, fromUnit: this});
    } else {
      //console.log("Problem in unit.applyBuffTo->target.applyBuff (missing parameter 1#buff or 2#target");
      //console.log(buff);
      //console.log(target);
    }
    if (newBuff) {
      return newBuff;
    }
    return false;
  }
  
  tickMessage(label, customColor, customIcon) {
    if (this.battleRef && this.battleRef.tickEvents) {
      this.battleRef.tickEvents.push({from: this.id, to: this.id, eventType: 'special', label, customColor, customIcon: customIcon || 'noicon'});
    }
  }
  
  skillLevel(skillName) {
    try {
      const userSkillLevel = this.skills.filter((skill) => {
        return (skill.type.toLowerCase() === skillName.toLowerCase())
      });
      if ((userSkillLevel) && (userSkillLevel.length === 1) && (userSkillLevel[0].level > 0)) {
        return userSkillLevel[0].level;
      }
    } catch (err) {
    }
    return 1;
  }
  
  attackSkill() {
    return this.skillLevel('attack');
  }

  defenseSkill() {
    return this.skillLevel('defense');
  }

  magicSkill() {
    return this.skillLevel('magic');
  }

  healthSkill() {
    return this.skillLevel('health');
  }

  raw() {
    return {
      id: this.id,
      name: this.name,
      monsterType: this.monsterType,
      abilities: this.abilities ? this.abilities.map(ability => ability.raw()) : [],
      owner: this.owner,
      buffs: this.buffs && this.buffs.length > 0 ? this.buffs.map(buff => buff.raw()) : [],
      stats: this.stats.raw(),
      amulet: this.amulet,
      icon: this.icon,
      xpDistribution: this.xpDistribution,
      isTowerContribution: this.isTowerContribution,
      towerContributions: this.towerContributions,
      tickOffset: this.tickOffset,
      target: this.target,
      owner: this.owner,
      isEnemy: this.isEnemy,
      skills: this.skills ? this.skills : [],
      bonusLoot: this.bonusLoot || 0.0
    }
  }

}
