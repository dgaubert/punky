'use strict'

const assert = require('assert')
const ParserInterface = require(__source + 'argv/parser-interface')

describe('parser-interface', () => {
  beforeEach(() => {
    this.parserInterface = new ParserInterface()
  })

  it('.parse() should throw "Unimplemented method" error', () => {
    assert.throws(() => {
      this.parserInterface.parse()
    }, 'Unimplemented method')
  })
})
