'use strict'

const assert = require('assert')
const RunnerInterface = require(__source + 'runner-interface')
const LauncherFactory = require(__source + 'launcher/launcher-factory')

describe('launcher-factory', () => {
  it('.create() should return a Runner instance', () => {
    const launcher = LauncherFactory.create()
    assert.ok(launcher instanceof RunnerInterface)
  })
})
