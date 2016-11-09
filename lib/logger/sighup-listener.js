'use strict'

const ListenerInterface = require('../listener-interface')

class SighupListener extends ListenerInterface {
  constructor (emitter) {
    super()
    this.emitter = emitter
  }

  listen (reload) {
    this.emitter.on('SIGHUP', () => {
      reload()
    })
  }
}

module.exports = SighupListener
