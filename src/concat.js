/**
 * Export `merge`
 */

module.exports = merge

/**
 * Initialize `merge`
 */

function merge (original, update) {
  let combined = original + '\n' + update
  combined = combined.split('\n')
  let lines = {}

  return combined.filter(function (line) {
    if (!line) return true
    if (lines[line]) return false
    return lines[line] = true
  }).join('\n').trim() + '\n'
}
