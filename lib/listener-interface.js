'use strict'

class ListenerInterface {
  constructor () {
    if (new.target === ListenerInterface) {
      throw new Error('ListenerInterface cannot be directly constructed')
    }
  }

  listen () {
    throw new Error('Unimplemented method')
  }
}

module.exports = ListenerInterface
