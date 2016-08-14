'use strict'

class LoggerOutputs extends Set {
  add (output) {
    if (output.isAvailable()) {
      super.add(output)
    }

    return this
  }

  linkTo (logger) {
    const outputs = Array.from(this.values())

    logger(outputs)
    return this
  }
}

module.exports = LoggerOutputs
