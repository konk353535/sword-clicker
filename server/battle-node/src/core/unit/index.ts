import _ from "underscore"

import Ability from "./ability"
import Buff from "./buff"
import Stats from "./stats"

import { BUFFS } from "../../../../../imports/constants/buffs/index.js"

import Battle from ".."
import { fixupBuffText } from "../../../../battleUtils"
import { addBuff, removeBuff } from "../../../../../imports/battleUtils"
import { buff } from "../../types/buff"
import { enemy } from "../../types/enemy"
import { skill } from "../../types/skill"
import { unit } from "../../types/unit"

export const isUnit = (value: any): value is unit => {
    return value != null && value.hasOwnProperty("owner") && value.owner
}

export const isEnemy = (value: any): value is enemy => {
    return !isUnit(value)
}

export default class Unit {
    _name: string
    _icon: string
    _target!: string
    _isEnemy: boolean
    id: string
    battleRef: Battle
    _isAbleToChangeTargets: boolean
    _isAbleToUseAbilities: boolean
    _isAbleToCastSpells: boolean
    isUnitClass: boolean
    battleSecret?: string
    amulet: any
    mainHandWeapon: any
    mainHandType: any
    offHandType: any
    offHandIsMagic: any
    towerContributions: any
    monsterType?: string
    isLamp: boolean
    isNPC: boolean
    isSilenced: boolean
    isCompanion: boolean
    isSoloCompanion: boolean
    inactiveMinutes: any
    enchantmentsList: any
    currentClass?: any
    isStunned: boolean
    isCharmed: boolean
    isPacifist: boolean
    abilitiesMap?: { [k in string]: Ability }
    abilities?: Ability[]
    skills?: skill[]
    buffs: Buff[]
    stats: Stats
    xpDistribution: any
    towerContributionsToday: any
    isTowerContribution: any
    tickOffset: any
    attackIn: any
    bonusLoot: number
    extraLootTable: any[]
    owner?: string
    effectFlipDamageTypeAttack?: boolean
    effectFlipDamageTypeDefense?: boolean
    cantMiss?: boolean
    cantBeHit?: boolean

    get name() {
        return this._name
    }
    set name(value) {
        this._name = value
        this.delta("name")
    }

    get icon() {
        return this._icon
    }
    set icon(value) {
        this._icon = value
        this.delta("icon")
    }

    get target() {
        return this._target
    }
    set target(value) {
        this._target = value
        this.delta("target")
    }

    get isEnemy() {
        return this._isEnemy
    }
    set isEnemy(value) {
        this._isEnemy = value
    }

    delta(prop: string) {
        const event = {
            type: "abs",
            path: `unitsMap.${this.id}.${prop}`,
            value: 
                prop == "name" ? this.name : 
                prop == "icon" ? this.icon : 
                prop == "target" ? this.target : 
                ""
        }

        this.battleRef.deltaEvents.push(event)
    }

    get team() {
        try {
            if (!this.isEnemy && this.battleRef.units) {
                return this.battleRef.units
            }

            if (this.isEnemy && this.battleRef.enemies) {
                return this.battleRef.enemies
            }
        } catch (err) {}

        // error: couldn't find team list!!
        return []
    }

    get opposition() {
        try {
            if (!this.isEnemy && this.battleRef.enemies) {
                return this.battleRef.enemies
            }
            
            if (this.isEnemy && this.battleRef.units) {
                return this.battleRef.units
            }
        } catch (err) {}

        // error: couldn't find opposition list!!
        return []
    }

    // allies = team with this unit filtered out
    get allies() {
        const currentUnit = this

        return currentUnit.team.filter((unit) => {
            return unit.id !== currentUnit.id
        })
    }

    get targetIsValid(): boolean {
        return this.findTarget(false, false) != null
    }

    get targetUnit(): Unit | false {
        try {
            const currentUnitTargeted = this.findTarget(true, false)
            if (currentUnitTargeted != null) {
                return currentUnitTargeted
            }
        } catch (err) {}
        return false
    }

    findTarget(changeTarget: boolean = true, forced: boolean = false): Unit | null {
        let targetUnit: Unit | null = null

        if (forced) {
            this.target = ""
            changeTarget = true
        }

        this.opposition.forEach((opposingUnit) => {
            if (opposingUnit.id == this._target) {
                if (opposingUnit.stats.health > 0) {
                    targetUnit = opposingUnit
                }
            }
        })

        if (changeTarget) {
            if (!targetUnit || targetUnit == null) {
                const nonSageList = this.opposition.filter((opposingUnit) => {
                    return opposingUnit?.currentClass?.id !== "sage"
                })
                targetUnit = _.sample(nonSageList) || null
                if (targetUnit && targetUnit != null) {
                    this.target = targetUnit.id
                }
            }

            if (!targetUnit || targetUnit == null) {
                targetUnit = _.sample(this.opposition) || null
                if (targetUnit && targetUnit != null) {
                    this.target = targetUnit.id
                }
            }
        }

        return targetUnit
    }

    get leftSideAlly(): Unit | false {
        let leftSideAlly
        try {
            leftSideAlly = this.team[this.team.indexOf(this) - 1]
        } catch (err) {}
        if (leftSideAlly) {
            return leftSideAlly
        }
        return false
    }

    get rightSideAlly(): Unit | false {
        let rightSideAlly
        try {
            rightSideAlly = this.team[this.team.indexOf(this) + 1]
        } catch (err) {}
        if (rightSideAlly) {
            return rightSideAlly
        }
        return false
    }

    get adjacentAllies(): Unit[] {
        let leftSideAllyFound = this.leftSideAlly
        let rightSideAllyFound = this.rightSideAlly

        if (leftSideAllyFound && rightSideAllyFound) {
            return [leftSideAllyFound, rightSideAllyFound]
        } else if (leftSideAllyFound) {
            return [leftSideAllyFound]
        } else if (rightSideAllyFound) {
            return [rightSideAllyFound]
        }
        return []
    }

    get isAbleToChangeTargets() {
        return this._isAbleToChangeTargets
    }
    set isAbleToChangeTargets(value) {
        this._isAbleToChangeTargets = value

        if (!this._isAbleToChangeTargets) {
            if (!this.hasBuff("cant_change_targets")) {
                this.applyBuff({
                    buff: this.generateBuff({
                        buffId: "cant_change_targets",
                        buffData: {
                            duration: Infinity
                        }
                    })
                })
            }
        } else {
            while (this.findBuffs("cant_change_targets").length > 0) {
                const targetBuff = this.findBuff("cant_change_targets")
                if (targetBuff && !targetBuff.data.beingRemoved) {
                    targetBuff.data.beingRemoved = true
                    removeBuff({
                        buff: targetBuff,
                        target: this,
                        caster: this, // todo: is this worth looking up from buff.casterUnit (an ID) ?
                        actualBattle: this.battleRef
                    })
                }
            }
        }
    }

    get isAbleToUseAbilities() {
        return this._isAbleToUseAbilities
    }
    set isAbleToUseAbilities(value) {
        this._isAbleToUseAbilities = value

        if (!this._isAbleToChangeTargets) {
            if (!this.hasBuff("cast_use_abilities")) {
                this.applyBuff({
                    buff: this.generateBuff({
                        buffId: "cast_use_abilities",
                        buffData: {
                            duration: Infinity
                        }
                    })
                })
            }
        } else {
            while (this.findBuffs("cast_use_abilities").length > 0) {
                const targetBuff = this.findBuff("cast_use_abilities")
                if (targetBuff && !targetBuff.data.beingRemoved) {
                    targetBuff.data.beingRemoved = true
                    removeBuff({
                        buff: targetBuff,
                        target: this,
                        caster: this, // todo: is this worth looking up from buff.casterUnit (an ID) ?
                        actualBattle: this.battleRef
                    })
                }
            }
        }
    }

    get isAbleToCastSpells() {
        return this._isAbleToCastSpells
    }
    set isAbleToCastSpells(value) {
        this._isAbleToCastSpells = value
        if (!value) {
            if (!this.hasBuff("cant_use_spells")) {
                const buff = this.generateBuff({
                    buffId: "cant_use_spells",
                    buffData: {
                        duration: Infinity
                    }
                })
                if (buff !== false) {
                    this.applyBuff({
                        buff: buff
                    })
                }
            }
        } else {
            while (this.findBuffs("cast_use_abilities").length > 0) {
                const targetBuff = this.findBuff("cant_use_spells")
                if (targetBuff && !targetBuff.data.beingRemoved) {
                    targetBuff.data.beingRemoved = true
                    removeBuff({
                        buff: targetBuff,
                        target: this,
                        caster: this, // todo: is this worth looking up from buff.casterUnit (an ID) ?
                        actualBattle: this.battleRef
                    })
                }
            }
        }
    }

    constructor(unit: unit | enemy, battleRef: any) {
        this.id = unit.id
        this.isUnitClass = true

        if (isUnit(unit)) {
            this.battleSecret = unit.battleSecret
            this.amulet = unit.amulet
            this.mainHandWeapon = unit.mainHandWeapon
            this.mainHandType = unit.mainHandType
            this.offHandType = unit.offHandType
            this.offHandIsMagic = unit.offHandIsMagic
            this.towerContributions = unit.towerContributions
            this.inactiveMinutes = unit.inactiveMinutes || 0
            this.enchantmentsList = unit.enchantmentsList
            this.currentClass = unit.currentClass
            this.xpDistribution = unit.xpDistribution
            this.isTowerContribution = unit.isTowerContribution

            this.owner = unit.owner
            this._isEnemy = false

            if (unit.abilities) {
                this.abilitiesMap = {}
                this.abilities = unit.abilities.map((rawAbility) => {
                    const ability = new Ability(rawAbility, this, battleRef)
                    // @ts-expect-error
                    this.abilitiesMap[rawAbility.id] = ability
                    return ability
                })
            }

            if (unit.skills) {
                this.skills = unit.skills
            }
        } else {
            if (unit.monsterType != null) {
                this.monsterType = unit.monsterType
            }

            this.skills = []
            this._isEnemy = true
        }

        this._name = unit.name
        this.battleRef = battleRef

        this.isLamp = unit.isLamp || false
        this.isNPC = unit.isNPC || false
        this.isSilenced = false // can auto-attack, can't use spells or abilities (charmed and silenced are the same effect, basically)
        this.isCompanion = unit.isCompanion || false
        this.isSoloCompanion = unit.isSoloCompanion || false

        this.isStunned = false // can't perform any actions in combat (not spells, nor abilities, nor auto-attack)
        this.isCharmed = false // can auto-attack, can't use spells or abilities (charmed and silenced are the same effect, basically)
        this.isPacifist = false // can only perform non-hostile actions in combat
        this._isAbleToChangeTargets = true // can change targets in combat
        this._isAbleToUseAbilities = true // can use abilities in combat (distinct from spells)
        this._isAbleToCastSpells = true // can cast spells in combat (distinct from abilities)

        this.buffs = unit.buffs.map((buff) => new Buff(buff, this, this.battleRef))
        this.stats = new Stats(unit.stats, unit.id, battleRef)

        this._icon = unit.icon
        this.tickOffset = unit.tickOffset || 0

        this.attackIn = this.tickOffset || 1
        this.bonusLoot = 0.0
        this.extraLootTable = []
    }

    tick() {
        this.attackIn--
    }

    checkDeath() {
        if (this.battleRef) {
            this.battleRef.checkDeath(this, this)
        }
    }

    onDeath() {
        // Get who was targetting this unit, give them a new target
        this.battleRef.allAliveUnits.forEach((unit) => {
            if (unit.target === this.id) {
                if (unit.isEnemy) {
                    const differentUnit = _.sample(this.battleRef.units)
                    if (differentUnit != null) {
                        unit.target = differentUnit.id
                    }
                } else {
                    const differentUnit =  _.sample(this.battleRef.enemies)
                    if (differentUnit != null) {
                        unit.target = differentUnit.id
                    }
                }
            }
        })
    }

    addBuffs(buffs: buff[]) {
        buffs.forEach((buff) => this.addBuff(buff))
    }

    addBuff(buff: buff) {
        const newBuff = new Buff(buff, this, this.battleRef)
        this.buffs.push(newBuff)
        this.battleRef.deltaEvents.push({
            type: "push",
            path: `unitsMap.${this.id}.buffs`,
            value: newBuff.raw()
        })
        return newBuff
    }

    removeBuff(buffToRemove: Buff) {
        if (!buffToRemove.allowDuplicates) {
            this.battleRef.deltaEvents.push({
                type: "pop",
                path: `unitsMap.${this.id}.buffs`,
                value: buffToRemove.id
            })
            this.buffs = this.buffs.filter((buff) => buff.id !== buffToRemove.id)
        } else {
            // idk need to refactor this I think
            let idx = -1
            for (let i = 0; i < this.buffs.length; i++) {
                // @ts-expect-error
                if (this.buffs[i].id === buffToRemove.id) {
                    // @ts-expect-error
                    if (idx === -1 || (idx !== -1 && this.buffs[idx].duration > this.buffs[i].duration)) {
                        idx = i
                    }
                }
            }
            if (idx !== -1) {
                this.battleRef.deltaEvents.push({
                    type: "splice",
                    path: `unitsMap.${this.id}.buffs`,
                    value: idx
                })

                this.buffs.splice(idx, 1)
            }
        }
    }

    findBuff(buffId: string) {
        return this.buffs.findLast((buff) => buff.id == buffId)
    }

    findBuffs(buffId: string) {
        return this.buffs.filter((buff) => {
            return buff.id == buffId
        })
    }

    hasBuff(buffId: string): boolean {
        const foundBuff = this.findBuff(buffId)
        return foundBuff !== undefined
    }

    generateBuff({ buffId, buffData }: { buffId: string; buffData: any }) {
        try {
            const buffLevel = buffData && buffData.level ? buffData.level : 1
            const newBuffConstants = BUFFS[buffId]
            const newBuff = {
                id: buffId,
                data: Object.assign({}, /*newBuffConstants.data, */ buffData || {}, {
                    name: buffData && buffData.name ? buffData.name : newBuffConstants.name,
                    description:
                        buffData && _.isFunction(buffData.description)
                            ? buffData.description
                            : newBuffConstants.description({ buff: newBuffConstants, level: buffLevel }),
                    icon: buffData && buffData.icon ? buffData.icon : newBuffConstants.icon,
                    duration: buffData && buffData.duration ? buffData.duration : newBuffConstants.data.duration,
                    totalDuration:
                        buffData && buffData.duration ? buffData.duration : newBuffConstants.data.totalDuration,
                    caster: this.id,
                    //level: buffLevel // intentionally omitted (let it be supplied by 'buffData' if we want it, i.e.: no default)
                    allowDuplicates: buffData && buffData.allowDuplicates ? buffData.allowDuplicates : false,
                    duplicateCap: buffData && buffData.duplicateCap ? buffData.duplicateCap : 1
                }),
                constants: newBuffConstants
            }

            const fixedBuff = fixupBuffText(newBuff, undefined)
            newBuff.data.name = fixedBuff.data.name
            newBuff.data.description = fixedBuff.data.description

            return newBuff
        } catch (err) {
            //console.log("Couldn't generate buff!");
            //console.log(err);
        }
        return false
    }

    applyBuff({ buff, fromUnit }: { buff: any; fromUnit?: Unit }) {
        const newBuff = addBuff({
            buff,
            target: this,
            caster: fromUnit || this,
            actualBattle: this.battleRef
        })

        if (!newBuff) {
            //console.log("Problem in unit.applyBuff()->addBuff()");
            //console.log(buff);
        }

        return newBuff
    }

    applyBuffTo({ buff, target }: { buff: Buff; target: Unit }) {
        let newBuff
        if (target && target.id) {
            newBuff = target.applyBuff({ buff, fromUnit: this })
        } else {
            //console.log("Problem in unit.applyBuffTo->target.applyBuff (missing parameter 1#buff or 2#target");
            //console.log(buff);
            //console.log(target);
        }
        if (newBuff) {
            return newBuff
        }
        return false
    }

    tickMessage(label: string, customColor: string, customIcon: string, fromUnit: Unit) {
        if (this.battleRef && this.battleRef.tickEvents) {
            this.battleRef.tickEvents.push({
                from: fromUnit ? fromUnit.id : this.id,
                to: this.id,
                eventType: "special",
                label: label || "",
                customColor: customColor || "#000000",
                customIcon: customIcon || "noicon"
            })
        }
    }

    skillLevel(skillName: string) {
        try {
            const userSkillLevel = this.skills?.filter((skill) => {
                return skill.type.toLowerCase() === skillName.toLowerCase()
            })
            const skill = userSkillLevel?.[0]
            if (skill != null) {
                return skill.level
            }
        } catch (err) {}
        return 1
    }

    attackSkill() {
        return this.skillLevel("attack")
    }

    defenseSkill() {
        return this.skillLevel("defense")
    }

    magicSkill() {
        return this.skillLevel("magic")
    }

    healthSkill() {
        return this.skillLevel("health")
    }

    raw() {
        return {
            id: this.id,
            name: this.name,
            monsterType: this.monsterType,
            abilities: this.abilities ? this.abilities.map((ability) => ability.raw()) : [],
            owner: this.owner,
            buffs: this.buffs && this.buffs.length > 0 ? this.buffs.map((buff) => buff.raw()) : [],
            stats: this.stats.raw(),
            amulet: this.amulet,
            icon: this.icon,
            xpDistribution: this.xpDistribution,
            isTowerContribution: this.isTowerContribution,
            towerContributions: this.towerContributions,
            tickOffset: this.tickOffset,
            target: this.target,
            isEnemy: this.isEnemy,
            skills: this.skills ? this.skills : [],
            bonusLoot: this.bonusLoot || 0.0,
            isNPC: this.isNPC,
            isCompanion: this.isCompanion,
            isSoloCompanion: this.isSoloCompanion
        }
    }
}
