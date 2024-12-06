// Using an Immediately Invoked Function Expression (IIFE) to create a closure
var Inventory = (function() {
    // Private object to hold our constants
    var _constants = {
        HEADER: 'You are carrying:',
    };

    // Method to prevent setting new properties or modifying existing ones
    Object.freeze(_constants);

    // Returns an object with getter methods for each constant
    return {
        get HEADER() { return _constants.HEADER; },
        // get BASE_URL() { return _constants.BASE_URL; },
        // get DEFAULT_TIMEOUT() { return _constants.DEFAULT_TIMEOUT; },
        // get USER_ROLE() { 
        //     var roleConstants = {};
        //     for (var key in _constants.USER_ROLE) {
        //         Object.defineProperty(roleConstants, key, {
        //             get: function() {
        //                 return _constants.USER_ROLE[key];
        //             }
        //         });
        //     }
        //return Object.freeze(roleConstants);
    };
})();

// Expose the constants to the global scope or module (depending on how you're using this file)
//module.exports = Inventory; // For Node.js environment
// window.Constants = Constants; // For browser environment
