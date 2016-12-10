'use strict'

const meow = require('meow')
const AppSpawner = require('./app-spawner')
const WrkSpawner = require('./wrk-spawner')
const BenchPrinter = require('./bench-printer')
const help = `
  Usage:
    $ npm run benchmark [-- <options>]

  Options:
    -r, --release Save results in ./BENCHMARK.md (default: disable)

  Examples
    $ npm run benchmark -- -r
`
const options = {
  alias: {
    r: 'release'
  },
  boolean: [ // options that are always boolean
    'release'
  ],
  default: {
    release: false
  }
}
const flags = meow({ help }, options).flags
const appSpawner = new AppSpawner()
const wrkSpawner = new WrkSpawner()
const benchPrinter = new BenchPrinter(flags.release)

appSpawner.run()
  .then(port => wrkSpawner.run(port))
  .then(results => benchPrinter.print(results))
  .then(() => appSpawner.stop())
  .then(() => wrkSpawner.stop())
  .catch(err => console.error(err))
