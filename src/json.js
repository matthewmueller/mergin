/**
 * Module Dependencies
 */

let extend = require('deep-extend')

/**
 * Export `json`
 */

module.exports = json

/**
 * Merge JSON
 *
 * @param {String} previous
 * @param {String} current
 * @return {String}
 */

function json (previous, current) {
  previous = JSON.parse(previous)
  current = JSON.parse(current)
  return JSON.stringify(extend(previous, current), true, 2) + '\n'
}
