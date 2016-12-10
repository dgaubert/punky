'use strict'

const spawn = require('child_process').spawn

class AppSpawner {
  constructor (port = 0) {
    this.port = port
  }

  run () {
    return new Promise((resolve, reject) => {
      this.app = spawn('node', ['app.js', `-p ${this.port}`], {
        cwd: __dirname,
        // env: { 'NODE_ENV': 'test' },
        stdio: [ 'ignore', 'ignore', 'ignore', 'ipc' ]
      })

      this.app.on('error', err => reject(err))
      this.app.on('close', () => reject())
      this.app.on('disconnect', () => reject())
      this.app.on('exit', () => reject())

      this.app.on('message', message => message.port
        ? resolve(message.port)
        : reject(new Error('App is not available'))
      )
    })
  }

  stop () {
    return new Promise((resolve) => {
      this.app.kill()
      resolve()
    })
  }
}

module.exports = AppSpawner
