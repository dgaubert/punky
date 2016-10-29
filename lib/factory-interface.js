'use strict'

class FactoryInterface {
  constructor () {
    if (new.target === FactoryInterface) {
      throw new Error('FactoryInterface cannot be directly constructed')
    }
  }

  static create () {
    throw new Error('Unimplemented method')
  }
}

module.exports = FactoryInterface
