'use strict'

class RunnerInterface {
  run () {
    throw new Error('Unimplemented method')
  }

  exit () {
    throw new Error('Unimplemented method')
  }
}

module.exports = RunnerInterface
