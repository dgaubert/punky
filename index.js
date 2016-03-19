#!/usr/bin/env node
'use strict'

const ServiceFactory = require('./lib/service-factory')

const serviceFactory = new ServiceFactory()
const argv = process.argv.slice(2);
const service = serviceFactory.create(argv)

service.run()
