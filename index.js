var ttry = require('promise-try');
var slice = Array.prototype.slice;

module.exports = function promiseMethod (fn, Promise) {
  return function () {
    return ttry(fn, slice.call(arguments), this, Promise);
  };
};
