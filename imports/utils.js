import lodash from 'lodash';

// Object sanity checker
export const IsValid = function IsValid( oObject ) {
  try {
    if (oObject === undefined) return false;
    if (oObject === null) return false;
    if (typeof oObject === 'undefined') return false;
    return true;
  } catch (err) {
  }
  return false;
};

// Converts a value to integer 'int' or returns 0 on error
export const CInt = function CInt( v ) {
	try {
    if (!IsValid(v)) return parseInt(0);
		if (!isNaN(v)) return Math.floor(v);
		let t = parseInt(v);
		if (isNaN(t)) return parseInt(0);
		return Math.floor(t);
	} catch (err) {
  }
	return parseInt(0);
};

// Converts a value to floating point 'double' or returns 0.0 on error
export const CDbl = function CDbl( v ) {
	try {
    if (!IsValid(v)) return parseFloat(0.0);
		if (!isNaN(v)) return parseFloat(v);
		let t = parseFloat(v);
		if (isNaN(t)) return parseFloat(0.0);
		return t;
	} catch (err) {
  }
	return parseFloat(0.0);
};

// Performs a quick, shallow copy of an object... much faster than JSON.parse(JSON.stringify(o))... but not a true deep copy.
// For a deep copy, use lodash's .cloneDeep() instead
export const CopyObject = function CopyObject( obj ) {
  if (typeof obj === 'object') {
    return lodash.clone(obj);
  } else if (Array.isArray(obj)) {
    return [ ...(obj) ];
  }
  return obj;
};

export const autoPrecisionValue = function autoPrecisionValue(origVal) {
  try {
    const origValMeasured = parseFloat(origVal);
    if (origValMeasured != 0.0) {
      
      let decimalDigits = 1;
      if (Math.abs(origValMeasured) >= 150) {
        decimalDigits = 0;
      } else if (Math.abs(origValMeasured) < 0.015) {
        decimalDigits = 4;
      } else if (Math.abs(origValMeasured) < 0.15) {
        decimalDigits = 3;
      } else if (Math.abs(origValMeasured) < 1.5) {
        decimalDigits = 2;
      }
      
      if (decimalDigits > 0) {
        const precMultiplier = parseFloat(Math.pow(10, decimalDigits));
        return parseFloat((Math.round(origValMeasured * precMultiplier) / precMultiplier).toFixed(decimalDigits));
      }

      return parseFloat(origValMeasured.toFixed(0));
    }
  } catch (err) {
    console.log(err);
  }
  
  return parseFloat(0.0);
};


















