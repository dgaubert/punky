'use strict'

const LoggerOutputInterface = require('./logger-output-interface')
const ErrorMessage = require('../utils/error-message')

class LoggerOutputs extends Set {
  add (output) {
    if (!(output instanceof LoggerOutputInterface)) {
      throw new Error(ErrorMessage.mustBe(output.constructor.name, LoggerOutputInterface.name))
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
