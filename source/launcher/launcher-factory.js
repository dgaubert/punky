'use strict'

const Factory = require('../factory')
const ProcessExitListeners = require('./process-exit-listeners')
const SigintListener = require('./sigint-listener')
const SigtermListener = require('./sigterm-listener')
const UncaughtExceptionListener = require('./uncaught-exception-listener')
const UnhandledRejectionListener = require('./unhandled-rejection-listener')
const Launcher = require('./launcher')

class LauncherFactory extends Factory {
  constructor () {
    super()
  }

  create (target, logger) {
    const launcher = new Launcher(target)

    const processExitListeners = new ProcessExitListeners()
      .add(new SigintListener(logger))
      .add(new SigtermListener(logger))
      .add(new UncaughtExceptionListener(logger))
      .add(new UnhandledRejectionListener(logger))

    processExitListeners.listenAll(failure => launcher.exit(failure))

    return launcher
  }
}

module.exports = LauncherFactory
