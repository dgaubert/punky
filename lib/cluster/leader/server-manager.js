'use strict'

const ErrorMessage = require('../../utils/error-message')

class ServerManager {
  constructor (cluster, sigusr2Listener, serverExitListener, sighupListener, logger) {
    this.cluster = cluster
    this.sigusr2Listener = sigusr2Listener
    this.serverExitListener = serverExitListener
    this.sighupListener = sighupListener
    this.logger = logger
  }

  attachListeners () {
    this.sigusr2Listener.listen(() => {
      this.reloadAllServers()
        .then(() => this.logger.info('All servers were loaded'))
        .catch(err => this.logger.error({ err }))
    })

    this.sighupListener.listen(() => {
      this.reopenAllLogFileStreams()
        .then(() => this.logger.info('All log files were reopened'))
        .catch(err => this.logger.error({ err }))
    })

    this.serverExitListener.listen((server, code) => this.refork(server, code))
  }

  removeListeners () {
    this.sigusr2Listener.remove()
    this.sighupListener.remove()
    this.serverExitListener.remove()
  }

  reopenAllLogFileStreams () {
    this.logger.info('Reopen all log file streams')

    const serverKeys = Object.keys(this.cluster.workers)
    const reopens = serverKeys.map(serverKey => this.reopenLogFileStreams(serverKey))

    return Promise.all(reopens)
  }

  reopenLogFileStreams (serverId) {
    const server = this.cluster.workers[serverId]

    return new Promise((resolve, reject) => {
      server.send('logger:reopen-file-streams', err => err ? reject(err) : resolve())
    })
  }

  reloadAllServers () {
    this.logger.info('Reload all servers')

    const serverKeys = Object.keys(this.cluster.workers)
    const reloads = serverKeys.map(serverKey => this.reloadServer(serverKey))

    return Promise.all(reloads)
  }

  refork (server, code) {
    if (code > 0 && !server.exitedAfterDisconnect) {
      this.fork()
    }
  }

  fork () {
    this.logger.info('Fork server')
    this.cluster.fork()
  }

  reloadServer (serverId) {
    return new Promise((resolve, reject) => {
      const server = this.cluster.workers[serverId]

      server.disconnect()

      server.once('exit', () => {
        if (!server.exitedAfterDisconnect) {
          return reject(new Error(ErrorMessage.exited('Server')))
        }

        const newServer = this.fork()

        newServer.once('listening', () => resolve())
        newServer.once('error', err => reject(err))
      })
    })
  }
}

module.exports = ServerManager
