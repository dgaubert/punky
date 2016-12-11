'use strict'

const assert = require('assert')
const ListenerInterface = require(__source + 'listener-interface')

class Listener extends ListenerInterface {}

describe('listener-interface', () => {
  it('.listen() should throw "Unimplemented method" error', () => {
    const listenerInterface = new Listener()

    assert.throws(() => listenerInterface.listen(), 'Unimplemented method')
  })
})
