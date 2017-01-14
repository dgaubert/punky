'use strict'

const LoggerOutputInterface = require('./logger-output-interface')

class LoggerOutputs extends Set {
  add (output) {
    if (!(output instanceof LoggerOutputInterface)) {
      throw new Error('LoggerOutput must be a LoggerOutputInterface instance')
    }

    if (output.isAvailable()) {
      super.add(output)
    }

    return this
  }

  toArray () {
    return Array.from(this.values())
  }
}

module.exports = LoggerOutputs
