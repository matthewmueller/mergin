/**
 * Module dependencies
 */

let is_match = require('is-match')
let uniq = require('lodash.uniq')
let sliced = require('sliced')

/**
 * Export `merge`
 */

module.exports = merge

/**
 * Merge types
 */

let types = {
  '\.(?:gitignore|npmignore)$': require('./concat'),
  'package\.json$': require('./package.json'),
  '\.(?:md|markdown)$': require('./md'),
  '\.ya?ml$': require('./yaml'),
  '\.json$': require('./json')
}

/**
 * Initialize `merge`
 */

function merge (type) {
  type = '.' + type.replace(/^\./, '')

  let contents = sliced(arguments, 1)
  let strategy = null

  // check for empties & unique differences on all files
  contents = uniq(contents.reduce(empties, []))
  if (contents.length === 1) return contents.join('')

  for (let key in types) {
    if (is_match(new RegExp(key))(type)) {
      strategy = types[key]
      break
    }
  }

  return strategy
    ? contents.reduce(strategy)
    : false
}

/**
 * Check for empties
 *
 * @param {Array} contents
 * @return {String}
 */

function empties (original, update) {
  return update.length
    ? original.concat(update)
    : original
}
