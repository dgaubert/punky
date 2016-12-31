'use strict'

const HelloWorld = require('./hello-world')

class ClusteredHelloWorld {
  constructor () {
    const options = {
      cluster: {
        enabled: true
      }
    }

    return new HelloWorld(options)
  }
}

module.exports = ClusteredHelloWorld
