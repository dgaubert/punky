'use strict'

const ArgumentParser = require(__source + 'argv/argument-parser')

describe('argument-parser', () => {
  beforeEach(() => {
    this.argumentParser = ArgumentParser
  })

  it('.parse(argv) should parse cluster option', () => {
    const argv = ['-c']

    let options = this.argumentParser.parse(argv)

    options.cluster.should.be.true
  })

  it('.parse(argv) should parse cluster option with alias', () => {
    const argv = ['--cluster']

    const options = this.argumentParser.parse(argv)

    options.cluster.should.be.true
  })

  it('.parse(argv) should parse port option', () => {
    const argv = ['-p', '3000']

    const options = this.argumentParser.parse(argv)

    options.port.should.be.equal(3000)
  })

  it('.parse(argv) should parse port option with alias', () => {
    const argv = ['--port', '3000']

    const options = this.argumentParser.parse(argv)

    options.port.should.be.equal(3000)
  })

  it('.parse(argv) should parse port and cluster option', () => {
    const argv = ['-c', '-p', '3000']

    const options = this.argumentParser.parse(argv)

    options.cluster.should.be.true
    options.port.should.be.equal(3000)
  })

  it('.parse(argv) should parse port and cluster option with alias', () => {
    const argv = ['--cluster', '--port', '3000']

    const options = this.argumentParser.parse(argv)

    options.cluster.should.be.true
    options.port.should.be.equal(3000)
  })
})
