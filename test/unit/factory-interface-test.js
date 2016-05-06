'use strict'

const FactoryInterface = require(__source + 'factory-interface')

describe('factory-interface', () => {
  it('.create() should throw "Unimplemented method" error', () => {
    (() => {
      FactoryInterface.create()
    }).should.throw('Unimplemented method')
  })
})
