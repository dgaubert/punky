'use strict'

const Punky = require('../')
const Router = require('express').Router

const punky = new Punky()
const router = Router()
const body = new Buffer('Hello World')
const logMessage = 'Request received, greeting..'

router.use((req, res, next) => {
  punky.logger.info(req, logMessage)
  next()
})

router.get('/', (req, res, next) => {
  res.send(body)
})

punky.use(router)
  .run()
  .catch(punky.logger.error)
