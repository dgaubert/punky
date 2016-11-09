'use strict'

const FactoryInterface = require('../factory-interface')
const ClusterFactory = require('../cluster/cluster-factory')
const ProcessExitListeners = require('./process-exit-listeners')
const SigintListener = require('./sigint-listener')
const SigtermListener = require('./sigterm-listener')
const UncaughtExceptionListener = require('./uncaught-exception-listener')
const UnhandledRejectionListener = require('./unhandled-rejection-listener')
const Launcher = require('./launcher')

class LauncherFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    const target = ClusterFactory.create(metrics, logger, options)

    const processExitListeners = new ProcessExitListeners()
      .add(new SigintListener(process, logger))
      .add(new SigtermListener(process, logger))
      .add(new UncaughtExceptionListener(process, logger))
      .add(new UnhandledRejectionListener(process, logger))

    return new Launcher(target, processExitListeners)
  }
}

module.exports = LauncherFactory
