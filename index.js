#!/usr/bin/env node
'use strict'

const ServiceFactory = require('./source/service-factory')
const serviceFactory = new ServiceFactory()
const service = serviceFactory.create()

service.run()
