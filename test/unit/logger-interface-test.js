'use strict'

const LoggerInterface = require(__source + 'logger-interface')

describe('logger-interface', () => {
  beforeEach(() => {
    this.loggerInterface = new LoggerInterface()
  })

  it('.log() should throw "Unimplemented method" error', () => {
    (() => {
      this.loggerInterface.log()
    }).should.throw('Unimplemented method')
  })

  it('.info() should throw "Unimplemented method" error', () => {
    (() => {
      this.loggerInterface.info()
    }).should.throw('Unimplemented method')
  })

  it('.warn() should throw "Unimplemented method" error', () => {
    (() => {
      this.loggerInterface.warn()
    }).should.throw('Unimplemented method')
  })

  it('.error() should throw "Unimplemented method" error', () => {
    (() => {
      this.loggerInterface.error()
    }).should.throw('Unimplemented method')
  })
})
