'use strict'

const assert = require('assert')
const FactoryInterface = require(__lib + 'factory-interface')

describe('factory-interface', () => {
  it('create interface directly with "new" should throw error', () => {
    assert.throws(() => new FactoryInterface(), 'FactoryInterface cannot be directly constructed')
  })

  it('.create() should throw "Unimplemented method" error', () => {
    assert.throws(() => FactoryInterface.create(), 'Unimplemented method')
  })
})
