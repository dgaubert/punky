'use strict'

const cluster = require('cluster')
const FactoryInterface = require('../../factory-interface')
const ServerManager = require('./server-manager')
const Sigusr2Listener = require('./sigusr2-listener')
const SighupListener = require('./sighup-listener')
const ServerExitListener = require('./server-exit-listener')
const Leader = require('./leader')

class LeaderFactory extends FactoryInterface {
  static create (metrics, logger) {
    const sigusr2Listener = new Sigusr2Listener(process, logger)
    const serverExitListener = new ServerExitListener(process, logger)
    const sighupListener = new SighupListener(process, logger)
    const serverManager = new ServerManager(cluster, sigusr2Listener, serverExitListener, sighupListener, logger)

    return new Leader(serverManager, logger)
  }

  static shouldCreate (clusterOn) {
    return Leader.is(clusterOn)
  }
}

module.exports = LeaderFactory
