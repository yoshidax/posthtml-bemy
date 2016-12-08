'use strict'

const test = require('ava')
const plugin = require('../lib/index')
const {readFileSync} = require('fs')
const path = require('path')
const posthtml = require('posthtml')
const fixtures = path.join(__dirname, 'fixtures')

test('basic', (t) => {
  return compare(t, 'basic')
})
test('option-preset-suitecss', (t) => {
  return compare(t, 'suitecss', { preset: 'suitecss' })
})
test('option-preset-custom-style', (t) => {
  return compare(t, 'custom', { blockPrefix: '@', elementPrefix: '___', modifirePrefix: '---' })
})


function compare (t, name, option) {
  const html = readFileSync(path.join(fixtures, `${name}.html`), 'utf8')
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8')

  return posthtml([plugin(option)])
    .process(html)
    .then((res) => t.truthy(res.html === expected))
}
