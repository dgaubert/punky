'use strict'

const assert = require('assert')
const ParserInterface = require(__lib + 'argv/parser-interface')

class Parser extends ParserInterface {}

describe('parser-interface', () => {
  beforeEach(() => {
    this.parser = new Parser()
  })

  it('.parse() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.parser.parse(), 'Unimplemented method')
  })
})
