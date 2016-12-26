'use strict'

const assert = require('assert')
const RunnerInterface = require(__lib + 'runner-interface')

class Runner extends RunnerInterface {}

describe('runner-interface', () => {
  beforeEach(() => {
    this.runnerInterface = new Runner()
  })

  it('.run() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.runnerInterface.run(), 'Unimplemented method')
  })

  it('.close() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.runnerInterface.close(), 'Unimplemented method')
  })

  it('.exit() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.runnerInterface.exit(), 'Unimplemented method')
  })
})
