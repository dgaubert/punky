'use strict'

const ListenerInterface = require('./listener-interface')

class Listener extends ListenerInterface {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen () {
    this.logger.debug(`${this.handler.name} attached to ${this.event} event`)
    this.emitter.on(this.event, this.handler)
  }

  remove () {
    this.logger.debug(`${this.handler.name} dettached from ${this.event} event`)
    this.emitter.removeListener(this.event, this.handler)
  }
}

module.exports = Listener
