'use strict'

const assert = require('assert')
const FactoryInterface = require(__lib + 'factory-interface')

describe('factory-interface', () => {
  it('.create() should throw "Unimplemented method" error', () => {
    assert.throws(() => FactoryInterface.create(), 'Unimplemented method')
  })
})
