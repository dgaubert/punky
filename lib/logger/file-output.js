'use strict'

const FileTransport = require('winston').transports.File

class FileOutput extends FileTransport {
  constructor (filename) {
    super({
      filename: filename,
      timestamp: true
    })
  }
}

module.exports = FileOutput
