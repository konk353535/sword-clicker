import Battle from ".."

import { magic } from "../../types/magic"

export default class Magic {
    unitId: string
    battleRef: Battle

    _firePool: number
    firePoolMax: number
    fireReserve: number
    _earthPool: number
    earthPoolMax: number
    earthReserve: number
    _airPool: number
    airPoolMax: number
    airReserve: number
    _waterPool: number
    waterPoolMax: number
    waterReserve: number
    _necroticPool: number
    necroticPoolMax: number
    necroticReserve: number

    get firePool() {
        return this._firePool
    }
    set firePool(value) {
        if (this._firePool != value) {
            this._firePool = value
            this.delta("firePool")
        }
    }

    get earthPool() {
        return this._earthPool
    }
    set earthPool(value) {
        if (this._earthPool != value) {
            this._earthPool = value
            this.delta("earthPool")
        }
    }

    get airPool() {
        return this._airPool
    }
    set airPool(value) {
        if (this._airPool != value) {
            this._airPool = value
            this.delta("airPool")
        }
    }

    get waterPool() {
        return this._waterPool
    }
    set waterPool(value) {
        if (this._waterPool != value) {
            this._waterPool = value
            this.delta("waterPool")
        }
    }

    get necroticPool() {
        return this._necroticPool
    }
    set necroticPool(value) {
        if (this._necroticPool != value) {
            this._necroticPool = value
            this.delta("necroticPool")
        }
    }

    spend(magicType:string, amount:number) {
        if (magicType == "fire") {
            this.firePool = Math.max(0, this.firePool - amount)
        } else if (magicType == "earth") {
            this.earthPool = Math.max(0, this.earthPool - amount)
        } else if (magicType == "air") {
            this.airPool= Math.max(0, this.airPool - amount)
        } else if (magicType == "water") {
            this.waterPool = Math.max(0, this.waterPool - amount)
        } else if (magicType == "necrotic") {
            this.necroticPool = Math.max(0, this.necroticPool - amount)
        }
    }

    regenerateAll(amount:number) {
        ["fire", "earth", "air", "water", "necrotic"].forEach((magicType) => {
            this.regenerate(magicType, amount)
        })
    }

    regenerate(magicType:string, amount:number) {
        if (magicType == "fire") {
            amount = Math.min(amount, this.fireReserve)
            this.firePool = Math.min(this.firePoolMax, this.firePool + amount)
            this.fireReserve -= amount
        } else if (magicType == "earth") {
            amount = Math.min(amount, this.earthReserve)
            this.earthPool = Math.min(this.earthPoolMax, this.earthPool + amount)
            this.earthReserve -= amount
        } else if (magicType == "air") {
            amount = Math.min(amount, this.airReserve)
            this.airPool = Math.min(this.airPoolMax, this.airPool + amount)
            this.airReserve -= amount
        } else if (magicType == "water") {
            amount = Math.min(amount, this.waterReserve)
            this.waterPool = Math.min(this.waterPoolMax, this.waterPool + amount)
            this.waterReserve -= amount
        } else if (magicType == "necrotic") {
            amount = Math.min(amount, this.necroticReserve)
            this.necroticPool = Math.min(this.necroticPoolMax, this.necroticPool + amount)
            this.necroticReserve -= amount
        }
    }

    constructor(magic: magic, unitId: string, battleRef: Battle) {
        this.unitId = unitId
        this.battleRef = battleRef

        this.firePoolMax = this._firePool = 0
        this.fireReserve = 0
        this.earthPoolMax = this._earthPool = 0
        this.earthReserve = 0
        this.airPoolMax = this._airPool = 0
        this.airReserve = 0
        this.waterPoolMax = this._waterPool = 0
        this.waterReserve = 0
        this.necroticPoolMax = this._necroticPool = 0
        this.necroticReserve = 0

        if (magic) {
            this.firePoolMax = this._firePool = magic.firePool
            this.fireReserve = magic.fireReserve
            this.earthPoolMax = this._earthPool = magic.earthPool
            this.earthReserve = magic.earthReserve
            this.airPoolMax = this._airPool = magic.airPool
            this.airReserve = magic.airReserve
            this.waterPoolMax = this._waterPool = magic.waterPool
            this.waterReserve = magic.waterReserve
            this.necroticPoolMax =  this._necroticPool = magic.necroticPool
            this.necroticReserve = magic.necroticReserve
        }
    }

    delta(magicKey: keyof magic) {
        const event = {
            type: "abs",
            path: `unitsMap.${this.unitId}.stats.magic.${magicKey}`,
            value: this[magicKey]
        }

        this.battleRef.deltaEvents.push(event)
    }

    raw() {
        return {
            firePool: this._firePool,
            firePoolMax: this.firePoolMax,
            fireReserve: this.fireReserve,
            earthPool: this._earthPool,
            earthPoolMax: this.earthPoolMax,
            earthReserve: this.earthReserve,
            airPool: this._airPool,
            airPoolMax: this.airPoolMax,
            airReserve: this.airReserve,
            waterPool: this._waterPool,
            waterPoolMax: this.waterPoolMax,
            waterReserve: this.waterReserve,
            necroticPool: this._necroticPool,
            necroticPoolMax: this.necroticPoolMax,
            necroticReserve: this.necroticReserve
        }
    }
}
