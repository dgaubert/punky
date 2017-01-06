'use strict'

const assert = require('assert')
const ListenerInterface = require(__lib + 'listener-interface')

class Listener extends ListenerInterface {}

describe('listener-interface', () => {
  it('create interface directly with "new" should throw error', () => {
    assert.throws(() => new ListenerInterface(), 'ListenerInterface cannot be directly constructed')
  })

  it('.listen() should throw "Unimplemented method" error', () => {
    const listenerInterface = new Listener()

    assert.throws(() => listenerInterface.listen(), 'Unimplemented method')
  })
})
