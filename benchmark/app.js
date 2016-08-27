'use strict'

const Punky = require('../')
const Router = require('express').Router

const punky = new Punky()
const router = Router()
const body = new Buffer('Hello World')

router.get('/', (req, res, next) => {
  res.set('Content-Type', 'text/html')
  res.send(body)
})

punky.use(router)
  .run()
  .catch(punky.logger.error)
