'use strict'

const pkg = require('../package.json')
const Benchmark = require('benchmark')
const Suite = Benchmark.Suite
const spawn = require('child_process').spawn
const request = require('request')
const prependFile = require('prepend-file')
const port = 3344
const cwd = './benchmark'
const outputFile = [cwd, 'benchmark.md'].join('/')

const template = (pkg, suite) => `
  Benchmark for ${pkg.name} ${pkg.version} on ${new Date().toUTCString()}:
  ${Object.values(suite)
      .filter(value => value instanceof Benchmark)
      .map(benchmark => `
    Duration: ${benchmark.times.elapsed}
    Request/sec: ${benchmark.hz}
    Request time (mean): ${benchmark.stats.mean}
  `).join('\n')}
`

const requestOptions = {
  url: `http://localhost:${port}`,
  json: true
}
const benchmarkOptions = {
  defer: true,
  async: true
}

const app = spawn('node', ['app.js', `-p ${port}`], {
  cwd: cwd,
  stdio: ['ignore', 'ignore', 'ignore', 'ipc']
})

const suite = new Suite()

suite.add(pkg.name, deferred => {
  request(requestOptions, err => err ? suite.abort() : deferred.resolve())
}, benchmarkOptions)

suite.on('complete', () => {
  const output = template(pkg, suite)
  prependFile(outputFile, output, err => err ? console.log(err) : console.log(output))
})

suite.on('complete', () => app.kill())

app.on('message', message => message.ready ? suite.run() : undefined)
