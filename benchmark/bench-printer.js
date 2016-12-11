'use strict'

const pkg = require('../package.json')
const prependFile = require('prepend-file')
const markdown = ctx => `## ${ctx.name} ${ctx.version}\n${ctx.platform} / node ${ctx.node} / v8 ${ctx.v8} (${ctx.date})\n\`\`\`\n${ctx.results}\`\`\`\n`
const text = ctx => `${ctx.name} ${ctx.version}\n${ctx.platform} / node ${ctx.node} / v8 ${ctx.v8} (${ctx.date})\n${ctx.results}\n`
const template = (pkg, results, isRelease) => {
  const ctx = {
    name: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),
    version: pkg.version,
    platform: `${process.platform} ${process.arch}`,
    node: process.versions.node,
    v8: process.versions.v8,
    date: new Date().toUTCString(),
    results: results
  }

  return isRelease ? markdown(ctx) : text(ctx)
}

class BenchPrinter {
  constructor (isRelease = false) {
    this.isRelease = isRelease
    this.outputFile = `${__dirname}/BENCHMARK.md`
  }

  print (results) {
    return new Promise((resolve, reject) => {
      const output = template(pkg, results, this.isRelease)

      if (this.isRelease) {
        prependFile(this.outputFile, output, err => err ? reject(err) : resolve())
      } else {
        console.log(output)
        resolve()
      }
    })
  }
}

module.exports = BenchPrinter
