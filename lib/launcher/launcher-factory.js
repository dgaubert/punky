'use strict'

const FactoryInterface = require('../factory-interface')
const ProcessExitListeners = require('./process-exit-listeners')
const SigintListener = require('./sigint-listener')
const SigtermListener = require('./sigterm-listener')
const UncaughtExceptionListener = require('./uncaught-exception-listener')
const UnhandledRejectionListener = require('./unhandled-rejection-listener')
const Launcher = require('./launcher')

class LauncherFactory extends FactoryInterface {
  create (target, logger) {
    const launcher = new Launcher(target)
    const processExitListeners = new ProcessExitListeners()
      .add(new SigintListener(process, logger))
      .add(new SigtermListener(process, logger))
      .add(new UncaughtExceptionListener(process, logger))
      .add(new UnhandledRejectionListener(process, logger))

    processExitListeners.listenAll((failure) => launcher.exit(failure))

    return launcher
  }
}

module.exports = LauncherFactory
