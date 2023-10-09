import lodash from "lodash"

// Object sanity checker
export const IsValid = function IsValid(oObject) {
    try {
        if (oObject === undefined) return false
        if (typeof oObject === "undefined") return false
        if (oObject === null) return false
        return true
    } catch (err) {}
    return false
}

// Converts a value to integer 'int' or returns 0 on error
export const CInt = function CInt(v) {
    try {
        if (!IsValid(v)) {
            return parseInt(0)
        } else if (typeof v === "number" && !isNaN(v)) {
            return Math.floor(v)
        } else if (typeof v === "string") {
            let t = parseInt(v)
            if (!isNaN(t)) {
                return Math.floor(t)
            }
        }
    } catch (err) {}
    return parseInt(0)
}

// Converts a value to floating point 'double' or returns 0.0 on error
export const CDbl = function CDbl(v) {
    try {
        if (!IsValid(v)) {
            return parseFloat(0.0)
        } else if (typeof v === "number" && !isNaN(v)) {
            return parseFloat(v)
        } else if (typeof v === "string") {
            let t = parseFloat(v)
            if (!isNaN(t)) {
                return t
            }
        }
    } catch (err) {}
    return parseFloat(0.0)
}

// Converts a value to a boolean or returns true on error
export const True = function True(v) {
    const defaultValue = true
    try {
        if (IsValid(v)) {
            if (typeof v === "boolean") {
                return v
            } else if (typeof v === "number") {
                if (v == 0) return false
                if (v == 1) return true
            } else if (typeof v === "string") {
                v = v.toLowerCase().trim()
                if (v.indexOf("t") === 0) return true
                if (v.indexOf("y") === 0) return true
                if (v == "checked") return true
                if (v == "1") return true
                if (v == "on") return true
                if (v.indexOf("f") === 0) return false
                if (v.indexOf("n") === 0) return false
                if (v == "unchecked") return false
                if (v == "0") return false
                if (v == "off") return true
            }
        }
    } catch (err) {}
    return defaultValue
}

// Converts a value to a boolean or returns false on error
export const False = function False(v) {
    const defaultValue = false
    try {
        if (IsValid(v)) {
            if (typeof v === "boolean") {
                return v
            } else if (typeof v === "number") {
                if (v == 0) return false
                if (v == 1) return true
            } else if (typeof v === "string") {
                v = v.toLowerCase().trim()
                if (v.indexOf("t") === 0) return true
                if (v.indexOf("y") === 0) return true
                if (v == "checked") return true
                if (v == "1") return true
                if (v == "on") return true
                if (v.indexOf("f") === 0) return false
                if (v.indexOf("n") === 0) return false
                if (v == "unchecked") return false
                if (v == "0") return false
                if (v == "off") return true
            }
        }
    } catch (err) {}
    return defaultValue
}

// Performs a quick, shallow copy of an object... much faster than JSON.parse(JSON.stringify(o))... but not a true deep copy.
// For a deep copy, use lodash's .cloneDeep() instead
export const CopyObject = function CopyObject(obj) {
    if (typeof obj === "object") {
        return lodash.clone(obj)
    } else if (Array.isArray(obj)) {
        return [...obj]
    }
    return obj
}

export const autoPrecisionValue = function autoPrecisionValue(origVal) {
    try {
        const origValMeasured = parseFloat(origVal)
        if (origValMeasured != 0.0) {
            let decimalDigits = 1
            if (Math.abs(origValMeasured) >= 150) {
                decimalDigits = 0
            } else if (Math.abs(origValMeasured) < 0.015) {
                decimalDigits = 4
            } else if (Math.abs(origValMeasured) < 0.15) {
                decimalDigits = 3
            } else if (Math.abs(origValMeasured) < 1.5) {
                decimalDigits = 2
            }

            if (decimalDigits > 0) {
                const precMultiplier = parseFloat(Math.pow(10, decimalDigits))
                return parseFloat(
                    (Math.round(origValMeasured * precMultiplier) / precMultiplier).toFixed(decimalDigits)
                )
            }

            return parseFloat(origValMeasured.toFixed(0))
        }
    } catch (err) {
        console.log(err)
    }

    return parseFloat(0.0)
}

export const autoPrecisionValueTight = function autoPrecisionValueTight(origVal) {
    try {
        const origValMeasured = parseFloat(origVal)
        if (origValMeasured != 0.0) {
            let decimalDigits = 1
            if (Math.abs(origValMeasured) >= 50) {
                decimalDigits = 0
            } else if (Math.abs(origValMeasured) < 0.015) {
                decimalDigits = 4
            } else if (Math.abs(origValMeasured) < 0.15) {
                decimalDigits = 3
            } else if (Math.abs(origValMeasured) < 1.5) {
                decimalDigits = 2
            }

            if (decimalDigits > 0) {
                const precMultiplier = parseFloat(Math.pow(10, decimalDigits))
                return parseFloat(
                    (Math.round(origValMeasured * precMultiplier) / precMultiplier).toFixed(decimalDigits)
                )
            }

            return parseFloat(origValMeasured.toFixed(0))
        }
    } catch (err) {
        console.log(err)
    }

    return parseFloat(0.0)
}
