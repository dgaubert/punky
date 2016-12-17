'use strict'

const HelloWorld = require('../example/hello-world')
const helloWorld = new HelloWorld()

helloWorld.punky.run()
  // if process was spawned with IPC channel,
  // then send "listening port" to the parent process
  .then(httpServer => typeof process.send === 'function'
    ? process.send({ port: httpServer.address().port })
    : undefined
  )
  .catch(err => helloWorld.punky.logger.error(err))
