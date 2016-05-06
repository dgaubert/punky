'use strict'

const RunnerInterface = require(__source + 'runner-interface')

describe('runner-interface', () => {
  beforeEach(() => {
    this.runnerInterface = new RunnerInterface()
  })

  it('.run() should throw "Unimplemented method" error', () => {
    (() => {
      this.runnerInterface.run()
    }).should.throw('Unimplemented method')
  })

  it('.exit() should throw "Unimplemented method" error', () => {
    (() => {
      this.runnerInterface.exit()
    }).should.throw('Unimplemented method')
  })
})
