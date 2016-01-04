'use strict'

const FileTransport = require('winston').transports.File
const path = require('path')
const filename = path.join(__dirname, '.log')

class WinstonFileTransport extends FileTransport {
  constructor () {
    super({
      filename: filename,
      timestamp: true
    })
  }
}

module.exports = WinstonFileTransport
