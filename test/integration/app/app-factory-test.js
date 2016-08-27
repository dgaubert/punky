'use strict'

const defaultOptions = require(__source + 'config/default')
const ListenerInterface = require(__source + 'listener-interface')
const AppFactory = require(__source + 'app/app-factory')
const Router = require('express').Router
const LoggerFactory = require(__source + 'logger/logger-factory')

describe('app-factory', () => {
  it('.create() should return a App instance', () => {
    const router = Router()
    const logger = LoggerFactory.create(defaultOptions)
    const app = AppFactory.create(router, logger)
    app.should.be.instanceOf(ListenerInterface)
  })
})
