'use strict'

const FileTransport = require('winston').transports.File
const path = require('path')
const filename = path.join(__dirname, '.log')

class WinstonFile {
  static create () {
    return new FileTransport({
      filename: filename,
      timestamp: true
    })
  }
}

module.exports = WinstonFile
