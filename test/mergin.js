/**
 * Module Dependencies
 */

let assert = require('assert')
let merge = require('..')
let path = require('path')
let fs = require('fs')

/**
 * Tests
 */

describe('merge', function () {

  describe('md', function() {
    it('inline', function () {
      let a = read('inline/a.md')
      let b = read('inline/b.md')
      let out = read('inline/out.md')
      assert.equal(merge('.md', a, b), out)
    })

    it('header', function() {
      let a = read('header/a.md')
      let b = read('header/b.md')
      let out = read('header/out.md')
      assert.equal(merge('.md', a, b), out)
    })

    it('should insert unfound inline elements at the end', function() {
      let a = read('inline-missing/a.md')
      let b = read('inline-missing/b.md')
      let out = read('inline-missing/out.md')
      assert.equal(merge('.md', a, b), out)
    })

    it('should insert unfound headers at the end', function() {
      let a = read('header-missing/a.md')
      let b = read('header-missing/b.md')
      let out = read('header-missing/out.md')
      assert.equal(merge('.md', a, b), out)
    })

    it('inline elements should be idempotent', function() {
      let a = read('inline/a.md')
      let b = read('inline/b.md')
      let merged = merge('.md', a, b)
      let out = read('inline/out.md')
      assert.equal(merge('.md', merged, b), out)
    })

    it('header elements should be idempotent', function() {
      let a = read('header/a.md')
      let b = read('header/b.md')
      let merged = merge('.md', a, b)
      let out = read('header/out.md')
      assert.equal(merge('.md', merged, b), out)
    })
  })

  describe('json', function() {
    it('should merge two json files', function() {
      let a = read('json/a.json')
      let b = read('json/b.json')
      let out = read('json/out.json')
      assert.equal(merge('.json', a, b), out)
    })
  })

  describe('yaml', function() {
    it('should merge two yaml files', function() {
      let a = read('yaml/a.yml')
      let b = read('yaml/b.yml')
      let out = read('yaml/out.yml')
      assert.equal(merge('.yml', a, b), out)
    })
  })

  describe('package.json', function() {
    it.skip('should handle scripts', function() {

    })
  })
})

function read (path) {
  return fs.readFileSync(fixture(path), 'utf8')
}

function fixture (name) {
  return path.join(__dirname, 'fixtures', name)
}
