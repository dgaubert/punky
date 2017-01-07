'use strict'

const assert = require('assert')
const LoggerOutputs = require(__lib + 'logger/logger-outputs')
const LoggerOutputInterface = require(__lib + 'logger/logger-output-interface')

class LoggerOutput extends LoggerOutputInterface {
  constructor (available = true) {
    super()
    this.available = available
  }

  isAvailable () {
    return this.available
  }
}

describe('logger-outputs', () => {
  beforeEach(() => {
    this.loggerOutputs = new LoggerOutputs()
  })

  it('should be an instance of Set', () => {
    assert.ok(this.loggerOutputs instanceof Set)
  })

  it('.add() should add one output', () => {
    const loggerOutput = new LoggerOutput()

    this.loggerOutputs.add(loggerOutput)

    assert.equal(this.loggerOutputs.size, 1)
  })

  it('.add() twice the same logger-output should just add once', () => {
    const loggerOutput = new LoggerOutput()

    this.loggerOutputs.add(loggerOutput)
    this.loggerOutputs.add(loggerOutput)

    assert.equal(this.loggerOutputs.size, 1)
  })

  it('.add() should throw error if element to add is not a logger output', () => {
    const notAloggerOutput = {}

    assert.throws(() => this.loggerOutputs.add(notAloggerOutput), 'LoggerOutput must be a LoggerOutputInterface instance')
  })

  it('.toArray() should return an array of logger-outputs', () => {
    const loggerOutput = new LoggerOutput()

    this.loggerOutputs.add(loggerOutput)

    assert.ok(Array.isArray(this.loggerOutputs.toArray()))
    assert.equal(this.loggerOutputs.toArray().length, 1)
  })
})
