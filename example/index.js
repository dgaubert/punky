'use strict'

const meow = require('meow')
const help = `
  Usage:
    $ npm run example [-- <options>]

  Options:
    -n, --name Launch the given example (default: hello-world)

  Examples
    $ npm run example -- -n hello-world
`
const options = {
  alias: {
    n: 'name'
  },
  default: {
    name: 'hello-world'
  }
}

const flags = meow({ help }, options).flags
const exampleName = flags.name
const Example = require(`./${exampleName}`)
const example = new Example()

example.run()
  .catch(err => example.punky.logger.error(err))
