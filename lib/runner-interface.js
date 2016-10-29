'use strict'

class RunnerInterface {
  constructor () {
    if (new.target === RunnerInterface) {
      throw new Error('RunnerInterface cannot be directly constructed')
    }
  }

  run () {
    throw new Error('Unimplemented method')
  }

  close () {
    throw new Error('Unimplemented method')
  }

  exit () {
    throw new Error('Unimplemented method')
  }
}

module.exports = RunnerInterface
