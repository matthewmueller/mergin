/**
 * JSON
 */

let extend = require('deep-extend')
let YAML = require('js-yaml')

/**
 * Export `yaml`
 */

module.exports = yaml


/**
 * Merge YAML
 *
 * @param {String} previous
 * @param {String} current
 * @return {String}
 */

function yaml (previous, current) {
  previous = YAML.safeLoad(previous)
  current = YAML.safeLoad(current)
  return YAML.safeDump(extend(previous, current))
}
