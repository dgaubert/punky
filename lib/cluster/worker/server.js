'use strict'

const config = require('config')
const RunnerInterface = require('../../runner-interface')

class Server extends RunnerInterface {
  constructor (app, logger) {
    super()
    this.app = app
    this.logger = logger
    this.httpServer = null
  }

  run () {
    return new Promise((resolve, reject) => {
      const port = config.get('punky.port')

      this.httpServer = this.app.listen(port)

      if (!this.httpServer) {
        return reject(new Error('Server is not ready'))
      }

      this.httpServer.once('listening', () => {
        this.logger.info('Server started on port', port)
        resolve()
      })

      this.httpServer.once('error', (err) => {
        reject(err)
      })
    })
  }

  close () {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) {
        return resolve()
      }

      this.httpServer.once('close', () => {
        this.logger.info('Server stopped')
        resolve()
      })

      this.httpServer.once('error', (err) => {
        reject(err)
      })

      this.httpServer.close()
    })
  }
}

module.exports = Server
