'use strict'

const assert = require('assert')
const ListenerInterface = require(__source + 'listener-interface')

describe('listener-interface', () => {
  it('.listen() should throw "Unimplemented method" error', () => {
    const listenerInterface = new ListenerInterface()

    assert.throws(() => {
      listenerInterface.listen()
    }, 'Unimplemented method')
  })
})
