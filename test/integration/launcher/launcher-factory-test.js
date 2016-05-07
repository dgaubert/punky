'use strict'

const RunnerInterface = require(__source + 'runner-interface')
const LauncherFactory = require(__source + 'launcher/launcher-factory')

describe('launcher-factory', () => {
  it('.create() should return a Runner instance', () => {
    const launcher = LauncherFactory.create()
    launcher.should.be.instanceOf(RunnerInterface)
  })
})
