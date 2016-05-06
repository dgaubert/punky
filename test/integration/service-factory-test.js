'use strict'

const RunnerInterface = require(__source + 'runner-interface')
const ServiceFactory = require(__source + 'service-factory')

describe('service-factory', () => {
  it('.create()', () => {
    const service = ServiceFactory.create()
    service.should.be.instanceOf(RunnerInterface)
  })
})
