'use strict'

const ListenerInterface = require('../listener-interface')

class App extends ListenerInterface {
  constructor (app, middlewares) {
    super()

    this.provider = app
    this.provider.disable('x-powered-by')

    middlewares.registAll(this.provider)
  }

  listen () {
    return this.provider.listen(...arguments)
  }
}

module.exports = App
