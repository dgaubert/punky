#!/usr/bin/env node
'use strict'

const ServiceFactory = require('./lib/service-factory')
const ArgumentParser = require('./lib/argv/argument-parser')

const serviceFactory = new ServiceFactory()

const processArguments = process.argv.slice(2)
const argumentParser = new ArgumentParser()
const options = argumentParser.parse(processArguments)

const service = serviceFactory.create(options)

service.run()
