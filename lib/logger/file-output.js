'use strict'

const LoggerOutputInterface = require('../logger-output-interface')
const fs = require('fs')

class FileOutput extends LoggerOutputInterface {
  constructor (path) {
    super()
    this.level = 'info'
    this.stream = fs.createWriteStream(path)
  }

  isAvailable () {
    return (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development')
  }
}

module.exports = FileOutput
