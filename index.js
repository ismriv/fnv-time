/**
 * Time-prefixed FNV-1a Hashing function.
 *
 * Copyright (c) Ismael Rivera 2014
 * ISC License
 */
var fnvtime = {};
var fnv = require('fnv-plus');

/**
 * Compute the hash of a given value using the FNV-1a Hash
 * Algorithm to generate a 64 bit hash, and returns a string
 * ... add the current
 * date or a passed one encoded in base 36 as prefix.
 *
 * @param value {String} the string or object to hash
 * @param date {String} a date/timestamp to use in the prefix
 * @public
 */
fnvtime.hash = function (value, date) {
  var str = (typeof value === 'object') ? JSON.stringify(value) : value;
  var timestamp = (date && typeof date.getTime === 'function' ? date : new Date()).getTime();
  var hash64 = fnv.hash(str, 64);

  return [fnvtime.prefix, timestamp.toString(36), hash64.hex()].join('');
};


module.exports = function (prefix) {
  fnvtime.prefix = typeof prefix === 'string' ? prefix : '';
  return fnvtime.hash;
};
