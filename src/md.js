/**
 * Module dependencies
 */

let visit = require('unist-util-visit-parents')
let remark = require('remark')

/**
 * Export `md`
 */

module.exports = md

/**
 * Initialize `md`
 */

function md (original, add) {
  let a = original.split(' ').join('')
  let b = add.split(' ').join('')
  if (~a.indexOf(b)) return original

  let file = remark()
    .use(merge(remark().parse(add)))
    .process(original)

  return file.contents
}

function merge (add) {
  let { type, depth, ast } = classify(add)
  let inserted = false
  let passed = false

  return function (processor) {
    return function (tree) {
      depth
        ? visit(tree, depth_merge)
        : visit(tree, insert_after)

      if (!inserted) {
        tree.children = tree.children.concat(ast)
      }
    }

    /**
     * Find the
     */

    function depth_merge (node, parents) {
      if (inserted || node.type !== type || !node.depth) return

      // move
      if (!passed) {
        if (node.depth === depth) passed = true
        return
      }

      let parent = parents[parents.length - 1]
      let i = parent.children.indexOf(node)
      parent.children.splice.apply(parent.children, [i, 0].concat(ast))
      inserted = true
    }

    /**
     * Finds the first type that matches the added
     * type and adds the added type after it
     */

    function insert_after (node, parents) {
      if (inserted || node.type !== type) return
      let ancestor = parents[parents.length - 2]
      let parent = parents[parents.length - 1]
      let i = ancestor.children.indexOf(parent)
      if (~i) ancestor.children.splice.apply(ancestor.children, [i + 1, 0].concat(ast))
      inserted = true
    }
  }
}

function classify (ast) {
  let inline = ast.children.length > 0
    && ast.children[0].type === 'paragraph'
    && ast.children[0].children.length

  let heading = ast.children.length > 0
    && ast.children[0].type === 'heading'

  let block = ast.children.length > 0

  if (inline) {
    let type = ast.children[0].children[0].type
    return {
      type: type,
      ast: ast.children
    }
  } else if (heading) {
    let first = ast.children[0]
    return {
      type: first.type,
      depth: first.depth,
      ast: ast.children
    }
  } else if (block) {
    let first = ast.children[0]
    return {
      type: first.type,
      ast: ast.children
    }
  }
}
