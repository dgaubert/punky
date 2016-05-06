'use strict'

const ParserInterface = require(__source + 'parser-interface')

describe('parser-interface', () => {
  beforeEach(() => {
    this.parserInterface = new ParserInterface()
  })

  it('.parse() should throw "Unimplemented method" error', () => {
    (() => {
      this.parserInterface.parse()
    }).should.throw('Unimplemented method')
  })
})
