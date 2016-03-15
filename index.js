#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const ServiceFactory = require('./lib/service-factory')

var options = minimist(process.argv.slice(2), {
  alias: {
    c: 'cluster',
    p: 'port',
    v: 'version'
  },
  boolean: [ // options that are always boolean
    'cluster',
  ],
  default: {
    port: 3000
  }
})

const serviceFactory = new ServiceFactory()
const service = serviceFactory.create(options)

service.run()
