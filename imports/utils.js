import lodash from 'lodash';

// Object sanity checker
export const IsValid = function IsValid( oObject ) {
  try {
    if (typeof oObject === 'undefined') return false;
    if (oObject === undefined) return false;
    if (oObject === null) return false;
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
		if (typeof v === 'undefined') return parseInt(0);
		if (v === null) return parseInt(0);
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
    if (!IsValid(v)) return parseFloat(0);
		if (!isNaN(v)) return parseFloat(v);
		if (typeof v === 'undefined') return parseFloat(0.0);
		if (v === null) return parseFloat(0.0);
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

// Prevents multiple subscriptions to the same collection -- note: sometimes we want multiple subscriptions, don't blindly use this everywhere!
export const meteorSingleSubscribe = function meteorSingleSubscribe( channel_name, channel_sub, channel_msg_limit ) {
  /*
  try {
    let local_channel_name = channel_name.toString().trim();

    let bAlreadySubscribed = false;

    jQuery.makeArray(Object.keys(Meteor.connection._subscriptions).map(key => Meteor.connection._subscriptions[key])).forEach(function(oThisSubscription) {
      try {
        if (oThisSubscription.name.toString().trim() === local_channel_name) {
          if ((typeof channel_sub !== 'undefined') && (oThisSubscription.params > 0))
          {
            if (oThisSubscription.params[0].toString().trim() === channel_sub.toString().trim()) {
              bAlreadySubscribed = true
            }
          } else {
            bAlreadySubscribed = true;
          }
        }
      } catch (err) {
      }
    });

    if (bAlreadySubscribed) {
      return;
    }
  } catch (err) {
    // on any exception, just blindly try to subscribe to the channel by letting this function reach the end
  }
  */
  
  if (typeof channel_msg_limit !== 'undefined') {
    Meteor.subscribe(channel_name, channel_sub, channel_msg_limit);
  } else if (typeof channel_sub !== 'undefined') {
    Meteor.subscribe(channel_name, channel_sub);
  } else if (typeof channel_name !== 'undefined') {
    Meteor.subscribe(channel_name);
  }
}
