'use strict'

const assert = require('assert')
const LoggerOutputInterface = require(__lib + 'logger/logger-output-interface')

class LoggerOutput extends LoggerOutputInterface {}

describe('logger-output-interface', () => {
  beforeEach(() => {
    this.loggerOutputInterface = new LoggerOutput()
  })

  it('create interface directly with "new" should throw error', () => {
    assert.throws(() => new LoggerOutputInterface(), 'LoggerOutputInterface cannot be directly constructed')
  })

  it('.isAvailable() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.loggerOutputInterface.isAvailable(), 'Unimplemented method')
  })
})
