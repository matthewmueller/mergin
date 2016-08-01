/**
 * Module dependencies
 */

let json = require('./json')

/**
 * Export `merge`
 */

module.exports = merge

/**
 * Initialize `merge`
 */

function merge (original, update) {
  // TODO: handle merging scripts
  return json(original, update)
}
