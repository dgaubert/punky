'use strict'

const assert = require('assert')
const RunnerInterface = require(__source + 'runner-interface')

describe('runner-interface', () => {
  beforeEach(() => {
    this.runnerInterface = new RunnerInterface()
  })

  it('.run() should throw "Unimplemented method" error', () => {
    assert.throws(() => {
      this.runnerInterface.run()
    }, 'Unimplemented method')
  })

  it('.close() should throw "Unimplemented method" error', () => {
    assert.throws(() => {
      this.runnerInterface.close()
    }, 'Unimplemented method')
  })

  it('.exit() should throw "Unimplemented method" error', () => {
    assert.throws(() => {
      this.runnerInterface.exit()
    }, 'Unimplemented method')
  })
})
