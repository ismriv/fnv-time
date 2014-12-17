/**
 * Time-prefixed FNV-1a Hashing function.
 *
 * Copyright (c) Ismael Rivera 2014
 * ISC License
 */
var fnv = require('fnv-plus');

module.exports = function (prefix) {
  prefix = typeof prefix === 'string' ? prefix : '';

  /**
   * Compute the hash of a given value using the FNV-1a Hash
   * Algorithm to generate a 64 bit hash, and returns a string
   * composed of a prefix (if passed), 8 characters for the
   * timestamp in its base 36 representation, and the fnv hash.
   *
   * @param value {String} the string or object to hash
   * @param date {String} a date/timestamp to prepend to the hash
   * @public
   */
  function hash(value, date) {
    var str = (typeof value === 'object') ? JSON.stringify(value) : value;
    var timestamp = (date && typeof date.getTime === 'function' ? date : new Date()).getTime();
    var hash64 = fnv.hash(str, 64);

    return [prefix, timestamp.toString(36), hash64.hex()].join('');
  }

  return hash;
};
