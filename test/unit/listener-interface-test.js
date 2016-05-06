'use strict'

const ListenerInterface = require(__source + 'listener-interface')

describe('listener-interface', () => {
  it('.listen() should throw "Unimplemented method" error', () => {
    const listenerInterface = new ListenerInterface();

    (() => {
      listenerInterface.listen()
    }).should.throw('Unimplemented method')
  })
})
